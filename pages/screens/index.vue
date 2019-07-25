<template>
    <section class="page-container page-screens">
        <div class="page-header d-flex">
            <h4>My Screens ({{ total }})</h4>
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
        <div class="page-body">
            <div class="container-screens">
                <div class="row">
                    <div
                        class="col-md-3"
                        v-for="(template, index) in screenList"
                        :key="index"
                    >
                        <block-template
                            :template="template"
                            @delete="handleDeleteScreen"
                            @edit="handleEdit"
                            @preview="handlePreview"
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
        <popup-review
            ref="popupReview"
            id="popupReview"
        />
        <popup-confirm
            ref="popupConfirm"
            id="deleteScreen"
            @success="handleDelete"
        />
    </section>
</template>
<script>
import BlockTemplate from '~/components/BlockTemplate';
import {mapGetters, mapActions} from 'vuex';
import {pagination} from '~/helpers/dataHelper';
import Pagination from '~/components/Pagination';
import PopupConfirm from '~/components/PopupConfirm';
import PopupReview from '~/components/PopupReview';

export default {
    components: {
        BlockTemplate,
        Pagination,
        PopupConfirm,
        PopupReview
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
            skip: 0,
            limit: 12,
            total: 0,
            keyword: '',
        };
    },
    async created() {
        await this.getSreens();
    },
    computed: {
        ...mapGetters('screen', [
            'screenList',
            'screenPagination'
        ])
    },
    watch: {
        keyword: function(newData) {
            clearTimeout(this.timeOut);
            this.timeOut = setTimeout(() => {
                this.getSreens();
            }, 500);
        }
    },
    methods: {
        ...mapActions('screen', [
            'findScreens',
            'deleteScreen'
        ]),
        async changePage(page){
            let data = pagination(page, this.limit);
            this.skip = data;
            await this.getSreens();
        },
        async getSreens() {
            let data = await this.findScreens({keyword: this.keyword, limit: this.limit, skip: this.skip}).catch(err => {
                if (err)
                    console.log(err.message);
            });
            this.total = data && data.pagination && data.pagination.total;
            this.$forceUpdate();
        },
        handleDeleteScreen(item) {
            console.log('temeee', item);
            this.$refs.popupConfirm.open(item);
        },
        async handleDelete(item) {
            await this.deleteScreen(item.id);
            await this.getSreens();
        },
        handleEdit(item) {
            if (item.id)
                this.$router.push(`/templates/design?screen=${item.id}`);
        },
        handlePreview(item) {
            if (item)
                this.$refs.popupReview.open(item);
        }
    },
};
</script>