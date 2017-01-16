<template>
    <div class="pop_up" :style="{ height: param.whole_height + 'px' }" v-on:click="backDetail()">    
            <mt-swipe :auto="0" :prevent="false" > 
                <mt-swipe-item v-for="(item,index) in param.url">
                <div>
                    <img v-bind:src="item" id="img" @click="touch">      
                </div>                                                    
                </mt-swipe-item>
            </mt-swipe>      
    </div>
</template>
<script>
export default {
    data() {
            return {
                startPro1:'',
                startPro2:'',
                endPro1:'',
                endPro2:'',
                img:'',
            }
        },
        props: {
            param:{
               
            }
        },
        methods:{
            backDetail(){
                this.param.show = !this.param.show;
            }         
        },
        created() {
            
        }      
}
</script>
<style scoped>
.pop_up{
    width:100%;
    position: relative;
    overflow: hidden;
    background: black;
}
.pop_up>div{
    overflow: hidden;
}
.pop_up img{
    width:100%;
    height:50%;
    position: absolute;
    margin-left:-50%;
    margin-top:-50%;
    left:50%;
    top:50%;
}
.pop_up  .swipe_height{
    width:100%;
    height:100%;
}
</style>
