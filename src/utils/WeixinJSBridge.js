const { WeixinJSBridge } = window

/**
 * 当 WeixinJSBridge 准备好后执行一个方法
 * @param { function } callback 当 WeixinJSBridge 准备好后需要执行的回调
 */
const onWeixinJSBridgeReady = callback => {
  // 判断 WeixinJSBridge 是否存在，如果不存在，监听 WeixinJSBridgeReady 事件再触发
  if (typeof WeixinJSBridge === 'undefined') {
    if (document.addEventListener) {
      document.addEventListener('WeixinJSBridgeReady', callback, false)
    } else if (document.attachEvent) {
      document.attachEvent('WeixinJSBridgeReady', callback)
      document.attachEvent('onWeixinJSBridgeReady', callback)
    }
  } else { // 已存在，直接触发
    callback()
  }
}

// WeixinJSBridge 准备好后立即执行的操作
onWeixinJSBridgeReady(() => {
  const { WeixinJSBridge } = window
  // 设置网页字体为默认大小
  WeixinJSBridge.invoke('setFontSizeCallback', { 'fontSize': 0 })
  // 重写设置网页字体大小的事件
  WeixinJSBridge.on('menu:setfont', () => {
    WeixinJSBridge.invoke('setFontSizeCallback', { 'fontSize': 0 })
  })
})

// 唤起支付参数示例：
// const payData = {
//   'appId': 'wx2421b1c4370ec43b', // 公众号名称，由商户传入
//   'timeStamp': '1395712654', // 时间戳，自1970年以来的秒数
//   'nonceStr': 'e61463f8efa94090b1f366cccfbbb444', // 随机串
//   'package': 'prepay_id=u802345jgfjsdfgsdg888', // package 参数
//   'signType': 'MD5', // 微信签名方式
//   'paySign': '70EA570631E4BB79628FBCA90534C63FF7FADD89', // 微信签名
// }

/**
 * 根据支付返回值获取是否支付成功
 * 注：JS API的返回结果 get_brand_wcpay_request:ok 仅在用户成功完成支付时返回。
 * 由于前端交互复杂，get_brand_wcpay_request:cancel 或者 get_brand_wcpay_request:fail 可以统一处理为用户遇到错误或者主动放弃，不必细化区分。
 */
const payStatus = {
  'get_brand_wcpay_request:ok': true, // 支付成功
  'get_brand_wcpay_request:cancel': false, // 取消支付
  'get_brand_wcpay_request:fail': false, // 支付失败

  // 1. 请检查预支付会话标识prepay_id是否已失效
  // 2. 请求的appid与下单接口的appid是否一致
  '调用支付JSAPI缺少参数：total_fee': false,
}

/**
 * 从服务端获取唤起需要的对象参数后，唤起微信支付
 * @param { object } payData 唤起微信支付需要的参数，从服务端获取
 */
export const handleWechatPay = payData => new Promise((resolve, reject) => {
  // WeixinJSBridge 加载完成后触发的支付
  onWeixinJSBridgeReady(() => {
    const { WeixinJSBridge } = window
    WeixinJSBridge.invoke('getBrandWCPayRequest', payData, res => {
      // 支付成功 res.err_msg将在用户支付成功后返回 ok，但并不保证它绝对可靠。
      if (payStatus[res.err_msg]) {
        // 成功的逻辑
        resolve()
      } else {
        reject(new Error('支付未成功'))
      }
    })
  })
})
