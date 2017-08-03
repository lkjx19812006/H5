<style lang="less" scoped>
/* .cart {
    position: relative;
    overflow: hidden;
    float: left;
    width: 100%;
}

.cart .pop_up {
    width: 80%;
    height: 150px;
    position: relative;
    flex-direction: column;
    display: flex;
    position: absolute;
    margin-left: -40%;
    margin-top: -75px;
    top: 50%;
    left: 50%;
    background: white;
    border: 1px solid #ccc;
    border-radius: 5px;
}

.cart .pop_up .pop_box {
    margin-left: -50%;
    height: 110px;
    width: 100%;
    display: flex;
    margin: 0px auto;
    padding-top: 30px;
}

.cart .pop_up .title {
    line-height: 34px;
    margin-right: 10px;
    margin-left: 10px;
    float: left;
}

.cart .pop_up .but {
    display: flex;
    position: absolute;
    right: 10px;
}

.cart .pop_up .foo {
    width: 100%;
    height: 40px;
    border-top: 1px solid #ccc;
    line-height:
}

.cart .pop_up .foo .foo_cancel {
    width: 50%;
    float: left;
}

.cart .pop_up .foo .foo_confirm {
    width: 50%;
    float: right;
}

.cart .pop_up {
    float: right;
    display: flex;
}

.cart .pop_up button {
    width: 38px;
    height: 34px;
    background: #F5F5F5;
    margin: 0;
    color: black;
}

.cart .pop_up input {
    width: 45px;
    height: 34px;
    color: black;
    text-align: center;
}

input {
    opacity: 1;
}

.mint-cell-wrapper {
    padding: 0px;
    width: 100%;
}

.cart .head {
    float: left;
    width: 100%;
    z-index: 2000;
}

.cart .page-loadmore-wrapper {
    width: 100%;
    -webkit-overflow-scrolling: touch;
    overflow: scroll;
    float: left;
    margin-top: 20px;
    padding-bottom: 50px;
}

.cart .test {
    width: 100%;
    float: left;
}

.cart .test_nor {
    width: 100%;
    float: left;
    margin-left: -20%;
}

.cart .dete {
    width: 20%;
    background: green;
    float: left;
    height: 147px;
    line-height: 147px;
}

.cart ul {
    width: 100%;
    float: left;
    background: #F2F2F2;
}

.cart ul li {
    width: 100%;
    float: left;
    margin-bottom: 10px;
}

.cart ul li .top {
    padding: 10px 15px;
    position: relative;
    float: left;
    background: white;
    width: 100%;
    border-bottom: 1px solid #ccc;
}

.cart ul li .top .fit {
    position: absolute;
    left: 15px;
    top: 8px;
    width: 20px;
}

.cart ul li .top .cart_sample {
    height: 20px;
    float: left;
    margin-left: 4px;
}

.cart ul li .top .name {
    float: left;
    margin-left: 35px;
}

.cart ul li .top .price {
    float: right;
}

.cart ul li .bottom {
    float: left;
    width: 100%;
    background: white;
    padding: 15px;
}

.cart ul li .bottom img {
    width: 30%;
    height: 75px;
    float: left;
}

.cart ul li .content {
    float: left;
    text-align: left;
    padding-left: 15px;
    width: 70%;
}

.cart ul li .content .stock {
    margin-bottom: 5px;
}

.cart ul li .content .operate {
    float: right;
    display: flex;
}

.cart ul li .content .operate button {
    width: 38px;
    height: 34px;
    background: #F5F5F5;
    margin: 0;
    color: black;
}

.cart ul li .content .operate input {
    width: 45px;
    height: 34px;
    color: black;
    text-align: center;
}

.cart .account {
    position: fixed;
    bottom: 0px;
} */

.cart {
    width: 100%;
    height: 100vh;
    overflow: hidden;
    .account {
        position: absolute;
        bottom: 0px;
        box-shadow: 0 0 5px #888888;
    }
    .mains{
        padding-bottom: 60px;
    }
    .list {
        .li {
            .box {
                width: 100vw;
                padding: 20px 0 0 0;
                background-color: #fff;
                display: flex;
                flex-direction: row;
                align-items: center;
                .selects {
                    padding: 0 12px;
                    img {
                        width: 18px;
                    }
                    padding-bottom: 20px;
                }
                .select {
                    padding: 0 4px;
                    .lose_efficacy {
                        width: 34px;
                    }
                    padding-bottom: 20px;
                }
                .main {
                    flex: 1;
                    height: 94px;
                    display: flex;
                    flex-direction: row;
                    position: relative;
                    padding-bottom: 20px;
                    border-bottom: 1px solid #e6e6e6;
                    .image {
                        width: 81px;
                        height: 74px;
                        overflow: hidden;
                        img {
                            width: 81px;
                            min-height: 74px;
                        }
                        margin-right:15px;
                    }
                    .center {
                        text-align: left;
                        .breed {
                            font-size: 17px;
                            line-height: 17px;
                            color: #333;
                        }
                        .spec {
                            font-size: 13px;
                            line-height: 13px;
                            color: #999;
                            margin-top: 12px;
                        }
                        .revise_num {
                            display: flex;
                            flex-direction: row;
                            align-items: center;
                            margin-top: 8px;

                            img {
                                width: 27px;
                            }
                            .values {
                                border: none;
                                width: 50px;
                                text-align: center;
                            }
                            .num {
                                font-size: 13px;
                                line-height: 27px;
                                color: #999;
                            }
                        }
                    }
                    .right {
                        position: absolute;
                        top: 0px;
                        right: 15px;
                        color: #fa6705;
                    }
                }
            }
        }
    }
}
</style>
<template>
    <div class="cart">
        <div class="head">
            <cartHead></cartHead>
        </div>
        <div class="page-loadmore-wrapper mains" ref="wrapper" :style="{ height: wrapperHeight + 'px' }">
            <div class="list" v-if="cart.length !== 0">
                <div class="li" v-for="(todo,index) in cart">
                    <mt-cell-swipe :right="[{
                                                                                              content: '删除',
                                                                                              style: { background: 'red', color: '#fff'},
                                                                                              handler:()=> myDelete(todo)}]">
                        <div class="box">
                            <div class="selects" v-show="todo.onSell == 2">
                                <img src="/static/icons/quan.png" class="fit" @click.prevent="confirm(index)" v-show='!cart[index].show'>
                                <img src="/static/icons/buy_quan.png" class="fit" @click.prevent="cancel(index)" v-show='cart[index].show'>
                            </div>
                            <div class="select" v-show="todo.onSell !== 2">
                                <img src="/static/images/lose-efficacy.png" class="lose_efficacy">
                            </div>
                            <div class="main">
                                <div class="image">
                                    <img :src="todo.image[0]">
                                </div>
                                <div class="center">
                                    <div class="breed">{{todo.breedName}}</div>
                                    <div class="spec">库存:{{todo.number+'('+todo.unit+')',7 | filterTxt}}&nbsp;&nbsp;产地:{{todo.location,3 | filterTxt}}</div>
                                    <div class="revise_num" v-show="headParam.show">
                                        <div class="num">购买数量: X{{todo.cartNumber}}</div>
                                    </div>
                                    <div class="revise_num" v-show="!headParam.show">
                                        <div class="num">购买数量:&nbsp;</div>
                                        <img src="/static/images/subtraction.png" class="subtraction" v-tap="{methods:subtraction,index:index}">
                                        <input type="number" v-model="todo.cartNumber" class="values">
                                        <img src="/static/images/addition.png" class="addition" v-tap="{methods:addition,index:index}">
                                    </div>
                                </div>
                                <div class="right">
                                    ￥{{todo.price}}
                                </div>
                            </div>
                        </div>
    
                    </mt-cell-swipe>
                </div>
            </div>
            <!-- <ul id="list" v-if="cart.length !== 0">
                                                                                <li v-for="(todo,index) in cart">
                                                                                     <mt-cell-swipe :right="[{
                                                                                              content: '删除',
                                                                                              style: { background: 'red', color: '#fff'},
                                                                                              handler:()=> myDelete(todo)}]"> 
                                                                                        <div v-bind:class="test">
                                                                                            <div class="top">
                                                                                                <img src="/static/icons/quan.png" class="fit" @click.prevent="confirm(index)" v-show='!cart[index].show'>
                                                                                                <img src="/static/icons/buy_quan.png" class="fit" @click.prevent="cancel(index)" v-show='cart[index].show'>
                                                                                                <p class="name">{{todo.breedName}}</p>
                                                                                                <img src="/static/icons/sample.png" v-if="todo.cartSample == 1" class="cart_sample">
                                                                                                <div v-show="headParam.show">
                                                                                                    <p class="price" v-if="!todo.cartSample">{{todo.price}}元/{{todo.unit}}</p>
                                                                                                    <p class="price" v-if="todo.cartSample">{{todo.sampleAmount }}元/份</p>
                                                                                                </div>
                                                                                                <div class="price" @click="dete(todo.cartId,index,todo)" v-show="!headParam.show">
                                                                                                    删除
                                                                                                </div>
                                                                                            </div>
                                                                                            <div class="bottom">
                                                                                                <img :src="todo.image[0]" class="drug">
                                                                                                <div class="content">
                                                                                                    <p class="stock" v-if="!todo.cartSample">库存:
                                                                                                        <span>{{todo.number}}{{todo.unit}}</span>
                                                                                                    </p>
                                                                                                    <p class="stock" v-if="todo.cartSample">库存:
                                                                                                        <span>{{todo.sampleNumber}}份</span>
                                                                                                    </p>
                                                                                                    <p class="location">产地:
                                                                                                        <span>{{todo.location}}</span>
                                                                                                    </p>
                                                                                                    <div class="operate">
                                                                                                        <button class="mint-button mint-button--primary mint-button--small gray" v-tap="{methods:subtraction,index:index}">—</button>
                                                                                                        <p class="box" @click.prevent="changeValue(index)">
                                                                                                            <input type="number" v-model="todo.cartNumber" disabled=disabled>
                                                                                                        </p>
                                                                                                        <button class="mint-button mint-button--primary mint-button--small gray" v-tap="{methods:addition,index:index}">+</button>
                                                                                                    </div>
                                                                                                </div>
                                                                                            </div>
                                                                                        </div>
                                                                                     </mt-cell-swipe> 
                                                                                </li>
                                                                            </ul> -->
            <settleAccounts class="account" v-if="cart.length !== 0"></settleAccounts>
            <cartErr :param="err" v-if="cart.length == 0"></cartErr>
        </div>
    </div>
</template>
<script>
import {
    mapGetters
} from 'vuex'
import common from '../../common/common.js'
import httpService from '../../common/httpService.js'
import cartHead from '../../components/tools/cartHead'
import settleAccounts from '../../components/tools/settleAccounts'
import cartList from '../../components/tools/cartList'
import validation from '../../validation/validation.js'
import cartErr from '../../components/cart/cartErr'
import filters from '../../filters/filters'
import {
    MessageBox
} from 'mint-ui'



export default {
    data() {
        return {
            err: {
                url: "/static/images/cart-err.png",
                err: '您的购物车是空的哦~',
                router: 'resource',
                next_step: '去采购'
            },
            param: {
                name: '购物车',
                show: true,
                t_show: false
            },
            cart_data: {
                show: true,
                t_show: false,
                price: '',
                value: 1
            },
            money: {
                price: '0.00'
            },
            todos: [],
            list: [],
            topStatus: '',
            wrapperHeight: 0,
            allLoaded: false,
            bottomStatus: ''

        }
    },
    components: {
        cartHead,
        settleAccounts,
        cartList,
        cartErr
    },
    computed: {
        cart() {
            return this.$store.state.cart.cartList;
        },
        headParam() {
            return this.$store.state.cart.headParam;
        },
        httpPraram() {
            return this.$store.state.cart.http_praram;
        }
    },
    methods: {
        myDelete(todo) {
            console.log(todo.breedName)
        },
        subtraction(index) {
            let _self = this;
            _self.$store.dispatch('cutOrderNum', index.index);

        },
        addition(index) {
            let _self = this;
            _self.$store.dispatch('addOrderNum', index.index);
        },
        confirm(index) {
            let _self = this;
            _self.$store.dispatch('showOrder', index);
        },
        cancel(index) {
            let _self = this;
            _self.$store.dispatch('hideOrder', index);
        },
        changeValue(index) {
            common.$emit('prompt', {
                index: index,
                text: '请输入数量',
                title: '您输入的数量是'
            })
            let _self = this;
            MessageBox.prompt(' ', '请输入数量').then(({
                    value
                }) => {
                if (value) {
                    _self.$store.dispatch('changeValue', {
                        value: value,
                        index: index
                    });
                }
            }, () => {
                console.log()
            });
        },
        leftButtonHandler(evt) {
            console.log(123);
        },
        dete(id, index, todo) {

            if (todo.show) {
                this.$store.dispatch('deteCart', {
                    id: id,
                    index: index
                });
            }
        }
    },

    mounted() {
        let _self = this;
        this.wrapperHeight = document.documentElement.clientHeight - this.$refs.wrapper.getBoundingClientRect().top;
    },
    created() {
        let _self = this;
        this.$store.dispatch('getHttp');
    },



}
</script>

