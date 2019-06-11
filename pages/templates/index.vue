<template>
    <section class="page-container page-templates">
        <div class="page-header d-flex">
            <h4>Templates ({{ totalTemplate }})</h4>
            <div class="d-flex">
                <filter-select
                    placeholder="Ratio 16:9"
                    :data="dataCategory"
                />
                <filter-select
                    placeholder="Category"
                    :data="dataSize"
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
            <div class="container-screens">
                <div class="row">
                    <div
                        class="col-md-3"
                        v-for="template in templates"
                        :key="template.id"
                    >
                        <block-template
                            :template="template"
                        />
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>
<script>
import FilterSelect from '~/components/FilterSelect';
import BlockTemplate from '~/components/BlockTemplate';

export default {
    components: {
        FilterSelect,
        BlockTemplate,
    },
    data() {
        return {
            totalTemplate: 10,
            templates: [
                {id: 1, thumb: '/images/template-thumbnail.png', name: 'Lotteria Promotion ', size: '16:9', dateCreate: '23/10'},
                {id: 2, thumb: '/images/template-thumbnail.png', name: 'Telescopes 101', size: '16:9', dateCreate: '12/10'},
                {id: 3, thumb: '/images/template-thumbnail.png', name: 'Moon Fever', size: '16:9', dateCreate: '01/10'},
                {id: 4, thumb: '/images/template-thumbnail.png', name: 'The Glossary Of Telescopes', size: '16:9', dateCreate: '26/10'},
                {id: 5, thumb: '/images/template-thumbnail.png', name: 'Dentists Are Smiling Over Pain', size: '16:9', dateCreate: '30/10'}
            ],
            dataSize: [
                {name: 'Ratio 16:9', value: 1}, 
                {name: 'CC-Affiliate Partner', value: 2},
                {name: 'CC-Cold', value: 3},
            ],
            dataCategory: [
                {name: 'All Sreens', value: '', isTitle: true},
                {name: 'Landscape', value: '', isTitle: true},
                {name: 'Wide screen', value: '16:9', supTitle: '1920 x 1080, 1280 x 720'},
                {name: 'Normal screen', value: '4:3', supTitle: '1024 x 768'},
                {name: 'Wide screen', value: '16:10', supTitle: '1920 x 1200, 1152 x 720'},
                {name: 'Portrait', value: '', isTitle: true},
                {name: 'Wide screen', value: '9:16', supTitle: '1080 x 1920, 720 x 1280'},
                {name: 'Normal screen', value: '3:4', supTitle: '768 x 1024'},
                {name: 'Wide screen', value: '10:16', supTitle: '1200 x 1920, 720 x 1152'},
            ]
        };
    }
};
</script>