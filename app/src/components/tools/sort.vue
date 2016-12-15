<template>
    <div class="content sort">
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
                    name: '上架时间',
                    asc: 'top',
                    url: '/static/icons/drop_down.png',
                    saveName: '上架时间',
                    class: 'sort_content_detail',
                    sortArr: [{
                        name: '由新到旧',
                        asc: 'low',
                        show: false
                    }, {
                        name: '由旧到新',
                        asc: 'top',
                        show: false
                    }, {
                        name: '全部',
                        asc: '',
                        show: false
                    }]
                }, {
                    name: '价格排序',
                    asc: 'top',
                    url: '/static/icons/drop_down.png',
                    saveName: '价格排序',
                    class: 'sort_content_detail',
                    sortArr: [{
                        name: '由低到高',
                        asc: 'low',
                        show: false
                    }, {
                        name: '由高到低',
                        asc: 'top',
                        show: false
                    }, {
                        name: '全部',
                        asc: '',
                        show: false
                    }]
                }, {
                    name: '可否样品',
                    asc: 'top',
                    url: '/static/icons/drop_down.png',
                    saveName: '可否样品',
                    class: 'sort_content_detail',
                    sortArr: [{
                        name: '可提供',
                        asc: 'low',
                        show: false
                    }, {
                        name: '不可提供',
                        asc: 'top',
                        show: false
                    }, {
                        name: '全部',
                        asc: '',
                        show: false
                    }]
                }, {
                    name: '产地',
                    asc: 'location',
                    url: '/static/icons/screen.png',
                    class: 'sort_content_detail',
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
            }
        },
        created() {
            this.selectArr = this.arr[0].sortArr;
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
