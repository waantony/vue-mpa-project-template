// 获取数据类型
export const getType = value => Object.prototype.toString.call(value).slice(8, -1)

// 将钱转换为 ￥xx.yy
export const currency = val => `￥${val.toFixed(2)}`

// 十六进制颜色字符串转 rgba 字符串
export const hexToRgba = (hexColor, alpha = 1) => {
  const reg = /^#(?<hex>[0-9a-fA-f]{3}|[0-9a-fA-f]{6})$/iu
  let sColor = hexColor.toLowerCase()
  if (sColor && reg.test(sColor)) { // 如果是十六进制颜色 '#fff' '#ffffff'
    if (sColor.length === 4) { // 如果是 缩写，转为全写
      let sColorNew = '#'
      for (let i = 1; i < 4; i++) {
        sColorNew += `${sColor[i]}${sColor[i]}`
      }
      sColor = sColorNew
    }
    const sColorChange = []
    for (let i = 1; i < 7; i += 2) {
      sColorChange.push(parseInt(`0x${sColor.slice(i, i + 2)}`))
    }
    return `rgba(${sColorChange[0]}, ${sColorChange[1]}, ${sColorChange[2]}, ${alpha})`
  }
  return sColor
}

// 深冻结
export const deepFreeze = obj => {
  const keys = Object.keys(obj)
  // 先冻结深层属性，再冻结自身
  keys.forEach(key => {
    const prop = obj[key]
    // 如果 prop 是个对象，冻结
    if (['Object', 'Array'].includes(getType(prop))) {
      deepFreeze(prop)
    }
  })
  // 冻结自身(no-op if already frozen)
  return Object.freeze(obj)
}

// 深冻结
// export const deepFreeze = (obj) => {
//   Object.freeze(obj)
//   Object.keys(obj).forEach(key => {
//     if (typeof obj[key] === 'object') {
//       deepFreeze(obj[key])
//     }
//   })
// }
