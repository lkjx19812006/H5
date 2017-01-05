<template>
    <div class="content back_search">
        <div class="search_div">
            <div class="search_content" v-bind:class="{ search_active: keyword }" >
                <!-- <input type="text" v-bind:class="{ search_active: keyword }" placeholder="请输入您想要的货物资源" disabled="true" v-model="keyword"> -->
                <img src="/static/icons/clarity-search.png" class="search_image" v-show="!keyword">
                <div class="clear" v-show="keyword" @click.stop.prevent="clearWord()"><img src="/static/images/false.png" class="search_image"  >
                </div>
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
.back_search {
    float: right;
    width: 15%;
    
    margin-left: 15%;
}

.back_search .search_div {
    height: 50px;
    background: #fff;
    border-bottom: 1px solid #ccc;
    width: 100%;
    float: left;
    background: #EC6817;
    padding-left: 0;
}

.back_search .search_div .search_active{
    /*background-color: #fff !important; */
}

.back_search .search_div .search_content {
    background: #EC6817;
    height: 30px;
    margin:10px 30px 10px 0;
    border-radius: 10px;
    width:95%;
    position: relative;
}

.back_search .search_div .search_content .clear{
    float: right;
    padding: 0 0 10px 10px;
}
.back_search .search_div .search_content input {
    background-color: #EC6817;
    height: 30px;
    position: absolute;
    left:25%;
    border: none;
    
}

.back_search .search_div .search_content img {
    /*float: right;
    max-height: 20px;*/
    margin: 5px 10px 0 0;
    position: absolute;
    left:15%;
    width:20px;

}
</style>
