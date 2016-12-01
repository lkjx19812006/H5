<template>
   <div class="whole">
    <mt-header title="我要付款" class="header_word">
      <router-link to="/home" slot="left">
        <mt-button icon="back" class="header_back"></mt-button>
      </router-link> 
   </mt-header>

   <div class="pay_ad">这是付款方式背景图</div>

   <div class="need_to_pay">
      <p>需付款：</p>
      <div><span>2100</span>元</div>
   </div>
   
   <div class="pay_way">
      <p>请选择付款方式</p>
      <ul>
         <li v-for="todo in todos" v-on:click="selectPayWay(todo,false)">
             <div>
               <img :src="todo.left_img" class="left_img">
               <p>{{todo.pay_way}}<!-- （余额：<span>5300.00</span>元） --></p>
               <img :src="todo.right_img">
             </div>
         </li>
         <!-- <li>
             <div>
               <p>支付宝</p>
               <img src="/static/images/selected-nor.png">
             </div>
         </li>
         <li>
             <div>
               <p>微信</p>
               <img src="/static/images/selected-nor.png">
             </div>
         </li>
         <li>
             <div>
               <p>银联</p>
               <img src="/static/images/selected-nor.png">
             </div>
         </li> -->
      </ul>
   </div>


  </div>

</template>


<script> 

import common from '../common/common.js'

export default{
	
	data() {
            return {
                msg: 'Welcome to Your Vue.js App',
                todos:[
                    {
                      left_img:'/static/images/yaokuanbao-pay.png',
                      pay_way:'药款宝（余额：5300.00元）',
                      right_img:'/static/images/selected-nor.png'
                  },
                   {
                      left_img:'/static/images/zhifubao-pay.png',
                      pay_way:'支付宝',
                      right_img:'/static/images/selected-nor.png'
                  },
                  {
                      left_img:'/static/images/wechat-pay.png',
                      pay_way:'微信',
                      right_img:'/static/images/selected-nor.png'
                  },
                  {
                      left_img:'/static/images/bank-pay.png',
                      pay_way:'银联',
                      right_img:'/static/images/selected-nor.png'
                  }
                ],
                data:""
                
            }
        },
        created() {
            common.$emit('show-load');
            this.$http.get(common.apiUrl.drug_table_list).then((response) => {
                  common.$emit('close-load');
                  
                  

            }, (err) => {
                  common.$emit('close-load');
                  common.$emit('message',response.data.msg);
            });
        },
        methods:{
          selectPayWay:function(todo,data){
            
            this.data = !this.data;
            
            if(this.data == true){
              todo.right_img = '/static/images/selected.png';
            }else{
              todo.right_img = '/static/images/selected-nor.png';
            }
            
            
          }
        }
}

</script>

<style scoped>
.whole{
    position: relative;
   
}

.mint-header{
  background-color:white;
  color:#313232;
}
.header_word{
  color:#333333;
}

.pay_ad{
   height:7rem;
   width:100%;
   background:green;
   line-height:7rem; 
}
.need_to_pay{
  padding: 0 5.5% 0 4.7%;
  height:6rem;
  width:100%;
  line-height: 6rem;
  background: white;
}
.need_to_pay p,.need_to_pay div{
  font-size: 1.4rem;
  color:#FA6705;
}
.need_to_pay div span{
  font-size:1.6rem;
  font-weight: 500; 
}
.need_to_pay p{
  float:left;
}
.need_to_pay div{
  float:right;
}
.pay_way{
  width:100%;
  margin-top:1rem;
  background:white;
}
.pay_way>p{
  padding: 0 4.7%;
  text-align: left;
  height:5rem;
  line-height: 5rem;
  font-size: 1.4rem;
  color:#FA6705;
}
.pay_way ul li{
  height:5rem;
  line-height: 5rem;
  width:100%;
  border-top:1px solid #C9C9C9;
  padding: 0 4.7%;
  text-align: left;
}
.pay_way ul li div{
  width:100%;
  height:5rem;
  /*padding-left:9.5%;*/
}
.pay_way ul li div p{
  float:left;
  font-size: 1.2rem;
  color:#333333;
}
.pay_way ul li div img{
  float:right;
  width:2rem;
  height:2rem;
  margin-top:1.5rem;
}
.pay_way ul li div .left_img{
  float:left;
  margin-right:1rem;
}
</style>