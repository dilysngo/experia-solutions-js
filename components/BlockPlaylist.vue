<template>
    <div
        class="col-md-6"
    >
        <div
            :id="'playlist' + data.id"
            class="block-playlist"
        >
            <div class="playlist-thumbnail">
                <div class="playlist-img d-flex">
                    <div
                        class="box-img"
                        :style="{fontSize: sizeScale + 'px'}"
                        v-for="(imgItem, index) in data.screens.slice(0,4)"
                        :key="index"
                    >
                        <!-- <img
                            class="img-fluid"
                            :src="imgItem"
                            alt=""
                        > -->
                        <element-container
                            :ref="'elementContainer'"
                            :root="this"
                            :design-mode="false"
                            v-if="imgItem.data"
                            :source="imgItem.data.template.template"
                            :size-scale="sizeScale"
                        />
                    </div>
                </div>
                <div
                    class="thumbnail-more d-flex"
                    v-if="data.screens.length > 3"
                >
                    <span>+{{ data.screens.length - 3 }}</span>
                </div>
                <div class="playlist-action d-flex">
                    <a 
                        @click="editItem"
                        class="btn-link"
                    >
                        <i class="icon-creative icon-site" />
                    </a>
                    <a
                        @click="deleteItem"
                        class="btn-link"
                    >
                        <i class="icon-trash icon-site" />
                    </a>
                </div>
            </div>
            <div class="playlist-info">
                <h3 class="playlist-name">
                    {{ data.name }}
                </h3>
                <div class="playlist-infor-more d-flex">
                    <div class="pcol-left d-flex">
                        <div class="play-time">
                            <i class="icon-play icon-site" />
                            <span>{{ time }}</span>
                        </div>
                        <div class="total">
                            <span>{{ data.screens.length }}</span> Creavites
                        </div>
                    </div>
                    <div class="pcol-right">
                        <div class="date-create">
                            <i class="icon-clock icon-site" />
                            <span>{{ data.createdAt | convertToDateString }}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import {convertToDateString} from '~/helpers/dateHelper';
import {convertToTime} from '~/helpers/dataHelper';
import ElementContainer from '~/components/elements/ElementContainer';

export default {
    data: () => ({
        time: 0,
        sizeScale: null,
        unitScale: 13 / 928, // fontSize/containerWidth
    }),
    props: {
        data: {
            type: Object,
            default: () => {}
        }
    },
    components: {
        ElementContainer
    },
    created() {
        this.calculator();
    },
    mounted() {
        setTimeout(() => {
            let containerWidth = $('.box-img').width();
            this.sizeScale = containerWidth * this.unitScale;
        }, 200);
    },
    methods: {
        calculator() {
            let time = 0;

            this.data.screens.forEach(screen => {
                time += screen.time;
            });
            this.time = convertToTime(time);
        },
        deleteItem() {
            this.$emit('delete', this.data.id);
        },
        editItem() {
            this.$emit('edit', this.data);
        },
        reset() {
            this.$forceUpdate();
        },
    },
    filters: {
        convertToDateString(value) {
            return convertToDateString(value);
        },
        convertToTime(time) {
            return convertToTime(time);
        }
    }
};
</script>

