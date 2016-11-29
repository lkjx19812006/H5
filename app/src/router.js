import login from './views/login'
import hello from './components/Hello'
import main from './views/main'
import menu from './components/menu'
import home from './views/home'
import drugResTable from './views/drugResTable'
import marketQuotation from './views/marketQuotation'
import mySupply from './views/mySupply'
import myDemond from './views/myDemond'
import drugResTableNav from './views/drugResTableNav'



module.exports = {
  mode: 'hash',
  base: __dirname,
  routes: [
    { name: 'login', path: '/login', component: login },
    { name: 'main',
      path: '/main',
      component: main,
      children: [
          { name: 'hello', path: '/hello', component: hello },
          { name: 'menu', path: '/menu', component: menu }
      ]
    },
    { name: 'home', path: '/home', component: home },
    { name: 'drugResTable', path: '/drugResTable', component: drugResTable },
    { name: 'marketQuotation', path: '/marketQuotation', component: marketQuotation },
    { name: 'mySupply', path: '/mySupply', component: mySupply },
    { name: 'myDemond', path: '/myDemond', component: myDemond },
    { name: 'drugResTableNav', path: '/drugResTableNav', component: drugResTableNav },
    { path: '*', redirect: '/home' }
  ]
}
