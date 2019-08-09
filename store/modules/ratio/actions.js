import types from '../../mutation-types';

export default {
    async findRatios({commit}, condition) {
        if (!condition)
            condition = {};

        const data = await this.$axios.$get(`api/ratio?keyword=${condition.keyword || ''}&skip=${condition.skip || ''}&limit=${condition.limit || ''}`);
        commit(types.RATIO_LIST, data.results);
        commit(types.RATIO_PAGINATION, data.pagination);
        return data;
    },
    async getRatio({commit}, id) {
        if (!id)
            return;
        const ratio = await this.$axios.$get(`api/ratio/${id}`);
        commit(types.RATIO_DETAIL, ratio);
        return ratio;
    },

    async createRatio({commit}, data) {
        if (!data)
            return;
        const result = await this.$axios.$post(`api/ratio/`, data);
        return result;
    },

    async updateRatio({commit}, {id, data}) {
        delete data.id;
        delete data.code;
        delete data.createdAt;
        delete data.updatedAt;

        const result = await this.$axios.$put(`api/ratio/${id}`, data);
        return result;
    },

    async deleteRatio({commit}, id) {
        const result = await this.$axios.delete(`api/ratio/${id}`);
        return result;
    }
};