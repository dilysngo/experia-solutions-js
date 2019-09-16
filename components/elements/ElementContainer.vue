<template>
    <div
        class="template-body"  
        :style="[style, {height: ratioSize && ratioSize.height/13 + 'em', width: ratioSize && ratioSize.width/13 + 'em'}]"
        :class="{'preview': !designMode}"
    >
        <component
            v-for="component in components"
            :is="component.name"
            :key="component.key"
            :id="component.key"
            :root="root"
            :design-mode="designMode"
            :is-preview="isPreview"
            :size-scale="sizeScale"
            :device-preview="devicePreview"
            :template-id="templateId"
            :source="component"
            :ref="component.key"
        />
        <h4 style="margin-top: 340px; color: #4b6c90; opacity: 0.6; font-family: Bookman, Tahoma, Verdana;">
            {{ nameScreen }}
        </h4>
    </div>
</template>

<script>
import Vue from 'vue';
import {mapActions, mapGetters} from 'vuex';
import ElementSection from '~/components/elements/ElementSection';
import ElementText from '~/components/element-items/ElementText';
import ElementShape from '~/components/element-items/ElementShape';
// import ElementButton from '~/components/element-items/ElementButton';
// import ElementInput from '~/components/element-items/ElementInput';
// import ElementTextArea from '~/components/element-items/ElementTextArea';
// import ElementSocial from '~/components/element-items/ElementSocial';
// import ElementDropdown from '~/components/element-items/ElementDropdown';
// import ElementCheckbox from '~/components/element-items/ElementCheckbox';
import ElementListText from '~/components/element-items/ElementListText';
import ElementScreen from '~/components/element-items/ElementScreen';
import ElementVideo from '~/components/element-items/ElementVideo';
import ElementImage from '~/components/element-items/ElementImage';
import ElementWeather from '~/components/element-items/ElementWeather';

Vue.component('element-section', ElementSection);
Vue.component('element-text', ElementText);
Vue.component('element-list-text', ElementListText);
// Vue.component('element-button', ElementButton);
// Vue.component('element-input', ElementInput);
// Vue.component('element-text-area', ElementTextArea);
// Vue.component('element-social', ElementSocial);
// Vue.component('element-dropdown', ElementDropdown);
// Vue.component('element-checkbox', ElementCheckbox);
Vue.component('element-weather', ElementWeather);
Vue.component('element-image', ElementImage);
Vue.component('element-video', ElementVideo);
Vue.component('element-screen', ElementScreen);
Vue.component('element-shape', ElementShape);

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
        templateId: {
            type: String,
            default: ''
        },
        sizeScale: {
            type: Number,
            default: null
        },
        ratioSize: {
            type: Object,
            default: () => {}
        },
        source: {
            type: Object,
            default: () => {}
        },
        devicePreview: {
            type: String,
            default: ''
        },
        isSetting: {
            type: Boolean,
            default: false
        },
        elementSelected: {
            type: Object,
            default: () => {}
        }
    },
    data: () => ({
        key: '',
        path: '',
        style: {},
        nameScreen: '',
        setting: {},
        components: [],
    }),
    created() {
        this.reset();
    },
    computed: {
        ...mapGetters('screen', ['screenName'])
    },
    mounted() {
        this.nameScreen = this.screenName;
        if (window.location.pathname === '/templates/design')
            this.nameScreen = '';
    },    
    methods: {
        reset() {
            this.style = {};
            this.setting = {};
            this.components = [];
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
            this.components = this.source && this.source.components ? this.source.components : [];
        },
        addElement(elementName, options) {
            this.root.addElement(this, this.source.path, elementName, options);
        }
    }
};
</script>