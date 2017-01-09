<template>

    <div class="drug_table_detail">
        <!-- <mt-header fixed title="药性表">
            <router-link to="/drugResTable" slot="left">
                <mt-button icon="back"></mt-button>
            </router-link>
        </mt-header>  -->
        <myHeader :param = "param" ></myHeader>
         <div class="nav-header" >
            <mt-navbar v-model="selected">
            <mt-tab-item id="1">基本信息</mt-tab-item>
            <mt-tab-item id="2">药材特性</mt-tab-item>
            <mt-tab-item id="3">真伪鉴别</mt-tab-item>
            <mt-tab-item id="4">药典标准</mt-tab-item>
            </mt-navbar>
        </div> 
       <mt-loadmore>
        <div class="page-loadmore-wrapper" ref="wrapper" :style="{ height: wrapperHeight + 'px' }">
              
               <div class="info_content">
                <mt-tab-container v-model="selected">
                    <mt-tab-container-item id="1">
                        <div class="information" >
                            <div class="drug_name">
                                <div class="name_type">
                                    <p class="what_name">别名：</p>
                                    <p class="answer_name" v-html="obj.alias"></p>
                                </div>
                                <div class="name_type">
                                    <p class="what_name">拼音：</p>
                                    <p class="answer_name" v-html="obj.pinyin"></p>
                                </div>
                                <div class="name_type" id="last_name_type">
                                    <p class="what_name">英文：</p>
                                    <p class="answer_name" v-html="obj.eName"></p>
                                </div>
                            </div>
                            <div class="drug_effect">
                                <div class="drug_effect_type">
                                    <p class="what_effect">概述：</p>
                                    <p class="effect_content" v-html="obj.summary">
                                    </p>
                                </div>
                            </div>
                            <div class="spec">
                                <div class="spec_type">
                                    <p class="what_spec">产地分布：</p>
                                    <p class="spec_content" v-html="obj.producingArea"></p>
                                </div>          
                            </div>
                        </div>
                    </mt-tab-container-item>

                    <mt-tab-container-item id="2">
                         <div class="information" >
                            
                               <div class="spec">
                                <div class="spec_type">
                                    <p class="what_spec">形态特征：</p>
                                    <p class="spec_content" v-html="obj.morphology"></p>
                                </div>                              
                            </div>
                         </div>
                    </mt-tab-container-item>

                    <mt-tab-container-item id="3">
                            <div class="information" >
                            
                               <div class="spec">
                                    <div class="spec_type">
                                        <p class="what_spec">鉴别真伪：</p>
                                        <p class="spec_content" v-html="obj.identify"></p>
                                    </div>                         
                              </div>
                            </div>
                    </mt-tab-container-item>

                    <mt-tab-container-item id="4">
                            <div class="information" >
                              <div class="spec">                                
                                            <p class="what_spec" id="what_spec">2015年药典标准：</p>
                                            <p class="spec_content" v-html="obj.standard"></p>                   
                              </div>
                            </div>
                    </mt-tab-container-item>
                 
                </mt-tab-container>
              </div> 
        </div>
        </mt-loadmore> 
    </div>

</template>
<script>
import common from '../common/common.js'
import myHeader from '../components/tools/myHeader'
import httpService from '../common/httpService.js'
export default {
    data() {
            return {
                param:{
                    name:'药性表'
                },
                selected: '1',
                obj:{

                },
                id:'',
                breedName:''
            }
        },
        components: {
            myHeader
        },
        methods: {

            drugDetail(name){
                let _self = this;
                httpService.drugResTable(common.urlCommon + common.apiUrl.most, {
                        biz_module:'breedService',
                        biz_method:'queryDrugPropertiesInfo',
              
                            biz_param: {
                                herbName:name
                            }
                        }, function(suc) {
                            
                            common.$emit('message', suc.data.msg);
                            
                            
                            let result = suc.data.biz_result;
                            _self.obj = result;
                           
                        }, function(err) {
                            
                            common.$emit('message', err.data.msg);
                        })
            }
        },

        mounted(){
            this.wrapperHeight = document.documentElement.clientHeight - this.$refs.wrapper.getBoundingClientRect().top;
        },
        created() {
           
             
            var _self = this;
            let name = _self.$route.params.drugId;           
            _self.drugDetail(name);

            common.$on("informdrugDetail",function (item){
                    _self.drugDetail(item);
            });

           
            
        }
}
</script>
<style scoped>

.drug_table_detail{
    position: relative;
}

/*.drug_table_detail .page-loadmore-wrapper{
    padding-top: 100px;
}*/
.drug_table_detail .mint-header {
    background-color: white;
    color: #313232;
    font-size: 1.36528rem;
}
.drug_table_detail .nav-header{
    /*position: fixed;
    background: white;
    top:100px;*/
   position: relative;
}
.drug_table_detail .mint-navbar {
    background: #F7F5F5;
}

.drug_table_detail .mint-tab-item-label {
    font-size: 1.02396rem;
    color: #333333;
}

.drug_table_detail .mint-navbar .mint-tab-item.is-selected {
    color: #FA6705;
    border-bottom: 3px solid #FA6705;   
}


.drug_table_detail .drug_name {
    width: 92%;
    text-align: left;
    font-size: 1.19462rem;
    border-bottom: 1px solid #C9C9C9;
    padding: 1.9199rem 0rem;
    margin-left: 1.27995rem;
}

.drug_table_detail .drug_name .name_type {
    word-break: break-all;
    display: flex;
    display:-webkit-box;
    display:-webkit-flex;
    display:-ms-flexbox;
    flex-direction: row;
    -webkit-box-orient: horizontal;
    -webkit-flex-direction:row;
    -ms-flex-direction: row;
    margin-bottom: 1.27995rem;
}

.drug_table_detail .what_name {
    font-size: 1.19462rem;
    color: #333333;
    flex: 2;
    -webkit-box-flex:2;
    -webkit-flex:2;
    -ms-flex:2;
    line-height: 1.5rem;
}

.drug_table_detail .answer_name {
    flex: 12;
    -webkit-box-flex:12;
    -webkit-flex:12;
    -ms-flex:12;
    font-size: 1.02396rem;
    color: #666666;
    line-height: 1.5rem;
}

.drug_table_detail #last_name_type {
    margin-bottom: 0;
}

.drug_table_detail .drug_effect {
    width: 92%;
    text-align: left;
    font-size: 1.19462rem;
    border-bottom: 1px solid #C9C9C9;
    padding: 1.9199rem 0rem;
    margin-left: 1.27995rem;
}

.drug_table_detail .drug_effect .drug_effect_type {
    word-break: break-all;
    display: flex;
    display:-webkit-box;
    display:-webkit-flex;
    display:-ms-flexbox;
    flex-direction: row;
    -webkit-box-orient: horizontal;
    -webkit-flex-direction:row;
    -ms-flex-direction: row;
    
    /*margin-bottom: 1.27995rem;*/
}

.drug_table_detail .what_effect {
    font-size: 1.19462rem;
    color: #333333;
    flex: 2;
    -webkit-box-flex:2;
    -webkit-flex:2;
    -ms-flex:2;
    line-height: 1.5rem;
}

.drug_table_detail .effect_content {
    flex: 12;
    -webkit-box-flex:12;
    -webkit-flex:12;
    -ms-flex:12;
    font-size: 1.02396rem;
    color: #666666;
    line-height: 1.5rem;
}

.drug_table_detail #last_effect_type {
    margin-bottom: 0;
}

.drug_table_detail .spec {
    width: 92%;
    text-align: left;
    font-size: 1.19462rem;
    padding: 1.9199rem 0rem;
    margin-left: 1.27995rem;
    /*border-bottom: 1px solid #C9C9C9;*/
}

.drug_table_detail .spec_type {
    word-break: break-all;
    display: flex;
    display:-webkit-box;
    display:-webkit-flex;
    display:-ms-flexbox;
    flex-direction: row;
    -webkit-box-orient: horizontal;
    -webkit-flex-direction:row;
    -ms-flex-direction: row;
    margin-bottom: 1.27995rem;
}

.drug_table_detail .what_spec {
    font-size: 1.19462rem;
    color: #333333;
    flex: 2;
    -webkit-box-flex:2;
    -webkit-flex:2;
    -ms-flex:2;
    line-height: 1.5rem;
}

.drug_table_detail .spec_content {
    flex: 7;
    -webkit-box-flex:7;
    -webkit-flex:7;
    -ms-flex:7;
    font-size: 1.02396rem;
    color: #666666;
    line-height: 1.5rem;
}
.drug_table_detail #what_spec{
    margin-bottom: 1.5rem;
}
.drug_table_detail  .info_content{
    
    
    
}
</style>

