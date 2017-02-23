<template>
    <div class="news">
        <div class="page-loadmore-wrapper" ref="wrapper" :style="{ height: wrapperHeight + 'px' }">
            <mt-loadmore>
                <div class="swipe_height" @click="jump(banner.linkUrl)">    
                        <img v-bind:src="banner.imgUrl">
                        <p>{{banner.intro}}</p>
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
export default {
    data() {
            return {
                img:"/static/images/buy-order.png",
                title:'当然我已经在报纸上看过一些关于你的报道了，”查利说道',
                content:'2012年7月11日 - 沪江英语网是免费的英语学习网站,提供专题报道用英文怎么说信息,包含专题报道用英文怎么说的相关学习资料、单词测试、评论、学习推荐等信息',
                banner:{
                    intro:'',
                    imgUrl:''
                },
                list:''
                
            }
        },
        created() {
            let _self = this;
            _self.getHttp();
        },
        components: {
            
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
                       _self.banner = suc.data.biz_result.banners[0];
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
                window.location.href = linkUrl;
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
.news .swipe_height>p{
    position: absolute;
    bottom: 20px;
    font-size: 14px;
    color:white;
    white-space:nowrap;
    margin-left: 5%;
}
.news .swipe_height img{
    height:100%;
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
