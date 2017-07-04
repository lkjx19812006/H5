<template>
    <div class="account">
        <myHeader :param="head"></myHeader>
        <div class="page-loadmore-wrapper" ref="wrapper" v-bind:class="{killAccScroll:visible}" :style="{ height: wrapperHeight + 'px' }">
            <div class="bbox">
                <div class="image_box">
                    <div class="left">头像<span>(点击更改)</span></div>
                    <div class="empty"></div>
                    <div class="right">
                        <imageUpload :param="param" v-on:postUrl="getUrl"></imageUpload>
                    </div>
                </div>
                <div class="basis">
                    <div class="title">基础信息</div>
                    <div class="box" @click="change(userInfor.fullname,1)">
                        <div class="left">姓名</div>
                        <div class="empty"></div>
                        <div class="right">
                            <div>{{userInfor.fullname}}</div>
                            <img src="/static/images/jiantou.png">
                        </div>
                    </div>
                    <div class="box" @click="open('picker')">
                        <div class="left">生日</div>
                        <div class="empty"></div>
                        <div class="right">
                            <div>{{userInfor.birthday | birthdayTime}}</div>
                            <img src="/static/images/jiantou.png">
                        </div>
                    </div>
                    <div class="box" @click="change(userInfor.gender,2)">
                        <div class="left">性别</div>
                        <div class="empty"></div>
                        <div class="right">
                            <div>{{userInfor.gender}}</div>
                            <img src="/static/images/jiantou.png">
                        </div>
                    </div>
                    <div class="box">
                        <div class="left">电话</div>
                        <div class="empty"></div>
                        <div class="right">
                            <div class="special">{{userInfor.phone}}</div>
                        </div>
                    </div>
                    <div class="box" @click="jumpPerson()">
                        <div class="left">个人认证</div>
                        <div class="empty"></div>
                        <div class="right">
                            <div class="utype" v-if="userInfor.ctype == 0">未认证</div>
                            <div class="utype" v-if="userInfor.ctype == 1">待审核</div>
                            <div class="utype" v-if="userInfor.ctype == 2">已认证</div>
                            <div class="utype" v-if="userInfor.ctype == 3">未通过</div>
                            <img src="/static/images/jiantou.png">
                        </div>
                    </div>
                </div>
                <div class="basis company">
                    <div class="title">企业信息</div>
                    <div class="box" @click="change(userInfor.company,3)">
                        <div class="left">公司</div>
                        <div class="empty"></div>
                        <div class="right">
                            <div>{{userInfor.company}}</div>
                            <img src="/static/images/jiantou.png">
                        </div>
                    </div>
                    <div class="box" @click="change(userInfor.companyShort,4)">
                        <div class="left">简称</div>
                        <div class="empty"></div>
                        <div class="right">
                            <div>{{userInfor.companyShort}}</div>
                            <img src="/static/images/jiantou.png">
                        </div>
                    </div>
                    <div class="box" @click="change(userInfor.companyJob,5)">
                        <div class="left">职位</div>
                        <div class="empty"></div>
                        <div class="right">
                            <div>{{userInfor.companyJob}}</div>
                            <img src="/static/images/jiantou.png">
                        </div>
                    </div>
                    <div class="box" @click="change(userInfor.bizMain,6)">
                        <div class="left">主营品类</div>
                        <div class="empty"></div>
                        <div class="right">
                            <div>{{userInfor.bizMain,6 | filterTxt}}</div>
                            <img src="/static/images/jiantou.png">
                        </div>
                    </div>
                    <div class="box" @click="change(userInfor.invoice,7)">
                        <div class="left">开票信息</div>
                        <div class="empty"></div>
                        <div class="right">
                            <div>{{userInfor.invoice}}</div>
                            <img src="/static/images/jiantou.png">
                        </div>
                    </div>
                    <div class="box" @click="jumpCompany()">
                        <div class="left">企业认证</div>
                        <div class="empty"></div>
                        <div class="right">
                            <div class="utype" v-if="userInfor.utype == 0">未认证</div>
                            <div class="utype" v-if="userInfor.utype == 1">待审核</div>
                            <div class="utype" v-if="userInfor.utype == 2">已认证</div>
                            <div class="utype" v-if="userInfor.utype == 3">未通过</div>
                            <img src="/static/images/jiantou.png">
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <mt-datetime-picker ref="picker" type="date" v-model="pickerValue" :startDate="start" :endDate="end" @confirm="handleConfirm">
        </mt-datetime-picker>
    </div>
</template>
<script>
import common from '../common/common.js'
import httpService from '../common/httpService.js'
import myHeader from '../components/tools/myHeader'
import imageUpload from '../components/tools/imageUpload'
import validation from '../validation/validation.js'
import filters from '../filters/filters.js'
import {
    mapGetters
} from 'vuex'
export default {
    data() {
            return {
                head: {
                    name: '账户信息'
                },
                param: {
                    name: 'intention',
                    index: 0,
                    header_url: '',
                    tall: true,
                    url: '/static/images/my-header.png'
                },
                pickerValue: '',
                start: '',
                end: '',
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
                item: '',
                show: false

            }
        },
        components: {
            imageUpload,
            myHeader
        },
        computed: {
            userInfor() {
                if (this.$store.state.user.userInfor.avatar) {
                    this.param.url = this.$store.state.user.userInfor.avatar;
                } else {
                    this.param.url = '/static/images/my-header.png'
                }
                return this.$store.state.user.userInfor;
            }
        },
        methods: {
            getUrl(param) {
                console.log(param);
                let _self = this;
                this.upDataInfor.avatar = param.url;
                for (var key in _self.upDataInfor) {
                    if (key !== 'avatar') {
                        _self.upDataInfor[key] = _self.userInfor[key]
                    }
                }
                this.$store.dispatch('upDataInfor', this.upDataInfor);
            },
            jumpPerson() {
                let _self = this;
                common.$emit("certification", 1)
                _self.$router.push('/certification');
            },
            jumpCompany() {
                let _self = this;
                common.$emit("companyAuthentication", 1);
                _self.$router.push('/companyAuthentication');
            },
            getTimeStamp(str) {
                str = str.replace(/-/g, '/');
                var date = new Date(str);
                return date.getTime();
            },
            handleConfirm(value) {
                let _self = this;
                _self.upDataInfor.birthday = value.getTime() / 1000;
                //console.log(_self.upDataInfor.birthday)
                for (var key in _self.upDataInfor) {
                    if (key !== 'birthday') {
                        _self.upDataInfor[key] = _self.userInfor[key]
                    }
                }
                this.$store.dispatch('upDataInfor', this.upDataInfor);
            },
            open(picker) {
                this.$refs[picker].open();
            },
            change(val, index) {
                let _self = this;
                let obj = {};
                switch (index) {
                    case 1:
                        obj = {
                            val: val,
                            name: '姓名',
                            type: 'fullname'
                        }
                        break;
                    case 2:
                        obj = {
                            val: val,
                            name: '性别',
                            type: 'gender'
                        }
                        break;
                    case 3:
                        obj = {
                            val: val,
                            name: '公司',
                            type: 'company'
                        }
                        break;
                    case 4:
                        obj = {
                            val: val,
                            name: '简称',
                            type: 'companyShort'
                        }
                        break;
                    case 5:
                        obj = {
                            val: val,
                            name: '职位',
                            type: 'companyJob'
                        }
                        break;
                    case 6:
                        obj = {
                            val: val,
                            name: '主营品类',
                            type: 'bizMain'
                        }
                        break;
                    case 7:
                        obj = {
                            val: val,
                            name: '开票信息',
                            type: 'invoice'
                        }
                        break;
                }
                if (obj.type !== 'bizMain') {
                    common.$emit('postUsers', obj);
                    let str = 'val=' + obj.val + ';name=' + obj.name + ';type=' + obj.type;
                    _self.$router.push('accountRevise/' + str);
                }else{
                    _self.$store.dispatch('getMainBusiness',{
                        router:'/account',
                        main:_self.$store.state.user.userInfor.bizMain
                    });
                    common.$emit('accountTomajorBusiness',this.$store.state.user.userInfor.bizMain)
                    _self.$router.push('/majorBusiness?value='+this.$store.state.user.userInfor.bizMain)
                }
            }
        },
        created() {
            let _self = this;
            _self.$store.dispatch('getUserInfor');
            /*common.$on('getInfo', function(item) {
                if (common.KEY) _self.$store.dispatch('getUserInfor');
            })*/
            _self.start = new Date("1900-01-01");
            _self.end = new Date();
            let type = '';
            let ua = navigator.userAgent.toLowerCase();
            if (/iphone|ipad|ipod/.test(ua)) {
                type = 'ios';
            }
            if (type == 'ios') {
                _self.start = new Date("1900/01/01");
                _self.end = new Date();
            }
        },
        mounted() {
            this.wrapperHeight = document.documentElement.clientHeight - this.$refs.wrapper.getBoundingClientRect().top;
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

.account {
    width: 100%;
    float: left;
    font-size: 12px;
    position: relative;
}

.killAccScroll {
    height: 100%;
    overflow: hidden;
}

.account .bbox {
    float: left;
    width: 100%;
}

.account .image_box {
    width: 100%;
    box-sizing: border-box;
    display: flex;
    flex-direction: row;
    height: 100px;
    line-height: 100px;
    padding: 0 15px;
    background-color: #fff;
}

.account .image_box .empty {
    flex: 1;
}

.account .image_box .left {
    font-size: 14px;
    color: #333;
}

.account .image_box .right {
    width: 60px;
    height: 60px;
    margin-top: 20px;
    border-radius: 50%;
    overflow: hidden;
}

.account .basis {
    width: 100%;
    float: left;
}

.account .company {
    padding-bottom: 40px;
}

.account .basis .title {
    font-size: 16px;
    height: 50px;
    line-height: 49px;
    text-align: left;
    padding: 0 15px;
    font-weight: 600;
    box-sizing: border-box;
}

.account .basis .box {
    width: 100%;
    padding: 0 15px;
    height: 50px;
    line-height: 49px;
    border-top: 1px solid #E5E5E5;
    background-color: #fff;
    display: flex;
    flex-direction: row;
}

.account .basis .box .left {
    font-size: 14px;
    color: #333;
}

.account .basis .box .empty {
    flex: 1;
}

.account .basis .box .right {
    font-size: 13px;
    color: #000;
    display: flex;
    flex-direction: row;
}

.account .basis .box .right .special {
    margin-right: 25px;
}

.account .basis .box .right .utype {
    color: #666;
    opacity: 0.6;
}

.account .basis .box .right>img {
    width: 10px;
    height: 14px;
    margin-top: 17px;
    margin-left: 15px;
}
</style>
