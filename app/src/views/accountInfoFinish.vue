<template>
  <div class="whole">
     <mt-header title="产地选择" class="header">
      <router-link to="/" slot="left">
        <mt-button icon="back"></mt-button>
      </router-link>
    <mt-button  slot="right" style="color:red">完成</mt-button> 
   </mt-header>
   <div class="header_photo" style="background:white url(/static/images/right-arrow.png) 96% center no-repeat;background-size:0.6826rem 1.024rem;">
        <p class="header_word">头像<span>(点击更改头像)</span></p>
        <div class="photo"></div>
   
   </div>

   <div class="basic_data">
        <p class="basic_data_title">基础信息</p>
        <ul>
           <li>
              <p class="name">姓名</p>
              <p class="name_content"><input type="text" :placeholder="personal_data.name"></p>
           </li>
           <li style="background:white url(/static/images/down-arrow.png) 96% center no-repeat;background-size:1.024rem 0.67rem;">
              <p class="name">生日</p>
              <p class="name_content"><input type="text" :placeholder="personal_data.birth"></p>
           </li>
           <li style="background:white url(/static/images/down-arrow.png) 96% center no-repeat;background-size:1.024rem 0.67rem;">
              <p class="name">性别</p>
              <p class="name_content"><img :src="personal_data.sex"></p>
           </li>
           <li>
              <p class="other">电话</p>
              <p class="other_content"><input type="text" :placeholder="personal_data.phone"></p>
           </li>
           <li style="background:white url(/static/images/right-arrow.png) 96% center no-repeat;background-size:0.6826rem 1.024rem;">
              <p class="other">个人认证</p>
              <p class="other_content">{{personal_data.personal}}</p>
           </li>
        </ul>
   </div>

    <div class="company_data">
        <p class="company_data_title">企业信息</p>
        <ul>
           <li>
              <p class="name">公司</p>
              <p class="name_content"><input type="text" :placeholder="conpany_data.name"></p>
           </li>
           <li>
              <p class="name">公司简称</p>
              <p class="name_content"><input type="text" :placeholder="conpany_data.short_name"></p>
           </li>
           <li>
              <p class="name">职位</p>
              <p class="name_content"><input type="text" :placeholder="conpany_data.job"></p>
           </li>
           <li>
              <p class="other">主营品类</p>
              <p class="other_content"><input type="text" :placeholder="conpany_data.major"></p>
           </li>
           <li>
              <p class="other">开票信息</p>
              <p class="other_content"><input type="text" :placeholder="conpany_data.open_data"></p>
           </li>
           <li style="background:white url(/static/images/right-arrow.png) 96% center no-repeat;background-size:0.6826rem 1.024rem;">
              <p class="other">企业认证</p>
              <p class="other_content">{{conpany_data.company}}</p>
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
.header{
	color:#313232;
}
.header_right{
	color:#313232;
}
.header_photo{
  height:7.253rem;
  width:100%;
  padding:0 4%;
  margin-top:0.8533rem;
  text-align: left;
  background:white;
  line-height: 7.253rem;

}

.header_word{
  font-size: 1.024rem;
  color:#666666;
  float:left;
}
.header_word span{
  color:#999999;
}
.photo{
  width:5.1198rem;
  height:5.1198rem;
  border-radius: 50%;
  background:#FED77A;
  float:right;
  margin-top:1.0666rem;
  margin-right: 6%;
}
.basic_data,.company_data{
  width:100%;
  text-align: left;
}
.company_data{
  margin-bottom: 2.5599rem;
}
.basic_data_title,.company_data_title{
  height:2.99rem;
  border-top:0.0427rem solid #E5E5E5;
  border-bottom:0.0427rem solid #E5E5E5;
  padding: 0 8.8% 0 4%;
  line-height:2.99rem; 
}
.basic_data ul li,.company_data ul li{
  padding: 0 8.8% 0 4%;
  height:4.267rem;
  line-height: 4.267rem;
  border-bottom:0.0427rem solid #E5E5E5;
  background:white;
}
.name_content input{
  height:4.1rem;
  text-align: right;
  outline: none;
  border:0;
  line-height:4.267rem; 
}
.other_content input{
  height:3.9rem;
  text-align: right;
  outline: none;
  border:0;
  line-height:4.267rem; 
}
.name,.other{
  float: left;
  color:#666666;
}
.name_content,.other_content{
  float:right;
  height:4.267rem;
  color:#999999;
}
.name_content img{
  height:1.536rem;
  margin-top:1.36rem;

}
.name_content{
  font-size: 1.024rem;
}
.other_content{
  font-size: 1.195rem;
}

</style>
