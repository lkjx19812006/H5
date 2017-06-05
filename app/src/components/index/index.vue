<style lang="less" scoped>
.home {
    overflow-y: scroll;
    padding-bottom: 30px;
    position: relative;
    background-color: #F6F6F6;
    .search {
        position: fixed;
        z-index: 10000;
        top: 0px;
        width: 100%;
        height: 48px;
        background-color: rgba(255, 117, 0, 1);
        display: flex;
        flex-direction: row;
        .left {
            padding: 5px 15px 0 15px;
            img {
                width: 20px;
            }
            .left_word {
                color: #fff;
                font-size: 12px;
            }
        }
        .center {
            flex: 1;
            .inbox {
                width: 100%;
                height: 26px;
                padding-left: 13px;
                background-color: rgba(255, 255, 255, 0.2);
                margin-top: 11px;
                border-radius: 13px;
                display: flex;
                flex-direction: row;
                img {
                    width: 16px;
                    height: 16px;
                    margin-top: 5px;
                }
                .center_word {
                    color: #fff;
                    font-size: 13px;
                    line-height: 26px;
                    margin-left: 5px;
                }
            }
        }
        .right {
            padding: 5px 15px 0 15px;
            img {
                width: 20px;
            }
            .right_word {
                color: #fff;
                font-size: 12px;
            }
        }
    }
    .searchs {
        background-color: rgba(255, 117, 0, 0);
    }
    .swiper {
        height: 206px;
        img {
            width: 100%;
            height: 100%;
        }
    }
    .release {
        width: 100%;
        display: flex;
        height: 72px;
        flex-direction: row;
        background-color: #fff;
        box-sizing: border-box;
        div {
            flex: 1;
        }
        .left {
            border-right: 1px solid #D8D8D8;
            position: relative;
            img {
                width: 26px;
                float: left;
                margin: 22px 8px 0 15px;
            }
            .sell_img {
                margin-top: 25px;
            }
            .word {
                margin-top: 13px;
                text-align: left;
                .word_top {
                    font-size: 16px;
                    margin-bottom: 4px;
                }
                @media screen {
                    .word_bottom {
                        font-size: 12px;
                    }
                    @media (max-width: 320px) {
                        .word_bottom {
                            font-size: 10px;
                        }
                    }
                }
                .green {
                    color: #A4C88F;
                }
                .orgrance {
                    color: #FF8862;
                }
            }
            .buy {
                margin: 0;
                position: absolute;
                right: 0px;
                top: 0px;
                width: 37px;
            }
        }
    }
    .entrance {
        width: 100%;
        height: 78px;
        box-sizing: border-box;
        display: flex;
        flex-direction: row;
        border-top: 1px solid #D8D8D8;
        border-bottom: 1px solid #D8D8D8;
        .box {
            flex: 1;
            background-color: #fff;
            border-right: 1px solid #D8D8D8;
            img {
                height: 25px;
                font-size: 13px;
                margin: 14px 0 3px 0;
            }
        }
        .tbox {
            border-right: none;
        }
    }
    .pre_sell {
        margin: 10px 0;
        img {
            width: 100%;
        }
    }
    .guide_price,
    .recommend {
        width: 100%;
        margin-bottom: 10px;
        background-color: #fff;
        .top {
            padding: 0 15px;
            height: 44px;
            font-size: 15px;
            display: flex;
            flex-direction: row;
            align-items: center;
            .center {
                flex: 1;
            }
            img {
                height: 14px;
            }
        }
        .content {
            border-top: 1px solid #D8D8D8;
            padding-left: 15px;
            .item {
                padding: 20px 0;
                .left {
                    .image {
                        width: 82px;
                        height: 68px;
                        overflow: hidden;
                        img {
                            width: 100%;
                            min-height: 68px;
                        }
                    }
                }
            }
            .items {
                padding: 10px 0;
            }
            .first {
                border-bottom: 1px solid #D8D8D8;
                padding: 20px 0;
            }
            .firsts {
                border-bottom: 1px solid #D8D8D8;
                padding: 10px 0;
            }
        }
    }
    .urgent {
        width: 100%;
        margin-bottom: 10px;
        background-color: #fff;
        .top {
            padding: 0 15px;
            height: 44px;
            font-size: 15px;
            display: flex;
            flex-direction: row;
            align-items: center;
            .center {
                flex: 1;
            }
            img {
                height: 14px;
            }
        }
        .content {
            border-top: 1px solid #D8D8D8;
            padding-left: 15px;
            .item {
                min-height: 117px;
                display: flex;
                flex-direction: row;
                padding-left: 4px;
            }
            .first {
                border-bottom: 1px solid #D8D8D8;
            }
            .left {
                flex: 1;
                text-align: left;
                position: relative;
                .top {
                    position: absolute;
                    width: 94px;
                    height: 34px;
                    font-size: 12px;
                    top: 0;
                    left: 0;
                    background: #fff url('/static/icon/loaback.png') no-repeat;
                    background-size: 94px 34px;
                    color: #fff;
                    .word {
                        margin: auto;
                    }
                }
                .center {
                    margin-top: 45px;
                    .breed_name {
                        font-size: 15px;
                        color: #000;
                        margin-bottom: 3px;
                    }
                    .box {
                        @media screen {
                            span {
                                font-size: 12px;
                                color: #A9A9A9;
                            }
                            @media (max-width: 320px) {
                                span {
                                    font-size: 10px;
                                    color: #A9A9A9;
                                }
                            }
                        }
                    }
                }
                .footer {
                    margin-top: 8px;
                    display: flex;
                    flex-direction: row;
                    .word {
                        line-height: 40px;
                        margin-right: 4px;
                        font-size: 12px;
                    }
                    .date {
                        position: relative;
                        width: 20px;
                        margin-right: 4px;
                        img {
                            width: 100%;
                        }
                        .num {
                            width: 20px;
                            position: absolute;
                            font-size: 18px;
                            line-height: 28px;
                            text-align: center;
                        }
                    }
                }
            }
            .right {
                width: 130px;
                .report_pri {
                    margin: 60px auto 0 auto;
                    width: 100px;
                    height: 32px;
                    background-color: #7BB157;
                    font-size: 16px;
                    color: #fff;
                    border-radius: 16px;
                    line-height: 32px;
                }
                .reported {
                    font-size: 12px;
                    margin-top: 5px;
                    span {
                        color: #7BB157;
                    }
                }
            }
        }
    }
    .recommend {
        width: 100%;
        background-color: #fff;
        .items {
            display: flex;
            flex-direction: row;
            position: relative;
            .left {
                flex: 1;
                display: flex;
                flex-direction: row;
                .image {
                    width: 82px;
                    height: 68px;
                    overflow: hidden;
                    img {
                        width: 100%;
                        min-height: 68px;
                    }
                }
                .center {
                    text-align: left;
                    margin-left: 10px;
                    .center_top {
                        font-size: 15px;
                        line-height: 22px;
                    }
                    .center_box {
                        @media screen {
                            span {
                                font-size: 12px;
                                color: #A9A9A9;
                            }
                            @media (max-width: 320px) {
                                span {
                                    font-size: 10px;
                                    color: #A9A9A9;
                                }
                            }
                        }
                    }
                    .center_bottom {
                        font-size: 16px;
                        line-height: 16px;
                        color: #FB3F24;
                        margin-top: 10px;
                    }
                }
            }
            .right {
                width: 130px;
                img {
                    position: absolute;
                    top: -1px;
                    width: 38px;
                    right: 0px;
                }
                .report_pri {
                    margin: 10px auto 0 auto;
                    width: 100px;
                    height: 32px;
                    background-color: #FF7500;
                    font-size: 16px;
                    color: #fff;
                    border-radius: 16px;
                    line-height: 32px;
                }
                .reported {
                    font-size: 12px;
                    margin-top: 5px;
                    span {
                        color: #FF670C;
                    }
                }
            }
        }
    }
    .guide_price {
        .content {
            .item {
                display: flex;
                flex-direction: row;
                .left {
                    display: flex;
                    flex: 1;
                    flex-direction: row;
                    .center {
                        font-size: 14px;
                        line-height: 14px;
                        text-align: left;
                        margin-left: 10px;
                        .center_top {
                            color: #000;
                            line-height: 20px;
                            margin-bottom: 10px;
                        }
                        .spec {
                            color: #747474;
                            margin-bottom: 10px;
                        }
                        .location {
                            margin-bottom: 0px;
                        }
                    }
                }
                .right {
                    width: 135px;
                    padding-right: 20px;
                    .red {
                        text-align: right;
                        line-height: 20px;
                        margin-bottom: 10px;
                    }
                    .spec {
                        text-align: left;
                        color: #747474;
                        line-height: 14px;
                        margin-bottom: 10px;
                    }
                    .location {
                        margin-bottom: 0px;
                    }
                }
            }
        }
    }
}
</style>
<template>
    <div class="home" id="home" ref="wrapper" :style="{ height: wrapperHeight + 'px' }">
        <div class="search" v-bind:class="{searchs:show}">
            <div class="left" @click="jump('/cart')">
                <img src="/static/icon/shopping.png">
                <div class="left_word">购物车</div>
            </div>
            <div class="center" @click="fromIndex">
                <div class="inbox">
                    <img src="/static/icon/enlarge.png">
                    <div class="center_word">请输入你想要的资源</div>
                </div>
            </div>
            <div class="right" @click="call">
                <img src="/static/icon/tele.png">
                <div class="right_word">电话</div>
            </div>
        </div>
        <div class="swiper">
            <mt-swipe :auto="4000" :prevent="false">
                <mt-swipe-item v-for="item in imgArray">
                    <img v-bind:src="item.htmlImg" @click="jumpLink(item.htmlUrl)">
                </mt-swipe-item>
            </mt-swipe>
        </div>
        <div class="release">
            <div class="left" @click="loginJump('/releaseNeed/1')">
                <img src="/static/icon/home-buy.png">
                <div class="word">
                    <div class="word_top">我要购买</div>
                    <div class="word_bottom orgrance">快速帮你匹配求购需求</div>
                </div>
                <img src="/static/icon/buy.png" class="buy">
            </div>
            <div class="left" @click="loginJump('/releaseResource/1')">
                <img src="/static/icon/home-sell.png" class="sell_img">
                <div class="word">
                    <div class="word_top">我要供应</div>
                    <div class="word_bottom green">快速帮你发布您的资源</div>
                </div>
                <img src="/static/icon/sell.png" class="buy">
            </div>
        </div>
        <div class="entrance">
            <div class="box" v-for="(todo,index) in entrance" v-bind:class="{tbox:index == 3}" @click="jumpEntrance(todo.router)">
                <img :src="todo.url">
                <div>{{todo.text}}</div>
            </div>
        </div>
        <div class="pre_sell" @click="jumpEntrance('')">
            <img src="/static/icon/presell.png">
        </div>
        <div class="guide_price">
            <div class="top" @click="jumpEntrance('/transaction')">
                <div class='left'>药材指导价</div>
                <div class="center"></div>
                <img src="/static/icon/right-arrow.png">
            </div>
            <div class="content">
                <div v-for="(todo,index) in drugGuidePrice" class="item" v-bind:class="{first:index !== 1}">
                    <div class="left">
                        <div class="image">
                            <img :src="todo.image">
                        </div>
                        <div class="center">
                            <div class="center_top">{{todo.name}}</div>
                            <div class="spec">规格:{{todo.spec,2 | filterTxt}}</div>
                            <div class="spec location">产地:{{todo.location,2 | filterTxt}}</div>
                        </div>
                    </div>
                    <div class="right">
                        <div class='red'>{{todo.unitprice}}元</div>
                        <div class="spec">跌涨价格:{{todo.dayMoney,5 | filterTxt}}</div>
                        <div class="spec location">跌涨幅度:{{todo.dayDowns | indexFloatType}}%</div>
                    </div>
                </div>
            </div>
        </div>
        <div class="urgent">
            <div class="top" @click="jumpEntrance('/urgentNeed')">
                <div class='left'>紧急求购</div>
                <div class="center"></div>
                <img src="/static/icon/right-arrow.png">
            </div>
            <div class="content">
                <div class="item" v-for="(todo,index) in urgentArr" v-bind:class="{first: index !== 2}" @click="jumpNeed('needDetail/',todo.id)">
                    <div class="left">
                        <div class="top">
                            <div class="word">{{todo.location,4 | filterTxt}}</div>
                        </div>
                        <div class="center">
                            <div class="breed_name">{{todo.breedName}}</div>
                            <div class="box">
                                <span>规格:{{todo.spec,2 | filterTxt}}</span>&nbsp;&nbsp;
                                <span>发布时间:{{todo.pubdate | timeFormat}}</span>
                            </div>
                        </div>
                        <div class="footer">
                            <div class="word">剩余</div>
                            <div class="date">
                                <div class="num">{{todo.duedate | decade}}</div>
                                <img src="/static/icon/date.png">
                            </div>
                            <div class="date">
                                <div class="num">{{todo.duedate | theUnit}}</div>
                                <img src="/static/icon/date.png">
                            </div>
                            <div class="word">天</div>
                        </div>
                    </div>
                    <div class="right">
                        <div class="report_pri">我要报价</div>
                        <div class="reported">已报价<span>{{todo.offer}}</span>人</div>
                    </div>
                </div>
            </div>
        </div>
        <div class="recommend">
            <div class="top" @click="jumpEntrance('/lowPriceRes')">
                <div class='left'>推荐资源</div>
                <div class="center"></div>
                <img src="/static/icon/right-arrow.png">
            </div>
            <div class="content">
                <div class="items" v-for="(todo,index) in resourceArr" v-bind:class="{firsts: index !== 2}" @click="jumpRes('resourceDetail/',todo.id)">
                    <div class="left">
                        <div class="image">
                            <img :src="todo.image[0]">
                        </div>
                        <div class="center">
                            <div class="center_top">{{todo.breedName}}</div>
                            <div class="center_box">
                                <span>规格:{{todo.spec,2 | filterTxt}}</span>&nbsp;&nbsp;
                                <span>场地:{{todo.location,3 | filterTxt}}</span>
                            </div>
                            <div class="center_bottom">
                                ￥{{todo.price}}/{{todo.unit}}
                            </div>
                        </div>
                    </div>
                    <div class="right">
                        <img src="/static/icon/homesample.png" v-show="todo.sampling == 1">
                        <div class="report_pri">我要购买</div>
                        <div class="reported">已报价<span>{{todo.offer}}</span>人</div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import common from '../../common/common.js'
import httpService from '../../common/httpService.js'
import longSearch from '../../components/tools/longSearch'
import filters from '../../filters/filters'
export default {
    data() {
            return {
                phone: common.servicePhone,
                imgArray: [],
                perfect: {
                    name: '',
                    bizMain: ''
                },
                scrollTop: 0,
                show: true,
                drugGuidePrice: [],
                urgentArr: [],
                resourceArr: [],
                loca: '黑龙江黑龙江',
                time: '11111.00',
                entrance: [{
                    url: '/static/icon/pre-sell.png',
                    router: '',
                    text: '预售专区'
                }, {
                    url: '/static/icon/real-time.png',
                    router: '/transaction',
                    text: '实时成交'
                }, {
                    url: '/static/icon/market.png',
                    router: '/marketQuotation',
                    text: '市场行情'
                }, {
                    url: '/static/icon/encyclopedia.png',
                    router: '/drugResTable/my',
                    text: '药材百科'
                }]
            }
        },
        components: {
            longSearch
        },
        methods: {
            getInfo() {
                let _self = this;
                common.$emit('show-load');
                let url = common.addSID(common.urlCommon + common.apiUrl.most);
                let body = {
                    biz_module: 'userService',
                    biz_method: 'queryUserInfo',
                    biz_param: {},
                };

                body.time = Date.parse(new Date()) + parseInt(common.difTime);
                body.sign = common.getSign('biz_module=' + body.biz_module + '&biz_method=' + body.biz_method + '&time=' + body.time);
                httpService.queryUserInfo(url, body, function(suc) {
                    common.$emit('close-load');
                    if (suc.data.code == "1c01") {
                        _self.perfect.name = suc.data.biz_result.fullname;
                        _self.perfect.bizMain = suc.data.biz_result.bizMain;
                        let myInfo = suc.data.biz_result; //传给mine
                        common.customerId = suc.data.biz_result.customerId;
                        window.localStorage.ID = suc.data.biz_result.customerId;
                        console.log(myInfo)
                        common.$emit('myInfo', myInfo);
                    } else {

                    }
                }, function(err) {
                    common.$emit('close-load');
                })
            },
            drugGuidePrice() {
                let _self = this;
                httpService.realTimeTurnover(common.urlCommon + common.apiUrl.most, {
                    biz_module: 'breedService',
                    biz_method: 'breedPriceGuide',
                    biz_param: {
                        pn: 1,
                        pSize: 2
                    }
                }, function(suc) {
                    let result = suc.data.biz_result.list;
                    _self.drugGuidePrice = result;
                    console.log(1, result)
                }, function(err) {
                    common.$emit('message', err.data.msg);
                })

            },
            resourceHttp() {
                let _self = this;
                common.$emit('show-load');
                let url = common.addSID(common.urlCommon + common.apiUrl.most);
                let body = {
                    biz_module: 'intentionService',
                    biz_method: 'reconnendList',
                    biz_param: {
                        pn: 1,
                        pSize: 3
                    }
                };
                if (common.KEY) {
                    url = common.addSID(common.urlCommon + common.apiUrl.most);
                    body.time = Date.parse(new Date()) + parseInt(common.difTime);
                    body.sign = common.getSign('biz_module=' + body.biz_module + '&biz_method=' + body.biz_method + '&time=' + body.time);
                }
                httpService.begBuyList(url, body, function(suc) {
                    common.$emit('close-load');
                    let result = suc.data.biz_result;
                    let begBuyList = result.begBuyList;
                    let supplyList = result.supplyList;
                    _self.urgentArr = begBuyList;
                    _self.resourceArr = supplyList;
                    //console.log(2, supplyList)
                    common.$emit('post-revise-address', _self.obj);
                }, function(err) {
                    common.$emit('close-load');
                })
            },
            fromIndex() {
                common.searchType = 'keyword';
                common.$emit('setParam', 'router', 'index');
                this.$router.push("/search");
            },
            jump(path) {
                let _self = this;
                if (!common.customerId) {
                    function loadApp() {
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
                this.$router.push(path);
            },
            loadApp() {
                window.location.href = 'http://a.app.qq.com/o/simple.jsp?pkgname=com.yaocaimaimai.yaocaimaimai';
            },
            jumpEntrance(path) {
                if (!path) {
                    common.$emit("confirm", {
                        message: '请下载App后，在App内查看',
                        title: '提示',
                        ensure: this.loadApp
                    });
                }
                if (path) this.$router.push(path);
            },
            jumpNeed(router, id) {
                common.$emit('needToDetail', id);
                this.$router.push(router + id);
            },
            jumpRes(router, id) {
                common.$emit('resourceDetail', id);
                this.$router.push(router + id);
            },
            getCustomerPhone() {
                let _self = this;
                this.$http.get(common.urlCommon + common.apiUrl.getDate).then((response) => {
                    if (response.data.code == '1c01') {
                        common.servicePhone = response.data.biz_result.serviceMobile;
                        _self.phone = response.data.biz_result.serviceMobile;
                    }
                }, (err) => {
                    common.$emit('message', err.data.msg);
                });
            },
            call() {
                window.location.href = "tel:" + this.phone;
            },
            getImgArr() {
                let _self = this;
                httpService.commonPost(common.urlCommon + common.apiUrl.most, {
                    biz_module: 'activityService',
                    biz_method: 'queryActivityList',
                    biz_param: {
                        type: 4
                    }
                }, function(suc) {
                    let result = suc.data.biz_result.list;
                    _self.imgArray = result;
                }, function(err) {
                    common.$emit('message', err.data.msg);
                })
            },
            jumpLink(url) {
                let _self = this;
                if (url) window.location.href = url;
            },
            loginJump(router) {
                let _self = this;
                if (!common.customerId) {
                    function loadApp() {
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
                } else if (_self.perfect.name == '' || _self.perfect.bizMain == '') {
                    function perfect() {
                        _self.$router.push('/perfectInfo');
                    }
                    common.$emit('confirm', {
                        message: '请先完善信息',
                        title: '提示',
                        ensure: perfect
                    });
                    return;
                }
                common.$emit('inforReleases', 1);
                this.$router.push(router);
            },
            handleScroll() {
                this.scrollTop = this.$refs.wrapper.scrollTop;
            },
            getScrollTop() {
                this.$refs.wrapper.scrollTop = this.scrollTop;
            }

        },
        watch: {
            '$route': 'getScrollTop',
            scrollTop: function(newValue, oldValue) {
                if (newValue > 200) {
                    this.show = false;
                }
                if (newValue < 200) {
                    this.show = true;
                }
            }
        },
        created() {
            let _self = this;
            if (!common.servicePhone) this.getCustomerPhone();
            if (common.KEY) _self.getInfo();
            common.$on('toMine', function(item) {
                if (common.KEY) _self.getInfo();
            })
            common.$on('getInfo', function(item) {
                _self.resourceHttp();
            })
            this.resourceHttp();
            this.drugGuidePrice();
            this.getImgArr();
        },
        mounted() {
            let _self = this;
            this.$refs.wrapper.addEventListener('scroll', this.handleScroll);
            this.$nextTick(function() {
                _self.wrapperHeight = document.documentElement.clientHeight - _self.$refs.wrapper.getBoundingClientRect().top - 73;
            })
        }
}
</script>
