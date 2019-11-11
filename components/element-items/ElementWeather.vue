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
                v-if="!setting.weather || !setting.weather.keyword"
            >
                <element-icon
                    v-if="designMode"
                    icon-class="icon-aws fa fa-sun-o size-20"
                    title="Weather"
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
                    class=""
                    v-if="weather && weather.length"
                >
                    <img
                        class="weather-img"  
                        :src="weather[0].current.imageUrl"
                    >
                    <div class="weather-info">
                        <h6>{{ setting.weather.title ? setting.weather.title : weather[0].current.observationpoint }}</h6>
                        <p>{{ weather[0].current.feelslike }} °{{ setting.weather.unit || 'C' }}</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import {convertToUrl} from '~/helpers/dataHelper';
import * as weather from 'weather-js';
// var weather = require('weather-js');

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
        title: 'Weather',
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
            weather: {
                enable: true
            }
        },
        weather: null,
        interval: null
    }),
    created() {
        this.reset();
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

                if (this.source.setting.weather && this.source.setting.weather.keyword) {
                    this.getWeather();
                    this.interval = setInterval(() => {
                        this.getWeather();
                    }, 60000);
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
        getWeather() {
            let keyword = this.source.setting.weather.keyword;
            let type = this.source.setting.weather.unit || 'C';
            
            weather.find({search: keyword, degreeType: type}, (err, result) => {
                if (err) return;
                this.weather = result;
            });
            console.log('getWeather');
        }
    },
    destroyed() {
        console.log('destroyed');
        clearInterval(this.interval);
    }
};
</script>
