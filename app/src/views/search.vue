<template>
    <div class="content search">
        <div class="search_div">
            <div class="search_content">
                <input type="text" placeholder="请输入关键字" v-model="keyword">
                <img src="/static/images/search.png" class="search_image">
            </div>
            <span @click="back()">取消</span>
        </div>
        <div v-show="!keyword">
            <div class="history_search_content hot_div">
                <div class="history_search_content_result">
                    <div class="history_search_content_result_title">
                        热门搜索
                    </div>
                    <div class="history_search_content_result_detail">
                        <button class="mint-button mint-button--default mint-button--small" v-for="item in todos">{{item.name}}</button>
                    </div>
                </div>
            </div>
            <div class="history_search_content">
                <div class="history_search_content_result">
                    <div class="history_search_content_result_title">
                        历史搜索
                    </div>
                    <div class="history_search_content_result_detail" v-show="historyArr.length>0">
                        <button class="mint-button mint-button--default mint-button--small" v-for="item in historyArr">{{item.name}}</button>
                        <div class="clear_result">
                            <div class="click_district" @click="clearResult()"><img src="/static/icons/resource.png"><span>清空历史搜索</span></div>
                        </div>
                    </div>
                    <div class="history_search_content_result_detail" v-show="historyArr.length==0">
                        暂无记录
                    </div>
                </div>
            </div>
        </div>
        <div v-show="keyword">
            <div class="search_result">
                <ul class="page-loadmore-list">
                    <li v-for="todo in todos" class="page-loadmore-listitem list_content_item">
                        <div>
                            <img src="/static/icons/search.png">
                            <p>{{todo.name}}</p>
                        </div>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>
<script>
import common from '../common/common.js'

export default {
    data() {
            return {
                keyword: '',
                historyArr: [{
                    name: '人参'
                }, {
                    name: '千年人参'
                }, {
                    name: '人参'
                }, {
                    name: '人参人参'
                }, {
                    name: '人参'
                }, {
                    name: '千年人参'
                }, {
                    name: '人参'
                }, {
                    name: '人参人参'
                }, {
                    name: '人参人参'
                }, {
                    name: '人参人参'
                }, {
                    name: '人参人参'
                }, {
                    name: '人参人参'
                }, {
                    name: '人参人参'
                }, {
                    name: '人参人参'
                }, {
                    name: '人参人参'
                }, {
                    name: '人参人参'
                }, {
                    name: '人参人参'
                }, {
                    name: '人参人参'
                }, {
                    name: '人参人参'
                }],
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
                searchArr: [{
                    "name": "人参",
                    "spec": "统货",
                    "place": "东北",
                    "price": "98.9元/kg",
                    "up_price": "9元/kg",
                    "down_price": "9元/kg",
                    "phone": "15301546832",
                    "time": "12:26"
                }, {
                    "name": "人参",
                    "spec": "统货",
                    "place": "东北",
                    "price": "98.9元/kg",
                    "up_price": "9元/kg",
                    "down_price": "9元/kg",
                    "phone": "15301546832",
                    "time": "12:26"
                }, {
                    "name": "人参",
                    "spec": "统货",
                    "place": "东北",
                    "price": "98.9元/kg",
                    "up_price": "9元/kg",
                    "down_price": "9元/kg",
                    "phone": "15301546832",
                    "time": "12:26"
                }]
            }

        },
        methods: {
            back: function() {
                this.$router.go(-1);
            },
            clearResult: function() {
                this.historyArr = [];
            }
        },
        watch: {
            keyword: function(newValue, oldValue) {
                console.log(newValue);
                console.log(oldValue);
                window.clearTimeout(this.time);
                this.time = setTimeout(() => {
                    console.log('dssdsdsd');
                }, 500)
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

            _self.time = setTimeout(() => {
                console.log('dssdsdsd');
            }, 500)

        }
}
</script>
<style scoped>
.search {
    background: #F1EFEF;
}

.search .search_div {
    height: 40px;
    position: fixed;
    background: #fff;
    border-bottom: 1px solid #ccc;
    top: 0;
    width: 100%;
    z-index: 2;
}

.search .search_result {
    margin-top: 40px;
    background-color: #fff;
}

.search .search_result ul li {
    min-height: 40px;
    border-bottom: 1px solid #ccc;
    margin: 0 15px;
}

.search .search_result ul li div {
    font-size: 1.3rem;
    line-height: 40px;
    text-align: left;
    float: left;
    color: #666;
}

.search .search_result ul li div img {
    max-height: 20px;
    margin-top: 10px;
    float: left;
}

.search .search_result ul li div p {
    float: left;
    margin-left: 15px;
}

.search .search_div .search_content {
    background: #F1EFEF;
    height: 30px;
    margin: 5px 65px 5px 15px;
    border-radius: 10px;
}

.search .search_div .search_content input {
    background-color: #F1EFEF;
    height: 30px;
    position: absolute;
    left: 32px;
    border: none;
}

.search .search_div span {
    position: absolute;
    height: 30px;
    top: 5px;
    right: 15px;
    width: 40px;
    line-height: 30px;
    color: #333;
    font-size: 1.4rem;
    font-weight: 400;
}

.search .search_div .search_content img {
    float: right;
    max-height: 20px;
    margin: 5px 10px 0 0;
}

.search .history_search_content {
    margin-top: 20px;
    float: left;
    width: 100%;
    background: #fff;
    padding-bottom: 10px;
}

.search .hot_div {
    margin-top: 40px;
}

.search .history_search_content .history_search_content_result {
    margin: 15px;
}

.search .history_search_content .history_search_content_result .history_search_content_result_title {
    text-align: left;
    font-size: 1.6rem;
    color: #333;
    font-weight: 400;
}

.search .history_search_content .history_search_content_result .history_search_content_result_detail {
    float: left;
    width: 100%;
    padding: 10px;
}

.search .history_search_content .history_search_content_result .history_search_content_result_detail .clear_result {
    margin-top: 20px;
    float: left;
    width: 100%;
    text-align: right;
}

.search .history_search_content .history_search_content_result .history_search_content_result_detail .clear_result .click_district {
    float: right;
    padding: 5px;
}

.search .history_search_content .history_search_content_result .history_search_content_result_detail .clear_result img {
    max-height: 15px;
    margin-right: 8px;
}

.search .history_search_content .history_search_content_result .history_search_content_result_detail button {
    float: left;
    margin: 20px 10px 0 0;
}
</style>
