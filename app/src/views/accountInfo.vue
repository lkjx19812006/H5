<template>
  <div class="whole">
     <mt-header title="产地选择" class="header">
      <router-link to="/" slot="left">
        <mt-button icon="back"></mt-button>
      </router-link>
    <mt-button  slot="right">编辑</mt-button> 
   </mt-header>
  </div>
</template>

<script>

export default {
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
      
    }
  }

 
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.whole{
	
}
.header{
	background:white;
	color:#313232;
}
.header_right{
	color:#313232;
}
</style>
