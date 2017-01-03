<template>
    <div class="content need">
        <div class="fixed">
            <div @click="jumpSearch">
                <search-input :keyword="httpPraram.keyword" v-on:clearSearch="clearKeyword"></search-input>
            </div>
            <sort v-on:postId="getId" :sortRouter="sortRouter" :paramArr="sortArr"></sort>
        </div>
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
                                    <p>剩余：<span>{{todo.days}}</span>天</p>
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
import common from '../../common/common.js'
import searchInput from '../../components/tools/inputSearch'
import sort from '../../components/tools/sort'
import httpService from '../../common/httpService.js'
export default {
    data() {
            return {
                sortRouter: 'need',
                sortArr: [{
                    name: '上架时间',
                    asc: 'top',
                    url: '/static/icons/drop_down.png',
                    saveName: '上架时间',
                    class: 'sort_content_detail',
                    sortArr: [{
                        name: '由新到旧',
                        asc: 'low',
                        show: false,
                        time: 1,
                        key: 'time'
                    }, {
                        name: '由旧到新',
                        asc: 'top',
                        show: false,
                        time: 2,
                        key: 'time'
                    }, {
                        name: '全部',
                        asc: '',
                        show: false,
                        time: 0,
                        key: 'time'
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
                        offer: 1,
                        key: 'offer'
                    }, {
                        name: '由多到少',
                        asc: 'top',
                        show: false,
                        offer: 2,
                        key: 'offer'
                    }, {
                        name: '全部',
                        asc: '',
                        show: false,
                        offer: 0,
                        key: 'offer'
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
                        duedate: 1,
                        key: 'duedate'
                    }, {
                        name: '由长到短',
                        asc: 'top',
                        show: false,
                        duedate: 2,
                        key: 'duedate'
                    }, {
                        name: '全部',
                        asc: '',
                        show: false,
                        duedate: 0,
                        key: 'duedate'
                    }]
                }, {
                    name: '产地',
                    asc: 'location',
                    url: '/static/icons/screen.png',
                    class: 'sort_content_detail',
                }],
                todos: [],
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
            searchInput,
            sort
        },
        methods: {
            getHttp(back) {
                let _self = this;
                httpService.lowPriceRes(common.urlCommon + common.apiUrl.most, {
                    biz_module: 'intentionService',
                    biz_method: 'queryBegBuyList',
                    biz_param: {
                        keyWord: _self.httpPraram.keyword,
                        sort: {
                            "shelve_time": _self.httpPraram.time,
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
            getId(param) {
                let _self = this;
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
            jumpSearch() {
                common.$emit('setParam', 'router', 'need')
                this.$router.push('search');
            },
            jumpDetail(id) {
                // let _self = this;
                // httpService.myAttention(common.urlCommon + common.apiUrl.most, {
                //     biz_module: 'intentionService',
                //     biz_method: 'queryIntentionInfo',
                //     biz_param: {
                //         id: id
                //     }
                // }, function(suc) {
                //     common.$emit('message', suc.data.msg);
                //     let result = suc.data.biz_result;
                //     var duedateDate = new Date(result.duedate);
                //     var pubdateDate = new Date(result.pubdate);
                //     var dateValue = duedateDate.getTime() - pubdateDate.getTime();
                //     var days = Math.floor(dateValue / (24 * 3600 * 1000));
                //     result.days = days;
                //     result.pubdate = result.pubdate.substring(0, 10);
                //     _self.obj = result;
                //     common.$emit('post-need-detail', _self.obj);
                // }, function(err) {
                //     common.$emit('message', err.data.msg);
                // })
                common.$emit('post-need-detail', id);
                this.$router.push('needDetail/' + id);
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
            }
        },
        created() {
            let _self = this;
            _self.getHttp();
            common.$on('need', function(item) {
                _self.httpPraram.keyword = item;
                _self.httpPraram.page = 1;
                _self.todos.splice(0, _self.todos.length);
                _self.getHttp();
            });
            common.$on('need-sort', function(item) {
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
            this.wrapperHeight = document.documentElement.clientHeight - this.$refs.wrapper.getBoundingClientRect().top - 130;
        }
}
</script>
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

.need {}

.need .fixed {
    position: fixed;
    width: 100%;
    z-index: 2;
    background: #fff;
}

.need .bg_white {
    margin-top: 100px;
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
