import httpService from '../../common/httpService.js'
import common from '../../common/common.js'


const state = {
    needRelease: ''
}

// getters
const getters = {
    needRelease: state => state.needRelease,
}

// actions
const actions = {
    getReleaseInfor({ commit, state }, id) { //初始状态调用接口
        return new Promise((resolve, reject) => { //
            common.$emit('show-load');
            let url = common.addSID(common.urlCommon + common.apiUrl.most);
            let body = {
                biz_module: 'intentionService',
                biz_method: 'queryIntentionInfo',
                biz_param: {
                    id: id
                }
            };
            body.time = Date.parse(new Date()) + parseInt(common.difTime);
            body.sign = common.getSign('biz_module=' + body.biz_module + '&biz_method=' + body.biz_method + '&time=' + body.time);
            httpService.cart(url, body,
                function(res) {
                    common.$emit('close-load');
                    commit('getReleaseInfor', res);
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
    getReleaseInfor(state, res) {
         state.needRelease = res.data.biz_result;
         console.log(1,res.data.biz_result)
    },


}

export default {
    state,
    getters,
    actions,
    mutations
}
