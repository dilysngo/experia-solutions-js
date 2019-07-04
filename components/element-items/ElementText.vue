<template>
    <div
        class="element-box" 
        :style="{position: setting.position, top: setting.top, left: setting.left}"
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
            // console.log('Reset phone');
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
    }
};
</script>
