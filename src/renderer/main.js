import Vue from 'vue'
import axios from 'axios'
import * as api from './api'
// import VueAMap from 'vue-amap'
// Vue.use(VueAMap);
// VueAMap.initAMapApiLoader({
//     key: 'ee3a8beaed04769b9826fcb0da76f552',
//     plugin: ['AMap.Autocomplete', 'AMap.PlaceSearch', 'AMap.Scale', 'AMap.OverView', 'AMap.ToolBar', 'AMap.MapType', 'AMap.PolyEditor', 'AMap.CircleEditor'],
//     // 默认高德 sdk 版本为 1.4.4
//     v: '1.4.4'
// });

import App from './App'

import Avatar from '@/components/Avatar/index.js'

import router from './router'
import store from './store'
import Toast from '@/commom/Toast'
import VueBus from 'vue-bus'

import i18n from './lang'

import tip from '@/directive/tip'

Vue.use(Avatar)

Vue.use(VueBus)
Vue.prototype.$Toast = Toast.install

if (!process.env.IS_WEB) Vue.use(require('vue-electron'))
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

console.log(1)

/* eslint-disable no-new */
new Vue({
    components: {
        App
    },
    router,
    store,
    i18n,
    template: '<App/>'
}).$mount('#app')
