<template>
    <div>
        <mt-header fixed title="固定在顶部">
            <router-link to="/" slot="left">
                <mt-button icon="back">北京</mt-button>
            </router-link>
        </mt-header>
        <div class="page-swipe">
            <mt-swipe :auto="4000">
                <mt-swipe-item>
                    <img src="/static/images/1.jpg">
                </mt-swipe-item>
                <mt-swipe-item>
                    <img src="/static/images/2.jpg">
                </mt-swipe-item>
                <mt-swipe-item>
                    <img src="/static/images/3.jpg">
                </mt-swipe-item>
            </mt-swipe>
        </div>
        <div class="entrance">
            <router-link to="item.router" v-for="item in categoryArr">
                <div>
                    <img v-bind:src="item.image">
                    <p>{{item.name}}</p>
                </div>
            </router-link>
        </div>
        <div class="supply_demond">
            <div class="supply_demond_path" v-for="item in supplyDemandArray">
                <router-link to="item.router">
                    <p>{{item.name}}</p>
                    <img v-bind:src="item.image">
                </router-link>
            </div>
        </div>
        <div class="real_news">
            <div class="news_logo">
                <img src="../../../static/images/neWs.png" >
            </div>
            <div class="news_content">
                <ul>
                    <li v-for="todo in todos">
                        <p class="good_p">{{todo.name}}</p>
                        <p>{{todo.spec}}</p>
                        <p>{{todo.place}}</p>
                        <p class="price_P">{{todo.price}}</p>
                        <p class="phone_p">{{todo.phone}}</p>
                        <p class="way_p">{{todo.time}}</p>
                    </li>
                </ul>
            </div>
        </div>
        <div class="good_price">
            <p>药材指导价</p>
            <p class="more_content"><span>更多</span>&nbsp;<img src="/static/images/right.png"></p>
            <mt-swipe :auto="4000" :showIndicators="false">
                <mt-swipe-item v-for="todo in todos">
                    <div class="good_price_box">
                        <div class="good_price_swipe" id="good_price_swipe_one">
                            <p class="price_swiper_name">{{todo.name}}</p>
                            <div class="price_swiper_div">
                                <p>规格:<span>{{todo.spec}}</span></p>
                                <p>{{todo.price}}</p>
                            </div>
                            <div class="price_swiper_div">
                                <p>规格:<span>{{todo.spec}}</span></p>
                                <p><img src="/static/images/up.png">&nbsp;{{todo.up_price}}</p>
                            </div>
                        </div>
                        <div class="good_price_swipe" id="good_price_swipe_two">
                            <p class="price_swiper_name">{{todo.name}}</p>
                            <div class="price_swiper_div">
                                <p>规格:<span>{{todo.spec}}</span></p>
                                <p>{{todo.price}}</p>
                            </div>
                            <div class="price_swiper_div">
                                <p>规格:<span>{{todo.spec}}</span></p>
                                <p><img src="/static/images/down.png">&nbsp;{{todo.down_price}}</p>
                            </div>
                        </div>
                    </div>
                </mt-swipe-item>
            </mt-swipe>
        </div>
        <div class="recommend">
            <p>推荐资源</p>
            <p class="more_content"><span>更多</span>&nbsp;<img src="/static/images/right.png"></p>
            <ul>
                <li v-for="todo in todos" style="background:url(/static/images/bao.png) no-repeat 0rem center;background-size: 3rem 3rem;">
                    <p class="good_p">{{todo.name}}</p>
                    <p>{{todo.spec}}</p>
                    <p>{{todo.place}}</p>
                    <p class="price_p">{{todo.price}}</p>
                    <p class="phone_p">{{todo.phone}}</p>
                    <p class="way_p">
                        <input type="button" value="我要购买">
                    </p>
                </li>
            </ul>
        </div>
        <div class="urgent">
            <p>紧急求购</p>
            <p class="more_content"><span>更多</span>&nbsp;<img src="/static/images/right.png"></p>
            <ul>
                <li v-for="todo in todos" style="background:url(/static/images/zheng.png) no-repeat 0rem center;background-size: 3rem 3rem;">
                    <p class="good_p">{{todo.name}}</p>
                    <p>{{todo.spec}}</p>
                    <p>{{todo.place}}</p>
                    <p class="price_p">{{todo.price}}</p>
                    <p class="phone_p">{{todo.phone}}</p>
                    <p class="way_p">
                        <input type="button" value="我要购买">
                    </p>
                </li>
            </ul>
        </div>
</template>
<script>
import common from '../../common/common.js'


export default {
    data() {
            return {
                msg: 'Welcome to Your Vue.js App',
                selected: 'tab-container1',
                todos: {},
                drugParam: {
                    show: false
                },
                categoryArr: [{
                    name: '低价资源',
                    router: 'drugResTable',
                    image: '/static/images/lowPrice.png'
                }, {
                    name: '紧急求购',
                    router: 'drugResTable',
                    image: '/static/images/urgentSupply.png'
                }, {
                    name: '市场行情',
                    router: 'marketQuotation',
                    image: '/static/images/market.png'
                }, {
                    name: '药性表',
                    router: 'drugResTable',
                    image: '/static/images/drugType.png'
                }],
                supplyDemandArray: [{
                    name: '我要供应',
                    router: 'mySupply',
                    image: '../../../static/images/mySupply.png'
                }, {
                    name: '我要采购',
                    router: 'myDemond',
                    image: '../../../static/images/myDemond.png'
                }]
            }

        },

        methods: {

        },

        created() {
            let _self = this;

            common.$emit('show-load');
            this.$http.get(common.apiUrl.list).then((response) => {
                console.log(response.data);
                common.$emit('close-load');
                _self.listData = response.data.biz_result;


                let data = response.data.biz_result.list;
                console.log(data);
                this.todos = data;



            }, (err) => {
                console.log(err);
                common.$emit('close-load');
                common.$emit('message', response.data.msg);
            });
        }




}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
ul li {
    list-style: none;
}

.header {
    width: 100%;
    height: 8.534rem;
    background: #FA6705;
    position: relative;
}

.header .select {
    position: absolute;
    left: 1.7066rem;
    border: none;
    background: #FA6705;
    top: 2.73rem;
    color: white;
    outline: none;
    border: 0;
}

.header input {
    width: 42.667rem;
    height: 5.12rem;
    padding-left: 2.56rem;
    border-radius: 5.12rem;
    position: absolute;
    left: 12.799rem;
    top: 1.7066rem;
    outline: none;
    border: 0;
    font-size: 2.048rem;
}

.header .search {
    width: 3.5rem;
    height: 3.5rem;
    position: absolute;
    left: 50.344rem;
    top: 2.5166rem;
}

.entrance {
    background: white;
    position: relative;
    height: 10rem;
    margin: 10px 0;
}

.entrance div {
    width: 25%;
    float: left;
    padding: 5px;
}

.entrance div img {
    max-width: 80px;
}

.entrance div p {
    margin-top: 5px;
    color: #333;
}

.supply_demond {
    display: flex;
    flex-direction: row;
    background: white;
    height: 5.1rem;
    position: relative;
}

.supply_demond div{
    width: 50%;
}

.supply_demond div:first-child{
    border-right: 1px solid #ddd; 
}

.supply_demond p {
    flex: 1;
    text-align: left;
    line-height: 5.1rem;
    box-sizing: border-box;
    padding-left: 0.8rem;
    color: #FA6705;
    font-weight: 500;
    font-size: 1.3rem;
    float: left;
}

.supply_demond img {
    float: left;
    max-width: 80px;
    width: 3rem;
    margin: 1rem 0 1rem 3rem;
}

.real_news {
    position: relative;
    height: 4.2rem;
    margin: 1rem 0;
    background-color: #fff; 
}

.real_news .news_logo{
    text-align: center;
    width: 4.3rem;
    border-right: 1px solid #ddd;
    overflow: hidden;
    float: left;
}

.real_news .news_logo img{
    width: 2.8rem;
    margin: 0.8rem;
}

.real_news .news_content{
    float: left;
    margin-left: 0.3rem;
}

.real_news .news_content ul li {
    display: flex;
    flex-direction: row;
    line-height: 2rem;
    font-size: 1.1rem;
}


.good_price {
    padding: 0.8533rem;
    background: white;
    text-align: left;
    font-size: 1.7067rem;
    height: 28rem;
    box-sizing: border-box;
    margin-bottom: 1.7067rem;
    position: relative;
}

.way_p input {
    height: 4.0984rem;
    width: 10.2396rem;
    background: #EC6817;
    line-height: 4.0984rem;
    color: #ffffff;
    border: 0;
}

.good_price>p {
    font-size: 2.7306rem;
    margin-left: 0.8533rem;
    margin-top: 1.7067rem;
    margin-bottom: 1.7067rem;
}

.good_price_swipe_one .mint-swipe {
    height: 13.6528rem;
}

.price_swiper_name {
    margin-top: 0.8533rem;
    font-size: 2.5599rem;
    margin-bottom: 1.7067rem;
}

.price_swiper_div {
    display: flex;
    flex-direction: row;
}

.price_swiper_div>p {
    flex: 1;
    font-size: 2.5599rem;
    color: gray;
    line-height: 3rem;
}

.price_swiper_div>p img {
    width: 1.2rem;
}

.good_price_box {
    display: flex;
    flex-direction: row;
    margin-top: 0.8533rem;
    margin-left: 0.8533rem;
}

.recommend,
.urgent {
    padding: 0.8533rem;
    background: white;
    text-align: left;
    font-size: 2.0479rem;
    min-height: 10.2396rem;
    box-sizing: border-box;
    margin-bottom: 1.7067rem;
    position: relative;
}

.recommend .more_content,
.urgent .more_content,
.good_price .more_content {
    position: absolute;
    right: 1.877rem;
    top: 1.877rem;
    font-size: 1.877rem;
}

.recommend .more_content img,
.urgent .more_content img,
.good_price .more_content img {
    width: 0.8533rem;
}

.recommend p,
.urgent p {
    margin-bottom: 0.8533rem;
}

.recommend>p,
.urgent>p {
    font-size: 2.73rem;
    margin: 1.7067rem 0 1.7067rem 0.8533rem;
}

.recommend ul,
.urgent ul {
    display: flex;
    flex-direction: column;
}

.recommend ul li,
.urgent ul li {
    flex: 1;
    border-top: 1px solid gray;
    height: 7.509rem;
    font-size: 2.0479rem;
    color: #333333;
    margin: 0 0.8533rem;
}

.recommend ul li {
    display: flex;
    flex-direction: row;
    line-height: 7.509rem;
}

.recommend ul li p {
    flex: 2;
    font-size: 2.0479rem;
    text-align: center;
}

.recommend ul li .price_p,
.recommend ul li .good_p,
.recommend ul li .way_p {
    flex: 3;
}

.recommend ul li .phone_p {
    flex: 5;
}

.recommend ul li,
.urgent ul li {
    padding-left: 5.1198rem;
}

.urgent ul li {
    display: flex;
    flex-direction: row;
    line-height: 7.509rem;
}

.urgent ul li p {
    flex: 2;
    font-size: 2.0479rem;
    text-align: center;
}

.urgent ul li .price_p,
.urgent ul li .good_p,
.urgent ul li .way_p {
    flex: 3;
}

.urgent ul li .phone_p {
    flex: 5;
}

img {
    width: 100%;
}

.mint-swipe {
    overflow: hidden;
    position: relative;
    height: 100%;
}

.mint-swipe-items-wrap {
    position: relative;
    overflow: hidden;
    height: 100%;
}

.mint-swipe-items-wrap div {
    position: absolute;
    transform: translateX(-100%);
    size: 100% 100%;
    display: none;
}

.mint-swipe-items-wrap div:active {
    display: block;
    transform: none;
}

.mint-swipe-indicators {
    position: absolute;
    bottom: 10px;
    left: 50%;
    transform: translateX(-50%);
}

.mint-swipe-indicator {
    size: 8px 8px;
    display: inline-block;
    border-radius: 100%;
    background: #000;
    opacity: 0.2;
    margin: 0 3px;
}

.mint-swipe-indicator:active {
    background: #fff;
}

.page-swipe {
    height: 14rem;
    margin-top: 40px;
}
</style>
