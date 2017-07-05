import login from './views/login'
import hello from './components/Hello'
import menu from './components/menu'
import home from './views/home'
import drugResTable from './views/drugResTable'
import marketQuotation from './views/marketQuotation'
import provenanceSelection from './views/provenanceSelection'
import drugResTableDetail from './views/drugResTableDetail'
import transaction from './views/transaction'
import search from './views/search'
import lowPriceRes from './views/lowPriceRes'
import urgentNeed from './views/urgentNeed'
import myAttention from './views/myAttention'
import myResource from './views/myResource'
// import register from './views/register'
import findPassWord from './views/findPassWord'
import mySet from './views/mySet'
import revisePassWord from './views/revisePassWord'
import revisePassWordConfirm from './views/revisePassWordConfirm'
import addressManage from './views/addressManage'
import addressRevise from './views/addressRevise'
import feedBack from './views/feedBack'
import needDetail from './views/needDetail'
import resourceDetail from './views/resourceDetail'
import detailsPage from './views/detailsPage'
import goodDetail from './views/goodDetail'
import addAddress from './views/addAddress'
import myPurchase from './views/myPurchase'
import purchaseDetail from './views/purchaseDetail'
import companyAuthentication from './views/companyAuthentication'
import certification from './views/certification'
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
import protocol from './views/staticsView/protocol'
import tests from './views/staticsView/tests'
import wchatLogin from './views/staticsView/wchatLogin'
import releaseNeed from './views/myRelease/releaseNeed'
import releaseNeeds from './views/myRelease/releaseNeeds'
import releaseNeedSuccess from './views/myRelease/releaseNeedSuccess'
import releaseResource from './views/myRelease/releaseResource'
import releaseResourceSuccess from './views/myRelease/releaseResourceSuccess'
import offerDetail from './views/myOffer/offerDetail'
import needDetails from './views/myNeed/needDetails'
import myNeeds from './views/myNeed/myNeeds'
import myOffer from './views/myOffer/myOffer'
import releaseOffer from './views/myRelease/releaseOffer'
import register from './views/user/register'
import perfectObject from './views/user/perfectObject'
import perfectId from './views/user/perfectId'
import majorBusiness from './views/user/majorBusiness'
import message from './views/message/message'
import sayPriceNotice from './views/message/sayPriceNotice'
import orderNotice from './views/message/orderNotice'
import activityNotice from './views/message/activityNotice'
import intentionNotice from './views/message/intentionNotice'
import systemMessage from './views/message/systemMessage'

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
        { name: 'login', path: '/login', component: login },
        { name: 'news', path: '/news', component: news },
        { name: 'home', path: '/home', component: home },
        { name: 'drugResTable', path: '/drugResTable/:from', component: drugResTable },
        { name: 'marketQuotation', path: '/marketQuotation', component: marketQuotation },
        { name: 'provenanceSelection', path: '/provenanceSelection/:from', component: provenanceSelection },
        { name: 'drugResTableDetail', path: '/drugResTableDetail/:from/:drugId', component: drugResTableDetail },
        { name: 'transaction', path: '/transaction', component: transaction },
        { name: 'search', path: '/search', component: search },
        { name: 'lowPriceRes', path: '/lowPriceRes', component: lowPriceRes },
        { name: 'urgentNeed', path: '/urgentNeed', component: urgentNeed },
        { name: 'myAttention', path: '/myAttention', component: myAttention },
        { name: 'myResource', path: '/myResource', component: myResource },
        // { name: 'register', path: '/register', component: register },
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
        { name: 'areaName', path: '/areaName', component: areaName },
        { name: 'companyAuthentication', path: '/companyAuthentication', component: companyAuthentication },
        { name: 'certification', path: '/certification', component: certification },
        { name: 'myPurchase', path: '/myPurchase', component: myPurchase },
        { name: 'purchaseDetail', path: '/purchaseDetail/:rchaseId', component: purchaseDetail },
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
        { name: 'protocol', path: '/protocol', component: protocol },
        { name: 'tests', path: '/tests', component: tests },
        { name: 'wchatLogin', path: '/wchatLogin', component: wchatLogin },
        { name: 'releaseNeed', path: '/releaseNeed/:id', component: releaseNeed },
        { name: 'releaseNeeds', path: '/releaseNeeds/:id', component: releaseNeeds },
        { name: 'releaseNeedSuccess', path: '/releaseNeedSuccess/:id', component: releaseNeedSuccess },
        { name: 'releaseResource', path: '/releaseResource/:id', component: releaseResource },
        { name: 'releaseResourceSuccess', path: '/releaseResourceSuccess/:id', component: releaseResourceSuccess },
        { name: 'offerDetail', path: '/offerDetail/:id', component: offerDetail },
        { name: 'needDetails', path: '/needDetails/:id', component: needDetails },
        { name: 'myNeeds', path: '/myNeeds', component: myNeeds },
        { name: 'myOffer', path: '/myOffer', component: myOffer },
        { name: 'releaseOffer', path: '/releaseOffer/:id', component: releaseOffer },
        { name: 'register', path: '/register', component: register },
        { name: 'perfectObject', path: '/perfectObject', component: perfectObject },
        { name: 'perfectId', path: '/perfectId', component: perfectId },
        { name: 'majorBusiness', path: '/majorBusiness', component: majorBusiness },
        { name: 'message', path: '/message', component: message },
        { name: 'sayPriceNotice', path: '/sayPriceNotice', component: sayPriceNotice },
        { name: 'orderNotice', path: '/orderNotice', component: orderNotice },
        { name: 'activityNotice', path: '/activityNotice', component: activityNotice },
        { name: 'intentionNotice', path: '/intentionNotice', component: intentionNotice },
        { name: 'systemMessage', path: '/systemMessage', component: systemMessage },
        { path: '*', redirect: '/home' }
    ]
}
