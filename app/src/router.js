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
import myOrder from './views/myOrder'
import needDetail from './views/needDetail'
import resourceDetail from './views/resourceDetail'
import needReleaseSuccess from './views/needReleaseSuccess'
import supplyReleaseSuccess from './views/supplyReleaseSuccess'
import orderConfirm from './views/orderConfirm'
import sampleConfirm from './views/sampleConfirm'
import detailsPage from './views/detailsPage'
import myOrderDetail from './views/myOrderDetail'
import goodDetail from './views/goodDetail'
import addAddress from './views/addAddress'
import myPurchase from './views/myPurchase'
import purchaseDetail from './views/purchaseDetail'
import companyAuthentication from './views/companyAuthentication'
import certification from './views/certification'
import reviseResource from './views/reviseResource'
import revisePurchase from './views/revisePurchase'
import selectPlace from './views/selectPlace'
import cityName from './views/cityName'
import areaName from './views/areaName'

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
        { name: 'provenanceSelection', path: '/provenanceSelection/:from', component: provenanceSelection },
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
        { name: 'myOrderDetail', path: '/myOrderDetail/:OrdeId', component: myOrderDetail },
        { name: 'detailsPage', path: '/detailsPage', component: detailsPage },
        { name: 'revisePassWord', path: '/revisePassWord', component: revisePassWord },
        { name: 'revisePassWordConfirm', path: '/revisePassWordConfirm', component: revisePassWordConfirm },
        { name: 'addressManage', path: '/addressManage', component: addressManage },
        { name: 'addressRevise', path: '/addressRevise/:addreId', component: addressRevise },
        { name: 'feedBack', path: '/feedBack', component: feedBack },
        { name: 'goodDetail', path: '/goodDetail/:odId', component: goodDetail },
        { name: 'addAddress', path: '/addAddress', component: addAddress },
        { name: 'myOrder', path: '/myOrder', component: myOrder },
        { name: 'cityName', path: '/cityName', component: cityName },
        { name: 'areaName', path: '/areaName', component: areaName },
        { name: 'selectPlace', path: '/selectPlace', component: selectPlace },
        { name: 'revisePurchase', path: '/revisePurchase/:visePurId', component: revisePurchase },
        { name: 'reviseResource', path: '/reviseResource/:revId', component: reviseResource },
        { name: 'companyAuthentication', path: '/companyAuthentication', component: companyAuthentication },
        { name: 'certification', path: '/certification', component: certification },
        { name: 'myPurchase', path: '/myPurchase', component: myPurchase },
        { name: 'purchaseDetail', path: '/purchaseDetail/:rchaseId', component: purchaseDetail },
        { name: 'needReleaseSuccess', path: '/needReleaseSuccess/:needSucId', component: needReleaseSuccess },
        { name: 'supplyReleaseSuccess', path: '/supplyReleaseSuccess/:suppSucId', component: supplyReleaseSuccess },
        { name: 'orderConfirm', path: '/orderConfirm/:sourceId', component: orderConfirm },
        { name: 'sampleConfirm', path: '/sampleConfirm/:sourceId', component: sampleConfirm },
        { name: 'needDetail', path: '/needDetail/:needId', component: needDetail },
        { name: 'resourceDetail', path: '/resourceDetail/:sourceId', component: resourceDetail },
        { path: '*', redirect: '/home' }
    ]
}
