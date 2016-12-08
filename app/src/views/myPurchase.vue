<template>
    <div class="content my_purchase">
        <mt-header title="我的求购">
            <router-link to="/home" slot="left">
                <mt-button icon="back"></mt-button>
            </router-link>
        </mt-header>
        <otherSort></otherSort>
        <div class="bg_white">
            <div class="page-loadmore-wrapper" ref="wrapper" :style="{ height: wrapperHeight + 'px' }">
                <mt-loadmore :top-method="loadTop" @top-status-change="handleTopChange" :bottom-method="loadBottom" @bottom-status-change="handleBottomChange" :bottom-all-loaded="allLoaded" ref="loadmore">
                    <ul class="page-loadmore-list">
                        <li v-for="todo in todos" class="page-loadmore-listitem list_content_item" @click="jump(todo.router)">
                            <div class="header_list">
                                <p class="left_p">发布日期：2016-11-26</p>
                                <p class="right_p">待审核</p>
                            </div>
                            <div class="first_line">
                                <p class="left">人参</p>
                                <p class="right"><span>12</span>人已报价</p>
                            </div>
                            <div class="second_line">
                                <p class="left">规格：统货</p>
                                <p class="right">剩余：20天</p>
                            </div>
                            <div class="third_line">
                                <p class="left">产地：安徽</p>
                                <p class="right">需求数量：100天</p>
                            </div>

                            <div class="button">
                               <p class="first_button">编辑</p>
                               <p class="second_button">查看报价</p>
                            </div>
                        </li>
                    </ul>
                    <div slot="top" class="mint-loadmore-top">
                        <span v-show="topStatus !== 'loading'" :class="{ 'is-rotate': topStatus === 'drop' }">↓</span>
                        <span v-show="topStatus === 'loading'"><mt-spinner type="snake"></mt-spinner></span>
                    </div>
                    <div slot="bottom" class="mint-loadmore-bottom">
                        <span v-show="bottomStatus !== 'loading'" :class="{ 'is-rotate': bottomStatus === 'drop' }">↑</span>
                        <span v-show="bottomStatus === 'loading'"><mt-spinner type="snake"></mt-spinner></span>
                    </div>
                </mt-loadmore>
            </div>
        </div>
    </div>
</template>
<script>
import common from '../common/common.js'
import searchInput from '../components/tools/inputSearch'
import otherSort from '../components/tools/otherSort'
export default {
    data() {
            return {
                todos: [{
                    "name": "人参",
                    "spec": "统货",
                    "place": "东北",
                    "num": "12",
                    "state": "已审核",
                    "phone": "15301546832",
                    "time": "12-11-26",
                    "router":"purchaseDetail"

                    
                }],
                topStatus: '',
                wrapperHeight: 0,
                allLoaded: false,
                bottomStatus: '',
            }
        },
        components: {
            searchInput,
            otherSort
        },

        methods: {
            jump:function(router){
                this.$router.push(router);
            },
            handleBottomChange(status) {
                this.bottomStatus = status;
            },
            loadBottom(id) {
                setTimeout(() => {
                    let lastValue = this.todos[0];
                    if (this.todos.length <= 40) {
                        for (let i = 1; i <= 10; i++) {
                            this.todos.push(this.todos[0]);
                        }
                    } else {
                        this.allLoaded = true;
                    }
                    this.$refs.loadmore.onBottomLoaded(id);
                }, 1500);
            },

            handleTopChange(status) {
                this.topStatus = status;
            },
            loadTop(id) {
                setTimeout(() => {
                    let firstValue = this.todos[0];
                    for (let i = 1; i <= 10; i++) {
                        this.todos.unshift(firstValue);
                    }
                    this.$refs.loadmore.onTopLoaded(id);
                }, 1500);
            }
        },
        created() {
            let _self = this;
            common.$emit('show-load');
            this.$http.get(common.apiUrl.list).then((response) => {
                common.$emit('close-load');
                let data = response.data.biz_result.list;

            }, (err) => {
                common.$emit('close-load');
                common.$emit('message', response.data.msg);
            });
        },
        mounted() {
            this.wrapperHeight = document.documentElement.clientHeight - this.$refs.wrapper.getBoundingClientRect().top;
        }

}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.page-loadmore-listitem {
    height: 50px;
    line-height: 50px;
    border-bottom: solid 1px #eee;
    text-align: center;
    &:first-child {
        border-top: solid 1px #eee;
    }
}

.page-loadmore-wrapper {
    margin-top: -1px;
    overflow: scroll;
    padding-bottom: 10px;
    width: 100%;
}

.mint-load {
    background: #fff;
}

.mint-spinner {
    display: inline-block;
    vertical-align: middle;
}

.mint-loadmore-top span {
    display: inline-block;
    transition: .2s linear;
    vertical-align: middle;
}

.mint-loadmore-bottom span {
    display: inline-block;
    transition: .2s linear;
    vertical-align: middle;
}

.low_price {}
.my_purchase .bg_white{
    margin-top: 0.5rem;
}

.my_purchase .bg_white .page-loadmore-wrapper .mint-loadmore{
    background:#F5F5F5;
}

.my_purchase .bg_white .page-loadmore-wrapper .page-loadmore-list .page-loadmore-listitem {
    float: left;
    width: 100%;
    min-height: 170px;
    border:0;
    margin-bottom: 1rem;

}
.my_purchase .bg_white .page-loadmore-wrapper .page-loadmore-list li{
    margin-bottom: 1rem;
    background:white;
    padding: 0 1.5rem;
}
.my_purchase .bg_white .page-loadmore-wrapper .page-loadmore-list li .header_list{
    height:2.9rem;
    text-align: left;
    border-bottom:1px solid #E4E4E4;
    line-height: 2.9rem;
}
.my_purchase .bg_white .page-loadmore-wrapper .page-loadmore-list li .header_list .left_p{
    float:left;
    font-size: 0.9rem;
    color:#999999;
}
.my_purchase .bg_white .page-loadmore-wrapper .page-loadmore-list li .header_list .right_p{
    float:right;
    font-size: 1rem;
    color:#FA6705;
}
.my_purchase .bg_white .page-loadmore-wrapper .page-loadmore-list li  .first_line{
    /*border: 1px solid red;*/
    /*width:100%;
    text-align: left;*/
    height:4.4rem;

}
.my_purchase .bg_white .page-loadmore-wrapper .page-loadmore-list li .first_line .left{
    float:left;
    text-align: left;
    font-size: 1.4rem;
    color:#333333;
    /*border: 1px solid red;*/
}
.my_purchase .bg_white .page-loadmore-wrapper .page-loadmore-list li .first_line .right{
    float:right;
    text-align: right;
    font-size: 1.1rem;
    color:#666666;
    /*border: 1px solid red;*/
}
.my_purchase .bg_white .page-loadmore-wrapper .page-loadmore-list li .first_line .right span{
    color:#FA6705;
}
.my_purchase .bg_white .page-loadmore-wrapper .page-loadmore-list li  .second_line{ 
    height:1rem;
    margin-bottom: 0.5rem;
}
.my_purchase .bg_white .page-loadmore-wrapper .page-loadmore-list li  .third_line{
    height:1rem;
    margin-bottom: 1.5rem;
}
.my_purchase .bg_white .page-loadmore-wrapper .page-loadmore-list li .second_line .left,.my_purchase .bg_white .page-loadmore-wrapper .page-loadmore-list li .third_line .left{
    float:left;
    text-align: left;
    font-size: 1rem;
    line-height: 1rem;
    color:#666666;
}
.my_purchase .bg_white .page-loadmore-wrapper .page-loadmore-list li .second_line .right,.my_purchase .bg_white .page-loadmore-wrapper .page-loadmore-list li .third_line .right{
    float:right;
    text-align: right;
    font-size: 1rem;
    color:#666666;
    line-height: 1rem;
}
.my_purchase .bg_white .page-loadmore-wrapper .page-loadmore-list li .button{
    float:right;
    height:2rem;
    /*border:1px solid red;*/
    text-align: center;
    line-height: 2rem;
    font-size: 1.1rem;
}
.my_purchase .bg_white .page-loadmore-wrapper .page-loadmore-list li .button .first_button{
    width:3.6rem;
    height:2rem;
    border:1px solid #BFBFBF;
    border-radius: 3px;
    float:left;
    margin-right: 1rem;
    
}
.my_purchase .bg_white .page-loadmore-wrapper .page-loadmore-list li .button .second_button{
    width:5.5rem;
    height:2rem;
    border:1px solid #BFBFBF;
    float:right;
    border-radius: 3px;
}











</style>
