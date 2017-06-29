<style lang="less" scoped>
input[type="text"],
input[type="submit"],
input[type="reset"],
select,
textarea {
    -webkit-appearance: none;
    border-radius: 0;
}

input {
    border: none;
}

.message {
    height: 100vh;
    background-color: #fff;
    .box {
        height: 92vh;
        .inbox {
            padding: 15px;
            display: flex;
            flex-direction: row;
            border-bottom: 1px solid #E8E8E8;
            .image {
                position:relative;
                .img {
                    width: 42px;
                    height: 42px;
                }
                .red{
                   position:absolute;
                   width:9px;
                   height:9px;
                   right:0;
                   top:0;
                }
            }
            .content {
                text-align: left;
                padding-left: 15px;
                .title {
                    font-size: 16px;
                    line-height: 16px;
                    color: #1A1A1A;
                }
                .other {
                    font-size: 12px;
                    line-height: 15px;
                    margin-top: 10px;
                    color: #808080;
                }
            }
        }
    }
}
</style>
<template>
    <div class="message">
        <userHead :param="paramHead"></userHead>
        <div class="box">
            <div class="inbox" v-for="(todo,index) in arr">
                <div class="image">
                    <img :src="todo.url" class="img">
                    <img src="/static/icon/i-red.png" class="red">
                </div>
                <div class="content">
                    <div class="title">{{todo.name}}</div>
                    <div class="other">你懂的额可是大厦客户打哈哈淡定哈开始</div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import common from '../../common/common.js'
import validation from '../../validation/validation.js'
import httpService from '../../common/httpService.js'
import filters from '../../filters/filters'
import userHead from '../../components/user/userHead'
export default {
    data() {
            return {
                paramHead: {
                    name: '消息中心',
                },
                arr: [{
                    name: '意向消息',
                    show: false,
                    url: '/static/icon/intent.png'
                }, {
                    name: '报价消息',
                    show: false,
                    url: '/static/icon/i-report-sell.png'
                }, {
                    name: '订单消息',
                    show: false,
                    url: '/static/icon/i-order.png'
                }, {
                    name: '活动消息',
                    show: false,
                    url: '/static/icon/i-activity.png'
                }]
            }
        },
        components: {
            userHead
        },
        created() {

        },
        methods: {

        },
        mounted() {

        }
}
</script>
