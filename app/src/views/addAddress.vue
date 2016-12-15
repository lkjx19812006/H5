<template>
    <div class="add_address">
        <mt-header title="添加新地址">
            <router-link to="/addressManage" slot="left">
                <mt-button icon="back" ></mt-button>
            </router-link>
        </mt-header>
        <ul>
           <li>
              <p>收货人</p>
              <input type="text" placeholder="请输入您的名字">
           </li>

           <li>
              <p>联系电话</p>
              <input type="text" placeholder="请输入您的联系电话">
           </li>

           <li>
              <p>省市区(县)</p>
              <p class="selectPlace">请选择</p>  
              <img src="/static/images/right-arrow.png" @click="selectPlace">
           </li>
           <li class="last">
              <textarea placeholder="详细地址"></textarea>
           </li>
        </ul>

  <!-- <mt-picker :slots="slots" @change="onValuesChange" v-show="active" class="place" textAlign="center"></mt-picker> -->
<!-- <mt-picker :slots="slots" @change="onValuesChange"></mt-picker> -->

    </div>
</template>
<script>
import common from '../common/common.js'

export default {
    data() {
            return {
                
                
            }
        },
    methods: {
          
        selectPlace(){
            this.$router.push('selectPlace');
        }
    }
       
        
    }

</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.add_address ul{
   padding: 0 1.5rem;
   background:white;
   width:100%;
   color:#333333;
}
.add_address ul li{
   height:4.4rem;
   border-bottom:1px solid #DADADA;
   position: relative;
}
.add_address ul .last{
   height:8.5rem;
   color:#666666;
   font-size: 1.2rem;
   padding: 1rem 0;
   border-bottom: none;
}
.add_address ul .last textarea{
   width:100%;
   height:100%;
   border:0;
   color:#666666;
}
.add_address ul li p{
   position: absolute;
   left:0;
   font-size: 1.2rem;
   color:#333333;
   line-height: 4.4rem;
}
.add_address ul li input{
   position: absolute;
   right:10%;
   text-align: right;
   border:none;
   outline: none;
   font-size: 1.2rem;
   height:4.2rem;
   color:#666666;
   line-height: 4.4rem;
}
.add_address ul li .selectPlace{
   position:absolute;
   right:10%;
   text-align: right;
   font-size: 1.2rem;
   color:#666666;
}
.add_address ul li img{
   position: absolute;
   right:0;
   height:1rem;
   top:1.7rem;
}
</style>
