<template>
    <div class="revise_password_confirm">
        <myHeader :param="my_header"></myHeader>
        <div class="bg_white">
            <div class="page-loadmore-wrapper" ref="wrapper" :style="{ height: wrapperHeight + 'px' }">
                <mt-loadmore>
                    <ul class="fill_in">
                        <li>
                            <p>手机号：</p>
                            <input type="text" class='top_text' v-model="param.phone">
                        </li>
                        <li>
                            <p>新密码：</p>
                            <input type="password" class='top_text' v-model="param.new_passWord">
                        </li>
                        <li class="last_li">
                            <p>&nbsp;&nbsp;&nbsp;&nbsp;密码：</p>
                            <input type="password" class='top_text' v-model="param.passWord">
                        </li>
                    </ul>
                       <div class="next_step" v-on:click="confirm">确定</div>
                </mt-loadmore>
               
                 
                
            </div>
        </div>
    </div>
</template>
<script>
import common from '../common/common.js'
import validation from '../validation/validation.js'
import httpService from '../common/httpService.js'
import myHeader from '../components/tools/myHeader'
export default {
    data() {
            return {
                wrapperHeight: '',
                my_header: {
                    name: '修改密码'
                },
                param: {
                    phone: '',
                    new_passWord: '',
                    passWord: ''
                }
            }
        },
        components: {
            myHeader
        },
        methods: {
            confirm: function() {
                let _self = this;
                let checkArr = [];
                let checkPhone = validation.checkPhone(_self.param.phone);
                checkArr.push(checkPhone);
                let checkNewPassWord = validation.checkNull(_self.param.new_passWord, '请输入新密码！');
                checkArr.push(checkNewPassWord);
                let checkPassword = validation.checkNull(_self.param.passWord, '请输入原密码！');
                checkArr.push(checkPassword);
                for (var i = 0; i < checkArr.length; i++) {
                    if (checkArr[i]) {
                        common.$emit('message', checkArr[i]);
                        return
                    }
                }
                common.$emit('show-load');
                let url = common.addSID(common.urlCommon + common.apiUrl.most);
                let body = {
                    biz_module: 'userService',
                    biz_method: 'updateUserPassword',
                    version: 1,
                    time: 0,
                    sign: '',
                    biz_param: {
                        password: _self.param.passWord,
                        newPassword: _self.param.new_passWord
                    }
                };
                body.time = Date.parse(new Date()) + parseInt(common.difTime);
                body.sign = common.getSign('biz_module=' + body.biz_module + '&biz_method=' + body.biz_method + '&time=' + body.time);
                httpService.queryEmployeeInfo(url, body, function(suc) {
                    common.$emit('close-load');
                    if (suc.data.code == "1c01") {
                        common.$emit('message', suc.data.msg);
                    } else {
                        common.$emit('message', suc.data.msg);
                    }
                }, function(err) {
                    common.$emit('close-load');
                    common.$emit('message', err.data.msg);
                })
            }
        },
        mounted() {
            this.wrapperHeight = document.documentElement.clientHeight - this.$refs.wrapper.getBoundingClientRect().top;
        }
}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.revise_password_confirm .bg_white{
    background-color: #F0F0F0;
}
.revise_password_confirm .fill_in {
    background: white;
    padding: 2rem 0 5rem 4.7%;
}

.revise_password_confirm .fill_in li {
    height: 3.5rem;
    margin: 0 0 1.3rem 0;
}

.revise_password_confirm .fill_in li.last_li {
    margin-bottom: 0;
}

.revise_password_confirm .fill_in p {
    float: left;
    font-size: 1.2rem;
    color: #333333;
    line-height: 3.5rem;
}

.revise_password_confirm .fill_in input {
    float: left;
    height: 3.5rem;
    border-radius: 1.75rem;
    border: 1px solid #C9C9C9;
    padding: 0 1.75rem;
    width: 75%;
}

.revise_password_confirm .next_step {
    width: 78%;
    height: 3.5rem;
    background: #FA6705;
    color: white;
    font-size: 1.7rem;
    text-align: center;
    line-height: 3.5rem;
    border-radius: 1.75rem;
    margin: 7.5rem 11% 0 11%;
}
</style>
