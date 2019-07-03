<template>
    <div
        class="filter-box"
        :class="transparent ? 'transparent' : ''"
    >
        <div class="dropdown normal">
            <div
                class="dropdown-toggle"
                data-toggle="dropdown"
            >
                <span
                    v-if="!isKeyword"
                    class="filter-value form-control"
                >{{ selected ? selected.name : placeholder }}</span>
                <input
                    v-else
                    type="text"
                    class="ip-search filter-value form-control"
                    :placeholder="placeholder" 
                    v-model="keyword"
                >
                <!-- <span class="icon-angle-down" /> -->
                <i class="fa fa-angle-down" />
                <i class="fa fa-angle-up" />
            </div>
            <i
                class="fa fa-times"
                aria-hidden="true"
                @click="clearKeyword()"
                v-if="isKeyword"
            />
            <ul class="dropdown-menu">
                <li
                    class="dropdown-menu-item"
                    v-for="(item, index) in list"
                    :key="index"
                >
                    <a
                        class="dropdown-link"
                        v-if="item.isTitle"
                    >
                        <span
                            class="dropdown-link-title"
                            style="font-weight:bold"
                        >
                            {{ item.name }}
                        </span>
                    </a>
                    <a
                        class="dropdown-link"
                        v-else-if="item.supTitle"
                    >
                        <span class="dropdown-link-title d-flex justify-content-between">
                            <span>{{ item.name }}</span>
                            <span>{{ item.value }}</span>
                        </span>
                        <span class="sup-title">
                            {{ item.supTitle }}
                        </span>
                    </a>
                    <a
                        class="dropdown-link"
                        @click="changeItem(item)"
                        v-else
                    >
                        <span class="dropdown-link-title">
                            {{ item.name }}
                        </span>
                    </a>
                </li>
            </ul>
        </div>
    </div>
</template>
<script>
import {mapActions} from 'vuex';

export default {
    data() {
        return {
            list: this.data,
            selected: null,
            keyword: '',
            isReset: false
        };
    },
    props: {
        label: {
            type: String,
            default: ''
        },
        transparent: {
            type: Boolean,
            default: false
        },
        isKeyword: {
            type: Boolean,
            default: false
        },
        placeholder: {
            type: String,
            default: ''
        },
        data: {
            type: Array,
            default: () => []
        },
        type: {
            type: String,
            default: ''
        },
        select: {
            type: Number,
            default: 0
        },
    },
    async created() {
        // await this.getlookup();
        this.reset();
        if (this.select > 0)
            this.selected = this.list.find(item => item.value === this.select);
        else this.selected = this.list[0];
    },
    mounted() {
    },
    methods: {
        reset() {
            this.isReset = true;
            this.selected = '';
            this.keyword = '';
        },
        changeItem(item) {
            this.$emit('input', item);
            this.selected = item;
            this.keyword = this.selected.name;
        },
    }
};
</script>

