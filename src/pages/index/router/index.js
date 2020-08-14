import Vue from 'vue'
import VueRouter from 'vue-router'
import routerGuards from './routerGuards'
import Home from '../views/Home'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/lazyload',
    name: 'lazyload',
    component: () => import('../views/Home'),
    meta: { title: '懒加载路由标题', keepAlive: true },
  },
]

const router = new VueRouter({
  routes,
})

routerGuards(router)

export default router
