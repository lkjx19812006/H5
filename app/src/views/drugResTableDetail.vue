<template>

    <div class="whole drug_table_detail">
        <mt-header fixed title="药性表">
            <router-link to="/drugResTable" slot="left">
                <mt-button icon="back"></mt-button>
            </router-link>
        </mt-header> 

         <div class="nav-header" >
            <mt-navbar v-model="selected">
            <mt-tab-item id="1">基本信息</mt-tab-item>
            <mt-tab-item id="2">药材特性</mt-tab-item>
            <mt-tab-item id="3">真伪鉴别</mt-tab-item>
            <mt-tab-item id="4">药典标准</mt-tab-item>
            </mt-navbar>
        </div> 

        <div class="page-loadmore-wrapper" ref="wrapper" :style="{ height: wrapperHeight + 'px' }">
              
               <div class="info_content">
                <mt-tab-container v-model="selected">
                    <mt-tab-container-item id="1">
                        <div class="information" >
                            <div class="drug_name">
                                <div class="name_type">
                                    <p class="what_name">别名：</p>
                                    <p class="answer_name">{{obj.alias}}</p>
                                </div>
                                <div class="name_type">
                                    <p class="what_name">拼音：</p>
                                    <p class="answer_name">{{obj.lName}}</p>
                                </div>
                                <div class="name_type" id="last_name_type">
                                    <p class="what_name">英文：</p>
                                    <p class="answer_name">{{obj.eName}}</p>
                                </div>
                            </div>
                            <div class="drug_effect">
                                <div class="drug_effect_type">
                                    <p class="what_effect">概述：</p>
                                    <p class="effect_content">{{obj.summary}}</p>
                                </div>
                                <!-- <div class="drug_effect_type" id="last_effect_type">
                                    <p class="what_effect">功效：</p>
                                    <p class="effect_content">{{todo.drug_effect.effect_content}}</p>
                                </div> -->
                            </div>
                            <div class="spec">
                                <div class="spec_type">
                                    <p class="what_spec">产地分布：</p>
                                    <p class="spec_content">{{obj.producingArea}}</p>
                                </div>
                                <!-- <div class="spec_type">
                                    <p class="what_spec">产新时间：</p>
                                    <p class="spec_content"></p>
                                </div>
                                <div class="spec_type" id="spec_type">
                                    <p class="what_spec">产新时间：</p>
                                    <p class="spec_content"></p>
                                </div> -->
                                
                            </div>
                        </div>
                    </mt-tab-container-item>

                    <mt-tab-container-item id="2">
                         <div class="information" >
                            
                               <div class="spec">
                                <div class="spec_type">
                                    <p class="what_spec">形态特征：</p>
                                    <p class="spec_content">{{obj.morphology}}</p>
                                </div>
                                <!-- <div class="spec_type">
                                    <p class="what_spec">形态规格：</p>
                                    <p class="spec_content"></p>
                                </div>
                                <div class="spec_type">
                                    <p class="what_spec">性味功能：</p>
                                    <p class="spec_content"></p>
                                </div>
                                <div class="spec_type" id="spec_type">
                                    <p class="what_spec">储存方式：</p>
                                    <p class="spec_content"></p>
                                </div> -->
                                
                            
                            </div>
                         </div>
                    </mt-tab-container-item>

                    <mt-tab-container-item id="3">
                            <div class="information" >
                            
                               <div class="spec">
                                    <div class="spec_type">
                                        <p class="what_spec">鉴别真伪：</p>
                                        <p class="spec_content"></p>
                                    </div>
                                
                                
                            
                              </div>
                            </div>
                    </mt-tab-container-item>

                    <mt-tab-container-item id="4">
                            <div class="information" >
                              <div class="spec">
                                   <!-- <div class="spec_type"> -->
                                            <p class="what_spec" id="what_spec">2015年药典标准：</p>
                                            <p class="spec_content"></p>
                                    <!-- </div> -->
                              </div>
                            </div>
                    </mt-tab-container-item>
                    <!-- <mt-tab-container-item id="5">
                        <mt-cell v-for="n in 4" :title="'测试 ' + n" /></mt-cell>
                    </mt-tab-container-item>
                    <mt-tab-container-item id="6">
                        <mt-cell v-for="n in 6" :title="'选项 ' + n" /></mt-cell>
                    </mt-tab-container-item> -->
                </mt-tab-container>
              </div>  
            <!-- </mt-loadmore> -->
        </div>
    </div>

</template>
<script>
import common from '../common/common.js'
import httpService from '../common/httpService.js'
export default {
    data() {
            return {
                selected: '1',
                obj:{

                },
                id:'',
                breedName:''
            }
        },
        methods: {},

        mounted(){
            this.wrapperHeight = document.documentElement.clientHeight - this.$refs.wrapper.getBoundingClientRect().top;
        },
        created() {
            /*common.$emit('show-load');
            this.$http.get(common.apiUrl.drug_information_list).then((response) => {
                common.$emit('close-load');
                let data = response.data.biz_result.list;
                console.log(data);
                this.todos = data;
            }, (err) => {
                common.$emit('close-load');
                common.$emit('message', response.data.msg);
            });*/
             
            var _self = this;
            var str = _self.$route.fullPath;
            var id = str.substring(20,str.length);
            _self.id = id;
               console.log(id)
            /*httpService.myAttention(common.urlCommon + common.apiUrl.most, {
                        biz_module:'intentionService',
                        biz_method:'queryIntentionInfo',
              
                            biz_param: {
                                id:id
                            }
                        }, function(suc) {
                            
                            common.$emit('message', suc.data.msg);
                            
                            
                            let result = suc.data.biz_result.breedName;
                            console.log(result)
                            _self.breedName = result;
                            
                        }, function(err) {
                            
                            common.$emit('message', err.data.msg);
                        })*/

      
            
            httpService.drugResTable(common.urlCommon + common.apiUrl.most, {
                        biz_module:'breedService',
                        biz_method:'queryDrugPropertiesInfo',
              
                            biz_param: {
                                herbName:_self.id
                            }
                        }, function(suc) {
                            
                            common.$emit('message', suc.data.msg);
                            
                            //console.log(suc.data.biz_result.list)
                            let result = suc.data.biz_result;
                            console.log(result)
                           /* _self.obj = result;*/
                        }, function(err) {
                            
                            common.$emit('message', err.data.msg);
                        })
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
    flex-direction: row;
    margin-bottom: 1.27995rem;
}

.drug_table_detail .what_name {
    font-size: 1.19462rem;
    color: #333333;
    flex: 2;
    line-height: 1.5rem;
}

.drug_table_detail .answer_name {
    flex: 12;
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
    flex-direction: row;
    /*margin-bottom: 1.27995rem;*/
}

.drug_table_detail .what_effect {
    font-size: 1.19462rem;
    color: #333333;
    flex: 2;
    line-height: 1.5rem;
}

.drug_table_detail .effect_content {
    flex: 12;
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
    flex-direction: row;
    margin-bottom: 1.27995rem;
}

.drug_table_detail .what_spec {
    font-size: 1.19462rem;
    color: #333333;
    flex: 2;
    line-height: 1.5rem;
}

.drug_table_detail .spec_content {
    flex: 7;
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

