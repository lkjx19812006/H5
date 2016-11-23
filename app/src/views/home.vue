<template>
    <div class="page-tabbar">
        <div class="page-wrap">
            <mt-tab-container class="page-tabbar-container" v-model="selected">
<<<<<<< HEAD
                <mt-tab-container-item id="首页">
                    <index></index>
                </mt-tab-container-item>
                <mt-tab-container-item id="商城">
                    <arrondi></arrondi>
                </mt-tab-container-item>
                <mt-tab-container-item id="求购">
=======
                <mt-tab-container-item id="index">
                    <index></index>
                </mt-tab-container-item>
                <mt-tab-container-item id="resource">
                    <arrondi></arrondi>
                </mt-tab-container-item>
                <mt-tab-container-item id="purchase">
>>>>>>> 5274ded178ac91cd5d5390b4dd8fe5a2df64d4b4
                    <find></find>
                </mt-tab-container-item>
                <mt-tab-container-item id="mine">
                    <mine></mine>
                </mt-tab-container-item>
            </mt-tab-container>
        </div>
        <mt-tabbar v-model="selected" fixed>
<<<<<<< HEAD
            <mt-tab-item id="首页">
                <img slot="icon" src="/static/images/100x100.png"> 首页
            </mt-tab-item>
            <mt-tab-item id="商城">
                <img slot="icon" src="/static/images/100x100.png"> 商城
            </mt-tab-item>
            <mt-tab-item id="求购">
=======
            <mt-tab-item id="index">
                <img slot="icon" src="/static/images/100x100.png"> 首页
            </mt-tab-item>
            <mt-tab-item id="resource">
                <img slot="icon" src="/static/images/100x100.png"> 资源
            </mt-tab-item>
            <mt-tab-item id="purchase">
>>>>>>> 5274ded178ac91cd5d5390b4dd8fe5a2df64d4b4
                <img slot="icon" src="/static/images/100x100.png"> 求购
            </mt-tab-item>
            <mt-tab-item id="mine">
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
<<<<<<< HEAD
                selected: '首页'
=======
                selected: 'index'
>>>>>>> 5274ded178ac91cd5d5390b4dd8fe5a2df64d4b4
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
