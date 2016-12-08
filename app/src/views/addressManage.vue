<template>
    <div class="address_manage">
        <mt-header title="地址管理">
            <router-link to="/mySet" slot="left">
                <mt-button icon="back" ></mt-button>
            </router-link>
        </mt-header>
        <ul>
           <li v-for="(todo,index) in todos" v-show="show">
               <div class="address_top" >
                  <div class="receiver">
                    <p class="receiver_left">收货人：<span>{{todo.name}}</span></p>
                    <p class="receiver_right">{{todo.number}}</p> 
                  </div> 

                  <div class="address">
                    <p>地址：<span>{{todo.address}}</span></p>
                  </div> 
               </div>
                

                <div class="address_bottom">
                     <p class="top_p">
                        <img :src="todo.first_img" class="first_img" v-on:click="changeColor(todos,todo,index)">
                        <span>默认地址</span>
                     </p>
                   <div class="address_box">
                     <p class="center_p">
                        <img :src="todo.second_img"  class="second_img">
                        <span v-on:click="jump(todo.router)">修改</span>
                     </p>
                     <p class="bottom_p">
                        <img :src="todo.last_img"  class="last_img">
                        <span v-on:click="delet(todo,index)">删除</span>
                     </p>
                   
                   </div>
                     
                </div>
           </li>
        </ul>
        <router-link to="addAddress">
         <div class="add_address">添加新地址</div>
        </router-link> 
    </div>
</template>
<script>
import common from '../common/common.js'

export default {
    data() {
            return {
                msg: 'Welcome to Your Vue.js App',
                show:true,
          
                todos:[{
                    name:'扬帆',
                    number:'1234465469798',
                    address:'上海宝隆一方大厦',
                    first_img:'/static/images/default_nor.png',
                    second_img:'/static/images/modify.png',
                    last_img:'/static/images/delet.png',
                    router:'addressRevise'
                },{
                    name:'小黄毛',
                    number:'1234465469798',
                    address:'上海宝隆一方大厦',
                    first_img:'/static/images/default_nor.png',
                    second_img:'/static/images/modify.png',
                    last_img:'/static/images/delet.png',
                    router:'addressRevise'
                }]
                
            }
        },
        methods:{
          delet:function(todo,index){
                let deletLi = document.getElementsByTagName('li')[index];
                deletLi.style.display = "none";
          },
          changeColor:function(todos,todo,index){
                
                
                for(var item in todos){
                    todos[item].first_img = '/static/images/default_nor.png';
                    todos[index].first_img = '/static/images/default.png';
                }
                


          },
          jump:function(router){
                this.$router.push(router);
          }
        }
       
        
    }

</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

.address_manage ul li{
  background:white;
  margin-top: 1rem;
}
.address_manage ul li{
  position: relative;
}
.address_manage ul li .address_top{
    padding: 2.5rem 1.5rem 2rem 1.5rem;
    
    height:8.5rem;
}
.address_manage ul li .address_top .receiver_left{
    float:left;

}
.address_manage ul li .address_top .receiver_right{
    float:right;
}
.address_manage ul li .address_top p{
    font-size: 1.2rem;
    color:#333333;
}
.address_manage ul li .address_top p span{
   color:#666666;
}
.address_manage ul li .address_top .address{
    /*float:left;*/
    /*margin-top: 1.5rem;*/
    /*text-align: left;*/
    
    position: absolute;
    top:5rem;
}

.address_manage ul li .address_bottom{
   border-top:1px solid #DCDCDC;
   height:3.7rem;
   position: relative;
   line-height: 3.7rem;
}
.address_manage ul li .address_bottom img{
   height:1.75rem;
}
.address_manage ul li .address_bottom .first_img{
   position: absolute;
   left:1.5rem;
   top:0.975rem;
}
.address_manage ul li .address_bottom .second_img{
   position: absolute;
   right:11.8rem;
   top:0.975rem;
}
.address_manage ul li .address_bottom .last_img{
   position: absolute;
   right:4.4rem;
   top:0.975rem;
}
.address_manage ul li .address_bottom .top_p{
   float:left;
   margin:0 0 0 3.5rem;
}
.address_manage ul li .address_bottom .address_box{
   float: right;
   height: 3.7rem;
   width:13.55rem;
}
.address_manage ul li .address_bottom .center_p{
   float:left;
   margin:0 0 0 1.75rem;

}
.address_manage ul li .address_bottom .bottom_p{
   float:right;
   margin:0 1.9rem 0 0;
}
.address_manage .add_address{
   width:100%;
   background:#FA6705;
   font-size: 1.7rem;
   color:white;
   line-height: 5rem;
   position: fixed;
   bottom: 0;
   
}
</style>
