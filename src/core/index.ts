import { App } from 'vue'

// S-Icon
// S-Ellipsis
// S-IconSelect
import { SIcon } from './S-Icon/index'
import { SEllipsis } from './S-Ellipsis/index'
import { SIconSelect } from './S-IconSelect/index'
import { iconOptionsDefiner } from './S-IconSelect/index'

// S-EditCell-*
import { SEditCellInput } from './S-EditCell/input'
import { SEditCellSelect } from './S-EditCell/select'
import { SEditCellTextarea } from './S-EditCell/textarea'
import { SEditCellSelectIcon } from './S-EditCell/select-icon'
import { SEditCellTreeSelect } from './S-EditCell/tree-select'
import { SEditCellDatePicker } from './S-EditCell/date-picker'
import { SEditCellAutoComplete } from './S-EditCell/auto-complete'

// S-Form
import { SForm } from './S-Form/index'
import { formValidator } from './S-Form/index'
import { formGridDefiner } from './S-Form/index'
import { formRulesDefiner } from './S-Form/index'
import { formGroupsDefiner } from './S-Form/index'

// S-Tree
import { STree } from './S-Tree/index'
import { treeDataDefiner } from './S-Tree/index'
import { treeLoadDataDefiner } from './S-Tree/index'
import { treeEmitCheckDefiner } from './S-Tree/index'
import { treeEmitSelectDefiner } from './S-Tree/index'
import { treeEmitExpandDefiner } from './S-Tree/index'
import { treeEmitChangeDefiner } from './S-Tree/index'
import { treeDropHandlerDefiner } from './S-Tree/index'
import { treeFieldNamesDefiner } from './S-Tree/index'

// S-Table
import { STable } from './S-Table/index'
import { tableSorterDefiner } from './S-Table/index'
import { tableScrollDefiner } from './S-Table/index'
import { tableStickyDefiner } from './S-Table/index'
import { tableSourcesDefiner } from './S-Table/index'
import { tableSummarysDefiner } from './S-Table/index'
import { tableColumnsDefiner } from './S-Table/index'
import { tablePaginateDefiner } from './S-Table/index'
import { tableLoadDataDefiner } from './S-Table/index'
import { tableResponserDefiner } from './S-Table/index'
import { tableEmitSorterDefiner } from './S-Table/index'
import { tableEmitSelectDefiner } from './S-Table/index'
import { tableEmitExpandDefiner } from './S-Table/index'
import { tableEmitPageChangeDefiner } from './S-Table/index'
import { tableEmitPageSizeChangeDefiner } from './S-Table/index'
import { tableCustomHeaderRowAttrsDefiner } from './S-Table/index'
import { tableCustomBodyerRowAttrsDefiner } from './S-Table/index'
import { tableCustomFooterRowAttrsDefiner } from './S-Table/index'
import { tableCustomBodyerRowStatesDefiner } from './S-Table/index'
import { tableCustomHeaderCellRenderDefiner } from './S-Table/index'
import { tableCustomBodyerCellRenderDefiner } from './S-Table/index'
import { tableCustomFooterCellRenderDefiner } from './S-Table/index'

// S-ProLayout
import { SProLayout } from './S-ProLayout/index'
import { SProGlobalHeader } from './S-ProLayout/index'
import { proFlatMenuItem } from './S-ProLayout/index'
import { proClearMenuItem } from './S-ProLayout/index'
import { proUseMediaQuery } from './S-ProLayout/index'
import { proUseRouteContext } from './S-ProLayout/index'
import { proFirstMenuChildren } from './S-ProLayout/index'
import { proCreateRouteContext } from './S-ProLayout/index'
import { proProvideRouteContext } from './S-ProLayout/index'

export default {
  install(app: App) {
    app.component('SEditCellInput', SEditCellInput)
    app.component('SEditCellSelect', SEditCellSelect)
    app.component('SEditCellTextarea', SEditCellTextarea)
    app.component('SEditCellSelectIcon', SEditCellSelectIcon)
    app.component('SEditCellTreeSelect', SEditCellTreeSelect)
    app.component('SEditCellDatePicker', SEditCellDatePicker)
    app.component('SEditCellAutoComplete', SEditCellAutoComplete)
    app.component('SIconSelect', SIconSelect)
    app.component('SEllipsis', SEllipsis)
    app.component('STable', STable)
    app.component('STree', STree)
    app.component('SForm', SForm)
    app.component('SIcon', SIcon)
  },
}

export {
  SIcon,
  SEllipsis,
  SIconSelect,
  iconOptionsDefiner,

  SEditCellInput,
  SEditCellSelect,
  SEditCellTextarea,
  SEditCellSelectIcon,
  SEditCellTreeSelect,
  SEditCellDatePicker,
  SEditCellAutoComplete,

  SForm,
  formValidator,
  formGridDefiner,
  formRulesDefiner,
  formGroupsDefiner,

  STree,
  treeDataDefiner,
  treeLoadDataDefiner,
  treeEmitCheckDefiner,
  treeEmitSelectDefiner,
  treeEmitExpandDefiner,
  treeEmitChangeDefiner,
  treeDropHandlerDefiner,
  treeFieldNamesDefiner,

  STable,
  tableSorterDefiner,
  tableScrollDefiner,
  tableStickyDefiner,
  tableColumnsDefiner,
  tableSourcesDefiner,
  tableSummarysDefiner,
  tablePaginateDefiner,
  tableLoadDataDefiner,
  tableResponserDefiner,
  tableEmitSorterDefiner,
  tableEmitSelectDefiner,
  tableEmitExpandDefiner,
  tableEmitPageChangeDefiner,
  tableEmitPageSizeChangeDefiner,
  tableCustomHeaderRowAttrsDefiner,
  tableCustomBodyerRowAttrsDefiner,
  tableCustomFooterRowAttrsDefiner,
  tableCustomBodyerRowStatesDefiner,
  tableCustomHeaderCellRenderDefiner,
  tableCustomBodyerCellRenderDefiner,
  tableCustomFooterCellRenderDefiner,

  SProLayout,
  SProGlobalHeader,
  proFlatMenuItem,
  proClearMenuItem,
  proUseMediaQuery,
  proUseRouteContext,
  proFirstMenuChildren,
  proCreateRouteContext,
  proProvideRouteContext,
}
