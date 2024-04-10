// @ts-nocheck

declare module 'vue' {
  export interface GlobalComponents {
    SProLayout: typeof import('./dist/S-ProLayout')['SProLayout']
    SProHeader: typeof import('./dist/S-ProLayout')['SProHeader']
    SEditCellDatePicker: typeof import('./dist/S-EditCell/date-picker')['default']
    SEditCellTreeSelect: typeof import('./dist/S-EditCell/tree-select')['default']
    SEditCellSelectIcon: typeof import('./dist/S-EditCell/select-icon')['default']
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
  export type SProLayout = typeof import('./dist/S-ProLayout')['SProLayout']
  export type SProHeader = typeof import('./dist/S-ProLayout')['SProHeader']
  export type SEditCellDatePicker = typeof import('./dist/S-EditCell/date-picker')['default']
  export type SEditCellTreeSelect = typeof import('./dist/S-EditCell/tree-select')['default']
  export type SEditCellSelectIcon = typeof import('./dist/S-EditCell/select-icon')['default']
  export type SEditCellTextarea = typeof import('./dist/S-EditCell/textarea')['default']
  export type SEditCellSelect = typeof import('./dist/S-EditCell/select')['default']
  export type SEditCellInput = typeof import('./dist/S-EditCell/input')['default']
  export type SIconSelect = typeof import('./dist/S-IconSelect')['default']
  export type SEllipsis = typeof import('./dist/S-Ellipsis')['default']
  export type STable = typeof import('./dist/S-Table')['default']
  export type STree = typeof import('./dist/S-Tree')['default']
  export type SForm = typeof import('./dist/S-Form')['default']
  export type SIcon = typeof import('./dist/S-Icon')['default']

  export type { SEditCellSelectValueType, SEditCellSelectOptionType } from './dist/S-EditCell/select'
  export type { SEditCellPanelMode, SEditCellPickerMode } from './dist/S-EditCell/date-picker'
  export type { SEditCellTreeSelectOptionType } from './dist/S-EditCell/tree-select'
  export type { SIconSelectOption } from './dist/S-IconSelect'

  export type {
    SFormColItem,
    SFormColPartItem,
    SFormGrid,
    SFormGridGutter,
    SFormGroupItem,
    SFormGroupPartItem,
    SFormGroupsDefiner,
    SFormNormalizeType,
    SFormRowItem,
    SFormType,
    SFormValidatorManager,
    SFormValidatorRule
  } from './dist/S-Form'

  export type {
    SProLayoutContentWidth,
    SProLayoutFormatMessage,
    SProLayoutHeaderRender,
    SProLayoutLayoutMode,
    SProLayoutMenuContentRender,
    SProLayoutMenuExtraRender,
    SProLayoutMenuFooterRender,
    SProLayoutMenuHeaderRender,
    SProLayoutMenuItem,
    SProLayoutMenuItemRender,
    SProLayoutMenuMode,
    SProLayoutMetaInfo,
    SProLayoutProps,
    SProLayoutPureSettings,
    SProLayoutRenderNode,
    SProLayoutRightContentRender,
    SProLayoutRouteContextProps,
    SProLayoutRouteRequiredProps,
    SProLayoutSiderBreakpoint,
    SProLayoutSubMenuItemRender,
    SProLayoutTheme,
    SProLayoutWithFalse,
    SProLayoutWithTrue
  } from './dist/S-ProLayout'

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
    STableWrapRecordType
  } from './dist/S-Table'

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
    STreeTransformer
  } from './dist/S-Tree'
}

export {}
