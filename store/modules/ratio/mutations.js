import types from './types';

export default {
    [types.RATIO_LIST](state, list) {
        state.ratioList = list;
    },
    [types.RATIO_DETAIL](state, detail) {
        state.ratioDetail = detail;
    },
    [types.RATIO_PAGINATION](state, pagination) {
        state.ratioPagination = pagination;
    }
};