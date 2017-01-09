<template>
    <div class="login" :style="{ height: wholeHeight + 'px' }">
        <img src="/static/images/logo-login.png" class="my-logo">
        <myTab :param="myShow"></myTab>
        <div class="password" v-show="myShow.show">
            <div class="account-number">
                <input type="text" placeholder="请输入用户名/手机号/邮箱" v-model="param.phone">
            </div>
            <div class="pass-word">
                <input type="text" placeholder="请输入密码" v-model="param.password">
            </div>
        </div>
        <div class="password" v-show="!myShow.show">
            <div class="phone">
                <p class="tel">+86</p>
                <input type="text" placeholder="请输入手机号" v-model="param.phone">
            </div>
            <div class="pass-name">
                <input type="text" placeholder="请输入验证码" v-model="param.code">
                <p v-bind:class="{ my_code: !buttonDisabled, 'my_code_nor': buttonDisabled }" v-on:click="confirmLogin()">{{code}}</p>
            </div>
        </div>
        <div class="prompt" id="prompt">
            <router-link to="findPassWord">
                <p class="left">忘记密码</p>
            </router-link>
            <router-link to="register">
                <p class="right">立即注册</p>
            </router-link>
        </div>
        <div class="confirm" @click="login()">登陆</div>
    </div>
</template>
<script>
import common from '../common/common.js'
import myTab from '../components/tools/tab'
import validation from '../validation/validation.js'
import httpService from '../common/httpService.js'
export default {
    data() {
            return {
                myShow: {
                    show: true,
                    left_name: '密码登陆',
                    right_name: '短信登陆'
                },
                selected: 'identiCode',
                identify_code: '',
                code: '获取验证码',
                buttonDisabled: false,
                param: {
                    phone: '',
                    code: '',
                    imageCode: '',
                    password: ''
                }
            }
        },
        created() {
            this.getCode();
        },
        components: {
            myTab
        },
        methods: {
            passWordLogin() {
                let _self = this;
                common.$emit('show-load');
                httpService.login(common.urlCommon + common.apiUrl.login, {
                    biz_param: {
                        phone: _self.param.phone,
                        password: _self.param.password
                    }
                }, function(response) {
                    common.$emit('close-load');
                    if (response.data.code == '1c01') {
                        window.localStorage.KEY = response.data.biz_result.KEY;
                        window.localStorage.SID = response.data.biz_result.SID;
                        common.KEY = window.localStorage.KEY;
                        common.SID = window.localStorage.SID;
                        common.getDate();
                        _self.$router.push('/home');
                    } else {
                        common.$emit('message', response.data.msg);
                    }
                }, function(err) {
                    common.$emit('close-load');
                    common.$emit('message', err.data.msg);
                })
            },
            codeLogin() {
                let _self = this;
                common.$emit('show-load');
                httpService.login(common.urlCommon + common.apiUrl.code_login, {
                    biz_param: {
                        phone: _self.param.phone,
                        code: _self.param.code
                    }
                }, function(response) {
                    common.$emit('close-load');
                    if (response.data.code == '1c01') {
                        window.localStorage.KEY = response.data.biz_result.KEY;
                        window.localStorage.SID = response.data.biz_result.SID;
                        common.KEY = window.localStorage.KEY;
                        common.SID = window.localStorage.SID;
                        common.getDate();
                        _self.$router.push('/home');
                    } else {
                        common.$emit('message', response.data.msg);
                    }
                }, function(err) {
                    common.$emit('close-load');
                    common.$emit('message', err.data.msg);
                })
            },
            getCode: function() {
                let str = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLNOPQRSTUVWXYZ0123456789';
                let res = '';
                for (var i = 0; i < 4; i++) {
                    var index = parseInt(Math.random() * 61);
                    res += str[index];
                }
                this.identify_code = res;
            },
            confirmLogin: function() {
                let _self = this;
                let checkPhone = validation.checkPhone(_self.param.phone);
                if (checkPhone) {
                    common.$emit('message', checkPhone);
                } else {
                    _self.buttonDisabled = true;
                    var wait = 60;
                    var time = setInterval(function() {
                        wait--;
                        _self.code = wait;
                        if (wait == 0) {
                            clearInterval(time);
                            _self.code = '获取验证码';
                            _self.buttonDisabled = false;
                        }
                    }, 1000);
                }
                httpService.register(common.urlCommon + common.apiUrl.most, {
                    biz_module: 'userSmsService',
                    biz_method: 'getLoginCode',
                    biz_param: {
                        mobile: _self.param.phone
                    }
                }, function(response) {
                    common.$emit('message', response.data.msg);
                }, function(err) {
                    common.$emit('message', err.data.msg);
                })
            },
            login() {
                var checkArr = [];
                let _self = this;
                let checkPhone = validation.checkPhone(_self.param.phone);
                checkArr.push(checkPhone);
                if (_self.myShow.show == true) {
                    let checkPassword = validation.checkNull(_self.param.password, '请输入密码！');
                    checkArr.push(checkPassword);
                } else if (_self.myShow.show == false) {
                    let checkCode = validation.checkCode(_self.param.code, '666000');
                    checkArr.push(checkCode);
                }
                for (var i = 0; i < checkArr.length; i++) {
                    if (checkArr[i]) {
                        common.$emit('message', checkArr[i]);
                        return;
                    }
                }
                if (_self.myShow.show == false) {
                    _self.codeLogin()
                } else if (_self.myShow.show == true) {
                    _self.passWordLogin()
                }
            }
        },
        mounted() {
            this.wholeHeight = document.documentElement.clientHeight;
        }
}
</script>
<style scoped>
.login {
    background: url("/static/images/background-img.png") no-repeat;
    background-size: 100% 100%;
    width: 100%;
    /*height:1000px;*/
}

.login .my-logo {
    width: 66.5%;
    margin-top: 10.6%;
    margin-bottom: 10.6%;
}

.login .password div {
    width: 86%;
    margin-left: 7%;
    padding: 0.8rem 0;
    border: 1px solid #313232;
    margin-top: 1.8rem;
    border-radius: 3px;
}

.login .password input {
    outline: none;
    border: none;
    background-color: transparent;
    text-align: left;
    width: 70%;
}

.login .account-number {
    background: url("/static/icons/my-phone.png") no-repeat 1.25rem center;
    background-size: 20px;
}

.login .account-number {
    background: url("/static/icons/my-phone.png") no-repeat 1.25rem center;
    background-size: 15px;
}

.login .pass-word {
    background: url("/static/icons/my-password.png") no-repeat 1.25rem center;
    background-size: 17px;
}

.login #prompt {
    width: 86%;
    padding: 1.5rem;
    border: 0;
    margin: 0 0 2.7rem 7%;
}

.login .prompt .left {
    float: left;
}

.login .prompt .right {
    float: right;
}

.login .password .phone .tel {
    float: left;
    border-right: 1px solid #333333;
    height: 100%;
    padding: 0 1rem;
}

.login .password .pass-name .my_code {
    float: right;
    width: 40%;
    border-left: 1px solid #333333;
    color: #FA6705;
}

.login .password .pass-name .my_code_nor {
    float: right;
    width: 40%;
    border-left: 1px solid #333333;
    color: #CECEBF;
}

.login .password .pass-name input {
    width: 60%;
    padding-left: 1rem;
}

.login .confirm {
    width: 86%;
    font-size: 1.8rem;
    background: #FA6804;
    padding: 1rem 0;
    color: white;
    border-radius: 3px;
    margin-left: 7%;
}


/*.login .out_select_box {
    width: 100%;
    padding: 1.5rem 0;
    background: white;
}

.login .select_box {
    width: 62%;
    height: 4rem;
    text-align: center;
    line-height: 4rem;
    margin-left: 19%;
}

.login .mint-navbar .mint-tab-item {
    border-bottom: 0;
    border: 1px solid #FA6705;
}

.login .mint-navbar .mint-tab-item.is-selected {
    background-color: #FA6705;
    color: white;
    margin: 0;
}

.login .selected_box .fill_in_first {
    padding: 0 4.6%;
    margin-top: 1rem;
    background: white;
}

.login .selected_box li {
    height: 5rem;
    font-size: 1.2rem;
    color: #333333;
    border-bottom: 1px solid #E0E0E0;
    line-height: 2rem;
    padding: 1.5rem 0;
}

.login .selected_box li input {
    outline: none;
    border: 0;
    height: 2rem;
    float: left;
    padding-left: 0.5rem;
    width: 47%;
}

.login .selected_box .fill_in_first li p {
    width: 17.5%;
    text-align: right;
    float: left;
}

.login .selected_box .fill_in_first li .get_code {
    width: 100px;
    border: 1px solid #BFBFBF;
    height: 2.3rem;
    border-radius: 5px;
    background: #F5F5F5;
    float: right;
    line-height: 2.3rem;
}

.login .selected_box .fill_in_first li .get_code_nor {
    width: 100px;
    border: 1px solid #BFBFBF;
    height: 2.3rem;
    border-radius: 5px;
    background: #F5F5F5;
    float: right;
    line-height: 2.3rem;
    color: #CECEBF;
}

.login .selected_box .fill_in_second {
    padding: 0 4.6%;
    margin-top: 1rem;
    background: white;
}

.login .selected_box .fill_in_second li p {
    width: 22.5%;
    text-align: right;
    float: left;
}

.login .selected_box .fill_in_second li div {
    border-left: 1px solid #E0E0E0;
    width: 70px;
    float: right;
    font-size: 1.4rem;
}

.login .fast_register,
.forget_password {
    font-size: 1.1rem;
    color: #FA6705;
}

.login .prompt_box {
    width: 100%;
    margin-top: 1.5rem;
    margin-bottom: 5rem;
    height: 1.1rem;
}

.login .prompt_box .fast_register {
    float: left;
    margin-left: 7.8%;
}

.login .prompt_box .forget_password {
    float: right;
    margin-right: 7.8%;
}

.login .confirm_login {
    width: 90%;
    height: 3.5rem;
    margin-left: 5%;
    background: #FA6705;
    color: white;
    line-height: 3.5rem;
    text-align: center;
    border-radius: 1.75rem;
}*/
</style>
