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
  font-size: 2.73056rem;
}

.search{
  height:8.533rem;
  background: #f5f5f5;
  position: relative;
}
.search input{
    width:53.7579rem;
    height:5.12rem;
    padding-left:2.56rem;
    border-radius: 5.12rem;
    position: absolute;
    left:5.1198rem;
    top:1.7066rem;
    outline:none;
    border: 0;
    font-size: 2.048rem;

} 
.search_image{
  width:3.5rem;
  height:3.5rem;
  position: absolute;
  left:53.344rem;
  top:2.5166rem;
}

.good_list{
  width:100%;
  position: relative;
}

.good_list_header{
  width:100%;
  margin:3.4132rem auto;
  font-size: 2.21858rem;
  color:#FA6705;
}
.good_list_content{
  margin-top: 3.4132rem;
  width:100%;
  
}

.list_content_header{
  display:flex;
  flex-direction:row;
  margin-bottom:0.42665rem;
}
.list_content_header p{
       flex:1;
       font-size: 2.21858rem;
}

.list_content_header .good_upordown input{
    outline:none;
    border: 0;
    width:10.66625rem;
    height: 4.2665rem;
    background: #FA6705;
    color:white;
}
.second_level{
    width:100%;
    display:flex;
    flex-direction:row;
    height:8.533rem;
    border-top: 1px solid #CCCCCC;
}
.second_level p{
  flex:1;
  font-size: 2.04792rem;
  color:#666666;
  line-height: 8.533rem;
}
.second_level_content{
  border-top: 1px solid #DFDFDF;
  background: #CCCCCC;
}
.second_level_content li{
  font-size: 2.04792rem;
  color:#666666;
  line-height: 8.533rem;
  display:flex;
  flex-direction:row;
}
.second_level_content li p{
  flex:1;
  font-size: 2.04792rem;
  color:#666666;
  line-height: 8.533rem;
}
.second_level_content li p img{
  height:2.04792rem;
}

</style>