<style lang="less" scoped>
// .telAndAttention {
//     float: left;
//     width: 100%;
// }
// .telAndAttention .small_button {
//     width: 50%;
//     float: left;
//     background: #EEEEEE;
//     border: 1px solid #ddd;
//     padding-left: 0;
//     padding-right: 0;
// }
// .telAndAttention .small_button img {
//     max-height: 13px;
// }
// .telAndAttention .small_button p {
//     font-size: 10px;
//     color: #333;
// }
.telAndAttention {
    height: 50px;
    padding: 8px 0;
    background-color: #fff;
    width: 126px;
    display: flex;
    flex-direction: row;
    .attention {
        flex: 1;
        img {
            width: 20px;
        }
        .word {
            font-size: 10px;
            line-height: 10px;
            color: #999;
        }
        .unfollow{
            color:#ff0000;
        }
    }
    .left {
        border-right: 1px solid #e6e6e6;    
    }
}
</style>
<template>
    <div class="telAndAttention">
        <div class="attention left">
            <img src="/static/images/tel.png">
            <div class="word">电话</div>
        </div>
        <div class="attention" v-if="!obj.isAttention" v-on:click="myAttention(1)">
            <img src="/static/images/unfollow.png">
            <div class="word">收藏</div>
        </div>
        <div class="attention" v-if="obj.isAttention" v-on:click="myAttention(0)">
            <img src="/static/images/follow.png">
            <div class="word unfollow">已收藏</div>
        </div>
    </div>
    <!-- <div class="content telAndAttention">
                <button class="mint-button mint-button--primary mint-button--normal small_button" v-on:click="call()">
                    <img src="/static/icons/tel.png">
                    <p>电话</p>
                </button>
                <button v-if="obj.isAttention" class="mint-button mint-button--primary mint-button--normal small_button" v-on:click="myAttention(0)">
                    <img src="/static/icons/follow.png">
                    <p>已收藏</p>
                </button>
                <button v-if="!obj.isAttention" class="mint-button mint-button--primary mint-button--normal small_button" v-on:click="myAttention(1)">
                    <img src="/static/icons/unfollow.png">
                    <p>收藏</p>
                </button>
            </div> -->
</template>
<script>
import common from '../../common/common.js'
import httpService from '../../common/httpService.js'
import {
    mapGetters
} from 'vuex'
export default {
    data() {
        return {
            phone: common.servicePhone
        }
    },
    props: {
        obj: {}
    },
    computed: {
        userInfor() {
            return this.$store.state.user.userInfor;
        }
    },
    methods: {
        call() {
            window.location.href = "tel:" + this.phone;
        },
        getCustomerPhone() {
            let _self = this;
            this.$http.get(common.urlCommon + common.apiUrl.getDate).then((response) => {
                if (response.data.code == '1c01') {
                    console.log(response.data);
                    common.servicePhone = response.data.biz_result.serviceMobile;
                    _self.phone = response.data.biz_result.serviceMobile;
                }
            }, (err) => {
                common.$emit('message', err.data.msg);
            });
        },
        myAttention(type) {
            let _self = this;
            if (!common.KEY) {
                let _self = this;

                function loadApp() {
                    if (common.wxshow) {
                        common.getWxUrl();
                    } else {
                        _self.$router.push('/login');
                    }
                }
                common.$emit('confirm', {
                    message: '请先登录',
                    title: '提示',
                    ensure: loadApp
                });
                return;
            } else if (_self.userInfor.userType == '0' || _self.userInfor.bizMain == '' || _self.userInfor.manageType == '-1') {
                function perfect() {
                    _self.$router.push('/perfectObject');
                }
                common.$emit('confirm', {
                    message: '请先完善信息',
                    title: '提示',
                    ensure: perfect
                });
                return;
            }
            common.$emit('show-load');
            let url = common.addSID(common.urlCommon + common.apiUrl.most);
            let body = {
                biz_module: 'userService',
                biz_method: 'userAttention',
                biz_param: {
                    intentionId: _self.obj.id,
                    type: type,
                    breedName: _self.obj.breedName,
                    intentionType: _self.obj.type
                }
            };
            body.time = Date.parse(new Date()) + parseInt(common.difTime);
            body.sign = common.getSign('biz_module=' + body.biz_module + '&biz_method=' + body.biz_method + '&time=' + body.time);
            httpService.addAddress(url, body, function (suc) {
                common.$emit('close-load');
                if (suc.data.code == '1c01') {
                    common.$emit('message', suc.data.msg);
                    common.$emit("informResAttention", _self.obj.type);
                    common.$emit('resource', 1)//通知资源刷新，更新关注
                    common.$emit('lowPriceRes', 1)//通知低价资源刷新，更新关注
                    if (type) {
                        _self.obj.isAttention = 1;
                    } else {
                        _self.obj.isAttention = 0;
                    }
                } else {
                    common.$emit('message', suc.data.msg);
                }
            }, function (err) {
                common.$emit('close-load');
                common.$emit('message', err.data.msg);
            })
        }
    },
    created() {
        if (!common.servicePhone) this.getCustomerPhone();
    }
}
</script>

