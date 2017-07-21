<style lang="less" scoped>
.need_details {
    background-color: #FBFBF6;
    position: relative;
    @media screen {
        .main {
            padding-bottom: 100px;
        }
        @media (max-height: 480px) {
            .main {
                padding-bottom: 200px;
            }
        }
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
        .static_word {
            font-size: 16px;
            color: #EB8545;
            text-align: left;
            padding: 25px;
            z-index: 3000;
        }
    }
    .examine {
        background: #fff url('/static/icon/examine.png') no-repeat;
        background-size: 100% 100%;
    }
    .no_pass {
        background: #fff url('/static/icon/un-pass.png') no-repeat;
        background-size: 100% 100%;
    }
    .over {
        background: #fff url('/static/icon/askover.png') no-repeat;
        background-size: 100% 100%;
    }
    .ask {
        background: #fff url('/static/icon/ask.png') no-repeat;
        background-size: 100% 100%;
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
    .mascot {
        position:  absolute;
        bottom: 47px;
        padding: 0 0 0 10px;
        display: flex;
        flex-direction: row;

        .cat {
            height: 100px;
        }
        .circle_box {
            padding-top: 20px;
            margin-left: 5px;
            position: relative;
            .circle {
                width: 225px;
            }
            .cancel {
                width: 26px;
                position: absolute;
                right: -13px;
                top: -13px;
            }
            .my_title {
                position: absolute;
                top: 30px;
                padding: 0 8px;
                line-height: 20px;
                z-index: 20;
                text-align: left;
                font-size: 14px;
                text-indent: 1em;
                span {
                    font-size: 17px;
                    color: #FF0000;
                }
            }
        }
    }
    .share {
        position: absolute;
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
        .report {
            background-color: #B5B5B5;
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
    @media (max-height: 480px) {
        .opinion {
            position: absolute;
            z-index: 31;
            margin-left: -127px;
            left: 50%;
            margin-top: 15%;
        }
    }
}
</style>
<template>
    <div class="need_details">
        <!-- 发送朋友圈提示 -->
        <div @click="cancel" class="black" v-show="show || opinion">
        </div>
        <img class="point" src="/static/icon/point.png" v-show="show">
        <div class="how_share" v-show="show">
            <div class="item">
                <img class="title" src="/static/icon/1.png">
                <div class="word">
                    点击右上角
                </div>
                <img class="share_title" src="/static/icon/share-title.png">
    
            </div>
            <img class="line" src="/static/icon/xian.png">
            <div class="item">
                <img class="title" src="/static/icon/2.png">
                <div class="word">
                    找到
                </div>
                <img class="share_frined" src="/static/icon/send-friends.png">
                <div class="word">
                    发送给朋友 或
                </div>
                <img class="share_frined" src="/static/icon/share-friend.png" />
                <div class="word">
                    分享到朋友圈
                </div>
            </div>
            <div class="item last">
                <div class="word">
                    把这个采购单分享给你的朋友，他们会感激您的哟
                </div>
            </div>
        </div>
        <!-- 不发送朋友圈理由 -->
        <opinion :arr="arr" class="opinion" v-on:cancel="cancel" v-on:selectIt="selectIt" v-show="opinion">
        </opinion>
        <myHeader :param="param">
        </myHeader>
        <div :style="{ height: wrapperHeight + 'px' }" class="main" ref="wrapper" v-bind:class="{onscroll:!show || !opinion}">
            <div class="static examine" v-if="obj.onSell == 1 && obj.isMy==1">
                <div class="static_word">
                    审核中
                </div>
            </div>
            <div class="static no_pass" v-if="obj.onSell == -2 && obj.isMy==1">
                <div class="static_word">
                    审核未通过
                </div>
            </div>
            <div class="static over" v-if="obj.onSell == 4 && obj.isMy==1">
                <div class="static_word">
                    询价结束
                </div>
            </div>
            <div class="static ask" v-if="obj.onSell == 2 && obj.isMy==1">
                <div class="static_word">
                    询价中
                </div>
            </div>
            <div class="top">
                <div class="box">
                    <img src="/static/icon/need-title.png">
                    <div class="title">
                        求购信息
                    </div>
                    <div class="emtry">
                    </div>
                    <div class="offer">
                        已有
                        <span>
                            {{obj.offer}}
                        </span>
                        人报价
                    </div>
                </div>
                <div class="breed_infor">
                    <div class="left">
                        {{obj.breedName}}
                        <span>
                            {{obj.number}}({{obj.unit}})
                        </span>
                    </div>
                    <div class="emtry">
                    </div>
                    <div class="right">
                        <div class="images">
                            <img src="/static/icon/times.png" />
                        </div>
                        <div>
                            {{obj.duedate | needTimeDay}}
                        </div>
                    </div>
                </div>
                <div class="infor_box">
                    <div class="infor">
                        <div class="name">
                            规格
                        </div>
                        <div class="content">
                            {{obj.spec}}
                        </div>
                    </div>
                </div>
                <div class="infor_box">
                    <div class="infor">
                        <div class="name">
                            产地
                        </div>
                        <div class="content">
                            {{obj.location}}
                        </div>
                    </div>
                </div>
                <div class="infor_box">
                    <div class="infor infor_nor">
                        <div class="name">
                            质量要求
                        </div>
                        <div class="content">
                            {{obj.quality}}
                        </div>
                    </div>
                </div>
            </div>
            <div class="top">
                <div class="box">
                    <img src="/static/icon/need-title.png">
                    <div class="title">
                        交货要求
                    </div>
    
                </div>
                <div class="infor_box">
                    <div class="infor">
                        <div class="name">
                            交货地址
                        </div>
                        <div class="content" v-show="obj.address">
                            {{obj.address}}
                        </div>
                        <div class="content" v-show="!obj.address">
                            面议
                        </div>
                    </div>
                </div>
                <!--  <div class="infor_box">
                                                        <div class="infor">
                                                            <div class="name">付款方式</div>
                                                            <div class="content" v-show="obj.paymentWay">{{obj.paymentWay}}</div>
                                                            <div class="content" v-show="!obj.paymentWay">面议</div>
                                                        </div>
                                                    </div> -->
                <div class="infor_box">
                    <div class="infor infor_nor">
                        <div class="name">
                            备注信息
                        </div>
                        <div class="content" v-show="obj.description">
                            {{obj.description}}
                        </div>
                        <div class="content" v-show="!obj.description">
                        </div>
                    </div>
                </div>
            </div>
            <!-- <div @click="go(obj.id)">hsaddjsahdkj</div> -->
        </div>
        <div class="mascot" v-show="mascot">
            <img alt="" class="cat" src="/static/icon/mascot.png">
            <div class="circle_box">
                <img alt="" class="circle" src="/static/icon/circle.png" />
                <!-- <img src="/static/icons/upload-delete.png" alt="" class="cancel"> -->
                <div class="my_title">
                    本条求购已有
                    <span>
                        {{obj.offer}}
                    </span>
                    人报价预计很快成交, 不报价会后悔哟
                </div>
            </div>
        </div>
        <div class="share" v-show="obj.isMy !== 1">
            <div class="offer_it" >
                <img src="/static/icon/offer-price.png">
                <div @click="jump(obj)" v-if="obj.indentType !== 0 && obj.isOffer == 0">
                    我要报价
                </div>
                <div @click="jump(obj)" v-if="obj.indentType == 0 && obj.isOffer == 0">
                    抢先报价
                </div>
                <div v-if="obj.isOffer == 1" @click="jumpDetail(obj)">
                    查看报价
                </div>
            </div>
            <div @click="sendFriend()" class="offer_it send_friend">
                <img src="/static/icon/send-friend.png" />
                <div>
                    发给朋友
                </div>
            </div>
            <div @click="sendNor()" class="send_nor">
                <img src="/static/icon/cry.png">
                <div>
                    暂不参加
                </div>
                </img>
            </div>
        </div>
        <div class="share" v-show="obj.isMy == 1">
            <div @click="resive(obj.id)" class="offer_it send_friend">
                <img src="/static/icon/offer-price.png" />
                <div>
                    编辑
                </div>
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
            mascot: false,
            param: {
                name: '求购详情',
                topissue: true,
            },
            id: '',
            wrapperHeight: '',
            show: false,
            opinion: false,
            arr: [{
                title: '不做这个品种了'
            }, {
                title: '暂时没货',
            }, {
                title: '货量不足',
            }, {
                title: '质量不满足'
            }, {
                title: '时间来不及'
            }, {
                title: '对不起，点错了'
            }],
            type: true,
            login: true
        }
    },
    components: {
        myHeader,
        opinion
    },
    computed: {
        userInfor() {
            return this.$store.state.user.userInfor;
        }
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
            httpService.myAttention(url, body, function (suc) {
                common.$emit('close-load');
                let result = suc.data.biz_result;
                console.log(11, result)
                let shareData = common.shareParam;
                if (suc.data.code == '1c01') {
                    //common.$emit('message',result.isMy)
                    _self.obj = result;
                    if (result.isMy == 0 && result.offer >= 3 && result.isOffer == 0) {
                        setTimeout(() => {
                            _self.mascot = true;
                        }, 2000)
                    }
                    shareData.title = "【紧急求购】" + result.breedName + "-上【药材买卖网】你报价我就要了！";
                    shareData.desc = result.breedName + ',规格:' + result.spec + ',需要' + result.number + result.unit + '要求：' + result.quality + '。--买卖药材就上药材买卖网！';
                    shareData.link = window.location.href;
                    common.share(shareData);
                } else {
                    common.$emit('message', suc.data.msg);
                }
            }, function (err) {
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
            httpService.myAttention(url, body, function (suc) {
                common.$emit('close-load');
                common.$emit('message', suc.data.msg);
            }, function (err) {
                common.$emit('close-load');
                common.$emit('message', err.data.msg);
            })
        },
        sendFriend() {
            this.show = true;
        },
        sendNor() {
            let _self = this;
            if (!common.KEY) {
                function loadApp() {
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
            } else if (_self.obj.isMy == 1) {
                common.$emit('message', '您本人发布的求购不能参与评论！')
            } else {
                if (_self.userInfor.userType == '0' || _self.userInfor.bizMain == '' || _self.userInfor.manageType == '-1') {
                    function perfect() {
                        // _self.$store.dispatch('changeRouter',{
                        //     index:3,
                        //     id:obj.id
                        // })
                        _self.$router.push('/perfectObject');
                    }
                    common.$emit('confirm', {
                        message: '请先完善信息',
                        title: '提示',
                        ensure: perfect
                    });
                    return;
                }
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
        jumpDetail(obj){
            let _self = this;
            common.$emit('myOfferToOfferDetail', obj.id);
            _self.$router.push('/offerDetail/'+obj.id)
        },
        jump(obj) {
            let _self = this;
            //alert(!common.customerId);
            if (!common.KEY) {
                _self.login = false;

                function loadApp() {
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
            } else if (obj.isMy == 1) {
                common.$emit('message', '您本人发布的求购不能进行报价！')
            } else {
                if (_self.userInfor.userType == '0' || _self.userInfor.bizMain == '' || _self.userInfor.manageType == '-1') {
                    function perfect() {
                        _self.$store.dispatch('changeRouter', {
                            index: 3,
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
                }
                common.$emit('needToReleaseOffer', obj.id);
                _self.$router.push('/releaseOffer/' + obj.id);
            }
        },

    },
    mounted() {
        this.wrapperHeight = document.documentElement.clientHeight - this.$refs.wrapper.getBoundingClientRect().top;
    },
    created() {
        let _self = this;
        let id = _self.$route.params.id;
        let type = _self.$route.query.type;
        let value = _self.$route.query.value;
        if (type == 'my') {
            this.type = false;
        } else {
            this.type = true;
        }
        if (value == 'web') {
            _hmt.push(['_setAutoPageview', false]);
            _hmt.push(['_trackPageview', '/needDetails/*?value=web']);
        } else if (value == 'message') {
            _hmt.push(['_setAutoPageview', false]);
            _hmt.push(['_trackPageview', '/needDetails/*?value=message']);
        }
        _self.mascot = false;
        _self.getHttp(id);
        _self.id = id;

        // _self.mascot = false;
        //  setTimeout(()=>{
        //      _self.mascot = true;
        //  },3000)
        common.$on("needToDetails", function (item) {
            console.log(item.type)
            if (item.type == 'my') {
                _self.type = false;
            } else {
                _self.type = true;
            }
            _self.mascot = false;
            _self.getHttp(item.id);
            _self.id = item.id;
            _self.show = false;

            // setTimeout(()=>{
            //    _self.mascot = true;
            // },3000)

        });
        common.$on("loginToDetails", function (item) {
            _self.mascot = false;
            _self.getHttp(item.id);

            // setTimeout(()=>{
            //    _self.mascot = true;
            // },3000)
        })

    }


}
</script>
