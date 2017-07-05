<template>
    <div class="content long_search">
        <div class="search_div" v-show="!param.myShow">
            <img src="/static/icons/cart.png" v-show="param.mycart" class="mycart" @click.stop.prevent="jump('/cart')">
            <div class="search_content" v-bind:class="{ search_active: keyword }" v-if="!param.resource">
                <img src="/static/images/search.png" class="search_image" v-show="!keyword">
                <div class="clear" v-show="keyword" @click.stop.prevent="clearWord()"><img src="/static/images/false.png" class="search_image">
                </div>
                <input type="text" v-bind:class="{ search_active: keyword }" placeholder="请输入您想要的货物资源" disabled="true" v-model="keyword">
            </div>
            <!-- 资源 -->
            <div class="search_content special" v-bind:class="{ search_active: keyword }" v-if="param.resource">
                <img src="/static/images/search.png" class="search_image" v-show="!keyword">
                <div class="clear" v-show="keyword" @click.stop.prevent="clearWord()"><img src="/static/images/false.png" class="search_image">
                </div>
                <input type="text" v-bind:class="{ search_active: keyword }" placeholder="请输入您想要的货物资源" disabled="true" v-model="keyword">
            </div>
            <img src="/static/icon/i-red.png" class="red_img" v-if="isRead == '0'">
            <img src="/static/icon/message.png" class="message" @click.stop.prevent="jump('/message')">
        </div>
        <div class="search-div" v-show="param.myShow">
            <div class="search_content" v-bind:class="{ search_active: keyword }">
                <img src="/static/images/search.png" class="search_image" v-show="!keyword">
                <div class="clear" v-show="keyword" @click.stop.prevent="clearWord()"><img src="/static/images/false.png" class="search_image">
                </div>
                <input type="text" v-bind:class="{ search_active: keyword }" placeholder="请输入您想要的货物资源" disabled="true" v-model="keyword">
            </div>
        </div>
    </div>
</template>
<script>
import httpService from '../../common/httpService.js'
import common from '../../common/common.js'
import {
    mapGetters
} from 'vuex'
export default {
    data() {
            return {
                value: ''
            }
        },
        props: {
            keyword: {
                /*type: String,
                default: ''*/
            },
            param: {

            }
        },
        computed: {
            isRead(){
                return this.$store.state.user.isRead;
            }
        },
        methods: {
            clearWord() {
                this.$emit("clearSearch");
            },
            jump(router) {
                if (!common.customerId) {
                    let _self = this;

                    function loadApp() {
                        if(router == '/cart')common.$emit('setParam', 'backRouter', 'lowPriceRes');
                        if(router == '/message')common.$emit('setParam', 'backRouter', 'message');
                        if (common.wxshow) {
                            common.getWxUrl();
                        } else {
                            _self.$router.push('/login');
                        }
                    }
                    common.$emit('confirm', {
                        message: '请先登录',
                        title: '提示',
                        ensure: loadApp
                    });
                    return;
                }
                this.$store.dispatch('getHttp');
                this.$router.push(router)
            }
        }
}
</script>
<style scoped>
.long_search {
    float: left;
    width: 100%;
    position: relative;
}

.long_search .search_div {
    height: 50px;
    width: 100%;
    float: left;
}

.long_search .search-div {
    height: 50px;
    width: 100%;
    float: left;
}

.long_search .search_div .search_active,
.search-div .search_active {
    background-color: #fff !important;
}

.long_search .search_div .search_content,
.search-div .search_content {
    height: 30px;
    margin: 10px 55px 10px 30px;
    border-radius: 10px;
    position: relative;
}

.long_search .search_div .special {
    margin: 10px 55px 10px 55px;
}

.long_search .search_div .search_content {
    background: #fff;
}

.long_search .search_div .mycart {
    height: 24px;
    position: absolute;
    left: 13px;
    top: 13px;
    z-index: 20;
}

.long_search .search_div .message {
    height: 24px;
    position: absolute;
    right: 13px;
    top: 13px;
    z-index: 20;
}

.long_search .search_div .red_img {
    position: absolute;
    width: 9px;
    height: 9px;
    right: 8px;
    top: 12px;
}

.long_search .search-div .search_content {
    background: white;
}

.long_search .search_div .search_content .clear,
.search-div .search_content .clear {
    float: right;
    padding: 0 0 10px 10px;
    margin-right: 10px;
}

.long_search .search_div .search_content input,
.search-div .search_content input {
    height: 30px;
    float: left;
    border: none;
    margin-left: 10px;
}

.long_search .search_div .search_content input {
    background-color: #fff;
}

.long_search .search-div .search_content input {
    background-color: #fff;
}

.long_search .search_div .search_content img,
.search-div .search_content img {
    float: right;
    position: absolute;
    right: 5px;
    max-height: 20px;
    margin: 5px 5px 0 18%;
}
</style>
