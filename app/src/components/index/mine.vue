<template>
    <div class="mine">
        <div class="header" v-for="todo in content">
            <!-- <div class="header_top">
                <div class="header_photo">
                    <img :src="url">
                </div>
                <div class="information">
                    <div class="information_center">
                        <div class="main_content">
                            <p class="name" id="mine_name">{{todo.name}}</p>
                            <p class="sex">
                                <img src="/static/images/woman.png" v-if="todo.gender == ''">
                                <img src="/static/images/woman.png" v-if="todo.gender == '1'">
                                
                            </p>
                        </div>
                        <p class="company">{{todo.company}}</p>
                    </div>
                    <div class="information_right">
                        <p class="money">储值：￥{{todo.money}}</p>
                        <p class="integration">积分：{{todo.integration}}</p>
                    </div>
                </div>
                <router-link to="accountInfo">
                    <img src="/static/images/right-arrow.png" class="header_top_right-arrow">
                </router-link>
            </div>
            <div class="header_bottom">
                <p class="my_service" v-if="todo.customerGender == '0' || todo.customerGender == '1'">{{todo.my_service}}</p>
                <p class="my_service" v-if="todo.customerGender != '0' && todo.customerGender != '1' ">{{todo.my_apply}}</p>
                <p class="his_name" v-if="todo.customerGender == '0' || todo.customerGender == '1'">{{todo.customer}}<span>
                    

                    <img src="/static/images/woman.png" v-if="todo.customerGender == '0'">
                    <img src="/static/images/woman.png" v-if="todo.customerGender == '1'"> 
                </span></p>
                <router-link to="detailsPage">
                    <p class="details" v-if="todo.customerGender == '0' || todo.customerGender == '1'">{{todo.details}}</p>
                </router-link>
            </div> -->
        </div>
        <div class="information">
             <ul>
                 <li>
                     <img src="/static/images/custom-service.png">
                     <p>专属客服</p>
                 </li>
                 <li>
                     <img src="/static/images/address-manage.png">
                     <p>地址管理</p>
                 </li>
                 <li  class="last">
                     <img src="/static/images/my-account.png">
                     <p>我的账户</p>
                 </li>
             </ul>
        </div>
        <div class="all_order">
            <p>全部订单</p>
            <div @click="jump('myOrder')">
                <p>查看全部订单</p>
                <img src="/static/images/right-arrow.png">
            </div>
        </div>
        <div class="entrance">
            <div v-for="(todo,index) in entrance" @click="jumpOrder(index)">
                <img :src="todo.img_src" class="entrance_img">
                <p>{{todo.name}}</p>
            </div>
        </div>
        <div class="my_list">
            <ul>
                <li class="my_list_part  my_list_part_norlast" v-for="(todo,index) in my_list" v-if="index == 0" @click="drugMoney">
                    <img :src="todo.img_src" class="my_list_part_img">
                    <p>{{todo.name}}</p>
                </li>
                <li class="my_list_part  my_list_part_norlast" v-for="(todo,index) in my_list" v-if="index == 1" @click="jump(todo.router)">
                    <img :src="todo.img_src" class="my_list_part_img">
                    <p>{{todo.name}}</p>
                </li>
                <li class="my_list_part" v-for="(todo,index) in my_list" v-if="index == 2" @click="jump(todo.router)">
                    <img :src="todo.img_src" class="my_list_part_img">
                    <p>{{todo.name}}</p>
                </li>
            </ul>
            <ul>
                <li class="my_list_part  my_list_part_norlast" v-for="(todo,index) in my_list" v-if="index > 2 && index <5" @click="jump(todo.router)">
                    <img :src="todo.img_src" class="my_list_part_img">
                    <p>{{todo.name}}</p>
                </li>
                <li class="my_list_part" v-for="(todo,index) in my_list" v-if="index == 5" @click="jump(todo.router)">
                    <img :src="todo.img_src" class="my_list_part_img">
                    <p>{{todo.name}}</p>
                </li>
            </ul>
        </div>
    </div>
</template>
<script>
import common from '../../common/common.js'
import httpService from '../../common/httpService.js'
import imageUpload from '../../components/tools/imageUpload'

export default {
    data() {
            return {
                url: '',
                param: {
                    name: 'intention',
                    index: 0
                },
                content: [{
                    name: '扬帆',
                    company: '康美药业',
                    money: '31232.89',
                    integration: '1223',

                    customer: '余鹏飞',
                    customerGender: '',
                    my_service: '我的专属客服',
                    details: '点击详情',
                    gender: '',
                    my_apply: '申请专属客服'
                }],
                entrance: [{
                    name: '待审核',
                    router: '',

                    his_name: '余鹏飞',
                    my_service: '我的专属客服',
                    details: '点击详情',
                    img_src: '/static/images/woman.png'
                }],
                entrance: [{
                    name: '待确认',
                    router: 'myOrder',

                    img_src: '/static/icons/All-orders.png'
                }, {
                    name: '待付款',
                    router: '',
                    img_src: '/static/icons/Pending-payment.png'
                }, {
                    name: '待发货',
                    router: '',
                    img_src: '/static/icons/To-be-shipped.png'
                }, {
                    name: '待收货',
                    router: '',
                    img_src: '/static/icons/Receipt-of-goods.png'
                }],
                my_list: [{ //         
                    name: '我的药款',
                    img_src: '/static/icons/I-Yaokuan.png'
                }, {
                    name: '我的资源',
                    router: 'myResource',
                    img_src: '/static/icons/My-resources.png'
                }, {
                    name: '我的采购',
                    router: 'myPurchase',
                    img_src: '/static/icons/My-purchase.png'
                }, {
                    name: '我的报价',
                    img_src: '/static/icons/My-offer.png'
                }, {
                    name: '我的关注',
                    router: 'myAttention',
                    img_src: '/static/icons/My-concern.png'
                }, {
                    name: '设置',
                    router: 'mySet',
                    img_src: '/static/icons/Set-up.png'
                }]
            }
        },
        components: {
            imageUpload
        },
        methods: {
            jumpOrder(index) {
                let _self = this;
                var index = index + 1;
                common.$emit('mineToOrder', index);
                _self.$router.push('myOrder');
            },
            salesmanData() {
                let _self = this;
                common.$emit('show-load');
                let otherurl = common.addSID(common.urlCommon + common.apiUrl.most);
                let otherbody = {
                    biz_module: 'userService',
                    biz_method: 'queryEmployeeInfo',
                    version: 1,
                    time: 0,
                    sign: '',
                    biz_param: {}
                };
                otherbody.time = Date.parse(new Date()) + parseInt(common.difTime);
                otherbody.sign = common.getSign('biz_module=' + otherbody.biz_module + '&biz_method=' + otherbody.biz_method + '&time=' + otherbody.time);
                httpService.queryEmployeeInfo(otherurl, otherbody, function(suc) {
                    common.$emit('close-load');
                    if (suc.data.code = "1c01") {
                        console.log(suc.data.biz_result);
                        _self.content[0].customer = suc.data.biz_result.name;
                        _self.content[0].customerGender = suc.data.biz_result.gender;
                        common.customerId = suc.data.biz_result.id;
                    } else {
                        common.$emit('message', suc.data.msg);
                    }
                }, function(err) {
                    common.$emit('close-load');
                    common.$emit('message', err.data.msg);
                })
            },
            getHttp() {
                let _self = this;
                common.$emit('show-load');
                let url = common.addSID(common.urlCommon + common.apiUrl.most);
                let body = {
                    biz_module: 'userService',
                    biz_method: 'queryUserInfo',
                    version: 1,
                    time: 0,
                    sign: '',
                    biz_param: {}
                };
                body.time = Date.parse(new Date()) + parseInt(common.difTime);
                body.sign = common.getSign('biz_module=' + body.biz_module + '&biz_method=' + body.biz_method + '&time=' + body.time);
                httpService.queryUserInfo(url, body, function(suc) {
                    common.$emit('close-load');
                    if (suc.data.code = "1c01") {
                        _self.content[0].name = suc.data.biz_result.name;
                        _self.content[0].company = suc.data.biz_result.companyShort;
                        _self.content[0].money = suc.data.biz_result.normalMoney;
                        _self.content[0].integration = suc.data.biz_result.score;
                        _self.content[0].gender = suc.data.biz_result.gender;
                        _self.url = suc.data.biz_result.avatar;
                    } else {
                        common.$emit('message', suc.data.msg);
                    }
                }, function(err) {
                    common.$emit('close-load');
                    common.$emit('message', err.data.msg);
                })
            },
            getUrl(param) {},
            drugMoney: function() {
                common.$emit('confirm', '去下载app', '再考虑考虑？');
            },
            jump: function(router) {
                this.$router.push(router);
            }
        },
        created() {
            let _self = this;
            _self.getHttp();
            _self.salesmanData();
            common.$on("toMine", function(obj) {
                _self.getHttp();
                _self.salesmanData();
            })
        }
}
</script>
<style scoped>
.mine {
    background: #F0F0F0;
}

.mine .header {
    height: 16.64rem;
    width: 100%;
    background: url(/static/images/bg.png) no-repeat;
}

/*.mine .header_top {
    width: 88%;
    height: 6.4rem;
    margin-left: 6%;
    position: relative;
}

.mine .header_photo {
    background: #FFD779;
    width: 6.4rem;
    height: 6.4rem;
    border-radius: 50%;
    margin-right: 4%;
    float: left;
    border: 1px solid red;
    position: absolute;
    z-index: 200000;
    overflow: hidden;
}

.mine .header_photo img {
    width: 100%;
    height: 100%;
}

.mine .information {
    width: 65.4%;
    height: 6.4rem;
    padding: 1.38rem 0;
    display: flex;
    flex-direction: row;
    font-size: 1.024rem;
    position: absolute;
    left: 35%;
}

.mine .information_center {
    flex: 4;
    display: flex;
    flex-direction: column;
    text-align: left;
}

.mine .information_center div {
    flex: 1;
}

.mine .company {
    flex: 1;
}

.mine .information_right {
    display: flex;
    flex-direction: column;
    text-align: left;
    flex: 6;
}

.mine .money {
    flex: 1;
}

.mine .integration {
    flex: 1;
}

#mine_name {
    font-size: 1.365rem;
    color: #FB761E;
    float: left;
}

.mine .sex img {
    height: 1.024rem;
    margin-left: 3%;
    margin-top: 0.1705rem;
    float: left;
}

.mine .right-arrow {
    width: 1.024rem;
    height: 1.024rem;
    margin-top: 1.308rem;
}

.mine .header_bottom {
    width: 85%;
    height: 1.27995rem;
    line-height: 1.27995rem;
    display: flex;
    flex-direction: row;
    font-size: 1.024rem;
    float: right;
    margin-right: 6%;
    margin-top: 1.96rem;
}

.mine .my_service {
    flex: 47;
    text-align: left;
}

.mine .his_name {
    flex: 26;
    text-align: left;
}

.mine .his_name img {
    height: 1.024rem;
    position: absolute;
    margin-left: 0.5rem;
}

.mine .details {
    flex: 27;
    text-align: right;
}*/
.mine .information{
    padding: 0.64rem 0;
    height:4.2665rem;
}
.mine .information ul{
    display: flex;
    flex-direction:row;
}
.mine .information ul li{
    flex:1;
    border-right:1px solid #e6e6e6;
}
.mine .entrance {
    display: flex;
    flex-direction: row;
    height: 6.06rem;
    background: white;
    width: 100%;
    margin:0;
}

.mine .all_order {
    height: 3.6rem;
    line-height: 3.6rem;
    background: white;
    border-bottom: 1px solid #E0E0DF;
    margin:0;
}

.mine .all_order>p {
    float: left;
    font-size: 1.3rem;
    color: #333333;
    margin-left: 4%;
}

.mine .all_order>div {
    float: right;
    font-size: 1.3rem;
    color: #999999;
    margin-right: 4%;
}

.mine .all_order>div>p {
    float: left;
    margin-right: 0.5rem;
}

.mine .all_order>div img {
    float: right;
    width: 1.024rem;
    height: 1.024rem;
    margin-top: 1.288rem;
}

.mine .entrance div {
    flex: 1;
    box-sizing: border-box;
    height: 6.06rem;
    position: relative;
}

.mine .information_center div {
    flex: 1;
}

.mine .company {
    flex: 1;
}

.mine .information_right {
    display: flex;
    flex-direction: column;
    text-align: left;
    flex: 6;
}

.mine .money {
    flex: 1;
}

.mine .integration {
    flex: 1;
}

#mine_name {
    font-size: 1.365rem;
    color: #FB761E;
    float: left;
}

.mine .sex img {
    height: 1.024rem;
    margin-left: 3%;
    margin-top: 0.1705rem;
    float: left;
}

.mine .right-arrow {
    width: 1.024rem;
    height: 1.024rem;
    margin-top: 1.308rem;
}

.mine .header_bottom {
    width: 85%;
    height: 1.27995rem;
    line-height: 1.27995rem;
    display: flex;
    flex-direction: row;
    font-size: 1.024rem;
    float: right;
    margin-right: 6%;
    margin-top: 1.96rem;
}

.mine .my_service {
    flex: 47;
    text-align: left;
}

.mine .his_name {
    flex: 26;
    text-align: left;
}

.mine .details {
    flex: 27;
    text-align: right;
}

.mine .entrance {
    display: flex;
    flex-direction: row;
    height: 6.06rem;
    margin-top: 0.8533rem;
    background: white;
    margin:0;
}

.mine .entrance div {
    flex: 1;
    box-sizing: border-box;
    height: 6.06rem;
    position: relative;
}

.mine .entrance div p {
    font-size: 1.109rem;
    color: #333333;
    margin-top: 4rem;
}

.mine .my_list {
    width: 100%;
    height: 17.066rem;
    display: flex;
    flex-direction: column;
    margin-top: 0.8533rem;
}

.mine .my_list ul {
    width: 100%;
    height: 17.066rem;
    flex: 1;
    margin-bottom: 0.213rem;
    display: flex;
    flex-direction: row;
}

.mine .my_list ul li {
    flex: 1;
    box-sizing: border-box;
    padding-top: 5.46rem;
    position: relative;
}

.mine .my_list ul li p {
    font-size: 1.024rem;
    color: #333333;
}

.mine .my_list_part_norlast {
    margin-right: 0.213rem;
}

.mine .entrance_img {
    position: absolute;
    width: 2.048rem;
    height: 2.048rem;
    margin-left: -1.024rem;
    left: 50%;
    top: 1.5rem;
}

.mine .my_list_part {
    background: white;
}

.mine .my_list_part_img {
    position: absolute;
    width: 2.5599rem;
    height: 2.5599rem;
    margin-left: -1.28rem;
    left: 50%;
    top: 2.133rem;
}

.mine .header_top_right-arrow {
    position: absolute;
    width: 1.024rem;
    height: 1.024rem;
    right: 0;
    top: 2.688rem;
}
</style>
