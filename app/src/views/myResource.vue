<template>
    <div class="content my_resource">
        <mt-header title="我的资源" class="title">
            <router-link to="/home" slot="left">
                <mt-button icon="back"></mt-button>
            </router-link>
        </mt-header>
        <otherSort  v-on:postId="getId"></otherSort>
        <div class="bg_white">
            <div class="page-loadmore-wrapper" ref="wrapper" :style="{ height: wrapperHeight + 'px' }">
                <mt-loadmore :top-method="loadTop" @top-status-change="handleTopChange" :bottom-method="loadBottom" @bottom-status-change="handleBottomChange" :bottom-all-loaded="allLoaded" ref="loadmore">
                    <ul class="page-loadmore-list" >
                        <li v-for="todo in todos" class="page-loadmore-listitem list_content_item" >
                            <div class="list_header">
                                <div>
                                    <p class="time_font">发布时间：<span>{{todo.pubdate}}</span></p>
                                    <p class="audit_state">{{todo.state}}</p>
                                </div>
                            </div>
                            
                            <img :src="todo.image[0]" class="list_images" @click="jump(todo.router,todo.id)">
                            <div class="res_content" >
                                <div class="res_content_center">
                                    <div><img src="/static/icons/sample.png">{{todo.breedName}}</div>
                                    <p>规格：<span>{{todo.spec}}</span></p>
                                    <p>产地：<span>{{todo.location}}</span></p>
                                    <!-- <p class="time_font">发布时间：<span>{{todo.time}}</span></p> -->
                                </div>
                                <div class="res_content_right">
                                <p>{{todo.price}}<span>元/kg</span></p>
                                <button class="mint-button mint-button--primary mint-button--small" @click="jump(todo.other_router,todo.id)">编辑</button>
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
        </div>
    </div>
</template>
<script>
import common from '../common/common.js'
import searchInput from '../components/tools/inputSearch'
import otherSort from '../components/tools/otherSort'
import validation from '../validation/validation.js'
import httpService from '../common/httpService.js'
export default {
    data() {
            return {
                todos: [/*{
                    "breedName": "人参",
                    "spec": "统货",
                    "location": "东北",
                    "price": "65",
                    "state": "待审核",
                    "customerPhone": "15301546832",
                    "pubdate": "12-11-26",
                    "router":"goodDetail",
                    "other_router":"reviseResource"
                    
                }*/],
                obj:{

                },
                topStatus: '',
                wrapperHeight: 0,
                allLoaded: false,
                bottomStatus: '',
                value:{
                    pubdate:0,
                    duedate:0,
                    sample:'',
                    text:0
                }
            }
        },

        components: {
            searchInput,
            otherSort
        },
        methods: {
            getHttp(pubdate,duedate,sample,text){
                  let _self = this;
                  common.$emit('show-load');
                  let url=common.addSID(common.urlCommon+common.apiUrl.most);
                  let body={biz_module:'intentionService',biz_method:'mySupplyIntentionList',version:1,time:0,sign:'',biz_param:{
                        sort:{"pubdate":pubdate,"duedate":duedate},
                        onSell:text,
                        sampling:sample,
                        pn:"1",
                        pSize:"20"
                  }};
                  
                  body.time=Date.parse(new Date())+parseInt(common.difTime);
                  body.sign=common.getSign('biz_module='+body.biz_module+'&biz_method='+body.biz_method+'&time='+body.time);
                  httpService.myResource(url,body,function(suc){
                    common.$emit('close-load');
                    common.$emit('message', suc.data.msg);
                    console.log(suc);
                    _self.todos = suc.data.biz_result.list;

                    for(var item in _self.todos){
                        _self.todos[item].router = "goodDetail";
                        _self.todos[item].other_router = "reviseResource";
                        
                    }
                    
                  },function(err){
                    common.$emit('close-load');
                    common.$emit('message', err.data.msg);
                  })
            },
            ReviseHttp(id){
                let _self = this;
                httpService.getIntentionDetails(common.urlCommon + common.apiUrl.most, {
                        biz_module:'intentionService',
                        biz_method:'queryIntentionInfo',
              
                            biz_param: {
                                id:id
                            }
                        }, function(suc) { 
                            console.log(suc);
                            let result = suc.data.biz_result;
                            _self.obj.drug_name = result.breedName;
                            _self.obj.spec = result.spec;
                            _self.obj.place = result.location;
                            _self.obj.number = result.number;
                            _self.obj.number_unit = result.unit;
                            _self.obj.sales_price = result.price;
                            _self.obj.weight = result.sampleNumber;
                            _self.obj.price = result.sampleAmount;
                            _self.obj.where = result.address;
                            _self.obj.judge = result.sampling;
                            _self.obj.selling_point = result.description;
                            _self.obj.name = result.customerName;
                            _self.obj.phone = result.customerPhone;
                            _self.obj.imgArr = result.image;
                            
                            common.$emit('myResource-to-revisePurchase',_self.obj)
                            
                        }, function(err) {
                            
                            common.$emit('message', err.data.msg);
                        })
            },
            getId(param){
                 let _self = this;
                  
                  _self.value[param.key] = param[param.key];
            _self.getHttp(_self.value.pubdate,_self.value.duedate,_self.value.sample,_self.value.text);
                  

            },
            jump:function(router,id){
                /*common.$emit('myResource-to-revisePurchase',)*/
                this.ReviseHttp(id);
                this.$router.push(router+ '/' + id);
                console.log(router+ '/' + id)
                
            },
            
            handleBottomChange(status) {
                this.bottomStatus = status;
            },
            loadBottom(id) {
                /*setTimeout(() => {
                    let lastValue = this.todos[0];
                    if (this.todos.length <= 40) {
                        for (let i = 1; i <= 10; i++) {
                            this.todos.push(this.todos[0]);
                        }
                    } else {
                        this.allLoaded = true;
                    }
                    this.$refs.loadmore.onBottomLoaded(id);
                }, 1500);*/
            },

            handleTopChange(status) {
                this.topStatus = status;
            },
            loadTop(id) {
                setTimeout(() => {
                    let firstValue = this.todos[0];
                    for (let i = 1; i <= 10; i++) {
                        this.todos.unshift(firstValue);
                    }
                    this.$refs.loadmore.onTopLoaded(id);
                }, 1500);
            }
        },
        created() {
             
                this.getHttp(0,0,'',0);
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
.my_resource .bg_white{
    margin-top: 0.5rem;
}
.my_resource .title{
    font-size: 1.7rem;

}
.my_resource .bg_white .page-loadmore-wrapper .mint-loadmore{
    background:#F5F5F5;
}

.my_resource .bg_white .page-loadmore-wrapper .page-loadmore-list .page-loadmore-listitem {
    float: left;
    width: 100%;
    min-height: 150px;
    border:0;
    margin-bottom: 1rem;

}
.my_resource .bg_white .page-loadmore-wrapper .page-loadmore-list li{
    margin-bottom: 1rem;
    background:white;
}
.my_resource .bg_white .page-loadmore-wrapper .page-loadmore-list li .list_images {
    height: 9rem;
    width: 8.5rem;
    left: 10px;
    margin: 50px 10px 10px 0;
    position: absolute;
}


.my_resource .bg_white .page-loadmore-wrapper .page-loadmore-list li .list_header{
    width:100%;
    height:40px;
    
    padding:0 10px;
}

.my_resource .bg_white .page-loadmore-wrapper .page-loadmore-list li .list_header>div{
    border-bottom: 1px solid #C6C6C5;
    width:100%;
    height:100%;
    line-height: 40px;
}
.my_resource .bg_white .page-loadmore-wrapper .page-loadmore-list li .list_header .time_font{
    font-size: 1.25rem;
    color:#9C9C9C;
    float:left;
}
.my_resource .bg_white .page-loadmore-wrapper .page-loadmore-list li .list_header .audit_state{
    font-size: 1.25rem;
    color:#FA6705;
    float:right;
    
}



.my_resource .bg_white .page-loadmore-wrapper .page-loadmore-list li div {
    float: left;
    text-align: left;
    line-height: 20px;
    font-size: 1.3rem;
    margin-bottom: 8px;
}

.my_resource .bg_white .page-loadmore-wrapper .page-loadmore-list li .res_content_center img{
    float: left;
    max-height: 1.6rem;
}
.my_resource .bg_white .page-loadmore-wrapper .page-loadmore-list li .res_content_center div{
    font-size: 1.6rem;
}
.my_resource .bg_white .page-loadmore-wrapper .page-loadmore-list li .res_content_center p {
    float: left;
    width: 100%;
    padding-right: 90px;
    line-height: 18px;
    text-align: left;
    font-size: 1.1rem;
    color: #666;
}

.my_resource .bg_white .page-loadmore-wrapper .page-loadmore-list .res_content {
    width: 100%;
    padding-left: 120px;
    padding-top: 10px;
}

.my_resource .bg_white .page-loadmore-wrapper .page-loadmore-list .res_content .res_content_right{
    position: absolute;
    max-width: 80px;
    height: 90px;
    margin: 0;
    right: 10px;
}

.my_resource .bg_white .page-loadmore-wrapper .page-loadmore-list .res_content .res_content_right p{
    font-size: 1.4rem;
    margin-top: 0px;
    color: #EC6817;
}
.my_resource .bg_white .page-loadmore-wrapper .page-loadmore-list .res_content .res_content_right p span{
    font-size: 1rem;
}
.my_resource .bg_white .page-loadmore-wrapper .page-loadmore-list .res_content .res_content_right button{
  position: absolute;
  bottom: 10px;
  background: white;
  font-size: 10px;
  min-width: 60px;
  right: 0px;
  max-height: 25px;
  padding: 0 5px;
  color:black;
  border:1px solid #BDBDBD;
  border-radius: 5px;
  z-index: 100000;
  font-size: 1.2rem;
}

.my_resource .bg_white .page-loadmore-wrapper .page-loadmore-list .res_content .time_font{
    font-size: 1.1rem;
    color: #999;
}
</style>
