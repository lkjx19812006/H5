<style lang="less" scoped>
input[type="text"],
input[type="submit"],
input[type="reset"],
select,
textarea {
    -webkit-appearance: none;
    border-radius: 0;
}

textarea::-webkit-input-placeholder {
    color: #ADADAD;
}

textarea:-moz-placeholder {
    color: #ADADAD;
}

textarea::-moz-placeholder {
    color: #ADADAD;
}

textarea:-ms-input-placeholder {
    color: #ADADAD;
}

input {
    border: none;
    background-color: #fff;
}

.price_number {
    background-color: #fff;
    box-sizing: border-box;
    padding-left: 15px;
    width: 100%;
    .box {
        height: 50px;
        border-bottom: 1px solid #E6E6E6;
        display: flex;
        flex-direction: row;
        align-items: center;
        .number_left {
            font-size: 15px;
            color: #343434;
            width: 85px;
            text-align: left;
        }
        .number_center {
            flex: 1;
            input {
                width: 100%;
                height: 30px;
                font-size: 15px;
                text-align: right;
            }
            padding-right:10px;
        }
        .number_right {
            width: 100px;
            border-left: 1px solid #E6E6E6;
            height: 40px;
            display: flex;
            flex-direction: row;
            align-items: center;
            justify-content: center;
            position: relative;
            .word {
                flex: 1;
                text-align: right;
                margin-right: 10px;
                color: #7CB159;
            }
            .green {
                color: #7CB159;
            }
            div {
                .select {
                    width: 18px; 
                    right: 15px;
                    margin-top: 6px;
                    margin-right:15px;
                }
            }
        }
    }
    .supplement {
        width: 100%;
        padding: 20px 15px 20px 0;
        font-size: 14px;
        div {
            color: #ADADAD;
            text-align: left;
        }
        .content {
            width: 100%;
            min-height: 50px;
            border: none;
            color: #000;
        }
    }
}
</style>
<template>
    <div class="price_number">
        <div class="box">
            <div class="number_left">{{obj.number_name}}</div>
            <div class="number_center">
                <input type="number" v-model="obj.number" placeholder="请输入">
            </div>
            <div class="number_right" @click="showAction('unit')">
                <div class="word">{{obj.number_unit}}</div>
                <div><img src="/static/icons/green-jian.png" class="select"></div>
            </div>
        </div>
        <div class="box">
            <div class="number_left">{{obj.price_name}}</div>
            <div class="number_center">
                <input type="number" v-model="obj.price" placeholder="请输入">
            </div>
            <div class="number_right">
                <div class="green">元/{{obj.number_unit}}</div>
            </div>
        </div>
        <div class="supplement">
            <div>价格说明</div>
            <textarea class='content' placeholder="示例:如果是现款可以考虑16元，运费需要买家承担" v-model="obj.priceDescription"></textarea>
        </div>
    </div>
</template>
<script>
import common from '../../common/common.js'
import httpService from '../../common/httpService.js'
export default {
    data() {
            return {}
        },
        props: {
            obj: {

            }
        },
        methods: {
            showAction(param) {
                this.$emit('showAction', param)
            }
        },
        components: {

        },
        created() {

        },
        mounted() {

        }
}
</script>
