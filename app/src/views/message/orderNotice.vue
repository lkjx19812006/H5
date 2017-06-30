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

.order_notice {
    height: 100vh;
    background-color: #F5F5F5;
    .box {
        height: 92vh;
        overflow-y: scroll;
        padding: 0 15px;
        .item {
            margin-bottom: 7px;
            .top {
                color: #A6A6A6;
                font-size: 12px;
                height: 33px;
                line-height: 33px;
            }
            .main {
                text-align: left;
                border-radius: 4px;
                background-color: #fff;
                padding: 10px 10px 11px 10px;
                position: relative;
                .type {
                    padding-left: 4px;
                    font-size: 15px;
                    color: #4FC372;
                    height: 15px;
                    .right {
                        height: 30px;
                        position: absolute;
                        right: -4px;
                        top: 0;
                    }
                }
                .content {
                    padding: 9px 4px 10px 4px;
                    color: #4D4D4D;
                    font-size: 15px;
                    line-height: 20px;
                    border-bottom: 1px solid #E6E6E6;
                }
                .footer {
                    .delet {
                        color: red;
                        width: 80px;
                        text-align: right;
                    }
                    display: flex;
                    flex-direction: row;
                    justify-content: space-between;
                    line-height: 15px;
                    padding: 15px 4px 0 4px;
                    color: #999999;
                    .right {
                        display: flex;
                        flex-direction: row;
                        justify-content: space-between;
                        width: 80px;
                        img {
                            height: 14px;
                            margin-top: -2px;
                        }
                    }
                }
                @media (max-width: 320px) {
                    .footer {
                        .delet {
                            color: red;
                            width: 60px;
                            text-align: right;
                        }
                        font-size: 11px;
                        .right {
                            width: 60px;
                            img {
                                height: 12px;
                                margin-top: 0px;
                            }
                        }
                    }
                }
            }
        }
    }
}
</style>
<template>
    <div class="order_notice">
        <userHead :param="paramHead"></userHead>
        <div class="box">
            <div class="item" v-for="todo in arr" @click="jump(todo)">
                <div class="top">{{todo.creatTime | successTimeFormats}}</div>
                <div class="main">
                    <div class="type">
                        <div class="left">
                            <!-- 已发货 -->
                        </div>
                        <!-- <img src="/static/icon/need-order.png" class="right" v-if="todo.intentionType == '1'"> -->
                        <img src="/static/icon/need-order.png" class="right" v-if="todo.intentionType == '2'">
                        <img src="/static/icon/sell-order.png" class="right" v-if="todo.intentionType == '3'">
                    </div>
                    <div class="content">
                        {{todo.message}}
                    </div>
                    <div class="footer">
                        <div class="order_num">订单编号: {{todo.no}}</div>
                        <div class="right">
                            <!-- <div>点击查看</div> -->
                            <div v-if='!paramHead.show'>点击查看</div>
                            <div class="delet" v-if='paramHead.show' @click.stop="delet(todo)">删除</div>
                            <img src="/static/icon/right.png" v-if='!paramHead.show'>
                        </div>
                    </div>
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
                    name: '订单消息',
                    revise: true,
                    show: false
                },
                arr: []
            }
        },
        components: {
            userHead
        },
        created() {
            let _self = this;
            _self.getHttp();
            common.$on('messageDetail', function(id) {
                if (id == '3') {
                    _self.getHttp();
                }
            })
        },
        methods: {
            getHttp() {
                let _self = this;
                common.$emit('show-load');
                let url = common.addSID(common.urlCommon + common.apiUrl.most);
                let body = {
                    biz_module: 'pushService',
                    biz_method: 'myMessagePushList',
                    biz_param: {
                        type: '3'
                    }
                };
                body.time = Date.parse(new Date()) + parseInt(common.difTime);
                body.sign = common.getSign('biz_module=' + body.biz_module + '&biz_method=' + body.biz_method + '&time=' + body.time);
                httpService.myResource(url, body, function(suc) {
                    common.$emit('close-load');
                    if (suc.data.code == '1c01') {
                        _self.arr = suc.data.biz_result.list;
                    } else {
                        common.$emit('message', suc.data.msg);
                    }

                }, function(err) {
                    common.$emit('close-load');
                    common.$emit('message', err.data.msg);
                })
            },
            jump(todo) {
                let _self = this;
                if (todo.intentionType == '1') {
                    common.$emit("confirm", {
                        message: '请下载App后，在App内查看',
                        title: '提示',
                        ensure: this.loadApp
                    });
                } else {
                    common.$emit('post-no', todo.orderId);
                    _self.$router.push('/allOrderDetail/' + todo.orderId);
                }

            },
            delet(todo) {
                let _self = this;
                common.$emit('show-load');
                let url = common.addSID(common.urlCommon + common.apiUrl.most);
                let body = {
                    biz_module: 'pushService',
                    biz_method: 'deleteMyMessage',
                    biz_param: {
                        messageList: [todo.id]
                    }
                };
                body.time = Date.parse(new Date()) + parseInt(common.difTime);
                body.sign = common.getSign('biz_module=' + body.biz_module + '&biz_method=' + body.biz_method + '&time=' + body.time);
                httpService.myResource(url, body, function(suc) {
                    common.$emit('close-load');
                    if (suc.data.code == '1c01') {
                        common.$emit('message', suc.data.msg);
                        console.log(1212)
                        _self.getHttp();
                    } else {
                        common.$emit('message', suc.data.msg);
                    }

                }, function(err) {
                    common.$emit('close-load');
                    common.$emit('message', err.data.msg);
                })
            },
            loadApp() {
                window.location.href = 'http://a.app.qq.com/o/simple.jsp?pkgname=com.yaocaimaimai.yaocaimaimai';
            },
        },
        mounted() {

        }
}
</script>
