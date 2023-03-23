import { App } from 'vue'
import { SIcon, isIconType } from './S-Icon/index'
import { SForm, formGroupsDefiner, formValidator } from './S-Form/index'
import { SEditCellDatePicker } from './S-EditCell/date-picker'
import { SEditCellTreeSelect } from './S-EditCell/tree-select'
import { SEditCellTextarea } from './S-EditCell/textarea'
import { SEditCellSelect } from './S-EditCell/select'
import { SEditCellInput } from './S-EditCell/input'
import { SIconSelect } from './S-IconSelect/index'
import { SEllipsis } from './S-Ellipsis/index'
import { STree } from './S-Tree/index'

export {
  isIconType,
  formGroupsDefiner,
  formValidator,
  SEditCellInput,
  SEditCellSelect,
  SEditCellTextarea,
  SEditCellTreeSelect,
  SEditCellDatePicker,
  SIconSelect,
  SEllipsis,
  STree,
  SForm,
  SIcon
}

export default {
  install(app: App) {
    app.component('SEditCellInput', SEditCellInput)
    app.component('SEditCellSelect', SEditCellSelect)
    app.component('SEditCellTextarea', SEditCellTextarea)
    app.component('SEditCellTreeSelect', SEditCellTreeSelect)
    app.component('SEditCellDatePicker', SEditCellDatePicker)
    app.component('SIconSelect', SIconSelect)
    app.component('SEllipsis', SEllipsis)
    app.component('SForm', STree)
    app.component('SForm', SForm)
    app.component('SIcon', SIcon)
  }
}
