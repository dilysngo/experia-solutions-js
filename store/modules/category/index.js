import actions from './actions';
import getters from './getters';
import mutations from './mutations';

export default {
    namespaced: true,
    state: {
        categoryList: null,
        categoryDetail: null,
        categoryPagination: null
    },
    getters,
    actions,
    mutations
};