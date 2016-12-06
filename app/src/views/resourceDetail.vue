<template>
    <div class="content resource_detail">
        <mt-header title="资源详情">
            <router-link to="" slot="left">
                <mt-button icon="back" @click="back()"></mt-button>
            </router-link>
        </mt-header>
        <div class="swipe_height">
            <swiper :options="swiperOption" class="swipe_height">
                <swiper-slide v-for="(item,index) in imgArray">
                    <div>
                        <img v-bind:src="item.url">
                    </div>
                </swiper-slide>
            </swiper>
            <div class="swipe_number"><span>{{number}}</span>/{{imgArray.length}}</div>
        </div>
        <div class="top">
            <p>发布时间：<span>2016-11-10</span></p>
            <img src="/static/icons/xique.gif" v-show="imageShow">
            <img src="/static/icons/xique.png" v-show="!imageShow">
        </div>
        <div class="center">
            <div class="title">
                <img src="/static/icons/impatient.png">
                <p>人参</p>
                <p class="price_right"><span>65</span>元/kg</p>
            </div>
            <div class="detail ">
                <p>产地：<span>安徽</span></p>
                <p class="right">规格：<span>统货</span></p>
            </div>
            <div class="detail">
                <p>库存：<span>100kg</span></p>
                <p class="right">起订量：<span>20kg</span></p>
            </div class="detail">
            <div class="detail">
                <p>样品：<span v-if="showButton">不提供</span><span v-if="!showButton">提供</span></p>
            </div>
            <div class="detail">
                <p>卖点：<span>干度好，无走油，2015版药典标，干度好，无走油</span></p>
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
            <button class="mint-button mint-button--primary mint-button--normal disabled_button" disabled="true" v-if="showButton">无样品</button>
            <button class="mint-button mint-button--primary mint-button--normal orange_button" v-if="!showButton">购买样品</button>
            <button class="mint-button mint-button--primary mint-button--normal orange_button">立即购买</button>
        </div>
    </div>
</template>
<script>
import common from '../common/common.js'
import {
    swiper,
    swiperSlide,
    swiperPlugins
} from 'vue-awesome-swiper'
export default {
    data() {
            let _self = this;
            return {
                imgArray: [{
                    url: '/static/images/1.jpg'
                }, {
                    url: '/static/images/2.jpg'
                }, {
                    url: '/static/images/3.jpg'
                }],
                todos: [{
                    "name": "人参",
                    "spec": "统货",
                    "place": "东北",
                    "price": "98.9元/kg",
                    "up_price": "9元/kg",
                    "down_price": "9元/kg",
                    "phone": "15301546832",
                    "time": "12:26"
                }],
                showButton: true,
                imageShow: true,
                number: 0,
                swiperOption: {
                    name: 'currentSwiper',
                    autoplay: 3000,
                    setWrapperSize: true,
                    debugger: true,
                    loop: true,
                    autoplayDisableOnInteraction: false,
                    onTransitionStart: function(swiper) {
                        _self.number = parseInt(swiper.realIndex) + 1;
                    }
                }
            }
        },
        components: {
            swiper,
            swiperSlide
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

            _self.time = setTimeout(() => {
                _self.imageShow = false;
            }, 2450);
        }
}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.resource_detail {}

.resource_detail .swipe_height {
    height: 16rem;
    max-height: 160px;
    position: relative;
}

.resource_detail .swipe_height img {
    width: 100%;
}

.resource_detail .swipe_height .swipe_number {
    position: absolute;
    right: 10px;
    z-index: 99;
    bottom: 10px;
    color: #fff;
    opacity: 0.5;
    background: #000;
    padding: 2px 12px;
    border-radius: 10px;
}

.resource_detail .swipe_height .swipe_number span {
    color: #FA6705;
    font-size: 1.1rem;
}

.resource_detail .top {
    float: left;
    width: 100%;
    background: #fff;
    padding: 10px;
    margin-bottom: 10px;
}

.resource_detail .top p {
    float: left;
    color: #333;
    font-size: 1.1rem;
    margin-top: 10px;
}

.resource_detail .top img {
    float: right;
    height: 2rem;
    max-height: 40px;
    margin-right: 10px;
}

.resource_detail .fix_bottom {
    position: fixed;
    bottom: 0;
    width: 100%;
}

.resource_detail .fix_bottom .small_button {
    width: 17%;
    float: left;
    background: #EEEEEE;
    border: 1px solid #ddd;
}

.resource_detail .fix_bottom .small_button img {
    max-height: 13px;
}

.resource_detail .fix_bottom .small_button p {
    font-size: 10px;
    color: #333;
}

.resource_detail .fix_bottom .orange_button {
    background: #EC6817;
    width: 33%;
    float: left;
}

.resource_detail .fix_bottom .disabled_button {
    background: #EEEEEE;
    width: 33%;
    float: left;
    color: #333;
    border: 1px solid #ddd;
}

.resource_detail .center {
    padding: 20px;
    position: relative;
    background: #fff;
    float: left;
    width: 100%;
}

.resource_detail .center .title {
    float: left;
    width: 100%;
    margin-bottom: 20px;
}

.resource_detail .center .title img {
    float: left;
    max-height: 40px;
    height: 1.7rem;
}

.resource_detail .center .title p {
    float: left;
    margin-left: 10px;
    font-size: 1.4rem;
    line-height: 1.7rem;
    color: #333;
}

.resource_detail .center .title .price_right {
    float: right;
    color: #EC6817;
}

.resource_detail .center .title .price_right span {
    font-size: 1.8rem;
    font-weight: 500;
}

.resource_detail .detail {
    float: left;
    width: 100%;
    margin-bottom: 15px;
    text-align: left;
}

.resource_detail .detail p {
    float: left;
}

.resource_detail .detail p span {
    color: #666;
    font-size: 1.1rem;
}

.resource_detail .detail .right {
    float: right;
}

.resource_detail .detail p .orange_font {
    color: #EC6817;
}
</style>
