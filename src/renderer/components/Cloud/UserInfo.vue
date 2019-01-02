<template>
  <div class="userInfo">
    <div class="img"><img src=""
           alt="">

    </div>
    <div>
      <p>我的紀錄</p>
    </div>
    <div>

      <p>已上架 20 項方案</p>
      <p>已租出 14 項方案</p>
      <p>平均定價:</p>
      <p>約 xxx mb 每 xxx 日</p>
    </div>
    <div class="img num">
      100%
    </div>
    <div>
      <p>6個月之內毀約 0 項方案</p>
      <p>信用指數: 100%</p>
    </div>
    <div>
      <p>天使雲等級: 15</p>
      <div class="progressBar">
        <div class="progress"
             :style="{width:'60%'}"></div>
      </div>
      <div class="tips">
        EXP依照每日租出空間提升<br>現階1152/1500
      </div>
    </div>
  </div>
</template>

<script>
import { mapMutations, mapState } from 'vuex'
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

<style scoped lang='scss'>
.userInfo {
  width: 100%;
  height: 660px;
  padding: 30px;
  background: #f7f7f7;
  border: 1px solid #e6e6e7;
  display: flex;
  text-align: center;
  flex-direction: column;
  font-weight: bold;
  > div {
    margin: 20px 0;
  }
  .img {
    width: 64px;
    height: 64px;
    border-radius: 50%;
    background: #000;
    margin: 0 auto;
  }
  .num {
    margin-top: 30px;
    background: #3f61a6;
    font-size: 20px;
    color: #fff;
    line-height: 64px;
  }
  .progressBar {
    margin-top: 20px;
    position: relative;
    width: 100%;
    height: 16px;
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
  .tips {
    margin-top: 10px;
    font-size: 12px;
    color: #888888;
    line-height: 1.5;
    font-weight: normal;
  }
}
</style>
