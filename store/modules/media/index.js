import actions from './actions';
import getters from './getters';
import mutations from './mutations';

export default {
    namespaced: true,
    state: {
        mediaList: null,
        mediaDetail: null,
        mediaPagination: null
    },
    getters,
    actions,
    mutations
};