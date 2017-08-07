<style lang="less" scoped>
.choose_num {
    background-color: #fff;
    position: absolute;
    z-index: 2000;
    bottom: 0px;
    width: 100%;
    .top {
        height: 84px;
        padding-left: 10px;
        position: relative;
        display: flex;
        flex-direction: row;
        align-items: center;
        .cancel {
            position: absolute;
            width: 15px;
            height: 15px;
            right: 9px;
            top: 9px;
        }
        .image {
            position: absolute;
            width: 98px;
            height: 98px;
            overflow: hidden;
            left: 10px;
            top: -23px;
            img {
                width: 98px;
                min-height: 98px;
            }
        }
        .top_right {
            padding-left: 10px;
            margin-left: 110px;
            .breed {
                display: flex;
                flex-direction: row;
                padding-left: 4px;
                img {
                    width: 20px;
                    height: 20px;
                    margin-right: 5px;
                }
                .breedname {
                    font-size: 17px;
                    color: #000;
                    line-height: 20px;
                }
            }
            .price {
                font-size: 15px;
                color: #fa6705;
                margin-top: 15px;
            }
        }
    }

    .list_box {
        padding-left: 10px;
    }
    .list {
        display: flex;
        flex-direction: row;
        align-items: center;
        border-top: 1px solid #e6e6e6;
        .li {
            font-size: 16px;
            padding: 14px 0;
        }
        .left {
            width: 98px;
            text-align: left;
            padding-left: 4px;
            color: #808080;
        }
        .right {
            flex: 1;
            text-align: left;
            color: #333;
            display: flex;
            flex-direction: row;
            align-items: center;
            img {
                width: 27px;
            }
            .values {
                border: none;
                width: 40px;
                text-align: center;
            }
        }
    }
    .footer {
        padding-top: 50px;
        .confirm {
            height: 50px;
            font-size: 16px;
            color: #fff;
            background-color: #fa6705;
            line-height: 50px;
        }
    }
    @media screen and (min-width: 0px) and (max-height: 568px) {
        .top {
            height: 70px;
            .image {
                position: absolute;
                width: 68px;
                height: 68px;
                overflow: hidden;
                left: 10px;
                top: -13px;
                img {
                    width: 68px;
                    min-height: 68px;
                }
            }
            .top_right {
                padding-left: 10px;
                margin-left: 80px;
                .breed {
                    .breedname {
                        font-size: 15px;
                        color: #000;
                        line-height: 20px;
                    }
                }
                .price {
                    font-size: 14px;
                    color: #fa6705;
                    margin-top: 10px;
                }
            }
        }
        .list {
            .li {
                font-size: 15px;
                padding: 10px 0;
            }
        }
        .footer {
            padding-top: 40px;
        }
    }
}
</style>
<template>
    <div class="choose_num">
        <div class="top">
            <div class="image">
                <img :src="param.image" alt="">
            </div>
            <div class="top_right">
                <div class="breed">
                    <img src="/static/icon/square-zheng.png" v-if="param.especial == 1 && param.type == 1">
                    <img src="/static/icon/square-sampling.png" v-if="param.sampling == 1 && param.type == 1">
                    <div class="breedname">
                        {{param.breedName}}
                    </div>
                </div>
                <div class="price" v-if="param.isRed">
                    ￥{{param.price}}元/{{param.unit}}
                </div>
                <div class="price" v-if="!param.isRed">
                    ￥{{param.sampleAmount}}元/份
                </div>
                <img src="/static/icons/cancel.png" class="cancel" @click="cancelNum()">
            </div>
        </div>
        <div class="list_box">
            <div class="list" v-for="(todo,index) in arr">
                <div class="li left">
                    {{todo.title}}
                </div>
                <div class="li right" v-show="index==0 && param.isRed">{{param.number}}{{param.unit}}</div>
                <div class="li right" v-show="index==0 && !param.isRed">{{param.sampleNumber}}份</div>
                <div class="li right" v-show="index==1">{{param.location}}</div>
                <div class="li right" v-show="index==2 && param.isRed">{{param.moq}}{{param.unit}}</div>
                <div class="li right" v-show="index==2 && !param.isRed">{{param.moq}}份</div>
                <div class="li right" v-show="index==3">
                    <img src="/static/images/subtraction.png" class="subtraction" v-tap="{methods:subtraction}">
                    <input type="number" v-model="param.value" class="values">
                    <img src="/static/images/addition.png" class="addition" v-tap="{methods:addition}">
                </div>
            </div>
        </div>
        <div class="footer">
            <div class="confirm" @click="confirm">确定</div>
        </div>
    </div>
</template>
<script>
import common from '../../common/common.js'
import filters from '../../filters/filters'
export default {
    data() {
        return {
            arr: [{
                title: '产品库存'
            }, {
                title: '产品产地'
            }, {
                title: '起订数量'
            }, {
                title: '购买数量'
            }]
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
            handler: function (newVal, oldVal) {
                let _self = this;
                console.log(newVal.value, oldVal.value);
                console.log(typeof (newVal.value))

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

