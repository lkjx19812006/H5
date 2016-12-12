<template>
    <div class="address_revise">
        <mt-header title="地址管理">
            <router-link to="/addressManage" slot="left">
                <mt-button icon="back" ></mt-button>
            </router-link>
        </mt-header>
        <ul>
           <li v-for="todo in todos">
               <div class="address_top">
                  <div class="receiver">
                    <p class="receiver_left">收货人：<span><input type="text" :placeholder="todo.name"></span></p>
                    <p class="receiver_right">{{todo.number}}</p> 
                  </div> 

                  <div class="address">
                    <p>地址：<span><input type="text" :placeholder="todo.address"></span></p>
                  </div> 
               </div>
                

                <div class="address_bottom">
                     <p class="top_p">
                        <img :src="todo.first_img" class="first_img">
                        <span>默认地址</span>
                     </p>
                   <div class="address_box">
                     <p class="center_p">
                        <img :src="todo.second_img"  class="second_img">
                        <span>修改</span>
                     </p>
                     <p class="bottom_p">
                        <img :src="todo.last_img"  class="last_img">
                        <span>删除</span>
                     </p>
                   
                   </div>
                     
                </div>
           </li>
        </ul>
       <router-link to="addressManage">
        <div class="confirm">确认</div>
        <router-link>
    </div>
</template>
<script>
import common from '../common/common.js'

export default {
    data() {
            return {
                msg: 'Welcome to Your Vue.js App',
                todos:[{
                    name:'扬帆',
                    number:'1234465469798',
                    address:'上海宝隆一方大厦',
                    first_img:'/static/images/default_nor.png',
                    second_img:'/static/images/modify.png',
                    last_img:'/static/images/delet.png'
                }]
                
            }
        }
       
        
    }

</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

.address_revise ul li{
  background:white;
  margin-top: 1rem;
  position: relative;
}
.address_revise ul li .address_top{
    padding: 2.5rem 1.5rem 2rem 1.5rem;
    
    height:8.5rem;
}
.address_revise ul li .address_top .receiver_left{
    float:left;
}
.address_revise ul li .address_top .receiver_right{
    float:right;
}
.address_revise ul li .address_top p{
    font-size: 1.2rem;
    color:#333333;
}
.address_revise ul li .address_top input{
   border:none;
   outline: none;
   margin-top:-0.3rem;
}
.address_revise ul li .address_top p span{
   color:#666666;
}
.address_revise ul li .address_top .address{
    /*float:left;
    margin-top: 1.5rem;*/
    position: absolute;
    top:5rem;
}
.address_revise ul li .address_bottom{
   border-top:1px solid #DCDCDC;
   height:3.7rem;
   position: relative;
   line-height: 3.7rem;
}
.address_revise ul li .address_bottom img{
   height:1.75rem;
}
.address_revise ul li .address_bottom .first_img{
   position: absolute;
   left:1.5rem;
   top:0.8rem;
}
.address_revise ul li .address_bottom .second_img{
   position: absolute;
   right:11.9rem;
   top:0.8rem;
}
.address_revise ul li .address_bottom .last_img{
   position: absolute;
   right:4.4rem;
   top:0.8rem;
}
.address_revise ul li .address_bottom .top_p{
   float:left;
   margin:0 0 0 3.5rem;
}
.address_revise ul li .address_bottom .address_box{
   float: right;
   height: 3.7rem;
   width:13.55rem;
}
.address_revise ul li .address_bottom .center_p{
   float:left;
   margin:0 0 0 1.75rem;

}
.address_revise ul li .address_bottom .bottom_p{
   float:right;
   margin:0 1.9rem 0 0;
}
.address_revise .confirm{
   width:100%;
   background:#FA6705;
   font-size: 1.7rem;
   color:white;
   line-height: 5rem;
   position: fixed;
   bottom: 0;
   

}
</style>
