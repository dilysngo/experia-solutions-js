<template>
    <!-- <a>//13px => setting.stylesBox.top , 1px => ?</a>  -->
    <div
        class="element-box" 
        :class="designMode ? 'boder-work' : ''"
        :style="{top: setting.stylesBox.top/13 + 'em', left: setting.stylesBox.left/13 + 'em', width: setting.stylesBox.width/13 + 'em', height: setting.stylesBox.height/13 + 'em', position: setting.stylesBox.position, zIndex:setting.stylesBox.zIndex}"
        @click="openSetting"
    >
        <element-resize
            :root="root" 
            v-if="designMode"
            :source="source"
            :path="path"
            :ref="'resize-'+key"
        />
        <div
            class="element-form-default" 
            draggable="true"
            @dragstart="dragstart_handler($event)"
            @mousedown="mouseDown($event)"
        >
            <div
                class="element-not-data"
                v-if="!setting.shape"
            >
                <element-icon
                    v-if="designMode"
                    icon-class="icon-shapes"
                    title="Shape"
                />
            </div>
            <div
                class="element-have-data" 
                :style="{margin: setting.marginTop + 'em ' + setting.marginRight + 'em ' + setting.marginBottom + 'em ' + setting.marginLeft + 'em', padding: setting.paddingTop + 'em ' + setting.paddingRight + 'em ' + setting.paddingBottom + 'em '+ setting.paddingLeft + 'em' }"
                :class="[setting.verticalAlign]"  
                v-else              
            >
                <canvas
                    :id="'myCanvas'+key"
                    :width="setting.stylesBox.width" 
                    :height="setting.stylesBox.height"
                    :style="'width:'+setting.stylesBox.width/13 + 'em; height:'+setting.stylesBox.height/13 + 'em'"
                />
            </div>           
        </div>
    </div>
</template>

<script>
var WebFont;
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
        }
    },
    data: () => ({
        title: 'Shape',
        key: '',
        path: '', 
        style: {},
        colorBill: '',
        setting: {},
        config: {},
        controls: {
            shape: {
                enable: true
            },
            colorBill: {
                enable: true
            },
        },
        mode: true
    }),
    created() {
        this.reset();
        this.mode = this.designMode;

    },
    mounted() {
        WebFont = require('webfontloader');    
    },
    watch: {
        mode: function(newVal) {
            // console.log('newVal', newVal);
        },
        style: {
            handler(value) {
                let font = [];
                if (value['font-family']) {
                    font.push(value['font-family']);
                    if (WebFont)
                        WebFont.load({
                            google: {
                                families: font
                            }
                        });
                }
            },
            deep: true
        }
    },
    methods: {
        reset() {
            this.style = {};
            this.setting = {};
            
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
                if (this.$refs['resize-' + this.key])
                    this.$refs['resize-' + this.key].reset();
            }
            if (this.setting.shape)
                this.loadCanvas(this.setting.stylesBox);
        },

        loadCanvas(stylesBox){
            var key = this.key;
            var colorFill = this.source.style.colorFill;
            var colorFrame = this.source.style.colorFrame;   
            $(function() {
                var ctx = document.getElementById(`myCanvas${key}`).getContext("2d");
                ctx.beginPath();
                ctx.clearRect(0, 0, stylesBox.width, stylesBox.height);
                ctx.stroke();
            });            
            if (this.setting.shape === 'circle'){
                $(function() {
                    var ctx = document.getElementById(`myCanvas${key}`).getContext("2d");
                    ctx.beginPath();
                    
                    if (stylesBox.width > stylesBox.height)
                        ctx.arc(stylesBox.width / 2, stylesBox.height / 2, stylesBox.height / 2, 0, 2 * Math.PI);
                    else
                        ctx.arc(stylesBox.width / 2, stylesBox.height / 2, stylesBox.width / 2, 0, 2 * Math.PI);

                    if  (colorFill){
                        ctx.fillStyle = colorFill;
                        ctx.fill();
                    }
                    ctx.lineWidth = 1;
                    ctx.strokeStyle = colorFrame;
                    ctx.stroke();

                });
            }
            else if (this.setting.shape === 'rect'){
                $(function() {
                    var ctx = document.getElementById(`myCanvas${key}`).getContext("2d");                    
                    ctx.beginPath();
                    ctx.rect(2.5 ,2.5 , stylesBox.width - 5, stylesBox.height - 5);
                    if  (colorFill){
                        ctx.fillStyle = colorFill;
                        ctx.fill();
                    }
                    ctx.lineWidth = 1;
                    ctx.strokeStyle = colorFrame;
                    ctx.stroke();
                });  
            }       
            else if (this.setting.shape === 'ellipse'){
                $(function() {
                    var ctx = document.getElementById(`myCanvas${key}`).getContext("2d");
                    ctx.beginPath();
                    ctx.ellipse(stylesBox.width / 2, stylesBox.height / 2 , stylesBox.height / 2, stylesBox.width / 2,  90 * Math.PI / 180, 0, 2 * Math.PI);
                    if  (colorFill){
                        ctx.fillStyle = colorFill;
                        ctx.fill();
                    }
                    ctx.lineWidth = 1;
                    ctx.strokeStyle = colorFrame;
                    ctx.stroke();
                });  
            }    
            else if (this.setting.shape === 'triangle'){
                $(function() {
                    var ctx = document.getElementById(`myCanvas${key}`).getContext("2d");
                    ctx.beginPath();
                    ctx.moveTo(stylesBox.width / 2, 1);
                    ctx.lineTo(stylesBox.width, stylesBox.height - 1);
                    ctx.lineTo(1, stylesBox.height - 1);
                    ctx.lineTo(stylesBox.width / 2, 1);
                    if  (colorFill){
                        ctx.fillStyle = colorFill;
                        ctx.fill();
                    }
                    ctx.lineWidth = 1;
                    ctx.strokeStyle = colorFrame;
                    ctx.stroke();
                });  
            }      
            else if (this.setting.shape === 'line'){
                $(function() {
                    var ctx = document.getElementById(`myCanvas${key}`).getContext("2d");
                    ctx.beginPath();
                    ctx.moveTo(0, 0);
                    ctx.lineTo(stylesBox.width, stylesBox.height);
                    ctx.lineWidth = 1;
                    ctx.strokeStyle = colorFrame;
                    ctx.stroke();
                });  
            }   
            else if (this.setting.shape === 'arrow'){             
                $(function() {
                    var ctx = document.getElementById(`myCanvas${key}`).getContext("2d");
                    ctx.beginPath();
                    ctx.moveTo((2 / 3) * stylesBox.width, 1);
                    ctx.lineTo((2 / 3) * stylesBox.width, (1 / 4) * stylesBox.height);
                    ctx.lineTo(1, (1 / 4) * stylesBox.height);
                    ctx.lineTo(1, (3 / 4) * stylesBox.height);
                    ctx.lineTo((2 / 3) * stylesBox.width, (3 / 4) * stylesBox.height);
                    ctx.lineTo((2 / 3) * stylesBox.width, stylesBox.height);
                    ctx.lineTo(stylesBox.width, (1 / 2) * stylesBox.height);
                    ctx.lineTo((2 / 3) * stylesBox.width, 1);
                    if  (colorFill){
                        ctx.fillStyle = colorFill;
                        ctx.fill();
                    }
                    ctx.lineWidth = 1;
                    ctx.strokeStyle = colorFrame;
                    ctx.stroke();
                });  
            }           
        },
        dragstart_handler(ev) {
            if (!this.designMode)
                return;
            // Add the target element's id to the data transfer object

            ev.dataTransfer.setData('application/json', JSON.stringify(this.source));
            ev.dataTransfer.dropEffect = "move";
            document.getElementById(this.key).classList.add('is-drag');
        },
        openSetting() {
            if (!this.designMode)
                return;

            this.root.$refs.elementSetting.open({instance: this, key: this.source.key, path: this.source.path, style: this.source.style, setting: this.source.setting, controls: this.controls});
            this.root.isSetting = true;
            this.root.elementSelected = this.source;
        },
        mouseDown(ev) {
            this.source.setting.stylesBox.x = ev.x * (13 / this.sizeScale);
            this.source.setting.stylesBox.y = ev.y * (13 / this.sizeScale);
        }
    }
};
</script>