<template>
    <section class="page-container page-playlists">
        <div class="page-header d-flex">
            <h4>Playlists ({{ totalPlaylists }})</h4>
            <div class="header-right d-flex">
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
                <nuxt-link 
                    class="btn-new-plist"
                    to="/"
                >
                    <i class="icon-play-lists icon-site" />
                    <span>New Playlist</span>
                </nuxt-link>
            </div>
        </div>
        <div class="page-body">
            <div class="container-playlists">
                <div class="row">
                    <div
                        class="col-md-6"
                        v-for="playItem in listPlays"
                        :key="playItem.id"
                    >
                        <div
                            :id="'playlist' + playItem.id"
                            class="block-playlist"
                        >
                            <div class="playlist-thumbnail">
                                <div class="playlist-img d-flex">
                                    <div
                                        class="box-img"
                                        v-for="imgItem in playItem.listThumb"
                                        :key="imgItem"
                                    >
                                        <img
                                            class="img-fluid"
                                            :src="imgItem"
                                            alt=""
                                        >
                                    </div>
                                </div>
                                <div
                                    class="thumbnail-more d-flex"
                                    v-if="playItem.totalThumb > 3"
                                >
                                    <span>+{{ playItem.totalThumb - 3 }}</span>
                                </div>
                                <div class="playlist-action d-flex">
                                    <nuxt-link 
                                        to="/"
                                        class="btn-link"
                                    >
                                        <i class="icon-creative icon-site" />
                                    </nuxt-link>
                                    <nuxt-link 
                                        to="/"
                                        class="btn-link"
                                    >
                                        <i class="icon-trash icon-site" />
                                    </nuxt-link>
                                </div>
                            </div>
                            <div class="playlist-info">
                                <h3 class="playlist-name">
                                    {{ playItem.playName }}
                                </h3>
                                <div class="playlist-infor-more d-flex">
                                    <div class="pcol-left d-flex">
                                        <div class="play-time">
                                            <i class="icon-play icon-site" />
                                            <span>{{ playItem.playTime }}</span>
                                        </div>
                                        <div class="total">
                                            <span>{{ playItem.totalThumb }}</span> Creavites
                                        </div>
                                    </div>
                                    <div class="pcol-right">
                                        <div class="date-create">
                                            <i class="icon-clock icon-site" />
                                            <span>{{ playItem.dateCreate }}</span>
                                        </div>
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

export default {
    data() {
        return {
            totalPlaylists: 5,
            listPlays: [
                {
                    id: 1,
                    playName: 'Lotteria Promotions',
                    listThumb: ['/images/img-thumbnail-4.png','/images/img-thumbnail-2.png','/images/img-thumbnail-1.png'], 
                    totalThumb: 3,
                    playTime: '5:23',
                    dateCreate: '25/02'
                },
                {
                    id: 1,
                    playName: 'Lotteria Promotions',
                    listThumb: ['/images/img-thumbnail-1.png','/images/img-thumbnail-3.png','/images/img-thumbnail-2.png'], 
                    totalThumb: 7,
                    playTime: '5:23',
                    dateCreate: '25/02'
                },
                {
                    id: 1,
                    playName: 'Lotteria Promotions',
                    listThumb: ['/images/img-thumbnail-2.png','/images/img-thumbnail-2.png','/images/img-thumbnail-1.png'], 
                    totalThumb: 3,
                    playTime: '5:23',
                    dateCreate: '25/02'
                },
            ]
        };
    }
};
</script>