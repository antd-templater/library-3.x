import '@vue/runtime-core'

declare module '@vue/runtime-core' {
  export interface GlobalComponents {
    SEditCellDatePicker: typeof import('./dist/S-EditCell/date-picker')['default']
    SEditCellTreeSelect: typeof import('./dist/S-EditCell/tree-select')['default']
    SEditCellTextarea: typeof import('./dist/S-EditCell/textarea')['default']
    SEditCellSelect: typeof import('./dist/S-EditCell/select')['default']
    SEditCellInput: typeof import('./dist/S-EditCell/input')['default']
    SIconSelect: typeof import('./dist/S-IconSelect')['default']
    SEllipsis: typeof import('./dist/S-Ellipsis')['default']
    SIcon: typeof import('./dist/S-Icon')['default']
  }
}
