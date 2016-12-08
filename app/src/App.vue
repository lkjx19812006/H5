<template>
    <div id="app" ref="wrapper" :style="{ height: wrapperHeight + 'px' }">
        <router-view></router-view>
    </div>
</template>
<script>
export default {
    data() {
            return {
                wrapperHeight: 0
            }
        },
        mounted() {

            this.wrapperHeight = document.documentElement.clientHeight - this.$refs.wrapper.getBoundingClientRect().top;
        }

}
</script>
<style scoped>
#app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
}
</style>
