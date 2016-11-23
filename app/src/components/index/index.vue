<template>
<<<<<<< HEAD
    <div class="whole">
        <div class="header">
              <select>
                  <option>上海</option>
                  <option>北京</option>
              </select>
              <input type="text" placeholder="输入你想要的内容">
              <!-- <img src="/static/images/search.png"> -->
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
        
        
   
            <mt-tabbar >
              <mt-tab-item id="tab1">
                 <img  src="/static/images/lowPrice.png">
               
                <p>低价资源</p>
              </mt-tab-item>
              <mt-tab-item id="tab2">
              <img  src="/static/images/urgentSupply.png">
                <p>紧急求购</p>
              </mt-tab-item>
              <mt-tab-item id="tab3">
                <img  src="/static/images/market.png">
                <p>市场行情</p>
              </mt-tab-item>
              <mt-tab-item id="tab4">
               <img  src="/static/images/drugType.png">
                <p>药性表</p>
              </mt-tab-item>
            </mt-tabbar>
       
           <div class="supply_demond">
                <p style="background: url('../../../static/images/mySupply.png') no-repeat 80% center; ">我要供应</p>
                <p style="background: url('../../../static/images/myDemond.png') no-repeat 80% center; ">我要采购</p>
           </div>
           
           <div class="realNews">
              <div class="newsLogo" style="background: url('../../../static/images/44.jpg') no-repeat center center; "></div>
              <div class="newsContent">
               <ul>
                   <!-- <li v-for="todo in todos">
                          <p v-for="todo in todos">{{todo.good_name}}</p>
                   </li> -->
                    <li v-for="todo in todos">
                        <p class="goodP">{{todo.good_name}}</p>
                        <p>{{todo.good_type}}</p>
                        <p>{{todo.adress}}</p>
                        <p class="priceP">{{todo.good_price}}</p>
                        <p class="phoneP">{{todo.phone}}</p>
                        <p class="wayP">{{todo.good_way}}</p>
                    </li>

                   <!--  <li>
                        <p class="goodP">人参</p>
                        <p>统货</p>
                        <p>上海</p>
                        <p class="priceP">180元/kg</p>
                        <p class="phoneP">15971484216</p>
                        <p class="wayP">采购</p>
                    </li> -->
               </ul>
              </div>

           </div>  

           <div class="goodPrice">
               <p>药材指导价</p>
               <ul>
                  <li id="leftLi" v-for="todo in todos">
                      <p>{{todo.good_name}}</p>
                      <div>
                         <p>规格:<span>{{todo.good_type}}</span></p>
                         <p>{{todo.good_price}}</p>
                      </div>

                      <div>
                         <p>规格:<span>{{todo.good_type}}</span></p>
                         <p>{{todo.good_price}}</p>
                      </div>
                  </li>
                  
                  <!-- <li>
                      <p>人参</p>
                      <div>
                         <p>规格:<span>统货</span></p>
                         <p>180元/kg</p>
                      </div>
                  </li> -->

               </ul>
           </div>

           
            <div class="recommend">
                 <p>推荐资源</p>
                 <ul>
                     <li v-for="todo in todos">
                        <p class="goodP">{{todo.good_name}}</p>
                        <p>{{todo.good_type}}</p>
                        <p>{{todo.adress}}</p>
                        <p class="priceP">{{todo.good_price}}</p>
                        <p class="phoneP">{{todo.phone}}</p>
                        <p class="wayP"><input type="button" value="我要购买"></p>
                     </li>
                     <!-- <li>
                        <p class="goodP">人参大妈</p>
                        <p>统货</p>
                        <p>上海</p>
                        <p class="priceP">180元/kg</p>
                        <p class="phoneP">15971484216</p>
                        <p class="wayP"><input type="button" value="我要购买"></p>
                     </li> -->
                 </ul>
            </div>
   
          <div class="urgent">
               <p>紧急求购</p>
               <ul>
                  <li v-for="todo in todos">
                        <p class="goodP">{{todo.good_name}}</p>
                        <p>{{todo.good_type}}</p>
                        <p>{{todo.adress}}</p>
                        <p class="priceP">{{todo.good_price}}</p>
                        <p class="phoneP">{{todo.phone}}</p>
                        <p class="wayP"><input type="button" value="我要购买"></p>
                 </li>
                 <!-- <li>
                        <p class="goodP">人参大妈</p>
                        <p>统货</p>
                        <p>上海</p>
                        <p class="priceP">180元/kg</p>
                        <p class="phoneP">15971484216</p>
                        <p class="wayP"><input type="button" value="我要购买"></p>
                 </li>      -->  
               </ul>
          </div>

=======
    <div class="page-swipe">
        <mt-swipe :auto="4000">
            <mt-swipe-item>
                <img src="/static/images/1.jpg">
            </mt-swipe-item>
            <mt-swipe-item>
                <img src="/static/images/2.jpg">
            </mt-swipe-item>
            <mt-swipe-item>
                <img src="/static/images/3.jpg">
            </mt-swipe-item>
        </mt-swipe>
>>>>>>> 5274ded178ac91cd5d5390b4dd8fe5a2df64d4b4
    </div>
     

    
    
   
    

   
</template>
<script>
<<<<<<< HEAD

export default {
    data() {
        return {
            msg: 'Welcome to Your Vue.js App',
            selected: 'tab-container1',
            todos:[
                { good_name: '人参',good_type: '统货',adress: '上海',good_price:'180元/kg',phone:'15971484216',good_way:'我要购买'},
                { good_name: '人参',good_type: '统货',adress: '上海',good_price:'180元/kg',phone:'15971484216',good_way:'我要购买'}
                
            ]
        }
    }
      

    
    
=======
import common from '../../common/common.js'
export default {
    data() {
            return {
                msg: 'Welcome to Your Vue.js App'
            }
        },
        created() {
             common.$emit('show-load');

            this.$http.get(common.apiUrl.list).then((response) => {
                console.log(response.data);
                  common.$emit('close-load');

            }, (err) => {
                console.log(err);
                  common.$emit('close-load');
                  common.$emit('message',response.data.msg);
            });
        }
>>>>>>> 5274ded178ac91cd5d5390b4dd8fe5a2df64d4b4
}



</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.whole{
    position: relative;
    background:#f5f5f5;
    padding-bottom: 41px;
    
}


ul li{
    list-style: none;
}
.header{
    width:100%;
    height:50px;
    background:#199ED8;
    position: relative;

}

.header select{
    position: absolute;
    left:10px;
    border:none;
    background:#199ED8;
    top:16px;
    color:white;
    outline:none;
    border: 0;
    
}


.header input{
    width:65%;
    height:30px;
    padding-left:15px;
    border-radius: 30px;
    position: absolute;
    left:22%;
    top:10px;
    outline:none;
    border: 0;
    font-size: 12px;

} 


.mint-tab-item{
    background:white;
}
.mint-tab-item-label img{
    /*border-radius: 50%;
    width:80%;
    border:1px solid red;*/
    margin-bottom: 10px;
    /*background:red;*/
    width:50px;
    height:50px;
    border-radius: 50%;
}
.mint-tabbar{
    position: relative;
    margin: 20px 0 20px 0;
}

.supply_demond{
    display:flex;
    flex-direction:row;
    background:white;
    height:120px;
    position: relative;
}

.supply_demond p{
    flex:1;
    text-align: left;
    line-height: 120px;
    box-sizing: border-box;
    padding-left:10px;
    color:orange;
    font-weight: 500;
    font-size: 20px;
}

.realNews{
    position: relative;
    display:flex;
    flex-direction:row;
    height:40px;
    background: white;
    margin:20px 0;
    overflow:hidden;
}

.realNews .newsLogo{
    flex:1;
}

.realNews .newsContent{
    flex:8;
}



.newsContent ul li{
    display:flex;
    flex-direction:row;
    line-height: 20px;
}

.newsContent ul li p{
    flex:2;
    font-size: 12px;
}
.newsContent ul li .priceP,.newsContent ul li .phoneP,.newsContent ul li .goodP,.newsContent ul li .wayP{
    flex:3;
}

.goodPrice{
    padding: 10px;
    background:white;
    text-align: left;
    font-size: 14px;
    height:120px;
    box-sizing:border-box;
    margin-bottom: 20px;
}

.goodPrice ul{
    display:flex;
    flex-direction:row;
    margin-top: 10px;
}

.goodPrice ul li{
    flex:1;
    background:#EDFAD8;
    height:75px;
    border-radius: 5px;
    /*box-shadow:0px 2px 2px gray;*/
    padding: 5px 10px;
    box-sizing: border-box;
}

#leftLi{
    margin-right: 10px;
}
.goodPrice ul li div{
    display:flex;
    flex-direction:row;
}

.goodPrice ul li>p{
    margin-bottom: 5px;
}
.goodPrice ul li div p{
     flex:1;
     font-size: 13px;
     color:gray;
     line-height: 20px;
}

.recommend,.urgent{
    padding: 10px;
    background:white;
    text-align: left;
    font-size: 14px;
    min-height:120px;
    box-sizing:border-box;
    margin-bottom: 20px; 
}
.recommend p,.urgent p{
    margin-bottom: 10px;
}
.recommend ul,.urgent ul{
    display:flex;
    flex-direction:column;
}

.recommend ul li,.urgent ul li{
    flex:1;
    border-top: 1px solid #f5f5f5;
    height:30px;
}


.recommend ul li{
    display:flex;
    flex-direction:row;
    line-height: 30px;
}

.recommend ul li p{
    flex:2;
    font-size: 12px;
}
.recommend ul li .priceP,.recommend ul li .phoneP,.recommend ul li .goodP,.recommend ul li .wayP{
    flex:3;
}


.urgent ul li{
    display:flex;
    flex-direction:row;
    line-height: 30px;
}

.urgent ul li p{
    flex:2;
    font-size: 12px;
}
.urgent ul li .priceP,.urgent ul li .phoneP,.urgent ul li .goodP,.urgent ul li .wayP{
    flex:3;
}
.mint-swipe {
    
    height: 200px;
    color: #fff;
    font-size: 30px;
    text-align: center;

}

.mint-swipe-item {

    line-height: 200px;
}

img {
    width: 100%;
}
</style>
