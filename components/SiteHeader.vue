<template>
    <div class="site-header d-flex justify-content-end align-content-center">
        <div class="box-status d-flex align-items-center">
            <p class="free-account">
                Free Account - <span>14 days left </span>
            </p>
        </div>
        <div class="box-account d-flex align-items-center">
            <div class="wrapper-avatar">
                <a href="/profile">
                    <img 
                        class="img-avatar"
                        :src="imageData ? imageData : 'images/default-avatar.jpg'"
                        alt="Avatar"
                    >                    
                </a>    
            </div>
            <div class="info-account">
                <a href="/profile">
                    <h6>{{ userAuth && userAuth.profile && userAuth.profile.firstName }}</h6>
                </a>
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
import {convertToUrlAvatar} from '~/helpers/dataHelper';
export default {
    data: () => ({
        imageData: '',
    }),
    computed: {
        ...mapGetters('user',['userAuth', 'userDetail'])
    },
    async mounted(){
        this.handlerGetUser();
    },
    methods: {
        ...mapActions('user', [
            'signout',
            'getUser'
        ]),
        async handlerGetUser() {
            this.data = await this.getUser(this.userAuth.id);
            this.imageData = convertToUrlAvatar(this.userDetail.avatar);
        },
    }
};
</script>
