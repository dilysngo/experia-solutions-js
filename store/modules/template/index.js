import actions from './actions';
import getters from './getters';
import mutations from './mutations';

export default {
    namespaced: true,
    state: {
        templateList: null,
        templateDetail: null,
        templatePagination: null
    },
    getters,
    actions,
    mutations
};