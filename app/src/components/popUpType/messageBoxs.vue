<style lang="less" scoped>
input[type="text"],
input[type="submit"],
input[type="reset"],
select,
textarea {
    -webkit-appearance: none;
    border-radius: 0;
}

input,
textarea {
    border: none;
    background-color: #fff;
}

.release_offer {
    position: relative;
    height: 100vh;
    .main {
        padding-bottom: 100px;
    }
    .box {
        padding: 20px 15px;
        background-color: #fff;
        .images {
            width: 80px;
        }
    }
    .img {
        width: 100%;
        background-color: #fff;
        padding: 20px 15px;
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        .img_box {
            position: relative;
            margin-right: 30px;
            .my_img {
                width: 80px;
                height: 80px;
            }
            .delete {
                position: absolute;
                width: 20px;
                height: 20px;
                top: -10px;
                left: -10px;
            }
            margin-bottom:15px;
        }
        .up_load {
            width: 80px;
            height: 80px;
            margin-right: 30px;
            margin-bottom: 15px;
        }
    }
    .confirm {
        position: absolute;
        bottom: 0;
        height: 50px;
        width: 100%;
        background-color: #FA6705;
        font-size: 17px;
        line-height: 50px;
        text-align: center;
        color: #fff;
    }
    .sample_offer {
        margin-bottom: 10px;
    }
    .black {
        width: 100%;
        height: 100vh;
        position: absolute;
        z-index: 3000;
        background-color: #000;
        top: 0;
        opacity: 0.6;
    }
    .message_box {
        position: absolute;
        width: 76%;
        margin-left: -38%;
        margin-top: -140px;
        top: 50%;
        left: 50%;
        z-index: 3001;
        border-radius: 6px;
        overflow: hidden;
        .top {
            font-size: 18px;
            line-height: 18px;
            padding: 11px 0;
            color: #FA6705;
            background-color: #E6E6E6;
        }
        .center {
            padding: 10px;
            min-height: 60px;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 14px;
            color: #000;
            background-color: #fff;
        }
        .bottom {
            display: flex;
            width: 100%;
            flex-direction: row;
            align-items: center;
            justify-content: center;
            .button {
                flex: 1;
                line-height: 40px;
                border-top: 1px solid #E6E6E6;
                height: 40px;
            }
            .left {
                color: #000;
                background-color: #fff;
            }
            .right {
                color: #fff;
                border-top: 1px solid #FA6705;
                background-color: #FA6705;
            }
        }
    }
}
</style>
<template>
    <div>
        <div class="message_box">
            <div class="top">{{message.title}}</div>
            <div class="center">
                <div class="content">
                    {{message.content}}
                </div>
            </div>
            <div class="bottom">
                <div class="button left" @click="encancel">{{message.canceltext}}</div>
                <div class="button right" @click="ensure">{{message.confirmtext}}</div>
            </div>
        </div>
        <div class="black">
    
        </div>
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
        message: {
            title: '修改报价',
            content: '确定修改报价信息后将等待审核！',
            canceltext: '再想想',
            confirmtext: '确认'
        }
    },
    methods: {
        ensure() {
            this.$emit('mySure');
        },
        encancel(){
            this.$emit('myCancel');
        }
    },
    created() {

    },
    mounted() {
        
    }
}
</script>
