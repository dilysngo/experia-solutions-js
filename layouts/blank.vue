<template>
    <div class="theme-default theme-blank">
        <div class="blank-page d-flex">
            <div class="banner-left">
                <banner-left />
            </div>
            <div class="content-right">
                <nuxt />
            </div>
        </div>
    </div>
</template>
<script>
import BannerLeft from '~/components/BannerLeft';

export default {
    components: {
        BannerLeft,
    }
};
</script>
