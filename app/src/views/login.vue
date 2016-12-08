<template>
    <div class="login">
        <mt-header title="登录">
            <router-link to="/home" slot="left">
                <mt-button icon="back" ></mt-button>
            </router-link>
        </mt-header>
        <div class="out_select_box">
           <div class="select_box">
                <mt-navbar v-model="selected">
                  <mt-tab-item id="1">验证码登录</mt-tab-item>
                  <mt-tab-item id="2">密码登录</mt-tab-item>
                </mt-navbar>
           </div>
        </div>
        <div class="selected_box">
             <mt-tab-container v-model="selected">
                <mt-tab-container-item id="1">
                     <ul class="fill_in_first">
                       <li>
                          <p>账号：</p><input type="text" placeholder="请输入手机号码" id="ephone"/>
                       </li>
                       <li>
                          <p>验证码：</p>
                          <input type="text" placeholder="请输入验证码"/>
                          <div class="get_code" v-on:click="confirmLogin">{{code}}</div>
                       </li>
                    </ul>
                </mt-tab-container-item>

                <mt-tab-container-item id="2">
                     <ul class="fill_in_second">
                       <li>
                          <p>账号：</p><input type="text" placeholder="请输入手机号码" id="ephone"/>
                       </li>
                       <li>
                          <p>登陆密码：</p><input type="text" placeholder="请输入密码"/>
                       </li>
                       <li>
                          <p>验证码：</p>
                          <input type="text" placeholder="请输入验证码"/>
                          <div  v-on:click="getCode">{{identify_code}}</div>
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
        
        
        <div class="confirm_login" >登陆</div> 
    </div>
</template>
<script>
import common from '../common/common.js'

export default {
    data() {
            return {
                msg: 'Welcome to Your Vue.js App',
                selected:'1',
                identify_code:'',
                code:'获取验证码'
            }
        },
        created() {
            let    str = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLNOPQRSTUVWXYZ0123456789';
                    let    res = ' ' ;
                    for( var i = 0; i < 4; i++ ) {
                         var   index  =  parseInt( Math.random()*61 );
                         res  +=  str[ index ];
                         console.log(res);
                         
                    }
                    this.identify_code = res;
        },
        methods:{
               getCode:function(){
                    let    str = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLNOPQRSTUVWXYZ0123456789';
                    let    res = ' ' ;
                    for( var i = 0; i < 4; i++ ) {
                         var   index  =  parseInt( Math.random()*61 );
                         res  +=  str[ index ];
                         console.log(res);
                        
                    }
                     this.identify_code = res;
               },
                confirmLogin:function(){
                    var phone=document.getElementById("ephone").value;
                    var pattern = /^1[34578]\d{9}$/;    
                    if(!pattern.test(phone)) {          
                        alert('请输入有效的手机号！');
                    }else{
                       let wait = 10;
                       let this_ = this;
                       let time = setInterval(function(){
                                
                                wait--;
                                console.log(wait);
                                this_.code = wait;
                                 if(wait == 0){
                                   clearInterval(time);
                                   this_.code = '获取验证码';
                                }
                              },1000);


                    }
                }    
            

        }
        
}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.login .out_select_box{
    width:100%;
    padding:1.5rem 0;
    background:white;
}
.login .select_box{
    
    width:62%;
    height:4rem;
    text-align: center;
    line-height: 4rem;
    margin-left: 19%;
}
.login .mint-navbar .mint-tab-item {
    border-bottom: 0;
   /* line-height: 0 !important;  */
   border:1px solid #FA6705;
}
.login .mint-navbar .mint-tab-item.is-selected {
    background-color: #FA6705;
    color: white;
    margin: 0;
}

.login .selected_box .fill_in_first{
    padding: 0 4.6%;
    margin-top:1rem;
    background:white;
}

.login .selected_box /*.fill_in_first*/ li{
    height:5rem;
    font-size: 1.2rem;
    color:#333333;
    border-bottom: 1px solid #E0E0E0;
    line-height: 2rem;
    padding: 1.5rem 0;
    
}
.login .selected_box /*.fill_in_first*/ li input{
    outline: none;
    border:0;
    height:2rem;
    float: left;
    
    padding-left:0.5rem;
    width:47%;
}
.login .selected_box .fill_in_first li p{
    width:17.5%;
    text-align: right;
    float:left;
}
.login .selected_box .fill_in_first li .get_code{
    width:100px;
    border: 1px solid #BFBFBF;
    height:2.3rem;
    border-radius: 5px;
    background: #F5F5F5;
    
    float:right;
    line-height: 2.3rem;

}

.login .selected_box .fill_in_second{
    padding: 0 4.6%;
    margin-top:1rem;
    background:white;
}

.login .selected_box .fill_in_second li p{
    width:22.5%;
    text-align: right;
    float:left;
}
.login .selected_box .fill_in_second li div{
    border-left: 1px solid #E0E0E0;
    width:70px;
    float:right;
    font-size: 1.4rem;
}
.login .fast_register,
.forget_password{
    font-size: 1.1rem;
    color:#FA6705;
}
.login .prompt_box{
    width:100%;
    margin-top: 1.5rem;
    margin-bottom: 5rem;
    height:1.1rem;
}
.login .prompt_box .fast_register{
    float:left;
    margin-left: 7.8%;
}
.login .prompt_box .forget_password{
    float:right;
    margin-right: 7.8%;
}
.login .confirm_login{
    width:90%;
    height:3.5rem;
    margin-left:5%;
    background:#FA6705;
    color:white;
    line-height: 3.5rem;
    text-align: center;
    border-radius: 1.75rem;

}
</style>
