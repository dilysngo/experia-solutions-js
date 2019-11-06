<template>
    <div 
        class="modal fade box-popup show"
        :id="id"
        tabindex="-1" 
        role="dialog" 
        :aria-labelledby="id" 
        aria-hidden="true"
        @click.self="close()"        
    >
        <div 
            class="modal-dialog modal-dialog-centered text-center"
        >
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
                        @click="handlerPauseMusic()"
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
                    v-if="renderComponent"
                    id="myProgress"
                >
                    <div
                        v-if="flag" 
                        id="myBar" 
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
            flagMusic: 0,
            musicPlay: '',
            flag: false,
            sizeScale: null,
            unitScale: 13 / 928, // fontSize/containerWidth,
            interval: null,
            time: 0,
            counter: 0,
            ratioSize: null,
            renderComponent: true,
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
            this.music = '';
            if (data.style && data.style.music) {
                this.music = new Audio();
                this.music.setAttribute('src',`${data.style.music}`);   
                this.music.load();
                this.music.play();  
            }   
            this.ratioSize = getRatioSize(ratioValue);
            if (!data.screens){
                this.data = data;
            }
            else {
                let i = 0;
                this.flag = true;
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
        runProgressBar(time) { 
            $(function() {
                const index = time * 10;
                var element = document.getElementById('myBar');   
                var width = 0;
                var id = setInterval(frame, index);
                function frame() {
                    if (width >= 100)
                        clearInterval(id);
                    else {
                        width++; 
                        element.style.width = width + '%'; 
                    }
                }
            });  
        },
        getScreen(data) {
            this.musicPlay = '';
            if (data.data.template.template && data.data.template.template.style && data.data.template.template.style.music) {
                this.musicPlay = new Audio();
                this.musicPlay.setAttribute('src',`${data.data.template.template.style.music}`);   
                this.musicPlay.load();
                this.musicPlay.play();                      
            }
            else
                this.musicPlay ? this.musicPlay.pause() : this.musicPlay = '';
            this.counter = 0;
            this.time = data.time;
            this.data = null;
            this.$nextTick(() => {
                this.data = data.data.template.template;
            });
        },
        handlerPauseMusic() {
            if (this.music)
                console.log(this.music);
            // if (this.music) {
            //     this.flagMusic ++; 
            //     this.flagMusic % 2 !== 0 ? this.music.pause() : this.music.play();
            // }
            // if (this.musicPlay) {
            //     this.flagMusic ++; 
            //     this.flagMusic % 2 !== 0 ? this.musicPlay.pause() : this.musicPlay.play();
            // }            
        },
        close() {
            this.music ? this.music.pause() : '';                           // pause music in screen
            this.musicPlay ? this.musicPlay.pause() : '';                   // pause music in playlist
            clearInterval(this.interval);
            this.forceRerender();
        },  
        cancel() {
            this.music ? this.music.pause() : '';                           // pause music in screen
            this.musicPlay ? this.musicPlay.pause() : '';                   // pause music in playlist
            $('#' + this.id).modal('hide');
            clearInterval(this.interval);
            setTimeout(() => {
                this.data = null;
            }, 200);
            this.forceRerender();
        },
        forceRerender() {
            this.renderComponent = false;
            this.$nextTick(() => {
                this.renderComponent = true;
            });
        }
    }
};
</script>

