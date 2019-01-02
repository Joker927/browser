<template>

  <div class="more">
    <span class="cp"
          @click="__check">查看更多</span>
  </div>

</template>

<script>
export default {
  data() {
    return {}
  },
  components: {},
  methods: {
    __check() {
      this.$emit('check')
    }
  }
}
</script>

<style lang='scss' scoped>
.more {
  color: #888888;
  margin-top: 10px;
  text-align: center;
  span {
    display: inline-block;
    padding-left: 20px;
    background: url(./img/home_seeMore@3x.png) no-repeat 0px center;
    background-size: 20px 20px;
  }
}
</style>
