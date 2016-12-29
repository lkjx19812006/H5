<template>
    <div class="content urgent_need">
        <mt-header title="紧急求购">
            <router-link to="/home" slot="left">
                <mt-button icon="back"></mt-button>
            </router-link>
        </mt-header>
        <div @click="jumpSearch"><search-input ></search-input></div>
        <sort  v-on:postId="getId" :sortRouter="sortRouter" :paramArr="sortArr"></sort>
        <div class="bg_white">
            <div class="page-loadmore-wrapper" ref="wrapper" :style="{ height: wrapperHeight + 'px' }">
                <mt-loadmore :top-method="loadTop" @top-status-change="handleTopChange" :bottom-method="loadBottom" @bottom-status-change="handleBottomChange" :bottom-all-loaded="allLoaded" ref="loadmore">
                    <ul class="page-loadmore-list">
                        <li v-for="todo in todos" class="page-loadmore-listitem list_content_item">
                            <div class="flag"><img src="/static/icons/england.png"><span>{{todo.country}}</span></div>
                            <div class="center">
                                <div class="title">
                                    <div><img src="/static/icons/impatient.png"><span>{{todo.breedName}}</span></div>
                                    <p>发布时间：{{todo.pubdate}}</p>
                                </div>
                                <div class="detail">
                                    <p>规格：{{todo.spec}}</p>
                                    <p>剩余：<span>{{Number(todo.days)}}</span>天</p>
                                </div>
                                <div class="detail">
                                    <p>产地：{{todo.location}}</p>
                                    <p>需求数量：{{todo.number}}{{todo.unit}}</p>
                                </div>
                            </div>
                            <div class="bottom">
                                <p>已报价<span>{{todo.offer}}</span>人</p>
                                <button class="mint-button mint-button--primary mint-button--small" @click="jumpDetail(todo.id)">我要报价</button>
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
import sort from '../components/tools/sort'
import httpService from '../common/httpService.js'
export default {
    data() {
            return {
                sortRouter:'urgentNeed',
                sortArr:  [{
                    name: '上架时间',
                    asc: 'top',
                    url: '/static/icons/drop_down.png',
                    saveName: '上架时间',
                    class: 'sort_content_detail',
                    sortArr: [{
                        name: '由新到旧',
                        asc: 'low',
                        show: false,
                        time:1,
                        key:'time'
                    }, {
                        name: '由旧到新',
                        asc: 'top',
                        show: false,
                        time:2,
                        key:'time'
                    }, {
                        name: '全部',
                        asc: '',
                        show: false,
                        time:0,
                        key:'time'
                    }]
                }, {
                    name: '报价人数',
                    asc: 'top',
                    url: '/static/icons/drop_down.png',
                    saveName: '报价人数',
                    class: 'sort_content_detail',
                    sortArr: [{
                        name: '由少到多',
                        asc: 'low',
                        show: false,
                        price:1,
                        key:'price'
                    }, {
                        name: '由多到少',
                        asc: 'top',
                        show: false,
                        price:2,
                        key:'price'
                    }, {
                        name: '全部',
                        asc: '',
                        show: false,
                        price:0,
                        key:'price'
                    }]
                }, {
                    name: '剩余时间',
                    asc: 'top',
                    url: '/static/icons/drop_down.png',
                    saveName: '剩余时间',
                    class: 'sort_content_detail',
                    sortArr: [{
                        name: '由短到长',
                        asc: 'low',
                        show: false,
                        sample:1,
                        key:'sample'
                    }, {
                        name: '由长到短',
                        asc: 'top',
                        show: false,
                        sample:0,
                        key:'sample'
                    }, {
                        name: '全部',
                        asc: '',
                        show: false,
                        sample:'',
                        key:'sample'
                    }]
                }, {
                    name: '产地',
                    asc: 'location',
                    url: '/static/icons/screen.png',
                    class: 'sort_content_detail',
                }],
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
                
                value: {
                    time:0,
                    price:0,
                    sample:''
                },      
                keyword:'',
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
            getHttp(word,shelve_time,price,sampling){

                 let _self = this;
                 httpService.lowPriceRes(common.urlCommon + common.apiUrl.most, {
                        biz_module:'intentionService',
                        biz_method:'queryBegBuyList',
              
                            biz_param: {
                                keyWord: word,
                                sort:{"shelve_time":shelve_time,"price":price},
                                
                                sampling:sampling,
                                pn:1,
                                pSize:20
                            }
                        }, function(suc) {
                            console.log(suc)
                            common.$emit('message', suc.data.msg);
                            let result = suc.data.biz_result.list;
                            for(var i=0;i<result.length;i++){

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
                            }
                            
                        _self.todos = result;       
                           
                        }, function(err) {
                            
                            common.$emit('message', err.data.msg);
                        })
            },
            getId(param){
                 let _self = this;
                  
                  _self.value[param.key] = param[param.key];
                  _self.getHttp(_self.keyword,_self.value.time,_self.value.price,_self.value.sample)
                  

            },
            jumpDetail(id) {
                let _self = this;
                httpService.myAttention(common.urlCommon + common.apiUrl.most, {
                        biz_module:'intentionService',
                        biz_method:'queryIntentionInfo',
              
                            biz_param: {
                                id:id
                            }
                        }, function(suc) {
                            
                            common.$emit('message', suc.data.msg);
                            let result = suc.data.biz_result;
                            var duedateDate = new Date(result.duedate);
                            var pubdateDate = new Date(result.pubdate);
                            var dateValue = duedateDate.getTime() - pubdateDate.getTime();
                            var days=Math.floor(dateValue/(24*3600*1000));
                            result.days = days;
                            result.pubdate = result.pubdate.substring(0,10);
                             _self.obj = result;

                             common.$emit('post-need-detail',_self.obj);
                        }, function(err) {
                            
                            common.$emit('message', err.data.msg);
                        })
                this.$router.push('needDetail/' + id);
            },
            handleBottomChange(status) {
                this.bottomStatus = status;
            },
            loadBottom(id) {
                /*setTimeout(() => {
                    let lastValue = this.todos[0];
                    if (this.todos.length <= 40) {
                        for (let i = 1; i <= 10; i++) {
                            this.todos.push(this.todos[0]);
                        }
                    } else {
                        this.allLoaded = true;
                    }
                    this.$refs.loadmore.onBottomLoaded(id);
                }, 1500);*/
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
            },
            jumpSearch(){
                common.$emit('setParam','router','urgentNeed');
                this.$router.push('search');
                
            }
        },
        created() {
            let _self = this;
             _self.getHttp('',0,0,'');
            /*var param ;
            param=common.pageParam.Urgentneed;

            _self.getHttp(param,0,0,'');*/
            common.$on("Urgentneed",function(item){
                 console.log(item);
                 _self.getHttp(item,0,0,'');
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

.urgent_need {}

.urgent_need .bg_white .page-loadmore-wrapper .page-loadmore-list .page-loadmore-listitem {
    float: left;
    width: 100%;
    min-height: 100px;
    padding: 10px;
    height: auto;
}

.urgent_need .bg_white .page-loadmore-wrapper .page-loadmore-list .page-loadmore-listitem .flag {
    float: left;
    width: 100%;
    padding-bottom: 10px;
    line-height: 17px;
    text-align: left;
    border-bottom: 1px solid #ddd;
}

.urgent_need .bg_white .page-loadmore-wrapper .page-loadmore-list .page-loadmore-listitem .flag img {
    max-height: 15px;
    float: left;
}

.urgent_need .bg_white .page-loadmore-wrapper .page-loadmore-list .page-loadmore-listitem .flag span {
    margin-left: 5px;
    color: #666;
    font-size: 1rem;
}

.urgent_need .bg_white .page-loadmore-wrapper .page-loadmore-list .page-loadmore-listitem .bottom {
    float: left;
    width: 100%;
    margin-top: 10px;
}

.urgent_need .bg_white .page-loadmore-wrapper .page-loadmore-list .page-loadmore-listitem .bottom p {
    line-height: 24px;
    float: left;
    font-size: 1.2rem;
    color: #666;
}

.urgent_need .bg_white .page-loadmore-wrapper .page-loadmore-list .page-loadmore-listitem .bottom span {
    color: #EC6817;
}

.urgent_need .bg_white .page-loadmore-wrapper .page-loadmore-list .page-loadmore-listitem .bottom button {
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

.urgent_need .bg_white .page-loadmore-wrapper .page-loadmore-list .page-loadmore-listitem .center {
    float: left;
    width: 100%;
    border-bottom: 1px solid #ddd;
    padding-bottom: 10px;
}

.urgent_need .bg_white .page-loadmore-wrapper .page-loadmore-list .page-loadmore-listitem .center div {
    float: left;
}

.urgent_need .bg_white .page-loadmore-wrapper .page-loadmore-list .page-loadmore-listitem .center .title {
    width: 100%;
    font-size: 1.3rem;
    color: #333;
    line-height: 15px;
    margin: 10px 0;
}

.urgent_need .bg_white .page-loadmore-wrapper .page-loadmore-list .page-loadmore-listitem .center .title p {
    float: right;
    font-size: 1rem;
    color: #999;
}

.urgent_need .bg_white .page-loadmore-wrapper .page-loadmore-list .page-loadmore-listitem .center .title img {
    max-height: 15px;
}

.urgent_need .bg_white .page-loadmore-wrapper .page-loadmore-list .page-loadmore-listitem .center .detail {
    width: 100%;
    line-height: 18px;
}

.urgent_need .bg_white .page-loadmore-wrapper .page-loadmore-list .page-loadmore-listitem .center .detail p {
    float: left;
    font-size: 1.2rem;
    color: #666;
}

.urgent_need .bg_white .page-loadmore-wrapper .page-loadmore-list .page-loadmore-listitem .center .detail span {
    color: #EC6817;
}

.urgent_need .bg_white .page-loadmore-wrapper .page-loadmore-list .page-loadmore-listitem .center .detail p:last-child {
    float: right;
}
</style>
