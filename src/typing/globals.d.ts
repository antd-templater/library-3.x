// @ts-nocheck

declare module 'vue' {
  export interface GlobalComponents {
    SEditCellAutoComplete: typeof import('./S-EditCell/auto-complete')['default'];
    SEditCellDatePicker: typeof import('./S-EditCell/date-picker')['default'];
    SEditCellTreeSelect: typeof import('./S-EditCell/tree-select')['default'];
    SEditCellSelectIcon: typeof import('./S-EditCell/select-icon')['default'];
    SEditCellTextarea: typeof import('./S-EditCell/textarea')['default'];
    SEditCellSelect: typeof import('./S-EditCell/select')['default'];
    SEditCellInput: typeof import('./S-EditCell/input')['default'];
    SIconSelect: typeof import('./S-IconSelect')['default'];
    SEllipsis: typeof import('./S-Ellipsis')['default'];
    STable: typeof import('./S-Table')['default'];
    STree: typeof import('./S-Tree')['default'];
    SForm: typeof import('./S-Form')['default'];
    SIcon: typeof import('./S-Icon')['default'];
  }
}

declare global {
  export type SEditCellAutoComplete = typeof import('./S-EditCell/auto-complete')['default']
  export type SEditCellDatePicker = typeof import('./S-EditCell/date-picker')['default']
  export type SEditCellTreeSelect = typeof import('./S-EditCell/tree-select')['default']
  export type SEditCellSelectIcon = typeof import('./S-EditCell/select-icon')['default']
  export type SEditCellTextarea = typeof import('./S-EditCell/textarea')['default']
  export type SEditCellSelect = typeof import('./S-EditCell/select')['default']
  export type SEditCellInput = typeof import('./S-EditCell/input')['default']
  export type SIconSelect = typeof import('./S-IconSelect')['default']
  export type SEllipsis = typeof import('./S-Ellipsis')['default']
  export type STable = typeof import('./S-Table')['default']
  export type STree = typeof import('./S-Tree')['default']
  export type SForm = typeof import('./S-Form')['default']
  export type SIcon = typeof import('./S-Icon')['default']

  export type { SEditCellSelectValueType, SEditCellSelectOptionType } from './S-EditCell/select'
  export type { SEditCellPanelMode, SEditCellPickerMode } from './S-EditCell/date-picker'
  export type { SEditCellTreeSelectOptionType } from './S-EditCell/tree-select'
  export type { SIconSelectOption } from './S-IconSelect'

  export type {
    SFormColItem,
    SFormColPartItem,
    SFormColSlotItem,
    SFormGrid,
    SFormGridGutter,
    SFormGroupItem,
    SFormGroupPartItem,
    SFormGroupSlotItem,
    SFormGroupsDefiner,
    SFormNormalizeType,
    SFormRowItem,
    SFormRowPartItem,
    SFormRowSlotItem,
    SFormType,
    SFormValidatorManager,
    SFormValidatorRule,
  } from './S-Form'

  export type {
    STableBodyerCellRender,
    STableCellCacheType,
    STableCellFixedType,
    STableCellIndexType,
    STableCellMegreType,
    STableCellSizesType,
    STableColumnType,
    STableCustomBodyerRowAttrs,
    STableCustomBodyerRowStates,
    STableCustomFooterRowAttrs,
    STableCustomHeaderRowAttrs,
    STableExpanderRender,
    STableFooterCellRender,
    STableHeaderCellRender,
    STableKey,
    STableLoadSource,
    STablePaginateType,
    STablePartColumnType,
    STablePartPaginate,
    STablePartScrollType,
    STablePartStickyType,
    STablePromiser,
    STableRecordType,
    STableRefWrapper,
    STableRowKey,
    STableScrollType,
    STableSettingsType,
    STableSize,
    STableSorterType,
    STableStickyType,
    STableTreeKey,
    STableValuer,
    STableWrapColumnType,
    STableWrapRecordType,
  } from './S-Table'

  export type {
    STreeCacher,
    STreeDropHandler,
    STreeEmiterCheck,
    STreeEmiterChange,
    STreeEmiterExpand,
    STreeEmiterSelect,
    STreeEventDragstart,
    STreeEventDrop,
    STreeFieldNames,
    STreeFilterProps,
    STreeKey,
    STreeKeys,
    STreeLoadData,
    STreeMethoder,
    STreePartSourceNode,
    STreePartTargetNode,
    STreeSourceNode,
    STreeSourceNodes,
    STreeSourcer,
    STreeSpreadNodes,
    STreeStater,
    STreeTargeter,
    STreeTargetNode,
    STreeTargetNodes,
    STreeTransformer,
  } from './S-Tree'
}

export {}
