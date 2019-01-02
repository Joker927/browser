<template>
  <div class="QandA">
    <div class="t">
      <span>快速说明</span>
      <span class="spec cp">使用说明</span>
    </div>

    <div class="search">
      <input type="text"
             placeholder="我们该如何提供协助？">
      <span class="icon"></span>
    </div>
    <p class="tip">关于此粉丝专页的使用说明</p>
    <ul>
      <li>首页</li>
      <li>动态报时</li>
      <li>聊天与讯息</li>
      <li>帐号安全</li>
      <li>隐私</li>
    </ul>
    <div class="line"></div>
    <ul>
      <li>隐私设定检查</li>
      <li>隐私捷径</li>
      <li>支援收件匣</li>
      <li>回报问题</li>
    </ul>
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

<style  scoped lang='scss'>
.QandA {
  font-size: 12px;
  padding: 10px;
  width: 180px;
  border: 1px solid #dbdcdc;
  background: #ffffff;
  .spec {
    color: #3f61a6;
  }
  > ul {
    margin: 4px 0;
    > li {
      margin-top: 4px;
      cursor: pointer;
    }
  }
  .line {
    margin: 6px 0;
  }
  .t {
    display: flex;
    justify-content: space-between;
  }
  .tip {
    color: #b4b4b5;
  }
  .search {
    position: relative;
    margin: 8px 0;
    input {
      height: 22px;
      width: 100%;
      padding-left: 4px;
      line-height: 22px;
    }
    ::placeholder {
      color: #b4b4b5;
    }
    .icon {
      position: absolute;
      top: 0;
      right: 4px;
      width: 20px;
      height: 20px;
      background: url('./img/icon_9@2x.png') no-repeat;
      background-size: 100% 100%;
      opacity: 0.5;
    }
  }
}
</style>
