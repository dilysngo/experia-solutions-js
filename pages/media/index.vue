<template>
    <section class="page-container page-media">
        <div class="page-header d-flex">
            <h4>Gallery ({{ totalPlaylists }})</h4>
            <div class="header-right d-flex">
                <filter-select
                    placeholder="All file"
                    :data="dataTypeFile"
                />
                <div class="form-search">
                    <input
                        type="text"
                        placeholder="Search for..."
                        class="search-input"
                        name="search"
                        maxlength="50"
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
                                multiple
                                hidden
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
                        v-for="gItem in gallery"
                        :key="gItem.id"
                    >
                        <div 
                            class="item-g"
                            :id="'g' + gItem.id"
                        >
                            <div class="g-thumbnail">
                                <div
                                    class="g-view"
                                >
                                    <img 
                                        v-if="gItem.type == '.mp3' || gItem.type == '.mp4'"
                                        :id="'video-' + gItem.id"
                                        src="images/image-video.png" 
                                        class="img-fluid"
                                        alt=""
                                    >
                                    <img 
                                        v-else
                                        :src="gItem.url" 
                                        class="img-fluid"
                                        alt=""
                                    >
                                </div>
                                <div class="g-action d-flex">
                                    <nuxt-link 
                                        to="/"
                                        class="btn-link"
                                    >
                                        <i class="icon-play icon-site" />
                                    </nuxt-link>
                                    <nuxt-link 
                                        to="/"
                                        class="btn-link"
                                    >
                                        <i class="icon-trash icon-site" />
                                    </nuxt-link>
                                </div>
                            </div>
                            <div class="g-info">
                                <h3 class="g-name">
                                    {{ gItem.name + gItem.type }}
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
                                        <i class="icon-picture icon-site" />
                                        <span>{{ gItem.size }}</span>
                                    </div>
                                    <div
                                        class="g-created"
                                    >
                                        <i class="icon-celandar icon-site" />
                                        <span>{{ gItem.dateCreated }}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>
<script>
import FilterSelect from '~/components/FilterSelect';

export default {
    components: {
        FilterSelect,
    },
    data() {
        return {
            totalPlaylists: 5,
            dataTypeFile: [
                {name: 'Image', value: 1}, 
                {name: 'Video', value: 2},
            ],
            gallery: [
                {id: 1, name: 'What Is Botox', size: '236kb', dateCreated: '5/3', type: '.jpg', url: 'images/gallery-1.png'},
                {id: 2, name: 'The Right Choice', size: '1829kb', dateCreated: '24/2', type: '.mp4', url: 'videos/SampleVideo.mp4', lenght: '4:35'},
                {id: 3, name: 'Hair Removal', size: '754kb', dateCreated: '17/2', type: '.png', url: 'images/gallery-2.png'},
                {id: 4, name: 'Fashion Designer', size: '36kb', dateCreated: '1/2', type: '.svg', url: 'images/gallery-3.png'}
            ]
        };
    },
    methods: {
        addMedia() {
            this.$refs.files.click();
        }
    }
};
</script>