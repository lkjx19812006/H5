<template>
  <div class="my_order_detail">
        <mt-header title="采购订单">
            <router-link to="/myOder" slot="left">
                <mt-button icon="back"></mt-button>
            </router-link>
        </mt-header>
        
      <div class="ad_img"></div> 
      
      <div class="word_info">
            <!-- <img src="/static/images/1.jpg"> -->
            <div  class="info_left">
                <p>下单时间：<span>2016-11-23</span></p>
                <p>订单号：<span>DD1111222233</span></p> 
                <p>收件人：<span>杨帆</span>|<span>15971484216</span></p> 
                <p class="last_p">收货地址：<span>上海</span></p>
            </div>
            <p class="info_right">
              待付款   
            </p>
      </div> 

      <div class="drug_info">
          <div class="drug_info_top">
               <img src="/static/images/1.jpg">
               <div class="info_top_center">
                   <p class="drug_name">人参</p>
                   <p class="drug_spec">规格：统货</p>
                   <p>产地：安徽</p>
               </div>
               <div class="info_top_bottom">
                   <p class="drug_money">20<span>元/kg</span></p>
                   <p>数量：<span>100</span>kg</p>
               </div>  
          </div>
          <div class="drug_info_bottom">
               <div class="good_sum_price">
                   <p>商品总价</p>
                   <p class="price">￥2000</p>
               </div>
               <div class="transport_price">
                   <p>运输价格</p>
                   <p class="price">￥10</p>
               </div>
               <div class="sum_price">
                 <p>合计</p>
                 <p class="price">￥2010</p>
               </div>
          </div>
      </div> 
      

   
         
        
        
  </div>
</template>

<script>
import common from '../common/common.js'

export default {
    data() {
            return {
               
            }
        }
        

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.my_order_detail{
    background:#F5F5F5;
}
.my_order_detail .ad_img{
    background:green;
    width:100%;
    height:14rem;
    margin-bottom: 1rem;
}
.my_order_detail .word_info{
    padding: 1.5rem;
    height:10rem;
    background:white;
    
}
.my_order_detail .word_info .info_left{
    float:left;
    
}
.my_order_detail .word_info .info_right{
    float:right;
    color:#FA6705;
    font-size: 1.3rem;

}
.my_order_detail .word_info .info_left p{
    font-size: 1rem;
    margin-bottom: 1rem;
    text-align: left;
    line-height: 1rem;
}
.my_order_detail .word_info .info_left .last_p{
    margin-bottom: 0;
}
.my_order_detail .drug_info{
    margin-top: 1rem;
    padding: 1.5rem;
    background:white;
    margin-bottom: 100px;
}
.my_order_detail .drug_info .drug_info_top{
    height:9.75rem;
    position: relative;
}
.my_order_detail .drug_info .drug_info_top img{
    width:8.9rem;
    height:8.5rem;
    position: absolute;
    left:0;
    top:0;
}
.my_order_detail .drug_info .drug_info_top .info_top_center{
    left:9.9rem;
    position: absolute;
    height:6.5rem;
    text-align: left;
    margin: 1rem 0 0 0;
    
}
.my_order_detail .drug_info .drug_info_top .info_top_center .drug_name{
    font-size: 1.4rem;
    color:#333333;
    padding-bottom: 2rem;
    line-height: 1.4rem;
}
.my_order_detail .drug_info .drug_info_top .info_top_center p{
    font-size: 1rem;
    color:#666666;
    line-height: 1rem; 
}
.my_order_detail .drug_info .drug_info_top{
    
    padding-bottom: 1.5rem;
    border-bottom:1px solid #DEDEDE;
}
.my_order_detail .drug_info .drug_info_top .info_top_center .drug_spec{
    margin-bottom: 1rem;
}
.my_order_detail .drug_info .drug_info_top .info_top_bottom{
    position: absolute;
    height:6.5rem;
    text-align: left;
    margin: 1rem 0 0 0;
    right:0;
    
    text-align: right;
}
.my_order_detail .drug_info .drug_info_top .info_top_bottom .drug_money{
    font-size: 1.4rem;
    color:#FA6705;
    margin-bottom: 3.9rem;
    line-height: 1.4rem;
}
.my_order_detail .drug_info .drug_info_top .info_top_bottom .drug_money span{
    font-size: 1.2rem;
}
.my_order_detail .drug_info .drug_info_top .info_top_bottom p{
    font-size: 1rem;
    color:#666666;
    line-height: 1rem;
}
.my_order_detail .drug_info .drug_info_bottom{
    margin-top: 2rem;
    font-size: 1rem;
    color:#666666;
}
.my_order_detail .drug_info .drug_info_bottom .good_sum_price{
    margin-bottom: 1rem;
}
.my_order_detail .drug_info .drug_info_bottom .good_sum_price,.my_order_detail .drug_info .drug_info_bottom .transport_price{
    height:1rem;
    line-height: 1rem;
}
.my_order_detail .drug_info .drug_info_bottom>div .price{
    float:right;
}
.my_order_detail .drug_info .drug_info_bottom>div p{
    float:left;
}
.my_order_detail .drug_info .drug_info_bottom .sum_price{
    font-size: 1.2rem;
    color:#FA6705;
    line-height: 1.2rem;
    margin-top: 1.5rem;
    height:1.2rem;
}
</style>
