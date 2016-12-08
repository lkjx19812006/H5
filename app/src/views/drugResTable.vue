<template>
    <div class="drug_table">
        <mt-header title="药材百科">
            <router-link to="/home" slot="left">
                <mt-button icon="back" @click="iosBack()"></mt-button>
            </router-link>
        </mt-header>
        <div class="search" @click="jumpIosSearch()">
            <input type="text" placeholder="输入你想要的货物资源" disabled="true">
            <img src="/static/images/search.png" class="search_image">
        </div>
        <div class="hot_drug">
            <p>热门药材{{title}}</p>
        </div>
        <div class="drug_show" v-for="(todo,index) in todos">
            <a @click="jump(index)">
                <img src="/static/images/1.jpg">
                <div class="drug_introduce">
                    <p class="drug_name">{{todo.name}}</p>
                    <p class="drug_chinese_name">中文别名：{{todo.chinese_name}}</p>
                    <p class="drug_english_name">英文名：{{todo.english_name}}</p>
                </div>
            </a>
        </div>
        <div class="hot_search_drug">
            <p>热搜药材</p>
            <div class="hot_drugs">
                <p v-for="(todo,index) in hot_drug" @click="jump(index)">{{todo.hot_drug}}</p>
            </div>
        </div>
    </div>
</template>
<script>
import common from '../common/common.js'
export default {

    data() {
            return {
                showHead: true,
                todos: {},
                hot_drug: {},
                title: 'test'
            }
        },
        created() {
            common.$emit('show-load');
            this.$http.get(common.apiUrl.drug_table_list).then((response) => {
                common.$emit('close-load');
                let data = response.data.biz_result.list;
                let hotDrugData = response.data.biz_result.hot_drug_list;
                this.todos = data;
                this.hot_drug = hotDrugData;
            }, (err) => {
                common.$emit('close-load');
                common.$emit('message', response.data.msg);
            });
        },
        methods: {
            jump: function(router) {
                this.$router.push('drugResTableDetail/' + router);
            },
            jumpIosSearch: function() {
                window.jumpSearch();
            },
            getValue: function(param) {
                this.title = param;
            },
            iosBack: function() {
                window.back();
            }
        },
        mounted() {
            let _self = this;
            let type = 'ios';
            let ua = navigator.userAgent.toLowerCase();
            if (/iphone|ipad|ipod/.test(ua)) {
                type = 'ios';
            } else if (/android/.test(ua)) {
                type = 'android'
            }
            setTimeout(function() {
                window.back = function() {
                    try {
                        if (type == 'ios') {
                            window.webkit.messageHandlers.AppModel.postMessage({
                                body: 'iosResult'
                            });
                        } else {
                            window.Android.back();
                        }
                    } catch (e) {
                        console.log(e);
                    }
                }
                window.jumpSearch = function() {
                    try {
                        if (type == 'ios') {
                            window.webkit.messageHandlers.AppModel.postMessage({
                                body: 'ios'
                            });
                        } else {
                            window.Android.jumpSearch();
                        }
                    } catch (e) {
                        console.log(e);
                    }

                }
                window.getValue = function(param) {
                    _self.getValue(param);
                }
                var iframe = document.createElement('iframe')
                iframe.style.visibility = 'hidden'
                iframe.style.width = '1px'
                iframe.style.height = '1px'
                iframe.onload = function() {
                    setTimeout(function() {
                        document.body.removeChild(iframe)
                    }, 0)
                }
                document.body.appendChild(iframe)
            }, 0)
        }
}
</script>
<style scoped>
.drug_table {
    position: relative;
}

.drug_table .search {
    height: 60px;
    background: white;
    position: relative;
    background: #F2F2F2;
}

.drug_table .search input {
    width: 80%;
    height: 30px;
    border-radius: 1.28rem;
    border: 0;
    outline: none;
    padding-left: 5%;
    background: #F1EFEF;
    background: white;
    margin-top: 15px;
}

.drug_table .search_image {
    width: 2rem;
    height: 2rem;
    position: absolute;
    right: 13%;
    top: 18px;
}

.drug_table .hot_drug {
    width: 100%;
    height: 4rem;
}

.drug_table .hot_search_drug {
    width: 100%;
    height: 4rem;
}

.drug_table .hot_drug p,
.hot_search_drug p {
    font-size: 1.19462rem;
    height: 4rem;
    line-height: 4rem;
    text-align: left;
    margin-left: 1.27995rem;
}

.drug_table .drug_show {
    width: 100%;
    height: 13.6528rem;
    padding: 1.27995rem;
    background: white;
    position: relative;
}

.drug_table .drug_show img {
    width: 38%;
    height: 11.0929rem;
    float: left;
}

.drug_table .drug_introduce {
    width: 60%;
    height: 11.0929rem;
    float: left;
    text-align: left;
    padding: 0.64rem 0rem 0.64rem 1.27995rem;
}

.drug_table .drug_introduce p {
    font-size: 1.10929rem;
}

.drug_table .drug_name {
    color: #31323;
}

.drug_table .drug_chinese_name {
    font-size: 1.87726rem;
    color: #666666;
    margin-top: 0.42665rem;
    word-break: break-all;
    line-height: 1.35rem;
}

.drug_table .drug_english_name {
    font-size: 0.93863rem;
    color: #666666;
    margin-top: 0.42665rem;
    word-break: break-all;
    line-height: 1.35rem;
}

.drug_table .hot_drugs {
    width: 100%;
    padding: 1.27995rem 0 1.27995rem 0;
}

.drug_table .hot_drugs p {
    text-align: center;
    float: left;
    border: 1px solid #E7E7E7;
    height: 2.99rem;
    line-height: 2.99rem;
    padding: 0rem 1.27995rem;
    margin-bottom: 1.27995rem;
    font-size: 1.10929rem;
}


/*.short_hot{
  width:10rem;
  height:5.9731rem;
  border:1px solid #E7E7E7;
  float:left;
  margin-bottom: 2.5599rem;
  
}
.long_hot{
  width:15.5rem;
  height:5.9731rem;
  border:1px solid #E7E7E7;
  float:left;
  margin-bottom: 2.5599rem;

}*/
</style>
