import types from '../../mutation-types';

export default {
    async findScreens({commit}, condition) {
        if (!condition)
            condition = {};

        const data = await this.$axios.$get(`api/screen?keyword=${condition.keyword || ''}&skip=${condition.skip || ''}&limit=${condition.limit || ''}`);
        commit(types.SCREEN_LIST, data.results);
        commit(types.SCREEN_PAGINATION, data.pagination);
        return data;
    },
    async getScreen({commit}, id) {
        if (!id)
            return;
        const screen = await this.$axios.$get(`api/screen/${id}`);
        commit(types.SCREEN_DETAIL, screen);
        return screen;
    },

    async createScreen({commit}, data) {
        if (!data)
            return;
        const result = await this.$axios.$post(`api/screen/`, data);
        return result;
    },

    async updateScreen({commit}, {id, data}) {
        delete data.id;
        delete data.code;
        delete data.createdAt;
        delete data.updatedAt;

        const result = await this.$axios.$put(`api/screen/${id}`, data);
        return result;
    },

    async deleteScreen({commit}, id) {
        const result = await this.$axios.delete(`api/screen/${id}`);
        return result;
    }
};