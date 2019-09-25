import types from '../../mutation-types';

export default {
    async findMedias({commit}, condition) {
        var mediaAdmin = [];
        var results = [];
        const user = await this.$axios.$get(`api/users/getId`);

        if (!condition)
            condition = {};

        if (user)
            condition.id = user.id;
        const data = await this.$axios.$get(`api/media?keyword=${condition.keyword || ''}${condition.type ? '&type=' + condition.type : '' }&skip=${condition.skip || ''}&limit=${condition.limit || ''}`);
        
        if (condition.code !== 1){
            mediaAdmin = await this.$axios.$get(`api/media/mediaAdmin?keyword=${condition.keyword || ''}${condition.type ? '&type=' + condition.type : '' }&skip=${condition.skip || ''}&limit=${condition.limit || ''}&id=${condition.id || ''}`);
            results = data.results.concat(mediaAdmin.results);
        }
        else
            results = data.results;

        commit(types.MEDIA_LIST, results);
        commit(types.MEDIA_PAGINATION, data.pagination);

        if (data.pagination.total > 11)
            return data;
        else
            return mediaAdmin;
    },
    async getMedia({commit}, id) {
        if (!id)
            return;
        const media = await this.$axios.$get(`api/media/${id}`);
        commit(types.MEDIA_DETAIL, media);
        return media;
    },

    async createMedia({commit}, data) {
        if (!data)
            return;
        const result = await this.$axios.$post(`api/media/`, data);
        return result;
    },

    async uploadMedia({commit}, file) {
        if (!file)
            return;
        const result = await this.$axios.$post(`api/media/upload`, file);
        return result;
    },

    async updateMedia({commit}, {id, data}) {
        const result = await this.$axios.$put(`api/media/${id}`, data);
        return result;
    },

    async updateThumbnail({commit}, {id, data}) {
        const result = await this.$axios.$put(`api/media/thumbnail/${id}`, data);
        return result;
    },

    async deleteMedia({commit}, id) {
        const result = await this.$axios.delete(`api/media/${id}`);
        return result;
    }
};