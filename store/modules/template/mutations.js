import types from './types';

export default {
    [types.TEMPLATE_LIST](state, list) {
        state.templateList = list;
    },
    [types.TEMPLATE_DETAIL](state, detail) {
        state.templateDetail = detail;
    },
    [types.TEMPLATE_PAGINATION](state, pagination) {
        state.templatePagination = pagination;
    }
};