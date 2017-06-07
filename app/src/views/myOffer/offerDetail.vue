<style lang="less" scoped>
</style>
<template>
    <div class="content need_detail">
        <myHeader :param="param"></myHeader>
    </div>
</template>
<script>
import common from '../../common/common.js'
import httpService from '../../common/httpService.js'
import myHeader from '../../components/tools/myHeader'
import filters from '../../filters/filters'
export default {
    data() {
            return {
                obj: '',
                param: {
                    name: '报价详情',
                    topissue: true,
                },
            }
        },
        components: {
            myHeader,
        },
        methods: {
            getHttp(id) {
                let _self = this;
                common.$emit('show-load');
                let url = common.urlCommon + common.apiUrl.most;
                let body = {
                    biz_module: 'intentionService',
                    biz_method: 'queryIntentionInfo',
                    biz_param: {
                        id: id
                    }
                }
                if (common.KEY) {
                    url = common.addSID(common.urlCommon + common.apiUrl.most);
                    body.version = 1;
                    body.time = Date.parse(new Date()) + parseInt(common.difTime);
                    body.sign = common.getSign('biz_module=' + body.biz_module + '&biz_method=' + body.biz_method + '&time=' + body.time);
                }
                httpService.myAttention(url, body, function(suc) {
                    common.$emit('close-load');
                    let result = suc.data.biz_result;
                    let shareData = common.shareParam;
                    if (suc.data.code == '1c01') {
                        _self.obj = result;
                        shareData.title = "【紧急求购】" + result.breedName + "-上【药材买卖网】你报价我就要了！";
                        shareData.desc = result.breedName + ',规格:' + result.spec + ',需要' + result.number + result.unit + '要求：' + result.quality + '。--买卖药材就上药材买卖网！';
                        shareData.link = window.location.href;
                        common.share(shareData);
                    } else {
                        common.$emit('message', suc.data.msg);
                    }
                }, function(err) {
                    common.$emit('close-load');
                    common.$emit('message', err.data.msg);
                })
            }
        },
        mounted() {

        },
        created() {
            let _self = this;
            let id = _self.$route.params.id;
            _self.getHttp(id);
            common.$on("needToDetail", function(item) {
                _self.getHttp(item);
            });
            common.$on('getInfo', function(item) {
                _self.getHttp(id);
            })
        }


}
</script>
