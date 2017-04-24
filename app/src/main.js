import Vue from 'vue'
import App from './App'
import VueRouter from 'vue-router'
import configRouter from './router'
import VueResource from 'vue-resource'
import Mint from 'mint-ui'
import 'mint-ui/lib/style.css'
import './assets/css/style.css'
import common from "./common/common"
import vueTap from 'v-tap'
import store from './store'

// import infiniteScroll from 'vue-infinite-scroll'


/*document.addEventListener('DOMContentLoaded', function() {
  if (window.FastClick) window.FastClick.attach(document.body);
}, false);*/

Vue.use(vueTap);
Vue.use(Mint);
Vue.use(VueRouter)
Vue.use(VueResource)
    // Vue.use(infiniteScroll)

Vue.config.debug = true

function isWeiXin() {
    var ua = window.navigator.userAgent.toLowerCase();
    if (ua.match(/MicroMessenger/i) == 'micromessenger') {
        return true;
    } else {
        return false;
    }
}

if (isWeiXin()) common.getWeixinSign(common.shareUrl);

document.getElementsByTagName("html")[0].style.fontSize = Math.floor(document.documentElement.clientWidth * 100000 / 32) / 100000 + "px";
const router = new VueRouter(
    configRouter // （缩写）相当于 routes: routes
)

function getCookie(name) {
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
    next(vm => {

    })
})

router.afterEach(route => {
    common.share();
    Vue.nextTick(() => {

    });
});


var u = navigator.userAgent;
var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Linux') > -1;
var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/);

if (isiOS) {
    /* function ios() {　
         var ifr = document.createElement("iframe");
         ifr.src = "YCMM://";
         ifr.style.display = "none";
         document.body.appendChild(ifr);
         window.setTimeout(function() {
             document.body.removeChild(ifr);
             window.location.href = "http://a.app.qq.com/o/simple.jsp?pkgname=com.yaocaimaimai.yaocaimaimai";
         }, 2000);
     }
     ios();*/
}

if (isAndroid) {
    function Android() {
        /*window.location = "mianguan://yaocaimaimai.yaocaimaimai";
        window.setTimeout(function() {
            window.location = "http://a.app.qq.com/o/simple.jsp?pkgname=com.yaocaimaimai.yaocaimaimai";
        }, 2000);*/
        /*var ifr = document.createElement("iframe");
        ifr.src = "mianguan://yaocaimaimai.yaocaimaimai";
        ifr.style.display = "none";
        document.body.appendChild(ifr);
        window.setTimeout(function() {
            document.body.removeChild(ifr);
            window.location.href = "http://a.app.qq.com/o/simple.jsp?pkgname=com.yaocaimaimai.yaocaimaimai";
        }, 2000);*/
    }
    Android();
}

Vue.http.interceptors.push((request, next) => {
    next((response) => {
        if (response.status == 403) {
            return router.push('/login');
        }

        return response
    })
})



new Vue({
    store,
    router,
    render: h => h(App)
}).$mount('#app')
