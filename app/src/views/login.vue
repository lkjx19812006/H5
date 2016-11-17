<template>
    <div class="hello">
        login
    </div>
</template>
<script>
import common from '../common/common.js'

export default {
    data() {
            return {
                msg: 'Welcome to Your Vue.js App'
            }
        },
        created() {
          common.$emit('message','hello world');
        }
}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
