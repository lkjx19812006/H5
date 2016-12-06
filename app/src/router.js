import login from './views/login'
import hello from './components/Hello'
import main from './views/main'
import menu from './components/menu'
import home from './views/home'
import drugResTable from './views/drugResTable'
import marketQuotation from './views/marketQuotation'
import supplyRelease from './views/supplyRelease'
import needRelease from './views/needRelease'
import provenanceSelection from './views/provenanceSelection'
import accountInfo from './views/accountInfo'
import accountInfoFinish from './views/accountInfoFinish'
import drugResTableDetail from './views/drugResTableDetail'
import transaction from './views/transaction'
import search from './views/search'
import lowPriceRes from './views/lowPriceRes'
import urgentNeed from './views/urgentNeed'
<<<<<<< HEAD
import myAttention from './views/myAttention'
import myResource from './views/myResource'
import register from './views/register'
import findPassWord from './views/findPassWord'
import mySet from './views/mySet'
import revisePassWord from './views/revisePassWord'
import revisePassWordConfirm  from './views/revisePassWordConfirm'
import addressManage from './views/addressManage'
import addressRevise from './views/addressRevise'
import feedBack from './views/feedBack'
import myOrder from './views/myOrder'



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
    { name: 'myAttention', path: '/myAttention', component: myAttention },
    { name: 'myResource', path: '/myResource', component: myResource },
    { name: 'register', path: '/register', component: register },
    { name: 'findPassWord', path: '/findPassWord', component: findPassWord },
    { name: 'mySet', path: '/mySet', component: mySet },
    { name: 'revisePassWord', path: '/revisePassWord', component: revisePassWord },
    { name: 'revisePassWordConfirm', path: '/revisePassWordConfirm', component: revisePassWordConfirm },
    { name: 'addressManage', path: '/addressManage', component: addressManage },
    { name: 'addressRevise', path: '/addressRevise', component: addressRevise },
    { name: 'feedBack', path: '/feedBack', component: feedBack },
    { name: 'myOrder', path: '/myOrder', component: myOrder },
    { path: '*', redirect: '/home' }
  ]
=======
import payMoney from './views/payMoney'
import needDetail from './views/needDetail'
import resourceDetail from './views/resourceDetail'
import myAttention from './views/myAttention'
import myResource from './views/myResource'
import register from './views/register'
import needReleaseSuccess from './views/needReleaseSuccess'
import supplyReleaseSuccess from './views/supplyReleaseSuccess'

module.exports = {
    mode: 'hash',
    base: __dirname,
    routes: [
        { name: 'login', path: '/login', component: login }, {
            name: 'main',
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
        { name: 'supplyRelease', path: '/supplyRelease', component: supplyRelease },
        { name: 'needRelease', path: '/needRelease', component: needRelease },
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
        { name: 'myAttention', path: '/myAttention', component: myAttention },
        { name: 'myResource', path: '/myResource', component: myResource },
        { name: 'register', path: '/register', component: register },
        { name: 'needReleaseSuccess', path: '/needReleaseSuccess', component: needReleaseSuccess },
        { name: 'supplyReleaseSuccess', path: '/supplyReleaseSuccess', component: supplyReleaseSuccess },
        { path: '*', redirect: '/home' }
    ]
>>>>>>> ae1d5b00e4edfeb8ea58bcb61f8bf1ba3aaa14f3
}
