<template>
    <div
        class="modal fade box-popup show"
        :id="id"
        role="dialog"
        data-backdrop="static" 
        data-keyboard="false"
    >
        <div class="modal-dialog modal-dialog-centered text-center">
            <div class="modal-content">
                <button
                    @click="cancel()"
                    class="btn-close border-black"
                >
                    <img src="~/assets/images/close.svg">
                </button>
                <div class="modal-body">
                    <h3 class="box-title modal-title m-b-30">
                        {{ title }}
                    </h3>
                    <div>
                        <multiselect 
                            v-model="selectedUsers"
                            id="ajax"
                            label="email" 
                            track-by="id"  
                            placeholder="Type to search" 
                            open-direction="bottom" 
                            :options="users"
                            :multiple="true"
                            :searchable="true"
                            :loading="isLoading" 
                            :clear-on-select="false" 
                            :close-on-select="false"
                            :options-limit="300"
                            :limit="3"
                            :limit-text="limitText"
                            :max-height="600"
                            :taggable="true"
                            @search-change="asyncFind" 
                        />
                    </div>
                    <div class="row group-button no-gutters m-b-20">
                        <div class="col-lg-5 col-md-6 col-sm-12 pr-md-2 offset-lg-1">
                            <button
                                class="btn-submit"
                            >
                                Submit
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>  
</template>
<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>
<script>
import {mapGetters, mapActions} from 'vuex';
import Multiselect from 'vue-multiselect';
export default {
    components: {
        Multiselect
    },
    data() {
        return {
            users: [],
            screenUser: [],
            selectedUsers: [],
            isLoading: false
        };
    },
    props: {
        id: {
            type: String,
            default: ''
        },
        title: {
            type: String,
            default: 'Select User'
        },
        description: {
            type: String,
            default: ''
        },
        buttonName1: {
            type: String,
            default: 'Yes'
        },
        buttonName2: {
            type: String,
            default: 'No'
        },
        btnRed: {
            type: Boolean,
            default: false
        }
    },
    computed: {
    }, 
    methods: {
        ...mapActions('user', ['findUsers']),
        ...mapActions('screen', ['findScreenWithUser']),

        limitText(count) {
            return `and ${count} other users`;
        },
        async asyncFind(query) {
            this.isLoading = true;
            let data = await this.findUsers({keyword: query, limit: this.limit, skip: this.skip}).catch(err => {
                if (err)
                    console.log(err.message);
            });
            data.results.filter(i => i.role.id !== 1);
            this.users = data.results;
            // this.users.forEach(x => this.screenUser.forEach(y => {
            //     if (x.email === y.user.email){
            //         this.selectedUsers.push(x);
            //     }
            // }));
            this.isLoading = false;
        },       
        async open(data) {
            this.data = data;
            this.screenUser = await this.findScreenWithUser(this.data.id).catch(err => {
                if (err)
                    console.log(err.message);
            });
            const results = this.screenUser;
            results.forEach(item => {
                item.email = item.user.email,
                item.id = item.user.id,
                delete item.user,
                delete item.userId,
                this.selectedUsers.push(item);
            });
            $('#' + this.id).modal('show');
        },
        success() {
            $('#' + this.id).modal('hide');
            this.$emit('success', this.data);
        },
        cancel() {
            $('#' + this.id).modal('hide');
            this.$emit('cancel');
        },
    }
};
</script>

