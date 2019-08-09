import Vuex from 'vuex';
import user from './modules/user';
import media from './modules/media';
import template from './modules/template';
import screen from './modules/screen';
import playlist from './modules/playlist';
import ratio from './modules/ratio';
import socket from './modules/socket';
import {getCookie} from '../helpers/dataHelper';

export default function() {
    return new Vuex.Store({
        state: {},
        mutations: {},
        actions: {
            nuxtServerInit({state}, {req}) {
                state.user.userAuth = null;
                if (req.headers.cookie) {
                    let userAuth = getCookie('userAuth', req.headers.cookie);
                    if (userAuth) {
                        userAuth = JSON.parse(userAuth);
                        if (userAuth && userAuth.accessToken && userAuth.tokenExpire && new Date(userAuth.tokenExpire) >= new Date())
                            state.user.userAuth = userAuth;
                    }
                }
            }
        },
        modules: {
            user,
            media,
            template,
            screen,
            playlist,
            ratio,
            socket
        }
    });
};
