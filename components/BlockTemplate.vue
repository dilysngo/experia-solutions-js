<template>
    <div
        :id="'temp' + template.id"
        class="block-template"
    >
        <div class="template-thumbnail">
            <!-- <img
                class="img-fluid img-thumb"
                :src="template.thumb || '/images/template-thumbnail.png'"
                alt="Thumbnail Template"
            > -->
            <div
                class="preview-img"
                :style="{fontSize: sizeScale + 'px'}"
            >
                <element-container
                    :ref="'elementContainer'"
                    :root="this"
                    :design-mode="false"
                    v-if="templateData"
                    :source="templateData"
                    :size-scale="sizeScale"
                />
            </div>
            <div class="template-action">
                <a 
                    @click="previewTemplate" 
                    class="btn-link"
                >
                    <i class="icon-play icon-site" />
                </a>
                <a
                    @click="editTemplate" 
                    class="btn-link"
                >
                    <i class="icon-creative icon-site" />
                </a>
                <a 
                    class="btn-link"
                    @click="deleteItem"
                >
                    <i class="icon-trash icon-site" />
                </a>                         
                <a 
                    v-if="userAuth.role.code===1"                          
                    class="btn-link"
                    @click="selectUsers"
                >
                    <img src="~/assets/images/addUser.svg">
                </a>                
            </div>
            <div class="template-using">
                <a 
                    v-if="userAuth.role.code===1"
                    @click="usingTemplate"
                    class="btn-link"
                >
                    Using template
                </a>
                <a 
                    v-else
                    @click="handlerTeamplate"
                    class="btn-link"
                >
                    Using template
                </a>                
                <a 
                    @click="editTemplate"
                    class="btn-link m-l-20"
                    v-if="isAdmin"
                >
                    Edit template
                </a>            
            </div>
        </div>
        <div class="template-info">
            <a
                :href="template.slug"
                target="_blank"
                class="template-name"
            >
                {{ template.name }}
            </a>
            <div class="temp-infor-more d-flex">
                <div class="temp-sizes">
                    <i class="icon-sizes icon-site" />
                    <span>{{ template.size || '16:9' }}</span>
                </div>
                <div class="temp-date-create">
                    <i class="icon-celandar icon-site" />
                    <span>{{ template.createdAt | convertToDateString }}</span>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import {convertToDateString} from '~/helpers/dateHelper';
import ElementContainer from '~/components/elements/ElementContainer';
import Vue from 'vue';
import {mapGetters, mapActions} from 'vuex';
import * as Swal from 'sweetalert2';

Vue.component('element-container', ElementContainer);

export default {
    props: {
        template: {
            type: Object,
            default: () => ({
                id: 0,
                thumb: '/images/img-thumb-default.png',
                name: 'Template Name',
                size: '16:9',
                dateCreate: '10/10'
            }),
        },
        isAdmin: {
            type: Boolean,
            default: false
        }
    },
    data: () => ({
        templateData: null,
        sizeScale: null,
        unitScale: 13 / 928 // fontSize/containerWidth
    }),
    created() {
        setTimeout(() => {
            if (this.$route.path.toString() === '/templates') this.templateData = this.template.template;
            else    
                this.templateData = this.template.template.template;
        }, 100);
    },
    computed: {
        ...mapGetters('user',['userAuth'])  
    },    
    mounted() {
        setTimeout(() => {
            let containerWidth = $('.preview-img').width();
            this.sizeScale = containerWidth * this.unitScale;
            console.log('sizescale', this.sizeScale);
            console.log('containerWidth1', containerWidth);
        }, 200);
    },
    methods: {
        handlerTeamplate() {
            Swal.fire('Comming soon!','The system is under maintenance, please contact admin!','warning');
        },
        deleteItem() {
            this.$emit('delete', this.template);
        },
        editTemplate() {
            this.$emit('edit', this.template);
        },
        usingTemplate() {
            this.$emit('usingTemplate', this.template);
        },
        previewTemplate() {
            this.$emit('preview', this.templateData);
        },
        selectUsers() {
            this.$emit('selectUsers', this.template);
        },
        reRender() {
            setTimeout(() => {
                let containerWidth = $('.preview-img').width();
                this.sizeScale = containerWidth * this.unitScale;
                console.log('sizescale', this.sizeScale);
                console.log('containerWidth', containerWidth);
            }, 200);
        }
    },
    filters: {
        convertToDateString(date) {
            return convertToDateString(date);
        },
    }
};
</script>