<template>
    <div class="badge"
         @click="__click">
        <div class="count cp NAV_MENU"
             v-show="value">{{count}}</div>
        <slot></slot>
    </div>
</template>

<script>
export default {
    props: {
        value: {
            type: Number,
            default: 0
        }
    },
    data() {
        return {}
    },
    components: {},
    computed: {
        count() {
            if (this.value > 99) return '99+'
            return this.value
        }
    },
    methods: {
        __click() {
            this.$emit('click')
        }
    },
    watch: {},
    created() {}
}
</script>

<style lang='scss'  scoped>
.badge {
    position: relative;
    .count {
        position: absolute;
        right: -8px;
        top: -6px;
        min-width: 18px;
        height: 18px;
        font-size: 10px;
        color: #ffffff;
        background: #f03c30;
        border-radius: 10px;
        border: 1px solid #ffffff;
        text-align: center;
        line-height: 16px;
        padding: 0 4px;
        z-index: 999;
        user-select: none;
    }
}
</style>
