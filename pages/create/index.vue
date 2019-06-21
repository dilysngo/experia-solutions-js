<template>
    <section class="page-container page-create">
        <div class="page-header d-flex">
            <h4>Design space</h4>
            <div class="d-flex">
                <filter-select
                    placeholder="Ratio 16:9"
                    :data="dataSize"
                />
                <filter-select
                    placeholder="Category"
                    :data="dataCategory"
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
            <div class="container-create d-flex">
                <div class="box-tool">
                    <button
                        class="btn-tool"
                        v-for="btn in boxtool"
                        :key="btn.id"
                    >
                        <i 
                            :class="btn.name"
                            class="icon-site"
                        />
                    </button>
                </div>
                <div class="box-widget">
                    <div class="toolbar d-flex justify-content-between align-items-center">
                        <div class="toolbar-left d-flex">
                            <p>
                                <i class="icon-loading icon-site" />
                                Saving
                            </p>
                            <button
                                class="btn-tool"
                            >
                                <i class="icon-trash-fill icon-site" />
                            </button>
                            <button
                                class="btn-tool"
                            >
                                <i class="icon-layout-up icon-site" />
                            </button>
                            <button
                                class="btn-tool"
                            >
                                <i class="icon-layout-down icon-site" />
                            </button>
                            <button
                                class="btn-tool"
                            >
                                <i class="icon-undo icon-site" />
                            </button>
                            <button
                                class="btn-tool"
                            >
                                <i class="icon-next icon-site" />
                            </button>
                        </div>
                        <div class="toolbar-right">
                            <button
                                class="btn-tool"
                            >
                                Back
                            </button>
                            <button
                                class="btn-tool"
                                disabled
                            >
                                Save
                            </button>
                            <button
                                class="btn-tool btn-preview"
                            >
                                <i class="icon-play icon-site" />
                                Preview
                            </button>
                        </div>
                    </div>
                    <div class="container-drag d-flex justify-content-center">
                        <h3>
                            Drag widgets here
                        </h3>
                    </div>
                </div>
                <div class="box-properties" />
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
            dataCategory: [
                {name: 'Category 1', value: 1}, 
                {name: 'Category 2', value: 2},
                {name: 'Category 3', value: 3},
            ],
            dataSize: [
                {name: 'All Sreens', value: '', isTitle: true},
                {name: 'Landscape', value: '', isTitle: true},
                {name: 'Wide screen', value: '16:9', supTitle: '1920 x 1080, 1280 x 720'},
                {name: 'Normal screen', value: '4:3', supTitle: '1024 x 768'},
                {name: 'Wide screen', value: '16:10', supTitle: '1920 x 1200, 1152 x 720'},
                {name: 'Portrait', value: '', isTitle: true},
                {name: 'Wide screen', value: '9:16', supTitle: '1080 x 1920, 720 x 1280'},
                {name: 'Normal screen', value: '3:4', supTitle: '768 x 1024'},
                {name: 'Wide screen', value: '10:16', supTitle: '1200 x 1920, 720 x 1152'},
            ],
            boxtool: [
                {id: 'btn1', name: 'icon-text'},
                {id: 'btn2', name: 'icon-internet'},
                {id: 'btn3', name: 'icon-text-block'},
                {id: 'btn4', name: 'icon-text-type'},
                {id: 'btn5', name: 'icon-picture'},
                {id: 'btn6', name: 'icon-play-button'},
                {id: 'btn7', name: 'icon-gallery'},
                {id: 'btn8', name: 'icon-shapes'},
                {id: 'btn9', name: 'icon-wall-clock'},
                {id: 'btn10', name: 'icon-sand-watch'},
                {id: 'btn11', name: 'icon-cloudy'},
                {id: 'btn12', name: 'icon-twitter'},
                {id: 'btn13', name: 'icon-rss'},
                {id: 'btn14', name: 'icon-youtube'},
                {id: 'btn15', name: 'icon-facebook'},
            ]
        };
    }
};
</script>