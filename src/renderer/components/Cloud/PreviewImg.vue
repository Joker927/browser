<template>
    <div class="mask">
        <div class="box">
            <span class="exit" @click='__out'></span>
            <div class="img">
                <img :src="previewImgInfo.src" />
            </div>
        </div>
    </div>
</template>

<script>
import { mapState, mapMutations } from "vuex";
export default {
    data() {
        return {
            status: ""
        };
    },
    computed: {
        ...mapState({
            previewImgInfo: state => state.Feed.previewImgInfo
        })
    },
    mounted() {},
    methods: {
        ...mapMutations(["SET_PREVIEWIMG_STATE"]),
        __out() {
            this.SET_PREVIEWIMG_STATE();
        }
    }
};
</script>

<style lang="scss" scoped>
.mask {
    position: fixed;
    top: 0;
    left: 0;
    z-index: 3;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.4);
    cursor: pointer;
}

.box {
    width: 600px;
    height: 541px;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -45%);
    overflow: hidden;
}

.exit {
    width: 21px;
    height: 21px;
    display: block;
    background: #fff url("./img/popup_cancel@3x.png");
    background-size: 100% 100%;
    float: right;
    margin: 15px 20px;
}

.img {
    img {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -45%);
        max-width: 400px;
    }
}
</style>