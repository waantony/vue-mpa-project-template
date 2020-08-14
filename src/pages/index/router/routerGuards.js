// import store from '../store'

// const noLoginList = ['/login', '/register']

export default router => {
  router.beforeEach((to, from, next) => {
    // 编写拦截逻辑
    next()
  })

  router.afterEach(to => {
    document.title = to.query.title || to.meta?.title || ''
  })
}
