<template>
    <div class="select_address">
        <mt-header title="选择地区">
            <router-link to="/addressManage" slot="left">
                <mt-button icon="back" ></mt-button>
            </router-link>
        </mt-header>
        <ul>
           

           <li v-for="todo in todos">
              <p>{{todo.place}}</p>
                
              <img src="/static/images/right-arrow.png" @click="selectPlace(todo.router)">
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
                 todos:[{
                     place:"北京",
                     router:"cityName"
                 },{
                     place:"上海",
                     router:"cityName"
                 },{
                     place:"安徽",
                     router:"cityName"
                 },{
                     place:"河北",
                     router:"cityName"
                 },{
                     place:"湖南",
                     router:"cityName"
                 },{
                     place:"河南",
                     router:"cityName"
                 },{
                     place:"四川",
                     router:"cityName"
                 }]
                
            }
        },
    methods: {
         
        selectPlace(router){
            this.$router.push(router);
        }
    }
       
        
    }

</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.select_address ul{
   background:white;
   width:100%;
   color:#333333;
}
.select_address ul li{
   padding: 0 1.5rem;
   height:4.4rem;
   border-bottom:1px solid #DADADA;
   position: relative;
}

.select_address ul li p{
   position: absolute;
   left:1.5rem;
   font-size: 1.2rem;
   color:#333333;
   line-height: 4.4rem;
}


.select_address ul li img{
   position: absolute;
   right:1.5rem;
   height:1rem;
   top:1.7rem;
}
</style>
