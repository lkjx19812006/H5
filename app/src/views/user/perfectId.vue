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
}

.perfect_id {
    background-color: #F5F5F5;
    position: relative;
    height: 100vh;
    .box {
        background-color: #F5F5F5;
        padding-top: 20px;
        padding-bottom: 30px;
        height: 92vh;
        overflow-y: auto;
    }
    .title_1 {
        padding-top: 20px;
        font-size: 17px;
        color: #0C9E4C;
        line-height: 17px;
    }
    .title_2 {
        font-size: 14px;
        line-height: 14px;
        color: #808080;
        margin-top: 10px;
        margin-bottom: 5px;
    }
    .list {
        margin-top:36px;
        width: 100%;
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;

        .item {
            width: 50%;
            padding: 0 9px 0 18px;
            margin-bottom:16px;
        }
        .active {
            width: 50%;
            padding: 0 18px 0 9px;
            margin-bottom:16px;
        }
        .inbox {
            height: 36px;
            line-height:36px;
            color:#000;
            font-size:15px;
            border: 1px solid #ccc;
            border-radius: 18px;
            background-color:#fff;
        }
        .selected{
            height: 36px;
            line-height:36px;
            color:#fff;
            font-size:15px;
            border: 1px solid #ccc;
            border-radius: 18px;
            background-color:#FA6705;
        }
    }
    .footer {
        height: 8vh;
        width: 100%;
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;
        font-size: 15px;
        color: #fff;
        div {
            flex: 1;
            height: 100%;
            line-height: 8vh;
        }
        .back {
            background-color: #FFC600;
        }
        .next {
            background-color: #FA6705;
        }
    }
}
</style>
<template>
    <div class="perfect_id">
        <div class="box">
            <div class="title_1">请完善以下信息</div>
            <div class="title_2">我们希望为您提供更好更快的服务</div>
            <div class="list">
                <div class="item" v-for="(todo,index) in arr" v-bind:class="{active:index%2==1}">
                    <div class="inbox" @click="select(todo)" v-bind:class="{selected:todo.show}">
                        {{todo.name}}
                    </div>
                </div>
            </div>
        </div>
        <div class="footer">
            <div class="back" @click="back">返回选择身份</div>
            <div class="next" @click="next">下一步</div>
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
                arr: [{
                    show: false,
                    name: '产地药农'
                }, {
                    show: false,
                    name: '合作社'
                }, {
                    show: false,
                    name: '贸易商'
                }, {
                    show: false,
                    name: '产地药农'
                }, {
                    show: false,
                    name: '合作社'
                }, {
                    show: false,
                    name: '贸易商'
                }, {
                    show: false,
                    name: '产地药农'
                }, {
                    show: false,
                    name: '合作社'
                }, {
                    show: false,
                    name: '贸易商'
                }, {
                    show: false,
                    name: '产地药农'
                }, {
                    show: false,
                    name: '合作社'
                }, {
                    show: false,
                    name: '贸易商'
                }, {
                    show: false,
                    name: '产地药农'
                }, {
                    show: false,
                    name: '合作社'
                }]
            }
        },
        components: {

        },
        created() {

        },
        methods: {
             select(todo){
                let _self = this;
                for(var i=0;i<_self.arr.length;i++){
                    _self.arr[i].show = false;
                }
                todo.show = true;
             },
             back(){
                this.$router.push('/perfectObject')
             },
             next(){
                this.$router.push('/majorBusiness')
             }
        },
        mounted() {
            // this.wrapperHeight = document.documentElement.clientHeight - this.$refs.wrapper.getBoundingClientRect().top;
            //this.wrapperHeight = window.screen.height - this.$refs.wrapper.getBoundingClientRect().top;
            //alert()
        }
}
</script>
