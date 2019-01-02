<template>
  <div class="bg"
       v-if="$route.name==='feed'||$route.name==='user'">
    <div class="bgImg">
      <img :src="datas.avatar"
           alt="">
      <span></span>
    </div>
    <div class="info">
      <p>{{datas.nickname}}</p>
      <div class="avatar">
        <img v-if="datas.avatar"
             :src="datas.avatar"
             alt="">
      </div>
    </div>
    <div v-if="$route.name==='user'"
         class="opt">
      <div class="msg cp">发消息</div>
      <div class="add cp"
           v-if="datas.isFriend==='0'"
           @click="__add">加为好友</div>
      <div v-if="datas.isFriend==='1'"
           class="menu"
           @click="__opt">
        <div class="cp arrow">
          好友
        </div>
        <ul class="list"
            v-if="menuShow">
          <li @click="__del">删除好友</li>
        </ul>
      </div>

    </div>

  </div>
</template>
   


<script>
import { mapState } from 'vuex'

export default {
  data() {
    return {
      req: {
        id: ''
      },
      datas: {},
      menuShow: false
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
      if (this.$route.name === 'feed') {
        this.datas = this.userInfo
      } else if (this.$route.name === 'user') {
        this.req.id = this.$route.query.id
        const res = await this.api.userInfo(this.req)
        console.log(res, 'userInfo')
        this.datas = res.data
      }
    },
    async __add() {
      console.log(this.datas)
      let data = {
        requesterId: this.datas.userId
      }
      const res = await this.api.friendApply(data)
      if (res.msg == 'success') {
        this.__getDatas()
        this.$Toast('已发送请求')
      }
    },
    __opt() {
      this.menuShow = !this.menuShow
    },
    async __del() {
      let data = {
        ids: [this.datas.userId]
      }
      const res = await this.api.friendDelete(data)
      if (res.msg == 'success') {
        this.__getDatas()
        //  this.$Toast('已发送请求')
      }
    }
  },
  watch: {
    $route: {
      handler() {
        this.__getDatas()
      },
      immediate: true
    }
  },
  created() {}
}
</script>

<style lang='scss' scoped>
.bg {
  position: relative;
  height: 130px;
  background: #dbdcdc;
  > .bgImg {
    position: relative;
    height: 130px;
    overflow: hidden;
    > span {
      position: absolute;
      bottom: 0;
      left: 0;
      height: 50px;
      width: 100%;
      background-image: linear-gradient(
        rgba(0, 0, 0, 0) 0%,
        rgba(0, 0, 0, 0.1) 40%,
        rgba(0, 0, 0, 0.2) 80%
      );
    }
  }
  .info {
    position: absolute;
    right: 60px;
    bottom: -30px;
    display: flex;
    align-items: center;
    > p {
      margin-right: 10px;
      font-size: 20px;
      font-weight: bold;
      color: #ffffff;
    }

    .avatar {
      width: 120px;
      height: 120px;
      border-radius: 10px;
      background: #ffffff;
      overflow: hidden;
      border: 1px solid #888;
      img {
        width: 100%;
        height: 100%;
      }
    }
  }
  .opt {
    position: absolute;
    bottom: 10px;
    left: 10px;
    display: flex;
    font-size: 14px;
    line-height: 22px;

    .add,
    .arrow,
    .msg {
      text-align: center;
      height: 22px;
      padding: 0 10px 0 30px;
      background: #ffffff no-repeat 7px center;
      background-size: 16px 16px;
    }
    .msg {
      background-image: url('./img/chat@3x.png');
    }
    .add {
      margin-left: 20px;
      background-image: url('./img/friends@3x.png');
    }
    .arrow {
      position: relative;

      padding: 0 20px 0 25px;
      background-image: url('./img/friends@3x.png');
    }
    .arrow::before {
      content: '';
      position: absolute;
      top: 50%;
      right: 3px;
      width: 10px;
      height: 8px;
      margin-top: -4px;
      background-image: url('./img/arrow.svg');
      background-size: 100% 100%;
    }
    .menu {
      margin-left: 20px;
      position: relative;
      .list {
        background: #ffffff;
        position: absolute;
        right: 0px;
        top: 24px;
        border: 1px solid #f1f1f1;
        font-size: 12px;
        > li {
          cursor: pointer;
          padding: 0 4px;
        }
      }
    }
  }
}
</style>
