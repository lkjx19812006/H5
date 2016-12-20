<template>
    <div class="add_address">
        <mt-header title="添加新地址">
            <router-link to="/addressManage" slot="left">
                <mt-button icon="back" ></mt-button>
            </router-link>
        </mt-header>
        <ul>
           <li>
              <p>收货人</p>
              <input type="text" placeholder="请输入您的名字" v-model="name">
           </li>

           <li>
              <p>联系电话</p>
              <input type="text" placeholder="请输入您的联系电话" v-model="phone">
           </li>

           <li>
              <p>省市区(县)</p>
              <!-- <p class="selectPlace" v-if="">{{address}}</p>   -->

              <p class="selectPlace" >{{ addressProvince }}，{{ addressCity }}</p>  
              <img src="/static/images/right-arrow.png" @click="selectPlace">
           </li>
           <li class="last">
              <textarea placeholder="详细地址" v-model="detailAddr"></textarea>
           </li>
        </ul>
        <div class="address_box" v-show="show">
          <mt-picker :slots="addressSlots" @change="onAddressChange" :visible-item-count="5"></mt-picker>
        </div>

        <div class="confirm" v-on:click="confirm">保存</div>
  <!-- <mt-picker :slots="slots" @change="onValuesChange" v-show="active" class="place" textAlign="center"></mt-picker> -->
<!-- <mt-picker :slots="slots" @change="onValuesChange"></mt-picker> -->

    </div>
</template>
<script>
import common from '../common/common.js'
import httpService from '../common/httpService.js'



export default {
    data() {
            return {
                show:false,
                address:'请选择',
                name:'',
                phone:'',
                detailAddr:'',
                province:'北京',
                city:'北京',
                area:'朝阳区',

                addressSlots:[
                      {
                        flex: 1,
                        values: ['北京'],
                        className: 'slot1',
                        textAlign: 'center'
                      },{
                        divider: true,
                        content: '-',
                        className: 'slot2'
                      },{
                        flex: 1,
                        values:['北京'] ,
                        className: 'slot3',
                        textAlign: 'center'
                      }, 
                      {
                        divider: true,
                        content: '-',
                        className: 'slot4'
                      }, {
                        flex: 1,
                        values: ['朝阳区'],
                        className: 'slot5',
                        textAlign: 'center'
                      }
                    ],
                    addressProvince: '北京',
                    addressCity: '北京'
            }


                
        },
    methods:{
          
        selectPlace(){
            /*this.$router.push('selectPlace');*/
            this.show = !this.show;
        },
        onAddressChange(picker, values) {
             
              picker.setSlotValues(1, address[values[0]]);

              this.addressProvince = values[0];
              this.addressCity = values[1];
              
              /*this.addressDistrict = values[]*/
            },
        confirm(){
              let _self = this;
              common.$emit('show-load');
              let url=common.addSID(common.urlCommon+common.apiUrl.most);
              let body={biz_module:'userAddressService',biz_method:'addUserAddress',version:1,time:0,sign:'',biz_param:{
                    contactName:_self.name,
                    contactPhone:_self.phone,
                    province:_self.province,
                    city:_self.city,
                    district:_self.area,
                    detailAddr:_self.detailAddr
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
    created(){
              
    }
       
        
    }

</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.add_address ul{
   padding: 0 1.5rem;
   background:white;
   width:100%;
   color:#333333;
}
.add_address ul li{
   height:4.4rem;
   border-bottom:1px solid #DADADA;
   position: relative;
}
.add_address ul .last{
   height:8.5rem;
   color:#666666;
   font-size: 1.2rem;
   padding: 1rem 0;
   border-bottom: none;
}
.add_address ul .last textarea{
   width:100%;
   height:100%;
   border:0;
   color:#666666;
}
.add_address ul li p{
   position: absolute;
   left:0;
   font-size: 1.2rem;
   color:#333333;
   line-height: 4.4rem;
}
.add_address ul li input{
   position: absolute;
   right:10%;
   text-align: right;
   border:none;
   outline: none;
   font-size: 1.2rem;
   height:4.2rem;
   color:#666666;
   line-height: 4.4rem;
}
.add_address ul li .selectPlace{
   position:absolute;
   right:10%;
   text-align: right;
   font-size: 1.2rem;
   color:#666666;
}
.add_address ul li img{
   position: absolute;
   right:0;
   height:1rem;
   top:1.7rem;
}
.add_address  .confirm{
   width:100%;
   height:5rem;
   background:#FA6705;
   color:white;
   text-align: center;
   line-height: 5rem;
   font-size: 1.7rem;
   position: fixed;
   bottom: 0;
}
</style>
