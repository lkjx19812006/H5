<template>
    <div class="content need">
        <div class="fixed">
            <search-input></search-input>
            <sort></sort>
        </div>
        <div class="bg_white">
            <div class="page-loadmore-wrapper" ref="wrapper" :style="{ height: wrapperHeight + 'px' }">
                <mt-loadmore :top-method="loadTop" @top-status-change="handleTopChange" :bottom-method="loadBottom" @bottom-status-change="handleBottomChange" :bottom-all-loaded="allLoaded" ref="loadmore">
                    <ul class="page-loadmore-list">
                        <li v-for="todo in todos" class="page-loadmore-listitem list_content_item">
                            <div class="flag"><img src="/static/icons/england.png"><span>英国</span></div>
                            <div class="center">
                                <div class="title">
                                    <div><img src="/static/icons/impatient.png"><span>{{todo.name}}</span></div>
                                    <p>发布时间：{{todo.time}}</p>
                                </div>
                                <div class="detail">
                                    <p>规格：{{todo.spec}}</p>
                                    <p>剩余：<span>26</span>天</p>
                                </div>
                                <div class="detail">
                                    <p>产地：{{todo.place}}</p>
                                    <p>需求数量：100kg</p>
                                </div>
                            </div>
                            <div class="bottom">
                                <p>已报价<span>10</span>人</p>
                                <button class="mint-button mint-button--primary mint-button--small">我要报价</button>
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
import common from '../../common/common.js'
import searchInput from '../../components/tools/inputSearch'
import sort from '../../components/tools/sort'
export default {
    data() {
            return {
                todos: [{
                    "name": "人参",
                    "spec": "统货",
                    "place": "东北",
                    "price": "98.9元/kg",
                    "up_price": "9元/kg",
                    "down_price": "9元/kg",
                    "phone": "15301546832",
                    "time": "12:26"
                }],
                topStatus: '',
                wrapperHeight: 0,
                allLoaded: false,
                bottomStatus: '',
            }
        },
        components: {
            searchInput,
            sort
        },
        methods: {
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
                this.todos = data;
            }, (err) => {
                common.$emit('close-load');
                common.$emit('message', response.data.msg);
            });
        },
        mounted() {
            this.wrapperHeight = document.documentElement.clientHeight - this.$refs.wrapper.getBoundingClientRect().top-130;
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

.need {
   
}

.need .fixed{
    position: fixed;
    width: 100%;
    z-index: 2;
    background: #fff;
}

.need .bg_white{
    margin-top: 90px;
}

.need .bg_white .page-loadmore-wrapper .page-loadmore-list .page-loadmore-listitem {
    float: left;
    width: 100%;
    min-height: 100px;
    padding: 10px;
    height: auto;
}

.need .bg_white .page-loadmore-wrapper .page-loadmore-list .page-loadmore-listitem .flag {
    float: left;
    width: 100%;
    padding-bottom: 10px;
    line-height: 17px;
    text-align: left;
    border-bottom: 1px solid #ddd;
}

.need .bg_white .page-loadmore-wrapper .page-loadmore-list .page-loadmore-listitem .flag img {
    max-height: 15px;
    float: left;
}

.need .bg_white .page-loadmore-wrapper .page-loadmore-list .page-loadmore-listitem .flag span {
    margin-left: 5px;
    color: #666;
    font-size: 1rem;
}

.need .bg_white .page-loadmore-wrapper .page-loadmore-list .page-loadmore-listitem .bottom {
    float: left;
    width: 100%;
    margin-top: 10px;
}

.need .bg_white .page-loadmore-wrapper .page-loadmore-list .page-loadmore-listitem .bottom p {
    line-height: 24px;
    float: left;
    font-size: 1.2rem;
    color: #666;
}

.need .bg_white .page-loadmore-wrapper .page-loadmore-list .page-loadmore-listitem .bottom span {
    color: #EC6817;
}

.need .bg_white .page-loadmore-wrapper .page-loadmore-list .page-loadmore-listitem .bottom button {
    float: right;
    background: #EC6817;
    font-size: 10px;
    min-width: 60px;
    max-height: 25px;
    padding: 0 5px;
    border: none;
    color: #fff;
    line-height: 0;
}

.need .bg_white .page-loadmore-wrapper .page-loadmore-list .page-loadmore-listitem .center {
    float: left;
    width: 100%;
    border-bottom: 1px solid #ddd;
    padding-bottom: 10px;
}

.need .bg_white .page-loadmore-wrapper .page-loadmore-list .page-loadmore-listitem .center div {
    float: left;
}

.need .bg_white .page-loadmore-wrapper .page-loadmore-list .page-loadmore-listitem .center .title {
    width: 100%;
    font-size: 1.3rem;
    color: #333;
    line-height: 15px;
    margin: 10px 0;
}

.need .bg_white .page-loadmore-wrapper .page-loadmore-list .page-loadmore-listitem .center .title p {
    float: right;
    font-size: 1rem;
    color: #999;
}

.need .bg_white .page-loadmore-wrapper .page-loadmore-list .page-loadmore-listitem .center .title img {
    max-height: 15px;
}

.need .bg_white .page-loadmore-wrapper .page-loadmore-list .page-loadmore-listitem .center .detail {
    width: 100%;
    line-height: 18px;
}

.need .bg_white .page-loadmore-wrapper .page-loadmore-list .page-loadmore-listitem .center .detail p {
    float: left;
    font-size: 1.2rem;
    color: #666;
}

.need .bg_white .page-loadmore-wrapper .page-loadmore-list .page-loadmore-listitem .center .detail span {
    color: #EC6817;
}

.need .bg_white .page-loadmore-wrapper .page-loadmore-list .page-loadmore-listitem .center .detail p:last-child {
    float: right;
}
</style>
