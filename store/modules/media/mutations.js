import types from './types';

export default {
    [types.MEDIA_LIST](state, list) {
        state.mediaList = list;
    },
    [types.MEDIA_DETAIL](state, detail) {
        state.mediaDetail = detail;
    },
    [types.MEDIA_PAGINATION](state, pagination) {
        state.mediaPagination = pagination;
    }
};