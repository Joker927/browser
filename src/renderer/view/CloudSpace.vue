<template>
    <div class="cloudWrapper">
        <router-view></router-view>
    </div>
</template>

<script>
// import AllFile from "@/components/Cloud/AllFile";
export default {
    data() {
        return {};
    },
    components: {
        // AllFile
    },
    computed: {},
    methods: {},
    created() {}
};
</script>

<style  lang='scss' scoped>
.cloudWrapper {
    background: #fff;
    width: 75%;
    cursor: pointer;
}
</style>
