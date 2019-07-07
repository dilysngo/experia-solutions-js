<template>
    <div
        class="element-box" 
        :class="designMode ? 'boder-work' : ''"
        :style="{top: setting.stylesBox.top + 'px', left: setting.stylesBox.left + 'px', width: setting.stylesBox.width + 'px', height: setting.stylesBox.height + 'px', position: setting.stylesBox.position}"
        draggable="true"
        @dragstart="dragstart_handler($event)"
        @click="openSetting"
    >
        <div class="element-form-default">
            <element-control-box
                :root="root"
                v-if="designMode"
                :source="source"
                :title="title"
                :controls="controls"
            />
            <div
                class="element-not-data"
                v-if="!setting.content"
            >
                <element-icon
                    v-if="designMode"
                    icon-class="icon-text"
                    title="Text"
                />
            </div>
            <div
                class="element-have-data"  
                :style="{margin: setting.marginTop + 'em ' + setting.marginRight + 'em ' + setting.marginBottom + 'em ' + setting.marginLeft + 'em', padding: setting.paddingTop + 'em ' + setting.paddingRight + 'em ' + setting.paddingBottom + 'em '+ setting.paddingLeft + 'em' }"
                :class="[setting.verticalAlign]"
                v-else
            >
                <div
                    :style="style"
                    v-html="setting.content" 
                />
            </div>
        </div>
    </div>
</template>

<script>
var WebFont;
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
        templateId: {
            type: String,
            default: ''
        },
        source: {
            type: Object,
            default: () => {}            
        }
    },
    data: () => ({
        title: 'Text',
        key: '',
        path: '',
        style: {},
        setting: {
            url: null,
            placeholder: null,
            content: null,
        },
        controls: {
            font: {
                enable: true
            },
            textEditor: {
                enable: true
            },
            btnSubmit: {
                enable: true
            },
            verticalAlign: {
                enable: true
            },
            track: {
                enable: true
            },
        },
        mode: true
    }),
    created() {
        this.reset();
        this.mode = this.designMode;
    },
    mounted() {
        WebFont = require('webfontloader');
    },
    watch: {
        mode: function(newVal) {
            // console.log('newVal', newVal);
        },
        style: {
            handler(value) {
                let font = [];
                if (value['font-family']) {
                    font.push(value['font-family']);
                    if (WebFont)
                        WebFont.load({
                            google: {
                                families: font
                            }
                        });
                }
            },
            deep: true
        }
    },
    methods: {
        reset() {
            console.log('Reset phone');
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
            }
        },
        dragstart_handler(ev) {
            // Add the target element's id to the data transfer object
            ev.dataTransfer.setData('application/json', JSON.stringify(this.source));
            ev.dataTransfer.dropEffect = "move";
            document.getElementById(this.key).classList.add('is-drag');
        },
        openSetting() {
            this.root.$refs.elementSetting.open({instance: this, key: this.source.key, path: this.source.path, style: this.source.style, setting: this.source.setting, controls: this.controls});
            this.root.isSetting = true;
        }
    }
};
</script>
