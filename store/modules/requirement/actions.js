import types from '../../mutation-types';

export default {
    async findRequirements({commit}, condition) {
        if (!condition)
            condition = {};

        const data = await this.$axios.$get(`api/requirement?keyword=${condition.keyword || ''}&skip=${condition.skip || ''}&limit=${condition.limit || ''}`);
        commit(types.REQUIREMENT_LIST, data.results);
        commit(types.REQUIREMENT_PAGINATION, data.pagination);
        return data;
    },

    async getRequirement({commit}, id) {
        if (!id)
            return;
        const data = await this.$axios.$get(`api/requirement/${id}`);
        commit(types.REQUIREMENT_DETAIL, data);
        return data;
    },

    async createRequirement({commit}, data) {
        console.log('data', data);
        if (!data)
            return;
        const result = await this.$axios.$post(`api/requirement`, data);
        console.log('result', result);
        return result;
    },
};