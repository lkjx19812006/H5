<template>
  <div class="hello" >
     <mt-navbar v-model="active">
	  <mt-tab-item id="tab-container1">选项一</mt-tab-item>
	  <mt-tab-item id="tab-container2">选项二</mt-tab-item>
	  <mt-tab-item id="tab-container3">选项三</mt-tab-item>
	</mt-navbar>

    <mt-tab-container v-model="active">
	  <mt-tab-container-item id="tab-container1">
	    <mt-cell v-for="n in 10" :title="'内容 ' + n" />
	  </mt-tab-container-item>
	  <mt-tab-container-item id="tab-container2">
	    <mt-cell v-for="n in 4" :title="'测试 ' + n" />
	  </mt-tab-container-item>
	  <mt-tab-container-item id="tab-container3">
	    <mt-cell v-for="n in 6" :title="'选项 ' + n" />
	  </mt-tab-container-item>
   </mt-tab-container>

   
  </div>

</template>

<script>

export default {
  data () {
    return {
      msg: 'Welcome to Your Vue.js App',
      active: 'tab-container1'
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

 
</style>
