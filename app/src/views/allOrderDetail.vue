<template>
    <div class="all_order_detail">
        <myHeader :param="my_header"></myHeader>
        <div class="box">
            <div class="status">
                <!--  <p class="status_top" v-if="todo.type == 0">
                    {{todo.orderStatus | purchaseStatus}}
                </p>
                <p class="status_top" v-if="todo.type == 1">
                    {{todo.orderStatus | sellStatus}}
                </p> -->
                <p class="status_top">
                    订单号:{{todo.no}}
                </p>
            </div>
            <div class="address_box">
                <div class="content">
                    <div class="left_content"><img src="/static/icons/consignee.png">收货人：</div>
                    <div><span>{{todo.consignee}}</span>{{todo.consigneePhone}}</div>
                </div>
                <div class="content address">
                    <div class="left_content"><img src="/static/icons/receipt_address.png">地址：</div>
                    <div class="address_detail">{{todo.consigneeAddr}}</div>
                </div>
            </div>
            <div class="list_header">
                <div>
                    <p class="time_font"><span>{{todo.ctime | timeFormat}}</span>
                        <!--  <span style="margin-left:10px">订单编号：{{todo.no}}</span> -->
                    </p>
                    <!-- <p class="audit_state" v-show="param.show">{{todo.orderStatus | purchaseStatus}}</p>
                    <p class="audit_state" v-show="!param.show">{{todo.orderStatus | sellStatus}}</p> -->
                    <p class="audit_state" v-if="todo.type == 0">
                        {{todo.orderStatus | purchaseStatus}}
                    </p>
                    <p class="audit_state" v-if="todo.type == 1">
                        {{todo.orderStatus | sellStatus}}
                    </p>
                </div>
            </div>
            <ul class="son_order">
                <li v-for="item in todo.goodsArray">
                    <img v-bind:src="item.image" class="list_images">
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
            <div class="all_price">
                <div class="transport_price">
                    <p class="transport_price_left">运费价格:</p>
                    <p class="transport_price_right">运费价格待确认</p>
                </div>
                <div class="order_price">
                    <p class="order_price_left">订单总价:</p>
                    <p class="order_price_right">￥<span>{{todo.total}}</span>元</p>
                </div>
            </div>
            <div class="logistics" v-if="todo.orderStatus == 50">
                <div>
                    <img src="/static/icons/wuliu.png" class="logis_img">
                    <p>物流信息</p>
                </div>
                <ul>
                    <li>
                        <img src="/static/icons/oranges.png">
                        <div class="context">北京中关纯北京中关纯北京中关纯北京中关纯北京中关纯北京中关纯</div>
                        <div class="time">2014-04-15</div>
                    </li>
                    <li>
                        <img src="/static/icons/unoranges.png">
                        <div class="context">啊睡觉的咯系啊老大垃圾啊辣椒的</div>
                        <div class="time">2014-04-16</div>
                    </li>
                </ul>
            </div>
            <div class="footer">
                <p @click="prompt('如需申请，')" v-if="todo.orderStatus >= 60 && todo.type == 0">申请售后</p>
                <p @click="cancelOrder()" v-if="todo.orderStatus == 0 || todo.orderStatus == 10 && todo.type == 0">取消订单</p>
                <p @click="call()">联系我们</p>
                <p class="pay-money" v-if="todo.orderStatus == 20 && todo.type == 0" @click="prompt('支付')">立即付款</p>
            </div>
        </div>
        <!-- <div class="buy-img" v-if="todo.type == 0"></div>
        <div class="sale-img" v-if="todo.type == 1"></div>
        <div class="word_info">
            <div class="info_left">
                <p>下单时间：<span>{{todo.ctime}}</span></p>
                <p>订单号：<span>{{todo.no}}</span></p>
                <p>收件人：<span>{{todo.consignee}}</span>&nbsp;|&nbsp;<span>{{todo.consigneePhone}}</span></p>
                <p class="last_p">收货地址：<span>{{todo.consigneeAddr}}</span></p>
            </div>
            <p class="info_right" v-if="todo.type == 0">
                {{todo.orderStatus | purchaseStatus}}
            </p>
            <p class="info_right" v-if="todo.type == 1">
                {{todo.orderStatus | sellStatus}}
            </p>
        </div>
        <div class="drug_info">
            <div class="drug_info_top">
                <img :src="todo.image">
                <div class="info_top_center">
                    <p class="drug_name">{{todo.breedName}}</p>
                    <p class="drug_spec">规格：{{todo.spec}}</p>
                    <p>产地：{{todo.location}}</p>
                </div>
                <div class="info_top_bottom">
                    <p class="drug_money">{{todo.price}}<span>元/kg</span></p>
                    <p>数量：<span>{{todo.number}}</span></p>
                </div>
            </div>
            <div class="drug_info_bottom">
                <div class="good_sum_price">
                    <p>商品总价</p>
                    <p class="price">￥{{todo.amount}}</p>
                </div>
                <div class="transport_price">
                    <p>运输价格</p>
                    <p class="price">￥{{todo.incidentals}}</p>
                </div>
                <div class="sum_price">
                    <p>合计</p>
                    <p class="price">￥{{Number(todo.amount) + Number(todo.incidentals)}}</p>
                </div>
            </div>
        </div>
        <div class="footer">
            <p @click="prompt('如需申请，')" v-if="todo.orderStatus >= 60 && todo.type == 0">申请售后</p>
            <p @click="cancelOrder()" v-if="todo.orderStatus == 0 && todo.orderStatus == 10 && todo.type == 0">取消订单</p>
            <p @click="call()">联系我们</p>
            <p class="pay-money" v-if="todo.orderStatus == 20&&todo.type == 0" @click="prompt('支付')">立即付款</p>
        </div> -->
    </div>
</template>
<script>
import common from '../common/common.js'
import httpService from '../common/httpService.js'
import myHeader from '../components/tools/myHeader'
import filters from '../filters/filters'
export default {
    data() {
            let _self = this;
            return {
                show: true,
                todo: {
                    my_title: '采购订单'
                },
                no: '',
                phone: common.servicePhone,
                my_header: {
                    name: '采购订单',
                },
                logistics: []
            }
        },
        components: {
            myHeader
        },
        created() {
            let _self = this;
            _self.getHttp(_self.$route.params.allOrderId);
            common.$on('post-no', function(id) {
                _self.getHttp(id);
            })
            if (!common.servicePhone) this.getCustomerPhone();
        },
        methods: {
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
            back() {
                window.history.go(-1);
            },
            call() {
                window.location.href = "tel:" + this.phone;
            },
            cancelOrder(id, no) {
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
            getHttp(id) {
                let _self = this;
                common.$emit('show-load');
                let url = common.addSID(common.urlCommon + common.apiUrl.most);
                let body = {
                    biz_module: 'orderService',
                    biz_method: 'queryCartOrderInfo',
                    biz_param: {
                        id: id
                    }
                };
                body.time = Date.parse(new Date()) + parseInt(common.difTime);
                body.sign = common.getSign('biz_module=' + body.biz_module + '&biz_method=' + body.biz_method + '&time=' + body.time);
                httpService.myResource(url, body, function(suc) {
                    common.$emit('close-load');
                    if (suc.data.code == '1c01') {
                        let listObj = suc.data.biz_result;
                        if (listObj.type == 0) {
                            listObj.my_title = '采购订单';
                            _self.my_header.name = '采购订单';
                        } else if (listObj.type == 1) {
                            listObj.my_title = '销售订单';
                            _self.my_header.name = '销售订单';
                        }

                        _self.todo = listObj;
                        if (_self.todo.orderStatus == 50) _self.getlogistics(id);
                    }

                }, function(err) {
                    common.$emit('close-load');
                })
            },
            getlogistics(id) {
                let _self = this;
                common.$emit('show-load');
                let url = common.addSID(common.urlCommon + common.apiUrl.most);
                let body = {
                    biz_module: 'logisticsService',
                    biz_method: 'queryLogisticsDetails',
                    biz_param: {
                        orderId: id
                    }
                };
                body.time = Date.parse(new Date()) + parseInt(common.difTime);
                body.sign = common.getSign('biz_module=' + body.biz_module + '&biz_method=' + body.biz_method + '&time=' + body.time);
                httpService.myResource(url, body, function(suc) {
                    common.$emit('close-load');
                    if (suc.data.code == '1c01') {
                        console.log(suc)
                            //_self.logistics = suc.data.biz_result.data;
                    }
                }, function(err) {
                    common.$emit('close-load');
                })
            }
        }
}
</script>
<style scoped>
.all_order_detail .box {
    width: 100%;
    float: left;
}

.all_order_detail .box .status {
    float: left;
    width: 100%;
    margin-top: 10px;
}

.all_order_detail .logistics {
    float: left;
    width: 100%;
    padding: 0 15px;
    margin-top: 10px;
    background: white;
}

.all_order_detail .logistics>div {
    float: left;
    padding: 10px 0 0 0;
    color: #050607;
    margin-bottom: 15px;
}

.all_order_detail .logistics>div img {
    float: left;
    width: 20px;
}

.all_order_detail .logistics>div p {
    float: left;
}

.all_order_detail .logistics li {
    float: left;
    width: 100%;
    height: 85px;
    position: relative;
}

.all_order_detail .logistics ul {
    float: left;
    padding-bottom: 10px;
}

.all_order_detail .logistics li img {
    height: 100%;
    float: left;
}

.all_order_detail .logistics li .context {
    float: right;
    width: 93%;
    text-align: left;
    font-size: 14px;
    line-height: 15px;
    margin-top: 5px;
}

.all_order_detail .logistics li .time {
    float: right;
    width: 93%;
    text-align: left;
    font-size: 14px;
    position: absolute;
    bottom: 5px;
    left: 7%;
}

.all_order_detail .box .status .status_top {
    float: left;
    width: 100%;
    font-size: 14px;
    line-height: 14px;
    padding: 10px 15px;
    background: white;
    text-align: left;
}

.all_order_detail .box .address_box {
    float: left;
    width: 100%;
    /*padding-right: 20px;*/
    background: white;
    margin-top: 10px;
    padding: 17px 15px;
}

.all_order_detail .box .address_box .content {
    float: left;
    width: 100%;
    font-size: 14px;
    line-height: 25px;
    color: #333;
}

.all_order_detail .box .address_box .content span {
    border-right: 1px solid #666;
    padding-right: 3px;
    margin-right: 3px;
}

.all_order_detail .box .address_box .address {
    margin-top: 5px;
}

.all_order_detail .box .address_box .content .left_content {
    float: left;
    text-align: left;
    /*min-width: 90px;*/
}

.all_order_detail .box .address_box .content .left_content img {
    margin-right: 15px;
}

.all_order_detail .box .address_box .content div {
    text-align: left;
}

.all_order_detail .box .address_box .content img {
    float: left;
    max-height: 20px;
}

.all_order_detail .box .list_header {
    float: left;
    padding: 0px 15px;
    width: 100%;
    background: white;
    margin-top: 10px;
}

.all_order_detail .box .list_header>div {
    float: left;
    width: 100%;
    font-size: 14px;
    padding: 11px 0px;
    border-bottom: 1px solid #F5F5F5;
}

.all_order_detail .box .list_header .time_font {
    float: left;
    line-height: 14px;
}

.all_order_detail .box .list_header .audit_state {
    float: right;
    line-height: 14px;
    color: #FA6705;
}

.all_order_detail .box .son_order {
    float: left;
    padding: 0 15px;
    width: 100%;
    background: white;
}

.all_order_detail .box .son_order li {
    float: left;
    padding: 15px 0;
    width: 100%;
    border-bottom: 1px solid #F5F5F5;
}

.all_order_detail .box .son_order li .list_images {
    float: left;
    width: 30%;
    height: 82px;
}

.all_order_detail .box .son_order li .res_content {
    width: 65%;
    float: right;
    text-align: left;
    position: relative;
}

.all_order_detail .box .son_order li .res_content .res_content_left {
    float: left;
    width: 100px;
}

.all_order_detail .box .son_order li .res_content .res_content_left .sample_img {
    height: 1.7rem;
    margin-left: 3px;
    float: left;
}

.all_order_detail .box .son_order li .res_content .res_content_left>div .good_name {
    float: left;
}

.all_order_detail .box .son_order li .res_content .res_content_left>div {
    font-size: 16px;
    line-height: 16px;
    margin-bottom: 22px;
    float: left;
}

.all_order_detail .box .son_order li .res_content .res_content_left>p {
    font-size: 14px;
    line-height: 14px;
    margin-bottom: 12px;
    float: left;
}

.all_order_detail .box .son_order li .res_content .res_content_left>.location {
    margin-bottom: 0px;
}

.all_order_detail .box .son_order li .res_content .res_content_right {
    float: right;
    font-size: 16px;
    line-height: 16px;
}

.all_order_detail .box .son_order li .res_content .num {
    position: absolute;
    bottom: 0px;
    right: 0;
    font-size: 15px;
    color: #333;
}

.all_order_detail .box .all_price {
    float: left;
    width: 100%;
    background: white;
    border-bottom: 1px solid #F5F5F5;
    font-size: 14px;
    line-height: 14px;
    padding: 13px 0px;
}

.all_order_detail .box .all_price .transport_price {
    float: left;
    width: 100%;
    padding: 0px 15px;
    margin-bottom: 10px;
    color: #666;
}

.all_order_detail .box .all_price .transport_price .transport_price_left {
    float: left;
    color: #666;
}

.all_order_detail .box .all_price .transport_price .transport_price_right {
    float: right;
    color: #333;
}

.all_order_detail .box .all_price .order_price {
    float: left;
    width: 100%;
    padding: 0px 15px;
    color: #333;
}

.all_order_detail .box .all_price .order_price .order_price_left {
    float: left;
    color: #666;
}

.all_order_detail .box .all_price .order_price .order_price_right {
    float: right;
    color: #FA6705;
}

.all_order_detail .footer {
    float: right;
    margin-top: 1rem;
    margin-bottom: 30px;
    /*position: absolute;
    bottom: 10px;
    right: 0;*/
}

.all_order_detail .footer p {
    font-size: 1.2rem;
    border: 1px solid #DFDFD0;
    float: left;
    margin-right: 1rem;
    padding: 3px 10px;
    color: #333333;
    border-radius: 1px;
}

.all_order_detail .footer .pay-money {
    color: #FA6705;
    border: 1px solid #FA6705;
}

@media screen and (max-height: 736px) {
    .all_order_detail .box .son_order li .res_content .res_content_left>div,
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
    .all_order_detail .box .son_order li .res_content .res_content_right {
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
    .all_order_detail .box .son_order li .res_content .res_content_left>div,
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
    .all_order_detail .box .son_order li .res_content .res_content_right {
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
    .all_order_detail .box .son_order li .res_content .res_content_left>div,
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
    .all_order_detail .box .son_order li .res_content .res_content_right {
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
    .all_order_detail .box .son_order li .res_content .res_content_left>div,
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
    .all_order_detail .box .son_order li .res_content .res_content_right {
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
</style>
