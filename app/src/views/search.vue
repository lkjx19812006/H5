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
                        <button class="mint-button mint-button--default mint-button--small" v-for="item in todos"  v-on:click="jumpRes(item.keyWord)">{{item.keyWord}}</button>
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
                    <li v-for="todo in datas" class="page-loadmore-listitem list_content_item">
                        <div @click = "jump(todo.keyWord)">
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
                str:'',
                keyword: '',
                historyArr: [],
                todos: [],
                datas:[],
                customerId:'',
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
            jump(key){
                let _self = this;
                /*if(_self.str == 0){
                      _self.$router.push('lowPriceRes');
                }else if(_self.str == 1){
                      _self.$router.push('urgentNeed');
                }*/
               this.$router.go(-1);
                

                common.$emit('id-lowprice', key);
                common.$emit('id-urgentneed', key);

                common.$emit('id-resource', key);
                common.$emit('id-need', key);
            },
            jumpRes(item){
                this.$router.go(-1);
                common.$emit('post-lowprice',item);
                common.$emit('post-urgentneed',item);
                
                common.$emit('post-resource', item);
                common.$emit('post-need', item);

            },
            search(){
                let _self = this;
                //搜索分词接口
                
                 //搜索记录保存接口
                 /*httpService.searchWord(common.urlCommon + common.apiUrl.most, {
                        biz_module:'searchKeywordService',
                        biz_method:'saveSearchRecord',
              
                            biz_param: {
                                uid:_self.customerId,
                                keyWord:_self.keyword,
                                type:0,
                                isResult:

                            }
                        }, function(suc) {
                            
                            common.$emit('message', suc.data.msg);
                            
                            
                            
                        }, function(err) {
                            
                            common.$emit('message', err.data.msg);
                        })*/

            }
        },
        watch: {
            keyword: function(newValue, oldValue) {
                //console.log(newValue);
                //console.log(oldValue);
                let _self = this;
                window.clearTimeout(this.time);
                this.time = setTimeout(() => {
                    //console.log('dssdsdsd');
                  
                   //搜索分词
                    httpService.searchWord(common.urlCommon + common.apiUrl.most, {
                        biz_module:'searchKeywordService',
                        biz_method:'querySearchKeyword',
              
                            biz_param: {
                                keyWord:_self.keyword,
                                pn:1,
                                pSize:20
                            }
                        }, function(suc) {
                            
                            common.$emit('message', suc.data.msg);
                            
                            console.log(suc.data.biz_result.list)
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
            
            /*var str = _self.$route.fullPath;
            var id = str.substring(8,str.length);
            _self.str = id;
               console.log(id)*/
            /*common.$emit('show-load');
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
            }, 500)*/
                //热搜接口
                httpService.hotSearch(common.urlCommon + common.apiUrl.most, {
                        biz_module:'searchKeywordService',
                        biz_method:'queryHotKeyword',
              
                            biz_param: {
                                
                                pn:1,
                                pSize:20
                            }
                        }, function(suc) {
                            
                            common.$emit('message', suc.data.msg);
                            let result = suc.data.biz_result.list;
                            //console.log(result)
                            _self.todos = result;
                        }, function(err) {
                            
                            common.$emit('message', err.data.msg);
                        })

                
                /*common.$emit('show-load');
                  let url=common.addSID(common.urlCommon+common.apiUrl.most);
                  let body={biz_module:'userService',biz_method:'queryUserInfo',version:1,time:0,sign:'',biz_param:{
                  }};
                  
                  body.time=Date.parse(new Date())+parseInt(common.difTime);
                  body.sign=common.getSign('biz_module='+body.biz_module+'&biz_method='+body.biz_method+'&time='+body.time);
                  httpService.queryUserInfo(url,body,function(suc){
                    common.$emit('close-load');
                    console.log(suc.data);
                    let result = suc.data.biz_result;
                    _self.customerId = result.customerId;
                    common.$emit('message', suc.data.msg);
                    
                  },function(err){
                    common.$emit('close-load');
                    common.$emit('message', err.data.msg);
                  })
*/
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
