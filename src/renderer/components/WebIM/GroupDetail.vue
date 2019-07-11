<template>
    <span class="mask">
        <span class="box">
            <div class="title">{{$t('group.desc')}}
                <span class="exit" @click='SET_GROUP_ID({id:false,idx:false})'></span>
            </div>

            <div class="info">
                <div>
                    <span>{{$t('webim.groupHeadImg')}}</span>
                    <div class="img">
                        <img src="./img/icon.png" v-if="!groupInfo.image" />
                        <img :src="groupInfo.image" v-else />
                        <span>
                            {{$t('webim.change')}}
                            <input type="file" @change="__chooseImg" id="fileIds" />
                        </span>
                    </div>
                </div>
                <div>
                    <span>{{$t('webim.groupName')}}</span>
                    <input type="text" v-model="groupInfo.groupName" @blur="__updataGroup(false)" />
                </div>
            </div>

            <div class="grouperInfo clearfix">
                <img src="./img/icon.png" v-if="!grouperInfo.image" class="fl" />
                <img :src="grouperInfo.avatar" v-else class="fl" />
                <div class="fl">
                    {{grouperInfo.nickname}}
                </div>
                <div class="fr" v-if="groupInfo.groupLord==userInfo.userId" style="color:#3f61a6;" @click="SET_MESSAGEBOX_STATE({type:1,id:''})">
                    {{$t('webim.ungroup')}}
                </div>
                <div class="fr" v-else>
                    {{$t('webim.grouper')}}
                </div>
            </div>

            <div class="list clearfix">
                <p class="search-f clearfix" v-if="groupInfo.groupLord==userInfo.userId">
                    <input type="text" @focus="foucus" :placeholder="$t('group.placeholder1')" v-model="searchVal" />
                    <span class="search-icon" :class="{'focusIcon':focusIcon}" @click="__searchF"></span>
                    <span class="add-f" @click="SET_GROUPADD_STATE"></span>
                </p>
                <div v-for="(item,index) in groupInfo.memberList" :key="index" class="clearfix">
                    <div class="fl">
                        <img :src="item.avatar" v-if="item.avatar" />
                        <img src="./img/icon.png" v-else />
                    </div>
                    <div class="fl">
                        {{item.memberName}}
                    </div>
                    <div class="fr" v-if="groupInfo.groupLord==userInfo.userId">
                        <div class="fr" v-if="item.groupMemberId==userInfo.userId&&groupInfo.groupLord==userInfo.userId">
                            {{$t('webim.grouper')}}
                        </div>
                        <div class="fr" v-else @click="SET_MESSAGEBOX_STATE({type:2,id:item.groupMemberId})">
                            {{$t('webim.delete')}}
                        </div>
                    </div>
                    <div class="fr" v-else @click="__addFriend(item.groupMemberId)">
                        {{$t('main.addFriend')}}
                    </div>
                </div>
            </div>
        </span>
    </span>
</template>

<script>
import { mapState, mapMutations } from "vuex";
export default {
    data() {
        return {
            focusIcon: false,
            searchVal: "",
            groupInfo: {},
            memberList: [], //存着原始的成员列表
            grouperInfo: {}
        };
    },
    components: {},
    computed: {
        ...mapState({
            groupId: state => state.WebImQueue.groupId,
            groupIdx: state => state.WebImQueue.groupIdx,
            groupAddShow: state => state.WebImQueue.groupAddShow,
            userInfo: state => state.UserInfo.userInfo,
            messageShow: state => state.WebImQueue.messageShow
        })
    },
    mounted() {
        this.__getGroupInfo(this.groupId);
    },
    watch: {
        groupAddShow: {
            handler(newVal) {
                this.__getGroupInfo(this.groupId);
            },
            deep: true
        },
        messageShow: {
            handler(newVal) {
                this.__getGroupInfo(this.groupId);
            },
            deep: true
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
        foucus() {
            this.focusIcon = true;
        },
        __searchF() {
            if (!this.searchVal) {
                this.groupInfo.memberList = this.memberList2;
                return;
            }
            var arr = [];
            this.groupInfo.memberList.forEach(val => {
                if (val.memberName.indexOf(this.searchVal) >= 0) {
                    arr.push(val);
                }
            });
            this.groupInfo.memberList = arr;
        },
        async __chooseImg() {
            var formData = new FormData();
            console.log(document.getElementById("fileId"));
            formData.append(
                "file",
                document.getElementById("fileIds").files[0]
            );
            const res = await this.api.groupUploadImage(formData);
            this.__updataGroup(res.data);
        },
        //更新群组信息
        async __updataGroup(url) {
            let params = {
                groupId: this.groupId,
                groupLord: this.groupInfo.groupLord,
                groupLordName: this.groupInfo.groupLordName,
                groupName: this.groupInfo.groupName,
                image: this.groupInfo.image
            };
            if (url) params.image = url;
            const res = await this.api.groupUpdate(params);
            this.__getGroupInfo(this.groupId);
            this.$Toast(res.msg);
        },
        async __addFriend(id) {
            let params = {
                requesterId: id
            };
            const res = await this.api.friendApply(params);
            this.$Toast(res.msg);
        },
        async __getGroupInfo() {
            const res = await this.api.groupInfo(this.groupId);
            this.groupInfo = res.data;
            var arr1 = this.groupInfo.memberList;
            var arr2 = [];
            Object.assign(arr2, arr1);
            this.memberList2 = arr2;
            this.__getGrouperUserInfo();
        },
        async __getGrouperUserInfo() {
            let id = this.groupInfo.groupLord;
            const res = await this.api.userInfo({ id });
            this.grouperInfo = res.data;
        },
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
        },
        //移除成员
        async __deleteMember(item) {
            let params = {
                groupId: this.groupId,
                userId: this.userInfo.userId,
                groupMemberIds: [item.groupMemberId]
            };
            const res = await this.api.deleteMember(params);
            this.$Toast(res.msg);
            this.__getGroupInfo(this.groupId);
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
    width: 420px;
    height: 600px;
    background: #fff;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -45%);
}

.title {
    height: 50px;
    line-height: 50px;
    padding-left: 20px;
    border-bottom: 1px solid #dfdfe0;
    font-size: 16px;
}

.exit {
    width: 21px;
    height: 21px;
    display: block;
    background: url("./img/popup_cancel@3x.png");
    background-size: 100% 100%;
    float: right;
    margin: 15px 20px;
}
.info {
    height: 115px;
    border-bottom: 1px solid #dfdfe0;
    display: flex;
    flex-direction: column;
    > div {
        margin-left: 20px;
        display: flex;
        span {
            color: #888;
        }
        .img {
            position: relative;
            margin-left: 20px;
            img {
                border-radius: 50%;
                width: 50px;
                height: 50px;
            }
            span {
                width: 50px;
                height: 25px;
                line-height: 25px;
                border-radius: 0 0 50px 50px;
                background: rgba(0, 0, 0, 0.3);
                color: #fff;
                text-decoration: none;
                text-align: center;
                position: absolute;
                top: 25px;
                left: 0;
                font-size: 12px;
            }
            input {
                width: 50px;
                height: 25px;
                border-radius: 0 0 50% 50%;
                opacity: 0;
                position: absolute;
                top: 0;
                left: 0;
            }
        }

        div {
            margin-left: 20px;
            font-weight: 600;
            color: #333;
        }
    }
    > div:nth-of-type(1) {
        height: 50px;
        line-height: 50px;
        margin-top: 10px;
    }
    > div:nth-of-type(2) {
        margin-top: 20px;
        input {
            margin-left: 20px;
            font-weight: 600;
            color: #333;
            border: none;
            outline: none;
        }
    }
}
.grouperInfo {
    border-bottom: 1px solid #dfdfe0;
    height: 70px;
    line-height: 70px;
    img {
        height: 30px;
        width: 30px;
        border-radius: 50% 50%;
        margin: 20px;
    }
    div {
        font-weight: 600;
    }
    > div:nth-of-type(2) {
        margin-right: 20px;
    }
}
.list {
    height: 355px;
    overflow-y: scroll;
    > div {
        height: 30px;
        line-height: 30px;
        margin-top: 10px;
        width: 420px;
        overflow: hidden;
        > div:first-child {
            margin-left: 20px;
        }
        > div:nth-of-type(2) {
            margin-left: 20px;
            font-weight: 600;
        }
        > div:nth-of-type(3) {
            margin-right: 20px;
            font-weight: 600;
            color: #3f61a6;
        }
    }
    img {
        width: 30px;
        height: 30px;
        border-radius: 50%;
    }
}
.search-f {
    margin: 20px;
    position: relative;
    input {
        width: 337px;
        border-radius: 4px;
        height: 25px;
        line-height: 25px;
        border: 1px solid #efefe0;
        background: #f5f6f7;
        padding-left: 10px;
        outline: none;
    }
    input::-webkit-input-placeholder {
        padding-left: 26px;
    }
}
.search-icon {
    display: block;
    width: 14px;
    height: 14px;
    background: url("./img/search-icon.png");
    background-size: 100% 100%;
    position: absolute;
    top: 5px;
    right: 350px;
}
.focusIcon {
    right: 50px;
}
.add-f {
    position: absolute;
    margin-left: 10px;
    width: 26px;
    height: 26px;
    border-radius: 5px;
    border: 1px solid #efefe0;
    background: #f5f6f7 url("./img/addGroup@2x.png") no-repeat center;
}
</style>