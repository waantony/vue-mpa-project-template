export default url => {
  const isCSS = /\.css(?:\?[^.]*)?$/giu.test(url)
  const isJS = /\.js(?:\?[^.]*)?$/giu.test(url)
  if (!isCSS && !isJS) {
    return
  }
  const { head } = document
  let ele = null
  if (isCSS) {
    ele = document.createElement('link')
    ele.setAttribute('rel', 'stylesheet')
    ele.setAttribute('type', 'text/css')
    ele.setAttribute('href', url)
  }
  if (isJS) {
    ele = document.createElement('script')
    ele.setAttribute('type', 'text/javascript')
    ele.setAttribute('src', url)
  }
  head.appendChild(ele)
}
