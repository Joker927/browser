<template>
    <div>
        <div class="title"
             v-if="type=='0'">
            <span class="icon"></span>
            <p>{{$t('cloud.title1')}}</p>
        </div>
        <div class="title"
             v-else>
            <span class="icon"></span>
            <p>{{$t('cloud.title2')}}</p>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        type: {
            type: String | Number
        }
    },
    data() {
        return {}
    },
    components: {},
    computed: {},
    methods: {},
    watch: {},
    created() {}
}
</script>

<style lang='scss'  scoped>
.title {
    font-size: 18px;
    display: flex;
    height: 68px;
    .icon {
        width: 40px;
        height: 40px;
        background-size: 100% 100%;
        background-image: url('./img/head_mai@3x.png');
        margin-top: 24px;
    }
    > p {
        padding-left: 14px;
        line-height: 88px;
    }
}
</style>
