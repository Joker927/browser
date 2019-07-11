<template>
    <div class="mask">
        <div class="box">
            <div class="title">{{$t('group.add')}}
                <span class="exit" @click="SET_GROUPADD_STATE"></span>
            </div>

            <div class="list clearfix">
                <div class="fl f-list clearfix">
                    <p class="search-f">
                        <input type="text" @focus="foucus" :placeholder="$t('group.placeholder1')" v-model="searchVal" />
                        <span class="search-icon" :class="{'focusIcon':focusIcon}" @click="__searchF"></span>
                    </p>
                    <div v-for="(item,index) in fList" :key="index" class="clearfix">
                        <div>
                            <img :src="item.avatar" v-if="item.avatar" />
                            <img src="./img/icon.png" v-else />
                        </div>
                        <div>
                            {{item.nickname}}
                        </div>
                        <input type="checkbox" v-model="item.isChecked" @click='selectF(item)' />
                    </div>
                </div>
                <div class="br fl clearfix">
                    <div class="br-title">
                        {{ $t('group.text')}}
                    </div>

                    <div class="f-list">
                        <div v-for="(item,index) in selectFList" :key="index" class="clearfix">
                            <div>
                                <img :src="item.avatar" v-if="item.avatar" />
                                <img src="./img/icon.png" v-else />
                            </div>
                            <div>
                                {{item.nickname}}
                            </div>
                            <span @click="deleteF(index)"></span>
                        </div>
                    </div>

                    <div class="br-btns clearfix">
                        <div @click="SET_GROUPADD_STATE">{{$t('cancel')}}</div>
                        <div @click="__updataGroup">{{$t('confirm')}}</div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { mapState, mapMutations } from "vuex";
export default {
    data() {
        return {
            fList: [],
            selectFList: [],
            focusIcon: false,
            searchVal: ""
        };
    },
    components: {},
    computed: {
        ...mapState({
            groupId: state => state.WebImQueue.groupId,
            groupIdx: state => state.WebImQueue.groupIdx,
            userInfo: state => state.UserInfo.userInfo
        })
    },
    mounted() {
        this.__friendsList();
    },
    methods: {
        ...mapMutations([
            "SET_GROUP_ID",
            "DELETE_WEBIM_LIST",
            "SET_ISOPERATION_STATE",
            "SET_GROUPADD_STATE"
        ]),
        foucus() {
            this.focusIcon = true;
        },
        async __friendsList() {
            let params = {
                userId: this.userInfo.userId
            };
            const res = await this.api.friendsList(params);
            res.data.forEach(val => {
                this.$set(val, "isChecked", false);
            });
            this.fList = res.data;
        },
        async __searchF() {
            if (!this.searchVal) {
                this.__friendsList();
                return;
            }
            var arr = [];
            this.fList.forEach(val => {
                if (val.nickname.indexOf(this.searchVal) >= 0) {
                    arr.push(val);
                }
            });
            this.fList = arr;
        },
        selectF(item) {
            if (!item.isChecked) {
                var flag = this.selectFList.some(val => {
                    return val.friendId == item.friendId;
                });
                if (!flag) this.selectFList.push(item);
            }
        },
        deleteF(index) {
            this.fList.forEach(val => {
                if (this.selectFList[index].friendId == val.friendId) {
                    val.isChecked = false;
                }
            });
            this.selectFList.splice(index, 1);
        },
        //更新群组信息
        async __updataGroup(url) {
            let arr = [];
            this.selectFList.forEach(val => {
                arr.push(val.friendId);
            });
            let params = {
                groupId: this.groupId,
                groupMemberIds: arr
            };
            const res = await this.api.addGroupMembers(params);
            this.$Toast(res.msg);
            this.SET_GROUPADD_STATE();
        }
    }
};
</script>

<style lang="scss" scoped>
input {
    outline: none;
}

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
    height: 550px;
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
.list {
    height: 500px;
    > div {
        width: 300px;
        height: 500px;
        overflow-y: scroll;
    }
    div:nth-of-type(1) {
        border-right: 1px solid #dfdfe0;
    }
}
.search-f {
    margin: 20px;
    position: relative;
    input {
        width: 257px;
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
    right: 230px;
}
.focusIcon {
    right: 10px;
}
.f-list {
    width: 254px;
    margin: 0px auto 0;
    > div {
        width: 100%;
        height: 30px;
        margin-bottom: 8px;
        line-height: 30px;
        > div {
            float: left;
        }
        > div:first-child {
            width: 30px;
            height: 30px;
            margin-left: 10px;
            img {
                width: 100%;
                border-radius: 50%;
            }
        }
        > div:nth-child(2) {
            margin-left: 10px;
            font-size: 14px;
            font-weight: 500;
        }
        input {
            float: right;
            margin-right: 6px;
        }
        span {
            display: block;
            float: right;
            width: 12px;
            height: 12px;
            background: url(./img/addFriends_clear@3x.png);
            background-size: 100% 100%;
            margin-top: 9px;
            margin-right: 20px;
        }
    }
}
.br-btns {
    width: 300px;
    div {
        float: right;
        width: 66px;
        height: 26px;
        line-height: 26px;
        text-align: center;
        margin-right: 18px;
    }
    > div:first-child {
        background: #dbdbdb;
    }
    > div:nth-child(2) {
        background: #3f61a6;
        color: #fff;
    }
}

.br-btns {
    position: absolute;
    bottom: 20px;
}
.br-title {
    font-size: 12px;
    color: #999;
    margin: 20px 20px;
    letter-spacing: 1px;
}
</style>