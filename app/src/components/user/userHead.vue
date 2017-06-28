<style lang="less" scoped>
.head {
    height: 8vh;
    background-color: #FA6705;
    display: flex;
    flex-direction: row;
    align-items: center;
    position: relative;
    .go_back {
        position: absolute;
        z-index: 20;
        left: 0;
        top: 0;
        width: 20%;
        height: 100%;
        padding-left: 5%;
        display: flex;
        flex-direction: row;
        align-items: center;
        img {
            height: 20px;
        }
    }
    .title {
        width: 100%;
        text-align: center;
        font-size: 1.7rem;
        color: #fff;
    }
}
</style>
<template>
    <div class="head">
        <div class="go_back" @click="jumpBack()">
            <img src="/static/images/go-back.png">
        </div>
        <div class="title">{{param.name}}</div>
    </div>
</template>
<script>
import common from '../../common/common.js'
import validation from '../../validation/validation.js'
import httpService from '../../common/httpService.js'
export default {
    data() {
            return {


            }
        },
        props: {
            param: {

            }
        },
        created() {

        },
        methods: {
            jumpBack() {
                let _self = this;
                window.history.go(-1);
            }
        },

}
</script>
