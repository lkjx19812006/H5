<template>
<<<<<<< HEAD
    <div class="register">
        <mt-header title="注册">
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
                  <p>密码：</p><input type="text" placeholder="请设置密码"/>
               </li>
               <li>
                  <p>确认密码：</p><input type="text" placeholder="请再次输入密码" >
               </li>
               <li>
                  <p>验证码：</p><input type="text" placeholder="请输入验证码" />
                  <input class="get_code" v-on:click="confirm"  type="button" :value="code">
               </li>
            </ul>
            
            <div class="confirm_register" >注册</div>
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
                  
                    let phone=document.getElementById("ephone").value;
                    let pattern = /^1[34578]\d{9}$/;    
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
    width:100px;
    border: 1px solid #BFBFBF;
    height:2.3rem;
    border-radius: 5px;
    background: #F5F5F5;
    float:right;
    line-height: 2.3rem;
    padding: 0;

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
=======
    <div class="content resource_information">
        <div class="search_div">
           
        </div>
    </div>
</template>
<script>
export default {
    data() {
            return {

            }
        },
        props:{
            information:{

            }
        },

        created() {

        }
}
</script>
<style scoped>
.resource_information {
    float: left;
    width: 100%;
}

>>>>>>> ae1d5b00e4edfeb8ea58bcb61f8bf1ba3aaa14f3
</style>
