<template>
    <div class="content transaction">
        <mt-header title="实时成交">
            <router-link to="/home" slot="left">
                <mt-button icon="back"></mt-button>
            </router-link>
        </mt-header>
        <div class="transaction_title"> *查看最新成交信息，坐等客户上门！</div>
        <div class="bg_white">
            <div class="list_head">
                <div class="list_font">品种</div>
                <div class="list_font">规格</div>
                <div class="list_font">数量</div>
                <div class="list_font">产地</div>
                <div class="list_font">成交时间</div>
            </div>
            <div class="page-loadmore-wrapper" ref="wrapper" :style="{ height: wrapperHeight + 'px' }">
                <mt-loadmore :top-method="loadTop" @top-status-change="handleTopChange" :bottom-method="loadBottom" @bottom-status-change="handleBottomChange" :bottom-all-loaded="allLoaded" ref="loadmore">
                    <ul class="page-loadmore-list">
                        <li v-for="todo in todos" class="page-loadmore-listitem list_content_item">
                            <div class="list_font">{{todo.name}}</div>
                            <div class="list_font">{{todo.spec}}</div>
                            <div class="list_font">{{todo.place}}</div>
                            <div class="list_font">{{todo.time}}</div>
                            <div class="list_font">{{todo.time}}</div>
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
export default {
    data() {
            return {
                msg: 'Welcome to Your Vue.js App',
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
        methods: {
            handleBottomChange(status) {
                this.bottomStatus = status;
            },
            loadBottom(id) {
                console.log('sdfsdfsdf');
                console.log(this.allLoaded);
                setTimeout(() => {
                    let lastValue = this.todos[0];
                     console.log(this.allLoaded);
                     console.log(this.todos.length);
                    if (this.todos.length <= 40) {
                        for (let i = 1; i <= 10; i++) {
                            this.todos.push(this.todos[0]);
                        }
                    } else {
                        this.allLoaded = true;
                    }
                      console.log(this.allLoaded);
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

.transaction {}

.transaction_title {
    text-align: center;
    color: #FA6705;
    font-size: 1.1rem;
    height: 40px;
    line-height: 40px;
}

.transaction .bg_white .list_head {
    border-bottom: 1px solid #ddd;
    min-height: 40px;
    line-height: 40px;
    font-size: 1.3rem;
    color: #333;
    font-weight: 400;
}

.transaction .bg_white .list_head .list_font {
    width: 20%;
    float: left;
}

.transaction .bg_white  .list_font {
    width: 20%;
    float: left;
}

.transaction .bg_white  .list_content_item {
    font-size: 1.1rem;
    color: #666;
}
</style>
