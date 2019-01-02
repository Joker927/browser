<template>
  <div class="sideBtn">
    <div></div>
    <span class="cp"
          @click="__do">
      <span class="triangle"></span>
    </span>
  </div>
</template>

<script>
import { mapMutations } from 'vuex'

export default {
  data() {
    return {}
  },
  methods: {
    ...mapMutations(['SET_MAIL_STATE']),
    __do() {
      this.SET_MAIL_STATE()
    }
  },
  components: {},
  mounted() {}
}
</script>

<style lang='scss' scoped>
.sideBtn {
  bottom: 0;
  width: 28px;
  display: flex;
  align-items: center;
  > div {
    width: 12px;
    height: 100%;
    background: rgba($color: #000000, $alpha: 0.5);
  }
  > span {
    position: relative;
    height: 120px;
    width: 16px;
    background: rgba($color: #000000, $alpha: 0.5);
    padding-left: 20px;
    background-size: 20px 20px;
    border-radius: 0 6px 6px 0;
  }
  .triangle {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    width: 0;
    height: 0;
    border-top: 10px solid transparent;
    border-bottom: 10px solid transparent;
    // border-right: 10px solid blue;
    border-left: 10px solid #ffffff;
  }
}
.abs {
  position: absolute;
  right: -28px;
  top: 0;
  .triangle {
    border-left: none;
    border-right: 10px solid #ffffff;
  }
}
.fixed {
  position: fixed;
  left: 0;
  top: 80px;
}
</style>
