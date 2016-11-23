<template>
    <div class="page-tabbar">
        <div class="page-wrap">
            <mt-tab-container class="page-tabbar-container" v-model="selected">
                <mt-tab-container-item id="首页">
                    <index></index>
                </mt-tab-container-item>
                <mt-tab-container-item id="商城">
                    <arrondi></arrondi>
                </mt-tab-container-item>
                <mt-tab-container-item id="求购">
                    <find></find>
                </mt-tab-container-item>
                <mt-tab-container-item id="我的">
                    <mine></mine>
                </mt-tab-container-item>
            </mt-tab-container>
        </div>
        <mt-tabbar v-model="selected" fixed>
            <mt-tab-item id="首页">
                <img slot="icon" src="/static/images/100x100.png"> 首页
            </mt-tab-item>
            <mt-tab-item id="商城">
                <img slot="icon" src="/static/images/100x100.png"> 商城
            </mt-tab-item>
            <mt-tab-item id="求购">
                <img slot="icon" src="/static/images/100x100.png"> 求购
            </mt-tab-item>
            <mt-tab-item id="我的">
                <img slot="icon" src="/static/images/100x100.png"> 我的
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
                selected: '首页'
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
    padding-bottom: 100px;
}
</style>
