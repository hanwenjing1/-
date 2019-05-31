import Vue from 'vue'
import App from './App'
import WXrequest from './utils/wx-request'
Vue.prototype.$httpWX = WXrequest
// import vueTabbarSlide from 'vue-tabbar-slide'
//
// Vue.use(vueTabbarSlide)
let Fly = require('flyio/dist/npm/wx')
let fly = new Fly
Vue.prototype.$flyhttp = fly
// import '../static/css/reset.css';
Vue.config.productionTip = false
App.mpType = 'app'

const app = new Vue(App)
app.$mount()
