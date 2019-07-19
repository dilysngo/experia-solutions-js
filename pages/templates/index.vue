<template>
    <section class="page-container page-templates">
        <div class="page-header d-flex">
            <h4>Templates ({{ total }})</h4>
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
                        v-model="keyword"
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
                        v-for="(template, index) in templateList"
                        :key="index"
                    >
                        <block-template
                            :template="template"
                            @usingTemplate="createScreenByTemplate"
                        />
                    </div>
                </div>
                <div class="paginate">
                    <no-ssr>
                        <pagination
                            id="pagination"
                            :skip="skip"
                            :limit="limit"
                            :total="total" 
                            @change="changePage"
                        />
                    </no-ssr>
                </div>
            </div>
        </div>
    </section>
</template>
<script>
import FilterSelect from '~/components/FilterSelect';
import BlockTemplate from '~/components/BlockTemplate';
import {mapGetters, mapActions} from 'vuex';
import {pagination} from '~/helpers/dataHelper';
import Pagination from '~/components/Pagination';
import {convertToString} from '~/helpers/dateHelper';

export default {
    components: {
        FilterSelect,
        BlockTemplate,
        Pagination,
    },
    data() {
        return {
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
            skip: 0,
            limit: 12,
            total: 0,
            keyword: '',
        };
    },
    async created() {
        await this.getTemplates();
    },
    computed: {
        ...mapGetters('template', [
            'templateList',
        ]),
        ...mapGetters('user', [
            'userAuth'
        ])
    },
    watch: {
        keyword: function(newData) {
            clearTimeout(this.timeOut);
            this.timeOut = setTimeout(() => {
                this.getTemplates();
            }, 500);
        }
    },
    methods: {
        ...mapActions('template', [
            'findTemplates',
        ]),
        ...mapActions('screen', [
            'createScreen',
        ]),
        async changePage(page){
            let data = pagination(page, this.limit);
            this.skip = data;
            await this.getTemplates();
        },
        async getTemplates() {
            let data = await this.findTemplates({keyword: this.keyword, limit: this.limit, skip: this.skip}).catch(err => {
                if (err)
                    console.log(err.message);
            });
            this.total = data && data.pagination && data.pagination.total;
            // this.$forceUpdate();
        },
        async createScreenByTemplate(item) {
            let dataCreate = {
                userId: this.userAuth.id,
                name: 'Screen-' + convertToString(new Date()),
                template: {
                    id: 0,
                    code: 0,
                    name: '',
                    slug: '',
                    isDrag: true,
                    template: item.template,
                    ratio: '',
                    category: '',
                    createAt: ''
                }
            };
            let result = await this.createScreen(dataCreate).catch(err => {
                console.log('err', err); 
                return false;
            });
            if (result.id)
                this.$router.push('/templates/design?screen=' + result.id);
        },
    },
};
</script>