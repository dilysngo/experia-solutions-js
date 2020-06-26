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
        <div 
            class="page-body" 
        >
            <div class="container-screens">
                <div class="row">
                    <div
                        class="col-md-3"
                        v-for="(template, index) in screens"
                        :key="index"
                    >
                        <block-template
                            :template="template"
                            @delete="handleDeleteScreen"
                            @edit="handleEdit"
                            @selectUsers="handleSelectUser"
                            @preview="handlePreview($event, template.ratio)"
                        />
                    </div>  
                    <div
                        class="col-md-3 block-default"
                        v-if="!isAdmin"
                    >
                        <button
                            class="btn-add-more-screen"
                            id="addMedia"
                            @click="handlerSendRequest"
                        >
                            <i class="icon-plus icon-site" />
                        </button>
                        <p>Add more screens</p>
                    </div>               
                </div>
                <div class="paginate">
                    <client-only>
                        <pagination
                            id="pagination"
                            :skip="skip"
                            :limit="limit"
                            :total="total" 
                            @change="changePage"
                        />
                    </client-only>
                </div>
            </div>
        </div>
        <popup-review
            ref="popupReview"
            id="popupReview"
        />   
        <popup-request 
            ref="popupRequest"
            id="popupRequest"
        />   
        <popup-purchase
            ref="popupPurchase"
            id="popupPurchase"
            :style="flag"
            @deleteScreen="handleRemoveScreen"
        />  
        <popup-confirm
            ref="popupConfirm"
            id="deleteScreen"
            @success="handleDelete"
            @cancel="handleCancel"
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
import PopupPurchase from '~/components/PopupPurchase';
import PopupRequest from '~/components/PopupRequest';
import {Roles} from '~/common/commonType';

export default {
    //middleware: ['authentication'],
    components: {
        BlockTemplate,
        Pagination,
        PopupConfirm,
        PopupReview,
        PopupPurchase,
        PopupRequest
    },
    data() {
        return {
            totalTemplate: 10,
            screens: [],
            flag: '',
            skip: 0,
            limit: 12,
            total: 0,
            keyword: '',
            isAdmin: false

        };
    },
    async created() {
        await this.getSreens();
        this.isAdmin = 1;

    },
    computed: {
        ...mapGetters('screen', ['screenList', 'screenPagination']),
        ...mapGetters('user', ['userAuth'])
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
            this.screens = [];
            let data = await this.findScreens({keyword: this.keyword, limit: this.limit, skip: this.skip}).catch(err => {
                if (err)
                    console.log(err.message);
            });
            this.total = data && data.pagination && data.pagination.total;
            this.screens = this.screenList;
        },
        handleDeleteScreen(item) {
            this.$refs.popupConfirm.open(item);
        },
        handleRemoveScreen(data){
            this.flag = 'display: none;';
            this.$refs.popupConfirm.open(data);
        },
        async handleDelete(data) {
            if (data.length > 0){
                data.forEach(id => this.removeScreen(id));
            }
            else {  
                await this.deleteScreen(data.id);
                await this.getSreens();
            }
        },
        async handlerSendRequest(){
            this.$refs.popupRequest.open();
        },
        async removeScreen(id){
            let result = await this.deleteScreen(id).catch(err => {
                if (err)
                    console.log(err.message);
            });
            if (result){   
                this.flag = 'display: block;';
                this.$refs.popupPurchase.cancel();
            }
        },
        handleCancel(data){
            if (data.length > 0)
                this.flag = 'display: block;';
        },
        handleEdit(item) {
            if (item.id)
                this.$router.push(`/templates/design?screen=${item.id}`);
        },
        handlePreview(item, ratio) {
            if (item)
                this.$refs.popupReview.open(item, ratio && ratio.value);
        }, 
        handleSelectUser(item) {
            if (item)
                this.$refs.popupPurchase.open(item);
        }
    },
};
</script>