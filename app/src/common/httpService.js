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
        queryUserInfo(url, body, suc, err) {
            this.$http.post(url, body).then((response) => {
                suc(response);
            }, (res) => {
                err(res);
            });
        },
        getQiniuToken(url, body, suc, err) {
            this.$http.post(url, body).then((response) => {
                suc(response.data);
            }, (res) => {
                err(res);
            });
        }
    }
})



module.exports = httpService;
