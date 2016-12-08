<template>
  <div class="good_detail">
        <mt-header title="商品详情">
            <router-link to="/myResource" slot="left">
                <mt-button icon="back"></mt-button>
            </router-link>
        </mt-header>
        
       <div class="swipe_height" >
            <mt-swipe :auto="4000" :prevent="true" :show-indicators="false">
              
              <mt-swipe-item v-for="(item,index) in imgArray" >
                   <img :src="item.url">
                   <div class="index"><span>{{index+1}}</span>/5</div>
                   
              </mt-swipe-item>
                
            </mt-swipe>
        </div>
        <div class="release_time">
            <p>发布时间：<span>2016-11-26</span></p>
        </div>

        <div class="drug_info">
            <div class="first_level">
                <img src="/static/images/bao.png">
                <p>人参</p>
                <p class="price"><span>65</span>元/kg</p>
            </div>
           <div class="box">
                <div class="second_level">
                    <p class="the_left">产地：<span>安徽</span></p>
                    <p class="the_right">规格：<span>统货</span></p>
                </div>

                <div class="third_level">
                    <p class="the_left">库存：<span>100</span>kg</p>
                    <p class="the_right">起订量：<span>20</span>kg</p>
                </div>
                
                <div class="fourth_level">
                    <p class="the_left">样品：<span>不提供</span></p> 
                </div>
           </div>
           

            <div class="fifth_level">
                <p class="left">卖点：</p>
                <p class="right"><span>甘都好无走油，甘都好无走油，甘都好无走油，甘都好无走油，甘都好无走油，</span></p>
            </div>
        </div>

        <div class="flowsheet">
            <p>流程图</p>
            <img src="/static/images/progress_1.png">
        </div>
        
  </div>
</template>

<script>
import common from '../common/common.js'

export default {
    data() {
            return {
               imgArray: [{
                    url: '/static/images/1.jpg'
                }, {
                    url: '/static/images/2.jpg'
                }, {
                    url: '/static/images/3.jpg'
                }],
            }
        }
        

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

.good_detail .swipe_height{
  height:18.8rem;
  position: relative;
}
.good_detail .swipe_height img {
    width: 100%;
    position: absolute;
    left:0;
}
.good_detail .swipe_height .index{
   width:4rem;
   height:1.6rem;
   background: black;
   z-index: 9000000000;
   position: absolute;
   right: 2rem;
   opacity: 0.5;
   border-radius: 0.8rem;
   bottom: 1.5rem;
   color:white;
   line-height: 1.6rem;
   text-align: center;
   font-size: 1.4rem;
   
}
.good_detail .swipe_height .index span{
   color:#FA6705;
}
.good_detail .release_time{
   height:4rem;
   font-size: 1rem;
   color:#333333;
   line-height: 4rem;
   background:white;
   text-align: left;
   padding:0 0 0 1.5rem;
   margin-bottom: 1rem;
}
.good_detail .release_time span{
   color:#666666;
}
.good_detail .drug_info{
  padding: 0 1.5rem;
  background-color: white;
  min-height: 19rem;
  position: relative;
}
.good_detail .drug_info .first_level{
  position: relative;
}
.good_detail .drug_info img{
  width: 1.5rem;
  height:1.5rem;
  position: absolute;
  left:0;
  top:1.5rem;
}
.good_detail .drug_info .first_level p{
  font-size: 1.4rem;
  line-height: 1.4rem;
  color:#333333;
  position: absolute;
  top:1.5rem;
  left:2.5rem;

}
.good_detail .drug_info .first_level .price{
  font-size: 1.6rem;
  color:#FA6705;
  position: absolute;
  right:0;
  text-align: right;
}
.good_detail .drug_info .second_level,.good_detail .drug_info .third_level,.good_detail .drug_info .fourth_level{
  height:1rem;
  line-height: 1rem;
  margin-top: 1.5rem;
  font-size: 1rem;
  color:#333333;
}
.good_detail .drug_info .second_level span,.good_detail .drug_info .third_level span,.good_detail .drug_info .fourth_level span{
  color:#666666;
}
.good_detail .drug_info .the_left{
  float: left;
}
.good_detail .drug_info .the_right{
  float:right;
}
.good_detail .drug_info .box{
  padding-top: 3.9rem;
  margin-bottom: 1.5rem;
}
.good_detail .drug_info .fifth_level p{
  
  text-align: left;
  font-size: 1rem;
  line-height: 1.5rem;
}
.good_detail .drug_info .fifth_level p span{
  color:#666666;
}
.good_detail .drug_info .fifth_level .left{
  float:left;
}
.good_detail .drug_info .fifth_level .right{
  
  margin-left: 3rem;
}
.good_detail  .flowsheet{
  padding: 1.5rem;
  background:white;
  
  margin: 1rem 0 50px 0;
}
.good_detail  .flowsheet img{
  height:4rem;
  width:100%;
}
.good_detail  .flowsheet p{
  float:left;
  margin-bottom: 1rem;
  font-size:1.4rem;
  color:#FA6705; 
}
</style>
