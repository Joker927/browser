<template>
  <div class="recommend">
    <div class="list mt16"
         v-if="$route.name!=='friends'">
      <h4>你可能认识的朋友</h4>
      <ul>
        <li class="lis"
            v-for="(item,index) in recommendList[0]"
            :key="index">
          <router-link tag="div"
                       class="info cp"
                       :to="{name:'user',query:{id:item.userId}}">
            <img :src="item.avatar"
                 alt="">
            <p class="name">{{item.nickname}}</p>
          </router-link>
          <ButtonFirend :item='item'
                        type='recommend'></ButtonFirend>
        </li>
      </ul>
      <CheckMore @check="__jump('friends')"
                 class="more"></CheckMore>
    </div>
    <div class="list mt16"
         v-if="$route.name!=='group'">
      <h4>推荐群组</h4>
      <ul>
        <li class="lis"
            v-for="(item,index) in recommendList[1]"
            :key="index">
          <img :src="item.avatar"
               alt="">
          <p class="name">{{item.groupName}}</p>
          <ButtonGroup type='recommend'
                       :item='item'
                       :typeCount='0'></ButtonGroup>
        </li>

      </ul>
      <CheckMore @check="__jump('group')"
                 class="more"></CheckMore>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import ButtonFirend from './ButtonFirend'
import ButtonGroup from './ButtonGroup'
import CheckMore from '@/components/CheckMore'
export default {
  data() {
    return {
      req: {
        num: 5,
        userId: 0
      },
      recommendList: [[], []]
    }
  },
  components: { CheckMore, ButtonFirend, ButtonGroup },
  computed: {
    ...mapState({
      userInfo: state => state.UserInfo.userInfo
    })
  },
  methods: {
    async __getDatas() {
      this.req.userId = this.userInfo.userId
      const res = await Promise.all([
        this.api.recommendFriendes(this.req),
        this.api.recommendGroup(this.req)
      ])
      this.$set(this.recommendList, [0], res[0].data)
      this.$set(this.recommendList, [1], res[1].data)
    },
    async __add(item) {
      let data = {
        friendId: item.userId,
        remarkName: '',
        userId: this.userInfo.userId
      }
      const res = await this.api.friendeAdd(data)
      this.$set(item, 'flag', true)
    },
    __jump(w) {
      this.$router.push({
        name: w
      })
    }
  },
  created() {
    this.__getDatas()
  }
}
</script>

<style lang='scss' scoped>
.recommend {
  width: 100%;
  background: #eeeeef;
  display: flex;
  flex-wrap: wrap;
  padding-left: 16px;
  .list {
    background: #fff;
    width: 100%;
    padding: 12px 10px 12px 20px;
    > h4 {
      height: 30px;
      font-size: 14px;
      line-height: 30px;
      background: url('./img/home_setting@3x.png') no-repeat right center;
      background-size: 14px 14px;
    }
    .lis {
      display: flex;
      align-items: center;
      margin: 10px 0;
      //  justify-content: space-between;
      .info {
        display: flex;
        align-items: center;
      }
      img {
        width: 40px;
        height: 40px;
        border-radius: 50%;
        margin-right: 10px;
        background: #dbdcdc;
      }
      .name {
        width: 140px;
        margin: 0 10px;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
      }
      .btn {
        font-size: 12px;
        font-weight: bold;
        text-align: center;
        color: #fff;
        width: 50px;
        height: 18px;
        background: #3f61a6;
        margin-left: 10px;
      }
      .active {
        background: #dbdcdc;
      }
    }
  }
  .more {
    text-align: left;
  }
}
</style>
