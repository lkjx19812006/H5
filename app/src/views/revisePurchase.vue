<template>
    <div class="revise_purchase">
        <mt-header title="修改求购">
            <router-link to="/myPurchase" slot="left">
                <mt-button icon="back"></mt-button>
            </router-link>
        </mt-header>
        <druginformation :obj="obj"> </druginformation>
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
        <div class="confirm" @click="release()">确认修改</div>
    </div>
</template>
<script>
import druginformation from '../components/tools/purchaseGoodInformation'
import common from '../common/common.js'
import imageUpload from '../components/tools/imageUpload'
import httpService from '../common/httpService.js'
export default {
    data() {
            return {
                selected: '1',
                todos: {},
                obj: {
                    drug_name: '白术',
                    spec: '',
                    place: '',
                    number: '',
                    number_unit: 'kg',
                    selling_point: '',
                    name: '',
                    phone: '',
                    duedate: '',
                    id: ''

                },
            }
        },
        components: {
            druginformation
        },
        methods: {
            jumpSearch(router) {
                common.$emit("setParam", "router", "revisePurchase");
                this.$router.push(router);
            },
            self(id) {
                let _self = this;
                httpService.getIntentionDetails(common.urlCommon + common.apiUrl.most, {
                    biz_module: 'intentionService',
                    biz_method: 'queryIntentionInfo',

                    biz_param: {
                        id: id
                    }
                }, function(suc) {

                    if (suc.data.code == '1c01') {
                        let result = suc.data.biz_result;
                        var duedateDate = new Date(result.duedate);
                        var pubdateDate = new Date(result.pubdate);
                        var dateValue = duedateDate.getTime() - pubdateDate.getTime();
                        var days = Math.floor(dateValue / (24 * 3600 * 1000));

                        _self.obj.drug_name = result.breedName;
                        _self.obj.spec = result.spec;
                        _self.obj.place = result.location;
                        _self.obj.number = result.number;
                        _self.obj.number_unit = result.unit;
                        _self.obj.selling_point = result.description;
                        _self.obj.name = result.customerName;
                        _self.obj.phone = result.customerPhone;
                        _self.obj.duedate = days;
                    } else {
                        common.$emit('message', suc.data.msg);
                    }
                }, function(err) {

                    common.$emit('message', err.data.msg);
                })
            },
            release() {
                /*this.$router.push('needReleaseSuccess');*/
                /*common.$emit('confirm','确定修改','取消修改','确认修改信息后,将等待审核！','确定修改');*/
                let _self = this;
                common.$emit('show-load');
                let url = common.addSID(common.urlCommon + common.apiUrl.most);
                let body = {
                    biz_module: 'intentionService',
                    biz_method: 'updateEditBegBuyInfo',
                    version: 1,
                    time: 0,
                    sign: '',
                    biz_param: {

                        breedName: _self.obj.drug_name,
                        spec: _self.obj.spec,
                        location: _self.obj.place,
                        number: _self.obj.number,
                        description: _self.obj.selling_point,
                        customerName: _self.obj.name,
                        customerPhone: _self.obj.phone,
                        duedate: _self.obj.duedate,
                        breedId: "-1",
                        unit: _self.obj.number_unit,
                        id: _self.obj.id
                    }
                };

                body.time = Date.parse(new Date()) + parseInt(common.difTime);
                body.sign = common.getSign('biz_module=' + body.biz_module + '&biz_method=' + body.biz_method + '&time=' + body.time);
                httpService.needRelease(url, body, function(suc) {
                    common.$emit('close-load');
                    console.log(suc);
                    if (suc.data.code == '1c01') {
                        common.$emit('message', suc.data.msg);
                        common.$emit('revisePurtoPur','refurbish');
                        _self.$router.push("/myPurchase");
                    } else {
                        common.$emit('message', suc.data.msg);
                    }



                }, function(err) {
                    common.$emit('close-load');
                    common.$emit('message', err.data.msg);
                })
            }
        },
        created() {
            var _self = this;
            var str = _self.$route.fullPath;
            var id = str.substring(16, str.length);
            _self.obj.id = id;

            _self.self(id);
            common.$on('Revisepurchase', function(item) {
                _self.obj.drug_name = item;
            })

            common.$on("purchase-id", function(item) {
                _self.self(item);
            })

        }
}
</script>
<style scoped>
.need_release {}

input[type="text"],
input[type="submit"],
input[type="reset"],
select,
textarea {
    -webkit-appearance: none;
    border-radius: 0;
}

.revise_purchase .mint-header {
    background-color: white;
    color: #313232;
    border-bottom: 1px solid #C9C9C9;
}

.revise_purchase .good_information,
.remarks,
.contact {
    padding: 1.28rem;
    margin-bottom: 0.8533rem;
    background: white;
}

.revise_purchase .good_information {
    height: 23.9rem;
}

.revise_purchase .contact {
    height: 12.8rem;
    margin-bottom: 10px;
}

.revise_purchase .good_infor_header {
    background: url('../../static/images/information.png') no-repeat 0 center;
    background-size: 1.11rem 1.11rem;
}

.revise_purchase .good_infor_header,
.remarks_header,
.contact_header {
    font-size: 1.2rem;
    color: #FA6705;
    text-align: left;
    padding-left: 1.536rem;
}

.revise_purchase .good_name,
.good_spec,
.good_place,
.good_number,
.contact_name,
.contact_phone {
    height: 2.99rem;
    margin-top: 0.8533rem;
}

.revise_purchase .good_place select {
    background: url('../../static/images/drop-down.png') no-repeat 13.3rem center;
    background-size: 1.067rem 1.067rem;
    text-align: center;
}

.revise_purchase .good_spec select {
    background: url('../../static/images/drop-down.png') no-repeat 13.3rem center;
    background-size: 1.067rem 1.067rem;
    text-align: center;
}

.revise_purchase .good_name p,
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

.revise_purchase .contact_name p,
.contact_phone p {
    margin-right: 2.47rem;
}

.revise_purchase .good_name div,
.good_spec div,
.good_place div,
.good_number div {
    float: right;
    position: relative;
}

.revise_purchase .good_name div .select,
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


/*.revise_purchase .good_name div .select p {
    height: 2.9rem;
    width: 14.847rem;
    text-align: center;
    font-size: 1.024rem;
    color: #999999;
}*/

.revise_purchase .good_name div .select input {
    text-align: center;
    outline: none;
    border: 0;
    height: 100%;
    width: 100%;
    background: white;
}

.revise_purchase .good_number div {
    height: 2.9rem;
    width: 14.847rem;
    border: 1px solid #D2D2D2;
}

.revise_purchase .good_number div input {
    outline: none;
    font-size: 1.024rem;
    height: 2.73rem;
    width: 11.178rem;
    text-align: center;
    float: left;
    outline: none;
    border: 0;
}

.revise_purchase .good_number div p {
    height: 2.73rem;
    width: 3.2rem;
    border-left: 1px solid #D2D2D2;
}

.revise_purchase .remarks_content textarea {
    height: 7.68rem;
    width: 92%;
    margin-top: 1.279rem;
    padding: 1.279rem;
    border: 1px solid #D2D2D2;
}

.revise_purchase .confirm {
    width: 100%;
    height: 4.267rem;
    background: #FA6705;
    font-size: 1.536rem;
    color: white;
    line-height: 4.267rem;
}

.revise_purchase .remarks .remarks_header {
    background: url('../../static/images/remarks.png') no-repeat 0 center;
    background-size: 1.11rem 1.11rem;
}

.revise_purchase .contact .contact_header {
    background: url('../../static/images/contact.png') no-repeat 0 center;
    background-size: 1.11rem 1.11rem;
}

.revise_purchase .good_number .number_unit {
    width: 100%;
    height: 100%;
    outline: none;
    border: 0;
    float: left;
    text-align: center;
    padding-left: 10px;
}
</style>
