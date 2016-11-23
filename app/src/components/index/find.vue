<template>
  <div class="hello">

     <mt-search v-model="value">
	  <mt-cell
	    v-for="item in result"
	    :title="item.title"
	    :value="item.value">
	  </mt-cell>
	</mt-search>
  
   
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


</style>
