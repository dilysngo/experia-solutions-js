<template>
    <div
        :id="'temp' + template.id"
        class="block-template"
    >
        <div class="template-thumbnail">
            <img
                class="img-fluid img-thumb"
                :src="template.thumb || '/images/template-thumbnail.png'"
                alt="Thumbnail Template"
            >
            <div class="template-action">
                <a 
                    to="/"
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
                    Using this template
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
        }
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
        }
    },
    filters: {
        convertToDateString(date) {
            return convertToDateString(date);
        },
    }
};
</script>