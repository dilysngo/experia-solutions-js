import types from './types';

export default {
    [types.CATEGORY_LIST](state, list) {
        state.categoryList = list;
    },
    [types.CATEGORY_DETAIL](state, detail) {
        state.categoryDetail = detail;
    },
    [types.CATEGORY_PAGINATION](state, pagination) {
        state.categoryPagination = pagination;
    }
};