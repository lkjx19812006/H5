<template>
    <div class="find_password">
        <mt-header title="找回密码">
            <router-link to="/login" slot="left">
                <mt-button icon="back" ></mt-button>
            </router-link>
        </mt-header>
        <form action="#" method="post" name="personalForm" id="personalForm">
            <ul class="fill_in">
               <li>
                  <p>手机号：</p><input type="text" placeholder="请输入手机号码" id="ephone"/>
               </li>
               <li>
                  <p>验证码：</p><input type="text" placeholder="请输入验证码"/>
                  <div  id="identify_code">{{identify_code}}</div>
                  <input class="get_code" id="get_code" v-on:click="confirm" :value="code" type="button">
               </li>
               <li>
                  <p>新密码：</p><input type="text" placeholder="请输入新密码" />
               </li>
            </ul>
            
            <div class="confirm" >确定</div>
       </form>
    </div>
</template>
<script>
import common from '../common/common.js'

export default {
    data() {
            return {
                msg: 'Welcome to Your Vue.js App',
                code:'获取验证码'

            }
        },
        methods:{
               
                confirm:function(){
                    var phone=document.getElementById("ephone").value;
                    var pattern = /^1[34578]\d{9}$/;

                    let button = document.getElementById("get_code");
                    button.disabled = true;    
                    if(!pattern.test(phone)) {          
                        alert('请输入有效的手机号！');
                        button.disabled = !button.disabled
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
                                   button.disabled = false;
                                }
                              },1000);
                    }
                }    
            

        }
        
}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>


.find_password .fill_in{
    padding: 0 4.6%;
    margin-top:1rem;
    background:white;
}

.find_password .fill_in li{
    height:5rem;
    font-size: 1.2rem;
    color:#333333;
    border-bottom: 1px solid #E0E0E0;
    line-height: 2rem;
    padding: 1.5rem 0;
    
}
.find_password .fill_in li input{
    outline: none;
    border:0;
    height:2rem;
    float: left;
    
    padding-left:0.5rem;
    width:47%;
}
.find_password .fill_in li p{
    width:17.5%;
    text-align: right;
    float:left;
}
.find_password .fill_in li div{
    border-left: 1px solid #E0E0E0;
    width:70px;
    float:right;
    font-size: 1.4rem;
}
.find_password .fill_in li .get_code{
    width:100px;
    border: 1px solid #BFBFBF;
    height:2.3rem;
    border-radius: 5px;
    background: #F5F5F5;
    padding: 0;
    float:right;
    line-height: 2.3rem;
    text-align:center;

}
.find_password .confirm{
    width:90%;
    height:3.5rem;
    margin-left:5%;
    background:#FA6705;
    color:white;
    line-height: 3.5rem;
    text-align: center;
    border-radius: 1.75rem;
    margin-top: 5.5rem;
}
</style>
