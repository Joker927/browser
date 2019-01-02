<template>
  <div class="tab mt16">

    <ul class="list ">
      <li class="lis cp"
          v-for="(el,index) in list"
          :key="index">
        <span class="icon"
              :class="el.class"></span>
        <p>{{el.name}}</p>
      </li>
    </ul>
    <div class="send">
      <div class="inputer">
        <img :src="userInfo.avatar"
             alt="">
        <p>name</p>
        <input placeholder="在想什么呢?">
      </div>
      <div class="menu">
        <div class="opt">
          <div class="album cp">
            <span class="icon"></span>相片/影片</div>
          <div class="emoji cp">
            <span class="icon"></span>
            表情符号</div>
          <div class="more cp">
            <span class="icon"></span>
          </div>
        </div>
        <div class="s cp">
          <span class="icon"></span>
        </div>
      </div>
    </div>
  </div>

</template>

<script>
import { mapState } from 'vuex'
export default {
  data() {
    return {
      list: [
        {
          name: '撰写贴文',
          class: 'news'
        },
        {
          name: '相片/影片相簿',
          class: 'album'
        },
        {
          name: '直播视讯',
          class: 'video'
        }
      ]
    }
  },
  components: {},
  computed: {
    ...mapState({
      userInfo: state => state.UserInfo.userInfo
    })
  }
}
</script>

<style lang='scss' scoped>
.tab {
  background: #fff;
}
.send {
  padding: 5px 20px;
  .inputer {
    display: flex;
    flex-wrap: nowrap;
    align-items: center;
    margin: 5px 0;
    height: 50px;
    border-bottom: 1px solid #eff0f0;
    img {
      width: 40px;
      height: 40px;
      border-radius: 50%;
      margin-right: 10px;
      overflow: hidden;
    }
    input {
      flex-grow: 1;
      resize: none;
      outline: none;
      border: none;
      padding: 5px;
      min-height: 100%;
    }
  }
  .menu {
    margin: 10px 0;
    height: 30px;
    display: flex;
    flex-wrap: nowrap;
    justify-content: space-between;
    .icon {
      display: inline-block;
      width: 18px;
      height: 18px;
      margin-right: 5px;
      background-size: 100% 100%;
    }
    .opt {
      display: flex;
      flex-wrap: nowrap;
      > div {
        border: 1px solid #c8c9c0;
        border-radius: 40px;
        padding: 0 8px;
        margin: 0 5px;
        background: #f7f7f7;
        display: flex;
        align-items: center;
        justify-content: center;
      }
      .album > .icon {
        background-image: url(./img/home_edit_film@3x.png);
      }

      .emoji > .icon {
        background-image: url(./img/home_edit_expression@3x.png);
      }
      .more > .icon {
        height: 4px;
        margin-right: 0px;
        background-image: url(./img/home_edit_more@3x.png);
      }
    }

    .s > .icon {
      height: 31px;
      width: 41px;
      background-image: url(./img/send.png);
    }
  }
}

.list {
  border: 1px solid #c8c9c0;
  display: flex;
  flex-wrap: nowrap;
  background: #f7f7f7;
  .lis {
    height: 30px;
    margin: 0 10px;
    display: flex;
    justify-content: center;
    align-items: center;
    .icon {
      width: 20px;
      height: 18px;
      margin-right: 5px;
      background-size: 100% 100%;
    }
    .news {
      background-image: url(./img/home_edit@3x.png);
    }
    .album {
      background-image: url(./img/home_camera@3x.png);
    }
    .video {
      background-image: url(./img/home_video@3x.png);
    }
    > p {
    }
  }
}
.more {
  font-size: 12px;
  color: #888888;
  margin-top: 20px;
  text-align: center;
  span {
    display: inline-block;
    padding-left: 20px;
    //   background: url(./img/home_seeMore@3x.png) no-repeat 0px center;
    background-size: 15px 8px;
    border: none;
  }
}
</style>
