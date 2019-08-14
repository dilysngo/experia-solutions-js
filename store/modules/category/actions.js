import types from '../../mutation-types';

export default {
    async findCategory({commit}, condition) {
        if (!condition)
            condition = {};

        const data = await this.$axios.$get(`api/category?keyword=${condition.keyword || ''}&skip=${condition.skip || ''}&limit=${condition.limit || ''}`);
        commit(types.CATEGORY_LIST, data.results);
        commit(types.CATEGORY_PAGINATION, data.pagination);
        return data;
    },
    async getCategory({commit}, id) {
        if (!id)
            return;
        const category = await this.$axios.$get(`api/category/${id}`);
        commit(types.CATEGORY_DETAIL, category);
        return category;
    },

    async createCategory({commit}, data) {
        if (!data)
            return;
        const result = await this.$axios.$post(`api/category/`, data);
        return result;
    },

    async updateCategory({commit}, {id, data}) {
        delete data.id;
        delete data.code;
        delete data.createdAt;
        delete data.updatedAt;

        const result = await this.$axios.$put(`api/category/${id}`, data);
        return result;
    },

    async deleteCategory({commit}, id) {
        const result = await this.$axios.delete(`api/category/${id}`);
        return result;
    }
};