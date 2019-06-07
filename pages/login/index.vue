<template>
    <section class="login-page d-flex">
        <div class="banner-left d-flex flex-column justify-content-between">
            <div class="container-logo">
                <nuxt-link to="/">
                    <img
                        src="/images/logo-experia.png"
                        alt="logo"
                        class="logo"
                    >
                </nuxt-link>
            </div>
            <div class="container-info">
                <div class="row-info">
                    <h4>Contact info</h4>
                    <div class="box-content">
                        Tel: 021 - 12323455
                        <br>
                        Mobile : 0909 123 123
                    </div>
                </div>
                <div class="row-info">
                    <h4>Address</h4>
                    <div class="box-content">
                        Nguyen Dinh Chieu Street, Ward 4, District 3, 
                        Ho Chi Minh City.
                    </div>
                </div>
            </div>
        </div>
        <div class="content-right">
            <div class="wrapper-content">
                <div class="container-title">
                    <h3>Sign In</h3>
                    <h2>Welcome to Eperia Group</h2>
                </div>
                <div class="container-form d-flex flex-wrap">
                    <div class="box-input">
                        <label for="email">Email</label>
                        <input
                            id="email"
                            type="text"
                            placeholder="Your Email"
                            class="form-input"
                            :class="{'': errors.has('email')}"
                            name="email"
                            maxlength="100"
                            v-model="email"
                            v-validate="'required|email'"
                        >
                        <p
                            v-show="errors.has('email')"
                            class="text-danger text-error"
                        >
                            {{ errors.first('email') }}
                        </p>
                    </div>
                    <div class="box-input">
                        <label for="pass">Password</label>
                        <input
                            id="pass"
                            type="password"
                            placeholder="Password"
                            autocomplete="new-password"
                            class="form-input"
                            :class="{'border-danger': errors.has('password')}"
                            name="password"
                            maxlength="20"
                            v-model="password"
                            v-validate="'required|min:6'"
                        >
                        <p
                            v-show="errors.has('password')"
                            class="text-danger text-error"
                        >
                            {{ errors.first('password') }}
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
        </div>
    </section>
</template>

<script>
import {mapGetters, mapActions} from 'vuex';

export default {
    layout: 'blank',
    middleware: ['non-authentication'],
    data: () => ({
        email: '',
        password: '',
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
            const isValid = await this.$validator.validate();
            if (isValid) {
                const userAuth = await this.signin({
                    email: this.email,
                    password: this.password
                });
                if (userAuth)
                    this.$router.push('/');
            }
        }
    }
};
</script>
