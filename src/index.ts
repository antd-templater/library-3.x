import { App } from 'vue'
import SIcon from './S-Icon/index'
import SEllipsis from './S-Ellipsis/index'

export {
  SIcon,
  SEllipsis
}

export default {
  install(app: App) {
    app.component('SIcon', SIcon)
    app.component('SEllipsis', SEllipsis)
  }
}
