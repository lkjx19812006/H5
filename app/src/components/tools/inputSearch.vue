<template>
    <div class="content search_input">
        <div class="search_div">
            <div class="search_content">
                <input type="text" placeholder="请输入您想要的货物资源" disabled ="true" >
                <img src="/static/images/search.png" class="search_image" v-show="!show">
                <img src="/static/images/false.png" class="search_image"  v-show="show">
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
                value:'',
                
                prop:{
                       show:true
                    }
                }
                
           },
           /*watch: {
            value: function(newValue, oldValue) {
                //console.log(newValue);
                //console.log(oldValue);
                let _self = this;
                window.clearTimeout(this.time);
                this.time = setTimeout(() => {
                    //console.log('dssdsdsd');

                    _self.$emit('postValue',{
                         value:_self.value 
                    });
                    
                }, 0)
            }
        },*/
        
}
</script>
<style scoped>
.search_input {
    float: left;
    width: 100%;
}

.search_input .search_div {
    height: 50px;
    background: #fff;
    border-bottom: 1px solid #ccc;
    width: 100%;
    float: left;
    background: #EC6817;
}

.search_input .search_div .search_content {
    background: #F1EFEF;
    height: 30px;
    margin: 10px 30px;
    border-radius: 10px;
}

.search_input .search_div .search_content input {
    background-color: #F1EFEF;
    height: 30px;
    position: absolute;
    left: 45px;
    border: none;
}

.search_input .search_div .search_content img {
    float: right;
    max-height: 20px;
    margin: 5px 10px 0 0;
}

</style>
