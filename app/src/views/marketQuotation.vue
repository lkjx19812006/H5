<template>

    <div class="market_quotation whole">

        <mt-header fixed title="市场行情">

            <router-link to="/home" slot="left">
                <mt-button icon="back"></mt-button>
            </router-link>
        </mt-header>
                <div class="search" @click="jump">
                    <input type="text" placeholder="输入你想要的货物资源" disabled="true">
                    <img src="/static/images/search.png" class="search_image">
                </div>
       
           
                
                <div class="good_list">
                    <p class="good_list_header">*数据仅供参考！</p>
                    <div class="good_list_content">
                        <div class="list_content_header">
                            <p>品名</p>
                            <p>规格</p>
                            <p>产地</p>
                            <p>价格</p>
                            <input type="button" value="跌涨(元)">
                        </div>
            <div class="page-loadmore-wrapper" ref="wrapper" :style="{ height: wrapperHeight + 'px' }">
           <mt-loadmore :top-method="loadTop" @top-status-change="handleTopChange" :bottom-method="loadBottom" @bottom-status-change="handleBottomChange" :bottom-all-loaded="allLoaded" ref="loadmore">    
                        <ul class="first_ul">
                            <li v-for="(todo,index) in todos">
                                <div class="second_level" v-on:click="firstLevel(index,todo)">
                                    <p>{{todo.name}}</p>
                                    <p>{{todo.spec}}</p>
                                    <p>{{todo.area}}</p>
                                    <p>{{todo.unitprice}}</p>
                                    <p>{{todo.weekdowns}}&nbsp;
                                        <img src="/static/images/up.png" v-if="todo.weekdowns > 0">
                                        <img src="/static/images/down.png" v-if="todo.weekdowns < 0">
                                    </p>
                                </div>
                                <ul class="second_level_content" v-show="todo.show">
                                    <li v-for="item in todo.list">
                                        <p>{{item.name}}</p>
                                        <p>{{item.spec}}</p>
                                        <p>{{item.area}}</p>
                                        <p>{{item.unitprice}}</p>
                                        <p>{{item.weekdowns}}&nbsp;
                                            <img src="/static/images/up.png" v-if="todo.weekdowns > 0">
                                            <img src="/static/images/down.png" v-if="todo.weekdowns < 0">
                                        </p>
                                    </li>
                                </ul>
                            </li>
                        </ul>
                    </div>
                </div>
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
</template>
<script>
import common from '../common/common.js'
import httpService from '../common/httpService.js'
export default {
    data() {
            return {
                wrapperHeight: 0,
                onOrOff: false,
                todos: [],
                todos_li: {},
                topStatus: '',
                wrapperHeight: 0,
                ttwrapperHeight: 0,
                allLoaded: false,
                bottomStatus: '',
                show: false,
                httpPraram: {
                    page: 1,
                    pageSize: 10
                }
                
            }
        },
        methods: {
            getHttp(back){
                    let _self = this;
                    httpService.marketQuotation(common.urlCommon + common.apiUrl.most, {
                                biz_module:'breedService',
                                biz_method:'queryBreedPrice',
                                biz_param: {
                                       
                                    }
                                }, function(suc) {
                                    //console.log(suc);
                                    let data = suc.data.biz_result.list;                
                                    for (var item in data) {
                                        data[item].show = false;
                                    }
                                    _self.todos = data;
                                    if(back){
                                        back();
                                    }
                                    
                                }, function(err) {
                                    
                                    common.$emit('message', err.data.msg);
                                    if(back){
                                        back();
                                    }
                                })
            },
           
            jump(){
                common.$emit("setParam","router",'lowPriceRes');
                this.$router.push("search");
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


            
        },
        mounted() {

            this.wrapperHeight = document.documentElement.clientHeight - this.$refs.wrapper.getBoundingClientRect().top;
        }
}
</script>
<style scoped>


.market_quotation {
   /* position: relative;*/
}

.market_quotation .mint-header {
    background-color: white;
    color: #313232;
}

.market_quotation .search {
    height: 60px;
    background: #F2F2F2;
    position: relative;
}

.market_quotation .search input {
    width: 80%;
    height: 30px;
    border-radius: 1.28rem;
    border: 0;
    outline: none;
    padding-left: 5%;
    background: #fff;
    border: 1px solid #ddd;
    margin-top: 15px;
}

.market_quotation .search .search_image {
    width: 2rem;
    height: 2rem;
    position: absolute;
    right: 13%;
    top: 18px;
}

.market_quotation .good_list {
    width: 100%;
    position: relative;
}

.market_quotation .good_list .good_list_header {
    width: 100%;
    margin: 1.7066rem auto;
    font-size: 1.10929rem;
    color: #FA6705;
}

.market_quotation .good_list .good_list_content {
    margin-top: 1.7066rem;
    width: 100%;
}

.market_quotation .good_list .good_list_content .first_ul {
    border-bottom: 1px solid #CCCCCC;
}

.market_quotation .list_content_header {
    display: flex;
    flex-direction: row;
    margin-bottom: 0.213rem;
    padding-right: 0.8rem;
}

.market_quotation .list_content_header p {
    flex: 1;
    font-size: 1.11rem;
}

.market_quotation .list_content_header input {
    outline: none;
    border: 0;
    width: 5.333rem;
    height: 2.133rem;
    background: #FA6705;
    color: white;
    border-radius: 4px;
}

.market_quotation .second_level {
    width: 100%;
    display: flex;
    flex-direction: row;
    height: 4.267rem;
    border-top: 1px solid #CCCCCC;
    padding-right: 0.8rem;
}

.market_quotation .second_level p {
    flex: 1;
    font-size: 1.02396rem;
    color: #666666;
    line-height: 4.267rem;
}

.market_quotation .second_level_content {
    border-top: 1px solid #DFDFDF;
    background: #fff;
}

.market_quotation .second_level_content li {
    font-size: 1.024rem;
    color: #666666;
    line-height: 4.267rem;
    display: flex;
    flex-direction: row;
}

.market_quotation .second_level_content li p {
    flex: 1;
    font-size: 1.024rem;
    color: #666666;
    line-height: 4.267rem;
}

.market_quotation .second_level_content li p img {
    height: 1.024rem;
}
</style>
