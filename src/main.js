// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import Header from '@/components/leader/Header'
import Footer from '@/components/leader/Footer'
import router from './router'
import ElementUI from 'element-ui'
import axios from 'axios';
Vue.prototype.$axios = axios;
import QS from 'qs'
Vue.prototype.qs = QS;
Vue.config.productionTip = false

import MetaInfo from 'vue-meta-info'
 
Vue.use(MetaInfo)
Vue.use(ElementUI, {
  size: 'small',
  zIndex: 3000
})

Vue.component('black-head', Header)
Vue.component('black-footer', Footer)

// router.beforeEach((to, from, next) => {
//   /* 路由发生变化修改页面title */
//   if (to.meta.title) {
//     document.title = to.meta.title
//   }
//   next()
// })

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: {
    App
  },
  template: '<App/>',
  /* 这句非常重要，否则预渲染将不会启动 */
  mounted() {
    document.dispatchEvent(new Event('render-event'))
  }
})
