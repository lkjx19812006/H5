<template>
    <div class="content mypurchase_sort">
        <div class="sort_content">
            <div v-bind:class="item.class" v-for="(item,index) in arr" @click="showTable(item,index)">
                {{item.name}}<img v-bind:src="item.url">
            </div>
            <div class="sort_cell" v-show="selectShow">
                <a v-for="item in selectArr" @click="getAsc(item)">
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
export default {
    data() {
            return {
                arr: [{
                    name: '发布日期',
                    asc: 'top',
                    url: '/static/icons/drop_down.png',
                    saveName: '发布日期',
                    class: 'sort_content_detail',
                    sortArr: [{
                        name: '由新到旧',
                        asc: 'low',
                        show: false,
                        pubdate:1,
                        key:'pubdate'
                    }, {
                        name: '由旧到新',
                        asc: 'top',
                        show: false,
                        pubdate:2,
                        key:'pubdate'
                    }, {
                        name: '全部',
                        asc: '',
                        show: false,
                        pubdate:0,
                        key:'pubdate'
                    }]
                }, {
                    name: '报价人数',
                    asc: 'top',
                    url: '/static/icons/drop_down.png',
                    saveName: '报价人数',
                    class: 'sort_content_detail',
                    sortArr: [{
                        name: '由少到多',
                        asc: 'low',
                        show: false,
                        number:1,
                        key:'number'
                    }, {
                        name: '由多到少',
                        asc: 'top',
                        show: false,
                        number:2,
                        key:'number'
                    }, {
                        name: '全部',
                        asc: '',
                        show: false,
                        number:0,
                        key:'number'
                    }]
                }, {
                    name: '剩余时间',
                    asc: 'top',
                    url: '/static/icons/drop_down.png',
                    saveName: '剩余时间',
                    class: 'sort_content_detail',
                    sortArr: [{
                        name: '由少到多',
                        asc: 'low',
                        show: false,
                        duedate:1,
                        key:'duedate'
                    }, {
                        name: '由多到少',
                        asc: 'top',
                        show: false,
                        duedate:0,
                        key:'duedate'
                    }, {
                        name: '全部',
                        asc: '',
                        show: false,
                        duedate:'',
                        key:'duedate'
                    }]
                }, {
                    name: '审核状态',
                    asc: 'top',
                    url: '/static/icons/drop_down.png',
                    saveName: '审核状态',
                    class: 'sort_content_detail',
                    sortArr: [{
                        name: '申请中',
                        asc: 'low',
                        show: false,
                        text: 1,
                        key:'text'
                    }, {
                        name: '上架失败',
                        asc: 'low',
                        show: false,
                        text:-2,
                        key:'text'
                        
                    },{
                        name: '下架',
                        asc: 'low',
                        show: false,
                        text:4,
                        key:'text'
                        
                    }, {
                        name: '上架',
                        asc: 'top',
                        show: false,
                        text:2,
                        key:'text'

                    },
                    {
                        name: '全部',
                        asc: '',
                        show: false,
                        text:'',
                        key:'text'

                    }]
                }],
                selectShow: false,
                selectArr: [],
                selectIndex: 0
            }
        },
        methods: {
            showTable: function(item, index) {
                if (item.asc == 'location') {
                    this.$router.push('provenanceSelection');
                } else {
                    this.selectShow = !this.selectShow;
                    this.selectIndex = index;
                    this.selectArr = item.sortArr;
                }
            },
            getAsc: function(item) {
                if (!item.asc) {
                    this.arr[this.selectIndex].name = this.arr[this.selectIndex].saveName;
                    this.arr[this.selectIndex].url = '/static/icons/drop_down.png';
                    this.arr[this.selectIndex].class = 'sort_content_detail';
                } else {
                    this.arr[this.selectIndex].class = 'sort_content_detail_select';
                    this.arr[this.selectIndex].name = item.name;
                    if (item.asc == 'low') {
                        this.arr[this.selectIndex].url = '/static/icons/drop_down_selected.png';
                    } else if (item.asc == 'top') {
                        this.arr[this.selectIndex].url = '/static/icons/take_back.png';
                    }
                }
                this.selectShow = false;
                let _self = this;
                _self.$emit("postId", item);
                
            }
        },
        created() {
            this.selectArr = this.arr[0].sortArr;
        }
}
</script>
<style scoped>
.mypurchase_sort {
    float: left;
    width: 100%;
}

.mypurchase_sort .sort_content {
    width: 100%;
    float: left;
    border-bottom: 1px solid #ddd;
}

.mypurchase_sort .sort_content .sort_content_detail {
    float: left;
    width: 25%;
    min-height: 40px;
    line-height: 40px;
    color: #666;
    font-size: 1.1rem;
}

.mypurchase_sort .sort_content .sort_content_detail_select {
    float: left;
    width: 25%;
    min-height: 40px;
    line-height: 40px;
    color: #EC6817;
    font-size: 1.1rem;
}

.mypurchase_sort .sort_content .sort_content_detail_select img {
    max-height: 9px;
    margin-left: 5px;
    margin-top: 5px;
}

.mypurchase_sort .sort_content .sort_content_detail img {
    max-height: 9px;
    margin-left: 5px;
    margin-top: 5px;
}

.mypurchase_sort .sort_content .sort_cell {
    width: 100%;
    float: left;
    position: absolute;
    z-index: 2;
    margin-top: 40px;
}

.mypurchase_sort .sort_content .sort_cell .cell_p {
    position: absolute;
    left: 10px;
    font-size: 1.1rem;
}

.mypurchase_sort .sort_content .sort_cell .cell_img {
    max-height: 15px;
    float: right;
}
</style>
