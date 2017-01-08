import Vue from 'vue'

Vue.filter('timeFormat', function(val){
		val=val.split(' ')[0];
        return  val;
    });

Vue.filter('timeDays',function(due,pub){
        due=due.split(' ')[0];
        pub=pub.split(' ')[0];
            if(due != '')due = due.replace(/-/g, '/');
            if(pub != '')pub = pub.replace(/-/g, '/');
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