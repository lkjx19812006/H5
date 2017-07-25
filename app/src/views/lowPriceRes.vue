<style lang="less" scoped>
.low_price .fixed {
    position: fixed;
    width: 100%;
    z-index: 2;
    background: #fff;
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

.low_price .fixed .search_content {
    float: left;
    width: 100%;
    background: #EC6817;
}

.low_price .go-back {
    position: absolute;
    width: 15%;
    padding-right: 5%;
    height: 50px;
    border-bottom: 1px solid #ccc;
    background: #EC6817;
}

.low_price {
    overflow: hidden;
    .main {
        width: 100%;
        padding-top: 90px;
        overflow-y: scroll;
    }
    .factory {
        background-color: #fff;
        display: flex;
        flex-direction: row;
        width: 100%;
        padding: 5px 10px;
        border-bottom: 1px solid #E6E6E6;
        .left {
            height: 30px;
            line-height: 30px;
            text-align: center;
            font-size: 13px;
            color: #4D4D4D;
            border: 1px solid #E4E4E4;
            border-radius: 15px;
            padding: 0px 20px;
            margin-right: 10px;
        }
        .active {
            border: 1px solid #FA6705;
            color: #FA6705;
        }
    }
    .list {
        background-color: #F7F7F7;
        padding: 10px 0;
        .li {
            position: relative;
            .sampling{
                position: absolute;
                width: 38px;
                right:0;
                top:0;
            }
            padding-left: 10px;
            background-color: #fff;
            .content {
                position: relative;
                display: flex;
                flex-direction: row;
                padding: 10px 10px 10px 0;
                border-bottom: 1px solid #E6E6E6;
                .images {
                    position: relative;
                    width: 95px;
                    height: 90px;
                    overflow: hidden;
                    .breedImg {
                        width: 100%;
                        height: 90px;
                    }
                    .zheng {
                        position: absolute;
                        top: 0;
                        left: 0;
                        width: 25px;
                    }
                }
                .collect {
                    position: absolute;
                    width: 30px;
                    right: 16px;
                    bottom: 10px;
                }
                .collected {
                    position: absolute;
                    padding: 5px 10px;
                    border: 1px solid #e6e6e6;
                    border-radius: 15px;
                    font-size: 12px;
                    color: #666;
                    right: 16px;
                    bottom: 10px;
                }
                .center {
                    margin-left: 11px;
                    text-align: left;
                    .breed {
                        font-size: 16px;
                        color: #333;
                        line-height: 16px;
                        margin-bottom: 14px;
                        display: flex;
                        flex-direction: row;
                        .its_mine {
                            height: 16px;
                            margin: 0 4px 0 2px;
                        }
                    }
                    .spec {
                        font-size: 13px;
                        color: #666;
                        line-height: 13px;
                        margin-bottom: 5px;
                    }
                    .location {
                        margin-top: 8px;
                    }
                    .price {
                        font-size: 16px;
                        color: #FF4541;
                        span {
                            font-size: 14px;
                        }
                    }
                }
            }
        }
    }
}
</style>
<template>
    <div class="low_price">
        <div class="fixed">
            <headFix :param="headParam" v-on:postClear="clearKeyword"></headFix>
            <sort v-on:postId="getId" v-on:initial="initial" :sortRouter="sortRouter" :paramArr="sortArr"></sort>
        </div>
        <div class="main" ref="wrapper" :style="{ height: wrapperHeight + 'px' }" v-show="todos.length!=0">
            <mt-loadmore :top-method="loadTop" @top-status-change="handleTopChange" :bottom-method="loadBottom" @bottom-status-change="handleBottomChange" :bottom-all-loaded="allLoaded" ref="loadmore">
                <ul class="list">
                    <li class="li" v-for="(todo,index) in todos" @click="jumpDetail(todo.id)">
                        <img src="/static/icon/homesample.png" v-show="todo.sampling == 1" class="sampling">
                        <div class="content">
                            <div class="images">
                                <img :src="todo.image[0]" class="breedImg">
                                <!-- <img src="/static/icon/zheng.png" class="zheng" v-show="todo.especial == 1"> -->
                                <img :src="todo.cFlagsPath" class="zheng" v-show="todo.cFlagsPath">
    
                                <img src="/static/icon/zhongguo.png" class="zheng" v-show="!todo.cFlagsPath">
                            </div>
                            <div class="center">
                                <div class="breed">
                                    <!-- <div class="its_mine" v-show="todo.isMy==1">我的</div> -->
                                    <img src="/static/icon/its-mines.png" class="its_mine" v-show="todo.isMy==1">
                                    <img src="/static/icon/auth-icon.png" class="its_mine" v-show="todo.especial == 1">
                                    <div class="breed_name">{{todo.breedName,8 | filterTxt}}</div>
                                </div>
                                <div class="spec">规格:
                                    <span>{{todo.spec,8 | filterTxt}}</span>
                                </div>
                                <div class="spec location">产地:
                                    <span>{{todo.location,8 | filterTxt}}</span>
                                </div>
                                <div class="price">￥{{todo.price}}/
                                    <span>{{todo.unit}}</span>
                                </div>
                                <div class="collected" @click.stop="myAttention(0,todo,index)" v-if="todo.isAttention && todo.isMy==0">已收藏</div>
                                <img src="/static/icon/is-mine.png" class="collect" v-show="!todo.isAttention && todo.isMy==1">
                                <img src="/static/icon/supplyflower.png" class="collect" @click.stop="myAttention(1,todo,index)" v-if="!todo.isAttention && todo.isMy==0">
                            </div>
                        </div>
                    </li>
                </ul>
                <div slot="top" class="mint-loadmore-top">
                    <span v-show="topStatus !== 'loading'" :class="{ 'is-rotate': topStatus === 'drop' }">↓</span>
                    <span v-show="topStatus === 'loading'">
                        <mt-spinner type="snake"></mt-spinner>
                    </span>
                </div>
                <div slot="bottom" class="mint-loadmore-bottom">
                    <span v-show="bottomStatus !== 'loading'" :class="{ 'is-rotate': bottomStatus === 'drop' }">↑</span>
                    <span v-show="bottomStatus === 'loading'">
                        <mt-spinner type="snake"></mt-spinner>
                    </span>
                </div>
            </mt-loadmore>
        </div>
        <errPage :param="err" v-show="todos.length==0"></errPage>
    </div>
</template>
<script>
import common from '../common/common.js'
import sort from '../components/tools/sort'
import validation from '../validation/validation.js'
import httpService from '../common/httpService.js'
import headFix from '../components/tools/head'
import errPage from '../components/tools/err'
import filters from '../filters/filters'
export default {
    data() {
        return {
            scrollTop: 0,
            isAttention: 0,
            err: {
                err: "很抱歉，没有找到相关资源",
                url: '/static/icons/maomao.png',
                next_step: '去发布',
                router: '/releaseResource/1'
            },
            sortRouter: 'lowRes',
            sortArr: [{
                name: '综合',
                asc: 'comprehensive',
                select: false,
                class: 'sort_content_detail',
            }, {
                name: '价格',
                asc: 'top',
                url: '/static/icons/drop_down.png',
                saveName: '价格',
                class: 'sort_content_detail',
                sortArr: [{
                    name: '由低到高',
                    asc: 'low',
                    show: false,
                    price: 1,
                    key: 'price'
                }, {
                    name: '由高到低',
                    asc: 'top',
                    show: false,
                    price: 2,
                    key: 'price'
                }, {
                    name: '全部',
                    asc: '',
                    show: false,
                    price: 0,
                    key: 'price'
                }]
            }, {
                name: '是否样品',
                asc: 'top',
                url: '/static/icons/drop_down.png',
                saveName: '可否样品',
                class: 'sort_content_detail',
                sortArr: [{
                    name: '可供样',
                    asc: 'low',
                    show: false,
                    sample: 1,
                    key: 'sample'
                }, {
                    name: '不供样',
                    asc: 'top',
                    show: false,
                    sample: 0,
                    key: 'sample'
                }, {
                    name: '全部',
                    asc: '',
                    show: false,
                    sample: '',
                    key: 'sample'
                }]
            }, {
                name: '产地',
                asc: 'location',
                url: '/static/icons/screen.png',
                class: 'sort_content_detail',
            }],
            back_key: '0',
            keyword: '',
            todos: [],
            obj: {},
            topStatus: '',
            wrapperHeight: 0,
            allLoaded: false,
            bottomStatus: '',
            show: '',
            httpPraram: {
                time: 0,
                price: 0,
                sample: '',
                location: [],
                keyword: '',
                page: 1,
                pageSize: 10
            },
            headParam: {
                title: '低价资源',
                keyword: '',
                router: 'lowPriceRes'
            }
        }
    },
    components: {
        sort,
        headFix,
        errPage
    },
    methods: {
        getHttp(back) {
            if (this.httpPraram.page == 1) {
                this.allLoaded = false;
            }
            let _self = this;
            if (_self.httpPraram.page == 1) common.$emit('show-load');
            let url = common.urlCommon + common.apiUrl.most;
            let body = {
                biz_module: 'intentionService',
                biz_method: 'querySupplyList',
                biz_param: {
                    keyWord: _self.httpPraram.keyword,
                    sort: {
                        "shelve_time": _self.httpPraram.time,
                        "price": _self.httpPraram.price
                    },
                    sampling: _self.httpPraram.sample,
                    pn: _self.httpPraram.page,
                    pSize: _self.httpPraram.pageSize,
                    location: _self.httpPraram.location
                }
            }
            if (common.KEY) {
                url = common.addSID(common.urlCommon + common.apiUrl.most);
                body.version = 1;
                body.time = Date.parse(new Date()) + parseInt(common.difTime);
                body.sign = common.getSign('biz_module=' + body.biz_module + '&biz_method=' + body.biz_method + '&time=' + body.time);
            }
            httpService.myAttention(url, body, function (suc) {
                common.$emit('close-load');
                if (_self.httpPraram.page == 1) {
                    _self.todos.splice(0, _self.todos.length);
                }
                let result = suc.data.biz_result.list;
                if (suc.data.code == '1c01') {
                    for (var i = 0; i < result.length; i++) {
                        _self.todos.push(result[i]);
                    }
                } else {
                    common.$emit('message', suc.data.msg);
                }
                if (result.length < _self.httpPraram.pageSize) {
                    _self.allLoaded = true;
                }
                if (back) {
                    back();
                }
            }, function (err) {
                common.$emit('close-load');
                common.$emit('message', err.data.msg);
                if (back) {
                    back();
                }
            })
        },
        getId(param) {
            let _self = this;
            _self.httpPraram.page = 1;
            _self.httpPraram[param.key] = param[param.key];
            _self.getHttp();
        },
        initial(param) {
            let _self = this;
            if (!param) {
                _self.httpPraram.time = 0;
                _self.httpPraram.price = 0;
                _self.httpPraram.keyword = '';
                _self.httpPraram.sample = '';
                _self.httpPraram.location = [];
                _self.httpPraram.page = 1;
                for (var i = 1; i < _self.sortArr.length; i++) {
                    if (i < 3) {
                        _self.sortArr[i].name = _self.sortArr[i].saveName;
                        _self.sortArr[i].url = '/static/icons/drop_down.png';
                        _self.sortArr[i].class = 'sort_content_detail';
                    }
                    if (i == 3) {
                        _self.sortArr[3].name = '产地';
                        _self.sortArr[3].class = "sort_content_detail";
                        _self.sortArr[3].url = "/static/icons/screen.png";
                        common.$emit('initial', 1)
                    }
                }
                _self.getHttp();
            }
        },
        myAttention(type, todo, index) {
            if (!common.customerId) {
                let _self = this;

                function loadApp() {
                    if (common.wxshow) {
                        common.getWxUrl();
                    } else {
                        _self.$router.push('/login');
                    }
                }
                common.$emit('confirm', {
                    message: '请先登录',
                    title: '提示',
                    ensure: loadApp
                });
                return;
            }
            let _self = this;
            common.$emit('show-load');
            let url = common.addSID(common.urlCommon + common.apiUrl.most);
            let body = {
                biz_module: 'userService',
                biz_method: 'userAttention',
                biz_param: {
                    intentionId: todo.id,
                    type: type,
                    breedName: todo.breedName,
                    intentionType: todo.type
                }
            };
            body.time = Date.parse(new Date()) + parseInt(common.difTime);
            body.sign = common.getSign('biz_module=' + body.biz_module + '&biz_method=' + body.biz_method + '&time=' + body.time);
            httpService.addAddress(url, body, function (suc) {
                common.$emit('close-load');
                if (suc.data.code == '1c01') {
                    common.$emit('message', suc.data.msg);
                    common.$emit("informResAttention", todo.type);
                    _self.todos[index].isAttention = type;
                } else {
                    common.$emit('message', suc.data.msg);
                }

            }, function (err) {
                common.$emit('close-load');
                common.$emit('message', err.data.msg);
            })
        },
        clearKeyword() {
            this.httpPraram.page = 1;
            this.httpPraram.keyword = '';
            this.getHttp();
        },
        jumpDetail(id) {
            let _self = this;
            if (!_self.pull) {
                common.$emit('resourceDetail', id);
                _self.$router.push('resourceDetail/' + id);
            } else {
                console.log('在加载...')
            }

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
                    this.getHttp(function () {
                        _self.$refs.loadmore.onBottomLoaded(id);
                    });
                }
            }, 500);

        },
        handleTopChange(status) {
            this.topStatus = status;
        },
        loadTop(id) {
            let _self = this;
            setTimeout(() => {
                _self.httpPraram.page = 1;
                _self.getHttp(function () {
                    _self.$refs.loadmore.onTopLoaded(id);
                });
            }, 500);

        },
        jump(router) {
            this.$router.push(router);
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
        //console.log();
        _self.headParam.keyword = common.pageParam.lowPrice.keyWord;
        _self.httpPraram.keyword = common.pageParam.lowPrice.keyWord;
        _self.getHttp();
        common.$on('lowPriceRes', function (item) {
            _self.headParam.keyword = item.keyWord;
            _self.httpPraram.keyword = item.keyWord;
            _self.httpPraram.page = 1;
            _self.getHttp();
        })
        common.$on('clearThisSearch', function (item) {
            _self.httpPraram.page = 1;
            _self.headParam.keyword = '';
            _self.httpPraram.keyword = '';
            _self.getHttp();
        })
        common.$on('lowRes-sort', function (item) {
            _self.httpPraram.location = item.idArr;
            _self.sortArr[3].name = item.areaArr[0];
            _self.sortArr[3].class = "sort_content_detail_select";
            _self.sortArr[3].url = "/static/icons/screen_selected.png";
            if (item.length > 1) {
                _self.sortArr[3].name += '...';
            } else if (!_self.sortArr[3].name) {
                _self.sortArr[3].name = '产地';
                _self.sortArr[3].class = "sort_content_detail";
                _self.sortArr[3].url = "/static/icons/screen.png";
            }
            _self.httpPraram.page = 1;
            _self.getHttp();
        });
        /*common.$on('listOflowPrice',function(item){
            _self.getHttp();
        })*/
        common.$on('getInfo', function (item) {
            _self.getHttp();
        })


    },
    mounted() {
        this.wrapperHeight = document.documentElement.clientHeight - this.$refs.wrapper.getBoundingClientRect().top;
        this.$refs.wrapper.addEventListener('scroll', this.handleScroll);
    }
}
</script>
<!-- .page-loadmore-wrapper {
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

.low_price {
    overflow: hidden;
}

.low_price .title-name {
    position: absolute;
    left: 15%;
    width: 70%;
    height: 50px;
    border-bottom: 1px solid #ccc;
    background: #EC6817;
    font-size: 1.7rem;
    line-height: 50px;
    color: white;
}

.low_price .go-back {
    position: absolute;
    width: 15%;
    padding-right: 5%;
    height: 50px;
    border-bottom: 1px solid #ccc;
    background: #EC6817;
}

.low_price .go-back img {
    margin-top: 15px;
    height: 20px;
}

.low_price {
    background: #F5F5F5;
}

.low_price .bg_white {
    background: #F5F5F5;
    padding: 0 10px;
}

.low_price .bg_white .page-loadmore-wrapper .page-loadmore-list .page-loadmore-listitem {
    float: left;
    width: 100%;
    height: 9.6rem;
    margin-top: 10px;
    background: white;
    border-radius: 3px;
}

.low_price .bg_white .page-loadmore-wrapper .page-loadmore-list li {
    position: relative;
}

.low_price .bg_white .page-loadmore-wrapper .page-loadmore-list .small_img {
    width: 16px;
    position: absolute;
    top: 10px;
    left: 10px;
    z-index: 10;
}

.low_price .bg_white .page-loadmore-wrapper .page-loadmore-list .tsmall_img {
    width: 16px;
    position: absolute;
    top: 10px;
    left: 28px;
    z-index: 10;
}

.low_price .bg_white .page-loadmore-wrapper .page-loadmore-list li .list_images {
    height: 8.1rem;
    width: 25%;
    left: 10px;
    margin: 10px 10px 10px 0;
    position: absolute;
    z-index: 0;
}

.low_price .bg_white .page-loadmore-wrapper .page-loadmore-list li div {
    float: left;
    text-align: left;
    line-height: 20px;
    font-size: 1.3rem;
    margin-bottom: 8px;
}


/*.low_price .bg_white .page-loadmore-wrapper .page-loadmore-list li .res_content_center img {
    float: left;
    width: 1.4rem;
    margin-right: 4px;
}*/

.low_price .bg_white .page-loadmore-wrapper .page-loadmore-list li .res_content_center>div {
    word-break: keep-all;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    width: 40%;
}

.low_price .bg_white .page-loadmore-wrapper .page-loadmore-list li .res_content_center .over_lenght {
    word-break: keep-all;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    width: 200px;
}

.low_price .bg_white .page-loadmore-wrapper .page-loadmore-list li .res_content_center p {
    float: left;
    width: 100%;
    padding-right: 90px;
    line-height: 1.2rem;
    text-align: left;
    font-size: 1.2rem;
    color: #666;
    margin-top: 0.8rem;
}

.low_price .bg_white .page-loadmore-wrapper .page-loadmore-list li .res_content_center .spec {
    margin-top: 0.3rem;
}

.low_price .bg_white .page-loadmore-wrapper .page-loadmore-list .res_content {
    width: 100%;
    padding-left: 30%;
    padding-top: 10px;
}

.low_price .bg_white .page-loadmore-wrapper .page-loadmore-list .res_content .res_content_right {
    position: absolute;
    max-width: 140px;
    height: 8.1rem;
    margin: 0;
    right: 10px;
}

.low_price .bg_white .page-loadmore-wrapper .page-loadmore-list .res_content .res_content_right p {
    font-size: 1.25rem;
    margin-top: 0px;
    margin-right: 2px;
    color: #EC6817;
    text-align: right;
    white-space: nowrap;
}

.low_price .bg_white .page-loadmore-wrapper .page-loadmore-list .res_content .res_content_right button {
    position: absolute;
    bottom: 0px;
    background: #EC6817;
    font-size: 1.109rem;
    width: 5.97rem;
    right: 0px;
    height: 2.38rem;
    padding: 0 5px;
}

.low_price .bg_white .page-loadmore-wrapper .page-loadmore-list .res_content .time_font {
    font-size: 1rem;
    color: #999;
} -->
