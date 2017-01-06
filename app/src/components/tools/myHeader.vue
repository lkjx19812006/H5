<template>
     <div  class="my-header">
                <div class="go-back" @click="jumpBack()">
                  <img src="/static/images/go-back.png">
                </div>         
                <div  class="title-name">
                     <p>{{param.name}}</p>
                </div>
                <p v-show="param.show" @click="jumpRevise">编辑</p>
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
            param:{

            }
        },
        methods:{
            jumpBack(){
                if(this.param.router){
                    this.$router.push(this.param.router);
                }else{
                    history.go(-1);
                }
                
            },
            jumpRevise(){
                
                console.log(this.param.reviseRouter)
                common.$emit("res-id", this.param.item);
                this.$router.push(this.param.reviseRouter);
            }
        }
}
</script>
<style scoped>
.my-header{
    width:100%;
    height:50px;
    /*border-bottom: 1px solid #ccc;*/
    background: #EC6817;
}
.my-header .title-name{ 
    width:85%;
    height:50px; 
    float:left;
    font-size: 1.7rem;
    line-height: 50px;
    color:white;
    padding-right: 16.5%;
}
.my-header .go-back{
    /*position: absolute;*/
    float:left;
    width:15%;
    padding-right:5%;
    height:50px;
    z-index: 20000;
    background:#EC6817;
}
.my-header .go-back  img{
    margin-top: 15px;
    height:20px;
}
.my-header>p{
    position: absolute;
    right:0;
    font-size: 14px;
    top:0;
    padding:16px 1.5rem;
    color:white;
    
}
</style>
