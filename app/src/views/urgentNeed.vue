<template>
    <div class="urgent_need">

        <div class="go-back" @click="jump('home')">
                <img src="/static/images/go-back.png">
        </div>

        <div  class="title-name">
             <p>紧急求购</p>
        </div>
        <div @click="jumpSearch">
             <backSearch :keyword="httpPraram.keyword" v-on:clearSearch="clearKeyword" ></backSearch>
        </div>
        <sort  v-on:postId="getId" :sortRouter="sortRouter" :paramArr="sortArr"></sort>
        <div class="bg_white">
            <div class="page-loadmore-wrapper" ref="wrapper" :style="{ height: wrapperHeight + 'px' }">
                <mt-loadmore :top-method="loadTop" @top-status-change="handleTopChange" :bottom-method="loadBottom" @bottom-status-change="handleBottomChange" :bottom-all-loaded="allLoaded" ref="loadmore">
                    <ul class="page-loadmore-list">
                        <li v-for="todo in todos" class="page-loadmore-listitem list_content_item" @click="jumpDetail(todo.id)">                          
                            <div class="center">
                                 <img src="/static/icons/england.png" class="flag">
                                <div class="title">
                                    <div><img src="/static/icons/impatient.png">{{todo.breedName}}</div>
                                    <p>发布时间：{{todo.pubdate}}</p>
                                </div>                     
                                <div class="detail">
                                    <div>
                                        <p>规格</p>
                                        <p>产地</p>
                                        <p>剩余</p>
                                        <p>需求数量</p>
                                    </div>
                                    <div class="last">
                                        <p>{{todo.spec}}</p>
                                        <p>{{todo.location}}</p>
                                        <p>{{todo.days}}<span>天</span></p>
                                        <p>{{todo.number}}<span>{{todo.unit}}</span></p> 
                                    </div>
                                </div>
                            </div>
                            <div class="bottom">
                                <p>已报价<span>{{todo.offer}}</span>人</p>
                                <button class="mint-button mint-button--primary mint-button--small" v-on:click.stop = "jump">我要报价</button>
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
import backSearch from '../components/tools/backSearch'
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
                todos: [],                   
                keyword:'',
                topStatus: '',
                wrapperHeight: 0,
                allLoaded: false,
                bottomStatus: '',
                httpPraram: {
                    time: 0,
                    offer: 0,
                    duedate: 0,
                    location: [],
                    keyword: '',
                    page: 1,
                    pageSize: 20
                }
            }
        },
        components: {
            backSearch,
            sort
        },
        methods: {
            getHttp(back){
                 let _self = this;
                 httpService.lowPriceRes(common.urlCommon + common.apiUrl.most, {
                        biz_module:'intentionService',
                        biz_method:'queryBegBuyList',
              
                            biz_param: {
                                keyWord: _self.httpPraram.keyword,
                                sort:{
                                    "shelve_time":_self.httpPraram.time,
                                    "offer": _self.httpPraram.offer,
                                    "duedate": _self.httpPraram.duedate
                                },                          
                                location: _self.httpPraram.location,
                                pn: _self.httpPraram.page,
                                pSize: _self.httpPraram.pageSize
                            }
                        },  function(suc) {
                            common.$emit('message', suc.data.msg);
                            let result = suc.data.biz_result.list;
                             common.$emit('translateDate',result,_self.todos);
                              
                            if (back) {
                                back();
                            }
                        }, function(err) {
                            common.$emit('message', err.data.msg);
                            if (back) {
                                back();
                            }
                        })
            },
            getId(param){
                 let _self = this;

                _self.param = true;
                _self.httpPraram.page = 1;
                _self.todos.splice(0, _self.todos.length);
                _self.httpPraram[param.key] = param[param.key];
                _self.getHttp();
            },
            clearKeyword() {
                let _self = this;
                this.httpPraram.page = 1;
                this.todos.splice(0, _self.todos.length);
                this.httpPraram.keyword = '';
                this.getHttp();
            },
            jumpDetail(id) {
                
                common.$emit("needToDetail",id);
                this.$router.push('needDetail/' + id);
            },
            jump(){
                   //下载app
            },
            handleBottomChange(status) {
                this.bottomStatus = status;
            },
            loadBottom(id) {
                let _self = this;
                setTimeout(() => {
                    if (this.todos.length < this.httpPraram.page * this.httpPraram.pageSize) {
                        this.allLoaded = true;
                    } else {
                        this.httpPraram.page++;
                        this.getHttp(function() {
                            _self.$refs.loadmore.onBottomLoaded(id);
                        });
                    }
                }, 1500);
            },

            handleTopChange(status) {
                this.topStatus = status;
            },
            loadTop(id) {
                let _self = this;
                setTimeout(() => {
                    _self.httpPraram.page = 1;
                    _self.todos.splice(0, _self.todos.length);
                    _self.getHttp(function() {
                        _self.$refs.loadmore.onTopLoaded(id);
                    });

                }, 1500);
            },
            jumpSearch(){
                common.$emit('setParam','router','urgentNeed');
                this.$router.push('search');
                
            },
            jump(router){
                this.$router.push(router);
            }
        },
        created() {
            let _self = this;
            _self.getHttp();
            common.$on('Urgentneed', function(item) {
                _self.httpPraram.keyword = item;
                _self.httpPraram.page = 1;
                _self.todos.splice(0, _self.todos.length);
                _self.getHttp();
            });
            common.$on('urgentNeed-sort', function(item) {
                _self.httpPraram.location = item;
                _self.sortArr[3].name = item[0];
                _self.sortArr[3].class = "sort_content_detail_select";
                _self.sortArr[3].url = "/static/icons/screen_selected.png";
                if (item.length > 1) {
                    _self.sortArr[3].name += '...';
                } else if (item.length == 0) {
                    _self.sortArr[3].name = '产地';
                    _self.sortArr[3].class = "sort_content_detail";
                    _self.sortArr[3].url = "/static/icons/screen.png";
                }
                _self.httpPraram.page = 1;
                _self.todos.splice(0, _self.todos.length);
                _self.getHttp();
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
.urgent_need .go-back{
    position: absolute;
    width:15%;
    padding-right:5%;
    height:50px;
    border-bottom: 1px solid #ccc;
    background:#EC6817;
}
.urgent_need .title-name{  
    position: absolute;
    left:15%;
    width:70%;
    height:50px;
    border-bottom: 1px solid #ccc;
    background: #EC6817;
    font-size: 1.7rem;
    line-height: 50px;
    color:white;
}
.urgent_need .go-back  img{
    margin-top: 15px;
    height:20px;
}
.urgent_need .bg_white{
    background:#fff;
}
.urgent_need .bg_white .page-loadmore-wrapper .page-loadmore-list {
    padding: 0 10px;
}
.urgent_need .bg_white .page-loadmore-wrapper .page-loadmore-list .page-loadmore-listitem {
    float: left;
    width: 100%;
    min-height: 100px;
    padding:0;
    height: auto;
    background: white;
    margin-top: 10px;
    border-radius: 3px;
    box-shadow: 0px 0px 20px #F5F5F5;
}





.urgent_need .bg_white .page-loadmore-wrapper .page-loadmore-list .page-loadmore-listitem .bottom {
    float: left;
    width: 100%;
    padding: 0 10px;
    height:4.18rem;
}

.urgent_need .bg_white .page-loadmore-wrapper .page-loadmore-list .page-loadmore-listitem .bottom p {
    line-height: 4.18rem;
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
    font-size: 1.2rem;
    width: 5.97rem;
    height: 2.389rem;
    padding: 0 5px;
    border: none;
    color: #fff;
    line-height: 0;
    margin-top: 0.8955rem;
}

.urgent_need .bg_white .page-loadmore-wrapper .page-loadmore-list .page-loadmore-listitem .center {
    float: left;
    width: 100%;
    border-bottom: 1px solid #ddd;
    padding: 0 10px 1.066rem 10px;
    /*padding:0 0 10px 0;*/
    position: relative;
}
.urgent_need .bg_white .page-loadmore-wrapper .page-loadmore-list .page-loadmore-listitem .flag{
    position: absolute;
    top:0px;
    right:0px;
    width:1.7rem;
    height:1.23rem;
}
.urgent_need .bg_white .page-loadmore-wrapper .page-loadmore-list .page-loadmore-listitem .center div {
    float: left;
}

.urgent_need .bg_white .page-loadmore-wrapper .page-loadmore-list .page-loadmore-listitem .center .title {
    width: 100%;
    font-size: 1.365rem;
    color: #333;
    line-height: 1.365rem;
    /*margin: 10px 0;*/
}
.urgent_need .bg_white .page-loadmore-wrapper .page-loadmore-list .page-loadmore-listitem .center .title>div{
    margin-top:1.06rem;
}
.urgent_need .bg_white .page-loadmore-wrapper .page-loadmore-list .page-loadmore-listitem .center .title p {
    float: right;
    font-size: 1rem;
    color: #999;
    margin:1.2rem 2.559rem 0 0;

}

.urgent_need .bg_white .page-loadmore-wrapper .page-loadmore-list .page-loadmore-listitem .center .title img { 
    width:1.2rem;
    margin-right: 5px;
}
.urgent_need .bg_white .page-loadmore-wrapper .page-loadmore-list .page-loadmore-listitem .center .detail{
    width:100%;
    
    display: flex;
    flex-direction:column;
}
.urgent_need .bg_white .page-loadmore-wrapper .page-loadmore-list .page-loadmore-listitem .center .detail div{
    flex:1;
    display:flex;
    flex-direction:row;
    margin-top: 1.279rem;
    
}
.urgent_need .bg_white .page-loadmore-wrapper .page-loadmore-list .page-loadmore-listitem .center .detail .last p{
    color:#666666;
}
.urgent_need .bg_white .page-loadmore-wrapper .page-loadmore-list .page-loadmore-listitem .center .detail div p{
    flex:1;
    
    
    font-size: 1.109rem;
    color:#424242;
}

</style>
