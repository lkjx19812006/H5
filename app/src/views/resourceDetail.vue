<template>
    <div class="content resource_detail whole">
        <mt-header fixed title="资源详情">
            <router-link to="" slot="left">
                <mt-button icon="back" @click="back()"></mt-button>
            </router-link>
        </mt-header>
        <div class="page-loadmore-wrapper">
            <mt-loadmore>
                <div class="swipe_height">
                    <swiper :options="swiperOption" class="swipe_height">
                        <swiper-slide v-for="(item,index) in imgArray">
                            <div>
                                <img v-bind:src="item.url">
                            </div>
                        </swiper-slide>
                    </swiper>
                    <div class="swipe_number"><span>{{number}}</span>/{{imgArray.length}}</div>
                </div>
                <div class="top">
                    <p>发布时间：<span>{{obj.pubdate}}</span></p>
                    <img src="/static/icons/xique.gif" v-show="imageShow">
                    <img src="/static/icons/xique.png" v-show="!imageShow">
                </div>
                <div class="center">
                    <div class="title">
                        <img src="/static/icons/impatient.png">
                        <p>{{obj.breedName}}</p>
                        <p class="price_right"><span>{{obj.price}}</span>元/kg</p>
                    </div>
                    <div class="detail ">
                        <p>产地：<span>{{obj.location}}</span></p>
                        <p class="right">规格：<span>{{obj.spec}}</span></p>
                    </div>
                    <div class="detail">
                        <p>库存：<span>{{obj.number}}kg</span></p>
                        <p class="right">起订量：<span>{{obj.moq}}kg</span></p>
                    </div class="detail">
                    <div class="detail">
                        <p>样品：<span v-if="obj.sampling == 0">不提供</span><span v-if="obj.sampling == 1">提供</span></p>
                    </div>
                    <div class="detail">
                        <p>卖点：<span>{{obj.description}}</span></p>
                    </div>
                </div>
            </mt-loadmore>
        </div>
        <div class="fix_bottom">
            <button class="mint-button mint-button--primary mint-button--normal small_button">
                <img src="/static/icons/tel.png">
                <p>电话</p>
            </button>
            <button class="mint-button mint-button--primary mint-button--normal small_button" v-on:click="myAttention">
                <img src="/static/icons/follow.png">
                <p>关注</p>
            </button>
            <button class="mint-button mint-button--primary mint-button--normal disabled_button" disabled="true" v-if="obj.sampling == 0">无样品</button>
            <button class="mint-button mint-button--primary mint-button--normal orange_button" v-if="obj.sampling == 1" @click="jumpBuy(obj.id)">购买样品</button>
            <button class="mint-button mint-button--primary mint-button--normal orange_button" @click="jump(obj.id)">立即购买</button>
        </div>
    </div>
</template>
<script>
import common from '../common/common.js'
import httpService from '../common/httpService.js'
import {
    swiper,
    swiperSlide,
    swiperPlugins
} from 'vue-awesome-swiper'
export default {
    data() {
            let _self = this;
            return {
                imgArray: [{
                    url: '/static/images/1.jpg'
                }, {
                    url: '/static/images/2.jpg'
                }, {
                    url: '/static/images/3.jpg'
                }],
                obj:{
                    /*breedName:'',
                    price:'',
                    location:'',
                    spec:'',
                    number:'',
                    moq:'',
                    sampling:'',
                    description:''*/
                },
                id:'',
                swiperOption: {
                    name: 'currentSwiper',
                    autoplay: 3000,
                    setWrapperSize: true,
                    debugger: true,
                    loop: true,
                    autoplayDisableOnInteraction: false,
                    onTransitionStart: function(swiper) {
                        _self.number = parseInt(swiper.realIndex) + 1;
                    }
                }
            }
        },
        components: {
            swiper,
            swiperSlide
        },
        methods: {
            back() {
                this.$router.go(-1);
            },
            jump(id) {
                
                this.$router.push('/orderConfirm/' + id);

            },
            jumpBuy(id){
                this.$router.push('/sampleConfirm/' + id);
            },
            myAttention(){
                let _self = this;

                  common.$emit('show-load');
                  let url=common.addSID(common.urlCommon+common.apiUrl.most);
                  let body={biz_module:'userService',biz_method:'userAttention',version:1,time:0,sign:'',biz_param:{
                        intentionId:_self.id,
                        type:1,
                        breedName:_self.obj.breedName,
                        intentionType:_self.obj.type
                  }};
                  
                  body.time=Date.parse(new Date())+parseInt(common.difTime);
                  body.sign=common.getSign('biz_module='+body.biz_module+'&biz_method='+body.biz_method+'&time='+body.time);
                  httpService.addAddress(url,body,function(suc){
                    common.$emit('close-load');
                    console.log(suc.data);
                    common.$emit('message', suc.data.msg);
                    
                  },function(err){
                    common.$emit('close-load');
                    common.$emit('message', err.data.msg);
                  })
            
            }
         },
        created() {
            let _self = this;
            /*common.$emit('show-load');
            this.$http.get(common.apiUrl.list).then((response) => {
                common.$emit('close-load');
                let data = response.data.biz_result.list;
                this.todos = data;
            }, (err) => {
                common.$emit('close-load');
                common.$emit('message', response.data.msg);
            });

            _self.time = setTimeout(() => {
                _self.imageShow = false;
            }, 2450);*/
            
            var str = _self.$route.fullPath;
            var id = str.substring(16,str.length);
            _self.id = id;
            
            
            httpService.myAttention(common.urlCommon + common.apiUrl.most, {
                        biz_module:'intentionService',
                        biz_method:'queryIntentionInfo',
              
                            biz_param: {
                                id:id
                            }
                        }, function(suc) {
                            
                            common.$emit('message', suc.data.msg);
                            let result = suc.data.biz_result;
                            //console.log(result);
                            /*if(result.sampling == 0){
                               result.sampling = '不提供' 
                            }else{
                                result.sampling = '提供'
                            }*/
                             _self.obj = result;
                            
                            
                                            
                               
                           

                        }, function(err) {
                            
                            common.$emit('message', err.data.msg);
                        })

                   common.$on('post-res-detail',function (obj){
                        _self.obj = obj;
                   })
        }
}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.resource_detail {}

.resource_detail .swipe_height {
    height: 16rem;
    max-height: 160px;
    position: relative;
}

.resource_detail .swipe_height img {
    width: 100%;
}

.resource_detail .swipe_height .swipe_number {
    position: absolute;
    right: 10px;
    z-index: 99;
    bottom: 10px;
    color: #fff;
    opacity: 0.5;
    background: #000;
    padding: 2px 12px;
    border-radius: 10px;
}

.resource_detail .swipe_height .swipe_number span {
    color: #FA6705;
    font-size: 14px;
}

.resource_detail .top {
    float: left;
    width: 100%;
    background: #fff;
    padding: 10px;
    margin-bottom: 10px;
}

.resource_detail .top p {
    float: left;
    color: #333;
    font-size: 1.1rem;
    margin-top: 10px;
}

.resource_detail .top img {
    float: right;
    height: 2rem;
    max-height: 40px;
    margin-right: 10px;
}

.resource_detail .fix_bottom {
    position: fixed;
    bottom: 0;
    z-index: 2;
    width: 100%;
}

.resource_detail .fix_bottom .small_button {
    width: 17%;
    float: left;
    background: #EEEEEE;
    border: 1px solid #ddd;
}

.resource_detail .fix_bottom .small_button img {
    max-height: 13px;
}

.resource_detail .fix_bottom .small_button p {
    font-size: 10px;
    color: #333;
}

.resource_detail .fix_bottom .orange_button {
    background: #EC6817;
    width: 33%;
    float: left;
}

.resource_detail .fix_bottom .disabled_button {
    background: #EEEEEE;
    width: 33%;
    float: left;
    color: #333;
    border: 1px solid #ddd;
}

.resource_detail .center {
    padding: 20px;
    position: relative;
    background: #fff;
    float: left;
    width: 100%;
}

.resource_detail .center .title {
    float: left;
    width: 100%;
    margin-bottom: 20px;
}

.resource_detail .center .title img {
    float: left;
    max-height: 40px;
    height: 1.7rem;
}

.resource_detail .center .title p {
    float: left;
    margin-left: 10px;
    font-size: 1.4rem;
    line-height: 1.7rem;
    color: #333;
}

.resource_detail .center .title .price_right {
    float: right;
    color: #EC6817;
}

.resource_detail .center .title .price_right span {
    font-size: 1.8rem;
    font-weight: 500;
}

.resource_detail .detail {
    float: left;
    width: 100%;
    margin-bottom: 15px;
    text-align: left;
}

.resource_detail .detail p {
    float: left;
}

.resource_detail .detail p span {
    color: #666;
    font-size: 1.1rem;
}

.resource_detail .detail .right {
    float: right;
}

.resource_detail .detail p .orange_font {
    color: #EC6817;
}
</style>
