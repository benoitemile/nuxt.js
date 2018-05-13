export default {
  css: ['~/assets/main.css'],
  render: {
    bootstrapPromise: () => {
      let bsPromise = false
      if (process.browser) {
        bsPromise = new Promise((resolve, reject) => {
          try {
            window.addEventListener('load', () => {
              resolve()
            })
          } catch(e) {
            resolve()
          }
        })
      }
      return bsPromise
    }
  }
}
