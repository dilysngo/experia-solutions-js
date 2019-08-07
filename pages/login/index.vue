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
    methods: {
        ...mapActions('user', [
            'signin'
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
        }
    }
};
</script>
