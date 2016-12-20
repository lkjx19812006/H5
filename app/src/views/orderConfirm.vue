<template>
    <div class="whole  order_confirm">
        <mt-header fixed title="订单确认">
            <router-link to="" slot="left">
                <mt-button icon="back" @click="back()"></mt-button>
            </router-link>
        </mt-header>
        <div class="page-loadmore-wrapper">
            <mt-loadmore>
                <orderAddress></orderAddress>
                <div class="content">
                    <orderItem :param="param" v-on:postValue="getValue"></orderItem>
                    <div class="total">
                        <orderTotal :order="order" ></orderTotal>
                    </div>
                    
                </div>
            </mt-loadmore>
        </div>

        <div class="fix_bottom" v-on:click = "confirm">
                        提交订单
        </div>
    </div>
</template>
<script>
import common from '../common/common.js'
import orderAddress from '../components/tools/orderAddress'
import orderItem from '../components/tools/orderItem'
import orderTotal from '../components/tools/orderTotal'
import httpService from '../common/httpService.js'
export default {
    data() {
            return {
                id:'',
                data: "",
                param:{
                    
                },
                order:{
                    
                },
                value:''
            }
        },
        created() {
            let _self = this;
            var str = _self.$route.fullPath;

            var id = str.substring(14,str.length);
            console.log(this.$refs.order)
            
            httpService.myAttention(common.urlCommon + common.apiUrl.most, {
                        biz_module:'intentionService',
                        biz_method:'queryIntentionInfo',
              
                            biz_param: {
                                id:id
                            }
                        }, function(suc) {
                            
                            common.$emit('message', suc.data.msg);
                            let result = suc.data.biz_result;
                            console.log(result.number);
                            /*if(result.sampling == 0){
                               result.sampling = '不提供' 
                            }else{
                                result.sampling = '提供'
                            }*/
                           
                            _self.param = result;
                            _self.order = result;      

                        }, function(err) {
                            
                            common.$emit('message', err.data.msg);
                        })


                  common.$emit('show-load');
                  let otherurl=common.addSID(common.urlCommon+common.apiUrl.most);
                  let otherbody={biz_module:'userAddressService',biz_method:'queryDefaultAddress',version:1,time:0,sign:'',biz_param:{
                        
                  }};
                  
                  otherbody.time=Date.parse(new Date())+parseInt(common.difTime);
                  otherbody.sign=common.getSign('biz_module='+otherbody.biz_module+'&biz_method='+otherbody.biz_method+'&time='+otherbody.time);
                   httpService.addressManage(otherurl,otherbody,function(suc){
                    common.$emit('close-load');
                    console.log(suc.data.biz_result);
                    _self.id = suc.data.biz_result.id;
                    
                  },function(err){
                    common.$emit('close-load');
                  })
                
        },
        components: {
            orderAddress,
            orderItem,
            orderTotal
        },
        methods: {
            back() {
                this.$router.go(-1);
            },
            getValue(param){
                this.value = param.value;
            },
            confirm(){
                  
                  
                  let _self = this;

                  var str = _self.$route.fullPath;
                  var id = str.substring(14,str.length);
                  //console.log(_self.value)
                  common.$emit('show-load');
                  let url=common.addSID(common.urlCommon+common.apiUrl.most);
                  let body={biz_module:'intentionService',biz_method:'submitIntentionOrder',version:1,time:0,sign:'',biz_param:{
                        sourceId:id,
                        number:_self.value,
                        sample:_self.param.sampling,
                        addressId:_self.id
                  }};
                  
                  body.time=Date.parse(new Date())+parseInt(common.difTime);
                  body.sign=common.getSign('biz_module='+body.biz_module+'&biz_method='+body.biz_method+'&time='+body.time);
                  httpService.intentResOrder(url,body,function(suc){
                    common.$emit('close-load');
                    console.log(suc);
                    
                    
                  },function(err){
                    common.$emit('close-load');
                  })
            }
        }
}
</script>
<style scoped>
.order_confirm {
    float: left;
    width: 100%;
    
}

.order_confirm .content {
    background: #fff;
    margin-top: 10px;
    float: left;
    width: 100%;
    padding: 10px;
}

.order_confirm .content .total {
    margin-top: 1rem;
    float: left;
    width: 100%;
}

.order_confirm  .fix_bottom {
    position: fixed;
    bottom: 0;
    width: 100%;
    left: 0;
    height: 5rem;
    color: #FFF;
    font-size: 1.7rem;
    background: #FA6705;
    line-height: 5rem;

}
.order_confirm  .page-loadmore-wrapper{
    margin-bottom: 100px;
}
</style>
