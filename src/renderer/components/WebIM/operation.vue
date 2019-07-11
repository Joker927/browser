<template>
    <div class="shade">
        <div class="contain">
            <div @click="__delete">删除</div>
            <div class="border"></div>
            <div @click="__forward">转发</div>
            <div class="border"></div>
            <div @click="__copy()">复制</div>
            <div class="border"></div>
            <div @click="__collect()">收藏</div>
            <div class="border"></div>
            <div @click="__clear()">清空</div>
            <div class="border"></div>
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
            console.log(this.msgItem)
            this.SET_IMFORWARD_STATE(this.msgItem);
            this.__exit();
        },
        __copy() {
            const { clipboard } = require('electron')
            clipboard.writeText(this.msgItem.msg);
            this.$Toast('复制成功');
            this.__exit();
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
            this.api.snsCollectSave(req).then(res => {
                this.$Toast(res.msg);
            })
            this.__exit();
        },
        __clear() {
            this.CLEAR_MSG_LIST(this.opeIdx);
            this.__exit();
        }
    }
};
</script>
<style lang="scss" scoped>
.shade {
    position: absolute;
    top: -20px;
    left: 146px;
    z-index: 1;
    border: 1px solid #eaeaea;
    border-bottom: none;
}
.contain {
    width: 116px;
    background: #fff;
    padding-top: 1px;
    position: relative;
    > div:not(.border) {
        height: 30px;
        line-height: 30px;
        text-indent: 2em;
        margin: 6px 0;
    }
    > div:hover {
        background: #ecf0f7;
    }
    .border {
        border-bottom: 1px solid #e8eaed;
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


