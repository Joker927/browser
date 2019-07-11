<template>
    <transition-group name="move">

        <div class="toast"
             key="show"
             v-if="show">
            {{$t('main.loadMore[0]')}} {{count}} {{$t('main.loadMore[1]')}}
        </div>
        <div class="toast"
             key="show1"
             v-if="show1">
            {{$t('main.loadMore[2]')}} {{count}} {{$t('main.loadMore[1]')+$t('main.loadMore[3]')}}
        </div>

    </transition-group>

</template>

<script>
import { mapState, mapMutations } from 'vuex'

export default {
    props: {},
    data() {
        return {}
    },
    components: {},
    computed: {
        ...mapState({
            count: state => state.Feed.count,
            show: state => state.Feed.toastVisible,
            show1: state => state.Feed.toastVisible1
        })
    },
    methods: { ...mapMutations(['SET_FEED_COUNT', 'SET_FEED_NEW_COUNT']) },
    watch: {
        show() {
            if (this.show) {
                setTimeout(() => {
                    this.SET_FEED_COUNT(0)
                }, 2000)
            }
        },
        show1() {
            if (this.show1) {
                setTimeout(() => {
                    this.SET_FEED_NEW_COUNT(0)
                }, 2000)
            }
        }
    },
    created() {}
}
</script>

<style lang='scss' scoped>
.move-enter-active,
.move-leave-active {
    // transform: translateY();
    transition: 0.8s;
}
.move-enter,
.move-leave-to {
    transform: translateY(-100%);
}
.toast {
    position: fixed;
    top: 80px;
    width: 860px;
    z-index: 10;
    display: flex;
    font-size: 16px;
    justify-content: center;
    height: 40px;
    align-items: center;
    background: #3f61a6;
    color: #ffffff;
}
</style>
