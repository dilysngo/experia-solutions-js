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
            <li class="item-menu item-create-menu">
                <nuxt-link
                    to="/"
                    class="menu-link "
                >
                    <i class="icon-creative icon-site" />
                    Create New
                </nuxt-link>
            </li>
        </ul>
    </div>
</template>

<script>
import {mapGetters, mapActions} from 'vuex';

export default {
    computed: {
        ...mapGetters('socket', [
            'hasMenuNewMessage'
        ])
    },
    methods: {
        ...mapActions('user', [
            'signout'
        ]),
        ...mapActions('socket', [
            'disconnectMessageSocket'
        ]),
        logout() {
            this.signout();
            this.disconnectMessageSocket();
            this.$router.push('/');
        }
    }
};
</script>
