<style lang="less" scoped>
.feed_back {}

.feed_back .bg_white {
    background: #f0f0f0;
}

.feed_back .main {
    padding: 2rem 1.5rem 0 1.5rem;
    background: white;
    height: 260px;
    margin-bottom: 1rem;
}

// .feed_back .main textarea {
//     width: 100%;
//     height: 220px;
//     padding: 1.5rem;
//     margin-bottom: 1rem;
//     font-size: 13px;
//     color: #666666;
//     border: 1px solid #ddd;
// }
.feed_back .main p {
    text-align: left;
    font-size: 1rem;
    color: #FF0000;
}

.feed_back .info {
    width: 100%;
    padding: 0 4%;
    float: left;
    background: white;
}

.feed_back .info .info_top {
    float: left;
    width: 100%;
    background: white;
}

.feed_back .info .info_top p {
    float: left;
    height: 50px;
    line-height: 50px;
}

.feed_back .info .info_top input {
    float: right;
    border: none;
    outline: none;
    height: 50px;
    text-align: right;
}

.feed_back .confirm_submit {
    height: 50px;
    width: 100%;
    background-color: #FA6705;
    color: white;
    font-size: 1.7rem;
    text-align: center;
    line-height: 50px;
    position: fixed;
    bottom: 0;
    z-index: 99;
}

.feed_back {
    .main {
        .text {
            width: 100%;
            height: 200px;
            border: 1px solid #ccc;
            margin-bottom: 10px;
            position: relative;
            textarea {
                height: 160px;
                width: 100%;
                border: none;
                padding: 10px;
            }
            .record {
                position: absolute;
                bottom: 10px;
                right: 10px;
            }
            .active {
                color: red;
            }
        }
    }
}
</style>
<template>
    <div class="feed_back">
        <myHeader :param="my_header"></myHeader>
        <div class="bg_white">
            <div class="page-loadmore-wrapper" ref="wrapper" :style="{ height: wrapperHeight + 'px' }">
                <mt-loadmore>
                    <div class="main">
                        <div class="text">
                            <textarea placeholder="请填写您的反馈内容(200字符以内)" v-model="content"></textarea>
                            <div class="record" v-bind:class="{active:show}">
                                <span>{{content_length}}</span> / 200</div>
                        </div>
                        <p>您的反馈对我们至关重要！</p>
                    </div>
                    <div class="info">
                        <div class="info_top info_bottom">
                            <p>姓名</p>
                            <input type="text" placeholder="请输入" v-model="param.name">
                        </div>
                        <div class="info_top">
                            <p>联系方式</p>
                            <input type="text" placeholder="请输入" v-model="param.phone">
                        </div>
                    </div>
                </mt-loadmore>
                <div class="confirm_submit" v-on:click="confirmSubmit">确认提交</div>
            </div>
        </div>
    </div>
</template>
<script>
import common from '../../common/common.js'
import validation from '../../validation/validation.js'
import httpService from '../../common/httpService.js'
import myHeader from '../../components/tools/myHeader'
export default {
    data() {
        return {
            wrapperHeight: '',
            my_header: {
                name: '意见反馈'

            },
            param: {
                content: '',
                name: '',
                phone: ''
            },
            content: '',
            content_length: 0,
            show: false

        }
    },
    components: {
        myHeader
    },
    watch: {
        content: function (newValue, oldValue) {
            console.log(newValue.length);
            let _self = this;
            _self.content_length = newValue.length;
            if (newValue.length >= 200) {
                _self.show = true;
            } else {
                _self.show = false;
            }
        }
    },
    methods: {
        confirmSubmit: function () {
            let _self = this;
            let checkArr = [];
            let checkContent = validation.checkNull(_self.content, '反馈内容为空！');
            checkArr.push(checkContent);
            let checkLookContent = validation.checkLook(_self.content);
            checkArr.push(checkLookContent);
            let checkName = validation.checkNull(_self.param.name, '姓名为空！');
            checkArr.push(checkName);
            let checkLookName = validation.checkLook(_self.param.name);
            checkArr.push(checkLookName);
            let checkPhone = validation.checkPhone(_self.param.phone);
            checkArr.push(checkPhone);

            for (var i = 0; i < checkArr.length; i++) {
                if (checkArr[i]) {
                    common.$emit('message', checkArr[i]);
                    return
                }
            }

            common.$emit('show-load');
            let url = common.addSID(common.urlCommon + common.apiUrl.most);
            let body = {
                biz_module: 'userSuggestService',
                biz_method: 'submitSuggest',
                biz_param: {
                    name: _self.param.name,
                    content: _self.content,
                    phone: _self.param.phone
                }
            };
            body.time = Date.parse(new Date()) + parseInt(common.difTime);
            body.sign = common.getSign('biz_module=' + body.biz_module + '&biz_method=' + body.biz_method + '&time=' + body.time);
            httpService.queryUserInfo(url, body, function (response) {
                common.$emit('close-load');
                if (response.data.code == '1c01') {
                    window.history.go(-1);
                    common.$emit('message', response.data.msg);
                } else {
                    common.$emit('message', response.data.msg);
                }
            }, function (err) {
                common.$emit('close-load');
                common.$emit('message', err.data.msg);
            })
        },
        getInfo() {
            let _self = this;
            common.$emit('show-load');
            let url = common.addSID(common.urlCommon + common.apiUrl.most);
            let body = {
                biz_module: 'userService',
                biz_method: 'queryUserInfo',
                biz_param: {}
            };

            body.time = Date.parse(new Date()) + parseInt(common.difTime);
            console.log(common.difTime);
            console.log(body.time);
            console.log('sssss');
            body.sign = common.getSign('biz_module=' + body.biz_module + '&biz_method=' + body.biz_method + '&time=' + body.time);
            httpService.queryUserInfo(url, body, function (suc) {
                common.$emit('close-load');
                if (suc.data.code == "1c01") {
                    _self.param.name = suc.data.biz_result.fullname;
                    _self.param.phone = suc.data.biz_result.phone;

                } else {
                    console.log('cuowusasdada')
                }


            }, function (err) {
                common.$emit('close-load');
            })
        }
    },
    created() {
        let _self = this;
        if (common.KEY) _self.getInfo();
        common.$emit('informFeedBack', function (item) {
            if (common.KEY) _self.getInfo();
        })
    },
    mounted() {
        this.wrapperHeight = document.documentElement.clientHeight - this.$refs.wrapper.getBoundingClientRect().top;
    }
}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->

