<template>
    <div class="cart">
        <div class="head">
            <cartHead></cartHead>
        </div>
        <div class="page-loadmore-wrapper" ref="wrapper" :style="{ height: wrapperHeight + 'px' }">
            <!-- <mt-loadmore> -->
            <ul id="list" v-if="cart.length !== 0">
                <li v-for="(todo,index) in cart">
                    <!--  <mt-cell-swipe :right="rightButtons"> -->
                    <!-- <cartList></cartList> -->
                    <!-- :param="cart_data" -->
                    <div v-bind:class="test">
                        <div class="top">
                            <img src="/static/icons/quan.png" class="fit" @click.prevent="confirm(index)" v-show='!cart[index].show'>
                            <img src="/static/icons/buy_quan.png" class="fit" @click.prevent="cancel(index)" v-show='cart[index].show'>
                            <!-- v-show="cart[index].show" -->
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
                                <p class="stock" v-if="!todo.cartSample">库存:<span>{{todo.number}}{{todo.unit}}</span></p>
                                <p class="stock" v-if="todo.cartSample">库存:<span>{{todo.sampleNumber}}份</span></p>
                                <p class="location">产地:<span>{{todo.location}}</span></p>
                                <div class="operate">
                                    <button class="mint-button mint-button--primary mint-button--small gray" v-tap="{methods:subtraction,index:index}">—</button>
                                    <!--  -->
                                    <p class="box" @click.prevent="changeValue(index)">
                                        <input type="number" v-model="todo.cartNumber" disabled=disabled>
                                    </p>
                                    <button class="mint-button mint-button--primary mint-button--small gray" v-tap="{methods:addition,index:index}">+</button>
                                    <!--  -->
                                </div>
                            </div>
                        </div>
                    </div>
                    <!-- <div class="dete" v-show="param.t_show">删除</div> -->
                    <!-- </mt-cell-swipe> -->
                </li>
            </ul>
            <!-- </mt-loadmore> -->
            <settleAccounts class="account" v-if="cart.length !== 0"></settleAccounts>
            <!-- <div class="pop_up">
                <div class="pop_box">
                    <div class="title">
                        请选择商品数量:
                    </div>
                    <div class="but">
                        <button class="mint-button mint-button--primary mint-button--small gray">—</button>
                        <p class="box">
                            <input type="number" disabled=disabled>
                        </p>
                        <button class="mint-button mint-button--primary mint-button--small gray">+</button>
                    </div>
                </div>
                <div class="foo">
                    <div class="foo_cancel">取消</div>
                    <div class="foo_confirm">确定</div>
                </div>
            </div> -->
            <err :param="err" v-if="cart.length == 0"></err>
        </div>
    </div>
</template>
<script>
import {
    mapGetters
} from 'vuex'
import common from '../common/common.js'
import httpService from '../common/httpService.js'
import cartHead from '../components/tools/cartHead'
import settleAccounts from '../components/tools/settleAccounts'
import cartList from '../components/tools/cartList'
import validation from '../validation/validation.js'
import err from '../components/tools/err'
import {
    MessageBox
} from 'mint-ui'



export default {
    data() {
            return {
                err: {
                    url: "/static/icons/no-cart.png",
                    err: '该购物车暂无商品',
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
            err
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
        /* watch: {
             list: function(newValue, oldValue) {
                 for (var i = 0; i < newValue.length; i++) {
                     if (newValue[i].cartNumber !== oldValue[i].cartNumber) {
                         console.log(i);

                     }
                 }
             }
         },*/
        methods: {

            handleBottomChange(status) {
                this.bottomStatus = status;
            },
            loadBottom(id) {
                /*setTimeout(() => {
                    if (this.todos.length < this.httpPraram.page * this.httpPraram.pageSize) {
                        this.allLoaded = true;
                    } else {
                        this.httpPraram.page++;
                        this.getHttp(function() {
                            _self.$refs.loadmore.onBottomLoaded(id);
                        });
                    }
                }, 1500);*/
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
            subtraction(index) {
                let _self = this;
                //todo.todo.value = Number(todo.todo.value) - 1;
                //console.log(todo.todo)
                _self.$store.dispatch('cutOrderNum', index.index);

            },
            addition(index) {
                let _self = this;
                //todo.todo.value = Number(todo.todo.value) + 1;
                _self.$store.dispatch('addOrderNum', index.index);
            },
            confirm(index) {
                let _self = this;
                _self.$store.dispatch('showOrder', index);
                /*_self.cart.show = !_self.cart.show;*/
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



                /*if (todo.show) {
                    this.$store.dispatch('deteCart', {
                        id: id,
                        index: index
                    });
                }*/
                /*this.$store.dispatch('getHttp');*/
            }
        },

        mounted() {
            let _self = this;
            this.wrapperHeight = document.documentElement.clientHeight - this.$refs.wrapper.getBoundingClientRect().top;
            /*this.wrapperHeight = window.screen.height - this.$refs.wrapper.getBoundingClientRect().top;*/
        },
        created() {
            /*for (let i = 1; i <= 10; i++) {
                this.list.push(i);
            }*/
            /*this.$http.get('/static/data/list.json').then((response) => {
                this.todos = response.data;
                console.log(response.data)
            }, (response) => {
                console.log(response.data)
            });*/
            let _self = this;
            this.$store.dispatch('getHttp');
            this.rightButtons = [{
                content: '删除',
                style: {
                    background: 'red',
                    color: '#fff'
                },
                handler: () => console.log(1111)
            }];
        },



}
</script>
<style scoped>
.cart {
    position: relative;
    /*padding-top: 50px;*/
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
    /*position: absolute;*/
    margin-left: -50%;
    /*margin-top: -50px;*/
    /*top: 50%;*/
    height: 110px;
    width: 100%;
    display: flex;
    margin: 0px auto;
    padding-top: 30px;
}

.cart .pop_up .title {
    /*float: left;*/
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
    /*float: left;*/
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
    /*position: fixed;
    top: 0;*/
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
    /*margin-top: 20px;*/
    background: #F2F2F2;
    /*padding-bottom: 50px;*/
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
    /*position: absolute;
    left: 15px;
    top: 8px;*/
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
}
</style>
