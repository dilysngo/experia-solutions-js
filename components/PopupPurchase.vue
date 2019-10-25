<template>
    <div
        class="modal fade box-popup show"
        :id="id"
        role="dialog"
        data-backdrop="static" 
        data-keyboard="false"
        style=""
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
                    <div class="fiter-user">
                        <filter-select
                            :data="optionUsers"
                            @input="handlerUsers"
                        />
                    </div>
                    <div
                        v-if="!flag"
                    >
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
                            :close-on-select="true"
                            :options-limit="300"
                            :limit="3"
                            :limit-text="limitText"
                            :max-height="600"
                            :taggable="true"
                            @search-change="asyncFind" 
                        />
                    </div>
                    <div
                        v-else
                    >
                        <multiselect 
                            v-model="selectedUsersRemove" 
                            tag-placeholder="Add this as new tag"   
                            placeholder="Search or add a tag" 
                            label="email" 
                            track-by="id"
                            :limit="3" 
                            :options="selectedUsersRemove" 
                            :multiple="true" 
                            :taggable="true" 
                        />
                    </div>                    
                                         
                    <div class="row group-button no-gutters m-b-20">
                        <div 
                            class="col-lg-5 col-md-6 col-sm-12 pr-md-2 offset-lg-1"
                        >
                            <button
                                class="btn-screen"
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
import FilterSelect from '~/components/FilterSelect';
import Multiselect from 'vue-multiselect';
import moment from 'moment';
export default {
    components: {
        Multiselect,
        FilterSelect
    },
    data() {
        return {
            users: [],
            flag: false,
            optionUsers: [
                {name: 'Add user', value: 1}, 
                {name: 'Delete user', value: 2},
            ],
            arrBefore: [],
            selectedUsers: [],
            selectedUsersRemove: [],
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
        ...mapActions('screen', ['findScreenWithUser', 'getScreenBySlug', 'addScreenForUser', 'deleteScreen']),

        limitText(count) {
            return `and ${count} other users`;
        },
        handlerUsers(item){
            this.selectedUsersRemove = [];
            this.selectedUsers = [];
            if (item.value === 2){
                this.flag = true;
                this.selectedUsersRemove = this.arrBefore;
            }
            else {
                this.flag = false;
            }
        },
        async asyncFind(query) {
            this.users = [];
            this.isLoading = true;
            if (!this.flag){
                var data = await this.findUsers({keyword: query, limit: this.limit, skip: this.skip}).catch(err => {
                    if (err)
                        console.log(err.message);
                });
            }
            this.findSelectUser(data.results);
            this.isLoading = false;                    
        },
        findSelectUser(data){
            var arr = [];
            data.forEach(x => this.arrBefore.forEach(y => {
                if (x.id === y.id) arr.push(x);
            }));
            this.users = data.filter((obj) => arr.indexOf(obj) === -1);
        },
        async handelSubmit() {
            if (!this.data.slug)
                return;
            var data = await this.getScreenBySlug(this.data.slug).catch(err => {
                if (err)
                    console.log(err.message);
            });
            let clone_data = Object.assign({}, data);                    

            if (this.selectedUsers.length !== 0){
                this.selectedUsers.forEach(item => {
                    data.userId = item.id;
                    data.name = 'Screen-' + moment(new Date()).format("MM/DD/YYYY hh:mm:ss") + ` ${item.id}`;
                    let clone_obj = Object.assign({}, data);
                    this.addScreen(clone_obj);
                });
                this.$notify({
                    group: 'success',
                    title: 'Success',
                    text: 'Successfully updated!',
                });                 
                $('#' + this.id).modal('hide');
                return;               
            }

            if (this.selectedUsersRemove.length >= 0) {
                var data = [];
                var result = this.arrBefore.filter((obj) => this.selectedUsersRemove.indexOf(obj) === -1);
                this.screenUser.forEach(x => result.forEach(y => {
                    if (x.user.id === y.id) data.push(x.id);
                })); 
                if (data.length > 0) this.deleteScreenByUser(data);     
            }
        },  
        async addScreen(obj) {
            let data = await this.addScreenForUser(obj).catch(err => {
                if (err)
                    console.log(err.message);
            });
        },
        async deleteScreenByUser(data) {
            this.$emit('deleteScreen', data);
        },

        async open(data) {
            this.selectedUsers = [];
            this.arrBefore = [];
            this.data = data;
            this.screenUser = await this.findScreenWithUser(this.data.slug).catch(err => {
                if (err)
                    console.log(err.message);
            });
            const results = this.screenUser;
            if (results.length > 0)
                results.forEach(item => this.arrBefore.push(item.user));
            this.selectedUsersRemove = this.arrBefore;

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

