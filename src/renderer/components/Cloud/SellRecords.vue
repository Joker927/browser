<template>
  <div class="options">
    <p>空間紀錄</p>
    <div>
      <ul class="list">
        <li>
          <span class="title active">日期排序</span>
          <div class="select">
            <span class="cp">空間</span>
            <span class="cp">單價</span>
            <span class="cp">只顯示租出</span>
            <span class="cp">只顯示未租出</span>
            <span class="cp">只顯示完成</span>
          </div>
        </li>
      </ul>
      <ul class="result">
        <li class="cp"
            v-for="(item,index) in 3"
            :key="index">
          <div class="not">
            <span>方案{{index+1}}</span>
            <span>1個月</span>
            <span>500mb</span>
            <span>20 GIT</span>
            <span>約 xxx mb 每 xxx 日</span>
            <span>未租出</span>
          </div>
          <div>
            <span>申請撤銷</span>
            <span>上架日期: 2018年9月2日22:00</span>
            <span>申請撤銷: 2018年12月3日21:00</span>
            <span>複製</span>
          </div>
        </li>
      </ul>
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
        border-radius: 12px;
      }
      > li {
        height: 30px;
        font-size: 12px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        border-bottom: 1px solid #e4e4e5;
        .title {
          margin: 0 4px;
          padding: 0 6px;
          height: 24px;
          line-height: 24px;
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
            border: 1px solid #e4e4e5;
            height: 24px;
            max-width: 60px;
            color: #3f61a6;
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
      > li {
        font-size: 14px;
        .not {
          background: #3e3a39;
          color: #fff;
        }
        .ing {
          background: #3f61a6;
          color: #fff;
        }
        .complete {
          background: #f7f7f7;
        }
        > div {
          padding: 0 10px;
          height: 32px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          border-bottom: 1px solid #e4e4e5;
        }
      }
    }
  }
}
</style>
