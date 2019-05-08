<template>
    <div class="shade">
        <div class="contain">
            <div class="exit" @click="__exit"></div>
            <div @click="__delete">删除</div>
            <div @click="__forward">转发</div>
            <div @click="__copy()">复制</div>
            <div @click="__collect()">收藏</div>
            <div @click="__clear()">清空</div>
        </div>
    </div>
</template>
<script>
import { mapState, mapMutations } from "vuex";
export default {
    props: ["opeIdx", "msgIdx", "msgItem", "head", "userName", "userId", "userType"],
    data() {
        return {};
    },
    mounted() {
    },
    computed: {
        ...mapState({
            userInfo: state => state.UserInfo.userInfo,
            webIMList: state => state.WebImQueue.webIMList,
            chatRecords: state => state.WebImQueue.chatRecords

        })
    },
    methods: {
        ...mapMutations(["DELETE_MSG", "SET_IMFORWARD_STATE", "CLEAR_MSG_LIST"]),
        __exit() {
            this.$emit("changeStatus", false);
        },
        __delete() {
            this.DELETE_MSG({ opeIdx: this.opeIdx, msgIdx: this.msgIdx });
            this.__exit();
        },
        __forward() {
            this.SET_IMFORWARD_STATE(this.msgItem);
        },
        __copy() {
            var Url2 = document.querySelector(".msg");
            Url2.select(); // 选择对象
            document.execCommand("Copy"); // 执行浏览器复制命令
        },
        __collect() {
            let type = 0;
            let obj = {
                avatar: this.head,
                message: this.msgItem.msg,
                type: this.msgItem.messageType,
                userName: this.userName,
                time: new Date().getTime
            };
            let req = {
                userId: this.userInfo.userId,
                type: 4,
                chatContentList: [obj],
                collectionVOList: [obj]
            };
            this.api.snsCollectSave(req);
        },
        __clear() {
            console.log(this.userType)
            console.log(this.userId)
            this.CLEAR_MSG_LIST(this.opeIdx);
        }
    }
};
</script>
<style lang="scss" scoped>
.shade {
    position: absolute;
    top: -20px;
    right: 46px;
    width: 60px;
    z-index: 1;
    border: 1px solid #eaeaea;
    border-bottom: none;
}
.contain {
    width: 60px;
    height: 74%;
    background: #fff;
    margin: 0 auto;
    padding-top: 1px;
    position: relative;
    > div:not(.exit) {
        height: 20px;
        line-height: 20px;
        text-align: center;
        border-bottom: 1px solid #eaeaea;
        font-size: 12px;
    }
}
.exit {
    width: 10px;
    height: 10px;
    position: absolute;
    background: url(./img/link_cancel.png);
    background-size: 100%;
    top: 2px;
    right: 2px;
}
</style>


