<template>

    <div class="QandA">
        <ul v-for="(item,index) in menuList"
            :key="index">
            <li v-for="(el,i) in item"
                @click="__do(el.link)"
                :class="{'disable':el.disable}"
                :key="i">{{el.title}}</li>

        </ul>
    </div>
</template>

<script>
import { mapState, mapMutations, mapActions } from 'vuex'
export default {
    data() {
        return {
            menuList: [
                [
                    {
                        title: this.$t('nav.setting'),
                        link: 'setting'
                    },
                    {
                        title: this.$t('nav.privacy'),
                        link: 'privacy'
                    }
                ],
                [
                    {
                        title: this.$t('nav.help'),
                        link: 'help'
                    },
                    {
                        title: this.$t('nav.lang'),
                        link: 'lang'
                    }
                ],

                [
                    {
                        title: this.$t('nav.logout'),
                        link: 'logout'
                    }
                ]
            ]
        }
    },
    components: {},
    computed: {
        ...mapState({
            userInfo: state => state.UserInfo.userInfo,
            token: state => state.UserInfo.token
        })
    },
    methods: {
        ...mapMutations(['GET_USER_INFO']),
        ...mapActions(['LOG_OUT']),
        __do(name) {
            if (name === 'logout') {
                this.LOG_OUT().then(() => {
                    this.GET_USER_INFO()
                    this.$router.push({
                        name: 'login'
                    })
                })
            } else {
                this.$router.push({
                    name
                })
            }
        },
        __setDisable() {
            let arr = ['logout', 'setting', 'privacy', 'help', 'lang']
            if (!this.token) {
                this.menuList.forEach(ele => {
                    ele.forEach(item => {
                        if (arr.includes(item.link)) {
                            this.$set(item, 'disable', true)
                        } else {
                            this.$set(item, 'disable', false)
                        }
                    })
                })
            }
        }
    },
    watch: {
        userInfo: {
            handler() {
                this.__setDisable()
            },
            immediate: true
        }
    },
    created() {}
}
</script>

<style  scoped lang='scss'>
.QandA {
    font-size: 12px;
    border: 1px solid #dbdcdc;
    background: #ffffff;
    .spec {
        color: #3f61a6;
    }
    width: 140px;
    > ul {
        > li {
            cursor: pointer;
            margin-top: 4px;
            height: 30px;
            line-height: 30px;
            padding: 0 10px;
        }
        li:hover {
            background: #ecf0f7;
        }
    }
    ul::after {
        content: '';
        display: block;
        border-bottom: 1px solid #dbdcdc;
        margin: 4px 10px 0;
    }
    > :nth-last-child(1)::after {
        border-bottom: none;
    }
    .disable {
        opacity: 0.4;
    }
}
</style>
