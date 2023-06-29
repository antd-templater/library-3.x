import * as VueTypes from 'vue-types'
import { VNode, HTMLAttributes, defineComponent } from 'vue'

export interface STableLocaleNames {
  filterConfirm: string;
  filterReset: string;
  emptyText: string;
}

export interface STableFieldNames {
  rowChildrenName: string;
  rowKeyName: string;
}

export interface STableStickyType {
  stickyHeader: boolean;
  stickyScrollbar: boolean;
}

export interface STableScrollType {
  x: string | number;
  y: string | number;
  scrollToFirstXOnChange: boolean;
  scrollToFirstYOnChange: boolean;
}

export interface STableRecordType {
  [field: string]: any;
}

export interface STablePagination {
  hideOnSinglePage: boolean;
  defaultPageSize: number;
  pageSizeOptions: Array<string | number>;
  showSizeChanger?: boolean;
  showQuickJumper: boolean;
  showLessItems: boolean;
  totalSize: number;
  totalPage: number;
  pageSize: number;
  pageNo: number;
  simple: boolean;
  type: 'remote' | 'local' | false | true;
  showTotal?:	(total: number, range: [number, number]) => void;
}

export interface STableLoadData<RecordType = STableRecordType> {
  (
    pages: STablePagination,
    options: {
      sorter?: Array<{ field: string; value: 'asc' | 'desc' | 'ascend' | 'descend'; }>;
      filter?: Array<{ field: string; value: Array<string | number>; }>;
    }
  ): Array<RecordType> | {
    data: Array<RecordType>;
    page: number;
    total: number;
  };
}

export interface STableTitleRender<RecordType = STableRecordType> {
  (options: { currentDataSource: RecordType[], pagination: { totalSize: number; totalPage: number; pageSize: number; pageNo: number; } }): VNode;
}

export interface STableFooterRender<RecordType = STableRecordType> {
  (options: { currentDataSource: RecordType[], pagination: { pageTotal: number; pageCount: number; pageSize: number; pageNo: number; } }): VNode;
}

export interface STableSummaryRender<RecordType = STableRecordType> {
  (options: { currentDataSource: RecordType[], pagination: { pageTotal: number; pageCount: number; pageSize: number; pageNo: number; } }): VNode;
}

export interface STableExpanderRender<RecordType = STableRecordType> {
  (option: { record: RecordType; rowIndex: number; expanded: boolean; }): VNode;
}

export interface STableHeaderCellRender<RecordType = STableRecordType> {
  (option: { title: string | number; column: STableColumnType<RecordType>; rowIndex: number; }): VNode | {
    props?: {
      align?: 'left' | 'center' | 'right';
      fixed?: 'left' | 'right';
      width?: number | string;
      minWidth?: number;
      maxWidth?: number;
      resizable?: boolean;
      ellipsis?: boolean;
      colSpan?: number;
      rowSpan?: number;
      filter?: boolean;
      sorter?: boolean;
      filterField?: string;
      sorterField?: string;
      filterTemplate?: string;
    };
    children?: any;
  };
}

export interface STableBodyerCellRender<RecordType = STableRecordType> {
  (option: { value: any; record: RecordType; rowIndex: number; column: STableColumnType<RecordType>; }): VNode | {
    props?: {
      align?: 'left' | 'center' | 'right';
      ellipsis?: boolean;
      colSpan?: number;
      rowSpan?: number;
    };
    children?: any;
  };
}

export interface STableFilterDropdownProps<RecordType = STableRecordType> {
  column: STableColumnType<RecordType>;
  filtered: boolean;
  filterField: string;
  filterVisible: boolean;
  filterTemplate: string;
  nowFilterValue: string[] | number[];
  defFilterValue: string[] | number[];
  allFilterValues: Array<{ field: string; value: string[] | number[]; }>;
  confirm: () => void;
  reset: () => void;
  clear: () => void;
}

export interface STableFilterDropdownRender<RecordType = STableRecordType> {
  (option: STableFilterDropdownProps<RecordType>): VNode;
}

export interface STableFilterDropdownIconRender<RecordType = STableRecordType> {
  (option: STableFilterDropdownProps<RecordType>): VNode;
}

export interface STableCustomHeaderRowAttrs<RecordType = STableRecordType> {
  (options: { column: STableColumnType<RecordType>; rowIndex: number; }): HTMLAttributes;
}

export interface STableCustomBodyerRowAttrs<RecordType = STableRecordType> {
  (options: { record: RecordType; rowIndex: number; }): HTMLAttributes;
}

export interface STableMergeColumnHandler<RecordType = STableRecordType> {
  (options: { column: STableColumnType<RecordType>; rowIndex: number; }): STableColumnType<RecordType>;
}

export interface STableApplyStagesHandler<RecordType = STableRecordType> {
  (
    options: {
      record: RecordType;
      rowIndex: number;
      selectModeType: 'Radio' | 'Checkbox';
      selectedRowKeys: Array<string | number>;
      expandedRowKeys: Array<string | number>;
      defaultSelectAllRows: boolean;
      defaultExpandAllRows: boolean;
    }
  ): {
    rowKey?: string;
    draggable?: boolean;
    selectable?: boolean;
    expandable?: boolean;
  };
}

export interface STablePartColumnType<RecordType = STableRecordType> {
  dataTitle: string;
  dataIndex: string | Array<string>;
  children?: STablePartColumnType<RecordType>[];
  align?: 'left' | 'center' | 'right';
  fixed?: 'left' | 'right';
  width?: number | string;
  minWidth?: number;
  maxWidth?: number;
  resizable?: boolean;
  ellipsis?: boolean;
  colSpan?: number;
  rowSpan?: number;
  filter?: boolean;
  sorter?: boolean;
  filterField?: string;
  sorterField?: string;
  filterTemplate?: string;
  filterDropdown?: (column: STableColumnType<RecordType>) => VNode;
  filterDropdownIcon?: (column: STableColumnType<RecordType>) => VNode;
  filterVisibleChange?: (column: STableColumnType<RecordType>) => void;
  filterValueChange?: (value: string[] | number[], values: Array<{ field: string; value: string[] | number[]; }>, column: STableColumnType<RecordType>) => void;
  sorterValueChange?: (value: '' | 'asc' | 'desc' | 'ascend'| 'descend', values: Array<{ field: string; value: 'asc' | 'desc' | 'ascend'| 'descend' }>, column: STableColumnType<RecordType>) => void;
  customBodyerCellAttrs?: (record: RecordType, rowIndex: number, column: STableColumnType<RecordType>) => HTMLAttributes;
  customHeaderCellAttrs?: (column: STableColumnType<RecordType>, rowIndex: number) => HTMLAttributes;
  customHeaderCellRender?: (column: STableColumnType<RecordType>, rowIndex: number) => VNode | {
    props?: {
      align?: 'left' | 'center' | 'right';
      fixed?: 'left' | 'right';
      width?: number | string;
      minWidth?: number;
      maxWidth?: number;
      resizable?: boolean;
      ellipsis?: boolean;
      colSpan?: number;
      rowSpan?: number;
      filter?: boolean;
      sorter?: boolean;
      filterField?: string;
      sorterField?: string;
      filterTemplate?: string;
    };
    children?: any;
  };
  customBodyerCellRender?: (record: RecordType, rowIndex: number, expanded: boolean) => VNode | {
    props?: {
      align?: 'left' | 'center' | 'right';
      ellipsis?: boolean;
      colSpan?: number;
      rowSpan?: number;
    };
    children?: any;
  };
}

export interface STableColumnType<RecordType = STableRecordType> {
  dataTitle: string;
  dataIndex: string | Array<string>;
  children?: STableColumnType<RecordType>[];
  align: 'left' | 'center' | 'right';
  fixed: 'left' | 'right';
  width?: number | string;
  minWidth?: number;
  maxWidth?: number;
  resizable: boolean;
  ellipsis: boolean;
  colSpan?: number;
  rowSpan?: number;
  filter: boolean;
  sorter: boolean;
  filtered: boolean;
  sortered: boolean;
  filterField: string;
  sorterField: string;
  filterVisible: boolean;
  filterTemplate?: string;
  defFilterValue: string[] | number[];
  nowFilterValue: string[] | number[];
  defSorterValue: '' | 'asc' | 'desc' | 'ascend'| 'descend'
  nowSorterValue: '' | 'asc' | 'desc' | 'ascend'| 'descend'
  allFilterValues: Array<{ field: string; value: string[] | number[]; }>;
  allSorterValues: Array<{ field: string; value: 'asc' | 'desc' | 'ascend'| 'descend' }>;
  filterDropdown?: (column: STableColumnType<RecordType>) => VNode;
  filterDropdownIcon?: (column: STableColumnType<RecordType>) => VNode;
  sorterValueChange?: (column: STableColumnType<RecordType>) => void;
  filterValueChange?: (column: STableColumnType<RecordType>) => void;
  filterVisibleChange?: (column: STableColumnType<RecordType>) => void;
  customBodyerCellAttrs?: (record: RecordType, rowIndex: number, column: STableColumnType<RecordType>) => HTMLAttributes;
  customHeaderCellAttrs?: (column: STableColumnType<RecordType>, rowIndex: number) => HTMLAttributes;
  customHeaderCellRender?: (column: STableColumnType<RecordType>, rowIndex: number) => VNode | {
    props?: {
      align?: 'left' | 'center' | 'right';
      fixed?: 'left' | 'right';
      width?: number | string;
      minWidth?: number;
      maxWidth?: number;
      resizable?: boolean;
      ellipsis?: boolean;
      colSpan?: number;
      rowSpan?: number;
      filter?: boolean;
      sorter?: boolean;
      filterField?: string;
      sorterField?: string;
      filterTemplate?: string;
    };
    children?: any;
  };
  customBodyerCellRender?: (record: RecordType, rowIndex: number, expanded: boolean) => VNode | {
    props?: {
      align?: 'left' | 'center' | 'right';
      ellipsis?: boolean;
      colSpan?: number;
      rowSpan?: number;
    };
    children?: any;
  };
}

export type STableSize = 'default' | 'middle' | 'small'
export type STableSortDirections = ['ascend'] | ['descend'] | ['ascend', 'descend'] | ['asc'] | ['desc'] | ['asc', 'desc']
export type STablePartStickyType = Partial<STableStickyType>
export type STablePartScrollType = Partial<STableScrollType>
export type STablePartPagination = Partial<STablePagination>
export type STablePartFieldNames = Partial<STableFieldNames>
export type STablePartLocaleNames = Partial<STableLocaleNames>

export const STable = defineComponent({
  name: 'STable',
  props: {
    size: VueTypes.string<STableSize>().def(undefined),
    title: VueTypes.func<STableTitleRender>().def(undefined),
    footer: VueTypes.func<STableFooterRender>().def(undefined),
    summary: VueTypes.func<STableSummaryRender>().def(undefined),
    expander: VueTypes.func<STableExpanderRender>().def(undefined),
    headerCell: VueTypes.func<STableHeaderCellRender>().def(undefined),
    bodyerCell: VueTypes.func<STableBodyerCellRender>().def(undefined),
    filterDropdown: VueTypes.func<STableFilterDropdownRender>().def(undefined),
    filterDropdownIcon: VueTypes.func<STableFilterDropdownIconRender>().def(undefined),
    sicky: VueTypes.object<STablePartStickyType>().def(() => ({})),
    scroll: VueTypes.object<STablePartScrollType>().def(() => ({})),
    locale: VueTypes.object<STablePartLocaleNames>().def(() => ({})),
    columns: VueTypes.array<STablePartColumnType>().isRequired,
    loadData: VueTypes.func<STableLoadData>().def(undefined),
    dataSource: VueTypes.array().def(() => []),
    pagination: VueTypes.object<STablePartPagination>().def(() => ({})),
    replaceFields: VueTypes.object<STablePartFieldNames>().def(() => ({})),
    sortDirections: VueTypes.any<STableSortDirections>().def(() => ['ascend', 'descend']),
    customHeaderRow: VueTypes.func<STableCustomHeaderRowAttrs>().def(undefined),
    custombodyerRow: VueTypes.func<STableCustomBodyerRowAttrs>().def(undefined),
    mergeColumnHandler: VueTypes.func<STableMergeColumnHandler>().def(undefined),
    applyStagesHandler: VueTypes.func<STableApplyStagesHandler>().def(undefined),
    selectedRowMode: VueTypes.string<'Radio' | 'Checkbox'>().def('Checkbox'),
    selectedRowKeys: VueTypes.array<string | number>().def(() => []),
    expandedRowKeys: VueTypes.array<string | number>().def(() => []),
    preserveSelectedRowKeys: VueTypes.bool().def(false),
    preserveExpandedRowKeys: VueTypes.bool().def(false),
    defaultSelectAllRows: VueTypes.bool().def(false),
    defaultExpandAllRows: VueTypes.bool().def(false),
    columnSorterMultiple: VueTypes.bool().def(false),
    columnFilterMultiple: VueTypes.bool().def(true),
    showSorterTooltip: VueTypes.bool().def(false),
    expandRowByClick: VueTypes.bool().def(false),
    selectIndentSize: VueTypes.number().def(15),
    expandIndentSize: VueTypes.number().def(15),
    showHeader: VueTypes.bool().def(false),
    bordered: VueTypes.bool().def(false),
    loading: VueTypes.bool().def(false)
  },
  emits: {
    'update:selectedRowKeys': (keys: Array<string | number>) => true,
    'update:expandedRowKeys': (keys: Array<string | number>) => true,
    'sorter': (options: Array<{ field: string; value: '' | 'asc' | 'desc' | 'ascend' | 'descend'; }>) => true,
    'filter': (options: Array<{ field: string; value: Array<string | number>; }>) => true,
    'expand': (keys: Array<string | number>) => true,
    'select': (keys: Array<string | number>) => true,
    'paginate': (pages: STablePagination) => true
  },
  setup(props, context) {
    return () => (
      <div class='s-table-container'/>
    )
  }
})

export default STable
