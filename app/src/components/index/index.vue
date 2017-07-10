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
            position: relative;
            .red_img {
                position: absolute;
                width: 9px;
                height: 9px;
                right: 13px;
                top: 4px;
            }
            .img {
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
                        display: flex;
                        flex-direction: row;
                        .left {
                            flex: 3;
                        }
                        .right {
                            flex: 5;
                        }
                        @media screen {
                            .left,
                            .right {
                                font-size: 12px;
                                color: #A9A9A9;
                            }
                            @media (max-width: 320px) {
                                .left,
                                .right {
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
                    margin: 20px auto 0 auto;
                    width: 100px;
                    height: 32px;
                    background-color: #7BB157;
                    font-size: 16px;
                    color: #fff;
                    border-radius: 16px;
                    line-height: 32px;
                }
                .dates {
                    padding-top: 15px;
                    margin-right: 15px;
                    color: #A9A9A9;
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
                        display: flex;
                        flex-direction: row;
                        .specail_spec {
                            width: 66px;
                        }
                        @media screen {
                            .spec {
                                font-size: 12px;
                                color: #A9A9A9;
                            }
                            @media (max-width: 320px) {
                                .spec {
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
                        color: #FA6705;
                    }
                    .black {
                        text-align: right;
                        line-height: 20px;
                        margin-bottom: 10px;
                        color: #000;
                    }
                    .green {
                        text-align: right;
                        line-height: 20px;
                        margin-bottom: 10px;
                        color: green;
                    }
                    .spec {
                        text-align: left;
                        color: #747474;
                        line-height: 14px;
                        margin-bottom: 10px;
                        display: flex;
                        flex-direction: row;
                        div {
                            img {
                                height: 14px;
                                margin: 0 4px;
                            }
                        }
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
            <!--  <div class="right" @click="call">
                <img src="/static/icon/tele.png" class="img">
                <div class="right_word">电话</div>
            </div> -->
            <div class="center" @click="fromIndex">
                <div class="inbox">
                    <img src="/static/icon/enlarge.png">
                    <div class="center_word">请输入你想要的资源</div>
                </div>
            </div>
            <div class="right" @click="message">
                <img src="/static/icon/i-red.png" class="red_img" v-show="isRead == '0'">
                <img src="/static/icon/message.png" class="img">
                <div class="right_word">消息</div>
            </div>
        </div>
        <div class="swiper">
            <mt-swipe :auto="4000" :prevent="false">
                <mt-swipe-item v-for="item in imgArray">
                    <img v-bind:src="item.htmlImg" @click="jumpLink(item.htmlUrl)">
                </mt-swipe-item>
            </mt-swipe>
        </div>
        <mt-loadmore :top-method="loadTop" @top-status-change="handleTopChange" ref="loadmore">
            <div class="release">
                <div class="left" @click="loginJump('/releaseNeeds/1')">
                    <img src="/static/icon/home-buy.png">
                    <div class="word">
                        <div class="word_top">发布求购</div>
                        <div class="word_bottom orgrance">为您要买的货全网比价</div>
                    </div>
                    <img src="/static/icon/buy.png" class="buy">
                </div>
                <div class="left" @click="loginJump('/releaseResource/1')">
                    <img src="/static/icon/home-sell.png" class="sell_img">
                    <div class="word">
                        <div class="word_top">发布供应</div>
                        <div class="word_bottom green">为您扩张更多销售渠道</div>
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
                <div class="top" @click="jumpEntrance('/marketQuotation')">
                    <div class='left'>药材指导价</div>
                    <div class="center"></div>
                    <img src="/static/icon/right-arrow.png">
                </div>
                <div class="content" @click="jumpEntrance('/marketQuotation')">
                    <div v-for="(todo,index) in drugGuidePrices" class="item" v-bind:class="{first:index !== 1}">
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
                            <div class='red' v-if="todo.dayDowns > 0">{{todo.unitprice}}元/公斤</div>
                            <div class='black' v-if="todo.dayDowns == 0">{{todo.unitprice}}元/公斤</div>
                            <div class='green' v-if="todo.dayDowns < 0">{{todo.unitprice}}元/公斤</div>
                            <div class="spec" v-if="todo.dayDowns > 0">
                                <div>跌涨价格:</div>
                                <div><img src="/static/icons/up.png"></div>
                                <div> +{{todo.dayMoney,5 | filterTxt}}</div>
                            </div>
                            <div class="spec" v-if="todo.dayDowns == 0">
                                跌涨价格: {{todo.dayMoney,5 | filterTxt}}
                            </div>
                            <div class="spec" v-if="todo.dayDowns < 0">
                                <div>跌涨价格:</div>
                                <div><img src="/static/icons/down.png"></div>
                                <div> -{{todo.dayMoney,5 | filterTxt}}</div>
                            </div>
                            <div class="spec location" v-if="todo.dayDowns > 0">跌涨幅度: +{{todo.dayDowns | indexFloatType}}%</div>
                            <div class="spec location" v-if="todo.dayDowns == 0">跌涨幅度: {{todo.dayDowns | indexFloatType}}%</div>
                            <div class="spec location" v-if="todo.dayDowns < 0">跌涨幅度: -{{todo.dayDowns | indexFloatType}}%</div>
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
                    <div class="item" v-for="(todo,index) in urgentArr" v-bind:class="{first: index !== 2}" @click="jumpNeed(todo)">
                        <div class="left">
                            <div class="top">
                                <div class="word" v-if="todo.indentType == 0">药厂求购</div>
                                <div class="word" v-if="todo.indentType !== 0">普通求购</div>
                            </div>
                            <div class="center">
                                <div class="breed_name">{{todo.breedName}}</div>
                                <div class="box">
                                    <div class="left">规格:{{todo.spec,2 | filterTxt}}</div>
                                    <div class="right">产地:{{todo.location,4 | filterTxt}}</div>
                                    <!-- 发布时间:{{todo.pubdate | timeFormat}} -->
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
                            <div class="reported dates">发布日期:{{todo.pubdate | timeFormat}}</div>
                            <div class="report_pri" v-if="todo.indentType == 0">抢先报价</div>
                            <div class="report_pri" v-if="todo.indentType !== 0">我要报价</div>
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
                                    <div class="spec specail_spec">规格:{{todo.spec,2 | filterTxt}}</div>&nbsp;&nbsp;
                                    <div class="spec">产地:{{todo.location,3 | filterTxt}}</div>
                                </div>
                                <div class="center_bottom">
                                    {{todo.price}}元/{{todo.unit}}
                                </div>
                            </div>
                        </div>
                        <div class="right">
                            <img src="/static/icon/homesample.png" v-show="todo.sampling == 1">
                            <div class="report_pri">立即购买</div>
                            <!-- <div class="report_pri" v-if="todo.indentType !== 0">我要购买</div>  -->
                        </div>
                    </div>
                </div>
            </div>
        </mt-loadmore>
    </div>
</template>
<script>
import common from '../../common/common.js'
import httpService from '../../common/httpService.js'
import longSearch from '../../components/tools/longSearch'
import filters from '../../filters/filters'
import {
    mapGetters
} from 'vuex'
export default {
    data() {
            return {
                phone: common.servicePhone,
                imgArray: [],
                perfect: {
                    name: '',
                    manageType: '',
                    userType: '',
                    bizMain: ''
                },
                scrollTop: 0,
                show: true,
                drugGuidePrices: [],
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
                }],
                topStatus: '',
                wrapperHeight: 0,
                allLoaded: false,
                bottomStatus: '',
                isMessage: '',
            }
        },
        components: {
            longSearch
        },
        computed: {
            areaJson() {
                return this.$store.state.user.areaJson;
            },
            userInfor() {
                return this.$store.state.user.userInfor;
            },
            isRead() {
                return this.$store.state.user.isRead;
            }
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
                        _self.perfect.manageType = suc.data.biz_result.manageType;
                        _self.perfect.userType = suc.data.biz_result.userType;
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
                httpService.commonPost(common.urlCommon + common.apiUrl.most, {
                    biz_module: 'breedService',
                    biz_method: 'breedPriceGuide',
                    biz_param: {
                        pn: 1,
                        pSize: 2
                    }
                }, function(suc) {
                    let result = suc.data.biz_result.list;
                    //console.log(result)
                    // _self.drugGuidePrice = [];
                    _self.drugGuidePrices = result;
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
                if (!common.KEY) {
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
                let _self = this;
                if (!path) {
                    common.$emit("confirm", {
                        message: '请下载App后，在App内查看',
                        title: '提示',
                        ensure: this.loadApp
                    });
                }
                if (path) {
                    console.log(321321)
                    
                    common.$emit('clearThisSearch', 1);
                    this.$router.push(path);
                }
            },
            jumpNeed(obj) {
                let _self = this;
                common.$emit('needToDetails', {
                    id: obj.id,
                    type: ''
                });
                this.$router.push('/needDetails/' + obj.id);
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
            message() {
                let _self = this;
                if (!common.KEY) {
                    function loadApp() {
                        common.$emit('setParam', 'backRouter', 'message');
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
                common.$emit('indexToMessage', 1)
                this.$router.push('/message')
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
                if (url == 'http://192.168.1.141/htm5/#/presell') {
                    common.$emit("confirm", {
                        message: '请下载App后，在App内查看',
                        title: '提示',
                        ensure: _self.loadApp
                    });
                }
                if (url && url !== 'http://192.168.1.141/htm5/#/presell') window.location.href = url;
            },
            loginJump(router) {
                let _self = this;
                if (!common.KEY) {
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
                } else if (_self.userInfor.userType == '0' || _self.userInfor.bizMain == '' || _self.userInfor.manageType == '-1') {
                    console.log(213162376178);
                    function perfect() {
                        if (router == '/releaseNeeds/1') {
                            _self.$store.dispatch('changeRouter', {
                                index: 1,
                                id: ''
                            })
                        } else if (router == '/releaseResource/1') {
                            _self.$store.dispatch('changeRouter', {
                                index: 2,
                                id: ''
                            })
                        }
                        _self.$router.push('/perfectObject');
                    }
                    common.$emit('confirm', {
                        message: '请先完善信息',
                        title: '提示',
                        ensure: perfect
                    });
                    return;
                }
                // if(router == '/releaseNeeds/1'){
                //       if(common.getAddress)_self.$store.dispatch('getAreaJson')
                // }
                common.$emit('inforReleases', 1);
                this.$router.push(router);
            },
            handleScroll() {
                this.scrollTop = this.$refs.wrapper.scrollTop;
            },
            getScrollTop() {
                this.$refs.wrapper.scrollTop = this.scrollTop;
            },
            handleTopChange(status) {
                this.topStatus = status;
            },
            loadTop(id) {
                let _self = this;
                setTimeout(() => {
                    _self.drugGuidePrice();
                    _self.resourceHttp();
                    _self.getImgArr();
                    if (common.KEY) _self.getMessage();
                    _self.$refs.loadmore.onTopLoaded(id);
                }, 500);
            },

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
            if (common.KEY) {
                console.log(1217389279)
                _self.$store.dispatch('getUserInfor');
            }
            if (common.KEY) _self.$store.dispatch('getMessage');
            common.$on('messageBack', function(item) { //由消息列表回来，处理缓存问题
                if (common.KEY) _self.$store.dispatch('getMessage');
            })
            common.$on('toMine', function(item) {
                if (common.KEY) _self.$store.dispatch('getUserInfor');
                if (common.KEY) _self.$store.dispatch('getMessage');
            })
            common.$on('perfectOldCustomer', function(item) { //完善老客户信息，处理缓存问题
                if (common.KEY) _self.$store.dispatch('getUserInfor')
            })
            common.$on('getInfo', function(item) {
                if (common.KEY) _self.$store.dispatch('getUserInfor'); //来自登录，调用下个人信息接口
                _self.resourceHttp();
                if (common.KEY) _self.$store.dispatch('getMessage');
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
