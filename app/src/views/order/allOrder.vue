<template>
    <div class="my_order">
        <div>
            <attentionHead :param="param" v-on:tab="tabOrder"></attentionHead>
            <div class="fixed">
                <landscapeScroll :param="data" :myshow='param.show' v-on:postData="changeOrderStatus" v-if="param.show"></landscapeScroll>
                <sellLandscape :param="data" :myshow='param.show' v-on:postData="changeOrderStatus" v-if="!param.show"></sellLandscape>
            </div>
        </div>
        <div class="bg_white">
            <div class="page-loadmore-wrapper" ref="wrapper" :style="{ height: wrapperHeight + 'px' }" v-show="todos.length!=0">
                <mt-loadmore :top-method="loadTop" @top-status-change="handleTopChange" :bottom-method="loadBottom" @bottom-status-change="handleBottomChange" :bottom-all-loaded="allLoaded" ref="loadmore">
                    <ul class="page-loadmore-list">
                        <li v-for="todo in todos" class="page-loadmore-listitem" @click="jump(todo.id)">
                            <div class="list_header">
                                <div>
                                    <p class="time_font"><span>{{todo.ctime | timeFormat}}</span>
                                        <!--  <span style="margin-left:10px">订单编号：{{todo.no}}</span> -->
                                    </p>
                                    <p class="audit_state" v-show="param.show">{{todo.orderStatus | purchaseStatus}}</p>
                                    <p class="audit_state" v-show="!param.show">{{todo.orderStatus | sellStatus}}</p>
                                </div>
                            </div>
                            <ul class="son_order">
                                <li v-for="item in todo.goodsArray">
                                    <img v-bind:src="item.image" class="list_images" v-show="item.image">
                                    <img src="/static/icon/default_logo.png"  class="list_images" v-show="!item.image">
                                    <div class="res_content">
                                        <div class="res_content_left">
                                            <div>
                                                {{item.goodsName}}
                                            </div>
                                            <img src="/static/icons/sample.png" class="sample_img" v-if="item.sample == 1">
                                            <p class="spec">规格：<span>{{item.spec}}</span></p>
                                            <p class="location">产地：<span>{{item.location}}</span></p>
                                        </div>
                                        <div class="res_content_right">
                                            <p>{{item.price}}<span>元/{{item.unit}}</span></p>
                                        </div>
                                        <p class="num">x<span>{{item.number}}</span></p>
                                    </div>
                                </li>
                            </ul>
                            <div class="sum">
                                <div class="sum_right">
                                    <p class="total_price" v-if="todo.orderStatus==0 || todo.orderStatus==10">订单总价:￥<span>{{todo.amount}}</span>(运费杂费待确认)</p>
                                    <p class="total_price" v-if="todo.orderStatus!==0 && todo.orderStatus!==10">订单总价:￥<span>{{todo.total}}</span>(含运费杂费)</p>
                                    <!-- <p class="transport"></p> -->
                                </div>
                                <p class="sum_left">
                                    <!-- <button v-if="'cancel' ==judgeOrderStatus(todo.orderStatus) " @click.stop="cancelOrder(todo.id,todo.no,todo.type)">取消订单</button> -->
                                    <button v-if="'success' ==judgeOrderStatus(todo.orderStatus)" @click.stop="jump(todo.id)">查看订单</button>
                                    <!-- <button v-if="'send' ==judgeOrderStatus(todo.orderStatus)&&httpPraram.type==0" @click.stop="jump(todo.id)">查看订单</button> -->
                                    <button v-if="'send' ==judgeOrderStatus(todo.orderStatus)&&httpPraram.type==0" class="special" @click.stop="prompt('确认收货')">确认收货</button>
                                    <button v-if="'waitsend' ==judgeOrderStatus(todo.orderStatus)&&httpPraram.type==0" @click.stop="prompt('催促发货')">催促发货</button>
                                    <button v-if="'pay' ==judgeOrderStatus(todo.orderStatus)&&httpPraram.type==0" @click.stop="prompt('支付')">立即支付</button>
                                    <button v-if="'collectmoney' ==judgeOrderStatus(todo.orderStatus)&&httpPraram.type==1" @click.stop="collectMoney(todo.id,todo.no)">确认收款</button>
                                    <!-- <button v-if="'send' ==judgeOrderStatus(todo.orderStatus)&&httpPraram.type==1" @click.stop="jump(todo.id)">查看订单</button> -->
                                </p>
                            </div>
                        </li>
                    </ul>
                    <div slot="top" class="mint-loadmore-top">
                        <span v-show="topStatus !== 'loading'" :class="{ 'is-rotate': topStatus === 'drop' }">↓</span>
                        <span v-show="topStatus === 'loading'"><mt-spinner type="snake"></mt-spinner></span>
                    </div>
                    <div slot="bottom" class="mint-loadmore-bottom">
                        <span v-show="bottomStatus !== 'loading' && todos.length >= 10" :class="{ 'is-rotate': bottomStatus === 'drop' }"></span>
                        <!-- ↑ -->
                        <span v-show="bottomStatus === 'loading'"><mt-spinner type="snake"></mt-spinner></span>
                    </div>
                </mt-loadmore>
            </div>
        </div>
        <errPage :param="err" v-show="todos.length==0"></errPage>
    </div>
</template>
<script>
import common from '../../common/common.js'
import httpService from '../../common/httpService.js'
import landscapeScroll from '../../components/tools/landscapeScroll'
import sellLandscape from '../../components/tools/sellLandscape'
import attentionHead from '../../components/tools/attentionHead'
import filters from '../../filters/filters'
import errPage from '../../components/tools/err'
export default {
    data() {
            return {
                scrollTop: 0,
                err: {
                    err: "很抱歉，没有找到相关订单",
                    url: '/static/icons/order-point.png',
                },
                param: {
                    name: '采购订单',
                    other_name: '销售订单',
                    show: true,
                    router: "home"
                },
                more: '采购订单',
                title: '销售订单',
                show: false,
                todos: [],
                topStatus: '',
                wrapperHeight: 0,
                allLoaded: false,
                bottomStatus: '',
                data: [{
                    name: '全部订单',
                    back_id: 0,
                    show: true
                }, {
                    name: '受理中',
                    back_id: 10,
                    show: false
                }, {
                    name: '待付款',
                    back_id: 20,
                    show: false
                }, {
                    name: '待卖家发货',
                    back_id: 40,
                    show: false
                }, {
                    name: '待收货',
                    back_id: 50,
                    show: false
                }, {
                    name: '已完成',
                    back_id: 60,
                    show: false
                }, {
                    name: '已取消',
                    back_id: -1,
                    show: false
                }],
                buttonStatus: [{

                }],
                httpPraram: {
                    type: 1,
                    orderstatus: 0,
                    page: 1,
                    pageSize: 10
                }
            }
        },
        methods: {
            judgeOrderStatus(val) {
                let status = ''
                switch (val) {
                    case -2:
                        status = '';
                        break;
                    case -1:
                        status = '';
                        break;
                    case 0:
                        status = 'cancel';
                        break;
                    case 10:
                        status = 'cancel';
                        break;
                    case 20:
                        status = 'pay';
                        break;
                    case 30:
                        status = 'collectmoney';
                        break;
                    case 40:
                        status = 'waitsend';
                        break;
                    case 50:
                        status = 'send';
                        break;
                    case 60:
                        status = 'success';
                        break;
                    case 70:
                        status = 'success';
                        break;
                }
                return status;
            },
            changeOrderStatus(item) {
                this.httpPraram.orderstatus = item.id;
                this.httpPraram.page = 1;
                this.getHttp();
            },
            cancelOrder(id, no, type) {
                let _self = this;

                function cancelOrder() {
                    common.$emit('show-load');
                    let url = common.addSID(common.urlCommon + common.apiUrl.most);
                    let body = {
                        biz_module: 'orderService',
                        biz_method: 'cancelOrder',
                        biz_param: {
                            id: id,
                            no: no
                        }
                    };
                    body.time = Date.parse(new Date()) + parseInt(common.difTime);
                    body.sign = common.getSign('biz_module=' + body.biz_module + '&biz_method=' + body.biz_method + '&time=' + body.time);
                    httpService.myResource(url, body, function(suc) {
                        common.$emit('close-load');
                        if (suc.data.code == '1c01') {
                            common.$emit('message', suc.data.msg);
                            _self.todos.splice(0, _self.todos.length);
                            _self.httpPraram.page = 1;
                            _self.getHttp();
                        } else {
                            common.$emit('message', suc.data.msg);
                        }
                    }, function(err) {
                        common.$emit('close-load');
                        common.$emit('message', err.data.msg);
                    })
                }
                common.$emit('confirm', {
                    message: '确定取消订单？',
                    title: '提示',
                    ensure: cancelOrder
                });
            },
            collectMoney(id, no) {
                function collectMoney() {
                    common.$emit('show-load');
                    let url = common.addSID(common.urlCommon + common.apiUrl.most);
                    let body = {
                        biz_module: 'orderService',
                        biz_method: 'confirmOrderPaySuccess',
                        biz_param: {
                            id: id,
                            no: no
                        }
                    };
                    body.time = Date.parse(new Date()) + parseInt(common.difTime);
                    body.sign = common.getSign('biz_module=' + body.biz_module + '&biz_method=' + body.biz_method + '&time=' + body.time);
                    httpService.myResource(url, body, function(suc) {
                        common.$emit('close-load');
                        if (suc.data.code == '1c01') {
                            common.$emit('message', suc.data.msg);
                            _self.todos.splice(0, _self.todos.length);
                            _self.httpPraram.page = 1;
                            _self.getHttp();
                        } else {
                            common.$emit('message', suc.data.msg);
                        }
                    }, function(err) {
                        common.$emit('close-load');
                        common.$emit('message', err.data.msg);
                    })
                }
                common.$emit('confirm', {
                    message: '确定确认收款？',
                    title: '提示',
                    ensure: collectMoney
                });
            },
            getHttp(back) {
                let _self = this;
                if (_self.httpPraram.page == 1) common.$emit('show-load');
                let url = common.addSID(common.urlCommon + common.apiUrl.most);
                let body = {
                    biz_module: 'orderService',
                    biz_method: 'queryCartOrderList',
                    biz_param: {
                        orderStatus: _self.httpPraram.orderstatus,
                        type: _self.httpPraram.type,
                        pn: _self.httpPraram.page,
                        pSize: _self.httpPraram.pageSize
                    }
                };
                body.time = Date.parse(new Date()) + parseInt(common.difTime);
                body.sign = common.getSign('biz_module=' + body.biz_module + '&biz_method=' + body.biz_method + '&time=' + body.time);
                httpService.myResource(url, body, function(suc) {
                    common.$emit('close-load');
                    if (suc.data.code == '1c01') {
                        if (_self.httpPraram.page == 1) {
                            _self.todos.splice(0, _self.todos.length);
                        }
                        let listArr = suc.data.biz_result.list;

                        if (listArr.length < _self.httpPraram.pageSize) {
                            _self.allLoaded = true;
                        }
                        for (let i = 0; i < listArr.length; i++) {
                            _self.todos.push(listArr[i]);
                        }
                    } else {
                        common.$emit('message', suc.data.msg);
                    }
                    if (back) {
                        back();
                    }
                }, function(err) {
                    common.$emit('close-load');
                    common.$emit('message', err.data.msg);
                    if (back) {
                        back();
                    }
                })
            },
            tabOrder(param) {
                let _self = this;

                if (param == true) {
                    _self.data.splice(3, 1);
                    _self.httpPraram.type = 0;
                    _self.data[2].name = '待付款';
                    _self.data[3].name = '待卖家发货';
                    _self.data[4].name = '待收货';
                } else {
                    _self.httpPraram.type = 1;
                    let obj = {
                        name: '待收款',
                        back_id: 30,
                        show: false
                    }
                    _self.data.splice(3, 0, obj);
                    _self.data[2].name = '待买家付款';
                    _self.data[3].name = '待收款';
                    _self.data[4].name = '待发货';
                    _self.data[5].name = '待买家收货'
                    console.log(_self.data)
                }
                this.allLoaded = false;

                this.httpPraram.page = 1;
                _self.getHttp();
            },
            jump: function(id) {
                this.$router.push('allOrderDetail/' + id);
                common.$emit('post-no', id);
            },
            handleBottomChange(status) {
                this.bottomStatus = status;
            },
            loadBottom(id) {
                let _self = this;
                setTimeout(() => {
                    if (this.todos.length < this.httpPraram.page * this.httpPraram.pageSize) {
                        this.allLoaded = true;
                        _self.$refs.loadmore.onBottomLoaded(id);
                    } else {
                        this.httpPraram.page++;
                        this.getHttp(function() {
                            _self.$refs.loadmore.onBottomLoaded(id);
                        });
                    }
                }, 500);
            },
            handleTopChange(status) {
                this.topStatus = status;
            },
            loadTop(id) {
                let _self = this;
                setTimeout(() => {
                    _self.httpPraram.page = 1;

                    _self.getHttp(function() {
                        _self.$refs.loadmore.onTopLoaded(id);
                    });
                }, 500);
            },
            prompt(text) {
                function loadApp() {
                    window.location.href = common.appUrl;
                }
                common.$emit('confirm', {
                    message: text + '请下载App',
                    title: '提示',
                    ensure: loadApp
                });
            },
            handleScroll() {
                this.scrollTop = this.$refs.wrapper.scrollTop;
            },
            getScrollTop() {
                this.$refs.wrapper.scrollTop = this.scrollTop;
            }
        },
        watch: {
            '$route': 'getScrollTop'
        },
        filters: (filters, {

        }),
        components: {
            landscapeScroll,
            sellLandscape,
            attentionHead,
            errPage
        },
        created() {
            let _self = this;
            this.httpPraram.page = 1;
            _self.httpPraram.type = 0;
            //_self.param.show = true;
            _self.httpPraram.orderstatus = _self.data[common.pageParam.orderStatus].back_id;
            for (let i = 0; i < _self.data.length; i++) {
                _self.data[i].show = false;
            }
            _self.data[common.pageParam.orderStatus].show = true;
            this.getHttp();
            common.$on('mineToOrder', function(index) {
                _self.httpPraram.orderstatus = _self.data[index].back_id;
                _self.httpPraram.type = 0;
                _self.httpPraram.page = 1;
                _self.param.show = true;
                // for (let i = 0; i < _self.data.length; i++) {
                //     _self.data[i].show = false;
                // }
                _self.data = [{
                    name: '全部订单',
                    back_id: 0,
                    show: false
                }, {
                    name: '受理中',
                    back_id: 10,
                    show: false
                }, {
                    name: '待付款',
                    back_id: 20,
                    show: false
                }, {
                    name: '待卖家发货',
                    back_id: 40,
                    show: false
                }, {
                    name: '待收货',
                    back_id: 50,
                    show: false
                }, {
                    name: '已完成',
                    back_id: 60,
                    show: false
                }, {
                    name: '已取消',
                    back_id: -1,
                    show: false
                }]
                _self.data[index].show = true;

                _self.getHttp();
            });
        },
        mounted() {
            this.wrapperHeight = document.documentElement.clientHeight - this.$refs.wrapper.getBoundingClientRect().top - 100;
            this.$refs.wrapper.addEventListener('scroll', this.handleScroll);
        }

}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
/*.page-loadmore-listitem {
    height: 50px;
    border-bottom: solid 1px #eee;
    text-align: center;
    &:first-child {
        border-top: solid 1px #eee;
    }
}*/

.mint-loadmore {
    float: left;
    overflow: visible;
}

.mint-loadmore-content {
    margin-top: 10px;
}

.mint-load {
    background: #fff;
}

.mint-spinner {
    display: inline-block;
    vertical-align: middle;
}

.mint-loadmore-top span {
    display: inline-block;
    transition: .2s linear;
    vertical-align: middle;
}

.mint-loadmore-bottom span {
    display: inline-block;
    transition: .2s linear;
    vertical-align: middle;
}

.mint-swipe-items-wrap {
    float: left;
}

.my_order .mint-swipe-items-wrap .mint-swipe-item {
    float: left;
}

.my_order .mint-header-title {
    /*color:#FA6705;*/
}

.my_order .fixed {
    margin-top: 50px;
    float: left;
    width: 100%;
}

.my_order .right_text {
    color: #333333;
    font-size: 1.2rem;
    padding-left: 1.5rem;
    background: url(/static/images/tab.png) no-repeat left center;
    background-size: 1.2rem;
}

.my_order .second_nav {
    width: 100%;
}

.my_order .second_nav .mint-tab-item.is-selected {
    color: #FA6705;
}

.my_order .bg_white {
    float: left;
}

.my_order .bg_white .page-loadmore-wrapper .mint-loadmore {
    background: #F5F5F5;
    float: left;
}

.my_order .bg_white .page-loadmore-wrapper .page-loadmore-list .page-loadmore-listitem {
    width: 100%;
    border: 0;
    margin-top: 10px;
    float: left;
    background-color: #fff;
    height: auto;
}

.my_order .bg_white .page-loadmore-wrapper .page-loadmore-list .page-loadmore-listitem .list_header {
    float: left;
    padding: 0px 15px;
    width: 100%;
}

.my_order .bg_white .page-loadmore-wrapper .page-loadmore-list .page-loadmore-listitem .list_header>div {
    float: left;
    width: 100%;
    font-size: 14px;
    padding: 11px 0px;
    border-bottom: 1px solid #F5F5F5;
}

.my_order .bg_white .page-loadmore-wrapper .page-loadmore-list .page-loadmore-listitem .list_header .time_font {
    float: left;
    line-height: 14px;
}

.my_order .bg_white .page-loadmore-wrapper .page-loadmore-list .page-loadmore-listitem .list_header .audit_state {
    float: right;
    line-height: 14px;
    color: #FA6705;
}

.my_order .bg_white .page-loadmore-wrapper .page-loadmore-list .page-loadmore-listitem .son_order {
    float: left;
    padding: 0 15px;
    width: 100%;
}

.my_order .bg_white .page-loadmore-wrapper .page-loadmore-list .page-loadmore-listitem .son_order li {
    float: left;
    padding: 15px 0;
    width: 100%;
    border-bottom: 1px solid #F5F5F5;
}

.my_order .bg_white .page-loadmore-wrapper .page-loadmore-list .page-loadmore-listitem .son_order li .list_images {
    float: left;
    width: 30%;
    height: 82px;
}

.my_order .bg_white .page-loadmore-wrapper .page-loadmore-list .page-loadmore-listitem .son_order li .res_content {
    width: 65%;
    float: right;
    text-align: left;
    position: relative;
}

.my_order .bg_white .page-loadmore-wrapper .page-loadmore-list .page-loadmore-listitem .son_order li .res_content .res_content_left {
    float: left;
    width: 50%;
    position: relative;
}

.my_order .bg_white .page-loadmore-wrapper .page-loadmore-list .page-loadmore-listitem .son_order li .res_content .res_content_left .sample_img {
    height: 1.7rem;
    float: left;
    margin-right: 3px;
}


/*.my_order .bg_white .page-loadmore-wrapper .page-loadmore-list .page-loadmore-listitem .son_order li .res_content .res_content_left>div {
    font-size: 16px;
    line-height: 16px;
    margin-bottom: 22px;
}*/

.my_order .bg_white .page-loadmore-wrapper .page-loadmore-list .page-loadmore-listitem .son_order li .res_content .res_content_left>p {
    font-size: 14px;
    line-height: 14px;
    margin-bottom: 12px;
}

.my_order .bg_white .page-loadmore-wrapper .page-loadmore-list .page-loadmore-listitem .son_order li .res_content .res_content_left>.location {
    margin-bottom: 0px;
}

.my_order .bg_white .page-loadmore-wrapper .page-loadmore-list .page-loadmore-listitem .son_order li .res_content .num {
    position: absolute;
    bottom: 0px;
    right: 0;
    font-size: 15px;
    color: #333;
}

.my_order .bg_white .page-loadmore-wrapper .page-loadmore-list .page-loadmore-listitem .sum {
    float: left;
    width: 100%;
    padding: 0px 15px;
    position: relative;
}

.my_order .bg_white .page-loadmore-wrapper .page-loadmore-list .page-loadmore-listitem .sum .sum_right {
    float: left;
    width: 75%;
    text-align: left;
}

.my_order .bg_white .page-loadmore-wrapper .page-loadmore-list .page-loadmore-listitem .sum .sum_right .transport {
    float: left;
    line-height: 14px;
    font-size: 14px;
    color: #666;
    padding: 11px 0px;
}

.my_order .bg_white .page-loadmore-wrapper .page-loadmore-list .page-loadmore-listitem .sum .sum_left {
    /*float: right;*/
    position: absolute;
    right: 15px;
}

.my_order .bg_white .page-loadmore-wrapper .page-loadmore-list .page-loadmore-listitem .sum .sum_left>button {
    background: white;
    border: none;
    line-height: 14px;
    font-size: 14px;
    color: #333;
    margin-top: 11px;
}

.my_order .bg_white .page-loadmore-wrapper .page-loadmore-list .page-loadmore-listitem .sum .sum_left .special {
    border: 1px solid #FA6705;
    color: #FA6705;
    padding: 5px;
    margin-top: 5px;
    border-radius: 3px;
}

.my_order .bg_white .page-loadmore-wrapper .page-loadmore-list .page-loadmore-listitem .sum .sum_right .total_price {
    float: left;
    line-height: 14px;
    font-size: 14px;
    color: #333;
    padding: 11px 0px;
    width: 100%;
    word-break: keep-all;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
}

.my_order .bg_white .page-loadmore-wrapper .page-loadmore-list .page-loadmore-listitem .son_order li .res_content .res_content_left>div {
    margin-bottom: 22px;
    font-size: 16px;
    line-height: 16px;
    float: left;
    max-width: 80%;
}

.my_order .bg_white .page-loadmore-wrapper .page-loadmore-list .page-loadmore-listitem .son_order li .res_content .res_content_left .location {
    font-size: 14px;
    line-height: 14px;
    width: 100%;
    word-break: keep-all;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
}

.my_order .bg_white .page-loadmore-wrapper .page-loadmore-list .page-loadmore-listitem .son_order li .res_content .res_content_left .spec {
    font-size: 14px;
    line-height: 14px;
    width: 100%;
    word-break: keep-all;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
}

.my_order .bg_white .page-loadmore-wrapper .page-loadmore-list .page-loadmore-listitem .son_order li .res_content .res_content_left .sample_img {
    height: 1.7rem;
    float: left;
    margin-left: 3px;
}

.my_order .bg_white .page-loadmore-wrapper .page-loadmore-list .page-loadmore-listitem .son_order li .res_content .res_content_right {
    float: right;
    font-size: 16px;
    line-height: 16px;
    text-align: right;
    width: 50%;
}

.my_order .bg_white .page-loadmore-wrapper .page-loadmore-list .page-loadmore-listitem .son_order li .res_content .res_content_right>p {
    width: 100%;
    word-break: keep-all;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
}


/*@media screen and (max-height: 736px) {
    .my_order .bg_white .page-loadmore-wrapper .page-loadmore-list .page-loadmore-listitem .son_order li .res_content .res_content_left>div,
    .location,
    .spec {
        font-size: 16px;
        line-height: 16px;
        margin-bottom: 22px;
        word-break: keep-all;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
    }
    .my_order .bg_white .page-loadmore-wrapper .page-loadmore-list .page-loadmore-listitem .son_order li .res_content .res_content_left .sample_img {
        height: 1.7rem;
        float: left;
        left: 130px;
        margin-left: 3px;
    }
    .my_order .bg_white .page-loadmore-wrapper .page-loadmore-list .page-loadmore-listitem .son_order li .res_content .res_content_right {
        float: right;
        font-size: 16px;
        line-height: 16px;
        text-align: right;
        word-break: keep-all;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
    }
}

@media screen and (min-height: 663px) and (max-height: 735px) {
    .my_order .bg_white .page-loadmore-wrapper .page-loadmore-list .page-loadmore-listitem .son_order li .res_content .res_content_left>div,
    .location,
    .spec {
        float: left;
        font-size: 16px;
        line-height: 16px;
        margin-bottom: 22px;
        word-break: keep-all;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
    }
    .my_order .bg_white .page-loadmore-wrapper .page-loadmore-list .page-loadmore-listitem .son_order li .res_content .res_content_left .sample_img {
        width: 15px;
        float: left;
    }
    .my_order .bg_white .page-loadmore-wrapper .page-loadmore-list .page-loadmore-listitem .son_order li .res_content .res_content_right {
        float: right;
        font-size: 16px;
        line-height: 16px;
        text-align: right;
        word-break: keep-all;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
    }
}

@media screen and (min-height: 482px) and (max-height: 660px) {
    .my_order .bg_white .page-loadmore-wrapper .page-loadmore-list .page-loadmore-listitem .son_order li .res_content .res_content_left>div,
    .location,
    .spec {
        float: left;
        font-size: 16px;
        line-height: 16px;
        margin-bottom: 22px;
        word-break: keep-all;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
    }
    .my_order .bg_white .page-loadmore-wrapper .page-loadmore-list .page-loadmore-listitem .son_order li .res_content .res_content_right {
        float: right;
        font-size: 16px;
        line-height: 16px;
        text-align: right;
        word-break: keep-all;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
    }
}

@media screen and (max-height: 480px) {
    .my_order .bg_white .page-loadmore-wrapper .page-loadmore-list .page-loadmore-listitem .son_order li .res_content .res_content_left>div,
    .location,
    .spec {
        float: left;
        font-size: 16px;
        line-height: 16px;
        margin-bottom: 22px;
        word-break: keep-all;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
    }
    .my_order .bg_white .page-loadmore-wrapper .page-loadmore-list .page-loadmore-listitem .son_order li .res_content .res_content_right {
        float: right;
        font-size: 16px;
        line-height: 16px;
        text-align: right;
        word-break: keep-all;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
    }
}*/
</style>
