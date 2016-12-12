<template>
  <div class="account_overview_finish">
     <mt-header title="账户信息" class="header">
      <router-link to="/" slot="left">
        <mt-button icon="back"></mt-button>
      </router-link>
    <mt-button  slot="right" ><router-link to="accountInfo" id="account_overview_finish_right">完成</router-link></mt-button> 
   </mt-header>
   <div class="header_photo_box">
        <p class="header_word">头像<span>(点击更改头像)</span></p>
        <img src="/static/images/touxiang.png" class="header_photo">
   
   </div>

   <div class="basic_data">
        <p class="basic_data_title">基础信息</p>
        <ul>
           <li v-for="(item,index) in personalDataArr" v-if="index==0">
              <p class="name name_smart_size" >{{item.name}}</p>
              <p class="name_content" >
                 <input type="text" :placeholder="item.content">
              </p>
           </li>

           <li v-for="(item,index) in personalDataArr" v-if="index>=1 && index<=2">
              <p class="name name_smart_size">{{item.name}}</p>
              <p class="name_content" v-if="index==1">
                 <input type="text" :placeholder="item.content">
              
              </p>
              <p class="name_content" v-if="index==2">
                 <img :src="item.img_src" v-if="index==2">
              </p>
              <img src="/static/images/down-arrow.png" class="down-arrow">
           </li>
          
            <li v-for="(item,index) in personalDataArr" v-if="index==3">
                <p class="name name_big_size" >{{item.name}}</p>

                <p class="name_content" >
                   <input type="text" :placeholder="item.content">
                </p>
             </li>

             <li v-for="(item,index) in personalDataArr" v-if="index==4">
              <p class="name name_big_size" >{{item.name}}</p>
              <p class="name_content" >
                 <input type="text" :placeholder="item.content">
              </p>
              <img src="/static/images/right-arrow.png" class="right-arrow">
           </li>
        
        </ul>
   </div>
                
    <div class="company_data">
        <p class="company_data_title">企业信息</p>
        <ul>
           <li v-for="(item,index) in companyDataArr" v-if="index < 2">
              <p class="name  name_smart_size" >{{item.name}}</p>
              <p class="name_content"><input type="text" :placeholder="item.content"></p>
           </li>

           <li v-for="(item,index) in companyDataArr" v-if="index == 2" >
              <p class="name  name_smart_size">{{item.name}}</p>
              <p class="name_content"><input type="text" :placeholder="item.content">
                      
              </p>
              <!--  -->
              <img src="/static/images/down-arrow.png" class="down-arrow">
           </li>

           <li v-for="(item,index) in companyDataArr" v-if="index > 2 && index < 5">
              <p class="name  name_big_size">{{item.name}}</p>
              <p class="name_content"><input type="text" :placeholder="item.content"></p>
           </li>
           
           <li v-for="(item,index) in companyDataArr" v-if="index == 5">
              <p class="name  name_big_size">{{item.name}}</p>
              <p class="name_content"><input type="text" :placeholder="item.content"></p>
              <img src="/static/images/right-arrow.png" class="right-arrow">
           </li>
           
        </ul>
   </div>

  </div>
</template>

<script>
import common from '../common/common.js'
export default {

  data () {
    return {
      msg: 'Welcome to Your Vue.js App',
      personal_data:{
         name:'杨帆帆',
         birth:'1993.10.23',
         sex:'/static/images/woman.png',
         phone:'15971484216',
         personal:'已认证'
      },

      conpany_data:{
        name:'上海冕冠电子商务有限公司',
        short_name:'上海冕冠',
        job:'采购人员',
        major:'枸杞、龙胆、白术',
        open_data:'枸杞、龙胆、白术',
        company:'已认证'
      },
      personalDataArr:[{
           name:'姓名',
           content:'杨帆帆'
      },{
           name:'生日',
           content:'1993.10.23'
      },{
           name:'性别',
           img_src:'/static/images/woman.png'
      },{
           name:'电话',
           content:'15971484216'
      },{
           name:'个人认证',
           content:'已认证'
      }],

      companyDataArr:[{
           name:'公司',
           content:'上海冕冠电子商务有限公司'
      },{
           name:'公司简称',
           content:'上海冕冠'
      },{
           name:'职位',
           content:'采购人员'
      },{
           name:'主营品类',
           content:'枸杞、龙胆、白术'
      },{
           name:'开票信息',
           content:'枸杞、龙胆、白术'
      },{
           name:'企业认证',
           content:'已认证'
      }]
      
      
      

    }
  },
  methods:{
     openPicker() {
        this.$refs.picker.open();

      }
  }

 
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

input[type="text"], input[type="submit"], input[type="reset"],select,textarea{

-webkit-appearance: none;
border-radius: 0;
}
.account_overview_finish .header{
	color:#313232;
}
#account_overview_finish_right{
  color:#EC6817;
}

.account_overview_finish .header_photo_box{
  height:7.253rem;
  width:100%;
  padding:0 4%;
  margin-top:0.8533rem;
  text-align: left;
  background:white;
  line-height: 7.253rem;
  background:white url(/static/images/right-arrow.png) 96% center no-repeat;background-size:0.6826rem 1.024rem;
}

.account_overview_finish .header_word{
  font-size: 1.024rem;
  color:#666666;
  float:left;
}
.account_overview_finish .header_word span{
  color:#999999;
}
.account_overview_finish .header_photo{
  width:5.1198rem;
  height:5.1198rem;
  border-radius: 50%;
  background:#FED77A;
  float:right;
  margin-top:1.0666rem;
  margin-right: 6%;

}
.account_overview_finish .basic_data,
.company_data{
  width:100%;
  text-align: left;
}
.account_overview_finish .company_data{
  margin-bottom: 2.5599rem;
}
.account_overview_finish .basic_data_title,
.company_data_title{
  height:2.99rem;
  border-top:0.0427rem solid #E5E5E5;
  border-bottom:0.0427rem solid #E5E5E5;
  padding: 0 8.8% 0 4%;
  line-height:2.99rem; 
}
.account_overview_finish .basic_data ul li,
.company_data ul li{
  padding: 0 8.8% 0 4%;
  height:4.267rem;
  line-height: 4.267rem;
  border-bottom:0.0427rem solid #E5E5E5;
  background:white;
  position:relative;
}


.account_overview_finish .name_content input{
  height:2.5rem;
  text-align: right;
  outline: none;
  border:0;
  line-height:2.5rem; 
}


.account_overview_finish .name{
  float: left;
  color:#666666;
}
.account_overview_finish .name_content{
  float:right;
  height:4.267rem;
  color:#999999;

}
.account_overview_finish .name_content img{
  height:1.536rem;
  margin-top:1.36rem;

}
.account_overview_finish .name_content{
  font-size: 1.024rem;
}
/*.account_overview_finish .name_content>div{
  height: 2rem;
  width:100px;
}*/
.account_overview_finish .name_big_size{
  font-size: 1.195rem;
}
.account_overview_finish .name_smart_size{
  font-size: 1.024rem;
}

.account_overview_finish .right-arrow{
  position:absolute;
  right:4%;
  top:1.6215rem;
  width:0.6826rem;
  height:1.024rem;
}
.account_overview_finish .down-arrow{
  position:absolute;
  right:4%;
  top:1.79rem;
  height:0.6826rem;
  width:1.024rem;
}
</style>
