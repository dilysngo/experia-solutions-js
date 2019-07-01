import userTypes from './modules/user/types';
import mediaTypes from './modules/media/types';
import socketTypes from './modules/socket/types';

export default {
    ...userTypes,
    ...mediaTypes,
    ...socketTypes
};