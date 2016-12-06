<template>
    <div>
        <mt-header fixed>
            <router-link to="/search" slot="left">
                <mt-button>北京</mt-button>
                <div class="search_div">
                    请输入您想要的货物资源
                    <img src="/static/icons/search.png">
                </div>
            </router-link>
        </mt-header>
        <div class="swipe_height">
            <mt-swipe :auto="4000" :prevent="true">
                <mt-swipe-item v-for="item in imgArray">
                    <div>
                        <img v-bind:src="item.url">
                    </div>
                </mt-swipe-item>
            </mt-swipe>
        </div>
        <div class="entrance">
            <a v-for="item in categoryArr" @click="jump(item.router)">
                <div>
                    <img v-bind:src="item.image">
                    <p>{{item.name}}</p>
                </div>
            </a>
        </div>
        <div class="supply_demond">
            <div class="supply_demond_path" v-for="item in supplyDemandArray" @click="jump(item.router)">
                <p>{{item.name}}</p>
                <img v-bind:src="item.image">
            </div>
        </div>
        <div class="real_news" @click="jump('transaction')">
            <div class="news_logo">
                <img src="../../../static/images/neWs.png">
            </div>
            <div class="news_content">
                <ul id="scrollText">
                    <li v-for="todo in todos">
                        <div>{{todo.name+' '+todo.spec+' '+todo.place+' '+todo.price+' '+todo.phone+' '+todo.time}}</div>
                    </li>
                    <li v-if="todos[0]">
                        <div>{{todos[0].name+' '+todos[0].spec+' '+todos[0].place+' '+todos[0].price+' '+todos[0].phone+' '+todos[0].time}}</div>
                    </li>
                </ul>
            </div>
        </div>
        <div class="bg_white">
            <p class="index_title">药材指导价</p>
            <div class="more_content">
                <p>更多</p><img src="/static/images/right.png">
            </div>
            <mt-swipe :auto="4000" :showIndicators="false" :prevent="true">
                <mt-swipe-item v-for="(todo,index) in todos" v-if="index%2==0">
                    <div class="drug_price_box">
                        <div class="drug_price_swipe">
                            <div class="drug_price_swipe_left">
                                <p class="price_swiper_name">{{todo.name}}</p>
                                <div class="price_swiper_div">
                                    <span>规格:<span>{{todo.spec}}</span></span>
                                    <span class="price_swiper_right_span">{{todo.price}}</span>
                                </div>
                                <div class="price_swiper_div price_swiper_place_div">
                                    <span>产地:<span>{{todo.place}}</span></span>
                                    <span class="price_swiper_right_span"><img src="/static/images/up.png">&nbsp;{{todo.up_price}}</span>
                                </div>
                            </div>
                        </div>
                        <div class=" drug_price_swipe " v-if="todos[index+1]">
                            <div class="drug_price_swipe_right">
                                <p class="price_swiper_name">{{todos[index+1].name}}</p>
                                <div class="price_swiper_div">
                                    <span>规格:<span>{{todos[index+1].spec}}</span></span>
                                    <span class="price_swiper_right_span">{{todos[index+1].price}}</span>
                                </div>
                                <div class="price_swiper_div price_swiper_place_div">
                                    <span>产地:<span>{{todos[index+1].place}}</span></span>
                                    <span class="price_swiper_right_span"><img src="/static/images/up.png">&nbsp;{{todos[index+1].up_price}}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </mt-swipe-item>
            </mt-swipe>
        </div>
        <div class="bg_white">
            <div>
                <p class="index_title">推荐资源</p>
                <router-link to="/lowPriceRes">
                    <div class="more_content">
                        <p>更多</p><img src="/static/images/right.png">
                    </div>
                </router-link>
            </div>
            <div class="list_content">
                <div class="mint-cell cell_class">
                    <div class="mint-cell-wrapper cell_class" v-for="todo in todos">
                        <div class="list_image">
                            <img src="/static/images/bao.png" class="first_image">
                            <img src="/static/images/zheng.png">
                        </div>
                        <div class="list_image">{{todo.name}}</div>
                        <div class="list_font">{{todo.spec}}</div>
                        <div class="list_font">{{todo.place}}</div>
                        <div class="list_font">{{todo.price}}</div>
                        <div class="list_font">
                            <button :type="nativeType" class="mint-button mint-button--primary mint-button--large button_list" @click="jump('resourceDetail/1')">
                                我要购买
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="bg_white">
            <div>
                <p class="index_title">紧急求购</p>
                <router-link to="/urgentNeed">
                <div class="more_content">
                    <p>更多</p><img src="/static/images/right.png">
                </div>
                </router-link>
            </div>
            <div class="list_content">
                <div class="mint-cell cell_class">
                    <div class="mint-cell-wrapper cell_class" v-for="todo in todos">
                        <div class="list_image">
                            <img src="/static/icons/impatient.png" class="first_image">
                            <img src="/static/images/zheng.png">
                        </div>
                        <div class="list_image">{{todo.name}}</div>
                        <div class="list_font">{{todo.spec}}</div>
                        <div class="list_font">{{todo.place}}</div>
                        <div class="list_font">{{todo.time}}</div>
                        <div class="list_font">
                            <button :type="nativeType" class="mint-button mint-button--primary mint-button--large button_list" @click="jump('needDetail/1')">
                                我要报价
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
</template>
<script>
import common from '../../common/common.js'

export default {
    data() {
            return {
                selected: 'tab-container1',
                imgArray: [{
                    url: '/static/images/1.jpg'
                }, {
                    url: '/static/images/2.jpg'
                }, {
                    url: '/static/images/3.jpg'
                }],
                todos: [{
                    "name": "人参",
                    "spec": "统货",
                    "place": "东北",
                    "price": "98.9元/kg",
                    "up_price": "9元/kg",
                    "down_price": "9元/kg",
                    "phone": "15301546832",
                    "time": "12:26"
                }],
                drugParam: {
                    show: false
                },
                categoryArr: [{
                    name: '低价资源',
                    router: 'lowPriceRes',
                    image: '/static/images/lowPrice.png'
                }, {
                    name: '紧急求购',
                    router: 'urgentNeed',
                    image: '/static/images/urgentSupply.png'
                }, {
                    name: '市场行情',
                    router: 'marketQuotation',
                    image: '/static/images/market.png'
                }, {
                    name: '药材百科',
                    router: 'drugResTable',
                    image: '/static/images/drugType.png'
                }],
                supplyDemandArray: [{
                    name: '我要供应',
                    router: 'supplyRelease',
                    image: '../../../static/images/mySupply.png'
                }, {
                    name: '我要采购',
                    router: 'needRelease',
                    image: '../../../static/images/myDemond.png'
                }]
            }

        },
        methods: {
            jump: function(router) {
                console.log(router);
                this.$router.push(router);
            }

        },
        created() {
            let _self = this;
            common.$emit('show-load');
            this.$http.get(common.apiUrl.list).then((response) => {
                common.$emit('close-load');
                let data = response.data.biz_result.list;
                this.todos = data;
            }, (err) => {
                common.$emit('close-load');
                common.$emit('message', response.data.msg);
            });
        },
        computed: {
            drugArray: function() {
                let arr = [];
                for (let i = 0; i++; i < this.todos.length) {
                    if (i % 2 == 0) {
                        arr.push(this.todos[i]);
                    }
                }
                return arr;
            }
        },
        mounted() {

            function startmarquee(lh, speed, delay) {
                var count = 1;
                var t;
                var o = document.getElementById("scrollText");
                var top = 0;
                o.style.marginTop = 0;

                function start() {
                    t = setInterval(scrolling, speed);
                }

                function scrolling() {
                    if (top % lh != 0 || top == 0) {
                        if (count == 6) {
                            o.style.marginTop = 0;
                            clearInterval(t);
                            setTimeout(start, delay);
                            count = 1;
                            top = 0;
                        } else {
                            o.style.marginTop = parseInt(o.style.marginTop) - 1 + "px";
                            top++;
                        }
                    } else {
                        top = 0;
                        count++;
                        clearInterval(t);
                        setTimeout(start, delay);
                    }
                }
                setTimeout(start, delay);
            }
            startmarquee(50, 20, 1500);
        }
}
</script>
<style scoped>
.mint-header {
    background-color: #FA6705;
    border: none;
    color: #fff;
}

ul li {
    list-style: none;
}

.search_div {
    background-color: rgb(255, 255, 255);
    border-radius: 10px;
    height: 30px;
    position: absolute;
    top: 15px;
    left: 62px;
    right: 15px;
    color: #999;
    line-height: 30px;
    text-indent: 1rem;
    font-size: 14px;
}

.search_div img {
    float: right;
    max-height: 20px;
    margin-top: 5px;
    margin-right: 10px;
}

.swipe_height {
    margin-top: 60px;
    height: 15rem;
}

.swipe_height img {
    width: 100%;
}

.entrance {
    background: white;
    position: relative;
    height: 9rem;
    margin: 10px 0;
    max-height: 90px;
}

.entrance div {
    width: 25%;
    float: left;
    padding: 5px;
}

.entrance div img {
    max-width: 50px;
}

.entrance div p {
    margin-top: 5px;
    color: #333;
    font-size: 1.1rem
}

.supply_demond {
    display: flex;
    flex-direction: row;
    background: white;
    height: 5.1rem;
    position: relative;
}

.supply_demond div {
    width: 50%;
}

.supply_demond div:first-child {
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
    height: 50px;
    margin: 1rem 0;
    background-color: #fff;
    overflow: hidden;
}

.real_news .news_logo {
    text-align: center;
    width: 4.3rem;
    border-right: 1px solid #ddd;
    overflow: hidden;
    float: left;
}

.real_news .news_logo img {
    width: 2.8rem;
    margin: 0.8rem;
}

.real_news .news_content {
    margin-left: 0.3rem;
    float: left;
    width: 82%;
}

.real_news .news_content ul li {
    line-height: 14px;
    font-size: 1.2rem;
    padding-top: 10px;
    height: 50px;
}

.real_news .news_content ul li div {
    word-wrap: break-word;
    white-space: normal;
}

.real_news .news_content ul li p {
    margin-left: 0.2rem;
}

.bg_white .index_title {
    font-size: 1.6rem;
    color: #333;
    border-left: 2px solid #FA6705;
    padding: 0 0.8rem;
    margin: 0.8rem 0;
    text-align: left;
    float: left;
}

.bg_white .more_content {
    float: right;
    font-size: 1.1rem;
    margin-right: 0.8rem;
}

.bg_white .more_content p {
    float: left;
    margin-top: 1.1rem;
}

.bg_white .more_content img {
    margin: 1.1rem 0 0 0.5rem;
    width: 0.7rem;
}

.bg_white .mint-swipe {
    height: 8rem;
    width: 100%;
}

.bg_white .drug_price_box {
    width: 100%;
    float: left;
}

.bg_white .drug_price_box .drug_price_swipe {
    width: 50%;
    float: left;
}

.bg_white .drug_price_box .drug_price_swipe_right {
    background-color: #FFF0D7;
    margin: 0.8rem 0.8rem 0.8rem 0.4rem;
    border-radius: 10px;
}

.bg_white .drug_price_box .drug_price_swipe .drug_price_swipe_left {
    margin: 0.8rem 0.4rem 0.8rem 0.8rem;
    background-color: #EDFAD8;
    border-radius: 10px;
}

.bg_white .drug_price_box .drug_price_swipe div .price_swiper_name {
    text-align: left;
    color: #333;
    padding: 0.5rem;
    font-size: 1.3rem;
}

.bg_white .drug_price_box .drug_price_swipe div .price_swiper_div {
    margin: 0;
    padding: 0 0.5rem;
    text-align: left;
    font-size: 1.1rem;
}

.bg_white .drug_price_box .drug_price_swipe div .price_swiper_div img {
    max-height: 1rem;
}

.bg_white .drug_price_box .drug_price_swipe div .price_swiper_place_div {
    padding: 0.3rem 0.5rem 0.5rem 0.5rem;
    font-size: 1.1rem;
}

.bg_white .drug_price_box .drug_price_swipe div .price_swiper_div .price_swiper_right_span {
    float: right;
}

.bg_white .cell_class {
    float: left;
    width: 100%;
    min-height: 40px;
    padding: 0;
}

.bg_white .list_content {
    padding: 0 0.8rem;
    float: left;
    width: 100%;
}

.bg_white .list_content .button_list {
    max-height: 28px;
    font-size: 1.1rem;
    color: #fff;
    background-color: #EC6817;
}

.bg_white .list_content .cell_class .list_font {
    font-size: 1.1rem;
    text-align: center;
    width: 20%;
}

.bg_white .list_content .cell_class .list_image {
    font-size: 1.1rem;
    text-align: center;
    width: 10%;
}

.bg_white .list_content .cell_class .list_image img {
    float: left;
    max-width: 49%;
}

.bg_white .list_content .cell_class .list_image .first_image {
    margin-right: 2%;
}
</style>
