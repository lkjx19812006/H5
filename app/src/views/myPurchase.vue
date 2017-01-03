<template>
    <div class="content my_purchase">
        <mt-header title="我的求购">
            <router-link to="/home" slot="left">
                <mt-button icon="back"></mt-button>
            </router-link>
        </mt-header>
        <myPurchaseSort v-on:postId="getId" :sort="sortRouter" :paramArr="sortArr"></myPurchaseSort>
        <div class="bg_white">
            <div class="page-loadmore-wrapper" ref="wrapper" :style="{ height: wrapperHeight + 'px' }">
                <mt-loadmore :top-method="loadTop" @top-status-change="handleTopChange" :bottom-method="loadBottom" @bottom-status-change="handleBottomChange" :bottom-all-loaded="allLoaded" ref="loadmore">
                    <ul class="page-loadmore-list">
                        <li v-for="todo in todos" class="page-loadmore-listitem list_content_item">
                            <div class="header_list">
                                <p class="left_p">发布日期：{{todo.pubdate}}</p>
                                <p class="right_p">{{todo.onSell}}</p>
                            </div>
                            <div class="first_line">
                                <p class="left">{{todo.breedName}}</p>
                                <p class="right"><span>{{todo.offer}}</span>人已报价</p>
                            </div>
                            <div class="second_line">
                                <p class="left">规格：{{todo.spec}}</p>
                                <p class="right">剩余：{{todo.days}}天</p>
                            </div>
                            <div class="third_line">
                                <p class="left">产地：{{todo.location}}</p>
                                <p class="right">需求数量：{{todo.number}}{{todo.unit}}</p>
                            </div>
                            <div class="button">
                                <p class="first_button" @click="jump(other_router,todo.id)">编辑</p>
                                <p class="second_button" @click="jump(router,todo.id)">查看报价</p>
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
import myPurchaseSort from '../components/tools/myPurchaseSort'
import httpService from '../common/httpService.js'
export default {
    data() {
            return {
                sortRouter: 'home',
                sortArr: [{
                    name: '发布日期',
                    asc: 'top',
                    url: '/static/icons/drop_down.png',
                    saveName: '发布日期',
                    class: 'sort_content_detail',
                    sortArr: [{
                        name: '由新到旧',
                        asc: 'low',
                        show: false,
                        pubdate: 1,
                        key: 'pubdate'
                    }, {
                        name: '由旧到新',
                        asc: 'top',
                        show: false,
                        pubdate: 2,
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
                }, {
                    name: '审核状态',
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
                }],
                router: "purchaseDetail",
                other_router: "revisePurchase",
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
                    pageSize: 20
                }
            }
        },
        components: {
            searchInput,
            myPurchaseSort
        },
        methods: {
            getHttp(back) {
                let _self = this;
                 common.$emit('show-load');
                  let url=common.addSID(common.urlCommon+common.apiUrl.most);
                  let body={biz_module:'intentionService',biz_method:'myBegIntentionList',version:1,time:0,sign:'',biz_param:{
                        sort:{
                            "offer":_self.httpPraram.offer,
                            "pubdate":_self.httpPraram.pubdate,
                            "duedate":_self.httpPraram.duedate
                        },
                        onSell:_self.httpPraram.testing,
                        pn:_self.httpPraram.page,
                        pSize:_self.httpPraram.pageSize         
                  }};
                  body.time=Date.parse(new Date())+parseInt(common.difTime);
                  body.sign=common.getSign('biz_module='+body.biz_module+'&biz_method='+body.biz_method+'&time='+body.time);
                  httpService.myResource(url,body,function(suc){
                    common.$emit('close-load');
                    
                    let listArr = suc.data.biz_result.list;
                    for (var item in listArr) {
                        var duedateDate = new Date(listArr[item].duedate);
                        var pubdateDate = new Date(listArr[item].pubdate);
                        var dateValue = duedateDate.getTime() - pubdateDate.getTime();
                        var days = Math.floor(dateValue / (24 * 3600 * 1000));
                        if (listArr[item].onSell == 1) {
                            listArr[item].onSell = '未审核'
                        }
                        if (listArr[item].onSell == 2) {
                            listArr[item].onSell = '已审核'
                        }
                        if (listArr[item].onSell == -2) {
                            listArr[item].onSell = '审核失败'
                        }
                        if (listArr[item].onSell == 4) {
                            listArr[item].onSell = '已下架'
                        }
                        listArr[item].days = days;
                        console.log(listArr[item].id);
                    }
                    _self.todos = listArr;
                    if(back){
                        back();
                    }
                }, function(err) {
                    common.$emit('close-load');
                    if(back){
                        back();
                    }
                })
            },
            getId(param) {
                let _self = this;
                _self.httpPraram.page = 1;
                _self.todos.splice(0, _self.todos.length);
                _self.httpPraram[param.key] = param[param.key];
                _self.getHttp()
            },
            jump:function(router,id){
                common.$emit("purchase-id",id);
                common.$emit("myPurToPurDetail",id);
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
           /* let _self = this;
            this.getHttp(0,0,0,0);
            common.$on("informMyPurchase",function (id){
                 _self.getHttp(0,0,0,0);
            })
*/
            let _self = this;
            _self.getHttp();
            //发布成功通知刷新
            common.$on('informMyPurchase', function (item) {
                _self.httpPraram.page = 1;
                _self.todos.splice(0, _self.todos.length);
                _self.getHttp();
            });
            //修改成功通知刷新
            common.$on("revisePurtoPur",function (item){
                _self.httpPraram.page = 1;
                _self.todos.splice(0, _self.todos.length);
                _self.getHttp();
            })
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

.low_price {}

.my_purchase .bg_white {
    margin-top: 0.5rem;
}

.my_purchase .bg_white .page-loadmore-wrapper .mint-loadmore {
    background: #F5F5F5;
}

.my_purchase .bg_white .page-loadmore-wrapper .page-loadmore-list .page-loadmore-listitem {
    float: left;
    width: 100%;
    min-height: 170px;
    border: 0;
    margin-bottom: 1rem;
}

.my_purchase .bg_white .page-loadmore-wrapper .page-loadmore-list li {
    margin-bottom: 1rem;
    background: white;
    padding: 0 1.5rem;
}

.my_purchase .bg_white .page-loadmore-wrapper .page-loadmore-list li .header_list {
    height: 2.9rem;
    text-align: left;
    border-bottom: 1px solid #E4E4E4;
    line-height: 2.9rem;
}

.my_purchase .bg_white .page-loadmore-wrapper .page-loadmore-list li .header_list .left_p {
    float: left;
    font-size: 0.9rem;
    color: #999999;
}

.my_purchase .bg_white .page-loadmore-wrapper .page-loadmore-list li .header_list .right_p {
    float: right;
    font-size: 1rem;
    color: #FA6705;
}

.my_purchase .bg_white .page-loadmore-wrapper .page-loadmore-list li .first_line {
    /*border: 1px solid red;*/
    /*width:100%;
    text-align: left;*/
    height: 4.4rem;
}

.my_purchase .bg_white .page-loadmore-wrapper .page-loadmore-list li .first_line .left {
    float: left;
    text-align: left;
    font-size: 1.4rem;
    color: #333333;
    /*border: 1px solid red;*/
}

.my_purchase .bg_white .page-loadmore-wrapper .page-loadmore-list li .first_line .right {
    float: right;
    text-align: right;
    font-size: 1.1rem;
    color: #666666;
    /*border: 1px solid red;*/
}

.my_purchase .bg_white .page-loadmore-wrapper .page-loadmore-list li .first_line .right span {
    color: #FA6705;
}

.my_purchase .bg_white .page-loadmore-wrapper .page-loadmore-list li .second_line {
    height: 1rem;
    margin-bottom: 0.5rem;
}

.my_purchase .bg_white .page-loadmore-wrapper .page-loadmore-list li .third_line {
    height: 1rem;
    margin-bottom: 1.5rem;
}

.my_purchase .bg_white .page-loadmore-wrapper .page-loadmore-list li .second_line .left,
.my_purchase .bg_white .page-loadmore-wrapper .page-loadmore-list li .third_line .left {
    float: left;
    text-align: left;
    font-size: 1rem;
    line-height: 1rem;
    color: #666666;
}

.my_purchase .bg_white .page-loadmore-wrapper .page-loadmore-list li .second_line .right,
.my_purchase .bg_white .page-loadmore-wrapper .page-loadmore-list li .third_line .right {
    float: right;
    text-align: right;
    font-size: 1rem;
    color: #666666;
    line-height: 1rem;
}

.my_purchase .bg_white .page-loadmore-wrapper .page-loadmore-list li .button {
    float: right;
    height: 2rem;
    /*border:1px solid red;*/
    text-align: center;
    line-height: 2rem;
    font-size: 1.1rem;
}

.my_purchase .bg_white .page-loadmore-wrapper .page-loadmore-list li .button .first_button {
    width: 3.6rem;
    height: 2rem;
    border: 1px solid #BFBFBF;
    border-radius: 3px;
    float: left;
    margin-right: 1rem;
}

.my_purchase .bg_white .page-loadmore-wrapper .page-loadmore-list li .button .second_button {
    width: 5.5rem;
    height: 2rem;
    border: 1px solid #BFBFBF;
    float: right;
    border-radius: 3px;
}
</style>
