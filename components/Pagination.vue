<template>
    <ul v-if="totalPage > 1">
        <li :class="{disabled: page === 1}">
            <a @click="page !== 1 && changePage(1)">
                <i
                    class="fa fa-angle-double-left"
                    aria-hidden="true" 
                />
            </a>
        </li>
        <li :class="{disabled: page === 1}">
            <a @click="page !== 1 && changePage(page - 1)">
                <i
                    class="fa fa-angle-left"
                    aria-hidden="true" 
                />
            </a>
        </li>
        <li
            v-for="p in pages"
            :key="p"
            :class="{active: page === p}"
        >
            <a @click="page !== p && changePage(p)">
                {{ p }}
            </a>
        </li>
        <li :class="{disabled: totalPage === page}">
            <a @click="totalPage !== page && changePage(page + 1)">
                <i
                    class="fa fa-angle-right"
                    aria-hidden="true"
                />
            </a>
        </li>
        <li :class="{disabled: totalPage === page}">
            <a @click="totalPage !== page && changePage(totalPage)">
                <i
                    class="fa fa-angle-double-right"
                    aria-hidden="true" 
                />
            </a>
        </li>
    </ul>
</template>

<script>
export default {
    props: {
        id: {
            type: String,
            default: 'id-pagination'
        },
        skip: {
            type: Number,
            default: 0
        },
        limit: {
            type: Number,
            default: 10
        },
        total: {
            type: Number,
            default: 1
        },
    },
    data() {
        return {
            pages: [],
            totalPage: 0,
            page: 1
        };
    },
    watch: {
        skip(value) {
            this.page = value / this.limit + 1;
        },
        total(value) {
            this.calculate(this.page);
        }
    },
    created() {
        this.calculate(this.page);
    },
    methods: {
        changePage(value) {
            this.calculate(value);
            this.$emit('change', value);
        },
        calculate(page) {
            if (page && this.limit && this.total) {
                this.pages = [];
                this.totalPage = Math.ceil(this.total / this.limit);
                if (this.totalPage === 0)
                    this.totalPage = 1;
                let gap = 2;
                let start = page - gap;
                let end = page + gap;

                if (start < 1) {
                    end += (start - 1) * (-1);
                    start = 1;
                }
                if (end > this.totalPage) {
                    start -= end - this.totalPage;
                    end = this.totalPage;
                }
                if (start < 1)
                    start = 1;

                for (let i = start; i <= end; i++) {
                    this.pages.push(i);
                }
            }
            else
                this.totalPage = 0;
        }
    }
};
</script>
