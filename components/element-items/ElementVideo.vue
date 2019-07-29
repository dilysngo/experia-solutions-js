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
                v-show="!setting.url"
            >
                <element-icon
                    v-if="designMode"
                    icon-class="icon-play-button"
                    title="Video"
                />
            </div>
            <div
                class="element-have-data"
                :style="{margin: setting.marginTop + 'em ' + setting.marginRight + 'em ' + setting.marginBottom + 'em ' + setting.marginLeft + 'em', padding: setting.paddingTop + 'em ' + setting.paddingRight + 'em ' + setting.paddingBottom + 'em '+ setting.paddingLeft + 'em' }"
                style="margin: 0px -15px"
                :class="setting.verticalAlign"
                v-show="setting.url"
            >
                <div style="position: relative; height: 100%; width: 100%">
                    <video
                        class="element-media-Video" 
                        oncontextmenu="return false;"
                        playsinline
                        controlsList="nodownload"
                        :id="'dom-'+key"
                        :path="path"
                        @click="pause('dom-'+key)"
                        @pause="pause('dom-'+key)" 
                        @play="play('dom-'+key)"
                    >
                        <source
                            v-if="setting.url"
                            :src="convertToUrl(setting.url)"
                            type="video/mp4"
                        >
                        <source
                            v-if="setting.url"
                            :src="convertToUrl(setting.url)"
                            type="video/ogg"
                        > 
                    </video>
                    <button
                        type="button"
                        class="btn-play"
                        :class="{'d-none' : !isPlay}"
                        @click="play('dom-'+key)" 
                    />
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import {convertToUrl} from '~/helpers/dataHelper';
import {MediaType} from '~/common/commonType';

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
        title: 'Video',
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
            btnUpload: {
                enable: true
            },
            // elementAlign: {
            //     enable: true
            // },
            // verticalAlign: {
            //     enable: true
            // },
            btnSubmit: {
                enable: true
            },
        },
        start: 0,
        end: 0,
        previousTimeSeek: 0,
        currentTimeSeek: 0,
        seekStart: null,
        interval: null,
        templateId: null,
        // landingId: null,
        dataVideo: {
            objectId: '',
            src: '',
            url: '',
            thumbnail: '',
            duration: 0
        },
        isPlay: true,
        thumbnail: '',
        convertToUrl: convertToUrl
    }),
    created() {
        this.reset();
    },
    mounted() {
        $('.element-media-Video').bind('contextmenu', function() {
            return false;
        });

        window.onresize = () => {
            console.log('winresize');
        };
    },
    watch: {
        setting: {
            handler(value) {
                if (value.url) {
                    let video = document.getElementById('dom-' + this.key);
                    video.load();

                    if (value.duration === 0) {
                        this.interval = setInterval(() => {
                            if (video.readyState > 0) {
                                this.setting.duration = Math.floor(video.duration);
                                clearInterval(this.interval);
                                this.interval = null;
                            }
                        }, 100);
                    }
                }
            },
            deep: true
        },
    },
    methods: {
        reset() {
            console.log('Reset video', this.source);
            this.style = {};
            this.setting = {};
            this.templateId = this.$route.query.template;

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
        play(id) {
            document.getElementById(id).play();
            $('#' + id).attr('controls', '');
            this.isPlay = false;
        },
        pause(id) {
            document.getElementById(id).pause();
            $('#' + id).removeAttr('controls', '');
            this.isPlay = true;
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

            console.log('this.source', this.source);
            this.source.setting.typeMedia = MediaType.Video;
            this.root.$refs.elementSetting.open({instance: this, key: this.source.key, path: this.source.path, style: this.source.style, setting: this.source.setting, controls: this.controls});
            this.root.isSetting = true;
            this.root.elementSelected = this.source;
        },
    }
};
</script>
