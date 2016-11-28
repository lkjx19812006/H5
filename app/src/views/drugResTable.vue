<template>
   <div class="whole">
    <mt-header title="药性表">
      <router-link to="/" slot="left">
        <mt-button icon="back"></mt-button>
      </router-link> 
   </mt-header>

   <div class="search">
          <input type="text" placeholder="输入你想要的货物资源"  disabled="true">  
          <img src="/static/images/search.png" class="search_image">
    </div>

   <div class="hot_drug">
       <p>热门药材</p>
   </div>

   <div class="drug_show" v-for="todo in todos">
       <img  src="/static/images/1.jpg">
       <div class="drug_introduce">
          <p class="drug_name">{{todo.name}}</p>
          <p class="drug_chinese_name">中文别名：{{todo.chinese_name}}</p>
          <p class="drug_english_name">英文名：{{todo.english_name}}</p>  
       </div>
   </div>

   <div class="hot_search_drug">
       <p>热搜药材</p>
       <div class="hot_drugs">
         <p v-for="todo in hot_drug">{{todo.hot_drug}}</p>
        <!--  <p class="long_hot">千年人参</p>
         <p class="short_hot">人参</p>
         <p class="long_hot">千年人参</p>
         <p class="short_hot">人参</p>
         <p class="long_hot">千年人参</p>
         <p class="short_hot">人参</p>
         <p class="long_hot">千年人参</p>
         <p class="short_hot">人参</p>
         <p class="long_hot">千年人参</p>
         <p class="short_hot">人参</p> -->
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
                todos:{},
                hot_drug:{}
            }
        },

        created() {

            common.$emit('show-load');

            this.$http.get(common.apiUrl.drug_table_list).then((response) => {
                //console.log(response.data);
                  common.$emit('close-load');
                   let data = response.data.biz_result.list; 
                //console.log(data);
                   let hotDrugData =  response.data.biz_result.hot_drug_list;
                   //console.log(hotDrugData); 
                 this.todos = data;
                 this.hot_drug = hotDrugData;


            }, (err) => {
                //console.log(err);
                  common.$emit('close-load');
                  common.$emit('message',response.data.msg);
            });
        }
}

</script>

<style scoped>
.whole{
    position: relative;
    background: #F1EFEF;
}

.mint-header{
  background-color:white;
  color:#313232;
  font-size: 2.73056rem;
}

.search{
  height:8.533rem;
  background: white;
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
    background: #F1EFEF;

} 
.search_image{
  width:3.5rem;
  height:3.5rem;
  position: absolute;
  left:50.344rem;
  top:2.5166rem;
}
.hot_drug{
  width:100%;
  height:7.509rem;
}

.hot_search_drug{
  width:100%;
  height:7.509rem;
}
.hot_drug p,.hot_search_drug p{
  font-size: 2.38924rem;
  height:7.509rem;
  line-height: 7.509rem;
  text-align: left;
  margin-left: 2.5599rem;
}


.drug_show{
  width:100%;
  height:27.3056rem;
  padding: 2.5599rem;
  background:white;
  position:relative;
  
}

.drug_show img{
  width:22.1858rem;
  height:22.1858rem;
  float:left;
}
.drug_introduce{
  width:36.69rem;
  height:22.1858rem;
  float:left;
  text-align: left;
  padding:1.27995rem 0rem 1.27995rem 2.5599rem ;

}
.drug_name{
  font-size:2.21858rem;
  color:#31323;
}
.drug_chinese_name{
  font-size:1.87726rem;
  color:#666666;
  margin-top:1.7066rem;
  word-break:break-all;
  line-height: 2.7rem;
}

.drug_english_name{
  font-size:1.87726rem;
  color:#666666;
  margin-top:1.7066rem;
  word-break:break-all;
  line-height: 2.7rem;
}
.hot_drugs{
  width:100%;
  padding: 2.5599rem 0 2.5599rem 0;

}
.hot_drugs p{
  text-align: center;
  float:left;
  border:1px solid #E7E7E7;
  height:5.9731rem;
  line-height:5.9731rem;
  padding: 0rem 2.5599rem;
  margin-bottom: 2.5599rem; 
}
/*.short_hot{
  width:10rem;
  height:5.9731rem;
  border:1px solid #E7E7E7;
  float:left;
  margin-bottom: 2.5599rem;
  
}
.long_hot{
  width:15.5rem;
  height:5.9731rem;
  border:1px solid #E7E7E7;
  float:left;
  margin-bottom: 2.5599rem;

}*/
</style>