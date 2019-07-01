<template>
    <section class="page-container dashboard" />
</template>
<script>
export default {
    mounted() {
        this.$router.push('/screens');
    },
    middleware: ['authentication'],
};
</script>