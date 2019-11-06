require('dotenv').config();
const webpack = require('webpack');

module.exports = {
    env: process.env,
    /*
     ** Headers of the page
     */
    head: {
        title: process.env.PROJECT_NAME,
        meta: [
            {charset: 'utf-8'},
            {name: 'viewport', content: 'width=device-width, initial-scale=1'},
            {hid: 'description', name: 'description', content: process.env.PROJECT_NAME}
        ],
        link: [
            {rel: 'icon', type: 'image/x-icon', href: '/favicon.ico'}
        ],
        script: [
            {src: '/js/ckeditor/ckeditor.js'},
            {src: 'https://apis.google.com/js/api.js', async: true, defer: true},
            {src: '//ajax.googleapis.com/ajax/libs/jquery/2.2.4/jquery.min.js'},
            // {src: 'https://www.bugherd.com/sidebarv2.js?apikey=ydbtuozvnzkvjst0cd9hiw', async: true}
        ],
    },
    css: [
        'bootstrap/dist/css/bootstrap.min.css',
        'font-awesome/css/font-awesome.min.css',
        '~/assets/scss/main.scss'   
    ],
    /*
     ** Customize the progress bar color
     */
    loading: false,
    modules: [
        '@nuxtjs/axios'
    ],
    plugins: [
        {src: '~/plugins/bootstrap'},
        {src: '~/plugins/axios'},
        {src: '~/plugins/authentication'},
        {src: '~/plugins/vee-validate'},
        {src: '~/plugins/socket.io', ssr: false},
        {src: '~/plugins/event-bus', ssr: false},
        {src: '~/plugins/vue-notification', ssr: false},
        {src: '~/plugins/vue-color', ssr: false},
    ],
    /*
     ** Build   
     */
    build: {
        vendor: [
            'jquery',
            'bootstrap',
            'vue-notification',
            'vue-color',
        ],
        plugins: [
            new webpack.ProvidePlugin({
                $: 'jquery',
                jQuery: 'jquery',
                'window.jQuery': 'jquery'
            })
        ],
        /*
         ** Run ESLint on save
         */
        extend(config, {isDev, isClient}) {
            config.node = {
                fs: 'empty'
            };
            if (isDev && isClient) {
                config.module.rules.push({
                    enforce: 'pre',
                    test: /\.(js|vue)$/,
                    loader: 'eslint-loader',
                    exclude: /(node_modules)/
                });
            }
        }
    }
};