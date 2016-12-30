<template>
    <div class="supply_release">
        <mt-header fixed title="资源发布">
            <router-link to="/home" slot="left">
                <mt-button icon="back"></mt-button>
            </router-link>
        </mt-header>

        <div class="whole">
        <div class="page-loadmore-wrapper" ref="wrapper" :style="{ height: wrapperHeight + 'px' }">
            <mt-loadmore>
                <div class="good_information">
                    <p class="good_infor_header">货物基本信息</p>
                    <div class="good_name">
                        <p>产品：</p>
                        <div>
                            <div class="select" @click="jump">
                                <!-- <p>{{drug}}</p> -->
                                <input type="text"  v-model="drug" placeholder="请输入你想要的药材" disabled = true/>
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
                        <div @click="selectPlace" class="select-address">
                            <!-- <input type="text" placeholder="药材在哪里" v-model="obj.where"/> -->
                            {{ obj.addressProvince }} {{ obj.addressCity }} {{obj.addressDistrict}}
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

                    <div class="upload_image" v-for="(todo,index) in imageArr">
                        <imageUpload :param="imageArr[index]" v-on:postUrl="getUrl"></imageUpload>
                        <p class="img-name">{{imageName[index].name}}</p>
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
          <div class="address_outbox">
                <div class="address_box" v-show="show">
                    <mt-button type="primary" class="left-button" @click="cancel">取消</mt-button>
                    <mt-button type="primary" class="right-button" @click="confirmIt">确定</mt-button>
                    <mt-picker :slots="addressSlots" @change="onAddressChange" :visible-item-count="5" class="select-box"></mt-picker>
                </div>
          </div>
        </div>
    </div>
</template>
<script>
import common from '../common/common.js'
import areaJson from '../common/areaData'
import imageUpload from '../components/tools/imageUpload'
import httpService from '../common/httpService.js'

const addressArr = ['北京市', '天津市', '河北省', '山西省', '内蒙古自治区', '辽宁省', '吉林省', '黑龙江省', '上海市', '江苏省', '浙江省', '安徽省', '福建省', '江西省', '山东省', '河南省', '湖北省', '湖南省', '广东省', '广西壮族自治区', '海南省', '重庆市', '四川省', '贵州省', '云南省', '西藏自治区', '陕西省', '甘肃省', '青海省', '宁夏回族自治区', '新疆维吾尔族自治区'];

export default {
    data() {
            return {
                show: false,
                isA:true,
                isB:false,
                judge:0,
                img_src:'/static/images/3.jpg',
                drug:'请输入你想要的药材',
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
                    duedate:'30',
                    addressProvince: '北京市',
                    addressCity: '北京市',
                    addressDistrict: '东城区'

                },
                imgArr:['','','',''],
                selected: '1',
                todos: {},
                imageName:[{
                    name:'大货照'
                },{
                    name:'样品照'
                },{
                    name:'细节照'
                },{
                    name:'随意照'
                }],
                imageArr: [{
                    name: 'intention',
                    index:0,
                    url:''

                },{
                    name: 'intention',
                    index:1,
                    url:''
                },{
                    name: 'intention',
                    index:2,
                    url:''
                },{
                    name: 'intention',
                    index:3,
                    url:''
                }],
                pickerValue: '1',
                areaParam: {
                    addressProvince: '北京市',
                    addressCity: '北京市',
                    addressDistrict: '东城区'
                },
                addressSlots: [{
                    flex: 1,
                    values: addressArr,
                    className: 'slot1',
                    textAlign: 'center'
                }, {
                    divider: true,
                    content: '-',
                    className: 'slot2'
                }, {
                    flex: 1,
                    values: ['北京市'],
                    className: 'slot3',
                    textAlign: 'center'
                }, {
                    divider: true,
                    content: '-',
                    className: 'slot4'
                }, {
                    flex: 1,
                    values: ['东城区', '西城区', '朝阳区', '丰台区', '石景山区', '海淀区', '门头沟区', '房山区', '通州区', '顺义区', '昌平区', '大兴区', '怀柔区', '平谷区', '密云区', '延庆区'],
                    className: 'slot5',
                    textAlign: 'center'
                }],

            }
        },
        methods: {
            onAddressChange(picker, values) {
                let cityArr = [];
                let districtArr = [];
                let provinceId;
                let cityId = '';
                if (this.obj.addressProvince != values[0]) {
                    for (var i = 0; i < areaJson.province.length; i++) {
                        if (values[0] == areaJson.province[i].value) {
                            provinceId = areaJson.province[i].id;
                        }
                    }
                    for (var i = 0; i < areaJson.city.length; i++) {
                        if (areaJson.city[i].parentId == provinceId) {
                            if (!cityId) cityId = areaJson.city[i].id;
                            cityArr.push(areaJson.city[i].value);
                        }
                    }
                } else if (this.obj.addressCity != values[1]) {
                    for (var i = 0; i < areaJson.city.length; i++) {
                        if (areaJson.city[i].value == values[1]) {
                            cityId = areaJson.city[i].id;
                        }
                    }

                }
                if (cityId) {
                    for (var i = 0; i < areaJson.county.length; i++) {
                        if (areaJson.county[i].parentId == cityId) {
                            districtArr.push(areaJson.county[i].value);
                        }
                    }
                }
                if (cityArr.length > 0) picker.setSlotValues(1, cityArr);
                if (districtArr.length > 0) picker.setSlotValues(2, districtArr);
                this.areaParam.addressProvince = values[0];
                this.areaParam.addressCity = values[1];
                this.areaParam.addressDistrict = values[2];
               
            },
            selectPlace() {
                this.show = true;
            },
            cancel() {
                this.show = false;
            },
            confirmIt() {
                this.obj.addressProvince = this.areaParam.addressProvince;
                this.obj.addressCity = this.areaParam.addressCity;
                this.obj.addressDistrict = this.areaParam.addressDistrict;
                this.show = false;
            },
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
                  common.$emit('show-load');
                  let url=common.addSID(common.urlCommon+common.apiUrl.most);
                  let body={biz_module:'intentionService',biz_method:'editSupplyInfo',version:1,time:0,sign:'',biz_param:{
                         customerId:"",
                         breedName: common.pageParam.supplyRelease,
                         spec:_self.obj.spec,
                         location:_self.obj.place,
                         number:_self.obj.number,
                         price:_self.obj.sales_price,
                         address:_self.obj.addressProvince + ' ' + _self.obj.addressCity + ' ' + _self.obj.addressDistrict,
                         sampling:_self.judge,
                         description:_self.obj.selling_point,
                         customerName:_self.obj.name,
                         customerPhone:_self.obj.phone,
                         editImage:_self.imgArr,
                         descriptions:"",
                         sampleNumber:_self.obj.weight,
                         sampleAmount:_self.obj.price,
                         duedate:_self.obj.duedate,
                         breedId:"2",
                         unit:_self.obj.number_unit
                        
                  }};
                  
                  body.time=Date.parse(new Date())+parseInt(common.difTime);
                  body.sign=common.getSign('biz_module='+body.biz_module+'&biz_method='+body.biz_method+'&time='+body.time);
                  httpService.supplyRelease(url,body,function(suc){
                    common.$emit('close-load');
                    console.log(suc);
                    if(suc.data.code == '1c01'){
                        /*let id = suc.data.biz_result.id;*/
                        common.$emit('message', suc.data.msg);
                        common.$emit('informMyRes','refurbish');
                        let id = suc.data.biz_result.intentionId;
                        common.$emit('informSupplySuccess',id);
                        _self.$router.push("supplyReleaseSuccess" + '/' + id);
                    }else{
                        common.$emit('message', suc.data.msg);
                    }
                    
                  },function(err){
                    common.$emit('close-load');
                    common.$emit('message', err.data.msg);
                  })

            },
            jump(){
                 let _self = this;
                 common.$emit("setParam","router","supplyRelease");
                 _self.$router.push("search");
            },
            /*toMyResourceHttp(){
                  let _self = this;
                  common.$emit('show-load');
                  let url=common.addSID(common.urlCommon+common.apiUrl.most);
                  let body={biz_module:'intentionService',biz_method:'mySupplyIntentionList',version:1,time:0,sign:'',biz_param:{
                        sort:{"pubdate":0,"duedate":0},
                        onSell:0,
                        sampling:'',
                        pn:"1",
                        pSize:"20"
                  }};
                  
                  body.time=Date.parse(new Date())+parseInt(common.difTime);
                  body.sign=common.getSign('biz_module='+body.biz_module+'&biz_method='+body.biz_method+'&time='+body.time);
                  httpService.myResource(url,body,function(suc){
                    
                    
                    _self.todos = suc.data.biz_result.list;
                     
                    
                    
                  },function(err){
                    common.$emit('close-load');
                    common.$emit('message', err.data.msg);
                  })
            }*/
            getUrl(param) {
                let _self = this;
                if(param.index == 0){
                    _self.imgArr[0] = param.url;
                }else if(param.index == 1){
                    _self.imgArr[1] = param.url;
                }else if(param.index == 2){
                    _self.imgArr[2] = param.url;
                }else if(param.index == 3){
                    _self.imgArr[3] = param.url;
                }
            }
            
        },
        components: {
            imageUpload
        },
        
        created() {
            let _self = this;
            common.$on("supplyRelease",function (item){
                   
                   _self.drug = item;
                   console.log(item)
            })
            
            
            /*common.$emit('show-load');
            this.$http.get(common.apiUrl.drug_information_list).then((response) => {
                common.$emit('close-load');
                let data = response.data.biz_result.list;
                this.todos = data;
            }, (err) => {
                common.$emit('close-load');
                common.$emit('message', response.data.msg);
            });*/
        },
        mounted() {

            this.wrapperHeight = document.documentElement.clientHeight - this.$refs.wrapper.getBoundingClientRect().top;
        }
}
</script>
<style scoped>
.whole {
    position: relative;
    background: #F1EFEF;
}

.supply_release {
    
}

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
.supply_release .good_number .select-address{
    font-size: 1.024rem;
    color:#666666; 
    line-height: 2.9rem;
    overflow: hidden;
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
    background:white;
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
.supply_release .good_information .upload_image{
    width: 20%;
    float: left;
    margin: 1rem 10px 0 0;

}
.supply_release .good_information .upload_image .img-name{
    font-size: 1rem;
    color:#333333;
    padding-top: 1rem;
}
.supply_release .address_outbox{
    position: fixed;
    bottom: 0;
    background: white;
    width:100%;
}
.supply_release .address_box{
    position: relative;
    background: white;
    padding-top: 4rem;
}
.supply_release .address_box .left-button {
    position: absolute;
    left: 10%;
    top: 1rem;
    width: 60px;
    height: 30px;
    font-size: 16px;
}

.supply_release .address_box .right-button {
    position: absolute;
    right: 10%;
    top: 1rem;
    width: 60px;
    height: 30px;
    font-size: 16px;
}
</style>
