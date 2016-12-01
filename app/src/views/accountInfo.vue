<template>
  <div class="whole">
     <mt-header title="账户信息" class="account_overview_header">
      <router-link to="/" slot="left">
        <mt-button icon="back"></mt-button>
      </router-link>
    <mt-button  slot="right"><router-link to="accountInfoFinish">编辑</router-link></mt-button> 
   </mt-header>
   <div class="account_overview_header_photo_box">
        <p class="account_overview_header_word">头像<span>(点击更改头像)</span></p>
        <div class="account_overview_photo"></div>
   
   </div>

   <div class="account_overview_basic_data">
        <p class="account_overview_basic_data_title">基础信息</p>
        <ul>
           <li>
              <p class="account_overview_name">姓名</p>
              <p class="account_overview_name_content">{{personal_data.name}}</p>
           </li>
           <li>
              <p class="account_overview_name">生日</p>
              <p class="account_overview_name_content">{{personal_data.birth}}</p>
           </li>
           <li>
              <p class="account_overview_name">性别</p>
              <p class="account_overview_name_content"><img :src="personal_data.sex"></p>
           </li>
           <li>
              <p class="account_overview_other">电话</p>
              <p class="account_overview_other_content">{{personal_data.phone}}</p>
           </li>
           <li class="account_overview_personal_authentication" >
              <p class="account_overview_other">个人认证</p>
              <p class="account_overview_other_content">{{personal_data.personal}}</p>
           </li>
        </ul>
   </div>

    <div class="account_overview_company_data">
        <p class="account_overview_company_data_title">企业信息</p>
        <ul>
           <li>
              <p class="account_overview_name">公司</p>
              <p class="account_overview_name_content">{{conpany_data.name}}</p>
           </li>
           <li>
              <p class="account_overview_name">公司简称</p>
              <p class="account_overview_name_content">{{conpany_data.short_name}}</p>
           </li>
           <li>
              <p class="account_overview_name">职位</p>
              <p class="account_overview_name_content">{{conpany_data.job}}</p>
           </li>
           <li>
              <p class="account_overview_other">主营品类</p>
              <p class="account_overview_other_content">{{conpany_data.major}}</p>
           </li>
           <li>
              <p class="account_overview_other">开票信息</p>
              <p class="account_overview_other_content">{{conpany_data.open_data}}</p>
           </li>
           <li class="account_overview_company_authentication">
              <p class="account_overview_other">企业认证</p>
              <p class="account_overview_other_content">{{conpany_data.company}}</p>
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
      }
      

    }
  }

 
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.whole{
	
}
.account_overview_header{
	color:#313232;
}
.header_right{
	color:#313232;
}
.account_overview_header_photo_box{
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
.account_overview_header_word{
  font-size: 1.024rem;
  color:#666666;
  float:left;
}
.account_overview_header_word span{
  color:#999999;
}
.account_overview_photo{
  width:5.1198rem;
  height:5.1198rem;
  border-radius: 50%;
  background:#FED77A;
  float:right;
  margin-top:1.0666rem;
  margin-right: 6%;
}
.account_overview_basic_data,.account_overview_company_data{
  width:100%;
  text-align: left;
}
.account_overview_company_data{
  margin-bottom: 2.5599rem;
}
.account_overview_basic_data_title,.account_overview_company_data_title{
  height:2.99rem;
  border-top:0.0427rem solid #E5E5E5;
  border-bottom:0.0427rem solid #E5E5E5;
  padding: 0 8.8% 0 4%;
  line-height:2.99rem; 
}
.account_overview_basic_data ul li,.account_overview_company_data ul li{
  padding: 0 8.8% 0 4%;
  height:4.267rem;
  line-height: 4.267rem;
  border-bottom:0.0427rem solid #E5E5E5;
  background:white;
}
.account_overview_name,.account_overview_other{
  float: left;
  color:#666666;
}
.account_overview_name_content,.account_overview_other_content{
  float:right;
  height:4.267rem;
  color:#999999;
}
.account_overview_name_content img{
  height:1.536rem;
  margin-top:1.36rem;

}
.account_overview_name_content{
  font-size: 1.024rem;
}
.account_overview_other_content{
  font-size: 1.195rem;
}
.account_overview_personal_authentication{
  background:white url(/static/images/right-arrow.png) 96% center no-repeat;background-size:0.6826rem 1.024rem;
}
.account_overview_company_authentication{
  background:white url(/static/images/right-arrow.png) 96% center no-repeat;background-size:0.6826rem 1.024rem;
}
</style>
