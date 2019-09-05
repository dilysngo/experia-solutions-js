import types from './types';

export default {
    [types.SCREEN_LIST](state, list) {
        state.screenList = list;
    },
    [types.SCREEN_DETAIL](state, detail) {
        state.screenDetail = detail;
    },
    [types.SCREEN_NAME](state, screenName) {
        state.screenName = screenName;
    },
    [types.SCREEN_PAGINATION](state, pagination) {
        state.screenPagination = pagination;
    }
};