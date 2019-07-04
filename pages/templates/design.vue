<template>
    <section class="page-container page-create">
        <div class="page-header d-flex">
            <h4>Design space</h4>
            <div class="d-flex">
                <filter-select
                    placeholder="Ratio 16:9"
                    :data="dataSize"
                />
                <filter-select
                    placeholder="Category"
                    :data="dataCategory"
                />
                <div class="form-search">
                    <input
                        type="text"
                        placeholder="Search for..."
                        class="search-input"
                        name="search"
                        maxlength="50"
                    >
                    <i class="icon-search icon-site" />
                </div>
            </div>
        </div>
        <div class="page-body">
            <div class="container-create d-flex">
                <element-list />
                <div class="box-widget">
                    <div class="toolbar d-flex justify-content-between align-items-center">
                        <div class="toolbar-left d-flex">
                            <p>
                                <i class="icon-loading icon-site" />
                                Saving
                            </p>
                            <button
                                class="btn-tool"
                            >
                                <i class="icon-trash-fill icon-site" />
                            </button>
                            <button
                                class="btn-tool"
                            >
                                <i class="icon-layout-up icon-site" />
                            </button>
                            <button
                                class="btn-tool"
                            >
                                <i class="icon-layout-down icon-site" />
                            </button>
                            <button
                                class="btn-tool"
                            >
                                <i class="icon-undo icon-site" />
                            </button>
                            <button
                                class="btn-tool"
                            >
                                <i class="icon-next icon-site" />
                            </button>
                        </div>
                        <div class="toolbar-right">
                            <button
                                class="btn-tool"
                            >
                                Back
                            </button>
                            <button
                                class="btn-tool"
                                disabled
                            >
                                Save
                            </button>
                            <button
                                class="btn-tool btn-preview"
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
                    >
                        <element-container
                            ref="elementContainer"
                            :root="root"
                            :design-mode="designMode"
                            :device-preview="devicePreview"
                            v-if="template"
                            :source="template"
                            :is-setting="isSetting"
                        />
                    </div>
                </div>
                <div class="box-properties" />
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
import ElementClose from '~/components/elements/ElementClose';
import ElementIcon from '~/components/elements/ElementIcon';
import ElementControlBox from '~/components/elements/ElementControlBox';
import ElementContainer from '~/components/elements/ElementContainer';
import {convertToString} from '~/helpers/dateHelper';

Vue.component('element-setting', ElementSetting);
Vue.component('element-close', ElementClose);
Vue.component('element-icon', ElementIcon);
Vue.component('element-control-box', ElementControlBox);
Vue.component('element-container', ElementContainer);
export default {
    components: {
        FilterSelect,
        ElementList
    },
    data() {
        return {
            root: null,
            enableUndo: false,
            enableRedo: false,
            maxQueues: 100,
            temporaryQueues: [],
            showSavingStatus: false,
            saving: false,
            timeoutSaving: null,
            timeoutSavingMS: 3000,
            timeoutTemporaryQueue: null,
            designMode: true,
            devicePreview: 'design',
            isSetting: false,
            template: null,
            templateData: null,
            pickersBackground: false,
            backgroundDefault: {
                hex: '#000000',
                hsl: {h: 150, s: 0.5, l: 0.2, a: 1},
                hsv: {h: 150, s: 0.66, v: 0.30, a: 1},
                rgba: {r: 25, g: 77, b: 51, a: 1},
                a: 1
            },
            dataGallery: null,
            backgroundImage: null,
            dataCategory: [
                {name: 'Category 1', value: 1}, 
                {name: 'Category 2', value: 2},
                {name: 'Category 3', value: 3},
            ],
            dataSize: [
                {name: 'All Sreens', value: '', isTitle: true},
                {name: 'Landscape', value: '', isTitle: true},
                {name: 'Wide screen', value: '16:9', supTitle: '1920 x 1080, 1280 x 720'},
                {name: 'Normal screen', value: '4:3', supTitle: '1024 x 768'},
                {name: 'Wide screen', value: '16:10', supTitle: '1920 x 1200, 1152 x 720'},
                {name: 'Portrait', value: '', isTitle: true},
                {name: 'Wide screen', value: '9:16', supTitle: '1080 x 1920, 720 x 1280'},
                {name: 'Normal screen', value: '3:4', supTitle: '768 x 1024'},
                {name: 'Wide screen', value: '10:16', supTitle: '1200 x 1920, 720 x 1152'},
            ],
        };
    },
    async created() {
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

        if (this.$route.query.template)
            await this.getTemplateById(this.$route.query.template); // Update template
        else if (this.$route.query.screen) // Update template of screen
            this.getTemplateByScreen(this.$route.query.screen);
        else {
            let dataCreate = {
                userId: this.userAuth.id,
                code: this.userAuth.id,
                name: 'Template-' + convertToString(new Date()),
                isDrag: true
            };
            let result = await this.createTemplate(dataCreate).catch(err => {
                console.log('err', err);
                return false;
            });
            this.$router.push('/templates/design?template=' + result.id);            
        }
    },
    computed: {
        ...mapGetters('user', [
            'userAuth'
        ])
    },
    methods: {
        ...mapActions('template', [
            'getTemplate',
            'createTemplate',
            'updateTemplate'
        ]),
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
                if (result.template) {
                    this.template = null;

                    this.$nextTick(() => {
                        this.template = result.template;
                    });
                }
            }
        },
        // async getTemplateByScreen(sceenId) {
        //     let {data, error} = await this.$services.landingService.get(sceenId);
        //     if (error) {
        //         this.$notify({
        //             group: 'error',
        //             title: 'Get data failed!',
        //             text: error.message
        //         });
        //     }
        //     if (data) {
        //         this.templateData = data;
        //         if (data.template) {
        //             this.template = null;

        //             this.$nextTick(() => {
        //                 this.template = data.template;
        //             });
        //         }
        //     }
        // },
        async saveTemplate() {
            if (this.templateData) {
                this.saving = true;
                this.showSavingStatus = true;

                let result;
                this.templateData.template = this.template;

                if (this.$route.query.template) // Update template
                    result = await this.updateTemplate({id: this.$route.query.template, data: this.templateData}).catch(error => {
                        this.$notify({
                            group: 'error',
                            title: 'Save data failed!',
                            text: error.message
                        });
                    });
                else if (this.$route.query.screen) // Update template of landing
                    result = await this.updateTemplateByScreen(this.$route.query.screen, this.template).catch(error => {
                        this.$notify({
                            group: 'error',
                            title: 'Save data failed!',
                            text: error.message
                        });
                    });

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
            let parentElement = this.getElementByPath(parentPath);
            if (!parentElement)
                return null;

            if (!parentElement.components)
                parentElement.components = [];

            // Only able to add 1 item into cell. Remove old item when add another item.
            if (parentElement.components.length && !['element-section'].includes(elementName))
                parentElement.components = [];

            let element = this.createElement(parentPath, elementName, options);
            parentElement.components.push(element);

            if (parentInstance && typeof parentInstance.reset === 'function')
                parentInstance.reset();

            this.pushToTemporaryQueue();
            console.log('element', element);
            return element;
        },
        removeElement(parentPath, key) { // Be called from elements.
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
            let element = this.getElementByPath(path);
            if (element) {
                element.style = style;
                element.setting = setting;

                if (instance && typeof instance.reset === 'function')
                    instance.reset();

                this.pushToTemporaryQueue();
            }
        },
        dragover_handler(ev) {
            ev.preventDefault();
            ev.dataTransfer.dropEffect = "move"; 
        },
        drop_handler(ev) {
            ev.preventDefault();
            // Get the id of the target and add the moved element to the target's DOM
            let name = ev.dataTransfer.getData("text/html");
            // ev.target.appendChild(document.getElementById(data));
            let options = {};

            options.setting = {
                position: 'absolute',
                top: ev.clientY - 16 + 'px',
                left: ev.clientX - 16 + 'px'
            };
            this.$refs.elementContainer.addElement(name, options);
  
            console.log('drop_handler', ev);
            console.log('name', name);

            console.log('drop_handler', ev.clientX, ev.clientY);

        }
    }
};
</script>