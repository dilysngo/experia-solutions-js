<template>
    <div class="site-header d-flex justify-content-end align-content-center">
        <div class="box-status d-flex align-items-center">
            <p class="free-account">
                Free Account - <span>14 days left </span>
            </p>
        </div>
        <div class="box-account d-flex align-items-center">
            <div class="wrapper-avatar">
                <img 
                    class="img-avatar"
                    :src="userAuth && userAuth.profile && userAuth.profile.avatar || 'images/default-avatar.jpg'"
                    alt="Avatar"
                >
            </div>
            <div class="info-account">
                <h6>{{ userAuth && userAuth.profile && userAuth.profile.firstName }}</h6>
                <a
                    class="log-out"
                    @click="signout"
                >
                    Log out
                </a>
            </div>
        </div>
    </div>
</template>

<script>
import {mapGetters, mapActions} from 'vuex';
export default {
    computed: {
        ...mapGetters('user', [
            'userAuth'
        ])
    },
    methods: {
        ...mapActions('user', [
            'signout'
        ])
    }
};
</script>
