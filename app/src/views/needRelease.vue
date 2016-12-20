<template>
    <div class="whole need_release">
        <mt-header fixed title="求购发布">
            <router-link to="/home" slot="left">
                <mt-button icon="back"></mt-button>
            </router-link>
        </mt-header>
        <div class="page-loadmore-wrapper"  >
            <mt-loadmore >
                <div class="good_information">
                    <p class="good_infor_header">求购货物信息</p>
                    <div class="good_name">
                        <p>产品：</p>
                        <div>
                            <div class="select" @click="jump(router)">
                                <!-- <p>请填写你需要的药材名称</p> -->
                                <input text="text" disabled="false" :placeholder="obj.drug_name" v-model="obj.drug_name">
                            </div>
                        </div>
                    </div>
                    <div class="good_spec">
                        <p>规格：</p>
                        <div>
                            <select v-model="obj.spec">
                                <option>非统货</option>>
                                <option>统货</option>
                            </select>
                        </div>
                    </div>
                    <div class="good_place">
                        <p>产地：</p>
                        <div>
                            <select v-model="obj.place">
                                <option>上海</option>
                                <option>北京</option>
                            </select>
                        </div>
                    </div>
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
                        <p>求购有效期：</p>
                        <div>
                            <input type="number" placeholder="30" v-model="obj.duedate"/>
                            <p>天</p>
                        </div>
                    </div>
                </div>
                <div class="remarks">
                    <p class="remarks_header">求购货物信息</p>
                    <div class="remarks_content">
                        <textarea placeholder="请根据实际情况填写药材资源卖点" v-model="obj.selling_point"></textarea>
                    </div>
                </div>
                <div class="contact">
                    <p class="contact_header">联系方式</p>
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
                router:'search',
                selected: '1',
                obj:{
                    drug_name:'白术',
                    spec:'',
                    place:'',
                    number:'',
                    number_unit:'kg',
                    selling_point:'',
                    name:'',
                    phone:'',
                    duedate:'',
                    id:''

                },
            }
        },
        methods: {
            release() {
                /*this.$router.push('needReleaseSuccess');*/
                let _self = this;
                common.$emit('show-load');
                  let url=common.addSID(common.urlCommon + common.apiUrl.most);
                  let body={biz_module:'intentionService',biz_method:'editBegBuyInfo',version:1,time:0,sign:'',biz_param:{
                         customerId:"",
                         breedName:_self.obj.drug_name,
                         spec:_self.obj.spec,
                         location:_self.obj.place,
                         number:_self.obj.number,
                         description:_self.obj.selling_point,
                         customerName:_self.obj.name,
                         customerPhone:_self.obj.phone,
                         duedate:_self.obj.duedate,
                         breedId:"1111111",
                         unit:_self.obj.number_unit,
                        /* id:_self.obj.id*/    
                  }};
                  
                  body.time=Date.parse(new Date())+parseInt(common.difTime);
                  body.sign=common.getSign('biz_module='+body.biz_module+'&biz_method='+body.biz_method+'&time='+body.time);
                  httpService.needRelease(url,body,function(suc){
                    common.$emit('close-load');
                    console.log(suc);
                    common.$emit('message', suc.data.msg);
                    
                  },function(err){
                    common.$emit('close-load');
                    common.$emit('message', err.data.msg);
                  })
            },
            jump(router){
                this.$router.push(router);
            }
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

.need_release{}

input[type="text"],
input[type="submit"],
input[type="reset"],
select,
textarea {
    -webkit-appearance: none;
    border-radius: 0;
}

.need_release .mint-header {
    background-color: white;
    color: #313232;
    border-bottom: 1px solid #C9C9C9;
}

.need_release .good_information,
.remarks,
.contact {
    padding: 1.28rem;
    margin-bottom: 0.8533rem;
    background: white;
}

.need_release .good_information {
    height: 23.9rem;
}

.need_release .contact {
    height: 12.8rem;
    margin-bottom: 10px;
}

.need_release .good_infor_header {
    background: url('../../static/images/information.png') no-repeat 0 center;
    background-size: 1.11rem 1.11rem;
}

.need_release .good_infor_header,
.remarks_header,
.contact_header {
    font-size: 1.2rem;
    color: #FA6705;
    text-align: left;
    padding-left: 1.536rem;
}


.need_release .remarks .remarks_header{
    background:url('../../static/images/remarks.png') no-repeat 0 center;
    background-size:1.11rem 1.11rem;
}
.need_release .contact .contact_header{
    background:url('../../static/images/contact.png') no-repeat 0 center;
    background-size:1.11rem 1.11rem;
}
.need_release .good_name,
.good_spec,
.good_place,
.good_number,
.contact_name,
.contact_phone {
    height: 2.99rem;
    margin-top: 0.8533rem;
}

.need_release .good_place select {
    background: url('../../static/images/drop-down.png') no-repeat 13.3rem center;
    background-size: 1.067rem 1.067rem;
    text-align: center;
}

.need_release .good_spec select {
    background: url('../../static/images/drop-down.png') no-repeat 13.3rem center;
    background-size: 1.067rem 1.067rem;
    text-align: center;
}

.need_release .good_name p,
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

.need_release .contact_name p,
.contact_phone p {
    margin-right: 2.47rem;
}

.need_release .good_name div,
.good_spec div,
.good_place div,
.good_number div {
    float: right;
    position: relative;
}


.need_release .good_number .number_unit{
    width:100%;
    height:100%;
    outline: none;
    border:0;
    float:left;
    text-align: center;
    padding-left:10px;
}


.need_release .good_name div .select,
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

/*.need_release .good_name div .select p {
    height: 2.9rem;
    width: 14.847rem;
    text-align: center;
    font-size: 1.024rem;
    color: #999999;
}*/
.need_release .good_name div .select input{
    text-align: center;
    outline: none;
    border:0;
    height:100%;
    width:100%;
    background: white;
}
.need_release .good_number div {
    height: 2.9rem;
    width: 14.847rem;
    border: 1px solid #D2D2D2;
}

.need_release .good_number div input {
    outline: none;
    font-size: 1.024rem;
    height: 2.73rem;
    width: 11.178rem;
    text-align: center;
    float: left;
    outline: none;
    border: 0;
}

.need_release .good_number div p {
    height: 2.73rem;
    width: 3.2rem;
    border-left: 1px solid #D2D2D2;
}

.need_release .remarks_content textarea {
    height: 7.68rem;
    width: 92%;
    margin-top: 1.279rem;
    padding: 1.279rem;
    border: 1px solid #D2D2D2;
}

.need_release .confirm {
    width: 100%;
    height: 4.267rem;
    background: #FA6705;
    font-size: 1.536rem;
    color: white;
    line-height: 4.267rem;
}
</style>
