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

.register {
    height: 100vh;
    background-color: #F5F5F5;
    .box {
        height: 92vh;
        overflow-y: auto;
        width: 100%;
        @media screen {
            .logo {
                width: 60%;
                margin: 40px auto;
            }
            @media (max-width: 320px) {
                .logo {
                    width: 60%;
                    margin: 25px auto;
                }
            }
        }
        .main {
            width: 100%;
            padding: 0 23px;
            font-size: 14px;
            .pass_code {
                display: flex;
                flex-direction: row;
                align-items: center;
                .tbox {
                    flex: 1;
                    background-color: #fff;
                    display: flex;
                    flex-direction: row;
                    align-items: center;
                    padding: 8px 18px;
                    border-radius: 16px;
                    img {
                        height: 20px;
                    }
                    input {
                        height: 20px;
                        width: 100px;
                        margin-left: 10px;
                    }
                }
                .fbox {
                    margin-left: 10px;
                    width: 100px;
                    background-color: #F7C000;
                    color: #fff;
                    line-height: 36px;
                    padding: 0 15px;
                    border-radius: 18px;
                    input {
                        width: 100%;
                        background-color: #F7C000;
                        height: 36px;
                        text-align: center;
                    }
                    input[disabled] {
                        color: #fff;
                        opacity: 1;
                        -webkit-text-fill-color: #fff;
                        -webkit-opacity: 1;
                    }
                }
            }
            .inbox {
                width: 100%;
                margin-bottom: 18px;
                background-color: #fff;
                display: flex;
                flex-direction: row;
                align-items: center;
                padding: 8px 18px;
                border-radius: 16px;
                img {
                    height: 20px;
                }
                input {
                    height: 20px;
                    margin-left: 10px;
                }
            }
            .confirm {
                width: 100%;
                height: 38px;
                line-height: 38px;
                text-align: center;
                background-color: #FA6705;
                color: #fff;
                border-radius: 19px;
                margin-top: 37px;
            }
            .title {
                font-size: 12px;
                margin-top: 12px;
                span {
                    color: #F05050;
                }
            }
        }
    }
}
</style>
<style></style>
<template>
    <div class="register">
        <userHead :param="paramHead"></userHead>
        <div class="box">
            <img src="static/icon/logo_net.png" class="logo">
            <div class="main">
                <div class="inbox">
                    <img src="/static/icon/i-name.png">
                    <div class="content">
                        <input type="text" placeholder="请输入姓名" v-model="param.name">
                    </div>
                </div>
                <div class="inbox">
                    <img src="/static/icon/i-phone.png">
                    <div class="content">
                        <input type="text" placeholder="请输入您的手机号" v-model="param.phone">
                    </div>
                </div>
                <div class="inbox">
                    <img src="/static/icon/i-password.png">
                    <div class="content">
                        <input type="password" placeholder="请设置您的密码" v-model="param.password">
                    </div>
                </div>
                <div class="pass_code">
                    <div class="tbox">
                        <img src="/static/icon/i-code.png">
                        <div class="content">
                            <div>
                                <input type="text" placeholder="请输入验证码" v-model="param.code">
                            </div>
                        </div>
                    </div>
                    <div class="fbox" @click="confirm">
                        <input type="text" :disabled="true" v-model="code">
                    </div>
                </div>
                <div class="confirm" @click="register">立即注册</div>
                <div class="title" @click="goProtocol">* 注册代表您同意《<span>药材买卖网用户协议</span>》</div>
            </div>
        </div>
    </div>
</template>
<script>
import common from '../../common/common.js'
import userHead from '../../components/user/userHead'
import validation from '../../validation/validation.js'
import httpService from '../../common/httpService.js'
export default {
    data() {
            return {
                paramHead: {
                    name: '注册',
                },
                buttonDisabled: false,
                param: {
                    phone: '',
                    password: '',
                    name: '',
                    code: ''
                },
                code: '获取验证码'
            }
        },
        components: {
            userHead
        },
        created() {
            let _self = this;    
            common.$on('loginToRegister', function(item) {
                    _self.param.phone = '';
                    _self.param.password = '';
                    _self.param.name = '';
                    _self.param.code = '';   
            })
            // common.$on('broughtCode', function(item) {
            //     _self.referralCode = item;
            // })
        },
        methods: {
            goProtocol() {
                this.$router.push('/protocol')
            },
            confirm: function() {
                let _self = this;
                let checkPhone = validation.checkPhone(_self.param.phone);
                if (checkPhone) {
                    common.$emit('message', checkPhone);
                } else if(!_self.buttonDisabled){
                    _self.buttonDisabled = true;
                    let wait = 60;

                    let time = setInterval(function() {
                        wait--;
                        _self.code = wait;
                        if (wait == 0) {
                            clearInterval(time);
                            _self.code = '重新获取';
                            _self.buttonDisabled = false;
                        }
                    }, 1000);

                    httpService.register(common.urlCommon + common.apiUrl.most, {
                        biz_module: 'userSmsService',
                        biz_method: 'getVervifyCode',
                        biz_param: {
                            mobile: _self.param.phone
                        }
                    }, function(response) {
                        if (response.data.code == '1c01') {} else {
                            common.$emit('message', response.data.msg);
                        }
                    }, function(err) {
                        common.$emit('message', err.data.msg);
                    })

                }

            },
            login() {
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
                        common.$emit('getInfo', 1);
                        _self.$router.push('/perfectObject')
                            // common.$emit('nextRegister', 1);
                        
                            // _self.$router.replace('perfectInfo');
                    } else {
                        //common.$emit('message', response.data.msg);
                    }
                }, function(err) {
                    common.$emit('close-load');
                    //common.$emit('message', err.data.msg);
                })
            },
            register() {
                var checkArr = [];
                let _self = this;
                let checkName = validation.checkNull(_self.param.name, '请输入姓名！');
                checkArr.push(checkName);
                let checkPhone = validation.checkPhone(_self.param.phone);
                checkArr.push(checkPhone);
                let checkPassword = validation.checkNull(_self.param.password, '请输入密码！');
                checkArr.push(checkPassword);
                // let checkagainPassword = validation.checkNull(_self.param.againPassword, '请确认密码！');
                // checkArr.push(checkagainPassword);
                let checkMinNumber = validation.checkMinNumber(_self.param.password);
                checkArr.push(checkMinNumber);
                // let checkCommon = validation.checkCommon(_self.param.password, _self.param.againPassword);
                // checkArr.push(checkCommon);


                for (var i = 0; i < checkArr.length; i++) {
                    if (checkArr[i]) {
                        common.$emit('message', checkArr[i]);
                        return;
                    }
                }
                //console.log(_self.referralCode)
                common.$emit('show-load');
                httpService.register(common.urlCommon + common.apiUrl.most, {
                    biz_module: 'userSmsService',
                    biz_method: 'registerUser',
                    biz_param: {
                        fullname: _self.param.name,
                        phone: _self.param.phone,
                        code: _self.param.code,
                        password: _self.param.password,
                        // rePassword: _self.param.againPassword,
                        //referralCode: _self.referralCode
                    }
                }, function(response) {
                    common.$emit('close-load');
                    if (response.data.code == '1c01') {
                        //common.$emit('message', response.data.msg);
                        _self.login();
                    } else {
                        common.$emit('message', response.data.msg);
                    }
                }, function(err) {
                    common.$emit('close-load');
                    common.$emit('message', err.data.msg);
                })
            }
        },
        mounted() {
            //this.wrapperHeight = document.documentElement.clientHeight - this.$refs.wrapper.getBoundingClientRect().top;
        }
}
</script>
