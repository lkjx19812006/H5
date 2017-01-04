<template>
    <div class="whole sample_confirm">
        <mt-header fixed title="样品订单确认">
            <router-link to="" slot="left">
                <mt-button icon="back" @click="back()"></mt-button>
            </router-link>
        </mt-header>
        <div class="page-loadmore-wrapper">
            <mt-loadmore>
                <div @click="jumpAddress">
                    <orderAddress :param="person"></orderAddress>
                </div>
                <div class="content">
                    <orderItem :param="param" ></orderItem>
                    <div class="total">
                        <orderTotal :order="order"></orderTotal>
                    </div>
                </div>
            </mt-loadmore>
        </div>
        <div class="fix_bottom" v-on:click="confirm">
            提交订单
        </div>
    </div>
</template>
<script>
import common from '../common/common.js'
import orderAddress from '../components/tools/orderAddress'
import orderItem from '../components/tools/orderItem'
import orderTotal from '../components/tools/orderTotal'
import httpService from '../common/httpService.js'
export default {
    data() {
            return {
                data: "",
                param: {
                },
                order: {
                },
                value: '1',
                person: {
                }
            }
        },
        created() {
            let _self = this;
            var id = _self.$route.params.sourceId;
            _self.gethttp(id);
            common.$on('backAddress', function(todo) {
                _self.person = todo;
                _self.id = todo.id;
            })
            common.$on('sampleConfirm', function(item) {
                _self.gethttp(item);
            })
        },
        components: {
            orderAddress,
            orderItem,
            orderTotal
        },
        methods: {
            back() {
                this.$router.go(-1);
            },
            gethttp(id) {
                let _self = this;
                httpService.myAttention(common.urlCommon + common.apiUrl.most, {
                    biz_module: 'intentionService',
                    biz_method: 'queryIntentionInfo',
                    biz_param: {
                        id: id
                    }
                }, function(suc) {
                    common.$emit('message', suc.data.msg);
                    let result = suc.data.biz_result;
                    _self.param = result;
                    _self.order = result;
                }, function(err) {
                    common.$emit('message', err.data.msg);
                })
            },
            jumpAddress() {
                this.$router.push("/addressManage");
            },
            confirm() {
                let _self = this;
                var id = _self.$route.params.sourceId;
                common.$emit('show-load');
                let url = common.addSID(common.urlCommon + common.apiUrl.most);
                let body = {
                    biz_module: 'intentionService',
                    biz_method: 'submitIntentionOrder',
                    version: 1,
                    time: 0,
                    sign: '',
                    biz_param: {
                        sourceId: _self.$route.params.sourceId,
                        number: _self.value,
                        sample: _self.param.sampling,
                        addressId: _self.person.id
                    }
                };
                body.time = Date.parse(new Date()) + parseInt(common.difTime);
                body.sign = common.getSign('biz_module=' + body.biz_module + '&biz_method=' + body.biz_method + '&time=' + body.time);
                httpService.intentResOrder(url, body, function(suc) {
                    common.$emit('close-load');
                    if (suc.data.code == '1c01') {
                        common.$emit("orderToMyOrder", "refurbish");
                        _self.$router.push("/myOrder")
                    } else {
                        common.$emit('message', suc.data.msg);
                    }
                }, function(err) {
                    common.$emit('close-load');
                    common.$emit('message', err.data.msg);
                })
            }
        }
}
</script>
<style scoped>
.sample_confirm {
    float: left;
    width: 100%;
}

.sample_confirm .content {
    background: #fff;
    margin-top: 10px;
    float: left;
    width: 100%;
    padding: 10px;
}

.sample_confirm .content .total {
    margin-top: 1rem;
    float: left;
    width: 100%;
}

.sample_confirm .fix_bottom {
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

.sample_confirm .page-loadmore-wrapper {
    margin-bottom: 100px;
}
</style>
