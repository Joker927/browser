<template>

    <div class="list"
         v-show="likeState"
         :style="{top:likeStyle.top +'px',left:likeStyle.left+'px',zIndex:zIndex}">
        <div>
            <span class="icon give"></span>
            <p>{{list.length}}</p>
            <span @click="__out"
                  class="icon close"></span>
        </div>
        <ul>
            <li v-for="(ele,index) in list"
                :key="index">

                <Avatar :src="ele.avatar" />
                <p>{{ele.nickname}}</p>
            </li>
        </ul>
    </div>

</template>

<script>
import { mapState, mapMutations } from 'vuex'
export default {
    data() {
        return {
            focusIcon: false,
            list: []
        }
    },

    computed: {
        ...mapState({
            userInfo: state => state.UserInfo.userInfo,
            likeState: state => state.Feed.likeState,
            likeStyle: state => state.Feed.likeStyle,
            dynamicId: state => state.Feed.dynamicId,
            zIndex: state => state.Feed.zIndex
        })
    },
    watch: {
        dynamicId: {
            handler() {
                if (this.dynamicId) {
                    this.__getList()
                }
            },
            immediate: true
        }
    },
    methods: {
        ...mapMutations(['SET_FEED_LIKE_STATE']),
        __out() {
            this.SET_FEED_LIKE_STATE({ state: false })
        },
        async __getList() {
            const res = await this.api.snsLikeList({
                dynamicId: this.dynamicId
            })
            if (res.code === 0) {
                this.list = res.data
            }
        }
    },

    created() {}
}
</script>

<style lang="scss" scoped>
input {
    outline: none;
}

.list {
    position: fixed;
    width: 200px;
    background: #ffffff;
    box-shadow: 0 2px 10px rgba($color: #000000, $alpha: 0.2);
    > div {
        display: flex;
        align-items: center;
        justify-content: space-between;
        border-bottom: 1px solid #f7f8f0;
        height: 30px;
        .icon {
            margin: 0 10px;
            width: 20px;
            height: 20px;
            background-size: 80% 80%;
            background-position: center;
            background-repeat: no-repeat;
        }
        .give {
            background-image: url('./img/thumb_sum@3x.png');
        }
        .close {
            background-image: url('./img/popup_cancel@3x.png');
        }
    }
    > ul {
        overflow-y: scroll;
        height: 250px;
        > li {
            display: flex;
            align-items: center;
            padding-left: 20px;
            height: 40px;
            border-bottom: 1px solid #f7f8f0;
            img {
                width: 30px;
                height: 30px;
                border-radius: 50%;
                margin-right: 30px;
            }
        }
    }
}
</style>