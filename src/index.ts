import { App } from 'vue'
import SIcon, { isIconType } from './S-Icon/index'
import SIconSelect from './S-IconSelect/index'
import SEllipsis from './S-Ellipsis/index'

export {
  isIconType,
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
