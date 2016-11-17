<template>
    <div class="page-swipe">
        <mt-swipe :auto="4000">
            <mt-swipe-item >
            	<img src="/static/images/1.jpg">
            </mt-swipe-item>
            <mt-swipe-item >
            	<img src="/static/images/2.jpg">
            </mt-swipe-item>
            <mt-swipe-item >
            	<img src="/static/images/3.jpg">
            </mt-swipe-item>
        </mt-swipe>
    </div>
</template>
<script>
export default {
    data() {
        return {
            msg: 'Welcome to Your Vue.js App'
        }
    }
}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.mint-swipe {
    height: 200px;
    color: #fff;
    font-size: 30px;
    text-align: center;
    margin-bottom: 20px;
}

.mint-swipe-item {
    line-height: 200px;
}

img{
	width: 100%;
}

</style>
