import Vue from 'vue'
import Vuex from 'vuex'
import cart from './modules/cart'
import user from './modules/user'
import release from './modules/release'
import authen from './modules/authen'
Vue.use(Vuex)

const debug = process.env.NODE_ENV !== 'production'

export default new Vuex.Store({
    modules: {
        cart,
        user,
        release,
        authen
    },
    strict: debug
})
