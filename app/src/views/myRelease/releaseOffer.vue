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
    .sell {
        padding: 15px;
        background-color: #fff;
        .top {
            text-align: left;
            font-size: 15px;
            color: #000;
            span {
                color: #999999;
                font-size: 12px;
            }
        }
        .inbox {
            display: flex;
            flex-direction: row;
            flex-wrap: wrap;
            .name {
                padding: 5px 10px;
                margin: 8px 8px 8px 0;
                font-size: 14px;
                border-radius: 15px;
                color: #7E7E7E;
                background-color: #F4F4F4;
            }
            .active {
                padding: 5px 10px;
                margin: 8px 8px 8px 0;
                font-size: 14px;
                border-radius: 15px;
                background-color: #FAA105;
                color: #fff;
            }
        }
    }
}
</style>
<template>
    <div class="release_offer">
        <myHeader :param="param"></myHeader>
        <div class="page-loadmore-wrapper" ref="wrapper" :style="{ height: wrapperHeight + 'px' }">
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
            <div class="sell">
                <div class="top">产品卖点 <span>(点击可多选哦)</span></div>
                <div class="inbox">
                    <div class="name" v-bind:class="{name:!todo.show,'active':todo.show}" v-for="(todo,index) in sell" @click="select(todo,index)">{{todo.name}}</div>
                </div>
            </div>
        </div>
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
                    actions: [],
                    sell_point: [],
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
                common.$emit("confirm", {
                    message: '确定发布求购？',
                    title: '提示',
                    ensure: this.release
                });
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
                for(var i=0;i<_self.sell.length;i++){
                    if(_self.sell[i].show){
                        _self.sell_point.push(_self.sell[i].name)
                    }
                }
                console.log(_self.sell_point)
            }

        },
        components: {
            myHeader,
            popSpec,
            basicTop,
            titles,
            upLoadImgs
        },
        created() {
            let _self = this;
            _self.getBreedInformation(this.obj.breedName)
        },
        mounted() {
            this.wrapperHeight = document.documentElement.clientHeight - this.$refs.wrapper.getBoundingClientRect().top;
        }
}
</script>
