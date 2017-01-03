<template>
    <div class="login">
        <mt-header title="登录">
            <router-link to="/home" slot="left">
                <mt-button icon="back"></mt-button>
            </router-link>
        </mt-header>
        <div class="out_select_box">
            <div class="select_box">
                <mt-navbar v-model="selected">
                    <mt-tab-item id="identiCode">验证码登录</mt-tab-item>
                    <mt-tab-item id="password">密码登录</mt-tab-item>
                </mt-navbar>
            </div>
        </div>
        <div class="selected_box">
            <mt-tab-container v-model="selected">
                <mt-tab-container-item id="identiCode">
                    <ul class="fill_in_first">
                        <li>
                            <p>账号：</p>
                            <input type="text" placeholder="请输入手机号码" v-model="param.phone" />
                        </li>
                        <li>
                            <p>验证码：</p>
                            <input type="text" placeholder="请输入验证码" v-model="param.code" />
                            <button v-bind:class="{ get_code: !buttonDisabled, 'get_code_nor': buttonDisabled }" id="get_code" v-on:click="confirmLogin()" v-bind:disabled="buttonDisabled">{{code}}</button>
                            <!-- <button class="get_code" id="get_code" v-on:click="confirmLogin()" v-bind:disabled="buttonDisabled">{{code}}</button> -->
                        </li>
                    </ul>
                </mt-tab-container-item>
                <mt-tab-container-item id="password">
                    <ul class="fill_in_second">
                        <li>
                            <p>账号：</p>
                            <input type="text" placeholder="请输入手机号码" v-model="param.phone" />
                        </li>
                        <li>
                            <p>登陆密码：</p>
                            <input type="password" placeholder="请输入密码" v-model="param.password" />
                        </li>
                        <li>
                            <p>验证码：</p>
                            <input type="text" placeholder="请输入验证码" v-model="param.imageCode" />
                            <div v-on:click="getCode">{{identify_code}}</div>
                        </li>
                    </ul>
                </mt-tab-container-item>
            </mt-tab-container>
        </div>
        <div class="prompt_box">
            <router-link to="register">
                <div class="fast_register">快速注册</div>
            </router-link>
            <router-link to="findPassWord">
                <div class="forget_password">忘记密码？</div>
        </div>
        <div class="confirm_login" @click="login()">登陆</div>
    </div>
</template>
<script>
import common from '../common/common.js'
import validation from '../validation/validation.js'
import httpService from '../common/httpService.js'
export default {
    data() {
            return {
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
        methods: {
            passWordLogin(){
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
                            // common.$emit('message', response.data.msg);
                            _self.$router.push('/home');
                        } else {
                            common.$emit('message', response.data.msg);
                        }
                    }, function(err) {
                        common.$emit('close-load');
                        common.$emit('message', err.data.msg);
                    })
            },
            codeLogin(){
                    let _self = this;
                    common.$emit('show-load');
                    httpService.login(common.urlCommon + common.apiUrl.login, {
                        biz_param: {
                            phone: _self.param.phone,
                            code: _self.param.code
                        }
                    }, function(response) {
                        common.$emit('close-load');
                        console.log(response)
                        if (response.data.code == '1c01') {
                            window.localStorage.KEY = response.data.biz_result.KEY;
                            window.localStorage.SID = response.data.biz_result.SID;
                            common.KEY = window.localStorage.KEY;
                            common.SID = window.localStorage.SID;
                            common.getDate();
                            common.$emit('message', response.data.msg);
                            _self.$router.push('/home');
                        } else {
                            //common.$emit('message', response.data.msg);
                        }
                    }, function(err) {
                        common.$emit('close-load');
                        //common.$emit('message', err.data.msg);
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
                if (_self.selected == 'identiCode') {
                    let checkCode = validation.checkCode(_self.param.code, '666000');
                    checkArr.push(checkCode);
                } else if(_self.selected == 'password'){
                    let checkPassword = validation.checkNull(_self.param.password, '请输入密码！');
                    let checkCode = validation.checkCode(_self.param.imageCode, _self.identify_code);
                    checkArr.push(checkPassword);
                    checkArr.push(checkCode);
                }
                for (var i = 0; i < checkArr.length; i++) {
                    if (checkArr[i]) {
                        common.$emit('message', checkArr[i]);
                        return;
                    }
                }
                  if(_self.selected == 'identiCode'){
                      _self.codeLogin()
                  }else if(_self.selected == 'password'){
                     _self.passWordLogin()
                  }
                    

                 
                 
            }
        }
}
</script>
<style scoped>
.login .out_select_box {
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
}
</style>
