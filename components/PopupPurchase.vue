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
                                @click="handelSubmit"
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
            arrBefore: [],
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
        ...mapActions('screen', ['findScreenWithUser', 'getScreenBySlug', 'createScreen', 'deleteScreen']),

        limitText(count) {
            return `and ${count} other users`;
        },
        async asyncFind(query) {
            this.isLoading = true;
            let data = await this.findUsers({keyword: query, limit: this.limit, skip: this.skip}).catch(err => {
                if (err)
                    console.log(err.message);
            });
            this.users = data.results;
            this.isLoading = false;
        },
        async handelSubmit() {
            var arrFlag = [];
            var removeArr = [];
            var addArr = [] ;              

            if (!this.data.slug)
                return;
            let data = await this.getScreenBySlug(this.data.slug).catch(err => {
                if (err)
                    console.log(err.message);
            });            

            this.arrBefore.forEach(x => this.selectedUsers.forEach(y => {
                if (x.id === y.id)
                    arrFlag.push(x);
            }));
            console.log(arrFlag, 'arrFlag');

            this.arrBefore.forEach(x => arrFlag.forEach(y => {
                if (x.id !== y.id)
                    removeArr.push(y);
            }));

            console.log(removeArr, 'removeArr');

            // if (removeArr.length !== 0)
            //     removeArr.forEach(item => this.deleteScreen());

            // this.selectedUsers.forEach(x => arrFlag.forEach(y => {
            //     if (x.id !== y.id)
            //         addArr.push(x);
            // }));
            // if (addArr.length !== 0)
            //     addArr.forEach(item => this.selectedUsers.push(item.user));

        },   
        async open(data) {
            this.selectedUsers = [];
            this.data = data;
            this.screenUser = await this.findScreenWithUser(this.data.id).catch(err => {
                if (err)
                    console.log(err.message);
            });

            const results = this.screenUser;
            results.forEach(item => this.selectedUsers.push(item.user));
            this.arrBefore = this.selectedUsers;

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

