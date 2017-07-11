<style lang="less" scoped>
.release_need_success {
    background-color:#F5F5F5;
    .top{
        margin-bottom:15px;
    }
    .footer{
        margin-top:15px;
    }
    .bottom {
        position: absolute;
        bottom: 0;
        height: 50px;
        display: flex;
        flex-direction: row;
        align-items: center;
        width: 100%;
        box-sizing: border-box;
        background-color: #fff;
        div {
            flex: 1;
            height: 50px;
            background-color: #FA6705;
            font-size: 16px;
            color: #fff;
            line-height: 50px;
        }
        .left {
            margin-right: 1px;
        }
    }
}


</style>
<template>
    <div class="release_need_success">
        <myHeader :param="param"></myHeader>
        <div class="page-loadmore-wrapper" ref="wrapper" :style="{ height: wrapperHeight + 'px' }">
            <mt-loadmore>
                <div class="top">
                    <releaseSuccessTop :words="words"></releaseSuccessTop>
                </div>
                <releaseSuccessCenetr :words="words"></releaseSuccessCenetr>
                <!-- <div class="footer">
                    <userInfor></userInfor>
                </div> -->
            </mt-loadmore>
        </div>
        <div class="bottom">
            <div class="left" @click="back()">继续发布</div>
            <div class="right" @click="jump()">查看匹配供应信息</div>
        </div>
    </div>
</template>
<script>
import common from '../../common/common.js'
import releaseSuccessTop from '../../components/release/releaseSuccessTop'
import releaseSuccessCenetr from '../../components/release/needReleaseSuccessCenter'
import userInfor from '../../components/release/showUserInfor'
import httpService from '../../common/httpService.js'
import myHeader from '../../components/tools/myHeader'
import filters from '../../filters/filters.js'
export default {
    data() {
            return {
                param: {
                    name: '发布成功',
                    goBack: true
                },
                wrapperHeight: '',
                words: '求购',
                infor:{
                    name:'',
                    phone:''
                }
            }
        },
        computed: {
            infor(){
                return this.$store.state.release.needRelease
            }
        },
        methods: {
            jump() {
                let _self = this;
                common.$emit("setParam", 'lowPrice', {
                    keyWord: _self.infor.breedName
                });
                common.$emit('lowPriceRes', {
                    keyWord: _self.infor.breedName
                });
                this.$router.push('/lowPriceRes');
            },
            back() {
                common.$emit('inforReleases', 1);//清空发布缓存数据
                window.history.go(-1);
            },
        },
        components: {
            releaseSuccessTop,
            myHeader,
            releaseSuccessCenetr,
            userInfor
        },
        created() {
            var _self = this;
            var id = _self.$route.params.id;
            _self.$store.dispatch('getReleaseInfor',id);

            common.$on('informNeedSuccess', function(item) {
                _self.$store.dispatch('getReleaseInfor',item);
            });
        },
        mounted() {
            this.wrapperHeight = document.documentElement.clientHeight - this.$refs.wrapper.getBoundingClientRect().top - 50;
        },
}
</script>
