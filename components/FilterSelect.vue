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
                >{{ selected ? selected.name : placeholder }} {{ selected.description ? selected.value : '' }}</span>
                <input
                    v-else
                    type="text"
                    class="ip-search filter-value form-control"
                    :placeholder="placeholder" 
                    v-model="keyword"
                >
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
                        v-if="!item.value"
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
                        v-else-if="item.value"
                        @click="changeItem(item)"
                    >
                        <span class="dropdown-link-title d-flex justify-content-between">
                            <span>{{ item.name }}</span>
                            <span v-if="item.description">{{ item.value }}</span>
                        </span>
                        <span class="sup-title">
                            {{ item.description }}
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
            list: null,
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
            type: String,
            default: ''
        },
    },
    async created() {
        // await this.getlookup();
        this.reset();
    },
    mounted() {
        setTimeout(() => {
            this.list = this.data;

            if (this.select)
                this.selected = this.list.find(item => item.value === this.select);
            else this.selected = this.list && this.list[0];

            if (this.selected)
                this.changeItem(this.selected);
        }, 300);
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

