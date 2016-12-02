<template>
  <div class="account_overview">
   <mt-header title="账户信息" class="header">
   <router-link to="/" slot="left">
   <mt-button icon="back"></mt-button>
 </router-link>
 <mt-button  slot="right"><router-link to="accountInfoFinish">编辑</router-link></mt-button> 
</mt-header>
<div class="header_photo_box">
  <p class="header_word">头像<span>(点击更改头像)</span></p>
  <div class="photo"></div>
  
</div>

<div class="basic_data">
  <p class="basic_data_title">基础信息</p>
  <ul>
   <li v-for="(item,index) in personalDataArr" v-if="index !== 4"> 
    <p class="name  name_big_size" v-if="index > 2">{{item.name}}</p>
    <p class="name  name_smart_size" v-if="index <= 2">{{item.name}}</p>
    <p class="name_content" v-if="index !== 2">{{item.content}}</p>
    <p class="name_content" v-if="index == 2"><img :src="item.img_src"></p>
  </li>
  <li v-for="(item,index) in personalDataArr" v-if="index == 4" id="personal_authentication"> 
    <p class="name  name_big_size">{{item.name}}</p>
    <p class="name_content">{{item.content}}</p>
  </li>
  
</ul>
</div>

<div class="company_data">
  <p class="company_data_title">企业信息</p>
  <ul>
   <li v-for="(item,index) in companyDataArr" v-if="index !== 5">
    <p class="name  name_smart_size" v-if="index <= 2">{{item.name}}</p>
    <p class="name  name_big_size" v-if="index > 2">{{item.name}}</p>
    <p class="name_content">{{item.content}}</p>
  </li>

  <li v-for="(item,index) in companyDataArr" v-if="index == 5" id="company_authentication">
    <p class="name  name_big_size">{{item.name}}</p>
    <p class="name_content">{{item.content}}</p>
  </li>
  
</ul>
</div>

</div>
</template>

<script>

export default {
  data () {
    return {
      msg: 'Welcome to Your Vue.js App',
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
 }

 
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

.account_overview .header{
	color:#313232;
}

.account_overview .header_photo_box{
  height:7.253rem;
  width:100%;
  padding:0 4%;
  margin-top:0.8533rem;
  text-align: left;
  background:white;
  line-height: 7.253rem;
  background:white url(/static/images/right-arrow.png) 96% center no-repeat;
  background-size:0.6826rem 1.024rem;
}
.account_overview .header_word{
  font-size: 1.024rem;
  color:#666666;
  float:left;
}
.account_overview .header_word span{
  color:#999999;
}
.account_overview .photo{
  width:5.1198rem;
  height:5.1198rem;
  border-radius: 50%;
  background:#FED77A;
  float:right;
  margin-top:1.0666rem;
  margin-right: 6%;
}
.account_overview  .basic_data,.account_overview  .company_data{
  width:100%;
  text-align: left;
}
.account_overview  .company_data{
  margin-bottom: 2.5599rem;
}
.account_overview  .basic_data_title,.account_overview  .company_data_title{
  height:2.99rem;
  border-top:0.0427rem solid #E5E5E5;
  border-bottom:0.0427rem solid #E5E5E5;
  padding: 0 8.8% 0 4%;
  line-height:2.99rem; 
}
.account_overview  .basic_data ul li,.account_overview  .company_data ul li{
  padding: 0 8.8% 0 4%;
  height:4.267rem;
  line-height: 4.267rem;
  border-bottom:0.0427rem solid #E5E5E5;
  background:white;
}
.account_overview  .name{
  float: left;
  color:#666666;
}
.account_overview  .name_content{
  float:right;
  height:4.267rem;
  color:#999999;
}
.account_overview  .name_big_size{
  font-size: 1.195rem;
}
.account_overview  .name_smart_size{
  font-size: 1.024rem;
}
.account_overview  .name_content img{
  height:1.536rem;
  margin-top:1.36rem;

}
.account_overview  .name_content{
  font-size: 1.024rem;
}

#account_overview  .personal_authentication{
  background:white url(/static/images/right-arrow.png) 96% center no-repeat;background-size:0.6826rem 1.024rem;
}
#account_overview  .company_authentication{
  background:white url(/static/images/right-arrow.png) 96% center no-repeat;background-size:0.6826rem 1.024rem;
}
</style>
