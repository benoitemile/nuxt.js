import { resolve } from 'path'
import { loadFixture, getPort, Nuxt, Builder } from '../utils'

describe('nuxt', () => {
  test('Nuxt.js Class', () => {
    expect(typeof Nuxt).toBe('function')
  })

  test('Nuxt.js Instance', async () => {
    const config = await loadFixture('empty')
    const nuxt = new Nuxt(config)

    expect(typeof nuxt).toBe('object')
    expect(nuxt.options.dev).toBe(false)
    expect(typeof nuxt._ready.then).toBe('function')

    await nuxt.ready()

    expect(nuxt.initialized).toBe(true)
  })

  test('Fail to build when no pages/ directory but is in the parent', () => {
    const nuxt = new Nuxt({
      dev: false,
      rootDir: resolve(__dirname, '..', 'fixtures', 'empty', 'pages')
    })

    return new Builder(nuxt).build().catch((err) => {
      const s = String(err)
      expect(s).toContain('No `pages` directory found')
      expect(s).toContain('Did you mean to run `nuxt` in the parent (`../`) directory?')
    })
  })

  test('Build with default page when no pages/ directory', async () => {
    const nuxt = new Nuxt()
    new Builder(nuxt).build()
    const port = await getPort()
    await nuxt.server.listen(port, 'localhost')

    const { html } = await nuxt.server.renderRoute('/')
    expect(html).toContain('<h2 class="Landscape__Title">')
    expect(/Landscape__Page__Explanation/.test(html)).toBe(true)

    await nuxt.close()
  })

  test('Fail to build when specified plugin isn\'t found', () => {
    const nuxt = new Nuxt({
      dev: false,
      rootDir: resolve(__dirname, '..', 'fixtures', 'missing-plugin')
    })

    return new Builder(nuxt).build().catch((err) => {
      const s = String(err)
      expect(s).toContain('Plugin not found')
    })
  })

  test('Warn when styleResource isn\'t found', () => {
    const nuxt = new Nuxt({
      dev: false,
      rootDir: resolve(__dirname, '..', 'fixtures', 'missing-style-resource')
    })

    return new Builder(nuxt).build().catch((err) => {
      const s = String(err)
      expect(s).toContain('Style Resource not found')
    })
  })
})
