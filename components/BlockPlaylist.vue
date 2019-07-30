<template>
    <div
        class="col-md-6"
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
</template>
