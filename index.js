import Topbar from './src/components/topbar/index.vue'
import WeCheckbox from './src/components/checkbox/index.vue'
import WeRadio from './src/components/radio/index.vue'

const components = [
  Topbar,
  WeCheckbox,
  WeRadio,
]
// Vue.component('Topbar', Topbar)
// Vue.component('WeCheckbox', WeCheckbox)
// Vue.component('WeRadio', WeRadio)

const install = (Vue) => {
  if (install.installed) return
  components.forEach((component) => {
    Vue.component(component.name, component)
  })
}

if (typeof global !== 'undefined' && global.Vue) {
  install(global.Vue)
}
export default {
  install,
}
