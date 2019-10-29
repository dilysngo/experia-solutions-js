<template>
    <div class="content-register">
        <div class="container-title">
            <h3>Sign Up</h3>
            <h2>Welcome to Experia Group</h2>
            <p>Sign up for your 14 days free trial!</p>
        </div>
        <form 
            class="container-form d-flex flex-wrap"
            @submit.prevent="register"
        >
            <div class="box-input">
                <label for="firstName">
                    First Name <span class="requied">*</span>
                </label>
                <input
                    id="firstName"
                    type="text"
                    name="firstName"
                    maxlength="20"
                    v-model="data.firstName"
                    class="form-input"
                    :class="{'error' : errorFirstName}"
                >
            </div>
            <div class="box-input">
                <label for="lastName">
                    Last Name <span class="requied">*</span>
                </label>
                <input
                    id="lastName"
                    type="text"
                    name="lastName"
                    maxlength="20"
                    v-model="data.lastName"
                    class="form-input"
                    :class="{'error' : errorLastName}"
                >
            </div>
            <div class="box-input">
                <label for="phone">
                    Phone <span class="requied">*</span>
                </label>
                <input
                    id="phone"
                    type="text"
                    name="phone"
                    maxlength="12"
                    v-model="data.phone"
                    @keyup="keyphone"
                    class="form-input"
                    :class="{'error' : errorPhone}"
                >
            </div>
            <div class="box-input">
                <label for="email">
                    Email <span class="requied">*</span>
                </label>
                <input
                    id="email"
                    type="text"
                    name="email"
                    maxlength="50"
                    v-model="data.email"
                    class="form-input"
                    :class="{'error' : errorEmail}"
                >
            </div>
            <div class="box-input box-input-pass">
                <label for="pass">
                    Password <span class="requied">*</span>    
                </label>
                <input
                    id="pass"
                    type="password"
                    name="password"
                    maxlength="30"
                    v-model="data.password"
                    class="form-input"
                    :class="{'error' : errorPass}"
                >
            </div>
            <div class="box-input box-input-pass">
                <label for="cf-pass">
                    Comfirm Password <span class="requied">*</span>
                </label>
                <input
                    id="cf-pass"
                    type="password"
                    name="cf-password"
                    maxlength="30"
                    v-model="data.cfPass"
                    class="form-input"
                    :class="{'error' : errorPass}"
                >
            </div>
            <div class="box-error">
                <p
                    class="text-danger text-error"
                >
                    {{ messError }}
                </p>
            </div>
            <div class="box-submit">
                <button
                    class="btn-submit"
                    type="submit"
                >
                    Sign up
                </button>
                <p class="have-account">
                    Already have an account?
                    <nuxt-link
                        to="/"
                        class="btn-to-signin"
                    >
                        Sign in
                    </nuxt-link>
                </p>
            </div>
        </form>
    </div>
</template>
<script>
import {mapGetters, mapActions} from 'vuex';
import moment from 'moment';
export default {
    layout: 'blank',
    data: () => ({
        dataUser: '',
        messError: '',
        errorFirstName: '',
        errorLastName: '',
        errorPhone: '',
        errorEmail: '',
        errorPass: '',
        data: {
            firstName: '',
            lastName: '',
            phone: '',
            email: '',
            password: '',
            cfPass: ''
        },
    }),
    methods: {
        ...mapActions('user', [
            'signup'
        ]),
        ...mapActions('screen', [
            'createScreen'
        ]),
        async register() {
            if (!this.validateFirstName())
                return;
            if (!this.validateLastName())
                return;
            if (!this.validatePhone())
                return;
            if (!this.validateEmail())
                return;
            if (!this.validatePassword())
                return;
            if (this.data.password !== this.data.cfPass) {
                this.errorPass = true;
                this.messError = 'Comfirm password incorrect';
                return;
            }
            this.dataUser = await this.signup(this.data).catch(err => {
                this.messError = err.message;
                return false;
            });

            if (!this.messError) {
                let dataCreate = {
                    userId: this.dataUser.id,
                    template: {
                        id: 0,
                        code: 0,
                        name: '',
                        slug: '',
                        isDrag: true,
                        template: null,
                        ratio: '',
                        category: '',
                    },
                    name: `Screen-${moment(new Date()).format('MM/DD/YYYY hh:mm:ss')} ${this.dataUser.id}`,
                    // categoryId: 1,
                    // ratioId: 3,
                    slug: ''
                };
                const data = await this.createScreen(dataCreate).catch(err => {
                    this.messError = err.message;
                    return false;
                });

                if (!this.messError) 
                    this.$router.push('/screens');
            }
        },
        validateFirstName() {
            if (!this.data.firstName) {
                this.errorFirstName = true;
                this.messError = 'Name is required';
                return false;
            }
            else {
                if (/\d/.test(this.data.firstName)) {
                    this.errorFirstName = true;
                    this.messError = 'Name do not contains number';
                    return false;
                }
                else {
                    this.errorFirstName = false;
                    this.messError = '';
                    return true;
                }
            }
        },
        validateLastName() {
            if (!this.data.lastName) {
                this.errorLastName = true;
                this.messError = 'Name is required';
                return false;
            }
            else {
                if (/\d/.test(this.data.lastName)) {
                    this.errorLastName = true;
                    this.messError = 'Name do not contains number';
                    return false;
                }
                else {
                    this.errorLastName = false;
                    this.messError = '';
                    return true;
                }
            }
        },
        validatePhone() {
            if (!this.data.phone) {
                this.errorPhone = true;
                this.messError = 'The phone is required.';
                return false;
            }
            else {
                this.errorPhone = false;
                this.messError = '';
                return true;
            }
        },
        validateEmail() {
            if (!this.data.email) {
                this.errorEmail = true;
                this.messError = 'The email is required.';
                return false;
            }
            else {
                const regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
                if (!regex.test(this.data.email)) {
                    this.errorEmail = true;
                    this.messError = 'Must be a valid email.';
                    return false;
                }
                else {
                    this.errorEmail = false;
                    this.messError = '';
                    return true;
                }
            }
        },
        validatePassword() {
            if (!this.data.password) {
                this.errorPass = true;
                this.messError = 'The password is required.';
                return false;
            }
            if (this.data.password.length < 6 || this.data.password.length > 20) {
                this.errorPass = true;
                this.messError = 'Must be at least 6 and maximum 20 characters.';
                return false;
            }
            else {
                this.errorPass = false;
                this.messError = '';
                return true;
            }
        },
        keyphone() {
            this.data.phone = this.data.phone.replace(/[^0-9\-]/g, '');
            if (this.data.phone.length === 3)
                this.data.phone = this.data.phone + '-';
            if (this.data.phone.length === 7)
                this.data.phone = this.data.phone + '-';
        }
    }
};
</script>