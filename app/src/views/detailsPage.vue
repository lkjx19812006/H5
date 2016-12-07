<template>
    <div class="details_page">
        <mt-header title="详情">
            <router-link to="/mySet" slot="left">
                <mt-button icon="back" ></mt-button>
            </router-link>
        </mt-header>
        <ul class="info_list">
           <li  v-for="todo in todos">
              <img :src="todo.img_src">
              <p class="name">{{todo.name}}</p>
              <p class="name_content">{{todo.content}}</p>
           </li>

        </ul>

        <div class="advantage" v-for="item in data">
            <img :src="item.img_src">
            <p>{{item.name}}</p>
            <div>
               {{item.content}}
            </div>
        </div>
    </div>
</template>
<script>
import common from '../common/common.js'

export default {
    data() {
            return {
                msg: 'Welcome to Your Vue.js App',
                todos:[{
                   img_src:'/static/images/my-name.png',
                   name:'姓名',
                   content:'丽丽'
                },{
                   img_src:'/static/images/sex.png',
                   name:'性别',
                   content:'女'
                },{
                   img_src:'/static/images/phone-number.png',
                   name:'手机号',
                   content:'15974184216'
                },{
                   img_src:'/static/images/office-telephone.png',
                   name:'办公室电话',
                   content:'0212-4550884'
                },{
                   img_src:'/static/images/qq.png',
                   name:'QQ',
                   content:'1109714809'
                },{
                   img_src:'/static/images/wechat.png',
                   name:'微信',
                   content:'bb1109714809'
                }],

                data:[{
                   img_src:'/static/images/be-good-at.png',
                   name:'擅长领域',
                   content:'擅长领域擅长领域擅长领域擅长领域擅长领域擅长领域擅长领域擅长领域擅长领域擅长领域擅长领域擅长领域'
                }]
                
            }
        }
       
        
    }

</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.details_page .info_list{
   padding:0 1.5rem;
   background:white;
   margin:1rem 0;
}
.details_page .info_list li{
   height:4.4rem;
   border-bottom: 1px solid #DCDCDC;
   position: relative;
   font-size: 1.2rem;
   line-height: 4.4rem;
}
.details_page .info_list li img{
   height:1.5rem;
   position: absolute;
   left:0;
   top:1.45rem;
}
.details_page .info_list li .name{
   color:#333333;
   position: absolute;
   left: 3rem;
}
.details_page .info_list li .name_content{
   color:#666666;
   float:right;
}
.details_page .advantage{
   padding:1.5rem;
   background: white;
   position: relative;
   min-height: 11rem;
}
.details_page .advantage img{
   height:1.5rem;
   position: absolute;
   left:1.5rem;
   top:1.45rem;
}
.details_page .advantage p{
   float:left;
   margin-left: 3rem;
   color:#333333;
   font-size: 1.2rem;
   
}
.details_page .advantage div{
  float:left;
  margin:1.5rem 0 0 3rem;
  text-align: left;
  font-size: 1rem;
  color:#666666;
  line-height: 1.5rem;
}
</style>
