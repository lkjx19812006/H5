<template>
  <div class="whole">
      我要供应
   </div>

 
   
</template>


<script> 

import common from '../common/common.js'
export default{
	
	data() {
            return {
                msg: 'Welcome to Your Vue.js App'
                
            }
        },


        methods:{
            
        },


        created() {

            common.$emit('show-load');

            this.$http.get(common.apiUrl.market_list).then((response) => {
                //console.log(response.data);
                  common.$emit('close-load');
                    
                
                      
                 


            }, (err) => {
                //console.log(err);
                  common.$emit('close-load');
                  common.$emit('message',response.data.msg);
            });
        }
}

</script>

<style scoped>
.whole{
    position: relative;
}

<style>