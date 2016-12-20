<template>
    <div class="whole supply_release">
        <mt-header fixed title="资源发布">
            <router-link to="/home" slot="left">
                <mt-button icon="back"></mt-button>
            </router-link>
        </mt-header>
        <div class="page-loadmore-wrapper">
            <mt-loadmore>
                <div class="good_information">
                    <p class="good_infor_header">货物基本信息</p>
                    <div class="good_name">
                        <p>产品：</p>
                        <div>
                            <div class="select">
                                <!-- <p>请填写你需要的药材名称</p> -->
                                <input text="text" disable="false" placeholder="请填写你需要的药材名称" v-model="obj.drug_name">
                            </div>
                        </div>
                    </div>
                    <div class="good_spec">
                        <p>规格：</p>
                        <div>
                            <select v-model="obj.spec">
                                <option>统货</option>
                            </select>
                        </div>
                    </div>
                    <div class="good_place">
                        <p>产地：</p>
                        <div>
                            <select v-model="obj.place">
                                <option>上海</option>
                            </select>
                        </div>
                    </div>
                </div>
                <div class="good_information">
                    <p class="good_delivery_header">货物交收信息</p>
                    <div class="good_number">
                        <p>数量：</p>
                        <div>
                            <input type="text" placeholder="你需要的药材数量" v-model="obj.number"/>
                            <p>
                                <select v-model="obj.number_unit" class="number_unit">
                                   <option>kg</option>
                                   <option>g</option>
                                </select>
                            </p>
                        </div>
                    </div>
                    <div class="good_number">
                        <p>销售价格：</p>
                        <div>
                            <input type="text" placeholder="什么价格销售" v-model="obj.sales_price"/>
                            <p>元/份</p>
                        </div>
                    </div>
                    <div class="good_number">
                        <p>交货地：</p>
                        <div>
                            <input type="text" placeholder="药材在哪里" v-model="obj.where"/>
                        </div>
                    </div>
                </div>
                <div class="good_information">
                    <p class="good_sample_header">样品信息</p>
                    <div class="good_number">
                        <p>是否提供样品：</p>
                        <div class="sample_button">
                            <button  v-on:click="judgeTrue"  v-bind:class="{ 'left_button': isA, 'another_button_active': isB }">是</button>
                            <button  v-on:click="judgeFalse"  v-bind:class="{ 'button_active': isA, 'right_button': isB }">否</button>
                        </div>
                    </div>
                    <div class="good_number">
                        <p>样品重量：</p>
                        <div>
                            <input type="text" placeholder="100" v-model="obj.weight"/>
                            <p>
                                <!-- <select v-model="obj.weight_unit" class="number_unit">
                                   <option>kg</option>
                                   <option>g</option>
                                </select> -->
                                {{obj.number_unit}}
                            </p>
                        </div>
                    </div>
                    <div class="good_number">
                        <p>样品价格：</p>
                        <div>
                            <input type="text" placeholder="500" v-model="obj.price"/>
                            <p>元</p>
                        </div>
                    </div>
                </div>
                <div class="good_information">
                    <p class="good_photo_header">上传货物图片</p>

                    <div class="upload_image">
                        <imageUpload :param="param" v-on:postUrl="getUrl"></imageUpload>
                    </div>
                </div>
                <div class="remarks">
                    <p class="remarks_header" style="background:url('../../static/images/remarks.png') no-repeat 0 center;background-size:1.11rem 1.11rem;">备注</p>
                    <div class="remarks_content">
                        <textarea placeholder="请根据实际情况填写药材资源卖点" v-model="obj.selling_point"></textarea>
                    </div>
                </div>
                <div class="contact">
                    <p class="contact_header" style="background:url('../../static/images/contact.png') no-repeat 0 center;background-size:1.11rem 1.11rem;">联系方式</p>
                    <div class="contact_name">
                        <P>姓名：</P>
                        <div>
                            <input type="text" placeholder="请输入您的姓名" v-model="obj.name">
                        </div>
                    </div>
                    <div class="contact_phone">
                        <P>手机：</P>
                        <div>
                            <input type="text" placeholder="请输入您的手机号" v-model="obj.phone">
                        </div>
                    </div>
                </div>
                <div class="confirm" @click="release()">确认发布</div>
            </mt-loadmore>
        </div>
    </div>
</template>
<script>
import common from '../common/common.js'

import imageUpload from '../components/tools/imageUpload'
import httpService from '../common/httpService.js'
export default {
    data() {
            return {
                isA:true,
                isB:false,
                judge:0,
                img_src:'/static/images/3.jpg',
                obj:{
                    drug_name:'',
                    spec:'',
                    place:'',
                    number:'',
                    number_unit:'kg',
                    sales_price:'',
                    where:'',
                    weight:'',
                    price:'',
                    selling_point:'',
                    name:'',
                    phone:'',
                    duedate:'30'

                },
                selected: '1',
                todos: {},

                param: {
                    name: 'intention',
                    index:0,
                    url:''
                },
                pickerValue: '1'

            }
        },
        methods: {
            judgeTrue(){
                 this.judge = 1; 
                 this.isA = !this.isA;
                 this.isB = !this.isB;
            },
            judgeFalse(){
                 this.judge = 0;
                 this.isA = !this.isA;
                 this.isB = !this.isB;
            },
            release() {
                
                  let _self = this;
                  console.log(_self.obj.number  + _self.obj.number_unit);
                  common.$emit('show-load');
                  let url=common.addSID(common.urlCommon+common.apiUrl.most);
                  let body={biz_module:'intentionService',biz_method:'editSupplyInfo',version:1,time:0,sign:'',biz_param:{
                         customerId:"",
                         breedName:_self.obj.drug_name,
                         spec:_self.obj.spec,
                         location:_self.obj.place,
                         number:_self.obj.number,
                         price:_self.obj.sales_price,
                         address:_self.obj.where,
                         sampling:_self.judge,
                         description:_self.obj.selling_point,
                         customerName:_self.obj.name,
                         customerPhone:_self.obj.phone,
                         editImage:['','','',''],
                         descriptions:"",
                         sampleNumber:_self.obj.weight,
                         sampleAmount:_self.obj.price,
                         duedate:_self.obj.duedate,
                         breedId:"",
                         unit:_self.obj.number_unit
                        
                  }};
                  
                  body.time=Date.parse(new Date())+parseInt(common.difTime);
                  body.sign=common.getSign('biz_module='+body.biz_module+'&biz_method='+body.biz_method+'&time='+body.time);
                  httpService.supplyRelease(url,body,function(suc){
                    common.$emit('close-load');
                    console.log(suc);
                    _self.$router.push('supplyReleaseSuccess');
                    
                  },function(err){
                    common.$emit('close-load');
                    common.$emit()
                  })

            },
            getUrl(param) {
                console.log('dddddd');
                console.log(param.url);
            }
            
        },
        components: {
            imageUpload
        },
        
        created() {
            common.$emit('show-load');
            this.$http.get(common.apiUrl.drug_information_list).then((response) => {
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
<style scoped>
.whole {
    position: relative;
    background: #F1EFEF;
}

.supply_release {}

input[type="text"],
input[type="submit"],
input[type="reset"],
select,
textarea {
    -webkit-appearance: none;
    border-radius: 0;
}

.supply_release .mint-header {
    background-color: white;
    color: #313232;
    border-bottom: 1px solid #C9C9C9;
}

.supply_release .good_information,
.remarks,
.contact {
    padding: 1.28rem;
    margin-bottom: 0.8533rem;
    background: white;
}

.supply_release .good_information {
    height: 16rem;
}

.supply_release .contact {
    height: 12.8rem;
    margin-bottom: 10px;
}

.supply_release .good_infor_header {
    background: url('../../static/images/information.png') no-repeat 0 center;
    background-size: 1.11rem 1.11rem;
}

.supply_release .good_delivery_header {
    background: url('../../static/images/deliveryInformation.png') no-repeat 0 center;
    background-size: 1.11rem 1.11rem;
}

.supply_release .good_sample_header {
    background: url('../../static/images/sample.png') no-repeat 0 center;
    background-size: 1.11rem 1.11rem;
}

.supply_release .good_photo_header {
    background: url('../../static/images/upload.png') no-repeat 0 center;
    background-size: 1.11rem 1.11rem;
}


.supply_release .good_information .upload_image{

    width: 20%;
    float: left;
    margin-top: 1rem;
}

.supply_release .good_infor_header,
.good_delivery_header,
.good_sample_header,
.good_photo_header,
.remarks_header,
.contact_header {
    font-size: 1.2rem;
    color: #FA6705;
    text-align: left;
    padding-left: 1.536rem;
}

.supply_release .good_name,
.good_spec,
.good_place,
.good_number,
.contact_name,
.contact_phone {
    height: 2.99rem;
    margin-top: 0.8533rem;
}


.supply_release .good_number .number_unit{
    width:100%;
    height:100%;
    outline: none;
    border:0;
    float:left;
    text-align: center;
    padding-left:10px;
}
.supply_release .good_place select {
    background: url('../../static/images/drop-down.png') no-repeat 13.3rem center;
    background-size: 1.067rem 1.067rem;
    text-align: center;
}

.supply_release .good_spec select {
    background: url('../../static/images/drop-down.png') no-repeat 13.3rem center;
    background-size: 1.067rem 1.067rem;
    text-align: center;
}

.supply_release .good_name p,
.good_spec p,
.good_place p,
.good_number p,
.contact_name p,
.contact_phone p,
.contact_name div,
.contact_phone div {
    float: left;
    line-height: 2.99rem;
    font-size: 1.024rem;
    color: #333333;
}

.supply_release .contact_name p,
.contact_phone p {
    margin-right: 2.47rem;
}

.supply_release .good_name div,
.good_spec div,
.good_place div,
.good_number div {
    float: right;
    position: relative;
}

.supply_release .good_name div .select,
.good_spec div select,
.good_place div select,
.contact_name div input,
.contact_phone div input {
    font-size: 1.024rem;
    height: 2.9rem;
    width: 14.847rem;
    text-align: center;
    outline: none;
    border: 1px solid #D2D2D2;
}
.supply_release .good_name div .select input{
    text-align: center;
    outline: none;
    border:0;
    height:100%;
    width:100%;
}


.supply_release .good_number button{  
    height:100%;
    width:6.5rem;
    background:white;
    border:1px solid #D2D2D2;
    outline: none;
}
.supply_release .good_number .sample_button{
    border:none;
}
.supply_release .good_number .sample_button .left_button{
    float:left;
}
.supply_release .good_number .sample_button .button_active{
    float:right;
    background:#FA6705;
}
.supply_release .good_number .sample_button .right_button{
    float:right;
}
.supply_release .good_number .sample_button .another_button_active{
    float:left;
    background:#FA6705;
}



.supply_release .good_name div .select p {
    height: 2.9rem;
    width: 14.847rem;
    text-align: center;
    font-size: 1.024rem;
    color: #999999;
}

.supply_release .good_number div {
    height: 2.9rem;
    width: 14.847rem;
    border: 1px solid #D2D2D2;
}

.supply_release .good_number div input {
    outline: none;
    font-size: 1.024rem;
    height: 2.73rem;
    width: 11.178rem;
    text-align: center;
    float: left;
    outline: none;
    border: 0;
}

.supply_release .good_number div p {
    height: 2.73rem;
    width: 3.2rem;
    border-left: 1px solid #D2D2D2;
}

.supply_release .remarks_content textarea {
    height: 7.68rem;
    width: 92%;
    margin-top: 1.279rem;
    padding: 1.279rem;
    border: 1px solid #D2D2D2;
}

.supply_release .confirm {
    width: 100%;
    height: 4.267rem;
    background: #FA6705;
    font-size: 1.536rem;
    color: white;
    line-height: 4.267rem;
}
</style>
