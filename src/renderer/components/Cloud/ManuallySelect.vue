<template>
  <div class="options">
    <p>選擇購買空間</p>
    <div>
      <ul class="list">
        <li>
          <span class="title">時間節選</span>
          <div class="select">
            <span class="cp">1個月</span>
            <span class="cp">2個月</span>
            <span class="cp">3個月</span>
            <span class="cp">半年</span>
            <span class="cp">1年</span>
          </div>
          <span class="tip">可複選</span>
          <span class="btn cp">貼上方案</span>
        </li>
        <li>
          <span class="title">空間範圍</span>
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
          <div class="select">
            <span class="cp">綜合排序</span>
            <span class="cp">價位</span>
            <span class="cp">信用</span>
            <span class="cp">賣家等級</span>
            <span class="cp">平均速度</span>
          </div>
          <span class="btn cp">刷新</span>
        </li>
      </ul>
      <ul class="result">
        <li class="cp"
            v-for="(item,index) in 3"
            :key="index">
          <div class="img"><img src=""
                 alt=""></div>
          <span>NameOfProvider</span>
          <span>Lv20</span>
          <span>100 GIT</span>
          <span>1個月</span>
          <span>500mb</span>
          <span>平均網速2mbps</span>
          <span>信用90%</span>
        </li>

      </ul>
      <div class="btn">
        <div class="pagination">
          <div class="prev"></div>
          <p>Page</p>
          <ul>
            <li v-for="(el,index) in 10"
                :key="index">{{index}} </li>
          </ul>
          <div class="next"></div>
        </div>
        <div>
          <span class="tip">1GIT計費換算: 約 xxx mb 每 xxx 日</span>

          <span class="cp">確認</span>
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
        }
      }
    }
    .result {
      padding: 6px 20px;
      display: flex;
      flex-direction: column;
      .img {
        width: 20px;
        height: 20px;
        border-radius: 50%;
        overflow: hidden;
        background: #000;
      }
      > li {
        font-size: 14px;
        padding: 4px 0;
        display: flex;
        justify-content: space-between;
      }
    }
    > .btn {
      display: flex;
      justify-content: space-between;
      color: #fff;
      align-items: center;
      height: 28px;
      .tip {
        background: #3e3a39;
        padding: 0 10px;
        font-size: 12px;
      }
      .pagination {
        color: #000000;
        height: 100%;
        display: flex;
        align-items: center;
        > ul {
          display: flex;
          align-items: center;
          > li {
            padding: 0 3px;
          }
        }
        .prev,
        .next {
          width: 30px;
          height: 100%;
          background-size: 20px 20px;
          background-repeat: no-repeat;
          background-position: center;
        }
        .prev {
          background-image: url('./img/icon_64@2x.png');
        }
        .prevA {
          background-image: url('./img/icon_67@2x.png');
        }
        .next {
          background-image: url('./img/icon_65@2x.png');
        }
        .nextA {
          background-image: url('./img/icon_68@2x.png');
        }
      }
      > div {
        display: flex;
        height: 100%;
        align-items: center;
        span {
          text-align: center;
          height: 100%;
          line-height: 28px;
        }
        > span:nth-of-type(1) {
          background: #3e3a39;
        }
        > span:nth-of-type(2) {
          width: 100px;
          background: #3f61a6;
        }
      }
    }
  }
}
</style>
