<style lang="less" scoped>
.page-tabbar {
    overflow: hidden;
    height: 100vh;
    position: relative;
}

.page-wrap {
    /*overflow: auto;*/
    height: 100%;
    padding-bottom: 60px;
    
}
.load_apps{
    width:100%;
    position: absolute;
    bottom: 55px;
}
.mint-tabbar>.mint-tab-item.is-selected {
    color: #FA6750;
}
</style>
<template>
    <div class="page-tabbar">
        <div class="page-wrap" v-bind:class="{mine:selected=='mine'}">
            <mt-tab-container class="page-tabbar-container" v-model="selected">
                <mt-tab-container-item id="index">
                    <index></index>
                </mt-tab-container-item>
                <mt-tab-container-item id="resource">
                    <resource></resource>
                </mt-tab-container-item>
                <mt-tab-container-item id="purchase">
                    <need></need>
                </mt-tab-container-item>
                <mt-tab-container-item id="mine">
                    <mine :popshow="popshow"></mine>
                </mt-tab-container-item>
            </mt-tab-container>
        </div>
        <mt-tabbar v-model="selected">
            <mt-tab-item id="index">
                <img slot="icon" src="/static/icon/index_selected.png" v-if="selected=='index'">
                <img slot="icon" src="/static/icon/index.png" v-else> 首页
            </mt-tab-item>
            <mt-tab-item id="resource">
                <img slot="icon" src="/static/icon/resource_selected.png" v-if="selected=='resource'">
                <img slot="icon" src="/static/icon/resource.png" v-else> 资源
            </mt-tab-item>
            <mt-tab-item id="purchase">
                <img slot="icon" src="/static/icon/buys_selected.png" v-if="selected=='purchase'">
                <img slot="icon" src="/static/icon/buys.png" v-else> 求购
            </mt-tab-item>
            <mt-tab-item id="mine">
                <img slot="icon" src="/static/icon/mine_selected.png" v-if="selected=='mine'">
                <img slot="icon" src="/static/icon/mine.png" v-else> 我的
            </mt-tab-item>
        </mt-tabbar>
        
        <loadApp :loadApps="loadApps" class="load_apps"></loadApp>
        <customPopUp  :popshow="popshow" v-show="selected=='mine' && popshow.show"></customPopUp>
    </div>
</template>
<script>
import index from '../components/index/index'
import resource from '../components/index/resource'
import need from '../components/index/need'
import mine from '../components/index/mine'
import common from '../common/common.js'
import loadApp from '../components/user/loadApp'
import customPopUp from '../components/popUpType/customPopUp'
export default {
    data() {
        return {
            selected: 'index',
            loadApps: {
                show: true
            },
            popshow:{
                show:false
            }
        }
    },
    components: {
        index,
        resource,
        need,
        mine,
        loadApp,
        customPopUp
    },
    watch: {
        selected: function (newValue, oldValue) {
            let _self = this;
            switch (newValue) { //为了清除资源和求购原搜索
                case 'resource':
                    common.$emit('clearResourceSearch', 1);
                    _self.shareResource();
                    break;
                case 'purchase':
                    common.$emit('clearNeedSearch', 1)
                    _self.shareNeed();
                    break;
            }
        }
    },
    methods: {
        shareResource() {
            let shareData = common.shareParam;
            shareData.title = "【药材买卖网】 低价资源";
            shareData.desc = "药农资源、产地资源的聚集地，就算是冷备品，药材买卖网也一应俱全，而且全网比价哦！赶紧进入资源专区进行抢购";
            shareData.link = window.location.href;
            common.share(shareData);
            console.log(1, shareData.title)
        },
        shareNeed() {
            let shareData = common.shareParam;
            shareData.title = "【药材买卖网】 紧急求购";
            shareData.desc = "药厂、提取物厂、保健品厂的求购需求实在是太多了！快来药材买卖网的求购专区进行报价抢单！手慢则无哦！";
            shareData.link = window.location.href;
            common.share(shareData);
            console.log(2, shareData.title)
        }
    },
    created() {
        let _self = this;
        common.$on('go_home', function (item) {
            _self.selected = 'index';
        })
        common.$on('selectRes', function (selected) {
            console.log(selected)
            console.log(111)
            _self.selected = selected;
        })
    }

}
</script>

