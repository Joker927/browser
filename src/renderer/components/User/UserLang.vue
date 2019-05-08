<template>
    <div class="content mt16">

        <div class="title ">
            <p>{{$t('nav.lang')}}</p>
        </div>
        <ul class="list">
            <li v-for="(item,index) in list"
                :key="index"
                :class="{'active':active===index,'cp':true}"
                @click="__setLang(index)">{{item}}</li>
        </ul>

    </div>
</template>

<script>
import { mapState } from 'vuex'
import setLanguages from '@/lang/fn'

export default {
    data() {
        return {
            list: ['简体', '簡體', 'English'],
            active: null
        }
    },
    components: {},
    computed: {
        ...mapState({
            userInfo: state => state.UserInfo.userInfo
        })
    },
    filters: {},
    methods: {
        __setLang(index) {
            let lang
            switch (index) {
                case 0:
                    lang = 'zh-CN'
                    break
                case 1:
                    lang = 'zh-TW'
                    break
                default:
                    lang = 'en-US'
                    break
            }
            this.$i18n.locale = lang
            localStorage.setItem('LANGUAGE', lang)
            this.__setActive()
        },
        __setActive() {
            let lang = localStorage.getItem('LANGUAGE') || setLanguages()
            switch (lang) {
                case 'zh-CN':
                    this.active = 0
                    break
                case 'zh-TW':
                    this.active = 1
                    break
                default:
                    this.active = 2
                    break
            }
        }
    },

    watch: {},
    created() {
        this.__setActive()
    }
}
</script>

<style lang='scss' scoped>
.content {
    width: 100%;
    height: 100%;
    background: #ffffff;
    padding-left: 30px;
    > .title {
        display: flex;
        justify-content: space-between;
        align-items: center;
        height: 80px;
        border-bottom: 1px solid #dbdcdc;
        .active {
            color: #3f61a6;
            font-size: 14px;
            font-weight: bold;
        }
    }
    .list {
        margin-top: 30px;
        > li {
            margin-top: 10px;
        }
        .active {
            color: #3f61a6;
            font-weight: bold;
        }
    }
}
</style>
