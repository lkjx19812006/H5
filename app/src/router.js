import login from './views/login'
import hello from './components/Hello'
import main from './views/main'
import menu from './components/menu'
import home from './views/home'
import drugResTable from './views/drugResTable'
import marketQuotation from './views/marketQuotation'
import mySupply from './views/mySupply'
import myDemond from './views/myDemond'
import provenanceSelection from './views/provenanceSelection'
import accountInfo from './views/accountInfo'
import accountInfoFinish from './views/accountInfoFinish'
import drugResTableDetail from './views/drugResTableDetail'
import transaction from './views/transaction'
import search from './views/search'
import lowPriceRes from './views/lowPriceRes'
import urgentNeed from './views/urgentNeed'
import payMoney from './views/payMoney'
import needDetail from './views/needDetail'
import resourceDetail from './views/resourceDetail'

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
    { name: 'provenanceSelection', path: '/provenanceSelection', component: provenanceSelection },
    { name: 'accountInfo', path: '/accountInfo', component: accountInfo },
    { name: 'accountInfoFinish', path: '/accountInfoFinish', component: accountInfoFinish },
    { name: 'drugResTableDetail', path: '/drugResTableDetail/:drugId', component: drugResTableDetail },
    { name: 'transaction', path: '/transaction', component: transaction },
    { name: 'search', path: '/search', component: search },
    { name: 'lowPriceRes', path: '/lowPriceRes', component: lowPriceRes },
    { name: 'urgentNeed', path: '/urgentNeed', component: urgentNeed },
    { name: 'payMoney', path: '/payMoney', component: payMoney },
    { name: 'needDetail', path: '/needDetail/:needId', component: needDetail },
    { name: 'resourceDetail', path: '/resourceDetail/:sourceId', component: resourceDetail },
    { path: '*', redirect: '/home' }
  ]
}
