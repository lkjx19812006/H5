import Vue from 'vue'

Vue.filter('timeFormat', function(val) {
    val = val.split(' ')[0];
    return val;
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
