<template>
    <section class="page-container page-screens">
        <div class="page-header d-flex">
            <h4>My Screens (<span>10</span>)</h4>
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
import BlockTemplate from '~/components/BlockTemplate';

export default {
    components: {
        BlockTemplate,
    },
    data() {
        return {
            templates: [
                {id: 1, thumb: '/images/template-thumbnail.png', name: 'Lotteria Promotion ', size: '16:9', dateCreate: '23/10'},
                {id: 2, thumb: '/images/template-thumbnail.png', name: 'Telescopes 101', size: '16:9', dateCreate: '12/10'},
                {id: 3, thumb: '/images/template-thumbnail.png', name: 'Moon Fever', size: '16:9', dateCreate: '01/10'},
                {id: 4, thumb: '/images/template-thumbnail.png', name: 'The Glossary Of Telescopes', size: '16:9', dateCreate: '26/10'},
                {id: 5, thumb: '/images/template-thumbnail.png', name: 'Dentists Are Smiling Over Pain', size: '16:9', dateCreate: '30/10'}
            ]
        };
    }
};
</script>