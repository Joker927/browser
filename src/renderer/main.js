import Vue from 'vue'
import axios from 'axios'
import * as api from './api'

import App from './App'
import router from './router'
import store from './store'
import Toast from '@/commom/Toast'

Vue.prototype.$Toast = Toast.install

if (!process.env.IS_WEB) Vue.use(require('vue-electron'))
Vue.http = Vue.prototype.$http = axios
Vue.prototype.api = api
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  components: { App },
  router,
  store,
  template: '<App/>'
}).$mount('#app')
