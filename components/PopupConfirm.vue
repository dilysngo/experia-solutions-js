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
                <div class="modal-body">
                    <h3 class="box-title modal-title m-b-30">
                        {{ title }}
                    </h3>
                    <p
                        v-if="description"
                        class="popup-description text-center"
                    >
                        {{ description }}
                    </p>
                    <div class="row group-button no-gutters m-b-20">
                        <div class="col-lg-5 col-md-6 col-sm-12 pr-md-2 offset-lg-1">
                            <button
                                @click="cancel"
                                class="btn-normal"
                            >
                                {{ buttonName2 }}
                            </button>
                        </div>
                        <div class="col-lg-5 col-md-6 col-sm-12 pl-md-2">
                            <button
                                @click="success"
                                class="btn-normal"
                                :class="{'btn-red':btnRed}"
                            >
                                {{ buttonName1 }}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>  
</template>

<script>
export default {
    data() {
        return {

        };
    },
    props: {
        id: {
            type: String,
            default: ''
        },
        title: {
            type: String,
            default: 'Are you sure?'
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
    methods: {
        open(data) {
            this.data = data;
            $('#' + this.id).modal('show');
        },
        success() {
            $('#' + this.id).modal('hide');
            this.$emit('success', this.data);
        },
        cancel() {
            $('#' + this.id).modal('hide');
            this.$emit('cancel');
        }
    }
};
</script>

