<style lang="less" scoped>
.need_detail {
    background-color: #F5F5F5;
    position: relative;
    .main {
        padding-bottom: 100px;
    }
    .history_arr {
        margin-bottom: 10px;
    }
    .title_box {
        padding-left: 15px;
        background-color: #fff;
        .inbox {
            display: flex;
            flex-direction: row;
            line-height: 15px;
            text-align: left;
            border-bottom: 1px solid #E6E6E6;
            padding: 15px 15px 15px 0;
        }
        .last {
            border-bottom: none;
        }
        .left {
            font-size: 15px;
            color: #343434;
            width: 80px;
        }
        .right {
            flex: 1;
            font-size: 14px;
            color: #494949;
            word-break: break-all;
        }
    }

    @media screen {
        .no_pass {
            background-color: #fffafa;
            min-height: 32px;
            padding: 4px 0;
            font-size: 14px;
            text-align: left;
            padding-left: 15px;
            color: #ff0000;
            border-bottom: 1px solid #E6E6E6;
            line-height: 24px;
            .line {
                padding-left: 77px;
            }
        }
        @media (max-width: 320px) {
            .no_pass {
                font-size: 12px;
                .line {
                    padding-left: 65px;
                }
            }
        }
    }
    .box {
        padding: 10px 0 0 15px;
        background-color: #fff;
        .inbox {
            border-bottom: 1px solid #E6E6E6;
            padding: 5px 20px 15px 0;
            display: flex;
            flex-direction: row;
            justify-content: space-between;
            position: relative;
            .used {
                position: absolute;
                width: 60px;
                top: 20px;
                right: 24px;
            }
            .left {
                flex: 1;
                margin-left: 19px;
                color: #343434;
                text-align: left;
                @media screen {
                    .breed {
                        font-size: 17px;
                        line-height: 23px;
                        color: #000;
                        span {
                            font-size: 15px;
                        }
                        margin-bottom:10px;
                    }
                    .spec {
                        font-size: 15px;
                        line-height: 15px;
                    }
                    @media (max-width: 320px) {
                        .breed {
                            font-size: 14px;
                            line-height: 14px;
                            color: #000;
                            span {
                                font-size: 12px;
                            }
                            margin-bottom:10px;
                        }
                        .spec {
                            font-size: 12px;
                            line-height: 12px;
                        }
                    }
                }
                .first {
                    margin-top: 20px;
                }
                .last {
                    margin-top: 6px;
                    .red {
                        color: #fa6705;
                    }
                }
            }
            .top_left {
                margin-left: 0;
            }
            .right {
                display: flex;
                flex-direction: column;
                align-items: center;
                .right_box {
                    font-size: 15px;
                    text-align: center;
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
            }
            .image {
                width: 80px;
                height: 80px;
                display: flex;
                flex-direction: row;
                justify-content: center;
                align-items: center;
                overflow: hidden;
                img {
                    width: 100%;
                    height: 80px;
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
        .black {
            color: #333;
        }
        .red {
            color: #f05555;
        }
        .gray {
            color: #999;
        }
        .time {
            font-size: 12px;
            color: #999999;
        }
    }
    .top_titles {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
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
    .detail {
        background-color: #F3AA20;
        height: 30px;
        line-height: 30px;
        color: #fff;
        font-size: 14px;
        border-radius: 20px;
        width: 100px;
        margin-top: 7px;
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
    .no_history {
        color: #f05555;
        font-size: 15px;
        height: 50px;
        line-height: 50px;
        text-align: left;
        padding-left: 15px;
        background-color: #fff;
    }
    .imgs {
        width: 100%;
        position: absolute;
        height: 200px;
        img {
            width: 100%;
            height: 100%;
        }
    }
}
</style>
<template>
    <div class="content need_detail">
        <myHeader :param="param" v-show="!my_param.show"></myHeader>
        <div class="boxs" v-show="!my_param.show">
            <div class="page-loadmore-wrapper main" ref="wrapper" :style="{ height: wrapperHeight + 'px' }">
                <titles tab="3" :obj="obj"></titles>
                <div class="box">
                    <div class="inbox">
                        <div class="left top_left">
                            <div class="breed">{{obj.content.breedName}}
                                <span>{{obj.content.number}}({{obj.content.unit}})</span>
                            </div>
                            <div class="spec">{{obj.content.location,4 | filterTxt}}&nbsp;&nbsp;&nbsp;{{obj.content.spec,4 | filterTxt}}</div>
                            <div class="spec last">交货地: {{obj.content.address}}</div>
                        </div>
                        <div class='right'>
                            <div class='right_box'>
                                <div class="images">
                                    <img src="/static/icon/times.png">
                                </div>
                                <div>&nbsp;{{obj.content.duedate | needTimeDay}}</div>
                            </div>
                            <div class="detail" @click="again(obj.newOffer.accept)" v-if="obj.newOffer.accept !== 1 && sellShow">再次报价</div>
                        </div>
                    </div>
                </div>
                <!-- <div class="title_box">
                                                <div class="inbox">
                                                    <div class="left">付款方式</div>
                                                    <div class="right">{{obj.content.paymentWay}}</div>
                                                </div>
                                            </div> -->
                <div class="title_box">
                    <div class="inbox last">
                        <div class="left">备注信息</div>
                        <div class="right">{{obj.content.description}}</div>
                    </div>
                </div>
                <titles tab="4" :obj="obj"></titles>
                <div class="tbox top_titles">
                    <div>报价状态:
                        <span class="black" v-if="obj.newOffer.accept == '0'">{{obj.newOffer.accept | myOfferStatus}}</span>
                        <span class="red" v-if="obj.newOffer.accept == '1'">{{obj.newOffer.accept | myOfferStatus}}</span>
                        <span class="gray" v-if="obj.newOffer.accept == '2'">{{obj.newOffer.accept | myOfferStatus}}</span>
                        <span class="black" v-if="obj.newOffer.accept == '3'">{{obj.newOffer.accept | myOfferStatus}}</span>
                    </div>
                    <div class="time">报价时间: {{obj.newOffer.otime | timeFormat}}</div>
                </div>
                <div class="no_pass" v-if="obj.newOffer.accept == '2'">
                    未采用理由: {{obj.newOffer.comments | lineTxt}}
                    <div class="line">{{obj.newOffer.comments | lineTxtTwo}}</div>
                </div>
                <process :todo="obj.newOffer"></process>
                <div class="box">
                    <div class="inbox">
                        <div class="image">
                            <img :src="todo" v-for="(todo,index) in obj.newOffer.image" v-show="index == 0" @click="popUp(obj.newOffer.image)">
                        </div>
                        <div class="left">
                            <div class="breed">{{obj.newOffer.breedName}}
                                <span>{{obj.newOffer.number}}({{obj.newOffer.unit}})</span>
                            </div>
                            <div class="spec first">{{obj.newOffer.location,4 | filterTxt}}&nbsp;&nbsp;&nbsp;{{obj.newOffer.spec,4 | filterTxt}}</div>
                            <div class="spec last">裸价:
                                <span class="red">{{obj.newOffer.price}}</span>元/{{obj.newOffer.unit}}</div>
                        </div>
                        <img src="/static/icon/used.png" class="used" v-if="obj.newOffer.accept == '1'">
                    </div>
                </div>
                <payMoneyOrRemark :obj="obj" tab='2'></payMoneyOrRemark>
                <div class="retract" @click="retractHistory" v-show="show">
                    <div class="word">收起历史报价</div>
                    <img src="/static/icon/retract.png">
                </div>
                <titles tab="5" :obj="obj" v-show="show"></titles>
                <div class="history_arr" v-for="todo in obj.list" v-if='obj.list.length > 0 && show'>
                    <div class="tbox top_titles">
                        <div>报价状态:
                            <span class="black" v-show="todo.accept == '0'">{{todo.accept | myOfferStatus}}</span>
                            <span class="red" v-show="todo.accept == '1'">{{todo.accept | myOfferStatus}}</span>
                            <span class="gray" v-show="todo.accept == '2'">{{todo.accept | myOfferStatus}}</span>
                            <span class="black" v-show="todo.accept == '3'">{{todo.accept | myOfferStatus}}</span>
                        </div>
                        <div class="time">报价时间: {{todo.otime | timeFormat}}</div>
                    </div>
                    <div class="no_pass" v-if="todo.accept == '2'">
                        未采用理由: {{todo.comments | lineTxt}}
                        <div class="line">{{todo.comments | lineTxtTwo}}</div>
                    </div>
                    <process :todo="todo"></process>
                    <div class="box">
                        <div class="inbox">
                            <div class="image">
                                <img :src="item" v-for="(item,index) in todo.image" v-show="index == 0" @click="popUp(todo.image)">
                            </div>
                            <div class="left">
                                <div class="breed">{{todo.breedName}}
                                    <span>{{todo.number}}({{todo.unit}})</span>
                                </div>
                                <div class="spec first">{{todo.location,4 | filterTxt}}&nbsp;&nbsp;&nbsp;{{todo.spec,4 | filterTxt}}</div>
                                <div class="spec last">裸价:
                                    <span class="red">{{todo.price}}</span>元/{{todo.unit}}
                                </div>
                            </div>
                            <img src="/static/icon/used.png" class="used" v-show="todo.accept == '1'">
                        </div>
                    </div>
                    <payMoneyOrRemark :obj="todo" tab='3'></payMoneyOrRemark>
                </div>
                <div class="no_history" v-if="obj.list.length == 0 && show">无历史报价~</div>
            </div>
            <div class="look_history" @click="launchHistory" v-show="!show">
                <div class="word">查看历史报价</div>
                <img src="/static/icon/look-historyl.png">
            </div>
        </div>
        <popUpBigImg :param="my_param" v-show="my_param.show"></popUpBigImg>
    </div>
</template>
<script>
import common from '../../common/common.js'
import httpService from '../../common/httpService.js'
import payMoneyOrRemark from '../../components/myOffer/payMoneyOrRemark'
import process from '../../components/myOffer/process'
import popUpBigImg from '../../components/tools/popUpBigImg'
import myHeader from '../../components/tools/myHeader'
import titles from '../../components/release/title'
import filters from '../../filters/filters'
export default {
    data() {
        return {
            show: false,
            text: '',
            my_param: {
                url: '',
                show: false,
                whole_height: ''
            },
            obj: {
                data: {
                    payMoney: '付款方式',
                    remarks: '备注信息',
                },
                content: {
                    offer: '111',
                    breedName: '',
                    number: '',
                    location: '',
                    spec: '',
                    address: ''
                },
                newOffer: {},
                list: []

            },
            param: {
                name: '报价详情',
                topissue: true,
            },
            id: '',
            bigImgs: [],
            sellShow: ''
        }
    },
    components: {
        myHeader,
        titles,
        payMoneyOrRemark,
        popUpBigImg,
        process
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
            httpService.myAttention(url, body, function (suc) {
                common.$emit('close-load');
                let result = suc.data.biz_result;
                //console.log(1, result);
                //console.log(2, result.breedName)
                if (suc.data.code == '1c01') {
                    _self.obj.content.breedName = result.breedName;
                    _self.obj.content.number = result.number;
                    _self.obj.content.location = result.location;
                    _self.obj.content.spec = result.spec;
                    _self.obj.content.address = result.address;
                    _self.obj.content.duedate = result.duedate;
                    _self.obj.content.offer = result.offer;
                    _self.obj.content.unit = result.unit;
                    _self.obj.content.paymentWay = result.paymentWay;
                    _self.obj.content.description = result.description;
                    _self.sellShow = _self.sellShows(result.duedate);
                    //console.log(result.paymentWay)

                } else {
                    common.$emit('message', suc.data.msg);
                }
            }, function (err) {
                common.$emit('close-load');
                common.$emit('message', err.data.msg);
            })
        },
        sellShows(due) {
            let days;
            if (due) {
                due = due.split('.')[0];
                var arr = due.split(/[- : \/]/);
                var duedateDate = new Date(arr[0], arr[1] - 1, arr[2], arr[3], arr[4], arr[5]);
                var pubdateDate = new Date();
                var dateValue = duedateDate.getTime() - pubdateDate.getTime() - 5000;
                days = Math.ceil(dateValue / (24 * 3600 * 1000));

                if (days <= 0) {
                    return false;
                } else {
                    return true;
                }

            } else {
                return false;
            }

        },
        again(type) {
            let _self = this;
            common.$emit('needToReleaseOffer', {
                id:_self.id,
                accept_type:type
            });
            this.$router.replace('/releaseOffer/' + this.id + '?type='+type);
        },
        popUp(imgArr) {
            let _self = this;
            this.my_param.url = imgArr;
            this.my_param.show = !this.my_param.show;
            this.my_param.whole_height = document.documentElement.clientHeight;
        },
        getOffer(id) {
            let _self = this;
            common.$emit('show-load');
            let url = common.urlCommon + common.apiUrl.most;
            let body = {
                biz_module: 'intentionOfferService',
                biz_method: 'htmlMyIntentionOfferListInfo',
                biz_param: {
                    intentionId: id,
                    pn: 1,
                    pSize: 20
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
                let result = suc.data.biz_result.list;
                console.log(3, result)
                if (suc.data.code == '1c01') {
                    if (!_self.show) _self.obj.newOffer = result[0];
                    if (_self.show) {
                        result.shift();
                        _self.obj.list = result;
                        if (_self.obj.list.length == 0) {
                            common.$emit('message', '无历史报价~');
                        }

                    }
                } else {
                    common.$emit('message', suc.data.msg);
                }
            }, function (err) {
                common.$emit('close-load');
                common.$emit('message', err.data.msg);
            })
        },
        launchHistory() {
            this.show = true;
            this.getOffer(this.id);
        },
        retractHistory() {
            this.show = false;
            this.obj.list = [];
        }
    },
    mounted() {
        this.wrapperHeight = document.documentElement.clientHeight - this.$refs.wrapper.getBoundingClientRect().top;
    },
    created() {
        let _self = this;
        let id = _self.$route.params.id;
        _self.getHttp(id);
        _self.getOffer(id);
        _self.id = id;
        common.$on("myOfferToOfferDetail", function (item) {
            _self.getHttp(item);
            _self.getOffer(item);
            _self.id = item;
            _self.show = false;
            _self.my_param.show = false;
        });
        common.$on('getInfo', function (item) {
            _self.getHttp(id);
            _self.id = item;
        })
    }


}
</script>
