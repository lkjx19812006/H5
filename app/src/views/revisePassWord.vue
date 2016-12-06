<template>
    <div class="revise_password">
        <mt-header title="修改密码">
            <router-link to="/home" slot="left">
                <mt-button icon="back" ></mt-button>
            </router-link>
        </mt-header>
        <ul class="fill_in">
            <li>
               <p>手机号：</p>
               <input type="text" >
            </li>
            <li>
               <p>验证码：</p>
               <input type="text" placeholder="请输入你的验证码">
               <button>获取验证码</button>
            </li>
        </ul>
    </div>
</template>
<script>
import common from '../common/common.js'

export default {
    data() {
            return {
                msg: 'Welcome to Your Vue.js App',
                
                
            }
        },
       
    }

</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.revise_password .fill_in{
   padding-left: 4.7%;
}
.revise_password .fill_in li{
  height:3.5rem;
  margin-top: 2rem;
}
.revise_password .fill_in p{
   float:left;
}
.revise_password .fill_in input{
   float:left;
}
</style>
