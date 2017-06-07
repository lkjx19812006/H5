<style lang="less" scoped>
.release_need {
    background-color: #fff;
    .address {
        display: flex;
        flex-direction: row;
        line-height: 30px;
        padding: 10px 0 10px 15px;
        height: 50px;
        .left {
            font-size: 15px;
            color: #343434;
            width: 70px;
            text-align: left;
        }
        .content {
            flex: 1;
            text-align: left;
            font-size: 15px;
            span {
                color: #999;
            }
        }
        .img {
            width: 30px;
            padding-top: 6px;
            img {
                height: 18px;
            }
        }
    }
    .address_box {
        position: relative;
        padding-top: 4rem;
        background: white;
    }
    .address_box .left-button {
        position: absolute;
        left: 10%;
        top: 1rem;
        width: 60px;
        height: 30px;
        font-size: 16px;
    }
    .address_box .right-button {
        position: absolute;
        right: 10%;
        top: 1rem;
        width: 60px;
        height: 30px;
        font-size: 16px;
    }
}
</style>
<template>
    <div class="release_need">
        <div class="address" @click="selectPlace">
            <div class="left">交货地</div>
            <div class="content">
                <span v-show="!obj.addressProvince">请选择</span> {{ obj.addressProvince }}<span v-show="obj.addressProvince">,</span>{{ obj.addressCity }}<span v-show="obj.addressProvince">,</span>{{obj.addressDistrict}}
            </div>
            <div class="img">
                <img src="/static/icons/rele-right.png">
            </div>
        </div>
        <mt-popup v-model="obj.tshow" position="bottom" class="popup_unit" :closeOnClickModal="false" style="width:100%">
            <div class="bottom">
                <div class="address_box">
                    <mt-button type="primary" class="left-button" @click="cancel">取消</mt-button>
                    <mt-button type="primary" class="right-button" @click="confirmIt">确定</mt-button>
                    <mt-picker :slots="addressSlots" @change="onAddressChange" :visible-item-count="5" class="select-box"></mt-picker>
                </div>
            </div>
        </mt-popup>
    </div>
</template>
<script>
import common from '../../common/common.js'
import httpService from '../../common/httpService.js'
import areaJson from '../../common/areaData'

const addressArr = ['北京市', '天津市', '河北省', '山西省', '内蒙古自治区', '辽宁省', '吉林省', '黑龙江省', '上海市', '江苏省', '浙江省', '安徽省', '福建省', '江西省', '山东省', '河南省', '湖北省', '湖南省', '广东省', '广西壮族自治区', '海南省', '重庆市', '四川省', '贵州省', '云南省', '西藏自治区', '陕西省', '甘肃省', '青海省', '宁夏回族自治区', '新疆维吾尔族自治区'];
export default {
    data() {
            return {
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
                }]
            }
        },
        props: {
            obj: {}
        },
        methods: {
            cancel() {
                this.obj.tshow = false;
            },
            confirmIt() {
                this.obj.addressProvince = this.areaParam.addressProvince;
                this.obj.addressCity = this.areaParam.addressCity;
                this.obj.addressDistrict = this.areaParam.addressDistrict;
                this.obj.tshow = false;
            },
            selectPlace() {
                this.obj.tshow = true;
            },
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
                }
                if (this.obj.addressCity != values[1]) {
                    for (var i = 0; i < areaJson.city.length; i++) {
                        if (values[1] == areaJson.city[i].value) {
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

            }

        },
        created() {


        },
        mounted() {

        }
}
</script>
