<template>
    <div class="protocol">
        
    </div>
</template>
<script>
import common from '../common/common.js'
import httpService from '../common/httpService.js'
export default {
    data() {
            return {
                show: true,
                param:''
            }
        },
        methods: {
            isWeiXin() {
                var ua = window.navigator.userAgent.toLowerCase();
                if (ua.match(/MicroMessenger/i) == 'micromessenger') {
                    this.show = true;
                } else {
                    this.show = false;
                }
            },
            getUrl() {
                let _self = this;
                common.$emit('show-load');
                let url = common.urlCommon + common.apiUrl.most;
                let body = {
                    biz_module: 'weiXinService',
                    biz_method: 'getWeiXinCodeUrl',
                    biz_param: {
                        url:'http://apps.yaocaimaimai.com/htm5/#/wchatLogin',
                        state:'wchat_login'
                    }
                };
                body.time = Date.parse(new Date()) + parseInt(common.difTime);
                body.sign = common.getSign('biz_module=' + body.biz_module + '&biz_method=' + body.biz_method + '&time=' + body.time);
                httpService.begBuyList(url, body, function(suc) {
                    common.$emit('close-load');
                    //_self.param = suc.data.biz_result;
                    window.location.href = suc.data.biz_result.wxUrl;
                }, function(err) {
                    common.$emit('close-load');
                })
            }
        },
        created() {

            // this.isWeiXin();
            // if (this.show) {
            //     let url = window.location.href;
            //     let behind = url.split('?code=')[1];
            //     let state = behind.split('&state=')[1];
            //     let code = behind.split('&')[0];
            // }
            // let _self = this;
            // this.isWeiXin();
            // if(this.show){
            //     _self.getUrl();
                
            // }
            
            let a = [];
            let b = [1,2,3,4];
            a.push.apply(a,b);
            console.log(a);
            //1234
            b.forEach(function(value,index,array){
                array[index] = value + 1;
            })
            console.log(1,b)
            //2345

            
        }
}
</script>
<style scoped>
</style>
