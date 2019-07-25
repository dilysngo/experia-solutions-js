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
            >
                <element-container
                    :ref="'elementContainer'"
                    :root="this"
                    :design-mode="false"
                    v-if="templateData"
                    :source="templateData"
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
            </div>
            <div class="template-using">
                <a 
                    @click="usingTemplate"
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
            <h3
                class="template-name"
            >
                {{ template.name }}
            </h3>
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

export default {
    components: {
        ElementContainer
    },
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
        templateData: null
    }),
    created() {
        setTimeout(() => {
            if (this.$route.path.toString() === '/screens')
                this.templateData = this.template.template.template;
            else this.templateData = this.template.template;
        }, 100);
    },
    mounted() {

    },
    methods: {
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
        }
    },
    filters: {
        convertToDateString(date) {
            return convertToDateString(date);
        },
    }
};
</script>