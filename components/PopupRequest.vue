<template>
    <div
        class="modal fade box-popup"
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
                        Request to admin 
                    </h3>
                    <p
                        class="text-description text-center"
                    >
                        Choose number of screen you need upgrade    
                    </p>
                    <div class="row group-button no-gutters m-b-20">
                        <div 
                            class="col-lg-4 col-sm-12 pl-md-1"
                            v-for="(numberScreen, index) in dataScreen"
                            :key="index"
                        >
                            <button
                                class="btn-normal-request"
                                @click="selectNumberScreen(numberScreen.value)"
                            >
                                {{ numberScreen.name }}
                            </button>
                        </div>
                    </div>
                    <div class="line-gray" />
                    <div class="submit-request">
                        <button
                            class="btn-submit-request"
                            @click="handlerSubmit"
                        >
                            Submit  
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>  
</template>

<script>
import {mapGetters, mapActions} from 'vuex';
import * as Swal from 'sweetalert2';

export default {
    data() {
        return {
            dataSelect: '',
            dataScreen: [
                {name: '3 Screen', value: 3},
                {name: '5 Screen', value: 5},
                {name: '7 Screen', value: 7}
            ],
        };
    },
    props: {
        id: {
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
        ...mapGetters('user', ['userAuth'])
    },
    methods: {
        ...mapActions('requirement', [
            'createRequirement'
        ]),
        selectNumberScreen(data) {
            this.dataSelect = data;
        },
        open(data) {
            this.dataSelect = '';
            this.data = data;
            $('#' + this.id).modal('show');
        },
        async handlerSubmit() {
            if (!this.dataSelect) {
                this.$notify({
                    group: 'error',
                    title: 'Submit failed',
                    text: 'Please choose number of screen!'
                });                        
                return;
            }

            let dataRequest = {
                userId: this.userAuth.id,
                numberRequests: this.dataSelect,
                status: 'waiting'
            };
            let data = await this.createRequirement(dataRequest).catch(err => {
                this.$notify({
                    group: 'error',
                    title: 'Submit failed',
                    text: err.message
                }); 
                return false;
            });
            if (data) {
                Swal.fire('Successfully submitted!', 'Your request will be accepted as quickly as possible!', 'success');
                $('#' + this.id).modal('hide');
            }
        },
        cancel() {
            $('#' + this.id).modal('hide');
            this.$emit('cancel', this.data);
        }
    }
};
</script>

