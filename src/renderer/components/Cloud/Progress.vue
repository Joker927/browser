<template>
  <div class="progressWrap">
    <div class="title"
         v-if="type==1">
      <span>可用的空間</span>
      <span>已使用 2.5 gb / 總共 5 gb</span>
    </div>
    <div class="title"
         v-else>
      <span>提供的空間</span>
      <span>租出 1.25 gb / 總上架 5 gb</span>
    </div>
    <div class="progressBar">
      <div class="progress"
           :style="{width:'30%'}"></div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    type: {
      type: Number
    }
  },
  data() {
    return {}
  },
  components: {},
  computed: {},
  methods: {},
  watch: {},
  created() {}
}
</script>

<style lang='scss'  scoped>
.progressWrap {
  .title {
    font-size: 14px;
    display: flex;
    height: 50px;
    line-height: 50px;
    justify-content: space-between;
  }
  .progressBar {
    position: relative;
    width: 100%;
    height: 24px;
    background: #eeeeef;
    border-radius: 20px;
    overflow: hidden;
    .progress {
      position: absolute;
      top: 0;
      left: 0;
      height: 100%;
      border-radius: 20px;
      background: #3f61a6;
    }
  }
}
</style>
