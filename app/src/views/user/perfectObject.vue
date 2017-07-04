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

.perfect_obj {
    background-color: #F5F5F5;
    position: relative;
    height: 100vh;
    .box {
        background-color: #F5F5F5;
        padding-top: 20px;
        padding-bottom: 30px;
        height: 92vh;
        overflow-y: scroll;
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
    .select {
        margin-top: 29px;
        img {
            width: 80px;
            height: 80px;
        }
        .name {
            font-size: 15px;
            line-height: 15px;
            margin-top: 10px;
        }
    }
}
</style>
<template>
    <div class="perfect_obj">
        <userHead :param="param"></userHead>
        <div class="box" ref="wrapper">
            <div class="title_1">请完善以下信息</div>
            <div class="title_2">我们将更好的为您提供有价值的服务</div>
            <div class="select" v-for="todo in arr">
                <img :src="todo.url" @click="jump(todo)">
                <div class="name">{{todo.name}}</div>
            </div>
        </div>
    </div>
</template>
<script>
import common from '../../common/common.js'
import validation from '../../validation/validation.js'
import httpService from '../../common/httpService.js'
import userHead from '../../components/user/userHead'
export default {
    data() {
            return {
                param: {
                    name: '完善身份',
                },
                arr: [{
                    url: '/static/icon/buy-man.png',
                    name: '我是买家',
                    userType:'1',
                }, {
                    url: '/static/icon/sell-man.png',
                    name: '我是卖家',
                    userType:'2',
                }, {
                    url: '/static/icon/sellorbuy-man.png',
                    name: '我是买卖方',
                    userType:'3',
                }],
            }
        },
        components: {
            userHead
        },
        created() {
            
        },
        methods: {
            jump(todo) {
                localStorage.setItem('userType',todo.userType);
                common.$emit('go_perfectId',todo.userType);
                this.$router.push('/perfectId?type='+todo.userType);
            },
        },
        mounted() {
            // this.wrapperHeight = document.documentElement.clientHeight - this.$refs.wrapper.getBoundingClientRect().top;
            //this.wrapperHeight = window.screen.height - this.$refs.wrapper.getBoundingClientRect().top;
            //alert()
        }
}
</script>
