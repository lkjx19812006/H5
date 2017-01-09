<template>
    <div class="err"  :style="{ height: wholeHeight + 'px' }">
        <div class="img">
              <img src="/static/icons/err.png">
              <p>{{err}}</p>
        </div>
        
    </div>
</template>
<script>
import common from '../../common/common.js'
export default {
    data() {
            return {}
        },
        props: {
            err:''
        },
       

}
</script>
<style scoped>
.err{
   width:100%;
   height:100%;

}
.err .img{
    width:120px;
    height:120px;
    margin-left: -60px;
    margin-top: -60px;
    position: absolute;
    left:50%;
    top:55%;
    
}
.err img{
    width:80px;
    height:80px;
    
}
.err .img p{
    font-size: 1.2rem;
    line-height: 1.5rem;
}
</style>
