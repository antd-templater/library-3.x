import { App } from 'vue'
import { SIcon, isIconType, forIconType } from './S-Icon/index'
import { SForm, formGroupsDefiner, formValidator } from './S-Form/index'
import { SEditCellDatePicker } from './S-EditCell/date-picker'
import { SEditCellTreeSelect } from './S-EditCell/tree-select'
import { SEditCellTextarea } from './S-EditCell/textarea'
import { SEditCellSelect } from './S-EditCell/select'
import { SEditCellInput } from './S-EditCell/input'
import { SIconSelect } from './S-IconSelect/index'
import { SEllipsis } from './S-Ellipsis/index'
import { STable } from './S-Table/index'
import { STree } from './S-Tree/index'

export {
  isIconType,
  forIconType,
  formValidator,
  formGroupsDefiner,

  SEditCellInput,
  SEditCellSelect,
  SEditCellTextarea,
  SEditCellTreeSelect,
  SEditCellDatePicker,
  SIconSelect,
  SEllipsis,
  STable,
  STree,
  SForm,
  SIcon
}

export default {
  install(app: App) {
    app.provide('isIconType', isIconType)
    app.provide('forIconType', forIconType)
    app.provide('formValidator', formValidator)
    app.provide('formGroupsDefiner', formGroupsDefiner)

    app.component('SEditCellInput', SEditCellInput)
    app.component('SEditCellSelect', SEditCellSelect)
    app.component('SEditCellTextarea', SEditCellTextarea)
    app.component('SEditCellTreeSelect', SEditCellTreeSelect)
    app.component('SEditCellDatePicker', SEditCellDatePicker)
    app.component('SIconSelect', SIconSelect)
    app.component('SEllipsis', SEllipsis)
    app.component('STable', STable)
    app.component('STree', STree)
    app.component('SForm', SForm)
    app.component('SIcon', SIcon)
  }
}