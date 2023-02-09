import { App } from 'vue'
import SIcon from '@/lib/S-Icon/index'

export default {
  install(app: App) {
    app.component('SIcon', SIcon)
  }
}
