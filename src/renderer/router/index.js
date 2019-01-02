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
              component: require('@/components/MainFeed/Feed').default
            },
            {
              path: '/user',
              name: 'user',
              component: require('@/components/MainFeed/Feed').default
            },
            {
              path: '/requests/:type',
              name: 'requests',
              component: require('@/components/MainFeed/Requests').default
            },
            {
              path: '/recommend/group',
              name: 'group',
              component: require('@/components/MainFeed/RecommendDetails')
                .default
            },
            {
              path: '/recommend/friends',
              name: 'friends',
              component: require('@/components/MainFeed/RecommendDetails')
                .default
            }
          ]
        },
        {
          path: '/cloud',
          name: 'cloud',
          component: require('@/view/Cloud').default
        }
      ]
    },

    {
      path: '*',
      redirect: '/'
    }
  ]
})
