<template>
    <div 
        class="modal fade box-popup show"
        :id="id"
        tabindex="-1" 
        role="dialog" 
        :aria-labelledby="id" 
        aria-hidden="true"
        @click="close()"        
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
                            :is-preview="true"
                            v-if="data"
                            :source="data"
                            :size-scale="sizeScale"
                            :ratio-size="ratioSize"
                        />
                    </div>
                </div>
                <div    
                    class="progress" 
                    style="height:2px"
                >
                    <div 
                        class="progress-bar bg-danger" 
                        id="dynamic" 
                        role="progressbar" 
                        aria-valuenow="0" 
                        aria-valuemin="0" 
                        aria-valuemax="100" 
                    />
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import ElementContainer from '~/components/elements/ElementContainer';
import {mapActions, mapGetters} from 'vuex';
import {getRatioSize} from '~/helpers/dataHelper';

export default {
    data() {
        return {
            data: null,
            music: '',
            sizeScale: null,
            unitScale: 13 / 928, // fontSize/containerWidth,
            interval: null,
            time: 0,
            counter: 0,
            ratioSize: null,
        };
    },
    props: {
        id: {
            type: String,
            default: ''
        },
        // ratioSize: {
        //     type: Object,
        //     default: () => {}
    },
    components: {
        ElementContainer
    },
    methods: {
        ...mapActions('screen', [
            'getNameScreen'
        ]),
        open(data, ratioValue) {
            if (data.style){
                this.music = new Audio();
                this.music.setAttribute('src',`${data.style.music}`);   
                this.music.load();
                this.music.play();  
            }   
            this.ratioSize = getRatioSize(ratioValue);

            if (!data.screens)
                this.data = data;
            else {
                let i = 0;

                this.getScreen(data.screens[i]);
                this.getNameScreen(data.screens[i].data.name);
                this.runProgressBar(data.screens[i].time );

                this.interval = setInterval(() => {
                    this.counter = this.counter + 1;
                    if (this.counter > this.time) {
                        i = i + 1;
                        if (i >= data.screens.length) {
                            clearInterval(this.interval);
                            return;
                        }
                        this.getScreen(data.screens[i]);
                        this.getNameScreen(data.screens[i].data.name);                        
                        this.runProgressBar(data.screens[i].time);
                    }
                }, 1000);
            }
            $('#' + this.id).modal('show');

            setTimeout(() => {
                let containerWidth = $('.container-preview').width();
                this.sizeScale = containerWidth * this.unitScale;
            }, 300);
        },
        runProgressBar(time){ 
            $("#dynamic")
                .css("width", "0%")
                .css("opacity", "0");
            var current_progress = 0;
            const taget = 100;
            var interval = setInterval(function() {
                current_progress += taget / time;
                $("#dynamic")
                    .css("width", current_progress + "%")
                    .attr("aria-valuenow", current_progress);
                if (current_progress >= 100)
                    clearInterval(interval);
                $("#dynamic").css("opacity", "1");                   
            }, 1000);
        },
        getScreen(data) {
            this.counter = 0;
            this.time = data.time;
            this.data = null;
            this.$nextTick(() => {
                this.data = data.data.template.template;
            });
        },
        close(){
            if (this.music)
                this.music.pause();         
        },  
        cancel() {
            if (this.music)
                this.music.pause();
            $('#' + this.id).modal('hide');
            setTimeout(() => {
                this.data = null;
            }, 200);
        },
    }
};
</script>

