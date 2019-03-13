<template>

    <div class="contain clearfix">
        <div class="box">
            <div class="bl fl">
                <div class="search-f">
                    <input type="text"
                           @focus="__foucus"
                           @blur="__blur"
                           @input="__inputing"
                           v-model="searchName"
                           :placeholder="$t('search')">
                    <span class="search-icon"
                          :class="{'focusIcon':focusIcon}"></span>
                </div>
                <div class="list">
                    <div class=" cp"
                         v-for="(item,index) in list"
                         :key="index"
                         @click="__select(item)">
                        <div>
                            <img v-if="item.avatar"
                                 :src="item.avatar">
                            <img v-else
                                 :src="item.image">
                        </div>
                        <div>
                            {{item.nickname || item.groupName}}
                        </div>
                        <input type="checkbox"
                               v-model="item.isChecked">
                    </div>
                </div>
            </div>

            <div class="br fl">
                <div class="br-title">
                    {{$t('common.text')}}{{selectList.length}} {{$t('common.text1')}}
                </div>

                <div class="list rlist">
                    <div v-for="(item,index) in selectList"
                         :key="index"
                         class="clearfix">
                        <div>
                            <img v-if="item.avatar"
                                 :src="item.avatar">
                            <img v-else
                                 :src="item.image">
                        </div>
                        <div>
                            {{item.nickname || item.groupName}}
                        </div>
                        <span @click="__del(index,item)"></span>
                    </div>
                </div>

                <div class="br-btns clearfix">
                    <div class="cp"
                         @click="__out">{{$t('cancel')}}</div>
                    <div class="cp"
                         @click="__done">{{$t('confirm')}}</div>
                </div>
            </div>
        </div>

    </div>

</template>

<script>
import { mapState, mapMutations } from 'vuex'
export default {
    props: {
        name: {
            type: String
        }
    },
    data() {
        return {
            req: {
                userId: 0
            },
            focusIcon: false,
            list: [],
            selectList: [],
            selectIds: [],
            searchName: ''
        }
    },

    computed: {
        ...mapState({
            userInfo: state => state.UserInfo.userInfo,
            mailListState: state => state.Visible.mailListState
        })
    },
    watch: {},
    methods: {
        ...mapMutations(['']),
        __out() {
            this.$emit('done', { hander: 'cancel' })
        },
        __foucus() {
            this.focusIcon = true
        },
        __blur() {
            this.focusIcon = false
        },
        __inputing() {
            if (this.timer) return
            this.timer = setTimeout(() => {
                this.__getList()
            }, 300)
        },
        async __getList() {
            this.req.userId = this.userInfo.userId
            const res = await this.api.searchFriendAndGroup({
                searchName: this.searchName
            })
            this.list = res.data.containFriendGroupList.concat(
                res.data.friendList
            )
            this.list.forEach(item => (item.isChecked = false))
            // this.friendList = res.data.friendList
            //  this.groupList = res.data.containFriendGroupList
            console.log(res, 'searchFriendAndGroup')

            this.timer = null //重置输入框定时器状态
        },
        __select(item) {
            console.log(item, 'item')
            if (!item.isChecked) {
                this.selectList.push(item)
                item.isChecked = true
            } else {
                item.isChecked = false
                this.selectList = this.list.filter(item => item.isChecked)
            }
        },
        __del(index, item) {
            this.list.forEach(ele => {
                if (this.selectList[index].userId == ele.userId) {
                    ele.isChecked = false
                }
            })
            this.selectList.splice(index, 1)
        },
        __diffArr(arr, arr1) {
            let tempArr = []
            for (var i = 0; i < arr.length; i++) {
                if (!arr1.includes(arr[i])) {
                    tempArr.push(arr[i])
                }
            }
            return tempArr
        },
        async __done() {
            this.$emit('done', { hander: 'submit', data: this.selectList })
        }
    },

    created() {
        this.__getList()
    }
}
</script>

<style lang="scss" scoped>
input {
    outline: none;
}

.box {
    width: 600px;
    // height: 1550px;
    background: #fff;
    border-top: 1px solid #dfdfe0;
}
.title {
    height: 50px;
    line-height: 50px;
    padding-left: 20px;
    border-bottom: 1px solid #dfdfe0;
    font-size: 16px;
}

.contain {
    height: 400px;
}

.bl,
.br {
    width: 300px;
    height: 400px;
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
        padding-left: 16px;
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

.list {
    width: 254px;
    margin: 20px auto 0;
    > div {
        width: 100%;
        height: 30px;
        margin-bottom: 8px;
        line-height: 30px;
        display: flex;
        align-items: center;

        > div:first-child {
            width: 30px;
            height: 30px;
            position: relative;
            overflow: hidden;
            border-radius: 50%;
            z-index: 1;
            background: #f1f1f1;
            img {
                width: 100%;
                // max-height: 100%;
                position: absolute;
                left: 50%;
                top: 50%;
                transform: translate(-50%, -50%);
            }
        }
        > div:nth-child(2) {
            margin-left: 10px;
            font-size: 14px;
            font-weight: 500;
            flex-grow: 1;
        }
        input {
            margin-right: 6px;
        }
        span {
            display: block;
            float: right;
            width: 12px;
            height: 12px;
            background: url('./img/addFriends_clear@3x.png');
            background-size: 100% 100%;
            margin-right: 20px;
        }
    }
}
.rlist {
    overflow-y: auto;
    height: calc(100% - 110px);
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