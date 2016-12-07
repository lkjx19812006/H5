<template>
    <div class="content need_detail">
        <mt-header title="需求详情">
            <router-link to="" slot="left">
                <mt-button icon="back" @click="back()"></mt-button>
            </router-link>
        </mt-header>
        <div class="center">
            <div class="title">
                <img src="/static/icons/impatient.png">
                <p>人参</p>
            </div>
            <div class="detail ">
                <p>规格：<span>统货</span></p>
                <p class="right">发布时间：<span>2016-11-10</span></p>
            </div>
            <div class="detail">
                <p>产地：<span>安徽</span></p>
                <p class="right">剩余：<span>20天</span></p>
            </div class="detail">
            <div class="detail">
                <p>需求数量：<span>20kg</span></p>
            </div>
            <div class="detail">
                 <p>备注：<span>干度好，无走油，2015版药典标，干度好，无走油</span></p>
            </div>
            <div class="detail">
                <p>已报价：<span class="orange_font">12</span>人</p>
            </div>
            <div class="detail">
                <p>平均价格：<span class="orange_font">20.6元/kg</span></p>
            </div>
        </div>
        <div class="fix_bottom">
            <button class="mint-button mint-button--primary mint-button--normal small_button">
                <img src="/static/icons/tel.png">
                <p>电话</p>
            </button>
            <button class="mint-button mint-button--primary mint-button--normal small_button">
                <img src="/static/icons/follow.png">
                <p>关注</p>
            </button>
            <button class="mint-button mint-button--primary mint-button--normal orange_button">立即报价</button>
        </div>
    </div>
</template>
<script>
import common from '../common/common.js'
export default {
    data() {
            return {
                todos: [{
                    "name": "人参",
                    "spec": "统货",
                    "place": "东北",
                    "price": "98.9元/kg",
                    "up_price": "9元/kg",
                    "down_price": "9元/kg",
                    "phone": "15301546832",
                    "time": "12:26"
                }]
            }
        },
        methods: {
            back() {
                this.$router.go(-1);
            }
        },
        created() {
            let _self = this;
            common.$emit('show-load');
            this.$http.get(common.apiUrl.list).then((response) => {
                common.$emit('close-load');
                let data = response.data.biz_result.list;
                this.todos = data;
            }, (err) => {
                common.$emit('close-load');
                common.$emit('message', response.data.msg);
            });
        }

}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.need_detail {}

.need_detail .fix_bottom {
    position: fixed;
    bottom: 0;
    width: 100%;
}

.need_detail .fix_bottom .small_button {
    width: 17%;
    float: left;
    background: #EEEEEE;
    border: 1px solid #ddd;
}

.need_detail .fix_bottom .small_button img {
    max-height: 13px;
}

.need_detail .fix_bottom .small_button p {
    font-size: 10px;
    color: #333;
}

.need_detail .fix_bottom .orange_button {
    background: #EC6817;
    width: 66%;
    float: left;
}
.need_detail .center{
    padding: 20px;
    position: relative;
    background: #fff;
    float: left;
    width: 100%;
}
.need_detail .center .title{
    float: left;
    width: 100%;
    margin-bottom: 20px;
}

.need_detail .center .title img{
    float: left;
    max-height:40px;
    height: 1.7rem; 
}
.need_detail .center .title p{
    float: left;
    margin-left: 10px;
    font-size: 1.8rem;
    line-height: 1.7rem;
    color: #333;

}

.need_detail .detail{
    float: left;
    width: 100%;
    margin-bottom: 15px;
    text-align: left;
}

.need_detail .detail p{
    float: left;
}

.need_detail .detail p span{
    color: #666;
    font-size: 1.1rem;
}
.need_detail .detail .right{
    float: right;
}

.need_detail .detail p .orange_font{
    color: #EC6817;
}
</style>
