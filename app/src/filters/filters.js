import Vue from 'vue'

Vue.filter('timeFormat', function(val){
		val=val.split(' ')[0];
        return  val;
    });