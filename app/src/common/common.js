import Vue from 'vue'
import CryptoJS from "crypto-js"
import crypto from "crypto"
import { Indicator, Toast, MessageBox, DatetimePicker } from 'mint-ui'


let common = new Vue({
    data: {
        customerId: window.localStorage.ID,
        show: true,
        urlCommon: 'front',
        KEY: window.localStorage.KEY,
        SID: window.localStorage.SID,
        difTime: window.localStorage.difTime,
        servicePhone:'',
        apiUrl: {
            list: '/static/data/list.json',
            market_list: '/static/data/market_list.json',
            drug_table_list: '/static/data/drug_table_list.json',
            drug_information_list: '/static/data/drug_information_list.json',
            login: '/account/login.do',
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
            return url + ';jsessionid=' + this.SID;
        },
        getDate() {
            let _self = this;
            this.$http.get(this.urlCommon + this.apiUrl.getDate).then((response) => {
                if (response.data.code == '1c01') {
                    var timestamp = Date.parse(new Date());
                    window.localStorage.difTime = response.data.biz_result.time - timestamp;
                    _self.difTime = window.localStorage.difTime;
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

common.$on('translateDate', (result, todos) => {
    for (var i = 0; i < result.length; i++) {
        var item = result[i];
        var duedate = item.duedate;
        var pubdate = item.pubdate;
        if (duedate != '') duedate = duedate.substring(0, 10);
        if (pubdate != '') pubdate = pubdate.substring(0, 10);
        item.duedate = duedate;
        item.pubdate = pubdate;
        if (duedate != '' && pubdate != '') {
            duedate = duedate.replace(/-/g, '/');
            pubdate = pubdate.replace(/-/g, '/');
            var duedateDate = new Date(duedate);
            var pubdateDate = new Date(pubdate);
            var dateValue = duedateDate.getTime() - pubdateDate.getTime();
            var days = Math.floor(dateValue / (24 * 3600 * 1000));
            item.days = Number(days);
        } else {
            item.days = '';
        }
        todos.push(item);
    }
})

common.$on('translateDays',(item,obj) => {  //针对单一的对苹果求天数
        var duedate = item.duedate;
        var pubdate = item.pubdate;
        if (duedate != '') duedate = duedate.substring(0, 10);
        if (pubdate != '') pubdate = pubdate.substring(0, 10);
        item.duedate = duedate;
        item.pubdate = pubdate;
        if (duedate != '' && pubdate != '') {
            duedate = duedate.replace(/-/g, '/');
            pubdate = pubdate.replace(/-/g, '/');
            var duedateDate = new Date(duedate);
            var pubdateDate = new Date(pubdate);
            var dateValue = duedateDate.getTime() - pubdateDate.getTime();
            var days = Math.floor(dateValue / (24 * 3600 * 1000));
            item.days = Number(days);
        } else {
            item.days = '';
        }
        obj = item;
})

common.$on("translatePubdate", (result, todos) => {
    for (var i = 0; i < result.length; i++) {
        var item = result[i];
        var onSell = item.onSell;
        var pubdate = item.pubdate;
        var duedate = item.duedate;
        if (duedate != '') duedate = duedate.substring(0, 10);
        if (pubdate != '') pubdate = pubdate.substring(0, 10);
        if (onSell == 1) {
            onSell = '待审核'
        } else if (onSell == 2) {
            onSell = '正在匹配买家'
        } else {
            onSell = ''
        }
        item.pubdate = pubdate;
        item.onSell = onSell;
        if (duedate != '' && pubdate != '') {
            duedate = duedate.replace(/-/g, '/');
            pubdate = pubdate.replace(/-/g, '/');
            var duedateDate = new Date(duedate);
            var pubdateDate = new Date(pubdate);
            var dateValue = duedateDate.getTime() - pubdateDate.getTime();
            var days = Math.floor(dateValue / (24 * 3600 * 1000));
            item.days = Number(days);
        } else {
            item.days = '';
        }
        todos.push(item);
    }
})

common.$on('setParam', (key, value) => {
    common.pageParam[key] = value;
})

module.exports = common;
