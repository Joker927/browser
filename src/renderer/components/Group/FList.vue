<template>
    <div class="contain clearfix">
        <div class="bl fl"
             :style="mainStyle">
            <div class="search-f">
                <input type="text"
                       @focus="foucus"
                       :placeholder="$t('group.placeholder1')"
                       v-model="searchVal" />
                <span class="search-icon"
                      :class="{'focusIcon':focusIcon}"
                      @click="__searchF"></span>
            </div>
            <div class="f-list">
                <div v-for="(item,index) in fList"
                     :key="index"
                     class="clearfix">
                    <div>
                        <img src="./img/share-friend.png" />
                    </div>
                    <div>
                        {{item.nickname}}
                    </div>
                    <input type="checkbox"
                           v-model="item.isChecked"
                           @click='selectF(item)' />
                </div>
            </div>
        </div>

        <div class="br fl"
             :style="mainStyle">
            <div class="br-title">
                {{ $t('group.text')}}

            </div>

            <div class="f-list">
                <div v-for="(item,index) in selectFList"
                     :key="index"
                     class="clearfix">
                    <div>
                        <img src="./img/share-friend.png" />
                    </div>
                    <div>
                        {{item.nickname}}
                    </div>
                    <span @click="deleteF(index)"></span>
                </div>
            </div>

            <div class="br-btns clearfix">
                <div @click="__out">{{$t('cancel')}}</div>
                <div @click="__addGroup">{{$t('confirm')}}</div>
            </div>
        </div>
    </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex'
export default {
    props: ['groupName', 'groupId', 'file'],
    data() {
        return {
            searchVal: '',
            headImgUrl: '',
            req: {
                currPage: 1,
                pageSize: 10,
                userId: 0
            },
            focusIcon: false,
            fList: [],
            selectFList: []
        }
    },
    watch: {
        groupName: {
            handler(newVal) {
                console.log(newVal)
            },
            deep: true
        },
        file: {
            handler(newVal) {
                this.__addImg()
            },
            deep: true
        }
    },
    mounted() {
        this.__friendsList()
    },
    computed: {
        ...mapState({
            userInfo: state => state.UserInfo.userInfo
        }),
        mainStyle() {
            if (this.groupId) return 'height: 490px'
            return 'height: 400px'
        }
    },
    methods: {
        ...mapMutations(['SET_GROUP_STATE', 'GET_USER_INFO']),
        __out() {
            this.SET_GROUP_STATE()
        },
        foucus() {
            this.focusIcon = true
        },
        async __friendsList() {
            this.req.userId = this.userInfo.userId
            const res = await this.api.friendsList(this.req)
            res.data.forEach(val => {
                this.$set(val, 'isChecked', false)
            })
            this.fList = res.data
        },
        async __searchF() {
            if (!this.searchVal) {
                this.__friendsList()
                return
            }
            const res = await this.api.searchFriendOrGroup(this.searchVal)
            this.fList = res.data.friendList
        },
        selectF(item) {
            if (!item.isChecked) {
                var flag = this.selectFList.some(val => {
                    return val.friendId == item.friendId
                })
                if (!flag) this.selectFList.push(item)
            }
        },
        deleteF(index) {
            this.fList.forEach(val => {
                if (this.selectFList[index].friendId == val.friendId) {
                    val.isChecked = false
                }
            })
            this.selectFList.splice(index, 1)
        },
        async __addGroup() {
            var arr = []
            this.selectFList.forEach(val => {
                var obj = {
                    groupMemberId: val.friendId,
                    memberName: val.nickname
                }
                arr.push(obj)
            })

            var para = {
                groupLord: this.userInfo.userId,
                groupName: this.groupName,
                image: this.headImgUrl,
                memberList: arr
            }

            if (this.groupId) {
                para.groupId = this.groupId
                var res = await this.api.groupInvite(para)
            } else {
                var res = await this.api.groupCreateAndAddMember(para)
            }
            if (res.code == 0) {
                this.__out()
            }
        },
        async __addImg() {
            var formData = new FormData()
            formData.append('file', this.file)
            const res = await this.api.groupUploadImage(formData)
            this.headImgUrl = res.data
            this.$emit('imgUrl', res.data)
        }
    }
}
</script>

<style lang="scss" scoped>
input {
    outline: none;
}

.contain {
    height: 400px;
}

.bl,
.br {
    width: 300px;
}

.bl {
    padding-top: 20px;
    border-right: 1px solid #dfdfe0;
    overflow-y: scroll;
}

.bl::-webkit-scrollbar {
    width: 0px;
    height: 0px;
}

.search-f {
    width: 254px;
    margin: 0 auto;
    position: relative;
    input {
        width: 100%;
        border-radius: 4px;
        height: 25px;
        line-height: 25px;
        border: 1px solid #efefe0;
        background: #f5f6f7;
        padding-left: 10px;
    }
    input::-webkit-input-placeholder {
        padding-left: 26px;
    }
}

.search-icon {
    display: block;
    width: 14px;
    height: 14px;
    background: url('./img/search-icon.png');
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
    margin: 20px auto 0;
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

.br {
    position: relative;
}

.br-title {
    font-size: 12px;
    color: #999;
    margin: 20px 20px;
    letter-spacing: 1px;
}

.checked-fList {
}

.br-btns {
    width: 100%;
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
</style>