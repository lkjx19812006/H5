<template>
    <div id="app">
        <h1>Hello App!</h1>
        <div class="mui-backdrop" v-show="show">
            <div class="load">
                <p class="loader">Loading</p>
            </div>
        </div>
        <router-view></router-view>
    </div>
</template>
<script>
import common from './common/common.js'
export default {
    data() {
            return {
                show: common.show
            }
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
    margin-top: 60px;
}

.load {
    height: 100%;
}

.load .loader {
    top: 50%;
    margin: -5em auto 0 auto;
    font-size: 10px;
    position: relative;
    text-indent: -9999em;
    border-top: 1.1em solid rgba(255, 255, 255, 0.2);
    border-right: 1.1em solid rgba(255, 255, 255, 0.2);
    border-bottom: 1.1em solid rgba(255, 255, 255, 0.2);
    border-left: 1.1em solid #ffffff;
    -webkit-animation: load 1.1s infinite linear;
    animation: load 1.1s infinite linear;
}

.load .loader,
.load .loader:after {
    border-radius: 50%;
    width: 10em;
    height: 10em;
}

@-webkit-keyframes load {
    0% {
        -webkit-transform: rotate(0deg);
        transform: rotate(0deg);
    }
    100% {
        -webkit-transform: rotate(360deg);
        transform: rotate(360deg);
    }
}

@keyframes load {
    0% {
        -webkit-transform: rotate(0deg);
        transform: rotate(0deg);
    }
    100% {
        -webkit-transform: rotate(360deg);
        transform: rotate(360deg);
    }
}
</style>
