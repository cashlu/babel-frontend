import Vue from 'vue'
import App from './App.vue'
import router from './router'
import axios from 'axios'

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import './plugins/element'
import './assets/css/global.css'


Vue.config.productionTip = false

//设置axios为form-data
axios.defaults.headers.post['Content-Type'] = 'application/json;charset=UTF-8'
axios.defaults.headers.get['Content-Type'] = 'application/json;charset=UTF-8'
// axios.defaults.headers.put['Content-Type'] = 'application/x-www-form-urlencoded';

// TODO: 操他娘的！下面这句是哪来的！！！！！！！！！！！！
// axios.defaults.transformRequest = [function (data) {
//     let ret = ''
//     for (let it in data) {
//       ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
//     }
//     return ret
// }]


Vue.prototype.$axios = axios
// axios.defaults.baseURL = "http://47.111.245.46:8000/api/v1/"
axios.defaults.baseURL = "http://127.0.0.1:8888/api/v1/"

//axios请求拦截器，用于在每次发起请求时，在request的header中包含token，让后端验证。
axios.interceptors.request.use(config => {
    // 给请求头添加authorization属性，值是token（token之前获取后，存放在sessionStorage中）
    config.headers.authorization = "JWT " + window.localStorage.getItem("token")

    return config
})


Vue.use(ElementUI)

new Vue({
    router,
    render: h => h(App)
}).$mount('#app')
