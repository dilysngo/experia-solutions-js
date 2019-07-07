<template>
    <div
        class="element-icon" 
        draggable="true"
    > 
        <div class="image-out">
            <img
                v-if="!iconClass"
                :src="image"
                class="element-image"
            >
            <i
                class="icon-site"
                :class="iconClass"
                v-else 
            />
        </div>
        <label
            v-if="title"
            class="element-title"
        >{{ title }}</label>
    </div>
</template>

<script>
export default {
    props: {
        image: {
            type: String,
            default: ''
        },
        iconClass: {
            type: String,
            default: ''
        },
        title: {
            type: String,
            default: ''
        }
    },
};
</script>

