<template>
    <div class="content telAndAttention">
        <button class="mint-button mint-button--primary mint-button--normal small_button">
            <img src="/static/icons/tel.png">
            <p>电话</p>
        </button>
        <button v-if="obj.isAttention" class="mint-button mint-button--primary mint-button--normal small_button" v-on:click="myAttention(0)">
            <img src="/static/icons/follow.png">
        </button>
        <button v-if="!obj.isAttention" class="mint-button mint-button--primary mint-button--normal small_button" v-on:click="myAttention(1)">
            <img src="/static/icons/unfollow.png">
        </button>
    </div>
</template>
<script>
import common from '../../common/common.js'
import httpService from '../../common/httpService.js'
export default {
        props: {
            obj: {}
        },
        methods: {
            myAttention(type) {
                if (!common.customerId) {
                    return common.$emit('message', '请先登录！');
                }
                let _self = this;
                common.$emit('show-load');
                let url = common.addSID(common.urlCommon + common.apiUrl.most);
                let body = {
                    biz_module: 'userService',
                    biz_method: 'userAttention',
                    version: 1,
                    time: 0,
                    sign: '',
                    biz_param: {
                        intentionId: _self.obj.id,
                        type: type,
                        breedName: _self.obj.breedName,
                        intentionType: _self.obj.type
                    }
                };
                body.time = Date.parse(new Date()) + parseInt(common.difTime);
                body.sign = common.getSign('biz_module=' + body.biz_module + '&biz_method=' + body.biz_method + '&time=' + body.time);
                httpService.addAddress(url, body, function(suc) {
                    common.$emit('close-load');
                    if (suc.data.code == '1c01') {
                        common.$emit("informResAttention", 'refurbish');
                        if (type) {
                            _self.obj.isAttention = 1;
                        } else {
                            _self.obj.isAttention = 0;
                        }
                    } else {
                         common.$emit('message', suc.data.msg);
                    }
                   
                }, function(err) {
                    common.$emit('close-load');
                    common.$emit('message', err.data.msg);
                })
            },
            getTel(){

            }
        },
        created() {

        }
}
</script>
<style scoped>
.telAndAttention {
    float: left;
    width: 100%;
}

.telAndAttention  .small_button {
    width: 50%;
    float: left;
    background: #EEEEEE;
    border: 1px solid #ddd;
}

.telAndAttention  .small_button img {
    max-height: 13px;
}

.telAndAttention  .small_button p {
    font-size: 10px;
    color: #333;
}
</style>
