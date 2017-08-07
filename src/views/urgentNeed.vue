<style lang="less" scoped>
.urgent_need .fixed {
    position: fixed;
    width: 100%;
    z-index: 2000;
    background: #fff;
    position: relative;
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

@keyframes mymove {
    from {
        opacity: 0;
    }
    to {
        opacity: 1;
    }
}

.urgent_need {
    overflow: hidden;
    height: 100vh;
    .newAdd {
        position: absolute;
        width: 100%;
        top: 50px;
        height: 20px;
        background-color: #E9F2FA;
        color: #3D7DB8;
        font-size: 13px;
        line-height: 20px;
        z-index: 300;
    }
    .emtry {
        position: static;
        height: 10px;
        background-color: #F7F7F7;
    }
    .change_opcaity {
        animation: mymove 1s;
    }
    .main {
        width: 100%;
        padding-bottom: 142px;
        overflow-y: scroll;
        width: 100%;
        .newAdd_p {
            height: 20px;
            width: 100%;
            background-color: #F7F7F7;
        }
    }
    .have_title {
        padding-bottom: 172px;
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
        .li {
            padding-left: 15px;
            margin-bottom: 10px;
            background-color: #fff;
            border-bottom: 1px solid #e5e5e5;
            border-top: 1px solid #e5e5e5;
            .top {
                border-bottom: 1px solid #e5e5e5;
                position: relative;
                display: flex;
                flex-direction: row;
                align-items: center;
                height: 42px;
                .flag {
                    width: 23px;
                    height: 16px;
                }
                .drug_factory {
                    width: 40px;
                    font-size: 12px;
                    line-height: 16px;
                    height: 16px;
                    background-color: #FF7600;
                    color: #fff;
                    margin: 0 0 0 4px;
                }
                .breed {
                    font-size: 17px;
                    margin-left: 9px;
                }
                .emtrys{
                    flex:1;
                }
                .urgent{
                    position: absolute;
                    height: 28px;
                    right:5px;
                    bottom: -29px;
                }
                .date {
                    display: flex;
                    flex-direction: row;
                    justify-content: center;
                    align-items: center;
                    font-size: 14px;
                    color: #3F3F3F;
                    line-height: 13px;
                    padding-right:15px;
                    img {
                        height: 15px;
                        margin: 0 5px 0 0;
                        padding: 0;
                    }
                }
            }
            .content {
                display: flex;
                flex-direction: row;
                justify-content: space-between;
                align-items: center;
                padding-right: 10px;
                .left {
                    text-align: left;
                    font-size: 15px;
                    color: #333;
                    .one {
                        margin-top: 15px;
                    }
                    .spec {
                        line-height: 15px;
                        margin-bottom: 15px;
                    }
                }
                .right {
                    width: 120px;
                    .detail {
                        background-color: #FF8300;
                        height: 40px;
                        line-height: 40px;
                        color: #fff;
                        font-size: 16px;
                        border-radius: 20px;
                        width: 120px;
                        margin-top: 7px;
                    }
                    .offerNum{
                        font-size: 14px;
                        margin-top: 8px;
                        span{
                            color:#FA6705;
                        }
                    }
                }
            }
        }
    }
}

.black_shade {
    position: absolute;
    top: 0;
    z-index: 2000;
    opacity: 0.6;
    background-color: #000;
    width: 100%;
    height: 100vh;
}
</style>
<template>
    <div class="urgent_need">
        <div class="fixed">
            <headFix :param="headParam" v-on:postClear="clearKeyword"></headFix>
            <perfectTitle :param="Titles" v-if="myTypes"></perfectTitle>
            <sort v-on:postId="getId" v-on:initial="initial" :sortRouter="sortRouter" :paramArr="sortArr"></sort>
            <div class="factory">
                <div class="left" v-bind:class="{active:httpPraram.indentType == 0}" @click="indentType(0)">药厂求购</div>
                <div class="left" v-bind:class="{active:httpPraram.indentType == 1}" @click="indentType(1)">普通求购</div>
            </div>
        </div>
        <div class="main" ref="wrapper" :style="{ height: wrapperHeight + 'px' }" v-show="todos.length!=0" v-bind:class="{have_title:Titles.myTitle}">
            <mt-loadmore :top-method="loadTop" @top-status-change="handleTopChange" :bottom-method="loadBottom" @bottom-status-change="handleBottomChange" :bottom-all-loaded="allLoaded" ref="loadmore">
                <div class="newAdd" v-bind:class="{emtry:!newAdd,emtry_before:'change_opcaity'}">
                    <span v-show="newAdd">今日新增{{newAdd}}条药厂求购信息</span>
                </div>
                <div class="newAdd_p" v-show="newAdd"></div>
                <ul class="list">
                    <li v-for="todo in todos" @click="jumpDetail(todo.id)" class="li">
                        <div class="top">
                            <img src="https://ojic8qd7z.qnssl.com/contry_icon/zhongguo.png" class="flag">
                            <div class="drug_factory" v-show="todo.indentType == 0">药厂</div>
                            <div class="breed">{{todo.breedName}}</div>
                            <div class="emtrys"></div>
                            <div class="date">
                                <div><img src="/static/icon/times.png"></div>
                                <div>{{todo.duedate | needTimeDay}}</div>
                            </div>
                            <img src="/static/icon/urgent-2.png" class="urgent" v-show="todo.especial == 1">
                        </div>
                        <div class="content">
                            <div class="left">
                                <div class="spec one">产品规格: {{todo.spec,4 | filterTxt}}</div>
                                <div class="spec">产品产地: {{todo.location,4 | filterTxt}}</div>
                                <div class="spec">需求数量: {{todo.number,5 | filterTxt}}({{todo.unit}})</div>
                                <div class="spec">交货地址: {{todo.address,8 | filterTxt}}</div>
                            </div>
                            <div class="right">
                                <div class="detail" v-show="todo.indentType !== 0">
                                    我要报价
                                </div>
                                <div class="detail" v-show="todo.indentType == 0">
                                    抢先报价
                                </div>
                                <div class="offerNum">已报价<span>{{todo.offer}}</span>人</div>
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
        <errPage :param="err" v-show="todos.length==0"></errPage>
        <authenPopUp :param="Titles"></authenPopUp>
        <div class="black_shade" v-show="Titles.selectType" @click="cancelTitle">
        </div>
    </div>
</template>
<script>
import common from '../common/common.js'
import headFix from '../components/tools/head'
import sort from '../components/tools/sort'
import httpService from '../common/httpService.js'
import errPage from '../components/tools/err'
import perfectTitle from '../components/popUpType/perfectTitle'
import authenPopUp from '../components/popUpType/authenPopUp'
import filters from '../filters/filters'
import {
    mapGetters
} from 'vuex'
export default {
    data() {
            return {
                Titles: {
                    myTitle: true,
                    selectType: false
                },
                scrollTop: 0,
                newAdd: '',
                err: {
                    err: "很抱歉，没有找到相关资源",
                    url: '/static/icons/maomao.png',
                    next_step: '去发布',
                    router: '/releaseNeeds/1'
                },
                sortRouter: 'urgentNeed',
                sortArr: [{
                    name: '综合',
                    asc: 'comprehensive',
                    select: false,
                    class: 'sort_content_detail',
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
                keyword: '',
                topStatus: '',
                wrapperHeight: 0,
                allLoaded: false,
                bottomStatus: '',
                httpPraram: {
                    time: 0,
                    offer: 0,
                    duedate: 0,
                    location: [],
                    indentType: -1,
                    keyword: '',
                    page: 1,
                    pageSize: 10
                },
                headParam: {
                    title: '紧急求购',
                    keyword: '',
                    router: 'urgentNeed'
                }
            }
        },
        components: {
            headFix,
            sort,
            errPage,
            perfectTitle,
            authenPopUp
        },
        computed: {
            userInfor() {
                return this.$store.state.user.userInfor;
            },
            myTypes() {
                let ctype = this.$store.state.user.userInfor.ctype;
                let utype = this.$store.state.user.userInfor.utype;
                if (ctype == 0 && utype == 0) {
                    return true
                } else if (ctype == 0 && utype == 3) {
                    return true
                } else if (ctype == 3 && utype == 0) {
                    return true
                } else if (ctype == 3 && utype == 3) {
                    return true
                } else {
                    return false
                }
            }
        },
        methods: {
            getHttp(back) {
                if (this.httpPraram.page == 1) {
                    this.allLoaded = false;
                    common.$emit('show-load');
                }
                let _self = this;
                common.$emit('show-load');
                let url = common.urlCommon + common.apiUrl.most;
                let body = {
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
                        indentType: _self.httpPraram.indentType,
                        pn: _self.httpPraram.page,
                        pSize: _self.httpPraram.pageSize
                    }
                }
                if (common.KEY) {
                    url = common.addSID(common.urlCommon + common.apiUrl.most);
                    body.version = 1;
                    body.time = Date.parse(new Date()) + parseInt(common.difTime);
                    body.sign = common.getSign('biz_module=' + body.biz_module + '&biz_method=' + body.biz_method + '&time=' + body.time);
                }
                httpService.myAttention(url, body, function(suc) {
                    common.$emit('close-load');
                    if (_self.httpPraram.page == 1) {
                        _self.todos.splice(0, _self.todos.length);
                    }
                    let result = suc.data.biz_result.list;
                    _self.newAdd = suc.data.biz_result.newAdd;
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
                }, function(err) {
                    common.$emit('close-load');
                    common.$emit('message', err.data.msg);
                    if (back) {
                        back();
                    }
                })
            },
            getId(param) {
                let _self = this;
                this.sortArr[0].class = 'sort_content_detail'; //综合筛选回归
                this.sortArr[0].select = true; //综合筛选回归
                _self.param = true;
                _self.httpPraram.page = 1;
                _self.httpPraram[param.key] = param[param.key];
                _self.getHttp();
            },
            initial(param) {
                let _self = this;
                if (!param) {
                    _self.httpPraram.time = 0;
                    _self.httpPraram.offer = 0;
                    _self.httpPraram.duedate = 0;
                    _self.httpPraram.keyword = '';
                    _self.httpPraram.location = [];
                    _self.httpPraram.indentType = -1;
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
            indentType(num) {
                let _self = this;
                this.httpPraram.page = 1;
                _self.httpPraram.indentType = num;
                _self.getHttp();
            },
            clearKeyword() {
                let _self = this;
                this.httpPraram.page = 1;
                this.httpPraram.keyword = '';
                this.getHttp();
            },
            jumpDetail(id) {
                common.$emit('needToDetails', {
                    id: id,
                    type: ''
                });
                this.$router.push('/needDetails/' + id);
            },
            jumpApp(obj) {
                let _self = this;
                if (!common.customerId) {
                    function loadApp() {
                        common.$emit('setParam', 'backRouter', '/home');
                        if (common.wxshow) {
                            common.getWxUrl();
                        } else {
                            console.log(232131)
                            _self.$router.push('/login');
                        }
                    }
                    common.$emit('confirm', {
                        message: '请先登录',
                        title: '提示',
                        ensure: loadApp
                    });
                    return;
                } else {
                    common.$emit('needToReleaseOffer', obj.id);
                    this.$router.push('/releaseOffer/' + obj.id);
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
                        this.getHttp(function() {
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
                    _self.getHttp(function() {
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
            },
            cancelTitle() {
                let _self = this;
                _self.Titles.selectType = false;
            }
        },
        watch: {
            '$route': 'getScrollTop',
            scrollTop: function(val, oldVal) {
                if (val > 50) {
                    this.newAdd = '';
                } else {

                }
            }
        },
        created() {
            let _self = this;
            _self.headParam.keyword = common.pageParam.Urgentneed;
            _self.getHttp();
            if (common.KEY) _self.$store.dispatch('getUserInfor');
            common.$on('Urgentneed', function(item) {
                _self.headParam.keyword = item.keyWord;
                _self.httpPraram.keyword = item.keyWord;
                _self.httpPraram.page = 1;
                _self.getHttp();
            });
            common.$on('clearThisSearch', function(item) {
                _self.httpPraram.page = 1;
                _self.headParam.keyword = '';
                _self.httpPraram.keyword = '';
                if (common.KEY) _self.$store.dispatch('getUserInfor');
                _self.getHttp();
            })
            common.$on('urgentNeed-sort', function(item) {
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
            /* common.$on('listOfUrgent',function(item){
                 _self.getHttp();
             })*/
            common.$on('getInfo', function(item) {
               _self.getHttp();
            })
        },
        mounted() {
            this.wrapperHeight = document.documentElement.clientHeight - this.$refs.wrapper.getBoundingClientRect().top;
            this.$refs.wrapper.addEventListener('scroll', this.handleScroll);
        }
}
</script>

