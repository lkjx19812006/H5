<template>
    <div class="content need_detail">
       <!--  <mt-header title="需求详情">
            <router-link to="" slot="left">
                <mt-button icon="back" @click="back()"></mt-button>
            </router-link>
        </mt-header> -->
        <myHeader :param = "param"></myHeader>
        <mt-loadmore> 
        <div class="page-loadmore-wrapper"  ref="wrapper" :style="{ height: wrapperHeight + 'px' }">
           
                <div class="center">
                    <div class="title">
                        <img src="/static/icons/impatient.png">
                        <p>{{obj.breedName}}</p>
                    </div>
                    <div class="detail ">
                        <p>规格：<span>{{obj.spec}}</span></p>
                        <p class="right">发布时间：<span>{{obj.pubdate}}</span></p>
                    </div>
                    <div class="detail">
                        <p>产地：<span>{{obj.location}}</span></p>
                        <p class="right">剩余：<span>{{obj.days}}天</span></p>
                    </div class="detail">
                    <div class="detail">
                        <p>需求数量：<span>{{obj.number}}{{obj.unit}}</span></p>
                    </div>
                    <div class="detail">
                        <p>备注：<span>{{obj.description}}</span></p>
                    </div>
                    <div class="detail">
                        <p>已报价：<span class="orange_font">{{obj.offer}}</span>人</p>
                    </div>
                    <div class="detail">
                        <p>平均价格：<span class="orange_font">{{obj.offerVprice}}元/kg</span></p>
                    </div>
                </div>
         
        <div class="fix_bottom">
            <div class="attention">
                <telAndAttention :obj='obj'></telAndAttention>
            </div>
            <button class="mint-button mint-button--primary mint-button--normal orange_button">立即报价</button>
        </div>
        
    </div>  
    </mt-loadmore> 
    </div>
</template>
<script>
import common from '../common/common.js'
import httpService from '../common/httpService.js'
import myHeader from '../components/tools/myHeader'
import telAndAttention from '../components/tools/telAndAttention'
export default {
    data() {
            return {
                id: '',
                obj: {},
                param:{
                    name:'需求详情'
                    
                },
            }
        },
        components: {
            telAndAttention,
            myHeader
        },
        methods: {
            getHttp(id) {
                let _self = this;
                common.$emit('show-load');
                let url = common.urlCommon + common.apiUrl.most;
                let body = {
                    biz_module: 'intentionService',
                    biz_method: 'queryIntentionInfo',
                    biz_param: {
                        id: id
                    }
                }
                if (common.customerId) {
                    url = common.addSID(common.urlCommon + common.apiUrl.most);
                    body.version = 1;
                    body.time = Date.parse(new Date()) + parseInt(common.difTime);
                    body.sign = common.getSign('biz_module=' + body.biz_module + '&biz_method=' + body.biz_method + '&time=' + body.time);
                }
                httpService.myAttention(url, body, function(suc) {
                    common.$emit('close-load');
                    common.$emit('message', suc.data.msg);
                    let result = suc.data.biz_result;
                    
                    var duedate = result.duedate;
                    var pubdate = result.pubdate;
                    if(duedate != '' && pubdate != ''){
                        duedate = duedate.replace(/-/g, '/');
                        pubdate = pubdate.replace(/-/g, '/');
                        var duedateDate = new Date(duedate);
                        var pubdateDate = new Date(pubdate);
                        var dateValue = duedateDate.getTime() - pubdateDate.getTime();
                        var days = Math.floor(dateValue / (24 * 3600 * 1000));
                        result.days = days;
                    }else{
                        result.days = '';
                    }                       
                    if(pubdate != '')result.pubdate = result.pubdate.substring(0, 10);
                    
                    _self.obj = result;
                }, function(err) {
                    common.$emit('close-load');
                    common.$emit('message', err.data.msg);
                })
            },
            back() {
                this.$router.go(-1);
            }
        },
        created() {
            let _self = this;
            let id = _self.$route.params.needId;
            _self.id = id;
            _self.getHttp(id);
            common.$on("needToDetail", function(item) {
                _self.getHttp(item);
            });
            common.$on('post-need-detail', function(item) {
                _self.getHttp(item);
            });
            common.$on('indexToNeeddetail', function(item) {
                _self.getHttp(item);
            });
        },
        mounted() {
            this.wrapperHeight = document.documentElement.clientHeight - this.$refs.wrapper.getBoundingClientRect().top;
        }

}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.need_detail .page-loadmore-wrapper{
   margin-bottom: 0px;
}

.need_detail .fix_bottom {
    position: absolute;
    bottom: 0;
    width: 100%;
    z-index: 2;
}

.need_detail .fix_bottom .attention {
    float: left;
    width: 34%;
}

.need_detail .fix_bottom .orange_button {
    background: #EC6817;
    width: 66%;
    float: left;
}

.need_detail .center {
    padding: 20px;
    position: relative;
    background: #fff;
    float: left;
    width: 100%;
}

.need_detail .center .title {
    float: left;
    width: 100%;
    margin-bottom: 20px;
}

.need_detail .center .title img {
    float: left;
    max-height: 40px;
    height: 1.7rem;
}

.need_detail .center .title p {
    float: left;
    margin-left: 10px;
    font-size: 1.8rem;
    line-height: 1.7rem;
    color: #333;
}

.need_detail .detail {
    float: left;
    width: 100%;
    margin-bottom: 15px;
    text-align: left;
}

.need_detail .detail p {
    float: left;
}

.need_detail .detail p span {
    color: #666;
    font-size: 1.1rem;
}

.need_detail .detail .right {
    float: right;
}

.need_detail .detail p .orange_font {
    color: #EC6817;
}
</style>
