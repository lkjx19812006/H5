<template>
    <div class=" address_confirm">
        <div class="left_district">
            <div class="content">
                <div class="left_content"><img src="/static/icons/consignee.png">收货人：</div>
                <div><span>杨帆</span>15692463581</div>
            </div>
            <div class="content address">
                <div class="left_content"><img src="/static/icons/receipt_address.png">收货地址：</div>
                <div :style="{ width: wrapperWidth + 'px' }">上海，上海，上海，上海，</div>
            </div>
        </div>
        <img src="/static/images/right.png" class="right_arrow">
    </div>
</template>
<script>
import common from '../../common/common.js'

export default {
    data() {
            return {
                data: "",
                wrapperWidth:0
            }
        },
        created() {

        },
        methods: {

        },
         mounted() {
            this.wrapperWidth = document.documentElement.clientWidth - 140;
        }
}
</script>
<style scoped>
.address_confirm {
    background: #fff;
    float: left;
    width: 100%;
    padding: 10px;
}

.address_confirm .left_district {
    float: left;
    width: 100%;
    padding-right: 20px;
}

.address_confirm .left_district .content {
    float: left;
    width: 100%;
    font-size: 14px;
    line-height: 23px;
    color: #333;
}

.address_confirm .left_district .content span{
    border-right: 1px solid #666;
    padding-right: 3px;
    margin-right: 3px;
}

.address_confirm .left_district .address{
    margin-top: 5px;
}

.address_confirm .left_district .content .left_content{
    float: left;
    text-align: right;
    min-width: 90px;
}

.address_confirm .left_district .content div {
    float: left;
}

.address_confirm .left_district .content img {
    float: left;
    max-height: 20px;
}

.address_confirm .right_arrow {
    position: absolute;
    right: 10px;
    max-height: 20px;
    margin-top: 15px;
}
</style>
