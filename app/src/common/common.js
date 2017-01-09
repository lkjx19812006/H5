import Vue from 'vue'
import CryptoJS from "crypto-js"
import crypto from "crypto"
import { Indicator, Toast, MessageBox, DatetimePicker } from 'mint-ui'

//百度统计代码
var _hmt = _hmt || [];
(function() {
  var hm = document.createElement("script");
  hm.src = "https://hm.baidu.com/hm.js?77f09e26962559dd888e83b1dcf882a0";
  var s = document.getElementsByTagName("script")[0]; 
  s.parentNode.insertBefore(hm, s);
})();

let common = new Vue({
    data: {
        customerId: window.localStorage.ID,
        show: true,
        urlCommon: 'front',
        KEY: window.localStorage.KEY,
        SID: window.localStorage.SID,
        difTime: window.localStorage.difTime,
        servicePhone:'',
        appUrl:'http://a.app.qq.com/o/simple.jsp?pkgname=com.yaocaimaimai.yaocaimaimai',
        apiUrl: {
            list: '/static/data/list.json',
            market_list: '/static/data/market_list.json',
            drug_table_list: '/static/data/drug_table_list.json',
            drug_information_list: '/static/data/drug_information_list.json',
            login: '/account/login.do',
            code_login:'/account/verifiLogin.do',
            getDate: '/system/date.do',
            most: '/handle/control.do'
        },
        pageParam: {
            router: '',
            lowPrice: '',
            Urgentneed: '',
            myAttention: '',
            supplyRelease: '',
            reviseResource: '',
            addressId: '',
            postAddressObj: '',
            resourceId: '',
            Needrelease: '',
            backAddress: '',
            orderStatus:0
        }
    },
    methods: {
        addSID(url) {
            if(this.SID&&this.SID!=undefined){
              return url + ';jsessionid=' + this.SID;  
          }else{
            return url;
          }
            
        },
        getDate() {
            let _self = this;
            this.$http.get(this.urlCommon + this.apiUrl.getDate).then((response) => {
                if (response.data.code == '1c01') {
                    var timestamp = Date.parse(new Date());
                    window.localStorage.difTime = response.data.biz_result.time - timestamp;
                    _self.difTime = window.localStorage.difTime;
                    common.$emit('toMine');
                }
            }, (err) => {
                common.$emit('message', err.data.msg);
            });
        },
        getSign(str) {
            let _self = this;
            if (!_self.KEY) {
                _self.KEY = 'test';
            }
            if (!str) {
                str = 'test';
            }
            let signStr = CryptoJS.HmacSHA1(str, _self.KEY).toString(CryptoJS.enc.Base64);
            console.log(signStr);
            return signStr;
        }

    }
})

common.$on('show-load', () => {
    Indicator.open('Loading...');

})

common.$on('close-load', () => {
    Indicator.close();
})

common.$on('success', () => {
    Toast({
        message: '操作成功',
        iconClass: 'icon icon-success'
    });
})


common.$on('message', message => {
    if(!message){
        return;
    }
    Toast({
        message: message,
        duration: 2000
    });
})

/*common.$on('confirm', (confirmButtonText, cancelButtonText, message, title) => {
    MessageBox({
        showCancelButton: true,
        confirmButtonText: confirmButtonText,
        cancelButtonText: cancelButtonText,
        message: message,
        title: title
    });
   confirmButtonText, cancelButtonText, 
})*/
common.$on('confirm',(obj) => {
    MessageBox.confirm(obj.message, obj.title).then(action =>{
           obj.ensure();
    },action =>{
           
    })
})



common.$on('setParam', (key, value) => {
    common.pageParam[key] = value;
})

module.exports = common;
