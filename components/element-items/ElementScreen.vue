<template>
    <div
        class="element-box" 
        :class="designMode ? 'boder-work' : ''"
        :style="{top: setting.stylesBox.top/13 + 'em', left: setting.stylesBox.left/13 + 'em', width: setting.stylesBox.width/13 + 'em', height: setting.stylesBox.height/13 + 'em', position: setting.stylesBox.position, zIndex:setting.stylesBox.zIndex}"
        @click="openSetting"
        :data-element="this.key + '-' + this.isPreview.toString()"
    >
        <element-resize
            :root="root" 
            v-if="designMode"
            :source="source"
            :path="path"
            :ref="'resize-'+key"
        />
        <div
            class="element-form-default"
            draggable="true"
            @dragstart="dragstart_handler($event)"
            @mousedown="mouseDown($event)"
        >
            <element-control-box
                :root="root"
                v-if="designMode"
                :source="source"
                :title="title"
                :controls="controls"
            />
            <div
                class="element-not-data"
                v-if="!banner"
            >
                <element-icon
                    v-if="designMode"
                    icon-class="icon-aws fa fa-desktop size-20"
                    title="Screen"
                />
            </div>
            <div
                class="element-have-data"
                :class="setting.verticalAlign"
                style="margin: 0px -15px"
                :style="{margin: setting.marginTop + 'em ' + setting.marginRight + 'em ' + setting.marginBottom + 'em ' + setting.marginLeft + 'em', padding: setting.paddingTop + 'em ' + setting.paddingRight + 'em ' + setting.paddingBottom + 'em '+ setting.paddingLeft + 'em' }"
                v-else 
            >
                <div
                    :class="'container-screen-preview-'+key+'-'+isPreview.toString()" 
                    :style="{fontSize: sizeScaleScreen*sizeChange * (13 / sizeScaleScreen) + 'px'}" 
                >
                    <element-container
                        ref="elementContainer" 
                        :root="this" 
                        :design-mode="false" 
                        v-if="banner && banner.template" 
                        :source="banner.template"
                        :size-scale="sizeScaleScreen"
                        :ratio-size="ratioSize"
                    />
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import {getRatioSize} from '~/helpers/dataHelper';
import ElementContainer from '~/components/elements/ElementContainer';
import Vue from 'vue';
Vue.component('element-container', ElementContainer);

export default {
    props: {
        root: {
            type: Object,
            default: () => {}
        },
        designMode: {
            type: Boolean,
            default: false
        },
        isPreview: {
            type: Boolean,
            default: false
        },
        sizeScale: {
            type: Number,
            default: null
        },
        source: {
            type: Object,
            default: () => {}            
        }
    },
    data: () => ({
        title: 'Image',
        key: '',
        path: '',
        style: {},
        setting: {},
        controls: {
            // width: {
            //     enable: true
            // },
            // height: {
            //     enable: true
            // },
            btnSubmit: {
                enable: true
            },
            elementAlign: {
                enable: true
            },
            verticalAlign: {
                enable: true
            },
            screen: {
                enable: true
            }
        },
        banner: null,
        sizeScaleScreen: null,
        unitScale: 13 / 928, // fontSize/containerWidth,
        ratioSize: null,
        sizeChange: 1,
    }),
    created() {
        this.reset();
    },
    mounted() {
    },
    watch: {
       
    },
    components: {
        // ElementContainer
    },
    methods: {
        async reset() {
            console.log('Reset media', this.source);
            console.log('sizeScale', this.sizeScaleScreen);
            this.style = {};
            this.setting = {};
            this.banner = null;

            if (this.source) {
                this.key = this.source.key;
                this.path = this.source.path;

                if (!this.source.style)
                    this.source.style = {};
                else
                    this.style = {...this.style, ...this.source.style};

                if (!this.source.setting)
                    this.source.setting = {};
                else
                    this.setting = {...this.setting, ...this.source.setting};

                if (this.$refs['resize-' + this.key])
                    this.$refs['resize-' + this.key].reset();

                if (this.source.setting.screenId) {
                    let results = await this.$axios.get(`api/screen/${this.source.setting.screenId}`);
                    if (results) {
                        this.ratioSize = getRatioSize(results.data.ratio && results.data.ratio.value);
                        this.banner = results.data.template;
                        this.getSizeScale();
                    }
                }

            }

            // if (!this.style.height)
            //     this.source.style.height = 150 / 13 + 'em';
            // if (!this.style.width)
            //     this.source.style.width = 200 / 13 + 'em';
        },
        dragstart_handler(ev) {
            if (!this.designMode)
                return;
            // Add the target element's id to the data transfer object
            ev.dataTransfer.setData('application/json', JSON.stringify(this.source));
            ev.dataTransfer.dropEffect = "move";
            document.getElementById(this.key).classList.add('is-drag');
        },
        openSetting() {
            if (!this.designMode)
                return;

            this.root.$refs.elementSetting.open({instance: this, key: this.source.key, path: this.source.path, style: this.source.style, setting: this.source.setting, controls: this.controls});
            this.root.isSetting = true;
            this.root.elementSelected = this.source;
        },
        mouseDown(ev) {
            this.source.setting.stylesBox.x = ev.x * (13 / this.sizeScale);
            this.source.setting.stylesBox.y = ev.y * (13 / this.sizeScale);
        },
        getSizeScale() {
            console.log('resize');
            setTimeout(() => {
                let containerWidth = $(`[data-element="${this.key + '-' + this.isPreview.toString()}"]`).width();
                let containerHeight = $(`[data-element="${this.key + '-' + this.isPreview.toString()}"]`).height();
                
                this.sizeScaleScreen = containerWidth * this.unitScale;

                if (containerWidth > containerHeight) {
                    this.sizeChange = containerHeight / this.ratioSize.height;
                }
                else if (containerWidth < containerHeight) {
                    this.sizeChange = containerWidth / this.ratioSize.width;
                }

            }, 100);
        },
    }
};
</script>
