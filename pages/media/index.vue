<template>
    <section class="page-container page-media">
        <div class="page-header d-flex">
            <h4>Gallery ({{ total ? total : 0 }})</h4>
            <div class="header-right d-flex">
                <filter-select
                    @input="handlerType" 
                    placeholder="All file"
                    :data="dataTypeFile"
                />
                <div class="form-search">
                    <input
                        type="text"
                        placeholder="Search for..."
                        class="search-input"
                        name="search"
                        v-model="keyword"
                    >
                    <i class="icon-search icon-site" />
                </div>
            </div>
        </div>
        <div class="page-body">
            <div class="container-media">
                <div class="row">
                    <div class="col-md-3">
                        <div class="item-g add-media">
                            <input
                                type="file"
                                id="fileGallery"
                                ref="files"
                                hidden
                                @change="changeMedia($event)"
                            >
                            <button
                                class="btn-add-media"
                                id="addMedia"
                                @click="addMedia"
                            >
                                <i class="icon-plus icon-site" />
                            </button>
                            <p>Upload new file</p>
                        </div>
                    </div>
                    <div
                        class="col-md-3"
                        v-for="gItem in mediaList"
                        :key="gItem.id"
                    >
                        <div 
                            class="item-g"
                            :id="'g' + gItem.id"
                        >
                            <div
                                class="g-thumbnail"
                                :style="{ 
                                    'background-image': gItem.type !== mediaType.Video && gItem.type !== mediaType.Music ? 'url(' + convertToUrl(gItem.imageInfo.url) + ')' : '',
                                    'background-size': 'cover',
                                    'background-repeat': 'no-repeat'
                                }"
                            >
                                <div
                                    class="g-view"
                                >
                                    <!-- <img 
                                        v-if="gItem.type == mediaType.Video"
                                        :id="'video-' + gItem.id"
                                        src="images/image-video.png" 
                                        class="img-fluid"
                                        alt=""
                                    > -->
                                    <video
                                        v-if="gItem.type == mediaType.Video"
                                        loop
                                        ref="videoReview"
                                        preload="auto"
                                        crossOrigin="anonymous"
                                    >
                                        <source :src="convertToUrl(gItem.videoInfo.url)">
                                    </video>
                                    <video
                                        v-if="gItem.type == mediaType.Music"
                                        loop
                                        ref="videoReview"
                                        preload="auto"
                                        crossOrigin="anonymous"
                                    >
                                        <source :src="convertToUrl(gItem.musicInfo.url)">
                                    </video>                                    
                                    <!-- <img 
                                        v-else
                                        :src="urlFake + gItem.imageInfo.url" 
                                        class="img-fluid"
                                        alt=""
                                    > -->
                                </div>
                                <div 
                                    class="g-action d-flex"
                                    v-if="isAdmin"
                                >
                                    <a
                                        @click="showMedia(gItem)"
                                        class="btn-link"
                                    >
                                        <i class="icon-play icon-site" />
                                    </a>
                                    <a
                                        @click="deleteItem(gItem)"
                                        class="btn-link"
                                    >
                                        <i class="icon-trash icon-site" />
                                    </a>
                                </div>
                                <div 
                                    class="g-action d-flex"
                                    v-else
                                >
                                    <a
                                        @click="showMedia(gItem)"
                                        class="btn-link"
                                    >
                                        <i class="icon-play icon-site" />
                                    </a>
                                    <a
                                        v-if="gItem.user.role.code!==1"
                                        @click="deleteItem(gItem)"
                                        class="btn-link"
                                    >
                                        <i class="icon-trash icon-site" />
                                    </a>
                                </div>                                
                            </div>
                            <div 
                                class="g-info"
                                @click="showMedia(gItem)"
                            >
                                <h3 
                                    class="g-name"
                                    :title="gItem.name"
                                >
                                    {{ gItem.name }}
                                </h3>
                                <div class="g-detail d-flex">
                                    <div
                                        v-if="gItem.lenght"
                                        class="g-lenght"
                                    >
                                        <i class="icon-play icon-site" />
                                        <span>{{ gItem.lenght }}</span>
                                    </div>
                                    <div
                                        v-else
                                        class="g-size"
                                    >
                                        <i
                                            class="icon-site"
                                            :class="gItem.imageInfo ? 'icon-picture' : 'icon-play'" 
                                        />
                                        <span v-if="gItem.musicInfo">{{ gItem.musicInfo.size | convertToSize }}</span>
                                        <span v-else>{{ (gItem.imageInfo ? gItem.imageInfo.size : gItem.videoInfo.size) | convertToSize }}</span>
                                    </div>
                                    <div
                                        class="g-created"
                                    >
                                        <i class="icon-celandar icon-site" />
                                        <span>{{ gItem.createdAt | convertToDateString }}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="paginate">
                    <client-only>
                        <pagination
                            id="pagination"
                            :skip="skip"
                            :limit="limit"
                            :total="total" 
                            @change="changePage"
                        />
                    </client-only>
                </div>
            </div>
        </div>
        <div 
            id="modalVideo"   
            class="modal fade modal-media frame-image"
            tabindex="-1"
            role="dialog"
            aria-labelledby="myLargeModalLabel" 
            aria-hidden="true"
            @click.self="closeMedia"
        >
            <div class="modal-dialog modal-lg">
                <div class="modal-content">
                    <button
                        @click="closeMedia"
                        class="btn-close"
                        data-dismiss="modal"
                        data-backdrop="static"
                        data-keyboard="false"
                    >
                        <img src="~/assets/images/close.svg">
                    </button>
                    <video
                        v-show="mediaShow && mediaShow.type === mediaType.Video || mediaShow && mediaShow.type === mediaType.Music"
                        id="videoDisplay"
                        controls
                        poster="data:image/gif,AAAA"
                        class="item-video"
                    >
                        <source type="video/mp4">
                    </video>
                    <img
                        v-show="mediaShow && mediaShow.type === mediaType.Image"
                        :src="(mediaShow && mediaShow.imageInfo && convertToUrl(mediaShow.imageInfo.url))"
                        class="img-preview"
                    >
                </div>
            </div>
        </div>
        <popup-confirm
            ref="popupConfirm"
            id="deleteMedia"
            @success="handleDeleteMedia"
        />
        <loading
            ref="loading"
            id="loading"
            :is-show-loading="loading"
        />
    </section>
</template>
<script>
import FilterSelect from '~/components/FilterSelect';
import {mapGetters, mapActions} from 'vuex';
import {MediaType} from '~/common/commonType';
import {convertToDateString} from '~/helpers/dateHelper';
import {convertToSize, convertToUrl, pagination} from '~/helpers/dataHelper';
import Pagination from '~/components/Pagination';
import PopupConfirm from '~/components/PopupConfirm';
import Loading from '~/components/Loading';
import {Roles} from '~/common/commonType';

export default {
    middleware: ['authentication'],
    components: {
        FilterSelect,
        Pagination,
        PopupConfirm,
        Loading
    },
    data() {
        return {
            totalPlaylists: 5,
            dataTypeFile: [
                {name: 'All', value: ''}, 
                {name: 'Image', value: MediaType.Image}, 
                {name: 'Video', value: MediaType.Video},
                {name: 'Music', value: MediaType.Music},
            ],
            gallery: [
                {id: 1, name: 'What Is Botox', size: '236kb', dateCreated: '5/3', type: '.jpg', url: 'images/gallery-1.png'},
                {id: 2, name: 'The Right Choice', size: '1829kb', dateCreated: '24/2', type: '.mp4', url: 'videos/SampleVideo.mp4', lenght: '4:35'},
                {id: 3, name: 'Hair Removal', size: '754kb', dateCreated: '17/2', type: '.png', url: 'images/gallery-2.png'},
                {id: 4, name: 'Fashion Designer', size: '36kb', dateCreated: '1/2', type: '.svg', url: 'images/gallery-3.png'}
            ],
            mediaType: MediaType,
            keyword: '',
            type: '',
            skip: 0,
            limit: 11,
            total: 0,
            isAdmin: false,
            timeOut: null,
            mediaShow: null,
            convertToUrl: convertToUrl,
            loading: false
        };
    },
    watch: {
        keyword: function(newData) {
            clearTimeout(this.timeOut);
            this.timeOut = setTimeout(() => {
                this.getAllMedia();
            }, 500);
        }
    },
    async created() {
        await this.getAllMedia();
        this.isAdmin = this.userAuth.role.code === Roles.Admin;
    },
    computed: {
        ...mapGetters('user', ['userAuth']),
        ...mapGetters('media', ['mediaList', 'mediaPagination'])
    },   
    methods: {
        ...mapActions('media', 
            ['findMedias', 'createMedia', 'uploadMedia', 'updateThumbnail', 'deleteMedia']),
        addMedia() {
            this.$refs.files.click();
        },
        async changePage(page){
            let data = pagination(page, this.limit);
            this.skip = data;
            await this.getAllMedia();
        },
        async getAllMedia() {
            let data = await this.findMedias({keyword: this.keyword, type: this.type, limit: this.limit, skip: this.skip, code: this.userAuth.role.code}).catch(err => {
                if (err)
                    console.log(err.message);
            });

            // this.userAuth.role.code === 1 ? this.total = data.pagination.total : this.total = data.pagination.total + this.mediaPagination.total;
        },
        async changeMedia(event) {
            this.loading = true;
            let formData = new FormData();
            let file = event.target ? event.target.files[0] : event[0];

            formData.append('media', file);
            let uploadMedia = await this.uploadMedia(formData).catch(err => {
                this.loading = false;
                this.$notify({
                    group: 'error',
                    title: 'Upload failed',
                    text: err.message
                });
                document.getElementById('fileGallery').value = '';
                return false;
            });
            if (uploadMedia) {
                this.loading = false;
                this.$notify({
                    group: 'success',
                    title: 'Success',
                    text: 'Upload success!',
                });
                await this.getAllMedia();   
                document.getElementById('fileGallery').value = '';
            } 
        },
        async handlerType(item) {
            this.type = item.value;
            await this.getAllMedia();
        },
        showMedia(item) {   
            this.mediaShow = item;
            if (item.type === this.mediaType.Video) {
                let frameVideo = document.getElementById('videoDisplay');
                console.log('asdsadsasad', $('#modalVideo'));
                frameVideo.src = convertToUrl(item.videoInfo.url);
                frameVideo.load();
                frameVideo.play();
            }
            else if (item.type === this.mediaType.Music) {
                let frameVideo = document.getElementById('videoDisplay');
                frameVideo.src = convertToUrl(item.musicInfo.url);
                frameVideo.load();
                frameVideo.play();
            }
            $('#modalVideo').modal('show');
        },
        closeMedia() {
            if (this.mediaShow.type === this.mediaType.Video) {
                let frameVideo = document.getElementById('videoDisplay');
                frameVideo.pause();
            }
            else if (this.mediaShow.type === this.mediaType.Music){
                let frameVideo = document.getElementById('videoDisplay');
                frameVideo.pause();
            }
        },
        deleteItem(item) {
            this.$refs.popupConfirm.open(item);
        },
        async handleDeleteMedia(item) {
            await this.deleteMedia(item.id);
            await this.getAllMedia();
        }
    },
    filters: {
        convertToDateString(date) {
            return convertToDateString(date);
        },
        convertToSize(size) {
            return convertToSize(size);
        }
    }
};
</script>