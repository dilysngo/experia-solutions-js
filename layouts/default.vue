<template>
    <div class="theme-default">
        <div class="main-content">
            <div class="col-left row no-gutters">
                <menu-left />
            </div>
            <div class="col-right">
                <site-header />
                <div class="body">
                    <nuxt />
                </div>
            </div>
        </div>
        <no-ssr>
            <notifications
                group="success"
                position="top right"
            >
                <template
                    slot="body"
                    slot-scope="props"
                >
                    <div class="notify-complete">
                        <div class="box-inline">
                            <i
                                class="fa fa-check-circle-o"
                                aria-hidden="true"
                            />
                        </div>
                        <div class="box-inline">
                            <h3>{{ props.item.title }}</h3>
                            <h4 v-html="props.item.text" />
                        </div>
                        <div class="box-inline text-right">
                            <button
                                class="btn-white"
                                @click="props.close"
                            >
                                <img src="~/assets/images/shape.svg">
                            </button>
                        </div>
                    </div>
                </template>
            </notifications>
        </no-ssr>
        <no-ssr>
            <notifications
                group="warning"
                position="top right"
            >
                <template
                    slot="body"
                    slot-scope="props"
                >
                    <div class="notify-warning">
                        <div class="box-inline">
                            <i
                                class="fa fa-exclamation-triangle"
                                aria-hidden="true" 
                            />
                        </div>
                        <div class="box-inline">
                            <h3>{{ props.item.title }}</h3>
                            <h4 v-html="props.item.text" />
                        </div>
                        <div class="box-inline text-right">
                            <button
                                class="btn-white"
                                @click="props.close"
                            >
                                <img src="~/assets/images/shape.svg">
                            </button>
                        </div>
                    </div>
                </template>
            </notifications>
        </no-ssr> 
        <no-ssr>
            <notifications
                group="error" 
                position="top right"
            >
                <template
                    slot="body"
                    slot-scope="props"
                >
                    <div class="notify-error">
                        <div class="box-inline">
                            <i
                                class="fa fa-exclamation-triangle"
                                aria-hidden="true" 
                            />
                        </div>
                        <div class="box-inline">
                            <h3>{{ props.item.title }}</h3>
                            <h4 v-html="props.item.text" />
                        </div>
                        <div class="box-inline text-right">
                            <button
                                class="btn-white"
                                @click="props.close"
                            >
                                <img src="~/assets/images/shape.svg">
                            </button>
                        </div>
                    </div>
                </template>
            </notifications>
        </no-ssr>   
    </div>
</template>

<script>
import {mapGetters, mapActions} from 'vuex';
import MenuLeft from '~/components/MenuLeft';
import SiteHeader from '~/components/SiteHeader';

export default {
    components: {
        MenuLeft,
        SiteHeader
    },
    created() {
        if (process.browser && this.$auth.isAuthenticated())
            this.connectMessageSocket();
    },
    methods: {
        ...mapActions('socket', [
            'connectMessageSocket'
        ])
    }
};
</script>
