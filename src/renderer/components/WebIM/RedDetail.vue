<template>
    <div class="shade">
        <div class="contain">
            <div class="head">
                <img :src="userInfo.avatar" v-if="userInfo.avatar" />
                <img src="./img/icon.png" v-else />
            </div>
            <div>
                <div class="info">
                    {{userName}}
                </div>
                <div class="info" style="margin-top:10px;">
                    {{redInfo.amount}}{{redInfo.currency}}
                </div>
            </div>
        </div>
        <div>
            <div class="exit" @click="__exit"></div>
        </div>
    </div>
</template>
<script>
import { mapState, mapMutations } from "vuex";
export default {
    props: ["userName", "redInfo"],
    data() {
        return {};
    },
    mounted() {
        console.log(this.redInfo);
    },
    computed: {
        ...mapState({
            userInfo: state => state.UserInfo.userInfo
        })
    },
    methods: {
        __exit() {
            this.$emit("changeStatus", false);
        }
    }
};
</script>
<style lang="scss" scoped>
.shade {
    position: absolute;
    top: 20px;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 1;
    background: rgba(0, 0, 0, 0.4);
}
.exit {
    width: 26px;
    height: 26px;
    background: url(./img/redPocket_cancel@3x.png);
    background-size: 100%;
    margin: 6px auto 0;
}
.contain {
    width: 90%;
    height: 74%;
    background: #cd3333;
    margin: 0 auto;
    padding-top: 1px;
    margin-top: 6px;
    position: relative;
    border-radius: 10px;
}
.contain2 {
    width: 90%;
    height: 74%;
    background: #fff;
    margin: 0 auto;
    padding-top: 1px;
    margin-top: 6px;
    position: relative;
    border-radius: 10px;
    .info {
        color: #333;
    }
}
.head {
    img {
        width: 40px;
        height: 40px;
        border-radius: 50% 50%;
        display: block;
        margin: 6px auto;
    }
}
.info {
    color: #eca14f;
    text-align: center;
    font-weight: 600;
}
.open {
    width: 60px;
    height: 60px;
    background: #eca14f;
    color: #fff;
    line-height: 60px;
    border-radius: 50%;
    text-align: center;
    font-weight: 600;
    font-size: 16px;
    margin: 6px auto;
}
</style>


