<template>
    <div class="content-forgot">
        <div class="container-title">
            <h3>Forgot Passwords</h3>
            <h2>Recover password</h2>
            <p>Enter your email address we'll send you link to reset your password</p>
        </div>
        <div class="container-form">
            <div class="box-input">
                <label for="email">Email</label>
                <input
                    id="email"
                    type="email"
                    name="email"
                    maxlength="100"
                    v-model="email"
                    class="form-input"
                    :class="{'error' : errorEmail}"
                >
            </div>
            <div class="box-error">
                <p
                    v-show="errorEmail"
                    class="text-danger text-error"
                >
                    {{ messErrorEmail }}
                </p>
            </div>
            <div class="box-submit">
                <button
                    class="btn-submit"
                    @click="forgot"
                >
                    Continute
                </button>
                <nuxt-link
                    to="/login"
                    class="btn-come-back"
                >
                    Comeback
                </nuxt-link>
            </div>
        </div>
    </div>
</template>
<script>
import {mapGetters, mapActions} from 'vuex';

export default {
    layout: 'blank',
    data: () => ({
        email: '',
        errorEmail: '',
        messErrorEmail: '',
    }),
    methods: {
        async forgot() {
            if (!this.validateEmail())
                return;
            
            this.$router.push('/');

        },
        validateEmail() {
            if (!this.email) {
                this.errorEmail = true;
                this.messErrorEmail = 'The email is required!';
                return false;
            }
            else {
                const regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
                if (!regex.test(this.email)) {
                    this.errorEmail = true;
                    this.messErrorEmail = 'The email is wrong!';
                    return false;
                }
                else {
                    this.errorEmail = false;
                    this.messErrorEmail = '';
                    return true;
                }
            }
        },
    }
};
</script>