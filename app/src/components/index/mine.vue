<template>
  <div class="whole">
    
      <div class="mine_header">
           <div class="mine_header_top" style="">
                <div class="mine_header_photo"></div>
                <div class="mine_information">
                     <div class="mine_information_center">
                     	<div class="mine_main_content">
                             <p class="mine_name" id="mine_name">{{content.name}}</p>
                             <p class="mine_sex"><img :src="content.img_src"></p>
                     	</div>
                         
                         <!-- <p class="money">储值：￥31232.89</p> -->
                        <p class="mine_company">{{content.company}}</p>
                     </div>
                     
                     <div class="mine_information_right">
                         <p class="mine_money">储值：￥{{content.money}}</p>
                         <p class="mine_integration">积分：{{content.integration}}</p>
                     </div>
                     
                </div> 
                <!-- <img src="/static/images/right-arrow.png" class="right-arrow"> -->
           </div>

           <div class="mine_header_bottom">
               <p class="mine_my_service">{{content.my_service}}</p>
               <p class="mine_his_name">{{content.his_name}}</p>
               <router-link to="accountInfo"><p class="mine_details">{{content.details}}</p></router-link>
           </div>
      </div>
      
       <div class="mine_entrance">
             <div class="mine_order">
                 <p>{{entrance.order}}</p>
             </div>
             <div class="mine_obligation">
                 <p>{{entrance.obligation}}</p>
             </div>
             <div class="mine_send">
                 <p>{{entrance.send}}</p>
             </div>
             <div class="mine_receive">
                <p>{{entrance.receive}}</p>
             </div>
       </div>
      
         <div class="mine_my_list">
             <ul>
                 <li class="mine_my_drugmoney"  v-on:click="drugMoney">
                 	<p>{{my_list.my_drugmoney}}</p>
                 </li>
                 <li class="mine_my_resouce" >
                 	<p>{{my_list.my_resouce}}</p>
                 </li>
                 <li class="mine_my_demond" >
                 	<p>{{my_list.my_demond}}</p>
                 </li> 
             </ul>
             <ul>   
                 <li class="mine_my_price" style="">
                 	<p>{{my_list.my_price}}</p>
                 </li>
                 <li class="mine_my_attention" style="">
                 	<p>{{my_list.my_attention}}</p>
                 </li>
                 <li class="mine_my_set" >
                 	<p>{{my_list.set}}</p>
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
      },
      sheetVisible: false,
        actions: [{
          name: '展示 Toast',
          method: this.showToast
        }, {
          name: '展示 Message Box',
          method: this.showMsgbox
        }]
    }
  },
  methods:{
    drugMoney:function(){
        common.$emit('myDrugMoney');
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
	background:url(/static/images/right-arrow.png) right center no-repeat;background-size:1.024rem 1.024rem;
	margin-left: 6%;
	
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
	padding-top:4.48rem;
}
.mine_entrance div p{
	font-size: 1.109rem;
	color:#333333;
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
	
}
.mine_my_list ul li p{
	font-size: 1.024rem;
	color:#333333;
}
.mine_my_drugmoney,.mine_my_resouce,.mine_my_price,.mine_my_attention{
	margin-right:0.213rem;
}
.mine_order{
  background:url(/static/icons/All-orders.png) no-repeat center 1.621rem;background-size:2.048rem 2.048rem;
}
.mine_obligation{
  background:url(/static/icons/Pending-payment.png) no-repeat center 1.621rem;background-size:2.048rem 2.048rem;
}
.mine_send{
  background:url(/static/icons/To-be-shipped.png) no-repeat center 1.621rem;background-size:2.048rem 2.048rem;
}
.mine_receive{
  background:url(/static/icons/Receipt-of-goods.png) no-repeat center 1.621rem;background-size:2.048rem 2.048rem;
}
.mine_my_drugmoney{
  background:white url(/static/icons/I-Yaokuan.png) no-repeat center 2.133rem;background-size:2.5599rem 2.5599rem;
}
.mine_my_resouce{
  background:white url(/static/icons/My-resources.png) no-repeat center 2.133rem;background-size:2.5599rem 2.5599rem;
}
.mine_my_demond{
  background:white url(/static/icons/My-purchase.png) no-repeat center 2.133rem;background-size:2.5599rem 2.5599rem;
}
.mine_my_price{
  background:white url(/static/icons/My-offer.png) no-repeat center 2.133rem;background-size:2.5599rem 2.5599rem;
}
.mine_my_attention{
  background:white url(/static/icons/My-concern.png) no-repeat center 2.133rem;background-size:2.5599rem 2.5599rem;
}
.mine_my_set{
  background:white url(/static/icons/Set-up.png) no-repeat center 2.133rem;background-size:2.5599rem 2.5599rem;
}
</style>
