<style lang="less" scoped>
.need_details {
    background-color: #FBFBF6;
    position: relative;
    .main {
        padding-bottom: 100px;
    }
    .onscroll {
        overflow-y: scroll;
    }
    .static {
        width: 100%;
        height: 60px;
        overflow: hidden;
        position: relative;
        display: flex;
        flex-direction: row;
        align-items: center;
        img {
            width: 100%;
        }
        div {
            position: absolute;
            font-size: 16px;
            color: #EB8545;
            text-align: left;
            padding: 25px;
        }
    }
    .top {
        background-color: #fff;
        .box {
            background-color: #FBFBF6;
            height: 44px;
            padding: 0 15px;
            line-height: 44px;
            display: flex;
            flex-direction: row;
            img {
                height: 20px;
                margin-top: 12px;
            }
            .title {
                font-size: 16px;
                color: #7BB157;
                padding-left: 5px;
            }
            .emtry {
                flex: 1;
            }
            .offer {
                font-size: 14px;
                color: #333;
                span {
                    color: #FF8201;
                }
            }
        }
        .infor_box {
            padding-left: 15px;
            .infor {
                padding: 12px 15px 12px 0;
                border-bottom: 1px solid #D8D8D8;
                line-height: 21px;
                display: flex;
                flex-direction: row;
                text-align: left;
                color: #333333;
                .name {
                    width: 80px;
                    font-size: 15px;
                }
                .content {
                    flex: 1;
                    font-size: 13px;
                }
            }
            .infor_nor {
                border-bottom: none;
            }
        }
        .breed_infor {
            height: 45px;
            padding: 0 15px;
            border-bottom: 1px solid #D8D8D8;
            line-height: 45px;
            display: flex;
            flex-direction: row;
            .left {
                font-size: 18px;
                span {
                    font-size: 13px;
                    color: #FF8201;
                }
            }
            .emtry {
                flex: 1;
            }
            .right {
                font-size: 14px;
                display: flex;
                flex-direction: row;
                img {
                    height: 15px;
                }
                span {
                    color: #fa6705;
                    font-size: 15px;
                }
            }
        }
    }
    .share {
        position: fixed;
        z-index: 20;
        bottom: 0;
        height: 50px;
        width: 100%;
        display: flex;
        flex-direction: row;
        color: #fff;
        line-height: 50px;
        font-size: 17px;
        .offer_it {
            flex: 1;
            background-color: #FA6705;
            display: flex;
            flex-direction: row;
            align-items: center;
            justify-content: center;
            img {
                height: 20px;
                margin-right: 3px;
            }
        }
        .send_friend {
            flex: 1;
            background-color: #FFAE00;
        }
        .send_nor {
            width: 75px;
            background-color: #FFF;
            display: flex;
            flex-direction: column;
            align-items: center;
            padding-top: 5px;
            img {
                height: 25px;
            }
            div {
                font-size: 12px;
                line-height: 20px;
                color: #666666;
            }
        }
    }
    .black {
        width: 100%;
        height: 100vh;
        background-color: rgba(0, 0, 0, 0.8);
        position: absolute;
        z-index: 30;
    }
    .point {
        position: absolute;
        right: 10px;
        top: 10px;
        width: 44px;
        z-index: 31;
    }
    .how_share {
        width: 100%;
        margin-top: 145px;
        color: #fff;
        width: 100%;
        position: absolute;
        z-index: 31;
        text-align: left;
        padding: 0 28px;
        .item {
            display: flex;
            flex-direction: row;
            align-items: center;
            .title {
                width: 20px;
                margin-right: 10px;
            }
            .share_title {
                height: 8px;
                margin-left: 10px;
            }
            .share_frined {
                height: 20px;
                margin: 0px 6px;
            }
        }
        .line {
            height: 40px;
            margin-left: 10px;
        }
        .last {
            margin-top: 40px;
        }
    }
    .opinion {
        position: absolute;
        z-index: 31;
        margin-left: -127px;
        left: 50%;
        margin-top: 30%;
    }
}
</style>
<template>
    <div class="need_details">
        <!-- 发送朋友圈提示 -->
        <div class="black" v-show="show || opinion" @click="cancel"></div>
        <img src="/static/icon/point.png" class="point" v-show="show">
        <div class="how_share" v-show="show">
            <div class="item">
                <img src="/static/icon/1.png" class="title">
                <div class="word">点击右上角</div>
                <img src="/static/icon/share-title.png" class="share_title">
            </div>
            <img src="/static/icon/xian.png" class="line">
            <div class="item">
                <img src="/static/icon/2.png" class="title">
                <div class="word">找到</div>
                <img src="/static/icon/send-friends.png" class="share_frined">
                <div class="word">发送给朋友 或</div>
                <img src="/static/icon/share-friend.png" class="share_frined">
                <div class="word">分享到朋友圈</div>
            </div>
            <div class="item last">
                <div class="word">把这个采购单分享给你的朋友，他们会感激您的哟</div>
            </div>
        </div>
        <!-- 不发送朋友圈理由 -->
        <opinion :arr="arr" class="opinion" v-show="opinion" v-on:selectIt="selectIt"></opinion>
        <myHeader :param="param"></myHeader>
        <div class="main" ref="wrapper" :style="{ height: wrapperHeight + 'px' }" v-bind:class="{onscroll:!show || !opinion}">
            <div class="static" v-show="obj.onSell == 1 && !type">
                <img src="/static/icon/examine.png">
                <div>审核中</div>
            </div>
            <div class="static" v-show="obj.onSell == -2 && !type">
                <img src="/static/icon/un-pass.png">
                <div>审核未通过</div>
            </div>
            <div class="static" v-show="obj.onSell == 4 && !type">
                <img src="/static/icon/askover.png">
                <div>询价结束</div>
            </div>
            <div class="static" v-show="obj.onSell == 2 && !type">
                <img src="/static/icon/ask.png">
                <div>询价中</div>
            </div>
            <div class="top">
                <div class="box">
                    <img src="/static/icon/need-title.png">
                    <div class="title">求购信息</div>
                    <div class="emtry"></div>
                    <div class='offer'>已有<span>{{obj.offer}}</span>人报价</div>
                </div>
                <div class="breed_infor">
                    <div class="left">{{obj.breedName}} <span>({{obj.number}}{{obj.unit}})</span></div>
                    <div class="emtry"></div>
                    <div class="right" v-if="obj.especial == 1 && obj.type == 0">
                        <div class="images"><img src="/static/icon/times.png"></div>
                        <div>&nbsp;剩余{{obj.duedate | timeDay}} 天</div>
                    </div>
                    <div class="right" v-if="obj.especial !== 1 && obj.type == 0">剩余 长期</div>
                </div>
                <div class="infor_box">
                    <div class="infor">
                        <div class="name">规格</div>
                        <div class="content">{{obj.spec}}</div>
                    </div>
                </div>
                <div class="infor_box">
                    <div class="infor">
                        <div class="name">产地</div>
                        <div class="content">{{obj.location}}</div>
                    </div>
                </div>
                <div class="infor_box">
                    <div class="infor infor_nor">
                        <div class="name">质量要求</div>
                        <div class="content">{{obj.quality}}</div>
                    </div>
                </div>
            </div>
            <div class="top">
                <div class="box">
                    <img src="/static/icon/need-title.png">
                    <div class="title">交货要求</div>
                </div>
                <div class="infor_box">
                    <div class="infor">
                        <div class="name">交货地址</div>
                        <div class="content">{{obj.address}}</div>
                    </div>
                </div>
                <div class="infor_box">
                    <div class="infor">
                        <div class="name">付款方式</div>
                        <div class="content">{{obj.paymentWay}}</div>
                    </div>
                </div>
                <div class="infor_box">
                    <div class="infor infor_nor">
                        <div class="name">备注信息</div>
                        <div class="content">{{obj.description}}</div>
                    </div>
                </div>
            </div>
            <!-- <div @click="go(obj.id)">hsaddjsahdkj</div> -->
        </div>
        <div class="share" v-show="type">
            <div class="offer_it">
                <img src="/static/icon/offer-price.png">
                <div @click="jump(obj)">立即报价</div>
            </div>
            <div class="offer_it send_friend" @click="sendFriend()">
                <img src="/static/icon/send-friend.png">
                <div>发给朋友</div>
            </div>
            <div class="send_nor" @click="sendNor()">
                <img src="/static/icon/cry.png">
                <div>暂不参加</div>
            </div>
        </div>
        <div class="share" v-show="!type">
            <!--  <div class="offer_it" @click="delet(obj.id)">
                <img src="/static/icon/send-friend.png">
                <div>删除</div>
            </div> -->
            <div class="offer_it send_friend" @click="resive(obj.id)">
                <img src="/static/icon/offer-price.png">
                <div>编辑</div>
            </div>
        </div>
    </div>
</template>
<script>
import common from '../../common/common.js'
import httpService from '../../common/httpService.js'
import myHeader from '../../components/tools/myHeader'
import opinion from '../../components/popUpType/opinion'
import filters from '../../filters/filters'
export default {
    data() {
            return {
                obj: '',
                param: {
                    name: '求购详情',
                    topissue: true,
                },
                id: '',
                wrapperHeight: '',
                show: false,
                opinion: false,
                arr: [{
                    title: '暂时没货',
                }, {
                    title: '不做这个品种了'
                }, {
                    title: '质量不满足'
                }, {
                    title: '麻烦不太了解'
                }],
                type: true
            }
        },
        components: {
            myHeader,
            opinion
        },
        methods: {
            resive(id) {
                common.$emit('purchase-id', id);
                this.$router.push('/releaseNeeds/' + id);
            },
            getHttp(id) {
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
                    console.log(11, result)
                    let shareData = common.shareParam;
                    if (suc.data.code == '1c01') {
                        _self.obj = result;
                        shareData.title = "【紧急求购】" + result.breedName + "-上【药材买卖网】你报价我就要了！";
                        shareData.desc = result.breedName + ',规格:' + result.spec + ',需要' + result.number + result.unit + '要求：' + result.quality + '。--买卖药材就上药材买卖网！';
                        shareData.link = window.location.href;
                        common.share(shareData);
                    } else {
                        common.$emit('message', suc.data.msg);
                    }
                }, function(err) {
                    common.$emit('close-load');
                    common.$emit('message', err.data.msg);
                })
            },
            submit(todo) {
                let _self = this;
                common.$emit('show-load');
                let url = common.urlCommon + common.apiUrl.most;
                let body = {
                    biz_module: 'intentionOfferService',
                    biz_method: 'notAttendOffer',
                    biz_param: {
                        intentionId: _self.id,
                        breedId: _self.obj.breedId,
                        reason: todo.title,
                        breedName: _self.obj.breedName
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
                    common.$emit('message', suc.data.msg);
                }, function(err) {
                    common.$emit('close-load');
                    common.$emit('message', err.data.msg);
                })
            },
            sendFriend() {
                this.show = true;
            },
            sendNor() {
                let _self = this;
                if (!common.customerId) {
                    function loadApp() {
                        // common.$emit('back_login', {
                        //     id: id,
                        //     isMy: _self.obj.isMy
                        // });
                        common.$emit('setParam', 'backRouter', '/needDetails/' + _self.id);
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
                } else {
                    this.opinion = true;
                }

            },
            cancel() {
                this.show = false;
                this.opinion = false;
            },
            selectIt(todo) {
                let _self = this;
                if (todo.title) {
                    _self.submit(todo)
                }
                this.show = false;
                this.opinion = false;
            },
            jump(obj) {
                let _self = this;
                if (!common.customerId) {
                    function loadApp() {
                        common.$emit('setParam', 'backRouter', '/needDetails/' + _self.id);
                        if (common.wxshow) {
                            common.getWxUrl();
                        } else {
                            console.log(232131)
                            _self.$router.push('/login');
                        }
                    }
                    common.$emit('confirm', {
                        message: '请先登录',
                        title: '提示',
                        ensure: loadApp
                    });
                    return;
                } else {
                    common.$emit('needToReleaseOffer', obj.id);
                    this.$router.push('/releaseOffer/' + obj.id);
                }

            }
        },
        mounted() {
            this.wrapperHeight = document.documentElement.clientHeight - this.$refs.wrapper.getBoundingClientRect().top;
        },
        created() {
            let _self = this;
            let id = _self.$route.params.id;
            let type = _self.$route.query.type;
            if (type == 'my') {
                this.type = false;
            } else {
                this.type = true;
            }
            //console.log(_self.$route.query.type)
            //console.log(1,_self.$route)
            _self.getHttp(id);
            _self.id = id;
            common.$on("needToDetails", function(item) {
                console.log(item.type)
                if (item.type == 'my') {
                    _self.type = false;
                } else {
                    _self.type = true;
                }
                _self.getHttp(item.id);
                _self.id = item.id;
                _self.show = false;
            });

        }


}
</script>
