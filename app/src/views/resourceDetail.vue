<template>
    <div class="content resource_detail whole">
        <mt-header fixed title="资源详情">
            <router-link to="" slot="left">
                <mt-button icon="back" @click="back()"></mt-button>
            </router-link>
        </mt-header>
        <div class="page-loadmore-wrapper">
            <mt-loadmore>
                <div class="swipe_height" v-if="obj.image">
                    <swiper :options="swiperOption" class="swipe_height">
                        <swiper-slide v-for="item in obj.image">
                            <div class="img_content">
                                <img v-bind:src="item">
                            </div>
                        </swiper-slide>
                    </swiper>
                    <div class="swipe_number"><span>{{number}}</span>/{{obj.image.length}}</div>
                </div>
                <div class="top">
                    <p>发布时间：<span>{{obj.pubdate}}</span></p>
                    <img src="/static/icons/xique.gif" v-show="imageShow">
                    <img src="/static/icons/xique.png" v-show="!imageShow">
                </div>
                <div class="center">
                    <div class="title">
                        <img src="/static/icons/impatient.png">
                        <p>{{obj.breedName}}</p>
                        <p class="price_right"><span>{{obj.price}}</span>元/kg</p>
                    </div>
                    <div class="detail ">
                        <p>产地：<span>{{obj.location}}</span></p>
                        <p class="right">规格：<span>{{obj.spec}}</span></p>
                    </div>
                    <div class="detail">
                        <p>库存：<span>{{obj.number}}kg</span></p>
                        <p class="right">起订量：<span>{{obj.moq}}kg</span></p>
                    </div class="detail">
                    <div class="detail">
                        <p>样品：<span v-if="obj.sampling == 0">不提供</span><span v-if="obj.sampling == 1">提供</span></p>
                    </div>
                    <div class="detail">
                        <p>卖点：<span>{{obj.description}}</span></p>
                    </div>
                </div>
            </mt-loadmore>
        </div>
        <div class="fix_bottom">
            <div class="attention">
                <telAndAttention :obj='obj'></telAndAttention>
            </div>
            <button class="mint-button mint-button--primary mint-button--normal disabled_button" disabled="true" v-if="!obj.sampling">无样品</button>
            <button class="mint-button mint-button--primary mint-button--normal orange_button" v-if="obj.sampling" @click="jumpBuy(obj.id)">购买样品</button>
            <button class="mint-button mint-button--primary mint-button--normal orange_button" @click="jump(obj.id)">立即购买</button>
        </div>
    </div>
</template>
<script>
import common from '../common/common.js'
import httpService from '../common/httpService.js'
import telAndAttention from '../components/tools/telAndAttention'
import {
    swiper,
    swiperSlide,
    swiperPlugins
} from 'vue-awesome-swiper'
export default {
    data() {
            let _self = this;
            return {
                number: 0,
                obj: {},
                id: '',
                swiperOption: {
                    name: 'currentSwiper',
                    autoplay: 3000,
                    setWrapperSize: true,
                    debugger: true,
                    loop: true,
                    autoplayDisableOnInteraction: false,
                    onTransitionStart: function(swiper) {
                        console.log(swiper.realIndex);
                        _self.number = parseInt(swiper.realIndex) + 1;
                    }
                }
            }
        },
        components: {
            swiper,
            swiperSlide,
            telAndAttention
        },
        methods: {
            refurbish(id) {
                let _self = this;
                common.$emit('show-load');
                let url = common.urlCommon + common.apiUrl.most;
                let body = {
                    biz_module: 'intentionService',
                    biz_method: 'queryIntentionInfo',
                    biz_param: {
                        id: id
                    }
                }
                if (common.customerId) {
                    url = common.addSID(common.urlCommon + common.apiUrl.most);
                    body.version = 1;
                    body.time = Date.parse(new Date()) + parseInt(common.difTime);
                    body.sign = common.getSign('biz_module=' + body.biz_module + '&biz_method=' + body.biz_method + '&time=' + body.time);
                }
                httpService.myAttention(url, body, function(suc) {
                    common.$emit('close-load');
                    common.$emit('message', suc.data.msg);
                    _self.obj = suc.data.biz_result;
                    console.log(_self.obj);
                    if (_self.obj.image.length == 0) {
                        _self.obj.image.push('/static/images/default_image.png');
                    }
                }, function(err) {
                    common.$emit('close-load');
                    common.$emit('message', err.data.msg);
                })
            },
            back() {
                this.$router.go(-1);
            },
            jump(id) {
                common.$emit('orderConfirm', id);
                this.$router.push('/orderConfirm/' + id);
            },
            jumpBuy(id) {
                common.$emit('orderConfirm', id);
                this.$router.push('/sampleConfirm/' + id);
            }
        },
        created() {
            let _self = this;
            var id = _self.$route.params.sourceId;
            _self.id = id;
            _self.refurbish(id);
            common.$on('resourceDetail', function(item) {
                _self.refurbish(item);
            })
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

.resource_detail .swipe_height .img_content {
    float: left;
    width: 100%;
    height: 160px;
}

.resource_detail .swipe_height img {
    width: 100%;
    margin-top: -80px;
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
    font-size: 14px;
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
    z-index: 2;
    width: 100%;
}

.resource_detail .fix_bottom .attention {
    float: left;
    width: 34%;
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
