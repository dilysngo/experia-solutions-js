import actions from './actions';
import getters from './getters';
import mutations from './mutations';

export default {
    namespaced: true,
    state: {
        screenList: null,
        screenDetail: null,
        screenPagination: null
    },
    getters,
    actions,
    mutations
};