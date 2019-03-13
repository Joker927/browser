import Vue from 'vue'
import axios from 'axios'
import * as api from './api'

import App from './App'
import router from './router'
import store from './store'
import Toast from '@/commom/Toast'
import VueBus from 'vue-bus'

import i18n from './lang'

import tip from '@/directive/tip'
Vue.use(VueBus)
Vue.prototype.$Toast = Toast.install

if (!process.env.IS_WEB) Vue.use(require('vue-electron'))
Vue.http = Vue.prototype.$http = axios
Vue.prototype.api = api
Vue.config.productionTip = false

Vue.directive('scroll', {
    bind: (el, binding) => {
        el.addEventListener('scroll', () => {
            if (binding.modifiers.start) {
                binding.value()
            }
            if (el.firstChild.clientHeight - el.scrollTop <= el.clientHeight) {
                if (binding.modifiers.end) {
                    binding.value()
                }
            }
        })
    }
})
Vue.directive('tip', tip)

/* eslint-disable no-new */
new Vue({
    components: { App },
    router,
    store,
    i18n,
    template: '<App/>'
}).$mount('#app')
