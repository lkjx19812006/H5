<template>
    <div class="purchase_detail">
        <mt-header title="求购详情">
            <router-link to="myPurchase" slot="left">
                <mt-button icon="back" @click="back()"></mt-button>
            </router-link>
        </mt-header>
        <div class="center">
            <div class="title">
                <!-- <img src="/static/icons/impatient.png"> -->
                <p>人参</p>
            </div>
            <div class="detail ">
                <p>规格：<span>统货</span></p>
                <p class="right">发布时间：<span>2016-11-10</span></p>
            </div>
            <div class="detail">
                <p>产地：<span>安徽</span></p>
                <p class="right">剩余：<span>20天</span></p>
            </div class="detail">
            <div class="detail">
                <p>需求数量：<span>20kg</span></p>
            </div>
            <div class="detail">
                 <p>备注：<span>干度好，无走油，2015版药典标，干度好，无走油</span></p>
            </div>
            <div class="detail">
                <p>已报价：<span class="orange_font">12</span>人</p>
            </div>
            <div class="detail">
                <p>平均价格：<span class="orange_font">20.6元/kg</span></p>
            </div>
        </div>
        
          <div class="flowsheet">
            <p>流程图</p>
            <img src="/static/images/progress_1.png">
          </div>
          

    </div>
</template>
<script>
import common from '../common/common.js'
export default {
    data() {
            return {
                todos: [{
                    "name": "人参",
                    "spec": "统货",
                    "place": "东北",
                    "price": "98.9元/kg",
                    "up_price": "9元/kg",
                    "down_price": "9元/kg",
                    "phone": "15301546832",
                    "time": "12:26"
                }]
            }
        },
        methods: {
            back() {
                this.$router.go(-1);
            },
        },
        created() {
            let _self = this;
            common.$emit('show-load');
            this.$http.get(common.apiUrl.list).then((response) => {
                common.$emit('close-load');
                let data = response.data.biz_result.list;
                this.todos = data;
            }, (err) => {
                common.$emit('close-load');
                common.$emit('message', response.data.msg);
            });
        }

}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.need_detail {}

/*.purchase_detail .fix_bottom {
    position: fixed;
    bottom: 0;
    width: 100%;
}

.purchase_detail .fix_bottom .small_button {
    width: 17%;
    float: left;
    background: #EEEEEE;
    border: 1px solid #ddd;
}*/


.purchase_detail .center{
    padding: 20px;
    /*position: relative;*/
    background: #fff;
    float: left;
    width: 100%;

}
.purchase_detail .center .title{
    float: left;
    width: 100%;
    margin-bottom: 20px;
}


.purchase_detail .center .title p{
    float: left;
    margin-left: 0px;
    font-size: 1.8rem;
    line-height: 1.7rem;
    color: #333;

}

.purchase_detail .detail{
    float: left;
    width: 100%;
    margin-bottom: 15px;
    text-align: left;
}

.purchase_detail .detail p{
    float: left;
}

.purchase_detail .detail p span{
    color: #666;
    font-size: 1.1rem;
}
.purchase_detail .detail .right{
    float: right;
}

.purchase_detail .detail p .orange_font{
    color: #EC6817;
}
.purchase_detail  .flowsheet{
  padding: 1.5rem;
  background:white;
  float: left;
  margin: 1rem 0 50px 0;
  
  /*position: absolute;*/
}
.purchase_detail  .flowsheet img{
  height:4rem;
  width:100%;
}
.purchase_detail  .flowsheet p{
  float:left;
  margin-bottom: 2rem;
  font-size:1.4rem;
  color:#FA6705; 
}
/*.pp{
    margin-top: 100px;
    width:100px;
    height:100px;
}*/
</style>
