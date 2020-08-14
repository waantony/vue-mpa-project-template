import REQ from '@/utils/http'

// GET 请求
export const getRequest = data => REQ({
  method: 'GET',
  url: '/api/xxx',
  data,
})

// POST 请求
export const postRequest = data => REQ({
  url: '/api/xxx',
  data,
})

// 不需要显示 加载中 的接口
export const noLoading = data => REQ({
  url: '/api/xxx',
  data,
  isShowLoading: false,
})
