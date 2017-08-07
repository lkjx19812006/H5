<template>
    <div class="choose_num">
        <div class="top">
            <div class="drug_img">
                <img src="/static/icons/zheng.png" class="bao">
                <img :src="param.image" class="drug">
            </div>
            <div class="top_center" v-if="param.isRed">
                <div class="title">
                    <p class="title_name">{{param.breedName}}</p>
                    <p class="img"><img src="/static/icons/sample.png" v-if="!param.isRed"></p>
                    <p class="price">{{param.price}}<span>元/{{param.unit}}</span></p>
                </div>
                <!-- <div class="price">22.00<span>元/公斤</span></div> -->
                <div class="stock">库存:<span>{{param.number}}{{param.unit}}</span></div>
                <div class="location">产地:{{param.location}}</div>
                <div class="moq">起订量:{{param.moq}}{{param.unit}}</div>
                <img src="/static/icons/cancel.png" class="cancel" @click="cancelNum()">
            </div>
            <div class="top_center" v-if="!param.isRed">
                <div class="title">
                    <p class="title_name">{{param.breedName}}</p>
                    <p class="img"><img src="/static/icons/sample.png"></p>
                    <p class="price">{{param.sampleAmount}}<span>元/份</span></p>
                </div>
                <!-- <div class="price">22.00<span>元/公斤</span></div> -->
                <div class="stock">库存:<span>{{param.sampleNumber}}份</span></div>
                <div class="location">产地:{{param.location}}</div>
                <div class="moq">起订量:{{param.moq}}份</div>
                <img src="/static/icons/cancel.png" class="cancel" @click="cancelNum()">
            </div>
        </div>
        <div class="center">
            <div class="number">购买数量：</div>
            <div class="operate">
                <button class="mint-button mint-button--primary  gray other" v-tap="{methods:subtraction}">-</button>
                <input type="number" v-model="param.value">
                <button class="mint-button mint-button--primary  gray" v-tap="{methods:addition}">+</button>
            </div>
        </div>
        <div class="bottom">
            <!-- <div class="prompt">购买数量可以直接输入</div>
            <div class="confirm" @click="confirm()">确定</div> -->
        </div>
        <div class="footer" @click="confirm">确定</div>
    </div>
</template>
<script>
import common from '../../common/common.js'
import filters from '../../filters/filters'
export default {
    data() {
            return {

            }
        },
        props: {
            param: {
                value: 1
            }
        },
        methods: {
            jump() {
                this.$router.push('');
            },
            subtraction() {
                let _self = this;
                if (_self.param.value > _self.param.moq) {
                    _self.param.value = Number(_self.param.value - 1);
                }
            },
            addition() {
                let _self = this;
                if (_self.param.isRed) {
                    if (_self.param.value < _self.param.number) {
                        _self.param.value = Number(_self.param.value + 1);
                    }
                } else {
                    if (_self.param.value < _self.param.sampleNumber) {
                        _self.param.value = Number(_self.param.value + 1);
                    }
                }

            },
            cancelNum() {
                let _self = this;
                _self.param.push_num = false;
            },
            confirm() {
                let _self = this;
                this.$emit('addCart')
            }
        },
        watch: {
            param: {
                handler: function(newVal, oldVal) {
                    let _self = this;
                    console.log(newVal.value, oldVal.value);
                    console.log(typeof(newVal.value))

                    if (parseInt(newVal.value)) {
                        newVal.value = parseInt(newVal.value);
                        if (_self.param.isRed) {
                            if (newVal.value > _self.param.number) {
                                newVal.value = _self.param.number;
                            } else if (newVal.value < _self.param.moq) {
                                newVal.value = _self.param.moq;
                            }
                        } else {
                            if (newVal.value > _self.param.sampleNumber) {
                                newVal.value = _self.param.sampleNumber;
                            } else if (newVal.value < _self.param.moq) {
                                newVal.value = _self.param.moq;
                            }
                        }

                    } else {
                        newVal.value = '';
                    }

                },
                deep: true
            }
        },
        created() {
            let _self = this;



        }

}
</script>
<style scoped>
.choose_num {
    position: absolute;
    z-index: 2000;
    bottom: 0px;
    width: 100%;
    float: left;
}

.choose_num .top {
    padding: 15px 15px 15px 15px;
    background-color: #fff;
    float: left;
    width: 100%;
}

.choose_num .top .drug_img {
    width: 32%;
    position: relative;
    float: left;
}

.choose_num .top .drug_img .bao {
    position: absolute;
    left: 0px;
    top: 0px;
    width: 24px;
}

.choose_num .top .drug {
    height: 8.3rem;
    width: 100%;
}

.choose_num .top .top_center {
    text-align: left;
    float: right;
    width: 64%;
    border-left: none;
    border-right: none;
}

.choose_num .top .top_center>div {
    margin-bottom: 0.25rem;
    font-size: 1.4rem;
    color: #5b5b5b;
}

.choose_num .top .top_center .title {
    font-size: 1.5rem;
    margin-bottom: 0.5rem;
    color: #333;
    display: flex;
    flex-direction: row;
}

.choose_num .top .top_center .title .img {
    margin-left: 4px;
}

.choose_num .top .top_center .title img {
    width: 1.2rem;
    margin-top: 4px;
    flex: 1;
}

.choose_num .top .top_center .title .price {
    font-size: 1.4rem;
    color: #FA6705;
    margin-top: 4px;
    margin-left: 1.5rem;
}

.choose_num .top .top_center .title .price span {
    font-size: 1.1rem;
}

.choose_num .top .top_center>.cancel {
    position: absolute;
    top: 10px;
    right: 15px;
    width: 20px;
}

.choose_num .center {
    float: left;
    background: white;
    padding: 0.5rem 15px;
    text-align: left;
    width: 100%;
    border: 1px solid #E5E5E5;
    font-size: 1.4rem;
}

.choose_num .center .number {
    float: left;
    line-height: 34px;
}

.choose_num .center .operate {
    float: right;
}

.choose_num .center .operate button {
    width: 34px;
    height: 34px;
    background: #F5F5F5;
    margin: 0;
    color: #B1B1B1;
    font-size: 22px;
    display: inline-block;
}

.choose_num .center .operate .other {
    font-size: 30px;
}

.choose_num .center .operate>input {
    width: 45px;
    height: 34px;
    color: black;
    text-align: center;
}

.choose_num .bottom .prompt {
    text-align: right;
}

.choose_num .footer {
    font-size: 1.8rem;
    padding: 0.8rem;
    background: #FA6705;
    float: left;
    width: 100%;
    color: white;
}

.choose_num .bottom .confirm {
    width: 37%;
    background: red;
    border-radius: 4px;
    padding: 10px;
    margin-left: 24%;
    margin-top: 32px;
}

.choose_num .bottom {
    background-color: #F2F2F2;
    float: left;
    width: 100%;
    background: white;
    height: 14rem;
}

@media screen and (max-height: 736px) {
    .choose_num .bottom {
        background-color: #F2F2F2;
        float: left;
        width: 100%;
        background: white;
        height: 17rem;
    }
}

@media screen and (min-height: 663px) and (max-height: 735px) {
    .choose_num .bottom {
        background-color: #F2F2F2;
        float: left;
        width: 100%;
        background: white;
        height: 15rem;
    }
}

@media screen and (min-height: 482px) and (max-height: 660px) {
    .choose_num .bottom {
        background-color: #F2F2F2;
        float: left;
        width: 100%;
        background: white;
        height: 8rem;
    }
}

@media screen and (max-height: 480px) {
    .choose_num .bottom {
        background-color: #F2F2F2;
        float: left;
        width: 100%;
        background: white;
        height: 4rem;
    }
}
</style>
