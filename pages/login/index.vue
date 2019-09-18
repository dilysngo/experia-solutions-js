<template>
    <div class="content-login">
        <div class="container-title">
            <h3>Sign In</h3>
            <h2>Welcome to Eperia Group</h2>
        </div>
        <form 
            class="container-form d-flex flex-wrap"
            @submit.prevent="login"
        >
            <div class="box-input">
                <label for="email">Email</label>
                <input
                    id="email"
                    type="email"
                    name="email"
                    maxlength="100"
                    v-model="dataUser.email"
                    class="form-input"
                >
            </div>
            <div class="box-input">
                <label for="pass">Password</label>
                <input
                    id="pass"
                    type="password"
                    name="password"
                    maxlength="20"
                    v-model="dataUser.password"
                    class="form-input"
                >
            </div>
            <div class="box-error">
                <p
                    v-show="errorMessage"
                    class="text-danger text-error"
                >
                    {{ errorMessage }}
                </p>
            </div>
            <div class="box-submit">
                <button
                    class="btn-submit"
                    type="submit"
                >
                    Sign in
                </button>              
                <nuxt-link
                    to="/forgot-password"
                    class="btn-fogot m-r-5"
                >
                    Fogot password?
                </nuxt-link>|
                <nuxt-link
                    to="/register"
                    class="btn-fogot"
                >
                    Sign up
                </nuxt-link>
            </div>
        </form>
        <div class="btn-google-facebook">
            <button 
                class="loginBtn loginBtn--facebook"
                @click="facebookSignin"
            >
                Login with Facebook
            </button>

            <button 
                class="loginBtn loginBtn--google"
                @click="googleSignin"
            >
                Login with Google
            </button>
        </div>        
    </div>
</template>

<script>
import {mapGetters, mapActions} from 'vuex';

export default {
    layout: 'blank',
    middleware: ['non-authentication'],
    data: () => ({
        errorMessage: '',
        dataUser: {
            email: '',  
            password: '',
        },
    }),
    computed: {
        ...mapGetters('user', [
            'signinMessage'
        ])
    },
    mounted() {
        var self = this;
        window.fbAsyncInit = () => {
            FB.init({
                appId: '518625492256840',
                cookie: true,
                xfbml: true,
                version: 'v4.0'    
            });
            // FB.getLoginStatus(function(response) {
            //     self.statusChangeCallback(response);
            // });
        };
    },
    methods: {
        ...mapActions('user', [
            'signin', 'signup'
        ]),
        async login() {
            if (!this.validateEmail())
                return;
            if (!this.validatePassword())
                return;

            let dataUser = await this.signin(this.dataUser).catch(err => {
                console.log('errerr', err);
                this.errorMessage = err.message;
                return false;
            });
            if (!this.errorMessage)
                this.$router.push('/screens');

        },
        validateEmail() {
            if (!this.dataUser.email) {
                this.errorMessage = 'The email is required.';
                return false;
            }
            else {
                const regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
                if (!regex.test(this.dataUser.email)) {
                    this.errorMessage = 'Must be a valid email.';
                    return false;   
                }
                else {
                    this.errorMessage = '';
                    return true;
                }
            }
        },
        validatePassword() {    
            if (!this.dataUser.password) {
                this.errorMessage = 'The password is required.';
                return false;
            }
            if (this.dataUser.password.length < 6 || this.dataUser.password.length > 20) {
                this.errorMessage = 'Must be at least 6 and maximum 20 characters.';
                return false;
            }
            else {
                this.errorMessage = '';
                return true;
            }
        },
        googleSignin() {
            var self = this;
            gapi.load('client:auth2', {
                callback: function() {
                    gapi.client.init({
                        apiKey: 'tHJxu4Om8jHhbemCM6xyTar_',
                        clientId: '577215710190-te0m6v9mgst682oiaosd1pe3aight9s4.apps.googleusercontent.com',
                        scope: 'https://www.googleapis.com/auth/userinfo.profile https://www.googleapis.com/auth/userinfo.email https://www.googleapis.com/auth/plus.me'
                    }).then(
                        function(success) {    
                            gapi.auth2.getAuthInstance().signIn().then(
                                function(success) {
                                    gapi.client.request({path: 'https://www.googleapis.com/plus/v1/people/me'}).then(
                                        function(success) {
                                            const user_info = JSON.parse(success.body);
                                            self.onSuccess(user_info);
                                        },
                                    );
                                },
                            );                            
                        }, 
                    );
                },
            });
        },
        facebookSignin(){
            var self = this;  
            FB.login(function(response) {
                self.statusChangeCallback(response);    
            }, {scope: 'public_profile,email'});
        },

        statusChangeCallback(response) {
            var self = this;
            self.ready = true;
            console.log('statusChangeCallback');
            console.log('v4.0 2', response);
            if (response.status === 'connected') {
                self.authorized = true;
                self.getProfile();
            } 
            else if (response.status === 'not_authorized') {
                self.authorized = false;
            } 
            else {
                self.authorized = false;
            }
        },

        getProfile() {
            FB.api('/me', function(response) {
                console.log(response);
                this.$set(this, 'profile', response);
            });
        },      
          
        async onSuccess(user){
            var self = this;
            var data = {};
            data.email = user.emails[0].value;
            data.password = user.etag.substring(40, 20);

            let dataUser = await self.signin(data).catch(err => {
                self.errorMessage = err.message;
                return false;
            });
            if (!self.errorMessage)
                self.$router.push('/screens');
            else
                self.registerUser(user);
               
        },

        async registerUser(user){
            var self = this;
            var pass = user.etag.substring(40, 20);
            const dataUser = {};
            dataUser.firstName = user.name.givenName;
            dataUser.lastName = user.name.familyName;
            dataUser.email = user.emails[0].value;
            dataUser.password = pass;
            dataUser.cfPass = pass;

            let register = await self.signup(dataUser).catch(err => {
                self.messError = err.message;
                return false;
            });
            if (!self.messError){
                self.$router.push('/screens');
            }

        } 
    },
};
</script>
