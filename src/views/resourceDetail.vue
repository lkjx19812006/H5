<template>
    <div class="resource_detail" v-bind:class="{need_float:!my_param.show}">
        <div class="shade" v-if="choose.push_num"></div>
        <myHeader :param="param" v-show="!my_param.show"></myHeader>
        <div v-show="!my_param.show" class="box">
            <div class="page-loadmore-wrapper" ref="wrapper" :style="{ height: wrapperHeight + 'px' }">
                <mt-loadmore>
                    <div class="swipe_height" v-if="obj.image">
                        <mt-swipe :auto="4000" :show-indicators="false">
                            <mt-swipe-item v-for="(item,index) in obj.image">
                                <div @click="popUp(index,obj.image)" class="swipe_back">
                                    <img :src="item">
                                    <div class="index"><span>{{index + 1}}</span>/{{obj.image.length}}</div>
                                </div>
                            </mt-swipe-item>
                        </mt-swipe>
                    </div>
                    <div class="top">
                        <div class="title">
                            <img src="/static/icons/zheng.png" v-if="obj.especial == 1 && obj.type == 1">
                            <img src="/static/icons/sample.png" v-if="obj.sampling == 1 && obj.type == 1">
                            <p>{{obj.breedName}}</p>
                            <p class="price_right"><span>{{obj.price}}</span>元/{{obj.unit}}</p>
                        </div>
                    </div>
                    <div class="center_box">
                        <div class="center" v-if="obj.sampling == 1 && obj.type == 1">
                            <div class="choose_type">
                                <div class="large_cargo" :class="{ active: choose.isRed,'default':!choose.isRed }" @click="unchooseType()">大货</div>
                                <div class="sample_cargo" :class="{ active: !choose.isRed,'default':choose.isRed }" @click="chooseType()">样品</div>
                            </div>
                        </div>
                        <div class="center_content" v-if="choose.isRed">
                            <div class="detail">
                                <p>产地：<span>{{obj.location}}</span></p>
                                <p class="right">规格：<span>{{obj.spec}}</span></p>
                            </div>
                            <div class="detail">
                                <p>库存：<span>{{obj.number}}{{obj.unit}}</span></p>
                                <p class="right">起订量：<span>{{obj.moq}}{{obj.unit}}</span></p>
                            </div>
                            <div class="detail">
                                <p v-if="obj.sampling == 1">样品：<span>提供</span></p>
                                <p v-if="obj.sampling == 0">样品：<span>不提供</span></p>
                                <p class="right">上架时间：<span>{{obj.shelveTime | timeFormat}}</span></p>
                            </div>
                            <div class="detail">
                                <div class="sell_point">卖点：</div>
                                <div class="point_right">
                                    <span class="point_content">
                                        {{obj.quality}}
                                    </span>
                                </div>
                            </div>
                        </div>
                        <div class="center_content" v-if="!choose.isRed">
                            <div class="detail">
                                <p>产地：<span>{{obj.location}}</span></p>
                                <p class="right">规格：<span>{{obj.spec}}</span></p>
                            </div>
                            <div class="detail">
                                <p>库存：<span>{{obj.sampleNumber}}份</span></p>
                                <p class="right">起订量：<span>{{obj.moq}}份</span></p>
                            </div>
                            <div class="detail">
                                <p>样品：<span>提供</span></p>
                                <p class="right">上架时间：
                                    <span v-if="obj.shelveTime">{{obj.shelveTime | timeFormat}}</span>
                                    <span v-if="!obj.shelveTime">近期上架</span>
                                </p>
                            </div>
                            <div class="detail">
                                <div class="sell_point">卖点：</div>
                                <span>{{obj.quality}}</span>
                            </div>
                        </div>
                    </div>
                </mt-loadmore>
            </div>
        </div>
        <div class="fix_bottom" v-show="!my_param.show && obj.isMy == 0">
            <div class="attention">
                <telAndAttention :obj='obj'></telAndAttention>
            </div>
            <button class="mint-button orange_button" @click="pushCart(obj)">加入购物车</button>
            <button class="mint-button mint-button--primary mint-button--normal disabled_button" @click="jump(obj)">立即购买</button>
        </div>
        <!-- <div class="fix_bottom" v-show="!my_param.show && obj.isMy == 1">
            <button class="mint-button mint-button--primary mint-button--normal tel" v-on:click="call()">
                <img src="/static/icons/tel.png">
                <p>电话</p>
            </button>
        </div> -->
        <div class="choose" v-show="choose.push_num && obj.isMy == 0" v-bind:class="{swipe_active:choose.push_num,'swipe_default':!choose.push_num  }">
            <chooseNum :param="choose" v-on:addCart="addBuy(obj.id)"></chooseNum>
        </div>
        <popUpBigImg :param="my_param" v-show="my_param.show"></popUpBigImg>
    </div>
</template>
<script>
import common from '../common/common.js'
import httpService from '../common/httpService.js'
import myHeader from '../components/tools/myHeader'
import telAndAttention from '../components/tools/telAndAttention'
import chooseNum from '../components/tools/chooseNum'
import filters from '../filters/filters'
import popUpBigImg from '../components/tools/popUpBigImg'
import {
    mapGetters
} from 'vuex'
import {
    swiper,
    swiperSlide,
    swiperPlugins
} from 'vue-awesome-swiper'
export default {
    data() {
            let _self = this;
            return {
                phone: common.servicePhone,
                choose: {
                    value: 1,
                    isRed: true,
                    number: '',
                    sampleNumber: '',
                    push_num: false,
                },
                my_param: {
                    url: '',
                    show: false,
                    whole_height: ''
                },
                param: {
                    name: '商品详情',
                    topissue: true,
                    mycart: true
                },
                imageShow: true,
                number: 0,
                obj: {},
                id: '',
                swiperOption: {
                    name: 'currentSwiper',
                    autoplay: 3000,
                    setWrapperSize: true,
                    debugger: true,
                    loop: true,
                    autoHeight: true,
                    mousewheelControl: true,
                    autoplayDisableOnInteraction: false,
                    onTransitionStart: function(swiper) {
                        _self.number = parseInt(swiper.realIndex) + 1;
                    }
                }
            }
        },
        components: {
            swiper,
            swiperSlide,
            telAndAttention,
            myHeader,
            popUpBigImg,
            chooseNum
        },
        computed: {
            userInfor() {
                return this.$store.state.user.userInfor;
            }
        },
        methods: {
            popUp(index, imgArr) {
                this.my_param.url = imgArr;
                this.my_param.show = !this.my_param.show;
                this.my_param.whole_height = document.documentElement.clientHeight;
            },
            chooseType() {
                let _self = this;
                if (!_self.choose.push_num) {
                    _self.choose.isRed = false;
                }
            },
            unchooseType() {
                let _self = this;
                if (!_self.choose.push_num) {
                    _self.choose.isRed = true;
                }

            },
            addBuy(id) {
                let _self = this;
                if (common.pageParam.router == 'addCart') {
                    _self.addCart();
                }
                if (common.pageParam.router == 'atOnceBuy') {
                    _self.atOnceBuy(id);
                }
                _self.choose.push_num = false;
            },
            addCart() {
                let _self = this;
                var sample
                if (_self.choose.isRed) sample = 0;
                if (!_self.choose.isRed) sample = 1;
                common.$emit('show-load');
                let url = common.addSID(common.urlCommon + common.apiUrl.most);
                let body = {
                    biz_module: 'cartService',
                    biz_method: 'addToCart',
                    biz_param: {
                        breedName: _self.obj.breedName,
                        intentionId: _self.obj.id,
                        number: _self.choose.value,
                        sample: sample
                    }
                };
                body.time = Date.parse(new Date()) + parseInt(common.difTime);
                body.sign = common.getSign('biz_module=' + body.biz_module + '&biz_method=' + body.biz_method + '&time=' + body.time);
                httpService.addCart(url, body, function(suc) {
                        common.$emit('close-load');
                        common.$emit('message', suc.data.msg);
                    },
                    function(err) {
                        common.$emit('close-load');
                        common.$emit('message', err.data.msg);
                    })
            },
            atOnceBuy(id) {
                let _self = this;
                let arr = [];
                let allPrice = '';
                if (!_self.choose.value) {
                    common.$emit('message', '数量不能为空')
                    return
                }
                _self.obj.cartNumber = _self.choose.value;

                if (_self.choose.isRed) {
                    _self.obj.cartSample = 0;
                    allPrice = Number(_self.obj.price) * Number(_self.obj.cartNumber);
                } else if (!_self.choose.isRed) {
                    _self.obj.cartSample = 1;
                    allPrice = Number(_self.obj.sampleAmount) * Number(_self.obj.cartNumber);
                }
                arr.push(_self.obj);
                localStorage.setItem('cartContent', JSON.stringify(arr));
                localStorage.setItem('allPrice', JSON.stringify(allPrice));
                common.$emit('cartContent', arr);
                common.$emit('cartPrice', allPrice);
                _self.choose.push_num = false;
                common.$emit('setParam', 'clickEvent', id);
                _self.$router.push('/multipleOrders');
            },
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
                if (common.KEY) {
                    url = common.addSID(common.urlCommon + common.apiUrl.most);
                    body.version = 1;
                    body.time = Date.parse(new Date()) + parseInt(common.difTime);
                    body.sign = common.getSign('biz_module=' + body.biz_module + '&biz_method=' + body.biz_method + '&time=' + body.time);
                }
                httpService.myAttention(url, body, function(suc) {
                        common.$emit('close-load');
                        let result = suc.data.biz_result;
                        let shareData = common.shareParam;
                        if (suc.data.code == '1c01') {
                            _self.obj = result;
                            _self.choose.number = result.number;
                            _self.choose.sampleNumber = result.sampleNumber;
                            _self.choose.breedName = result.breedName;
                            _self.choose.price = result.price;
                            _self.choose.image = result.image[0];
                            _self.choose.unit = result.unit;
                            _self.choose.location = result.location;
                            _self.choose.moq = result.moq;
                            _self.choose.sampleAmount = result.sampleAmount;
                            _self.choose.sampleUnit = result.sampleUnit;
                            _self.choose.value = result.moq;
                            _self.param.id = result.id;
                            _self.param.isMy = result.isMy;
                            if (result.image && result.image.length > 0) {
                                shareData.imgUrl = result.image[0];
                            }
                            shareData.title = "【低价资源】" + result.breedName + "-上【药材买卖网】买我你就赚了！";
                            shareData.desc = result.breedName + ',规格:' + result.spec + ',剩余' + result.number + result.unit + '卖点：' + result.quality + '。--买卖药材就上药材买卖网！';
                            shareData.link = window.location.href;
                            common.share(shareData);
                        } else {
                            common.$emit('message', suc.data.msg);
                        }
                        if (_self.obj.image.length == 0) {
                            _self.obj.image.push('/static/images/default_image.png');
                        }
                    },
                    function(err) {
                        common.$emit('close-load');
                        common.$emit('message', err.data.msg);
                    })
            },
            back() {
                this.$router.go(-1);
            },
            jump(obj) {
                let _self = this;

                if (!common.KEY) {
                    function loadApp() {
                        common.$emit('back_login', {
                            id: obj.id,
                            isMy: _self.obj.isMy
                        });
                        common.$emit('setParam', 'backRouter', 'resourceDetail/' + obj.id);
                        if (common.wxshow) {
                            common.getWxUrl();
                        } else {
                            _self.$router.push('/login');
                        }
                    }
                    common.$emit('confirm', {
                        message: '请先登录',
                        title: '提示',
                        ensure: loadApp
                    });
                    return;
                } else if (_self.userInfor.userType == '0' || _self.userInfor.bizMain == '' || _self.userInfor.manageType == '-1') {
                    function perfect() {
                        _self.$store.dispatch('changeRouter', {
                            index: 4,
                            id: obj.id
                        })
                        console.log(21321313)
                        _self.$router.push('/perfectObject');
                    }
                    common.$emit('confirm', {
                        message: '请先完善信息',
                        title: '提示',
                        ensure: perfect
                    });
                    return;
                } else if (obj.isMy == 1) {
                    common.$emit('message', '您自己发布的资源不能进行购买！');
                    return
                }
                /*common.$emit('orderConfirm', {
                    id: id,
                    obj: _self.obj
                });
                this.$router.push('/orderConfirm/' + id);*/
                common.$emit('setParam', 'router', 'atOnceBuy');
                _self.choose.push_num = true;
            },
            jumpBuy(id) {
                let _self = this;
                if (!common.KEY) {
                    function loadApp() {
                        common.$emit('back_login', {
                            id: id,
                            isMy: _self.obj.isMy
                        });
                        common.$emit('setParam', 'backRouter', 'resourceDetails/' + id);
                        if (common.wxshow) {
                            common.getWxUrl();
                        } else {
                            _self.$router.push('/login');
                        }
                    }
                    common.$emit('confirm', {
                        message: '请先登录',
                        title: '提示',
                        ensure: loadApp
                    });
                    return;
                }
                common.$emit('sampleConfirm', id);
                this.$router.push('/sampleConfirm/' + id);
                //common.$emit('setParam', 'router', 'atOnceBuy');

            },
            pushCart(obj) {
                let _self = this;
                if (!common.KEY) {
                    function loadApp() {
                        common.$emit('back_login', {
                            id: obj.id,
                            isMy: _self.obj.isMy
                        });
                        common.$emit('setParam', 'backRouter', 'resourceDetail/' + obj.id);
                        if (common.wxshow) {
                            common.getWxUrl();
                        } else {
                            _self.$router.push('/login');
                        }
                    }
                    common.$emit('confirm', {
                        message: '请先登录',
                        title: '提示',
                        ensure: loadApp
                    });
                    return;
                } else if (_self.userInfor.userType == '0' || _self.userInfor.bizMain == '' || _self.userInfor.manageType == '-1') {
                    function perfect() {
                        _self.$store.dispatch('changeRouter', {
                            index: 4,
                            id: obj.id
                        })
                        _self.$router.push('/perfectObject');
                    }
                    common.$emit('confirm', {
                        message: '请先完善信息',
                        title: '提示',
                        ensure: perfect
                    });
                    return;
                } else if (obj.isMy == 1) {
                    common.$emit('message', '您自己发布的资源不能进行购买！');
                    return
                }
                common.$emit('setParam', 'router', 'addCart');
                //_self.choose.value = 1;
                _self.choose.push_num = true;
            },
            call() {
                window.location.href = "tel:" + this.phone;
            },
            getCustomerPhone() {
                let _self = this;
                this.$http.get(common.urlCommon + common.apiUrl.getDate).then((response) => {
                    if (response.data.code == '1c01') {
                        console.log(response.data);
                        common.servicePhone = response.data.biz_result.serviceMobile;
                        _self.phone = response.data.biz_result.serviceMobile;
                    }
                }, (err) => {
                    common.$emit('message', err.data.msg);
                });
            }
        },
        created() {
            let _self = this;
            if (!common.servicePhone) this.getCustomerPhone();
            let value = _self.$route.query.value;
            //console.log(22,value)
            if (value == 'message') {
                _hmt.push(['_setAutoPageview', false]);
                _hmt.push(['_trackPageview', '/resourceDetail/*?value=message']);
            }
            if (common.KEY) _self.$store.dispatch('getUserInfor');

            function countSecond() {
                _self.imageShow = false;
            }
            setTimeout(countSecond, 2500)

            var id = _self.$route.params.sourceId;
            _self.id = id;
            _self.refurbish(id);

            common.$on('resourceDetail', function(item) {
                _self.refurbish(item);
                _self.id = item;
                _self.my_param.show = false;
                _self.obj = {};

            })
            common.$on('inforCartPop', function(item) {
                _self.choose.push_num = true;
            })
            common.$on('getInfo', function(item) {
                _self.refurbish(id);
            })
            common.$on('infor_choose', function(item) {
                _self.choose.isRed = true;
            })
        },
        mounted() {
            this.wrapperHeight = document.documentElement.clientHeight - this.$refs.wrapper.getBoundingClientRect().top - 41;
            console.log(this.wrapperHeight)
        }
}
</script>
<style scoped>
.resource_detail {
    width: 100%;
    position: relative;
}

.need_float {
    float: left;
}

.resource_detail .shade {
    position: absolute;
    width: 100%;
    height: 100%;
    background: black;
    z-index: 20;
    opacity: 0.5;
}

.resource_detail .box {
    float: left;
    width: 100%;
}

.resource_detail .page-loadmore-wrapper {
    float: left;
    width: 100%;
}

@keyframes inner {
    0% {
        transform: scale(1, 0);
    }
    100% {
        transform: scale(1, 1);
    }
}

@keyframes out {
    0% {
        transform: scale(1, 1);
    }
    100% {
        transform: scale(1, 0);
    }
}

.resource_detail .swipe_active {
    transform-origin: 50% 0%;
    animation: inner 0.5s linear forwards;
}

.resource_detail .swipe_default {
    transform-origin: 50% 0%;
    animation: out 0.5s linear forwards;
}

.resource_detail .swipe_height {
    height: 18.8rem;
    position: relative;
}

.resource_detail .swipe_height .index {
    width: 4rem;
    height: 1.6rem;
    background: black;
    z-index: 9000000000;
    position: fixed;
    right: 2rem;
    opacity: 0.5;
    border-radius: 0.8rem;
    bottom: 1.5rem;
    color: white;
    line-height: 1.6rem;
    text-align: center;
    font-size: 1.4rem;
}

.resource_detail .swipe_height .index span {
    color: #FA6705;
}

.resource_detail .swipe_height .img_content {
    float: left;
    width: 100%;
    height: 100%;
}

.resource_detail .swipe_height img {
    width: 100%;
    min-height: 18.8rem;
    margin-top: 0;
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
    padding-top: 0px;
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
    /* position: absolute;
    bottom: 0px;
    z-index: 2;*/
    width: 100%;
    float: left;
}

.resource_detail .choose {
    width: 100%;
    background: red;
    float: left;
    position: absolute;
    bottom: 0;
    z-index: 30;
}

.resource_detail .fix_bottom .attention {
    float: left;
    width: 32%;
}

.resource_detail .fix_bottom .orange_button {
    width: 36%;
    float: left;
    background-color: #EEEEEE;
    border: 1px solid #CDCDCD;
}

.resource_detail .fix_bottom .disabled_button {
    background: #EC6817;
    width: 32%;
    float: left;
}


/*购物车修改*/

.resource_detail .center_box {}

.resource_detail .center {
    padding: 20px;
    position: relative;
    background: #fff;
    float: left;
    width: 100%;
    border-bottom: 1px solid #F5F5F5;
}

.resource_detail .center_content {
    padding: 20px;
    position: relative;
    background: #fff;
    float: left;
    width: 100%;
}

.resource_detail .center .choose_type {
    width: 54%;
    float: left;
    margin-left: 23%;
    margin-bottom: 0px;
    border: 1px solid #FA6705;
    border-radius: 5px;
    overflow: hidden;
    font-size: 1.5rem;
    line-height: 1.5rem;
}

.resource_detail .center .choose_type .large_cargo {
    width: 50%;
    float: left;
    padding: 10px 0;
}

.resource_detail .center .choose_type .sample_cargo {
    float: right;
    width: 50%;
    padding: 10px 0;
}

.resource_detail .center .choose_type .active {
    background: #FA6705;
    color: white;
}

.resource_detail .center .choose_type .default {
    background: white;
    color: #FA6705;
    /*border: 1px solid #ccc;*/
}

.resource_detail .top .title {
    float: left;
    width: 100%;
    /*margin-bottom: 20px;*/
}

.resource_detail .top .title img {
    float: left;
    max-height: 40px;
    height: 1.7rem;
    margin-right: 2px;
    margin-top: 10px;
}

.resource_detail .top .title p {
    float: left;
    margin-left: 10px;
    font-size: 1.4rem;
    line-height: 1.7rem;
    color: #333;
}

.resource_detail .top .title .price_right {
    float: right;
    color: #EC6817;
}

.resource_detail .top .title .price_right span {
    font-size: 1.8rem;
    font-weight: 500;
}

.resource_detail .detail {
    float: left;
    width: 100%;
    margin-bottom: 15px;
    text-align: left;
    overflow: hidden;
}

.resource_detail .detail p {
    float: left;
    width: 50%;
    word-break: keep-all;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
}

.resource_detail .detail .sell_point {
    float: left;
}

.resource_detail .detail .point_content {
    /*display: inline-block;*/
    word-break: break-all;
}

.resource_detail .detail .point_right {
    /*float: right;*/
}

.resource_detail .detail span {
    color: #666;
    font-size: 1.1rem;
}

.resource_detail .detail p span {
    color: #666;
    font-size: 1.1rem;
}

.resource_detail .detail .right {
    float: right;
    text-align: right;
}

.resource_detail .detail p .orange_font {
    color: #EC6817;
}

.resource_detail .tel {
    width: 100%;
    float: left;
    background: #EEEEEE;
    border: 1px solid #ddd;
    padding-left: 0;
    padding-right: 0;
}

.resource_detail .tel img {
    max-height: 13px;
}

.resource_detail .tel p {
    font-size: 10px;
    color: #333;
}
</style>
