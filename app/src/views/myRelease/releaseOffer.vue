<style lang="less" scoped>
input[type="text"],
input[type="submit"],
input[type="reset"],
select,
textarea {
    -webkit-appearance: none;
    border-radius: 0;
}

input,
textarea {
    border: none;
    background-color: #fff;
}

.release_offer {
    position: relative;
    height: 100vh;
    .main {
        padding-bottom: 100px;
    }
    .killScroll {
        overflow: hidden;
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
            margin-right: 30px;
            margin-bottom: 15px;
        }
    }
    .confirm {
        position: absolute;
        bottom: 0;
        height: 50px;
        width: 100%;
        background-color: #FA6705;
        font-size: 17px;
        line-height: 50px;
        text-align: center;
        color: #fff;
    }
    .sample_offer {
        margin-bottom: 10px;
    }
}
</style>
<template>
    <div class="release_offer">
        <myHeader :param="param"></myHeader>
        <div class="page-loadmore-wrapper main" ref="wrapper" :style="{ height: wrapperHeight + 'px' }" v-bind:class="{killScroll:message.show}">
            <titles tab="1"></titles>
            <basicTop :obj="obj" v-on:showAction="showAction"></basicTop>
            <titles tab="2"></titles>
            <div class="img">
                <div class="up_load" v-show="!handPhoto">
                    <specialImgs :param="handPhoto" :type="Type0" v-on:postUrl="getUrlOne"></specialImgs>
                </div>
                <div class="img_box" v-show="handPhoto">
                    <img :src="handPhoto" class="my_img">
                    <img src="/static/icons/upload-delete.png" class="delete" @click="deletehandPhoto">
                </div>
                <div class="up_load" v-show="!detailsPhoto">
                    <specialImgs :param="detailsPhoto" :type="Type1" v-on:postUrl="getUrlTwo"></specialImgs>
                </div>
                <div class="img_box" v-show="detailsPhoto">
                    <img :src="detailsPhoto" class="my_img">
                    <img src="/static/icons/upload-delete.png" class="delete" @click="deletedetailsPhoto">
                </div>
                <div class="up_load" v-show="!cargoPhoto">
                    <specialImgs :param="cargoPhoto" :type="Type2" v-on:postUrl="getUrlThree"></specialImgs>
                </div>
                <div class="img_box" v-show="cargoPhoto">
                    <img :src="cargoPhoto" class="my_img">
                    <img src="/static/icons/upload-delete.png" class="delete" @click="deletecargoPhoto">
                </div>
                <div class="img_box" v-for="(todo,index) in imgArr">
                    <img :src="todo" class="my_img">
                    <img src="/static/icons/upload-delete.png" class="delete" @click="deletes">
                </div>
                <div class="up_load" v-show="handPhoto && detailsPhoto && cargoPhoto && imgArr.length !== 2">
                    <upLoadImgs :param="imgArr" v-on:postUrl="getUrl"></upLoadImgs>
                </div>
            </div>
            <selectQuality :obj="obj"></selectQuality>
            <div class="sample_offer">
                <releaseBasic :obj="obj"></releaseBasic>
            </div>
            <priceOrNumber :obj="obj" v-on:showAction="showAction"></priceOrNumber>
        </div>
        <div class="confirm" @click="confirm">提交报价</div>
        <popSpec :obj="obj"></popSpec>
        <messageBoxs :message="message" v-show="message.show" v-on:mySure="mySure" v-on:myCancel="myCancel"></messageBoxs>
    </div>
</template>
<script>
import common from '../../common/common.js'
import validation from '../../validation/validation.js'
import myHeader from '../../components/tools/myHeader'
import popSpec from '../../components/popUpType/popSpec'
import basicTop from '../../components/release/basicInTop'
import titles from '../../components/release/title'
import upLoadImgs from '../../components/release/otherImgs'
import specialImgs from '../../components/release/specialImgs'
import priceOrNumber from '../../components/release/priceOrNumber'
import selectQuality from '../../components/release/selectQuality'
import releaseBasic from '../../components/release/resourceReleaseBasic'
import messageBoxs from '../../components/popUpType/messageBoxs'
import httpService from '../../common/httpService.js'
export default {
    data() {
        return {
            message: {
                title: '修改报价',
                content: '确定修改报价信息后将等待审核！',
                canceltext: '再想想',
                confirmtext: '确认',
                show: false,
            },
            param: {
                name: '正在报价',
                router: 'home'
            },
            handPhoto: '',
            Type0: '0',
            detailsPhoto: '',
            Type1: '1',
            cargoPhoto: '',
            Type2: '2',
            wrapperHeight: '',
            obj: {
                myoffer: true,
                sampling: 1,
                weight: '',
                price: '',
                breedName: '天麻',
                need_number: '',
                need_unit: '',
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
                sale_price: '',
                number: '',
                number_unit: '',
                number_id: '',
                quality: '',
                priceDescription: '',
                descriptions: '',
                intentionId: ''
            },
            imgArr: [],
            imageArrs: [],
            accept_type: '',
            report_id: '',
            lastPrice: ''
        }
    },
    methods: {
        mySure() {
            this.message.show = false;
            console.log(999)
            this.release()
        },
        myCancel() {
            this.message.show = false;
        },
        getHttp(id) {
            let _self = this;
            common.$emit('show-load');
            let url = common.urlCommon + common.apiUrl.most;
            let body = {
                biz_module: 'intentionService',
                biz_method: 'queryIntentionInfo',
                biz_param: {
                    id: id
                }
            }
            if (common.KEY) {
                url = common.addSID(common.urlCommon + common.apiUrl.most);
                body.version = 1;
                body.time = Date.parse(new Date()) + parseInt(common.difTime);
                body.sign = common.getSign('biz_module=' + body.biz_module + '&biz_method=' + body.biz_method + '&time=' + body.time);
            }
            httpService.myAttention(url, body, function (suc) {
                common.$emit('close-load');
                let result = suc.data.biz_result;
                console.log(44, result)
                if (suc.data.code == '1c01') {
                    _self.getBreedInformation(result.breedName);
                    _self.obj.breedName = result.breedName;
                    _self.obj.duedate = result.duedate;
                    _self.obj.need_number = result.number;
                    _self.obj.need_unit = result.unit;
                    _self.obj.spec = result.spec;
                    _self.obj.place = result.location;
                    _self.obj.place_id = result.locationId;
                    _self.obj.number_unit = result.unit;
                    _self.obj.number_id = result.unitId;
                    //console.log(2112,_self.obj.spec)
                } else {
                    common.$emit('message', suc.data.msg);
                }
            }, function (err) {
                common.$emit('close-load');
                common.$emit('message', err.data.msg);
            })
        },
        getOffer(id) {
            let _self = this;
            common.$emit('show-load');
            let url = common.urlCommon + common.apiUrl.most;
            let body = {
                biz_module: 'intentionOfferService',
                biz_method: 'htmlMyIntentionOfferListInfo',
                biz_param: {
                    intentionId: id,
                    pn: 1,
                    pSize: 20
                }
            }
            if (common.KEY) {
                url = common.addSID(common.urlCommon + common.apiUrl.most);
                body.version = 1;
                body.time = Date.parse(new Date()) + parseInt(common.difTime);
                body.sign = common.getSign('biz_module=' + body.biz_module + '&biz_method=' + body.biz_method + '&time=' + body.time);
            }
            httpService.myAttention(url, body, function (suc) {
                common.$emit('close-load');
                //console.log(3, result)
                if (suc.data.code == '1c01') {
                    let result = [];
                    if (suc.data.biz_result.list.length > 0) {
                        result = suc.data.biz_result.list[0];
                        _self.report_id = result.id;
                    }

                    if (result !== []) {
                        //处理带过来的图片匹配  
                        console.log(1111, result);
                        if (result.image[0]) _self.handPhoto = result.image[0];
                        if (result.image[1]) _self.detailsPhoto = result.image[1];
                        if (result.image[2]) _self.cargoPhoto = result.image[2];
                        if (result.image[3]) {
                            for (var i = 3; i < result.image.length; i++) {
                                _self.imgArr.push(result.image[i]);
                            }
                        }
                        //处理带过来的卖点匹配
                        _self.obj.descriptions = result.quality;
                        let qualityArr = result.quality.split(',');
                        for (var i = 0; i < qualityArr.length; i++) {
                            for (var j = 0; j < _self.obj.sell.length; j++) {
                                if (_self.obj.sell[j].name == qualityArr[i]) {
                                    _self.obj.sell[j].show = true;
                                }
                            }
                        }
                        //处理是否有样品
                        _self.obj.sampling = result.sampling;
                        if (result.sampling == 1) {
                            _self.obj.weight = result.sampleNumber;
                            _self.obj.price = result.sampleAmount;
                        }
                        //处理价格和供应量
                        _self.obj.number = result.number;
                        //_self.obj.sale_price = result.price;
                        //价格说明
                        _self.obj.priceDescription = result.priceDescription;
                        //产地
                        _self.obj.place = result.location;
                        _self.obj.place_id = result.locationId;
                        //规格
                        _self.obj.spec = result.spec;
                        //上一次报价的价格
                        _self.lastPrice = result.price;
                    }

                } else {
                    common.$emit('message', suc.data.msg);
                }
            }, function (err) {
                common.$emit('close-load');
                common.$emit('message', err.data.msg);
            })
        },
        confirm() {
            let _self = this;
            _self.imageArrs = [];
            if (_self.handPhoto) {
                _self.imageArrs.unshift(_self.handPhoto)
            }
            if (_self.detailsPhoto) {
                _self.imageArrs.unshift(_self.detailsPhoto)
            }
            if (_self.cargoPhoto) {
                _self.imageArrs.unshift(_self.cargoPhoto)
            }
            for (var i = 0; i < _self.imgArr.length; i++) {
                _self.imageArrs.unshift(_self.imgArr[i])
            }
            console.log(33, _self.imageArrs);
            _self.obj.quality = '';

            console.log(1, _self.obj.descriptions)
            var checkArr = [];
            let checkBreedSpec = validation.checkNull(_self.obj.spec, '请输入规格');
            checkArr.push(checkBreedSpec);
            let checkBreedPlace = validation.checkNull(_self.obj.place, '请输入产地');
            checkArr.push(checkBreedPlace);

            let count = '请上传图片';
            for (let i = 0; i < _self.imageArrs.length; i++) {
                if (_self.imageArrs[i]) {
                    count = false;
                }
            }
            if (count) {
                checkArr.push(count);
            }
            let checkQuality = validation.checkNull(_self.obj.descriptions, '请选择产品卖点');
            checkArr.push(checkQuality);
            // let checkDrugInfor = validation.checkNull(_self.obj.descriptions, '请填写产品信息');
            // checkArr.push(checkDrugInfor);
            if (_self.obj.sampling == 1) {
                let checkSampleNum = validation.checkMaxNum(_self.obj.weight, '样品数量');
                checkArr.push(checkSampleNum);
                let checkSamplePrice = validation.checkPrice(_self.obj.price, '样品价格');
                checkArr.push(checkSamplePrice);
            }
            let checkNum = validation.checkMaxNum(_self.obj.number, '可供量');
            checkArr.push(checkNum);
            let checkPri = validation.checkPrice(_self.obj.sale_price, '裸价');
            checkArr.push(checkPri);
            let checkPriDescription = validation.checkNull(_self.obj.priceDescription, '请填写价格说明');
            checkArr.push(checkPriDescription);
            for (var i = 0; i < checkArr.length; i++) {
                if (checkArr[i]) {
                    common.$emit('message', checkArr[i]);
                    return;
                }
            }
            //console.log(11,_self.obj.sale_price,_self.lastPrice)
            if (_self.accept_type !== undefined) {
                if (Number(_self.obj.sale_price) > Number(_self.lastPrice)) {
                    _self.message.content = '您报的价格比上次还高，可能会影响成交概率，是否确认'
                    _self.message.show = true;
                } else if (Number(_self.obj.sale_price) == Number(_self.lastPrice)) {
                    _self.message.content = '您报的价格与上次相同，可能会影响成交概率，是否确认';
                    _self.message.show = true;
                } else {
                    _self.message.content = '确定修改报价信息后将等待审核！'
                    _self.message.title = '发布报价';
                    _self.message.show = true;
                }
            } else {
                common.$emit("confirm", {
                    message: '确定发布报价？',
                    title: '提示',
                    ensure: this.release
                });
            }


        },
        showAction(param) {
            console.log(11, this.accept_type)
            if (this.accept_type !== undefined && param == "unit") {
                common.$emit('message', '再次报价单位不可更改')
                this.obj.sheetVisible = false;
            } else {
                this.obj.sheetVisible = true;
            }
            this.obj.actions = [];
            let _self = this;
            if (param == "unit") {
                for (var i = 0; i < _self.obj.unit.length; i++) {
                    _self.obj.actions.push({
                        name: _self.obj.unit[i].name,
                        key: 'number_unit',
                        id: _self.obj.unit[i].id,
                        id_key: 'number_id'
                    });
                }
            } else if (param == "spec") {
                for (var i = 0; i < _self.obj.breedSpec.length; i++) {
                    _self.obj.actions.push({
                        name: _self.obj.breedSpec[i].name,
                        id: _self.obj.breedSpec[i].id,
                        key: 'spec'
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
            // } else {
            //     common.$emit('message', '再次报价单位不可更改')
            // }

            //console.log(this.obj.actions)
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
            httpService.commonPost(url, body, function (suc) {
                common.$emit('close-load');
                if (suc.data.code == '1c01') {
                    // _self.obj.spec = '';
                    // _self.obj.place = '';
                    // _self.obj.place_id = '';
                    _self.obj.breedLocation = suc.data.biz_result.localList;
                    _self.obj.breedSpec = suc.data.biz_result.specList;
                    // if (_self.obj.breedSpec.length > 0) _self.obj.spec = _self.obj.breedSpec[0].name;
                    // if (_self.obj.breedLocation.length > 0) _self.obj.place = _self.obj.breedLocation[0].name;
                    // if (_self.obj.breedLocation.length > 0) _self.obj.place_id = _self.obj.breedLocation[0].locationId;
                } else {
                    common.$emit('message', suc.data.msg);
                }
            }, function (err) {
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
            httpService.commonPost(url, body, function (suc) {
                common.$emit('close-load');
                if (suc.data.code == '1c01') {
                    _self.obj.unit = suc.data.biz_result.list;
                    if (!_self.obj.number_unit) {
                        // _self.obj.number_unit = _self.obj.unit[2].name;
                        // _self.obj.number_id = _self.obj.unit[2].id;
                    } else {
                        for (var i = 0; i < _self.obj.unit.length; i++) {
                            if (_self.obj.number_unit == _self.obj.unit[i].name) {
                                _self.obj.number_id = _self.obj.unit[i].id;
                            }
                        }
                    }

                } else {
                    common.$emit('message', suc.data.msg);
                }
            }, function (err) {
                common.$emit('close-load');
                common.$emit('message', err.data.msg);
            })
        },
        getUrl(param) {
            console.log(1, param)
            let _self = this;
            if (this.imgArr.length <= 2) {
                if (param.url) _self.imgArr.push(param.url);
                if (_self.imgArr.length == 2) {
                    common.$emit('message', '最多只能上传5张图片！')
                }
            }


            console.log(this.imgArr.length)
        },
        getUrlOne(param) {
            if (param.url) {
                this.handPhoto = param.url;
            }
        },
        getUrlTwo(param) {
            if (param.url) {
                this.detailsPhoto = param.url;
            }
        },
        getUrlThree(param) {
            if (param.url) {
                this.cargoPhoto = param.url;
            }
        },
        deletehandPhoto() {
            this.handPhoto = '';
        },
        deletedetailsPhoto() {
            this.detailsPhoto = '';
        },
        deletecargoPhoto() {
            this.cargoPhoto = '';
        },
        deletes(index) {
            let _self = this;

            // function deletImgs() {
            _self.imgArr.splice(index, 1);
            // }
            // common.$emit("confirm", {
            //     message: '确定删除？',
            //     title: '提示',
            //     ensure: deletImgs
            // });
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
            common.$emit('show-load');
            let url = common.addSID(common.urlCommon + common.apiUrl.most);
            let body = {
                biz_module: 'intentionOfferService',
                biz_method: 'appIntentionOffer',
                biz_param: {
                    customerId: common.customerId,
                    breedName: _self.obj.breedName,
                    spec: _self.obj.spec,
                    location: _self.obj.place_id,
                    breedImage: _self.imageArrs,
                    quality: _self.obj.descriptions,
                    number: _self.obj.number,
                    unit: _self.obj.number_id,
                    price: _self.obj.sale_price,
                    priceDescription: _self.obj.priceDescription,
                    intentionId: _self.obj.intentionId,
                    sampleNumber: _self.obj.weight,
                    sampling: _self.obj.sampling,
                    sampleAmount: _self.obj.price
                }
            };
            if (_self.accept_type == 0) {
                //console.log(999999)
                body.biz_method = 'updateIntentionOffer'
                body.biz_param.id = _self.report_id;
            }
            body.time = Date.parse(new Date()) + parseInt(common.difTime);
            body.sign = common.getSign('biz_module=' + body.biz_module + '&biz_method=' + body.biz_method + '&time=' + body.time);
            httpService.needRelease(url, body, function (suc) {
                common.$emit('close-load');
                if (suc.data.code == '1c01') {
                    // common.$emit('inforMyOffer', 1);
                    // _self.$router.push('/myOffer')
                    console.log(1, suc.data.biz_result.offerId)
                    common.$emit('inforReleaseOfferSuccess', {
                        id:suc.data.biz_result.offerId,
                        back:_self.accept_type
                    });
                    _self.$router.replace('/releaseOfferSuccess?type=' + suc.data.biz_result.offerId+';'+_self.accept_type);
                    common.$emit('message', suc.data.msg);
                } else {
                    common.$emit('message', suc.data.msg);
                }
            }, function (err) {
                common.$emit('close-load');
                common.$emit('message', err.data.msg);
            })
        }

    },
    components: {
        myHeader,
        popSpec,
        basicTop,
        titles,
        upLoadImgs,
        priceOrNumber,
        selectQuality,
        specialImgs,
        releaseBasic,
        messageBoxs
    },
    created() {
        let _self = this;
        let id = _self.$route.params.id;
        //let type = _self.$route.params.
        _self.accept_type = _self.$route.query.type;
        _self.getHttp(id);
        //console.log(34,_self.$route.query.type)
        if (_self.accept_type !== undefined) _self.getOffer(id);
        _self.obj.intentionId = id;
        _self.getUnit();
        common.$on('needToReleaseOffer', function (item) {
            _self.obj.breedName = '';
            _self.obj.spec = '';
            _self.obj.location = '';
            _self.imgArr = [];
            _self.handPhoto = '';
            _self.detailsPhoto = '';
            _self.cargoPhoto = '';
            _self.imageArrs = [];
            _self.obj.quality = '';
            _self.obj.sell_point = [];
            _self.obj.number = '';
            _self.obj.number_id = '';
            _self.obj.price = '';
            _self.obj.sale_price = '';
            _self.obj.weight = '';
            _self.obj.descriptions = '';
            _self.obj.priceDescription = '';
            _self.lastPrice = '';
            for (var i = 0; i < _self.obj.sell.length; i++) {
                _self.obj.sell[i].show = false;
            }
            console.log(22, item)
            _self.obj.intentionId = item.id;
            _self.accept_type = item.accept_type;
            _self.getHttp(item.id);
            if (_self.accept_type !== undefined) {
                _self.getOffer(item.id);
            }
            _self.getUnit();
        });
    },
    mounted() {
        this.wrapperHeight = document.documentElement.clientHeight - this.$refs.wrapper.getBoundingClientRect().top;
    }
}
</script>
