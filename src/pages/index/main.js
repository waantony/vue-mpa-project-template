import Vue from 'vue'
import router from './router'
import store from './store'
import App from './App.vue'
import 'normalize.css'
import '@/styles/index.scss'
import 'vant/lib/index.css'

// 全部引入 vant 组件
import Vant from 'vant'
Vue.use(Vant)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
