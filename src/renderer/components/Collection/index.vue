<template>
    <div class="menu">

        <div class="menuList">
            <div class="item">
                <div class="title">
                    <i class="icon favorite"></i>
                    <span class="name">{{$t('collect.favorite')}}</span>
                </div>
                <ul class="list">
                    <li class="lis cp"
                        v-for="(item,index) in menu"
                        :key="index"
                        :class="{[item.class]:true,'active':active==='collect_'+index}"
                        @click="__jump(item.type,index)">
                        <i class="icon"></i>
                        <span class="name">{{item.name}}</span>
                    </li>
                </ul>
            </div>

            <div class="item">
                <div class="title">
                    <i class="icon cloudSpace"></i>
                    <span class="name">{{$t('collect.myCloud')}}</span>
                </div>
                <ul class="list">
                    <li class="lis cp"
                        v-for="(item,index) in cloudSpaceMenu"
                        :key="index"
                        :class="{[item.class]:true,'active':active==='cloudSpace'+index}"
                        @click="__cloudSpaceJump(item.path,index)">
                        <i class="icon"></i>
                        <span class="name">{{item.name}}</span>
                    </li>
                </ul>
            </div>

            <div class="item">
                <div class="title">
                    <i class="icon cloudIco"></i>
                    <span class="name">{{$t('collect.cloud')}}</span>
                </div>
                <div class="list cloud">
                    <router-link tag="div"
                                 class="lis cp"
                                 :class="{'active':active==='cloud_0'}"
                                 :to="{name:'cloud', params: { type:0 }}">
                        <span class="name">{{$t('collect.available')}}</span>
                        <span class="">{{cloudData.spaceUse|byteConvert}} / {{cloudData.spaceTotal|byteConvert}}</span>
                    </router-link>
                    <div class="progressBar">
                        <div class="progress"
                             :style="{width:spaceWidth+'%'}"></div>
                    </div>
                </div>
                <div class="list cloud">
                    <router-link tag="div"
                                 class="lis cp"
                                 :class="{'active':active==='cloud_1'}"
                                 :to="{name:'cloud', params: { type:1 }}">
                        <span class="name">{{$t('collect.provide')}}</span>
                        <span class="">{{cloudData.spaceLeaseUse|byteConvert}} / {{cloudData.spaceLeaseTotal|byteConvert}}</span>
                    </router-link>
                    <div class="progressBar">
                        <div class="progress"
                             :style="{width:spaceLeaseWidth+'%'}"></div>
                    </div>
                </div>
            </div>
        </div>

    </div>
</template>

<script>
export default {
    data() {
        return {
            active: null,

            cloudSpaceActive: null,
            cloudData: {},
            spaceWidth: 0, //已用空间宽度
            spaceLeaseWidth: 0 //租用空间宽度
        }
    },
    computed: {
        menu() {
            return [
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
            ]
        },
        cloudSpaceMenu() {
            return [
                {
                    name: this.$t('collect.allCloudFile'),
                    class: 'all',
                    path: '/cloudSpaceAllFile'
                },
                {
                    name: this.$t('collect.watch'),
                    class: 'watch',
                    path: '/cloudSpaceImg'
                },
                {
                    name: this.$t('collect.doc'),
                    class: 'doc',
                    path: '/cloudSpaceDoc'
                },
                {
                    name: this.$t('collect.music'),
                    class: 'music',
                    path: '/cloudSpaceMusic'
                }
            ]
        }
    },
    components: {},
    watch: {
        $route: {
            handler() {
                if (this.$route.name === 'collection') {
                    this.active = 'collect_' + this.$route.params.index
                }
                if (this.$route.name === 'cloud') {
                    this.active = 'cloud_' + this.$route.params.type
                }
            },
            immediate: true
        }
    },
    filters: {
        byteConvert(bytes) {
            if (isNaN(bytes) || bytes < 0) {
                return '0'
            }
            var symbols = [
                '', //bytes
                'KB',
                'MB',
                'GB',
                'TB',
                'PB',
                'EB',
                'ZB',
                'YB'
            ]
            var exp = Math.floor(Math.log(bytes) / Math.log(2))
            if (exp < 1) {
                exp = 0
            }
            var i = Math.floor(exp / 10)
            bytes = bytes / Math.pow(2, 10 * i)

            if (bytes.toString().length > bytes.toFixed(2).toString().length) {
                bytes = bytes.toFixed(2)
            }
            return bytes + '' + symbols[i]
        }
    },
    created() {
        this.__getCloudData()
        this.$bus.on('cloudRefresh', this.__getCloudData)
    },
    beforeDestroy() {
        this.$bus.off('cloudRefresh', this.__getCloudData)
    },
    methods: {
        async __getCloudData() {
            // spaceLeaseTotal	integer($int64)
            // 出租上架总空间 单位字节

            // spaceLeaseUse	integer($int64)
            // 已出租空间 单位字节

            // spaceTotal	integer($int64)
            // 总空间 单位字节

            // spaceUse	integer($int64)
            // 使用的空间 单位字节
            const res = await this.api.cloudInfo()
            if (res.code === 0) {
                this.cloudData = res.data

                this.spaceWidth =
                    (this.cloudData.spaceUse / this.cloudData.spaceTotal) * 100
                this.spaceWidth = this.spaceWidth < 1 ? 1 : this.spaceWidth
                this.spaceLeaseWidth =
                    (this.cloudData.spaceLeaseUse /
                        this.cloudData.spaceLeaseTotal) *
                    100
                this.spaceLeaseWidth =
                    this.spaceLeaseWidth < 1 ? 1 : this.spaceLeaseWidth
            }
        },
        __jump(type, index) {
            this.active = 'collect_' + index
            this.$router.push({
                name: 'collection',
                params: { type, index }
            })
        },
        __cloudSpaceJump(path, index) {
            this.active = 'cloudSpace' + index
            this.$router.push(path)
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
    .cloudSpace {
        background: url('./img/Cloudlogo.png') no-repeat 0px 2px;
        background-size: 80% 80%;
    }
    .collect {
        background-image: url('./img/home_collect@3x.png');
    }
    .application {
        background-image: url('./img/home_myApplication@3x.png');
    }
    .cloudIco {
        background: url('./img/settings.png') no-repeat 0px 2px;
        background-size: 80% 80%;
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
.cloud {
    margin-left: 20px;
    .lis {
        padding: 0 2px;
        display: flex;
        justify-content: space-between;
        font-size: 14px;
    }
    .name {
        font-size: 13px;
        margin-left: 0px;
    }
    .progressBar {
        margin: 4px 0 18px -05%;
        position: relative;
        width: 105%;
        height: 10px;
        background: #c4c3c3;
        border-radius: 20px;
        overflow: hidden;
        .progress {
            position: absolute;
            top: 0;
            left: 0;
            height: 100%;
            border-radius: 20px;
            background: #3f61a6;
        }
    }
}
</style>
