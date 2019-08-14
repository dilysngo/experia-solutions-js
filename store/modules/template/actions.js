import types from '../../mutation-types';

export default {
    async findTemplates({commit}, condition) {
        if (!condition)
            condition = {};

        const data = await this.$axios.$get(`api/template?keyword=${condition.keyword || ''}${condition.type ? '&type=' + condition.type : '' }&categoryId=${condition.categoryId || ''}&ratioId=${condition.ratioId || ''}&ratioType=${condition.ratioType || ''}&skip=${condition.skip || ''}&limit=${condition.limit || ''}`);
        commit(types.TEMPLATE_LIST, data.results);
        commit(types.TEMPLATE_PAGINATION, data.pagination);
        return data;
    },

    async getTemplate({commit}, id) {
        if (!id)
            return;
        const template = await this.$axios.$get(`api/template/${id}`);
        commit(types.TEMPLATE_DETAIL, template);
        return template;
    },

    async getTemplateByScreen({commit}, id) {
        if (!id)
            return;
        const template = await this.$axios.$get(`api/template/template-by-screen?screenId=${id}`);
        return template;
    },

    async createTemplate({commit}, data) {
        if (!data)
            return;
        const result = await this.$axios.$post(`api/template/`, data);
        return result;
    },

    async updateTemplate({commit}, {id, data}) {
        delete data.id;
        delete data.code;
        delete data.ratio;
        delete data.category;
        delete data.createdAt;
        delete data.updatedAt;

        const result = await this.$axios.$put(`api/template/${id}`, data);
        return result;
    },

    async updateTemplateScreen({commit}, {id, data}) {
        const result = await this.$axios.$put(`api/template/screen?screenId=${id}`, data);
        return result;
    },

    async deleteTemplate({commit}, id) {
        const result = await this.$axios.delete(`api/template/${id}`);
        return result;
    }
};