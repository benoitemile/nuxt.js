import Module from 'module'
import { resolve, join } from 'path'
import fs from 'fs-extra'
import esm from 'esm'

import { startsWithRootAlias, startsWithSrcAlias } from '@nuxt/common'

export default class Resolver {
  constructor(nuxt) {
    this.nuxt = nuxt
    this.options = this.nuxt.options

    // Binds
    this.resolvePath = this.resolvePath.bind(this)
    this.resolveAlias = this.resolveAlias.bind(this)
    this.resolveModule = this.resolveModule.bind(this)
    this.requireModule = this.requireModule.bind(this)

    // ESM Loader
    this.esm = esm(module, {})
  }

  resolveModule(path) {
    try {
      return Module._resolveFilename(path, {
        paths: this.options.modulesDir
      })
    } catch (error) {
      if (error.code === 'MODULE_NOT_FOUND') {
        return undefined
      } else {
        throw error
      }
    }
  }

  resolveAlias(path) {
    if (startsWithRootAlias(path)) {
      return join(this.options.rootDir, path.substr(2))
    }

    if (startsWithSrcAlias(path)) {
      return join(this.options.srcDir, path.substr(1))
    }

    return resolve(this.options.srcDir, path)
  }

  resolvePath(path, { alias, module } = {}) {
    // Fast return in case of path exists
    if (fs.existsSync(path)) {
      return path
    }

    let resolvedPath

    // Try to resolve it as a regular module
    if (module !== false) {
      resolvedPath = this.resolveModule(path)
    }

    // Try to resolve alias
    if (!resolvedPath && alias !== false) {
      resolvedPath = this.resolveAlias(path)
    }

    // Use path for resolvedPath
    if (!resolvedPath) {
      resolvedPath = path
    }

    let isDirectory

    // Check if resolvedPath exits and is not a directory
    if (fs.existsSync(resolvedPath)) {
      isDirectory = fs.lstatSync(resolvedPath).isDirectory()

      if (!isDirectory) {
        return resolvedPath
      }
    }

    // Check if any resolvedPath.[ext] or resolvedPath/index.[ext] exists
    for (const ext of this.options.extensions) {
      if (!isDirectory && fs.existsSync(resolvedPath + '.' + ext)) {
        return resolvedPath + '.' + ext
      }

      if (isDirectory && fs.existsSync(resolvedPath + '/index.' + ext)) {
        return resolvedPath + '/index.' + ext
      }
    }

    // If there's no index.[ext] we just return the directory path
    if (isDirectory) {
      return resolvedPath
    }

    // Give up
    throw new Error(`Cannot resolve "${path}" from "${resolvedPath}"`)
  }

  requireModule(path, { esm, alias, intropDefault } = {}) {
    let resolvedPath = path
    let requiredModule

    const errors = []

    // Try to resolve path
    try {
      resolvedPath = this.resolvePath(path, { alias })
    } catch (e) {
      errors.push(e)
    }

    // Try to require
    try {
      if (esm === false) {
        requiredModule = require(resolvedPath)
      } else {
        requiredModule = this.esm(resolvedPath)
      }
    } catch (e) {
      errors.push(e)
    }

    // Introp default
    if (intropDefault !== false && requiredModule && requiredModule.default) {
      requiredModule = requiredModule.default
    }

    // Throw error if failed to require
    if (requiredModule === undefined && errors.length) {
      throw errors
    }

    return requiredModule
  }
}
