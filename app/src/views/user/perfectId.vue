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

.perfect_id {
    background-color: #F5F5F5;
    position: relative;
    height: 100vh;
    .box {
        background-color: #F5F5F5;
        padding-top: 20px;
        padding-bottom: 30px;
        height: 92vh;
        overflow-y: auto;
    }
    .title_1 {
        padding-top: 20px;
        font-size: 17px;
        color: #0C9E4C;
        line-height: 17px;
    }
    .title_2 {
        font-size: 14px;
        line-height: 14px;
        color: #808080;
        margin-top: 10px;
        margin-bottom: 5px;
    }
    .list {
        margin-top: 36px;
        width: 100%;
        .item{
            padding:0 30px;
            margin-bottom:15px;
        }
        .tbox{
            margin:30px auto;
            width:120px;
            height:120px;
            border-radius:50px;
            background: url('/static/icon/push-button.png') no-repeat;
            background-size:100% 100%;
            line-height:120px;
            font-size:15px;
            color:#000;
        }
        .selected_tbox{
            margin:30px auto;
            width:120px;
            height:120px;
            border-radius:50px;
            background: url('/static/icon/push-button-selected.png') no-repeat;
            background-size:100% 100%;
            line-height:120px;
            font-size:15px;
            color:#fff;
        }
        .inbox {
            height: 36px;
            line-height: 36px;
            color: #000;
            font-size: 15px;
            border: 1px solid #ccc;
            border-radius: 18px;
            background-color: #fff;
        }
        .selected {
            height: 36px;
            line-height: 36px;
            color: #fff;
            font-size: 15px;
            border: 1px solid #ccc;
            border-radius: 18px;
            background-color: #FA6705;
        }
    }
    .footer {
        height: 8vh;
        width: 100%;
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;
        font-size: 15px;
        color: #fff;
        div {
            flex: 1;
            height: 100%;
            line-height: 8vh;
        }
        .back {
            background-color: #FFC600;
        }
        .next {
            background-color: #FA6705;
        }
    }
}
</style>
<template>
    <div class="perfect_id">
        <div class="box">
            <div class="title_1" v-if="type == '1'">我是买方</div>
            <div class="title_1" v-if="type == '2'">我是卖方</div>
            <div class="title_1" v-if="type == '3'">我是买卖方</div>
            <div class="title_2">根据您的身份信息，我们为您做了精准的分类</div>
            <div class="list">
                <div class="item" v-for="(todo,index) in arr" v-if="type == '1'">
                    <div class="inbox" @click="select(todo)" v-bind:class="{selected:todo.show}">
                        {{todo.name}}
                    </div>
                </div>
                <div class="item" v-for="(todo,index) in arr" v-if="type == '2'">
                    <div class="tbox" @click="select(todo)" v-bind:class="{selected_tbox:todo.show}">
                        {{todo.name}}
                    </div>
                </div> 
                <div class="item" v-for="(todo,index) in arr" v-if="type == '3'">
                    <div class="tbox" @click="select(todo)" v-bind:class="{selected_tbox:todo.show}">
                        {{todo.name}}
                    </div>
                </div> 
            </div>
        </div>
        <div class="footer">
            <div class="back" @click="back">返回选择身份</div>
            <div class="next" @click="next">下一步</div>
        </div>
    </div>
</template>
<script>
import common from '../../common/common.js'
import validation from '../../validation/validation.js'
import httpService from '../../common/httpService.js'
export default {
    data() {
            return {
                arr: [],
                manageType:'',
                type:''
            }
        },
        components: {

        },
        created() {
            //console.log(localStorage.getItem('userType'))
            let _self = this;
            _self.type = this.$route.query.type;
            _self.manageType = '';
            this.getHttp();
            common.$on('go_perfectId', function(id) {
                _self.type = id;
                _self.manageType = '';
                _self.getHttp();
            })
        },
        methods: {
            select(todo) {
                let _self = this;
                console.log(22,todo)
                for (var i = 0; i < _self.arr.length; i++) {
                    _self.arr[i].show = false;
                }
                todo.show = true;
                _self.manageType = todo.id;
            },
            back() {
                this.$router.push('/perfectObject')
            },
            next() {
                let _self = this;
                if(!_self.manageType){
                    common.$emit('message','请选择类型');
                    return
                }
                localStorage.setItem('manageType',this.manageType);
                common.$emit('perfectidToMajorBusiness',1)
                this.$router.push('/majorBusiness')
            },
            getHttp() {
                let _self = this;
                common.$emit('show-load');
                let url = common.addSID(common.urlCommon + common.apiUrl.most);
                let body = {
                    biz_module: 'userService',
                    biz_method: 'queryCustomerTypeMap',
                    biz_param: {
                         userType:_self.type
                    }
                };
                body.time = Date.parse(new Date()) + parseInt(common.difTime);
                body.sign = common.getSign('biz_module=' + body.biz_module + '&biz_method=' + body.biz_method + '&time=' + body.time);
                httpService.addAddress(url, body, function(suc) {
                    common.$emit('close-load');
                    let result = suc.data.biz_result.list;
                    if (suc.data.code == '1c01') {
                        for (var i = 0; i < result.length; i++) {
                            result[i].show = false;
                        }
                        _self.arr = result;
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
            // this.wrapperHeight = document.documentElement.clientHeight - this.$refs.wrapper.getBoundingClientRect().top;
            //this.wrapperHeight = window.screen.height - this.$refs.wrapper.getBoundingClientRect().top;
            //alert()
        }
}
</script>
