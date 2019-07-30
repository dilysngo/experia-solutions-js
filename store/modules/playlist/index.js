import actions from './actions';
import getters from './getters';
import mutations from './mutations';

export default {
    namespaced: true,
    state: {
        playlistList: null,
        playlistDetail: null,
        playlistPagination: null
    },
    getters,
    actions,
    mutations
};