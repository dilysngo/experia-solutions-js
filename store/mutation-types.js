import userTypes from './modules/user/types';
import mediaTypes from './modules/media/types';
import templateTypes from './modules/template/types';
import screenTypes from './modules/screen/types';
import playlistTypes from './modules/playlist/types';
import socketTypes from './modules/socket/types';

export default {
    ...userTypes,
    ...mediaTypes,
    ...templateTypes,
    ...screenTypes,
    ...playlistTypes,
    ...socketTypes
};