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
        sizeScale: null,
        sizeChange: 1,
        unitScale: 13 / 928, // fontSize/containerWidth,
        ratioSize: null,
        interval: null,
        flag: false,
        time: 0,
        counter: 0,
    }),
    components: {
        
    },
    async created() {
    },
    async mounted() {
        await this.getPlaylistBySlug();
        window.onresize = () => {
            this.getSizeScale();
        };    
    },
    methods: {
        async getPlaylistBySlug() {
            let slug = "";
            let i = 0;

            slug = this.$route && this.$route.params.id;
            let results = await this.$axios.$get(`api/playlist/playlist?slug=/${slug}`);

            if (results.screens.length) {
                this.getScreen(results.screens[i]);

                this.interval = setInterval(() => {
                    this.counter = this.counter + 1;
                    if (this.counter > this.time) {
                        i = i + 1;
                        if (i >= results.screens.length) {
                            clearInterval(this.interval);
                            return;
                        }
                        this.getScreen(results.screens[i]);
                    }
                }, 1000);
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
        getScreen(data) {
            this.counter = 0;
            this.time = data.time;
            this.banner = null;
            this.ratioSize = getRatioSize(data.data.ratio.value);
            this.getSizeScale();

            this.$nextTick(() => {
                this.banner = data.data.template;
            });
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
