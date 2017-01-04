<template>
    <div class=" order_item">
        <img src="/static/images/1.jpg">
        <div class="item_right">
            <div class="item_right_div">
                <p class="title">{{param.breedName}}</p>
                <p class="right"><span>{{param.price}}元</span><span class="little_font">/kg</span></p>
            </div>
            <div class="item_right_div">
                <p>规格：{{param.spec}}</p>
            </div>
            <div class="item_right_div">
                <p>产地：{{param.location}}</p>
                <p class="right">重量：{{param.sampleNumber}}kg/份</p>
            </div>
        </div>
        <div class="count">
            <div class="number">购买数量：</div>
            <div class="operate">
                <button class="mint-button mint-button--primary mint-button--small gray" v-on:click="subtraction">—</button>
                <input type="text" disabled='true' v-model="value" :value="value">
                <button class="mint-button mint-button--primary mint-button--small gray" v-on:click="addition">+</button>
            </div>
        </div>
    </div>
</template>
<script>
import common from '../../common/common.js'

export default {
    data() {
            return {
                data: "",
                value: 1
            }
        },
        props: {
            param: {

            }
        },
        created() {

        },
        methods: {
            subtraction() {
                let _self = this;
                if (_self.value == 0) {
                    _self.value == _self.value;
                } else {
                    _self.value = Number(_self.value - 1);
                }
            },
            addition() {
                let _self = this;
                if (_self.value == _self.param.number) {
                    _self.value = _self.value;
                } else {
                    _self.value = Number(_self.value + 1);
                }
            }

        }
}
</script>
<style scoped>
.order_item {
    float: left;
    width: 100%;
}

.order_item img {
    width: 9rem;
    height: 8.5rem;
    position: absolute;
    left: 10px;
}

.order_item .item_right {
    float: left;
    padding-left: 9rem;
    margin-left: 10px;
    min-height: 8.5rem;
    width: 100%;
    text-align: left;
}

.order_item .item_right .item_right_div {
    float: left;
    width: 100%;
    padding-right: 10px;
}

.order_item .item_right .item_right_div p {
    float: left;
    margin-top: 1rem;
    color: #666;
    font-size: 1rem;
}

.order_item .item_right .item_right_div .title {
    margin-bottom: 1rem;
    font-size: 1.6rem;
    color: #333;
}

.order_item .item_right .item_right_div .right {
    float: right;
}

.order_item .item_right .item_right_div .right span {
    color: #FA6705;
    font-size: 1.6rem;
}

.order_item .item_right .item_right_div .right .little_font {
    font-size: 1.2rem;
}

.order_item .count {
    float: left;
    width: 100%;
    padding: 1rem 0;
    border-top: 1px solid #ddd;
    border-bottom: 1px solid #ddd;
    margin-top: 10px;
    font-size: 1.2rem;
    color: #333;
}

.order_item .count .number {
    float: left;
    line-height: 3.5rem;
}

.order_item .count .operate {
    margin-right: 1rem;
}

.order_item .count .operate button {
    height: 3.5rem;
    width: 3.5rem;
    padding: 0;
    float: right;
    font-size: 1.5rem;
    border-radius: 0;
    background: #fff;
    border-top: 1px solid #ddd;
    border-bottom: 1px solid #ddd;
    color: #333;
}

.order_item .count .operate input {
    height: 3.5rem;
    width: 3.5rem;
    padding: 0;
    float: right;
    font-size: 1.5rem;
    border-radius: 0;
    background: #fff;
    border: none;
    border-top: 1px solid #ddd;
    border-bottom: 1px solid #ddd;
    color: #333;
    text-align: center;
}

.order_item .count .operate .gray {
    background: #F5F5F5;
    border: 1px solid #ddd;
    color: #000;
    font-weight: bold;
}
</style>
