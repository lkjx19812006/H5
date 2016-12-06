<template>
    <div class="whole need_release_success">
        <mt-header title="发布成功">
            <router-link to="/home" slot="left">
                <mt-button icon="back"></mt-button>
            </router-link>
        </mt-header>
        <div class="source_information">
            <resourceInformation :information='information'></resourceInformation>
        </div>
        <div class="source_information">
            <div class="bg_white">
                <div class="title">
                    <p class="index_title">备注</p>
                </div>
                <div class="more_content">
                    <p>哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈</p>
                </div>
            </div>
        </div>
        <div class="source_information">
            <contactType :information='person'></contactType>
        </div>
        <div class="source_information">
            <auditProgress :auditProgress='auditProgress'></auditProgress>
        </div>
        <div class="bottom">
            <button class="mint-button mint-button--primary mint-button--large">继续放布</button>
            <button class="mint-button mint-button--primary mint-button--large">查看匹配供应信息</button>
        </div>
    </div>
</template>
<script>
import common from '../common/common.js'
import resourceInformation from '../components/tools/resourceInformation'
import contactType from '../components/tools/contactType'
import auditProgress from '../components/tools/auditProgress'
export default {
    data() {
            return {
                todos: {},
                information: {
                    "name": "人参",
                    "spec": "统货",
                    "place": "东北",
                    "price": "98.9元/kg",
                    "sendPlace": "上海",
                    "number": "100kg"
                },
                person: {
                    name: '杨帆',
                    phone: '15123485654'
                },
                auditProgress: '1'
            }
        },
        methods: {

        },
        components: {
            resourceInformation,
            contactType,
            auditProgress
        },
        created() {
            common.$emit('show-load');
            this.$http.get(common.apiUrl.drug_information_list).then((response) => {
                common.$emit('close-load');
                let data = response.data.biz_result.list;
                this.todos = data;
            }, (err) => {
                common.$emit('close-load');
                common.$emit('message', response.data.msg);
            });
        }
}
</script>
<style scoped>
.whole {
    position: relative;
    background: #F1EFEF;
}

.need_release_success {
    position: relative;
    background: #F1EFEF;
    margin-bottom: 60px;
    float: left;
    width: 100%;
}

.need_release_success .source_information {
    margin-top: 0.8rem;
    float: left;
    width: 100%;
}

.need_release_success .source_information .bg_white {
    padding: 0.8rem 0;
}

.need_release_success .source_information .bg_white .title {
    float: left;
    width: 100%;
}

.need_release_success .source_information .bg_white .index_title {
    font-size: 1.6rem;
    color: #FA6705;
    border-left: 2px solid #FA6705;
    padding: 0 0.8rem;
    margin: 0.8rem 0 0 0;
    text-align: left;
    float: left;
    width: 100%;
}

.need_release_success .source_information .bg_white .more_content {
    font-size: 1.1rem;
    float: left;
    width: 100%;
    padding: 0.8rem 0.8rem;
    text-align: left;
    white-space: normal;
    word-break: break-all;
    text-indent: 2.2rem;
}

.need_release_success .bottom {
    position: fixed;
    bottom: 0;
    width: 100%;
}

.need_release_success .bottom button {
    float: left;
    width: 50%;
    background-color: #EC6817;
    font-size: 1.2rem;
}
</style>
