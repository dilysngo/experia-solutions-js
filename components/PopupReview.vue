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
                <div
                    class="modal-body"
                >
                    <div
                        class="container-preview"  
                        :style="{fontSize: sizeScale + 'px'}"
                    >
                        <element-container
                            :ref="'elementContainer'"
                            :root="this"
                            :design-mode="false"
                            v-if="data"
                            :source="data"
                            :size-scale="sizeScale"
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
            data: null,
            sizeScale: null,
            unitScale: 13 / 928 // fontSize/containerWidth
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
            $('#' + this.id).modal('show');

            setTimeout(() => {
                let containerWidth = $('.container-preview').width();
                this.sizeScale = containerWidth * this.unitScale;
            }, 300);
        },
        cancel() {
            $('#' + this.id).modal('hide');
            setTimeout(() => {
                this.data = null;
            }, 200);
            // this.$emit('cancel');
        },
    }
};
</script>

