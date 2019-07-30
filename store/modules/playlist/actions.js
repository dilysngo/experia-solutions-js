import types from '../../mutation-types';

export default {
    async findPlaylists({commit}, condition) {
        if (!condition)
            condition = {};

        const data = await this.$axios.$get(`api/playlist?keyword=${condition.keyword || ''}&skip=${condition.skip || ''}&limit=${condition.limit || ''}`);
        commit(types.PLAYLIST_LIST, data.results);
        commit(types.PLAYLIST_PAGINATION, data.pagination);
        return data;
    },
    async getPlaylist({commit}, id) {
        if (!id)
            return;
        const playlist = await this.$axios.$get(`api/playlist/${id}`);
        commit(types.PLAYLIST_DETAIL, playlist);
        return playlist;
    },

    async createPlaylist({commit}, data) {
        if (!data)
            return;
        const result = await this.$axios.$post(`api/playlist/`, data);
        return result;
    },

    async updatePlaylist({commit}, {id, data}) {
        delete data.id;
        delete data.code;
        delete data.createdAt;
        delete data.updatedAt;

        const result = await this.$axios.$put(`api/playlist/${id}`, data);
        return result;
    },

    async deletePlaylist({commit}, id) {
        const result = await this.$axios.delete(`api/playlist/${id}`);
        return result;
    }
};