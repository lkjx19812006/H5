<template>
    <div class="account_overview">
        <div class="header">
            <img :src="param.avatar" v-show="param.avatar">
            <img src="/static/images/my-header.png" v-show="!param.avatar">
            <div class="login" v-show='login_show' @click="jump">登录/注册</div>
            <div class="cerifi" v-show='!login_show'>
                <img src="/static/images/personnal-cer.png" class="left_img" v-show="param.utype !== 2">
                <img src="/static/images/personnals-Cer.png" class="left_img" v-show="param.utype == 2">
                <img src="/static/images/company-cer.png" v-show="param.ctype !== 2">
                <img src="/static/images/companys-Cer.png" v-show="param.ctype == 2">
            </div>
            <p class="company-name">{{param.company}}<span v-show="param.fullname">(</span>{{param.fullname}}<span v-show="param.fullname">)</span></p>
            <!-- <p class="company-name">{{param.company}}</p> -->
            <div class="footer">
                <div class="drug_money">
                    <span v-show="show">{{param.normalMoney | normalMoney(param.freezeMoney)}}</span>
                    <span v-show="!show">****</span>
                    <img src="/static/images/open-eyes.png" class="eyes" v-if="show" @click="open">
                    <img src="/static/images/close-eyes.png" class="eyes" v-if="!show" @click="close">
                </div>
                <div class="drug_money">我的药款</div>
            </div>
            <div class="quota">
                <div class="left item">
                    <p v-show="show">{{param.normalMoney | money}}</p>
                    <p v-show="!show">****</p>
                    <p>可用额度</p>
                </div>
                <div class="item">
                    <p v-show="show">{{param.freezeMoney | money}}</p>
                    <p v-show="!show">****</p>
                    <p>冻结额度</p>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import common from '../../common/common.js'
import filters from '../../filters/filters'
import {
    mapGetters
} from 'vuex'
export default {
    data() {
            return {
                login_show: '',
                perfect: {
                    name: '',
                    bizMain: ''
                },
                show: true
            }
        },
        props: {

        },
        computed: {
            param() {
                return this.$store.state.user.userInfor;
            }
        },
        methods: {
            jump() {
                this.$router.push('/login');
            },
            open() {
                this.show = false;
            },
            close() {
                this.show = true;
            }
        },
        created() {
            let _self = this;
            //if (common.KEY) _self.$store.dispatch('getUserInfor');

            if (!common.KEY) {
                _self.login_show = true;
                _self.$store.dispatch('clearUserInfor');
            } else {
                _self.login_show = false;
            }
            common.$on('getInfo', function(item) {
                if (!common.KEY) {
                    _self.login_show = true;
                    _self.$store.dispatch('clearUserInfor');
                } else {
                    _self.login_show = false;

                }
            })

        }

}
</script>
<style scoped>
.account_overview .header {
    height: 280px;
    width: 100%;
    background: url(/static/images/bg.png) no-repeat;
    background-size: 100% 100%;
    margin: 0;
    padding: 0;
    position: relative;
}

.account_overview .header>img {
    margin-top: 2.815rem;
    margin-bottom: 10px;
    width: 5.119rem;
    height: 5.119rem;
    border-radius: 50%;
    overflow: hidden;
}

.account_overview .header .cerifi {
    padding: 0;
    width: 150px;
    height: 20px;
    display: flex;
    flex-direction: row;
    box-sizing: border-box;
    margin: auto;
    margin-bottom: 5px;
}

.account_overview .header .cerifi>img {
    flex: 1;
    width: 70px;
}

.account_overview .header .cerifi>.left_img {
    margin-right: 15px;
}

.account_overview .header>p {
    font-size: 1.279rem;
    line-height: 1.279rem;
    color: #333333;
}

.account_overview .login {
    font-size: 14px;
    width: 80px;
    padding: 3px;
    background: #FA6705;
    border-radius: 3px;
    color: white;
    margin: auto;
}

.account_overview .header .company-name {
    font-size: 14px;
    line-height: 14px;
    color: white;
    margin-top: 10px;
}

.account_overview .header .footer {
    margin-top: 20px;
    font-size: 1.023rem;
    padding: 0 15%;
}

.account_overview .header .footer .eyes {
    position: absolute;
    right: 3px;
    height: 20px;
    width: 20px;
    top: 0px;
}

.account_overview .header .drug_money {
    position: relative;
    padding: 0;
    color: #fff;
    font-size: 14px;
}

.account_overview .header .quota {
    position: absolute;
    bottom: 0;
    width: 100%;
    display: flex;
    bottom: 0px;
    flex-direction: row;
    box-sizing: border-box;
    height: 50px;
}

.account_overview .header .quota .item {
    flex: 1;
    background: rgba(255, 255, 255, .3);
    zoom: 1;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    padding: 6px;
    font-size: 14px;
    line-height: 14px;
}

.account_overview .header .quota .item>p {
    flex: 1;
    color: #fff;
}

.account_overview .header .quota .left {
    margin-right: 2px;
}
</style>
