import actions from './actions';
import getters from './getters';
import mutations from './mutations';

export default {
    namespaced: true,
    state: {
        ratioList: null,
        ratioDetail: null,
        ratioPagination: null
    },
    getters,
    actions,
    mutations
};