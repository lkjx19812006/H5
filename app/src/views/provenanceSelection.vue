<template>
    <div class="provenance">
        <mt-header title="产地选择" class="header">
            <router-link to="" slot="left">
                <mt-button icon="back" @click="back()"></mt-button>
            </router-link>
            <mt-button slot="right" @click="save()">确定</mt-button>
        </mt-header>
        <!-- <div class="select_box">
            <mt-navbar v-model="selected">
                <mt-tab-item id="1">国内</mt-tab-item>
                <mt-tab-item id="2">国外</mt-tab-item>
            </mt-navbar>
        </div> -->
        <div class="history_box" v-show="selectArr.length>0">
            <div class="history">
                <div v-for="(item,index) in selectArr">
                    <p>{{item.place}}</p>
                    <img src="../../static/images/false.png" @click="delItem(index)">
                </div>
            </div>
        </div>
        <mt-index-list>
            <div class="list" v-for="todo in home_list" v-if="selected==1">
                <mt-index-section :index="todo.index" class="index_name">
                    <a @click="selectPlace(item)" v-for="item in todo.place_list">
                        <mt-cell :title="item.place"></mt-cell>
                    </a>
                </mt-index-section>
            </div>
            <div class="list" v-for="todo in outer_list" v-if="selected==2">
                <mt-index-section :index="todo.index" class="index_name">
                    <a @click="selectPlace(item)" v-for="item in todo.place_list">
                        <mt-cell :title="item.place"></mt-cell>
                    </a>
                </mt-index-section>
            </div>
        </mt-index-list>
    </div>
</template>
<script>
import common from '../common/common.js'
export default {
    data() {
            return {
                selected: '1',
                home_list: [{
                    index: 'A',
                    place_list: [{
                        place: '湖北'
                    }, {
                        place: '湖北'
                    }, {
                        place: '湖北'
                    }]
                }, {
                    index: 'B',
                    place_list: [{
                        place: '湖北'
                    }, {
                        place: '湖北'
                    }, {
                        place: '湖北'
                    }]
                }, {
                    index: 'C',
                    place_list: [{
                        place: '湖北'
                    }, {
                        place: '湖北'
                    }, {
                        place: '湖北'
                    }]
                }, {
                    index: 'D',
                    place_list: [{
                        place: '湖北'
                    }, {
                        place: '湖北'
                    }, {
                        place: '湖北'
                    }]
                }],
                outer_list: [{
                    index: 'A',
                    place_list: [{
                        place: '巴西'
                    }, {
                        place: '巴西'
                    }, {
                        place: '巴西'
                    }]
                }, {
                    index: 'B',
                    place_list: [{
                        place: '巴西'
                    }, {
                        place: '巴西'
                    }, {
                        place: '巴西'
                    }]
                }, {
                    index: 'C',
                    place_list: [{
                        place: '巴西'
                    }, {
                        place: '巴西'
                    }, {
                        place: '巴西'
                    }]
                }, {
                    index: 'D',
                    place_list: [{
                        place: '巴西'
                    }, {
                        place: '巴西'
                    }, {
                        place: '巴西'
                    }]
                }],
                selectArr: [{
                    place: '天津'
                }, {
                    place: '山东'
                }, {
                    place: '湖南'
                }]
            }

        },

        methods: {
            selectPlace: function(item) {
                this.selectArr.push(item);
            },
            delItem: function(id) {
                this.selectArr.splice(id, 1);

            },
            back: function() {
                this.$router.go(-1);
            },
            save:function(){
                this.$router.go(-1);
            }
        },

        created() {
            common.$emit('show-load');
            this.$http.get(common.apiUrl.drug_information_list).then((response) => {
                common.$emit('close-load');
                let data = response.data.biz_result.list;
                this.todos = data;
            }, (err) => {
                common.$emit('close-load');
                common.$emit('message', response.data.msg);
            });
        }
}
</script>
<style scoped>
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
</style>
