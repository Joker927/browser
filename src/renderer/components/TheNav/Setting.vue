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
            title: '打开新分页',
            link: ''
          },
          {
            title: '历史纪录',
            link: ''
          },
          {
            title: '下载内容',
            link: ''
          },
          {
            title: '书签',
            link: ''
          }
        ],
        [
          {
            title: '打印',
            link: ''
          },
          {
            title: '投射',
            link: ''
          },
          {
            title: '查找',
            link: ''
          },
          {
            title: '辅助',
            link: ''
          }
        ],

        [
          {
            title: '发布网站',
            link: ''
          },
          {
            title: '发布应用',
            link: ''
          }
        ],
        [
          {
            title: '建立廣告',
            link: 'createAd'
          },
          {
            title: '在 Angel 上刊登廣告',
            link: 'ad'
          }
        ],

        [
          {
            title: '活動紀錄',
            link: 'history'
          },
          {
            title: '動態消息偏好設定',
            link: 'news'
          },
          {
            title: '設定',
            link: 'setting'
          },
          {
            title: '登出',
            link: 'logout'
          },
          {
            title: '退出',
            link: 'exit'
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
    ...mapActions(['REMOVE_USER_INFO']),
    __do(s) {
      switch (s) {
        case 'logout':
          this.REMOVE_USER_INFO().then(() => {
            this.GET_USER_INFO()
            this.$router.push('/login')
          })

        //location.reload()
      }
    },
    __setDisable() {
      let arr = ['logout', 'setting', 'news', 'history', 'ad', 'createAd']
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
  padding: 10px;
  // width: 114px;
  border: 1px solid #dbdcdc;
  background: #ffffff;
  .spec {
    color: #3f61a6;
  }
  > ul {
    padding: 10px 0;
    border-bottom: 1px solid #dbdcdc;
    > li {
      cursor: pointer;
      margin-top: 4px;
    }
  }
  > :nth-last-child(1) {
    border-bottom: none;
  }
  .disable {
    opacity: 0.4;
  }
}
</style>
