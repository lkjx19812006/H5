<template>
    
    <div class="content other_sort">
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
                        id:'2'
                    }, {
                        name: '由旧到新',
                        asc: 'top',
                        show: false,
                        id:'1'
                    }, {
                        name: '全部',
                        asc: '',
                        show: false,
                        id:'0'
                    }]
                }, {
                    name: '剩余时间',
                    asc: 'top',
                    url: '/static/icons/drop_down.png',
                    saveName: '剩余时间',
                    class: 'sort_content_detail',
                    sortArr: [{
                        name: '由短到长',
                        asc: 'low',
                        show: false
                    }, {
                        name: '由长到短',
                        asc: 'top',
                        show: false
                    }, {
                        name: '全部',
                        asc: '',
                        show: false
                    }]
                }, {
                    name: '可否供样',
                    asc: 'top',
                    url: '/static/icons/drop_down.png',
                    saveName: '可否样品',
                    class: 'sort_content_detail',
                    sortArr: [{
                        name: '可供样',
                        asc: 'low',
                        show: false
                    }, {
                        name: '不可供样',
                        asc: 'top',
                        show: false
                    }, {
                        name: '全部',
                        asc: '',
                        show: false
                    }]
                }, {
                    name: '审核状态',
                    asc: 'top',
                    url: '/static/icons/drop_down.png',
                    saveName: '审核状态',
                    class: 'sort_content_detail',
                    sortArr: [{
                        name: '未审核',
                        asc: 'low',
                        show: false
                    }, {
                        name: '已审核',
                        asc: 'top',
                        show: false
                    }, {
                        name: '全部',
                        asc: '',
                        show: false
                    }]
                }],
                selectShow: false,
                selectArr: [],
                selectIndex: 0,
                sort:{}
            }
        },
        props: {
            
            value: '',
            showurl: ''
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

                
            }
        },
        created() {
            this.selectArr = this.arr[0].sortArr;
        }
}
</script>
<style scoped>
.other_sort {
    float: left;
    width: 100%;
}

.other_sort .sort_content {
    width: 100%;
    float: left;
    border-bottom: 1px solid #ddd;
}

.other_sort .sort_content .sort_content_detail {
    float: left;
    width: 25%;
    min-height: 40px;
    line-height: 40px;
    color: #666;
    font-size: 1.1rem;
}

.other_sort .sort_content .sort_content_detail_select {
    float: left;
    width: 25%;
    min-height: 40px;
    line-height: 40px;
    color: #EC6817;
    font-size: 1.1rem;
}

.other_sort .sort_content .sort_content_detail_select img {
    max-height: 9px;
    margin-left: 5px;
    margin-top: 5px;
}

.other_sort .sort_content .sort_content_detail img {
    max-height: 9px;
    margin-left: 5px;
    margin-top: 5px;
}

.other_sort .sort_content .sort_cell {
    width: 100%;
    float: left;
    position: absolute;
    z-index: 2;
    margin-top: 40px;
}

.other_sort .sort_content .sort_cell .cell_p {
    position: absolute;
    left: 10px;
    font-size: 1.1rem;
}

.other_sort .sort_content .sort_cell .cell_img {
    max-height: 15px;
    float: right;
}
</style>
