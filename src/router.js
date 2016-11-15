import login from './views/login'
import hello from './components/Hello'
import main from './views/main'
import menu from './components/menu'

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
    { path: '*', redirect: '/login' }
  ]
}
