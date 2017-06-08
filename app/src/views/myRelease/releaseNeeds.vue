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
    padding-bottom: 65px;
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
                            <textarea placeholder="要等我的下家确认货物没有问题，立即现款" v-model="payArr[3].two"></textarea>
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
                    tshow: false
                }
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
                // for(var key in _self.obj.selling_point){
                //     _self.obj.selling_point[key] = index;
                //     _self.obj.selling_point.splice(key,1);
                // }
                for (var i = 0; i < _self.obj.selling_point.length; i++) {
                    _self.obj.selling_point[i] = index;
                    _self.obj.selling_point.splice(i, 1);
                }
                console.log(_self.obj.selling_point);
            },
            remarksDate(index) {
                this.remarksArr[index].show = true;
                //if (this.content) this.obj.selling_point = this.content + ',' + this.remarksArr[index].one;
                //if (!this.content) this.obj.selling_point = this.remarksArr[index].one;
                this.obj.selling_point.push(index);
                console.log(this.obj.selling_point)
            },
            release() {
                let _self = this;
                let paymentWay = '';
                switch (this.obj.paymentWay) {
                    case 0:
                        paymentWay = '合同签订后，预付定金' + _self.payArr[0].two + '%';
                        break;
                    case 1:
                        paymentWay = '验收合格后，立即付款';
                        break;
                    case 2:
                        paymentWay = '验收合格后' + _self.payArr[2].two + '天内付款';
                        break;
                    case 3:
                        paymentWay = _self.payArr[3].two;
                        break;
                    default:
                        paymentWay = '';
                }

                let duedate = '';
                switch (this.obj.duedate) {
                    case 0:
                        duedate = '7';
                        break;
                    case 1:
                        duedate = '15';
                        break;
                    case 2:
                        duedate = '30';
                        break;
                    case 3:
                        duedate = _self.dateArr[3].one;
                        break;
                    default:
                        duedate = '';
                }

                let remarks = '';
                for (var i = 0; i < _self.obj.selling_point.length; i++) {
                    console.log(_self.obj.selling_point[i])
                    if(i == 0){
                        remarks = _self.remarksArr[_self.obj.selling_point[i]].one;
                    }else{
                        remarks = remarks + ',' + _self.remarksArr[_self.obj.selling_point[i]].one;
                    }
                }

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
                    let checkPay = validation.checkNull(paymentWay, '请选择付款方式');
                    checkArr.push(checkPay);
                    let checkDuedate = validation.checkNull(duedate, '请选择有效期');
                    checkArr.push(checkDuedate);
                    let checkRemarks = validation.checkNull(remarks, '请选择备注信息');
                    checkArr.push(checkRemarks);
                    let checkName = validation.checkNull(_self.obj.name, '请输入姓名');
                    checkArr.push(checkName);
                    let checkLookName = validation.checkLook(_self.obj.name);
                    checkArr.push(checkLookName);
                    let checkPhone = validation.checkPhone(_self.obj.phone, '请输入电话');
                    checkArr.push(checkPhone);
                    for (var i = 0; i < checkArr.length; i++) {
                        if (checkArr[i]) {
                            common.$emit('message', checkArr[i]);
                            return;
                        }
                    }
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
                            duedate:duedate,
                            description:remarks,
                            breedId: _self.obj.breedId,
                            unit:_self.obj.number_id,
                            quality: _self.obj.quality,
                            address:_self.obj.address,
                            paymentWay:_self.obj.paymentWay
                        }
                    };
                    body.time = Date.parse(new Date()) + parseInt(common.difTime);
                    body.sign = common.getSign('biz_module=' + body.biz_module + '&biz_method=' + body.biz_method + '&time=' + body.time);
                    httpService.needRelease(url, body, function(suc) {
                        common.$emit('close-load');
                        if (suc.data.code == '1c01') {
                            common.$emit('message', suc.data.msg);
                            common.$emit('informMyPurchase', 'refurbish');
                            let id = suc.data.biz_result.intentionId;
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
            selectType(id) {
                let _self = this;
                if (id == '1') {

                } else {
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
            this.selectType(_self.$route.params.id);
            _self.getInfo();
            common.$on('inforReleases', function(item) {
                _self.obj.drug_name = '';
                _self.obj.spec = '';
                _self.obj.place = '';
                _self.obj.number = '';
                _self.obj.number_unit = '斤';
                _self.obj.duedate = '';
                _self.obj.selling_point = '';
                _self.getInfo();
            })
            common.$on("purchase-id", function(item) {
                _self.getNeedDetail(item);
            })
        },
        mounted() {
            this.wrapperHeight = document.documentElement.clientHeight - this.$refs.wrapper.getBoundingClientRect().top;
        }
}
</script>
