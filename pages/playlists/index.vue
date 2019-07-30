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
                <a
                    class="btn-new-plist"
                    @click="handleEdit"
                >
                    <i class="icon-play-lists icon-site" />
                    <span>New Playlist</span>
                </a>
            </div>
        </div>
        <div class="page-body">
            <div class="container-playlists">
                <div class="row" />
            </div>
        </div>
        <playlist-detail
            id="playlistDetail"
            ref="playlistDetail"
        />
    </section>
</template>
<script>
import {mapGetters, mapActions} from 'vuex';
import {pagination} from '~/helpers/dataHelper';
import PlaylistDetail from '~/components/PlaylistDetail';
import Pagination from '~/components/Pagination';
import PopupConfirm from '~/components/PopupConfirm';

export default {
    data() {
        return {
            skip: 0,
            limit: 12,
            total: 0,
            keyword: '',
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
    },
    components: {
        PlaylistDetail,
        // Pagination,
        // PopupConfirm,
    },
    async created() {
        await this.getPlaylists();
    },
    computed: {
        ...mapGetters('playlist', [
            'playlistList',
            'playlistPagination'
        ])
    },
    watch: {
        keyword: function(newData) {
            clearTimeout(this.timeOut);
            this.timeOut = setTimeout(() => {
                this.getPlaylists();
            }, 500);
        }
    },
    methods: {
        ...mapActions('playlist', [
            'findPlaylists',
            'deletePlaylist'
        ]),
        async changePage(page){
            let data = pagination(page, this.limit);
            this.skip = data;
            await this.getPlaylists();
        },
        async getPlaylists() {
            let data = await this.findPlaylists({keyword: this.keyword, limit: this.limit, skip: this.skip}).catch(err => {
                if (err)
                    console.log(err.message);
            });
            this.total = data && data.pagination && data.pagination.total;
            this.$forceUpdate();
        },
        handleDeletePlaylist(item) {
            this.$refs.popupConfirm.open(item);
        },
        async handleDelete(item) {
            await this.deletePlaylist(item.id);
            await this.getPlaylists();
        },
        handleEdit(item) {
            this.$refs.playlistDetail.open(item.id || null);
        },
        handlePreview(item) {
            if (item)
                this.$refs.popupReview.open(item);
        }
    }
};
</script>