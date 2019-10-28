import actions from './actions';
import getters from './getters';
import mutations from './mutations';

export default {
    namespaced: true,
    state: {
        requirementList: null,
        requirementDetail: null,
        requirementName: null,
        requirementPagination: null
    },
    getters,
    actions,
    mutations
};