<template>
   <div class="whole">
    <mt-header title="产地选择" class="header">
      <router-link to="/" slot="left">
        <mt-button icon="back"></mt-button>
      </router-link>
    <mt-button  slot="right">确定</mt-button> 
   </mt-header>
  <div class="select_box">
       <mt-navbar v-model="selected" >
        <mt-tab-item id="1">国内</mt-tab-item>
        <mt-tab-item id="2">国外</mt-tab-item>
  </mt-navbar>
  </div> 
  <div id="history_box">
        <div class="history"  id="history">
            <div>
                <p >日本</p>
                <img src="../../static/images/false.png">
            </div>
      </div> 
  </div>
  

<!-- tab-container -->
  <mt-tab-container v-model="selected">
        <mt-tab-container-item id="1">
          <mt-index-list>
             <div class="list" v-for="todo in home_list" >
               
                <mt-index-section :index="todo.index" class="index_name">
                <div v-on:click = "selectPlace(item)" v-for="item in todo.place_list">
                       <mt-cell :title="item.place" ></mt-cell>
                </div>
                
              </mt-index-section>
             </div>
        </mt-index-list>
    </mt-tab-container-item>

    <mt-tab-container-item id="2">
      <mt-index-list>
           
              <mt-index-section index="A" class="index_name">
                <mt-cell title="阿塞拜疆"></mt-cell>
                <mt-cell title="阿塞拜疆"></mt-cell>
                <mt-cell title="阿塞拜疆"></mt-cell>
              </mt-index-section>
           
              
              <mt-index-section index="B" class="index_name">
                <mt-cell title="阿塞拜疆"></mt-cell>
                <mt-cell title="阿塞拜疆"></mt-cell>
              </mt-index-section>
               <mt-index-section index="C" class="index_name">
                <mt-cell title="阿塞拜疆"></mt-cell>
                <mt-cell title="阿塞拜疆"></mt-cell>
              </mt-index-section>
               <mt-index-section index="D" class="index_name">
                <mt-cell title="阿塞拜疆"></mt-cell>
                <mt-cell title="阿塞拜疆"></mt-cell>
              </mt-index-section>
               <mt-index-section index="E" class="index_name">
                <mt-cell title="阿塞拜疆"></mt-cell>
                <mt-cell title="阿塞拜疆"></mt-cell>
              </mt-index-section>
              <mt-index-section index="F" class="index_name">
                <mt-cell title="阿塞拜疆"></mt-cell>
                <mt-cell title="阿塞拜疆"></mt-cell>
              </mt-index-section>
              <mt-index-section index="G" class="index_name">
                <mt-cell title="阿塞拜疆"></mt-cell>
                <mt-cell title="阿塞拜疆"></mt-cell>
              </mt-index-section>
              <mt-index-section index="H" class="index_name">
                <mt-cell title="阿塞拜疆"></mt-cell>
                <mt-cell title="阿塞拜疆"></mt-cell>
              </mt-index-section>
              <mt-index-section index="Z" class="index_name">
                <mt-cell title="阿塞拜疆"></mt-cell>
                <mt-cell title="阿塞拜疆"></mt-cell>
              </mt-index-section>
    </mt-tab-container-item>
  </mt-tab-container>
  
  </div>
   
</template>


<script> 

import common from '../common/common.js'
export default{
  //
  data() {
            return {
                msg: 'Welcome to Your Vue.js App',
                selected:'1',
                
                home_list: [{
                    index: 'A',
                    place_list:[
                         {place:'巴西'},
                         {place:'巴西'},
                         {place:'巴西'}
                    ]
                }, {
                    index: 'B',
                    place_list:[
                         {place:'日本'},
                         {place:'日本'},
                         {place:'日本'}
                    ]
                }, {
                    index: 'C',
                    place_list:[
                         {place:'日本'},
                         {place:'日本'},
                         {place:'日本'}
                    ]
                }, {
                    index: 'D',
                    place_list:[
                         {place:'日本'},
                         {place:'日本'},
                         {place:'日本'}
                    ]
                }]
              }  

        },

        methods:{
             selectPlace:function(item){
                  console.log(typeof item);
                  
                  //datas.push(item);
                  
                  this.history_place = item;

                  document.getElementById('history').style.display = "block";
             },
             deleteTap:function(){
                  let history = document.getElementById('history');
                  let delete_tap = history.getElementsByTagName('div')[0];
                  delete_tap.style.display = "none";
             }
        },

        created() {

            common.$emit('show-load');

            this.$http.get(common.apiUrl.drug_information_list).then((response) => {
                //console.log(response.data);
                  common.$emit('close-load');
                  let data = response.data.biz_result.list;
                  //console.log(data);
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
    background: #F1EFEF;
   
}
.index_name{
  text-align: left;
}

.header{
  background-color:#FA6705;
  color:#313232;
  border-bottom: 1px solid #C9C9C9;
  color:white;
  font-size: 1.408rem;
}
/*.mint-header-title{
  font-size: 1.408rem;
}
.mint-button-text{
  font-size: 1.28rem;
}*/
.select_box{
  width:100%;
  height:5.1198rem;
  background-color: white;
  padding-top:0.8533rem; 

}
.mint-navbar{
  width:70%;
  height:3.4132rem;
  margin-left:15%;
  border:0.0426rem solid #FA6705;
}
.mint-navbar .mint-tab-item.is-selected{
  border:none;
  background-color: #FA6705;
  color:white;
  margin: 0;

}

.select_box{
    font-size: 2.5rem;
}
#history_box{
  min-height:4.69rem;
  width: 100%;
  background:white;
}
.history{
  min-height:4.69rem;
  border-top: 0.0426rem solid #DFDFDF;
  width:100%;
  padding:1.237rem 1.28rem;
  background: white;
}
.history div{
  padding: 0.44rem;
  /*padding-right: 1.627rem;*/
  border:0.0426rem solid #FA6705;
  float:left;
  margin-right:0.8533rem;
  font-size:1.024rem;
  height:2.22rem; 
}
.history div p{
  float:left;
}
.history div img{
  width:1.024rem;
  height:1.024rem;
  float:right;
  margin-left:0.8533rem; 
}
/*.mint-indexlist-nav{
  justify-content: flex-start;
}*/
/*.mint-indexlist-navitem{
  width:2.5599rem;
  height:2.5599rem;
  border:0.0426rem solid #FA6705;
}*/
</style>