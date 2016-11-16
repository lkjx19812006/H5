import Vue from 'vue'

let common = new Vue({
    data: {
        show: true
    }
})

common.$on('show-load', function() {
    common.show = true;
})

common.$on('close-load', function() {
    common.show = false;
})

module.exports = common;
