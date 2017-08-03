<style lang="less" scoped>
.multiple {
    overflow: hidden;
    position: relative;
    height: 100vh;
    .head {}
    .main {
        overflow-y: scroll;
        padding-bottom: 60px;
        .content_box{

        }
        .content {
            margin-top: 10px;
            background-color: #fff;
            padding: 15px 0 0px 12px;
            .top {
                display: flex;
                flex-direction: row;
                align-items: center;
                padding-bottom: 10px;
                border-bottom: 1px solid #e6e6e6;
                .image {
                    width: 75px;
                    height: 75px;
                    overflow: hidden;
                    img {
                        width: 75px;
                        min-height: 75px;
                    }
                }
                .breed {
                    flex: 1;
                    text-align: left;
                    margin-left: 12px;
                    .breed_name {
                        font-size: 17px;
                        color: #1a1a1a;
                    }
                    .spec {
                        font-size: 12px;
                        color: #545454;
                    }
                    .price {
                        margin-left: -4px;
                        color: #ff8201;
                        font-size: 17px;
                    }
                }
                .number {
                    height: 20px;
                    margin-top: 55px;
                    font-size: 13px;
                    line-height: 20px;
                    margin-right: 12px;
                }
            }
            .center {
                display: flex;
                flex-direction: row;
                align-items: center;
                font-size: 16px;
                line-height: 16px;
                justify-content: space-between;
                padding: 13px 15px 13px 3px;
                border-bottom: 1px solid #e6e6e6;
                color: #333;
                .left {
                    color: #333;
                }
                .right {
                    display: flex;
                    flex-direction: row;
                    align-items: center;
                    img {
                        width: 27px;
                    }
                    .values {
                        border: none;
                        width: 50px;
                        text-align: center;
                    }
                }
                .freight {
                    color: #666;
                }
            }
            .subtotal {
                display: flex;
                flex-direction: row;
                align-items: center;
                justify-content: space-between;
                padding: 18px 0;
                .title {
                    font-size: 16px;
                    color: #999;
                    padding-left: 3px;
                }
                .price {
                    padding-right: 15px;
                    font-size: 16px;
                    color: #fa6705;
                }
            }
        }
        .account {
            position: absolute;
            bottom: 0px;
            width:100%;
        }
    }
}
</style>
<template>
    <div class="multiple">
        <myHeader :param="param"></myHeader>
        <div class="head" @click="jumpAddress">
            <orderAddress :param="person"></orderAddress>
        </div>
        <div class="main" ref="wrapper" :style="{ height: wrapperHeight + 'px' }">
            <div class="content_box">
                <div class="content" v-for="todo in cart">
                    <div class="top">
                        <div class="image">
                            <img :src="todo.image[0]">
                        </div>
                        <div class="breed">
                            <div class="breed_name">{{todo.breedName}}</div>
                            <div class="spec">规格: {{todo.spec}}</div>
                            <div class="spec">产地: {{todo.location}}</div>
                            <div class="price">￥{{todo.price}}/{{todo.unit}}</div>
                        </div>
                        <div class="number">x{{todo.cartNumber}}</div>
                    </div>
                    <div class="center" v-for="(item,index) in centerArr">
                        <div class="left">{{item.title}}</div>
                        <!-- <div class="right" v-show="index == 0">
                                    <img src="/static/images/subtraction.png" class="subtraction" v-tap="{methods:subtraction,todo:todo}">
                                    <input type="number" v-model="todo.cartNumber" class="values">
                                    <img src="/static/images/addition.png" class="addition" v-tap="{methods:addition}">
                                </div> -->
                        <div class="right freight" v-show="index == 0">
                            待定
                        </div>
                    </div>
                    <div class="subtotal">
                        <div class="title" v-if="todo.cartSample == 0">大货订单</div>
                        <div class="title" v-if="todo.cartSample == 1">样品订单</div>
                        <div class="price" v-if="todo.cartSample == 0">小计: ￥{{Number(todo.price)*Number(todo.cartNumber) | floatType}}元</div>
                        <div class="price" v-if="todo.cartSample == 1">小计: ￥{{Number(todo.sampleAmount)*Number(todo.cartNumber) | floatType}}元</div>
                    </div>
                </div>
            </div>
            <placeOrder class="account" v-on:submitCartOrder="confirm"></placeOrder>
        </div>
    </div>
</template>
<script>
import common from '../../common/common.js'
import httpService from '../../common/httpService.js'
import myHeader from '../../components/tools/myHeader'
import placeOrder from '../../components/tools/placeOrder'
import orderAddress from '../../components/tools/orderAddress'
import validation from '../../validation/validation.js'
import filters from '../../filters/filters'
import {
    mapGetters
} from 'vuex'
export default {
    data() {
        return {
            addressId: '',
            cart: [],
            // {
            //     title: '购买数量'
            // }, 
            centerArr: [{
                title: '运输费用'
            }],
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
        }
    },
    components: {
        myHeader,
        placeOrder,
        orderAddress
    },
    computed: {
        userInfor() {
            return this.$store.state.user.userInfor;
        },

    },
    methods: {
        subtraction(todo) {
            let _self = this;
            //if()
        },
        addition() {
            let _self = this;


        },
        handleBottomChange(status) {
            this.bottomStatus = status;
        },
        cartContent() {
            let _self = this;
            var cart = localStorage.getItem('cartContent');
            _self.cart = JSON.parse(cart);
            console.log(_self.cart)
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
            httpService.addressManage(otherurl, otherbody, function (suc) {
                common.$emit('close-load');
                let result = suc.data.biz_result;
                if (suc.data.code == "1c01") {
                    _self.person = result;
                } else {
                    common.$emit('message', suc.data.msg);
                }
            }, function (err) {
                common.$emit('close-load');
                common.$emit('message', err.data.msg);
            })
        },
        confirm() {
            let _self = this;
            let arr = [];
            let obj = {};
            let sampleArr = [];
            let sampleObj = {};
            console.log(_self.cart)
            for (var i = 0; i < _self.cart.length; i++) {
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
                function (res) {
                    common.$emit('close-load');
                    if (res.data.code == '1c01') {
                        common.$emit("mineToOrder", 0);
                        _self.$router.replace('/allOrder');
                        if (!common.pageParam.clickEvent) {
                            common.$emit('setParam', 'router', 'orderSuccess');
                        }
                        _self.$store.dispatch('getHttp');
                        //_self.$store.dispatch('')
                        _self.$store.dispatch('hideAllShow')
                    } else {
                        common.$emit('message', res.data.msg);
                    }
                },
                function (err) {
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
            handler: function (newVal, oldVal) {
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
    },
    created() {
        let _self = this;
        for (let i = 1; i <= 10; i++) {
            this.list.push(i);
        }
        _self.getAddress();
        _self.cartContent();
        common.$on('cartContent', function (item) {
            console.log(1111)
            _self.getAddress();
            _self.cartContent();
        })
        common.$on('backAddress', function (todo) {
            _self.person.id = todo.id;
            _self.person.address = todo.address;
            _self.person.contactPhone = todo.contactPhone;
            _self.person.contactName = todo.contactName;
            if (todo == 1) {
                _self.getAddress();
            }

        })
    }


}
</script>

