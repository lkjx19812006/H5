<template>
    <div class="content resource">
        <div class="fixed">
            <div @click="jumpSearch"> <search-input></search-input> </div>
            <sort></sort>
        </div>
        <div class="bg_white">
            <div class="page-loadmore-wrapper" ref="wrapper" :style="{ height: wrapperHeight + 'px' }">
                <mt-loadmore :top-method="loadTop" @top-status-change="handleTopChange" :bottom-method="loadBottom" @bottom-status-change="handleBottomChange" :bottom-all-loaded="allLoaded" ref="loadmore">
                    <ul class="page-loadmore-list">
                        <li v-for="todo in todos" class="page-loadmore-listitem list_content_item">
                            <img src="/static/images/1.jpg" class="list_images">
                            <div class="res_content">
                                <div class="res_content_center">
                                    <div><img src="/static/icons/bao.png"><img src="/static/icons/sample.png">{{todo.breedName}}</div>
                                    <p>规格：<span>{{todo.spec}}</span></p>
                                    <p>产地：<span>{{todo.location}}</span></p>
                                    <p class="time_font">发布时间：<span>{{todo.pubdate}}</span></p>
                                </div>
                                <div class="res_content_right">
                                    <p>{{todo.price}}元/kg</p>
                                    <button class="mint-button mint-button--primary mint-button--small" @click="jumpDetail(todo.id)">立即购买</button>
                                </div>
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
import httpService from '../../common/httpService.js'
export default {
    data() {
            return {
                todos: [/*{
                    "name": "人参",
                    "spec": "统货",
                    "place": "东北",
                    "price": "98.9元/kg",
                    "up_price": "9元/kg",
                    "down_price": "9元/kg",
                    "phone": "15301546832",
                    "time": "12:26"
                }*/],
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
            jumpSearch(){
                this.$router.push('search');
            },
            jumpDetail(id){
                this.$router.push('resourceDetail/' + id);
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
            /*common.$emit('show-load');
            this.$http.get(common.apiUrl.list).then((response) => {
                common.$emit('close-load');
                let data = response.data.biz_result.list;
                this.todos = data;
            }, (err) => {
                common.$emit('close-load');
                common.$emit('message', response.data.msg);
            });*/
             common.$on('post-resource', function (word){
                 
                 httpService.lowPriceRes(common.urlCommon + common.apiUrl.most, {
                        biz_module:'intentionService',
                        biz_method:'querySupplyList',            
                            biz_param: {
                                keyWord: word,
                                sort:{"shelve_time":"0","price":"0"},
                                /*location: 
                                sampling:
                                pn:1,
                                pSize:20*/
                            }
                        }, function(suc) {
                            console.log(suc)
                            common.$emit('message', suc.data.msg);
                            let result = suc.data.biz_result.list;
                            _self.todos = result;
                           
                        }, function(err) {
                            
                            common.$emit('message', err.data.msg);
                        })

             })
            
            common.$on('id-resource', function (key) {
                  httpService.lowPriceRes(common.urlCommon + common.apiUrl.most, {
                        biz_module:'intentionService',
                        biz_method:'querySupplyList',            
                            biz_param: {
                                keyWord: key,
                                sort:{"shelve_time":"0","price":"0"},
                                /*location: 
                                sampling:
                                pn:1,
                                pSize:20*/
                            }
                        }, function(suc) {
                            console.log(suc)
                            common.$emit('message', suc.data.msg);
                            let result = suc.data.biz_result.list;
                            /*for(var i=0;i<result.length;i++){

                                var item = result[i];
                                var duedate = item.duedate;
                                var pubdate = item.duedate;
                                 
                                      duedate =  duedate.replace(/-/g,'/'); 
                                      pubdate =  pubdate.replace(/-/g,'/');
                                      duedate = duedate.substring(0,10);
                                      pubdate = pubdate.substring(0,10);
                                    
                                var duedateDate = new Date(duedate);
                                var pubdateDate = new Date(pubdate);
                                var dateValue = duedateDate.getTime() - pubdateDate.getTime();
                                var days=Math.floor(dateValue/(24*3600*1000));
                                item.days = days; 
                                item.duedate = duedate;
                                item.pubdate = pubdate;
                            }*/
                            _self.todos = result;
                           
                        }, function(err) {
                            
                            common.$emit('message', err.data.msg);
                        })
            })

            httpService.lowPriceRes(common.urlCommon + common.apiUrl.most, {
                        biz_module:'intentionService',
                        biz_method:'querySupplyList',            
                            biz_param: {
                                /*keyWord: */
                                sort:{"shelve_time":"0","price":"0"},
                                /*location: 
                                sampling:
                                pn:1,
                                pSize:20*/
                            }
                        }, function(suc) {
                            console.log(suc)
                            common.$emit('message', suc.data.msg);
                            let result = suc.data.biz_result.list;
                            _self.todos = result;
                           
                        }, function(err) {
                            
                            common.$emit('message', err.data.msg);
                        })
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

.resource {}

.resource .fixed {
    position: fixed;
    width: 100%;
    z-index: 2;
    background: #fff;
}

.resource .bg_white {
    margin-top: 90px;
}

.resource .bg_white .page-loadmore-wrapper .page-loadmore-list .page-loadmore-listitem {
    float: left;
    width: 100%;
    min-height: 100px;
}

.resource .bg_white .page-loadmore-wrapper .page-loadmore-list li .list_images {
    height: 80px;
    max-width: 100px;
    left: 10px;
    margin: 10px 10px 10px 0;
    position: absolute;
}

.resource .bg_white .page-loadmore-wrapper .page-loadmore-list li div {
    float: left;
    text-align: left;
    line-height: 20px;
    font-size: 1.3rem;
    margin-bottom: 8px;
}

.resource .bg_white .page-loadmore-wrapper .page-loadmore-list li .res_content_center img {
    float: left;
    max-height: 15px;
}

.resource .bg_white .page-loadmore-wrapper .page-loadmore-list li .res_content_center p {
    float: left;
    width: 100%;
    padding-right: 90px;
    line-height: 18px;
    text-align: left;
    font-size: 1.2rem;
    color: #666;
}

.resource .bg_white .page-loadmore-wrapper .page-loadmore-list .res_content {
    width: 100%;
    padding-left: 120px;
    padding-top: 10px;
}

.resource .bg_white .page-loadmore-wrapper .page-loadmore-list .res_content .res_content_right {
    position: absolute;
    max-width: 80px;
    height: 90px;
    margin: 0;
    right: 10px;
}

.resource .bg_white .page-loadmore-wrapper .page-loadmore-list .res_content .res_content_right p {
    font-size: 1.25rem;
    margin-top: 10px;
    color: #EC6817;
}

.resource .bg_white .page-loadmore-wrapper .page-loadmore-list .res_content .res_content_right button {
    position: absolute;
    bottom: 10px;
    background: #EC6817;
    font-size: 10px;
    min-width: 60px;
    right: 0px;
    max-height: 25px;
    padding: 0 5px;
}

.resource .bg_white .page-loadmore-wrapper .page-loadmore-list .res_content .time_font {
    font-size: 1.1rem;
    color: #999;
}
</style>
