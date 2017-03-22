<template>
    <div class="my-header">
        <div v-bind:class="{ header_content: !param.topissue, 'header_contentt': param.topissue }">
            <div class="go-back" @click="jumpBack()">
                <img src="/static/images/go-back.png">
            </div>
            <div class="title-name">
                <p>{{param.name}}</p>
            </div>
            <p v-show="param.show" @click="jumpRevise">编辑</p>
            <p v-show="param.t_show" @click="jumpRevise">完成</p>
            <div class="mycart" v-show="param.mycart" @click="jump(param)">
                <img src="/static/icons/cart.png">
            </div>
            <!-- <p v-show="param.invite_code" @click="fillIn">{{param.code_name}}</p>
            <p v-show="param.confirm_fill" @click="fillInBack">{{param.code_name}}</p> -->
        </div>
    </div>
</template>
<script>
import common from '../../common/common.js'
import {
    mapGetters
} from 'vuex'
export default {
    data() {
            return {}
        },
        props: {
            param: {}
        },
        methods: {
            jumpBack() {
                let _self = this;
                if (this.param.goBack) {
                    _self.$router.push('/home');
                } else {
                    if (window.history.length == 1) {
                        _self.$router.push('/home');
                    } else {
                        if (_self.param.goSecond) {
                            common.$emit('getInfo', 1);
                            /*_self.$router.push('/home');  */
                            window.history.go(-2)
                        } else if (_self.param.go_where) {
                            common.$emit('backAddress', 1); //对于地址列表退回订单页
                            window.history.go(-1);
                        } else if (common.pageParam.skipLogin == true) {
                            common.pageParam.skipLogin = false;
                            //console.log(2222)
                            window.history.go(-2)
                        } else if (common.pageParam.skipPer == true) {
                            common.pageParam.skipPer = false;
                            window.history.go(-3)
                        } else {
                            window.history.go(-1);
                        }

                    }

                }

            },
            jumpRevise() {
                let _self = this;
                if (_self.param.t_show == true) {
                    _self.$emit('myUpData', 'genxin');

                } else if (_self.param.tt == true) {
                    common.$emit("informAccountFinish", "refurbish");
                    _self.$router.push(_self.param.reviseRouter);
                } else {
                    common.$emit("res-id", this.param.item);
                    _self.$router.push(_self.param.reviseRouter); //跳转到修改资源
                }
            },
            fillIn() {
                let _self = this;
                _self.$router.push('requestCode');
            },
            fillInBack() {
                let _self = this;
                this.$emit("confirmFill", 1);
            },
            jump(param) {
                //console.log(param.id)
                let _self = this;
                if (!common.customerId) {
                    function loadApp() {
                        common.$emit('back_login', {
                            id: param.id,
                            isMy: param.isMy
                        });
                        common.$emit('setParam', 'backRouter', 'lowPriceRes');
                        _self.$router.push('/login');
                    }
                    common.$emit('confirm', {
                        message: '请先登录',
                        title: '提示',
                        ensure: loadApp
                    });
                    return;
                }
                this.$store.dispatch('getHttp');
                this.$router.push('/cart')
            }
        }
}
</script>
<style scoped>
.my-header {
    width: 100%;
    height: 50px;
    background: #EC6817;
}

.my-header .header_content {
    background: #EC6817;
    position: fixed;
    top: 0;
    width: 100%;
    height: 50px;
    z-index: 2000;
}

.my-header .header_contentt {
    background: #EC6817;
    width: 100%;
    height: 50px;
}

.my-header .header_contentt .mycart>img {
    width: 26px;
    margin-top: 12px;
}

.my-header .title-name {
    width: 60%;
    height: 50px;
    float: left;
    font-size: 1.7rem;
    line-height: 50px;
    color: white;
}

.my-header .go-back {
    float: left;
    width: 20%;
    padding-right: 5%;
    height: 50px;
    z-index: 20000;
    background: #EC6817;
}

.my-header .go-back img {
    margin-top: 15px;
    height: 20px;
}

.my-header .header_content>p {
    position: absolute;
    right: 0;
    font-size: 14px;
    top: 0;
    padding: 16px 1.5rem;
    color: white;
}

.my-header .header_contentt>p {
    position: absolute;
    right: 0;
    font-size: 14px;
    top: 0;
    padding: 16px 1.5rem;
    color: white;
}

.my-header .active {
    color: #FA6705;
}
</style>
