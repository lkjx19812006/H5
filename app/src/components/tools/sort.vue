<template>
    <div class="content sort">
        <div class="sort_content">
            <div class="sort_content_detail" v-for="item in arr" @click="showTable(item.asc)">
                {{item.name}}<img v-bind:src="item.url">
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
                    url: '/static/icons/drop_down.png'
                }, {
                    name: '价格排序',
                    asc: 'top',
                    url: '/static/icons/drop_down.png'
                }, {
                    name: '可否样品',
                    asc: 'top',
                    url: '/static/icons/drop_down.png'
                }, {
                    name: '产地',
                    asc: 'location',
                    url: '/static/icons/screen.png'
                }]
            }
        },
        methods: {
            showTable: function(item) {
                console.log('table');
            }
        },
        created() {

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
    min-height: 30px;
    line-height: 30px;
    color: #666;
    font-size: 1.1rem;
}

.sort .sort_content .sort_content_detail img {
    max-height: 9px;
    margin-left: 5px;
    margin-top: 5px;
}
</style>
