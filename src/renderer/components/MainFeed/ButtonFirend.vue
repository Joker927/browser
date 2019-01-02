<template>

  <div class="reqBtn">
    <span class="add cp NAV_MENU"
          v-if="!item.flag"
          @click="__add(item)">{{text}}</span>
    <span class="add cp active NAV_MENU"
          v-else>{{text1}}</span>
    <span class='ignore cp NAV_MENU'
          v-if="type=='request'&&!item.flag"
          @click="__ignore(item)">删除</span>
  </div>

</template>

<script>
import { mapState } from 'vuex'

export default {
  props: {
    item: {
      type: Object
    },
    type: {
      type: String,
      default: 'request'
    }
  },
  data() {
    return {
      text1: ''
    }
  },
  components: {},
  computed: {
    ...mapState({
      userInfo: state => state.UserInfo.userInfo
    }),
    text() {
      if (this.type === 'request') return '确认'
      return '添加'
    }
  },
  methods: {
    async __add(item) {
      let data, res
      if (this.type === 'request') {
        data = {
          friendId: item.userId,
          remarkName: '',
          userId: this.userInfo.userId
        }
        res = await this.api.friendeAdd(data)
        this.text1 = '已添加'
      } else {
        data = {
          requesterId: item.userId
        }
        res = await this.api.friendApply(data)
        this.text1 = '已请求'
      }
      this.$set(item, 'flag', true)
    },
    async __ignore(item) {
      let data = {
        requesterId: item.userId
      }
      const res = await this.api.friendeReject(data)
      this.$set(item, 'flag', true)
      this.text1 = '已拒绝'
    }
  },
  created() {}
}
</script>

<style lang='scss' scoped>
.reqBtn {
  display: flex;
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
    background: #dbdcdc;
    color: #000;
  }
}
</style>
