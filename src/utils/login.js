
import { getQueryObject } from '@/utils/index'
import { setLocal, getLocal } from '@/utils/storage'

export default function (tokenKey = 'token') {
  // 优先从地址栏获取
  const queryObj = getQueryObject(location.href)
  const URLToken = queryObj[tokenKey]
  if (URLToken) {
    setLocal(tokenKey, URLToken)
    return true
  }

  // 其次从 localStorage 获取
  if (getLocal(tokenKey)) {
    return true
  }
  return false
}

export const saveToken = () => {
  const queryObj = getQueryObject(location.href)
  const URLToken = queryObj.token
  if (URLToken) {
    setLocal('token', URLToken)
    return true
  }
  return false
}
