import Vue from 'vue'
import { Indicator, Toast, MessageBox } from 'mint-ui'

let common = new Vue({
    data: {
        show: true,
        apiUrl:{
            list:'/static/data/list.json',
            market_list:'/static/data/market_list.json',
            drug_table_list:'/static/data/drug_table_list.json'
        }
    }
})

common.$on('show-load', () => {
    Indicator.open('Loading...');

})

common.$on('close-load', () => {
    Indicator.close();
})

common.$on('success',() => {
    Toast({
        message: '操作成功',
        iconClass: 'icon icon-success'
    });
})

common.$on('message', message => {
    Toast(message);
})

common.$on('confirm', () => {
    MessageBox.confirm('确定执行此操作?').then(action => {
        console.log(action);
    }, action => {
        console.log(action)
    });

})

module.exports = common;
