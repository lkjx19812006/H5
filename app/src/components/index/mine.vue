<template>
  <div class="whole">
    
      <div class="mine_header" v-for="todo in content">
           <div class="mine_header_top">
                <div class="mine_header_photo"></div>
                <div class="mine_information">
                     <div class="mine_information_center">
                     	<div class="mine_main_content">
                             <p class="mine_name" id="mine_name">{{todo.name}}</p>
                             <p class="mine_sex"><img :src="todo.img_src"></p>
                     	</div>
                         
                        
                        <p class="mine_company">{{todo.company}}</p>
                     </div>
                     
                     <div class="mine_information_right">
                         <p class="mine_money">储值：￥{{todo.money}}</p>
                         <p class="mine_integration">积分：{{todo.integration}}</p>
                     </div>
                     
                </div> 
                <router-link to="accountInfo">
                    <img src="/static/images/right-arrow.png" class="mine_header_top_right-arrow">
                </router-link>    
           </div>

           <div class="mine_header_bottom">
               <p class="mine_my_service">{{todo.my_service}}</p>
               <p class="mine_his_name">{{todo.his_name}}</p>
               <p class="mine_details">{{todo.details}}</p>
           </div>
      </div>
      
       <div class="mine_entrance" >
             <div v-for="todo in entrance" @click="jump(todo.router)">
                 <img :src="todo.img_src" class="mine_entrance_img">
                 <p>{{todo.name}}</p>
             </div>
            
       </div>
      
         <div class="mine_my_list">
             <ul >
                 <li class="mine_my_list_part mine_my_list_part_norlast" 
                 v-for="(todo,index) in my_list" v-if="index == 0" @click="drugMoney">
                      <img :src="todo.img_src" class="mine_my_list_part_img">
                      <p>{{todo.name}}</p>
                 </li>
                 <li class="mine_my_list_part mine_my_list_part_norlast" 
                 v-for="(todo,index) in my_list" v-if="index == 1" @click="jump(todo.router)">
                      <img :src="todo.img_src" class="mine_my_list_part_img">
                     	<p>{{todo.name}}</p>
                 </li>
                 <li class="mine_my_list_part" v-for="(todo,index) in my_list" v-if="index == 2">
                      <img :src="todo.img_src" class="mine_my_list_part_img">
                      <p>{{todo.name}}</p>
                 </li>
                
             </ul>
             <ul>   
                 <li class="mine_my_list_part mine_my_list_part_norlast" v-for="(todo,index) in my_list" v-if="index > 2 && index <5">
                  <img :src="todo.img_src" class="mine_my_list_part_img">
                 	<p>{{todo.name}}</p>
                 </li>

                 <li class="mine_my_list_part" v-for="(todo,index) in my_list" v-if="index == 5">
                  <img :src="todo.img_src" class="mine_my_list_part_img">
                  <p>{{todo.name}}</p>
                 </li>
                 
             </ul>
         </div>
  </div>
</template>

<script>
import common from '../../common/common.js'
export default {
  data () {
    return {
      msg: 'Welcome to Your Vue.js App',
      content:[{
      	 name:'扬帆',
      	 company:'康美药业',
      	 money:'31232.89',
      	 integration:'1223',
         his_name:'余鹏飞',
         my_service:'我的专属客服',
         details:'点击详情',
         img_src:'/static/images/woman.png'
      }],
      entrance:[{
      	 name:'全部订单',
         router:'',
         img_src:'/static/icons/All-orders.png'
       },{
         name:'待付款',
         router:'',
         img_src:'/static/icons/Pending-payment.png'
       },{
         name:'待发货',
         router:'',
         img_src:'/static/icons/To-be-shipped.png'
       },{
         name:'待收货',
         router:'',
         img_src:'/static/icons/Receipt-of-goods.png'
       }],
       my_list:[{ //         
         name:'我的药款',
         img_src:'/static/icons/I-Yaokuan.png'
       },{
         name:'我的资源',
         img_src:'/static/icons/My-resources.png'
       },{
         name:'我的采购',
         img_src:'/static/icons/My-purchase.png'
       },{
         name:'我的报价',
         img_src:'/static/icons/My-offer.png'
       },{
         name:'我的关注',
         router:'myAttention',
         img_src:'/static/icons/My-concern.png'
       },{
         name:'设置',
         img_src:'/static/icons/Set-up.png'
       }]
         
         
         
         
         
     
    }
  },
  methods:{
    drugMoney:function(){
        common.$emit('myDrugMoney');
    },
    jump: function(router) {
                console.log(router);
                this.$router.push(router);
            }
       

  }


 
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.whole{
	background:#F0F0F0;
}
.mine_header{
    height:17.537rem;
    width:100%;
    background:#cccccc;
    padding-top:3.7rem;
}
.mine_header_top{
	width:88%;
	height:6.4rem;
	/*background:url(/static/images/right-arrow.png) right center no-repeat;background-size:1.024rem 1.024rem;*/
	margin-left: 6%;
  position: relative;
	
}
.mine_header_photo{
	background:#FFD779;
	width:6.4rem;
	height:6.4rem;
	border-radius: 50%;
	margin-right: 4%;
	float:left;
}
.mine_information{
	width:65.4%;
	height:6.4rem;
	padding: 1.38rem 0;
	
	display:flex;
	flex-direction:row;
	font-size: 1.024rem;
	
}
.mine_information_center{
	flex:4;
	display: flex;
	flex-direction:column;
	text-align: left;
}
.mine_information_center div{
	flex:1;
}
.mine_company{
	flex:1;

	
}
.mine_information_right{
	display:flex;
	flex-direction:column;
	text-align: left;
	flex:6;
}
.mine_money{
	flex:1;
}
.mine_integration{
	flex:1;
}
#mine_name{
	font-size: 1.365rem;
	color:#FB761E;
	float:left;
}
.mine_sex img{
	height:1.024rem;
	margin-left: 3%;
	margin-top: 0.1705rem;
	float:left;
}
.mine_right-arrow{
	width:1.024rem;
	height:1.024rem;
    margin-top:1.308rem;
}
.mine_header_bottom{
	width:85%;
	height:1.27995rem;
	line-height: 1.27995rem;
	display:flex;
	flex-direction:row;
	font-size: 1.024rem;
	float:right;
	margin-right:6%;
	margin-top:1.96rem;
}
.mine_my_service{
	flex:47;
	text-align: left;
}
.mine_his_name{
	flex:26;
    text-align: left;
}
.mine_details{
	flex:27;
	text-align: right;
}
.mine_entrance{
	display:flex;
	flex-direction:row;
	height:7.253rem;
	margin-top: 0.8533rem;
	background: white;
}
.mine_entrance div{
	flex:1;
	box-sizing: border-box;
	height:7.253rem;
	/*padding-top:4.48rem;*/
  position: relative;
}
.mine_entrance div p{
	font-size: 1.109rem;
	color:#333333;
  margin-top: 4.48rem;
}
.mine_my_list{
	width:100%;
	height:17.066rem;
	display: flex;
	flex-direction:column;
	margin-top:0.8533rem;
}
.mine_my_list ul{
	width:100%;
	height:17.066rem;
	flex:1;
	margin-bottom: 0.213rem;
	display:flex;
	flex-direction:row;
}
.mine_my_list ul li{
	flex:1;
	box-sizing: border-box;
	padding-top:5.46rem;
  position: relative;
	
}
.mine_my_list ul li p{
	font-size: 1.024rem;
	color:#333333;
}
.mine_my_list_part_norlast{
	margin-right:0.213rem;
}
.mine_entrance_img{
   position: absolute;
   width:2.048rem;
   height:2.048rem;
   margin-left: -1.024rem;
   left:50%;
   top:1.621rem;
}
.mine_my_list_part{
  background:white;
  
}
.mine_my_list_part_img{
  position: absolute;
  width:2.5599rem;
  height:2.5599rem;
  margin-left:-1.28rem;
  left:50%;
  top:2.133rem;
}
.mine_header_top_right-arrow{
  position:absolute;
  width:1.024rem;
  height:1.024rem;
  right:0; 
  top:2.688rem;
}
</style>
