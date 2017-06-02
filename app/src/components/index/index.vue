<style lang="less" scoped>
.home {
    position: relative;
    .search {
        position: fixed;
        z-index: 10000;
        top: 0px;
        width: 100%;
        height: 48px;
        background-color: rgba(255, 117, 0, 0.3);
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
                .green{
                    color:#A4C88F;
                }
                .orgrance{
                    color:#FF8862;
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
            img{
                height:25px;
                font-size:13px;
                margin:14px 0 3px 0;
            }
        }
        .tbox {
            border-right: none;
        }
    }
}
</style>
<template>
    <div class="home">
        <div class="search">
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
            <div class="box" v-for="(todo,index) in entrance" v-bind:class="{tbox:index == 3}">
                <img :src="todo.url">
                <div>{{todo.text}}</div>
            </div>
        </div>
    </div>
</template>
<script>
import common from '../../common/common.js'
import httpService from '../../common/httpService.js'
import longSearch from '../../components/tools/longSearch'
import filters from '../../filters/filters'
/*import openApp from '../../components/tools/openApp'*/

export default {
    data() {
            return {
                phone: common.servicePhone,
                imgArray: [],
                perfect: {
                    name: '',
                    bizMain: ''
                },
                entrance: [{
                    url: '/static/icon/pre-sell.png',
                    text: '预售专区'
                }, {
                    url: '/static/icon/real-time.png',
                    text: '实时成交'
                }, {
                    url: '/static/icon/market.png',
                    text: '市场行情'
                }, {
                    url: '/static/icon/encyclopedia.png',
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
        },
        created() {
            let _self = this;
            if (!common.servicePhone) this.getCustomerPhone();
            if (common.KEY) _self.getInfo();
            common.$on('toMine', function(item) {
                    if (common.KEY) _self.getInfo();
                })
                // common.$on('getInfo', function(item) {
                //     _self.resourceHttp();
                // })
                // this.resourceHttp();
                // this.transaction();
                // this.drugGuidePrice();
            this.getImgArr();
        }
}
</script>
