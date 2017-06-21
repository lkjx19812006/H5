import httpService from '../../common/httpService.js'
import common from '../../common/common.js'

//三种方式改变商品数量时候调用的公共函数
const state = {
    userInfor: {},
    /*accountHead: ''*/
    areaJson: {}
}

// getters
const getters = {
    userInfor: state => state.userInfor,
    /*accountHead: state => state.accountHead,*/
    areaJson: state => state.areaJson
}

// actions
const actions = {
    getUserInfor({ commit, state }) { //初始状态调用接口
        return new Promise((resolve, reject) => { //
            common.$emit('show-load');
            let url = common.addSID(common.urlCommon + common.apiUrl.most);
            let body = {
                biz_module: 'userService',
                biz_method: 'queryUserInfo',
                biz_param: {

                }
            };
            body.time = Date.parse(new Date()) + parseInt(common.difTime);
            body.sign = common.getSign('biz_module=' + body.biz_module + '&biz_method=' + body.biz_method + '&time=' + body.time);
            httpService.cart(url, body,
                function(res) {
                    console.log(res)
                    common.$emit('close-load');
                    commit('getUserInfor', res);
                    resolve(res);
                },
                function(err) {
                    common.$emit('close-load');
                    reject(err);
                })
        })
    },
    upDataInfor({ commit, state }, params) {
        return new Promise((resolve, reject) => { //
            common.$emit('show-load');
            let url = common.addSID(common.urlCommon + common.apiUrl.most);
            let body = {
                biz_module: 'userService',
                biz_method: 'updateUserInfo',
                biz_param: params
            };
            body.time = Date.parse(new Date()) + parseInt(common.difTime);
            body.sign = common.getSign('biz_module=' + body.biz_module + '&biz_method=' + body.biz_method + '&time=' + body.time);
            httpService.cart(url, body,
                function(res) {
                    common.$emit('close-load');
                    common.$emit('message', res.data.msg);
                    if (res.data.code == '1c01') {
                        commit('upDataInfor', params);
                    }
                    resolve(res);
                },
                function(err) {
                    common.$emit('close-load');
                    common.$emit('message', err.data.msg);
                    reject(err);
                })
        })
    },
    clearUserInfor({ commit, state }) {
        commit('clearUserInfor');
    },
    getAreaJson({ commit, state }) {
        return new Promise((resolve, reject) => { //
            common.$emit('show-load');
            let url = common.urlCommon + common.apiUrl.most;
            let body = {
                biz_module: 'locationService',
                biz_method: 'queryLocationList'
            };
            body.time = Date.parse(new Date()) + parseInt(common.difTime);
            body.sign = common.getSign('biz_module=' + body.biz_module + '&biz_method=' + body.biz_method + '&time=' + body.time);
            httpService.cart(url, body,
                function(res) {
                    common.$emit('close-load');
                    if (res.data.code == '1c01') {
                        common.getAddress = false;
                        console.log(99, res.body.biz_result.list)
                        commit('getAreaJson', res);

                    }
                    resolve(res);
                },
                function(err) {
                    common.$emit('close-load');
                    reject(err);
                })
        })
    },

}

// mutations
const mutations = {
    getUserInfor(state, res) {
        state.userInfor = res.data.biz_result;
        console.log(res.data.biz_result)
    },
    upDataInfor(state, res) {
        for (var key in res) {
            state.userInfor[key] = res[key];
        }
    },
    clearUserInfor(state) {
        state.userInfor = {}
    },
    getAreaJson(state, res) {
        //state.areaJson = res.body.biz_result.list;
        let area = res.body.biz_result.list;
        let province = [];
        let city = [];
        let county = [];
        for (var i = 0; i < area.length; i++) {
            var ps = {};
            ps.value = area[i].cname;
            ps.id = String(area[i].id);
            ps.parentId = String(area[i].pid);
            province.push(ps);
            for(var j = 0; j<area[i].childList.length; j++){
                var cs = {};
                cs.value = area[i].childList[j].cname;
                cs.id =  String(area[i].childList[j].id);
                cs.parentId =  String(area[i].childList[j].pid);
                city.push(cs);
                for(var k = 0; k < area[i].childList[j].childList.length; k++){
                    var ds = {};
                    ds.value = area[i].childList[j].childList[k].cname;
                    ds.id =  String(area[i].childList[j].childList[k].id);
                    ds.parentId =  String(area[i].childList[j].childList[k].pid);
                    county.push(ds)
                }
            }
        }
        state.areaJson = {
            province:province,
            city:city,
            county:county
        }
       

    }

}

export default {
    state,
    getters,
    actions,
    mutations
}
