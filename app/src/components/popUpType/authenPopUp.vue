<style lang="less" scoped>
.select_type {
    position: absolute;
    left: 50%;
    min-height: 200px;
    background-color: #fff;
    border-radius: 4px;
    margin-left: -132px;
    width: 264px;
    top: 20%;
    z-index: 3001;
    padding-top: 30px;
    .name {
        font-size: 18px;
        line-height: 18px;
        color: #FF8A00;
        font-weight:bold;
        margin-bottom: 10px;
    }
    .content {
        font-size: 13px;
        line-height: 13px;
        color: #333333;
        margin-bottom: 30px;
    }
    .type_one,
    .type_two {
        height: 40px;
        font-size: 18px;
        line-height: 40px;
        text-align: center;
        width: 80%;
        margin: 0 auto;
        border-radius: 20px;
        color:#fff;
    }
    .type_one {
        background-color: #FFC000;
        margin-bottom: 20px;
        margin-top:20px;
    }
    .type_two {
        background-color: #FF9C00;
    }
}
</style>
<template>
    <div class="select_type" v-show="param.selectType">
        <div class="name">选择认证</div>
        <div class="type_one" @click="person">个人认证</div>
        <div class="type_two" @click="company">企业认证</div>
    </div>
</template>
<script>
import common from '../../common/common.js'
import httpService from '../../common/httpService.js'
import filters from '../../filters/filters'
export default {
    data() {
            return {


            }
        },
        props: {
            param: {

            }
        },
        methods: {
            person() {
                let _self = this;
                _self.$router.push('/personalStep1');
            },
            company() {
                let _self = this;
                _self.$router.push('/companyAuth');
            }
        },
        created() {
            let _self = this;

        }
}
</script>
