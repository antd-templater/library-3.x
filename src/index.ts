import { App } from 'vue'
import SForm from '@/lib/S-Form/index'
import STable from '@/lib/S-Table/index'

export default {
  install(app: App) {
    app.component('SForm', SForm)
    app.component('STable', STable)
  }
}
