import { App } from 'vue'
import SIconSelect from './S-IconSelect/index'
import SEllipsis from './S-Ellipsis/index'
import SIcon from './S-Icon/index'

export {
  SIconSelect,
  SEllipsis,
  SIcon
}

export default {
  install(app: App) {
    app.component('SIconSelect', SIconSelect)
    app.component('SEllipsis', SEllipsis)
    app.component('SIcon', SIcon)
  }
}
