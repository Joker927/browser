<template>
  <div class="column">
    <RequestNotify></RequestNotify>

    <Head></Head>
    <div class="mainContent">
      <div class="l">
        <router-view></router-view>
      </div>
      <div class="r">
        <Recommend></Recommend>
      </div>
    </div>

  </div>
</template>

<script>
import { mapState } from 'vuex'
import RequestNotify from './RequestNotify'
import Head from './Head'
import Recommend from './Recommend'

export default {
  data() {
    return {}
  },
  components: { RequestNotify, Head, Recommend },
  computed: {
    ...mapState({
      userInfo: state => state.UserInfo.userInfo
    })
  },
  watch: {
    $route: {
      handler() {
        console.log(this.$route)
      },
      immediate: true
    }
  },
  created() {}
}
</script>

<style lang='scss' scoped>
.column {
  width: 75%;
  background: #eeeeef;

  .mainContent {
    display: flex;
    flex-wrap: wrap;
    .l {
      width: 62.5%;
    }
    .r {
      width: 37.5%;
    }
  }
}
</style>
