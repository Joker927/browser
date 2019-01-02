<template>
  <div class="menuList">
    <div class="item"
         v-for="(item,index) in list"
         :key="index">
      <div class="title">
        <i class="icon"
           :class="item.class"></i>
        <span class="name">{{item.name}}</span>
        <i class="setting cp"></i>
      </div>
      <ul class="list">
        <li class="lis cp">
          <img class="img"
               src="./img/home_collect@3x.png"
               alt="">
          <span class="name">lkadaanfsmn </span>
        </li>
      </ul>
      <CheckMore></CheckMore>
    </div>
  </div>

</template>

<script>
import CheckMore from '@/components/CheckMore'
export default {
  data() {
    return {
      list: [
        {
          name: '我的最爱',
          class: 'favorite'
        },
        {
          name: '收藏应用',
          class: 'collect'
        },
        {
          name: '我的应用',
          class: 'application'
        }
      ]
    }
  },
  components: { CheckMore }
}
</script>

<style lang='scss' scoped>
.menuList {
  padding: 20px 0;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
}
.item {
  padding: 20px 0;
}
.title {
  display: flex;
  flex-wrap: nowrap;
  align-items: center;
  height: 20px;
  .icon,
  .setting {
    background-size: 100% 100%;
  }
  .icon {
    width: 20px;
    height: 20px;
  }

  .name {
    font-size: 14px;
    line-height: 20px;
    min-width: 160px;
    padding-left: 1px;
    display: inline-block;
  }
  .setting {
    width: 20px;
    height: 20px;
    background-image: url(./img/home_setting@3x.png);
  }
  .favorite {
    background-image: url(./img/home_myFavorite@3x.png);
  }
  .collect {
    background-image: url(./img/home_collect@3x.png);
  }
  .application {
    background-image: url(./img/home_myApplication@3x.png);
  }
}
.list {
  margin-left: 32px;
  .lis {
    height: 26px;
    line-height: 26px;
    margin-top: 4px;
    display: flex;
    align-items: center;
    .img {
      width: 20px;
      height: 20px;
      margin-right: 4px;
    }
  }
}
</style>
