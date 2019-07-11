import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)
console.log(history)
export default new Router({
    routes: [
        {
            path: '/login',
            name: 'login',
            component: require('@/view/Login').default
        },
        {
            path: '/',
            name: 'index',
            redirect: '/home',
            component: require('@/view/Index').default,
            children: [
                {
                    path: '/home',
                    name: 'home',
                    redirect: '/feed',
                    component: require('@/view/Home').default,
                    children: [
                        {
                            path: '/feed',
                            name: 'feed',
                            component: require('@/components/Main/Feed').default
                        },
                        {
                            path: '/user',
                            name: 'user',
                            component: require('@/components/Main/Feed').default
                        },
                        {
                            path: '/requests/:type',
                            name: 'requests',
                            component: require('@/components/Main/Requests')
                                .default
                        },
                        {
                            path: '/recommend/group',
                            name: 'group',
                            component: require('@/components/Main/RecommendDetails')
                                .default
                        },
                        {
                            path: '/recommend/friends',
                            name: 'friends',
                            component: require('@/components/Main/RecommendDetails')
                                .default
                        },
                        {
                            path: '/dynamic',
                            name: 'dynamic',
                            component: require('@/components/Main/DynamicNotify')
                                .default
                        },
                        {
                            path: '/search',
                            name: 'search',
                            component: require('@/components/Main/FeedSearch')
                                .default
                        },
                        {
                            path: '/rewardList/:dynamicId',
                            name: 'rewardList',
                            component: require('@/components/Main/FeedRewardList')
                                .default
                        }
                    ]
                },

                {
                    path: '/userSetting',
                    name: 'settings',
                    component: require('@/view/UserSetting').default,
                    children: [
                        {
                            path: '/userSetting',
                            name: 'setting',
                            component: require('@/components/User/UserSetting')
                                .default
                        },
                        {
                            path: '/userHelp',
                            name: 'help',
                            component: require('@/components/User/UserHelp')
                                .default
                        },
                        {
                            path: '/userLang',
                            name: 'lang',
                            component: require('@/components/User/UserLang')
                                .default
                        },
                        {
                            path: '/userPrivacy',
                            name: 'privacy',
                            component: require('@/components/User/UserPrivacy')
                                .default
                        }
                    ]
                },
                {
                    path: '/collection/:type/:index',
                    name: 'collection',
                    component: require('@/components/Collection/Pages').default
                },
                {
                    path: '/cloud/:type',
                    name: 'cloud',
                    component: require('@/view/Cloud').default
                },
                {
                    path: '/cloudSpace',
                    name: 'cloudSpace',
                    redirect: '/cloudSpaceAllFile',
                    component: require('@/view/cloudSpace').default,
                    children: [
                        {
                            path: '/cloudSpaceAllFile',
                            name: 'cloudSpaceAllFile',
                            component: require('@/components/Cloud/AllFile')
                                .default
                        },
                        {
                            path: '/cloudSpaceImg',
                            name: 'cloudSpaceImg',
                            component: require('@/components/Cloud/cloudSpaceImg')
                                .default
                        },
                        {
                            path: '/cloudSpaceDoc',
                            name: 'cloudSpaceDoc',
                            component: require('@/components/Cloud/cloudSpaceDoc')
                                .default
                        },
                        {
                            path: '/cloudSpaceLetter',
                            name: 'cloudSpaceLetter',
                            component: require('@/components/Cloud/cloudSpaceLetter')
                                .default
                        },
                        {
                            path: '/cloudSpaceMusic',
                            name: 'cloudSpaceMusic',
                            component: require('@/components/Cloud/cloudSpaceMusic')
                                .default
                        }
                    ]
                },
                {
                    path: '/wallet',
                    name: 'wallet',
                    redirect: '/personalWorks',
                    component: require('@/view/Wallet').default,
                    children: [
                        {
                            path: '/myWallet',
                            name: 'myWallet',
                            component: require('@/components/Wallet/MyWallet')
                                .default
                        },
                        {
                            path: '/currencyDetail/:currency',
                            name: 'currencyDetail',
                            component: require('@/components/Wallet/currencyDetail')
                                .default
                        },
                        {
                            path: '/personalWorks',
                            name: 'personalWorks',
                            component: require('@/components/Wallet/PersonalWorks')
                                .default
                        },
                        {
                            path: '/giveSet',
                            name: 'giveSet',
                            component: require('@/components/Wallet/GiveSet')
                                .default
                        },
                        {
                            path: '/bill',
                            name: 'bill',
                            component: require('@/components/Wallet/Bill')
                                .default
                        },
                        {
                            path: '/Recharge',
                            name: 'Recharge',
                            component: require('@/components/Wallet/Recharge')
                                .default
                        },
                        // {
                        //     path: '/myMoneyCode',
                        //     name: 'myMoneyCode',
                        //     component: require('@/components/Wallet/MyMoneyCode')
                        //         .default
                        // },
                    ]
                }
            ]
        },
        {
            path: '/load',
            name: 'forceRefresh',
            component: require('@/components/Loading').default
        },
        {
            path: '*',
            redirect: '/'
        }
    ]
})
