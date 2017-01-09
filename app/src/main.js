import Vue from 'vue'
import App from './App'
import VueRouter from 'vue-router'
import configRouter from './router'
import VueResource from 'vue-resource'
import Mint from 'mint-ui'
import 'mint-ui/lib/style.css'
import './assets/css/style.css'

document.addEventListener('DOMContentLoaded', function() {
  if (window.FastClick) window.FastClick.attach(document.body);
}, false);

Vue.use(Mint);
Vue.use(VueRouter)
Vue.use(VueResource)

Vue.config.debug = true


document.getElementsByTagName("html")[0].style.fontSize=Math.floor(document.documentElement.clientWidth*100000/32)/100000+"px";
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

let indexScrollTop = 0;
router.beforeEach((to, from, next) => {

  if (to.path !== '/home') {
    indexScrollTop = document.body.scrollTop;
  }

  console.log(to.path);

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

router.afterEach(route => {
  console.log(route.path);
  if (route.path !== '/home') {
    document.body.scrollTop = 0;
  } else {
    console.log(indexScrollTop);
    Vue.nextTick(() => {
      document.body.scrollTop = indexScrollTop;
    });
  }
});


Vue.http.interceptors.push((request, next) => {
  next((response) => {
    console.log(response.status)

    if (response.status==403) {
      return router.push('/login');
    }

    return response
  })
})








new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
