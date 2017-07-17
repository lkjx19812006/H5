<style scoped>
    #app {
        font-family: 'Avenir', Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        text-align: center;
        color: #2c3e50;
    }
</style>
<template>
    <div id="app">
        <!-- <transition name="bounce" > -->
        <keep-alive>
            <router-view></router-view>
        </keep-alive>
        <!-- </transition> -->
    </div>
</template>
<script>
    export default {
        data() {
            return {
                show: true
            }
        },
        methods: {

        },
        created() {



        }

    }
</script>