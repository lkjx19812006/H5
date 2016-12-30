<template>
    <div class="content purchase_good_information">
        <div class="good_information">
            <p class="good_infor_header">求购货物信息</p>
            <div class="good_name">
                <p>产品：</p>
                <div>
                    <div class="select" @click="jumpSearch('/search')">
                        <input text="text" disabled="false" placeholder="请选择你需要的药材" v-model="obj.drug_name">
                    </div>
                </div>
            </div>
            <div class="good_number">
                <p>规格：</p>
                <div v-show="obj.drug_name">
                    <div v-show="breedSpec.length">
                        <input type="text" v-model="obj.spec" />
                        <p>
                            <img src="/static/images/drop-down.png" @click="showAction('spec')">
                        </p>
                    </div>
                    <input text="text" v-model="obj.spec" class="alert_input" v-show="!breedSpec.length">
                </div>
                <div v-show="!obj.drug_name" class="select">
                    <input text="text" disabled="false" placeholder="请选择你需要的药材" class="alert_input">
                </div>
            </div>
            <div class="good_number">
                <p>产地：</p>
                <div v-show="obj.drug_name">
                    <div v-show="breedLocation.length">
                        <input type="text" v-model="obj.place" />
                        <p>
                            <img src="/static/images/drop-down.png" @click="showAction('place')">
                        </p>
                    </div>
                    <input text="text" v-model="obj.place" class="alert_input" v-show="!breedLocation.length">
                </div>
                <div v-show="!obj.drug_name" class="select">
                    <input text="text" disabled="false" placeholder="请选择你需要的药材" class="alert_input">
                </div>
            </div>
            <div class="good_number">
                <p>数量：</p>
                <div>
                    <input type="number" placeholder="你需要的药材数量" v-model="obj.number" />
                    <p>
                        <select v-model="obj.number_unit" class="number_unit">
                            <option v-for="item in unit">{{item.name}}</option>
                        </select>
                    </p>
                </div>
            </div>
            <div class="good_number">
                <p>求购有效期：</p>
                <div>
                    <input type="number" placeholder="30" v-model="obj.duedate" />
                    <p>天</p>
                </div>
            </div>
        </div>

         <mt-popup v-model="sheetVisible" position="center" class="mint-popup-1" style="width:60%">
            <div v-for="item in actions">
                <div style="color: #656b79;background-color: #f6f8fa;box-shadow: 0 0 1px #b8bbbf;padding:10px 0" @click="setObj(item.key,item.name)">{{item.name}}</div>
            </div>
        </mt-popup>
    </div>
</template>
<script>
import common from '../../common/common.js'
import httpService from '../../common/httpService.js'
export default {
    data() {
            return {
                breedLocation: [],
                breedSpec: [],
                sheetVisible: false,
                actions: [],
                unit: [{
                    id: 1,
                    name: 'g'
                }, {
                    id: 2,
                    name: 'kg'
                }],
            }
        },
        props: {
            obj: {}
        },
        methods: {
            jumpSearch(router) {
                common.$emit("setParam", "router", "needRelease");
                this.$router.push(router);
            },
            getBreedInformation(breedId) {
                let _self = this;
                common.$emit('show-load');
                let url = common.addSID(common.urlCommon + common.apiUrl.most);
                let body = {
                    biz_module: 'breedService',
                    biz_method: 'queryLocalSpecList',
                    version: 1,
                    time: 0,
                    sign: '',
                    biz_param: {
                        breedId: breedId
                    }
                };
                body.time = Date.parse(new Date()) + parseInt(common.difTime);
                body.sign = common.getSign('biz_module=' + body.biz_module + '&biz_method=' + body.biz_method + '&time=' + body.time);
                httpService.commonPost(url, body, function(suc) {
                    common.$emit('close-load');
                    if (suc.data.code == '1c01') {
                        _self.obj.spec = '';
                        _self.obj.place = '';
                        _self.breedLocation = suc.data.biz_result.localList;
                        _self.breedSpec = suc.data.biz_result.specList;
                        if (_self.breedSpec.length > 0) _self.obj.spec = _self.breedSpec[0].name;
                        if (_self.breedLocation.length > 0) _self.obj.place = _self.breedLocation[0].name;
                    } else {
                        common.$emit('message', suc.data.msg);
                    }
                }, function(err) {
                    common.$emit('close-load');
                    common.$emit('message', err.data.msg);
                })
            },
            getUnit() {
                let _self = this;
                common.$emit('show-load');
                let url = common.addSID(common.urlCommon + common.apiUrl.most);
                let body = {
                    biz_module: 'enumService',
                    biz_method: 'queryEnumList',
                    version: 1,
                    time: 0,
                    sign: '',
                    biz_param: {
                        type: 'MU'
                    }
                };
                body.time = Date.parse(new Date()) + parseInt(common.difTime);
                body.sign = common.getSign('biz_module=' + body.biz_module + '&biz_method=' + body.biz_method + '&time=' + body.time);
                httpService.commonPost(url, body, function(suc) {
                    common.$emit('close-load');
                    if (suc.data.code == '1c01') {
                        _self.unit = suc.data.biz_result.list;
                        if(!_self.obj.number_unit)_self.obj.number_unit = _self.unit[0].name;
                    } else {
                        common.$emit('message', suc.data.msg);
                    }
                }, function(err) {
                    common.$emit('close-load');
                    common.$emit('message', err.data.msg);
                })
            },
            setObj(key, value) {
                this.obj[key] = value;
                this.sheetVisible = false;
            },
            showAction(param) {
                this.sheetVisible = true;
                this.actions = [];
                let _self = this;
                if (param == "spec") {
                    for (var i = 0; i < _self.breedSpec.length; i++) {
                        _self.actions.push({
                            name: _self.breedSpec[i].name,
                            key: 'spec'
                        });
                    }
                } else {
                    for (var i = 0; i < _self.breedLocation.length; i++) {
                        _self.actions.push({
                            name: _self.breedLocation[i].name,
                            key: 'place'
                        });
                    }
                }
            }
        },
        created() {
            let _self = this;
            this.getUnit();
            common.$on("Needrelease", function(item) {
                _self.getBreedInformation(item.id);
                _self.obj.drug_name = item.keyWord;
                _self.obj.breedId = item.id;
            });
        }
}
</script>
<style scoped>
input[type="text"],
input[type="submit"],
input[type="reset"],
select,
textarea {
    -webkit-appearance: none;
    border-radius: 0;
}

.purchase_good_information {}

.purchase_good_information .good_information,
.remarks,
.contact {
    padding: 1.28rem;
    margin-bottom: 0.8533rem;
    background: white;
}

.purchase_good_information .good_information {
    height: 23.9rem;
}

.purchase_good_information .contact {
    height: 12.8rem;
    margin-bottom: 10px;
}

.purchase_good_information .good_infor_header {
    background: url('/static/images/information.png') no-repeat 0 center;
    background-size: 1.11rem 1.11rem;
}

.purchase_good_information .good_infor_header,
.remarks_header,
.contact_header {
    font-size: 1.2rem;
    color: #FA6705;
    text-align: left;
    padding-left: 1.536rem;
}

.purchase_good_information .remarks .remarks_header {
    background: url('/static/images/remarks.png') no-repeat 0 center;
    background-size: 1.11rem 1.11rem;
}

.purchase_good_information .contact .contact_header {
    background: url('/static/images/contact.png') no-repeat 0 center;
    background-size: 1.11rem 1.11rem;
}

.purchase_good_information .good_name,
.good_spec,
.good_place,
.good_number,
.contact_name,
.contact_phone {
    height: 2.99rem;
    margin-top: 0.8533rem;
}

.purchase_good_information .good_number div p img {
    width: 100%;
    height: 100%;
    padding: 10px;
}

.purchase_good_information .good_place select {
    background: url('/static/images/drop-down.png') no-repeat 13.3rem center;
    background-size: 1.067rem 1.067rem;
    text-align: center;
}

.purchase_good_information .good_spec select {
    background: url('/static/images/drop-down.png') no-repeat 13.3rem center;
    background-size: 1.067rem 1.067rem;
    text-align: center;
}

.purchase_good_information .good_name p,
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

.purchase_good_information .contact_name p,
.contact_phone p {
    margin-right: 2.47rem;
}

.purchase_good_information .good_name div,
.good_spec div,
.good_place div,
.good_number div {
    float: right;
    position: relative;
}

.purchase_good_information .good_number .number_unit {
    width: 100%;
    height: 100%;
    outline: none;
    border: 0;
    float: left;
    text-align: center;
    padding-left: 10px;
}

.purchase_good_information .good_name div .select,
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

.purchase_good_information .select input {
    font-size: 1.024rem;
    height: 2.9rem;
    width: 14.847rem;
    text-align: center;
    outline: none;
    border: 1px solid #D2D2D2;
}

.purchase_good_information .alert_input {
    width: 100% !important;
    background-color: #fff;
}

.purchase_good_information .good_name div .select input {
    text-align: center;
    outline: none;
    border: 0;
    height: 100%;
    width: 100%;
    background: white;
}

.purchase_good_information .good_number div {
    height: 2.9rem;
    width: 14.847rem;
    border: 1px solid #D2D2D2;
}

.purchase_good_information .good_number div input {
    outline: none;
    font-size: 1.024rem;
    height: 2.73rem;
    width: 11.178rem;
    text-align: center;
    float: left;
    outline: none;
    border: 0;
}

.purchase_good_information .good_number div p {
    height: 2.73rem;
    width: 3.5rem;
    border-left: 1px solid #D2D2D2;
}
</style>
