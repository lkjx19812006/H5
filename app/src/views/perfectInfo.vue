<template>
    <div class="perfect_info">
        <myHeader :param="my_header" v-if="show"></myHeader>
        <div class="page-loadmore-wrapper" ref="wrapper" :style="{ height: wrapperHeight + 'px' }">
           <mt-loadmore>
                  <div  class="head">
                       <p>头像(点击设置头像)</p>
                       <img src=""  class="head_img">
                  </div>

           </mt-loadmore>
        </div>
    </div>
</template>
<script>
import common from '../common/common.js'
import myHeader from '../components/tools/myHeader'
export default {
    data() {
            return {
                wrapperHeight:'',
                show:true,
                my_header: {
                    name: '完善信息',
                    t_show:true
                }
            }
        },
        components: {
            myHeader
        },
        methods: {

        },
        created() {
           
        },
        mounted() {
            this.wrapperHeight = document.documentElement.clientHeight - this.$refs.wrapper.getBoundingClientRect().top;
        }
}
</script>
<style scoped>

</style>
