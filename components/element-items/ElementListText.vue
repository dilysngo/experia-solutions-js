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
            <element-control-box
                :root="root"
                v-if="designMode"
                :source="source"
                :title="title"
                :controls="controls"
            />
            <div
                class="element-not-data"
                v-if="!setting.listItem || !setting.listItem.length"
            >
                <element-icon
                    v-if="designMode"
                    icon-class="icon-aws size-20 fa fa-list-ol"
                    title="Text List"
                />
            </div>
            <div
                class="element-have-data"  
                :style="{margin: setting.marginTop + 'em ' + setting.marginRight + 'em ' + setting.marginBottom + 'em ' + setting.marginLeft + 'em', padding: setting.paddingTop + 'em ' + setting.paddingRight + 'em ' + setting.paddingBottom + 'em '+ setting.paddingLeft + 'em' }"
                :class="[setting.verticalAlign]"
                v-else
            >
                <div
                    class="full-width" 
                    :style="style"
                >
                    <ul class="">
                        <li
                            class=""
                            v-for="(item, index) in setting.listItem"
                            :key="index"
                            v-html="item"
                        >
                            <!-- {{ item }} -->
                        </li>
                    </ul>
                </div>
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
            verticalAlign: {
                enable: true
            },
            addList: {
                enable: true
            }
        },
    }),
    created() {
        this.reset();
    },
    mounted() {
        WebFont = require('webfontloader');
    },
    watch: {
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
            console.log('Reset phone', this.source);
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
        },
        dragstart_handler(ev) {
            if (!this.designMode)
                return;
            // Add the target element's id to the data transfer object

            console.log('this.source', this.source);
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