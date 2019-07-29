<template>
    <div
        :id="id"
        class="modal fade modal-gallery"
    >
        <div class="modal-dialog modal-lg">
            <div class="modal-content">
                <button
                    @click="close()"
                    class="btn-close border-black"
                >
                    <img src="~/assets/images/close.svg">
                </button>
                <div class="pd-20">
                    <h1 class="title-component">
                        {{ mediaType !== 1 ? 'Image' : 'Video' }} Gallery
                    </h1>
                    <input
                        class="form-input"
                        placeholder="Search..."
                        v-model="condition.keyword"
                    >
                </div>
                <div class="frame-gallery">
                    <ul class="list-gallery">
                        <li
                            v-for="(item, index) in mediaList"
                            :key="index"
                            class="gallery-item"
                        >
                            <input
                                type="radio"
                                :id="'gallery'+ index"
                                name="gallery"
                                class="ip-gallery"
                            >
                            <label
                                class="label-gallery"
                                :for="'gallery'+ index"
                            >
                                <img
                                    v-if="item.imageInfo"
                                    class="gallery-img"
                                    :src="convertToUrl(item.imageInfo.url)"
                                    @click="selectMedia(item)"
                                >
                                <video
                                    v-if="item.videoInfo"
                                    loop
                                    ref="videoReview"
                                    class="gallery-img"
                                    preload="auto"
                                    crossOrigin="anonymous"
                                    @click="selectMedia(item)"
                                >
                                    <source :src="convertToUrl(item.videoInfo.url)">
                                </video>
                                <h3 class="name-item">{{ item.name }}</h3>
                            </label>
                        </li>
                    </ul>
                </div>
                <div class="pd-20">
                    <button
                        @click="getMediaClicked()"
                        class="form-btn"
                    >
                        Choose {{ mediaType !== 1 ? 'Image' : 'Video' }}
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import {MediaType} from '~/common/commonType'; // eslint-disable-line
import {mapActions, mapGetters} from 'vuex';
import {convertToUrl} from '~/helpers/dataHelper';

export default {
    data() {
        return {
            condition: {
                type: null,
                keyword: null,
            },
            timeOut: null,
            skip: 0,
            limit: 11,
            total: 0,
            Medias: [],
            urlImage: '',
            mediaId: '',
            mediaType: MediaType.Image,
            poster: '',
            convertToUrl: convertToUrl,
            mediaSelected: null
        };
    },
    props: {
        id: {
            type: String,
            default: ''
        },
    },
    watch: {
        'condition.keyword'(value) {
            clearTimeout(this.timeOut);
            this.timeOut = setTimeout(() => this.search(), 500);
        },
    },
    computed: {
        ...mapGetters('media', [
            'mediaList'
        ])
    },
    // created() {
    //     this.search();
    // },
    methods: {
        ...mapActions('media', [
            'findMedias'
        ]),
        open(mediaType) {
            if (mediaType)
                this.mediaType = mediaType;
            this.search();
            // $('#' + this.id).modal('show');
            $('#' + this.id).modal({
                backdrop: 'static',
                keyboard: true,
                show: true
            });
        },
        close() {
            $('#' + this.id).modal('hide');
        },
        search() {
            this.getMedias();
        },
        async getMedias() {
            let data = await this.findMedias({keyword: this.condition.keyword, type: this.condition.type || this.mediaType, limit: this.limit, skip: this.skip}).catch(err => {
                if (err)
                    console.log(err.message);
            });
            this.total = data && data.pagination && data.pagination.total;
        },
        selectMedia(item) {
            this.mediaSelected = item;
        },
        async getMediaClicked() {
            this.$emit('galleryImage', this.mediaSelected);
            this.close();
        },
    }
};
</script>
