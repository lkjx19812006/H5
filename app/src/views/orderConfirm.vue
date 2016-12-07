<template>
    <div class="whole  order_confirm">
        <mt-header title="订单确认">
            <router-link to="" slot="left">
                <mt-button icon="back" @click="back()"></mt-button>
            </router-link>
        </mt-header>
        <orderAddress></orderAddress>
        <div class="content">
            <orderItem></orderItem>
            <div class="total">
                <orderTotal></orderTotal>
            </div>
            <div class="fix_bottom">
                提交订单
            </div>
        </div>
    </div>
</template>
<script>
import common from '../common/common.js'
import orderAddress from '../components/tools/orderAddress'
import orderItem from '../components/tools/orderItem'
import orderTotal from '../components/tools/orderTotal'

export default {
    data() {
            return {
                data: ""
            }
        },
        created() {
            common.$emit('show-load');
            this.$http.get(common.apiUrl.drug_table_list).then((response) => {
                common.$emit('close-load');
            }, (err) => {
                common.$emit('close-load');
                common.$emit('message', response.data.msg);
            });
        },
        components: {
            orderAddress,
            orderItem,
            orderTotal
        },
        methods: {
            back() {
                this.$router.go(-1);
            }
        }
}
</script>
<style scoped>
.order_confirm {
    float: left;
    width: 100%;
    margin-bottom: 5rem;
    margin-top: 60px;
}

.order_confirm .mint-header{
  position: fixed;
  z-index: 2;
  top: 0;
}

.order_confirm .content {
    background: #fff;
    margin-top: 10px;
    float: left;
    width: 100%;
    padding: 10px;

}

.order_confirm .content .total {
    margin-top: 1rem;
    float: left;
    width: 100%;
}

.order_confirm .content .fix_bottom {
    position: fixed;
    bottom: 0;
    width: 100%;
    left: 0;
    height: 5rem;
    color: #FFF;
    font-size: 1.7rem;
    background: #FA6705;
    line-height: 5rem;
}
</style>
