<template>
    <div class="newsFeed mt16">
        <div class="info">
            <img :src="item.avatar"
                 alt="">
            <div class="desc">
                <p class="name">{{item.userName}}</p>
                <span class="time">{{item.date}}</span>
            </div>
            <div class="menu cp"></div>
        </div>
        <p class="txt">{{item.dynamicDesc}}</p>
        <!-- <div class="content"></div> -->
        <div class="about">
            <div class="num">
                {{item.likeCount}}
            </div>
            <div class="operate">
                <div class="like">
                    <span class="icon"></span>
                    <p>赞</p>
                </div>

                <div class="share">
                    <span class="icon"></span>
                    <p>分享</p>
                </div>
                <div class="total">
                    <p>{{item.commentCount}}则留言</p>
                </div>
            </div>
        </div>
        <div class="func">
            <div class="">
                <img class="img"
                     :src="userInfo.avatar"
                     alt="">
                <div class="msg">
                    <div class="input">
                        <input type="text"
                               placeholder="留言......">
                    </div>
                    <div class="opt">
                        <div class="cp icon emoji"></div>
                        <div class="cp icon camera"></div>
                        <div class="cp icon gif"></div>
                        <div class="cp icon album"></div>
                        <div class="cp icon send"></div>
                    </div>
                </div>
            </div>
            <p class="tip">請按 Enter 鍵發表。</p>
        </div>
    </div>
</template>

<script>
import { mapState } from 'vuex'
import { format } from 'date-fns'
import { zhCN } from 'date-fns/locale'
export default {
    props: {
        item: {}
    },
    data() {
        return {}
    },
    components: {},
    computed: {
        ...mapState({
            userInfo: state => state.UserInfo.userInfo
        })
    },
    methods: {},
    watch: {
        item: {
            handler() {
                this.item.date = format(
                    new Date(this.item.publishTime),
                    'yyyy-MM-dd',

                    { locale: zhCN }
                )
            },
            immediate: true
        }
    },
    created() {}
}
</script>

<style lang='scss' scoped>
.newsFeed {
    padding-top: 15px;
    background: #fff;
    .info {
        position: relative;
        padding: 10px 20px;
        display: flex;
        flex-wrap: nowrap;
        img {
            width: 40px;
            height: 40px;
            border-radius: 50%;
            overflow: hidden;
            background: #000;
            margin-right: 10px;
        }
        .desc {
            margin-right: 20px;
        }
        .menu {
            position: absolute;
            right: 0;
            width: 40px;
            height: 40px;
            background: url(./img/home_edit_more@3x.png) no-repeat;
            background-size: 18px 4px;
            opacity: 0.4;
        }
    }
    .txt {
        padding: 10px 20px;
    }
    .content {
        height: 240px;
        background: #000;
    }
    .about {
        margin: 0 20px;
        display: flex;
        flex-wrap: nowrap;
        height: 35px;
        line-height: 35px;
        justify-content: space-between;
        border-bottom: 1px solid #c8c9c0;
        .operate {
            display: flex;
            .total {
                height: 35px;
                line-height: 35px;
            }
            > div {
                display: flex;
                align-items: center;
                padding: 0 10px;
            }
            .icon {
                width: 16px;
                height: 16px;
                background-size: 100% 100%;
                margin-right: 4px;
            }
            .share {
                .icon {
                    background-image: url(./img/home_share@3x.png);
                }
            }
            .msg {
                .icon {
                    background-image: url(./img/home_message@3x.png);
                }
            }
            .like {
                .icon {
                    background-image: url(./img/home_thumb@3x.png);
                }
            }
        }
    }
    .func {
        height: 98px;
        padding: 12px;
        > div {
            display: flex;
            align-items: center;
            .img {
                height: 36px;
                width: 36px;
                border-radius: 50%;
                background: #000;
            }
            .msg {
                display: flex;
                align-items: center;
                //width: ;
                flex-grow: 1;
                .input {
                    height: 38px;
                    flex-grow: 1;
                    margin: 0 10px;
                    background: #f7f7f7;
                    border-radius: 30px;
                    border: 1px solid #e3e4e4;
                    > input {
                        font-size: 14px;
                        border: none;
                        height: 38px;
                        width: 100%;
                        padding: 0 10px;
                        background: transparent;
                    }
                }
                .opt {
                    display: flex;
                    align-items: center;
                    justify-content: flex-end;
                    .icon {
                        width: 20px;
                        height: 20px;
                        background-size: 100% 100%;
                        margin: 4px;
                    }
                    .emoji {
                        background-image: url('./img/emoji@2x.png');
                    }
                    .camera {
                        background-image: url('./img/camera@2x.png');
                    }
                    .gif {
                        background-image: url('./img/gif@2x.png');
                    }
                    .album {
                        background-image: url('./img/album@2x.png');
                    }
                    .send {
                        width: 41px;
                        height: 31px;
                        background-image: url('./img/send.png');
                    }
                }
            }
        }
        .tip {
            font-size: 12px;
            margin-top: 10px;
            color: #888888;
            padding-left: 45px;
        }
    }
}
</style>
