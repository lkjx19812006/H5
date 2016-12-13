<template>
    <div class="mine">
        <div class="header" v-for="todo in content">
            <div class="header_top">
                <div class="header_photo"></div>
                <div class="information">
                    <div class="information_center">
                        <div class="main_content">
                            <p class="name" id="mine_name">{{todo.name}}</p>
                            <p class="sex"><img :src="todo.img_src"></p>
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
                <p class="my_service">{{todo.my_service}}</p>
                <p class="his_name">{{todo.his_name}}</p>
                <router-link to="detailsPage">
                    <p class="details">{{todo.details}}</p>
                </router-link>
            </div>
        </div>
        <div class="entrance">
            <div v-for="todo in entrance" @click="jump(todo.router)">
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
export default {
    data() {
            return {
                content: [{
                    name: '扬帆',
                    company: '康美药业',
                    money: '31232.89',
                    integration: '1223',
                    his_name: '余鹏飞',
                    my_service: '我的专属客服',
                    details: '点击详情',
                    img_src: '/static/images/woman.png'
                }],
                entrance: [{
                    name: '全部订单',
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
        methods: {
            drugMoney: function() {
                common.$emit('confirm', '去下载app', '再考虑考虑？');
            },
            jump: function(router) {
                console.log(router);
                this.$router.push(router);
            }
        },
        created() {
            let url = common.addSID(common.urlCommon + common.apiUrl.most);
            let body = {
                biz_module: 'userService',
                biz_method: 'queryUserInfo',
                version: 1,
                time: 0,
                sign: '',
                biz_param: {}
            };
            console.log(common.difTime);
            body.time = Date.parse(new Date()) + parseInt(common.difTime);
            body.sign = common.getSign('biz_module=' + body.biz_module + '&biz_method=' + body.biz_method + '&time=' + body.time);
            if (common.KEY) {
                common.$emit('show-load');
                httpService.queryUserInfo(url, body, function(suc) {
                    common.$emit('close-load');
                }, function(err) {
                    common.$emit('close-load');
                })
            }
        }
}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.mine {
    background: #F0F0F0;
}

.mine .header {
    height: 17.537rem;
    width: 100%;
    background: #cccccc;
    padding-top: 3.7rem;
}

.mine .header_top {
    width: 88%;
    height: 6.4rem;
    /*background:url(/static/images/right-arrow.png) right center no-repeat;background-size:1.024rem 1.024rem;*/
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
}

.mine .information {
    width: 65.4%;
    height: 6.4rem;
    padding: 1.38rem 0;
    display: flex;
    flex-direction: row;
    font-size: 1.024rem;
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

.mine .details {
    flex: 27;
    text-align: right;
}

.mine .entrance {
    display: flex;
    flex-direction: row;
    height: 7.253rem;
    margin-top: 0.8533rem;
    background: white;
}

.mine .entrance div {
    flex: 1;
    box-sizing: border-box;
    height: 7.253rem;
    /*padding-top:4.48rem;*/
    position: relative;
}

.mine .entrance div p {
    font-size: 1.109rem;
    color: #333333;
    margin-top: 4.48rem;
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
    top: 1.621rem;
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
