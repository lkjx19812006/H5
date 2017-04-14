<template>
    <div class="test">
        <myHeader :param="my_header"></myHeader>
        <ul>
            <li class="box">
                <div class="left">
                    <img src="/static/images/1.jpg">
                </div>
                <div class="center">
                    <p class="name">
                        五味子五味子五味子五味子五味子五味子五
                        <img src="/static/icons/sample.png">
                    </p>
                    <div class="center_bottom">
                        <p class="spec">规格:统货统货统货统货统货统货统货统货统货统货</p>
                        <p class="location">产地:安徽亳州</p>
                    </div>
                </div>
                <div class="right">
                    <p class="price">10元/公斤公斤公斤公斤公斤公斤公斤</p>
                    <p class="hollow"></p>
                    <p class="num">x3</p>
                </div>
            </li>
        </ul>
    </div>
</template>
<script>
import common from '../common/common.js'
import myHeader from '../components/tools/myHeader'
export default {
    data() {
            return {

                my_header: {
                    name: '测试页面',
                },

            }
        },
        components: {
            myHeader
        },
        methods: {

        },
        created() {

        },
        mounted() {

        }
}
</script>
<style scoped>
.test ul {
    margin-top: 15px;
    padding: 0px 15px;
    background: white;
}

.test .box {
    display: flex;
    flex-direction: row;
    padding: 15px 0px;
    border-bottom: 1px solid #E6E6E6;
}

.test .box .left {
    flex: 23;
}

.test .box .left img {
    width: 100%;
    height: 100%;
}

.test .box .center {
    flex: 24;
    display: flex;
    flex-direction: column;
    padding-left: 10px;
}

.test .box .center>p {
    text-align: left;
    font-size: 14px;
    line-height: 14px;
}

.test .box .center .name {
    flex: 3;
    font-size: 16px;
    line-height: 16px;
    color: #FA6705;
}

.test .box .center .name img {
    height: 16px;
}

.test .box .center .center_bottom {
    height: 2;
    display: flex;
    flex-direction: column;
    text-align: left;
}

.test .box .center .center_bottom>p {
    font-size: 14px;
    line-height: 14px;
}

.test .box .center .center_bottom .spec {
    padding-top: 6px;
    margin-bottom: 6px;
}

.test .box .right {
    flex: 22;
    display: flex;
    flex-direction: column;
}

.test .box .right>p {
    text-align: right;
}

.test .box .right .price {
    font-size: 16px;
    line-height: 16px;
    color: #FA6705;
}

.test .box .right .hollow {
    flex: 1;
}

.test .box .right .num {
    font-size: 14px;
    line-height: 14px;
}
</style>
