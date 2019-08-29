<template>
    <section class="page-container page-templates">
        <div class="page-header d-flex">
            <h4>Templates ({{ total ? total : 0 }})</h4>
            <div class="d-flex">
                <filter-select
                    @input="handlerRatio"
                    :data="dataSize"
                />
                <filter-select
                    :data="dataCategory"
                    @input="handlerCategory"
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
                            :is-admin="isAdmin"
                            @usingTemplate="createScreenByTemplate"
                            @edit="handleEdit"
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
import {Roles} from '~/common/commonType';

export default {
    components: {
        FilterSelect,
        BlockTemplate,
        Pagination,
    },
    data() {
        return {
            dataCategory: [],
            dataSize: [],
            skip: 0,
            limit: 12,
            total: 0,
            keyword: '',
            isAdmin: false,
            ratioType: null,
            ratioId: null,
            categoryId: null
        };
    },
    async created() {
        await this.getTemplates();
        this.isAdmin = this.userAuth.role.code === Roles.Admin;

        let ratioList = await this.findRatios();
        let categoryList = await this.findCategory();

        this.dataSize = ratioList.results || [];
        this.dataCategory = categoryList.results || [];
    },
    computed: {
        ...mapGetters('template', [
            'templateList',
        ]),
        ...mapGetters('user', [
            'userAuth'
        ]),
    },
    watch: {
        keyword: function(newData) {
            clearTimeout(this.timeOut);
            this.timeOut = setTimeout(() => {
                this.getTemplates();
            }, 500);
        },
    },
    methods: {
        ...mapActions('template', [
            'findTemplates',
        ]),
        ...mapActions('screen', [
            'createScreen',
        ]),
        ...mapActions('ratio', [
            'findRatios',
        ]),
        ...mapActions('category', [
            'findCategory',
        ]),
        async changePage(page){
            let data = pagination(page, this.limit);
            this.skip = data;
            await this.getTemplates();
        },
        async getTemplates() {
            let data = await this.findTemplates({keyword: this.keyword, categoryId: this.categoryId, ratioId: this.ratioId, ratioType: this.ratioType, limit: this.limit, skip: this.skip}).catch(err => {
                if (err)
                    console.log(err.message);
            });
            this.total = data && data.pagination && data.pagination.total;
            // this.$forceUpdate();
        },
        async createScreenByTemplate(item) {
            console.log('item', item);
            let dataCreate = {
                userId: this.userAuth && this.userAuth.id,
                name: 'Screen-' + convertToString(new Date()),
                ratioId: item.ratio && item.ratio.id,
                categoryId: item.category && item.category.id,
                slug: '',
                template: {
                    id: 0,
                    code: 0,
                    name: '',
                    slug: '',
                    isDrag: true,
                    template: item.template,
                    ratio: item.ratio,
                    category: item.category,
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
        handleEdit(item) {
            if (item.id)
                this.$router.push(`/templates/design?template=${item.id}`);
        },
        handlerRatio(item) {
            this.ratioType = (item && !item.value && item.type !== 1) ? item.type : '';
            if (!this.ratioType)
                this.ratioId = (item && item.value) ? item.id : '';
            else this.ratioId = '';

            this.getTemplates();
        },
        handlerCategory(item) {
            this.categoryId = (item && item.value) ? item.id : '';
            this.getTemplates();
        }
    },
};
</script>