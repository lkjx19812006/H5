<template>
    <div class="content long_search">
        <div class="search_div">
            <div class="search_content" v-bind:class="{ search_active: keyword }" >               
                <img src="/static/images/search.png" class="search_image" v-show="!keyword">
                <div class="clear" v-show="keyword" @click.stop.prevent="clearWord()"><img src="/static/images/false.png" class="search_image"  >       
                </div>
                <input type="text" v-bind:class="{ search_active: keyword }" placeholder="请输入您想要的货物资源" disabled="true" v-model="keyword">
            </div>
        </div>
    </div>
</template>
<script>
import httpService from '../../common/httpService.js'
import common from '../../common/common.js'
export default {
    data() {
            return {
                value: ''
            }
        },
        props: {
            keyword: {
                type: String,
                default: ''
            }
        },
        methods:{
            clearWord(){
                 this.$emit("clearSearch");
            }
        }
}
</script>
<style scoped>
.long_search {
    float: left;
    width: 100%;
}

.long_search .search_div {
    height: 50px;
    background: #fff;
    border-bottom: 1px solid #ccc;
    width: 100%;
    float: left;
    background: #EC6817;
}

.long_search .search_div .search_active{
    background-color: #fff !important; 
}

.long_search .search_div .search_content {
    background: #F1EFEF;
    height: 30px;
    margin: 10px 30px;
    border-radius: 10px;
}

.long_search .search_div .search_content .clear{
    float: right;
    padding: 0 0 10px 10px;
}
.long_search .search_div .search_content input {
    background-color: #F1EFEF;
    height: 30px;
    /*position: absolute;
    left: 45px;*/
    float:left;
    border: none;
    margin-left: 10px;
}

.long_search .search_div .search_content img {
    float: left;
    max-height: 20px;
    margin: 5px 0 0 0;
    margin-left: 18%;
}
</style>
