import axios from 'axios'
import qs from 'qs'
import router from '@/router'
import store from '@/store'
const baseURL = 'http://139.196.98.22:8081/angel/'

axios.interceptors.request.use(
    config => {
        let token = window.localStorage.getItem('TOKEN')
        if (token) {
            config.headers.token = token
        }
        return config
    },
    error => {
        return Promise.reject(error)
    }
)

axios.interceptors.response.use(
    response => {
        return response
    },
    error => {
        return Promise.resolve(error.response)
    }
)

function checkStatus(response) {
    // loading
    // 如果http状态码正常，则直接返回数据
    if (
        response &&
        (response.status === 200 ||
            response.status === 304 ||
            response.status === 400)
    ) {
        let code = response.data.code
        if (code == 99 || code == 999) {
            store.dispatch('REMOVE_USER_INFO').then(() => {
                router.replace({
                    path: '/login'
                })
            })
            console.log('重新登录')
            return false
        }
        return response.data

        // 如果不需要除了data之外的数据，可以直接 return response.data
    }
    // 异常状态下，把错误信息返回去
    return {
        status: -404,
        msg: '网络异常'
    }
}

export default {
    post(req) {
        return axios({
            method: 'post',
            baseURL: baseURL,
            url: req.url,
            data: req.data,
            timeout: 10000,
            headers: {
                'X-Requested-With': 'XMLHttpRequest',
                'Content-Type': 'application/json; charset=UTF-8'
            }
        }).then(response => {
            return checkStatus(response)
        })
    },
    form(req) {
        return axios({
            method: 'post',
            baseURL: baseURL,
            url: req.url,
            data: req.data,
            // timeout: 10000,
            headers: {
                'Content-Type': 'multipart/form-data'
            },
            onUploadProgress: progressEvent => {
                if (!req.cb) return false
                if (progressEvent.lengthComputable) {
                    //原生获取上传进度的事件
                    //属性lengthComputable主要表明总共需要完成的工作量和已经完成的工作是否可以被测量
                    //如果lengthComputable为false，就获取不到progressEvent.total和progressEvent.loaded
                    req.cb(progressEvent)
                }
            }
        }).then(response => {
            return checkStatus(response)
        })
    },
    get(req) {
        return axios({
            method: 'get',
            baseURL: baseURL,
            url: req.url,
            params: req.data, // get 请求时带的参数
            timeout: 10000,
            headers: {
                'X-Requested-With': 'XMLHttpRequest'
            }
        }).then(response => {
            return checkStatus(response)
        })
    }
}
