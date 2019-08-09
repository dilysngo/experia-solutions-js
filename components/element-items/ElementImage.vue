<template>
    <div
        class="element-box" 
        :class="designMode ? 'boder-work' : ''"
        :style="{top: setting.stylesBox.top/13 + 'em', left: setting.stylesBox.left/13 + 'em', width: setting.stylesBox.width/13 + 'em', height: setting.stylesBox.height/13 + 'em', position: setting.stylesBox.position, zIndex:setting.stylesBox.zIndex}"
        @click="openSetting"
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
            <!-- <element-control-box
                :root="root"
                v-if="designMode"
                :source="source"
                :title="title"
                :controls="controls"
            /> -->
            <div
                class="element-not-data"
                v-if="!setting.url"
            >
                <element-icon
                    v-if="designMode"
                    icon-class="icon-picture"
                    title="Image"
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
                    class="box-elimage"
                    :style="{'text-align': style['text-align']}"  
                >
                    <a
                        :style="`background-image:url(${convertToUrl(setting.url)}); background-size: ${style.backgroundSize}; width: ${style.width}; height: ${style.height}`"
                        class="img-element auto-height fix-mobile"
                    />
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import {convertToUrl} from '~/helpers/dataHelper';

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
        sizeScale: {
            type: Number,
            default: null
        },
        landingId: {
            type: String,
            default: ''
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
            width: {
                enable: true
            },
            height: {
                enable: true
            },
            link: {
                enable: true
            },
            btnUpload: {
                enable: true
            },
            btnSubmit: {
                enable: true
            },
            backgroundSize: {
                enable: true
            },
            elementAlign: {
                enable: true
            },
            verticalAlign: {
                enable: true
            },
            track: {
                enable: true
            },

        },
        convertToUrl: convertToUrl
    }),
    created() {
        this.reset();
    },
    watch: {
       
    },
    methods: {
        reset() {
            console.log('Reset media', this.source);
            console.log('sizeScale', this.sizeScale);
            this.style = {};
            this.setting = {};

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
        }
    }
};
</script>
