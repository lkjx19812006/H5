<template>
    <div class="revise_password_confirm">
        <myHeader :param="my_header"></myHeader>
        <div class="bg_white">
            <div class="page-loadmore-wrapper" ref="wrapper" :style="{ height: wrapperHeight + 'px' }">
                <mt-loadmore>
                    <ul class="fill_in">
                        <li>
                            <p><img src="/static/icons/my-phone.png"></p>
                            <input type="text" class='top_text' v-model="param.phone" placeholder="请输入手机号码">
                        </li>
                        <li>
                            <p><img src="/static/icons/my-password.png"></p>
                            <input type="password" class='top_text' v-model="param.passWord" placeholder="请输入旧密码">
                        </li>
                        <li>
                            <p><img src="/static/icons/my-password.png"></p>
                            <input type="password" class='top_text' v-model="param.new_passWord" placeholder="请输入新密码">
                        </li>
                        <li class="last_li">
                            <p><img src="/static/icons/my-password.png"></p>
                            <input type="password" class='top_text' v-model="param.again_new_passWord" placeholder="请确认新密码">
                        </li>
                        <!-- <li >
                            <p><img src="/static/icons/my-password.png"></p>
                            <input type="password" class='top_text' v-model="param.passWord" placeholder="请输入旧密码">
                        </li> -->
                        <li v-on:click="confirm" class="confirm">
                            确定
                        </li>
                    </ul>
                    <!-- <div class="next_step" v-on:click="confirm">下一步</div> -->
                </mt-loadmore>
            </div>
        </div>
    </div>
</template>
<script>
import common from '../../common/common.js'
import validation from '../../validation/validation.js'
import httpService from '../../common/httpService.js'
import myHeader from '../../components/tools/myHeader'
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
                    passWord: '',
                    again_new_passWord: ''
                }
            }
        },
        components: {
            myHeader
        },
        methods: {
            getInfo() {
                let _self = this;
                common.$emit('show-load');
                let url = common.addSID(common.urlCommon + common.apiUrl.most);
                let body = {
                    biz_module: 'userService',
                    biz_method: 'queryUserInfo',
                    biz_param: {},
                };

                body.time = Date.parse(new Date()) + parseInt(common.difTime);
                body.sign = common.getSign('biz_module=' + body.biz_module + '&biz_method=' + body.biz_method + '&time=' + body.time);
                httpService.queryUserInfo(url, body, function(suc) {
                    common.$emit('close-load');
                    if (suc.data.code == "1c01") {
                        _self.param.phone = suc.data.biz_result.phone;


                    } else {
                        //console.log('cuowusasdada')
                    }

                }, function(err) {
                    common.$emit('close-load');
                })
            },
            confirm: function() {
                let _self = this;
                let checkArr = [];
                let checkPhone = validation.checkPhone(_self.param.phone);
                checkArr.push(checkPhone);
                let checkNewPassWord = validation.checkNull(_self.param.new_passWord, '请输入新密码！');
                checkArr.push(checkNewPassWord);
                let checkAgainPassWord = validation.checkNull(_self.param.again_new_passWord, '请确认新密码！');
                checkArr.push(checkAgainPassWord);
                let checkCommon = validation.checkCommon(_self.param.new_passWord, _self.param.again_new_passWord);
                checkArr.push(checkCommon);
                let checkPassword = validation.checkNull(_self.param.passWord, '请输入原密码！');
                checkArr.push(checkPassword);
                let checkDifferent = validation.checkDifferent(_self.param.new_passWord, _self.param.passWord);
                checkArr.push(checkDifferent);
                let checkMinNumber = validation.checkMinNumber(_self.param.new_passWord);
                checkArr.push(checkMinNumber);
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
                        common.customerId = '';
                        common.KEY = '';
                        common.SID = '';
                        window.localStorage.ID = '';
                        window.localStorage.KEY = '';
                        window.localStorage.SID = '';
                        common.$emit('clear_Information');
                        common.$emit('setParam', 'backRouter', 'mySet');
                        common.$emit('informBackMyself', 'mySet');
                        common.$emit('getInfo', 1);
                        _self.$router.replace('/login');
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
        created() {
            let _self = this;
            _self.getInfo();
            common.$on('reviseMyPass', function(item) {
                _self.getInfo();
            })
        },
        mounted() {
            this.wrapperHeight = document.documentElement.clientHeight - this.$refs.wrapper.getBoundingClientRect().top;
        }
}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.revise_password_confirm .bg_white {
    background-color: #F0F0F0;
}

.revise_password_confirm .bg_white .fill_in {
    padding: 0 15px;
    float: left;
    width: 100%;
}

.revise_password_confirm .bg_white .fill_in li {
    background: white;
    float: left;
    width: 100%;
    margin-top: 1.5rem;
    border-radius: 4px;
}

.revise_password_confirm .bg_white .fill_in li p {
    float: left;
    height: 4rem;
}

.revise_password_confirm .bg_white .fill_in li p img {
    height: 2rem;
    margin: 1rem 0 0 0.8rem;
}

.revise_password_confirm .bg_white .fill_in li input {
    float: left;
    margin-top: 1rem;
    height: 2rem;
    line-height: 2rem;
    border: none;
    outline: none;
    margin-left: 25px;
}

.revise_password_confirm .bg_white .fill_in .confirm {
    background: #FA6705;
    color: white;
    height: 4rem;
    line-height: 4rem;
    text-align: center;
}


/*.revise_password_confirm .next_step {
    width: 78%;
    height: 3.5rem;
    background: #FA6705;
    color: white;
    font-size: 1.7rem;
    text-align: center;
    line-height: 3.5rem;
    border-radius: 1.75rem;
    margin: 7.5rem 11% 0 11%;
}*/


/*.revise_password_confirm .fill_in {
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
}*/
</style>
