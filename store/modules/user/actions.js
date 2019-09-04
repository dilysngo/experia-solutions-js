import types from '../../mutation-types';
import {setCookie} from '../../../helpers/dataHelper';

export default {
    async findUsers({commit}, conditions) {
        if (!conditions)
            conditions = {};

        const data = await this.$axios.$get(`/api/users?keyword=${conditions.keyword || ''}&skip=${conditions.skip || ''}&limit=${conditions.limit || ''}`);
        commit(types.USER_LIST, data.results);
        commit(types.USER_PAGINATION, data.pagination);
        return data;
    },
    async getUser({commit}, id) {
        const user = await this.$axios.$get(`/api/users/${id}`);
        commit(types.USER_DETAIL, user);
        return user;
    },
    async signup({commit}, data) {
        delete data.cfPass;
        const userAuth = await this.$axios.$post('/api/users/signup', data);
        
        return storeUserAuthentication(commit, userAuth);
        // return userAuth;
    },
    async signin({commit}, {email, password}) {
        commit(types.USER_SIGNIN_MESSAGE, '');
        const userAuth = await this.$axios.$post('/api/users/signin', {email, password});
        return storeUserAuthentication(commit, userAuth);
    },

    async forgotPassword({commit}, email) {
        const user = await this.$axios.$get(`/api/users/forgot-password?email=${email}`);
        return user;
    },

    async resetPassword({commit}, data) {
        const reset = await this.$axios.$patch(`/api/users/reset-password/${data.id}`, {newPassword: data.password, keyRandom: data.keyRandom});
        return reset;
    },

    async updateProfileUser({commit}, conditions){
        delete conditions.id;
        delete conditions.role;
        delete conditions.avatar;
        delete conditions.createdAt;
        delete conditions.updatedAt;
        
        const data = await this.$axios.$post(`/api/users/profile`, conditions);
        return data;
    },
    async uploadAvatar({commit}, file){
        const data = await this.$axios.$post(`/api/users/avatar`, file);
        return data;
    },

    signout({commit}) {
        storeUserAuthentication(commit);
        this.$router.push('/login');
    }
};

function storeUserAuthentication(commit, userAuth) {
    if (userAuth)
        setCookie('userAuth', userAuth, 15);
    else
        setCookie('userAuth', null, -1);

    commit(types.USER_AUTHENTICATION, userAuth);
    return userAuth;
}
