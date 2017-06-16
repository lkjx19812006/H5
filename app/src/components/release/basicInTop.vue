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
    background-color: #fff;
}

.breed_name {
    background-color: #fff;
    box-sizing: border-box;
    padding-left: 15px;
    width: 100%;
    .inbox {
        height: 50px;
        border-bottom: 1px solid #E6E6E6;
        display: flex;
        flex-direction: row;
        align-items: center;
        .breed_left {
            font-size: 15px;
            color: #343434;
            width: 70px;
            text-align: left;
        }
        .breed_center {
            flex: 1;
            text-align: left;
            .title {
                width: 100%;
                color: #8E97A1;
                text-align: left;
            }
            input{
                color:#333333;
                opacity:1;
            }
        }
        .img {
            width: 30px;
            img {
                height: 18px;
            }
        }
    }
    .head{
        justify-content:space-between;
        padding-right:15px;
        .left{
            color:#333;
            font-size:17px;
            span{
                color:#FA6705;
                font-size:13px;
            }
        }
        .right{
            display:flex;
            flex-direction:row;
            .time{
                height:19px;
                margin-right:4px;
                img{
                    height:100%;
                }
            }
            span{
                color:#FA6705;
            }
        }
    }
    .last {
        margin-top: 10px;
        border-bottom: none;
    }
}
</style>
<template>
    <div class="basic_top">
        <div class="breed_name">
            <div class="inbox head">
                <!-- <div class="breed_left">品名</div>
                <div class="breed_center">
                    {{obj.breedName}}
                </div> -->
                <div class="left">{{obj.breedName}}<span> ({{obj.need_number}}{{obj.need_unit}})</span></div>
                <div class="right">
                    <div class="time">
                        <img src="/static/icon/times.png">
                    </div>
                    <div>剩余<span>{{obj.duedate | timeDay}}</span>天</div>
                </div>
            </div>
        </div>
        <div class="breed_name" @click="showAction('spec')">
            <div class="inbox">
                <div class="breed_left">规格</div>
                <div class="breed_center">
                    <input type="text" placeholder="请选择您的产品规格" disabled="false" v-model="obj.spec">
                </div>
                <div class="img">
                    <img src="/static/icons/rele-right.png">
                </div>
            </div>
        </div>
        <div class="breed_name the_last" @click="showAction('place')">
            <div class="inbox">
                <div class="breed_left">产地</div>
                <div class="breed_center">
                    <input type="text" placeholder="请选择您的产品规格" disabled="false" v-model="obj.place">
                </div>
                <div class="img">
                    <img src="/static/icons/rele-right.png">
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import common from '../../common/common.js'
import httpService from '../../common/httpService.js'
export default {
    data() {
            return {

            }
        },
        props: {
            obj: {

            }
        },
        methods: {
          showAction(param){
              this.$emit('showAction',param);
          }
        },
        components: {

        },
        created() {

        },
        mounted() {

        }
}
</script>
