<template>
  <div v-if="$route.query.is==='1'&&show">
    <transition name="move">
      <div v-if="deal">
        <div v-if="!flag"
             class="notify">
          <div v-if="item.nickname">
            <strong>{{item.nickname}}</strong> 向你发送了好友请求
          </div>
          <div class="reqBtn">
            <span class="add cp"
                  @click="__add">接受</span>
            <span class='ignore cp'
                  @click="__ignore">删除</span>
          </div>
        </div>

        <div v-else>
          {{text}}
        </div>

      </div>

    </transition>
  </div>

</template>

<script>
import { mapState } from 'vuex'
import { setTimeout } from 'timers'

export default {
  props: {},
  data() {
    return {
      text: '',
      item: {},
      flag: false,
      show: false,
      deal: true
    }
  },
  components: {},
  computed: {
    ...mapState({
      userInfo: state => state.UserInfo.userInfo
    })
  },
  methods: {
    async __getDatas() {
      let req = {
        userId: this.userInfo.userId
      }
      let id = this.$route.query.id
      const res = await this.api.friendRequestList(req)
      if (res.msg === 'success') {
        let list = res.data
        let tempArr = list.filter(item => item.userId == id)
        if (tempArr.length) {
          this.item = tempArr[0]
          this.show = true
        } else {
          this.show = false
        }
      }
    },
    async __add() {
      let data = {
        friendId: this.item.userId,
        remarkName: '',
        userId: this.userInfo.userId
      }
      const res = await this.api.friendeAdd(data)
      if (res.msg === 'success') {
        this.flag = true
        this.text = '已同意'
      }
    },
    async __ignore() {
      let data = {
        requesterId: this.item.userId
      }
      const res = await this.api.friendeReject(data)
      if (res.msg === 'success') {
        this.flag = true
        this.text = '请求已删除'
      }
    }
  },
  watch: {
    $route: {
      handler() {
        this.__getDatas()
      },
      immediate: true
    },
    flag() {
      if (flag) {
        setTimeout(() => {
          this.deal = false
        }, 1500)
      }
    }
  },
  created() {}
}
</script>

<style lang='scss' scoped>
.move-enter-active,
.move-leave-active {
  // transform: translateY();
  transition: 0.8s;
}
.move-enter,
.move-leave-to {
  transform: translateY(-100%);
}
.notify {
  display: flex;
  font-size: 16px;
  justify-content: center;
  height: 70px;
  align-items: center;
}
.reqBtn {
  display: flex;
  margin-left: 20px;
  .add,
  .ignore {
    font-size: 12px;
    width: 50px;
    height: 18px;
    background: #d9d9da;
    text-align: center;
    margin-left: 10px;
  }
  .add {
    background: #3f61a6;
    color: #ffffff;
  }
  .active {
    color: #000;
    background: #dbdcdc;
  }
}
</style>
