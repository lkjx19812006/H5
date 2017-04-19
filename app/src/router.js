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
import drugResTableDetail from './views/drugResTableDetail'
import transaction from './views/transaction'
import search from './views/search'
import lowPriceRes from './views/lowPriceRes'
import urgentNeed from './views/urgentNeed'
import myAttention from './views/myAttention'
import myResource from './views/myResource'
import register from './views/register'
import findPassWord from './views/findPassWord'
import mySet from './views/mySet'
import revisePassWord from './views/revisePassWord'
import revisePassWordConfirm from './views/revisePassWordConfirm'
import addressManage from './views/addressManage'
import addressRevise from './views/addressRevise'
import feedBack from './views/feedBack'
import needDetail from './views/needDetail'
import resourceDetail from './views/resourceDetail'
import needReleaseSuccess from './views/needReleaseSuccess'
import supplyReleaseSuccess from './views/supplyReleaseSuccess'
import detailsPage from './views/detailsPage'
import goodDetail from './views/goodDetail'
import addAddress from './views/addAddress'
import myPurchase from './views/myPurchase'
import purchaseDetail from './views/purchaseDetail'
import companyAuthentication from './views/companyAuthentication'
import certification from './views/certification'
import reviseResource from './views/reviseResource'
import revisePurchase from './views/revisePurchase'
import cityName from './views/cityName'
import areaName from './views/areaName'
import aboutus from './views/aboutus'
import perfectInfo from './views/perfectInfo'
import requestCode from './views/requestCode'
import releaseSearch from './views/releaseSearch'
import news from './views/news'
import cart from './views/cart'
import multipleOrders from './views/multipleOrders'
import allOrder from './views/allOrder'
import allOrderDetail from './views/allOrderDetail'
import drugThat from './views/drugThat'
import account from './views/account'
import accountRevise from './views/accountRevise'
import subCompany from './views/subCompany'
import oneStopService from './views/oneStopService'
import fourAdvantages from './views/fourAdvantages'


const scrollBehavior = (to, from, savedPosition) => {
    console.log(savedPosition);
    if (savedPosition) {
        // savedPosition is only available for popstate navigations.
        return savedPosition
    } else {
        // new navigation.
        // scroll to anchor
        if (to.hash) {
            return { anchor: true }
        }
        // explicitly control scroll position
        // check if any matched route config has meta that requires scrolling to top
        if (to.matched.some(m => m.meta.scrollToTop)) {
            return { x: 0, y: 0 }
        }
    }
}

module.exports = {
    // mode: 'history',
    base: __dirname,
    // scrollBehavior,
    routes: [
        { name: 'login', path: '/login', component: login }, {
            name: 'main',
            path: '/main',
            component: main
        },
        { name: 'news', path: '/news', component: news },
        { name: 'home', path: '/home', component: home },
        { name: 'drugResTable', path: '/drugResTable/:from', component: drugResTable },
        { name: 'marketQuotation', path: '/marketQuotation', component: marketQuotation },
        { name: 'supplyRelease', path: '/supplyRelease', component: supplyRelease },
        { name: 'needRelease', path: '/needRelease', component: needRelease },
        { name: 'provenanceSelection', path: '/provenanceSelection/:from', component: provenanceSelection },
        { name: 'drugResTableDetail', path: '/drugResTableDetail/:from/:drugId', component: drugResTableDetail },
        { name: 'transaction', path: '/transaction', component: transaction },
        { name: 'search', path: '/search', component: search },
        { name: 'lowPriceRes', path: '/lowPriceRes', component: lowPriceRes },
        { name: 'urgentNeed', path: '/urgentNeed', component: urgentNeed },
        { name: 'myAttention', path: '/myAttention', component: myAttention },
        { name: 'myResource', path: '/myResource', component: myResource },
        { name: 'register', path: '/register', component: register },
        { name: 'findPassWord', path: '/findPassWord', component: findPassWord },
        { name: 'mySet', path: '/mySet', component: mySet },
        { name: 'detailsPage', path: '/detailsPage', component: detailsPage },
        { name: 'revisePassWord', path: '/revisePassWord', component: revisePassWord },
        { name: 'revisePassWordConfirm', path: '/revisePassWordConfirm', component: revisePassWordConfirm },
        { name: 'addressManage', path: '/addressManage', component: addressManage },
        { name: 'addressRevise', path: '/addressRevise/:addreId', component: addressRevise },
        { name: 'feedBack', path: '/feedBack', component: feedBack },
        { name: 'goodDetail', path: '/goodDetail/:odId', component: goodDetail },
        { name: 'addAddress', path: '/addAddress', component: addAddress },
        { name: 'cityName', path: '/cityName', component: cityName },
        { name: 'areaName', path: '/areaName', component: areaName },
        { name: 'revisePurchase', path: '/revisePurchase/:visePurId', component: revisePurchase },
        { name: 'reviseResource', path: '/reviseResource/:revId', component: reviseResource },
        { name: 'companyAuthentication', path: '/companyAuthentication', component: companyAuthentication },
        { name: 'certification', path: '/certification', component: certification },
        { name: 'myPurchase', path: '/myPurchase', component: myPurchase },
        { name: 'purchaseDetail', path: '/purchaseDetail/:rchaseId', component: purchaseDetail },
        { name: 'needReleaseSuccess', path: '/needReleaseSuccess/:needSucId', component: needReleaseSuccess },
        { name: 'supplyReleaseSuccess', path: '/supplyReleaseSuccess/:suppSucId', component: supplyReleaseSuccess },
        { name: 'needDetail', path: '/needDetail/:needId', component: needDetail },
        { name: 'resourceDetail', path: '/resourceDetail/:sourceId', component: resourceDetail },
        { name: 'aboutus', path: '/aboutus/:from', component: aboutus },
        { name: 'perfectInfo', path: '/perfectInfo', component: perfectInfo },
        { name: 'requestCode', path: '/requestCode', component: requestCode },
        { name: 'releaseSearch', path: '/releaseSearch', component: releaseSearch },
        { name: 'cart', path: '/cart', component: cart },
        { name: 'multipleOrders', path: '/multipleOrders', component: multipleOrders },
        { name: 'allOrder', path: '/allOrder', component: allOrder },
        { name: 'allOrderDetail', path: '/allOrderDetail/:allOrderId', component: allOrderDetail },
        { name: 'drugThat', path: '/drugThat/:from', component: drugThat },
        { name: 'account', path: '/account', component: account },
        { name: 'accountRevise', path: '/accountRevise/:id', component: accountRevise },
        { name: 'subCompany', path: '/subCompany', component: subCompany },
        { name: 'oneStopService', path: '/oneStopService', component: oneStopService },
        { name: 'fourAdvantages', path: '/fourAdvantages', component: fourAdvantages },
        { path: '*', redirect: '/home' }
    ]
}
