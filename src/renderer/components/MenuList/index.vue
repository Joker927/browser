<template>
  <div class="menu">
    <Item></Item>
  </div>
</template>

<script>
import Item from './Item'
export default {
  data() {
    return {}
  },
  components: { Item }
}
</script>

<style lang='scss' scoped>
.menu {
  width: 25%;
  background: #eeeeef;
}
</style>
