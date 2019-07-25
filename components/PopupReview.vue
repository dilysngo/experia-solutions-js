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
                    <div class="container-preview">
                        <element-container
                            :ref="'elementContainer'"
                            :root="this"
                            :design-mode="false"
                            v-if="data"
                            :source="data"
                        />
                    </div>
                </div>
            </div>
        </div>
    </div>  
</template>

<script>
import ElementContainer from '~/components/elements/ElementContainer';

export default {
    data() {
        return {
            data: null
        };
    },
    props: {
        id: {
            type: String,
            default: ''
        },
    },
    components: {
        ElementContainer
    },
    methods: {
        open(data) {
            this.data = data;
            setTimeout(() => {
                console.log('this.data', this.data);
                $('#' + this.id).modal('show');
            }, 10000);
        },
        cancel() {
            $('#' + this.id).modal('hide');
            // this.$emit('cancel');
        }
    }
};
</script>

