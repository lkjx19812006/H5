<template>
    <div class="content search">
        <div class="search_div">
            <div class="search_content">
                <input type="text" placeholder="请输入关键字" v-model="keyword">
                <img src="/static/images/search.png" class="search_image" v-on:click="search">
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
                        <button class="mint-button mint-button--default mint-button--small" v-for="item in todos" v-on:click="jumpRes(item)">{{item.keyWord}}</button>
                    </div>
                </div>
            </div>
            <div class="history_search_content">
                <div class="history_search_content_result">
                    <div class="history_search_content_result_title">
                        历史搜索
                    </div>
                    <div class="history_search_content_result_detail" v-show="historyArr.length>0">
                        <button class="mint-button mint-button--default mint-button--small" v-for="item in historyArr" v-on:click="jumpRes(item)">{{item.name}}</button>
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
                    <li v-for="todo in datas" class="page-loadmore-listitem list_content_item">
                        <div @click="jumpRes(todo)">
                            <img src="/static/icons/search.png">
                            <p>{{todo.keyWord}}</p>
                        </div>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>
<script>
import common from '../common/common.js'
import imageUpload from '../components/tools/imageUpload'
import httpService from '../common/httpService.js'
export default {
    data() {
            return {
                str: '',
                keyword: '',
                historyArr: [],
                todos: [],
                datas: [],
                customerId: '',
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
            },
            jumpRes(item){
                let _self = this;
                if (common.pageParam.router == 'lowPriceRes') {
                    common.$emit("setParam", 'lowPrice', item);
                    common.$emit("lowPriceRes", item);
                    window.history.go(-1);
                } else if (common.pageParam.router == 'urgentNeed') {
                    common.$emit("setParam", 'Urgentneed', item);
                    common.$emit("Urgentneed", item);
                    window.history.go(-1);
                } else if (common.pageParam.router == 'need') {
                    common.$emit("need", item);
                    window.history.go(-1);
                } else if (common.pageParam.router == 'resource') {
                    common.$emit("resource", item);
                    window.history.go(-1);
                } else if (common.pageParam.router == 'myAttention') {
                    common.$emit("setParam", 'myAttention', item);
                    common.$emit("attention", item);
                    _self.$router.push(common.pageParam.router);
                } else if (common.pageParam.router == 'supplyRelease') {
                    common.$emit("setParam", 'supplyRelease', item);
                    common.$emit("supplyRelease", item);
                    window.history.go(-1);
                }else if(common.pageParam.router == 'needRelease'){
                     common.$emit("Needrelease",item);
                     window.history.go(-1);
                }
            },
            search() {
                let _self = this;
            }
        },
        watch: {
            keyword: function(newValue, oldValue) {
                let _self = this;
                window.clearTimeout(this.time);
                this.time = setTimeout(() => {
                    httpService.searchWord(common.urlCommon + common.apiUrl.most, {
                        biz_module: 'searchKeywordService',
                        biz_method: 'querySearchKeyword',
                        biz_param: {
                            keyWord: _self.keyword,
                            pn: 1,
                            pSize: 20
                        }
                    }, function(suc) {
                        common.$emit('message', suc.data.msg);
                        let result = suc.data.biz_result.list;
                        _self.datas = result;
                    }, function(err) {
                        common.$emit('message', err.data.msg);
                    })
                }, 0)
            }
        },

        created() {
            let _self = this;
            httpService.hotSearch(common.urlCommon + common.apiUrl.most, {
                biz_module: 'searchKeywordService',
                biz_method: 'queryHotKeyword',
                biz_param: {
                    pn: 1,
                    pSize: 20
                }
            }, function(suc) {
                common.$emit('message', suc.data.msg);
                let result = suc.data.biz_result.list;
                _self.todos = result;
            }, function(err) {
                common.$emit('message', err.data.msg);
            })

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
