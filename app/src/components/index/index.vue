<template>
      <div class="whole">
        <div class="header">
              <div class="select">
                  <p>上海</p>
                  
              </div>
              <input type="text" placeholder="输入你想要的内容" >  
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
        
        
   
            <div class="tabList">
              <div class="tab1">
                 <img  src="/static/images/lowPrice.png">
               
                <p>低价资源</p>
              </div>
              <div class="tab2">
              <img  src="/static/images/urgentSupply.png">
                <p>紧急求购</p>
              </div>
              <div class="tab3">
                <img  src="/static/images/market.png">
                <p>市场行情</p>
              </div>
            
                <div class="tab4" @click="drugClick()">
                 <img  src="/static/images/drugType.png">
                  <p>药性表</p>
                </div>
              
            </div>
       
           <div class="supply_demond">
                <p style="background: url('../../../static/images/mySupply.png') no-repeat 80% center;background-size: 5.9731rem 5.9731rem; ">我要供应</p>
                <p style="background: url('../../../static/images/myDemond.png') no-repeat 80% center; background-size: 5.9731rem 5.9731rem;">我要采购</p>
           </div>
           
           <div class="realNews">
              <div class="newsLogo" style="background: url('../../../static/images/neWs.png') no-repeat 1.7066rem center;background-size: 6rem 6rem;"></div>
              <div class="newsContent">
               <ul>   
          
                    <li v-for="todo in todos">
                        <p class="goodP">{{todo.name}}</p>
                        <p>{{todo.spec}}</p>
                        <p>{{todo.place}}</p>
                        <p class="priceP">{{todo.price}}</p>
                        <p class="phoneP">{{todo.phone}}</p>
                        <p class="wayP">{{todo.time}}</p>
                    </li>

               </ul>
              </div>

           </div>  

          
           
        <div class="goodPrice">
           <p>药材指导价</p>
           <p class="moreContent"><span>更多</span>&nbsp;<img src="/static/images/right.png"></p>
           <mt-swipe :auto="4000" :showIndicators="false">
           
           <mt-swipe-item  v-for="todo in todos">
           <div class="goodPriceBox">
               <div class="goodPrice-swipe" id="goodPrice-swipeOne" >
                
                        <p class="priceSwiperName">{{todo.name}}</p>
                      <div class="priceSwiperDiv">
                         <p>规格:<span>{{todo.spec}}</span></p>
                         <p>{{todo.price}}</p>
                      </div>

                      <div class="priceSwiperDiv">
                         <p>规格:<span>{{todo.spec}}</span></p>
                         <p><img src="/static/images/up.png">&nbsp;{{todo.upPrice}}</p>
                      </div>
                   
              </div>

              <div class="goodPrice-swipe" id="goodPrice-swipeTwo" >
                
                         <p class="priceSwiperName">{{todo.name}}</p>
                      <div class="priceSwiperDiv">
                         <p>规格:<span>{{todo.spec}}</span></p>
                         <p>{{todo.price}}</p>
                      </div>

                      <div class="priceSwiperDiv">
                         <p>规格:<span>{{todo.spec}}</span></p>
                         <p><img src="/static/images/down.png">&nbsp;{{todo.downPrice}}</p>
                      </div>
                   
              </div>
          </div>
             </mt-swipe-item>
       </mt-swipe>
         </div>  

            <div class="recommend">
                 <p>推荐资源</p>
                 <p class="moreContent"><span>更多</span>&nbsp;<img src="/static/images/right.png"></p>
                 <ul>
                     <li v-for="todo in todos" style="background:url(/static/images/bao.png) no-repeat 0rem center;background-size: 3rem 3rem;" >
                        <p class="goodP" >{{todo.name}}</p>
                        <p>{{todo.spec}}</p>
                        <p>{{todo.place}}</p>
                        <p class="priceP">{{todo.price}}</p>
                        <p class="phoneP">{{todo.phone}}</p>
                        <p class="wayP"><input type="button" value="我要购买"></p>
                     </li>
                     
                 </ul>
            </div>
   
          <div class="urgent">
               <p>紧急求购</p>
               <p class="moreContent"><span>更多</span>&nbsp;<img src="/static/images/right.png"></p>
               <ul>
                  <li v-for="todo in todos" style="background:url(/static/images/zheng.png) no-repeat 0rem center;background-size: 3rem 3rem;">
                        <p class="goodP">{{todo.name}}</p>
                        <p>{{todo.spec}}</p>
                        <p>{{todo.place}}</p>
                        <p class="priceP">{{todo.price}}</p>
                        <p class="phoneP">{{todo.phone}}</p>
                        <p class="wayP"><input type="button" value="我要购买"></p>
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

.tabList{
    background:white;
    position: relative;
    height:15.3594rem;
    margin-bottom:1.7067rem; 
    margin-top: 1.7067rem;
    padding-bottom:1.7067rem;
}
.tab1{
  position: absolute;
  left:1.7067rem;
  top:1.7067rem;
}
.tab2{
  position: absolute;
  left:18.6025rem;
  top:1.7067rem;
}
.tab3{
  position: absolute;
  left:35.498rem;
  top:1.7067rem;
}
.tab4{
  position: absolute;
  left:52.3938rem;
  top:1.7067rem;
}

.tabList img{
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

.realNews{
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
.realNews ul{
  margin-right:1.7067rem;
}
.realNews ul li p{
     font-size: 1.7067rem;
     line-height: 3.4133rem;
}
.realNews .newsLogo{
    flex:1;
}

.realNews .newsContent{
    flex:6;
}



.newsContent ul li{
    display:flex;
    flex-direction:row;
    line-height: 1.7067rem;
}

.newsContent ul li p{
    flex:2;
    font-size: 1.7067rem;
}
.newsContent ul li .priceP,.newsContent ul li .phoneP,.newsContent ul li .goodP,.newsContent ul li .wayP{
    flex:3;
}

.goodPrice{
    padding: 0.8533rem;
    background:white;
    text-align: left;
    font-size: 1.7067rem;
    height:28rem;
    box-sizing:border-box;
    margin-bottom: 1.7067rem;
    position: relative;
}
.wayP input{
  height:4.0984rem;
  width:10.2396rem;
  background:#EC6817;
  line-height: 4.0984rem;
  color: #ffffff;
  border:0;
}
.goodPrice>p{
  font-size: 2.7306rem;
  margin-left: 0.8533rem;
  margin-top:1.7067rem;
  margin-bottom: 1.7067rem;
}


#goodPrice-swipeOne .mint-swipe {
    
    height: 13.6528rem;
    
    
    

}



#goodPrice-swipeTwo .mint-swipe {
    
    height: 13.6528rem;
   
    
    

}

.priceSwiperName{
    margin-top: 0.8533rem;
    font-size: 2.5599rem;
    margin-bottom: 1.7067rem;
} 

.priceSwiperDiv{
  display:flex;
  flex-direction:row;
}

.priceSwiperDiv>p{ 
     flex:1;
     font-size: 2.5599rem;
     color:gray;
     line-height: 3rem;
}
.priceSwiperDiv>p img{
     width: 1.2rem;
}
.goodPriceBox{
    display:flex;
    flex-direction:row;
    margin-top: 0.8533rem;
    margin-left: 0.8533rem;
}

#goodPrice-swipeOne{
   flex:1;
   background:#EDFAD8;
   padding: 1.7067rem; 
   border-radius: 2rem;
  
}

#goodPrice-swipeTwo{
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

.recommend .moreContent,.urgent .moreContent,.goodPrice .moreContent{
  position: absolute;
  right: 1.877rem;
  top: 1.877rem;
  font-size: 1.877rem;
}
.recommend .moreContent img,.urgent .moreContent img,.goodPrice .moreContent img{
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
.recommend ul li .priceP,.recommend ul li .phoneP,.recommend ul li .goodP,.recommend ul li .wayP{
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
.urgent ul li .priceP,.urgent ul li .phoneP,.urgent ul li .goodP,.urgent ul li .wayP{
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
