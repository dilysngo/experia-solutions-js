<template>
    <section
        class="container-preview" 
        :style="{fontSize: sizeScale*sizeChange * (13 / sizeScale) + 'px', width: '100%', height: '100vh'}" 
        @dblclick="handleFullScreen"
    >
        <element-container
            ref="elementContainer" 
            :root="this" 
            :design-mode="false" 
            :is-preview="true"
            v-if="banner && banner.template" 
            :source="banner.template"
            :size-scale="sizeScale"
            :ratio-size="ratioSize"
        />
    </section>
</template>

<script>
import {getRatioSize} from '~/helpers/dataHelper';
import ElementContainer from '~/components/elements/ElementContainer';
import Vue from 'vue';
Vue.component('element-container', ElementContainer);

export default {
    layout: 'render',
    data: () => ({
        banner: null,
        flag: false,
        sizeScale: null,
        sizeChange: 1,
        unitScale: 13 / 928, // fontSize/containerWidth,
        ratioSize: null,
    }),
    async created() {
        await this.getBannerBySlug();
    },
    mounted() {
        this.getSizeScale();
        window.onresize = () => {
            this.getSizeScale();
        };
    },
    methods: {
        async getBannerBySlug() {
            let slug = "";
            slug = this.$route && this.$route.path;
            let results = await this.$axios.$get(`api/screen/banner?slug=${slug}`);
            if (results) {
                this.ratioSize = getRatioSize(results.ratio.value);
                this.banner = results.template;
            }
        },
        handleFullScreen(){
            this.flag = !this.flag;
            var elem = document.documentElement;

            if (this.flag){
                if (elem.requestFullscreen) {
                    elem.requestFullscreen();
                } 
                else if (elem.mozRequestFullScreen) {
                    elem.mozRequestFullScreen();
                } 
                else if (elem.webkitRequestFullscreen) { 
                    elem.webkitRequestFullscreen();
                } 
                else if (elem.msRequestFullscreen) {
                    elem.msRequestFullscreen();
                }
            }
            else {
                if (document.exitFullscreen) {
                    document.exitFullscreen();
                } 
                else if (document.mozCancelFullScreen) {
                    document.mozCancelFullScreen();
                }
                else if (document.webkitExitFullscreen) {
                    document.webkitExitFullscreen();
                } 
                else if (document.msExitFullscreen) {
                    document.msExitFullscreen();
                }                
            }
        },
        getSizeScale() {
            console.log('resize');
            setTimeout(() => {
                let containerWidth = $('.container-preview').width();
                let containerHeight = $('.container-preview').height();
                this.sizeScale = containerWidth * this.unitScale;

                if (containerWidth > containerHeight && containerHeight > this.ratioSize.height) {
                    this.sizeChange = containerHeight / this.ratioSize.height;
                }
                else if (containerWidth < containerHeight && containerWidth > this.ratioSize.width) {
                    this.sizeChange = containerWidth / this.ratioSize.width;
                }

            }, 100);
        },
    }
};
</script>
