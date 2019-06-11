<template>
    <div class="content-register">
        <div class="container-title">
            <h3>Sign Up</h3>
            <h2>Welcome to Experia Group</h2>
            <p>Sign up for your 14 days free trial!</p>
        </div>
        <div class="container-form d-flex flex-wrap">
            <div class="box-input">
                <label for="firstName">Firs Name</label>
                <input
                    id="firstName"
                    type="text"
                    class="form-input"
                    :class="{'': errors.has('first-name')}"
                    name="firstName"
                    maxlength="50"
                >
                <p
                    v-show="errors.has('first-name')"
                    class="text-danger text-error"
                >
                    {{ errors.first('first-name') }}
                </p>
            </div>
            <div class="box-input">
                <label for="lastName">Last Name</label>
                <input
                    id="lastName"
                    type="text"
                    class="form-input"
                    :class="{'': errors.has('last-name')}"
                    name="lastName"
                    maxlength="50"
                >
                <p
                    v-show="errors.has('last-name')"
                    class="text-danger text-error"
                >
                    {{ errors.first('last-name') }}
                </p>
            </div>
            <div class="box-input">
                <label for="phone">Phone No</label>
                <input
                    id="phone"
                    type="text"
                    class="form-input"
                    :class="{'': errors.has('phone')}"
                    name="phone"
                    maxlength="20"
                >
                <p
                    v-show="errors.has('phone')"
                    class="text-danger text-error"
                >
                    {{ errors.first('phone') }}
                </p>
            </div>
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
            <div class="box-input">
                <label for="cf-pass">Comfirm Password</label>
                <input
                    id="cf-pass"
                    type="password"
                    class="form-input"
                    :class="{'border-danger': errors.has('cf-password')}"
                    name="cf-password"
                    maxlength="20"
                    v-model="password"
                    v-validate="'required|min:6'"
                >
                <p
                    v-show="errors.has('cf-password')"
                    class="text-danger text-error"
                >
                    {{ errors.first('cf-password') }}
                </p>
            </div>
            <div class="box-submit">
                <button
                    class="btn-submit"
                    @click="signup"
                >
                    Sign Up
                </button>
                <p class="have-account">
                    Already have an account?
                    <nuxt-link
                        to="/login"
                        class="btn-to-signin"
                    >
                        Sign in
                    </nuxt-link>
                </p>
            </div>
        </div>
    </div>
</template>
<script>
import {mapGetters, mapActions} from 'vuex';

export default {
    layout: 'blank'
};
</script>