<style lang="less" scoped>
.need_detail {
    background-color: #F5F5F5;
    position: relative;
    .main {
        padding-bottom: 100px;
    }
    .box {
        padding: 15px 0 0 15px;
        background-color: #fff;
        .inbox {
            border-bottom: 1px solid #E6E6E6;
            padding: 5px 20px 15px 0;
            display: flex;
            flex-direction: row;
            justify-content: space-between;
            .left {
                color: #343434;
                text-align: left;
                @media screen {
                    .breed {
                        font-size: 17px;
                        color: #000;
                        span {
                            font-size: 15px;
                        }
                        margin-bottom:10px;
                    }
                    .spec {
                        font-size: 15px;
                    }
                    @media (max-width: 320px) {
                        .breed {
                            font-size: 14px;
                            color: #000;
                            span {
                                font-size: 12px;
                            }
                            margin-bottom:10px;
                        }
                        .spec {
                            font-size: 12px;
                        }
                    }
                }
                .last {
                    margin-top: 5px;
                }
            }
            .right {
                font-size: 15px;
                display: flex;
                flex-direction: row;
                padding-top: 5px;
                line-height: 15px;
                .images {
                    height: 15px;
                    img {
                        height: 100%;
                    }
                }
                .time {
                    font-size: 11px;
                    color: #CDCDCD;
                }
            }
            .image {
                width: 80px;
                height: 80px;
                display: flex;
                flex-direction: row;
                justify-content: center;
                align-items: center;
                img {
                    width: 100%;
                    min-height: 80px;
                }
            }
        }
        .inboxs {
            justify-content: flex-start;
        }
    }
    .tbox {
        padding: 10px 15px;
        border-bottom: 1px solid #E6E6E6;
        background-color: #fff;
        line-height: 20px;
        font-size: 15px;
        text-align: left;
        position: relative;
        .red {
            color: #F17676;
        }
        .time {
            font-size: 12px;
            color: #999999;
        }
        .used {
            position: absolute;
            width: 80px;
            top: 0px;
            right: 30px;
        }
    }
    .look_history {
        width: 100%;
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;
        height: 45px;
        background-color: #FAB805;
        color: #fff;
        font-size: 16px;
        img {
            height: 20px;
            margin-left: 10px;
        }
        position:fixed;
        bottom:0;
    }
    .retract {
        margin-top: 10px;
        width: 100%;
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;
        height: 45px;
        background-color: #fff;
        color: #FAB805;
        font-size: 16px;
        img {
            height: 20px;
            margin-left: 10px;
        }
    }
}
</style>
<template>
    <div class="content need_detail">
        <myHeader :param="param"></myHeader>
        <div class="page-loadmore-wrapper main" ref="wrapper" :style="{ height: wrapperHeight + 'px' }">
            <titles tab="3" :obj="obj"></titles>
            <div class="box">
                <div class="inbox">
                    <div class="left">
                        <div class="breed">{{obj.content.breedName}} <span>({{obj.content.number}}{{obj.content.unit}})</span></div>
                        <div class="spec">{{obj.content.location,4 | filterTxt}}&nbsp;&nbsp;&nbsp;{{obj.content.spec,4 | filterTxt}}</div>
                        <div class="spec last">交货地: {{obj.content.address}}</div>
                    </div>
                    <div class='right'>
                        <div class="images"><img src="/static/icon/times.png"></div>
                        <div>&nbsp;剩余{{obj.content.duedate | timeDay}} 天</div>
                    </div>
                </div>
            </div>
            <payMoneyOrRemark :obj="obj" tab='1'></payMoneyOrRemark>
            <titles tab="4" :obj="obj"></titles>
            <div class="tbox">
                <div>报价状态: <span class="red">已经采用</span></div>
                <div class="time">报价时间: 2016-01-12</div>
                <img src="/static/icon/used.png" class="used">
            </div>
            <div class="box">
                <div class="inbox">
                    <div class="left">
                        <div class="breed">{{obj.content.breedName}} <span>({{obj.content.number}}{{obj.content.unit}})</span></div>
                        <div class="spec">{{obj.content.location,4 | filterTxt}}&nbsp;&nbsp;&nbsp;{{obj.content.spec,4 | filterTxt}}</div>
                        <div class="spec last">交货地: {{obj.content.address}}</div>
                    </div>
                    <div class="image">
                        <img src="/static/icon/times.png">
                    </div>
                </div>
            </div>
            <payMoneyOrRemark :obj="obj" tab='2'></payMoneyOrRemark>
            <div class="retract" @click="retractHistory" v-show="show">
                <div class="word">收起历史报价</div>
                <img src="/static/icon/retract.png">
            </div>
            <titles tab="5" :obj="obj" v-show="show"></titles>
        </div>
        <div class="look_history" @click="launchHistory" v-show="!show">
            <div class="word">查看历史报价</div>
            <img src="/static/icon/look-historyl.png">
        </div>
    </div>
</template>
<script>
import common from '../../common/common.js'
import httpService from '../../common/httpService.js'
import payMoneyOrRemark from '../../components/myOffer/payMoneyOrRemark'
import myHeader from '../../components/tools/myHeader'
import titles from '../../components/release/title'
import filters from '../../filters/filters'
export default {
    data() {
            return {
                show: false,
                obj: {
                    data: {
                        payMoney: '付款方式',
                        remarks: '备注信息',
                    },
                    content: {
                        offer: '111',
                    }

                },
                param: {
                    name: '报价详情',
                    topissue: true,
                },
            }
        },
        components: {
            myHeader,
            titles,
            payMoneyOrRemark
        },
        methods: {
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
                    let shareData = common.shareParam;
                    if (suc.data.code == '1c01') {
                        _self.obj.content = result;
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
            launchHistory() {
                this.show = true;
            },
            retractHistory() {
                this.show = false;
            }
        },
        mounted() {
            this.wrapperHeight = document.documentElement.clientHeight - this.$refs.wrapper.getBoundingClientRect().top;
        },
        created() {
            let _self = this;
            let id = _self.$route.params.id;
            _self.getHttp(id);
            common.$on("needToDetail", function(item) {
                _self.getHttp(item);
            });
            common.$on('getInfo', function(item) {
                _self.getHttp(id);
            })
        }


}
</script>
