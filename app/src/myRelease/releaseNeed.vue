<style lang="less" scoped>
input[type="text"],
input[type="submit"],
input[type="reset"],
select,
textarea {
    -webkit-appearance: none;
    border-radius: 0;
}

.killScroll {
    overflow: hidden;
    height: 100%;
}

input {
    border: none;
}

.release_need {
    background-color: #F5F5F5;
    .sell_point {
        margin: 15px 0 0 0;
        padding: 0 15px;
        background-color: #fff;
        textarea {
            width: 100%;
            height: 160px;
            padding: 20px 0;
            border: none;
            font-size: 15px;
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
    .title {
        font-size: 15px;
        padding: 12px 0 12px 15px;
        text-align: left;
    }
    .name {
        padding-bottom: 65px;
    }
}
</style>
<template>
    <div class="release_need" v-bind:class="{killScroll:obj.sheetVisible}">
        <myHeader :param="param"></myHeader>
        <div class="page-loadmore-wrapper" ref="wrapper" :style="{ height: wrapperHeight + 'px' }" v-bind:class="{killScroll:obj.sheetVisible}">
            <div class="basic_infor">
                <needBasic :obj="obj"></needBasic>
            </div>
            <div class="sell_point">
                <textarea placeholder="请根据实际情况描述一下您的产品卖点" v-model="obj.selling_point"></textarea>
            </div>
            <div class="title">联系方式可根据实际情况修改</div>
            <div class="name">
                <userInfor :obj="obj"></userInfor>
            </div>
        </div>
        <div class="confirm" @click="confirm">确认发布</div>
    </div>
</template>
<script>
import common from '../common/common.js'
import validation from '../validation/validation.js'
import myHeader from '../components/tools/myHeader'
import imageUpload from '../components/tools/upDownImg'
import needBasic from '../components/release/needReleaseBasic'
import userInfor from '../components/release/userInfor'
import httpService from '../common/httpService.js'

export default {
    data() {
            return {
                param: {
                    name: '我要采购',
                    router: 'home'
                },
                obj: {
                    number_id: '',
                    update: false,
                    drug_name: '',
                    spec: '',
                    place: '',
                    place_id: '',
                    number: '',
                    number_unit: '',
                    selling_point: '',
                    name: '',
                    phone: '',
                    duedate: '',
                    breedId: '',
                    sheetVisible: false
                },
                show: true
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
            release() {
                let _self = this;
                console.log(_self.obj.number_id)
                var checkArr = [];
                let checkBreedId = validation.checkNull(_self.obj.breedId, '请先选择品种！');
                checkArr.push(checkBreedId);
                let checkBreedSpec = validation.checkNull(_self.obj.spec, '请输入规格！');
                checkArr.push(checkBreedSpec);
                let checkBreedPlace = validation.checkNull(_self.obj.place, '请输入产地！');
                checkArr.push(checkBreedPlace);
                let checkNumber = validation.checkMaxNum(_self.obj.number, '数量');
                checkArr.push(checkNumber);
                let checkDuedate = validation.checkMaxNum(_self.obj.duedate, '有效期');
                checkArr.push(checkDuedate);
                let checkLookDes = validation.checkLook(_self.obj.selling_point);
                checkArr.push(checkLookDes);
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
                    biz_method: 'editBegBuyInfo',
                    biz_param: {
                        customerId: common.customerId,
                        breedName: _self.obj.drug_name,
                        spec: _self.obj.spec,
                        location: _self.obj.place_id,
                        number: _self.obj.number,
                        description: _self.obj.selling_point,
                        customerName: _self.obj.name,
                        customerPhone: _self.obj.phone,
                        duedate: _self.obj.duedate,
                        breedId: _self.obj.breedId,
                        unit: _self.obj.number_id,
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
                        common.$emit('informNeedSuccess',id);
                        _self.$store.dispatch('getCustomer',{
                            name:_self.obj.name,
                            phone:_self.obj.phone
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
                        let due = result.duedate.split('.')[0];
                        if (due) var arr = due.split(/[- : \/]/);
                        var duedateDate = new Date(arr[0], arr[1] - 1, arr[2], arr[3], arr[4], arr[5]); /*new Date(result.duedate.split(' ')[0]);*/
                        let pub = result.pubdate.split('.')[0];
                        if (pub) var arrs = pub.split(/[- : \/]/);
                        var pubdateDate = new Date(arrs[0], arrs[1] - 1, arrs[2], arrs[3], arrs[4], arrs[5]);
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
                        _self.obj.id = result.id;
                        _self.obj.breedId = result.breedId;
                    } else {
                        common.$emit('message', suc.data.msg);
                    }
                }, function(err) {
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
            imageUpload,
            needBasic,
            userInfor,
            myHeader
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
                _self.getNeedDetail(item); //来自我的求购
            })
        },
        mounted() {
            this.wrapperHeight = document.documentElement.clientHeight - this.$refs.wrapper.getBoundingClientRect().top;
        }
}
</script>
