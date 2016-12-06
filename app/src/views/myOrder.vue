<template>
  <div class="my_order">
        <mt-header title="我的订单">
            <router-link to="/home" slot="left">
                <mt-button icon="back"></mt-button>
            </router-link>
        </mt-header>
        

      <div class="select_box">
        <mt-navbar v-model="selected" class="first_nav">
          <mt-tab-item id="1">我的采购</mt-tab-item>
          <mt-tab-item id="2">我的销售</mt-tab-item>
        </mt-navbar>
      </div>
        
       <mt-tab-container v-model="selected" >
        <mt-tab-container-item id="1">
             <mt-navbar v-model="first_act">
              <mt-tab-item id="1">全部订单</mt-tab-item>
              <mt-tab-item id="2">待确认</mt-tab-item>
              <mt-tab-item id="3">待付款</mt-tab-item>
              <mt-tab-item id="4">待发货</mt-tab-item>
              <mt-tab-item id="5">待收货</mt-tab-item>
              <mt-tab-item id="6">已完成</mt-tab-item>
              <mt-tab-item id="7">已取消</mt-tab-item>
            </mt-navbar>
        </mt-tab-container-item>
        <mt-tab-container-item id="2">
             <mt-navbar v-model="second_act">
              <mt-tab-item id="1">订单</mt-tab-item>
              <mt-tab-item id="2">待确认</mt-tab-item>
              <mt-tab-item id="3">待付款</mt-tab-item>
              <mt-tab-item id="4">待发货</mt-tab-item>
              <mt-tab-item id="5">待收货</mt-tab-item>
              <mt-tab-item id="6">已完成</mt-tab-item>
              <mt-tab-item id="7">已取消</mt-tab-item>
            </mt-navbar>
        </mt-tab-container-item>
      </mt-tab-container> 


     <!--  <mt-tab-container v-model="act">
        <mt-tab-container-item id="1">
             <mt-navbar v-model="act">
                wosjhi 
            </mt-navbar>
        </mt-tab-container-item>
        <mt-tab-container-item id="2">
          
        </mt-tab-container-item>
      </mt-tab-container>  -->



                <div class="bg_white">
                <div class="page-loadmore-wrapper" ref="wrapper" :style="{ height: wrapperHeight + 'px' }">
                    <mt-loadmore :top-method="loadTop" @top-status-change="handleTopChange" :bottom-method="loadBottom" @bottom-status-change="handleBottomChange" :bottom-all-loaded="allLoaded" ref="loadmore">
                 <mt-tab-container v-model="first_act">
                    <mt-tab-container-item id="1">
                        <ul class="page-loadmore-list">
                            <li v-for="todo in todos" class="page-loadmore-listitem list_content_item">
                                <div class="list_header">
                                    <div>
                                        <p class="time_font"><span>{{todo.time}}</span></p>
                                        <p class="order">订单编号：<span>DD11123333</span></p>
                                        <p class="audit_state">{{todo.state}}</p>
                                    </div>
                                </div>
                            
                            <img src="/static/images/1.jpg" class="list_images">
                            <div class="res_content">
                                <div class="res_content_center">
                                    <div><img src="/static/icons/bao.png"><img src="/static/icons/sample.png">{{todo.name}}</div>
                                    <p>规格：<span>{{todo.spec}}</span></p>
                                    <p>产地：<span>{{todo.place}}</span></p>
                                    <!-- <p class="time_font">发布时间：<span>{{todo.time}}</span></p> -->
                                </div>
                                <div class="res_content_right">
                                <p>{{todo.price}}</p>
                                <button class="mint-button mint-button--primary mint-button--small">编辑</button>
                                </div>
                            </div>
                            </li>
                        </ul>
                     </mt-tab-container-item> 


                     <mt-tab-container-item id="2">  
                    <ul class="page-loadmore-list_second">
                        <li v-for="todo in todos" class="page-loadmore-listitem list_content_item">
                            <div class="flag"><img src="/static/icons/england.png"><span>英国</span></div>
                            <div class="center">
                                <div class="title">
                                    <div><img src="/static/icons/impatient.png"><span>{{todo.name}}</span></div>
                                    <p>发布时间：{{todo.time}}</p>
                                </div>
                                <div class="detail">
                                    <p>规格：{{todo.spec}}</p>
                                    <p>剩余：<span>26</span>天</p>
                                </div>
                                <div class="detail">
                                    <p>产地：{{todo.place}}</p>
                                    <p>需求数量：100kg</p>
                                </div>
                            </div>
                            <div class="bottom">
                                <p>已报价<span>10</span>人</p>
                                <button class="mint-button mint-button--primary mint-button--small">我要报价</button>
                            </div>
                        </li>
                    </ul>
                     </mt-tab-container-item> 

                     

                     <mt-tab-container v-model="second_act">
                    <mt-tab-container-item id="1">
                        111111
                     </mt-tab-container-item> 


                     <mt-tab-container-item id="2">  
                         2222
                     </mt-tab-container-item> 

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
         

         
          
        </mt-tab-container>
        
  </div>
</template>

<script>
import common from '../common/common.js'
import searchInput from '../components/tools/inputSearch'
export default {
    data() {
            return {
                selected:"1",
                first_act:'1',
                second_act:'2',
                todos: [{
                    "name": "人参",
                    "spec": "统货",
                    "place": "东北",
                    "price": "98.9元/kg",
                    "state": "待审核",
                    "phone": "15301546832",
                    "time": "2012-11-26"
                }],
                topStatus: '',
                wrapperHeight: 0,
                ttwrapperHeight: 0,
                allLoaded: false,
                bottomStatus: '',
            }
        },
        components: {
            searchInput
            
        },
        methods: {
            handleBottomChange(status) {
                this.bottomStatus = status;
            },
            loadBottom(id) {
                setTimeout(() => {
                    let lastValue = this.todos[0];
                    if (this.todos.length <= 40) {
                        for (let i = 1; i <= 10; i++) {
                            this.todos.push(this.todos[0]);
                        }
                    } else {
                        this.allLoaded = true;
                    }
                    this.$refs.loadmore.onBottomLoaded(id);
                }, 1500);
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
            let _self = this;
            common.$emit('show-load');
            this.$http.get(common.apiUrl.list).then((response) => {
                common.$emit('close-load');
                /*let data = response.data.biz_result.list;
                this.todos = data;*/
            }, (err) => {
                common.$emit('close-load');
                common.$emit('message', response.data.msg);
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
.my_order .bg_white{
    margin-top: 0.5rem;
}

.my_order .bg_white .page-loadmore-wrapper .mint-loadmore{
    background:#F5F5F5;
}

.my_order .bg_white .page-loadmore-wrapper .page-loadmore-list .page-loadmore-listitem {
    float: left;
    width: 100%;
    min-height: 150px;
    border:0;
    margin-bottom: 1rem;

}
.my_order .bg_white .page-loadmore-wrapper .page-loadmore-list li{
    margin-bottom: 1rem;
    background:white;
}
.my_order .bg_white .page-loadmore-wrapper .page-loadmore-list li .list_images {
    height: 80px;
    max-width: 100px;
    left: 10px;
    margin: 50px 10px 10px 0;
    position: absolute;
}


.my_order .bg_white .page-loadmore-wrapper .page-loadmore-list li .list_header{
    width:100%;
    height:40px;
    
    padding:0 10px;
}

.my_order .bg_white .page-loadmore-wrapper .page-loadmore-list li .list_header>div{
    border-bottom: 1px solid #C6C6C5;
    width:100%;
    height:100%;
    line-height: 40px;
}
.my_order .bg_white .page-loadmore-wrapper .page-loadmore-list li .list_header .time_font{
    font-size: 1.25rem;
    color:#9C9C9C;
    float:left;
}
.my_order .bg_white .page-loadmore-wrapper .page-loadmore-list li .list_header .time_font{
    font-size: 1.25rem;
    color:#9C9C9C;
    float:left;
}
.my_order .bg_white .page-loadmore-wrapper .page-loadmore-list li .list_header .audit_state{
    font-size: 1.25rem;
    color:#FA6705;
    float:right;
    
}



.my_order .bg_white .page-loadmore-wrapper .page-loadmore-list li div {
    float: left;
    text-align: left;
    line-height: 20px;
    font-size: 1.3rem;
    margin-bottom: 8px;
}

.my_order .bg_white .page-loadmore-wrapper .page-loadmore-list li .res_content_center img{
    float: left;
    max-height: 15px;
}

.my_order .bg_white .page-loadmore-wrapper .page-loadmore-list li .res_content_center p {
    float: left;
    width: 100%;
    padding-right: 90px;
    line-height: 18px;
    text-align: left;
    font-size: 1.2rem;
    color: #666;
}

.my_order .bg_white .page-loadmore-wrapper .page-loadmore-list .res_content {
    width: 100%;
    padding-left: 120px;
    padding-top: 10px;
}

.my_order .bg_white .page-loadmore-wrapper .page-loadmore-list .res_content .res_content_right{
    position: absolute;
    max-width: 80px;
    height: 90px;
    margin: 0;
    right: 10px;
}

.my_order .bg_white .page-loadmore-wrapper .page-loadmore-list .res_content .res_content_right p{
    font-size: 1.25rem;
    margin-top: 0px;
    color: #EC6817;
}

.my_order .bg_white .page-loadmore-wrapper .page-loadmore-list .res_content .res_content_right button{
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
}

.my_order .bg_white .page-loadmore-wrapper .page-loadmore-list .res_content .time_font{
    font-size: 1.1rem;
    color: #999;
}


.urgent_need {}

.my_order .bg_white .page-loadmore-wrapper .page-loadmore-list_second .page-loadmore-listitem {
    float: left;
    width: 100%;
    min-height: 100px;
    padding: 10px;
    height: auto;
    background: white;
}

.my_order .bg_white .page-loadmore-wrapper .page-loadmore-list_second .page-loadmore-listitem .flag {
    float: left;
    width: 100%;
    padding-bottom: 10px;
    line-height: 17px;
    text-align: left;
    border-bottom: 1px solid #ddd;
}
.my_order .bg_white{
   padding-bottom: 0;
   margin-bottom: 0;
}
.my_order .bg_white .page-loadmore-wrapper .page-loadmore-list_second .page-loadmore-listitem .flag img {
    max-height: 15px;
    float: left;
}

.my_order .bg_white .page-loadmore-wrapper .page-loadmore-list_second .page-loadmore-listitem .flag span {
    margin-left: 5px;
    color: #666;
    font-size: 1rem;
}

.my_order .bg_white .page-loadmore-wrapper .page-loadmore-list_second .page-loadmore-listitem .bottom {
    float: left;
    width: 100%;
    margin-top: 10px;
}

.my_order .bg_white .page-loadmore-wrapper .page-loadmore-list_second .page-loadmore-listitem .bottom p {
    line-height: 24px;
    float: left;
    font-size: 1.2rem;
    color: #666;
}

.my_order .bg_white .page-loadmore-wrapper .page-loadmore-list_second .page-loadmore-listitem .bottom span{
    color:  #EC6817;
}

.my_order .bg_white .page-loadmore-wrapper .page-loadmore-list_second .page-loadmore-listitem .bottom button {
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

.my_order .bg_white .page-loadmore-wrapper .page-loadmore-list_second .page-loadmore-listitem .center{
    float: left;
    width: 100%;
    border-bottom: 1px solid #ddd;
    padding-bottom: 10px;
}
.my_order .bg_white .page-loadmore-wrapper .page-loadmore-list_second .page-loadmore-listitem .center div{
    float: left;

}

.my_order .bg_white .page-loadmore-wrapper .page-loadmore-list_second .page-loadmore-listitem .center .title {
    width: 100%;
    font-size: 1.3rem;
    color: #333;
    line-height: 15px;
    margin: 10px 0;
}

.my_order .bg_white .page-loadmore-wrapper .page-loadmore-list_second .page-loadmore-listitem .center .title p{
    float: right;
    font-size: 1rem;
    color: #999;
}

.my_order .bg_white .page-loadmore-wrapper .page-loadmore-list_second .page-loadmore-listitem .center .title img{
    max-height: 15px;
}



.my_order .bg_white .page-loadmore-wrapper .page-loadmore-list_second .page-loadmore-listitem .center .detail{
    width: 100%;
    line-height: 18px;
}
.my_order .bg_white .page-loadmore-wrapper .page-loadmore-list_second .page-loadmore-listitem .center .detail p{
    float: left;
    font-size: 1.2rem;
    color: #666;
}

.my_order .bg_white .page-loadmore-wrapper .page-loadmore-list_second .page-loadmore-listitem .center .detail span{
    color:  #EC6817;
}

.my_order .bg_white .page-loadmore-wrapper .page-loadmore-list_second .page-loadmore-listitem .center .detail p:last-child{
    float: right;
}
</style>
