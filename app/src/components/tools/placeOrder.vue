<template>
    <div class="place_order">
        <p class="title">运输价格待确认</p>
        <div class="button" @click="confirm">提交订单</div>
        <p class="price">合计:￥{{allPrice}}</p>
    </div>
</template>
<script>
import common from '../../common/common.js'
export default {
    data() {
            return {
                allPrice: ''
            }
        },
        props: {
            param: {

            }
        },
        computed: {
            /*allPrice() {
                return this.$store.state.cart.all_price;
            }*/
        },
        methods: {
            orderPrice() {
                let _self = this;
                var allPrice = localStorage.getItem('allPrice');
                //console.log(_self.cart)
                _self.allPrice = JSON.parse(allPrice);
                console.log(_self.allPrice)

                /*localStorage.removeItem('cartContent');*/
            },
            confirm() {
                this.$emit('submitCartOrder')
            }
        },
        created() {
            let _self = this;
            _self.orderPrice();
            common.$on('cartPrice', function(item) {
                _self.allPrice = item;
            })
        }
}
</script>
<style scoped>
.place_order {
    background: white;
    float: left;
    width: 100%;
    padding-left: 15px;
}

.place_order .title {
    float: left;
    margin-top: 10px;
}

.place_order .button {
    float: right;
    padding: 10px 20px;
    background: #FA6705;
    border-radius: 5px;
    margin-left: 10px;
}

.place_order .price {
    float: right;
    margin-top: 10px;
}
</style>
