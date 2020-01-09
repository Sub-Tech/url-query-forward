((win) => {
  const ready = (callback) => {
    if (document.readyState!='loading') {
      callback()
    } else if (document.addEventListener) {
      document.addEventListener('DOMContentLoaded', callback)
    } else {
      document.attachEvent('onreadystatechange', function () {
        if (document.readyState=='complete') callback();
      })
    }
  }

  ready(() => {
    const REPLACE = '#QFORWARD'
    const q = win.location.search
    const aElements = document.getElementsByTagName('a')
    if (q && q.length > 1 && aElements) {
      for (let i = 0;i < aElements.length; i++) {
        const a = aElements[i]
        const href = a.getAttribute('href')
        // do we need to replace anything
        if (href.indexOf(REPLACE) === -1) continue
        // check if existing query
        const newHref = (href.indexOf('?') !== -1)
          ? href.split('?').join(q + '&').split(REPLACE).join('') // no worries if extra &
          : href.split(REPLACE).join(q + '&')
        a.setAttribute('href', newHref)
      }
    }
  })
})(window)