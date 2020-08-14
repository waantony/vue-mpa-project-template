(function (win, doc) {
  const docEl = doc.documentElement

  // 设置 1rem = ? px
  const setRemUnit = () => {
    const rem = docEl.clientWidth / 3.75
    docEl.style.fontSize = `${rem}px`
  }

  setRemUnit()

  // 监听页面尺寸变化重新设置 rem 大小
  win.addEventListener('resize', setRemUnit)
  win.addEventListener('pageshow', e => {
    if (e.persisted) {
      setRemUnit()
    }
  })
}(window, document))
