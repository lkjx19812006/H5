<template>
    <div class="my_information">
        
            <div class="information">
             <ul>
                 <li v-for="todo in todos" @click="jump(todo.router)">
                     <img :src="todo.url">
                     <p>{{todo.name}}</p>
                 </li>
             </ul>
           </div>     
        
    </div>
</template>
<script>
import common from '../../common/common.js'
export default {
    data() {
            return {
                todos:[{
                     url:'/static/images/custom-service.png',
                     name:'专属客服',
                     router:'detailsPage',
                },{
                     url:'/static/images/address-manage.png',
                     name:'地址管理',
                     router:'addressManage'
                },{
                     url:'/static/images/my-account.png',
                     name:'我的账户',
                     router:'accountInfo'
                },]

            }
        },
        props: {
            param:{
               default: null 
            }
        },
        created() {

        },
        methods:{
            jump(router){
            	
                if(router == 'detailsPage'){
                    common.$emit('message','暂未提供该服务');
                }else{
                    this.$router.push(router);
                }
            }
        }
}
</script>
<style scoped>
.my_information .information{
    padding: 0.64rem 0;
    height:5.54rem;
    background: white;
    margin-bottom: 0.8rem;
}
.my_information .information ul{
    display: flex;
    flex-direction:row;
    height:4.2665rem;
}
.my_information .information ul li{
    flex:1;
    border-right:1px solid #e6e6e6;
}
.my_information .information ul li img{
	width:1.7066rem;
	height:1.7066rem;
	margin-top: 5px;
}
.my_information .information ul li .my-img{
	width:1.96rem;
	height:1.365rem;
}
.my_information .information ul li.last{
    border:none;
}
.my_information .information ul li p{
	 font-size: 1.19rem;
}
</style>