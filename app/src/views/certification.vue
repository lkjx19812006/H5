<template>
  <div class="certification whole">
        <mt-header title="实名认证" fixed>
            <router-link to="/home" slot="left">
                <mt-button icon="back"></mt-button>
            </router-link>
        </mt-header>
             <div class="main">

                    <div class="personal_info">
                     <div class="info_header">
                         <p class="left">个人信息</p>
                         <p class="right">暂未通过审核</p>
                     </div>
                     <div>
                         <p class="left">姓名</p>
                         <p class="right">{{obj.name}}</p>
                     </div>
                     <div>
                         <p class="left">性别</p>
                         <p class="right" v-if="obj.gender == '女'">
                            <img src="/static/images/woman.png">
                         </p>
                         <p class="right" v-if="obj.gender == '男'">
                            <img src="/static/images/man.png">
                         </p>
                     </div>
                     <div>
                         <p class="left">电话</p>
                         <p class="right">{{obj.phone}}</p>
                     </div>
                 </div>
     
      
                <div class="first_item">
                    <div v-for="(todo,index) in todos" v-bind:class="{ maxbox: index%2==0, 'otherbox': index%2==1 }">
                       <p class="title">{{todo.title}}</p>
                       <div class="photo" >
                          <imageUpload :param="imgageArr[index]" v-on:postUrl="getUrl"></imageUpload>
                       </div>
                       
                       <p  v-bind:class="{point:index == 0,'nor_point':index == 1}">{{todo.point}}</p>
                    </div>  
                </div>

                <div class="other_item">
                      <p>已通过审核照片</p>
                      <div><!-- <imageUpload :param="param" v-on:postUrl="getUrl"></imageUpload> --></div>
                </div>

             </div>
                 
              
              
                
      
                
       <div class="common_problem">
          <div class="common_problem_inner">
                <img src="/static/images/common-problem.png">
                <p><span>认证常见问题</span></p>
          </div>    
       </div>
        <div class="confirm" @click="confirm">申请认证</div>
  </div>
</template>

<script>
import common from '../common/common.js'
import imageUpload from '../components/tools/imageUpload'
import httpService from '../common/httpService.js'

export default {
    data() {
            return {
                obj:{
                    gender:'',
                    phone:'',
                    name:''
                    
                },
                todos:[{
                    title:'身份证正面',
                    point:'暂未认证'
                },{
                    title:'身份证反面',
                    point:'等待审核'
                }],
                
                imgageArr:[
                      {
                        name: 'intention',
                        index:0,
                        url: ''  
                      },{
                        name: 'intention',
                        index:1,
                        url: ''  
                      }],
                left_url:'',
                right_url:'',
                arr:['','']
                
            }
        },
        components: {
            imageUpload
        },
        methods: {
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
                     console.log(suc.data.biz_result.gender);
                    _self.obj.name = suc.data.biz_result.name;
                    _self.obj.gender = suc.data.biz_result.gender;
                    _self.obj.phone = suc.data.biz_result.phone;
                      
                  },function(err){
                    common.$emit('close-load');
                  })
            },
            getUrl(param){
                let _self = this;
                if(param.index == 0){
                     _self.arr[0] = param.url;
                }else if(param.index == 1){
                     _self.arr[1] = param.url;
                }
                 
                
            },
            confirm(){
                  let _self = this;
                  //console.log(_self.arr)
                  common.$emit('show-load');
                  let url=common.addSID(common.urlCommon+common.apiUrl.most);
                  let body={biz_module:'userService',biz_method:'submitAuthen',version:1,time:0,sign:'',biz_param:{
                         type:0,
                        
                         authenImage:_self.arr
                  }};
                  console.log(common.difTime);
                  body.time=Date.parse(new Date())+parseInt(common.difTime);
                  body.sign=common.getSign('biz_module='+body.biz_module+'&biz_method='+body.biz_method+'&time='+body.time);
                  httpService.queryUserInfo(url,body,function(suc){
                     common.$emit('close-load');
                     console.log(suc);                  
                  },function(err){
                    common.$emit('close-load');
                  })

            }
            
        },
        
        created() {
          let _self = this;
          common.$emit('show-load');
          let url=common.addSID(common.urlCommon+common.apiUrl.most);
          let body={biz_module:'userService',biz_method:'queryUserInfo',version:1,time:0,sign:'',biz_param:{}};
          console.log(common.difTime);
          body.time=Date.parse(new Date())+parseInt(common.difTime);
          body.sign=common.getSign('biz_module='+body.biz_module+'&biz_method='+body.biz_method+'&time='+body.time);
          httpService.queryUserInfo(url,body,function(suc){
             common.$emit('close-load');
             console.log(suc.data.biz_result.gender);
            _self.obj.name = suc.data.biz_result.name;
            _self.obj.gender = suc.data.biz_result.gender;
            _self.obj.phone = suc.data.biz_result.phone;
              
          },function(err){
            common.$emit('close-load');
          })

            common.$on("post-my-info", function (obj){
                console.log(obj.name)
                _self.obj.name = obj.name;
                _self.obj.phone = obj.phone;
                _self.obj.gender = obj.gender;


            })
        }

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

.certification .first_item{
    padding: 1.5rem 0;
    border-top: 1px solid #BFBFBF;
    border-bottom: 1px solid #BFBFBF;
    min-height: 17.9rem;
    margin: 1rem 0 0 0;
}
.certification .other_item{
    
}
.certification .other_item p{
    text-align: left;
    font-size: 1.2rem;
    color:#333232;
    margin: 1.5rem 0 0 0;
    line-height: 1.2rem;
    
}
.certification .other_item  div{
    width:68.75%;
    height:13rem;
    background:#E1DDDA;
    margin:1.5rem 0 0 15.625%;
}
.certification .main{
    padding:0 1.5rem;
    height:51rem;
    background:white;
}
.certification .main .personal_info>div{
    position: relative;
    height:1.2rem;
    line-height: 1.2rem;
    margin-bottom: 1.5rem;
    font-size: 1.2rem;
    color:#313232;
}
.certification .main .personal_info img{
    height:1.5rem;
}
.certification .main .personal_info .info_header{
    padding: 1.5rem 0 2rem 0;
}
.certification .main .personal_info .info_header .left{
    font-size: 1.4rem;
}
.certification .main .personal_info .info_header .right{
    color:#FA6705;
}
.certification .main .personal_info .left{
    position: absolute;
    left:0;
}
.certification .main .personal_info .right{
    position: absolute;
    right:0;
}
.certification .first_item .maxbox{
    width:50%;
    height:14rem;
    float:left;
    padding-right: 7%;
    text-align: left;
    margin-bottom: 3rem;
}
.certification .first_item .otherbox{
    width:50%;
    height:14rem;
    float:left;
    text-align: left;
    padding-left: 7%;
    /*border:1px solid red;*/
    margin-bottom: 3rem;
    
}

.certification .first_item>div .title{
    font-size: 1.2rem;
    color:#333232;
    margin-bottom: 1.5rem;
}
.certification .first_item>div .photo{
    height:9rem;
    width:100%;
    background:#E1DDDA;
} 
.certification .first_item>div .point{
    font-size: 1rem;
    margin-top:1rem;
    text-align: center;
    width:100%;
    color:#999999;
}
.certification .first_item>div .nor_point{
    font-size: 1rem;
    margin-top:1rem;
    text-align: center;
    width:100%;
    color:#FF0000;
}
.certification .common_problem{
    height:8.2rem;
    width:100%;
    position: relative;
}
.certification .common_problem .common_problem_inner{
    width:8.6rem;
    height:1.4rem;
    margin-left: -4.3rem;
    position: absolute;
    left: 50%;
    top:2.2rem;
}
.certification .common_problem .common_problem_inner img{
    width: 1.4rem;
    float:left;
    margin-right:1rem;
}
.certification .common_problem .common_problem_inner p{
    font-size: 1rem;
    line-height: 1.4rem;
    height:1.4rem;
    /*border:1px solid red;*/
    float:left;
    color:#FA6705;
}
.certification .confirm{
    width:100%;
    height:5rem;
    background:#FA6705;
    color:white;
    line-height: 5rem;
    text-align: center;
    /*margin-top:7.5rem;*/
}
</style>
