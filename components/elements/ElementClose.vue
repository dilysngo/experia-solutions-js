<template>
    <a
        class="close-icon" 
        @click="removeElement" 
    ><img
        class="close-img"
        src="/images/icon-close-white.svg"
    ></a>
</template>

<script>
export default {
    props: {
        root: {
            type: Object,
            default: () => {}
        },
        path: {
            type: String,
            default: ''
        }
    },
    methods: {
        removeElement() {
            let arr = this.path.split('/');
            let key = arr.pop();
            this.root.removeElement(arr.join('/'), key);
        }
    }
};
</script>
