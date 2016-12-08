<template>
    <div class="revise_purchase">
        <mt-header title="修改求购">
            <router-link to="/myPurchase" slot="left">
                <mt-button icon="back"></mt-button>
            </router-link>
        </mt-header>
        <div class="good_information">
            <p class="good_infor_header">求购货物信息</p>
            <div class="good_name">
                <p>产品：</p>
                <div>
                    <div class="select">
                        <p>请填写你需要的药材名称</p>
                    </div>
                </div>
            </div>
            <div class="good_spec">
                <p>规格：</p>
                <div>
                    <select >
                        <option>统货</option>
                    </select>
                </div>
            </div>
            <div class="good_place">
                <p>产地：</p>
                <div>
                    <select>
                        <option>上海</option>
                    </select>
                </div>
            </div>
            <div class="good_number">
                <p>数量：</p>
                <div>
                    <input type="text" placeholder="你需要的药材数量" />
                    <p>kg</p>
                </div>
            </div>
            <div class="good_number">
                <p>求购有效期：</p>
                <div>
                    <input type="number" placeholder="30" />
                    <p>天</p>
                </div>
            </div>
        </div>
        <div class="remarks">
            <p class="remarks_header" style="background:url('../../static/images/remarks.png') no-repeat 0 center;background-size:1.11rem 1.11rem;">求购货物信息</p>
            <div class="remarks_content">
                <textarea placeholder="请根据实际情况填写药材资源卖点"></textarea>
            </div>
        </div>
        <div class="contact">
            <p class="contact_header" style="background:url('../../static/images/contact.png') no-repeat 0 center;background-size:1.11rem 1.11rem;">联系方式</p>
            <div class="contact_name">
                <P>姓名：</P>
                <div>
                    <input type="text" placeholder="请输入您的姓名">
                </div>
            </div>
            <div class="contact_phone">
                <P>手机：</P>
                <div>
                    <input type="text" placeholder="请输入您的手机号">
                </div>
            </div>
        </div>
        <div class="confirm" @click="release()">确认修改</div>
    </div>
</template>
<script>
import common from '../common/common.js'
export default {
    data() {
            return {
                selected: '1',
                todos: {}
            }
        },
        methods: {
            release(){
              /*this.$router.push('needReleaseSuccess');*/
              common.$emit('confirm','确定修改','取消修改','确认修改信息后,将等待审核！','确定修改');
            }
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


.need_release {}

input[type="text"],
input[type="submit"],
input[type="reset"],
select,
textarea {
    -webkit-appearance: none;
    border-radius: 0;
}

.revise_purchase .mint-header {
    background-color: white;
    color: #313232;
    border-bottom: 1px solid #C9C9C9;
}

.revise_purchase .good_information,
.remarks,
.contact {
    padding: 1.28rem;
    margin-bottom: 0.8533rem;
    background: white;
}

.revise_purchase .good_information {
    height: 23.9rem;
}

.revise_purchase .contact {
    height: 12.8rem;
    margin-bottom: 10px;
}

.revise_purchase .good_infor_header {
    background: url('../../static/images/information.png') no-repeat 0 center;
    background-size: 1.11rem 1.11rem;
}

.revise_purchase .good_infor_header,
.remarks_header,
.contact_header {
    font-size: 1.2rem;
    color: #FA6705;
    text-align: left;
    padding-left: 1.536rem;
}

.revise_purchase .good_name,
.good_spec,
.good_place,
.good_number,
.contact_name,
.contact_phone {
    height: 2.99rem;
    margin-top: 0.8533rem;
}

.revise_purchase  .good_place select {
    background: url('../../static/images/drop-down.png') no-repeat 13.3rem center;
    background-size: 1.067rem 1.067rem;
    text-align: center;
}

.revise_purchase  .good_spec select {
    background: url('../../static/images/drop-down.png') no-repeat 13.3rem center;
    background-size: 1.067rem 1.067rem;
    text-align: center;
}

.revise_purchase .good_name p,
.good_spec p,
.good_place p,
.good_number p,
.contact_name p,
.contact_phone p,
.contact_name div,
.contact_phone div {
    float: left;
    line-height: 2.99rem;
    font-size: 1.024rem;
    color: #333333;
}

.revise_purchase .contact_name p,
.contact_phone p {
    margin-right: 2.47rem;
}

.revise_purchase .good_name div,
.good_spec div,
.good_place div,
.good_number div {
    float: right;
    position: relative;
}

.revise_purchase .good_name div .select,
.good_spec div select,
.good_place div select,
.contact_name div input,
.contact_phone div input {
    font-size: 1.024rem;
    height: 2.9rem;
    width: 14.847rem;
    text-align: center;
    outline: none;
    border: 1px solid #D2D2D2;
}

.revise_purchase .good_name div .select p {
    height: 2.9rem;
    width: 14.847rem;
    text-align: center;
    font-size: 1.024rem;
    color: #999999;
}

.revise_purchase .good_number div {
    height: 2.9rem;
    width: 14.847rem;
    border: 1px solid #D2D2D2;
}

.revise_purchase .good_number div input {
    outline: none;
    font-size: 1.024rem;
    height: 2.73rem;
    width: 11.178rem;
    text-align: center;
    float: left;
    outline: none;
    border: 0;
}

.revise_purchase .good_number div p {
    height: 2.73rem;
    width: 3.2rem;
    border-left: 1px solid #D2D2D2;
}

.revise_purchase .remarks_content textarea {
    height: 7.68rem;
    width: 92%;
    margin-top: 1.279rem;
    padding: 1.279rem;
    border: 1px solid #D2D2D2;
}

.revise_purchase .confirm {
    width: 100%;
    height: 4.267rem;
    background: #FA6705;
    font-size: 1.536rem;
    color: white;
    line-height: 4.267rem;
}
</style>
