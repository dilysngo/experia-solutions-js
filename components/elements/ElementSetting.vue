<template>
    <div
        id="element-setting"
        class="setting-box-element"
        v-show="key"
    >
        <div
            class="setting-head"
            @mousedown="mouseDown($event)"
        >
            <i
                class="fa fa-cog"
                aria-hidden="true" 
            />Settings<i
                @click="close"
                class="fa fa-times-circle"
                aria-hidden="true"
            />
        </div>
        <div class="setting-content">
            <no-ssr>
                <div class="row">
                    <div
                        class="col-md-6 pdr-5"
                        v-if="controls.border && controls.border.enable"
                    >
                        <label class="setting-box-label">Border</label>
                        <input
                            class="ip-setting"
                            type="number"
                            v-model="style.border"
                            @input="save"
                        >
                        <span class="unit-setting">px</span>
                    </div>
                    <div
                        class="col-md-6 pdl-5"
                        v-if="controls.radius && controls.radius.enable"
                    >
                        <label class="setting-box-label">Radius</label>
                        <input
                            class="ip-setting"
                            type="number"
                            v-model="style['border-radius']"
                            @input="save"
                        >  
                        <span class="unit-setting">px</span>      
                    </div>
                    <div
                        class="col-12"
                        v-if="controls.placeholder && controls.placeholder.enable"
                    >
                        <label class="setting-box-label">Placeholder</label>
                        <input
                            placeholder="Placeholder"
                            class="ip-setting"
                            type="text"
                            v-model="setting.placeholder"
                            @input="save"
                        > 
                    </div>
                    <div
                        :class="controls.fontSize && controls.fontSize.enable ? 'col-md-6 pdr-5' : 'col-md-12'"
                        v-if="controls.font && controls.font.enable"
                    >
                        <label class="setting-box-label">Font family:</label>
                        <div class="dropdown">
                            <button
                                type="button"
                                class="dropdown-toggle"
                                data-toggle="dropdown"
                                :title="style && style['font-family']"
                            >
                                {{ config.fontSelect ? config.fontSelect : 'Select font' }}
                            </button>
                            <ul class="dropdown-menu">
                                <li
                                    v-for="(item, index) in config.fontFamily"
                                    :key="index"
                                    @click="style['font-family'] = item, config.fontSelect = item, save()"
                                    class="dropdown-menu-link"
                                >
                                    {{ item }}
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div
                        class="col-md-6 pdl-5"
                        v-if="controls.fontSize && controls.fontSize.enable"
                    >
                        <label class="setting-box-label">Font Size:</label>
                        <!-- <input placeholder="12px" class="ip-setting" type="text" v-model="style.fontSize"/>  -->
                        <div class="dropdown">
                            <button
                                type="button"
                                class="dropdown-toggle"
                                data-toggle="dropdown"
                            >
                                {{ config.fontSize ? config.fontSize + 'px' : 'Select size' }}
                            </button>
                            <ul class="dropdown-menu">
                                <li
                                    class="dropdown-menu-link"
                                    @click="style['font-size'] = item/13 + 'em'; config.fontSize = item; save()"
                                    v-for="item in 40"
                                    :key="item"
                                >
                                    {{ item }} px
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div
                        class="setting-upload"
                        v-if="controls.btnUpload && controls.btnUpload.enable"
                    >
                        <!-- <label for="el-video" class="btn-upload active text-center"><i class="fa fa-cloud-upload" aria-hidden="true"></i>Upload Video</label>
                        <input id="el-video" type="file" style="display: none"/> -->
                        <button
                            class="btn-upload"
                            @click="openGallery(setting.typeMedia)"
                        >
                            <i
                                class="fa fa-cloud-upload"
                                aria-hidden="true"
                            />From Gallery
                        </button>
                        <div class="text-right">
                            <input
                                type="checkbox"
                                id="full-box"
                                v-model="config.fullBox"
                            > <label
                                style="display: inline-block"
                                class="setting-box-label"
                                for="full-box"
                            >No padding container</label>
                        </div>
                    </div>
                    <div
                        class="col-12"
                        v-if="controls.backgroundSize && controls.backgroundSize.enable"
                    >
                        <label class="setting-box-label">Background size</label>
                        <div class="checkbox-setting text-left">
                            <input
                                type="radio"
                                id="contain"
                                value="contain"
                                v-model="style.backgroundSize"
                            ><label
                                for="contain"
                                class="setting-box-label"
                            > Contain </label>  
                            <input
                                type="radio"
                                id="cover"
                                value="cover"
                                v-model="style.backgroundSize"
                            ><label
                                for="cover"
                                class="setting-box-label"
                            > Cover </label>  
                        </div>
                    </div>
                    <div class="col-md-12">
                        <label class="setting-box-label">Margin</label>
                    </div>
                    <div class="col-md-3 pdr-0">
                        <label class="setting-box-label">Top</label>
                        <input
                            class="ip-setting fix-height"
                            type="number"
                            v-model="config.marginTop"
                            @input="save"
                        >  
                    </div>
                    <div class="col-md-3 pdl-10 pdr-5">
                        <label class="setting-box-label">Right</label>
                        <input
                            class="ip-setting fix-height"
                            type="number"
                            v-model="config.marginRight"
                            @input="save"
                        > 
                    </div>
                    <div class="col-md-3 pdr-10 pdl-5">
                        <label class="setting-box-label">Bottom</label>
                        <input
                            class="ip-setting fix-height"
                            type="number"
                            v-model="config.marginBottom"
                            @input="save"
                        >
                    </div>
                    <div class="col-md-3 pdl-0">
                        <label class="setting-box-label">Left</label>
                        <input
                            class="ip-setting fix-height"
                            type="number"
                            v-model="config.marginLeft"
                        >  
                    </div>
                    <div class="col-md-12">
                        <label class="setting-box-label">Padding</label>
                    </div>
                    <div class="col-md-3 pdr-0">
                        <label class="setting-box-label">Top</label>
                        <input
                            class="ip-setting fix-height"
                            type="number"
                            v-model="config.paddingTop"
                            @input="save"
                        >
                    </div>
                    <div class="col-md-3 pdl-10 pdr-5">
                        <label class="setting-box-label">Right</label>
                        <input
                            class="ip-setting fix-height"
                            type="number"
                            v-model="config.paddingRight"
                            @input="save"
                        >  
                    </div>
                    <div class="col-md-3 pdr-10 pdl-5">
                        <label class="setting-box-label">Bottom</label>
                        <input
                            class="ip-setting fix-height"
                            type="number"
                            v-model="config.paddingBottom"
                            @input="save"
                        >
                    </div>
                    <div class="col-md-3 pdl-0">
                        <label class="setting-box-label">Left</label>
                        <input
                            class="ip-setting fix-height"
                            type="number"
                            v-model="config.paddingLeft"
                            @input="save"
                        >
                    </div>
                    <div
                        class="col-md-12"
                        v-if="controls.social && controls.social.enable"
                    >
                        <label class="setting-box-label">Select icon</label>
                        <div class="list-social">
                            <div
                                v-for="(item, index) in config.listSocial"
                                :key="index"
                                :class="{active: setting.listItem.find(a => a.social === item.social)}"
                                :style="{marginRight: index === 3 ? 0 : ''}"
                                class="social-item"
                            >
                                <div @click="selectSocial(item)">
                                    <img
                                        class="social-img"
                                        :src="item.image"
                                    ><span class="social-name">{{ item.title }}</span>
                                </div><span
                                    class="rm-social"
                                    @click="removeSocial(item)"
                                ><img
                                    class="rm-image"
                                    src="/images/icon-close-white.svg"
                                ></span>
                            </div>
                        </div>
                        <label class="setting-box-label">Social link</label>
                        <input
                            placeholder="e.g.https://social-links"
                            class="ip-setting"
                            type="text"
                            v-model="setting.url"
                            @input="updateSocial"
                        >
                    </div>
                    <div
                        class="col-md-12"
                        v-if="controls.verticalAlign && controls.verticalAlign.enable"
                    >
                        <label class="setting-box-label">Alignment Vertical</label>
                        <ul class="list-alignment">
                            <li
                                :class="{active: setting.verticalAlign === 'top-box'}"
                                class="alignment-item"
                                @click="setting.verticalAlign = 'top-box'; save()"
                            >
                                <i class="i-con icon-align-top" /> Top
                            </li>
                            <li
                                :class="{active: setting.verticalAlign === 'center-box'}"
                                class="alignment-item text-center"
                                @click="setting.verticalAlign = 'center-box'; save()"
                            >
                                <i class="i-con icon-align-middle" /> Middle
                            </li>
                            <li
                                :class="{active: setting.verticalAlign === 'bottom-box'}"
                                class="alignment-item text-right"
                                @click="setting.verticalAlign = 'bottom-box'; save()"
                            >
                                <i class="i-con icon-align-bottom" /> Bottom
                            </li>
                        </ul>
                        <!-- <div class="checkbox-setting">
                            <input type="checkbox" v-model="setting.centerBox"/><label class="setting-box-label"> Center Box </label>  
                        </div> -->
                    </div>
                    <div
                        class="col-md-12"
                        v-if="controls.elementAlign && controls.elementAlign.enable"
                    >
                        <label class="setting-box-label">Alignment Horizontal</label>
                        <ul class="list-align">
                            <li
                                :class="{active: style['text-align'] === 'left'}"
                                class="align-item"
                                @click="style['text-align'] = 'left'; save()"
                            >
                                <i class="i-con icon-align-left" />
                            </li>
                            <li
                                :class="{active: style['text-align'] === 'center'}"
                                class="align-item"
                                @click="style['text-align'] = 'center'; save()"
                            >
                                <i class="i-con icon-align-center" />
                            </li>
                            <li
                                :class="{active: style['text-align'] === 'right'}"
                                class="align-item"
                                @click="style['text-align'] = 'right'; save()"
                            >
                                <i class="i-con icon-align-right" />
                            </li>
                            <li
                                :class="{active: style['text-align'] === 'justify'}"
                                class="align-item"
                                @click="style['text-align'] = 'justify'; save()"
                            >
                                <i class="i-con icon-align-justify" />
                            </li>
                        </ul>
                    </div>
                    <div
                        class="col-md-6 pdr-5" 
                        v-if="controls.width && controls.width.enable"
                    >
                        <label class="setting-box-label">Width</label>
                        <input
                            class="ip-setting"
                            placeholder="Auto"
                            type="number"
                            v-model="config.width" 
                            @input="save"
                        >
                        <!-- <span class="unit-setting">px</span> -->
                    </div>
                    <div
                        class="col-md-6 pdl-5"
                        v-if="controls.height && controls.height.enable"
                    >
                        <label class="setting-box-label">Height</label>
                        <input
                            class="ip-setting"
                            placeholder="Auto"
                            type="number"
                            v-model="config.height"
                            @input="save"
                        >  
                        <!-- <span class="unit-setting">px</span>       -->
                    </div>
                    <div
                        class="col-12"
                        v-if="controls.format && controls.format.enable"
                    >
                        <label class="setting-box-label">Format</label>
                        <ul class="list-format">
                            <li
                                :class="{active: style['font-weight']}" 
                                class="format-item  bold"
                                @click="style['font-weight'] = style['font-weight'] ? '' : 'bold'; save()"
                            >
                                Bold
                            </li>
                            <li
                                :class="{active: style['font-style']}"
                                class="format-item italic"
                                @click="style['font-style'] = style['font-style'] ? '' : 'italic'; save()"
                            >
                                Italic
                            </li>
                            <li
                                :class="{active: style['text-decoration']}"
                                class="format-item underline"
                                @click="style['text-decoration'] = style['text-decoration'] ? '' : 'underline'; save()"
                            >
                                Underline
                            </li>
                        </ul>                    
                    </div>
                    <div
                        class="col-md-12"
                        v-if="controls.textAlign && controls.textAlign.enable"
                    >
                        <label class="setting-box-label">Text Align</label>
                        <ul class="list-align">
                            <li
                                :class="{active: style['text-align'] === 'left'}"
                                class="align-item"
                                @click="style['text-align'] = 'left'; save()"
                            >
                                <i class="i-con icon-align-left" />
                            </li>
                            <li
                                :class="{active: style['text-align'] === 'center'}"
                                class="align-item"
                                @click="style['text-align'] = 'center'; save()"
                            >
                                <i class="i-con icon-align-center" />
                            </li>
                            <li
                                :class="{active: style['text-align'] === 'right'}"
                                class="align-item"
                                @click="style['text-align'] = 'right'; save()"
                            >
                                <i class="i-con icon-align-right" />
                            </li>
                            <li
                                :class="{active: style['text-align'] === 'justify'}"
                                class="align-item"
                                @click="style['text-align'] = 'justify'; save()"
                            >
                                <i class="i-con icon-align-justify" />
                            </li>
                        </ul>
                    </div>
                    
                    <!-- <div class="col-12" v-if="controls.textColor && controls.textColor.enable">
                        <label class="setting-box-label">Text Color:</label>
                        <button :style="{'background-color': currentColor2.hex}" @click="config.pickers.text = !config.pickers.text" class="btn-color"></button>
                        <div class="box-pts">
                             <pts-picker v-show="config.pickers.text" v-model="currentColor2" @input="updateValue2"/>
                            <span v-show="config.pickers.text" @click="config.pickers.text = false" class="pts-close">close</span>
                        </div>
                    </div> -->
                    <div
                        class="col-md-12"
                        v-if="controls.url && controls.url.enable"
                    >
                        <label class="setting-box-label">URL</label>
                        <input
                            placeholder="e.g.https://yourlinks1234"
                            class="ip-setting"
                            type="text"
                            v-model="setting.url"
                            @input="save"
                        >
                    </div>
                    <div
                        class="col-md-12"
                        v-if="controls.link && controls.link.enable"
                    >
                        <label class="setting-box-label">Link</label>
                        <input
                            placeholder="e.g.https://yourlinks1234"
                            class="ip-setting"
                            type="text"
                            v-model="setting.link"
                            @input="save"
                        >
                    </div>
                    <template v-if="controls.background && controls.background.enable">
                        <div class="col-12">
                            <label class="setting-box-label">Background Color</label>
                            <button
                                :style="{'background-color': config.backgroundColor.hex ? config.backgroundColor.hex : config.backgroundColor}"
                                @click="config.pickers.background = !config.pickers.background"
                                class="btn-color"
                            />
                            <div class="box-pts">
                                <pts-picker
                                    v-show="config.pickers.background"
                                    v-model="config.backgroundColor"
                                    @input="style['background-color'] = config.backgroundColor.hex; save()"
                                />
                                <span
                                    v-show="config.pickers.background"
                                    @click="config.pickers.background = false"
                                    class="pts-close"
                                >x</span>
                            </div>
                        </div>
                    </template>
                    <div
                        class="col-12"
                        v-if="controls.textColor && controls.textColor.enable"
                    >
                        <label class="setting-box-label">Color</label>
                        <button
                            :style="{'background-color': config.color.hex ? config.color.hex : config.color}"
                            @click="config.pickers.text = !config.pickers.text"
                            class="btn-color"
                        />
                        <div class="box-pts">
                            <pts-picker
                                v-show="config.pickers.text"
                                v-model="config.color"
                                @input="style['color'] = config.color.hex; save()"
                            />
                            <span
                                v-show="config.pickers.text"
                                @click="config.pickers.text = false"
                                class="pts-close"
                            >x</span>
                        </div>
                    </div>
                    <div
                        class="col-12"
                        v-if="controls.borderColor && controls.borderColor.enable"
                    >
                        <label class="setting-box-label">Border Color</label>
                        <button
                            :style="{'background-color': config.borderColor.hex ? config.borderColor.hex : config.borderColor}"
                            @click="config.pickers.border = !config.pickers.border"
                            class="btn-color" 
                        />
                        <div class="box-pts">
                            <pts-picker
                                v-show="config.pickers.border"
                                v-model="config.borderColor"
                                @input="style['border-color'] = config.borderColor.hex; save()"
                            />
                            <span
                                v-show="config.pickers.border"
                                @click="config.pickers.border = false"
                                class="pts-close"
                            >x</span>
                        </div>
                    </div>
                    <div
                        class="col-12"
                        v-if="controls.text && controls.text.enable"
                    >
                        <label class="setting-box-label">Content</label>
                        <input
                            placeholder="Change text"
                            class="ip-setting"
                            type="text"
                            v-model="setting.content"
                            @input="save"
                        > 
                    </div>
                    <div
                        class="col-12"
                        v-if="controls.textEditor && controls.textEditor.enable"
                    >
                        <label class="setting-box-label">Content</label>
                        <vue-ckeditor
                            v-model="setting.content"
                            :config="config.configCKEditor"
                            @input="save"
                        />
                    </div>
                    <div
                        class="col-12"
                        v-if="controls.track && controls.track.enable"
                    >
                        <input
                            type="checkbox"
                            id="track-click"
                            v-model="config.trackChecked"
                        > <label
                            style="display: inline-block; margin-top: 10px"
                            class="setting-box-label"
                            for="track-click"
                        >Track</label>
                        <input
                            placeholder="Track name"
                            class="ip-setting"
                            type="text"
                            v-model="setting.trackName"
                            @input="save"
                        > 
                    </div>
                    <div
                        class="col-12"
                        v-if="controls.addList && controls.addList.enable"
                    >
                        <label class="setting-box-label">Items</label>
                        <ul
                            class="elm-list"
                            v-if="setting.listItem.length"
                        >
                            <li
                                class="elm-item"
                                v-for="(item, index) in setting.listItem"
                                :key="index"
                            >
                                <span
                                    style="width:90%;display: inline-block;"
                                    @click="selectItem(index)"
                                >+ {{ item }} </span><i
                                    @click="removeItem(index); save()"
                                    class="fa fa-times"
                                    aria-hidden="true" 
                                />
                            </li>
                        </ul>
                        <template v-if="isUpdateItem">
                            <input
                                placeholder="Item name"
                                class="ip-setting"
                                type="text"
                                v-model="valueUpdate"
                            > 
                            <button
                                style="margin-left: 15px"
                                @click="isUpdateItem=false"
                                class="elm-add cancel"
                            >
                                Cancel
                            </button>
                            <button
                                class="elm-add" 
                                @click="updateItem(); save()"
                            >
                                Update
                            </button>
                        </template>
                        <template v-else>
                            <input
                                placeholder="Item name"
                                class="ip-setting"
                                type="text"
                                v-model="config.item"
                            > 
                            <button
                                class="elm-add"
                                @click="addItem(config.item); save()"
                            >
                                Add
                            </button>
                        </template>
                    </div>
                </div>
            </no-ssr>
        </div>
        <!-- <div class="setting-footer" v-if="controls.btnSubmit && controls.btnSubmit.enable">
            <button class="setting-btn action" @click="save">save</button>
            <button class="setting-btn cancel" @click="close">cancel</button>
        </div> -->
    </div>
</template>

<script>
import fonts from '~/common/googleFonts';

export default {
    props: {
        root: {
            type: Object,
            default: () => {}
        }
    },
    data: () => ({
        instance: null,
        key: '',
        path: '',
        style: null,
        setting: null,
        isUpdateItem: false,
        valueUpdate: '',
        selected: null,
        controls: {},
        config: {
            fontFamily: fonts.googleFonts,
            fontSelect: null,
            backgroundColor: '#000000',
            borderColor: '#000000',
            color: '#000000',
            pickers: {
                background: false,
                border: false,
                text: false
            },
            configCKEditor: {
                toolbar: [
                    {name: 'font', items: ['FontSize', 'TextColor', 'Bold', 'Italic', 'Underline']},
                    {name: 'format', items: ['JustifyLeft', 'JustifyCenter', 'JustifyRight', 'JustifyBlock', 'Link', 'Unlink', 'CopyFormatting', 'RemoveFormat']},
                ],
                height: 100,
                language: 'en',
                fontSize_sizes: '8/0.61538em;10/0.76923em;12/0.92307em;14/1.07692em;16/1.23076em;18/1.38461em;20/1.53846em;22/1.6923em;24/1.84615em;26/2em;28/2.15384em;30/2.30769em;32/2.46153em;34/2.61538em;36/2.76923em;38/2.92307em;40/3.07692em;42/3.23076em;44/3.38461em;46/3.53846em;48/3.6923em;50/3.84615em;52/4em;54/4.15384em;56/4.30769em;58/4.46153em;60/4.61538em;62/4.76923em;64/4.92307em;66/5.07692em;68/5.23076em;70/5.38461em;72/5.53846em',
            },
            item: null,
            width: '',
            height: '',
            marginTop: 0,
            marginBottom: 0,
            marginLeft: 0,
            marginRight: 0,
            paddingTop: 0,
            paddingBottom: 0,
            paddingLeft: 0,
            paddingRight: 0,
            fontSize: '',
            listSocial: [
                {social: 'facebook', image: '/images/elements/icon-fb.svg', title: 'Facebook', value: ''},
                {social: 'instagram', image: '/images/elements/icon-instagram.svg', title: 'Instagram', value: ''},
                {social: 'google-plus', image: '/images/elements/icon-gg+.svg', title: 'Google+', value: ''},
                {social: 'youtube', image: '/images/elements/icon-youtube.svg', title: 'Youtube', value: ''},
                {social: 'twitter', image: '/images/elements/icon-tw.svg', title: 'Twitter', value: ''},
                {social: 'linkedin', image: '/images/elements/icon-linkin.svg', title: 'Linkedin', value: ''},
            ],
            fullBox: false,
            trackChecked: false
        },
        move: {
            startX: 0,
            startY: 0,
            initialMouseX: 0,
            initialMouseY: 0,
            elMove: '',
        }
    }),
    created() {
        this.reset();
        // console.log('font', fonts);
    },
    mounted() {
        this.move.elMove = document.getElementById('element-setting');
    },
    watch: {
        'style.backgroundSize': function(newData) {
            this.save();
        },
        'config.width': function(newData) {
            if (newData > 1095)
                this.config.width = 1095;
        },
        'config.fullBox': function(newData) {
            if (newData) this.setting.fullBox = 'yes';
            else this.setting.fullBox = 'no';
            this.save();
        },
        'config.trackChecked': function(newData) {
            if (newData) this.setting.trackClick = 'yes';
            else this.setting.trackClick = 'no';
            this.save();
        },
    },
    methods: {
        reset() {
            this.instance = null;
            this.key = '';
            this.path = '';
            this.style = {
                border: null,
                margin: null,
                padding: null,
                'border-radius': null,
                'font-family': null,
                'font-size': null,
                width: '',
                height: '',
                'font-weight': null,
                'font-style': null,
                'text-decoration': null,
                'text-align': 'center',
                'background-color': null,
                backgroundSize: 'contain',
                'border-color': null,
                'color': null,
            };
            this.setting = {
                placeholder: null,
                typeMedia: null,
                social: null,
                verticalAlign: 'center-box',
                url: null,
                link: null,
                content: null,
                listItem: [],
                poster: '',
                duration: 0,
                marginTop: 0,
                marginBottom: 0,
                marginLeft: 0,
                marginRight: 0,
                paddingTop: 0,
                paddingBottom: 0,
                paddingLeft: 0,
                paddingRight: 0,
                fullBox: 'no',
                mediaId: null,
                trackName: null,
                trackClick: 'no'
            };
            this.controls = {
                width: {
                    enable: false
                },
                height: {
                    enable: false
                },
                margin: {
                    enable: false
                },
                padding: {
                    enable: false
                },
                background: {
                    enable: false
                },
                border: {
                    enable: false
                },
                radius: {
                    enable: false
                },
                borderColor: {
                    enable: false
                },
                placeholder: {
                    enable: false
                },
                url: {
                    enable: false
                },
                link: {
                    enable: false
                },
                textColor: {
                    enable: false
                },
                text: {
                    enable: false
                },
                textEditor: {
                    enable: false
                },
                textAlign: {
                    enable: false
                },
                elementAlign: {
                    enable: false
                },
                btnUpload: {
                    enable: false
                },
                btnSubmit: {
                    enable: false
                },
                verticalAlign: {
                    enable: false
                },
                social: {
                    enable: false
                },
                backgroundSize: {
                    enable: false
                },
                addList: {
                    enable: false
                },
                track: {
                    enable: false
                }
            };
            this.config.backgroundColor = '#000000';
            this.config.borderColor = '#000000';
            this.config.color = '#000000';
        },
        open({instance, key, path, style, setting, controls}) {
            this.reset();
            this.$nextTick(() => {
                this.instance = instance;
                this.key = key;
                this.path = path;

                if (style)
                    this.style = {...this.style, ...style};

                if (setting)
                    this.setting = {...this.setting, ...setting};

                if (controls)
                    this.controls = {...this.controls, ...controls};

                if ((controls.width && controls.width.enable) || (controls.height && controls.height.enable)) {
                    if (this.style.width !== '100%' && this.style.width !== '')
                        this.config.width = Math.ceil(this.style.width && this.style.width.substr(0, this.style.width.length - 2) * 13);
                    else this.config.width = '';

                    if (this.style.height !== '100%' && this.style.height !== '')
                        this.config.height = Math.ceil(this.style.height && this.style.height.substr(0, this.style.height.length - 2) * 13);
                    else this.config.height = '';
                }
                else {
                    this.config.width = null;
                    this.config.height = null;
                }
                if (controls.fontSize && controls.fontSize.enable && this.style['font-size']) {
                    // console.log('this.style', this.style['font-size']);
                    this.config.fontSize = Math.ceil(this.style['font-size'] && this.style['font-size'].substr(0, this.style['font-size'].length - 2) * 13);
                }

                this.config.marginTop = Math.ceil(this.setting.marginTop * 13);
                this.config.marginBottom = Math.ceil(this.setting.marginBottom * 13);
                this.config.marginLeft = Math.ceil(this.setting.marginLeft * 13);
                this.config.marginRight = Math.ceil(this.setting.marginRight * 13);
                this.config.paddingTop = Math.ceil(this.setting.paddingTop * 13);
                this.config.paddingBottom = Math.ceil(this.setting.paddingBottom * 13);
                this.config.paddingLeft = Math.ceil(this.setting.paddingLeft * 13);
                this.config.paddingRight = Math.ceil(this.setting.paddingRight * 13);

                if (this.style['color'])
                    this.config.color = this.style['color'];
                if (this.style['border-color'])
                    this.config.borderColor = this.style['border-color'];
                if (this.style['background-color'])
                    this.config.backgroundColor = this.style['background-color'];

                if (this.setting.fullBox === 'yes')
                    this.config.fullBox = true;
                else
                    this.config.fullBox = false;

                if (this.setting.trackClick === 'yes')
                    this.config.trackChecked = true;
                else
                    this.config.trackChecked = false;

                if (controls.textEditor && controls.textEditor.enable) {
                    setTimeout(() => {
                        let head = jQuery('.cke_reset').contents().find('head');
                        let css = '<style type="text/css">' +
                                'html{font-size: 13px;}; ' +
                                '</style>';
                        jQuery(head).append(css);
                    }, 500);
                }

                if ($('#' + key).length) {
                    // let rect = $('#' + key)[0].getBoundingClientRect();
                    // $('#element-setting').css({top: rect.y, left: rect.x});
                    $('#element-setting').css({top: '92px', left: '43%'});
                }

                // console.log('this', this.setting);
            });
        },
        openGallery(typeMedia) {
            this.$emit('openGallery', {type: typeMedia, data: {instance: this.instance, path: this.path, style: this.style, setting: this.setting}});
        },
        close() {
            this.key = '';
            this.root.isSetting = false;
            this.config.pickers.background = false;
            this.config.pickers.border = false;
            this.config.pickers.text = false;
        },
        save() {
            if (this.config.width > 1095)
                this.config.width = 1095;
            if ((this.controls && this.controls.width && this.controls.width.enable) || (this.controls && this.controls.height && this.controls.height.enable)) {
                if (this.config.width)
                    this.style.width = this.config.width / 13 + 'em';
                else this.style.width = '100%';

                if (this.config.height)
                    this.style.height = this.config.height / 13 + 'em';
                else this.style.height = '100%';
            }
            else {
                this.style.width = null;
                this.style.height = null;
            }

            this.setting.marginTop = this.config.marginTop / 13;
            this.setting.marginBottom = this.config.marginBottom / 13;
            this.setting.marginLeft = this.config.marginLeft / 13;
            this.setting.marginRight = this.config.marginRight / 13;
            this.setting.paddingTop = this.config.paddingTop / 13;
            this.setting.paddingBottom = this.config.paddingBottom / 13;
            this.setting.paddingLeft = this.config.paddingLeft / 13;
            this.setting.paddingRight = this.config.paddingRight / 13;

            // console.log('this.setting', this.setting);

            this.root.updateElement({instance: this.instance, path: this.path, style: this.style, setting: this.setting});
            // this.close();
            // this.config.pickers.background = false;
            // this.config.pickers.border = false;
            // this.config.pickers.text = false;
        },
        mouseMove(e) {
            let dx = e.clientX - this.move.initialMouseX;
            let dy = e.clientY - this.move.initialMouseY;
            let positionTop = this.move.startY + dy;
            let positionLeft = this.move.startX + dx;
            this.move.elMove.style.top = positionTop + 'px';
            this.move.elMove.style.left = positionLeft + 'px';

            if (positionTop < 0) {
                this.move.elMove.style.top = 0 + 'px';
            }

            if (positionLeft < 0) {
                this.move.elMove.style.left = 0 + 'px';
            }

            return false;
        },
        mouseUp(e) {
            document.removeEventListener('mousemove', this.mouseMove);
            document.removeEventListener('mouseup', this.mouseUp);
            e.preventDefault();
        },
        mouseDown(event) {
            this.move.startX = this.move.elMove.offsetLeft;
            this.move.startY = this.move.elMove.offsetTop;
            this.move.initialMouseX = event.clientX;
            this.move.initialMouseY = event.clientY;
            document.addEventListener('mousemove', this.mouseMove);
            document.addEventListener('mouseup', this.mouseUp);
            return false;
        },
        addItem(value) {
            this.setting.listItem.push(value);
            this.config.item = '';
        },
        removeItem(index) {
            this.setting.listItem.splice(index, 1);
            this.save();
        },
        selectItem(index) {
            this.valueUpdate = this.setting.listItem[index];
            this.isUpdateItem = true;
            this.selected = index;
        },
        updateItem() {
            let index = this.selected;
            this.setting.listItem[index] = this.valueUpdate;
            this.isUpdateItem = false;
        },
        selectSocial(item) {
            let exist = this.setting.listItem.findIndex(a => a.social === item.social);

            if (exist < 0) {
                this.addItem(item);
                this.setting.url = '';
                this.selected = this.setting.listItem.findIndex(a => a.social === item.social);
            }
            else {
                this.setting.url = this.setting.listItem[exist].value;
                this.selected = exist;
            }

            // else this.removeItem(exist);
            this.save();
        },
        updateSocial() {
            this.setting.listItem[this.selected].value = this.setting.url;
            this.save();
        },
        removeSocial(item) {
            let exist = this.setting.listItem.findIndex(a => a.social === item.social);

            // console.log('exist', exist);

            if (exist >= 0)
                this.removeItem(exist);

            // console.log('setting', this.setting);
        }

    }
};
</script>