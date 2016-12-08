<template>
    <div class="feed_back">
        <mt-header title="意见反馈">
            <router-link to="/mySet" slot="left">
                <mt-button icon="back" ></mt-button>
            </router-link>
        </mt-header>
        <div class="main">
             <textarea placeholder="请填写您的反馈内容"></textarea>
             <p>您的反馈对我们至关重要！</p>
        </div>
        <div class="info">
             <div class="info_top">
               <p>姓名：</p>
               <input type="text" placeholder="请填写您的名字！">
             </div>
             <div class="info_bottom">
               <p>联系方式：</p>
               <input type="text" placeholder="请填写您的手机号！">
             </div>
        </div>

        <div class="confirm_submit">确认提交</div>
    </div>
</template>
<script>
import common from '../common/common.js'

export default {
    data() {
            return {
                msg: 'Welcome to Your Vue.js App',
                
            }
        }
       
        
    }

</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.feed_back .main{
   padding: 2rem 1.5rem 0 1.5rem;
   background:white;
   height:18.5rem;
   margin-bottom: 1rem;
}
.feed_back .main textarea{
   width:100%;
   height:12rem;
   padding: 1.5rem;
   margin-bottom: 1rem;
   font-size: 1.2rem;
   color:#666666;
}
.feed_back .main p{
   text-align: left;
   font-size: 1rem;
   color:#FF0000;

}
.feed_back .info{
   background:white;
   padding: 1rem 1.5rem 2rem 1.5rem;
   height:12rem;
}
.feed_back .info div{
   margin-top: 1rem;
   height:3.5rem;
   line-height: 3.5rem;
}
.feed_back .info p{
  font-size:1.2rem;
   width:6rem;
  text-align: right;
  float:left;
}
.feed_back .info input{
  float:left;
  margin-left:3rem;
  height:3.4rem;
  text-align: center;
  width:50%;
}
.feed_back .confirm_submit{
  height:5rem;
  width:100%;
  background:#FA6705;
  color:white;
  font-size: 1.7rem;
  text-align: center;
  line-height: 5rem;
  margin-top: 14rem;
}
</style>
