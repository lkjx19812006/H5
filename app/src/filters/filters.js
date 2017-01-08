import Vue from 'vue'


Vue.filter('timeFormat', function(val) {
    val = val.split(' ')[0];
    return val;
});

Vue.filter('timeDays', function(due, pub) {
    due = due.split(' ')[0];
    pub = pub.split(' ')[0];
    if (due != '') due = due.replace(/-/g, '/');
    if (pub != '') pub = pub.replace(/-/g, '/');
    if (due != '' && pub != '') {
        var duedateDate = new Date(due);
        var pubdateDate = new Date(pub);
        var dateValue = duedateDate.getTime() - pubdateDate.getTime();
        var days = Math.floor(dateValue / (24 * 3600 * 1000));
    } else {
        days = " ";
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
