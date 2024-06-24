import type { HTMLAttributes } from 'vue'
import type { ComputedRef } from 'vue'
import type { SlotsType } from 'vue'
import type { MaybeRef } from 'vue'
import type { VNode } from 'vue'
import type { Ref } from 'vue'

export interface STableStickyType {
  topHeader: boolean | number;
  leftFooter: boolean | number;
  rightFooter: boolean | number;
  bottomFooter: boolean | number;
  bottomScrollbar: boolean;
}

export interface STableScrollType {
  x: number | string | false;
  y: number | 'auto' | false;
  overflow: string | null;
  scrollToFirstOffsetX?: number;
  scrollToFirstOffsetY?: number;
  scrollToFirstTargetX?: number;
  scrollToFirstTargetY?: number;
  scrollToFirstXOnChange: boolean;
  scrollToFirstYOnChange: boolean;
  getScrollResizeContainer?: () => HTMLElement;
}

export interface STableSorterType {
  field: string;
  value: 'ascend' | 'descend';
}

export interface STableRecordType {
  [field: string]: any;
}

export interface STablePaginateType {
  hideOnSinglePage: boolean;
  defaultPageSize: number;
  pageSizeOptions: Array<string>;
  showSizeChanger?: boolean;
  showQuickJumper: boolean;
  showLessItems: boolean;
  loadTotalSize?: number;
  loadTotalPage?: number;
  loadPageSize?: number;
  loadPageNo?: number;
  totalSize: number;
  totalPage: number;
  pageSize: number;
  pageNo: number;
  disabled: boolean;
  visible: boolean;
  simple: boolean;
  fixed?: boolean;
  mode: 'local' | 'remote';
  showTotal?: ((total: number, range: [number, number]) => void) | boolean;
}

export interface STableCellIndexType {
  colIndex: number;
  rowIndex: number;
}

export interface STableCellSizesType {
  colOffset: number;
  rowOffset: number;
  colIndex: number;
  rowIndex: number;
  colSpan: number;
  rowSpan: number;
  minWidth: number;
  maxWidth: number;
  height: number;
  width: number;
}

export interface STableCellCacheType {
  index: number;
  rowSpan: number;
  colSpan: number;
  colCount: number;
  rowCount: number;
  cellAttrs: any;
  cellProps: any;
  cellValue: any;
  cellRender: boolean;
}

export interface STableCellMegreType {
  index: number;
  colIndex: number;
  rowIndex: number;
  cachers: Map<number, STableCellCacheType>;
  spikers: Set<number>;
  empters: Set<number>;
}

export interface STableCellFixedType {
  colOffset: number;
  colSpan: number;
}

export interface STableRowKey<RecordType = STableRecordType> {
  (record: RecordType): string;
}

export interface STableTreeKey<RecordType = STableRecordType> {
  (record: RecordType): string;
}

export interface STableLoadSource<RecordType = STableRecordType> {
  (
    options: {
      sorter: Array<{ field: string; value: 'ascend' | 'descend'; }>;
      paginate: { pageSize: number; pageNo: number; totalPage: number; totalSize: number; mode: 'local' | 'remote'; };
    }
  ): STablePromiser<RecordType[] | { data: Array<RecordType>; pageNo: number; totalSize: number; } | { result: { data: Array<RecordType>; pageNo: number; totalSize: number; }; }>;
}

export interface STableSettingsType<RecordType = STableRecordType> {
  key: string;
  title: string;
  disabled: boolean;
  children?: STableSettingsType<RecordType>[] | null;
  column: STableColumnType<RecordType>;
}

export interface STableExpanderRender<RecordType = STableRecordType> {
  (option: { record: RecordType; rowIndex: number; groupIndex: number; groupLevel: number; groupIndexs: Record<number, number>; globalIndex: number; }): undefined | VNode;
}

export interface STableHeaderCellRender<RecordType = STableRecordType> {
  (option: { title: string | number; column: STableColumnType<RecordType>; rowIndex: number; colIndex: number; paginater: STablePaginateType; }): undefined | VNode | STableRefWrapper<{
    attrs?: HTMLAttributes;
    props?: {
      align?: 'left' | 'center' | 'right';
      fixed?: 'left' | 'right' | false;
      width?: number;
      minWidth?: number;
      maxWidth?: number;
      tooltip?: boolean;
      ellipsis?: boolean;
      cellSpan?: boolean;
      colSpan?: number;
      rowSpan?: number;
      sorter?: boolean;
    };
    children?: any;
  }>;
}

export interface STableBodyerCellRender<RecordType = STableRecordType> {
  (option: { value: any; record: RecordType; rowIndex: number; groupIndex: number; groupLevel: number; groupIndexs: Record<number, number>; globalIndex: number; column: STableColumnType<RecordType>; colIndex: number; paginater: STablePaginateType; }): undefined | VNode | STableRefWrapper<{
    attrs?: HTMLAttributes;
    props?: {
      align?: 'left' | 'center' | 'right';
      tooltip?: boolean;
      ellipsis?: boolean;
      cellSpan?: boolean;
      colSpan?: number;
      rowSpan?: number;
    };
    children?: any;
  }>;
}

export interface STableFooterCellRender<RecordType = STableRecordType> {
  (option: { value: any; record: RecordType; rowIndex: number; column: STableColumnType<RecordType>; colIndex: number; sources: RecordType[]; paginater: STablePaginateType; }): undefined | VNode | STableRefWrapper<{
    attrs?: HTMLAttributes;
    props?: {
      align?: 'left' | 'center' | 'right';
      tooltip?: boolean;
      ellipsis?: boolean;
      cellSpan?: boolean;
      colSpan?: number;
      rowSpan?: number;
    };
    children?: any;
  }>;
}

export interface STableCustomHeaderRowAttrs<RecordType = STableRecordType> {
  (options: { columns: STableColumnType<RecordType>[]; rowIndex: number; }): undefined | STableRefWrapper<HTMLAttributes>;
}

export interface STableCustomBodyerRowAttrs<RecordType = STableRecordType> {
  (options: { record: RecordType; rowIndex: number; groupIndex: number; groupLevel: number; groupIndexs: Record<number, number>; globalIndex: number; }): undefined | STableRefWrapper<HTMLAttributes>;
}

export interface STableCustomBodyerRowStates<RecordType = STableRecordType> {
  (options: { record: RecordType; rowIndex: number; groupIndex: number; groupLevel: number; groupIndexs: Record<number, number>; globalIndex: number; }): undefined | STableRefWrapper<{
    selectable?: STableRefWrapper<boolean>;
    expandable?: STableRefWrapper<boolean>;
  }>;
}

export interface STableCustomFooterRowAttrs<RecordType = STableRecordType> {
  (options: { record: RecordType; rowIndex: number; sources: RecordType[]; paginater: STablePaginateType; }): undefined | STableRefWrapper<HTMLAttributes>;
}

export interface STableWrapRecordType<RecordType = STableRecordType> {
  key: STableKey;
  parentKey: STableKey | null;
  childKeys: STableKey[];
  parentKeys: STableKey[];
  referRecord: RecordType;
  treeChildren: STableWrapRecordType<RecordType>[];
  rowGroupLevel: number;
  rowGroupIndex: number;
  rowGroupIndexs: Record<number, number>;
  rowGlobalIndex: number;
  rowTreeKeyField: string;
  rowKeyField: string;
  rowHeight: number;
  rowIndex: number;
}

export interface STableWrapColumnType<RecordType = STableRecordType> {
  key: string;
  title: string;
  parentKey: STableKey | null;
  childKeys: string[];
  parentKeys: string[];
  referColumn: STableColumnType<RecordType>;
  cacheColumn: STablePartColumnType<RecordType>;
  parentColumn: STableWrapColumnType<RecordType> | null;
  treeChildren: STableWrapColumnType<RecordType>[];
  rowGroupLevel: number;
  rowGroupIndex: number;
  rowGroupIndexs: Record<number, number>;
}

export interface STablePartColumnType<RecordType = STableRecordType> {
  key?: string;
  title: string;
  dataIndex: string | Array<string>;
  children?: STablePartColumnType<RecordType>[];
  align?: 'left' | 'center' | 'right';
  fixed?: 'left' | 'right' | false;
  width?: number;
  minWidth?: number;
  maxWidth?: number;
  settings?: { checkbox?: boolean; disabled?: boolean; };
  resizable?: boolean;
  ellipsis?: boolean;
  tooltip?: boolean;
  colSpan?: number;
  rowSpan?: number;
  sorter?: boolean;
  sorterField?: string;
  expandIcon?: boolean;
  sorterValueChange?: (option: { field: string; value: 'ascend' | 'descend' | ''; values: Array<STableSorterType>; }) => void;
  customHeaderCellRender?: STableHeaderCellRender;
  customBodyerCellRender?: STableBodyerCellRender;
  customFooterCellRender?: STableFooterCellRender;
}

export interface STableColumnType<RecordType = STableRecordType> {
  key: string;
  title: string;
  parentKey: string;
  dataIndex: string | Array<string>;
  children: STableColumnType<RecordType>[];
  align: 'left' | 'center' | 'right';
  fixed: 'left' | 'right' | false;
  width?: number;
  minWidth: number;
  maxWidth: number;
  settings: { checkbox: boolean; disabled: boolean; };
  resizable: boolean;
  ellipsis: boolean;
  tooltip: boolean;
  colIndex: number;
  rowIndex: number;
  colOffset: number;
  rowOffset: number;
  colMaxSpan: number;
  rowMaxSpan: number;
  colSpan: number;
  rowSpan: number;
  sorter: boolean;
  sorterField: string;
  sorterValue: 'ascend' | 'descend' | '';
  expandIcon?: boolean;
  sorterValueChange?: (option: { field: string; value: 'ascend' | 'descend' | ''; values: Array<STableSorterType>; }) => void;
  customHeaderCellRender?: STableHeaderCellRender;
  customBodyerCellRender?: STableBodyerCellRender;
  customFooterCellRender?: STableFooterCellRender;
}

export type STableKey = string | number
export type STableSize = 'default' | 'middle' | 'small'
export type STableValuer<T> = MaybeRef<T> | ComputedRef<T>
export type STablePromiser<T> = Promise<T> | T
export type STableRefWrapper<T> = ComputedRef<T> | Ref<T> | T
export type STablePartStickyType = Partial<STableStickyType>
export type STablePartScrollType = Partial<STableScrollType>
export type STablePartPaginate = Partial<STablePaginateType>

export type STableDefineSlots<RecordType = STableRecordType> = SlotsType<{
  expander: Parameters<STableExpanderRender<RecordType>>[0] & { scroller: { top: number; left: number; right: number; bottom: number; }; };
  headerCell: Parameters<STableHeaderCellRender<RecordType>>[0] & { scroller: { top: number; left: number; right: number; bottom: number; }; };
  bodyerCell: Parameters<STableBodyerCellRender<RecordType>>[0] & { scroller: { top: number; left: number; right: number; bottom: number; }; };
  footerCell: Parameters<STableFooterCellRender<RecordType>>[0] & { scroller: { top: number; left: number; right: number; bottom: number; }; };
}>

export type STableDefineMethods = {
  reload: (delay?: Promise<void> | boolean | number, force?: boolean) => Promise<void>;
  refresh: (delay?: Promise<void> | boolean | number, force?: boolean) => Promise<void>;
  select: (keys: STableKey[]) => void;
  expand: (keys: STableKey[]) => void;
  update: (clean?: boolean) => void;
  clear: (clean?: boolean) => void;
}
