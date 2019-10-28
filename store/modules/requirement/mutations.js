import types from './types';

export default {
    [types.REQUIREMENT_LIST](state, list) {
        state.requirementList = list;
    },
    [types.REQUIREMENT_DETAIL](state, detail) {
        state.requirementDetail = detail;
    },
    [types.REQUIREMENT_NAME](state, name) {
        state.requirementName = name;
    },
    [types.REQUIREMENT_PAGINATION](state, pagination) {
        state.requirementPagination = pagination;
    }
};