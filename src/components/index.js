import Vue from 'vue'
import Topbar from './topbar/index.vue'
import WeCheckbox from './checkbox/index.vue'
import WeRadio from './radio/index.vue'

// const components = {
//   Topbar,
//   WeCheckbox,
//   WeRadio,
// }
Vue.component('Topbar', Topbar)
Vue.component('WeCheckbox', WeCheckbox)
Vue.component('WeRadio', WeRadio)

// const install = (Vue) => {
//   if (install.installed) return
//   components.forEach((component) => {
//     Vue.component(component.name, component)
//   })
// }

// if (typeof global !== 'undefined' && global.Vue) {
//   install(global.Vue)
// }
// export default {
//   install,
// }
