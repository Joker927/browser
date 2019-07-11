<template>
    <div class="shade">
        <div @click="SET_GROUP_ID({id:groupId,idx:idx})">{{$t('webim.lookGroupDetail')}}</div>
        <div @click="__exitGroup" v-if="groupInfo.isUserGroup==0">{{$t('webim.exitGroup')}}</div>
        <div @click="__dissolveGroup2" v-else>{{$t('webim.ungroup')}}</div>
    </div>
</template>
<script>
import { mapState, mapMutations } from "vuex";
export default {
    props: ["groupId", "idx"],
    data() {
        return {
            groupInfo: {}
        };
    },
    mounted() {
        this.__getGroupInfo();
    },
    computed: {
        ...mapState({
            userInfo: state => state.UserInfo.userInfo
        })
    },
    methods: {
        ...mapMutations([
            "DELETE_WEBIM_LIST",
            "SET_ISOPERATION_STATE",
            "SET_GROUP_ID",
            "SET_MESSAGEBOX_STATE"
        ]),
        __exit() {
            this.$emit("changeStatus", false);
        },
        async __getGroupInfo() {
            const res = await this.api.groupInfo(this.groupId);
            this.groupInfo = res.data;
        },
        __detail() {},
        //退出群组
        async __exitGroup() {
            let params = {
                groupId: this.groupId,
                userId: this.userInfo.userId
            };
            const res = await this.api.exitGroup(params);
            this.$Toast(res.msg);
            this.DELETE_WEBIM_LIST(this.idx);
            this.SET_ISOPERATION_STATE();
        },
        //解散群组
        async __dissolveGroup() {
            let params = {
                groupId: this.groupId,
                userId: this.userInfo.userId
            };
            const res = await this.api.dissolveGroup(params);
            this.$Toast(res.msg);
            this.DELETE_WEBIM_LIST(this.idx);
            this.SET_ISOPERATION_STATE();
        },
        __dissolveGroup2() {
            this.SET_MESSAGEBOX_STATE({ type: 1, id: "" });
            this.SET_GROUP_ID({ id: this.groupId, idx: this.idx });
        }
    }
};
</script>
<style lang="scss" scoped>
.shade {
    position: absolute;
    top: 28px;
    right: -39px;
    z-index: 1;
    border: 1px solid #eaeaea;
    background: #fff;
    width: 113px;
    div {
        height: 30px;
        line-height: 30px;
        text-align: center;
        width: 99px;
        margin: 0 auto;
    }
    > div:first-child {
        border-bottom: 1px solid #eaeaea;
    }
}
.shade::before {
    content: "";
    position: absolute;
    top: -13px;
    left: 13px;
    width: 21px;
    height: 13px;
    background: url("./img/arrow.png");
}
</style>


