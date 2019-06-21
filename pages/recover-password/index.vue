<template>
    <div class="content-recover">
        <div class="container-title">
            <h3>Forgot Passwords</h3>
            <h2>Recover password</h2>
            <p>Enter your new password</p>
        </div>
        <div class="container-form">
            <div class="box-input input-pass">
                <label for="pass">Password</label>
                <input
                    id="pass"
                    type="password"
                    name="password"
                    maxlength="20"
                    v-model="data.password"
                    class="form-input"
                    :class="{'error' : errorPass}"
                >
            </div>
            <div class="box-input input-cf-pass">
                <label for="cf-pass">Comfirm Password</label>
                <input
                    id="cf-pass"
                    type="password"
                    name="cf-password"
                    maxlength="20"
                    v-model="data.cfPassword"
                    class="form-input"
                    :class="{'error' : errorPass}"
                >
            </div>
            <div class="box-error">
                <p
                    v-show="errorPass"
                    class="text-danger text-error"
                >
                    {{ errorMessage }}
                </p>
            </div>
            <div class="box-submit">
                <button
                    class="btn-submit"
                    @click="recover"
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
        errorMessage: '',
        errorPass: '',
        data: {
            password: '',
            cfPassword: '',
        },
    }),
    methods: {
        async recover() {
            if (!this.validatePassword())
                return;
            if (this.data.password !== this.data.cfPassword) {
                this.errorPass = true;
                this.errorMessage = 'Comfirm password incorrect';
                return;
            }

            this.$router.push('/');

        },
        validatePassword() {
            if (!this.data.password || !this.data.cfPassword) {
                this.errorPass = true;
                this.errorMessage = 'The password is required.';
                return false;
            }
            if (this.data.password.length < 6 || this.data.password.length > 20 || this.data.cfPassword.length < 6 || this.data.cfPassword.length > 20) {
                this.errorPass = true;
                this.errorMessage = 'Must be at least 6 and maximum 20 characters.';
                return false;
            }
            else {
                this.errorPass = false;
                this.errorMessage = '';
                return true;
            }
        }
    }
};
</script>