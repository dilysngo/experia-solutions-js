<template>
    <div class="control-box">
        <span
            class="icon-move"
            @mousedown="enableDragElement"
        ><i
            class="fa fa-arrows"
            aria-hidden="true"
        /></span>
        <label class="label-setting"><span class="name-setting">{{ title }}</span></label>
        <element-close
            :root="root"
            :path="source.path"
        />
    </div>
</template>

<script>
export default {
    props: {
        title: {
            type: String,
            default: ''
        },
        root: {
            type: Object,
            default: () => {}

        },
        designMode: {
            type: Boolean,
            default: false
        },
        source: {
            type: Object,
            default: () => {}
        },
        controls: {
            type: Object,
            default: () => {}            
        }
    },
    data: () => ({
        setting: {},
        style: {}
    }),
    mounted() {
        $('body').bind('dragover', function(e) {
            let dragY = e.pageY;
            let positionBody = $('.box-landing-head').offset().top + $('.box-landing-head').height();
            let elScroll = $('#col-right').scrollTop();

            // console.log('window height', dragY, $(window).height());

            // console.log('dragY, positionBody, elScroll', dragY, positionBody, elScroll);

            if (dragY < positionBody && elScroll && elScroll > 3) {
                $('#col-right').scrollTop(+elScroll - 1);
                // console.log('true');
            }

            if (dragY > $(window).height() - 100) {
                $('#col-right').scrollTop(+elScroll + 1);
                // console.log('bottom');
            }
        });
    },
    methods: {
        openSetting() {
            if (this.title === 'Image')
                this.source.setting.typeMedia = 1;
            if (this.title === 'Video')
                this.source.setting.typeMedia = 2;
            this.root.$refs.elementSetting.open({instance: this.$parent, key: this.source.key, path: this.source.path, style: this.source.style, setting: this.source.setting, controls: this.controls});
            this.root.isSetting = true;
        },
        enableDragElement(e) {
            $('#' + this.source.key).attr('draggable', true);
            $('#' + this.source.key).on('dragstart', this.drag);
        },
        drag(e) {
            e.originalEvent.dataTransfer.setData('text', this.source.path);

            $('#' + this.source.key).attr('draggable', false);
            $('#' + this.source.key).off('dragstart', this.drag);
        }
    }
};
</script>

