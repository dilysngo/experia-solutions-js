<template>
    <div
        :id="'temp' + template.id"
        class="block-template"
    >
        <div class="template-thumbnail">
            <img
                class="img-fluid img-thumb"
                :src="template.thumb"
                alt="Thumbnail Template"
            >
            <div class="template-action">
                <nuxt-link 
                    to="/"
                    class="btn-link"
                >
                    <i class="icon-play icon-site" />
                </nuxt-link>
                <nuxt-link 
                    to="/"
                    class="btn-link"
                >
                    <i class="icon-creative icon-site" />
                </nuxt-link>
                <nuxt-link 
                    to="/"
                    class="btn-link"
                >
                    <i class="icon-trash icon-site" />
                </nuxt-link>
            </div>
            <div class="template-using">
                <nuxt-link 
                    to="/"
                    class="btn-link"
                >
                    Using this template
                </nuxt-link>
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
                    <i class="icon-see-full icon-site" />
                    <span>{{ template.size }}</span>
                </div>
                <div class="temp-date-create">
                    <i class="icon-clock icon-site" />
                    <span>{{ template.dateCreate }}</span>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
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
    }
};
</script>