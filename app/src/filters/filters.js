import Vue from 'vue'


Vue.filter('timeFormat', function(val){
		if(val)val=val.split(' ')[0];
        return  val;
    });

Vue.filter('timeDays',function(due,pub){
        if(due)due=due.split(' ')[0];
        if(pub)pub=pub.split(' ')[0];
            if(due)due = due.replace(/-/g, '/');
            if(pub)pub = pub.replace(/-/g, '/');
            if(due != '' && pub != ''){
                var duedateDate = new Date(due);
                var pubdateDate = new Date(pub);
                var dateValue = duedateDate.getTime() - pubdateDate.getTime();
                var days = Math.floor(dateValue / (24 * 3600 * 1000));
            }else{
                days=" ";
            }
            
        return days;    
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

