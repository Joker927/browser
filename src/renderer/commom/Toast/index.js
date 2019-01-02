import Vue from 'vue'
import Toast from './Toast.vue'
const toast = Vue.extend(Toast)

Toast.install = function(options) {
  if (options === undefined || options === null) {
    options = {
      content: ''
    }
  } else {
    options = {
      content: options
    }
  }

  let instance = new toast({
    data: options
  }).$mount()

  document.body.appendChild(instance.$el)

  Vue.nextTick(() => {
    instance.visible = true
  })
}

export default Toast
