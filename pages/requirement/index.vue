<template>
    <div class="page-body requirement bg-gray">
        <section class="list-requirement">
            <div class="container">
                <h2>
                    Request from user
                </h2>
                <div class="content-requirement">
                    <table class="tbl-requirement">
                        <thead>
                            <tr>
                                <th>Email</th>
                                <th>Name</th>
                                <th>Created At</th>
                                <th>Number request</th>
                                <th>Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr
                                v-for="(result, index) in requirementList"
                                :key="index"
                            >
                                <td>{{ result.user.email }}</td>
                                <td>{{ result.user.firstName + result.user.lastName }}</td>
                                <td> {{ formatDate(result.createdAt) }} </td>
                                <td>{{ result.numberRequests }}</td>
                                <!-- <td>{{ result.status }}</td> -->
                                <td>
                                    <i v-if="result.status==='done'">
                                        <img src="~/assets/images/tickDone.svg">
                                    </i>
                                    <i v-else >
                                        <img src="~/assets/images/tick.svg">
                                    </i>
                                </td>
                                <button
                                    class="btn-submit-requirement"
                                    @click="handlerUpdateStatus(result)"
                                >
                                    Approved
                                </button>   
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div class="paginate">
                    <pagination
                        id="pagination"
                        :skip="skip"
                        :limit="limit"
                        :total="total" 
                        @change="changePage"
                    />
                </div>
            </div>
            <popup-confirm
                ref="popupConfirm"
                id="deleteScreen"
                @success="handlerSuccess"
                @cancel="handleCancel"
            />
        </section>
    </div>
</template>
<script>
import {mapGetters, mapActions} from 'vuex';
import PopupConfirm from '~/components/PopupConfirm';
import {pagination} from '~/helpers/dataHelper';
import Pagination from '~/components/Pagination';
import moment from 'moment';
export default {
    layout: 'default',
    components: {
        PopupConfirm,
        Pagination
    },
    data() {
        return {
            totalTemplate: 10,
            requirements: [],
            flag: '',
            skip: 0,
            limit: 10,
            total: 0,
            keyword: '',
        };
    },
    async created() {
        await this.getRequirements();
    },
    computed: {
        ...mapGetters('requirement', ['requirementList', 'requirementPagination']),
        ...mapGetters('user', ['userAuth'])
    },
    methods: {
        ...mapActions('requirement', [
            'findRequirements',
            'updateRequirement'
        ]),
        formatDate(date) {
            return moment(date).format('YYYY-MM-DD');
        },  
        async handlerUpdateStatus(obj) {   
            this.$refs.popupConfirm.open(obj);
        },

        async handlerSuccess(obj) {
            let clone_obj = Object.assign({}, obj);
            clone_obj.status = 'done';
            const result = await this.updateRequirement(clone_obj).catch(err => {
                this.$notify({
                    group: 'error',
                    title: 'Update failed',
                    text: err.message
                });
            });
            if (result) {
                await this.getRequirements();
                this.$notify({
                    group: 'success',
                    title: 'Success',
                    text: 'Successfully updated!',
                });  
            }
        }, 
        async changePage(page) {
            let data = pagination(page, this.limit);
            this.skip = data;
            await this.getRequirements();
        },
        async getRequirements() {
            let data = await this.findRequirements({keyword: this.keyword, limit: this.limit, skip: this.skip}).catch(err => {
                if (err)
                    console.log(err.message);
            });
            this.total = data && data.pagination && data.pagination.total;
            this.requirements = data.results;
        },
    }
};
</script>