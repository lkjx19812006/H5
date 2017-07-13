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

.auth_result {
    width: 100%;
    .top {
        padding: 55px 0 25px 0;
        .top_img {
            width: 60px;
            margin-bottom: 25px;
        }
        .word {
            font-size: 16px;
            color: #666;
        }
        .word_top {
            margin-top: 12px;
        }
    }
    .my_infor {
        width: 100%;
        .bbox {
            width: 100%;
            display: flex;
            flex-direction: row;
            aligin-items: center;
            justify-content: space-between;
            padding: 15px 27px 15px 17px;
            line-height: 17px;
            background-color: #fff;
            border-top: 1px solid #E6E6E6;
            .right {
                display: flex;
                flex-direction: row;
                align-items: center;
                .content {
                    color: #666;
                    font-size: 14px;
                }
                .image {
                    padding: 0 0 0 10px;
                    display: flex;
                    flex-direction: row;
                    align-items: center;
                    .right_dir {
                        height: 12px;
                        width: 8px;
                    }
                    .default{
                        height:17px;
                    }
                }
            }
            .name {
                font-size: 17px;
                color: #333;
            }
            .content {
                font-size: 15px;
                color: #666;
            }
        }
    }
}
</style>
<template>
    <div class="auth_result">
        <myHeader :param="head"></myHeader>
        <div class="page-loadmore-wrapper main" ref="wrapper" :style="{ height: wrapperHeight + 'px' }">
            <div class="box" v-show="authenType == 2">
                <div class="top">
                    <img src="/static/icon/wait-auth.png" class="top_img">
                    <div class="word">你的实名认证正在审核中</div>
                    <div class="word word_top">请耐心等待...</div>
                </div>
                <div class="my_infor">
                    <div class="bbox">
                        <div class="name">身份认证</div>
                        <div class="content">个人</div>
                    </div>
                    <div class="bbox">
                        <div class="name">真实姓名</div>
                        <div class="content">{{userInfor.fullname}}</div>
                    </div>
                    <div class="bbox">
                        <div class="name">身份证号</div>
                        <div class="content">{{userInfor.idnumber}}</div>
                    </div>
                    <div class="bbox" @click="jump">
                        <div class="name">证件照片</div>
                        <div class="right">
                            <div class="image">
                                <img src="/static/icon/default-pic.png" class="default">
                            </div>
                            <div class="image">
                                <img src="/static/images/jiantou.png" class="right_dir">
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import common from '../../common/common.js'
import httpService from '../../common/httpService.js'
import myHeader from '../../components/tools/myHeader'
import validation from '../../validation/validation.js'
import filters from '../../filters/filters.js'
import {
    mapGetters
} from 'vuex'
export default {
    data() {
            return {
                head: {
                    name: '认证中'
                },
                authenType: '',
                list: []

            }
        },
        components: {
            myHeader
        },
        computed: {
            userInfor() {
                return this.$store.state.user.userInfor;
            },
            photo(){
                return this.$store.state.authen.photoList;
            }
        },
        methods: {
            getHttp() {
                let _self = this;
                common.$emit('show-load');
                let url = common.urlCommon + common.apiUrl.most;
                let body = {
                    biz_module: 'userService',
                    biz_method: 'queryUserAuthenImage',
                    biz_param: {
                        type: 0
                    }
                }
                if (common.KEY) {
                    url = common.addSID(common.urlCommon + common.apiUrl.most);
                    body.version = 1;
                    body.time = Date.parse(new Date()) + parseInt(common.difTime);
                    body.sign = common.getSign('biz_module=' + body.biz_module + '&biz_method=' + body.biz_method + '&time=' + body.time);
                }
                httpService.myAttention(url, body, function(suc) {
                    common.$emit('close-load');
                    //common.$emit('message', suc.data.msg);
                    if (suc.data.code == '1c01') {
                        //console.log(suc.data.biz_result.authenType);
                        _self.authenType = suc.data.biz_result.authenType;
                        //console.log(22,suc.data.biz_result.list)
                        _self.$store.dispatch('getPhoto',suc.data.biz_result.list)
                        _self.headName(_self.authenType);
                    }
                }, function(err) {
                    common.$emit('close-load');
                    common.$emit('message', err.data.msg);
                })
            },
            headName(index) {
                let _self = this;
                switch (index) {
                    case 1:
                        _self.head.name = '认证中';
                        break;
                    case 2:
                        _self.head.name = '认证通过';
                        break;
                    case 3:
                        _self.head.name = '认证未通过';
                        break;
                }
            },
            jump(){
                let _self = this;
                _self.$router.push('/authPhoto')
            }
        },
        created() {
            let _self = this;
            common.$on("toAuthResult", function(item) {
                _self.getHttp();
                _self.$store.dispatch('getUserInfor');
            })
            _self.getHttp();
            _self.$store.dispatch('getUserInfor');
        },
        mounted() {
            this.wrapperHeight = document.documentElement.clientHeight - this.$refs.wrapper.getBoundingClientRect().top;
        }
}
</script>
