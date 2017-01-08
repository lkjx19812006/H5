<template>
    <div class="register">
        <!-- <mt-header title="注册">
            <router-link to="/login" slot="left">
                <mt-button icon="back" ></mt-button>
            </router-link>
        </mt-header> -->
        <myHeader :param = "myHeader"></myHeader>
        <form action="#" method="post" name="personalForm" id="personalForm">
            <ul class="fill_in">
               <li>
                  <p>手机号：</p><input type="text" placeholder="请输入手机号码" v-model="param.phone"/>
               </li>
               <li>
                  <p>密码：</p><input type="password" placeholder="请设置密码" v-model="param.password"/>
               </li>
               <li>
                  <p>确认密码：</p><input type="password" placeholder="请再次输入密码" v-model="param.againPassword" >
               </li>
               <li>
                  <p>验证码：</p><input type="text" placeholder="请输入验证码" v-model="param.code"/>
                  <input v-bind:class="{ get_code: !buttonDisabled, 'get_code_nor': buttonDisabled }" id="get_code" v-on:click="confirm"  type="button" :value="code">
               </li>
            </ul>
            
            <div class="confirm_register" v-on:click="register">注册</div>
       </form>
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
                myHeader:{
                    name:'注册'
                },
                code:'获取验证码',
                buttonDisabled: false,
                param: {
                    phone: '',
                    code: '',
                    imageCode: '',
                    password: '',
                    againPassword:''
                }

            }
        },
        components: {
            myHeader
        },
        methods:{
                 confirm:function(){
                    
                    let _self = this;
                    let checkPhone = validation.checkPhone(_self.param.phone);
                    if(checkPhone){
                        common.$emit('message',checkPhone);
                    }else{
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
                        biz_module:'userSmsService',
                        biz_method:'getVervifyCode',
              
                            biz_param: {
                                mobile: _self.param.phone  
                            }
                        }, function(response) {
                            common.$emit('close-load');
                            if(response.data.code == '1c01'){

                            }else{
                              common.$emit('message', response.data.msg);
                            }
                            


                        }, function(err) {
                            common.$emit('close-load');
                            common.$emit('message', err.data.msg);
                        })

                 },
                 register(){
                     var checkArr = [];
                     let _self = this;
                     let checkPhone = validation.checkPhone(_self.param.phone);
                     checkArr.push(checkPhone);
                     let checkPassword = validation.checkNull(_self.param.password, '请输入密码！');
                     checkArr.push(checkPassword);
                     let checkagainPassword = validation.checkNull(_self.param.againPassword, '请再次输入密码！');
                     checkArr.push(checkagainPassword);
                     if(_self.param.password != _self.param.againPassword){
                         let differentPassword = '您输入的密码不一致'
                         checkArr.push(differentPassword);
                     }


                        

                       let checkCode = validation.checkCode(_self.param.code, '666000');
                           checkArr.push(checkCode);
                     for (var i = 0; i < checkArr.length; i++) {
                        if (checkArr[i]) {
                            common.$emit('message', checkArr[i]);
                            return;
                        }
                     }   
                    
                   


                    common.$emit('show-load');
                    httpService.register(common.urlCommon + common.apiUrl.most, {
                        biz_module:'userSmsService',
                        biz_method:'registerUser',

                        biz_param: {
                            phone: _self.param.phone,
                            code: _self.param.code,
                            password: _self.param.password,
                            rePassword:_self.param.againPassword
                        }
                    }, function(response) {
                        
                        common.$emit('close-load');
                        if (response.data.code == '1c01') {
                            common.$emit('message', response.data.msg);
                        } else {
                            common.$emit('message', response.data.msg);          
                        }


                    }, function(err) {
                        common.$emit('close-load');
                        common.$emit('message', err.data.msg);
                    })  
                
            }
                /*confirm:function(){
                  
                    let phone=document.getElementById("ephone").value;
                    let pattern = /^1[34578]\d{9}$/;
                    let button = document.getElementById("get_code");
                    button.disabled = true;

                    if(!pattern.test(phone)) {          
                        alert('请输入有效的手机号！');
                        button.disabled = false;
                    }else{
                       let wait = 5;
                       let this_ = this;
                       let time = setInterval(function(){
                                
                                wait--;
                                console.log(wait);
                                this_.code = wait;
                                if(wait == 0){
                                   clearInterval(time);
                                   this_.code = '获取验证码';
                                   button.disabled = false;
                                }
                              },1000);
                    }
                }    */
            
            }
        
        
}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>


.register .fill_in{
    padding: 0 4.6%;
    margin-top:1rem;
    background:white;
}

.register .fill_in li{
    height:5rem;
    font-size: 1.2rem;
    color:#333333;
    border-bottom: 1px solid #E0E0E0;
    line-height: 2rem;
    padding:1.5rem 0;
    
}
.register .fill_in li input{
    outline: none;
    border:0;
    height:2rem;
    float: left;
    font-size: 1.2rem;
    padding-left:0.5rem;
    width:47%;
}
.register .fill_in li p{
    width:23.5%;
    text-align: right;
    float:left;
}
/*.register .fill_in li div{
    border-left: 1px solid #E0E0E0;
    width:70px;
    float:right;
    font-size: 1.4rem;
}*/
.register .fill_in li .get_code{
    width:80px;
    border: 1px solid #BFBFBF;
    height:2.3rem;
    border-radius: 5px;
    background: #F5F5F5;
    float:right;
    line-height: 2.3rem;
    padding: 0;

}
.register .fill_in li .get_code_nor{
    width:80px;
    border: 1px solid #BFBFBF;
    height:2.3rem;
    border-radius: 5px;
    background: #F5F5F5;
    float:right;
    line-height: 2.3rem;
    padding: 0;
    color:#CECEBF;
}
.register .confirm_register{
    width:90%;
    height:3.5rem;
    margin-left:5%;
    background:#FA6705;
    color:white;
    line-height: 3.5rem;
    text-align: center;
    border-radius: 1.75rem;
    margin-top: 9rem;
}

</style>
