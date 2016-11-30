<template>
    <div class="hello">
        Find
        <div class="scrollbox">
            <div class="scrollborder" id="marqueebox">
                <div v-for="item in listData">{{item.name}}</div>
            </div>
        </div>
    </div>
    <!-- <div class="hello">

     <mt-search v-model="value">
      <mt-cell
        v-for="item in result"
        :title="item.title"
        :value="item.value">
      </mt-cell>
    </mt-search> -->
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
                }, {
                    "name": "人参3",
                    "spec": "统货",
                    "place": "上海",
                    "price": "98.9元/kg",
                    "phone": "15301546832",
                    "time": "12:26:33"
                }, {
                    "name": "人参4",
                    "spec": "统货",
                    "place": "上海",
                    "price": "98.9元/kg",
                    "phone": "15301546832",
                    "time": "12:26:33"
                }, {
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
                }, {
                    "name": "人参8",
                    "spec": "统货",
                    "place": "上海",
                    "price": "98.9元/kg",
                    "phone": "15301546832",
                    "time": "12:26:33"
                }, {
                    "name": "人参9",
                    "spec": "统货",
                    "place": "上海",
                    "price": "98.9元/kg",
                    "phone": "15301546832",
                    "time": "12:26:33"
                }, {
                    "name": "人参10",
                    "spec": "统货",
                    "place": "上海",
                    "price": "98.9元/kg",
                    "phone": "15301546832",
                    "time": "12:26:33"
                }];
            }
            setInterval(updateData, 24000);
              console.log('dddd');
        }
}
</script>
<style scoped>
</style>
