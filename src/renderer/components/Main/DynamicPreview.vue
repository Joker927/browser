<template>
    <div class="mask"
         v-if="state"
         :style="{zIndex:zIndex}"
         @click.self="__out">
        <div class="details">

            <div class="main">

                <FeedNews :item='item'></FeedNews>
            </div>

        </div>
        <div class="out cp"
             @click="__out">
            {{$t('close')}}
        </div>
    </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex'

import FeedNews from '@/components/Main/FeedNews'
export default {
    data() {
        return {
            state: false,
            item: {}
        }
    },
    components: { FeedNews },
    computed: {
        ...mapState({
            userInfo: state => state.UserInfo.userInfo,
            viewDynamicId: state => state.Feed.viewDynamicId,
            random: state => state.Feed.random,
            zIndex: state => state.Feed.zIndex
        })
    },
    methods: {
        ...mapMutations(['SET_FEED_VIEW_DYNAMIC_ID']),
        __out() {
            this.state = false
        },
        async __getDatas() {
            this.state = false

            let req = {
                id: this.viewDynamicId
            }
            const res = await this.api.snsDynamicDetail(req)
            this.item = res.data
            this.state = true
        }
    },
    watch: {
        random() {
            this.state = true
        },
        viewDynamicId() {
            if (this.viewDynamicId) this.__getDatas()
        }
    },
    created() {}
}
</script>

<style  scoped lang="scss">
.mask {
    position: fixed;
    top: 80px;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 10;
    background: rgba(0, 0, 0, 0.8);
    overflow: auto;
}
.details {
    position: absolute;
    left: 50%;
    top: 0%;
    width: 580px;
    transform: translateX(-50%);
    display: flex;
    align-items: center;

    .main {
        flex-grow: 1;
        padding: 20px;
        width: 100%;
        height: 100%;

        img {
            display: block;
            margin: 0 auto;
            max-width: 100%;
            max-height: 100%;
        }
        video {
            display: block;
            margin: 0 auto;
            max-width: 100%;
            max-height: 100%;
        }
    }
}
.out {
    position: absolute;
    top: 10px;
    right: 10px;
    width: 40px;
    height: 40px;
    // background: #000;
    border: 1px solid #ffffff;
    color: #ffffff;
    font-size: 14px;
    line-height: 40px;
    text-align: center;
    border-radius: 4px;
}
</style>

 

