<template>
    <div class="content sort">
        <div class="sort_content">
            <div v-bind:class="item.class" v-for="(item,index) in paramArr" @click="showTable(item,index)">
                {{item.name}}
                <img v-bind:src="item.url">
            </div>
            <div class="sort_cell" v-show="selectShow">
                <a v-for="(item,index) in selectArr" @click="getAsc(item,index)">
                    <mt-cell>
                        <p class="cell_p">{{item.name}}</p>
                        <img class="cell_image" src="/static/icons/selected.png" style="max-height:10px" v-show="item.show">
                    </mt-cell>
                </a>
            </div>
        </div>
    </div>
</template>
<script>
import common from '../../common/common.js'
export default {
    data() {
        return {
            selectShow: false,
            selectArr: [],
            selectIndex: 0
        }
    },
    props: {
        sortRouter: {
            type: String,
            default: '/home'
        },
        paramArr: [Array],
        addressSele: ''
    },
    methods: {
        showTable: function (item, index) {
            let _self = this;
            if (item.asc == 'location') {
                if (_self.addressSele) {
                    common.$emit('addressSelect', '交货地选择')
                    _self.$router.push('/provenanceSelection/' + this.sortRouter+'?type=true');
                }else{
                    common.$emit('addressSelect', '产地选择')
                    _self.$router.push('/provenanceSelection/' + this.sortRouter+'?type=false');
                }

            }
            if (item.asc == 'comprehensive') {
                console.log(2, this.paramArr[this.selectIndex].select)
                if (!this.paramArr[this.selectIndex].select || this.paramArr[this.selectIndex].select == 'undefined') {
                    console.log(1231)
                    //_self.paramArr[_self.selectIndex].class = 'sort_content_detail_select';
                    //处罚综合筛选,让其他的class回归原来的样子,选择产地的页面地区清空      
                    _self.$emit('initial', _self.paramArr[this.selectIndex].select);
                    console.log(66, !this.paramArr[this.selectIndex].select)
                }

            } else {
                this.selectShow = !this.selectShow;
                this.selectIndex = index;
                this.selectArr = item.sortArr;
            }
        },
        getAsc: function (item, index) {
            if (!item.asc) {
                this.paramArr[this.selectIndex].name = this.paramArr[this.selectIndex].saveName;
                this.paramArr[this.selectIndex].url = '/static/icons/drop_down.png';
                this.paramArr[this.selectIndex].class = 'sort_content_detail';
            } else {
                this.paramArr[this.selectIndex].class = 'sort_content_detail_select';
                this.paramArr[this.selectIndex].name = item.name;
                if (item.asc == 'low') {
                    this.paramArr[this.selectIndex].url = '/static/icons/drop_down_selected.png';
                } else if (item.asc == 'top') {
                    this.paramArr[this.selectIndex].url = '/static/icons/take_back.png';
                }
            }
            this.selectShow = false;


            let _self = this;
            _self.$emit("postId", item);
        }
    },
    created() {
        this.selectArr = this.paramArr[0].sortArr;
    }
}
</script>
<style scoped>
.sort {
    float: left;
    width: 100%;
}

.sort .sort_content {
    width: 100%;
    float: left;
    border-bottom: 1px solid #ddd;
    background: white;
}

.sort .sort_content .sort_content_detail {
    float: left;
    width: 25%;
    min-height: 40px;
    line-height: 40px;
    color: #666;
    font-size: 1.1rem;
}

.sort .sort_content .sort_content_detail_select {
    float: left;
    width: 25%;
    min-height: 40px;
    line-height: 40px;
    color: #EC6817;
    font-size: 1.1rem;
}

.sort .sort_content .sort_content_detail_select img {
    max-height: 9px;
    margin-left: 5px;
    margin-top: 5px;
}

.sort .sort_content .sort_content_detail img {
    max-height: 9px;
    margin-left: 5px;
    margin-top: 5px;
}

.sort .sort_content .sort_cell {
    width: 100%;
    float: left;
    position: absolute;
    z-index: 2;
    margin-top: 40px;
}

.sort .sort_content .sort_cell .cell_p {
    position: absolute;
    left: 10px;
    font-size: 1.1rem;
}

.sort .sort_content .sort_cell .cell_img {
    max-height: 15px;
    float: right;
}
</style>
