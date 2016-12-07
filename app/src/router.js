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
import payMoney from './views/payMoney'
import needDetail from './views/needDetail'
import resourceDetail from './views/resourceDetail'
import myAttention from './views/myAttention'
import myResource from './views/myResource'
import register from './views/register'
import needReleaseSuccess from './views/needReleaseSuccess'
import supplyReleaseSuccess from './views/supplyReleaseSuccess'
import orderConfirm from './views/orderConfirm'
import sampleConfirm from './views/sampleConfirm'

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
        { name: 'orderConfirm', path: '/orderConfirm/:sourceId', component: orderConfirm },
        { name: 'sampleConfirm', path: '/sampleConfirm/:sourceId', component: sampleConfirm },
        { path: '*', redirect: '/home' }
    ]
}
