<template>
    <div class="content-menu">
        <nuxt-link to="/">
            <img
                src="/images/logo-experia-ds.png"
                alt="logo menu"
                class="logo"
            >
        </nuxt-link>
        <ul class="menu-left">
            <li class="item-menu">
                <nuxt-link
                    to="/screens"
                    class="menu-link"
                >
                    <i class="icon-my-board icon-site" />
                    Screens
                </nuxt-link>
            </li>
            <li class="item-menu">
                <nuxt-link
                    to="/playlists"
                    class="menu-link"
                >
                    <i class="icon-play-lists icon-site" />
                    Playlists
                </nuxt-link>
            </li>
            <li class="item-menu">
                <nuxt-link
                    to="/templates"
                    class="menu-link"
                >
                    <i class="icon-templates icon-site" />
                    Templates
                </nuxt-link>
            </li>
            <li class="item-menu">
                <nuxt-link
                    to="/media"
                    class="menu-link"
                >
                    <i class="icon-media icon-site" />
                    Media Library
                </nuxt-link>
            </li>
            <li 
                class="item-menu"
                v-if="userAuth.role.code===1"
            >
                <nuxt-link
                    to="/requirement"
                    class="menu-link"
                >
                    <img src="~/assets/images/notification.svg">
                    Requests
                </nuxt-link>
            </li>            
            <li
                class="item-menu item-create-menu"
                v-if="$route.path.toString() === '/screens' && userAuth.role.code===1"
            >
                <a
                    @click="createNew('screen')"
                    class="menu-link "
                >
                    <i class="icon-creative icon-site" />
                    Create Advert
                </a>
            </li>
            <li
                class="item-menu item-create-menu"
                v-if="$route.path.toString() === '/templates'"
            >
                <a
                    @click="createNew('template')"
                    class="menu-link "
                >
                    <i class="icon-creative icon-site" />
                    Create Template
                </a>
            </li>
        </ul>
    </div>
</template>

<script>
import {mapGetters, mapActions} from 'vuex';
import {convertToString} from '~/helpers/dateHelper';

export default {
    middleware: ['authentication'],
    computed: {
        ...mapGetters('socket', [
            'hasMenuNewMessage'
        ]),
        ...mapGetters('user', [
            'userAuth'
        ])
    },
    methods: {
        ...mapActions('user', [
            'signout'
        ]),
        ...mapActions('socket', [
            'disconnectMessageSocket'
        ]),
        ...mapActions('template', [
            'createTemplate',
        ]),
        ...mapActions('screen', [
            'createScreen',
        ]),
        async createNew(type) {
            if (type === 'screen') {
                let dataCreate = {
                    userId: this.userAuth.id,
                    name: 'Screen-' + convertToString(new Date()),
                    slug: '',
                    template: {
                        id: 0,
                        code: 0,
                        name: '',
                        slug: '',
                        isDrag: true,
                        template: null,
                        ratio: '',
                        category: '',
                        createAt: ''
                    }
                };
                let result = await this.createScreen(dataCreate).catch(err => {
                    console.log('err', err);
                    return false;
                });
                if (result.id)
                    this.$router.push('/templates/design?screen=' + result.id);
                else
                    this.$router.push('/screens');
            }
            else {
                let dataCreate = {
                    userId: this.userAuth.id,
                    code: this.userAuth.id,
                    name: 'Template-' + convertToString(new Date()),
                    isDrag: true
                };
                let result = await this.createTemplate(dataCreate).catch(err => {
                    console.log('err', err);
                    this.$notify({
                        group: 'error',
                        title: 'Create failed',
                        text: err.message
                    });
                    return false;
                });
                if (result.id)
                    this.$router.push('/templates/design?template=' + result.id);
                else
                    this.$router.push('/templates');
            }
        },
        logout() {
            this.signout();
            // this.disconnectMessageSocket();
            this.$router.push('/');
        }
    }
};
</script>
