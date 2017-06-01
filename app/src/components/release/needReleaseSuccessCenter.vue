<style lang="less" scoped>
.drug_infor {
    background-color: #fff;
    font-size: 14px;
    color: #000;
    line-height: 20px;
    padding-left: 15px;
    .inbox {
        padding: 15px 0;
        display: flex;
        flex-direction: row;
        border-bottom: 1px solid #E6E6E6;
        .left {
            width: 90px;
        }
        .right {
            flex: 1;
            text-align: left;
        }
    }
}
</style>
<template>
    <div class="drug_infor">
        <div class="inbox">
            <div class="left">求购的品名：</div>
            <div class="right">{{infor.breedName}}</div>
        </div>
        <div class="inbox">
            <div class="left">求购的规格：</div>
            <div class="right">{{infor.spec}}</div>
        </div>
        <div class="inbox">
            <div class="left">求购的产地：</div>
            <div class="right">{{infor.location}}</div>
        </div>
        <div class="inbox">
            <div class="left">求购有效期：</div>
            <div class="right">{{infor.duedate | timeDays}}</div>
        </div>
        <div class="inbox">
            <div class="left">产品的要求：</div>
            <div class="right">{{infor.description}}</div>
        </div>
    </div>
</template>
<script>
import common from '../../common/common.js'
import filters from '../../filters/filters.js'
export default {
    data() {
            return {

            }
        },
        computed: {
            infor() {
                return this.$store.state.release.needRelease
            }
        },
        methods: {

        },

        created() {

        },

}
</script>
