import Vue from 'vue'
import App from './App'
import VueRouter from 'vue-router'
import configRouter from './router'
import VueResource from 'vue-resource'
import Mint from 'mint-ui'
import 'mint-ui/lib/style.css'
import './assets/css/style.css'

Vue.use(Mint);
Vue.use(VueRouter)
Vue.use(VueResource)

Vue.config.debug = true

document.getElementsByTagName("html")[0].style.fontSize=Math.floor(document.documentElement.clientWidth*100000/64)/100000+"px";

const router = new VueRouter(
    configRouter // （缩写）相当于 routes: routes
)

function getCookie (name) {
  var search = name + '='
  var offset = document.cookie.indexOf(search)
  if (offset === -1) {
    return ''
  } else {
    offset += search.length
    var end = document.cookie.indexOf(';', offset)
    if (end === -1) {
      end = document.cookie.length
    }
    return (document.cookie.substring(offset, end))
  }
}

router.beforeEach((to, from, next) => {
  if (to.name === 'login') {
    next()
  } else {
    if (!getCookie('no')) {
      console.log('login')
      next()
    } else {
      next()
    }
  }
})

Vue.http.interceptors.push((request, next) => {
  next((response) => {
    if (response.json() && response.json().code === 100070) {
      return console.log('login')
    }
    return response
  })
})

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
