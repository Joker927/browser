<template>
  <div class="title">
    <span class="icon"></span>
    <p>天使雲空間管理</p>
  </div>
</template>

<script>
export default {
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
.title {
  font-size: 18px;
  display: flex;
  height: 88px;
  .icon {
    width: 40px;
    height: 40px;
    background-size: 100% 100%;
    background-image: url('./img/head_mai@3x.png');
    margin-top: 24px;
  }
  > p {
    padding-left: 14px;
    line-height: 88px;
  }
}
</style>
