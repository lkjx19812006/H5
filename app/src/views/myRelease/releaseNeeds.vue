<style lang="less" scoped>
input[type="text"],
input[type="submit"],
input[type="reset"],
select,
textarea {
    -webkit-appearance: none;
    border-radius: 0;
}

input {
    border: none;
    background-color: #fff;
}

.release_needs {
    background-color: #FBFBF6;
    position: relative;
    .top {
        background-color: #FBFBF6;
        .box {
            background-color: #FBFBF6;
            height: 44px;
            padding: 0 15px;
            line-height: 44px;
            display: flex;
            flex-direction: row;
            img {
                height: 20px;
                margin-top: 12px;
            }
            .title {
                font-size: 16px;
                color: #7BB157;
                padding-left: 5px;
            }
        }
        .outbox_nor {
            margin-top: 10px;
            background-color: #fff;
        }
        .pay {
            border-top: 1px solid #E6E6E6;
            background-color: #fff;
            padding-left: 15px;
            .inbox {
                border-bottom: 1px solid #E6E6E6;
                height: 50px;
                line-height: 50px;
                display: flex;
                flex-direction: row;
                justify-content: space-between;
                padding-right: 15px;
                .left {
                    font-size: 15px;
                }
                .right {
                    color: #999999;
                    font-size: 12px;
                }
            }
            .inboxs {
                border-bottom: 1px solid #E6E6E6;
                height: 50px;
                line-height: 50px;
                display: flex;
                flex-direction: row;
                padding-right: 15px;
                .left {
                    font-size: 15px;
                }
                .right {
                    color: #999999;
                    font-size: 12px;
                }
                .radio {
                    height: 20px;
                    margin-top: 15px;
                    margin-right: 10px;
                }
                .content {
                    display: flex;
                    flex-direction: row;
                    .fill_box {
                        height: 40px;
                        border-bottom: 1px solid #CBCBCB;
                        .fill_in {
                            width: 60px;
                            height: 25px;
                            line-height: 25px;
                            text-align: center;
                        }
                    }
                }
            }
            .inboxs_nor {
                border-bottom: none;
            }
        }
        .pay_nor {
            border-top: none;
            .other {
                width: 100%;
                padding: 0 15px 10px 30px;
                textarea {
                    width: 100%;
                    padding: 8px;
                    border: 1px solid #D8D8D8;
                    border-radius: 3px;
                    font-size: 13px;
                }
            }
        }
        .select {
            width: 100%;
            text-align: left;
        }
    }
    .confirm {
        height: 50px;
        width: 100%;
        line-height: 50px;
        font-size: 18px;
        color: #fff;
        background-color: #FA6705;
        position: fixed;
        bottom: 0;
    }
}

.page-loadmore-wrapper {
    padding-bottom: 100px;
}
</style>
<template>
    <div class="release_needs">
        <myHeader :param="param"></myHeader>
        <div class="page-loadmore-wrapper" ref="wrapper" :style="{ height: wrapperHeight + 'px' }">
            <div class="top">
                <div class="box">
                    <img src="/static/icon/need-title.png">
                    <div class="title">产品信息</div>
                </div>
                <needBasic :obj="obj"></needBasic>
            </div>
            <div class="top">
                <div class="box">
                    <img src="/static/icon/need-title.png">
                    <div class="title">交货要求</div>
                </div>
                <selectAddress :obj="obj"></selectAddress>
                <div class="outbox">
                    <div class="pay">
                        <div class="inbox">
                            <div class="left">付款方式</div>
                            <div class='right'>此项为单选</div>
                        </div>
                    </div>
                    <div class="pay pay_nor">
                        <div class="inboxs">
                            <img src="/static/icon/select.png" class="radio" v-show="payArr[0].show">
                            <img src="/static/icon/select_nor.png" class="radio" v-show="!payArr[0].show" @click="selectPay(0)">
                            <div class="content">
                                <div>{{payArr[0].one}}</div>
                                <div class="fill_box">
                                    <input type="text" v-model="payArr[0].two" class="fill_in">
                                </div>
                                <div>{{payArr[0].three}}</div>
                            </div>
                        </div>
                    </div>
                    <div class="pay pay_nor">
                        <div class="inboxs">
                            <img src="/static/icon/select.png" class="radio" v-show="payArr[1].show">
                            <img src="/static/icon/select_nor.png" class="radio" v-show="!payArr[1].show" @click="selectPay(1)">
                            <div class="content">
                                <div>{{payArr[1].two}}</div>
                            </div>
                        </div>
                    </div>
                    <div class="pay pay_nor">
                        <div class="inboxs">
                            <img src="/static/icon/select.png" class="radio" v-show="payArr[2].show">
                            <img src="/static/icon/select_nor.png" class="radio" v-show="!payArr[2].show" @click="selectPay(2)">
                            <div class="content">
                                <div>{{payArr[2].one}}</div>
                                <div class="fill_box">
                                    <input type="text" v-model="payArr[2].two" class="fill_in">
                                </div>
                                <div>{{payArr[2].three}}</div>
                            </div>
                        </div>
                    </div>
                    <div class="pay pay_nor">
                        <div class="inboxs inboxs_nor">
                            <img src="/static/icon/select.png" class="radio" v-show="payArr[3].show">
                            <img src="/static/icon/select_nor.png" class="radio" v-show="!payArr[3].show" @click="selectPay(3)">
                            <div class="content">
                                <div>其他</div>
                            </div>
                        </div>
                        <div class="other">
                            <textarea placeholder="示例: 要等我的下家确认货物没有问题，立即现款" v-model="payArr[3].two"></textarea>
                        </div>
                    </div>
                </div>
                <div class="outbox outbox_nor">
                    <div class="pay">
                        <div class="inbox">
                            <div class="left">截止时间</div>
                            <div class='right'>此选为单项</div>
                        </div>
                    </div>
                    <div class="pay pay_nor">
                        <div class="inboxs">
                            <img src="/static/icon/select.png" class="radio" v-show="dateArr[0].show">
                            <img src="/static/icon/select_nor.png" class="radio" v-show="!dateArr[0].show" @click="selectDate(0)">
                            <div class="content">{{dateArr[0].one}}天</div>
                        </div>
                    </div>
                    <div class="pay pay_nor">
                        <div class="inboxs">
                            <img src="/static/icon/select.png" class="radio" v-show="dateArr[1].show">
                            <img src="/static/icon/select_nor.png" class="radio" v-show="!dateArr[1].show" @click="selectDate(1)">
                            <div class="content">{{dateArr[1].one}}天</div>
                        </div>
                    </div>
                    <div class="pay pay_nor">
                        <div class="inboxs">
                            <img src="/static/icon/select.png" class="radio" v-show="dateArr[2].show">
                            <img src="/static/icon/select_nor.png" class="radio" v-show="!dateArr[2].show" @click="selectDate(2)">
                            <div class="content">{{dateArr[2].one}}天</div>
                        </div>
                    </div>
                    <div class="pay pay_nor">
                        <div class="inboxs inboxs_nor">
                            <img src="/static/icon/select.png" class="radio" v-show="dateArr[3].show">
                            <img src="/static/icon/select_nor.png" class="radio" v-show="!dateArr[3].show" @click="selectDate(3)">
                            <div class="content">
                                <div class="fill_box">
                                    <input type="text" v-model="dateArr[3].one" class="fill_in">
                                </div>
                                <div>天</div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="outbox outbox_nor">
                    <div class="pay">
                        <div class="inbox">
                            <div class="left">备注信息</div>
                            <div class='right'>此项为多选</div>
                        </div>
                    </div>
                    <div class="pay pay_nor">
                        <div class="inboxs">
                            <img src="/static/icon/select.png" class="radio" v-show="remarksArr[0].show" @click="remarksDateNor(0)">
                            <img src="/static/icon/select_nor.png" class="radio" v-show="!remarksArr[0].show" @click="remarksDate(0)">
                            <div class="content">{{remarksArr[0].one}}</div>
                        </div>
                    </div>
                    <div class="pay pay_nor">
                        <div class="inboxs">
                            <img src="/static/icon/select.png" class="radio" v-show="remarksArr[1].show" @click="remarksDateNor(1)">
                            <img src="/static/icon/select_nor.png" class="radio" v-show="!remarksArr[1].show" @click="remarksDate(1)">
                            <div class="content">{{remarksArr[1].one}}</div>
                        </div>
                    </div>
                    <div class="pay pay_nor">
                        <div class="inboxs">
                            <img src="/static/icon/select.png" class="radio" v-show="remarksArr[2].show" @click="remarksDateNor(2)">
                            <img src="/static/icon/select_nor.png" class="radio" v-show="!remarksArr[2].show" @click="remarksDate(2)">
                            <div class="content">{{remarksArr[2].one}}</div>
                        </div>
                    </div>
                    <div class="pay pay_nor">
                        <div class="inboxs inboxs_nor">
                            <img src="/static/icon/select.png" class="radio" v-show="remarksArr[3].show" @click="remarksDateNor(3)">
                            <img src="/static/icon/select_nor.png" class="radio" v-show="!remarksArr[3].show" @click="remarksDate(3)">
                            <div class="content">{{remarksArr[3].one}}</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="confirm" @click="confirm">发布求购</div>
    </div>
</template>
<script>
import common from '../../common/common.js'
import validation from '../../validation/validation.js'
import myHeader from '../../components/tools/myHeader'
import httpService from '../../common/httpService.js'
import needBasic from '../../components/release/needReleaseBasic'
import areaJson from '../../common/areaData'
import selectAddress from '../../components/popUpType/selectAddress'
export default {
    data() {
            return {
                param: {
                    name: '我要采购',
                    router: 'home'
                },
                payArr: [{
                    show: false,
                    one: '合同签订后，预付定金',
                    two: '',
                    three: '%'
                }, {
                    show: false,
                    one: '',
                    two: '验收合格后，立即付款',
                    three: ''
                }, {
                    show: false,
                    one: '验收合格后，',
                    two: '',
                    three: '天内付款'
                }, {
                    show: false,
                    one: '',
                    two: '',
                    three: ''
                }],
                dateArr: [{
                    show: false,
                    one: '7'
                }, {
                    show: false,
                    one: '15'
                }, {
                    show: false,
                    one: '30'
                }, {
                    show: false,
                    one: ''
                }],
                remarksArr: [{
                    show: false,
                    one: '时间紧'
                }, {
                    show: false,
                    one: '价格适合，立即合作'
                }, {
                    show: false,
                    one: '现款无账期'
                }, {
                    show: false,
                    one: '常年有需求，可建立稳固渠道'
                }],
                content: '',
                obj: {
                    need: true,
                    number_id: '',
                    update: false,
                    drug_name: '',
                    spec: '',
                    place: '',
                    place_id: '',
                    number: '',
                    number_unit: '',
                    selling_point: [],
                    name: '',
                    phone: '',
                    duedate: '',
                    breedId: '',
                    quality: '',
                    address: '',
                    paymentWay: '',
                    paymentWay_index: '',
                    sheetVisible: false,
                    addressProvince: '',
                    addressCity: '',
                    addressDistrict: '',
                    detailAddr: '',
                    tshow: false,
                    type_show: false
                },
                id: '',
                payment: '',
                paymentWay: '',
                duedate: ''
            }
        },
        methods: {
            getInfo() {
                let _self = this;
                common.$emit('show-load');
                let url = common.addSID(common.urlCommon + common.apiUrl.most);
                let body = {
                    biz_module: 'userService',
                    biz_method: 'queryUserInfo',
                    biz_param: {},
                };

                body.time = Date.parse(new Date()) + parseInt(common.difTime);
                body.sign = common.getSign('biz_module=' + body.biz_module + '&biz_method=' + body.biz_method + '&time=' + body.time);
                httpService.queryUserInfo(url, body, function(suc) {
                    common.$emit('close-load');
                    if (suc.data.code == "1c01") {
                        _self.obj.name = suc.data.biz_result.fullname;
                        _self.obj.phone = suc.data.biz_result.phone;
                    } else {
                        //console.log('cuowusasdada')
                    }

                }, function(err) {
                    common.$emit('close-load');
                })
            },
            confirm() {
                let _self = this;
                var checkArr = [];
                let checkBreedId = validation.checkNull(_self.obj.breedId, '请先选择品种！');
                checkArr.push(checkBreedId);
                let checkBreedSpec = validation.checkNull(_self.obj.spec, '请输入规格！');
                checkArr.push(checkBreedSpec);
                let checkBreedPlace = validation.checkNull(_self.obj.place_id, '请输入产地！');
                checkArr.push(checkBreedPlace);
                let checkNumber = validation.checkMaxNum(_self.obj.number, '数量');
                checkArr.push(checkNumber);
                let checkUnit = validation.checkMaxNum(_self.obj.number_id, '数量单位');
                checkArr.push(checkUnit);
                let checkQuality = validation.checkNull(_self.obj.quality, '请输入质量要求！');
                checkArr.push(checkQuality);
                let checkAddress = validation.checkNull(_self.obj.address, '请选择交货地！');
                checkArr.push(checkAddress);
                let checkPay = _self.payWay();
                checkArr.push(checkPay);
                let checkDuedate = _self.checkDates();
                checkArr.push(checkDuedate);
                let checkRemarks = _self.RemarkSelect();
                checkArr.push(checkRemarks);
                for (var i = 0; i < checkArr.length; i++) {
                    if (checkArr[i]) {
                        common.$emit('message', checkArr[i]);
                        return;
                    }
                }
                common.$emit("confirm", {
                    message: '确定发布求购？',
                    title: '提示',
                    ensure: this.release
                });
            },
            selectPay(index) {
                let _self = this;
                for (var key in this.payArr) {
                    _self.payArr[key].show = false;
                }
                this.payArr[index].show = true;
                this.obj.paymentWay = index;
            },
            selectDate(index) {
                let _self = this;
                for (var key in this.dateArr) {
                    _self.dateArr[key].show = false;
                }
                this.dateArr[index].show = true;
                this.obj.duedate = index;
            },
            remarksDateNor(index) {
                let _self = this;
                this.remarksArr[index].show = false;
                for (var i = 0; i < _self.obj.selling_point.length; i++) {
                    _self.obj.selling_point[i] = index;
                    _self.obj.selling_point.splice(i, 1);
                }
                console.log(_self.obj.selling_point);
            },
            remarksDate(index) {
                this.remarksArr[index].show = true;
                console.log(typeof this.obj.selling_point)
                this.obj.selling_point.push(index);
            },
            payWay() {
                let _self = this;
                _self.paymentWay = '';
                let validate = true;
                let msg = '';
                switch (this.obj.paymentWay) {
                    case 0:
                        if (!_self.payArr[0].two) {
                            msg = '请填写预付百分比';
                            validate = false;
                        } else if (_self.payArr[0].two <= 0) {
                            msg = '预付百分比不能小于0';
                            validate = false;
                        } else if (_self.payArr[0].two > 100) {
                            msg = '预付百分比不能大于100'
                            validate = false;
                        }
                        _self.paymentWay = '合同签订后，预付定金' + _self.payArr[0].two + '%';
                        break;
                    case 1:
                        _self.paymentWay = '验收合格后，立即付款';
                        break;
                    case 2:
                        if (!_self.payArr[2].two) {
                            msg = '请填写付款期限';
                            validate = false;
                        } else if (_self.payArr[2].two < 0) {
                            msg = '付款期限不能小于0天';
                            validate = false;
                        }
                        _self.paymentWay = '验收合格后' + _self.payArr[2].two + '天内付款';
                        break;
                    case 3:
                        if (!_self.payArr[3].two) {
                            msg = '请填写付款方式内容';
                            validate = false;
                        }
                        _self.paymentWay = _self.payArr[3].two;
                        break;
                    default:
                        msg = '请选择付款方式'
                        validate = false;
                        _self.paymentWay = '';
                }
                if (!validate) {
                    return msg;
                }
            },
            checkDates() {
                let _self = this;
                let validate = true;
                _self.duedate = '';
                let msg = '';
                switch (this.obj.duedate) {
                    case 0:
                        _self.duedate = '7';
                        break;
                    case 1:
                        _self.duedate = '15';
                        break;
                    case 2:
                        _self.duedate = '30';
                        break;
                    case 3:
                        if (!_self.dateArr[3].one) {
                            msg = '请填写截至日期'
                            validate = false;
                        }
                        _self.duedate = _self.dateArr[3].one;
                        break;
                    default:
                        msg = '请选择截至日期';
                        validate = false;
                        _self.duedate = '';
                }
                if (!validate) {
                    return msg;
                }
            },
            RemarkSelect() {
                let _self = this;
                _self.remarks = '';
                for (var i = 0; i < _self.obj.selling_point.length; i++) {
                    if (i == 0) {
                        _self.remarks = _self.remarksArr[_self.obj.selling_point[i]].one;
                    } else {
                        _self.remarks = _self.remarks + ',' + _self.remarksArr[_self.obj.selling_point[i]].one;
                    }
                }
                if (!_self.remarks) {
                    return '请选择备注信息';
                }
            },
            release() {
                let _self = this;
                common.$emit('show-load');
                let url = common.addSID(common.urlCommon + common.apiUrl.most);
                let body = {
                    biz_module: 'intentionService',
                    biz_method: 'htmlEditBegBuyInfo',
                    biz_param: {
                        customerId: common.customerId,
                        breedName: _self.obj.drug_name,
                        spec: _self.obj.spec,
                        location: _self.obj.place_id,
                        number: _self.obj.number,
                        duedate: _self.duedate,
                        description: _self.remarks,
                        breedId: _self.obj.breedId,
                        unit: _self.obj.number_id,
                        quality: _self.obj.quality,
                        address: _self.obj.address,
                        paymentWay: _self.paymentWay
                    }
                };
                if (_self.id !== '1') {
                    body = {
                        biz_module: 'intentionService',
                        biz_method: 'updatehtmlEditBegBuyInfo',
                        biz_param: {
                            customerId: common.customerId,
                            breedName: _self.obj.drug_name,
                            spec: _self.obj.spec,
                            location: _self.obj.place_id,
                            number: _self.obj.number,
                            duedate: _self.duedate,
                            description: _self.remarks,
                            breedId: _self.obj.breedId,
                            unit: _self.obj.number_id,
                            quality: _self.obj.quality,
                            address: _self.obj.address,
                            paymentWay: _self.paymentWay,
                            id: _self.id
                        }
                    }
                }
                body.time = Date.parse(new Date()) + parseInt(common.difTime);
                body.sign = common.getSign('biz_module=' + body.biz_module + '&biz_method=' + body.biz_method + '&time=' + body.time);
                httpService.needRelease(url, body, function(suc) {
                    common.$emit('close-load');
                    if (suc.data.code == '1c01') {
                        common.$emit('message', suc.data.msg);
                        common.$emit('informMyPurchase', 'refurbish');
                        let id = '';
                        if (suc.data.biz_result.intentionId) {
                            id = suc.data.biz_result.intentionId;
                        } else {
                            id = _self.id;
                        }

                        common.$emit('informNeedSuccess', id);
                        _self.$store.dispatch('getCustomer', {
                            name: _self.obj.name,
                            phone: _self.obj.phone
                        })
                        _self.$router.push("/releaseNeedSuccess" + '/' + id);
                    } else {
                        common.$emit('message', suc.data.msg);
                    }
                }, function(err) {
                    common.$emit('close-load');
                    common.$emit('message', err.data.msg);
                })
            },
            //编辑时获取付款方式
            getEditPayment(paymentWay) {
                let _self = this;
                //获取Unicode编码
                // var GB2312UnicodeConverter = {
                //     ToUnicode: function(str) {
                //         return escape(str).toLocaleLowerCase().replace(/%u/gi, '\\u');
                //     },
                //     ToGB2312: function(str) {
                //         return unescape(str.replace(/\\u/gi, '%u'));
                //     }
                // };
                for (var i = 0; i < _self.payArr.length; i++) {
                    _self.payArr[i].show = false;
                }
                let Reg0 = /^\u5408\u540c\u7b7e\u8ba2\u540e\uff0c\u9884\u4ed8\u5b9a\u91d1[1-9]\d*%$/;
                let Reg1 = /^\u9a8c\u6536\u5408\u683c\u540e\uff0c\u7acb\u5373\u4ed8\u6b3e$/;
                let Reg2 = /^\u9a8c\u6536\u5408\u683c\u540e[1-9]\d*\u5929\u5185\u4ed8\u6b3e$/;
                // 合同签订后，预付定金  % 0
                // 验收合格后，立即付款    1
                // 验收合格后 ? 天内付款   2
                // 其他                    3
                if (Reg0.test(paymentWay)) {
                    //处理第一种方式
                    this.payment = 0;
                } else if (Reg1.test(paymentWay)) {
                    //处理第二种方式
                    this.payment = 1;
                } else if (Reg2.test(paymentWay)) {
                    //处理第三种方式
                    this.payment = 2;
                } else {
                    this.payment = 3;
                    //处理第四种方式
                }
                switch (this.payment) {
                    case 0:
                        _self.payArr[0].two = paymentWay.substring(10, paymentWay.length - 1);
                        _self.obj.paymentWay = 0;
                        _self.payArr[0].show = true;
                        break;
                    case 1:
                        _self.payArr[1].show = true;
                        _self.obj.paymentWay = 1;
                        break;
                    case 2:
                        _self.payArr[2].two = paymentWay.substring(5, paymentWay.length - 4);
                        _self.obj.paymentWay = 2;
                        _self.payArr[2].show = true;
                        break;
                    case 3:
                        _self.payArr[3].two = paymentWay;
                        _self.obj.paymentWay = 3;
                        _self.payArr[3].show = true;
                        break;
                }

            },
            getNeedDetail(id) {
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

                        _self.obj.drug_name = result.breedName;
                        _self.obj.spec = result.spec;
                        _self.obj.place = result.location;
                        _self.obj.place_id = result.locationId;
                        _self.obj.number = result.number;
                        _self.obj.number_unit = result.unit;
                        if (result.address) {
                            _self.obj.addressProvince = result.address.split(',')[0];
                            _self.obj.addressCity = result.address.split(',')[1];
                            _self.obj.addressDistrict = result.address.split(',')[2];
                        }
                        _self.obj.address = result.address;
                        if (result.paymentWay) _self.getEditPayment(result.paymentWay);
                        _self.obj.quality = result.quality;
                        let date = _self.getDate(result.duedate);
                        //_self.dateArr[_self.obj.duedate].one = date;
                        if (date != 7 && date != 15 && date != 30) {
                            //_self.dateArr[3].duedate = -1;
                            if (date > 0) _self.dateArr[3].one = date;
                            if (date < 0) _self.dateArr[3].one = 0;
                        } else {
                            switch (date) {
                                case '7':
                                    _self.dateArr[0].one = date;
                                    break;
                                case '15':
                                    _self.dateArr[1].one = date;
                                    break;
                                case '30':
                                    _self.dateArr[2].one = date;
                                    break;
                            }
                        }
                        if (result.description) _self.getRemark(result.description);
                        _self.id = result.id;
                        _self.obj.breedId = result.breedId;
                        common.$emit("Needrelease", {
                            breedName: result.breedName,
                            breedId: result.breedId
                        })

                    } else {
                        common.$emit('message', suc.data.msg);
                    }

                }, function(err) {
                    common.$emit('message', err.data.msg);
                })

            },
            getDate(myDate) {
                let _self = this;
                myDate = myDate.split('.')[0];
                let toDay = new Date();
                toDay = toDay.getTime();

                let due = new Date(myDate);
                let duedate = due.getTime();

                let time = duedate - toDay;
                let day = Math.ceil(time / (1000 * 3600 * 24));
                for (var i = 0; i < _self.dateArr.length; i++) {
                    _self.dateArr[i].show = false;
                }
                switch (day) {
                    case 7:
                        _self.dateArr[0].show = true;
                        _self.obj.duedate = 0;
                        break;
                    case 15:
                        _self.dateArr[1].show = true;
                        _self.obj.duedate = 1;
                        break;
                    case 30:
                        _self.dateArr[2].show = true;
                        _self.obj.duedate = 2;
                        break;
                    default:
                        _self.dateArr[3].show = true;
                        _self.obj.duedate = 3;
                }
                return day;
            },
            getRemark(remark) {
                let _self = this;
                _self.obj.selling_point = [];
                let remarks = remark.split(',')
                for (var i = 0; i < remarks.length; i++) {
                    switch (remarks[i]) {
                        case '时间紧':
                            _self.remarksArr[0].show = true;
                            break;
                        case '价格适合，立即合作':
                            _self.remarksArr[1].show = true;
                            break;
                        case '现款无账期':
                            _self.remarksArr[2].show = true;
                            break;
                        case '常年有需求，可建立稳固渠道':
                            _self.remarksArr[3].show = true;
                            break;
                    }
                    _self.obj.selling_point.push(i);
                }
            },
            selectType(id) {
                let _self = this;
                if (id == '1') {
                    _self.obj.type_show = false;
                } else {
                    _self.obj.type_show = true;
                    _self.getNeedDetail(id);
                }
            }

        },
        components: {
            myHeader,
            needBasic,
            selectAddress
        },
        created() {
            let _self = this;
            if (_self.$route.params.id) {
                this.id = _self.$route.params.id;
                this.selectType(this.id);
            }

            _self.getInfo();
            common.$on('inforReleases', function(item) {
                _self.obj.drug_name = '';
                _self.obj.spec = '';
                _self.obj.place = '';
                _self.obj.number = '';
                _self.obj.number_unit = '斤';
                _self.obj.duedate = '';
                _self.obj.quality = '';
                _self.obj.address = '';
                _self.obj.addressProvince = '',
                    _self.obj.addressCity = '',
                    _self.obj.addressDistrict = '',
                    _self.id = '1';
                _self.obj.paymentWay = '';
                _self.obj.duedate = '';
                _self.obj.type_show = false;
                _self.obj.selling_point = [];
                for (var i = 0; i < 4; i++) {
                    _self.payArr[i].show = false;
                    if (i !== 1) _self.payArr[i].two = '';
                    _self.dateArr[i].show = false;
                    if (i == 3) _self.dateArr[i].one = '';
                    _self.remarksArr[i].show = false;
                }
                _self.getInfo();
            })
            common.$on("purchase-id", function(item) {
                _self.getNeedDetail(item);
                _self.getInfo();
                _self.obj.type_show = true;
                _self.id = item;
            })
        },
        mounted() {

            this.wrapperHeight = document.documentElement.clientHeight - this.$refs.wrapper.getBoundingClientRect().top;
        }
}
</script>
