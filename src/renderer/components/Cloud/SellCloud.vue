<template>
  <div class="options">
    <p>新增空間分享方案</p>
    <div>
      <ul class="list">
        <li>
          <span class="title">時間</span>
          <div class="select">
            <span class="active cp">1個月</span>
            <span class="cp">2個月</span>
            <span class="cp">3個月</span>
            <span class="cp">半年</span>
            <span class="cp">1年</span>
          </div>
          <span class="tip">中途毀約將無法拿回25%保證金</span>
        </li>
        <li>
          <span class="title">分享空間</span>
          <div class="select">
            <input type="text"
                   placeholder="500">
            <span class="cp">mb</span>
            <span class="cp">gb</span>
            <span class="cp">tb</span>

          </div>
          <span class="tip">必須介於500mb~10tb之間</span>
        </li>

        <li>
          <span class="title">租賃定價</span>
          <div class="select">
            <input type="text"
                   placeholder="1">
            <span>GIT</span>
          </div>
          <span class="tip">
            <strong>需支付 <i class="color">5</i> GIT 保證金(25%)</strong>
            <span>,方案結束自動退回保證金</span></span>

        </li>
      </ul>
      <div class="btn">
        <div class="tip">
          <span>計費換算: 約 xxx mb 每 xxx 日</span>
          <span>現階市場均價:約 xxx mb 每 xxx 日</span>
        </div>
        <span></span>
        <div class="cp">
          <span>確認</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {},
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
.color {
  color: #3f61a6;
  font-style: normal;
  font-weight: bold;
}
.options {
  > p {
    margin: 20px 0 10px;
  }
  > div {
    border: 1px solid #e4e4e5;
    .list {
      .active {
        border: 1px solid #e4e4e5;
        color: #3f61a6;
        font-weight: bold;
      }
      > li {
        height: 30px;
        font-size: 12px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        border-bottom: 1px solid #e4e4e5;
        .title {
          padding: 0 20px;
        }
        .select {
          flex-grow: 1;
          display: flex;
          align-items: center;
          > * {
            padding: 0 10px;
            margin: 0 4px;
            border-radius: 12px;
          }
          > span {
            height: 24px;
            line-height: 24px;
          }
          > input {
            height: 24px;
            max-width: 60px;
            color: #3f61a6;
            border: 1px solid #e4e4e5;
          }
        }
        .btn {
          height: 30px;
          font-size: 14px;
          line-height: 30px;
          color: #fff;
          background: #3f61a6;
          padding: 0 10px;
        }
        .tip {
          font-size: 12px;
          color: #888888;
          margin-right: 4px;
          strong {
            font-weight: normal;
          }
          > span {
            font-size: 11px;
          }
        }
      }
    }
    > .btn {
      display: flex;
      justify-content: space-between;
      color: #fff;
      height: 28px;
      .tip {
        display: flex;
        font-size: 12px;
        span {
          padding: 0 10px;
        }
        span:nth-of-type(1) {
          line-height: 28px;
          background: #3e3a39;
        }
        span:nth-of-type(2) {
          color: #888;
          align-self: flex-end;
        }
      }

      > div:nth-of-type(2) {
        display: flex;
        span {
          width: 100px;
          height: 100%;
          line-height: 28px;
          text-align: center;
        }
        > span:nth-of-type(1) {
          background: #3f61a6;
        }
      }
    }
  }
}
</style>
