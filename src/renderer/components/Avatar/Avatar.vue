<template>
    <img :src="url" />
</template>

<script>
export default {
    props: {
        src: {}
    },
    data() {
        return {}
    },
    components: {},
    computed: {
        url() {
            let src = this.src
                ? this.src
                : require('./../../assets/img/avatar.png')
            return src
        }
    },
    methods: {},
    watch: {},
    created() {}
}
</script>

<style scoped>
img {
    width: 100%;
    height: 100%;
    object-fit: cover;
}
</style>

