import Vue from 'vue'



Vue.filter('timeFormat', function(val){
		if(val)val=val.split(' ')[0];
        return  val;
    });

Vue.filter('timeDays',function(due,pub){
        let days='7';
        if(due)due=due.split(' ')[0];
        if(pub)pub=pub.split(' ')[0];
            if(due)due = due.replace(/-/g, '/');
            if(pub)pub = pub.replace(/-/g, '/');
            if(due != '' && pub != ''){
                var duedateDate = new Date(due);
                var pubdateDate = new Date(pub);
                var dateValue = duedateDate.getTime() - pubdateDate.getTime();
                 days = Math.floor(dateValue / (24 * 3600 * 1000));
            }else{
                days="7";
            }
            
        return days;    
    });
Vue.filter('floatType',function(val){
      if(val){        
            val = parseFloat(val);
            val = val.toFixed(2);    
      }
      return val;
})
Vue.filter('successTimeFormat', function(val){
        if(val){
            var date = new Date(val);
            let Y = date.getFullYear() + '-';
            let M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '-';
            let D = date.getDate() + ' ';
            /*let h = date.getHours() + ':';
            let m = date.getMinutes() + ':';
            let s = date.getSeconds(); */
            val = Y+M+D;
            
        }

        return  val;
    });


Vue.filter('shellStatus', function(val) {
    switch (val) {
        case 1:
            val = '待审核';
            break;
        case 2:
            val = '正在匹配买家';
            break;
        default:
            val = '';
            break;
    }
    return val;
});

Vue.filter('orderStatus', function(val) {
    switch (val) {
        case -2:
            val = '已过期';
            break;
        case -1:
            val = '已取消';
            break;
        case 0:
            val = '待审核';
            break;
        case 10:
            val = '待审核';
            break;
        case 20:
            val = '待付款';
            break;
        case 30:
            val = '待发货';
            break;
        case 40:
            val = '待发货';
            break;
        case 50:
            val = '待收货';
            break;
        case 60:
            val = '已完成';
            break;
    }
    return val;
});
