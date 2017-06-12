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
        .offer_num{
            color:#333333;
            font-size:12px;
        }
    }
}
</style>
<template>
    <div class="release_title">
        <div class="box" v-if="tab == '1'">
            <img src="/static/icon/need-title.png">
            <div class="title">基本信息</div>&nbsp;
        </div>
        <div class="box" v-if="tab == '2'">
            <img src="/static/icon/product-infor.png">
            <div class="title">产品信息</div>&nbsp;
            <div class="word">(请至少上传一张图片，图片越多越真实)</div>
        </div>
        <div class="box" v-if="tab == '3'">
            <img src="/static/icon/need-title.png">
            <div class="title">求购信息</div>&nbsp;
            <div class="offer_num">(已有<span>{{obj.content.offer}}</span>人报价)</div>
        </div>
        <div class="box" v-if="tab == '4'">
            <img src="/static/icon/new-offer.png">
            <div class="title">最新报价</div>&nbsp;
        </div>
        <div class="box" v-if="tab == '5'">
            <img src="/static/icon/history.png">
            <div class="title">历史报价</div>&nbsp;
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
           tab:'',
           obj:{

           }
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
