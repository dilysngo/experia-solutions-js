import types from './types';

export default {
    [types.PLAYLIST_LIST](state, list) {
        state.playlistList = list;
    },
    [types.PLAYLIST_DETAIL](state, detail) {
        state.playlistDetail = detail;
    },
    [types.PLAYLIST_PAGINATION](state, pagination) {
        state.playlistPagination = pagination;
    }
};