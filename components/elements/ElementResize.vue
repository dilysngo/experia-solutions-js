<template>
    <div class="resizers">
        <div
            class="resizer top"
            draggable="true"
            @dragstart="dragStartHandler($event)"
            @dragend="dragEndHandler($event)"
            @drag="resize('top', $event)"
        />
        <div
            class="resizer left"
            draggable="true"
            @dragstart="dragStartHandler($event)"
            @dragend="dragEndHandler($event)"
            @drag="resize('left', $event)"
        />
        <div
            class="resizer bottom"
            draggable="true"
            @dragstart="dragStartHandler($event)"
            @dragend="dragEndHandler($event)"
            @drag="resize('bottom', $event)"
        />
        <div
            class="resizer right"
            draggable="true"
            @dragstart="dragStartHandler($event)"
            @dragend="dragEndHandler($event)"
            @drag="resize('right', $event)"
        />
        <div
            class="resizer top-left"
            draggable="true"
            @dragstart="dragStartHandler($event)"
            @dragend="dragEndHandler($event)"
            @drag="resize('top-left', $event)"
        />
        <div
            class="resizer top-right"
            draggable="true"
            @dragstart="dragStartHandler($event)"
            @dragend="dragEndHandler($event)"
            @drag="resize('top-right', $event)"
        />
        <div
            class="resizer bottom-left"
            draggable="true"
            @dragstart="dragStartHandler($event)"
            @dragend="dragEndHandler($event)"
            @drag="resize('bottom-left', $event)"
        />
        <div
            class="resizer bottom-right"
            draggable="true"
            @dragstart="dragStartHandler($event)"
            @dragend="dragEndHandler($event)"
            @drag="resize('bottom-right', $event)"
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
        sizeScale: {
            type: Number,
            default: null
        },
        source: {
            type: Object,
            default: () => {}
        },
        path: {
            type: String,
            default: null
        }
    },
    data: () => ({
        setting: {},
        style: {},
        x: 0,
        y: 0,
        // list: ['top', 'left', 'bottom', 'right', 'top-left', 'top-right', 'bottom-left', 'bottom-right']
    }),
    mounted() {
        this.setting = this.source.setting;
        this.style = this.source.style;
    },
    methods: {
        reset() {
            console.log('Reset resize', this.source);
            this.setting = this.source.setting;
            this.style = this.source.style;
        },
        resize(position, e) {
            console.log('resize');
            let valueX = this.x - e.x;
            let valueY = this.y - e.y;
            let direction;
            let directionTwo;
            switch (position) {
            case 'top':
                console.log('top');
                direction = valueY < 0 ? 'bottom' : 'top'; 
                if (direction === 'top') {
                    this.setting.stylesBox.height += 1;
                    this.setting.stylesBox.top += -1;
                    this.setting.stylesBox.y += -1;
                }
                else { 
                    this.setting.stylesBox.height += -1;
                    this.setting.stylesBox.top += 1;
                    this.setting.stylesBox.y += 1;
                }
                break;
            case 'top-right':
                console.log('top-right');
                direction = valueY < 0 ? 'bottom' : 'top'; 
                if (direction === 'top') {
                    this.setting.stylesBox.height += 1;
                    this.setting.stylesBox.top += -1;
                    this.setting.stylesBox.y += -1;
                }
                else { 
                    this.setting.stylesBox.height += -1;
                    this.setting.stylesBox.top += 1;
                    this.setting.stylesBox.y += 1;
                }

                directionTwo = valueX < 0 ? 'right' : 'left'; 
                this.setting.stylesBox.width += directionTwo === 'left' ? -1 : 1;
                break;
            case 'top-left':
                console.log('top-left');
                direction = valueY < 0 ? 'bottom' : 'top'; 
                if (direction === 'top') {
                    this.setting.stylesBox.height += 1;
                    this.setting.stylesBox.top += -1;
                    this.setting.stylesBox.y += -1;
                }
                else { 
                    this.setting.stylesBox.height += -1;
                    this.setting.stylesBox.top += 1;
                    this.setting.stylesBox.y += 1;
                }

                directionTwo = valueX < 0 ? 'right' : 'left'; 
                if (directionTwo === 'left') {
                    this.setting.stylesBox.width += 1;
                    this.setting.stylesBox.left += -1;
                    this.setting.stylesBox.x += -1;
                }
                else { 
                    this.setting.stylesBox.width += -1;
                    this.setting.stylesBox.left += 1;
                    this.setting.stylesBox.x += 1;
                }
                break;
            case 'bottom':
                console.log('bottom');
                direction = valueY < 0 ? 'bottom' : 'top'; 
                this.setting.stylesBox.height += direction === 'top' ? -1 : 1;
                break;
            case 'bottom-right':
                console.log('bottom-right');
                direction = valueY < 0 ? 'bottom' : 'top'; 
                this.setting.stylesBox.height += direction === 'top' ? -1 : 1;
                directionTwo = valueX < 0 ? 'right' : 'left'; 
                this.setting.stylesBox.width += directionTwo === 'left' ? -1 : 1;
                break;
            case 'bottom-left':
                console.log('bottom-left');
                direction = valueY < 0 ? 'bottom' : 'top'; 
                this.setting.stylesBox.height += direction === 'top' ? -1 : 1;
                directionTwo = valueX < 0 ? 'right' : 'left'; 
                if (directionTwo === 'left') {
                    this.setting.stylesBox.width += 1;
                    this.setting.stylesBox.left += -1;
                    this.setting.stylesBox.x += -1;
                }
                else { 
                    this.setting.stylesBox.width += -1;
                    this.setting.stylesBox.left += 1;
                    this.setting.stylesBox.x += 1;
                }
                break;
            case 'left':
                console.log('left');
                direction = valueX < 0 ? 'right' : 'left'; 
                if (direction === 'left') {
                    this.setting.stylesBox.width += 1;
                    this.setting.stylesBox.left += -1;
                    this.setting.stylesBox.x += -1;
                }
                else { 
                    this.setting.stylesBox.width += -1;
                    this.setting.stylesBox.left += 1;
                    this.setting.stylesBox.x += 1;
                }
                break;
            case 'right':
                console.log('right');
                direction = valueX < 0 ? 'right' : 'left'; 
                this.setting.stylesBox.width += direction === 'left' ? -1 : 1;
                break;
            }
        },
        dragStartHandler(e) {
            console.log('dragStartHandler');

            this.x = e.x;
            this.y = e.y;
            e.dataTransfer.setData('application/json', '');
        },
        dragEndHandler(e) {
            console.log('dragEndHandler', this.setting);

            this.root.updateElement({instance: this.$parent, path: this.path, style: this.style, setting: this.setting});
        }
    }
};
</script>