<template>
    <div class="content-login">
        <div class="container-title">
            <h3>Sign In</h3>
            <h2>Welcome to Eperia Group</h2>
        </div>
        <div class="container-form d-flex flex-wrap">
            <div class="box-input">
                <label for="email">Email</label>
                <input
                    id="email"
                    type="email"
                    name="email"
                    maxlength="100"
                    v-model="dataUser.email"
                    class="form-input"
                    :class="{'error' : errorEmail}"
                >
                <div class="box-error">
                    <p
                        v-show="errorEmail"
                        class="text-danger text-error"
                    >
                        {{ messErrorEmail }}
                    </p>
                </div>
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
                    :class="{'error' : errorPass}"
                >
                <div class="box-error">
                    <p
                        v-show="errorPass"
                        class="text-danger text-error"
                    >
                        {{ messErrorPass }}
                    </p>
                </div>
            </div>
            <div class="box-error">
                <p
                    class="text-danger text-error"
                >
                    {{ errorMessage }}
                </p>
            </div>
            <div class="box-submit">
                <button
                    class="btn-submit"
                    @click="login"
                >
                    Sign in
                </button>
                <nuxt-link
                    to="/forgot-password"
                    class="btn-fogot"
                >
                    Fogot password?
                </nuxt-link>
            </div>
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
        errorEmail: '',
        messErrorEmail: '',
        errorPass: '',
        messErrorPass: '',
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
            let flag = true;
            if (!this.validateEmail())
                flag = false;
            if (!this.validatePassword())
                flag = false;
            if (flag === false)
                return;

            // let dataUser = await this.signin(this.dataUser);

            // if (dataUser && dataUser.Success){
            // }
            // else {
            //     this.errorUser = true;
            //     this.errorPass = true;
            //     this.errorMessage = dataUser ? 'Email or Password incorrect' : this.signinMessage;
            // }
            this.$router.push('/screens');

        },
        validateEmail() {
            if (!this.dataUser.email) {
                this.errorEmail = true;
                this.messErrorEmail = 'The email is required.';
                return false;
            }
            else {
                const regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
                if (!regex.test(this.dataUser.email)) {
                    this.errorEmail = true;
                    this.messErrorEmail = 'Must be a valid email.';
                    return false;
                }
                else {
                    this.errorEmail = false;
                    this.messErrorEmail = '';
                    return true;
                }
            }
        },
        validatePassword() {
            if (!this.dataUser.password) {
                this.errorPass = true;
                this.messErrorPass = 'The password is required.';
                return false;
            }
            if (this.dataUser.password.length < 6 || this.dataUser.password.length > 20) {
                this.errorPass = true;
                this.messErrorPass = 'Must be at least 6 and maximum 20 characters.';
                return false;
            }
            else {
                this.errorPass = false;
                this.messErrorPass = '';
                return true;
            }
        }
    }
};
</script>
