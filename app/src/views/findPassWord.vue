<template>
    <div class="find_password">
        <myHeader :param="myHeader"></myHeader>
        <div class="bg_white">
            <div class="page-loadmore-wrapper" ref="wrapper" :style="{ height: wrapperHeight + 'px' }">
                <mt-loadmore >
                    <ul class="fill_in">
                        <li>
                            <p>手机号：</p>
                            <input type="text" placeholder="请输入手机号码" v-model="param.phone" />
                        </li>
                        <li>
                            <p>验证码：</p>
                            <input type="text" placeholder="请输入验证码" v-model="param.code" />
                            <div id="identify_code">{{identify_code}}</div>
                            <input v-bind:class="{ get_code: !buttonDisabled, 'get_code_nor': buttonDisabled }" id="get_code" v-on:click="getCode" :value="code" type="button">
                        </li>
                        <li>
                            <p>新密码：</p>
                            <input type="password" placeholder="请输入新密码" v-model="param.passWord" />
                        </li>
                    </ul>
                    <div class="confirm" v-on:click="confirm">确定</div>
                </mt-loadmore>
            </div>
        </div>
    </div>
</template>
<script>
import common from '../common/common.js'
import myHeader from '../components/tools/myHeader'
import validation from '../validation/validation.js'
import httpService from '../common/httpService.js'
export default {
    data() {
            return {
                wrapperHeight: '',
                myHeader: {
                    name: '找回密码'
                },
                code: '获取验证码',
                param: {
                    phone: '',
                    code: '',
                    passWord: ''
                }
            }
        },
        components: {
            myHeader
        },
        methods: {
            getCode() {
                let _self = this;
                let checkPhone = validation.checkPhone(_self.param.phone);
                if (checkPhone) {
                    common.$emit('message', checkPhone);
                } else {
                    _self.buttonDisabled = true;
                    let wait = 60;
                    let time = setInterval(function() {
                        wait--;
                        _self.code = wait;
                        if (wait == 0) {
                            clearInterval(time);
                            _self.code = '获取验证码';
                            _self.buttonDisabled = false;
                        }
                    }, 1000);
                }
                common.$emit('show-load');
                httpService.register(common.urlCommon + common.apiUrl.most, {
                    biz_module: 'userSmsService',
                    biz_method: 'getRePwdCode',
                    biz_param: {
                        mobile: _self.param.phone
                    }
                }, function(response) {
                    common.$emit('close-load');
                    if (response.data.code == '1c01') {
                    } else {
                        common.$emit('message', response.data.msg);
                    }
                }, function(err) {
                    common.$emit('close-load');
                    common.$emit('message', err.data.msg);
                })
            },
            confirm() {
                let _self = this;
                let checkArr = [];
                let checkPhone = validation.checkPhone(_self.param.phone);
                checkArr.push(checkPhone);
                let checkCode = validation.checkCode(_self.param.code, '666000');
                checkArr.push(checkCode);
                let checkpassWord = validation.checkNull(_self.param.passWord, '请输入新密码！');
                checkArr.push(checkpassWord);
                for (var i = 0; i < checkArr.length; i++) {
                    if (checkArr[i]) {
                        common.$emit('message', checkArr[i]);
                        return;
                    }
                }
                common.$emit('show-load');
                httpService.findPassWord(common.urlCommon + common.apiUrl.most, {
                    biz_module: 'userService',
                    biz_method: 'findUserPassword',
                    biz_param: {
                        phone: _self.param.phone,
                        code: _self.param.code,
                        rePassword: _self.param.againPassword
                    }
                }, function(response) {
                    common.$emit('close-load');
                    if (response.data.code == '1c01') {
                        window.localStorage.KEY = response.data.biz_result.KEY;
                        window.localStorage.SID = response.data.biz_result.SID;
                        common.KEY = window.localStorage.KEY;
                        common.SID = window.localStorage.SID;
                        common.getDate();
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
            this.wrapperHeight = document.documentElement.clientHeight - this.$refs.wrapper.getBoundingClientRect().top ;
        }
}
</script>
<style scoped>
.find_password{

}

.find_password .fill_in {
    padding: 0 4.6%;
    margin-top: 1rem;
    background: white;
}

.find_password .fill_in li {
    height: 5rem;
    font-size: 1.2rem;
    color: #333333;
    border-bottom: 1px solid #E0E0E0;
    line-height: 2rem;
    padding: 1.5rem 0;
}

.find_password .fill_in li input {
    outline: none;
    border: 0;
    height: 2rem;
    float: left;
    padding-left: 0.5rem;
    width: 47%;
}

.find_password .fill_in li p {
    width: 22%;
    text-align: right;
    float: left;
}

.find_password .fill_in li div {
    border-left: 1px solid #E0E0E0;
    width: 70px;
    float: right;
    font-size: 1.4rem;
}

.find_password .fill_in li .get_code {
    width: 31%;
    border: 1px solid #BFBFBF;
    height: 2.3rem;
    border-radius: 5px;
    background: #F5F5F5;
    padding: 0;
    float: right;
    line-height: 2.3rem;
    text-align: center;
}

.find_password .fill_in li .get_code_nor {
    width: 100px;
    border: 1px solid #BFBFBF;
    height: 2.3rem;
    border-radius: 5px;
    background: #F5F5F5;
    padding: 0;
    float: right;
    line-height: 2.3rem;
    text-align: center;
    color: #CECEBF;
}

.find_password .confirm {
    width: 90%;
    height: 3.5rem;
    margin-left: 5%;
    background: #FA6705;
    color: white;
    line-height: 3.5rem;
    text-align: center;
    border-radius: 1.75rem;
    margin-top: 5.5rem;
}
</style>
