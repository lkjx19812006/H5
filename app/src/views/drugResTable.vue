<template>
   <div class="whole">
    <mt-header title="药性表">
      <router-link to="/" slot="left">
        <mt-button icon="back"></mt-button>
      </router-link> 
   </mt-header>

   <div class="search">
          <input type="text" placeholder="输入你想要的货物资源"  disabled="true">  
          <img src="/static/images/search.png" class="search_image">
    </div>

   <div class="hot_drug">
       <p>热门药材</p>
   </div>

   <div class="drug_show">
       <img  src="/static/images/1.jpg">

   </div>

   <div class="hot_search_drug">
       <p>热搜药材</p>
   </div>

  </div>

</template>


<script> 
export default{
	
	data() {
            return {
                msg: 'Welcome to Your Vue.js App'
                
            }
        }
}

</script>

<style scoped>
.whole{
    position: relative;
    background: #F1EFEF;
}

.mint-header{
  background-color:white;
  color:#313232;
  font-size: 2.73056rem;
}

.search{
  height:8.533rem;
  background: white;
  position: relative;
}
.search input{
    width:53.7579rem;
    height:5.12rem;
    padding-left:2.56rem;
    border-radius: 5.12rem;
    position: absolute;
    left:5.1198rem;
    top:1.7066rem;
    outline:none;
    border: 0;
    font-size: 2.048rem;
    background: #F1EFEF;

} 
.search_image{
  width:3.5rem;
  height:3.5rem;
  position: absolute;
  left:50.344rem;
  top:2.5166rem;
}
.hot_drug{
  width:100%;
  height:7.509rem;
}

.hot_search_drug{
  width:100%;
  height:7.509rem;
}
.hot_drug p,.hot_search_drug p{
  font-size: 2.38924rem;
  height:7.509rem;
  line-height: 7.509rem;
  text-align: left;
  margin-left: 2.5599rem;
}

.drug_show{
  width:100%;
  height:27.3056rem;
  padding: 2.5599rem;
  background:white;
}

.drug_show img{
  width:27.3056rem;
  height:22.1858rem;
  float:left;
}
</style>