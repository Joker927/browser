<template>
    <div class="mask"
         v-if="state"
         @click.self="__out">
        <div class="details">

            <div class="main">
                <div v-if="item.type===0">
                    <img v-if="item.collectionVOList[0].imgUrl"
                         :src="item.collectionVOList[0].imgUrl"
                         alt="">
                    <video v-if="item.collectionVOList[0].videoUrl"
                           :src="item.collectionVOList[0].videoUrl"
                           :poster="item.collectionVOList[0].videoImg"
                           controls></video>
                </div>
                <FeedNews v-if="item.type===7"
                          :item='item.dynamicVO'></FeedNews>
            </div>

        </div>
        <div class="out cp"
             @click="__out">
            {{$t('close')}}
        </div>
    </div>
</template>

<script>
import FeedNews from '@/components/Main/FeedNews'
export default {
    props: {
        item: Object,
        state: { type: Boolean, default: false }
    },
    data() {
        return {}
    },
    components: { FeedNews },
    computed: {},
    methods: {
        __out() {
            this.$emit('out')
        }
    },
    watch: {},
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
    z-index: 1000;
    background: rgba(0, 0, 0, 0.8);
    overflow: auto;
}
.details {
    position: absolute;
    left: 50%;
    top: 55%;
    width: 600px;
    transform: translate(-50%, -50%);
    display: flex;
    align-items: center;
    .main {
        flex-grow: 1;
        // display: flex;
        padding: 20px;
        width: 100%;

        img {
            display: block;
            margin: 0 auto;
            width: 60%;
            // max-width: 100%;
            // max-height: 60%;
        }
        video {
            display: block;
            margin: 0 auto;
            max-width: 100%;
            max-height: 80%;
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

 

