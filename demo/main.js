import './promise'
import Vue from 'vue'
import Demo from './Demo.vue'

/* eslint-disable no-new */
Vue.config.productionTip = false
new Vue({
  el: '#app',
  components: {
    demo: Demo
  },
  render: h => h(Demo)
  //   template:'<Demo/>',
  //   components: { Demo }
})
