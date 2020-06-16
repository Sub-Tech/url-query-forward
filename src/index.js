((win) => {
  // on load, needed so we can load the script anywhere
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

  const getQueryString = () => {
    // global defined on page
    const q = win.location.search
    if (!q || q.length <= 1) {
      return q
    }
    if (! _urlqueryforward_only_forward
      || ! _urlqueryforward_only_forward.length
      || ! _urlqueryforward_only_forward instanceof Array)
    {
      return q
    }
    // we only want to get specific params out of the query string
    let newQ = '?'
    const querySplitArr = q.slice(1).split("&")
    _urlqueryforward_only_forward.forEach(mapping =>  {
      if (! mapping.find_param || ! mapping.map_to) return; // no need to keep going
      querySplitArr.forEach(qp => {
        const keyValArr = qp.split("=")
        if (mapping.find_param === keyValArr[0] && keyValArr.length > 1) {
          if (keyValArr.length > 1) {
            newQ += `${mapping.map_to}=${keyValArr[1]}&`
          } else {
            newQ += `${mapping.map_to}&`
          }
        }
      })
    })
    return newQ.length > 1 ? newQ : ''
  }

  ready(() => {
    const REPLACE = '#QFORWARD'
    const q = getQueryString()
    const aElements = document.getElementsByTagName('a')


    if (aElements) {
      for (let i = 0;i < aElements.length; i++) {
        const a = aElements[i]
        const href = a.getAttribute('href')
        if (! href) continue  // in case of no attribute
        // do we need to replace anything
        if (href.indexOf(REPLACE) === -1) continue
        // check if no query replace with - includes ? char
        if (!q || q.length <= 1) {
          const cleanHref = href.split(REPLACE).join('')
          a.setAttribute('href', cleanHref)
          continue
        }
        // check if existing query we need to preserve
        const newHref = (href.indexOf('?') !== -1)
          ? href.split('?').join(q + '&').split(REPLACE).join('') // no worries if extra &
          : href.split(REPLACE).join(q + '&')
        a.setAttribute('href', newHref)
      }
    }
  })
})(window)