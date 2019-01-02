<template>
  <transition name="fade">
    <div v-if="visible"
         class="toast">
      <p class="content"
         v-html="txt"></p>
    </div>
  </transition>

</template>

<script>
export default {
  name: 'Toast',

  data() {
    return {
      visible: false
    }
  },
  methods: {
    show(txt) {
      this.txt = txt
      this.visible = true
      setTimeout(() => {
        this.visible = false
      }, 2000)
    }
  },
  components: {}
}
</script>

<style lang='scss' scoped>
.toast {
  position: fixed;
  top: 90px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 999;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 600px;
  height: 60px;
  background-color: #ffffff;
  box-shadow: 0px 0px 14px 7px rgba(36, 36, 36, 0.3);
  border-radius: 15px;
  border: solid 1px #b5b5b5;
}
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>
