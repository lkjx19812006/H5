<template>
  <div class="company_authentication">
        <mt-header title="企业认证">
            <router-link to="/home" slot="left">
                <mt-button icon="back"></mt-button>
            </router-link>
        </mt-header>
       

      <div class="select_box">
        <mt-navbar v-model="selected">
          <mt-tab-item id="1" class="word">三证合一</mt-tab-item>
          <mt-tab-item id="2" class="word">传统三证</mt-tab-item>
        </mt-navbar>
      </div>
        
      <div class="content">
           <mt-tab-container v-model="selected">
              <mt-tab-container-item id="1">
                <div class="first_item">
                    <div v-for="(todo,index) in todos" v-bind:class="{ maxbox: index%2==0, 'otherbox': index%2==1 }">
                       <p class="title">{{todo.title}}</p>
                       <div class="photo"></div>
                       <p class="point">{{todo.point}}</p>
                    </div>

                   
                     
                </div>
              </mt-tab-container-item>
              <mt-tab-container-item id="2">
                <div class="second_item">
                    <div v-for="(todo,index) in datas" v-bind:class="{ maxbox: index%2==0, 'otherbox': index%2==1 }">
                       <p class="title">{{todo.title}}</p>
                       <div class="photo"></div>
                       <p class="point">{{todo.point}}</p>
                    </div>
                     
                </div>
              </mt-tab-container-item>
            </mt-tab-container>
      </div>  
                
       <div class="common_problem">
          
          
            <img src="/static/images/common-problem.png">
            <p><span>认证常见问题</span></p>
         
       </div>
        <div class="confirm">申请认证</div>
  </div>
</template>

<script>
import common from '../common/common.js'

export default {
    data() {
            return {
                selected:"1",
                isActive: true,
                hasError: false,
                todos:[{
                    title:'1工商营业执照',
                    point:'请使用原件拍照或扫描'
                },{
                    title:'2工商营业执照',
                    point:'请使用原件拍照或扫描'
                },{
                    title:'3工商营业执照',
                    point:'请使用原件拍照或扫描'
                },{
                    title:'4工商营业执照',
                    point:'请使用原件拍照或扫描'
                },{
                    title:'5工商营业执照',
                    point:'请使用原件拍照或扫描'
                },{
                    title:'6工商营业执照',
                    point:'请使用原件拍照或扫描'
                }],

                datas:[{
                    title:'工商营业执照',
                    point:'请使用原件拍照或扫描'
                },{
                    title:'工商营业执照',
                    point:'请使用原件拍照或扫描'
                },{
                    title:'工商营业执照',
                    point:'请使用原件拍照或扫描'
                },{
                    title:'工商营业执照',
                    point:'请使用原件拍照或扫描'
                }]
            }
        }, 
        created() {
            let _self = this;
            common.$emit('show-load');
            this.$http.get(common.apiUrl.list).then((response) => {
                common.$emit('close-load');
                let data = response.data.biz_result.list;
                /*this.todos = data;*/
            }, (err) => {
                common.$emit('close-load');
                common.$emit('message', response.data.msg);
            })
            

        }

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

.company_authentication .select_box{
    border-bottom: 1px solid #DFDFDF;
    background-color: white;
    padding: 1rem;
}
.company_authentication .mint-navbar {
    width: 70%;
    margin-left: 15%;


}
.company_authentication .mint-navbar .mint-tab-item {
    padding: 1.2rem 0;
    line-height: 0 !important;
    border: 1px solid #FA6705;
}
.company_authentication .mint-navbar .mint-tab-item.is-selected {
    background-color: #FA6705;
    color: white;
    margin: 0;
}
.company_authentication .word{
    font-size: 2.5rem;
    color:#FA6705;
}
.company_authentication .first_item{
    padding: 1.5rem;
    background:white;
    min-height: 53rem;
    margin-top: 1rem;
}
.company_authentication .second_item{
    padding: 1.5rem;
    background:white;
    min-height: 37rem;
    margin-top: 1rem;
}
.company_authentication .first_item .maxbox,.company_authentication .second_item .maxbox{
    width:50%;
    height:14rem;
    float:left;
    padding-right: 7%;
    text-align: left;
    margin-bottom: 3rem;
}
.company_authentication .first_item .otherbox,.company_authentication .second_item .otherbox{
    width:50%;
    height:14rem;
    float:left;
    padding-left: 7%;
    text-align: left;
    margin-bottom: 3rem;
}


.company_authentication .first_item>div .title,.company_authentication .second_item>div .title{
    font-size: 1.2rem;
    color:#333232;
    margin-bottom: 1.5rem;
}
.company_authentication .first_item>div .photo,.company_authentication .second_item>div .photo{
    height:9rem;
    width:100%;
    background:#E1DDDA;
} 
.company_authentication .first_item>div .point,.company_authentication .second_item>div .point{
    font-size: 1rem;
    margin-top:1rem;
    text-align: center;
    width:100%;
    color:#999999;
}
.company_authentication .content{
    margin-bottom: 2.2rem;
}
.company_authentication .common_problem{
    width:8.6rem;
    height:1.4rem;
    margin-left: -4.3rem;
    position: absolute;
    left: 50%;
    text-align: center;
    margin-bottom: 5rem;
}
.company_authentication .common_problem img{
    width: 1.4rem;
    float:left;
    margin-right:1rem;
}
.company_authentication .common_problem p{
    font-size: 1rem;
    line-height: 1.4rem;
    height:1.4rem;
    /*border:1px solid red;*/
    float:left;
    color:#FA6705;
}
.company_authentication .confirm{
    width:100%;
    height:5rem;
    background:#FA6705;
    color:white;
    line-height: 5rem;
    text-align: center;
    margin-top:7.5rem;
}
</style>
