export const throttle = (fn, ms = 200) => {
  let timer = null
  return function (...rest) {
    if (timer) {
      clearTimeout(timer)
    }
    timer = setTimeout(() => {
      // 此处需要绑定 this，临时取消 eslint 检查 this
      // eslint-disable-next-line no-invalid-this
      fn.apply(this, rest)
    }, ms)
  }
}

export const debounce = (fn, ms = 200) => {
  let canInvoke = true
  return function (...rest) {
    if (canInvoke) {
      // 此处需要绑定 this，临时取消 eslint 检查 this
      // eslint-disable-next-line no-invalid-this
      fn.apply(this, rest)
      canInvoke = false
      setTimeout(() => {
        canInvoke = true
      }, ms)
    }
  }
}
