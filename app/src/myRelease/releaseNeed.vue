<style lang="less" scoped>
input[type="text"],
input[type="submit"],
input[type="reset"],
select,
textarea {
    -webkit-appearance: none;
    border-radius: 0;
}

.killScroll {
    overflow: hidden;
    height: 100%;
}

input {
    border: none;
}

.release_need {
    background-color: #F5F5F5;
    .sell_point {
        margin: 15px 0;
        padding: 0 15px;
        background-color: #fff;
        textarea {
            width: 100%;
            height: 160px;
            padding: 20px 0;
            border: none;
            font-size: 15px;
        }
    }
    .person_infor {
        .inbox {
            background-color:#fff;
            padding-left: 15px;
            div {
                display: flex;
                flex-direction: row;
                align-items: center;
                font-size: 15px;
                color: #000;
                height:50px;
                border-bottom: 1px solid #E6E6E6;
                .left{
                    width:85px;
                }
                .right{
                    flex:1;
                }
            }
        }
    }
}
</style>
<template>
    <div class="release_need" v-bind:class="{killScroll:obj.sheetVisible}">
        <myHeader :param="param"></myHeader>
        <div class="page-loadmore-wrapper" ref="wrapper" :style="{ height: wrapperHeight + 'px' }" v-bind:class="{killScroll:obj.sheetVisible}">
            <div class="basic_infor">
                <needBasic :obj="obj"></needBasic>
            </div>
            <div class="sell_point">
                <textarea placeholder="请根据实际情况描述一下您的产品卖点"></textarea>
            </div>
            <!-- <div class="person_infor">
                <div class="inbox">
                    <div class="name">
                        <div class="left">姓名</div>
                        <div class="right">小明</div>
                    </div>
                    <div class="name">
                        <div class="left">联系方式</div>
                        <div class="right">15971484216</div>
                    </div>
                </div>
            </div> -->
        </div>
    </div>
</template>
<script>
import common from '../common/common.js'
import validation from '../validation/validation.js'
import myHeader from '../components/tools/myHeader'
import imageUpload from '../components/tools/upDownImg'
import needBasic from '../components/release/needReleaseBasic'
import httpService from '../common/httpService.js'

export default {
    data() {
            return {
                param: {
                    name: '我要报价',
                    router: 'home'
                },
                obj: {
                    number_id: '',
                    update: false,
                    drug_name: '',
                    spec: '',
                    place: '',
                    number: '',
                    number_unit: '',
                    selling_point: '',
                    name: '',
                    phone: '',
                    duedate: '',
                    breedId: '',
                    sheetVisible: false
                }
            }
        },
        methods: {


        },
        components: {
            imageUpload,
            needBasic,
            myHeader
        },
        created() {

        },
        mounted() {
            this.wrapperHeight = document.documentElement.clientHeight - this.$refs.wrapper.getBoundingClientRect().top;
        }
}
</script>
