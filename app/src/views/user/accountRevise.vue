<template>
    <div class="account_revise">
        <myHeader :param="head" v-on:postVal="getVal"></myHeader>
        <div class="bbox">
            <div class="single" v-if="head.type == 'fullname'">
                <div class="name">
                    {{head.name}}
                </div>
                <div class="content">
                    <textarea v-model="head.val" class="myfullname"></textarea>
                </div>
            </div>
            <div class="single" v-if="head.type == 'gender'">
                <div class="name">
                    {{head.name}}
                </div>
                <div class="content">
                    <select v-model="head.val">
                        <option>男</option>
                        <option>女</option>
                    </select>
                </div>
            </div>
            <div class="single" v-if="head.type == 'company'">
                <div class="name">
                    {{head.name}}
                </div>
                <div class="content">
                    <input type="text" v-model="head.val">
                </div>
            </div>
            <div class="single" v-if="head.type == 'companyShort'">
                <div class="name">
                    {{head.name}}
                </div>
                <div class="content">
                    <input type="text" v-model="head.val">
                </div>
            </div>
            <div class="single" v-if="head.type == 'companyJob'">
                <div class="name">
                    {{head.name}}
                </div>
                <div class="content">
                    <input type="text" v-model="head.val">
                </div>
            </div>
            <div class="special" v-if="head.type == 'bizMain'">
                <div class="name">
                    {{head.name}}
                </div>
                <div class="content">
                    <textarea v-model="head.val"></textarea>
                </div>
            </div>
            <div class="single" v-if="head.type == 'invoice'">
                <div class="name">
                    {{head.name}}
                </div>
                <div class="content">
                    <select v-model="head.val">
                        <option>增值税发票</option>
                        <option>普通发票</option>
                    </select>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import common from '../../common/common.js'
import httpService from '../../common/httpService.js'
import myHeader from '../../components/tools/accountHead'
import imageUpload from '../../components/tools/imageUpload'
import validation from '../../validation/validation.js'
import filters from '../../filters/filters.js'
import {
    mapGetters
} from 'vuex'
export default {
    data() {
            return {
                head: {
                    val: '',
                    name: '',
                    type: ''
                },
                upDataInfor: {
                    gender: '',
                    fullname: '',
                    phone: '',
                    birthday: '',
                    company: '',
                    companyShort: '',
                    bizMain: '',
                    avatar: '',
                    companyJob: '',
                    invoice: '',
                    userType:'',
                    manageType:''
                },
            }
        },
        components: {
            myHeader
        },
        computed: {
            userInfor() {
                return this.$store.state.user.userInfor;
            }
        },
        methods: {
            getVal(param) {
                let _self = this;
                for (var key in _self.upDataInfor) {
                    if (key !== param.type) {
                        _self.upDataInfor[key] = _self.userInfor[key];
                    } else {
                        _self.upDataInfor[key] = _self.head.val;
                        console.log(14565)
                    }
                }
                //alert(_self.upDataInfor.fullname)
                //校验
                let checkArr = [];
                let checkBizMain = validation.checkNull(_self.upDataInfor.bizMain, '主营品类不能为空！');
                checkArr.push(checkBizMain);
                // let checkName = validation.checkNameTrue(_self.upDataInfor.fullname);
                // checkArr.push(checkName);
                let checkLookcompany = validation.checkLook(_self.upDataInfor.company);
                checkArr.push(checkLookcompany);
                let checkLookcompanyShort = validation.checkLook(_self.upDataInfor.companyShort);
                checkArr.push(checkLookcompanyShort);
                let checkLookbizMain = validation.checkLook(_self.upDataInfor.bizMain);
                checkArr.push(checkLookbizMain);
                for (let i = 0; i < checkArr.length; i++) {
                    if (checkArr[i]) {
                        common.$emit('message', checkArr[i]);
                        return
                    }
                }
                console.log(this.upDataInfor)
                    //console.log(this.upDataInfor, 111)
                this.$store.dispatch('upDataInfor', this.upDataInfor).then(() => {
                    //console.log(this.upDataInfor)
                    window.history.go(-1)
                }), (() => {
                    common.$emit('message', '更新失败');
                })

            }
        },
        created() {
            let _self = this;
            common.$on('postUsers', function(obj) {
                _self.head = obj;
            })
            let id = _self.$route.params.id;
            let arr = id.split(';');

            _self.head.val = arr[0].split('=')[1];
            _self.head.name = arr[1].split('=')[1];
            _self.head.type = arr[2].split('=')[1];

        },
        mounted() {

        }
}
</script>
<style scoped>
input[type="text"],
input[type="submit"],
input[type="reset"],
select,
textarea {
    -webkit-appearance: none;
    border-radius: 0;
}

.account_revise .bbox {
    margin-top: 10px;
}

.account_revise .single {
    width: 100%;
    box-sizing: border-box;
    padding: 0 10px;
    display: flex;
    flex-direction: row;
    background-color: #fff;
    height: 50px;
    line-height: 20px;
    padding-top: 15px;
    font-size: #000;
    font-size: 14px;
    box-sizing: border-box;
}

.account_revise .single .content {
    flex: 1;
    padding-left: 25px;
}

.account_revise .single input,
select,
.myfullname {
    width: 100%;
    outline: none;
    border: 0;
    background-color: #fff;
    line-height: 20px;
    font-size: 14px;
}

.account_revise .single .empty {
    height: 50px;
    padding-left: 25px;
    box-sizing: border-box;
}

.account_revise .single .empty img {
    width: 10px;
    height: 10px;
}

.account_revise .special {
    width: 100%;
    padding: 0 10px;
}

.account_revise .special .name {
    width: 100%;
    text-align: left;
}

.account_revise .special .content {
    width: 100%;
}

.account_revise .special .content textarea {
    width: 100%;
    height: 80px;
    background-color: #fff;
    margin-top: 10px;
    padding: 5px;
}
</style>
