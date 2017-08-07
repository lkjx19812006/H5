<style lang="less" scoped>
.add_address .bg_white {
    background-color: #F0F0F0;
    .active {
        height: 100%;
        overflow: hidden;
    }
    .page-loadmore-wrapper {
        margin-bottom: 0px;
    }
    ul {
        padding: 0 1.5rem;
        background: white;
        width: 100%;
        color: #333333;
        li {
            height: 50px;
            border-bottom: 1px solid #DADADA;
            position: relative;
            p {
                position: absolute;
                left: 0;
                font-size: 15px;
                color: #333333;
                line-height: 4.4rem;
            }
            input {
                position: absolute;
                right: 3%;
                text-align: right;
                border: none;
                outline: none;
                font-size: 15px;
                margin-top: 1rem;
                height: 2.2rem;
                color: #333;
                line-height: 2.2rem;
            }
        }
        .last {
            height: 8.5rem;
            color: #666666;
            font-size: 15px;
            padding: 1rem 0;
            border-bottom: none;
            textarea {
                width: 100%;
                height: 100%;
                border: 0;
                color: #333;
            }
        }
    }
    .confirm {
        width: 100%;
        height: 50px;
        background: #FA6705;
        color: white;
        text-align: center;
        line-height: 50px;
        font-size: 1.7rem;
        position: fixed;
        bottom: 0;
    }
}
</style>
<template>
    <div class="add_address">
        <myHeader :param="my_header"></myHeader>
        <div class="bg_white">
            <div class="page-loadmore-wrapper" v-bind:class="{active:obj.tshow}" ref="wrapper" :style="{ height: wrapperHeight + 'px' }">
                <ul>
                    <li>
                        <p>收货人</p>
                        <input type="text" placeholder="请输入您的名字" v-model="obj.name" maxlength="10">
                    </li>
                    <li>
                        <p>联系电话</p>
                        <input type="text" placeholder="请输入您的联系电话" v-model="obj.phone">
                    </li>
                    <li>
                        <selectAddress :obj="obj"></selectAddress>
                    </li>
                    <li class="last">
                        <textarea placeholder="详细地址" v-model="obj.detailAddr"></textarea>
                    </li>
                </ul>
            </div>
            <div class="confirm" v-on:click="confirm">保存</div>
        </div>
    </div>
</template>
<script>
import common from '../../common/common.js'
import httpService from '../../common/httpService.js'
import myHeader from '../../components/tools/myHeader'
import selectAddress from '../../components/popUpType/revisePlace'
import validation from '../../validation/validation.js'
import areaJson from '../../common/areaData'
export default {
    data() {
            return {
                my_header: {
                    name: '增加地址',
                    topissue: true
                },
                obj: {
                    name: '',
                    tel: '',
                    addressProvince: '',
                    addressProvinceId: '',
                    addressCity: '',
                    addressCityId: '',
                    addressDistrict: '',
                    addressDistrictId: '',
                    detailAddr: '',
                    tshow: false
                },
            }
        },
        components: {
            myHeader,
            selectAddress
        },
        methods: {
            confirm() {
                let _self = this;
                var checkArr = [];
                let checkName = validation.checkNull(_self.obj.name, '请输入姓名！');
                checkArr.push(checkName);
                let checkLookName = validation.checkLook(_self.obj.name);
                checkArr.push(checkLookName);
                let checkPhone = validation.checkPhone(_self.obj.phone);
                checkArr.push(checkPhone);
                let checkdetailAddr = validation.checkNull(_self.obj.detailAddr, '请输入详细信息！');
                checkArr.push(checkdetailAddr);
                let checkLookDes = validation.checkLook(_self.obj.detailAddr);
                checkArr.push(checkLookDes);

                for (var i = 0; i < checkArr.length; i++) {
                    if (checkArr[i]) {
                        common.$emit('message', checkArr[i]);
                        return;
                    }
                }

                common.$emit('show-load');
                let url = common.addSID(common.urlCommon + common.apiUrl.most);
                let body = {
                    biz_module: 'userAddressService',
                    biz_method: 'addUserAddress',
                    biz_param: {
                        contactName: _self.obj.name,
                        contactPhone: _self.obj.phone,
                        province: _self.obj.addressProvinceId,
                        city: _self.obj.addressCityId,
                        district: _self.obj.addressDistrictId,
                        detailAddr: _self.obj.detailAddr
                    }
                };

                body.time = Date.parse(new Date()) + parseInt(common.difTime);
                body.sign = common.getSign('biz_module=' + body.biz_module + '&biz_method=' + body.biz_method + '&time=' + body.time);
                httpService.addAddress(url, body, function(suc) {
                    common.$emit('close-load');
                    if (suc.data.code == '1c01') {

                    } else {
                        common.$emit('message', suc.data.msg);
                    }
                    common.$emit('informAddress', 'refurbish');
                    window.history.go(-1);
                }, function(err) {
                    common.$emit('close-load');
                    common.$emit('message', err.data.msg);
                })
            }
        },
        mounted() {
            this.wrapperHeight = document.documentElement.clientHeight - this.$refs.wrapper.getBoundingClientRect().top;
        },
        created() {

        }


}
</script>
