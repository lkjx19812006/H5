<template>
    <div class="revise_password_confirm">
        <mt-header title="修改密码">
            <router-link to="/revisePassWord" slot="left">
                <mt-button icon="back" ></mt-button>
            </router-link>
        </mt-header>
        <ul class="fill_in">
            <li>
               <p >手机号：</p>
               <input type="text" class='top_text' id="ephone">
            </li>
            <li>
               <p >新密码：</p>
               <input type="text" class='top_text' id="ephone">
            </li>
            <li class="last_li">
               <p >&nbsp;&nbsp;&nbsp;&nbsp;密码：</p>
               <input type="text" class='top_text' id="ephone">
            </li>
        </ul>

        <router-link to="">
            <div class="next_step">下一步</div>
        </router-link>
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
               
                nextStep:function(){
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
.revise_password_confirm .fill_in{
   
   background:white;
   padding:2rem 0 5rem 4.7%;
}
.revise_password_confirm .fill_in li{
  height:3.5rem;
  margin:0 0 1.3rem 0;
}

.revise_password_confirm .fill_in li.last_li{
  margin-bottom: 0;
}
.revise_password_confirm .fill_in p{
   float:left;
   font-size: 1.2rem;
   color:#333333;
   line-height: 3.5rem;
}
.revise_password_confirm .fill_in input{
   float:left;
   height:3.5rem;
   border-radius: 1.75rem;
   border:1px solid #C9C9C9;
   padding:0 1.75rem;
   width:75%;
}

.revise_password_confirm .next_step{
  width:78%;
  height:3.5rem;
  background:#FA6705;
  color:white;
  font-size: 1.7rem;
  text-align: center;
  line-height: 3.5rem;
  border-radius: 1.75rem;
  margin:7.5rem 11% 0 11%;
}
</style>
