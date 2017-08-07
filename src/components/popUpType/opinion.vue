<style lang="less" scoped>
.opinion {
    width: 254px;
    background-color: #fff;
    border-radius: 10px;
    .title {
        padding: 18px;
        font-szie: 15px;
        line-height: 20px;
        color: #000;
    }
    .item {
        padding: 15px;
        border-top: 1px solid #E6E6E6;
        color: #0181EE;
    }

}
</style>
<template>
    <div class="opinion">
        <div class="title">
            请告知您不参加的理由
        </div>
        <div class="title item" v-for="(todo,index) in arr" @click="select(todo)" v-show="index<5">
            {{todo.title}}
        </div>
        <div class="title item" v-for="(todo,index) in arr" @click="cancel(todo)" v-show="index==5">
            {{todo.title}}
        </div>
    </div>
</template>
<script>
export default {
    data() {
            return {

            }
        },
        props: {
            arr: ''
        },
        methods: {
            select(todo){
                this.$emit('selectIt',todo)
            },
            cancel(todo){
                this.$emit('cancel',todo)
            }
        },
        mounted() {

        },
        created() {

        }


}
</script>
