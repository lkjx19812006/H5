<template>
      <div class="whole">
        <div class="header">
              <div class="select">
                  <p>上海</p>
                  
              </div>
              <input type="text" placeholder="输入你想要的内容"  disabled="true">  
              <img src="/static/images/search.png" class="search">
        </div>
         
        <div class="page-swipe" id="page-swipe" >
            <mt-swipe :auto="4000">
                <mt-swipe-item >
                    <img src="/static/images/1.jpg">
                </mt-swipe-item>
                <mt-swipe-item >
                    <img src="/static/images/2.jpg">
                </mt-swipe-item>
                <mt-swipe-item >
                    <img src="/static/images/3.jpg">
                </mt-swipe-item>
            </mt-swipe>
        </div>
        
        
   
            <div class="entrance">
              <div class="entrance_low_price">
                 <img  src="/static/images/lowPrice.png">
               
                <p>低价资源</p>
              </div>
              <div class="entrance_urgent_need">
              <img  src="/static/images/urgentSupply.png">
                <p>紧急求购</p>
              </div>

            <router-link to="marketQuotation"> 
              <div class="entrance_market_quotation">
                <img  src="/static/images/market.png">
                <p>市场行情</p>
              </div>
            </router-link>
            
            <router-link to="drugResTable">
                <div class="entrance_drugrestable" >
                 <img  src="/static/images/drugType.png">
                  <p>药性表</p>
                </div>
            </router-link>
              
            </div>
       
           <div class="supply_demond">
                <p style="background: url('../../../static/images/mySupply.png') no-repeat 80% center;background-size: 5.9731rem 5.9731rem; ">我要供应</p>
                <p style="background: url('../../../static/images/myDemond.png') no-repeat 80% center; background-size: 5.9731rem 5.9731rem;">我要采购</p>
           </div>
           
           <div class="real_news">
              <div class="news_logo" style="background: url('../../../static/images/neWs.png') no-repeat 1.7066rem center;background-size: 6rem 6rem;"></div>
              <div class="news_content">
               <ul>   
          
                    <li v-for="todo in todos">
                        <p class="good_p">{{todo.name}}</p>
                        <p>{{todo.spec}}</p>
                        <p>{{todo.place}}</p>
                        <p class="price_P">{{todo.price}}</p>
                        <p class="phone_p">{{todo.phone}}</p>
                        <p class="way_p">{{todo.time}}</p>
                    </li>

               </ul>
              </div>

           </div>  

          
           
        <div class="good_price">
           <p>药材指导价</p>
           <p class="more_content"><span>更多</span>&nbsp;<img src="/static/images/right.png"></p>
           <mt-swipe :auto="4000" :showIndicators="false">
           
           <mt-swipe-item  v-for="todo in todos">
           <div class="good_price_box">
               <div class="good_price_swipe" id="good_price_swipe_one" >
                
                        <p class="price_swiper_name">{{todo.name}}</p>
                      <div class="price_swiper_div">
                         <p>规格:<span>{{todo.spec}}</span></p>
                         <p>{{todo.price}}</p>
                      </div>

                      <div class="price_swiper_div">
                         <p>规格:<span>{{todo.spec}}</span></p>
                         <p><img src="/static/images/up.png">&nbsp;{{todo.up_price}}</p>
                      </div>
                   
              </div>

              <div class="good_price_swipe" id="good_price_swipe_two" >
                
                         <p class="price_swiper_name">{{todo.name}}</p>
                      <div class="price_swiper_div">
                         <p>规格:<span>{{todo.spec}}</span></p>
                         <p>{{todo.price}}</p>
                      </div>

                      <div class="price_swiper_div">
                         <p>规格:<span>{{todo.spec}}</span></p>
                         <p><img src="/static/images/down.png">&nbsp;{{todo.down_price}}</p>
                      </div>
                   
              </div>
          </div>
             </mt-swipe-item>
       </mt-swipe>
         </div>  

            <div class="recommend">
                 <p>推荐资源</p>
                 <p class="more_content"><span>更多</span>&nbsp;<img src="/static/images/right.png"></p>
                 <ul>
                     <li v-for="todo in todos" style="background:url(/static/images/bao.png) no-repeat 0rem center;background-size: 3rem 3rem;" >
                        <p class="good_p" >{{todo.name}}</p>
                        <p>{{todo.spec}}</p>
                        <p>{{todo.place}}</p>
                        <p class="price_p">{{todo.price}}</p>
                        <p class="phone_p">{{todo.phone}}</p>
                        <p class="way_p"><input type="button" value="我要购买"></p>
                     </li>
                     
                 </ul>
            </div>
   
          <div class="urgent">
               <p>紧急求购</p>
               <p class="more_content"><span>更多</span>&nbsp;<img src="/static/images/right.png"></p>
               <ul>
                  <li v-for="todo in todos" style="background:url(/static/images/zheng.png) no-repeat 0rem center;background-size: 3rem 3rem;">
                        <p class="good_p">{{todo.name}}</p>
                        <p>{{todo.spec}}</p>
                        <p>{{todo.place}}</p>
                        <p class="price_p">{{todo.price}}</p>
                        <p class="phone_p">{{todo.phone}}</p>
                        <p class="way_p"><input type="button" value="我要购买"></p>
                 </li>
                
               </ul>
          </div>          


</template>
<script>

import common from '../../common/common.js'


export default {
      data() {
            return {
                msg: 'Welcome to Your Vue.js App',
                selected: 'tab-container1',
                todos:{},
                drugParam:{
                  show:false
                }
            }
            
        },

        methods:{



        },

        created() {

             common.$emit('show-load');

            this.$http.get(common.apiUrl.list).then((response) => {
                console.log(response.data);
                  common.$emit('close-load');


                  let data = response.data.biz_result.list;
                  console.log(data);
                  this.todos = data;
                  
                 

            }, (err) => {
                console.log(err);
                  common.$emit('close-load');
                  common.$emit('message',response.data.msg);
            });
        }
   



}



</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.whole{
    position: relative;
    background:#f5f5f5;
    /*padding-bottom: 3.499rem;*/
    
}


ul li{
    list-style: none;
}
.header{
    width:100%;
    height:8.534rem;
    background:#FA6705;
    position: relative;

}

.header .select{
    position: absolute;
    left:1.7066rem;
    border:none;
    background:#FA6705;
    top:2.73rem;
    color:white;
    outline:none;
    border: 0;
    
}


.header input{
    width:42.667rem;
    height:5.12rem;
    padding-left:2.56rem;
    border-radius: 5.12rem;
    position: absolute;
    left:12.799rem;
    top:1.7066rem;
    outline:none;
    border: 0;
    font-size: 2.048rem;

} 
.header .search{
  width:3.5rem;
  height:3.5rem;
  position: absolute;
  left:50.344rem;
  top:2.5166rem;
}

.entrance{
    background:white;
    position: relative;
    height:15.3594rem;
    margin-bottom:1.7067rem; 
    margin-top: 1.7067rem;
    padding-bottom:1.7067rem;
}
.entrance_low_price{
  position: absolute;
  left:1.7067rem;
  top:1.7067rem;
}
.entrance_urgent_need{
  position: absolute;
  left:18.6025rem;
  top:1.7067rem;
}
.entrance_market_quotation{
  position: absolute;
  left:35.498rem;
  top:1.7067rem;
}
.entrance_drugrestable{
  position: absolute;
  left:52.3938rem;
  top:1.7067rem;
}

.entrance img{
    /*border-radius: 50%;
    width:80%;
    border:1px solid red;*/
    
    /*background:red;*/
    width:8.5335rem;
    height:8.5335rem;
    border-radius: 50%;
    
}
/*.mint-tabbar{
    position: relative;
    margin: 1.7067rem 0 1.7067rem 0;
}*/

.supply_demond{
    display:flex;
    flex-direction:row;
    background:white;
    height:10.24rem;
    position: relative;
}

.supply_demond p{
    flex:1;
    text-align: left;
    line-height: 10.24rem;
    box-sizing: border-box;
    padding-left:1.7067rem;
    color:orange;
    font-weight: 500;
    font-size: 2.7306rem;

}

.real_news{
    position: relative;
    display:flex;
    flex-direction:row;
    height:10.24rem;
    background: white;
    margin:1.7067rem 0;
    overflow:hidden;
    line-height: 3.4133rem;
    padding: 1.7067rem 0;
}
.real_news ul{
  margin-right:1.7067rem;
}
.real_news ul li p{
     font-size: 1.7067rem;
     line-height: 3.4133rem;
}
.real_news .news_logo{
    flex:1;
}

.real_news .news_content{
    flex:6;
}



.news_content ul li{
    display:flex;
    flex-direction:row;
    line-height: 3rem;
}

.news_content ul li p{
    flex:2;
    font-size: 1.7067rem;
}
.news_content ul li .price_p,.news_content ul li .phone_p,.news_content ul li .good_p,.news_content ul li .way_p{
    /*flex:3;*/

}

.good_price{
    padding: 0.8533rem;
    background:white;
    text-align: left;
    font-size: 1.7067rem;
    height:28rem;
    box-sizing:border-box;
    margin-bottom: 1.7067rem;
    position: relative;
}
.way_p input{
  height:4.0984rem;
  width:10.2396rem;
  background:#EC6817;
  line-height: 4.0984rem;
  color: #ffffff;
  border:0;
}
.good_price>p{
  font-size: 2.7306rem;
  margin-left: 0.8533rem;
  margin-top:1.7067rem;
  margin-bottom: 1.7067rem;
}


#good_price_swipe_one .mint-swipe {
    
    height: 13.6528rem;
    
    
    

}



#good_price_swipe_two .mint-swipe {
    
    height: 13.6528rem;
   
    
    

}

.price_swiper_name{
    margin-top: 0.8533rem;
    font-size: 2.5599rem;
    margin-bottom: 1.7067rem;
} 

.price_swiper_div{
  display:flex;
  flex-direction:row;
}

.price_swiper_div>p{ 
     flex:1;
     font-size: 2.5599rem;
     color:gray;
     line-height: 3rem;
}
.price_swiper_div>p img{
     width: 1.2rem;
}
.good_price_box{
    display:flex;
    flex-direction:row;
    margin-top: 0.8533rem;
    margin-left: 0.8533rem;
}

#good_price_swipe_one{
   flex:1;
   background:#EDFAD8;
   padding: 1.7067rem; 
   border-radius: 2rem;
  
}

#good_price_swipe_two{
  flex:1;
  margin-left:1.7067rem; 
  margin-right: 1.7067rem;
  background: #FFF0D7;
  padding: 1.7067rem; 
  border-radius: 2rem;

}
.recommend,.urgent{
    padding: 0.8533rem;
    background:white;
    text-align: left;
    font-size: 2.0479rem;
    min-height:10.2396rem;
    box-sizing:border-box;
    margin-bottom: 1.7067rem; 
    position: relative;
}

.recommend .more_content,.urgent .more_content,.good_price .more_content{
  position: absolute;
  right: 1.877rem;
  top: 1.877rem;
  font-size: 1.877rem;
}
.recommend .more_content img,.urgent .more_content img,.good_price .more_content img{
  width:0.8533rem;
}
.recommend p,.urgent p{
    margin-bottom: 0.8533rem;
}

.recommend>p,.urgent>p{
    font-size: 2.73rem;
    margin:1.7067rem 0 1.7067rem 0.8533rem;
}
.recommend ul,.urgent ul{
    display:flex;
    flex-direction:column;
}

.recommend ul li,.urgent ul li{
    flex:1;
    border-top: 1px solid gray;
    height:7.509rem;
    font-size: 2.0479rem;
    color:#333333;
    margin:0 0.8533rem;
}


.recommend ul li{
    display:flex;
    flex-direction:row;
    line-height: 7.509rem;
}

.recommend ul li p{
    flex:2;
    font-size: 2.0479rem;
}
.recommend ul li .price_p,.recommend ul li .phone_p,.recommend ul li .good_p,.recommend ul li .way_p{
    flex:3;
}

.recommend ul li,.urgent ul li{
  padding-left:5.1198rem;
}
.urgent ul li{
    display:flex;
    flex-direction:row;
    line-height: 7.509rem;
}

.urgent ul li p{
    flex:2;
    font-size: 2.0479rem;
}
.urgent ul li .price_p,.urgent ul li .phone_p,.urgent ul li .good_p,.urgent ul li .way_p{
    flex:3;
}
#page-swipe .mint-swipe {
    
    height: 29.8655rem;
    color: #fff;
    font-size: 2.5599rem;
    text-align: center;

}

<<<<<<< HEAD
#page-swipe .mint-swipe-item {

    line-height: 17.066rem;
}

img {
    width: 100%;
}

</style>
