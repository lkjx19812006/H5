<template>
   <div class="whole">
    <mt-header title="药性表">
      <router-link to="/" slot="left">
        <mt-button icon="back"></mt-button>
      </router-link> 
   </mt-header>
   
   <mt-navbar v-model="selected">
      <mt-tab-item id="1">基本信息</mt-tab-item>
      <mt-tab-item id="2">产地分布</mt-tab-item>
      <mt-tab-item id="3">生长特性</mt-tab-item>
      <mt-tab-item id="4">储藏养护</mt-tab-item>
      <mt-tab-item id="5">药典标准</mt-tab-item>
      <mt-tab-item id="6">真伪鉴别</mt-tab-item>
   </mt-navbar>  

   <mt-tab-container v-model="selected">

      <mt-tab-container-item id="1">
      <div class="information" v-for="todo in todos" >
         <div class="drug_name">
             <div class="name_type">
                  <p class="what_name">别名：</p>
                  <p class="answer_name">{{todo.name_type.chinese_name}}</p>
             </div>
             <div class="name_type">
                  <p class="what_name">英文：</p>
                  <p class="answer_name">{{todo.name_type.english_name}}</p>
             </div>
             <div class="name_type" id="last_name_type">
                  <p class="what_name">拉丁：</p>
                  <p class="answer_name">{{todo.name_type.latin_name}}</p>
             </div>
         </div>

         <div class="drug_effect">
             <div class="drug_effect_type">
                  <p class="what_effect">概述：</p>
                  <p class="effect_content">{{todo.drug_effect.summary_content}}</p>
             </div>
             <div class="drug_effect_type" id="last_effect_type">
                   <p class="what_effect">功效：</p>
                  <p  class="effect_content">{{todo.drug_effect.effect_content}}</p>
             </div>
         </div>

         <div class="spec">
            <div class="spec_type">
                 <p class="what_spec">特征规格：</p>
                <p  class="spec_content">{{todo.spec.spec_content}}</p>
            </div>
               
         </div>
        </div> 
      </mt-tab-container-item>
      
      <mt-tab-container-item id="2">
        
      </mt-tab-container-item>

      <mt-tab-container-item id="3">
        <mt-cell v-for="n in 6" :title="'选项 ' + n" />
      </mt-tab-container-item>

      <mt-tab-container-item id="4">
        <mt-cell v-for="n in 10" :title="'内容 ' + n" />
      </mt-tab-container-item>
      <mt-tab-container-item id="5">
        <mt-cell v-for="n in 4" :title="'测试 ' + n" />
      </mt-tab-container-item>
      <mt-tab-container-item id="6">
        <mt-cell v-for="n in 6" :title="'选项 ' + n" />
      </mt-tab-container-item>
   </mt-tab-container> 

  </div>

</template>


<script> 

import common from '../common/common.js'
export default{
	
	data() {
            return {
                msg: 'Welcome to Your Vue.js App',
                selected:'1',
                todos:{}
            }
        },

        methods:{

        },

        created() {

            common.$emit('show-load');

            this.$http.get(common.apiUrl.drug_information_list).then((response) => {
                //console.log(response.data);
                  common.$emit('close-load');
                  let data = response.data.biz_result.list;
                  console.log(data);
                  this.todos = data;
                 

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
    background: white;
    width:100%;
    height:100%;

}

.mint-header{
  background-color:white;
  color:#313232;
  font-size: 1.36528rem;
}
.mint-navbar{
  background: #F7F5F5;
}
.mint-tab-item-label{
  font-size: 1.02396rem;
  color:#333333;
}

.mint-navbar .mint-tab-item.is-selected{
  color:#FA6705;
}
.drug_name{
  width:92%;
  text-align: left;
  font-size: 1.19462rem;
  border-bottom: 1px solid #C9C9C9;
  padding:1.9199rem 0rem;
  margin-left: 1.27995rem;
}

.drug_name .name_type{
  word-break:break-all;
  display:flex;
  flex-direction:row;
  margin-bottom:1.27995rem; 
}
.what_name{
  font-size: 1.19462rem;
  color:#333333;
  flex:2;
  line-height: 1.5rem;
}
.answer_name{
  flex:12;
  font-size: 1.02396rem;
  color:#666666;
  line-height: 1.5rem;

}
#last_name_type{
  margin-bottom:0;

}
.drug_effect{
  width:92%;
  text-align: left;
  font-size: 1.19462rem;
  border-bottom: 1px solid #C9C9C9;
  padding:1.9199rem 0rem;
  margin-left: 1.27995rem;
}

.drug_effect .drug_effect_type{
  word-break:break-all;
  display:flex;
  flex-direction:row;
  margin-bottom:1.27995rem; 
}
.what_effect{
  font-size: 1.19462rem;
  color:#333333;
  flex:2;
  line-height: 1.5rem;
}
.effect_content{
  flex:12;
  font-size: 1.02396rem;
  color:#666666;
  line-height: 1.5rem;
}
#last_effect_type{
  margin-bottom:0;
}
.spec{
  width:92%;
  text-align: left;
  font-size: 1.19462rem;
 
  padding:1.9199rem 0rem;
  margin-left: 1.27995rem;
}
.spec_type{
  word-break:break-all;
  display:flex;
  flex-direction:row;
  margin-bottom:1.27995rem; 
}
.what_spec{
  font-size: 1.19462rem;
  color:#333333;
  flex:2;
  line-height: 1.5rem;
}
.spec_content{
  flex:7;
  font-size: 1.02396rem;
  color:#666666;
  line-height: 1.5rem;
}
</style>