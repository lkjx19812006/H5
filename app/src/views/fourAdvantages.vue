<template>
    <div class="sub_company">
        <myHeader :param="my_header" v-if="show"></myHeader>
        <div class="box">
            <myBanner :param="param"></myBanner>
            <div class="chinese_map">
                <img src="/static/images/chinese-map.png">
            </div>
            <div class="list">
                <div class="item" v-for="todo in arr">
                    <div class="top">
                        <img src="/static/icons/sub-company-logo.png">
                        <div class="tname">{{todo.name}}</div>
                    </div>
                    <div class="content">
                        {{todo.content}}
                    </div>
                    <div class="right">
                        <div class="address">
                            <span>地址:</span>{{todo.address}}
                        </div>
                        <div class="address">
                            <span>电话:</span>{{todo.tel}}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import common from '../common/common.js'
import myHeader from '../components/tools/myHeader'
import myBanner from '../components/tools/myBanner'
export default {
    data() {
            return {
                wrapperHeight: '',
                show: true,
                my_header: {
                    name: '详情',
                },
                param: {
                    title: '四大优势，追求共赢',
                    time: '2017-4-14 16:30'
                },
                arr: [{

                }, {

                }, {

                }, {

                }, {

                }]

            }
        },
        components: {
            myHeader,
            myBanner
        },
        methods: {

        },
        created() {

        },
        mounted() {
            // this.wrapperHeight = document.documentElement.clientHeight - this.$refs.wrapper.getBoundingClientRect().top ;
        }
}
</script>
<style scoped>
</style>
