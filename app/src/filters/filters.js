import Vue from 'vue'



Vue.filter('timeFormat', function(val) {
    if (val) val = val.split(' ')[0];
    return val;
});

Vue.filter('timeDays', function(due) {
    let days = 7;
    if (due) {
        due = due.split('.')[0];
        if (due) var arr = due.split(/[- : \/]/);
        if (due != '') {
            var duedateDate = new Date(arr[0], arr[1] - 1, arr[2], arr[3], arr[4], arr[5]);
            var pubdateDate = new Date();
            var dateValue = duedateDate.getTime() - pubdateDate.getTime();
            days = Math.floor(dateValue / (24 * 3600 * 1000));

            if (days == 0) {
                days = 1 + '天';
            } else if (days > 0) {
                days = days + '天'
            } else if (days < 0) {
                days = "已过期";
            }

        } else {
            days = "7" + '天';
        }

    }

    return days;
});

Vue.filter('floatType', function(val) {
    if (val) {
        val = parseFloat(val);
        val = val.toFixed(2);
    } else if (parseInt(val) == 0) {
        val = '--';
    }

    return val;
})
Vue.filter('indexFloatType', function(val) {
    if (val) {
        val = parseFloat(val);
        val = val.toFixed(2);
    } else if (parseInt(val) == 0) {
        val = '0.00';
    }

    return val;
})

Vue.filter('percentType', function(val) {
    if (val) {
        val = parseFloat(val);
        val = val.toFixed(2) + '%'; //四舍五入保留几位小数   
    } else if (parseInt(val) == 0) {
        val = '--';
    }
    return val;
})

Vue.filter('successTimeFormat', function(val) {
    if (val) {
        var date = new Date(val);
        let Y = date.getFullYear() + '-';
        let M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
        let D = date.getDate() + ' ';
        /*let h = date.getHours() + ':';
        let m = date.getMinutes() + ':';
        let s = date.getSeconds(); */
        val = Y + M + D;
    }
    return val;
});
Vue.filter('birthdayTime', function(val) {
    if (val) {
        var date = new Date(val * 1000);
        let Y = date.getFullYear() + '-';
        let M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
        let D = date.getDate() < 10 ? '0' + (date.getDate()) : date.getDate();
        /*let h = date.getHours() + ':';
        let m = date.getMinutes() + ':';
        let s = date.getSeconds(); */
        val = Y + M + D;
    }
    return val;
});
Vue.filter('successTime', function(val) {
    if (val) {
        var date = new Date(val);
        let Y = date.getFullYear() + '-';
        let M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
        let D = date.getDate() + ' ';
        let h = date.getHours() + ':';
        let m = date.getMinutes() + ':';
        let s = date.getSeconds();
        val = h + m + s;
    }
    return val;
});

Vue.filter('shellStatus', function(val) {
    switch (val) {
        case 0:
            val = '待审核';
            break;
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

Vue.filter('purchaseStatus', function(val) {
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
            val = '待卖家发货';
            break;
        case 40:
            val = '待卖家发货';
            break;
        case 50:
            val = '待收货';
            break;
        case 60:
            val = '已完成';
            break;
        case 70:
            val = '已完成';
            break;
    }
    return val;
});
Vue.filter('sellStatus', function(val) {
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
            val = '待买家付款';
            break;
        case 30:
            val = '待收款';
            break;
        case 40:
            val = '待发货';
            break;
        case 50:
            val = '待买家收货';
            break;
        case 60:
            val = '已完成';
            break;
        case 70:
            val = '已完成';
            break;
    }
    return val;
});

Vue.filter('normalMoney', function(normal, freeze) {
    let normalMoney = 0;
    let freezeMoney = 0;
    if (Number(normal)) normalMoney = Number(normal);
    if (Number(freeze)) freezeMoney = Number(freeze);
    let all_money = normalMoney + freezeMoney;
    all_money = all_money.toFixed(2);
    return all_money
})
Vue.filter('money', function(money) {
    let val = 0;

    if (Number(money)) val = Number(money);

    val = val.toFixed(2);
    return val
})
Vue.filter('sex', function(val) {
    switch (val) {
        case 1:
            val = '男';
            break;
        case 2:
            val = '女';
            break;
    }
    return val;
})
