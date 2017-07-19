<style lang="less" scoped>
.load_app {
    height: 65px;
    width: 100%;
    background-color: rgba(0, 0, 0, 0.6);
    display: flex;
    flex-direction: row;
    align-items: center;
    @media screen {
        .logo {
            width: 40px;
            margin-left: 15px;
        }
        .title {
            color: #fff;
            font-size: 14px;
            .last {
                text-indent: 1em;
            }
        }
        @media (max-width: 320px) {
            .logo {
                width: 40px;
                margin-left: 10px;
            }
            .title {
                color: #fff;
                font-size: 12px;
                .last {
                    text-indent: 1em;
                }
            }
        }
    }
    .button {
        background-color: rgba(250, 103, 5, 1);
        padding: 5px 12px;
        border-radius: 15px;
        font-size: 15px;
        color: #fff;
    }
    .emtry {
        flex: 1;
    }
    .cancel {
        height: 17px;
        padding: 0 13px 0 13px;
    }
}
</style>
<template>
    <div class="load_app" v-show="loadApps.show">
        <img src="/static/icon/load-app-logo.png" class="logo">
        <div class="title">
            <div>买药材上药材买卖网</div>
            <div class="last">更多信息尽在APP上！</div>
        </div>
        <div class="emtry"></div>
        <div class="button" @click="loadIos">
            立即下载
        </div>
        <img src="/static/icon/close-app.png" alt="" class="cancel" @click="cancel">
    </div>
</template>
<script>
import common from '../../common/common.js'
export default {
    data() {
        return {

        }
    },
    props: {
        loadApps: {
            
        }
    },
    methods: {
        cancel() {
            let _self = this;
            this.loadApps.show = false;
            setTimeout(()=>{
                _self.loadApps.show = true;
            },120000);
        },
        loadIos(){
            window.location.href = 'http://a.app.qq.com/o/simple.jsp?pkgname=com.yaocaimaimai.yaocaimaimai';
        }
    },
    created() {
        let _self = this;
        
    }

}
</script>

