<template>
    <div>
     <mt-header fixed title="固定在顶部">
           <router-link to="/" slot="left">
          <mt-button icon="back">北京</mt-button>
        </router-link>
     </mt-header>
        <div class="page-swipe">
            <mt-swipe :auto="4000">
                <mt-swipe-item>
                    <img src="/static/images/1.jpg">
                </mt-swipe-item>
                <mt-swipe-item>
                    <img src="/static/images/2.jpg">
                </mt-swipe-item>
                <mt-swipe-item>
                    <img src="/static/images/3.jpg">
                </mt-swipe-item>
            </mt-swipe>
        </div>
    </div>
</template>
<script>
import common from '../../common/common.js'
export default {
    data() {
            return {
                msg: 'Welcome to Your Vue.js App',
                listData: {}
            }
        },
        created() {
            common.$emit('show-load');
            let _self = this;
            this.$http.get(common.apiUrl.list).then((response) => {
                console.log(response.data);
                common.$emit('close-load');
                _self.listData = response.data.biz_result;

            }, (err) => {
                console.log(err);
                common.$emit('close-load');
                common.$emit('message', response.data.msg);
            });
        }
}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.mint-swipe {
    height: 200px;
    color: #fff;
    font-size: 30px;
    text-align: center;
    margin-bottom: 20px;
}

.mint-swipe-item {
    line-height: 200px;
}

img {
    width: 100%;
}
</style>
