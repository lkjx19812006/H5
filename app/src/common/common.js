import Vue from 'vue'
import CryptoJS from "crypto-js"
import crypto from "crypto"
import { Indicator, Toast, MessageBox, DatetimePicker } from 'mint-ui'






let common = new Vue({
    data: {
        show: true,

        urlCommon: 'front',

        KEY: window.localStorage.KEY,
        SID: window.localStorage.SID,
        difTime: window.localStorage.difTime,
        apiUrl: {
            list: '/static/data/list.json',
            market_list: '/static/data/market_list.json',
            drug_table_list: '/static/data/drug_table_list.json',
            drug_information_list: '/static/data/drug_information_list.json',
            login: '/account/login.do',
            getDate: '/system/date.do',

            most:'/handle/control.do'

        }
    },
    methods: {
        addSID(url) {

            return url + ';jsessionid=' + this.SID;
        },
        getDate() {
            let _self = this;
            this.$http.get(this.urlCommon + this.apiUrl.getDate).then((response) => {
                if (response.data.code == '1c01') {
                    var timestamp = Date.parse(new Date());
                    console.log(timestamp);
                    console.log(response.data.biz_result.time);
                    window.localStorage.difTime = response.data.biz_result.time - timestamp;
                    _self.difTime = window.localStorage.difTime;
                }
            }, (err) => {
                common.$emit('message', err.data.msg);
            });
        },
        getSign(str) {
            let _self = this;

            let signStr = CryptoJS.HmacSHA1(str,_self.KEY).toString(CryptoJS.enc.Base64);
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
    Toast({
        message: message,
        duration: 2000
    });
})

common.$on('confirm', (confirmButtonText, cancelButtonText, message, title) => {
    MessageBox({
        showCancelButton: true,
        confirmButtonText: confirmButtonText,
        cancelButtonText: cancelButtonText,
        message: message,
        title: title
    });
})



module.exports = common;
