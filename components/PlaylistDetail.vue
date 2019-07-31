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
                    <div class="container">
                        <div class="row">
                            <div class="col-md-6 p-l-0">
                                <h5 class="m-b-10">
                                    My Screens
                                </h5>
                                <div class="screen-list">
                                    <div
                                        class="screen-item"
                                        @click="addItemPlaylist(item)" 
                                        :style="{fontSize: sizeScale + 'px'}"
                                        v-for="(item, index) in screenList"
                                        :key="index"
                                    >
                                        <block-template
                                            v-if="item"
                                            :template="item"
                                        />
                                    </div>
                                </div>
                            </div>
                            <div class="col-md-6 p-r-0">
                                <h5 class="m-b-10">
                                    Playlist's Screens
                                </h5>
                                <div class="screen-list">
                                    <div
                                        class="screen-item"
                                        :style="{fontSize: sizeScale + 'px'}"
                                        v-for="(item, index) in playlistScreen"
                                        :key="index"
                                    >
                                        <div @click="removeItemPlaylist(index)">
                                            <block-template
                                                :template="item.data"
                                            />
                                        </div>
                                        <input
                                            type="number" 
                                            class="input-time"
                                            v-model="item.time"
                                        >
                                    </div>
                                </div>
                            </div>

                            <input
                                class="form-input m-b-15 m-t-30" 
                                placeholder="Name"
                                v-model="name"
                            >
                            <textarea
                                class="form-input"
                                placeholder="Description"
                                v-model="description"
                            />
                        </div>
                        <a
                            class="btn-normal btn-red m-t-20"
                            @click="save"
                        >Save</a>
                    </div>
                </div>
            </div>
        </div>
    </div>  
</template>

<script>
import {mapGetters, mapActions} from 'vuex';
import BlockTemplate from '~/components/BlockTemplate';
import {convertToString} from '~/helpers/dateHelper';

export default {
    data() {
        return {
            playlist: null,
            sizeScale: null,
            playlistScreen: [],
            name: 'Playlist-' + convertToString(new Date()),
            description: '',
            unitScale: 13 / 928 // fontSize/containerWidth
        };
    },
    props: {
        id: {
            type: String,
            default: ''
        },
    },
    computed: {
        ...mapGetters('screen', [
            'screenList',
            'screenPagination'
        ]),
        ...mapGetters('playlist', [
            'playlistList',
            'playlistPagination'
        ]),
        ...mapGetters('user', [
            'userAuth'
        ])
    },
    components: {
        BlockTemplate
    },
    methods: {
        ...mapActions('screen', [
            'findScreens',
        ]),
        ...mapActions('playlist', [
            'findPlaylists',
            'createPlaylist',
            'updatePlaylist',
        ]),
        async open(playlist) {
            this.playlist = playlist;
            this.playlistScreen = playlist ? playlist.screens : [];
            if (playlist) {
                this.name = playlist.name;
                this.description = playlist.description;
            }
            console.log('this.playlistScreen', playlist);
            // this.screenList = [];
            await this.findScreens();
            $('#' + this.id).modal('show');

            setTimeout(() => {
                let containerWidth = $('.screen-item').width();
                this.sizeScale = containerWidth * this.unitScale;
            }, 500);
        },
        cancel(id) {
            $('#' + this.id).modal('hide');
            setTimeout(() => {
                this.playlistScreen = [];
            }, 200);
            this.$emit('cancel', id);
        },
        save() {
            let screens = [];
            this.playlistScreen.forEach(item => {
                screens.push({id: item.data.id, time: +item.time});
            });
            console.log('this.playlist', this.playlist);

            if (this.playlist) {
                let data = {
                    name: this.name,
                    slug: '',
                    userId: this.userAuth.id,
                    description: this.description,
                    screens: screens,
                };
                this.updatePlaylist({
                    id: this.playlist.id,
                    data: data
                });
            }
            else {
                // if (!this.playlistScreen.length)
                //     return;
                this.createPlaylist({
                    name: this.name,
                    slug: '',
                    userId: this.userAuth.id,
                    description: this.description,
                    screens: screens,
                });
            }
            this.cancel(this.playlist ? this.playlist.id : '');
            this.playlist = null;
        },
        addItemPlaylist(item) {
            let itemPush = {
                time: 0,
                data: item
            };
            if (!this.playlistScreen.find(item => item.data.id === itemPush.data.id))
                this.playlistScreen.push(itemPush);
        },
        removeItemPlaylist(index) {
            this.playlistScreen.splice(index,1);
            let temp = this.playlistScreen;
            this.playlistScreen = [];
            this.$nextTick(() => {
                this.playlistScreen = temp;
            });
        }
    }
};
</script>

