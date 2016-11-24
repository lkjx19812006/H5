<template>
    <div class="hello">
        Find
      
        <div class="scrollbox">
            <div class="scrollborder">
                <div v-for="item in listData">{{item.name}}</div>
                <div >{{listData[0].name}}</div>
            </div>
        </div>
    </div>
</template>
<script>

export default {
    data() {
            return {
                msg: 'Welcome to Your Vue.js App',
                listData: [{
                    "name": "人参1",
                    "spec": "统货",
                    "place": "上海",
                    "price": "98.9元/kg",
                    "phone": "15301546832",
                    "time": "12:26:33"
                }, {
                    "name": "人参2",
                    "spec": "统货",
                    "place": "上海",
                    "price": "98.9元/kg",
                    "phone": "15301546832",
                    "time": "12:26:33"
                },{
                    "name": "人参3",
                    "spec": "统货",
                    "place": "上海",
                    "price": "98.9元/kg",
                    "phone": "15301546832",
                    "time": "12:26:33"
                },{
                    "name": "人参4",
                    "spec": "统货",
                    "place": "上海",
                    "price": "98.9元/kg",
                    "phone": "15301546832",
                    "time": "12:26:33"
                },{
                    "name": "人参5",
                    "spec": "统货",
                    "place": "上海",
                    "price": "98.9元/kg",
                    "phone": "15301546832",
                    "time": "12:26:33"
                }]
            }
        },
        created() {
            let _self = this;
            let count = 3;

            function updateData() {
                console.log('dfdfd');
                count++;
                _self.listData = [{
                    "name": "人参6",
                    "spec": "统货",
                    "place": "上海",
                    "price": "98.9元/kg",
                    "phone": "15301546832",
                    "time": "12:26:33"
                }, {
                    "name": "人参7",
                    "spec": "统货",
                    "place": "上海",
                    "price": "98.9元/kg",
                    "phone": "15301546832",
                    "time": "12:26:33"
                },{
                    "name": "人参8",
                    "spec": "统货",
                    "place": "上海",
                    "price": "98.9元/kg",
                    "phone": "15301546832",
                    "time": "12:26:33"
                },{
                    "name": "人参9",
                    "spec": "统货",
                    "place": "上海",
                    "price": "98.9元/kg",
                    "phone": "15301546832",
                    "time": "12:26:33"
                },{
                    "name": "人参10",
                    "spec": "统货",
                    "place": "上海",
                    "price": "98.9元/kg",
                    "phone": "15301546832",
                    "time": "12:26:33"
                }];
            }
            setInterval(updateData, 24000);
        }

}
</script>
<style scoped>
@-webkit-keyframes scrollText {
   0% {
        transform: translateY(0px);
    }
    20% {
        transform: translateY(-40px);
    }
    40% {
        transform: translateY(-80px);
    }
    60% {
        transform: translateY(-120px);
    }
    80% {
        transform: translateY(-160px);
    }
    100% {
        transform: translateY(-200px);
    }
}

@keyframes scrollText {
    0% {
        transform: translateY(0px);
    }
    20% {
        transform: translateY(-40px);
    }
    40% {
        transform: translateY(-80px);
    }
    60% {
        transform: translateY(-120px);
    }
    80% {
        transform: translateY(-160px);
    }
    100% {
        transform: translateY(-200px);
    }
}

.scrollbox {
    position: relative;
    top: 20px;
    left: 20px;
    width: 200px;
    height: 40px;
    overflow: hidden;
}

.scrollborder {
    top: 0px;
    -webkit-animation: scrollText 24s infinite cubic-bezier(1, 0, 0.5, 0);
    animation: scrollText 24s infinite cubic-bezier(1, 0, 0.5, 0);
}

.scrollborder div {
    height: 40px;
}

.scrollborder:hover {
    animation-play-state: paused;
    -webkit-animation-play-state: paused;
}
</style>
