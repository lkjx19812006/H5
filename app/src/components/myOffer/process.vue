<style lang="less" scoped>
.process {
    background-color: #fff;
    padding-top: 12px;
    height: 90px;
    border-bottom: 1px solid #E6E6E6;
    .top {
        display: flex;
        flex-direction: row;
        align-items: center;
        height: 27px;
        .its_ok {
            flex: 1;
            height: 1px;
            background-color: #6fab47;
        }
        .its_ok_two {
            flex: 2;
        }
        .its_nor_ok {
            background-color: #ccc;
        }
        .circle {
            margin: 0 3px;
            height: 27px;
            img {
                height: 100%;
            }
        }
    }
    .bottom {
        display: flex;
        flex-direction: row;
        align-items: center;
        .left{
            flex:3;
        }
        .word {
            flex: 1;
            font-size: 13px;
            color: #6fab47;
            height: 25px;
        }
        .word_default {
            color: #666;
        }
        .red{
            color:red;
            font-size:10px;
        }
    }
}
</style>
<template>
    <div class="process">
        <div class="top">
            <div class="its_ok"></div>
            <div class="circle">
                <img src="/static/icon/offer-detail-ok.png">
            </div>
            <div class="its_ok its_ok_two"></div>
            <div class="circle">
                <img src="/static/icon/offer-detail-ok.png" v-show="todo.accept !== 0">
                <img src="/static/icon/offer-detail-default.png" v-show="todo.accept == '0'">
            </div>
            <div class="its_ok its_ok_two" v-show="todo.accept !== 0"></div>
            <div class="its_ok its_ok_two its_nor_ok" v-show="todo.accept == '0'"></div>
            <div class="circle">
                <img src="/static/icon/offer-detail-ok.png" v-show="todo.accept == '1'">
                <img src="/static/icon/offer-detail-default.png" v-show="todo.accept == '0' || todo.accept == '3'">
                <img src="/static/icon/offer-detail-nor.png" v-show="todo.accept == '2'">
            </div>
            <div class="its_ok its_ok_two its_nor_ok"></div>
            <div class="circle">
                <img src="/static/icon/offer-detail-default.png">
            </div>
            <div class="its_ok its_ok_two its_nor_ok"></div>
            <div class="circle">
                <img src="/static/icon/offer-detail-default.png">
            </div>
            <div class="its_ok its_nor_ok"></div>
        </div>
        <div class="bottom">
            <div class="word">已报价</div>
            <div class="word" v-show="todo.accept !== 0">受理中</div>
            <div class="word word_default" v-show="todo.accept == 0">受理中</div>
            <div class="word" v-show="todo.accept == '1'">已采用</div>
            <div class="word word_default" v-show="todo.accept == '2'">未采用</div>
            <div class="word word_default" v-show="todo.accept == '0' || todo.accept == '3'">待采用</div>
            <div class="word word_default">待寄样</div>
            <div class="word word_default">待成交</div>
        </div>
        <div class="bottom">
            <div class="left"></div>
            <div class="word red">(即将上线)</div>
            <div class="word red">(即将上线)</div>
        </div>
    </div>
</template>
<script>
import common from '../../common/common.js'
export default {
    data() {
        return {

        }
    },
    props: {
        todo:{

        }
    },
    methods: {

    },
    created() {

    }


}
</script>
