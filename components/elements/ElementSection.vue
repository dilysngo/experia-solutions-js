<template>
    <div
        class="element-section"
        :style="style"
    >
        <div
            class="control-box"
            v-if="designMode"
        >
            <element-close
                :root="root"
                :path="source.path"
            />
        </div>
        <component
            v-for="component in components"
            :is="component.name"
            :key="component.key"
            :id="component.key"
            :root="root"
            :design-mode="designMode"
            :template-id="templateId"
            :source="component"
            :is-setting="isSetting"
        />
    </div>
</template>

<script>
export default {
    props: {
        root: {
            type: Object,
            default: () => {}
        },
        designMode: {
            type: Boolean,
            default: false
        },
        devicePreview: {
            type: String,
            default: ''
        },
        templateId: {
            type: String,
            default: ''
        },
        source: {
            type: Object,
            default: () => {}            
        },
        isSetting: {
            type: Boolean,
            default: false
        }
    },
    data: () => ({
        key: '',
        path: '',
        style: {},
        setting: {},
        components: [],
    }),
    created() {
        this.reset();
    },
    mounted() {

    },
    watch: {
    
    },
    methods: {
        reset() {
            // console.log('Reset section');
            this.style = {};
            this.setting = {};
            this.components = [];

            if (this.source) {
                this.key = this.source.key;
                this.path = this.source.path;

                if (!this.source.style)
                    this.source.style = {};
                else
                    this.style = {...this.style, ...this.source.style};

                if (!this.source.setting)
                    this.source.setting = {};
                else
                    this.setting = {...this.setting, ...this.source.setting};
            }
            this.components = this.source && this.source.components ? this.source.components : [];
        },
        initResizeRow(e) {
            window.addEventListener('mousemove', this.resize, false);
            window.addEventListener('mouseup', this.stopResize, false);
        },
        resize(e) {
            let element = document.getElementById(this.key);
            let height = e.clientY - element.offsetTop + $('.col-right').scrollTop();
            let elements = $('#' + this.key).find('.auto-height');
            let label = $('#' + this.key).find('.label-dropdown');

            if (height < 20)
                return;

            for (let i = 0; i < elements.length; i++) {
                let element = elements[i];

                if (height <= element.offsetHeight + 45 + ((label && label[0]) ? (label[0].offsetHeight + 5) : 0))
                    return;
            }

            this.style.height = height / 13 + 'em';
            this.source.style.height = this.style.height;
            this.style = null;

            this.$nextTick(() => {
                this.style = this.source.style;
            });
        },
        stopResize(e) {
            window.removeEventListener('mousemove', this.resize, false);
            window.removeEventListener('mouseup', this.stopResize, false);

            this.root.pushToTemporaryQueue();
        },
    }
};
</script>