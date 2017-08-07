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

.personal {
    .top {
        padding: 25px 15px;
        font-size: 14px;
        color: red;
        text-align: left;
    }
    .next {
        width: 90%;
        margin: 30px auto;
        background-color: #FA6705;
        color: #fff;
        height: 50px;
        border-radius: 25px;
        line-height: 50px;
        font-size: 18px;
    }
}
</style>
<template>
    <div class="personal">
        <myHeader :param="head"></myHeader>
        <div class="page-loadmore-wrapper main" ref="wrapper" :style="{ height: wrapperHeight + 'px' }">
            <div class="top">
                * 请确保您的身份证信息真实有效
            </div>
            <div class="step1">
                <nameAndId :param="param"></nameAndId>
                <div class="next" @click="next()">下一步</div>
            </div>
        </div>
    </div>
</template>
<script>
import common from '../../common/common.js'
import httpService from '../../common/httpService.js'
import myHeader from '../../components/tools/myHeader'
import nameAndId from '../../components/authen/nameAndId'
import imageUpLoad from '../../components/authen/imageUpLoad'
import validation from '../../validation/validation.js'
import filters from '../../filters/filters.js'
import {
    mapGetters
} from 'vuex'
export default {
    data() {
            return {
                head: {
                    name: '个人认证'
                },
                param: {
                    fullname: '',
                    idnumber: ''
                },
            }
        },
        components: {
            myHeader,
            nameAndId,
            imageUpLoad
        },
        computed: {
            userInfor() {
                return this.$store.state.user.userInfor;
            },
        },
        methods: {
            next() {
                let _self = this;
                let checkArr = [];
                let checkName = validation.checkNull(_self.param.fullname,'请输入姓名');
                checkArr.push(checkName);
                let checkId = validation.checkIdCard(_self.param.idnumber);
                checkArr.push(checkId);
                for(var i=0;i<checkArr.length;i++){
                    if(checkArr[i]){
                        common.$emit('message',checkArr[i]);
                        return
                    }
                }
                let val = 'fullname=' + _self.param.fullname + ';' + 'idnumber=' + _self.param.idnumber;
                common.$emit('personStep1To2', _self.param);
                _self.$router.push('/personalStep2?val=' + val);
            }
        },
        created() {

        },
        mounted() {
            this.wrapperHeight = document.documentElement.clientHeight - this.$refs.wrapper.getBoundingClientRect().top;
        }
}
</script>
