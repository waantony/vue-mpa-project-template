/*
userAgent: 'Mozilla/5.0 (Linux; Android 7.1.2; vivo X9Plus Build/N2G47H; wv)
AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/66.0.3359.126
MQQBrowser/6.2 TBS/045131 Mobile Safari/537.36 MMWEBID/4613
MicroMessenger/7.0.13.1640(0x27000D37) Process/tools NetType/WIFI Language/zh_CN ABI/arm64 WeChat/arm64'

*/

/*

userAgent: 'Mozilla/5.0 (iPhone; CPU iPhone OS 13_4_1 like Mac OS X)
AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148
MicroMessenger/7.0.12(0x17000c2d) NetType/WIFI Language/en'

*/

/*
userAgent: "Mozilla/5.0 (Windows NT 10.0; WOW64)
AppleWebKit/537.36 (KHTML, like Gecko)
Chrome/53.0.2785.116 Safari/537.36 QBCore/4.0.1301.400
QQBrowser/9.0.2524.400 Mozilla/5.0 (Windows NT 6.1; WOW64)
AppleWebKit/537.36 (KHTML, like Gecko)
Chrome/53.0.2875.116 Safari/537.36 NetType/WIFI MicroMessenger/7.0.5 WindowsWechat"

*/

const UA = navigator.userAgent

// 是否是微信正则
const isInWeiXinRegExp = /MicroMessenger/iu

// 安卓版本正则
const AndroidVersionRegExp = /Android\s(?<major>\d+)\.?(?<minor>\d*)\.?(?<revision>\d*)/iu

// 是否是在微信浏览器中
export const isInWeiXin = isInWeiXinRegExp.test(UA)

// 获取当前设备安卓版本号  比如 8.0.0 返回 [8, 0, 0]
export const AndroidVersion = UA.match(AndroidVersionRegExp)?.slice(1, 4).map(Number)
