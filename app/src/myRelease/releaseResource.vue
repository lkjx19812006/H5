<style lang="less" scoped>
.release_resource {
    background-color: #F5F5F5;
    .img {
        width: 100%;
        background-color: #fff;
        margin-top: 15px;
        margin-bottom: 15px;
        padding: 15px;
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
    .sell_point {
        height: 165px;
        width: 100%;
        padding: 15px;
        background-color: #fff;
        margin: 15px 0 0 0;
        textarea {
            width: 100%;
            height: 100%;
            border: none;
            font-size: 15px;
        }
    }
    .title {
        font-size: 15px;
        padding: 12px 0 12px 15px;
        text-align: left;
    }
    .name {
        padding-bottom: 65px;
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
    <div class="release_resource" v-bind:class="{preventScroll:obj.sheetVisible || obj.show}">
        <myHeader :param="param"></myHeader>
        <div class="page-loadmore-wrapper" v-bind:class="{preventScroll:obj.sheetVisible  || obj.show}" ref="wrapper" :style="{ height: wrapperHeight + 'px' }">
            <div class="basic_infor">
                <needBasic :obj="obj"></needBasic>
            </div>
            <div class="img">
                <div class="img_box" v-for="(todo,index) in imgArr">
                    <img :src="todo" class="my_img">
                    <img src="/static/icons/upload-delete.png" class="delete" @click="deletes">
                </div>
                <div class="up_load">
                    <imageUpload :param="imgArr" v-on:postUrl="getUrl"></imageUpload>
                </div>
            </div>
            <releaseBasic :obj="obj"></releaseBasic>
            <div class="sell_point">
                <textarea placeholder="请根据实际情况填写药材资源卖点" v-model="obj.selling_point"></textarea>
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
import imageUpload from '../components/release/upLoadImgs' /**/
import needBasic from '../components/release/resourceReleaseTop'
import releaseBasic from '../components/release/resourceReleaseBasic'
import userInfor from '../components/release/userInfor'
import httpService from '../common/httpService.js'

export default {
    data() {
            return {
                param: {
                    name: '资源发布',
                    router: 'home'
                },
                imgs: [],
                img_src: '/static/images/3.jpg',
                drug: '请输入你的药材',
                obj: {
                    resource: true,
                    sample_id: '',
                    number_id: 1,
                    sampling: 1,
                    update: false,
                    drug_name: '',
                    spec: '',
                    place: '',
                    number: '',
                    number_unit: '',
                    sample_unit: '',
                    sales_price: '',
                    weight: '',
                    price: '',
                    selling_point: '',
                    name: '',
                    phone: '',
                    duedate: '90',
                    breedId: '',
                    sheetVisible: false,
                    show: false
                },
                imgArr: [],
                selected: '1',
                todos: {},

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
                console.log(_self.obj.number_id);
                var checkArr = [];
                let checkBreedId = validation.checkNull(_self.obj.breedId, '请先选择品种');
                checkArr.push(checkBreedId);
                let checkBreedSpec = validation.checkNull(_self.obj.spec, '请输入规格');
                checkArr.push(checkBreedSpec);
                let checkBreedPlace = validation.checkNull(_self.obj.place, '请输入产地');
                checkArr.push(checkBreedPlace);
                let checkNum = validation.checkMaxNum(_self.obj.number, '数量');
                checkArr.push(checkNum);
                let checkPri = validation.checkPrice(_self.obj.sales_price, '价格');
                checkArr.push(checkPri);
                if (_self.obj.sampling) {
                    let checkSampleNum = validation.checkMaxNum(_self.obj.weight, '样品');
                    checkArr.push(checkSampleNum);
                    let checkSamplePri = validation.checkPrice(_self.obj.price, '样品价格');
                    checkArr.push(checkSamplePri);
                }
                let count = '请上传图片';
                for (let i = 0; i < _self.imgArr.length; i++) {
                    if (_self.imgArr[i]) {
                        count = false;
                    }
                }
                if (count) {
                    checkArr.push(count);
                }
                let checkDes = validation.checkNull(_self.obj.selling_point, '请输入药材资源卖点');
                checkArr.push(checkDes);
                let checkLookDes = validation.checkLook(_self.obj.selling_point);
                checkArr.push(checkLookDes);
                let checkName = validation.checkNull(_self.obj.name, '请输入姓名');
                checkArr.push(checkName);
                let checkLookName = validation.checkLook(_self.obj.name);
                checkArr.push(checkLookName);
                let checkPhone = validation.checkPhone(_self.obj.phone);
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
                    biz_method: 'editSupplyInfo',
                    biz_param: {
                        customerId: common.customerId,
                        breedName: _self.obj.drug_name,
                        spec: _self.obj.spec,
                        location: _self.obj.place,
                        number: _self.obj.number,
                        price: _self.obj.sales_price,
                        sampling: _self.obj.sampling,
                        description: _self.obj.selling_point,
                        customerName: _self.obj.name,
                        customerPhone: _self.obj.phone,
                        editImage: _self.imgArr,
                        sampleNumber: _self.obj.weight,
                        sampleAmount: _self.obj.price,
                        duedate: _self.obj.duedate,
                        breedId: _self.obj.breedId,
                        unit: _self.obj.number_id,
                        sampleUnit: '份'
                    }
                };
                body.time = Date.parse(new Date()) + parseInt(common.difTime);
                body.sign = common.getSign('biz_module=' + body.biz_module + '&biz_method=' + body.biz_method + '&time=' + body.time);
                httpService.supplyRelease(url, body, function(suc) {
                    common.$emit('close-load');
                    console.log(suc);
                    if (suc.data.code == '1c01') {
                        common.$emit('message', suc.data.msg);
                        common.$emit('informMyRes', 'refurbish');
                        let id = suc.data.biz_result.intentionId;
                        common.$emit('informSupplySuccess', suc.data.biz_result.intentionId);
                        _self.$router.push("supplyReleaseSuccess" + '/' + id);
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
            judgeValue(param) {
                this.obj.sampling = param;
            }

        },
        components: {
            imageUpload,
            needBasic,
            myHeader,
            releaseBasic,
            userInfor
        },
        created() {
            let _self = this;
            _self.getInfo();
            common.$on('inforReleases', function(item) {
                _self.obj.drug_name = '';
                _self.obj.spec = '';
                _self.obj.place = '';
                _self.obj.number = '';
                _self.obj.sales_price = '';
                _self.obj.weight = '';
                _self.obj.price = '';
                _self.obj.selling_point = '';
                _self.obj.number_unit = '斤';
                _self.obj.number_id = 1;
                _self.getInfo();
            })
        },
        mounted() {
            this.wrapperHeight = document.documentElement.clientHeight - this.$refs.wrapper.getBoundingClientRect().top;
        }
}
</script>
