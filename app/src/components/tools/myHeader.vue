<template>
     <div  class="my-header">
                <div class="go-back" @click="jumpBack()">
                  <img src="/static/images/go-back.png">
                </div>         
                <div  class="title-name">
                     <p>{{param.name}}</p>
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
            param:{

            }
        },
        methods:{
            jumpBack(){
                history.go(-1);
            }
        }
}
</script>
<style scoped>
.my-header{
    width:100%;
    height:50px;
    border-bottom: 1px solid #ccc;
}
.my-header .title-name{ 
    width:100%;
    height:50px; 
    background: #EC6817;
    font-size: 1.7rem;
    line-height: 50px;
    color:white;
}
.my-header .go-back{
    position: absolute;
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
</style>
