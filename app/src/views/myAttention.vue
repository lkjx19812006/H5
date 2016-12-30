<template>
  <div class="my_attention">
        <mt-header :title="title">
            <router-link to="/home" slot="left">
                <mt-button icon="back"></mt-button>
            </router-link>
            <mt-button  slot="right" class="right_text" @click="tabAttention">
                   {{more}}
           </mt-button>

        </mt-header>
        <div @click="jumpSearch">
            <search-input :keyword="httpPraram.keyword" v-on:clearSearch="clearKeyword"></search-input>
        </div>
      
      
        
                <div class="bg_white">
                <div class="page-loadmore-wrapper" ref="wrapper" :style="{ height: wrapperHeight + 'px' }">
                    <mt-loadmore :top-method="loadTop" @top-status-change="handleTopChange" :bottom-method="loadBottom" @bottom-status-change="handleBottomChange" :bottom-all-loaded="allLoaded" ref="loadmore">
                 
                    <ul class="page-loadmore-list" v-show="show">
                        <li v-for="todo in todos" class="page-loadmore-listitem list_content_item">
                                <img src="/static/images/1.jpg" class="list_images">
                                <div class="res_content">
                                    <div class="res_content_center">
                                        <div><img src="/static/icons/bao.png">{{todo.breedName}}</div>
                                        <p>规格：<span>{{todo.spec}}</span></p>
                                        <p>产地：<span>{{todo.location}}</span></p>
                                        <p class="time_font">发布时间：<span>{{todo.pubdate}}</span></p>
                                    </div>
                                    <div class="res_content_right">
                                    <p>{{todo.price}}<span>元/kg</span></p>
                                    <button class="mint-button mint-button--primary mint-button--small">立即购买</button>
                                    </div>
                                </div>
                            </li>
                        </ul>
                   
                    <ul class="page-loadmore-list_second" v-show="!show">
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
import searchInput from '../components/tools/inputSearch'
import validation from '../validation/validation.js'
import httpService from '../common/httpService.js'
export default {
    data() {
            return {
                more:"求购关注",
                title:"资源关注",
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
            searchInput
            
        },
        methods: {
            jumpSearch(){
                common.$emit('setParam','router','myAttention')
                this.$router.push('search');
            },
            resorceHttp(back){
                  let _self = this;
                  common.$emit('show-load');
                  let url=common.addSID(common.urlCommon+common.apiUrl.most);
                  let body={biz_module:'intentionService',biz_method:'attentionIntentionList',version:1,time:0,sign:'',biz_param:{
                        breedName:_self.httpPraram.keyword,
                        pn:_self.httpPraram.page,
                        pSize:_self.httpPraram.pageSize,
                        intentionType:_self.httpPraram.intentionType
                  }};
                  
                  body.time=Date.parse(new Date())+parseInt(common.difTime);
                  body.sign=common.getSign('biz_module='+body.biz_module+'&biz_method='+body.biz_method+'&time='+body.time);
                  httpService.myAttention(url,body,function(suc){
                    common.$emit('close-load');
                    
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
                    /*if(_self.httpPraram.intentionType == 1){
                        _self.resourceArr = result;
                    }else if(_self.httpPraram.intentionType == 0){
                        _self.needArr = result;
                    }*/
                    _self.todos = result;
                    if(back){
                        back();
                    }


                  },function(err){
                      common.$emit('close-load');
                         if(back){
                            back();
                        }
                  })
            },
           /* needHttp(key){
                let _self = this;
                common.$emit('show-load');
                  let otherurl=common.addSID(common.urlCommon+common.apiUrl.most);
                  let otherbody={biz_module:'intentionService',biz_method:'attentionIntentionList',version:1,time:0,sign:'',biz_param:{
                        breedName:key,
                        pn:"1",
                        pSize:"20",
                        intentionType:"0"
                  }};
                  
                  otherbody.time=Date.parse(new Date())+parseInt(common.difTime);
                  otherbody.sign=common.getSign('biz_module='+otherbody.biz_module+'&biz_method='+otherbody.biz_method+'&time='+otherbody.time);
                  httpService.myAttention(otherurl,otherbody,function(suc){
                    common.$emit('close-load');
                    console.log(suc.data.biz_result.list);
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
                    _self.needArr = result;
                    
                  },function(err){
                    common.$emit('close-load');
                  })
            },*/
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
            tabAttention(){
                let _self = this;
                this.show = !this.show;
                if(this.show == true){
                    _self.more = '求购关注';
                    _self.title = '资源关注';
                   
                    _self.httpPraram.intentionType = 1;
                    _self.resorceHttp();
                }else{
                    _self.more = '资源关注';
                    _self.title = '求购关注';
                    _self.httpPraram.intentionType = 0;
                    _self.resorceHttp();
                }
            }
            

        },
        created() {

            let _self = this; 
           
            _self.resorceHttp(); 
           
            common.$on("informResAttention",function (id){  //来自资源页面的提示刷新
                 _self.resorceHttp(); 
            });
             
            common.$on("informPurAttention",function (id){   //来自求购页的提示刷新       
                _self.resorceHttp(); 
            });
            common.$on('attention', function (item) {   //来自搜索的提示刷新
                _self.httpPraram.keyword = item;
                _self.httpPraram.page = 1;
                _self.todos.splice(0, _self.todos.length);
                _self.resorceHttp();
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

.low_price {}
/*.my_attention .right_header{
    height:100%;
    width:100%;
    border:1px solid red;
}
.my_attention .right_header .tab{
    position: absolute;
    width:1.2rem;
    height:1.2rem;
    top:0.8rem;
    left:0;
}
.my_attention .right_header .right_text{
    padding-left: 2rem;
    font-size: 1.2rem;
    line-height: 4rem;
}*/
.my_attention .right_text{
    
    font-size: 1.2rem;
    padding-left: 2rem;
    background: url(/static/images/tab.png) no-repeat left center;
}
.my_attention .select_box{
    /*position: relative;
    top:50px;*/
    margin-top: 50px;
    
    border-bottom: 1px solid #DFDFDF;
    font-size: 2.5rem;
    background-color: white;
    padding: 1rem;

}
.my_attention .bg_white{
    /*position: fixed;*/

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
    /*height: 80px;
    max-width: 100px;
    left: 10px;
    margin: 10px 10px 10px 0;
    position: absolute;*/
    height:9.4rem;
    width:8.533rem;
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

.my_attention .bg_white .page-loadmore-wrapper .page-loadmore-list li .res_content_center img{
    float: left;
    max-height: 1.4rem;
    margin-bottom: 1.5rem;
}
.my_attention .bg_white .page-loadmore-wrapper .page-loadmore-list li .res_content_center div{
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

.my_attention .bg_white .page-loadmore-wrapper .page-loadmore-list .res_content .res_content_right{
    position: absolute;
    max-width: 80px;
    height: 10rem;
    margin: 0;
    right: 10px;
    /*border:1px solid red;*/
}

.my_attention .bg_white .page-loadmore-wrapper .page-loadmore-list .res_content .res_content_right p{
    font-size: 1.6rem;
    margin-top: 10px;
    color: #EC6817;
}
.my_attention .bg_white .page-loadmore-wrapper .page-loadmore-list .res_content .res_content_right p span{
    font-size: 1rem;
}
.my_attention .bg_white .page-loadmore-wrapper .page-loadmore-list .res_content .res_content_right button{
  position: absolute;
  bottom: 10px;
  background: #EC6817;
  
  width:6.5rem;
  right: 0px;
  height:2.5rem;
  line-height: 2rem;
  font-size: 1.2rem;
  padding: 0;
}

.my_attention .bg_white .page-loadmore-wrapper .page-loadmore-list .res_content .time_font{
    font-size: 1.2rem;
    color: #999;
    margin-top: 0.2rem;
}


.urgent_need {}

.my_attention .bg_white .page-loadmore-wrapper .page-loadmore-list_second .page-loadmore-listitem {
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

.my_attention .bg_white .page-loadmore-wrapper .page-loadmore-list_second .page-loadmore-listitem .bottom span{
    color:  #EC6817;
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

.my_attention .bg_white .page-loadmore-wrapper .page-loadmore-list_second .page-loadmore-listitem .center{
    float: left;
    width: 100%;
    border-bottom: 1px solid #ddd;
    padding-bottom: 10px;
}
.my_attention .bg_white .page-loadmore-wrapper .page-loadmore-list_second .page-loadmore-listitem .center div{
    float: left;

}

.my_attention .bg_white .page-loadmore-wrapper .page-loadmore-list_second .page-loadmore-listitem .center .title {
    width: 100%;
    font-size: 1.3rem;
    color: #333;
    line-height: 15px;
    margin: 10px 0;
}
.my_attention .bg_white .page-loadmore-wrapper .page-loadmore-list_second .page-loadmore-listitem .center .title div{
    font-size: 1.6rem;
}
.my_attention .bg_white .page-loadmore-wrapper .page-loadmore-list_second .page-loadmore-listitem .center .title p{
    float: right;
    font-size: 1.1rem;
    color: #999;

}

.my_attention .bg_white .page-loadmore-wrapper .page-loadmore-list_second .page-loadmore-listitem .center .title img{
    max-height: 1.4rem;
}



.my_attention .bg_white .page-loadmore-wrapper .page-loadmore-list_second .page-loadmore-listitem .center .detail{
    width: 100%;
    line-height: 18px;
}
.my_attention .bg_white .page-loadmore-wrapper .page-loadmore-list_second .page-loadmore-listitem .center .detail p{
    float: left;
    font-size: 1.2rem;
    color: #666;
}

.my_attention .bg_white .page-loadmore-wrapper .page-loadmore-list_second .page-loadmore-listitem .center .detail span{
    color:  #EC6817;
}

.my_attention .bg_white .page-loadmore-wrapper .page-loadmore-list_second .page-loadmore-listitem .center .detail p:last-child{
    float: right;
}
</style>
