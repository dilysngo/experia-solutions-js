<template>
    <section class="page-container page-playlists">
        <div class="page-header d-flex">
            <h4>Playlists ({{ playlistPagination && playlistPagination.total ? playlistPagination.total : 0 }})</h4>
            <div class="header-right d-flex">
                <div class="form-search">
                    <input
                        type="text"
                        placeholder="Search for..."
                        class="search-input"
                        name="search"
                        maxlength="50"
                        v-model="keyword"
                    >
                    <i class="icon-search icon-site" />
                </div>
                <a
                    class="btn-new-plist"
                    @click="handleEdit()"
                >
                    <i class="icon-play-lists icon-site" />
                    <span>New Playlist</span>
                </a>
            </div>
        </div>
        <div class="page-body">
            <div class="container-playlists">
                <div
                    class="row"
                    v-if="renderComponent"
                >
                    <block-playlist
                        v-for="(item, index) in list"  
                        :key="index"
                        :data="item"
                        :ref="'playlist-'+item.id"
                        @delete="handleDeletePlaylist"
                        @edit="handleEdit"
                        @reset="getPlaylists"
                        @preview="handlePreview"
                    />
                </div>
                <div class="paginate">
                    <no-ssr>
                        <pagination
                            id="pagination"
                            :skip="skip"
                            :limit="limit"
                            :total="total" 
                            @change="changePage"
                        />
                    </no-ssr>
                </div>
            </div>
        </div>
        <popup-confirm
            ref="popupConfirm"
            id="deletePlaylist"
            @success="handleDelete"
        />
        <popup-review
            ref="popupReview"
            id="popupReview"
        />
        <playlist-detail
            id="playlistDetail"
            ref="playlistDetail"
            @save="updateListPlaylist"
            @cancel="handleCancel"
        />
    </section>
</template>
<script>
import {mapGetters, mapActions} from 'vuex';
import {pagination} from '~/helpers/dataHelper';
import PlaylistDetail from '~/components/PlaylistDetail';
import BlockPlaylist from '~/components/BlockPlaylist';
import Pagination from '~/components/Pagination';
import PopupConfirm from '~/components/PopupConfirm';
import PopupReview from '~/components/PopupReview';

export default {
    middleware: ['authentication'],
    data() {
        return {
            skip: 0,
            limit: 12,
            total: 0,
            keyword: '',
            list: [],
            renderComponent: true
        };
    },
    components: {
        PlaylistDetail,
        BlockPlaylist,
        Pagination,
        PopupConfirm,
        PopupReview
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
        async updateListPlaylist() {
            await this.getPlaylists();
        },        
        async getPlaylists() {
            this.list = [];
            let options = {
                keyword: this.keyword, 
                limit: this.limit, 
                skip: this.skip
            };
            let data = await this.findPlaylists(options).catch(err => {
                if (err)
                    console.log(err.message);
            });
            this.list = data.results;
            this.total = data && data.pagination && data.pagination.total;
        },
        handleDeletePlaylist(id) {
            this.$refs.popupConfirm.open(id);
        },
        async handleDelete(id) {
            await this.deletePlaylist(id);
            await this.getPlaylists();
        },
        handleEdit(item) {
            if (item)
                this.$refs.playlistDetail.open(item);
            else 
                this.$refs.playlistDetail.open();
        },
        handlePreview(item) {
            if (item)
                this.$refs.popupReview.open(item);
        },
        async handleCancel(id) {
            await this.getPlaylists();
            if (id)
                this.$refs['playlist-' + id][0].reset();
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