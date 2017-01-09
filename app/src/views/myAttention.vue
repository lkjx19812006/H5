<template>
  <div class="my_attention">        
         <attentionHead :param = "param" v-on:tab="tabAttention"></attentionHead>
           <div @click="jumpSearch" style="float:left;width:100%">
                <longSearch :keyword="httpPraram.keyword" v-on:clearSearch="clearKeyword" :param="myShow"></longSearch>
           </div>
                <div class="bg_white">
                <div class="page-loadmore-wrapper" ref="wrapper" :style="{ height: wrapperHeight + 'px' }" v-show="todos.length!=0">
                    <mt-loadmore :top-method="loadTop" @top-status-change="handleTopChange" :bottom-method="loadBottom" @bottom-status-change="handleBottomChange" :bottom-all-loaded="allLoaded" ref="loadmore">
                    <ul class="page-loadmore-list" v-show="param.show">
                        <li v-for="todo in todos" class="page-loadmore-listitem list_content_item"  v-on:click="jump(todo.id)">
                            <img :src="todo.image[0]" class="list_images">
                            <div class="res_content">
                                <div class="res_content_center">
                                    <div><img src="/static/images/bao.png"><img src="/static/images/zheng.png">{{todo.breedName}}</div>
                                    <p class="spec">规格：<span>{{todo.spec}}</span></p>
                                    <p>产地：<span>{{todo.location}}</span></p>
                                    <p class="time_font">发布时间：<span>{{todo.pubdate | timeFormat}}</span></p>
                                </div>
                                <div class="res_content_right">
                                    <p>{{todo.price}}<span>元/kg</span></p>
                                    <button class="mint-button mint-button--primary mint-button--small">立即购买</button>
                                </div>
                            </div>
                        </li>
                    </ul>
                    <ul class="page-loadmore-list_second" v-show="!param.show"  >
                        <li v-for="todo in todos" class="page-loadmore-listitem list_content_item"  v-on:click="jumpNeed(todo.id)">
                            <div class="center">
                                <img src="/static/icons/england.png"  class="flag">
                                <div class="title">
                                    <div><img src="/static/icons/impatient.png"><span>{{todo.breedName}}</span></div>
                                    <p>发布时间：{{todo.pubdate | timeFormat}}</p>
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
                                        <p>{{todo.duedate | timeDays(todo.pubdate)}}<span>天</span></p>
                                        <p>{{todo.number}}<span>{{todo.unit}}</span></p> 
                                    </div>
                                </div>
                            </div>
                            <div class="bottom">
                                <p>已报价<span>{{todo.offer}}</span>人</p>
                                <button class="mint-button mint-button--primary mint-button--small">我要报价</button>
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
import longSearch from '../components/tools/longSearch'
import attentionHead from '../components/tools/attentionHead'
import validation from '../validation/validation.js'
import httpService from '../common/httpService.js'
import filters from '../filters/filters'
export default {
    data() {
            return {
                myShow:{
                    myShow:true
                },
                param:{
                    name:'资源关注',
                    other_name:'求购关注',
                    show:true,
                    router:"home"
                },
                show:true,
                selected:"1",
                resourceArr:[],
                needArr:[],
                keyword:'',
                todos: [],
                topStatus: '',
                wrapperHeight: 0,
                ttwrapperHeight: 0,
                allLoaded: false,
                bottomStatus: '',
                httpPraram: {
                    keyword: '',
                    intentionType: 1,
                    page: 1,
                    pageSize: 20
                }
            }
        },
        components: {
            longSearch,
            attentionHead
        },
        methods: {
            jumpSearch() {
                common.$emit('setParam', 'router', 'myAttention')
                this.$router.push('search');
            },
            jump(id){
                common.$emit('resourceDetail', id);
                this.$router.push('resourceDetail/' + id);
            },
            jumpNeed(id){
                common.$emit("needToDetail", id);
                this.$router.push('needDetail/' + id);
            },
            resorceHttp(back) {
                let _self = this;
                if(_self.httpPraram.page==1){
                    _self.todos.splice(0,_self.todos.length)
                }
                common.$emit('show-load');
                let url = common.addSID(common.urlCommon + common.apiUrl.most);
                let body = {
                    biz_module: 'intentionService',
                    biz_method: 'attentionIntentionList',
                    version: 1,
                    time: 0,
                    sign: '',
                    biz_param: {
                        breedName: _self.httpPraram.keyword,
                        pn: _self.httpPraram.page,
                        pSize: _self.httpPraram.pageSize,
                        intentionType: _self.httpPraram.intentionType
                    }
                };

                body.time = Date.parse(new Date()) + parseInt(common.difTime);
                body.sign = common.getSign('biz_module=' + body.biz_module + '&biz_method=' + body.biz_method + '&time=' + body.time);
                httpService.myAttention(url, body, function(suc) {
                    common.$emit('close-load');
                    let result = suc.data.biz_result.list;
                    console.log(result);
                    for (let i = 0; i < result.length; i++) {
                            _self.todos.push(result[i]);
                        }
                    // common.$emit('translateDate', result,_self.todos);
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
            clearKeyword() {
                let _self = this;
                this.httpPraram.page = 1;
                this.todos.splice(0, _self.todos.length);
                this.httpPraram.keyword = '';
                this.resorceHttp();
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
                        this.resorceHttp(function() {
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
                    _self.resorceHttp(function() {
                        _self.$refs.loadmore.onTopLoaded(id);
                    });

                }, 1500);
            },
            tabAttention(param) {
                let _self = this;
                console.log(param)
                if (param == true) {
                    _self.httpPraram.intentionType = 1;
                    _self.todos.splice(0, _self.todos.length);
                    _self.resorceHttp();
                }else if(param == false){
                    _self.httpPraram.intentionType = 0;
                    _self.todos.splice(0, _self.todos.length);
                    _self.resorceHttp();
                }
            }


        },
        created() {

            let _self = this;

            _self.resorceHttp();

            common.$on("informResAttention", function(id) { //来自资源页面的提示刷新
                // if(id==0){
                //     _self.param.show=true;
                // }else{
                //     _self.param.show=false;
                // }
                // _self.httpPraram.intentionType = id;
                _self.httpPraram.page = 1;
                _self.resorceHttp();
            });

            common.$on('attention', function(item) { //来自搜索的提示刷新
                //console.log(item)
                _self.httpPraram.keyword = item.keyWord;
                _self.httpPraram.page = 1;
                _self.todos.splice(0, _self.todos.length);
                _self.resorceHttp();
            });

        },

        mounted() {
            this.wrapperHeight = document.documentElement.clientHeight - this.$refs.wrapper.getBoundingClientRect().top - 100;

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

.low_price {}



.my_attention .bg_white{
    background: #F5F5F5;
    padding: 0 10px;
}
.my_attention .bg_white .page-loadmore-wrapper .page-loadmore-list{
    margin-top:-10px;
}
.my_attention .bg_white .page-loadmore-wrapper .page-loadmore-list .page-loadmore-listitem {
    float: left;
    width: 100%;
    height: 9.55rem;
    margin-top: 10px;
    background: white;
    border-radius: 3px;
}

.my_attention .bg_white .page-loadmore-wrapper .page-loadmore-list li .list_images {
    height: 8.1rem;
    width: 25%;
    left: 10px;
    margin: 10px 10px 10px 0;
    position: absolute;
}

.my_attention .bg_white .page-loadmore-wrapper .page-loadmore-list li div {
    float: left;
    text-align: left;
    line-height: 20px;
    font-size: 1.3rem;
    margin-bottom: 8px;
}

.my_attention .bg_white .page-loadmore-wrapper .page-loadmore-list li .res_content_center img{
    float: left;
    width: 1.2rem;
    margin-right: 4px;
}

.my_attention .bg_white .page-loadmore-wrapper .page-loadmore-list li .res_content_center p {
    float: left;
    width: 100%;
    padding-right: 90px;
    line-height: 18px;
    text-align: left;
    font-size: 1.2rem;
    color: #666;
    margin-top: 0.5rem;
}
.my_attention .bg_white .page-loadmore-wrapper .page-loadmore-list li .res_content_center .spec{
    margin-top: 0.3rem;
}
.my_attention .bg_white .page-loadmore-wrapper .page-loadmore-list .res_content {
    width: 100%;
    padding-left: 30%;
    padding-top: 10px;
}

.my_attention .bg_white .page-loadmore-wrapper .page-loadmore-list .res_content .res_content_right{
    position: absolute;
    max-width: 80px;
    height: 95px;
    margin: 0;
    right: 10px;
    
}

.my_attention .bg_white .page-loadmore-wrapper .page-loadmore-list .res_content .res_content_right p{
    font-size: 1.25rem;
    margin-top: 0px;
    color: #EC6817;
}

.my_attention .bg_white .page-loadmore-wrapper .page-loadmore-list .res_content .res_content_right button{
  position: absolute;
  bottom: 0px;
  background: #EC6817;
  font-size: 1.109rem;
  width: 5.97rem;
  right: 0px;
  height: 2.38rem;
  padding: 0 5px;
}

.my_attention .bg_white .page-loadmore-wrapper .page-loadmore-list .res_content .time_font{
    font-size: 1rem;
    color: #999;
}
/*.my_attention .right_text {
    font-size: 1.2rem;
    padding-left: 1.5rem;
    background: url(/static/images/tab.png) no-repeat left center;
    background-size: 1.2rem;
}

.my_attention .select_box {
    
    margin-top: 50px;
    border-bottom: 1px solid #DFDFDF;
    font-size: 2.5rem;
    background-color: white;
    padding: 1rem;
}

.my_attention .bg_white {
    
}

.my_attention .mint-navbar {
    width: 70%;
    margin-left: 15%;
}

.my_attention .mint-navbar .mint-tab-item {
    padding: 1.2rem 0;
    line-height: 0 !important;
    border: 1px solid #FA6705;
}

.my_attention .mint-navbar .mint-tab-item.is-selected {
    background-color: #FA6705;
    color: white;
    margin: 0;
}

.my_attention .bg_white .page-loadmore-wrapper .page-loadmore-list .page-loadmore-listitem {
    float: left;
    width: 100%;
    min-height: 11.5rem;
}

.my_attention .bg_white .page-loadmore-wrapper .page-loadmore-list li .list_images {
    
    height: 9.4rem;
    width: 8.533rem;
    position: absolute;
    left: 10px;
    margin: 10px 10px 10px 0;
}

.my_attention .bg_white .page-loadmore-wrapper .page-loadmore-list li div {
    float: left;
    text-align: left;
    line-height: 20px;
    font-size: 1.3rem;
    margin-bottom: 8px;
}

.my_attention .bg_white .page-loadmore-wrapper .page-loadmore-list li .res_content_center img {
    float: left;
    max-height: 1.4rem;
    margin-bottom: 1.5rem;
}

.my_attention .bg_white .page-loadmore-wrapper .page-loadmore-list li .res_content_center div {
    font-size: 1.6rem;
}

.my_attention .bg_white .page-loadmore-wrapper .page-loadmore-list li .res_content_center p {
    float: left;
    width: 100%;
    padding-right: 90px;
    line-height: 18px;
    text-align: left;
    font-size: 1.2rem;
    color: #666;
    margin-bottom: 0.3rem;
}

.my_attention .bg_white .page-loadmore-wrapper .page-loadmore-list .res_content {
    width: 100%;
    padding-left: 120px;
    padding-top: 10px;
}

.my_attention .bg_white .page-loadmore-wrapper .page-loadmore-list .res_content .res_content_right {
    position: absolute;
    max-width: 80px;
    height: 10rem;
    margin: 0;
    right: 10px;
   
}

.my_attention .bg_white .page-loadmore-wrapper .page-loadmore-list .res_content .res_content_right p {
    font-size: 1.6rem;
    margin-top: 10px;
    color: #EC6817;
}

.my_attention .bg_white .page-loadmore-wrapper .page-loadmore-list .res_content .res_content_right p span {
    font-size: 1rem;
}

.my_attention .bg_white .page-loadmore-wrapper .page-loadmore-list .res_content .res_content_right button {
    position: absolute;
    bottom: 10px;
    background: #EC6817;
    width: 6.5rem;
    right: 0px;
    height: 2.5rem;
    line-height: 2rem;
    font-size: 1.2rem;
    padding: 0;
}

.my_attention .bg_white .page-loadmore-wrapper .page-loadmore-list .res_content .time_font {
    font-size: 1.2rem;
    color: #999;
    margin-top: 0.2rem;
}*/




.urgent_need {}




.my_attention .bg_white .page-loadmore-wrapper .page-loadmore-list_second {
     margin-top: -10px;
     position: relative;
}
.my_attention .bg_white .page-loadmore-wrapper .page-loadmore-list_second .page-loadmore-listitem {
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





.my_attention .bg_white .page-loadmore-wrapper .page-loadmore-list_second .page-loadmore-listitem .bottom {
    float: left;
    width: 100%;
    padding: 0 10px;
    height:4.18rem;
}

.my_attention .bg_white .page-loadmore-wrapper .page-loadmore-list_second .page-loadmore-listitem .bottom p {
    line-height: 4.18rem;
    float: left;
    font-size: 1.2rem;
    color: #666;
}

.my_attention .bg_white .page-loadmore-wrapper .page-loadmore-list_second .page-loadmore-listitem .bottom span {
    color: #EC6817;
}

.my_attention .bg_white .page-loadmore-wrapper .page-loadmore-list_second .page-loadmore-listitem .bottom button {
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

.my_attention .bg_white .page-loadmore-wrapper .page-loadmore-list_second .page-loadmore-listitem .center {
    float: left;
    width: 100%;
    border-bottom: 1px solid #ddd;
    padding: 0 10px 1.066rem 10px;
   
    position: relative;
}
.my_attention .bg_white .page-loadmore-wrapper .page-loadmore-list_second .page-loadmore-listitem{
    position: 
}
.my_attention .bg_white .page-loadmore-wrapper .page-loadmore-list_second .page-loadmore-listitem .flag{
    position: absolute;
    top:0px;
    right:0px;
    width:1.7rem;
    height:1.23rem;
}
.my_attention .bg_white .page-loadmore-wrapper .page-loadmore-list_second .page-loadmore-listitem .center div {
    float: left;
}

.my_attention .bg_white .page-loadmore-wrapper .page-loadmore-list_second .page-loadmore-listitem .center .title {
    width: 100%;
    font-size: 1.365rem;
    color: #333;
    line-height: 1.365rem;
    /*margin: 10px 0;*/
}
.my_attention .bg_white .page-loadmore-wrapper .page-loadmore-list_second .page-loadmore-listitem .center .title>div{
    margin-top:1.06rem;
}
.my_attention .bg_white .page-loadmore-wrapper .page-loadmore-list_second .page-loadmore-listitem .center .title p {
    float: right;
    font-size: 1rem;
    color: #999;
    margin:1.2rem 2.559rem 0 0;

}

.my_attention .bg_white .page-loadmore-wrapper .page-loadmore-list_second .page-loadmore-listitem .center .title img { 
    width:1.2rem;
    margin-right: 5px;
}
.my_attention .bg_white .page-loadmore-wrapper .page-loadmore-list_second .page-loadmore-listitem .center .detail{
    width:100%;
    
    display: flex;
    flex-direction:column;
}
.my_attention .bg_white .page-loadmore-wrapper .page-loadmore-list_second .page-loadmore-listitem .center .detail div{
    flex:1;
    display:flex;
    flex-direction:row;
    margin-top: 1.279rem;
    
}
.my_attention .bg_white .page-loadmore-wrapper .page-loadmore-list_second .page-loadmore-listitem .center .detail .last p{
    color:#666666;
}
.my_attention .bg_white .page-loadmore-wrapper .page-loadmore-list_second .page-loadmore-listitem .center .detail div p{
    flex:1;
    
    
    font-size: 1.109rem;
    color:#424242;
}
/*.my_attention .bg_white .page-loadmore-wrapper .page-loadmore-list_second .page-loadmore-listitem {
    float: left;
    width: 100%;
    min-height: 100px;
    padding: 10px;
    height: auto;
    background: white;
}

.my_attention .bg_white .page-loadmore-wrapper .page-loadmore-list_second .page-loadmore-listitem .flag {
    float: left;
    width: 100%;
    padding-bottom: 10px;
    line-height: 17px;
    text-align: left;
    border-bottom: 1px solid #ddd;
}

.my_attention .bg_white .page-loadmore-wrapper .page-loadmore-list_second .page-loadmore-listitem .flag img {
    max-height: 15px;
    float: left;
}

.my_attention .bg_white .page-loadmore-wrapper .page-loadmore-list_second .page-loadmore-listitem .flag span {
    margin-left: 5px;
    color: #666;
    font-size: 1.1rem;
}

.my_attention .bg_white .page-loadmore-wrapper .page-loadmore-list_second .page-loadmore-listitem .bottom {
    float: left;
    width: 100%;
    margin-top: 10px;
}

.my_attention .bg_white .page-loadmore-wrapper .page-loadmore-list_second .page-loadmore-listitem .bottom p {
    line-height: 24px;
    float: left;
    font-size: 1.2rem;
    color: #666;
}

.my_attention .bg_white .page-loadmore-wrapper .page-loadmore-list_second .page-loadmore-listitem .bottom span {
    color: #EC6817;
}

.my_attention .bg_white .page-loadmore-wrapper .page-loadmore-list_second .page-loadmore-listitem .bottom button {
    float: right;
    background: #EC6817;
    font-size: 10px;
    width: 6.5rem;
    height: 2.5rem;
    padding: 0;
    border: none;
    color: #fff;
    font-size: 1.2rem;
    line-height: 0;
}

.my_attention .bg_white .page-loadmore-wrapper .page-loadmore-list_second .page-loadmore-listitem .center {
    float: left;
    width: 100%;
    border-bottom: 1px solid #ddd;
    padding-bottom: 10px;
}

.my_attention .bg_white .page-loadmore-wrapper .page-loadmore-list_second .page-loadmore-listitem .center div {
    float: left;
}

.my_attention .bg_white .page-loadmore-wrapper .page-loadmore-list_second .page-loadmore-listitem .center .title {
    width: 100%;
    font-size: 1.3rem;
    color: #333;
    line-height: 15px;
    margin: 10px 0;
}

.my_attention .bg_white .page-loadmore-wrapper .page-loadmore-list_second .page-loadmore-listitem .center .title div {
    font-size: 1.6rem;
}

.my_attention .bg_white .page-loadmore-wrapper .page-loadmore-list_second .page-loadmore-listitem .center .title p {
    float: right;
    font-size: 1.1rem;
    color: #999;
}

.my_attention .bg_white .page-loadmore-wrapper .page-loadmore-list_second .page-loadmore-listitem .center .title img {
    max-height: 1.4rem;
}

.my_attention .bg_white .page-loadmore-wrapper .page-loadmore-list_second .page-loadmore-listitem .center .detail {
    width: 100%;
    line-height: 18px;
}

.my_attention .bg_white .page-loadmore-wrapper .page-loadmore-list_second .page-loadmore-listitem .center .detail p {
    float: left;
    font-size: 1.2rem;
    color: #666;
}

.my_attention .bg_white .page-loadmore-wrapper .page-loadmore-list_second .page-loadmore-listitem .center .detail span {
    color: #EC6817;
}

.my_attention .bg_white .page-loadmore-wrapper .page-loadmore-list_second .page-loadmore-listitem .center .detail p:last-child {
    float: right;
}*/
</style>
