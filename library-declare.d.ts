// @ts-nocheck

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
    STable: typeof import('./dist/S-Table')['default']
    STree: typeof import('./dist/S-Tree')['default']
    SForm: typeof import('./dist/S-Form')['default']
    SIcon: typeof import('./dist/S-Icon')['default']
  }
}


declare global {
  export type { SEditCellSelectValueType, SEditCellSelectOptionType } from './dist/S-EditCell/select'
  export type { SEditCellPanelMode, SEditCellPickerMode } from './dist/S-EditCell/date-picker'
  export type { SEditCellTreeSelectOptionType } from './dist/S-EditCell/tree-select'
  export type {  SIconSelectOptionType } from './dist/S-IconSelect'

  export type  {
    SFormType, 
    SFormGridGutter,
    SFormGrid, 
    SFormColItem, 
    SFormColPartItem,
    SFormRowItem, 
    SFormGroupItem,
    SFormGroupPartItem,
    NormalizeType,
    ValidatorRule,
    FormGroupsDefiner,
    ValidatorManager,
  } from './dist/S-Form'

  export type  {
    STreeSourceNode,
    STreeTargetNode,
    STreeFieldNames,
    STreeLoadData,
    STreeMethoder,
    STreeTransformer,
    STreeTargeter,
    STreeSourcer,
    STreeStater,
    STreeCacher,
    STreeKey,
    STreeKeys,
    STreeEventDrop,
    STreeEventDropHandler,
    STreeEventDragstart,
    STreeEmiterCheck,
    STreeEmiterSelect,
    STreeEmiterExpand,
    STreeEmiterChange,
    STreeSourceNodes,
    STreeTargetNodes,
    STreeSpreadNodes,
    SPartTargetNode,
    SPartSourceNode,
  } from './dist/S-Tree'
}

export {}