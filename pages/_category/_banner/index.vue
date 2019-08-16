<template>
    <section
        class="container-preview" 
        :style="{fontSize: sizeScale*sizeChange * (13 / sizeScale) + 'px', width: '100%', height: '100vh'}" 
    >
        <element-container
            ref="elementContainer" 
            :root="this" 
            :design-mode="false" 
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
export default {
    layout: 'render',
    data: () => ({
        banner: null,
        sizeScale: null,
        sizeChange: 1,
        unitScale: 13 / 928, // fontSize/containerWidth,
        ratioSize: null,
    }),
    components: {
        ElementContainer
    },
    async created() {
        console.log('this.$route', this.$route);
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
