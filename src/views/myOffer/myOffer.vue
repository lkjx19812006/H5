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
                    .black {
                        color: #333;
                    }
                    .red {
                        color: #f05555;
                    }
                    .gray {
                        color: #999;
                    }
                    .left {
                        font-size: 15px;
                    }
                    .right {
                        color: #CACACA;
                        font-size: 14px;
                        flex:1;
                        text-align: right;
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
                            text-align: left;
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

.status {
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    background-color: #fff;
    .items {
        flex: 1;
        height: 40px;
        line-height: 40px;
        font-size: 14px;
    }
    .red {
        color: #fa6705;
    }
}

.red {
    color: #fa6705;
}
</style>
<template>
    <div class="my_needs">
        <div>
            <myHeader :param="param"></myHeader>
            <div class="status">
                <div class="items" v-bind:class="{red:todo.show}" v-for="todo in status" @click="changeStatus(todo)">{{todo.name}}</div>
            </div>
        </div>
        <div class="page-loadmore-wrapper" ref="wrapper" :style="{ height: wrapperHeight + 'px' }" v-show="todos.length!=0">
            <mt-loadmore :top-method="loadTop" @top-status-change="handleTopChange" :bottom-method="loadBottom" @bottom-status-change="handleBottomChange" :bottom-all-loaded="allLoaded" ref="loadmore">
                <ul class="main">
                    <li v-for="todo in todos" @click="jump(router,todo.intentionId)">
                        <div class="box">
                            <div class="top">
                                <div class="left black" v-show="todo.accept == 0">报价状态:
                                    <span class="black">{{todo.accept | myOfferStatus}}</span>
                                </div>
                                <div class="left" v-show="todo.accept == 1">报价状态:
                                    <span class="red">{{todo.accept | myOfferStatus}}</span>
                                </div>
                                <div class="left" v-show="todo.accept == 2">报价状态:
                                    <span class="gray">{{todo.accept | myOfferStatus}}</span>
                                </div>
                                <div class="left black" v-show="todo.accept == 3">报价状态:
                                    <span class="black">{{todo.accept | myOfferStatus}}</span>
                                </div>
                                <div class="right">{{todo.otime | timeFormats}}</div>
                            </div>
                            <div class="content">
                                <div class="left">
                                    <div class="breed_name">{{todo.breedName}} {{todo.number}}({{todo.unit}})</div>
                                    <div class="spec">{{todo.location,4 | filterTxt}}&nbsp;&nbsp;&nbsp;{{todo.spec,4 | filterTxt}}</div>
                                    <div class="spec">裸价: <span class="red">{{todo.price}}</span>元/{{todo.unit}}</div>
                                </div>
                                <div class="right">
                                    <div class="date">
                                        <div><img src="/static/icon/times.png"></div>
                                        <div>{{todo.duedate | needTimeDay}}</div>
                                        <!-- <div v-if="todo.especial !== 1 && todo.type == 0">长期</div> -->
                                    </div>
                                    <div class="detail">
                                        报价详情
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
import httpService from '../../common/httpService.js'
import filters from '../../filters/filters'
import errPage from '../../components/tools/err'
/**
 * https://github.com/ZZKll/
 *  .--,       .--,
 * ( (  \.---./  ) )
 *  '.__/o   o\__.'
 *     {=  ^  =}
 *      >  -  <
 *     /       \
 *    //       \\
 *   //|   .   |\\
 *   "'\       /'"_.-~^`'-.
 *      \  _  /--'         `
 *    ___)( )(___
 *   (((__) (__)))    高山仰止,景行行止.虽不能至,心向往之。
 */
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
                router: "/offerDetail",
                // other_router: "revisePurchase",
                other_router: "releaseNeed",
                todos: [],
                topStatus: '',
                wrapperHeight: 0,
                allLoaded: false,
                bottomStatus: '',
                httpPraram: {
                    page: 1,
                    pageSize: 10,
                    accept: '-1'
                },
                status: [{
                    name: '全部',
                    accept: '-1',
                    show: true
                }, {
                    name: '处理中',
                    accept: '0',
                    show: false
                }, {
                    name: '已采用',
                    accept: '1',
                    show: false
                }, {
                    name: '未采用',
                    accept: '2',
                    show: false
                }]
            }
        },
        components: {
            searchInput,
            myHeader,
            errPage
        },
        methods: {
            getHttp(back) {
                let _self = this;
                if (_self.httpPraram.page == 1) {
                    _self.allLoaded = false;
                }
                common.$emit('show-load');
                let url = common.addSID(common.urlCommon + common.apiUrl.most);
                let body = {
                    biz_module: 'intentionOfferService',
                    biz_method: 'htmlMyIntentionOfferList',
                    biz_param: {
                        accept: _self.httpPraram.accept,
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
            changeStatus(todo) {
                let _self = this;
                for (var i = 0; i < _self.status.length; i++) {
                    _self.status[i].show = false;
                }
                todo.show = true;
                _self.httpPraram.accept = todo.accept;
                _self.getHttp();
            },
            jump: function(router, id) {
                common.$emit('myOfferToOfferDetail', id);
                //console.log(id)
                this.$router.push(router + '/' + id);
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
            common.$on('inforMyOffer', function(item) {
                _self.httpPraram.page = 1;
                _self.getHttp();
            });
            // common.$on("revisePurtoPur", function(item) {
            //     _self.httpPraram.page = 1;
            //     _self.getHttp();
            // })
        },
        mounted() {
            this.wrapperHeight = document.documentElement.clientHeight - this.$refs.wrapper.getBoundingClientRect().top - 90;
            this.$refs.wrapper.addEventListener('scroll', this.handleScroll);
        }

}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
