<template>
    <section class="page-container page-create">
        <div class="page-header d-flex">
            <input
                class="input-title" 
                v-model="titlePage" 
            >
            <div class="d-flex">
                <filter-select
                    :data="ratioList"
                    @input="handlerRatio"
                    :select="ratioDefault"
                />
                <filter-select
                    :data="categoryList"
                    @input="handlerCategory"
                    :select="categoryDefault"
                />
            </div>
        </div>
        <div class="page-body">
            <div class="container-create d-flex">
                <element-list />
                <div class="box-widget">
                    <div class="toolbar d-flex justify-content-between align-items-center">
                        <div class="toolbar-left d-flex">
                            <button
                                @click="removeItemSelected"
                                class="btn-tool"
                            >
                                <i class="icon-trash-fill icon-site" />
                            </button>
                            <button
                                class="btn-tool"
                                @click="bringForward"
                            >
                                <i class="icon-layout-up icon-site" />
                            </button>
                            <button
                                class="btn-tool"
                                @click="sendBackward"
                            >
                                <i class="icon-layout-down icon-site" />
                            </button>
                            <button
                                :disabled="!enableUndo" 
                                @click="undo"
                                class="btn-tool"
                            >
                                <i class="icon-undo icon-site" />
                            </button>
                            <button
                                :disabled="!enableRedo"
                                @click="redo"
                                class="btn-tool"
                            >
                                <i class="icon-next icon-site" />
                            </button>
                            <button
                                class="btn-tool"
                                @click="openGallery(mediaType.Image)"
                            >
                                <i class="icon-site icon-picture" />
                            </button>
                            <button
                                class="btn-tool"
                                @click="pickersBackground = !pickersBackground"
                            >
                                <i
                                    class="fa fa-th-large" 
                                    style="font-size: 21px"
                                /> 
                            </button>
                            <button
                                class="btn-tool"
                                @click="openGallery(mediaType.Music)"
                            >
                                <img src="~/assets/images/music.svg">                                
                            </button>                        
                            <div
                                class="box-pts"
                                v-show="pickersBackground"
                            >
                                <no-ssr>
                                    <pts-picker
                                        v-model="backgroundDefault"
                                        @input="changeBackground"
                                    />
                                </no-ssr>
                                <span
                                    @click="pickersBackground = false"
                                    class="pts-close"
                                >Close</span>
                            </div>
                            <p v-if="saving">
                                <i class="icon-loading icon-site" />
                                Saving
                            </p>
                        </div>
                        <div class="toolbar-right">
                            <button
                                class="btn-tool"
                                @click="$router.go(-1)"
                            >
                                Back
                            </button>
                            <button
                                class="btn-tool"
                                @click="saveAll"
                            >
                                Save
                            </button>
                            <button
                                class="btn-tool btn-preview"
                                @click="preview"
                            >
                                <i class="icon-play icon-site" />
                                Preview
                            </button>
                        </div>
                    </div>
                    <div
                        class="container-drag d-flex justify-content-center"
                        @drop="drop_handler($event)"
                        @dragover="dragover_handler($event)"
                        :style="{fontSize: sizeScale + 'px' }"
                    >
                        <element-container
                            :ref="'elementContainer'"
                            :root="root"
                            :design-mode="designMode"
                            :size-scale="sizeScale"
                            :ratio-size="ratioSize"
                            :device-preview="devicePreview"
                            v-if="template"
                            :source="template"
                            :is-setting="isSetting"
                            :element-selected="elementSelected"
                        />
                        <div
                            class="box-properties"
                            :class="{open: isSetting}"
                            v-if="designMode"
                        >
                            <element-setting
                                :root="root"
                                :size-scale="sizeScale"
                                @openGallery="openGallery($event)"
                                ref="elementSetting"
                            />
                        </div>
                    </div>
                    <gallery
                        ref="gallery" 
                        id="gallery"
                        @galleryImage="handleGallery"
                    />
                    <popup-review
                        ref="popupReview"
                        id="popupReview"
                    />
                </div>
            </div>
        </div>
    </section>
</template>
<script>
import Vue from 'vue';
import {mapGetters, mapActions} from 'vuex';
import FilterSelect from '~/components/FilterSelect';
import ElementList from '~/components/elements/ElementList';
import ElementSetting from '~/components/elements/ElementSetting';
import ElementResize from '~/components/elements/ElementResize';
import ElementClose from '~/components/elements/ElementClose';
import ElementIcon from '~/components/elements/ElementIcon';
import ElementControlBox from '~/components/elements/ElementControlBox';
import ElementContainer from '~/components/elements/ElementContainer';
import Gallery from '~/components/Gallery';
import PopupReview from '~/components/PopupReview';
import {MediaType, PageType, Roles} from '~/common/commonType'; // eslint-disable-line
import {convertToString} from '~/helpers/dateHelper';
import {convertToUrl, getRatioSize} from '~/helpers/dataHelper';

Vue.component('element-setting', ElementSetting);
Vue.component('element-resize', ElementResize);
Vue.component('element-close', ElementClose);
Vue.component('element-icon', ElementIcon);
Vue.component('element-control-box', ElementControlBox);
Vue.component('element-container', ElementContainer);
Vue.component('gallery', Gallery);

export default {
    components: {
        FilterSelect,
        ElementList,
        PopupReview
    },
    data() {
        return {
            root: null,
            titlePage: '',
            enableUndo: false,
            audio: '',
            urlMusic: '',
            enableRedo: false,
            maxQueues: 100,
            temporaryQueues: [],
            showSavingStatus: false,
            saving: false,
            timeoutSaving: null,
            timeoutSavingMS: 1000,
            timeoutTemporaryQueue: null,
            designMode: true,
            devicePreview: 'design',
            isSetting: false,
            elementSelected: null,
            template: null,
            dataGallery: null,
            templateData: null,
            pickersBackground: false,
            backgroundDefault: {
                hex: '#000000',
                hsl: {h: 150, s: 0.5, l: 0.2, a: 1},
                hsv: {h: 150, s: 0.66, v: 0.30, a: 1},
                rgba: {r: 25, g: 77, b: 51, a: 1},
                a: 1
            },
            backgroundImage: null,
            mediaType: MediaType,
            pageType: null,
            sizeScale: null,
            sizeContainer: null,
            unitScale: 13 / 928, // fontSize/containerWidth
            ratioSelected: null,
            ratioSize: null,
            ratioDefault: '16:9',
            categoryDefault: null,
            categorySelected: null
        };
    },
    async created() {
        await this.findRatios();
        await this.findCategory();
        this.root = this;
        this.temporaryQueues = [];
        this.template = {
            key: 'container',
            path: 'container',
            name: 'element-container',
            style: {},
            setting: {},
            components: []
        };

        if (this.$route.query.template) {
            if (this.userAuth.role.code !== Roles.Admin)
                this.$router.push('/templates');

            this.pageType = PageType.Template;
            await this.getTemplateById(this.$route.query.template); // Update template
        }
        else if (this.$route.query.screen) {
            this.pageType = PageType.Screen;
            await this.getTemplateScreen(this.$route.query.screen); // Update template of screen
        }
        else {
            this.$router.push('/templates');
        }

        if (this.templateData.ratio)
            this.ratioDefault = this.templateData.ratio.value;

        if (this.templateData.category)
            this.categoryDefault = this.templateData.category.value;

        console.log('this.templateData.category', this.templateData);
    },
    async mounted() {
        // this.getSizeScale();

        window.onresize = () => {
            this.getSizeScale();
        };
    },
    computed: {
        ...mapGetters('user', ['userAuth']),
        ...mapGetters('category', ['categoryList']),
        ...mapGetters('ratio', ['ratioList']),
    },
    watch: {
        elementSelected: function(newData) {
            console.log('newData', newData);
            $('.element-box').removeClass('selected');
            document.querySelector('#' + newData.key).classList.add('selected');
        },
    },
    methods: {
        ...mapActions('template', [
            'getTemplate',
            'getTemplateByScreen',
            'createTemplate',
            'updateTemplate',
            'updateTemplateScreen'
        ]),
        ...mapActions('ratio', [
            'findRatios',
        ]),
        ...mapActions('category', [
            'findCategory',
        ]),
        getSizeScale() {
            console.log('winresize');
            let containerWidth;
            containerWidth = $('.container-drag').width();
            this.sizeScale = containerWidth * this.unitScale;
        },
        async getTemplateById(templateId) {
            let result = await this.getTemplate(templateId).catch(error => {
                this.$notify({
                    group: 'error',
                    title: 'Get data failed!',
                    text: error.message
                });
                return false;
            });

            if (result) {
                this.templateData = result;
                this.titlePage = this.templateData.name;

                if (result.template) {
                    this.template = null;

                    this.$nextTick(() => {
                        this.template = result.template;
                    });
                }
            }
        },
        async getTemplateScreen(sceenId) {
            let result = await this.getTemplateByScreen(sceenId).catch(error => {
                this.$notify({
                    group: 'error',
                    title: 'Get data failed!',
                    text: error.message
                });
                return false;
            });

            if (result) {
                this.templateData = result.template;
                this.templateData.ratio = result.ratio;
                this.templateData.category = result.category;
                this.titlePage = result.name;

                if (result.template && result.template.template) {
                    this.template = null;

                    this.$nextTick(() => {
                        this.template = result.template.template;
                    });
                }
            }
        },
        async saveTemplate() {
            console.log('this.templateData', this.templateData);
            if (this.templateData) {
                this.saving = true;
                this.showSavingStatus = true;
                let result;
                this.templateData.template = this.template;
                // if (this.pageType === PageType.Template) {
                //     this.templateData.template = this.template;
                // }
                // else {
                //     this.templateData.template = this.template;
                // }
                // console.log('save nao', this.templateData);
                if (this.pageType === PageType.Template) // Update template
                    result = await this.updateTemplate({id: this.$route.query.template, data: this.templateData}).catch(error => {
                        this.$notify({
                            group: 'error',
                            title: 'Save data failed!',
                            text: error.message
                        });
                    });
                else if (this.pageType === PageType.Screen) { // Update Screen
                    let dataUpdate = {name: this.titlePage, template: this.templateData, ratioId: this.ratioSelected.id, categoryId: this.categorySelected.id};
                    result = await this.updateTemplateScreen({id: this.$route.query.screen, data: dataUpdate}).catch(error => {
                        this.$notify({
                            group: 'error',
                            title: 'Save data failed!',
                            text: error.message
                        });
                    });
                }

                clearTimeout(this.timeoutSaving);
                this.timeoutSaving = setTimeout(() => {
                    this.saving = false;
                    this.showSavingStatus = false;
                }, 800);
            }
        },
        changeBackground(value) {
            if (!this.template.style)
                this.template.style = {};
            if (value === 'image') {
                this.template.style.background = `url(${this.backgroundImage}) no-repeat 50% 50% /cover`;
            }
            else this.template.style.background = this.backgroundDefault.hex;

            this.pushToTemporaryQueue();

            let template = this.template;
            this.template = null;

            this.$nextTick(() => {
                this.template = template;
            });
        },
        pushToTemporaryQueue() {
            clearTimeout(this.timeoutTemporaryQueue);
            this.timeoutTemporaryQueue = setTimeout(() => {
                let index = this.temporaryQueues.findIndex(temporaryQueue => temporaryQueue.cursor);

                if (index < this.temporaryQueues.length - 1)
                    this.temporaryQueues.splice(index + 1);

                if (index > -1)
                    this.temporaryQueues[index].cursor = false;

                if (this.temporaryQueues.length >= this.maxQueues)
                    this.temporaryQueues.splice(0, this.temporaryQueues.length + 1 - this.maxQueues);

                this.temporaryQueues.push({
                    cursor: true,
                    data: JSON.parse(JSON.stringify(this.template))
                });

                this.enableUndo = this.temporaryQueues.length > 1;
                this.enableRedo = false;

                clearTimeout(this.timeoutSaving);
                this.timeoutSaving = setTimeout(this.saveTemplate, this.timeoutSavingMS);
            }, 500);
        },
        undo() {
            let index = this.temporaryQueues.findIndex(temporaryQueue => temporaryQueue.cursor);
            if (index > 0) {
                this.temporaryQueues[index].cursor = false;
                this.temporaryQueues[index - 1].cursor = true;
                this.template = null;

                this.enableUndo = index - 1 > 0;
                this.enableRedo = true;

                this.$nextTick(() => {
                    this.template = JSON.parse(JSON.stringify(this.temporaryQueues[index - 1].data));
                });

                clearTimeout(this.timeoutSaving);
                this.timeoutSaving = setTimeout(this.saveTemplate, this.timeoutSavingMS);
            }
        },
        redo() {
            let index = this.temporaryQueues.findIndex(temporaryQueue => temporaryQueue.cursor);
            if (index < this.temporaryQueues.length - 1) {
                this.temporaryQueues[index].cursor = false;
                this.temporaryQueues[index + 1].cursor = true;
                this.template = null;

                this.enableUndo = true;
                this.enableRedo = index + 1 < this.temporaryQueues.length - 1;

                this.$nextTick(() => {
                    this.template = JSON.parse(JSON.stringify(this.temporaryQueues[index + 1].data));
                });

                clearTimeout(this.timeoutSaving);
                this.timeoutSaving = setTimeout(this.saveTemplate, this.timeoutSavingMS);
            }
        },
        getElementByPath(path) {
            if (!path)
                return null;

            let element;
            let keys = path.split('/'); // ex: path1/path2

            for (let i = 0; i < keys.length; i++) {
                if (!keys[i])
                    continue;

                if (i === 0)
                    element = this.template.key === keys[i] && this.template;
                else
                    element = element.components && element.components.length && element.components.find(component => component.key === keys[i]);

                if (!element)
                    break;
            }
            return element;
        },
        createElement(parentPath, elementName, options) {
            let key = elementName + '-' + Math.floor((Math.random() * 1000000000) + 1);
            let path = parentPath + '/' + key;
            let element = {key, path, name: elementName, style: options && options.style || {}, setting: options && options.setting || {}, components: []};

            return element;
        },
        addElement(parentInstance, parentPath, elementName, options) { // Be called from section or section cell elements.
            console.log('parentPath', parentPath);
            
            let parentElement = this.getElementByPath(parentPath);
            if (!parentElement)
                return null;

            if (!parentElement.components)
                parentElement.components = [];

            // Only able to add 1 item into cell. Remove old item when add another item.
            // if (parentElement.components.length && !['element-section'].includes(elementName))
            //     parentElement.components = [];

            let element = this.createElement(parentPath, elementName, options);
            parentElement.components.push(element);

            if (parentInstance && typeof parentInstance.reset === 'function')
                parentInstance.reset();

            this.pushToTemporaryQueue();
            console.log('element', element);
            return element;
        },
        removeElement(parentPath, key) { // Be called from elements.
            console.log('parentPath', parentPath);
            let element;
            let parentElement = this.getElementByPath(parentPath);
            let index = parentElement && parentElement.components ? parentElement.components.findIndex(component => component.key === key) : -1;
            if (index > -1) {
                element = parentElement.components.splice(index, 1);
                this.pushToTemporaryQueue();
            }
            return element;
        },
        updateElement({instance, path, style, setting}) {
            console.log('style, setting', style, setting);
            let element = this.getElementByPath(path);
            if (element) {
                element.style = style;
                element.setting = setting;

                if (instance && typeof instance.reset === 'function')
                    instance.reset();

                this.pushToTemporaryQueue();
            }
        },
        sendBackward() {
            if (this.elementSelected && this.elementSelected.key) {
                if (this.elementSelected.setting.stylesBox.zIndex >= 1) {
                    let setting = this.elementSelected.setting;
                    let style = this.elementSelected.style;
                    setting.stylesBox.zIndex -= 1;
                    let instance = this.$refs.elementContainer.$refs[this.elementSelected.key][0];
                    this.updateElement({instance: instance, path: this.elementSelected.path, style: style, setting: setting});
                }

            }
        },
        bringForward() {
            if (this.elementSelected && this.elementSelected.key) {
                let setting = this.elementSelected.setting;
                let style = this.elementSelected.style;
                setting.stylesBox.zIndex += 1;
                let instance = this.$refs.elementContainer.$refs[this.elementSelected.key][0];
                this.updateElement({instance: instance, path: this.elementSelected.path, style: style, setting: setting});
            }
        },
        removeItemSelected() {
            if (this.elementSelected && this.elementSelected.key)
                this.removeElement(this.template.path, this.elementSelected.key);
        },
        dragover_handler(ev) {
            console.log('over', ev);
            console.log('element-text-489606982', $('#element-text-489606982').position());

            if (!this.designMode)
                return;
            ev.preventDefault();
            ev.dataTransfer.dropEffect = "move";
        },
        drop_handler(ev) {
            console.log('this.designMode', this.designMode);
            if (!this.designMode)
                return;

            ev.preventDefault();
            console.log('design end', ev);

            // Get the id of the target and add the moved element to the target's DOM
            let data = ev.dataTransfer.getData('application/json');
            if (!data)
                return;

            console.log('design data', data);

            let options = {};

            options.setting = {
                stylesBox: {
                    position: 'absolute',
                    top: ev.layerY * (13 / this.sizeScale), // sizeScale => 1em , 13px => ? 
                    left: ev.layerX * (13 / this.sizeScale),
                    width: 120,
                    height: 60,
                    x: ev.x * (13 / this.sizeScale),
                    y: ev.y * (13 / this.sizeScale),
                    zIndex: 1,
                }
            };

            if (!data.includes('{'))
                this.$refs.elementContainer.addElement(data, options);
            else {
                data = JSON.parse(data);
                options.setting.stylesBox.top = data.setting.stylesBox.top + (ev.y * (13 / this.sizeScale) - data.setting.stylesBox.y);
                options.setting.stylesBox.left = data.setting.stylesBox.left + (ev.x * (13 / this.sizeScale) - data.setting.stylesBox.x);
                options.setting.stylesBox.width = data.setting.stylesBox.width;
                options.setting.stylesBox.height = data.setting.stylesBox.height;
                document.getElementById(data.key).classList.remove('is-drag');
                let instance = this.$refs.elementContainer.$refs[data.key][0];
                let setting = {...data.setting, ...options.setting};
                this.updateElement({instance: instance, path: data.path, style: data.style, setting: setting});
                if (this.elementSelected && this.elementSelected.key) {
                    if (this.designMode)
                        this.$refs.elementContainer.$refs[this.elementSelected.key][0].openSetting();
                }
            }
        },
        openGallery(value) {
            if (value === 1) 
                this.$refs.gallery.open(1); 
            else if (value === 4) 
                this.$refs.gallery.open(4);    
            else if (value === 2) 
                this.$refs.gallery.open(2);                                 
            else {
                this.$refs.gallery.open(value.type);
                this.dataGallery = value.data;
            }
        },
        handleGallery(data) {

            if (data.type === 4){
                if (this.audio)
                    this.audio.pause();

                this.urlMusic = convertToUrl(data.musicInfo.url);                          
                this.template.style.music = this.urlMusic;  
                this.saveTemplate();
            }
            else if (!this.dataGallery) {
                this.backgroundImage = convertToUrl(data.imageInfo.url);
                this.changeBackground('image');
            }
            else {
                this.dataGallery.setting.url = data.imageInfo ? data.imageInfo.url : data.videoInfo.url;
                this.dataGallery.setting.mediaId = data.id;
                this.updateElement(this.dataGallery);
                this.pushToTemporaryQueue();
            }
        },
        saveAll() {
            this.templateData.name = this.titlePage;
            this.templateData.isDrag = false;
            this.saveTemplate();
            if (this.pageType === PageType.Template)
                this.$router.push('/templates');
            else this.$router.push('/screens');
        },
        preview() {
            if (this.template)
                this.$refs.popupReview.open(this.template, this.ratioSelected.value);
        },
        handlerRatio(item) {
            this.ratioSelected = item;
            this.ratioSize = getRatioSize(item.value);
            if (this.templateData && this.pageType === PageType.Template)
                this.templateData.ratioId = item.id;
            
            this.$nextTick(() => {
                this.getSizeScale();
            });
        },
        handlerCategory(item) {
            this.categorySelected = item;
            if (this.templateData && this.pageType === PageType.Template)
                this.templateData.categoryId = item.id;
        },
    }
};
</script>