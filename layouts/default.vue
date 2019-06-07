<template>
    <div class="theme-default">
        <div class="main-content">
            <div class="col-left row no-gutters">
                <menu-left />
            </div>
            <div class="col-right">
                <site-header />
                <div class="body">
                    <nuxt />
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import {mapGetters, mapActions} from 'vuex';
import MenuLeft from '~/components/MenuLeft';
import SiteHeader from '~/components/SiteHeader';

export default {
    components: {
        MenuLeft,
        SiteHeader
    },
    created() {
        if (process.browser && this.$auth.isAuthenticated())
            this.connectMessageSocket();
    },
    methods: {
        ...mapActions('socket', [
            'connectMessageSocket'
        ])
    }
};
</script>
