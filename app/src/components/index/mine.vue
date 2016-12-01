<template>
  <div class="whole">
      <div class="header">
           <div class="header_top" style="background:url(/static/images/right-arrow.png) right center no-repeat;background-size:1.024rem 1.024rem;">
                <div class="header_photo"></div>
                <div class="information">
                     <div class="information_center">
                     	<div class="main_content">
                             <p class="name" id="name">{{content.name}}</p>
                             <p class="sex"><img :src="content.img_src"></p>
                     	</div>
                         
                         <!-- <p class="money">储值：￥31232.89</p> -->
                        <p class="company">{{content.company}}</p>
                     </div>
                     
                     <div class="information_right">
                         <p class="money">储值：￥{{content.money}}</p>
                         <p class="integration">积分：{{content.integration}}</p>
                     </div>
                     
                </div> 
                <!-- <img src="/static/images/right-arrow.png" class="right-arrow"> -->
           </div>

           <div class="header_bottom">
               <p class="my_service">{{content.my_service}}</p>
               <p class="his_name">{{content.his_name}}</p>
               <router-link to="accountInfo"><p class="details">{{content.details}}</p></router-link>
           </div>
      </div>
      
       <div class="entrance">
             <div class="order" style="background:url(../../../static/icons/All-orders.png) no-repeat center 1.621rem;background-size:2.048rem 2.048rem;">
                 <p>{{entrance.order}}</p>
             </div>
             <div class="obligation" style="background:url(../../../static/icons/Pending-payment.png) no-repeat center 1.621rem;background-size:2.048rem 2.048rem;">
                 <p>{{entrance.obligation}}</p>
             </div>
             <div class="send" style="background:url(../../../static/icons/To-be-shipped.png) no-repeat center 1.621rem;background-size:2.048rem 2.048rem;">
                 <p>{{entrance.send}}</p>
             </div>
             <div class="receive" style="background:url(../../../static/icons/Receipt-of-goods.png) no-repeat center 1.621rem;background-size:2.048rem 2.048rem;">
                <p>{{entrance.receive}}</p>
             </div>
       </div>
      
         <div class="my_list">
             <ul>
                 <li class="my_drugmoney" style="background:white url(../../../static/icons/I-Yaokuan.png) no-repeat center 2.133rem;background-size:2.5599rem 2.5599rem;">
                 	<p>{{my_list.my_drugmoney}}</p>
                 </li>
                 <li class="my_resouce" style="background:white url(../../../static/icons/My-resources.png) no-repeat center 2.133rem;background-size:2.5599rem 2.5599rem;">
                 	<p>{{my_list.my_resouce}}</p>
                 </li>
                 <li style="background:white url(../../../static/icons/My-purchase.png) no-repeat center 2.133rem;background-size:2.5599rem 2.5599rem;">
                 	<p>{{my_list.my_demond}}</p>
                 </li> 
             </ul>
             <ul>   
                 <li class="my_price" style="background:white url(../../../static/icons/My-offer.png) no-repeat center 2.133rem;background-size:2.5599rem 2.5599rem;">
                 	<p>{{my_list.my_price}}</p>
                 </li>
                 <li class="my_attention" style="background:white url(../../../static/icons/My-concern.png) no-repeat center 2.133rem;background-size:2.5599rem 2.5599rem;">
                 	<p>{{my_list.my_attention}}</p>
                 </li>
                 <li style="background:white url(../../../static/icons/Set-up.png) no-repeat center 2.133rem;background-size:2.5599rem 2.5599rem;">
                 	<p>{{my_list.set}}</p>
                 </li>
             </ul>
         </div>
  </div>
</template>

<script>

export default {
  data () {
    return {
      msg: 'Welcome to Your Vue.js App',
      content:{
      	 name:'扬帆',
      	 company:'康美药业',
      	 money:'31232.89',
      	 integration:'1223',
         his_name:'余鹏飞',
         my_service:'我的专属客服',
         details:'点击详情',
         img_src:'/static/images/woman.png'
      },
      entrance:{
      	 order:'全部订单',
      	 obligation:'待付款',
      	 send:'待发货',
      	 receive:'待收货',
      },
      my_list:{
         my_drugmoney:'我的药款',
         my_resouce:'我的资源',
         my_demond:'我的采购',
         my_price:'我的报价',
         my_attention:'我的关注',
         set:'设置'
      }
    }
  }

 
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.whole{
	background:#F0F0F0;
}
.header{
    height:17.537rem;
    width:100%;
    background:#cccccc;
    padding-top:3.7rem;
}
.header_top{
	width:88%;
	height:6.4rem;
	
	margin-left: 6%;
	
}
.header_photo{
	background:#FFD779;
	width:6.4rem;
	height:6.4rem;
	border-radius: 50%;
	margin-right: 4%;
	float:left;
}
.information{
	width:65.4%;
	height:6.4rem;
	padding: 1.38rem 0;
	
	display:flex;
	flex-direction:row;
	font-size: 1.024rem;
	
}
.information_center{
	flex:4;
	display: flex;
	flex-direction:column;
	text-align: left;
}
.information_center div{
	flex:1;
}
.company{
	flex:1;

	
}
.information_right{
	display:flex;
	flex-direction:column;
	text-align: left;
	flex:6;
}
.money{
	flex:1;
}
.integration{
	flex:1;
}
#name{
	font-size: 1.365rem;
	color:#FB761E;
	float:left;
}
.sex img{
	height:1.024rem;
	margin-left: 3%;
	margin-top: 0.1705rem;
	float:left;
}
.right-arrow{
	width:1.024rem;
	height:1.024rem;
    margin-top:1.308rem;
}
.header_bottom{
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
.my_service{
	flex:47;
	text-align: left;
}
.his_name{
	flex:26;
    text-align: left;
}
.details{
	flex:27;
	text-align: right;
}
.entrance{
	display:flex;
	flex-direction:row;
	height:7.253rem;
	margin-top: 0.8533rem;
	background: white;
}
.entrance div{
	flex:1;
	box-sizing: border-box;
	height:7.253rem;
	padding-top:4.48rem;
}
.entrance div p{
	font-size: 1.109rem;
	color:#333333;
}
.my_list{
	width:100%;
	height:17.066rem;
	display: flex;
	flex-direction:column;
	margin-top:0.8533rem;
}
.my_list ul{
	width:100%;
	height:17.066rem;
	flex:1;
	margin-bottom: 0.213rem;
	display:flex;
	flex-direction:row;
}
.my_list ul li{
	flex:1;
	box-sizing: border-box;
	padding-top:5.46rem;
	
}
.my_list ul li p{
	font-size: 1.024rem;
	color:#333333;
}
.my_drugmoney,.my_resouce,.my_price,.my_attention{
	margin-right:0.213rem;
}
</style>
