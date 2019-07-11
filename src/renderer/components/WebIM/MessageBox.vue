<template>
    <div class="mask">
        <div class="box">
            <div class="title">
                提示
                <span class="exit" @click="SET_MESSAGEBOX_STATE({type:'',id:''})"></span>
            </div>
            <div class="text" v-if="messageType == 1">
                是否解散群组？
            </div>
            <div class="text" v-if="messageType == 2">
                是否移除该成员？
            </div>
            <div class="btns clearfix">
                <div class="fl" @click="__dissolveGroup" v-if="messageType == 1">确认</div>
                <div class="fl" @click="__deleteMember" v-if="messageType == 2">确认</div>
                <div class="fl" @click="SET_MESSAGEBOX_STATE({type:'',id:''})">取消</div>
            </div>
        </div>
    </div>
</template>

<script>
import { mapState, mapMutations } from "vuex";
export default {
    data() {
        return {};
    },
    computed: {
        ...mapState({
            groupId: state => state.WebImQueue.groupId,
            groupIdx: state => state.WebImQueue.groupIdx,
            messageType: state => state.WebImQueue.messageType,
            messageUserId: state => state.WebImQueue.messageUserId,
            userInfo: state => state.UserInfo.userInfo
        })
    },
    mounted() {
        //1,解散群组
        if (this.messageType == 1) {
        }
    },
    methods: {
        ...mapMutations([
            "SET_GROUP_ID",
            "DELETE_WEBIM_LIST",
            "SET_ISOPERATION_STATE",
            "SET_GROUPADD_STATE",
            "SET_MESSAGEBOX_STATE"
        ]),
        __exit() {},
        //解散群组
        async __dissolveGroup() {
            let params = {
                groupId: this.groupId,
                userId: this.userInfo.userId
            };
            const res = await this.api.dissolveGroup(params);
            this.$Toast(res.msg);
            this.DELETE_WEBIM_LIST(this.groupIdx);
            this.SET_ISOPERATION_STATE();
            this.SET_GROUP_ID({ id: false, idx: false });
            this.SET_MESSAGEBOX_STATE({ type: "", id: "" });
        },
        //移除成员
        async __deleteMember(item) {
            let params = {
                groupId: this.groupId,
                userId: this.userInfo.userId,
                groupMemberIds: [this.messageUserId]
            };
            const res = await this.api.deleteMember(params);
            this.$Toast(res.msg);
            this.SET_MESSAGEBOX_STATE({ type: "", id: "" });
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
.title {
    text-align: center;
    font-weight: 600;
    font-size: 18px;
    line-height: 50px;
}
.box {
    width: 422px;
    height: 136px;
    background: #fff;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -45%);
}
.exit {
    width: 21px;
    height: 21px;
    display: block;
    background: url("./img/popup_cancel@3x.png") no-repeat;
    background-size: 80% 80%;
    float: right;
    margin: 8px 8px;
}
.text {
    line-height: 24px;
    padding-left: 36px;
}
.btns {
    position: absolute;
    bottom: 10px;
    right: 50px;
    div {
        width: 66px;
        height: 32px;
        line-height: 32px;
        text-align: center;
    }
    > div:first-child {
        background: #3f61a6;
        color: #fff;
    }
    > div:nth-child(2) {
        background: #dbdcdc;
        color: #333;
        margin-left: 12px;
    }
}
</style>