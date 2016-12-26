<template>
    <div class="address_revise">
        <mt-header title="修改地址">
            <router-link to="/addressManage" slot="left">
                <mt-button icon="back" ></mt-button>
            </router-link>
        </mt-header>
        <ul>
           <li>
              <p>收货人</p>
              <input type="text" :placeholder="obj.name" v-model="obj.name">
           </li>

           <li>
              <p>联系电话</p>
              <input type="text" :placeholder="obj.tel" v-model="obj.tel">
           </li>

           <li  @click="selectPlace">
              <p>省市区(县)</p>
              <p class="selectPlace">
                  <!-- <span v-model="obj.province">{{obj.province}}</span>
                  <span v-model="obj.city">{{obj.city}}</span>
                  <span v-model="obj.area">{{obj.area}}</span> -->
                  <!-- <input type="text" v-model="obj.province" />
                  <input type="text" v-model="obj.city" />
                  <input type="text" v-model="obj.area" /> -->

                  {{ obj.addressProvince }}{{ obj.addressCity }},{{obj.addressDistrict}}
                  
              </p>  
              <img src="/static/images/right-arrow.png" >
           </li>
           <li class="last">
              <textarea :placeholder="obj.detailAddr" v-model="obj.detailAddr"></textarea>
           </li>
        </ul>

  <!-- <mt-picker :slots="slots" @change="onValuesChange" v-show="active" class="place" textAlign="center"></mt-picker> -->
<!-- <mt-picker :slots="slots" @change="onValuesChange"></mt-picker> -->
<!-- <mt-picker :slots="slots" @change="onAddressChange" class="address_picker"></mt-picker> -->
      <div class="address_box" v-show="show">
          <mt-button type="primary" class="left-button"  @click="cancel">取消</mt-button>
          <mt-button type="primary" class="right-button" @click="confirmIt" >确定</mt-button>
          <mt-picker :slots="addressSlots" @change="onAddressChange" :visible-item-count="5" class="select-box"></mt-picker>
      </div>
      <div class="confirm" v-on:click="confirm">保存</div>
    </div>
</template>
<script>
import common from '../common/common.js'
import httpService from '../common/httpService.js'



export default {
    data() {
            return {
                show:false,
                post_id:'',
                obj:{
                   name:'',
                   tel:'',
                    addressProvince: '北京',
                    addressCity: '北京',
                    addressDistrict:'朝阳区',
                   
                   detailAddr:''
                },
                addressSlots: [
                      {
                        flex: 1,
                        values: ['北京','上海'],
                        className: 'slot1',
                        textAlign: 'center'
                      },{
                        divider: true,
                        content: '-',
                        className: 'slot2'
                      },{
                        flex: 1,
                        values:['北京','上海'] ,
                        className: 'slot3',
                        textAlign: 'center'
                      }, 
                      {
                        divider: true,
                        content: '-',
                        className: 'slot4'
                      }, {
                        flex: 1,
                        values: ['朝阳区','虹口区'],
                        className: 'slot5',
                        textAlign: 'center'
                      }
                    ],
                    
            }
        },
    methods: {
           
            onAddressChange(picker, values) {
              //console.log(picker);
              //console.log(values);
              // picker.setSlotValues(1, address[values[0]]);
              this.obj.addressProvince = values[0];
              this.obj.addressCity = values[1];
              this.obj.addressDistrict=values[2];
            },

        selectPlace(){
            /*this.$router.push('selectPlace');*/
             this.show = true;
        },
        cancel(){
             this.show = false;
        },
        confirmIt(){
             this.show = false;
        },
        confirm(){
                  let _self = this;
                  common.$emit('show-load');
                  let url=common.addSID(common.urlCommon+common.apiUrl.most);
                  let body={biz_module:'userAddressService',biz_method:'updateUserAddressInfo',version:1,time:0,sign:'',biz_param:{
                        contactName:_self.obj.name,
                        contactPhone:_self.obj.tel,
                        province:_self.obj.addressProvince,
                        city:_self.obj.addressCity,
                        district:_self.obj.addressDistrict,
                        detailAddr:_self.obj.detailAddr,
                        id:_self.post_id
                  }};
                  
                  body.time=Date.parse(new Date())+parseInt(common.difTime);
                  body.sign=common.getSign('biz_module='+body.biz_module+'&biz_method='+body.biz_method+'&time='+body.time);
                  httpService.addressRevise(url,body,function(suc){
                    common.$emit('close-load');
                    console.log(suc);
                    /*var obj = _self.obj;*/
                    common.$emit('post-revise-address',_self.obj);
                    _self.$router.push('addressManage')
                    
                  },function(err){
                    common.$emit('close-load');
                  })
                
        }
    },
     created(){
               let _self = this;
               /*common.$on('post-address-id', function (id){
                    console.log(id);
                    _self.post_id = id;
                    console.log(id);
                  common.$emit('show-load');
                  let url=common.addSID(common.urlCommon+common.apiUrl.most);
                  let body={biz_module:'userAddressService',biz_method:'queryAddressById',version:1,time:0,sign:'',biz_param:{
                        id:id
                  }};
                  
                  body.time=Date.parse(new Date())+parseInt(common.difTime);
                  body.sign=common.getSign('biz_module='+body.biz_module+'&biz_method='+body.biz_method+'&time='+body.time);
                  httpService.addressRevise(url,body,function(suc){
                    common.$emit('close-load');
                    console.log(suc.data.biz_result);
                    let result = suc.data.biz_result;
                        _self.obj.detailAddr = result.address;
                        _self.obj.name = result.contactName;
                        _self.obj.tel = result.contactPhone;
                        _self.obj.addressProvince = result.province;
                        _self.obj.addressCity = result.city;
                        _self.obj.addressDistrict = result.district;
                  },function(err){
                    common.$emit('close-load');
                  })

             }) */

             common.$on('post-address-id', function (obj){
                   _self.obj = obj;
             })
             
     }
       
        
    }

</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.address_revise ul{
   padding: 0 1.5rem;
   background:white;
   width:100%;
   color:#333333;
}
.address_revise ul li{
   height:4.4rem;
   border-bottom:1px solid #DADADA;
   position: relative;
}
.address_revise ul .last{
   height:8.5rem;
   color:#666666;
   font-size: 1.2rem;
   padding: 1rem 0;
   border-bottom: none;
}
.address_revise ul .last textarea{
   width:100%;
   height:100%;
   border:0;
   color:#666666;
}
.address_revise ul li p{
   position: absolute;
   left:0;
   font-size: 1.2rem;
   color:#333333;
   line-height: 4.4rem;
}
.address_revise ul li input{
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
.address_revise ul li .selectPlace{
   position:absolute;
   right:10%;
   text-align: right;
   font-size: 1.2rem;
   color:#666666;
}
.address_revise ul li img{
   position: absolute;
   right:0;
   height:1rem;
   top:1.7rem;
}
.address_revise  .confirm{
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
/*.address_picker{
   width:100px;
   height:4.2rem;
}*/
.address_revise .address_box{
   position: relative;
   padding-top: 4rem;
   
   background: white;
   
}
.address_revise .address_box .left-button{
  position: absolute;
  left: 10%;
  top:1rem;
  width:60px;
  height:30px;
  font-size: 16px;
}

.address_revise .address_box .right-button{
  position: absolute;
  right:10%;
  top:1rem;
  width:60px;
  height:30px;
  font-size: 16px;
}
.address_revise .select-box{
  background:white;
}
</style>
