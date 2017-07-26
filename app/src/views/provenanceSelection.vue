<style lang="less" scoped>
.whole {
    position: relative;
    background: #F1EFEF;
}

.provenance {}

.provenance .index_name {
    text-align: left;
}

.provenance .header {
    background-color: #FA6705;
    color: #313232;
    border-bottom: 1px solid #C9C9C9;
    color: white;
    font-size: 1.408rem;
}

.provenance .select_box {
    width: 100%;
    background-color: white;
    padding: 1rem;
}

.provenance .mint-navbar {
    width: 70%;
    margin-left: 15%;
}

.provenance .mint-navbar .mint-tab-item {
    padding: 1.2rem 0;
    line-height: 0 !important;
    border: 1px solid #FA6705;
}

.provenance .mint-navbar .mint-tab-item.is-selected {
    background-color: #FA6705;
    color: white;
    margin: 0;
}

.provenance .select_box {
    border-bottom: 1px solid #DFDFDF;
    font-size: 2.5rem;
}

.provenance .history_box {
    float: left;
    width: 100%;
    background: white;
}

.provenance .history_box .history {
    width: 100%;
    padding: 0 10px 10px 10px;
    background: white;
    float: left;
    border-bottom: 1px solid #DFDFDF;
}

.provenance .history_box .history div {
    padding: 0.44rem;
    border: 1px solid #FA6705;
    float: left;
    margin-right: 0.8533rem;
    font-size: 1.024rem;
    height: 2.22rem;
    margin-top: 10px;
}

.provenance .history_box .history div p {
    float: left;
}

.provenance .history_box .history div img {
    width: 1.024rem;
    height: 1.024rem;
    float: right;
    margin-left: 0.8533rem;
}
.provenance{
    .header{
        position: relative;
        width:100%;
        height: 50px;
        background-color: #FA6705;
        display: flex;
        flex-direction: row;
        align-items:center;
        justify-content: center;
        .go_back{
             padding:15px;
             position:absolute;
             height:50px;
             left:0;
             img{
                 height: 20px;
             }
        }
        .title{
            font-size:18px;
        }
        .button{
            position: absolute;
            padding: 15px;
            height:50px;
            right:0;
            font-size:16px;
        }
    }
}
</style>
<template>
    <div class="provenance">
        <!-- <mt-header :title="title" class="header">
            <router-link to="" slot="left">
                <mt-button icon="back" @click="back()" class="backs"></mt-button>
            </router-link>
            <mt-button slot="right" @click="save()">确定</mt-button>
        </mt-header> -->
        <div class="header">
            <div class="go_back" @click="back()">
                <img src="/static/images/go-back.png">
            </div>
            <div class="title">{{title}}</div>
            <div class="button" @click="save()">确定</div>
        </div>

         <!-- <div class="select_box">
                <mt-navbar v-model="selected">
                    <mt-tab-item id="1">国内</mt-tab-item>
                    <mt-tab-item id="2">国外</mt-tab-item>
                </mt-navbar>
            </div>  -->
        <div class="history_box" v-show="selectArr.length>0">
            <div class="history">
                <div v-for="(item,index) in selectArr">
                    <p>{{item.name}}</p>
                    <img src="../../static/images/false.png" @click="delItem(index)">
                </div>
            </div>
        </div>
        <mt-index-list>
            <div class="list" v-for="todo in list" v-if="selected==1">
                <mt-index-section :index="todo.key" class="index_name">
                    <a @click="selectPlace(item)" v-for="item in todo.value">
                        <mt-cell :title="item.name"></mt-cell>
                    </a>
                </mt-index-section>
            </div>
             <!-- <div class="list" v-for="todo in outer_list" v-if="selected==2">
                    <mt-index-section :index="todo.index" class="index_name">
                        <a @click="selectPlace(item)" v-for="item in todo.place_list">
                            <mt-cell :title="item.place"></mt-cell>
                        </a>
                    </mt-index-section>
                </div>  -->
        </mt-index-list>
    </div>
</template>
<script>
import common from '../common/common.js'
import httpService from '../common/httpService.js'
export default {
    data() {
        return {
            selected: '1',
            list: [],
            selectArr: [],
            title: '产地选择'

        }
    },

    methods: {
        getHttp() {
            let _self = this;
            common.$emit('show-load');
            httpService.specifiedPlace(common.urlCommon + common.apiUrl.most, {
                biz_module: 'breedService',
                biz_method: 'queryBreedLocalList',
                biz_param: {
                    breedId: 0,
                }
            }, function (suc) {
                common.$emit('close-load');
                let result = suc.data.biz_result.list;
                _self.list = result;
                //console.log(result);
            }, function (err) {
                common.$emit('close-load');
                common.$emit('message', err.data.msg);
            })
        },
        getNeedHttp() {
            let _self = this;
            common.$emit('show-load');
            httpService.specifiedPlace(common.urlCommon + common.apiUrl.most, {
                biz_module: 'locationService',
                biz_method: 'queryProvinceByChina',
                biz_param: {

                }
            }, function (suc) {
                common.$emit('close-load');
                let result = suc.data.biz_result.list;
                _self.list = result;
                //console.log(result);
            }, function (err) {
                common.$emit('close-load');
                common.$emit('message', err.data.msg);
            })
        },
        selectPlace: function (item) {
            console.log(1, item)
            let count = 1;
            for (let i = 0; i < this.selectArr.length; i++) {
                if (this.selectArr[i].name == item.name) {
                    count = 0;
                }
            }
            if (count) this.selectArr.push(item);
        },
        delItem: function (id) {
            this.selectArr.splice(id, 1);
        },
        back: function () {
            console.log(78798)
            this.$router.go(-1);

        },
        save: function () {
            let areaArr = [];
            let idArr = [];
            for (var i = 0; i < this.selectArr.length; i++) {
                areaArr.push(this.selectArr[i].name);
                if (this.selectArr[i].locationId) {
                    idArr.push(this.selectArr[i].locationId);
                } else {
                    idArr.push(this.selectArr[i].id);
                }

            }
            switch (this.$route.params.from) {
                case 'need':
                    common.$emit('need-sort', {
                        areaArr: areaArr,
                        idArr: idArr
                    });
                    break;
                case 'resource':
                    common.$emit('resource-sort', {
                        areaArr: areaArr,
                        idArr: idArr
                    });
                    break;
                case 'lowRes':
                    common.$emit('lowRes-sort', {
                        areaArr: areaArr,
                        idArr: idArr
                    });
                    break;
                case 'urgentNeed':
                    common.$emit('urgentNeed-sort', {
                        areaArr: areaArr,
                        idArr: idArr
                    });
                    break;
                default:
                    break;

            }
            this.$router.go(-1);
        }
    },
    created() {
        let _self = this;
        let type = _self.$route.query.type;
        if (type) {
            _self.title = '交货地选择'
        } else {
            _self.title = '产地选择'
        }
        common.$on('initial', function (id) {
            _self.selectArr = []
        })
        common.$on('addressSelect', function (item) {
            _self.title = item;
        })
        _self.getNeedHttp();
    }
}
</script>

