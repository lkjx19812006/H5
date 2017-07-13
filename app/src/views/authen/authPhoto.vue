<style lang="less" scoped>
input[type="text"],
input[type="submit"],
input[type="reset"],
select,
textarea {
    -webkit-appearance: none;
    border-radius: 0;
}

input {
    border: none;
}

.auth_photo {
    .person {
        width: 100%;
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        justify-content: space-between;
        .box {
            flex:1;
            .image {
                padding: 15px 0;
                img {
                    width: 150px;
                    height: 115px;
                }
            }
        }
    }
}
</style>
<template>
    <div class="auth_photo">
        <myHeader :param="head"></myHeader>
        <div class="page-loadmore-wrapper main" ref="wrapper" :style="{ height: wrapperHeight + 'px' }">
            <div class="person">
                <div class="box" v-for="todo in photo">
                    <div class="image">
                        <img :src="todo.path">
                    </div>
                    <div class="title">{{todo.category | selectPhoto}}</div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import common from '../../common/common.js'
import httpService from '../../common/httpService.js'
import myHeader from '../../components/tools/myHeader'
import validation from '../../validation/validation.js'
import filters from '../../filters/filters.js'
import {
    mapGetters
} from 'vuex'
export default {
    data() {
            return {
                head: {
                    name: '证件照片'
                },
            }
        },
        components: {
            myHeader
        },
        computed: {
            userInfor() {
                return this.$store.state.user.userInfor;
            },
            photo() {
                return this.$store.state.authen.photoList;
            }
        },
        methods: {
            getHttp() {
                let _self = this;
                common.$emit('show-load');
                let url = common.urlCommon + common.apiUrl.most;
                let body = {
                    biz_module: 'userService',
                    biz_method: 'queryUserAuthenImage',
                    biz_param: {
                        type: 0
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
                    //common.$emit('message', suc.data.msg);
                    if (suc.data.code == '1c01') {
                        _self.$store.dispatch('getPhoto', suc.data.biz_result.list)
                    }
                }, function(err) {
                    common.$emit('close-load');
                    common.$emit('message', err.data.msg);
                })
            },
        },
        created() {
            this.getHttp();
        },
        mounted() {
            this.wrapperHeight = document.documentElement.clientHeight - this.$refs.wrapper.getBoundingClientRect().top;
        }
}
</script>
