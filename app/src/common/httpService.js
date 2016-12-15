import Vue from 'vue'


let httpService = new Vue({
    methods: {
        login(url, body, suc, err) {
            this.$http.post(url, body).then((response) => {
                suc(response);
            }, (response) => {
                err(response);
            });
        },
        register(url, body, suc, err) {
            this.$http.post(url, body).then((response) => {
                suc(response);
            }, (response) => {
                err(response);
            });
        },
        findPassWord(url, body, suc, err){
            this.$http.post(url, body).then((response) => {
                suc(response);
            }, (response) => {
                err(response);
            });
        },
        revisePassWord(url, body, suc, err){
            this.$http.post(url, body).then((response) => {
                suc(response);
            }, (response) => {
                err(response);
            });
        },
        queryUserInfo(url, body, suc, err) {
            this.$http.post(url, body).then((response) => {
                suc(response);
            }, (res) => {
                err(res);
            });
        },
        queryEmployeeInfo(url, body, suc, err){
            this.$http.post(url, body).then((response) => {
                suc(response);
            }, (res) => {
                err(res);
            });
        },
        myAttention(url, body, suc, err){
            this.$http.post(url, body).then((response) => {
                suc(response);
            }, (res) => {
                err(res);
            });
        },
        myResource(url, body, suc, err){
            this.$http.post(url, body).then((response) => {
                suc(response);
            }, (res) => {
                err(res);
            });
        },
        lowPriceRes(url, body, suc, err){
            this.$http.post(url, body).then((response) => {
                suc(response);
            }, (res) => {
                err(res);
            });
        },
        put(url) {

        },
        del(url) {

        }
    }
})



module.exports = httpService;
