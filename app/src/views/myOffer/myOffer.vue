<style lang="less" scoped>
.my_needs {
    .bg_white {
        background-color: #FBFBF6;
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
    .main {
        li {
            background-color: #fff;
            margin-top: 10px;
            .box {
                .top {
                    padding: 15px 25px;
                    width: 100%;
                    border-bottom: 1px solid #F9F9F9;
                    display: flex;
                    flex-direction: row;
                    justify-content: space-between;
                    align-items: center;
                    .red {
                        color: #E96A6D;
                    }
                    .gray {
                        color: #C1C1C1;
                    }
                    .left {
                        font-size: 15px;
                    }
                    .right {
                        color: #CACACA;
                        font-size: 14px;
                    }
                }
                .content {
                    padding: 20px 25px;
                    display: flex;
                    flex-direction: row;
                    justify-content: space-between;
                    align-items: center;
                    .left {
                        .breed_name {
                            font-size: 15px;
                            color: #000;
                        }
                        .spec {
                            color: 6D6D6D;
                            font-size: 14px;
                            margin-top: 5px;
                            text-align: left;
                        }
                    }
                    .right {
                        width: 120px;
                        .date {
                            display: flex;
                            flex-direction: row;
                            justify-content: center;
                            align-items: center;
                            font-size: 14px;
                            color: #3F3F3F;
                            line-height: 13px;
                            img {
                                height: 15px;
                                margin: 0 10px 0 0;
                                padding: 0;
                            }
                        }
                        .detail {
                            background-color: #F3AA20;
                            height: 40px;
                            line-height: 40px;
                            color: #fff;
                            font-size: 16px;
                            border-radius: 20px;
                            width: 120px;
                            margin-top: 7px;
                        }
                    }
                }
            }
        }
    }
}
</style>
<template>
    <div class="my_needs">
        <div>
            <myHeader :param="param"></myHeader>
            <myPurchaseSort v-on:postId="getId" :sort="sortRouter" :paramArr="sortArr"></myPurchaseSort>
        </div>
        <div class="page-loadmore-wrapper" ref="wrapper" :style="{ height: wrapperHeight + 'px' }" v-show="todos.length!=0">
            <mt-loadmore :top-method="loadTop" @top-status-change="handleTopChange" :bottom-method="loadBottom" @bottom-status-change="handleBottomChange" :bottom-all-loaded="allLoaded" ref="loadmore">
                <ul class="main">
                    <li v-for="todo in todos">
                        <div class="box">
                            <div class="top">
                                <div class="left" v-show="todo.onSell == 0 || todo.onSell == 2">求购状态: {{todo.onSell | myStatus}}</div>
                                <div class="left" v-show="todo.onSell == 3 || todo.onSell == -2">求购状态:
                                    <span class="gray">{{todo.onSell | myStatus}}</span>
                                </div>
                                <div class="left" v-show="todo.onSell == 1">求购状态: <span class="red">{{todo.onSell | myStatus}}</span></div>
                                <div class="right">{{todo.pubdate | timeFormats}}</div>
                            </div>
                            <div class="content">
                                <div class="left">
                                    <div class="breed_name">{{todo.breedName}} ({{todo.number}}{{todo.unit}})</div>
                                    <div class="spec">{{todo.location,4 | filterTxt}}&nbsp;&nbsp;&nbsp;{{todo.spec,4 | filterTxt}}</div>
                                    <div class="spec">数量: {{todo.number}}{{todo.unit}}</div>
                                </div>
                                <div class="right">
                                    <div class="date">
                                        <div><img src="/static/icon/times.png"></div>
                                        <div v-if="todo.especial == 1 && todo.type == 0">剩余{{todo.duedate | timeDays}}天<span></span></div>
                                        <div v-if="todo.especial !== 1 && todo.type == 0">长期</div>
                                    </div>
                                    <div class="detail" @click="jump(router,todo.id)">
                                        求购详情
                                    </div>
                                </div>
                            </div>
                        </div>
                    </li>
                </ul>
                <div slot="top" class="mint-loadmore-top">
                    <span v-show="topStatus !== 'loading'" :class="{ 'is-rotate': topStatus === 'drop' }">↓</span>
                    <span v-show="topStatus === 'loading'"><mt-spinner type="snake"></mt-spinner></span>
                </div>
                <div slot="bottom" class="mint-loadmore-bottom">
                    <span v-show="bottomStatus !== 'loading'" :class="{ 'is-rotate': bottomStatus === 'drop' }"></span>
                    <span v-show="bottomStatus === 'loading'"><mt-spinner type="snake"></mt-spinner></span>
                </div>
            </mt-loadmore>
        </div>
        <errPage :param="err" v-show="todos.length==0"></errPage>
    </div>
</template>
<script>
import common from '../../common/common.js'
import searchInput from '../../components/tools/inputSearch'
import myHeader from '../../components/tools/myHeader'
import myPurchaseSort from '../../components/tools/myPurchaseSort'
import httpService from '../../common/httpService.js'
import filters from '../../filters/filters'
import errPage from '../../components/tools/err'
export default {
    data() {
            return {
                scrollTop: 0,
                err: {
                    err: "很抱歉，没有找到相关资源",
                    url: '/static/icons/maomao.png'
                },
                sortRouter: 'home',
                param: {
                    name: '我的报价',
                    router: 'home'
                },
                sortArr: [{
                    name: '报价状态',
                    asc: 'top',
                    url: '/static/icons/drop_down.png',
                    saveName: '审核状态',
                    class: 'sort_content_detail',
                    sortArr: [{
                        name: '申请中',
                        asc: 'low',
                        show: false,
                        testing: 1,
                        key: 'testing'
                    }, {
                        name: '上架失败',
                        asc: 'low',
                        show: false,
                        testing: -2,
                        key: 'testing'
                    }, {
                        name: '下架',
                        asc: 'low',
                        show: false,
                        testing: 4,
                        key: 'testing'
                    }, {
                        name: '上架',
                        asc: 'top',
                        show: false,
                        testing: 2,
                        key: 'testing'
                    }, {
                        name: '全部',
                        asc: '',
                        show: false,
                        testing: 0,
                        key: 'testing'
                    }]
                },{
                    name: '发布日期',
                    asc: 'top',
                    url: '/static/icons/drop_down.png',
                    saveName: '发布日期',
                    class: 'sort_content_detail',
                    sortArr: [{
                        name: '由新到旧',
                        asc: 'low',
                        show: false,
                        pubdate: 2,
                        key: 'pubdate'
                    }, {
                        name: '由旧到新',
                        asc: 'top',
                        show: false,
                        pubdate: 1,
                        key: 'pubdate'
                    }, {
                        name: '全部',
                        asc: '',
                        show: false,
                        pubdate: 0,
                        key: 'pubdate'
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
                        duedate: 0,
                        key: 'duedate'
                    }, {
                        name: '全部',
                        asc: '',
                        show: false,
                        duedate: '',
                        key: 'duedate'
                    }]
                }],
                router: "/needDetails",
                // other_router: "revisePurchase",
                other_router: "releaseNeed",
                todos: [],
                topStatus: '',
                wrapperHeight: 0,
                allLoaded: false,
                bottomStatus: '',
                httpPraram: {
                    pubdate: 0,
                    offer: 0,
                    duedate: 0,
                    testing: 0,
                    page: 1,
                    pageSize: 10
                }
            }
        },
        components: {
            searchInput,
            myPurchaseSort,
            myHeader,
            errPage
        },
        filters: (filters, {

        }),
        methods: {
            getHttp(back) {
                let _self = this;
                if (_self.httpPraram.page == 1) {
                    _self.allLoaded = false;
                }
                common.$emit('show-load');
                let url = common.addSID(common.urlCommon + common.apiUrl.most);
                let body = {
                    biz_module: 'intentionService',
                    biz_method: 'myBegIntentionList',
                    version: 1,
                    time: 0,
                    sign: '',
                    biz_param: {
                        sort: {
                            "offer": _self.httpPraram.offer,
                            "pubdate": _self.httpPraram.pubdate,
                            "duedate": _self.httpPraram.duedate
                        },
                        onSell: _self.httpPraram.testing,
                        pn: _self.httpPraram.page,
                        pSize: _self.httpPraram.pageSize
                    }
                };
                body.time = Date.parse(new Date()) + parseInt(common.difTime);
                body.sign = common.getSign('biz_module=' + body.biz_module + '&biz_method=' + body.biz_method + '&time=' + body.time);
                httpService.myResource(url, body, function(suc) {
                    common.$emit('close-load');

                    if (_self.httpPraram.page == 1) {
                        _self.todos.splice(0, _self.todos.length);
                    }
                    let result = suc.data.biz_result.list;
                    console.log(result);
                    if (suc.data.code == '1c01') {
                        for (var i = 0; i < result.length; i++) {
                            _self.todos.push(result[i]);
                        }
                        if (result.length < _self.httpPraram.pageSize) {
                            _self.allLoaded = true;
                        }
                    } else {
                        common.$emit('message', suc.data.msg);
                    }
                    if (back) {
                        back();
                    }
                }, function(err) {
                    common.$emit('close-load');
                    if (back) {
                        back();
                    }
                })
            },
            delet(id) {
                let _self = this;

                function beforeDelet() {
                    common.$emit('show-load');
                    let url = common.addSID(common.urlCommon + common.apiUrl.most);
                    let body = {
                        biz_module: 'intentionService',
                        biz_method: 'deleteIntentionInfo',
                        biz_param: {
                            id: id
                        }
                    };
                    body.time = Date.parse(new Date()) + parseInt(common.difTime);
                    body.sign = common.getSign('biz_module=' + body.biz_module + '&biz_method=' + body.biz_method + '&time=' + body.time);
                    httpService.myResource(url, body, function(suc) {
                        common.$emit('close-load');
                        if (suc.data.code == '1c01') {
                            _self.getHttp();
                        } else {
                            common.$emit('message', suc.data.msg);
                        }

                    }, function(err) {
                        common.$emit('close-load');
                        common.$emit('message', err.data.msg);
                    })
                }
                common.$emit("confirm", {
                    message: '确认删除？',
                    title: '提示',
                    ensure: beforeDelet
                });
            },
            getId(param) {
                let _self = this;
                _self.httpPraram.page = 1;
                _self.httpPraram[param.key] = param[param.key];
                _self.getHttp()
            },
            jump: function(router, id, duedate) {
                common.$emit("purchase-id", id);
                common.$emit("myPurToPurDetail", id);
                this.$router.push(router + '/' + id);
            },
            loadApp() {
                window.location.href = 'http://a.app.qq.com/o/simple.jsp?pkgname=com.yaocaimaimai.yaocaimaimai';
            },
            jumpApp() {
                common.$emit("confirm", {
                    message: '查看报价请下载App',
                    title: '提示',
                    ensure: this.loadApp
                });
            },
            handleBottomChange(status) {
                this.bottomStatus = status;
            },
            loadBottom(id) {
                let _self = this;
                setTimeout(() => {
                    if (_self.todos.length < _self.httpPraram.page * _self.httpPraram.pageSize) {
                        _self.allLoaded = true;
                    } else {
                        _self.httpPraram.page++;
                        _self.getHttp(function() {
                            _self.$refs.loadmore.onBottomLoaded(id);
                        });
                    }
                }, 500);
            },
            disTime: function(duedate) {
                var now = new Date().getTime();
                console.log(now);
                var endDate = new Date(duedate).getTime();
                console.log(endDate);
                var dis = now - endDate;
                console.log(dis);
                if (dis < 0) {
                    return true;
                } else {
                    return false;
                }
            },
            handleTopChange(status) {
                this.topStatus = status;
            },
            loadTop(id) {
                let _self = this;
                setTimeout(() => {
                    _self.httpPraram.page = 1;
                    _self.getHttp(function() {
                        _self.$refs.loadmore.onTopLoaded(id);
                    });

                }, 500);
            },
            handleScroll() {
                this.scrollTop = this.$refs.wrapper.scrollTop;
            },
            getScrollTop() {
                this.$refs.wrapper.scrollTop = this.scrollTop;
            }
        },
        watch: {
            '$route': 'getScrollTop'
        },
        created() {
            let _self = this;
            _self.getHttp();
            common.$on('informMyPurchase', function(item) {
                _self.httpPraram.page = 1;
                _self.getHttp();
            });
            common.$on("revisePurtoPur", function(item) {
                _self.httpPraram.page = 1;
                _self.getHttp();
            })
        },
        mounted() {
            this.wrapperHeight = document.documentElement.clientHeight - this.$refs.wrapper.getBoundingClientRect().top - 90;
            this.$refs.wrapper.addEventListener('scroll', this.handleScroll);
        }

}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
