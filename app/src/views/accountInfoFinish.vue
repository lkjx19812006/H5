<template>
  <div class="account_overview_finish">
     <mt-header title="账户信息" class="header">
      <router-link to="/" slot="left">
        <mt-button icon="back"></mt-button>
      </router-link>
    <mt-button  slot="right" ><div id="right" v-on:click="upData">完成</div></mt-button> 
   </mt-header>
   <div class="page-loadmore-wrapper" ref="wrapper" :style="{ height: wrapperHeight + 'px' }">
   <div class="header_photo_box">
        <p class="header_word">头像<span>(点击更改头像)</span></p>
        <div class="header_photo">
            <imageUpload :param="param" v-on:postUrl="getUrl" ></imageUpload>
           
        </div>
   </div>

   <div class="basic_data">
        <p class="basic_data_title">基础信息</p>
        <ul>
           <li >  <!-- v-for="(item,index) in personalDataArr" v-if="index==0" -->
              <p class="name name_smart_size" >姓名</p>
              <p class="name_content" >
                 <input type="text" :placeholder="arr.name" v-model="arr.name" maxlength="5">
              </p>
           </li>

           <li > <!-- v-for="(item,index) in personalDataArr" v-if="index>=1 && index<=2" -->
              <p class="name name_smart_size" >生日</p>
              <p class="name_content"> <!-- @click.native="open('picker')" size="large" -->
                {{arr.birthday}}
                 <!-- <input type="text" :placeholder="arr.birthday" v-model="arr.birthday" disabled = fasle > -->
                  
              </p>
              <mt-button @click.native="open('picker')" size="large" class="button" ></mt-button>
              <!-- <img src="/static/images/down-arrow.png" class="down-arrow"> -->
           </li>
           <li > 
              <p class="name name_smart_size">性别</p>
              <div >
                   <p class="name_content" > <!-- v-if="arr.gender == 1" -->
                      <select class="sex-select" v-model="arr.gender">
                           <option>男</option>
                           <option>女</option>
                      </select>
                     <!-- <img src="/static/images/woman.png" v-show="!arr.sex">  
                     <img src="/static/images/man.png" v-show="arr.sex">   -->
                  </p>

             
              <!-- <img src="/static/images/down-arrow.png" class="down-arrow"> -->
              </div>
              
           </li>
            <li ><!-- v-for="(item,index) in personalDataArr" v-if="index==3" -->
                <p class="name name_big_size" >电话</p>

                <p class="name_content" >
                   <input type="text" :placeholder="arr.phone" v-model="arr.phone">
                </p>
             </li>

             <li ><!--  v-for="(item,index) in personalDataArr" v-if="index==4" -->
              <p class="name name_big_size" >个人认证</p>
              <p class="name_content" >
                 <input type="text" :placeholder="arr.ucomment" v-model="arr.ucomment" disabled="true">
              </p>
              <img src="/static/images/right-arrow.png" class="right-arrow">
           </li>
        
        </ul>
   </div>
                
    <div class="company_data">
        <p class="company_data_title">企业信息</p>
        <ul>
           <li ><!-- v-for="(item,index) in companyDataArr" v-if="index < 2" -->
              <p class="name  name_smart_size" >公司</p>
              <p class="name_content"><input type="text" :placeholder="arr.company" v-model="arr.company"></p>
           </li>
           <li >
              <p class="name  name_smart_size" >公司简称</p>
              <p class="name_content"><input type="text" :placeholder="arr.companyShort" v-model='arr.companyShort'></p>
           </li>
           <li > <!-- v-for="(item,index) in companyDataArr" v-if="index == 2"  -->
              <p class="name  name_smart_size">职位</p>
              <p class="name_content"><!-- <input type="text" :placeholder="arr.companyJob" v-model="arr.companyJob"> -->
                  <select class="sex-select" v-model="arr.companyJob">
                           <option>业务员</option>
                           <option>客服</option>
                  </select>    
              </p>
              
              <!-- <img src="/static/images/down-arrow.png" class="down-arrow"> -->
           </li>

           <li > <!-- v-for="(item,index) in companyDataArr" v-if="index > 2 && index < 5" -->
              <p class="name  name_big_size">主营品类</p>
              <p class="name_content"><input type="text" :placeholder="arr.bizMain" v-model="arr.bizMain"></p>
           </li>
           <li > <!-- v-for="(item,index) in companyDataArr" v-if="index > 2 && index < 5" -->
              <p class="name  name_big_size">开票信息</p>
              <p class="name_content"><input type="text" :placeholder="arr.invoice" v-model="arr.invoice"></p>
           </li>
           <li > <!-- v-for="(item,index) in companyDataArr" v-if="index == 5" -->
              <p class="name  name_big_size">企业认证</p>
              <p class="name_content"><input type="text" :placeholder="arr.ccomment" v-model="arr.ccomment"></p>
              <img src="/static/images/right-arrow.png" class="right-arrow">
           </li>
           
        </ul>
   </div>
  </div>
               
                    <!-- <mt-datetime-picker
                      v-model="pickerVisible"
                      
                      ref="picker"
                      type="date"
                      year-format="{value} 年"
                      month-format="{value} 月"
                      date-format="{value} 日">
                    </mt-datetime-picker> -->
                 
                 <mt-datetime-picker ref="picker" type="date"  v-model="pickerValue">
                 </mt-datetime-picker>
        
        <!-- <mt-button @click.native="open('picker')" size="large">点击弹出 DateTime Picker</mt-button> -->
      

  </div>
</template>

<script>
import common from '../common/common.js'
import httpService from '../common/httpService.js'
import imageUpload from '../components/tools/imageUpload'

export default {

  data () {
    return {
      sex:'',
      
      param: {
          name: 'intention',
          index:0,
          url:''
      },
      birthday:'',
      pickerValue:'',
      arr:{
        
        name:'',
        birthday:'',
        gender:'',
        phone:'',
        ucomment:'',
        company:'',
        companyShort:'',
        companyJob:'',
        bizMain:'',
        invoice:'',
        ccomment:'',
        url:''
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
  components: {
            imageUpload
        },
  created(){
          let _self = this;
          
          _self.getHttp();
              
          common.$on("informAccountFinish",function (item){
                _self.getHttp();
          });
 },
 watch: {
            pickerValue: function(newValue, oldValue) {
                console.log(newValue);
                console.log(oldValue);
                let _self = this;
                window.clearTimeout(this.time);
                this.time = setTimeout(() => {
                    
                    let birthday = JSON.stringify(_self.pickerValue);
                    birthday = birthday.substring(1,11);
                    birthday = new Date(birthday).getTime() + (24*3600*1000);
                    birthday = JSON.stringify(new Date(birthday));
                    birthday = birthday.substring(1,11);
                    _self.arr.birthday = birthday;
                    
                }, 0)
            }
        },
  methods:{
      jump(router){

          this.$router.push(router);
      },
      
      getUrl(param){
               
                this.arr.url = param.url;
            },
      open(picker) {
          this.$refs[picker].open();
          
      },
      getHttp(){
           let _self = this;
          
          common.$emit('show-load');
          let url=common.addSID(common.urlCommon+common.apiUrl.most);
          let body={biz_module:'userService',biz_method:'queryUserInfo',version:1,time:0,sign:'',biz_param:{}};
          console.log(common.difTime);
          body.time=Date.parse(new Date())+parseInt(common.difTime);
          body.sign=common.getSign('biz_module='+body.biz_module+'&biz_method='+body.biz_method+'&time='+body.time);
          httpService.queryUserInfo(url,body,function(suc){
            common.$emit('close-load');
              //对生日进行处理             
              let birthday = JSON.stringify(_self.pickerValue);
              birthday = birthday.substring(1,11);
              birthday = new Date(birthday).getTime() + (24*3600*1000);
              birthday = JSON.stringify(new Date(birthday));
              birthday = birthday.substring(1,11);
              _self.birthday = birthday;
              let gender = suc.data.biz_result.gender;

            _self.arr.name = suc.data.biz_result.name;
            _self.pickerValue = _self.birthday;
            _self.arr.gender = gender;
            _self.arr.phone = suc.data.biz_result.phone;
            _self.arr.ucomment = suc.data.biz_result.ucomment;
            
            _self.arr.company = suc.data.biz_result.company;
            _self.arr.companyShort = suc.data.biz_result.companyShort;
            _self.arr.companyJob = suc.data.biz_result.companyJob;
            _self.arr.bizMain = suc.data.biz_result.bizMain;
            _self.arr.invoice = suc.data.biz_result.invoice;
            _self.arr.ccomment = suc.data.biz_result.ccomment;
            _self.param.url = suc.data.biz_result.avatar;
            /*common.$emit('setParam','accountPhoto',suc.data.biz_result.avatar)*/
          },function(err){
            common.$emit('close-load');
          })
      },
      
      upData(){

          let _self = this;
       
          let birthday = new Date(_self.birthday).getTime();
          
          common.$emit('show-load');
          let url=common.addSID(common.urlCommon+common.apiUrl.most);
          let body={biz_module:'userService',biz_method:'updateUserInfo',version:1,time:0,sign:'',biz_param:{
               name:_self.arr.name,
               gender: _self.arr.gender,
               fullname: _self.arr.name,
               phone: _self.arr.phone,
               birthday: birthday,
               company:_self.arr.company,
               companyShort:_self.arr.companyShort,
               bizMain:_self.arr.bizMain,
               avatar:_self.arr.url,
               companyJob:_self.arr.companyJob,
               invoice:_self.arr.invoice,
          }};
          console.log(common.difTime);
          body.time=Date.parse(new Date())+parseInt(common.difTime);
          body.sign=common.getSign('biz_module='+body.biz_module+'&biz_method='+body.biz_method+'&time='+body.time);
          httpService.queryUserInfo(url,body,function(suc){
            common.$emit('close-load');
            if(suc.data.code == "1c01"){
                 common.$emit("informAccountinfo","refurbish");
                 common.$emit("toMine",_self.arr);

                 _self.$router.push('accountInfo');
            }else{
                 common.$emit('message', suc.data.msg);
            }     
          },function(err){
            common.$emit('close-load');
            common.$emit('message', suc.data.msg);
          })
      }
  },
  mounted() {

            this.wrapperHeight = document.documentElement.clientHeight - this.$refs.wrapper.getBoundingClientRect().top;
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
.account_overview_finish #right{
  color:#EC6817;
}
.birthday{
   width:100px;
   height:100px;
   background:red;
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
  position: relative;
}

.account_overview_finish .header_word{
  font-size: 1.024rem;
  color:#666666;
  float:left;
}
.account_overview_finish .header_word span{
  color:#999999;
}
.account_overview_finish  .header_photo_box .header_photo{
  width:5.1198rem;
  height:5.1198rem;
  border-radius: 50%;
  background:#FED77A;
  right:10%;
  margin-top:1.0666rem; 
  overflow: hidden;
  position: absolute;
  z-index: 10000000;

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
  background: white;
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
.account_overview_finish  .button{
  position: absolute;
  right:4%;
  background:url(/static/images/down-arrow.png ) no-repeat right center;
  background-size:1.024rem 0.6826rem;
  width:1.024rem;
  height:100%;
  box-shadow: none;
}

.account_overview_finish .down-arrow{
  position:absolute;
  right:4%;
  top:1.79rem;
  height:0.6826rem;
  width:1.024rem;
}
.account_overview_finish .sex-select{
   border:none;
   
   height:4.1rem;
   line-height:4.26rem;
   position: absolute;
   right:4%;
   padding-right: 20px;
   background:url(/static/images/down-arrow.png ) no-repeat right center;
   background-size:1.024rem 0.6826rem;
}
</style>
