<template>
    <div class="menu">

        <div class="menuList">
            <div class="item"
                 v-for="(item,index) in list"
                 :key="index">
                <div class="title">
                    <i class="icon"
                       :class="item.class"></i>
                    <span class="name">{{item.name}}</span>
                </div>
                <ul class="list">
                    <li class="lis cp"
                        v-for="(item,index) in menu"
                        :key="index"
                        :class="{[item.class]:true,'active':active===index}"
                        @click="__jump(item.type,index)">
                        <i class="icon"></i>
                        <span class="name">{{item.name}}</span>
                    </li>

                </ul>

            </div>
        </div>

    </div>
</template>

<script>
export default {
    data() {
        return {
            list: [
                {
                    name: this.$t('collect.favorite'),
                    class: 'favorite'
                }
                // {
                //     name: '收藏应用',
                //     class: 'collect'
                // },
                // {
                //     name: '我的应用',
                //     class: 'application'
                // }
            ],
            menu: [
                {
                    name: this.$t('collect.all'),
                    class: 'all',
                    type: ''
                },
                {
                    name: this.$t('collect.watch'),
                    class: 'watch',
                    type: 0
                },
                {
                    name: this.$t('collect.link'),
                    class: 'link',
                    type: 1
                },
                {
                    name: this.$t('collect.doc'),
                    class: 'doc',
                    type: 2
                },
                {
                    name: this.$t('collect.music'),
                    class: 'music',
                    type: 3
                },
                {
                    name: this.$t('collect.record'),
                    class: 'record',
                    type: 4
                },
                {
                    name: this.$t('collect.voice'),
                    class: 'voice',
                    type: 5
                },
                {
                    name: this.$t('collect.location'),
                    class: 'location',
                    type: 6
                },
                {
                    name: this.$t('collect.feed'),
                    class: 'feed',
                    type: 7
                }
            ],
            active: null
        }
    },
    components: {},
    watch: {
        $route: {
            handler() {
                if (this.$route.name === 'collection') {
                    this.active = Number(this.$route.params.index)
                }
            },
            immediate: true
        }
    },
    methods: {
        __jump(type, index) {
            this.active = index
            this.$router.push({
                name: 'collection',
                params: { type, index }
            })
        }
    }
}
</script>

<style lang='scss' scoped>
.menu {
    width: 25%;
    background: #eeeeef;
}
.menuList {
    padding: 20px 0;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
}
.item {
    padding: 20px 0;
}

.title {
    display: flex;
    flex-wrap: nowrap;
    align-items: center;
    height: 20px;
    .icon,
    .setting {
        background-size: 100% 100%;
    }
    .icon {
        width: 20px;
        height: 20px;
    }
    .name {
        font-size: 14px;
        line-height: 20px;
        min-width: 160px;
        padding-left: 1px;
        display: inline-block;
    }
    .setting {
        width: 20px;
        height: 20px;
        background-image: url('./img/home_setting@3x.png');
    }
    .favorite {
        background-image: url('./img/home_myFavorite@3x.png');
    }
    .collect {
        background-image: url('./img/home_collect@3x.png');
    }
    .application {
        background-image: url('./img/home_myApplication@3x.png');
    }
}
.list {
    margin-left: 20px;
    .lis {
        height: 26px;
        line-height: 26px;
        margin-top: 4px;
        display: flex;
        align-items: center;
        .img {
            width: 20px;
            height: 20px;
            margin-right: 4px;
        }
    }
    .active {
        background: #3f61a6;
        color: #ffffff;
    }
    .icon {
        width: 14px;
        height: 14px;
        background-size: cover;
        margin: 0 10px;
    }
    .all {
        i {
            background-image: url(('./img/collect_all_unpressed@3x.png'));
        }
    }
    .all.active {
        i {
            background-image: url(('./img/collect_all_pressed@3x.png'));
        }
    }
    .watch {
        i {
            background-image: url(('./img/collect_pics_unpressed@3x.png'));
        }
    }
    .watch.active {
        i {
            background-image: url(('./img/collect_pics_pressed@3x.png'));
        }
    }
    .link {
        i {
            background-image: url(('./img/collect_link_unpressed@3x.png'));
        }
    }
    .link.active {
        i {
            background-image: url(('./img/collect_link_pressed@3x.png'));
        }
    }
    .doc {
        i {
            background-image: url(('./img/collect_document_unpressed@3x.png'));
        }
    }
    .doc.active {
        i {
            background-image: url(('./img/collect_document_pressed@3x.png'));
        }
    }

    .music {
        i {
            background-image: url(('./img/collect_music_unpressed@3x.png'));
        }
    }
    .music.active {
        i {
            background-image: url(('./img/collect_music_pressed@3x.png'));
        }
    }
    .record {
        i {
            background-image: url(('./img/collect_chat_unpressed@3x.png'));
        }
    }
    .record.active {
        i {
            background-image: url(('./img/collect_chat_pressed@3x.png'));
        }
    }
    .voice {
        i {
            background-image: url(('./img/collect_voice_unpressed@3x.png'));
        }
    }
    .voice.active {
        i {
            background-image: url(('./img/collect_voice_pressed@3x.png'));
        }
    }
    .location {
        i {
            background-image: url(('./img/collect_all_unpressed@3x.png'));
        }
    }
    .location.active {
        i {
            background-image: url(('./img/collect_all_pressed@3x.png'));
        }
    }
    .feed {
        i {
            background-image: url(('./img/collect_dynamic_unpressed@3x.png'));
        }
    }
    .feed.active {
        i {
            background-image: url(('./img/collect_dynamic_pressed@3x.png'));
        }
    }
}
</style>
