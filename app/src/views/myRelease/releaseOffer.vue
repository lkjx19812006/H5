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

.release_offer {
    position: relative;
    .main {
        padding-bottom: 100px;
    }
    .box {
        padding: 20px 15px;
        background-color: #fff;
        .images {
            width: 80px;
        }
    }
    .img {
        width: 100%;
        background-color: #fff;
        padding: 20px 15px;
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        .img_box {
            position: relative;
            margin-right: 30px;
            .my_img {
                width: 80px;
                height: 80px;
            }
            .delete {
                position: absolute;
                width: 20px;
                height: 20px;
                top: -10px;
                left: -10px;
            }
            margin-bottom:15px;
        }
        .up_load {
            width: 80px;
            height: 80px;
        }
    }
    .confirm {
        position: fixed;
        bottom: 0;
        height: 50px;
        width: 100%;
        background-color: #FA6705;
        font-size: 17px;
        line-height: 50px;
        text-align: center;
        color: #fff;
    }
}
</style>
<template>
    <div class="release_offer">
        <myHeader :param="param"></myHeader>
        <div class="page-loadmore-wrapper main" ref="wrapper" :style="{ height: wrapperHeight + 'px' }">
            <titles tab="1"></titles>
            <basicTop :obj="obj" v-on:showAction="showAction"></basicTop>
            <titles tab="2"></titles>
            <div class="img">
                <div class="img_box" v-for="(todo,index) in imgArr">
                    <img :src="todo" class="my_img">
                    <img src="/static/icons/upload-delete.png" class="delete" @click="deletes">
                </div>
                <div class="up_load">
                    <upLoadImgs :param="imgArr" v-on:postUrl="getUrl"></upLoadImgs>
                </div>
            </div>
            <selectQuality :obj="obj"></selectQuality>
            <priceOrNumber :obj="obj" v-on:showAction="showAction"></priceOrNumber>
        </div>
        <div class="confirm" @click="confirm">提交报价</div>
        <popSpec :obj="obj"></popSpec>
    </div>
</template>
<script>
import common from '../../common/common.js'
import validation from '../../validation/validation.js'
import myHeader from '../../components/tools/myHeader'
import popSpec from '../../components/popUpType/popSpec'
import basicTop from '../../components/release/basicInTop'
import titles from '../../components/release/title'
import upLoadImgs from '../../components/release/upLoadImgs'
import priceOrNumber from '../../components/release/priceOrNumber'
import selectQuality from '../../components/release/selectQuality'
import httpService from '../../common/httpService.js'
export default {
    data() {
            return {
                param: {
                    name: '正在报价',
                    router: 'home'
                },
                wrapperHeight: '',
                obj: {
                    breedName: '天麻',
                    spec: '',
                    place: '',
                    place_id: '',
                    sheetVisible: false,
                    breedLocation: [],
                    breedSpec: [],
                    unit: [{
                        id: 1,
                        name: 'g'
                    }, {
                        id: 2,
                        name: 'kg'
                    }],
                    sell: [{
                        name: '产品包交',
                        show: false
                    }, {
                        name: '质量优势',
                        show: false
                    }, {
                        name: '一手货源',
                        show: false
                    }, {
                        name: '含量较高',
                        show: false
                    }, {
                        name: '可以加工',
                        show: false
                    }],
                    actions: [],
                    sell_point: [],
                    number_name: '可供量',
                    price_name: '裸价',
                    price: '',
                    number: '',
                    number_unit: '',
                    number_id: '',
                    quality: '',
                    priceDescription: '',
                    descriptions: ''
                },
                imgArr: [],
                sell: [{
                    name: '产品包交',
                    show: false
                }, {
                    name: '质量优势',
                    show: false
                }, {
                    name: '一手货源',
                    show: false
                }, {
                    name: '含量较高',
                    show: false
                }, {
                    name: '可以加工',
                    show: false
                }]
            }
        },
        methods: {
            getInfo() {

            },
            confirm() {
                let _self = this;
                // common.$emit("confirm", {
                //     message: '确定发布求购？',
                //     title: '提示',
                //     ensure: this.release
                // });
                _self.obj.quality = '';
                for (var i = 0; i < _self.obj.sell_point.length; i++) {
                    if (!_self.obj.quality) {
                        _self.obj.quality = _self.obj.sell_point[0];
                    } else {
                        _self.obj.quality = _self.obj.quality + ',' + _self.obj.sell_point[i];
                    }
                }
                var checkArr = [];
                let checkBreedSpec = validation.checkNull(_self.obj.spec, '请输入规格');
                checkArr.push(checkBreedSpec);
                let checkBreedPlace = validation.checkNull(_self.obj.place, '请输入产地');
                checkArr.push(checkBreedPlace);

                let count = '请上传图片';
                for (let i = 0; i < _self.imgArr.length; i++) {
                    if (_self.imgArr[i]) {
                        count = false;
                    }
                }
                if (count) {
                    checkArr.push(count);
                }
                let checkQuality = validation.checkNull(_self.obj.quality, '请选择产品买点');
                checkArr.push(checkQuality);
                let checkDrugInfor = validation.checkNull(_self.obj.descriptions, '请填写产品信息');
                checkArr.push(checkDrugInfor);
                let checkNum = validation.checkMaxNum(_self.obj.number, '可供量');
                checkArr.push(checkNum);
                let checkPri = validation.checkPrice(_self.obj.price, '裸价');
                checkArr.push(checkPri);
                let checkPriDescription = validation.checkPrice(_self.obj.priceDescription, '价格补充说明');
                checkArr.push(checkPriDescription);
                for (var i = 0; i < checkArr.length; i++) {
                    if (checkArr[i]) {
                        common.$emit('message', checkArr[i]);
                        return;
                    }
                }
                
                
            },
            showAction(param) {
                this.obj.sheetVisible = true;
                this.obj.actions = [];
                let _self = this;
                if (param == "spec") {
                    for (var i = 0; i < _self.obj.breedSpec.length; i++) {
                        _self.obj.actions.push({
                            name: _self.obj.breedSpec[i].name,
                            id: _self.obj.breedSpec[i].id,
                            key: 'spec'
                        });
                    }
                } else if (param == "unit") {
                    for (var i = 0; i < _self.obj.unit.length; i++) {
                        _self.obj.actions.push({
                            name: _self.obj.unit[i].name,
                            key: 'number_unit',
                            id: _self.obj.unit[i].id,
                            id_key: 'number_id'
                        });
                    }
                } else {
                    for (var i = 0; i < _self.obj.breedLocation.length; i++) {
                        _self.obj.actions.push({
                            name: _self.obj.breedLocation[i].name,
                            id: _self.obj.breedLocation[i].locationId,
                            key: 'place',
                            id_key: 'place_id'
                        });
                    }
                }
                console.log(this.obj.actions)
            },
            getBreedInformation(name) {
                let _self = this;
                common.$emit('show-load');
                let url = common.addSID(common.urlCommon + common.apiUrl.most);
                let body = {
                    biz_module: 'breedService',
                    biz_method: 'queryLocalSpecList',
                    biz_param: {
                        name: name
                    }
                };
                body.time = Date.parse(new Date()) + parseInt(common.difTime);
                body.sign = common.getSign('biz_module=' + body.biz_module + '&biz_method=' + body.biz_method + '&time=' + body.time);
                httpService.commonPost(url, body, function(suc) {
                    common.$emit('close-load');
                    if (suc.data.code == '1c01') {
                        _self.obj.spec = '';
                        _self.obj.place = '';
                        _self.obj.place_id = '';
                        _self.obj.breedLocation = suc.data.biz_result.localList;
                        _self.obj.breedSpec = suc.data.biz_result.specList;
                        if (_self.obj.breedSpec.length > 0) _self.obj.spec = _self.obj.breedSpec[0].name;
                        if (_self.obj.breedLocation.length > 0) _self.obj.place = _self.obj.breedLocation[0].name;
                        if (_self.obj.breedLocation.length > 0) _self.obj.place_id = _self.obj.breedLocation[0].locationId;
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
                    biz_param: {
                        type: 'MU'
                    }
                };
                body.time = Date.parse(new Date()) + parseInt(common.difTime);
                body.sign = common.getSign('biz_module=' + body.biz_module + '&biz_method=' + body.biz_method + '&time=' + body.time);
                httpService.commonPost(url, body, function(suc) {
                    common.$emit('close-load');
                    if (suc.data.code == '1c01') {
                        _self.obj.unit = suc.data.biz_result.list;
                        if (!_self.obj.number_unit) {
                            _self.obj.number_unit = _self.obj.unit[0].name;
                            _self.obj.number_id = _self.obj.unit[0].id;
                        } else {
                            for (var i = 0; i < _self.unit.length; i++) {
                                if (_self.obj.number_unit == _self.obj.unit[i].name) {
                                    _self.obj.number_id = _self.obj.unit[i].id;
                                }
                            }
                        }

                    } else {
                        common.$emit('message', suc.data.msg);
                    }
                }, function(err) {
                    common.$emit('close-load');
                    common.$emit('message', err.data.msg);
                })
            },
            getUrl(param) {
                console.log(1, param)
                this.imgArr.push(param.url);
            },
            deletes(index) {
                let _self = this;

                function deletImgs() {
                    _self.imgArr.splice(index, 1);
                }
                common.$emit("confirm", {
                    message: '确定删除？',
                    title: '提示',
                    ensure: deletImgs
                });

            },
            select(todo, index) {
                let _self = this;
                todo.show = !todo.show;
                _self.sell_point = [];
                for (var i = 0; i < _self.sell.length; i++) {
                    if (_self.sell[i].show) {
                        _self.sell_point.push(_self.sell[i].name)
                    }
                }
            },
            release() {
                let _self = this;
            }

        },
        components: {
            myHeader,
            popSpec,
            basicTop,
            titles,
            upLoadImgs,
            priceOrNumber,
            selectQuality
        },
        created() {
            let _self = this;
            _self.getBreedInformation(this.obj.breedName);
            _self.getUnit();
        },
        mounted() {
            this.wrapperHeight = document.documentElement.clientHeight - this.$refs.wrapper.getBoundingClientRect().top;
        }
}
</script>
