<style lang="less" scoped>
input[type="text"],
input[type="submit"],
input[type="reset"],
select,
textarea {
    -webkit-appearance: none;
    border-radius: 0;
}

input {
    border: none;
    background-color: #fff;
}

.release_title {
    .box {
        background-color: #FBFBF6;
        height: 48px;
        padding: 0 15px;
        line-height: 48px;
        display: flex;
        flex-direction: row;
        img {
            height: 20px;
            margin-top: 14px;
        }
        .title {
            font-size: 16px;
            color: #7BB157;
            padding-left: 5px;
        }
        .word {
            color: #999999;
            font-size:10px;
        }
    }
}
</style>
<template>
    <div class="release_title">
        <div class="box" v-show="tab == '1'">
            <img src="/static/icon/need-title.png">
            <div class="title">基本信息</div>&nbsp;
        </div>
        <div class="box" v-show="tab == '2'">
            <img src="/static/icon/product-infor.png">
            <div class="title">产品信息</div>&nbsp;
            <div class="word">(请至少上传一张图片，图片越多越真实)</div>
        </div>
    </div>
</template>
<script>
export default {
    data() {
            return {

            }
        },
        props: {
           tab:''
        },
        methods: {


        },
        components: {

        },
        created() {

        },
        mounted() {

        }
}
</script>
