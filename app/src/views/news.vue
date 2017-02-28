<template>
    <div class="news">
        <div class="page-loadmore-wrapper" ref="wrapper" :style="{ height: wrapperHeight + 'px' }">
            <mt-loadmore>
                <div class="swipe_height">    
                        <!-- <img v-bind:src="banner.imgUrl">
                        <p>{{banner.title}}</p> -->
                         <swiper :options="swiperOption">
                          <swiper-slide v-for="(item,index) in banner">
                            <a @click="jump(item.linkUrl)">
                                <img v-bind:src="item.imgUrl">
                                <p>{{item.title}}</p>
                            </a>  
                          </swiper-slide>
                        </swiper>
                </div>
                <div class="report">
                     公司报道
                </div>
                <ul class="main">
                     <li v-for="todo in list" @click="jump(todo.linkUrl)">
                         <div class="inbox">
                            <img v-bind:src="todo.imgUrl">
                            <div class="title">
                                 <p class="title_head">{{todo.title}}</p>
                                 <div class="title_content">{{todo.intro}}</div>
                            </div>
                         </div>        
                     </li>
                </ul>
            </mt-loadmore>
        </div>
    </div>
</template>
<script>
import common from '../common/common.js'
import httpService from '../common/httpService.js'
import { swiper, swiperSlide } from 'vue-awesome-swiper'
export default {
    data() {
            return {
                banner:{
                   
                },
                list:'',
                swiperOption: {
                    autoplay: 3500,
                    setWrapperSize :true,
                    pagination : '.swiper-pagination',
                    paginationClickable :true,
                    mousewheelControl : true,
                    observeParents:true,
                }
                
            }
        },
        created() {
            let _self = this;
            _self.getHttp();
        },
        components: {
            swiper,
            swiperSlide
        },
        methods: {
            getHttp(){
            let _self = this;
                common.$emit('show-load');
                httpService.login(common.urlCommon + common.apiUrl.most, {
                    biz_module: 'pushService',
                    biz_method: 'companyNewsList',
                    biz_param: {
                        
                    }
                }, function(suc) {
                    common.$emit('close-load');
                    if (suc.data.code == '1c01') {
                       _self.banner = suc.data.biz_result.banners;
                       console.log(suc.data.biz_result.banners)
                       _self.list = suc.data.biz_result.newestTab;
                    } else {
                        common.$emit('message', suc.data.msg);
                    }
                }, function(err) {
                    common.$emit('close-load');
                    common.$emit('message', err.data.msg);
                })
            },
            jump(linkUrl){
                if(linkUrl)window.location.href = linkUrl;
            }
            
        },
        mounted() {
            this.wrapperHeight = /*document.documentElement.clientHeight*/window.screen.height - this.$refs.wrapper.getBoundingClientRect().top;
        }
}
</script>
<style scoped>
.news{

}
.news .swipe_height{
    height:280px;
    width:100%;
    position: relative;
}
.news .swipe_height p{
    position: absolute;
    bottom: 20px;
    font-size: 20px;
    color:white;
    white-space:nowrap;
    margin-left: 5%;
}
.news .swipe_height img{
    height:280px;
    width:100%;
}
.news  .report{
    width:100%;
    text-align: center;
    font-size: 16px;
    padding: 10px;
    color:green;
    background:#F2F2F2;
    border-bottom: 1px solid #DEDDE0;
}
.news .main{
    padding-bottom: 10px;
    width:100%;
}
.news .main li{
    padding:10px 0px 0px 4%;

}
.news .main li .inbox{
    width:100%;
    padding-bottom: 10px;
    border-bottom: 1px solid #DEDDE0;
    overflow: hidden;
}
.news .main li .inbox img{  
    height:50px;
    width:20%;
}
.news .main li .inbox  .title{
    float:right;
    width:76%;
    text-align: left;
    margin-top: 3px;
    height:50px;
    overflow: hidden;
}
.news .main li .inbox  .title .title_head{
    float:left;
    font-size: 14px;
    line-height: 15px;
    width:98%;
    white-space:nowrap; 
    overflow:hidden; 
    text-overflow:ellipsis;
    color:#000000;
    font-weight: bold;
}
.news .main li .inbox  .title .title_content{
    float: left;
    width:98%;
    font-size: 12px;
    line-height: 15px;
    margin-top: 5px;
    overflow: hidden;
     
}
</style>
