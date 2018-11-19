// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui' //引入js
import 'element-ui/lib/theme-chalk/index.css'//引入css
import http from './api/http.js'
import ports from './api/ports'
import Vuex from 'vuex'
import store from './store/store'
import axios from 'axios'

import echarts from 'echarts'

Vue.use(ElementUI) //使用ElementUI
Vue.use(Vuex)
Vue.config.productionTip = false
Vue.prototype.$axios = axios 
Vue.prototype.http = http
Vue.prototype.ports = ports
Vue.prototype.$echarts = echarts 

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
