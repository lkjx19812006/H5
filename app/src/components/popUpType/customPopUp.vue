<style lang="less" scoped>
.black {
    width: 100%;
    height: 100vh;
    position: absolute;
    z-index: 3000;
    background-color: #000;
    top: 0;
    opacity: 0.6;
}

.pop_custom {
    position: absolute;
    width: 288px;
    margin-left: -144px;
    margin-top: -177px;
    left: 50%;
    z-index: 3001;
    top: 50%;
    border-radius: 14px;
    overflow: hidden;
    .custom_box {
        background-color: #fff;
        .custom {
            width: 288px;
        }
    }

    .tbox {
        background-color: #fff;
        padding-bottom: 20px;
        .title {
            font-size: 18px;
            color: #333;
            line-height: 35px;
        }
        .content {
            padding: 0 17px;
            text-indent: 2em;
            text-align: left;
            font-size: 14px;
            color: #666;
            line-height: 25px;
        }
        .call {
            width: 70%;
            border: 1px solid #84bf51;
            margin: 14px auto;
            color: #fff;
            font-size: 17px;
            line-height: 16px;
            padding: 10px 0;
            background-color: #84bf51;
            border-radius: 18px;
        }
        .other {
            background-color: #fff;
            color: #84bf51;
        }
    }
}
</style>
<template>
    <div>
        <div class="pop_custom">
            <div class="custom_box">
                <img src="/static/icon/pop-custom.png" alt="" class="custom">
            </div>
            <div class="tbox">
                <div class="title">
                    客服服务
                </div>
                <div class="content">
                    亲爱的用户, 您好, 我是您的专属客服
                    <span v-show='userInfor.employee <= 100000'>喵喵喵, </span>
                    <span v-show='userInfor.employee > 100000'>{{customInfor.name}}</span>
                    我将全心全意的为您提供满意周到的交易服务！
                </div>
                <div class="call" @click="call">拨打客服电话</div>
                <div class="call other" @click="goFeedBack">意见反馈</div>
            </div>
    
        </div>
        <div class="black">
    
        </div>
    </div>
</template>
<script>
import common from '../../common/common.js'
import httpService from '../../common/httpService.js'
export default {
    data() {
        return {
            phone: common.servicePhone
        }
    },
    props: {
         popshow:{

         }
    },
    computed: {
        customInfor() {
            return this.$store.state.user.customInfor;
        },
        userInfor() {
            return this.$store.state.user.userInfor;
        },
    },
    methods: {
        call() {  
           this.popshow.show = false;
           if(this.userInfor.employee <= 100000) window.location.href = "tel:" + this.phone;
           if(this.userInfor.employee > 100000)window.location.href = "tel:" + this.customInfor.extno;
        },
        goFeedBack(){
            this.popshow.show = false;
            this.$router.push('/feedBack')
        },
        getCustomerPhone() {
            let _self = this;
            console.log(common.urlCommon + common.apiUrl.getDate);
            this.$http.get(common.urlCommon + common.apiUrl.getDate).then((response) => {
                if (response.data.code == '1c01') {
                    console.log(response.data);
                    common.servicePhone = response.data.biz_result.serviceMobile;
                    _self.phone = response.data.biz_result.serviceMobile;
                }
            }, (err) => {
                common.$emit('message', err.data.msg);
            });
        },
    },
    watch: {

    },
    mounted() {

    },
    created() {
        if (!common.servicePhone) this.getCustomerPhone();
    }
}
</script>

