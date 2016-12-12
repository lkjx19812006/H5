<template>
    <div class="my_set">
        <mt-header title="我的设置">
            <router-link to="/home" slot="left">
                <mt-button icon="back" ></mt-button>
            </router-link>
        </mt-header>
        <ul class="mylist">
           <li v-for="(todo,index) in todos" v-if="index == 0" @click="jump(todo.router)">
              <img :src="todo.first_img" class="herder">
              <p>{{todo.left_word}}</p>
              <p class="word_right">你有<span>{{todo.right_word}}</span>条未读消息</p>
              <img :src="todo.second_img" class="arrow">
           </li>
           <li v-for="(todo,index) in todos" v-if="index >= 1 && index <= 2" @click="jump(todo.router)">
              <img :src="todo.first_img" class="herder">
              <p>{{todo.left_word}}</p>
              <img :src="todo.second_img" class="arrow">
           </li>
           <li v-for="(todo,index) in todos" v-if="index ==3" @click="jump(todo.router)">
              <img :src="todo.first_img" class="herder">
              <p>{{todo.left_word}}</p>
           </li>
           <li v-for="(todo,index) in todos" v-if="index ==4" @click="jump(todo.router)">
              <img :src="todo.first_img" class="herder">
              <p>{{todo.left_word}}</p>
              <img :src="todo.second_img" class="arrow">
           </li>
           <li v-for="(todo,index) in todos" v-if="index >= 5 && index <= 6" @click="jump(todo.router)">
              <img :src="todo.first_img" class="herder">
              <p>{{todo.left_word}}</p>
              <p class="last_word">{{todo.right_word}}</p>
           </li>
        </ul>

        <router-link to="login"><div class="quit">退出当前账号</div></router-link>
    </div>
</template>
<script>
import common from '../common/common.js'

export default {
    data() {
            return {
                msg: 'Welcome to Your Vue.js App',
                todos:[{
                    first_img:'/static/images/my-news.png',
                    left_word:'我的消息',
                    right_word:'3',
                    router:'',
                    second_img:'/static/images/right-arrow.png'
                },{
                    first_img:'/static/images/password-modification.png',
                    left_word:'修改密码',
                    router:'revisePassWord',
                    second_img:'/static/images/right-arrow.png'
                },{
                    first_img:'/static/images/address_administration.png',
                    left_word:'地址管理',
                    router:'addressManage',
                    second_img:'/static/images/right-arrow.png'
                },{
                    first_img:'/static/images/about.png',
                    left_word:'关于我们'
                },{
                    first_img:'/static/images/ider.png',
                    left_word:'意见反馈',
                    router:'feedBack',
                    second_img:'/static/images/right-arrow.png'
                },{
                    first_img:'/static/images/customer-service.png',
                    left_word:'联系客服',
                    right_word:'400-820-7181'
                },{
                    first_img:'/static/images/current-version.png',
                    left_word:'当前版本',
                    right_word:'V 2.1'
                }]
                
            }
        },
        methods:{
            jump:function(router){
                this.$router.push(router);
            }
        }
        
    }

</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

.my_set .mylist{
   padding: 0  4.7%;
   background:white;
}
.my_set .mylist li{
   height:4.4rem;
   border-bottom: 1px solid #DADADA;
   position: relative;
}
.my_set .mylist li .herder{
   float:left;
   height:1.5rem;
   margin-top: 1.3rem;
}
.my_set .mylist li .arrow{
   position: absolute;
   height:1rem;
   right:0;
   top:1.7rem;
}
.my_set .mylist li p{
  float:left;
  line-height: 4.4rem;
  margin-left: 1.2rem;
  color:#333333;
}
.my_set .mylist li .word_right{
  float:right;
  margin-right:1.5rem;
  color:#666666;
}
.my_set .mylist li .word_right span{
  color:#FA6705;
}
.my_set .mylist li .last_word{
  float:right;
  line-height: 4.4rem;
  margin-left: 1.2rem;
  color:#666666;
}
.my_set .quit{
   width:100%;
   background:#FA6705;
   font-size: 1.7rem;
   color:white;
   line-height: 5rem;
   position: fixed;
   bottom: 0;
   
}
</style>
