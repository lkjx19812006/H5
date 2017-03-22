<template>
    <div class="total">
        <img src="/static/icons/quan.png" class="fit_all" @click="confirm" v-show="!allShow">
        <img src="/static/icons/buy_quan.png" class="fit_all" @click="cancel" v-show='allShow'>
        <p class="fit_word">全选</p>
        <div class="account" @click="account(cart,allPrice)" v-show="headParam.show">
            结算({{orderNum}})
        </div>
        <div class="account" @click="detelt" v-show="!headParam.show">
            删除({{orderNum}})
        </div>
        <div class="total_center">
            <p>合计:￥<span>{{allPrice}}</span></p>
            <p>不含运费</p>
        </div>
    </div>
</template>
<script>
import common from '../../common/common.js'
export default {
    data() {
            return {
                show: true
            }
        },
        props: {
            param: {

            }
        },
        computed: {
            cart() {
                //console.log(this.$store.state.cart.cartList)
                return this.$store.state.cart.cartList;
            },
            allPrice() {
                return this.$store.state.cart.all_price;
            },
            allShow() {
                return this.$store.state.cart.all_show;
            },
            headParam() {
                return this.$store.state.cart.headParam;
            },
            orderNum() {
                return this.$store.state.cart.order_num;
            }
        },
        methods: {
            confirm() {
                this.$store.dispatch('allOrderShow');
            },
            cancel() {
                this.$store.dispatch('allOrderHide');
            },
            account(cart, allPrice) {

                let arr = [];
                let n = 0;
                for (var i = 0; i < cart.length; i++) {
                    if (cart[i].show) {
                        console.log(cart[i].show)
                        arr.unshift(cart[i]);
                    }
                    if (cart[i].show) n += 1;
                }

                if (n == cart.length && n !== 0) {
                    console.log(n)
                    localStorage.setItem('cartContent', JSON.stringify(arr));
                    localStorage.setItem('allPrice', JSON.stringify(allPrice));
                    common.$emit('cartContent', arr);
                    common.$emit('cartPrice', allPrice);
                    this.$router.push('/multipleOrders');
                } else {
                    common.$emit('message', '请添加要购买的商品！')
                }

            },
            detelt() {
                this.$store.dispatch('deteAllCart');
            }
        },
        created() {

        }
}
</script>
<style scoped>
.total {
    width: 100%;
    z-index: 20000;
    padding: 10px;
    background: white;
    float: left;
}

.total .fit_all {
    width: 24px;
    float: left;
    margin-left: 5px;
    margin-top: 7px;
}

.total .fit_word {
    float: left;
    font-size: 16px;
    margin-top: 8px;
    margin-left: 14px;
}

.total .account {
    float: right;
    padding: 10px 20px;
    background: #fa6705;
    border-radius: 4px;
    margin-left: 5px;
}

.total .total_center {
    float: right;
    text-align: right;
}
</style>
