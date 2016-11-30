<template>
    <div class="page-tabbar">
        <div class="page-wrap">
            <mt-tab-container class="page-tabbar-container" v-model="selected">

                <!-- <mt-tab-container-item id="首页">
                    <index></index>
                </mt-tab-container-item>
                <mt-tab-container-item id="商城">
                    <arrondi></arrondi>
                </mt-tab-container-item>
                <mt-tab-container-item id="求购"> -->


                <mt-tab-container-item id="index">
                    <index></index>
                </mt-tab-container-item>
                <mt-tab-container-item id="resource">
                    <arrondi></arrondi>
                </mt-tab-container-item>
                <mt-tab-container-item id="purchase">


                    <find></find>
                </mt-tab-container-item>
                <mt-tab-container-item id="mine">
                    <mine></mine>
                </mt-tab-container-item>
            </mt-tab-container>
        </div>
        <mt-tabbar v-model="selected" fixed>


            <!-- <mt-tab-item id="首页">
                <img slot="icon" src="/static/images/100x100.png"> 首页
            </mt-tab-item>
            <mt-tab-item id="商城">
                <img slot="icon" src="/static/images/100x100.png"> 商城
            </mt-tab-item>
            <mt-tab-item id="求购"> -->

            <!-- <mt-tab-item id="index">
                <img slot="icon" src="/static/images/100x100.png"> 首页
            </mt-tab-item>
            <mt-tab-item id="resource">
                <img slot="icon" src="/static/images/100x100.png"> 资源
            </mt-tab-item>
            <mt-tab-item id="purchase"> -->


            <mt-tab-item id="index">
                <img slot="icon" src="/static/icons/index_selected.png" v-if="selected=='index'">
                <img slot="icon" src="/static/icons/index.png" v-else> 首页
            </mt-tab-item>
            <mt-tab-item id="resource">
                <img slot="icon" src="/static/icons/resource_selected.png" v-if="selected=='resource'">
                <img slot="icon" src="/static/icons/resource.png" v-else> 资源
            </mt-tab-item>
            <mt-tab-item id="purchase">

                <img slot="icon" src="/static/icons/buy_selected.png" v-if="selected=='purchase'">
                <img slot="icon" src="/static/icons/buy.png" v-else> 求购

            </mt-tab-item>
            <mt-tab-item id="mine">
             <img slot="icon" src="/static/icons/mine_selected.png" v-if="selected=='mine'">
                <img slot="icon" src="/static/icons/mine.png" v-else> 我的
            </mt-tab-item>
        </mt-tabbar>
    </div>
</template>
<script>
import index from '../components/index/index'
import arrondi from '../components/index/arrondi'
import find from '../components/index/find'
import mine from '../components/index/mine'
export default {
    data() {
            return {
                msg: 'Welcome to Your Vue.js App',


                

                selected: 'index'


                

            }
        },
        components: {
            index,
            arrondi,
            find,
            mine

        }
}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

.page-tabbar {
    overflow: hidden;
    height: 100vh;
}

.page-wrap {
    overflow: auto;
    height: 100%;
    padding-bottom: 60px;
}
.mint-tabbar > .mint-tab-item.is-selected {
    color: #FA6750;
}
</style>
