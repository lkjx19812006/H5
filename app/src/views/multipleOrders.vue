<template>
    <div class="multiple">
        <myHeader :param="param"></myHeader>
        <div class="head" @click="jumpAddress">
            <orderAddress :param="person"></orderAddress>
        </div>
        <div class="page-loadmore-wrapper" ref="wrapper" :style="{ height: wrapperHeight + 'px' }">
            <mt-loadmore>
                <ul id="list">
                    <li v-for="todo in cart">
                        <!-- <cartList :param="cart_data"></cartList> -->
                        <div v-bind:class="test">
                            <div class="bottom">
                                <img :src="todo.image[0]" class="drug">
                                <div class="content">
                                    <p class="breedname">{{todo.breedName}}</p>
                                    <img src="/static/icons/sample.png" v-if="todo.cartSample == 1">
                                    <p class="stock">规格:<span>统货</span></p>
                                    <p class="location">产地:<span>{{todo.location}}</span></p>
                                    <p class="unit_price" v-if="todo.cartSample == 0">{{todo.price}}元/{{todo.unit}}</p>
                                    <p class="unit_price" v-if="todo.cartSample == 1">{{todo.sampleAmount}}元/份</p>
                                    <div class="num">x{{todo.cartNumber}}</div>
                                </div>
                            </div>
                            <div class="top">
                                <!-- <img src="/static/icons/bao.png" class="fit"> -->
                                <p class="name" v-if="todo.cartSample == 0">大货订单</p>
                                <p class="name" v-if="todo.cartSample == 1">样品订单</p>
                                <p class="price" v-if="todo.cartSample == 0">小计: <span>￥{{Number(todo.price)*Number(todo.cartNumber)}}元</span></p>
                                <p class="price" v-if="todo.cartSample == 1">小计: <span>￥{{Number(todo.sampleAmount)*Number(todo.cartNumber)}}元</span></p>
                            </div>
                        </div>
                    </li>
                </ul>
            </mt-loadmore>
            <placeOrder class="account" v-on:submitCartOrder="confirm"></placeOrder>
        </div>
    </div>
</template>
<script>
import common from '../common/common.js'
import httpService from '../common/httpService.js'
import myHeader from '../components/tools/myHeader'
import placeOrder from '../components/tools/placeOrder'
import orderAddress from '../components/tools/orderAddress'
import validation from '../validation/validation.js'
/*import httpService from '../common/httpService.js'*/
import {
    mapGetters
} from 'vuex'
export default {
    data() {
            return {
                addressId: '',
                cart: [],
                param: {
                    name: '订单确认'

                },
                cart_data: {
                    show: true,
                    t_show: false
                },
                person: {

                },
                todos: [1, 2, 3, 4, 5, 6, 7],
                list: [],
                topStatus: '',
                wrapperHeight: 0,
                allLoaded: false,
                bottomStatus: '',
                perfect: {
                    name: '',
                    bizMain: ''
                }

            }
        },
        components: {
            myHeader,
            placeOrder,
            orderAddress
        },
        computed: {
            /*cart() {
                console.log(this.$store.state.cart.cartList)
                return this.$store.state.cart.cartList;
            }*/
        },
        methods: {
            getInfo() {
                let _self = this;
                common.$emit('show-load');
                let url = common.addSID(common.urlCommon + common.apiUrl.most);
                let body = {
                    biz_module: 'userService',
                    biz_method: 'queryUserInfo',
                    biz_param: {}
                };

                body.time = Date.parse(new Date()) + parseInt(common.difTime);
                console.log(common.difTime);
                console.log(body.time);
                console.log('sssss');
                body.sign = common.getSign('biz_module=' + body.biz_module + '&biz_method=' + body.biz_method + '&time=' + body.time);
                httpService.queryUserInfo(url, body, function(suc) {
                    common.$emit('close-load');
                    if (suc.data.code == "1c01") {
                        _self.perfect.name = suc.data.biz_result.fullname;
                        _self.perfect.bizMain = suc.data.biz_result.bizMain;

                    } else {
                        console.log('cuowusasdada')
                    }


                }, function(err) {
                    common.$emit('close-load');
                })
            },
            handleBottomChange(status) {
                this.bottomStatus = status;
            },
            cartContent() {
                let _self = this;
                var cart = localStorage.getItem('cartContent');
                //console.log(_self.cart)
                _self.cart = JSON.parse(cart);
                console.log(_self.cart)

                /*localStorage.removeItem('cartContent');*/
            },
            loadBottom(id) {
                setTimeout(() => {
                    let lastValue = this.list[this.list.length - 1];
                    if (lastValue < 20) {
                        for (let i = 1; i <= 10; i++) {
                            this.list.push(lastValue + i);
                        }
                    } else {
                        this.allLoaded = true;
                    }
                    this.$refs.loadmore.onBottomLoaded(id);
                }, 500);
            },
            handleTopChange(status) {
                this.topStatus = status;
            },
            loadTop(id) {
                setTimeout(() => {
                    let firstValue = this.list[0];
                    for (let i = 1; i <= 10; i++) {
                        this.list.unshift(firstValue - i);
                    }
                    this.$refs.loadmore.onTopLoaded(id);
                }, 500);
            },
            getAddress() {
                let _self = this;
                common.$emit('show-load');
                let otherurl = common.addSID(common.urlCommon + common.apiUrl.most);
                let otherbody = {
                    biz_module: 'userAddressService',
                    biz_method: 'queryDefaultAddress',
                    biz_param: {}
                };
                otherbody.time = Date.parse(new Date()) + parseInt(common.difTime);
                otherbody.sign = common.getSign('biz_module=' + otherbody.biz_module + '&biz_method=' + otherbody.biz_method + '&time=' + otherbody.time);
                httpService.addressManage(otherurl, otherbody, function(suc) {
                    common.$emit('close-load');
                    let result = suc.data.biz_result;
                    if (suc.data.code == "1c01") {
                        /* _self.id = result.id;*/
                        _self.person = result;
                        //_self.addressId = result.addressId;
                    } else {
                        common.$emit('message', suc.data.msg);
                    }
                }, function(err) {
                    common.$emit('close-load');
                    common.$emit('message', err.data.msg);
                })
            },
            confirm() {
                /*localStorage.removeItem('cartContent');*/
                //_self.cart = ''

                let _self = this;
                if (_self.perfect.name == '' || _self.perfect.bizMain == '') {
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
                let arr = [];
                let obj = {};
                let sampleArr = [];
                let sampleObj = {};
                console.log(_self.cart)
                    //goodsSample
                for (var i = 0; i < _self.cart.length; i++) {
                    /*if (_self.cart[i].cartSample == 0) obj.number = _self.cart[i].number;
                    if (_self.cart[i].cartSample == 1) obj.number = _self.cart[i].sampleNumber;*/
                    if (_self.cart[i].cartSample == 0) {
                        obj.number = _self.cart[i].cartNumber;
                        obj.intentionId = _self.cart[i].id;
                        obj.cartId = _self.cart[i].cartId;
                        obj.sample = 0;
                        arr.unshift(obj);
                    } else if (_self.cart[i].cartSample == 1) {
                        sampleObj.number = _self.cart[i].cartNumber;
                        sampleObj.intentionId = _self.cart[i].id;
                        sampleObj.cartId = _self.cart[i].cartId;
                        sampleObj.sample = 1;
                        sampleArr.unshift(sampleObj);
                    }

                    console.log(arr);
                    console.log(sampleArr);
                    obj = {};
                    sampleObj = {};
                }
                arr = JSON.stringify(arr);
                sampleArr = JSON.stringify(sampleArr);
                console.log(arr)
                common.$emit('show-load');
                let url = common.addSID(common.urlCommon + common.apiUrl.most);
                let body = {
                    biz_module: 'intentionService',
                    biz_method: 'submitCartOrder',
                    biz_param: {
                        goods: arr,
                        goodsSample: sampleArr,
                        addressId: _self.person.id
                    }
                };
                body.time = Date.parse(new Date()) + parseInt(common.difTime);
                body.sign = common.getSign('biz_module=' + body.biz_module + '&biz_method=' + body.biz_method + '&time=' + body.time);
                httpService.cart(url, body,
                    function(res) {
                        common.$emit('close-load');
                        if (res.data.code == '1c01') {
                            common.$emit("mineToOrder", 0);
                            _self.$router.replace('/allOrder');
                            if (!common.pageParam.clickEvent) {
                                common.$emit('setParam', 'router', 'orderSuccess');
                            }
                            _self.$store.dispatch('getHttp');
                            _self.$store.dispatch('')
                            _self.$store.dispatch('hideAllShow')
                        } else {
                            common.$emit('message', res.data.msg);
                        }
                    },
                    function(err) {
                        common.$emit('close-load');
                        common.$emit('message', err.data.msg);
                    })
            },
            jumpAddress() {
                common.$emit('setParam', 'router', 'multipleOrders');
                common.$emit("informAddress", 1);
                this.$router.push("/addressManage");
            }
        },
        watch: {
            param: {
                handler: function(newVal, oldVal) {
                    let _self = this;
                    console.log(newVal, oldVal)
                    if (newVal.show != _self.cart_data.show) {
                        _self.cart_data.show = newVal.show;
                    }
                    if (newVal.t_show != _self.cart_data.t_show) {
                        _self.cart_data.t_show = newVal.t_show;
                    }
                },
                deep: true
            }
        },
        mounted() {
            let _self = this;
            this.wrapperHeight = document.documentElement.clientHeight - this.$refs.wrapper.getBoundingClientRect().top;
            /*this.wrapperHeight = window.screen.height - this.$refs.wrapper.getBoundingClientRect().top;*/
        },
        created() {
            let _self = this;
            for (let i = 1; i <= 10; i++) {
                this.list.push(i);
            }
            _self.getAddress();
            _self.cartContent();
            if (common.KEY) _self.getInfo();
            common.$on('getInfo', function(item) {

                _self.getInfo();
            })
            common.$on('cartContent', function(item) {
                console.log(1111)
                _self.getAddress();
                _self.cartContent();
                //_self.cart = item;
            })
            common.$on('backAddress', function(todo) {
                //_self.getAddress();
                _self.person.id = todo.id;
                _self.person.address = todo.address;
                _self.person.contactPhone = todo.contactPhone;
                _self.person.contactName = todo.contactName;
                //_self.addressId = todo.addressId;
            })
        }


}
</script>
<style scoped>
.multiple {
    position: relative;
    /*padding-top: 50px;*/
    overflow: hidden;
    float: left;
}

.multiple .head {
    /* position: fixed;
    top: 0;*/
    width: 100%;
    z-index: 2000;
}

.multiple .page-loadmore-wrapper {
    width: 100%;
    -webkit-overflow-scrolling: touch;
    overflow: scroll;
    float: left;
    padding-bottom: 50px;
}

.multiple .test {
    width: 100%;
    float: left;
}

.multiple .test_nor {
    width: 100%;
    float: left;
    margin-left: -20%;
}

.multiple .dete {
    width: 20%;
    background: green;
    float: left;
    height: 147px;
    line-height: 147px;
}

.multiple ul {
    width: 100%;
    float: left;
    padding-top: 10px;
    background: #F2F2F2;
    /*padding-bottom: 50px;*/
}

.multiple ul li {
    width: 100%;
    float: left;
    margin-bottom: 10px;
}

.multiple ul li .top {
    padding: 10px 15px;
    position: relative;
    float: left;
    background: white;
    width: 100%;
    border-top: 1px solid #ccc;
}

.multiple ul li .top .fit {
    position: absolute;
    left: 15px;
    top: 10px;
    width: 20px;
}

.multiple ul li .top .name {
    float: left;
    margin-left: 0px;
    font-size: 14px;
    color: #4c4c4c;
}

.multiple ul li .top .price {
    float: right;
    font-size: 12px;
}

.multiple ul li .top .price span {
    color: #FA6705;
}

.multiple ul li .bottom {
    float: left;
    width: 100%;
    background: white;
    padding: 15px;
}

.multiple ul li .bottom img {
    width: 30%;
    height: 89px;
    float: left;
}

.multiple ul li .content {
    float: left;
    text-align: left;
    padding-left: 15px;
    width: 70%;
    position: relative;
}

.multiple ul li .content img {
    width: 15px;
    height: 1.7rem;
    float: left;
}

.multiple ul li .content .breedname {
    font-size: 15px;
    line-height: 15px;
    margin-bottom: 13px;
    float: left;
    margin-right: 3px;
}

.multiple ul li .content .num {
    position: absolute;
    right: 15px;
    bottom: 0;
    font-size: 15px;
}

.multiple ul li .content .unit_price {
    font-size: 15px;
    line-height: 15px;
    text-align: left;
    margin-left: -2px;
    width: 100%;
    float: left;
}

.multiple ul li .content .stock {
    font-size: 13px;
    line-height: 13px;
    margin-bottom: 8px;
    float: left;
    width: 100%;
}

.multiple ul li .content .location {
    font-size: 13px;
    line-height: 13px;
    margin-bottom: 12px;
    float: left;
    width: 100%;
}

.multiple ul li .content .operate {
    float: right;
}

.multiple ul li .content .operate button {
    width: 38px;
    height: 34px;
    background: #F5F5F5;
    margin: 0;
    color: black;
}

.multiple ul li .content .operate>input {
    width: 45px;
    height: 34px;
    color: black;
    text-align: center;
}

.multiple .account {
    position: fixed;
    bottom: 0px;
}
</style>
