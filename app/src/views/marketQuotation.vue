<template>
  <div class="whole">
    <mt-header title="市场行情">
      <router-link to="/" slot="left">
        <mt-button icon="back"></mt-button>
      </router-link> 
   </mt-header>

   <div class="search">
          <input type="text" placeholder="输入你想要的货物资源"  disabled="true">  
          <img src="/static/images/search.png" class="search_image">
    </div>
   <div class="good_list">
        <p class="good_list_header">*数据仅供参考！</p>
        <div class="good_list_content">
             <div class="list_content_header" >
                 <p class="good_name">品名</p>
                 <p class="good_spec">规格</p>
                 <p class="good_place">产地</p>
                 <p class="good_price">价格</p>
                 <p class="good_upordown"><input type="button" value="跌涨(元)"></p>
             </div>

             <ul id="first_level_content"  >
                 <li v-for="(todo,index) in todos">
                      <div class="second_level" v-on:click="firstLevel(index,todo)">
                           <p>{{todo.name}}</p>
                           <p>{{todo.spec}}</p>
                           <p>{{todo.place}}</p>
                           <p>{{todo.price}}</p>
                           <p>{{todo.up_price}}</p>
                      </div>
                        
                        <ul class="second_level_content" v-show="todo.show">
                          <li v-for="item in todos_li">
                               <p>{{item.name}}</p>
                               <p>{{item.spec}}</p>
                               <p>{{item.place}}</p>
                               <p>{{item.price}}</p>
                               <p>{{item.upordown_price}}&nbsp;<img src="/static/images/up.png"></p> 
                          </li>
                          
                       </ul>
                 </li>
             </ul>
        </div>
   </div>

  </div>
   
</template>


<script> 

import common from '../common/common.js'
export default{
	
	data() {
            return {
                msg: 'Welcome to Your Vue.js App',
                onOrOff:false,
                todos:{},
                todos_li:{},
                show:false
            }
        },


        methods:{
            firstLevel:function(sub,item){
                 //console.log(this.todos[sub].show)
                 this.todos[sub].show = !this.todos[sub].show; 
                 //console.log(item.list_li);
                 this.todos_li = item.list_li;
                
            }
        },


        created() {

            common.$emit('show-load');

            this.$http.get(common.apiUrl.market_list).then((response) => {
                //console.log(response.data);
                  common.$emit('close-load');
                    
                 let data = response.data.biz_result.list;
                 let data_li = response.data.biz_result.list_li;
                 console.log(data_li);
                  
                  for(var item in data){
                      //console.log(data[item]);
                      data[item].show = false;
                      
                  }
                  this.todos = data;
                  this.todos_li = data_li;


            }, (err) => {
                //console.log(err);
                  common.$emit('close-load');
                  common.$emit('message',response.data.msg);
            });
        }
}

</script>

<style scoped>

.active{
  display: none;
}
.text-danger{
  display: block;
}
.whole{
    position: relative;
}

.mint-header{
  background-color:white;
  color:#313232;
}


.search{
  height:4.27rem;
  background: white;
  position: relative;
  padding-top:0.855rem;
  background: #F2F2F2;
}
.search input{
    width:80%;
    height:2.56rem;
    border-radius: 1.28rem;
    border:0;
    outline: none;
    padding-left:5%;
    background: #F1EFEF;
    background: white;
} 
.search_image{
  width:2rem;
  height:2rem;
  position: absolute;
  right:13%;
  top:1.135rem;
}
.good_list{
  width:100%;
  position: relative;
}

.good_list_header{
  width:100%;
  margin:1.7066rem auto;
  font-size: 1.10929rem;
  color:#FA6705;
}
.good_list_content{
  margin-top: 1.7066rem;
  width:100%;
  
}

.list_content_header{
  display:flex;
  flex-direction:row;
  margin-bottom:0.213rem;
}
.list_content_header p{
       flex:1;
       font-size: 1.11rem;
}

.list_content_header .good_upordown input{
    outline:none;
    border: 0;
    width:5.333rem;
    height: 2.133rem;
    background: #FA6705;
    color:white;
}
.second_level{
    width:100%;
    display:flex;
    flex-direction:row;
    height:4.267rem;
    border-top: 1px solid #CCCCCC;
}
.second_level p{
  flex:1;
  font-size: 1.02396rem;
  color:#666666;
  line-height: 4.267rem;
}
.second_level_content{
  border-top: 1px solid #DFDFDF;
  background: #CCCCCC;
}
.second_level_content li{
  font-size: 1.024rem;
  color:#666666;
  line-height: 4.267rem;
  display:flex;
  flex-direction:row;
}
.second_level_content li p{
  flex:1;
  font-size: 1.024rem;
  color:#666666;
  line-height: 4.267rem;
}
.second_level_content li p img{
  height:1.024rem;
}

</style>