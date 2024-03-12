import { Fragment, VNode, HTMLAttributes, SlotsType, ComputedRef, MaybeRef, UnwrapRef, Ref, isVNode, nextTick, renderSlot, defineComponent, onMounted, computed, reactive, ref, inject, watch, toRaw, unref } from 'vue'
import { defaultConfigProvider } from 'ant-design-vue/es/config-provider'
import { PlusOutlined, MinusOutlined } from '@ant-design/icons-vue'
import * as VueTypes from 'vue-types'
import helper from '@/helper'
import Res from './res'

import SEllipsis from '@/S-Ellipsis/index'
import STableSelection from './index.selection'
import STablePaginater from './index.paginater'
import STableScrollbar from './index.scrollbar'
import STableSettings from './index.settings'
import STableLoading from './index.loading'
import STableDragger from './index.dragger'
import STableCursor from './index.cursor'
import STableSorter from './index.sorter'
import STableEmpty from './index.empty'
import './index.style.less'

export interface STableStickyType {
  topHeader: boolean | number;
  leftFooter: boolean;
  rightFooter: boolean;
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
  value: 'ascend'| 'descend';
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
  showTotal?:	((total: number, range: [number, number]) => void) | boolean;
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
  (record: RecordType): string
}

export interface STableTreeKey<RecordType = STableRecordType> {
  (record: RecordType): string
}

export interface STableLoadSource<RecordType = STableRecordType> {
  (
    options: {
      sorter: Array<{ field: string; value: 'ascend'| 'descend'; }>;
      paginate: { pageSize: number; pageNo: number; totalPage: number; totalSize: number; mode: 'local' | 'remote'; };
    }
  ): STablePromiser<RecordType[] | { data: Array<RecordType>; pageNo: number; totalSize: number; } | { result: { data: Array<RecordType>; pageNo: number; totalSize: number; } }>;
}

export interface STableSettingsType<RecordType = STableRecordType> {
  key: string;
  title: string;
  disabled: boolean;
  children?: STableSettingsType<RecordType>[] | null;
  column: STableColumnType<RecordType>
}

export interface STableExpanderRender<RecordType = STableRecordType> {
  (option: { record: RecordType; rowIndex: number; groupIndex: number; groupLevel: number; groupIndexs: Record<number, number>; globalIndex: number; }): VNode;
}

export interface STableHeaderCellRender<RecordType = STableRecordType> {
  (option: { title: string | number; column: STableColumnType<RecordType>; rowIndex: number; colIndex: number; }): VNode | STableRefWrapper<{
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
  (option: { value: any; record: RecordType; rowIndex: number; groupIndex: number; groupLevel: number; groupIndexs: Record<number, number>; globalIndex: number; column: STableColumnType<RecordType>; colIndex: number; }): VNode | STableRefWrapper<{
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
  (option: { value: any; record: RecordType; rowIndex: number; column: STableColumnType<RecordType>; colIndex: number; sources: RecordType[]; paginate: STablePaginateType; }): VNode | STableRefWrapper<{
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
  (options: { columns: STableColumnType<RecordType>[]; rowIndex: number; }): STableRefWrapper<HTMLAttributes>;
}

export interface STableCustomBodyerRowAttrs<RecordType = STableRecordType> {
  (options: { record: RecordType; rowIndex: number; groupIndex: number; groupLevel: number; groupIndexs: Record<number, number>; globalIndex: number; }): STableRefWrapper<HTMLAttributes>;
}

export interface STableCustomBodyerRowStates<RecordType = STableRecordType> {
  (options: { record: RecordType; rowIndex: number; groupIndex: number; groupLevel: number; groupIndexs: Record<number, number>; globalIndex: number; }): STableRefWrapper<{
    selectable?: STableRefWrapper<boolean>;
    expandable?: STableRefWrapper<boolean>;
  }>;
}

export interface STableCustomFooterRowAttrs<RecordType = STableRecordType> {
  (options: { record: RecordType; rowIndex: number; sources: RecordType[]; paginate: STablePaginateType; }): STableRefWrapper<HTMLAttributes>;
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
  sorterValueChange?: (option: { field: string; value: 'ascend'| 'descend' | ''; values: Array<STableSorterType>; }) => void;
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
  sortered: boolean;
  sorterField: string;
  sorterValue: 'ascend'| 'descend' | '';
  expandIcon?: boolean;
  sorterValueChange?: (option: { field: string; value: 'ascend'| 'descend' | ''; values: Array<STableSorterType>; }) => void;
  customHeaderCellRender?: STableHeaderCellRender;
  customBodyerCellRender?: STableBodyerCellRender;
  customFooterCellRender?: STableFooterCellRender;
}

type STableeDefineSlots<RecordType = STableRecordType> = SlotsType<{
  expander: Parameters<STableExpanderRender<RecordType>>[0];
  headerCell: Parameters<STableHeaderCellRender<RecordType>>[0];
  bodyerCell: Parameters<STableBodyerCellRender<RecordType>>[0];
  footerCell: Parameters<STableFooterCellRender<RecordType>>[0];
}>

type STableDefineMethods = {
  reload: (delay?: Promise<void> | boolean | number, force?: boolean) => Promise<void>;
  refresh: (delay?: Promise<void> | boolean | number, force?: boolean) => Promise<void>;
  select: (keys: STableKey[]) => void;
  expand: (keys: STableKey[]) => void;
  update: (clean?: boolean) => void;
  clear: (clean?: boolean) => void;
}

export type STableKey = string | number
export type STableSize = 'default' | 'middle' | 'small'
export type STablePartStickyType = Partial<STableStickyType>
export type STablePartScrollType = Partial<STableScrollType>
export type STablePartPaginate = Partial<STablePaginateType>
export type STableRefWrapper<T> = ComputedRef<T> | Ref<T> | T
export type STableValuer<T> = MaybeRef<T> | ComputedRef<T>
export type STablePromiser<T> = Promise<T> | T

export const STable = defineComponent({
  name: 'STable',
  props: {
    size: VueTypes.string<STableSize>().def(undefined),
    rowKey: VueTypes.any<string | STableRowKey>().def(''),
    treeKey: VueTypes.any<string | STableTreeKey>().def('children'),
    border: VueTypes.any<'thead' | 'tbody' | 'tfoot' | boolean | Array<'thead' | 'tbody' | 'tfoot'>>().def(false),
    sticky: VueTypes.object<STablePartStickyType>().def(() => ({})),
    scroll: VueTypes.object<STablePartScrollType>().def(() => ({})),
    columns: VueTypes.array<STablePartColumnType>().def(() => ([])),
    sources: VueTypes.array<STableRecordType>().def(() => ([])),
    summarys: VueTypes.array<STableRecordType>().def(() => ([])),
    paginate: VueTypes.any<STablePartPaginate>().def(() => ({})),
    loadData: VueTypes.func<STableLoadSource>().def(undefined),
    tableLayout: VueTypes.string<'auto' | 'fixed'>().def(undefined),
    persistSourceRanges: VueTypes.any<Array<[number, number]> | boolean>().def(false),
    customHeaderRowAttrs: VueTypes.func<STableCustomHeaderRowAttrs>().def(undefined),
    customBodyerRowAttrs: VueTypes.func<STableCustomBodyerRowAttrs>().def(undefined),
    customFooterRowAttrs: VueTypes.func<STableCustomFooterRowAttrs>().def(undefined),
    customBodyerRowStates: VueTypes.func<STableCustomBodyerRowStates>().def(undefined),
    customHeaderCellRender: VueTypes.func<STableHeaderCellRender>().def(undefined),
    customBodyerCellRender: VueTypes.func<STableBodyerCellRender>().def(undefined),
    customFooterCellRender: VueTypes.func<STableFooterCellRender>().def(undefined),
    preserveSelectedRowKeys: VueTypes.bool().def(false),
    preserveExpandedRowKeys: VueTypes.bool().def(false),
    columnPresetResizable: VueTypes.bool().def(false),
    columnPresetDraggable: VueTypes.bool().def(false),
    columnSorterMultiple: VueTypes.bool().def(false),
    columnPresetSettings: VueTypes.bool().def(false),
    defaultSelectAllRows: VueTypes.bool().def(false),
    defaultExpandAllRows: VueTypes.bool().def(false),
    rowSelectedStrictly: VueTypes.bool().def(true),
    rowExpandedByClick: VueTypes.bool().def(false),
    cellMegreNormalize: VueTypes.bool().def(true),
    expandIndentSize: VueTypes.number().def(undefined),
    selectIndentSize: VueTypes.number().def(undefined),
    selectedRowMode: VueTypes.string<'Radio' | 'Checkbox' | 'None'>().def('None'),
    selectedRowKeys: VueTypes.array<STableKey>().def(() => []),
    expandedRowKeys: VueTypes.array<STableKey>().def(() => []),
    tHeaderThStyle: VueTypes.object().def(() => ({})),
    tBodyerTdStyle: VueTypes.object().def(() => ({})),
    tFooterTdStyle: VueTypes.object().def(() => ({})),
    expandTdStyle: VueTypes.object().def(() => ({})),
    paginateStyle: VueTypes.object().def(() => ({})),
    loadOnScroll: VueTypes.bool().def(false),
    bodyMinRows: VueTypes.any<number | boolean>().def(false),
    showHeader: VueTypes.bool().def(true),
    showBodyer: VueTypes.bool().def(true),
    showFooter: VueTypes.bool().def(true),
    immediate: VueTypes.bool().def(true),
    loadinger: VueTypes.bool().def(true),
    loading: VueTypes.bool().def(false),
    virtual: VueTypes.bool().def(true)
  },
  emits: {
    'update:loading': (loading: boolean) => true,
    'update:sources': (sources: STableRecordType[]) => true,
    'update:summarys': (sources: STableRecordType[]) => true,
    'update:paginate': (paginate: STablePaginateType) => true,
    'update:columns': (columns: STablePartColumnType[]) => true,
    'update:selectedRowKeys': (keys: Array<STableKey>) => true,
    'update:expandedRowKeys': (keys: Array<STableKey>) => true,
    'pageSizeChange': (pageNo: number, pageSize: number) => true,
    'pageChange': (pageNo: number, pageSize: number) => true,
    'expand': (keys: Array<STableKey>, nodes: Array<STableRecordType | null>) => true,
    'select': (keys: Array<STableKey>, nodes: Array<STableRecordType | null>) => true,
    'sorter': (values: Array<STableSorterType>) => true
  },
  setup(props, context) {
    const watchOptions = { immediate: true }
    const watchDeepOptions = { immediate: true, deep: true }
    const renderRowPresets = reactive({ minBuffer: 5, maxBuffer: 10, minHeight: 32 })
    const renderRowRanger = reactive({ renderOffset: [0, ~~(window.innerHeight / renderRowPresets.minHeight)], renderBuffer: [0, 10] })
    const configProvider = inject('configProvider', defaultConfigProvider)

    const propColumns = ref([...props.columns])
    const propSources = ref([...props.sources])
    const propSummarys = ref([...props.summarys])

    const listSorters: Ref<STableSorterType[]> = ref([])
    const treeColumns: Ref<STableWrapColumnType[]> = ref([])
    const listColumns: Ref<Array<STableColumnType>[]> = ref([])
    const dataColumns: Ref<Array<STableColumnType>> = ref([])

    const columnSettingsAllKeys: Ref<string[]> = ref([])
    const columnSettingsAllTrees: Ref<STableSettingsType[]> = ref([])
    const columnSettingsCheckKeys: Ref<string[]> = ref([])

    const columnRowAttrs: Ref<STableRefWrapper<HTMLAttributes>[]> = ref([])
    const columnCellAttrs: Ref<STableRefWrapper<HTMLAttributes>[][]> = ref([])
    const columnCellProps: Ref<STableRefWrapper<UnwrapRef<Exclude<ReturnType<STableHeaderCellRender>, VNode>>['props']>[][]> = ref([])
    const columnCellRender: Ref<Array<Array<any>>> = ref([])

    const treeSources: Ref<STableWrapRecordType[]> = ref([])
    const listSources: Ref<STableWrapRecordType[]> = ref([])
    const sourceRowAttrs: Ref<STableRefWrapper<HTMLAttributes>[]> = ref([])
    const sourceRowStates: Ref<ReturnType<STableCustomBodyerRowStates>[]> = ref([])
    const sourceCellProps: Ref<Record<string, STableRefWrapper<UnwrapRef<Exclude<ReturnType<STableBodyerCellRender>, VNode>>['props']>>[]> = ref([])
    const sourceCellAttrs: Ref<Record<string, STableRefWrapper<HTMLAttributes>>[]> = ref([])
    const sourceCellRender: Ref<Array<Record<string, any>>> = ref([])

    const listSummarys: Ref<STableRecordType[]> = ref([])
    const summaryRowAttrs: Ref<STableRefWrapper<HTMLAttributes>[]> = ref([])
    const summaryCellProps: Ref<Record<string, STableRefWrapper<UnwrapRef<Exclude<ReturnType<STableFooterCellRender>, VNode>>['props']>>[]> = ref([])
    const summaryCellAttrs: Ref<Record<string, STableRefWrapper<HTMLAttributes>>[]> = ref([])
    const summaryCellRender: Ref<Array<Record<string, any>>> = ref([])

    const selectedRowKeys: Ref<Array<STableKey>> = ref([...props.selectedRowKeys])
    const expandedRowKeys: Ref<Array<STableKey>> = ref([...props.expandedRowKeys])
    const sourceRowKeys: Ref<Array<STableKey>> = ref([])
    const loading: Ref<boolean> = ref(props.loading)

    const Optionser = {
      // reference
      refTableNoder: ref(null) as Ref<HTMLElement | null>,
      refTableTheader: ref(null) as Ref<HTMLElement | null>,
      refTableWrapper: ref(null) as Ref<HTMLElement | null>,
      refTableContainer: ref(null) as Ref<HTMLElement | null>,
      tableTheadSizes: ref([]) as Ref<Array<STableCellSizesType>>,
      windowInnerWidth: ref(window.innerWidth),
      windowInnerHeight: ref(window.innerHeight),

      // resizer - container
      getResizerContainer: undefined as (() => HTMLElement) | undefined,
      resizerContainer: ref(null) as Ref<HTMLElement | null>,
      resizerScrollTop: ref(0),
      resizerScrollLeft: ref(0),
      resizerScrollRight: ref(0),
      resizerScrollBottom: ref(0),
      resizerScrollClientWidth: ref(0),
      resizerScrollClientHeight: ref(0),

      // wrapper - scrollable
      wrapperScrollTop: ref(0),
      wrapperScrollLeft: ref(0),
      wrapperScrollRight: ref(0),
      wrapperScrollBottom: ref(0),
      wrapperScrollClientHeight: ref(0),
      wrapperScrollClientWidth: ref(0),

      // column - draggable
      cursor: reactive({ visible: false, top: 0, left: 0, width: 0, height: 0, rowIndex: 0, colIndex: 0 }),
      dragger: reactive({ activate: false, visible: false, rowIndex: 0, colIndex: 0, allow: false, value: '', left: 0, top: 0, element: null as HTMLElement | null }),

      // column - resizable
      resizer: {
        point: 0,
        queues: [] as { column: STableColumnType; width: number; minWidth: number; maxWidth: number; }[],
        activate: false
      }
    }

    const Paginator = {
      paginate: reactive({
        hideOnSinglePage: helper.isBoolean(props.paginate.hideOnSinglePage) ? props.paginate.hideOnSinglePage : false,
        defaultPageSize: helper.isFiniteNumber(props.paginate.defaultPageSize) && props.paginate.defaultPageSize > 0 ? ~~props.paginate.defaultPageSize : 20,
        pageSizeOptions: helper.isNonEmptyArray(props.paginate.pageSizeOptions) ? props.paginate.pageSizeOptions : ['10', '20', '25', '50', '100', '200', '500'],
        showSizeChanger: helper.isBoolean(props.paginate.showSizeChanger) ? props.paginate.showSizeChanger : undefined,
        showQuickJumper: helper.isBoolean(props.paginate.showQuickJumper) ? props.paginate.showQuickJumper : false,
        showLessItems: helper.isBoolean(props.paginate.showLessItems) ? props.paginate.showLessItems : false,
        loadTotalSize: helper.isFiniteNumber(props.paginate.loadTotalSize) && props.paginate.loadTotalSize > 0 ? ~~props.paginate.loadTotalSize : undefined,
        loadTotalPage: helper.isFiniteNumber(props.paginate.loadTotalPage) && props.paginate.loadTotalPage > 0 ? ~~props.paginate.loadTotalPage : undefined,
        loadPageSize: helper.isFiniteNumber(props.paginate.loadPageSize) && props.paginate.loadPageSize > 0 ? ~~props.paginate.loadPageSize : undefined,
        loadPageNo: helper.isFiniteNumber(props.paginate.loadPageNo) && props.paginate.loadPageNo > 0 ? ~~props.paginate.loadPageNo : undefined,
        totalSize: helper.isFiniteNumber(props.paginate.totalSize) && props.paginate.totalSize > 0 ? ~~props.paginate.totalSize : 0,
        totalPage: helper.isFiniteNumber(props.paginate.totalPage) && props.paginate.totalPage > 0 ? ~~props.paginate.totalPage : 0,
        pageSize: helper.isFiniteNumber(props.paginate.pageSize) && props.paginate.pageSize > 0 ? ~~props.paginate.pageSize : (helper.isFiniteNumber(props.paginate.defaultPageSize) && props.paginate.defaultPageSize > 0 ? ~~props.paginate.defaultPageSize : 20),
        pageNo: helper.isFiniteNumber(props.paginate.pageNo) && props.paginate.pageNo > 0 ? ~~props.paginate.pageNo : 1,
        showTotal: helper.isFunction(props.paginate.showTotal) ? props.paginate.showTotal : props.paginate.showTotal === true ? (total: any, range: any) => `第 ${range[0]}-${range[1]} 条 (共 ${total} 条)` : undefined,
        disabled: helper.isBoolean(props.paginate.disabled) ? props.paginate.disabled : false,
        visible: helper.isBoolean(props.paginate.visible) ? props.paginate.visible : false,
        simple: helper.isBoolean(props.paginate.simple) ? props.paginate.simple : false,
        fixed: helper.isBoolean(props.paginate.fixed) ? props.paginate.fixed : undefined,
        mode: (props.paginate.mode === 'local' ? 'local' : 'remote') as 'local' | 'remote',
        size: (props.size || '') as string
      }),
      update: (paginate: STablePartPaginate & { size?: string}) => {
        Paginator.paginate.size = !Methoder.isOwnProperty(paginate, ['size']) ? Paginator.paginate.size : ''
        Paginator.paginate.mode = !Methoder.isOwnProperty(paginate, ['mode']) ? Paginator.paginate.mode : paginate.mode === 'local' ? 'local' : 'remote'
        Paginator.paginate.fixed = helper.isBoolean(props.paginate.fixed) ? props.paginate.fixed : (helper.isFiniteNumber(Normalizer.sticky.value.bottomFooter) || Normalizer.sticky.value.bottomFooter === true)
        Paginator.paginate.simple = !Methoder.isOwnProperty(paginate, ['simple']) ? Paginator.paginate.simple : paginate.simple === true
        Paginator.paginate.visible = !Methoder.isOwnProperty(paginate, ['visible']) ? Paginator.paginate.visible : paginate.visible === true
        Paginator.paginate.disabled = !Methoder.isOwnProperty(paginate, ['disabled']) ? Paginator.paginate.disabled : paginate.disabled === true
        Paginator.paginate.showTotal = !Methoder.isOwnProperty(paginate, ['showTotal']) ? Paginator.paginate.showTotal : helper.isFunction(paginate.showTotal) ? paginate.showTotal : paginate.showTotal === true ? (total: any, range: any) => `第 ${range[0]}-${range[1]} 条 (共 ${total} 条)` : undefined
        Paginator.paginate.showLessItems = !Methoder.isOwnProperty(paginate, ['showLessItems']) ? Paginator.paginate.showLessItems : paginate.showLessItems === true
        Paginator.paginate.defaultPageSize = !Methoder.isOwnProperty(paginate, ['defaultPageSize']) ? Paginator.paginate.defaultPageSize : helper.isFiniteNumber(paginate.defaultPageSize) && paginate.defaultPageSize > 0 ? paginate.defaultPageSize : 20
        Paginator.paginate.pageSizeOptions = !Methoder.isOwnProperty(paginate, ['pageSizeOptions']) ? Paginator.paginate.pageSizeOptions : helper.isNonEmptyArray(paginate.pageSizeOptions) ? paginate.pageSizeOptions : ['10', '20', '25', '50', '100', '200', '500']
        Paginator.paginate.showSizeChanger = !Methoder.isOwnProperty(paginate, ['showSizeChanger']) ? Paginator.paginate.showSizeChanger : helper.isBoolean(paginate.showSizeChanger) ? paginate.showSizeChanger : undefined
        Paginator.paginate.showQuickJumper = !Methoder.isOwnProperty(paginate, ['showQuickJumper']) ? Paginator.paginate.showQuickJumper : paginate.showQuickJumper === true
        Paginator.paginate.hideOnSinglePage = !Methoder.isOwnProperty(paginate, ['hideOnSinglePage']) ? Paginator.paginate.hideOnSinglePage : paginate.hideOnSinglePage === true

        Paginator.paginate.pageNo = !Methoder.isOwnProperty(paginate, ['pageNo']) ? Paginator.paginate.pageNo : helper.isFiniteNumber(paginate.pageNo) && paginate.pageNo > 0 ? ~~paginate.pageNo : 1
        Paginator.paginate.pageSize = !Methoder.isOwnProperty(paginate, ['pageSize']) ? Paginator.paginate.pageSize : helper.isFiniteNumber(paginate.pageSize) && paginate.pageSize > 0 ? ~~paginate.pageSize : 20
        Paginator.paginate.totalSize = !Methoder.isOwnProperty(paginate, ['totalSize']) ? Paginator.paginate.totalSize : helper.isFiniteNumber(paginate.totalSize) && paginate.totalSize > 0 ? ~~paginate.totalSize : 0
        Paginator.paginate.totalPage = !Methoder.isOwnProperty(paginate, ['totalPage']) ? (~~(Paginator.paginate.totalSize / Paginator.paginate.pageSize) + (Paginator.paginate.totalSize % Paginator.paginate.pageSize ? 1 : 0)) : helper.isFiniteNumber(paginate.totalPage) && paginate.totalPage > 0 ? ~~paginate.totalPage : 0
        Paginator.paginate.pageNo = Paginator.paginate.pageNo <= Paginator.paginate.totalPage ? Paginator.paginate.pageNo : Paginator.paginate.totalPage
        Paginator.paginate.pageNo = Paginator.paginate.pageNo > 0 ? Paginator.paginate.pageNo : 1

        Paginator.paginate.loadPageNo = !Methoder.isOwnProperty(paginate, ['loadPageNo']) ? Paginator.paginate.loadPageNo : helper.isFiniteNumber(paginate.loadPageNo) && paginate.loadPageNo > 0 ? ~~paginate.loadPageNo : 1
        Paginator.paginate.loadPageSize = !Methoder.isOwnProperty(paginate, ['loadPageSize']) ? Paginator.paginate.loadPageSize : helper.isFiniteNumber(paginate.loadPageSize) && paginate.loadPageSize > 0 ? ~~paginate.loadPageSize : 500
        Paginator.paginate.loadTotalSize = !Methoder.isOwnProperty(paginate, ['loadTotalSize']) ? Paginator.paginate.loadTotalSize : helper.isFiniteNumber(paginate.loadTotalSize) && paginate.loadTotalSize > 0 ? ~~paginate.loadTotalSize : 0
        Paginator.paginate.loadTotalPage = !Methoder.isOwnProperty(paginate, ['loadTotalPage']) ? (~~(Paginator.paginate.loadTotalSize! / Paginator.paginate.loadPageSize!) + (Paginator.paginate.loadTotalSize! % Paginator.paginate.loadPageSize! ? 1 : 0)) : helper.isFiniteNumber(paginate.loadTotalPage) && paginate.loadTotalPage > 0 ? ~~paginate.loadTotalPage : 0
        Paginator.paginate.loadPageNo = Paginator.paginate.loadPageNo! <= Paginator.paginate.loadTotalPage! ? Paginator.paginate.loadPageNo! : Paginator.paginate.loadTotalPage!
        Paginator.paginate.loadPageNo = Paginator.paginate.loadPageNo! > 0 ? Paginator.paginate.loadPageNo! : 1
      }
    }

    const Requester = {
      core: (page: STablePaginateType) => {
        if (Paginator.paginate.mode !== 'local') return Requester.send(page)
        if (Paginator.paginate.mode === 'local') return Requester.parse(page)
      },
      send: (page: STablePaginateType) => {
        if (!helper.isFunction(props.loadData)) {
          Eventer.updateScrollToFirstRange()
          return
        }

        if (!loading.value) {
          loading.value = true
        }

        const parameter = {
          sorter: Methoder.getValue(listSorters),
          paginate: {
            pageNo: page.pageNo,
            pageSize: page.pageSize,
            totalPage: page.totalPage,
            totalSize: page.totalSize,
            mode: page.mode
          }
        }

        const failurer = (): void => {
          Eventer.updateScrollToFirstRange()
          Paginator.update(parameter.paginate)
          loading.value = false
        }

        const successor = (res: any): Promise<void> => {
          return Promise.resolve(Res.interceptor(res))
            .then(result => {
              Paginator.update({ pageNo: result.pageNo, totalSize: result.totalSize })

              if (Paginator.paginate.pageNo > Paginator.paginate.totalPage && Paginator.paginate.pageNo > 1) {
                Paginator.update({ pageNo: Paginator.paginate.pageNo - 1 })
                return Requester.refresh()
              }

              if (Methoder.isSourcesChanged(result.data.slice(0, treeSources.value.length), treeSources.value)) {
                sourceRowAttrs.value = []
                sourceRowStates.value = []
                sourceCellProps.value = []
                sourceCellAttrs.value = []
                sourceCellRender.value = []
              }

              Eventer.updateScrollToFirstRange()

              sourceRowKeys.value = []
              treeSources.value = Methoder.normalizeTreeSources(result.data, [])
              listSources.value = Methoder.normalizeListSources(treeSources.value, [])
              Methoder.normalizeInitSources(listSources.value)
              Methoder.cleanSelectedRowKeys()
              Methoder.cleanExpandedRowKeys()

              loading.value = false
            })
        }

        return Promise.resolve(props.loadData(parameter))
          .then(successor)
          .catch(failurer)
      },
      parse: (page: STablePaginateType) => {

      },
      reload: async(delay?: Promise<void> | boolean | number, force?: boolean) => {
        force = helper.isBoolean(delay) ? delay : force === true
        delay = !helper.isBoolean(delay) ? delay : Promise.resolve()

        const update = () => { force && Methoder.forceUpdate() }
        const request = () => Requester.core({ ...Paginator.paginate })
        return helper.toPromise(delay).then(() => request()).finally(() => update)
      },
      refresh: async(delay?: Promise<void> | boolean | number, force?: boolean) => {
        force = helper.isBoolean(delay) ? delay : force === true
        delay = !helper.isBoolean(delay) ? delay : Promise.resolve()

        const update = () => { force && Methoder.forceUpdate() }
        const request = () => Requester.core({ ...Paginator.paginate, pageNo: 1 })
        return helper.toPromise(delay).then(() => request()).finally(() => update)
      }
    }

    const Normalizer = {
      size: computed(() => {
        return props.size || (configProvider.componentSize === 'large' ? 'default' : configProvider.componentSize)
      }),

      sticky: computed(() => ({
        topHeader: props.sticky.topHeader ?? false,
        leftFooter: props.sticky.leftFooter ?? true,
        rightFooter: props.sticky.rightFooter ?? true,
        bottomFooter: props.sticky.bottomFooter ?? true,
        bottomScrollbar: props.sticky.bottomScrollbar ?? true
      })),

      scroll: computed(() => ({
        x: props.scroll.x ?? false,
        y: props.scroll.y ?? false,
        overflow: ['hidden', 'visible', 'scroll', 'auto', 'unset'].includes(props.scroll.overflow!) ? props.scroll.overflow! : null,
        getScrollResizeContainer: () => props.scroll.getScrollResizeContainer?.() || Optionser.getResizerContainer?.(),
        scrollToFirstXOnChange: props.scroll.scrollToFirstXOnChange !== false,
        scrollToFirstYOnChange: props.scroll.scrollToFirstYOnChange !== false,
        scrollToFirstOffsetX: props.scroll.scrollToFirstOffsetX,
        scrollToFirstOffsetY: props.scroll.scrollToFirstOffsetY,
        scrollToFirstTargetX: props.scroll.scrollToFirstTargetX,
        scrollToFirstTargetY: props.scroll.scrollToFirstTargetY
      })),

      virtual: computed(() => {
        return props.virtual !== false
      }),

      bodyMinRows: computed(() => {
        if (props.bodyMinRows === true) {
          return Math.max(Paginator.paginate.pageSize, 0)
        }

        if (props.bodyMinRows === false) {
          return 0
        }

        return Math.max(props.bodyMinRows, 0)
      }),

      loadOnScroll: computed(() => (
        Paginator.paginate.mode === 'local' &&
        props.loadOnScroll !== false
      )),

      persistSourceRanges: computed(() => {
        if (helper.isNonEmptyArray(props.persistSourceRanges)) {
          const presetSpans: [number, number][] = props.persistSourceRanges
          const filterSpans: [number, number][] = presetSpans.filter(spans => helper.isArray(spans) && +spans[0] >= 0 && +spans[1] >= 0 && +spans[0] !== +spans[1])
          const sorterSpans: [number, number][] = filterSpans.map(spans => [Math.min(+spans[0], +spans[1]), Math.max(+spans[0], +spans[1])])

          sorterSpans.sort((next, prev) => next[0] - prev[0])

          let cache: [number, number] = [0, 0]
          let spans: [number, number][] = []

          for (const span of sorterSpans) {
            if (span[0] < cache[1]) {
              cache[1] = Math.max(cache[1], span[1])
              continue
            }

            spans = [...spans, span]
            cache = span
          }

          return spans
        }

        return props.persistSourceRanges === true
      })
    }

    const Computer = {
      scrollbar: computed(() => {
        let overflow = 'visible'

        overflow = Computer.tableBodyWidth.value !== '100%' ? 'auto' : overflow
        overflow = Computer.tableBodyHeight.value !== 'auto' ? 'auto' : overflow
        overflow = Computer.tableBodyOverflow.value ?? overflow

        return {
          overflow: overflow,
          optionser: Optionser,
          direction: 'horizontal'
        }
      }),
      hasBorder: computed(() => {
        return props.border === true || listColumns.value.length > 1
      }),
      hasHeader: computed(() => {
        return props.showHeader !== false && dataColumns.value.length > 0
      }),
      hasBodyer: computed(() => {
        return props.showBodyer !== false && listSources.value.length > 0
      }),
      hasFooter: computed(() => {
        return props.showFooter !== false && listSummarys.value.length > 0
      }),
      hasSelection: computed(() => {
        return (
          props.selectedRowMode === 'Checkbox' ||
          props.selectedRowMode === 'Radio'
        )
      }),
      isFixedTop: computed(() => {
        return (
          Normalizer.sticky.value.topHeader === true ||
          helper.isFiniteNumber(Normalizer.sticky.value.topHeader) ||
          (/^[+-]?\d+\.?\d*(px)?$/).test(`${Normalizer.scroll.value.y}`)
        )
      }),
      fixedLeftIndex: computed(() => {
        const indexs: number[] = []

        for (const columns of Computer.filterListColumns.value) {
          for (const column of columns) {
            if (column && column.colSpan > 0 && column.rowSpan > 0 && column.fixed === 'left') {
              indexs.push(column.colOffset + column.colSpan - 1)
            }
          }
        }

        return indexs.length > 0 ? Math.max(...indexs) : -1
      }),
      fixedRightIndex: computed(() => {
        const indexs: number[] = []

        for (const columns of Computer.filterListColumns.value) {
          for (const column of columns) {
            if (column && column.colSpan > 0 && column.rowSpan > 0 && column.fixed === 'right') {
              indexs.push(column.colOffset)
            }
          }
        }

        indexs.splice(0, indexs.length, ...indexs.filter(index => index > Computer.fixedLeftIndex.value))

        return indexs.length > 0 ? Math.min(...indexs) : -1
      }),
      tableBodyWidth: computed(() => {
        const x = Normalizer.scroll.value.x
        const resizeWidth = Optionser.resizerScrollClientWidth.value
        const windowWidth = Optionser.windowInnerWidth.value

        if (/^0(px)?$|^-\d+\.?\d*(px)?$/.test(`${x}`)) {
          return (resizeWidth || windowWidth) + parseInt(`${x}`) + 'px'
        }

        if (/^\+?\d+\.?\d*(px)?$/.test(`${x}`)) {
          return parseInt(`${x}`) + 'px'
        }

        if (typeof x === 'string') {
          return x || '100%'
        }

        return '100%'
      }),
      tableBodyHeight: computed(() => {
        const y = Normalizer.scroll.value.y
        const paginate = Paginator.paginate
        const pageHide = paginate.visible !== true || (paginate.totalPage <= 1 && paginate.hideOnSinglePage)
        const pageHeight = paginate.size === 'small' || paginate.simple ? 36 : 44
        const resizeHeight = Optionser.resizerScrollClientHeight.value
        const windowHeight = Optionser.windowInnerHeight.value

        if (/^0(px)?$|^-\d+\.?\d*(px)?$/.test(`${y}`)) {
          return pageHide
            ? (resizeHeight || windowHeight) + parseInt(`${y}`) + 'px'
            : (resizeHeight || windowHeight) + parseInt(`${y}`) - pageHeight + 'px'
        }

        if (/^\d+\.?\d*(px)?$/.test(`${y}`)) {
          return pageHide
            ? parseInt(`${y}`) + 'px'
            : parseInt(`${y}`) - pageHeight + 'px'
        }

        return 'auto'
      }),
      tableBodyOverflow: computed(() => {
        if (Normalizer.scroll.value.overflow === undefined || Normalizer.scroll.value.overflow === null) {
          return Normalizer.scroll.value.overflow
        }

        return ['auto', 'hidden', 'visible'].includes(Normalizer.scroll.value.overflow)
          ? Normalizer.scroll.value.overflow
          : 'visible'
      }),
      filterListColumns: computed(() => {
        type CellEmpters = Set<number>[]
        type CellSpikers = Set<number>[]
        type CellCachers = Map<number, STableCellCacheType>[]
        type CellMergers = Array<ReturnType<typeof Methoder.takeCellMegre> & { cacher: { resizable?: boolean; } }>

        const cellMergers: CellMergers = []
        const cellCachers: CellCachers = []
        const cellSpikers: CellSpikers = []
        const cellEmpters: CellEmpters = []

        const mergerColumns = (arrays: STableColumnType[][], options: { mergers: CellMergers; cachers: CellCachers; spikers: CellSpikers; empters: CellEmpters; }) => {
          const StoreMergers = options.mergers
          const StoreCachers = options.cachers
          const StoreSpikers = options.spikers
          const StoreEmpters = options.empters

          const rowMaxSpaner = (columns: STableColumnType[]) : number => {
            const spans = columns.map(column => columnSettingsCheckKeys.value.includes(column.key) ? column.rowMaxSpan : 0)
            return Math.max(0, ...spans)
          }

          const colMaxSpaner = (column: STableColumnType) : number => {
            return helper.isNonEmptyArray(column.children)
              ? column.children.reduce((span, column) => span + colMaxSpaner(column), 0)
              : columnSettingsCheckKeys.value.includes(column.key) ? column.colMaxSpan : 0
          }

          const colSpaner = (column: STableColumnType) : number => {
            if (helper.isNonEmptyArray(column.children)) {
              return column.children.reduce((span, column) => span + colSpaner(column), 0)
            }

            const cellProps = Methoder.getValue(columnCellProps.value[column.rowIndex][column.colIndex])
            const cellColSpan = helper.isFiniteNumber(cellProps?.colSpan) ? cellProps.colSpan : helper.isFiniteNumber(column.colSpan) ? column.colSpan : 1
            return columnSettingsCheckKeys.value.includes(column.key) ? cellColSpan : 0
          }

          for (const [rowIndex, columns] of arrays.entries()) {
            const cellCachers = StoreCachers[rowIndex] || new Map()
            const cellSpikers = StoreSpikers[rowIndex] || new Set()
            const cellEmpters = StoreEmpters[rowIndex] || new Set()

            StoreCachers[rowIndex] = cellCachers
            StoreSpikers[rowIndex] = cellSpikers
            StoreEmpters[rowIndex] = cellEmpters

            for (const [colIndex, column] of columns.entries()) {
              if (!column) {
                cellCachers.set(colIndex, {
                  index: colIndex,
                  colSpan: 1,
                  rowSpan: 1,
                  colCount: 0,
                  rowCount: 0,
                  cellAttrs: null,
                  cellProps: null,
                  cellValue: null,
                  cellRender: true
                })
                continue
              }

              let colSpan = 0
              let rowSpan = 0
              let colCount = 0
              let rowCount = 0
              let cellRender = true

              const colMaxSpan = colMaxSpaner(column)
              const rowMaxSpan = rowMaxSpaner(dataColumns.value)
              const cellAttrs = Methoder.getValue(columnCellAttrs.value[column.rowIndex][column.colIndex])
              const cellProps = Methoder.getValue(columnCellProps.value[column.rowIndex][column.colIndex])
              const cellValue = Methoder.getValue(columnCellRender.value[column.rowIndex][column.colIndex])

              rowSpan = helper.isFiniteNumber(cellProps?.rowSpan) ? cellProps.rowSpan : helper.isFiniteNumber(column.rowSpan) ? column.rowSpan : column.rowIndex === column.rowMaxSpan - 1 ? Math.max(rowMaxSpan - column.rowIndex, 1) : 1
              colSpan = helper.isFiniteNumber(cellProps?.colSpan) ? cellProps.colSpan : helper.isFiniteNumber(column.colSpan) ? column.colSpan : colSpaner(column)

              cellRender = cellProps?.cellSpan !== false && columnSettingsCheckKeys.value.includes(column.key)

              // fix bug when in thead (colCount = colSpan - 1)
              colCount = colSpan - colMaxSpan
              rowCount = rowSpan - 1

              cellCachers.set(colIndex, {
                index: colIndex,
                colSpan: colSpan,
                rowSpan: rowSpan,
                colCount: colCount,
                rowCount: rowCount,
                cellAttrs: cellAttrs,
                cellProps: cellProps,
                cellValue: cellValue,
                cellRender: cellRender
              })
            }
          }

          for (const [rowIndex, columns] of arrays.entries()) {
            for (const [colIndex] of columns.entries()) {
              const cellCachers = StoreCachers[rowIndex]!
              const cellCahcer = cellCachers.get(colIndex)!
              const cellParent = Methoder.findParentColumn(arrays, rowIndex, colIndex)
              let rowCount = cellCahcer.rowCount
              let colCount = cellCahcer.colCount

              if (rowCount > 0) {
                for (let next = 1; next <= rowCount; next++) {
                  const nextCachers = StoreCachers[rowIndex + next]
                  const nextCacher = nextCachers.get(colIndex)

                  if (nextCachers && nextCacher) {
                    nextCachers.set(colIndex, {
                      index: colIndex,
                      colSpan: cellCahcer.colSpan,
                      colCount: cellCahcer.colCount,
                      rowSpan: 0,
                      rowCount: -1,
                      cellAttrs: nextCacher.cellAttrs,
                      cellProps: nextCacher.cellProps,
                      cellValue: nextCacher.cellValue,
                      cellRender: true
                    })
                  }
                }

                cellCahcer.rowCount = rowCount = 0
              }

              if (colCount > 0) {
                for (let next = colIndex + 1; next < columns.length; next++) {
                  const nextIndex = colIndex + next
                  const nextCacher = cellCachers?.get(nextIndex)

                  if (nextCacher && nextCacher.colCount < 0) {
                    colCount += nextCacher.colCount
                  }
                }

                for (let next = 1; next <= colCount; next++) {
                  const nextIndex = colIndex + next
                  const nextCacher = cellCachers.get(nextIndex)!
                  const nextParent = Methoder.findParentColumn(arrays, rowIndex, nextIndex)
                  const nextColumn = columns[nextIndex]

                  if (cellParent !== nextParent || !nextColumn || nextColumn.children.length > 0) {
                    cellCahcer.colCount = 0
                    cellCahcer.colSpan = cellCahcer.colSpan - (colCount - next + 1)
                    break
                  }

                  if (nextCacher.colCount >= 0) {
                    cellCachers.set(nextIndex, {
                      index: nextIndex,
                      rowCount: nextCacher.rowCount,
                      rowSpan: nextCacher.rowSpan,
                      colCount: nextCacher.colCount - 1,
                      colSpan: nextCacher.colSpan - 1,
                      cellAttrs: nextCacher.cellAttrs,
                      cellProps: nextCacher.cellProps,
                      cellValue: nextCacher.cellValue,
                      cellRender: true
                    })
                  }
                }
              }
            }
          }

          for (const [rowIndex, columns] of arrays.entries()) {
            for (const [colIndex, column] of columns.entries()) {
              const cellCachers = StoreCachers[rowIndex]
              const cellSpikers = StoreSpikers[rowIndex]
              const cellEmpters = StoreEmpters[rowIndex]

              const merger = Methoder.takeCellMegre({
                index: colIndex,
                colIndex: colIndex,
                rowIndex: rowIndex,
                cachers: cellCachers,
                spikers: cellSpikers,
                empters: cellEmpters
              })

              if (column) {
                const filters = columns.filter((_, i) => i === colIndex || (i > colIndex && i < colIndex + merger.cacher.colSpan))
                const resizable = filters.some(column => column.resizable !== false)
                Object.assign(merger.cacher, { resizable })
              }

              StoreMergers.push(merger)
            }
          }
        }

        const filterColumns = (columns: STableWrapColumnType[], wraps: STableWrapColumnType[] = [], parent?: STableWrapColumnType | null) => {
          let rowSpan = 0
          let colOffset = 0
          let rowOffset = 0

          if (parent) {
            rowSpan = parent.referColumn.rowSpan
            colOffset = parent.referColumn.colOffset
            rowOffset = parent.referColumn.rowOffset
            rowOffset = rowSpan > 0 ? rowOffset + rowSpan : rowOffset
          }

          for (const wrap of columns) {
            const rowIndex = wrap.referColumn.rowIndex
            const colIndex = wrap.referColumn.colIndex
            const refCacher = cellMergers.find(opt => opt.rowIndex === rowIndex && opt.colIndex === colIndex)?.cacher
            const refRowSpan = refCacher ? (helper.isFiniteNumber(refCacher?.rowSpan) && refCacher.rowSpan > 0 ? refCacher.rowSpan : 0) : 1
            const refColSpan = refCacher ? (helper.isFiniteNumber(refCacher?.colSpan) && refCacher.colSpan > 0 ? refCacher.colSpan : 0) : 1
            const refResizable = refCacher ? (helper.isBoolean(refCacher.resizable) ? refCacher.resizable : true) : wrap.referColumn.resizable
            const refCellProps = Methoder.getValue(columnCellProps.value[rowIndex][colIndex])

            if (!columnSettingsCheckKeys.value.includes(wrap.key)) {
              continue
            }

            const wrapColumn: STableWrapColumnType = {
              ...wrap,
              parentColumn: parent || null,
              treeChildren: [],
              referColumn: {
                ...wrap.referColumn,
                colSpan: refColSpan,
                rowSpan: refRowSpan,
                resizable: refResizable !== false,
                colOffset: colOffset,
                rowOffset: rowOffset,
                colMaxSpan: refColSpan,
                rowMaxSpan: refRowSpan > 0 ? rowOffset + refRowSpan : rowOffset,
                align: helper.isNonEmptyObject(refCellProps) && Object.hasOwn(refCellProps, 'align') ? refCellProps.align ?? wrap.referColumn.align : wrap.referColumn.align,
                fixed: helper.isNonEmptyObject(refCellProps) && Object.hasOwn(refCellProps, 'fixed') ? refCellProps.fixed ?? wrap.referColumn.fixed : wrap.referColumn.fixed,
                width: helper.isNonEmptyObject(refCellProps) && Object.hasOwn(refCellProps, 'width') ? refCellProps.width ?? wrap.referColumn.width : wrap.referColumn.width,
                minWidth: helper.isNonEmptyObject(refCellProps) && Object.hasOwn(refCellProps, 'minWidth') ? refCellProps.minWidth ?? wrap.referColumn.minWidth : wrap.referColumn.minWidth,
                maxWidth: helper.isNonEmptyObject(refCellProps) && Object.hasOwn(refCellProps, 'maxWidth') ? refCellProps.maxWidth ?? wrap.referColumn.maxWidth : wrap.referColumn.maxWidth,
                ellipsis: helper.isNonEmptyObject(refCellProps) && Object.hasOwn(refCellProps, 'ellipsis') ? refCellProps.ellipsis ?? wrap.referColumn.ellipsis : wrap.referColumn.ellipsis,
                tooltip: helper.isNonEmptyObject(refCellProps) && Object.hasOwn(refCellProps, 'tooltip') ? refCellProps.tooltip ?? wrap.referColumn.tooltip : wrap.referColumn.tooltip,
                sorter: helper.isNonEmptyObject(refCellProps) && Object.hasOwn(refCellProps, 'sorter') ? refCellProps.sorter ?? wrap.referColumn.sorter : wrap.referColumn.sorter
              }
            }

            if (helper.isNonEmptyArray(wrap.treeChildren)) {
              const childTrees = filterColumns(wrap.treeChildren, [], wrapColumn)
              const filterTrees = childTrees.filter(wrap => wrap.referColumn.rowSpan > 0 && wrap.referColumn.colSpan > 0)
              const cellRowMaxSpan = Math.max(...filterTrees.map(child => child.referColumn.rowMaxSpan), wrapColumn.referColumn.rowMaxSpan)
              const cellColMaxSpan = filterTrees.reduce((colMaxSpan, child) => colMaxSpan + child.referColumn.colMaxSpan, 0)
              const cellResizable = childTrees.some(wrap => wrap.referColumn.resizable !== false)

              wrapColumn.referColumn.rowMaxSpan = cellRowMaxSpan
              wrapColumn.referColumn.colMaxSpan = cellColMaxSpan
              wrapColumn.referColumn.resizable = cellResizable
              wrapColumn.referColumn.colSpan = cellColMaxSpan
              wrapColumn.treeChildren = childTrees

              if (helper.isNonEmptyArray(childTrees)) {
                wraps.push(wrapColumn)
              }
            }

            if (!helper.isNonEmptyArray(wrap.treeChildren)) {
              wraps.push(wrapColumn)
            }

            colOffset += refRowSpan > 0 && refColSpan > 0 ? refColSpan : 0
          }

          return wraps
        }

        const updateColumns = (columns: STableWrapColumnType[], arrays: STableColumnType[][] = [], isRoot: boolean = true) => {
          for (const wrap of columns) {
            const colIndex = wrap.referColumn.colIndex
            const rowIndex = wrap.referColumn.rowIndex

            arrays[rowIndex] = arrays[rowIndex] || []
            arrays[rowIndex][colIndex] = arrays[rowIndex][colIndex] || reactive(wrap.referColumn)

            if (helper.isNonEmptyArray(wrap.treeChildren)) {
              updateColumns(wrap.treeChildren, arrays, false)
            }
          }

          return arrays
        }

        mergerColumns(listColumns.value, {
          mergers: cellMergers,
          cachers: cellCachers,
          spikers: cellSpikers,
          empters: cellEmpters
        })

        // filter column when column.key in checkKeys
        return updateColumns(filterColumns(treeColumns.value))
      }),
      filterDataColumns: computed(() => {
        const recordColumns: STableColumnType[] = []
        const filterColumns: STableColumnType[] = []

        for (const columns of Computer.filterListColumns.value) {
          for (const column of columns) {
            if (!column) {
              continue
            }

            if (column.rowOffset + column.rowSpan === column.rowMaxSpan) {
              // using colIndex, not colOffset, because RenderColGroup
              recordColumns[column.colIndex] = column
            }
          }
        }

        for (const column of recordColumns) {
          if (column) filterColumns.push(column)
        }

        return filterColumns
      }),
      filterPageSources: computed(() => {
        const filter = (record: STableWrapRecordType) => {
          const parentKeys = record.parentKeys
          const expandedKeys = expandedRowKeys.value

          if (parentKeys.some(key => !expandedKeys.includes(key))) {
            return false
          }

          return (
            Normalizer.loadOnScroll.value === true ||
            record.rowGroupIndex >= Paginator.paginate.pageSize * (Paginator.paginate.pageNo - 1) ||
            record.rowGroupIndex < Paginator.paginate.pageSize * Paginator.paginate.pageNo
          )
        }

        const writer = (record: STableWrapRecordType, index: number) => {
          return {
            ...record,
            rowIndex: index + 1
          }
        }

        return listSources.value.filter(filter).map(writer)
      }),
      filterRangeSources: computed(() => {
        let persistGrouperOne = Infinity
        let persistGrouperTwo = -Infinity

        const renderBufferOne = renderRowRanger.renderBuffer[0]
        const renderBufferTwo = renderRowRanger.renderBuffer[1]
        const renderOffsetOne = renderRowRanger.renderOffset[0]
        const renderOffsetTwo = renderRowRanger.renderOffset[1]

        const renderRangerArr = Computer.filterPageSources.value as STableWrapRecordType[]
        const renderRangerOne = renderOffsetOne - renderBufferOne > 0 ? renderOffsetOne - renderBufferOne : 0
        const renderRangerTwo = renderOffsetTwo + renderBufferTwo < listSources.value.length ? renderOffsetTwo + renderBufferTwo : listSources.value.length
        const renderGrouperOne = renderRangerArr.find((_, index) => index >= renderRangerOne)?.rowGroupIndex || 0
        const renderGrouperTwo = renderRangerArr.findLast((_, index) => index <= renderRangerTwo)?.rowGroupIndex || 0

        if (helper.isArray(Normalizer.persistSourceRanges.value)) {
          for (const ranges of Normalizer.persistSourceRanges.value) {
            if (renderGrouperOne >= ranges[0] || renderGrouperTwo <= ranges[1]) {
              persistGrouperOne = Math.min(ranges[0], persistGrouperOne)
              persistGrouperTwo = Math.max(ranges[0], persistGrouperTwo)
            }
          }
        }

        const filterByGroupRanger = (record: STableWrapRecordType, index: number) => {
          if (Normalizer.virtual.value !== true) {
            return true
          }

          if (Normalizer.persistSourceRanges.value === true) {
            return true
          }

          if (renderRangerArr.length <= Normalizer.bodyMinRows.value) {
            return true
          }

          if (record.rowGlobalIndex >= persistGrouperOne && record.rowGlobalIndex <= persistGrouperTwo) {
            return true
          }

          return index >= renderRangerOne && index <= renderRangerTwo
        }

        return renderRangerArr.filter(filterByGroupRanger)
      }),
      filterPageSummarys: computed(() => {
        return listSummarys.value.filter(summary => summary)
      }),
      overflowScrollBottom: computed(() => {
        return Optionser.wrapperScrollBottom.value > 1 || Optionser.resizerScrollBottom.value > 1
      }),
      overflowScrollRight: computed(() => {
        return Optionser.wrapperScrollRight.value > 1 || Optionser.resizerScrollRight.value > 1
      }),
      overflowScrollLeft: computed(() => {
        return Optionser.wrapperScrollLeft.value > 1 || Optionser.resizerScrollLeft.value > 1
      }),
      overflowScrollTop: computed(() => {
        return Optionser.wrapperScrollTop.value > 1 || Optionser.resizerScrollTop.value > 1
      })
    }

    const Methoder = {
      getValue<T>(value: STableValuer<T>) {
        return toRaw(unref(value))
      },

      getVNodes(node: any) {
        return helper.isNonEmptyObject(node) && node.type === Fragment
          ? helper.isNonEmptyArray(node.children) ? node : null
          : node
      },

      isVueNode(vnode: any) {
        return helper.isNonEmptyObject(vnode) && isVNode(vnode)
      },

      isOwnProperty(obj: any, keys: any[]) {
        for (const key of keys) {
          if (!helper.isNonEmptyArray(obj) && !helper.isNonEmptyObject(obj)) {
            return false
          }

          if (!helper.isString(key) && !helper.isFiniteNumber(key)) {
            return false
          }

          if (!Object.hasOwn(obj, key)) {
            return false
          }

          obj = (obj as any)[key]
        }

        return true
      },

      takeCellMegre(options: STableCellMegreType) {
        const index = options.index
        const colIndex = options.colIndex
        const rowIndex = options.rowIndex
        const cellCachers = options.cachers
        const cellSpikers = options.spikers
        const cellEmpters = options.empters

        const cellCacher = cellCachers.get(index)!
        const cellSpiker = cellSpikers.has(index)
        const cellRender = cellCacher.cellRender
        const cellCount = cellCacher.colCount

        if (!cellSpiker && cellCount !== 0 && cellRender) {
          const megre = cellCacher.colCount > 0
          const empty = cellCacher.colCount < 0
          const arrays = Array.from(cellCachers.values())

          arrays.sort((next, prev) => next.index - prev.index)

          const queues = arrays.filter(cacher => !cellSpikers.has(cacher.index) && cacher.index > index)
          const emptys = queues.filter(cacher => cacher.colCount < 0)
          const exists = queues.filter(cacher => cacher.colCount > 0)

          if (empty) {
            const empter = {
              taskers: [] as { count: number, render: boolean }[],
              refers: [cellCacher] as typeof queues,
              counts: 1
            }

            for (const cacher of queues) {
              if (!cacher.cellRender || (cacher.rowSpan > 0 && cacher.colSpan > 0)) {
                break
              }
              empter.refers.push(cacher)
              empter.counts++
            }

            for (const cacher of exists) {
              if (empter.counts < 1) {
                break
              }

              const count1 = empter.counts
              const count2 = cacher.colCount
              const render = cacher.cellRender
              const tasker = empter.taskers.slice(-1)[0]

              if (!tasker || tasker.render !== render) {
                empter.taskers.push({
                  count: count2 > count1 ? count1 : count2,
                  render: render
                })
              }

              if (tasker && tasker.render === render) {
                tasker.count += count2 > count1 ? count1 : count2
              }

              if (count1 >= count2) {
                cellSpikers.add(cacher.index)
              }

              empter.counts = count1 >= count2 ? count1 - count2 : 0
              cacher.colCount = count2 >= count1 ? count2 - count1 : 0
            }

            for (const tasker of empter.taskers) {
              let index = 0

              while (index < tasker.count) {
                const refer = empter.refers.shift()!
                const first = index++ === 0

                refer.colCount = 0
                refer.colSpan = first && !tasker.render ? tasker.count : 0
                cellEmpters.add(refer.index)
                cellSpikers.add(refer.index)
              }
            }

            for (const [index, refer] of empter.refers.entries()) {
              refer.colCount = 0
              refer.colSpan = index === 0 ? empter.refers.length : 0
              cellEmpters.add(refer.index)
              cellSpikers.add(refer.index)
            }
          }

          if (megre) {
            for (const cacher of emptys) {
              if (cellCacher.colCount < 1) {
                break
              }

              cellEmpters.add(cacher.index)
              cellSpikers.add(cacher.index)

              cellCacher.colSpan = cacher.cellRender ? cellCacher.colSpan : cellCacher.colSpan - 1
              cellCacher.colCount = cellCacher.colCount + cacher.colCount
            }

            cellCacher.colSpan = cellCacher.colSpan - (cellCacher.colCount > 0 ? cellCacher.colCount : 0)
            cellCacher.colSpan = cellCacher.colSpan > 0 ? cellCacher.colSpan : 0
            cellCacher.colCount = 0
          }

          cellSpikers.add(cellCacher.index)
        }

        if (!cellSpiker && cellCount !== 0 && !cellRender) {
          const megre = cellCacher.colCount > 0
          const empty = cellCacher.colCount < 0
          const arrays = Array.from(cellCachers.values())

          arrays.sort((next, prev) => next.index - prev.index)

          const queues = arrays.filter(cacher => !cellSpikers.has(cacher.index) && cacher.index > index)
          const emptys = queues.filter(cacher => cacher.colCount < 0)
          const exists = queues.filter(cacher => cacher.colCount > 0)

          if (empty) {
            for (const caher of exists) {
              caher.colSpan--
              caher.colCount--
              caher.colCount === 0 && cellSpikers.add(caher.index)
              break
            }
          }

          if (megre) {
            const empter = {
              taskers: [] as { render: boolean, refers: typeof queues }[]
            }

            for (const cacher of emptys) {
              if (cellCacher.colCount < 1) {
                break
              }

              const render = cacher.cellRender
              const tasker = empter.taskers.slice(-1)[0]

              if (!tasker || tasker.render !== render) {
                empter.taskers.push({
                  render: cacher.cellRender,
                  refers: [cacher]
                })
              }

              if (tasker && tasker.render === render) {
                tasker.refers.push(cacher)
              }

              cellCacher.colCount--
            }

            for (const tasker of empter.taskers) {
              const render = tasker.render
              const refers = tasker.refers

              for (const [index, refer] of refers.entries()) {
                refer.colCount = 0
                refer.colSpan = render && index === 0 ? refers.length : 0
                cellEmpters.add(refer.index)
                cellSpikers.add(refer.index)
              }
            }

            cellCacher.colSpan = cellCacher.colSpan - (cellCacher.colCount > 0 ? cellCacher.colCount : 0)
            cellCacher.colSpan = cellCacher.colSpan > 0 ? cellCacher.colSpan : 0
            cellCacher.colCount = 0
          }

          cellSpikers.add(cellCacher.index)
        }

        return {
          index,
          colIndex,
          rowIndex,
          cacher: cellCachers.get(index)!,
          spiker: cellSpikers.has(index),
          empter: cellEmpters.has(index)
        }
      },

      restoreColumns(parts: STableWrapColumnType[]) {
        return parts.map<STablePartColumnType>(part => {
          const column: STablePartColumnType = {
            ...part.cacheColumn,

            children: helper.isNonEmptyArray(part.treeChildren)
              ? Methoder.restoreColumns(part.treeChildren)
              : !helper.isArray(part.cacheColumn.children)
                ? part.cacheColumn.children
                : []
          }

          if (column.children === undefined) {
            delete column.children
          }

          return column
        })
      },

      restoreSources(parts: STableWrapRecordType[]) {
        return parts.map<STableRecordType>(part => {
          return part.referRecord
        })
      },

      recloneColumns(parts: STableWrapColumnType[], parent: STableWrapColumnType | null = null) {
        const columns = parts.map<STableWrapColumnType>(part => {
          const column = { ...part, parentColumn: parent }
          const children = Methoder.recloneColumns(part.treeChildren, column) as STableWrapColumnType[]
          return Object.assign(column, { treeChildren: children })
        })
        return columns
      },

      dragerColumns(parts: STableWrapColumnType[], source: STableCellIndexType, target: STableCellIndexType) {
        const sourceColumn = Methoder.findTreeColumns(parts, source.rowIndex, source.colIndex)
        const targetColumn = Methoder.findTreeColumns(parts, target.rowIndex, target.colIndex)

        const parentColumn = sourceColumn ? sourceColumn.parentColumn : null
        const childColumns = parentColumn ? parentColumn.treeChildren : parts
        const sourceIndex = childColumns.findIndex(column => column === sourceColumn)
        const targetIndex = childColumns.findIndex(column => column === targetColumn)

        if (!sourceColumn || !targetColumn) {
          return parts
        }

        if (sourceColumn.parentColumn !== targetColumn.parentColumn) {
          return parts
        }

        if (!childColumns.includes(sourceColumn) || !childColumns.includes(targetColumn)) {
          return parts
        }

        childColumns.splice(sourceIndex, 1)
        childColumns.splice(targetIndex, 0, sourceColumn)

        return parts
      },

      findTreeColumns(columns: STableWrapColumnType[], rowIndex: number, colIndex: number) {
        for (const column of columns) {
          if (column.referColumn.rowIndex !== rowIndex) {
            const treeColumn = Methoder.findTreeColumns(column.treeChildren, rowIndex, colIndex) as STableWrapColumnType | null

            if (treeColumn) {
              return treeColumn as STableWrapColumnType
            }
          }

          if (column.referColumn.rowIndex === rowIndex && column.referColumn.colIndex === colIndex) {
            return column
          }
        }

        return null
      },

      findParentColumn(arrays: STableColumnType[][], rowIndex: number, colIndex: number) {
        if (rowIndex > 0) {
          const array = arrays[rowIndex - 1]?.filter((_, index) => index <= colIndex)
          const column = array?.findLast(column => !!column)
          return column || null
        }
        return null
      },

      findListColumns(arrays: STableColumnType[][], rowIndex: number, colIndex: number) {
        for (const columns of arrays) {
          for (const column of columns) {
            if (column?.rowIndex === rowIndex && column?.colIndex === colIndex) {
              return column
            }
          }
        }

        return null
      },

      isColumnsChanged(parts: STablePartColumnType[], temps: STableWrapColumnType[]) {
        if (parts.length !== temps.length) {
          return true
        }

        for (const index of parts.keys()) {
          let changed = false
          const propColumn = Methoder.getValue(parts[index])
          const tempColumn = Methoder.getValue(temps[index])
          const cacheColumn = tempColumn.cacheColumn

          changed = !helper.equal(propColumn, cacheColumn, {
            include: [
              'key',
              'title',
              'dataIndex',
              'align',
              'fixed',
              'width',
              'minWidth',
              'maxWidth',
              'settings',
              'resizable',
              'ellipsis',
              'tooltip',
              'colSpan',
              'rowSpan',
              'sorter',
              'sorterField',
              'sorterValueChange',
              'customHeaderCellRender',
              'customBodyerCellRender',
              'customFooterCellRender'
            ]
          })

          if (!changed) {
            if (!helper.isArray(propColumn.children)) {
              changed = (propColumn.children !== undefined && propColumn.children !== null) || !helper.isEmptyArray(tempColumn.treeChildren)
            }

            if (helper.isArray(propColumn.children)) {
              changed = Methoder.isColumnsChanged(propColumn.children, tempColumn.treeChildren)
            }
          }

          if (changed) {
            return true
          }
        }

        return false
      },

      isSourcesChanged(parts: STableRecordType[], temps: STableWrapRecordType[]) {
        if (parts.length !== temps.length) {
          return true
        }

        for (const index of parts.keys()) {
          let changed = false
          let treeKey = ''
          let rowKey = ''

          const partRecord = Methoder.getValue(parts[index])
          const tempRecord = Methoder.getValue(temps[index])
          const referRecord = Methoder.getValue(tempRecord.referRecord)

          treeKey = helper.isFunction(props.treeKey) ? props.treeKey(partRecord) : treeKey
          treeKey = helper.isNonEmptyString(props.treeKey) ? props.treeKey : treeKey
          treeKey = helper.isNonEmptyString(treeKey) ? treeKey.trim() : ''

          rowKey = helper.isFunction(props.rowKey) ? props.rowKey(partRecord) : rowKey
          rowKey = helper.isNonEmptyString(props.rowKey) ? props.rowKey : rowKey
          rowKey = helper.isNonEmptyString(rowKey) ? rowKey.trim() : ''

          if (partRecord !== referRecord) {
            return true
          }

          if (helper.isNonEmptyString(treeKey) && !helper.isArray(partRecord[treeKey])) {
            changed = (partRecord[treeKey] !== undefined && partRecord[treeKey] !== null) || !helper.isEmptyArray(tempRecord.treeChildren)
          }

          if (helper.isNonEmptyString(treeKey) && helper.isArray(partRecord[treeKey])) {
            changed = Methoder.isSourcesChanged(partRecord[treeKey], tempRecord.treeChildren)
          }

          if (changed) {
            return true
          }
        }

        return false
      },

      isSummaryChanged(parts: STableRecordType[], temps: STableRecordType[]) {
        if (parts.length !== temps.length) {
          return true
        }

        if (parts === temps) {
          return false
        }

        for (const index of parts.keys()) {
          const partRecord = Methoder.getValue(parts[index])
          const tempRecord = Methoder.getValue(temps[index])

          if (partRecord !== tempRecord) {
            return true
          }
        }

        return false
      },

      normalizeTreeColumns(columns: STablePartColumnType[], wraps: STableWrapColumnType[] = [], parent?: STableWrapColumnType | null) {
        let offset = parent ? parent.referColumn.colOffset : 0

        for (const [index, column] of columns.entries()) {
          const columnMinWidth = helper.isFiniteNumber(column.minWidth) && column.minWidth > 0 ? column.minWidth : 0
          const columnMaxWidth = helper.isFiniteNumber(column.maxWidth) && column.maxWidth < Infinity ? column.maxWidth : Infinity
          const columnResizable = helper.isBoolean(column.resizable) ? column.resizable : parent?.referColumn.resizable ?? props.columnPresetResizable
          const columnSettings = helper.isNonEmptyObject(column.settings) ? { checkbox: column.settings.checkbox !== false, disabled: column.settings.disabled === true } : { checkbox: true, disabled: false }

          const wrapColumn: STableWrapColumnType = {
            key: column.key || (helper.isArray(column.dataIndex) ? column.dataIndex.join('.') : column.dataIndex),
            title: column.title,
            childKeys: [],
            parentKey: parent ? parent.key : null,
            parentKeys: parent ? [...parent.parentKeys, parent.key] : [],
            referColumn: {
              key: column.key || (helper.isArray(column.dataIndex) ? column.dataIndex.join('.') : column.dataIndex),
              title: column.title,
              parentKey: parent ? parent.key : '',
              dataIndex: column.dataIndex,
              children: [],
              align: column.align ?? parent?.referColumn.align ?? 'left',
              fixed: column.fixed ?? parent?.referColumn.fixed ?? false,
              width: column.width,
              minWidth: columnMinWidth,
              maxWidth: columnMaxWidth,
              settings: columnSettings,
              resizable: (columnMinWidth < columnMaxWidth) && columnResizable === true,
              ellipsis: column.ellipsis ?? parent?.referColumn.ellipsis ?? false,
              tooltip: column.tooltip ?? parent?.referColumn.tooltip ?? false,
              colIndex: offset + index,
              rowIndex: parent ? parent.referColumn.rowIndex + 1 : 0,
              colOffset: offset + index,
              rowOffset: parent ? parent.referColumn.rowIndex + 1 : 0,
              colMaxSpan: 1,
              rowMaxSpan: parent ? parent.referColumn.rowMaxSpan + 1 : 1,
              colSpan: helper.isFiniteNumber(column.colSpan) ? column.colSpan : NaN,
              rowSpan: helper.isFiniteNumber(column.rowSpan) ? column.rowSpan : NaN,
              sorter: (column.sorter ?? parent?.referColumn.sorter) === true,
              sortered: false,
              sorterField: column.sorterField ?? (helper.isArray(column.dataIndex) ? column.dataIndex.join('.') : column.dataIndex),
              sorterValue: '',
              expandIcon: column.expandIcon ?? parent?.referColumn.expandIcon,
              sorterValueChange: column.sorterValueChange ?? parent?.referColumn.sorterValueChange,
              customHeaderCellRender: column.customHeaderCellRender ?? parent?.referColumn.customHeaderCellRender,
              customBodyerCellRender: column.customBodyerCellRender ?? parent?.referColumn.customBodyerCellRender,
              customFooterCellRender: column.customFooterCellRender ?? parent?.referColumn.customFooterCellRender
            },
            cacheColumn: column,
            parentColumn: parent || null,
            treeChildren: [],
            rowGroupLevel: parent ? parent.rowGroupLevel + 1 : 1,
            rowGroupIndex: parent ? parent.rowGroupIndex : index,
            rowGroupIndexs: parent ? { ...parent.rowGroupIndexs, [parent.rowGroupLevel + 1]: index } : { 1: index }
          }

          wraps.push(wrapColumn)

          if (helper.isNonEmptyArray(column.children)) {
            const childTrees = Methoder.normalizeTreeColumns(column.children, [], wrapColumn)
            const rowMaxSpan = Math.max(...childTrees.map(child => child.referColumn.rowMaxSpan), wrapColumn.referColumn.rowMaxSpan)
            const colMaxSpan = childTrees.reduce((colMaxSpan, child) => colMaxSpan + child.referColumn.colMaxSpan, 0) || 1
            const childKeys = [...childTrees.map(tree => tree.key), ...childTrees.map(tree => tree.childKeys).flat()]
            const resizable = childTrees.some(child => child.referColumn.resizable)
            wrapColumn.referColumn.children = childTrees.map(column => column.referColumn)
            wrapColumn.referColumn.rowMaxSpan = rowMaxSpan
            wrapColumn.referColumn.colMaxSpan = colMaxSpan
            wrapColumn.referColumn.resizable = resizable
            wrapColumn.treeChildren = childTrees
            wrapColumn.childKeys = childKeys
            offset += colMaxSpan - 1
          }
        }

        return wraps
      },

      normalizeTreeSources(sources: STableRecordType[], wraps: STableWrapRecordType[] = [], parent?: STableWrapRecordType, offset?: { line: number }) {
        for (const [index, source] of sources.entries()) {
          let rowKey = ''
          let treeKey = ''

          rowKey = helper.isFunction(props.rowKey) ? props.rowKey(source) : rowKey
          rowKey = helper.isNonEmptyString(props.rowKey) ? props.rowKey : rowKey
          rowKey = helper.isNonEmptyString(rowKey) ? rowKey.trim() : ''

          treeKey = helper.isFunction(props.treeKey) ? props.treeKey(source) : treeKey
          treeKey = helper.isNonEmptyString(props.treeKey) ? props.treeKey : treeKey
          treeKey = helper.isNonEmptyString(treeKey) ? treeKey.trim() : ''

          if (!offset) {
            offset = {
              line: -1
            }
          }

          if (offset.line >= -1) {
            offset.line += 1
          }

          const oldRecord = treeSources.value.find(wrap => {
            const isSomeRowKeyField = wrap.rowKeyField === rowKey
            const isExistRowKeyValue = helper.isNonEmptyString(wrap.key) || helper.isFiniteNumber(wrap.key)
            return isSomeRowKeyField && isExistRowKeyValue ? wrap.key === source[rowKey] : Methoder.getValue(wrap.referRecord) === Methoder.getValue(source)
          })

          const wrapRecord: STableWrapRecordType = {
            key: rowKey && (source[rowKey] || source[rowKey] === 0) ? source[rowKey] : offset.line,
            parentKey: parent ? parent.key : null,
            childKeys: [],
            parentKeys: parent ? [...parent.parentKeys, parent.key] : [],
            referRecord: source,
            treeChildren: [],
            rowGroupLevel: parent ? parent.rowGroupLevel + 1 : 1,
            rowGroupIndex: parent ? parent.rowGroupIndex : index,
            rowGroupIndexs: parent ? { ...parent.rowGroupIndexs, [parent.rowGroupLevel + 1]: index } : { 1: index },
            rowGlobalIndex: offset.line,
            rowTreeKeyField: treeKey,
            rowKeyField: rowKey,
            rowHeight: oldRecord ? oldRecord.rowHeight : renderRowPresets.minHeight,
            rowIndex: -1
          }

          wraps.push(wrapRecord)

          if (helper.isNonEmptyArray(source[wrapRecord.rowTreeKeyField])) {
            const childTrees = Methoder.normalizeTreeSources(source[wrapRecord.rowTreeKeyField], [], wrapRecord, offset)
            const childKeys = [...childTrees.map(tree => tree.key), ...childTrees.map(tree => tree.childKeys).flat()]
            wrapRecord.treeChildren = childTrees
            wrapRecord.childKeys = childKeys
          }

          if (!sourceRowKeys.value.includes(wrapRecord.key)) {
            sourceRowKeys.value.push(wrapRecord.key)
          }
        }

        return wraps
      },

      normalizeTreeSettings(columns: STableWrapColumnType[], settings?: STableSettingsType[]) {
        settings = settings || columnSettingsAllTrees.value

        for (const wrap of columns) {
          const setting = {
            key: wrap.key,
            title: wrap.title,
            children: [],
            disabled: wrap.referColumn.settings.disabled,
            column: wrap.referColumn
          }

          if (!columnSettingsAllKeys.value.includes(wrap.key)) {
            columnSettingsAllKeys.value.push(wrap.key)
          }

          if (!columnSettingsCheckKeys.value.includes(wrap.key)) {
            if (wrap.referColumn.settings.checkbox) {
              columnSettingsCheckKeys.value.push(wrap.key)
            }
          }

          if (helper.isNonEmptyArray(wrap.treeChildren)) {
            Methoder.normalizeTreeSettings(wrap.treeChildren, setting.children)

            let checkbox = false
            let disabled = false

            checkbox = checkbox || wrap.treeChildren.some(column => columnSettingsCheckKeys.value.includes(column.key))
            disabled = disabled || wrap.treeChildren.some(column => columnSettingsCheckKeys.value.includes(column.key) && column.referColumn.settings.disabled)
            disabled = disabled || wrap.treeChildren.every(column => column.referColumn.settings.disabled)

            if (!checkbox || disabled) {
              const settings = wrap.cacheColumn.settings = helper.isObject(wrap.cacheColumn.settings)
                ? wrap.cacheColumn.settings
                : {}

              settings.checkbox = checkbox
              settings.disabled = disabled
            }

            setting.disabled = disabled
            wrap.referColumn.settings.checkbox = checkbox
            wrap.referColumn.settings.disabled = disabled

            checkbox && !columnSettingsCheckKeys.value.includes(wrap.key) && (columnSettingsCheckKeys.value = [...columnSettingsCheckKeys.value, wrap.key])
            checkbox || !columnSettingsCheckKeys.value.includes(wrap.key) || (columnSettingsCheckKeys.value = columnSettingsCheckKeys.value.filter(key => key !== wrap.key))
          }

          settings.push(setting)
        }

        return settings
      },

      normalizeListSources(sources: STableWrapRecordType[], arrays: STableWrapRecordType[] = []) {
        for (const wrap of sources) {
          arrays.push(wrap)

          if (helper.isNonEmptyArray(wrap.treeChildren)) {
            Methoder.normalizeListSources(wrap.treeChildren, arrays)
          }
        }

        for (const record of arrays) {
          props.defaultSelectAllRows && props.selectedRowMode === 'Checkbox' && !selectedRowKeys.value.includes(record.key) && selectedRowKeys.value.push(record.key)
          props.defaultExpandAllRows && !expandedRowKeys.value.includes(record.key) && expandedRowKeys.value.push(record.key)
        }

        return arrays
      },

      normalizeListColumns(columns: STableWrapColumnType[], arrays: STableColumnType[][]) {
        for (const wrap of columns) {
          const colOffset = wrap.referColumn.colOffset
          const rowOffset = wrap.referColumn.rowOffset

          arrays[rowOffset] = arrays[rowOffset] || []
          arrays[rowOffset][colOffset] = arrays[rowOffset][colOffset] || wrap.referColumn

          if (helper.isNonEmptyArray(wrap.treeChildren)) {
            Methoder.normalizeListColumns(wrap.treeChildren, arrays)
          }
        }

        return arrays
      },

      normalizeDataColumns(arrays: Array<STableColumnType>[] = []) {
        const dataColumns: STableColumnType[] = []

        for (const columns of arrays) {
          for (const column of columns) {
            if (!column) {
              continue
            }

            if (column.rowIndex === column.rowMaxSpan - 1) {
              dataColumns[column.colOffset] = column
            }
          }
        }

        return dataColumns
      },

      normalizeListSummary(summarys: Array<STableRecordType> = []) {
        return summarys.map(record => record)
      },

      normalizeInitColumns(arrays: STableColumnType[][] = []) {
        for (const [rowIndex, columns] of arrays.entries()) {
          if (Methoder.isOwnProperty(columnRowAttrs.value, [rowIndex])) {
            continue
          }

          if (helper.isFunction(props.customHeaderRowAttrs)) {
            columnRowAttrs.value[rowIndex] = props.customHeaderRowAttrs({ columns, rowIndex })
          }

          if (columnRowAttrs.value[rowIndex] === undefined) {
            columnRowAttrs.value[rowIndex] = {}
          }
        }

        for (const column of arrays.flat()) {
          if (!column) {
            continue
          }

          const rowIndex = column.rowIndex
          const colIndex = column.colIndex
          const isCellAttrsTreated = Methoder.isOwnProperty(columnCellAttrs.value, [rowIndex, colIndex])
          const isCellPropsTreated = Methoder.isOwnProperty(columnCellProps.value, [rowIndex, colIndex])

          if (isCellAttrsTreated && isCellPropsTreated) {
            continue
          }

          columnCellAttrs.value[rowIndex] = columnCellAttrs.value[rowIndex] || []
          columnCellProps.value[rowIndex] = columnCellProps.value[rowIndex] || []
          columnCellRender.value[rowIndex] = columnCellRender.value[rowIndex] || []

          columnCellAttrs.value[rowIndex][colIndex] = undefined as any
          columnCellProps.value[rowIndex][colIndex] = undefined as any
          columnCellRender.value[rowIndex][colIndex] = undefined as any

          if (helper.isFunction(props.customHeaderCellRender)) {
            const renderNode = Methoder.getValue(
              props.customHeaderCellRender({
                title: column.title,
                column,
                rowIndex,
                colIndex
              })
            )

            const cellAttrs = !isVNode(renderNode) && helper.isObject(renderNode) && helper.isObject(renderNode.attrs) && renderNode.attrs || undefined
            const cellProps = !isVNode(renderNode) && helper.isObject(renderNode) && helper.isObject(renderNode.props) && renderNode.props || undefined
            const cellRender = isVNode(renderNode) ? renderNode : (helper.isObject(renderNode) && renderNode.children || undefined)

            columnCellAttrs.value[rowIndex][colIndex] = cellAttrs === undefined ? columnCellAttrs.value[rowIndex][colIndex] : cellAttrs
            columnCellProps.value[rowIndex][colIndex] = cellProps === undefined ? columnCellProps.value[rowIndex][colIndex] : cellProps
            columnCellRender.value[rowIndex][colIndex] = cellRender === undefined ? columnCellRender.value[rowIndex][colIndex] : cellRender
          }

          if (helper.isFunction(column.customHeaderCellRender)) {
            const renderNode = column.customHeaderCellRender({
              title: column.title,
              column,
              rowIndex,
              colIndex
            })

            const cellAttrs = !isVNode(renderNode) && helper.isObject(renderNode) && helper.isObject(renderNode.attrs) && renderNode.attrs || undefined
            const cellProps = !isVNode(renderNode) && helper.isObject(renderNode) && helper.isObject(renderNode.props) && renderNode.props || undefined
            const cellRender = isVNode(renderNode) ? renderNode : (helper.isObject(renderNode) && renderNode.children || undefined)

            columnCellAttrs.value[rowIndex][colIndex] = cellAttrs === undefined ? columnCellAttrs.value[rowIndex][colIndex] : cellAttrs
            columnCellProps.value[rowIndex][colIndex] = cellProps === undefined ? columnCellProps.value[rowIndex][colIndex] : cellProps
            columnCellRender.value[rowIndex][colIndex] = cellRender === undefined ? columnCellRender.value[rowIndex][colIndex] : cellRender
          }

          if (columnCellAttrs.value[rowIndex][colIndex] === undefined) {
            columnCellAttrs.value[rowIndex][colIndex] = {}
          }

          if (columnCellRender.value[rowIndex][colIndex] === undefined) {
            columnCellRender.value[rowIndex][colIndex] = column.title
          }
        }

        return arrays
      },

      normalizeInitSources(sources: STableWrapRecordType[]) {
        for (const option of sources) {
          const isRowAttrsTreated = Methoder.isOwnProperty(sourceRowAttrs.value, [option.rowGlobalIndex])
          const isRowStatesTreated = Methoder.isOwnProperty(sourceRowStates.value, [option.rowGlobalIndex])

          if (isRowAttrsTreated && isRowStatesTreated) {
            continue
          }

          const record = option.referRecord
          const rowIndex = option.rowGroupIndex
          const groupLevel = option.rowGroupLevel
          const groupIndex = option.rowGroupIndex
          const groupIndexs = option.rowGroupIndexs
          const globalIndex = option.rowGlobalIndex

          if (helper.isFunction(props.customBodyerRowAttrs)) {
            sourceRowAttrs.value[globalIndex] = props.customBodyerRowAttrs({ record, rowIndex, groupIndex, groupLevel, groupIndexs, globalIndex })
          }

          if (helper.isFunction(props.customBodyerRowStates)) {
            sourceRowStates.value[globalIndex] = props.customBodyerRowStates({ record, rowIndex, groupIndex, groupLevel, groupIndexs, globalIndex })
          }

          if (sourceRowAttrs.value[globalIndex] === undefined) {
            sourceRowAttrs.value[globalIndex] = {}
          }

          if (sourceRowStates.value[globalIndex] === undefined) {
            sourceRowStates.value[globalIndex] = {}
          }
        }

        for (const item of dataColumns.value) {
          const column = item
          const columnKey = column.key
          const colIndex = column.colIndex
          const dataIndex = column.dataIndex

          for (const option of sources) {
            const record = option.referRecord
            const rowIndex = option.rowGroupIndex
            const groupLevel = option.rowGroupLevel
            const groupIndex = option.rowGroupIndex
            const groupIndexs = option.rowGroupIndexs
            const globalIndex = option.rowGlobalIndex

            const isCellAttrsTreated = Methoder.isOwnProperty(sourceCellAttrs.value, [globalIndex, columnKey])
            const isCellPropsTreated = Methoder.isOwnProperty(sourceCellProps.value, [globalIndex, columnKey])

            if (isCellAttrsTreated && isCellPropsTreated) {
              continue
            }

            sourceCellAttrs.value[globalIndex] = sourceCellAttrs.value[globalIndex] || []
            sourceCellProps.value[globalIndex] = sourceCellProps.value[globalIndex] || []
            sourceCellRender.value[globalIndex] = sourceCellRender.value[globalIndex] || []

            sourceCellAttrs.value[globalIndex][columnKey] = undefined as any
            sourceCellProps.value[globalIndex][columnKey] = undefined as any
            sourceCellRender.value[globalIndex][columnKey] = undefined as any

            let value
            let index = 0

            value = helper.isArray(dataIndex) && helper.isObject(record) ? record[dataIndex[index++]] : value
            value = helper.isString(dataIndex) && helper.isObject(record) ? record[dataIndex] : value

            if (helper.isNonEmptyArray(dataIndex)) {
              while (index < dataIndex.length) {
                if (!helper.isArray(value) || !helper.isObject(value)) {
                  value = undefined
                  break
                }
                value = value[column.dataIndex[index++]]
              }
            }

            if (helper.isFunction(props.customBodyerCellRender)) {
              const renderNode = props.customBodyerCellRender({
                value,
                record,
                rowIndex,
                groupIndex,
                groupLevel,
                groupIndexs,
                globalIndex,
                column,
                colIndex
              })

              const cellAttrs = !isVNode(renderNode) && helper.isObject(renderNode) && helper.isObject(renderNode.attrs) && renderNode.attrs || undefined
              const cellProps = !isVNode(renderNode) && helper.isObject(renderNode) && helper.isObject(renderNode.props) && renderNode.props || undefined
              const cellRender = isVNode(renderNode) ? renderNode : (helper.isObject(renderNode) && renderNode.children || undefined)

              sourceCellAttrs.value[globalIndex][columnKey] = cellAttrs === undefined ? sourceCellAttrs.value[globalIndex][columnKey] : cellAttrs
              sourceCellProps.value[globalIndex][columnKey] = cellProps === undefined ? sourceCellProps.value[globalIndex][columnKey] : cellProps
              sourceCellRender.value[globalIndex][columnKey] = cellRender === undefined ? sourceCellRender.value[globalIndex][columnKey] : cellRender
            }

            if (helper.isFunction(column.customBodyerCellRender)) {
              const renderNode = column.customBodyerCellRender({
                value,
                record,
                rowIndex,
                groupIndex,
                groupLevel,
                groupIndexs,
                globalIndex,
                column,
                colIndex
              })

              const cellAttrs = !isVNode(renderNode) && helper.isObject(renderNode) && helper.isObject(renderNode.attrs) && renderNode.attrs || undefined
              const cellProps = !isVNode(renderNode) && helper.isObject(renderNode) && helper.isObject(renderNode.props) && renderNode.props || undefined
              const cellRender = isVNode(renderNode) ? renderNode : (helper.isObject(renderNode) && renderNode.children || undefined)

              sourceCellAttrs.value[globalIndex][columnKey] = cellAttrs === undefined ? sourceCellAttrs.value[globalIndex][columnKey] : cellAttrs
              sourceCellProps.value[globalIndex][columnKey] = cellProps === undefined ? sourceCellProps.value[globalIndex][columnKey] : cellProps
              sourceCellRender.value[globalIndex][columnKey] = cellRender === undefined ? sourceCellRender.value[globalIndex][columnKey] : cellRender
            }

            if (sourceCellAttrs.value[globalIndex][columnKey] === undefined) {
              sourceCellAttrs.value[globalIndex][columnKey] = {}
            }

            if (sourceCellProps.value[globalIndex][columnKey] === undefined) {
              sourceCellProps.value[globalIndex][columnKey] = {}
            }

            if (sourceCellRender.value[globalIndex][columnKey] === undefined) {
              sourceCellRender.value[globalIndex][columnKey] = value
            }
          }
        }
      },

      normalizeInitSummary(summarys: STableRecordType[]) {
        const records = Computer.filterPageSources.value.filter(refer => refer.rowGroupLevel === 1)
        const sources = records.map(refer => refer.referRecord)
        const paginate = Paginator.paginate

        for (const [rowIndex, record] of summarys.entries()) {
          if (Methoder.isOwnProperty(summaryRowAttrs.value, [rowIndex])) {
            continue
          }

          if (helper.isFunction(props.customFooterRowAttrs)) {
            summaryRowAttrs.value[rowIndex] = props.customFooterRowAttrs({ record, rowIndex, sources, paginate })
          }

          if (summaryRowAttrs.value[rowIndex] === undefined) {
            summaryRowAttrs.value[rowIndex] = {}
          }
        }

        for (const item of dataColumns.value) {
          const column = item
          const columnKey = column.key
          const colIndex = column.colIndex
          const dataIndex = column.dataIndex

          for (const [rowIndex, record] of summarys.entries()) {
            const isCellAttrsTreated = Methoder.isOwnProperty(summaryCellAttrs.value, [rowIndex, columnKey])
            const isCellPropsTreated = Methoder.isOwnProperty(summaryCellProps.value, [rowIndex, columnKey])

            if (isCellAttrsTreated && isCellPropsTreated) {
              continue
            }

            summaryCellAttrs.value[rowIndex] = summaryCellAttrs.value[rowIndex] || []
            summaryCellProps.value[rowIndex] = summaryCellProps.value[rowIndex] || []
            summaryCellRender.value[rowIndex] = summaryCellRender.value[rowIndex] || []

            summaryCellAttrs.value[rowIndex][columnKey] = undefined as any
            summaryCellProps.value[rowIndex][columnKey] = undefined as any
            summaryCellRender.value[rowIndex][columnKey] = undefined as any

            let value
            let index = 0

            value = helper.isArray(dataIndex) && helper.isObject(record) ? record[dataIndex[index++]] : value
            value = helper.isString(dataIndex) ? record[dataIndex] : value

            if (helper.isNonEmptyArray(dataIndex)) {
              while (index < dataIndex.length) {
                if (!helper.isArray(value) || !helper.isObject(value)) {
                  value = undefined
                  break
                }
                value = value[column.dataIndex[index++]]
              }
            }

            if (helper.isFunction(props.customFooterCellRender)) {
              const renderNode = props.customFooterCellRender({
                value,
                record,
                rowIndex,
                column,
                colIndex,
                sources,
                paginate
              })

              const cellAttrs = !isVNode(renderNode) && helper.isObject(renderNode) && helper.isObject(renderNode.attrs) && renderNode.attrs || undefined
              const cellProps = !isVNode(renderNode) && helper.isObject(renderNode) && helper.isObject(renderNode.props) && renderNode.props || undefined
              const cellRender = isVNode(renderNode) ? renderNode : (helper.isObject(renderNode) && renderNode.children || undefined)

              summaryCellAttrs.value[rowIndex][columnKey] = cellAttrs === undefined ? summaryCellAttrs.value[rowIndex][columnKey] : cellAttrs
              summaryCellProps.value[rowIndex][columnKey] = cellProps === undefined ? summaryCellProps.value[rowIndex][columnKey] : cellProps
              summaryCellRender.value[rowIndex][columnKey] = cellRender === undefined ? summaryCellRender.value[rowIndex][columnKey] : cellRender
            }

            if (helper.isFunction(column.customFooterCellRender)) {
              const renderNode = column.customFooterCellRender({
                value,
                record,
                rowIndex,
                column,
                colIndex,
                sources,
                paginate
              })

              const cellAttrs = !isVNode(renderNode) && helper.isObject(renderNode) && helper.isObject(renderNode.attrs) && renderNode.attrs || undefined
              const cellProps = !isVNode(renderNode) && helper.isObject(renderNode) && helper.isObject(renderNode.props) && renderNode.props || undefined
              const cellRender = isVNode(renderNode) ? renderNode : (helper.isObject(renderNode) && renderNode.children || undefined)

              summaryCellAttrs.value[rowIndex][columnKey] = cellAttrs === undefined ? summaryCellAttrs.value[rowIndex][columnKey] : cellAttrs
              summaryCellProps.value[rowIndex][columnKey] = cellProps === undefined ? summaryCellProps.value[rowIndex][columnKey] : cellProps
              summaryCellRender.value[rowIndex][columnKey] = cellRender === undefined ? summaryCellRender.value[rowIndex][columnKey] : cellRender
            }

            if (summaryCellAttrs.value[rowIndex][columnKey] === undefined) {
              summaryCellAttrs.value[rowIndex][columnKey] = {}
            }

            if (summaryCellProps.value[rowIndex][columnKey] === undefined) {
              summaryCellProps.value[rowIndex][columnKey] = {}
            }

            if (summaryCellRender.value[rowIndex][columnKey] === undefined) {
              summaryCellRender.value[rowIndex][columnKey] = value
            }
          }
        }
      },

      updatePropColumns(columns: STableWrapColumnType[]) {
        propColumns.value = Methoder.restoreColumns(columns)

        if (Methoder.isColumnsChanged(props.columns, columns)) {
          context.emit('update:columns', Methoder.restoreColumns(columns))
        }
      },

      updatePropSources(sources: STableWrapRecordType[]) {
        propSources.value = Methoder.restoreSources(sources)

        if (Methoder.isSourcesChanged(props.sources, sources)) {
          context.emit('update:sources', Methoder.restoreSources(sources))
        }
      },

      updatePropSummarys(summarys: STableRecordType[]) {
        propSummarys.value = [...summarys]

        if (props.summarys.length !== summarys.length || !summarys.every((every, index) => every === props.summarys[index])) {
          context.emit('update:summarys', [...summarys])
        }
      },

      updatePropPaginate(paginate: STablePaginateType) {
        if (!helper.deepEqual(props.paginate, paginate)) {
          context.emit('update:paginate', Object.assign(props.paginate, paginate))
        }
      },

      updateSetupSelectedRowKeys(keys: STableKey[]) {
        keys = Array.from(new Set(keys))

        if (!keys.every(key => selectedRowKeys.value.includes(key)) || !selectedRowKeys.value.every(key => keys.includes(key))) {
          selectedRowKeys.value = keys
        }

        Methoder.cleanSelectedRowKeys()
      },

      updatePropSelectedRowKeys(keys: STableKey[]) {
        keys = Array.from(new Set(keys))

        if (!keys.every(key => props.selectedRowKeys.includes(key)) || !props.selectedRowKeys.every(key => keys.includes(key))) {
          context.emit('update:selectedRowKeys', keys)
        }
      },

      updateSetupExpandedRowKeys(keys: STableKey[]) {
        keys = Array.from(new Set(keys))

        if (!keys.every(key => expandedRowKeys.value.includes(key)) || !expandedRowKeys.value.every(key => keys.includes(key))) {
          expandedRowKeys.value = keys
        }

        Methoder.cleanExpandedRowKeys()
      },

      updatePropExpandedRowKeys(keys: STableKey[]) {
        keys = Array.from(new Set(keys))

        if (!keys.every(key => props.expandedRowKeys.includes(key)) || !props.expandedRowKeys.every(key => keys.includes(key))) {
          context.emit('update:expandedRowKeys', keys)
        }
      },

      cleanSelectedRowKeys() {
        if (props.selectedRowMode === 'Radio' && selectedRowKeys.value.length > 1) {
          selectedRowKeys.value = selectedRowKeys.value.filter(key => props.preserveSelectedRowKeys === true || sourceRowKeys.value.includes(key)).filter((_, index) => index < 1)
        }

        if (props.preserveSelectedRowKeys !== true && !selectedRowKeys.value.every(key => sourceRowKeys.value.includes(key))) {
          selectedRowKeys.value = selectedRowKeys.value.filter(key => sourceRowKeys.value.includes(key))
          Emiter.select([...selectedRowKeys.value], selectedRowKeys.value.map(key => Methoder.getValue(listSources.value.find(record => record.key === key)?.referRecord || null)))
        }
      },

      cleanExpandedRowKeys() {
        if (props.preserveExpandedRowKeys !== true && !expandedRowKeys.value.every(key => sourceRowKeys.value.includes(key))) {
          expandedRowKeys.value = expandedRowKeys.value.filter(key => sourceRowKeys.value.includes(key))
          Emiter.expand([...expandedRowKeys.value], expandedRowKeys.value.map(key => Methoder.getValue(listSources.value.find(record => record.key === key)?.referRecord || null)))
        }
      },

      forceUpdate(clean?: boolean) {
        if (clean === true) {
          // Clean Keys
          sourceRowKeys.value = []
          selectedRowKeys.value = []
          expandedRowKeys.value = []

          // Clean Columns
          columnRowAttrs.value = []
          columnCellAttrs.value = []
          columnCellProps.value = []
          columnCellRender.value = []
          columnSettingsAllKeys.value = []
          columnSettingsAllTrees.value = []
          columnSettingsCheckKeys.value = []

          // Clean DataSources
          sourceRowKeys.value = []
          sourceRowAttrs.value = []
          sourceRowStates.value = []
          sourceCellProps.value = []
          sourceCellAttrs.value = []
          sourceCellRender.value = []

          // Clean Summarys
          summaryRowAttrs.value = []
          summaryCellProps.value = []
          summaryCellAttrs.value = []
          summaryCellRender.value = []
        }

        // Update loading
        loading.value = false

        // Update Columns
        columnRowAttrs.value = []
        columnCellAttrs.value = []
        columnCellProps.value = []
        columnCellRender.value = []
        columnSettingsAllKeys.value = []
        columnSettingsAllTrees.value = []
        treeColumns.value = Methoder.normalizeTreeColumns(propColumns.value, [])
        listColumns.value = Methoder.normalizeListColumns(treeColumns.value, [])
        dataColumns.value = Methoder.normalizeDataColumns(listColumns.value)
        Methoder.normalizeTreeSettings(treeColumns.value)
        Methoder.normalizeInitColumns(listColumns.value)

        // Update DataSources
        sourceRowKeys.value = []
        sourceRowAttrs.value = []
        sourceRowStates.value = []
        sourceCellProps.value = []
        sourceCellAttrs.value = []
        sourceCellRender.value = []
        treeSources.value = Methoder.normalizeTreeSources(propSources.value, [])
        listSources.value = Methoder.normalizeListSources(treeSources.value, [])
        Methoder.normalizeInitSources(listSources.value)

        // Update Summarys
        summaryRowAttrs.value = []
        summaryCellProps.value = []
        summaryCellAttrs.value = []
        summaryCellRender.value = []
        listSummarys.value = Methoder.normalizeListSummary(propSummarys.value)
        Methoder.normalizeInitSummary(listSummarys.value)

        // Update Clean RowKeys
        Methoder.cleanSelectedRowKeys()
        Methoder.cleanExpandedRowKeys()
      },

      forceClear(clean?: boolean) {
        if (clean === true) {
          // Clean Keys
          sourceRowKeys.value = []
          selectedRowKeys.value = []
          expandedRowKeys.value = []

          // Clean Columns
          columnRowAttrs.value = []
          columnCellAttrs.value = []
          columnCellProps.value = []
          columnCellRender.value = []
          columnSettingsAllKeys.value = []
          columnSettingsAllTrees.value = []
          columnSettingsCheckKeys.value = []

          // Clean DataSources
          sourceRowKeys.value = []
          sourceRowAttrs.value = []
          sourceRowStates.value = []
          sourceCellProps.value = []
          sourceCellAttrs.value = []
          sourceCellRender.value = []

          // Clean Summarys
          summaryRowAttrs.value = []
          summaryCellProps.value = []
          summaryCellAttrs.value = []
          summaryCellRender.value = []
        }

        // Update loading
        loading.value = false

        // Update Columns
        columnRowAttrs.value = []
        columnCellAttrs.value = []
        columnCellProps.value = []
        columnCellRender.value = []
        columnSettingsAllKeys.value = []
        columnSettingsAllTrees.value = []
        treeColumns.value = Methoder.normalizeTreeColumns(propColumns.value, [])
        listColumns.value = Methoder.normalizeListColumns(treeColumns.value, [])
        dataColumns.value = Methoder.normalizeDataColumns(listColumns.value)
        Methoder.normalizeTreeSettings(treeColumns.value)
        Methoder.normalizeInitColumns(listColumns.value)

        // Update DataSources
        sourceRowKeys.value = []
        sourceRowAttrs.value = []
        sourceRowStates.value = []
        sourceCellProps.value = []
        sourceCellAttrs.value = []
        sourceCellRender.value = []
        treeSources.value = Methoder.normalizeTreeSources([], [])
        listSources.value = Methoder.normalizeListSources(treeSources.value, [])
        Methoder.normalizeInitSources(listSources.value)

        // Update Summarys
        summaryRowAttrs.value = []
        summaryCellProps.value = []
        summaryCellAttrs.value = []
        summaryCellRender.value = []
        listSummarys.value = Methoder.normalizeListSummary(propSummarys.value)
        Methoder.normalizeInitSummary(listSummarys.value)

        // Update Clean RowKeys
        Methoder.cleanSelectedRowKeys()
        Methoder.cleanExpandedRowKeys()
      }
    }

    const Observer = {
      intersectionObserver: new IntersectionObserver(() => {

      }),

      mutationObserver: new MutationObserver(() => {

      }),

      resizeObserver: new ResizeObserver(() => {
        Eventer.updateColumnRender()
      })
    }

    const Eventer = {
      documentMouseMove(event: MouseEvent) {
        if (Optionser.resizer.activate) {
          const queues = Optionser.resizer.queues
          const point = Optionser.resizer.point
          const range = event.clientX - point

          const store = {
            queues: queues,
            range: Math.abs(range)
          }

          queues.sort((next, prev) => {
            if (store.range > 0) return Math.abs(next.maxWidth - next.width) - Math.abs(prev.maxWidth - prev.width)
            if (store.range < 0) return Math.abs(next.minWidth - next.width) - Math.abs(prev.minWidth - prev.width)
            return 0
          })

          for (const [index, opt] of queues.entries()) {
            // knowledge: ~~Number.MAX_SAFE_INTEGER === -1
            const num = Math.abs(store.range / (queues.length - index))
            const max = Math.abs(range > 0 ? opt.maxWidth - opt.width : range < 0 ? opt.minWidth - opt.width : 0)

            range <= 0 && (opt.column.width = opt.width - ~~Math.min(num, max))
            range > 0 && (opt.column.width = opt.width + ~~Math.min(num, max))

            store.range = store.range - Math.min(num, max)
          }

          nextTick(() => Eventer.updateTheadContainer())
        }

        if (Optionser.dragger.activate) {
          const dragElement = Optionser.dragger.element!
          const dragRowIndex = Optionser.dragger.rowIndex || 0
          const dragColIndex = Optionser.dragger.colIndex || 0
          const wrapContainer = Optionser.refTableWrapper.value!
          const wrapClientRect = wrapContainer.getBoundingClientRect()
          const nextClientRect = wrapContainer.querySelector('.s-table-thead')!.getBoundingClientRect()
          const isOutsideX = event.clientX <= nextClientRect.left || event.clientX >= nextClientRect.right
          const isOutsideY = event.clientY <= nextClientRect.top || event.clientY >= nextClientRect.bottom

          const nextThead = document.elementsFromPoint(event.clientX, event.clientY).find(element => element.classList.contains('s-table-thead-th'))!
          const dragParent = Methoder.findParentColumn(Computer.filterListColumns.value, dragRowIndex, dragColIndex)

          let nextRowIndex = +(nextThead?.getAttribute('row-index') || 0)
          let nextColIndex = +(nextThead?.getAttribute('col-index') || 0)
          let nextParent = Methoder.findParentColumn(Computer.filterListColumns.value, nextRowIndex, nextColIndex)

          while (nextParent && (nextRowIndex > dragRowIndex)) {
            nextRowIndex = nextParent.rowIndex
            nextColIndex = nextParent.colIndex
            nextParent = Methoder.findParentColumn(Computer.filterListColumns.value, nextRowIndex, nextColIndex)
          }

          Optionser.dragger.top = Optionser.wrapperScrollTop.value + event.clientY - wrapClientRect.top
          Optionser.dragger.left = Optionser.wrapperScrollLeft.value + event.clientX - wrapClientRect.left
          Optionser.dragger.allow = !isOutsideX && !isOutsideY && dragParent === nextParent
          Optionser.dragger.visible = true

          if (!Optionser.dragger.allow || nextColIndex === dragColIndex) {
            Optionser.cursor.visible = false
            Optionser.cursor.colIndex = 0
            Optionser.cursor.rowIndex = 0
            Optionser.cursor.height = 0
            Optionser.cursor.width = 0
            Optionser.cursor.left = 0
            Optionser.cursor.top = 0
          }

          if (Optionser.dragger.allow && nextColIndex !== dragColIndex) {
            const nextRect = wrapContainer.querySelector(`.s-table-thead-th[row-index="${nextRowIndex}"][col-index="${nextColIndex}"]`)!.getBoundingClientRect()
            const dragRect = dragElement.getBoundingClientRect()
            const minTop = Math.min(dragRect.top, nextRect.top) || 0
            const bottom = Optionser.wrapperScrollTop.value + nextClientRect.bottom - wrapClientRect.top
            const right = Optionser.wrapperScrollLeft.value + nextRect.right - wrapClientRect.left
            const left = Optionser.wrapperScrollLeft.value + nextRect.left - wrapClientRect.left
            const top = Optionser.wrapperScrollTop.value + minTop - wrapClientRect.top

            Optionser.cursor.visible = true
            Optionser.cursor.colIndex = nextColIndex
            Optionser.cursor.rowIndex = nextRowIndex
            Optionser.cursor.height = bottom - top
            Optionser.cursor.width = 2
            Optionser.cursor.left = nextColIndex > dragColIndex ? right - 3 : left
            Optionser.cursor.top = top
          }
        }
      },

      documentMouseup(event: MouseEvent) {
        if (Optionser.resizer.activate) {
          for (const opt of Optionser.resizer.queues) {
            const rowIndex = opt.column.rowIndex
            const colIndex = opt.column.colIndex
            const treeColumn = Methoder.findTreeColumns(treeColumns.value, rowIndex, colIndex)!
            treeColumn.referColumn.width = opt.column.width
            treeColumn.cacheColumn.width = opt.column.width
          }

          Optionser.resizer.point = 0
          Optionser.resizer.queues = []
          Optionser.resizer.activate = false

          nextTick(() => Eventer.updateWrapperContainer())

          document.body.classList.remove('user-select-none')
          document.body.classList.remove('cursor-column-resizable')
        }

        if (Optionser.dragger.activate) {
          const visible = Optionser.cursor.visible
          const source = { rowIndex: Optionser.dragger.rowIndex, colIndex: Optionser.dragger.colIndex }
          const target = { rowIndex: Optionser.cursor.rowIndex, colIndex: Optionser.cursor.colIndex }

          Optionser.dragger.top = 0
          Optionser.dragger.left = 0
          Optionser.dragger.value = ''
          Optionser.dragger.allow = false
          Optionser.dragger.element = null
          Optionser.dragger.colIndex = 0
          Optionser.dragger.rowIndex = 0
          Optionser.dragger.activate = false
          Optionser.dragger.visible = false
          Optionser.cursor.visible = false
          Optionser.cursor.rowIndex = 0
          Optionser.cursor.colIndex = 0
          Optionser.cursor.height = 0
          Optionser.cursor.width = 0
          Optionser.cursor.left = 0
          Optionser.cursor.top = 0

          if (visible) {
            const newColumns = Methoder.recloneColumns(treeColumns.value)
            const nextColumns = Methoder.dragerColumns(newColumns, source, target)
            Methoder.updatePropColumns(nextColumns)
          }

          nextTick(() => Eventer.updateWrapperContainer())

          document.body.classList.remove('cursor-column-draggable')
          document.body.classList.remove('user-select-none')
        }
      },

      updateScrollToFirstRange() {
        const refTableNoder = Optionser.refTableNoder.value
        const resizerContainer = Optionser.resizerContainer.value

        if (!(refTableNoder instanceof HTMLElement) || !(resizerContainer instanceof HTMLElement)) {
          return
        }

        if (Normalizer.scroll.value.scrollToFirstXOnChange !== false) {
          const tableRect = refTableNoder.getBoundingClientRect()
          const resizerRect = resizerContainer.getBoundingClientRect()

          if (tableRect.left < resizerRect.left) {
            resizerContainer.scrollLeft = resizerContainer.scrollLeft + (tableRect.left - resizerRect.left)
            resizerContainer.scrollLeft = resizerContainer.scrollLeft - (Normalizer.scroll.value.scrollToFirstOffsetX || 0)
            resizerContainer.scrollLeft = Normalizer.scroll.value.scrollToFirstTargetX! >= 0 ? Normalizer.scroll.value.scrollToFirstTargetX! : resizerContainer.scrollLeft
          }
        }

        if (Normalizer.scroll.value.scrollToFirstYOnChange !== false) {
          const tableRect = refTableNoder.getBoundingClientRect()
          const resizerRect = resizerContainer.getBoundingClientRect()

          if (tableRect.top < resizerRect.top) {
            resizerContainer.scrollTop = resizerContainer.scrollTop + (tableRect.top - resizerRect.top)
            resizerContainer.scrollTop = resizerContainer.scrollTop - (Normalizer.scroll.value.scrollToFirstOffsetY || 0)
            resizerContainer.scrollTop = Normalizer.scroll.value.scrollToFirstTargetY! >= 0 ? Normalizer.scroll.value.scrollToFirstTargetY! : resizerContainer.scrollTop
          }
        }
      },

      updateResizerContainer() {
        const container = helper.isFunction(Normalizer.scroll.value.getScrollResizeContainer)
          ? Normalizer.scroll.value.getScrollResizeContainer()
          : null

        if (!(container instanceof HTMLElement)) {
          Optionser.resizerContainer.value = null
          Optionser.resizerScrollTop.value = 0
          Optionser.resizerScrollLeft.value = 0
          Optionser.resizerScrollRight.value = 0
          Optionser.resizerScrollBottom.value = 0
          Optionser.resizerScrollClientWidth.value = 0
          Optionser.resizerScrollClientHeight.value = 0
        }

        if (container instanceof HTMLElement) {
          const clientRect = container.getBoundingClientRect()
          const scrollHeight = container.scrollHeight || 0
          const scrollWidth = container.scrollWidth || 0
          const scrollLeft = container.scrollLeft || 0
          const scrollTop = container.scrollTop || 0

          Optionser.resizerContainer.value = container
          Optionser.resizerScrollTop.value = scrollTop || 0
          Optionser.resizerScrollLeft.value = scrollLeft || 0
          Optionser.resizerScrollRight.value = scrollWidth - (scrollLeft + clientRect.width) || 0
          Optionser.resizerScrollBottom.value = scrollHeight - (scrollTop + clientRect.height) || 0
          Optionser.resizerScrollClientWidth.value = clientRect.width
          Optionser.resizerScrollClientHeight.value = clientRect.height
        }
      },

      updateWrapperContainer() {
        if (Optionser.refTableWrapper.value) {
          const scrollContainer = Optionser.refTableWrapper.value
          const scrollBounding = scrollContainer.getBoundingClientRect()
          const scrollHeight = scrollContainer.scrollHeight || 0
          const scrollWidth = scrollContainer.scrollWidth || 0
          const scrollLeft = scrollContainer.scrollLeft || 0
          const scrollTop = scrollContainer.scrollTop || 0

          Optionser.wrapperScrollTop.value = scrollTop || 0
          Optionser.wrapperScrollLeft.value = scrollLeft || 0
          Optionser.wrapperScrollRight.value = scrollWidth - (scrollLeft + scrollBounding.width) || 0
          Optionser.wrapperScrollBottom.value = scrollHeight - (scrollTop + scrollBounding.height) || 0
          Optionser.wrapperScrollClientWidth.value = scrollBounding.width
          Optionser.wrapperScrollClientHeight.value = scrollBounding.height
        }
      },

      updateWindowContainer() {
        Optionser.windowInnerWidth.value = window.innerWidth
        Optionser.windowInnerHeight.value = window.innerHeight
      },

      updateTheadContainer() {
        if (Optionser.refTableWrapper.value && Optionser.tableTheadSizes.value.length === Computer.filterDataColumns.value.length) {
          for (const [index, column] of Computer.filterDataColumns.value.entries()) {
            const rowSpan = column.rowSpan
            const colSpan = column.colSpan
            const rowIndex = column.rowIndex
            const colIndex = column.colIndex
            const rowOffset = column.rowOffset
            const colOffset = column.colOffset
            const minWidth = column.minWidth || 0
            const maxWidth = column.maxWidth || Infinity
            const tableThead = Optionser.refTableWrapper.value?.querySelector<HTMLElement>(`.s-nested-table > colgroup > col[col-index="${colIndex}"]`)

            Optionser.tableTheadSizes.value[index].rowSpan = rowSpan
            Optionser.tableTheadSizes.value[index].colSpan = colSpan
            Optionser.tableTheadSizes.value[index].rowIndex = rowIndex
            Optionser.tableTheadSizes.value[index].colIndex = colIndex
            Optionser.tableTheadSizes.value[index].rowOffset = rowOffset
            Optionser.tableTheadSizes.value[index].colOffset = colOffset
            Optionser.tableTheadSizes.value[index].minWidth = minWidth
            Optionser.tableTheadSizes.value[index].maxWidth = maxWidth
            Optionser.tableTheadSizes.value[index].width = tableThead?.offsetWidth || 0
            Optionser.tableTheadSizes.value[index].height = tableThead?.offsetHeight || 0
          }
        }

        if (Optionser.refTableWrapper.value && Optionser.tableTheadSizes.value.length !== Computer.filterDataColumns.value.length) {
          Optionser.tableTheadSizes.value = Computer.filterDataColumns.value.map(column => {
            const rowSpan = column.rowSpan
            const colSpan = column.colSpan
            const rowIndex = column.rowIndex
            const colIndex = column.colIndex
            const rowOffset = column.rowOffset
            const colOffset = column.colOffset
            const minWidth = column.minWidth || 0
            const maxWidth = column.maxWidth || Infinity
            const tableThead = Optionser.refTableWrapper.value?.querySelector<HTMLElement>(`.s-nested-table > colgroup > col[col-index="${colIndex}"]`)

            return {
              rowSpan,
              colSpan,
              rowIndex,
              colIndex,
              rowOffset,
              colOffset,
              minWidth,
              maxWidth,
              width: tableThead?.offsetWidth || 0,
              height: tableThead?.offsetHeight || 0
            }
          })
        }
      },

      updateColCheckRender() {
        const Updater = {
          updateColSettings: (wraps: STableWrapColumnType[]) => {
            for (const wrap of wraps) {
              const checkbox = columnSettingsCheckKeys.value.includes(wrap.key)
              const disabled = wrap.referColumn.settings.disabled

              wrap.referColumn.settings.checkbox = checkbox
              wrap.referColumn.settings.disabled = disabled

              if (checkbox && !disabled) {
                if (helper.isObject(wrap.cacheColumn.settings)) {
                  wrap.cacheColumn.settings.checkbox = checkbox
                  wrap.cacheColumn.settings.disabled = disabled
                }
              }

              if (!checkbox || disabled) {
                if (helper.isObject(wrap.cacheColumn.settings)) {
                  wrap.cacheColumn.settings.checkbox = checkbox
                  wrap.cacheColumn.settings.disabled = disabled
                }

                if (!helper.isObject(wrap.cacheColumn.settings)) {
                  wrap.cacheColumn.settings = { checkbox, disabled }
                }
              }

              if (helper.isArray(wrap.treeChildren)) {
                Updater.updateColSettings(wrap.treeChildren)
              }
            }
          }
        }

        Updater.updateColSettings(treeColumns.value)
        Eventer.updateColumnRender()
      },

      updateColGroupRender() {
        if (Optionser.refTableWrapper.value) {
          Array.from<HTMLElement>(Optionser.refTableWrapper.value.querySelectorAll('table > colgroup > col')).forEach(col => {
            const maxWidth = col.style.maxWidth ? parseInt(col.style.maxWidth) : Infinity
            const minWidth = col.style.minWidth ? parseInt(col.style.minWidth) : 0
            const nowWidth = col.getBoundingClientRect().width

            if (nowWidth < minWidth || nowWidth > maxWidth) {
              col.style.width = `${nowWidth < minWidth ? minWidth : nowWidth > maxWidth ? maxWidth : nowWidth}px`
            }
          })

          nextTick(() => Eventer.updateTheadContainer())
        }
      },

      updateColumnRender() {
        Eventer.updateResizerContainer()
        Eventer.updateWrapperContainer()
        Eventer.updateColGroupRender()
      }
    }

    const Render = {
      computeTableGroupStyle(column: STableColumnType) {
        const width = helper.isFiniteNumber(parseInt(`${column.width}`)) ? parseInt(`${column.width}`) : 'auto'
        const minWidth = helper.isFiniteNumber(parseInt(`${column.minWidth}`)) ? parseInt(`${column.minWidth}`) : 0
        const maxWidth = helper.isFiniteNumber(parseInt(`${column.maxWidth}`)) ? parseInt(`${column.maxWidth}`) : Infinity

        const style = {
          width: 'auto',
          minWidth: `0px`,
          maxWidth: 'none'
        }

        if (/^\+?\d+\.?\d*(px)?$/.test(`${width}`)) {
          style.width = parseInt(`${width}`) + 'px'
        }

        if (/^\+?\d+\.?\d*(px)?$/.test(`${maxWidth}`)) {
          if (style.width !== 'auto') {
            style.width = parseInt(`${style.width}`) < parseInt(`${maxWidth}`)
              ? parseInt(`${style.width}`) + 'px'
              : parseInt(`${maxWidth}`) + 'px'
          }

          style.maxWidth = parseInt(`${maxWidth}`) + 'px'
        }

        if (/^\+?\d+\.?\d*(px)?$/.test(`${minWidth}`)) {
          if (style.width !== 'auto') {
            style.width = parseInt(`${style.width}`) > parseInt(`${minWidth}`)
              ? parseInt(`${style.width}`) + 'px'
              : parseInt(`${minWidth}`) + 'px'
          }

          style.minWidth = parseInt(`${minWidth}`) + 'px'
        }

        if (/^\+?\d+\.?\d*(px)?$/.test(`${minWidth}`) && /^\+?\d+\.?\d*(px)?$/.test(`${maxWidth}`)) {
          style.width = minWidth !== maxWidth
            ? parseInt(`${style.width}`) + 'px'
            : parseInt(`${minWidth}`) + 'px'
        }

        if (/^\+?\d+\.?\d*(px)?$/.test(`${style.width}`)) {
          style.width = parseInt(`${style.width}`) >= 0
            ? parseInt(`${style.width}`) + 'px'
            : 'auto'
        }

        return style
      },

      computeTableChildStyle(column: STableColumnType, fixeder: STableCellFixedType, type: string) {
        const style = {}
        const isThead = type === 'thead'
        const isTfoot = type === 'tfoot'
        const tableTheadSizes = Optionser.tableTheadSizes.value
        const OffsetLeftWidth = Computer.hasSelection.value ? (Normalizer.size.value === 'small' ? 32 : Normalizer.size.value === 'middle' ? 36 : 38) : 0
        const currentFixedLeft = Computer.fixedLeftIndex.value > -1 && fixeder.colOffset <= Computer.fixedLeftIndex.value && (!isTfoot || Normalizer.sticky.value.leftFooter)
        const currentFixedRight = Computer.fixedRightIndex.value > -1 && fixeder.colOffset >= Computer.fixedRightIndex.value && (!isTfoot || Normalizer.sticky.value.rightFooter)
        const overflowScrollRight = Computer.overflowScrollRight.value
        const overflowScrollLeft = Computer.overflowScrollLeft.value

        if (/^\+?\d+\.?\d*(px)?$/.test(`${column.minWidth}`)) {
          Object.assign(style, {
            minWidth: parseInt(`${column.minWidth}`) + 'px'
          })
        }

        if (/^\+?\d+\.?\d*(px)?$/.test(`${column.maxWidth}`)) {
          Object.assign(style, {
            maxWidth: parseInt(`${column.maxWidth}`) + 'px'
          })
        }

        if (typeof column.align === 'string') {
          Object.assign(style, {
            'text-align': column.align || 'left'
          })
        }

        if (currentFixedLeft === true) {
          const offsetWidth = !isTfoot || fixeder.colOffset > 0 ? OffsetLeftWidth : 0
          const leftWidth = tableTheadSizes.reduce((total, item, index) => index < fixeder.colOffset ? total + item.width : total, 0)
          const boxShadow = '2px ' + (isThead ? '-1px' : '1px') + ' 3px 0 rgba(0, 0, 0, .15)'

          Object.assign(style, {
            'z-index': 5,
            'position': 'sticky',
            'box-shadow': overflowScrollLeft && (isThead || fixeder.colOffset + fixeder.colSpan - 1 === Computer.fixedLeftIndex.value) ? boxShadow : 'none',
            'left': (leftWidth + offsetWidth > 0 ? offsetWidth + leftWidth - 1 : offsetWidth) + 'px'
          })
        }

        if (currentFixedRight === true) {
          const reverseSizes = [...tableTheadSizes].reverse()
          const rightWidth = reverseSizes.reduce((total, item, index) => index < reverseSizes.length - fixeder.colOffset - 1 ? total + item.width : total, 0)
          const boxShadow = '-2px ' + (isThead ? '-1px' : '1px') + ' 3px 0 rgba(0, 0, 0, .15)'

          Object.assign(style, {
            'position': 'sticky',
            'box-shadow': overflowScrollRight && (isThead || fixeder.colOffset === Computer.fixedRightIndex.value) ? boxShadow : 'none',
            'z-index': reverseSizes.length + 5 - fixeder.colOffset,
            'right': (rightWidth > 0 ? rightWidth - 1 : 0) + 'px'
          })
        }

        return style
      },

      computeTableChildAttrs(attrs: Record<string, any> = {}, type: string) {
        if (type === 'tbody' || type === 'tfoot') {
          return Methoder.getValue(attrs)
        }

        return {}
      },

      computeTableChildProps(props: Record<string, any> = {}, type: string) {
        if (type === 'tbody' || type === 'tfoot') {
          const marks = { ...Methoder.getValue(props) }
          const attrs = { style: {} }

          if (typeof marks.align === 'string') {
            Object.assign(attrs.style, {
              'text-align': marks.align || 'left'
            })
          }

          return attrs
        }

        return {}
      }
    }

    const Emiter = {
      pageChange: (pageNo: number, pageSize: number) => {
        const pageSizeChanged = pageSize === Paginator.paginate.pageSize

        pageSizeChanged && context.emit('pageChange', pageNo, pageSize)
        pageSizeChanged && Paginator.update({ pageNo, pageSize })
        pageSizeChanged && Requester.reload()

        pageSizeChanged || context.emit('pageChange', 1, pageSize)
        pageSizeChanged || Paginator.update({ pageNo: 1, pageSize })
        pageSizeChanged || Requester.refresh()
      },
      pageSizeChange: (pageNo: number, pageSize: number) => {
        pageSize === Paginator.paginate.pageSize && context.emit('pageSizeChange', pageNo, pageSize)
        pageSize !== Paginator.paginate.pageSize && context.emit('pageSizeChange', 1, pageSize)
      },
      expand: (keys: Array<STableKey>, nodes: Array<STableRecordType | null>) => {
        context.emit('expand', keys, nodes)
      },
      select: (keys: Array<STableKey>, nodes: Array<STableRecordType | null>) => {
        context.emit('select', keys, nodes)
      },
      sorter: (values: Array<STableSorterType>) => {
        context.emit('sorter', values)
        Requester.refresh()
      }
    }

    watch([() => props.columns, () => props.sources, () => props.summarys], ([newColumns, newSources, newSummarys], [oldColumns, oldSources, oldSummarys]) => {
      const columnsChanged = newColumns !== oldColumns && Methoder.isColumnsChanged(propColumns.value, treeColumns.value)
      const sourcesChanged = newSources !== oldSources && Methoder.isSourcesChanged(propSources.value, treeSources.value)
      const summaryChanged = newSummarys !== oldSummarys && Methoder.isSummaryChanged(propSummarys.value, listSummarys.value)
      const sourcesReseted = sourcesChanged && Methoder.isSourcesChanged(propSources.value.slice(0, treeSources.value.length), treeSources.value)

      if (columnsChanged) {
        columnRowAttrs.value = []
        columnCellAttrs.value = []
        columnCellProps.value = []
        columnCellRender.value = []
        columnSettingsAllKeys.value = []
        columnSettingsAllTrees.value = []
        propColumns.value = [...props.columns]
        treeColumns.value = Methoder.normalizeTreeColumns(propColumns.value, [])
        listColumns.value = Methoder.normalizeListColumns(treeColumns.value, [])
        dataColumns.value = Methoder.normalizeDataColumns(listColumns.value)
        Methoder.normalizeTreeSettings(treeColumns.value)
        Methoder.normalizeInitColumns(listColumns.value)
      }

      if (sourcesReseted) {
        sourceRowAttrs.value = []
        sourceRowStates.value = []
        sourceCellProps.value = []
        sourceCellAttrs.value = []
        sourceCellRender.value = []
      }

      if (sourcesChanged) {
        sourceRowKeys.value = []
        propSources.value = [...props.sources]
        treeSources.value = Methoder.normalizeTreeSources(propSources.value, [])
        listSources.value = Methoder.normalizeListSources(treeSources.value, [])
        Methoder.normalizeInitSources(listSources.value)
        Methoder.cleanSelectedRowKeys()
        Methoder.cleanExpandedRowKeys()
      }

      if (summaryChanged) {
        summaryRowAttrs.value = []
        summaryCellProps.value = []
        summaryCellAttrs.value = []
        summaryCellRender.value = []
        propSummarys.value = [...props.summarys]
        listSummarys.value = Methoder.normalizeListSummary(propSummarys.value)
        Methoder.normalizeInitSummary(listSummarys.value)
      }
    }, watchDeepOptions)

    watch(() => props.loading, state => { loading.value = state }, watchOptions)
    watch(() => props.paginate, paginate => { Paginator.update(paginate) }, watchOptions)
    watch(() => props.selectedRowMode, () => { selectedRowKeys.value = [] }, watchOptions)
    watch(() => props.preserveSelectedRowKeys, () => { selectedRowKeys.value = selectedRowKeys.value.filter(key => sourceRowKeys.value.includes(key)) }, watchOptions)
    watch(() => props.preserveExpandedRowKeys, () => { expandedRowKeys.value = expandedRowKeys.value.filter(key => sourceRowKeys.value.includes(key)) }, watchOptions)
    watch(() => [...props.selectedRowKeys], () => { Methoder.updateSetupSelectedRowKeys(props.selectedRowKeys) }, watchOptions)
    watch(() => [...props.expandedRowKeys], () => { Methoder.updateSetupExpandedRowKeys(props.expandedRowKeys) }, watchOptions)

    watch(() => Normalizer.size.value, () => { Eventer.updateColGroupRender() }, watchDeepOptions)
    watch(() => columnSettingsCheckKeys.value, () => { Eventer.updateColCheckRender() }, watchDeepOptions)
    watch(() => Computer.filterDataColumns.value, () => { Eventer.updateColGroupRender() }, watchDeepOptions)
    watch(() => selectedRowKeys.value, () => { Methoder.updatePropSelectedRowKeys(selectedRowKeys.value) }, watchDeepOptions)
    watch(() => expandedRowKeys.value, () => { Methoder.updatePropExpandedRowKeys(expandedRowKeys.value) }, watchDeepOptions)
    watch(() => Paginator.paginate, () => { Methoder.updatePropPaginate(Paginator.paginate) }, watchDeepOptions)
    watch(() => treeColumns.value, () => { Methoder.updatePropColumns(treeColumns.value) }, watchDeepOptions)
    watch(() => treeSources.value, () => { Methoder.updatePropSources(treeSources.value) }, watchDeepOptions)
    watch(() => listSummarys.value, () => { Methoder.updatePropSummarys(listSummarys.value) }, watchDeepOptions)
    watch(() => loading.value, () => { context.emit('update:loading', loading.value) }, watchDeepOptions)

    onMounted(() => {
      if (props.immediate !== false) {
        Requester.refresh()
      }

      Eventer.updateResizerContainer()
      Eventer.updateWrapperContainer()
      Eventer.updateColGroupRender()

      document.addEventListener('mouseup', Eventer.documentMouseup)
      document.addEventListener('mousemove', Eventer.documentMouseMove)
      window.addEventListener('resize', Eventer.updateWindowContainer)

      Observer.resizeObserver.observe(Optionser.refTableWrapper.value!)

      nextTick(() => {
        let proxyer: any = Optionser.refTableWrapper.value

        if (!helper.isFunction(props.scroll.getScrollResizeContainer)) {
          while ((proxyer instanceof HTMLElement) && (proxyer.parentElement instanceof HTMLElement) && window.getComputedStyle(proxyer).overflow !== 'auto') {
            proxyer = proxyer.parentElement
          }

          if (proxyer instanceof HTMLElement) {
            Normalizer.scroll.value.getScrollResizeContainer = () => proxyer
            Optionser.getResizerContainer = () => proxyer
          }
        }

        if (helper.isFunction(Normalizer.scroll.value.getScrollResizeContainer)) {
          const container = Normalizer.scroll.value.getScrollResizeContainer()
          const elementer = container instanceof HTMLElement ? container : null
          proxyer = elementer
        }

        if (proxyer instanceof HTMLElement) {
          proxyer.addEventListener('scroll', Eventer.updateResizerContainer, { passive: true })
          Observer.resizeObserver.observe(proxyer)
          Eventer.updateResizerContainer()
        }
      })
    })

    context.expose({
      reload: Requester.reload,
      refresh: Requester.refresh,
      select: Methoder.updateSetupSelectedRowKeys,
      expand: Methoder.updateSetupExpandedRowKeys,
      update: Methoder.forceUpdate,
      clear: Methoder.forceClear
    })

    const RenderTableScroller = (ctx: typeof context) => {
      const allKeys: STableKey[] = []
      const enableKeys: STableKey[] = []
      const disableKeys: STableKey[] = []
      const selectedKeys: STableKey[] = [...selectedRowKeys.value]
      const checkStrictly: boolean = props.rowSelectedStrictly !== false

      if (dataColumns.value.length <= 0) {
        return
      }

      if (props.selectedRowMode === 'Checkbox') {
        const allSourceKeys = listSources.value.filter(() => true)
        const allReverseKeys = [...allSourceKeys].reverse()

        for (const record of allSourceKeys) {
          const rowKey = record.key
          const childKeys = record.childKeys
          const rowGlobalIndex = record.rowGlobalIndex
          const rowState = Methoder.getValue(sourceRowStates.value[rowGlobalIndex])
          const selectable = Methoder.getValue(rowState?.selectable) !== false

          if (selectable && !disableKeys.includes(rowKey) && !enableKeys.includes(rowKey)) {
            enableKeys.push(rowKey)
          }

          if (!selectable && !disableKeys.includes(rowKey)) {
            !checkStrictly && childKeys.forEach(key => disableKeys.includes(key) || disableKeys.push(key))
            disableKeys.push(rowKey)
          }
        }

        if (!checkStrictly) {
          for (const record of allReverseKeys) {
            const rowKey = record.key
            const childKeys = record.childKeys

            if (childKeys.length > 0 && childKeys.every(key => disableKeys.includes(key))) {
              enableKeys.includes(rowKey) && enableKeys.splice(0, enableKeys.length, ...enableKeys.filter(key => key !== rowKey))
              disableKeys.includes(rowKey) || disableKeys.push(rowKey)
            }
          }
        }

        allKeys.push(
          ...enableKeys,
          ...disableKeys
        )
      }

      const RenderColGroup = () => {
        const width = Normalizer.size.value === 'small' ? 32 : Normalizer.size.value === 'middle' ? 36 : 38
        const render = Computer.hasSelection.value === true

        return (
          <colgroup>
            { render && <col col-index={-1} style={{ width: `${width}px`, minWidth: `${width}px`, maxWidth: `${width}px` }}/>}
            { ref(Computer.filterDataColumns).value.map(column => <col col-index={column.colIndex} style={Render.computeTableGroupStyle(column)}/>) }
          </colgroup>
        )
      }

      const RenderTableThead = () => {
        const style: any = { 'position': 'relative', 'z-index': 50 }
        const topHeader = Normalizer.sticky.value.topHeader
        const isFixedTop = Computer.isFixedTop.value

        if (isFixedTop || topHeader === true || helper.isFiniteNumber(topHeader)) {
          const top = /^\+?\d+\.?\d*$/.test(`${topHeader}`)
            ? topHeader as number
            : 0

          Object.assign(style, {
            'position': 'sticky',
            'top': top + 'px',
            'z-index': 50
          })

          if (Computer.overflowScrollTop.value) {
            Object.assign(style, {
              'box-shadow': '0 1px 1px 0 rgba(0, 0, 0, .15)'
            })
          }
        }

        return (
          <thead
            ref={Optionser.refTableTheader}
            class={['s-table-thead', { 's-border-table': ([] as any).concat(props.border).includes('thead') }]}
            style={style}
          >
            {
              ref(Computer.filterListColumns).value.map((columns, rowIndex) => {
                const RenderSelection = () => {
                  if (!Computer.hasSelection.value) {
                    return
                  }

                  if (rowIndex > 0) {
                    return
                  }

                  const store: any = {
                    small: '8px 5px',
                    middle: '12px 7px',
                    default: '16px 6px',
                    large: '16px 6px'
                  }

                  const style: any = {
                    padding: store[Normalizer.size.value] || '16px 6px',
                    textAlign: 'center',
                    ...props.tHeaderThStyle
                  }

                  if (Computer.fixedLeftIndex.value > -1) {
                    Object.assign(style, {
                      'text-align': 'center',
                      'position': 'sticky',
                      'left': '0px',
                      'z-index': 5
                    })
                  }

                  if (props.selectedRowMode !== 'Checkbox') {
                    return (
                      <th
                        style={style}
                        rowspan={Computer.filterListColumns.value.length}
                        class={['s-table-thead-th', 's-table-thead-selection-th']}
                        col-index={-1}
                        row-index={0}
                        col-offset={-1}
                        row-offset={0}
                      />
                    )
                  }

                  const indeterminate = enableKeys.length > 0 && enableKeys.some(key => selectedRowKeys.value.includes(key))
                  const checked = enableKeys.length > 0 && enableKeys.every(key => selectedRowKeys.value.includes(key))

                  const doCheck = (checked: boolean) => {
                    if (!checked) {
                      selectedRowKeys.value.splice(0, selectedRowKeys.value.length, ...selectedKeys.filter(key => !enableKeys.includes(key)))
                      Emiter.select([...selectedRowKeys.value], selectedRowKeys.value.map(key => Methoder.getValue(listSources.value.find(record => record.key === key)?.referRecord || null)))
                    }

                    if (checked) {
                      selectedRowKeys.value.splice(0, selectedRowKeys.value.length, ...Array.from(new Set([...enableKeys, ...selectedKeys])))
                      Emiter.select([...selectedRowKeys.value], selectedRowKeys.value.map(key => Methoder.getValue(listSources.value.find(record => record.key === key)?.referRecord || null)))
                    }
                  }

                  return (
                    <th
                      style={style}
                      rowspan={Computer.filterListColumns.value.length}
                      class={['s-table-thead-th', 's-table-thead-selection-th']}
                      col-index={-1}
                      row-index={0}
                      col-offset={-1}
                      row-offset={0}
                    >
                      <STableSelection
                        type={props.selectedRowMode}
                        size={Normalizer.size.value}
                        indeterminate={!checked && indeterminate}
                        disabled={enableKeys.length === 0}
                        checked={checked}
                        onCheck={doCheck}
                      />
                    </th>
                  )
                }

                const RenderContent = () => {
                  return columns.map(column => {
                    if (column && column.rowSpan > 0 && column.colSpan > 0) {
                      const sorter = column.sorter
                      const rowSpan = column.rowSpan
                      const rowIndex = column.rowIndex
                      const colIndex = column.colIndex
                      const rowOffset = column.rowOffset
                      const sorterField = column.sorterField
                      const sorterValue = column.sorterValue
                      const rowMaxSpans = Computer.filterDataColumns.value.map(col => col.rowMaxSpan)
                      const sortable = sorter && (rowOffset + rowSpan === Math.max(...rowMaxSpans, 0))

                      const renderTitle = Methoder.getValue(columnCellRender.value[rowIndex][colIndex])
                      const computeTitle = !Methoder.isVueNode(renderTitle) && helper.isFunction(ctx.slots.headerCell)
                        ? Methoder.getVNodes(renderSlot(ctx.slots, 'headerCell', { title: renderTitle, column, rowIndex, colIndex }))
                        : renderTitle

                      const sorterChanger = (options: STableSorterType) => {
                        const field = options.field
                        const value = options.value
                        const values = Methoder.getValue(listSorters) as any[]

                        column.sorterField = field
                        column.sorterValue = value

                        if (props.columnSorterMultiple !== true) {
                          if (value) {
                            values.splice(0, values.length)
                            values.push({ field, value })
                          }

                          if (!value) {
                            values.splice(0, values.length)
                          }

                          if (helper.isFunction(column.sorterValueChange)) {
                            column.sorterValueChange({ field, value, values })
                          }

                          for (const column of Computer.filterDataColumns.value) {
                            if (column.sorterField !== field && column.sorterValue !== '') {
                              column.sorterValue = ''
                            }
                          }

                          Emiter.sorter(values)
                        }

                        if (props.columnSorterMultiple === true) {
                          if (value) {
                            values.splice(0, values.length, ...values.filter((opt: any) => opt.field !== field))
                            values.push({ field, value })
                          }

                          if (!value) {
                            values.splice(0, values.length, ...values.filter((opt: any) => opt.field !== field))
                          }

                          if (helper.isFunction(column.sorterValueChange)) {
                            column.sorterValueChange({ field, value, values })
                          }

                          Emiter.sorter(values)
                        }

                        listSorters.value = values
                      }

                      return (
                        <th
                          colspan={column.colSpan}
                          rowspan={column.rowSpan}
                          { ...Methoder.getValue(columnCellAttrs.value[rowIndex][colIndex]) }
                          style={{ ...Render.computeTableChildStyle(column, column, 'thead'), ...props.tHeaderThStyle }}
                          class={['s-table-thead-th', { 's-table-thead-leafed-th': column.rowIndex === column.rowMaxSpan - 1, 's-table-thead-draggable-th': props.columnPresetDraggable === true, 's-table-thead-sortable-th': sortable }]}
                          col-index={column.colIndex}
                          row-index={column.rowIndex}
                          col-offset={column.colOffset}
                          row-offset={column.rowOffset}
                        >
                          <SEllipsis
                            visible={column.tooltip === true ? undefined : false}
                            tooltip={column.tooltip === true || column.ellipsis === true}
                            ellipsis={column.tooltip === true || column.ellipsis === true}
                          >
                            { computeTitle ?? renderTitle }
                          </SEllipsis>

                          <div class='s-table-thead-th-functional'>
                            { sortable ? <STableSorter field={sorterField} value={sorterValue} onChange={sorterChanger} /> : null }
                            { column.resizable ? <span class='s-table-thead-functional-resizable'/> : null }
                          </div>
                        </th>
                      )
                    }
                  })
                }

                return (
                  <tr
                    { ...Methoder.getValue(columnRowAttrs.value[rowIndex]) }
                    style={{ 'position': 'relative', 'z-index': listColumns.value.length - rowIndex }}
                    class='s-table-thead-tr'
                    row-index={rowIndex}
                  >
                    { RenderSelection() }
                    { RenderContent() }
                  </tr>
                )
              })
            }
          </thead>
        )
      }

      const RenderTableTBody = () => {
        if (!Computer.hasBodyer.value) {
          return (
            <tbody
              class={['s-table-tbody', { 's-border-table': ([] as any).concat(props.border).includes('tbody') }]}
              style={{ 'position': 'relative', 'z-index': 10 }}
            >
              <tr class='s-table-tbody-tr'>
                <td
                  class='s-table-tbody-td'
                  style={{ ...props.tBodyerTdStyle }}
                  colspan={Computer.hasSelection.value ? Computer.filterDataColumns.value.length + 1 : Computer.filterDataColumns.value.length}
                >
                  <STableEmpty/>
                </td>
              </tr>
            </tbody>
          )
        }

        const presetColumns = ref(dataColumns).value
        const filterColumns = ref(Computer.filterDataColumns).value
        const renderSources = ref(Computer.filterPageSources).value
        const rangerSources = ref(Computer.filterRangeSources).value
        const persistRanges = ref(Normalizer.persistSourceRanges).value

        const StoreCachers = {} as Map<number, STableCellCacheType>[]
        const StoreSpikers = {} as Set<number>[]
        const StoreEmpters = {} as Set<number>[]

        for (const [rowIndex, record] of rangerSources.entries()) {
          const groupIndex = record.rowGroupIndex
          const globalIndex = record.rowGlobalIndex

          const cellCachers = StoreCachers[globalIndex] || new Map()
          const cellSpikers = StoreSpikers[globalIndex] || new Set()
          const cellEmpters = StoreEmpters[globalIndex] || new Set()

          StoreCachers[globalIndex] = cellCachers
          StoreSpikers[globalIndex] = cellSpikers
          StoreEmpters[globalIndex] = cellEmpters

          for (let colIndex = 0; colIndex < presetColumns.length; colIndex++) {
            let colSpan = 0
            let rowSpan = 0
            let colCount = 0
            let rowCount = 0
            let cellRender = true

            const item = presetColumns[colIndex]
            const column = filterColumns.find(col => col.colIndex === item.colIndex) || item
            const cellAttrs = Methoder.getValue(sourceCellAttrs.value[globalIndex][column.key])
            const cellProps = Methoder.getValue(sourceCellProps.value[globalIndex][column.key])
            const cellValue = Methoder.getValue(sourceCellRender.value[globalIndex][column.key])
            const cellMegrer = props.cellMegreNormalize !== false
            const cellCahcer = cellCachers.get(colIndex)

            cellRender = cellProps?.cellSpan !== false && filterColumns.some(col => col.colIndex === colIndex)

            colSpan = helper.isFiniteNumber(cellProps?.colSpan) ? cellProps.colSpan : helper.isFiniteNumber(column.colSpan) ? column.colSpan : 1
            rowSpan = helper.isFiniteNumber(cellProps?.rowSpan) ? cellProps.rowSpan : 1

            rowSpan = helper.isFiniteNumber(cellCahcer?.rowSpan) ? cellCahcer!.rowSpan : rowSpan
            colSpan = helper.isFiniteNumber(cellCahcer?.colSpan) ? cellCahcer!.colSpan : colSpan

            rowCount = rowSpan - 1
            colCount = colSpan - 1

            if (cellMegrer === true) {
              let count = 0

              if (colCount > 0) {
                for (let next = 1; next <= colCount; next++) {
                  StoreCachers[globalIndex].set(colIndex + next, {
                    index: colIndex + next,
                    rowCount: 0,
                    rowSpan: 1,
                    colCount: -1,
                    colSpan: 0,
                    cellAttrs: null,
                    cellProps: null,
                    cellValue: null,
                    cellRender: true
                  })
                }
              }

              if (rowCount > 0) {
                for (let next = 1; next <= rowCount; next++) {
                  const nextRowNode = rangerSources[rowIndex + next]
                  const nextRowIndex = nextRowNode?.rowGlobalIndex

                  if (!nextRowIndex) {
                    break
                  }

                  StoreCachers[nextRowIndex] = StoreCachers[nextRowIndex] || new Map()
                  StoreCachers[nextRowIndex].set(colIndex, {
                    index: colIndex,
                    colCount: colSpan - 1,
                    colSpan: colSpan,
                    rowCount: -1,
                    rowSpan: 0,
                    cellAttrs: null,
                    cellProps: null,
                    cellValue: null,
                    cellRender: false
                  })

                  count++
                }
              }

              if (rowCount > 0 && colCount > 0) {
                for (let row = 1; row <= rowCount; row++) {
                  const nextRowNode = rangerSources[rowIndex + row]
                  const nextRowIndex = nextRowNode?.rowGlobalIndex

                  if (!nextRowIndex) {
                    break
                  }

                  for (let col = 1; col <= colCount; col++) {
                    const nextColIndex = colIndex + col
                    const tempCellCacher = StoreCachers[nextRowIndex] = StoreCachers[nextRowIndex] || new Map()

                    tempCellCacher.set(nextColIndex, {
                      index: nextColIndex,
                      rowCount: -1,
                      rowSpan: 0,
                      colCount: -1,
                      colSpan: colSpan, // fix bug when using fixed
                      cellAttrs: null,
                      cellProps: null,
                      cellValue: null,
                      cellRender: true
                    })
                  }
                }
              }

              if (rowCount - count > 0) {
                rowSpan = rowSpan - (rowCount - count) > 0 ? rowSpan - (rowCount - count) : 1
                rowCount = 0
              }
            }

            if (persistRanges === false) {
              rowSpan = 1
              colSpan = 1
              rowCount = 0
              colCount = 0
            }

            if (helper.isNonEmptyArray(persistRanges)) {
              let persist = false

              for (const ranges of persistRanges) {
                if (groupIndex >= ranges[0] || groupIndex <= ranges[1]) {
                  persist = true
                  break
                }
              }

              rowSpan = persist ? rowSpan : 1
              colSpan = persist ? colSpan : 1
              rowCount = persist ? rowCount : 0
              colCount = persist ? colCount : 0
            }

            cellCachers.set(colIndex, {
              index: colIndex,
              rowSpan: rowSpan,
              colSpan: colSpan,
              colCount: colCount,
              rowCount: rowCount,
              cellAttrs: cellAttrs,
              cellProps: cellProps,
              cellValue: cellValue,
              cellRender: cellRender
            })
          }
        }

        const RenderBodySources = () => {
          const childrenNodes = [] as Array<{ parentKey: any; level: number; count: number; }>
          const expandedNodes = [] as Array<{ parentKey: any; level: number; vnode: any; }>

          for (const record of rangerSources) {
            const rowIndex = record.rowIndex
            const groupLevel = record.rowGroupLevel
            const groupIndex = record.rowGroupIndex
            const groupIndexs = record.rowGroupIndexs
            const globalIndex = record.rowGlobalIndex
            const referRecord = record.referRecord
            const parentKey = record.parentKey

            childrenNodes.push({
              count: record.treeChildren.length || 0,
              level: groupLevel,
              parentKey: parentKey
            })

            expandedNodes.push({
              vnode: Methoder.getVNodes(
                renderSlot(ctx.slots, 'expander', {
                  record: referRecord,
                  rowIndex,
                  groupIndex,
                  groupLevel,
                  groupIndexs,
                  globalIndex
                })
              ),
              level: groupLevel,
              parentKey: parentKey
            })
          }

          return rangerSources.map((record, index) => {
            let colOffset = 0
            let expandIcon = true

            const rowKey = record.key
            const rowIndex = record.rowIndex
            const childKeys = record.childKeys
            const parentKeys = record.parentKeys
            const groupLevel = record.rowGroupLevel
            const groupIndex = record.rowGroupIndex
            const groupIndexs = record.rowGroupIndexs
            const globalIndex = record.rowGlobalIndex
            const treeChildren = record.treeChildren
            const referRecord = record.referRecord
            const rowKeyField = record.rowKeyField

            const cellCachers = StoreCachers[globalIndex]
            const cellSpikers = StoreSpikers[globalIndex]
            const cellEmpters = StoreEmpters[globalIndex]

            const totalHasChildNode = childrenNodes.some(opt => !!opt.count)
            const totalHasExpandNode = expandedNodes.some(opt => !!opt.vnode)
            const sourceRowUuid = referRecord[rowKeyField] || globalIndex
            const expandedNode = expandedNodes[index].vnode

            const sourceRowState = Methoder.getValue(sourceRowStates.value[globalIndex])
            const rowExpandable = Methoder.getValue(sourceRowState?.expandable) !== false

            const RenderExpandIcon = (column: STableColumnType) => {
              if (!expandIcon) {
                return
              }

              if (!totalHasChildNode && !totalHasExpandNode) {
                return
              }

              if (filterColumns.find(column => column.expandIcon !== false) !== column) {
                return
              }

              const size = Normalizer.size.value
              const start = size === 'default' ? 16 : 8
              const count = groupLevel - 1 > 0 ? groupLevel - 1 : 0
              const width = ((props.selectIndentSize > 0 ? props.selectIndentSize : (size === 'default' ? 16 : 14)) * count) + start

              if (!expandedNode && treeChildren.length === 0) {
                return (
                  <div
                    class='s-table-tbody-expand-container'
                    style={{ left: width + 'px' }}
                  />
                )
              }

              if (expandedRowKeys.value.includes(sourceRowUuid)) {
                const updateExpandedRowKeys = (event: MouseEvent) => {
                  if (rowExpandable) {
                    const length = expandedRowKeys.value.length
                    const presets = expandedRowKeys.value.filter(key => !childKeys.includes(key) && key !== sourceRowUuid)

                    expandedRowKeys.value.splice(0, length, ...presets)
                    Emiter.expand([...expandedRowKeys.value], expandedRowKeys.value.map(key => Methoder.getValue(listSources.value.find(record => record.key === key)?.referRecord || null)))
                  }
                  event.stopPropagation()
                }

                return (
                  <div
                    class='s-table-tbody-expand-container'
                    style={{ left: width + 'px' }}
                  >
                    <div
                      class={['s-table-tbody-expand-button', { 's-table-tbody-expand-disabled': rowExpandable }]}
                      onClick={updateExpandedRowKeys}
                    >
                      <MinusOutlined class='s-table-tbody-expand-icon'/>
                    </div>
                  </div>
                )
              }

              if (!expandedRowKeys.value.includes(sourceRowUuid)) {
                const toggleExpandedRowKeys = (event: MouseEvent) => {
                  if (rowExpandable) {
                    expandedRowKeys.value.push(sourceRowUuid)
                    Emiter.expand([...expandedRowKeys.value], expandedRowKeys.value.map(key => Methoder.getValue(listSources.value.find(record => record.key === key)?.referRecord || null)))
                  }
                  event.stopPropagation()
                }

                return (
                  <div
                    class='s-table-tbody-expand-container'
                    style={{ left: width + 'px' }}
                  >
                    <div
                      class={['s-table-tbody-expand-button', { 's-table-tbody-expand-disabled': rowExpandable }]}
                      onClick={toggleExpandedRowKeys}
                    >
                      <PlusOutlined class='s-table-tbody-expand-icon'/>
                    </div>
                  </div>

                )
              }
            }

            const RenderValuerNode = (column: STableColumnType, value: any) => {
              if (!expandIcon) {
                return value
              }

              if (!totalHasChildNode && !totalHasExpandNode) {
                return value
              }

              if (filterColumns.find(column => column.expandIcon !== false) !== column) {
                return value
              }

              const size = Normalizer.size.value
              const start = size === 'default' ? 26 : 22
              const count = groupLevel - 1 > 0 ? groupLevel - 1 : 0
              const width = (props.selectIndentSize > 0 ? props.selectIndentSize : (size === 'default' ? 16 : 14)) * count + start

              return (
                <div
                  class='s-table-tbody-valuer-container'
                  style={{ marginLeft: width + 'px' }}
                >
                  { (expandIcon = false) || value }
                </div>
              )
            }

            const RenderSourceNode = () => {
              const RenderSelection = () => {
                if (!Computer.hasSelection.value) {
                  return
                }

                const store: any = {
                  small: '8px 5px',
                  middle: '12px 7px',
                  default: '16px 6px',
                  large: '16px 6px'
                }

                const style: any = {
                  padding: store[Normalizer.size.value] || '16px 6px',
                  textAlign: 'center',
                  ...props.tBodyerTdStyle
                }

                if (Computer.fixedLeftIndex.value > -1) {
                  Object.assign(style, {
                    'text-align': 'center',
                    'position': 'sticky',
                    'left': '0px',
                    'z-index': 5
                  })
                }

                const filterChildKeys = !checkStrictly ? childKeys.filter(key => enableKeys.includes(key)) : []
                const indeterminate = filterChildKeys.length > 0 && filterChildKeys.some(key => selectedRowKeys.value.includes(key))
                const checked = filterChildKeys.length > 0 ? filterChildKeys.every(key => selectedRowKeys.value.includes(key)) : selectedRowKeys.value.includes(rowKey)

                const doCheck = (checked: boolean) => {
                  if (props.selectedRowMode === 'Radio' && (selectedRowKeys.value.length !== 1 || selectedRowKeys.value[0] !== rowKey)) {
                    selectedRowKeys.value.splice(0, selectedRowKeys.value.length, rowKey)
                    Emiter.select([...selectedRowKeys.value], selectedRowKeys.value.map(key => Methoder.getValue(listSources.value.find(record => record.key === key)?.referRecord || null)))
                  }

                  if (props.selectedRowMode === 'Checkbox' && !checked) {
                    checkStrictly || selectedRowKeys.value.splice(0, selectedRowKeys.value.length, ...selectedKeys.filter(key => key !== rowKey && !parentKeys?.includes(key) && !childKeys.includes(key) || disableKeys.includes(key)))
                    checkStrictly && selectedRowKeys.value.splice(0, selectedRowKeys.value.length, ...selectedKeys.filter(key => key !== rowKey || disableKeys.includes(key)))
                    Emiter.select([...selectedRowKeys.value], selectedRowKeys.value.map(key => Methoder.getValue(listSources.value.find(record => record.key === key)?.referRecord || null)))
                  }

                  if (props.selectedRowMode === 'Checkbox' && checked) {
                    checkStrictly || selectedRowKeys.value.splice(0, selectedRowKeys.value.length, ...selectedKeys, ...childKeys.filter(key => !disableKeys.includes(key)), rowKey)
                    checkStrictly && selectedRowKeys.value.splice(0, selectedRowKeys.value.length, ...selectedKeys, rowKey)

                    const allSourceKeys = listSources.value.filter(() => true)
                    const allReverseKeys = [...allSourceKeys].reverse()

                    for (const record of allReverseKeys) {
                      const rowKey = record.key
                      const childKeys = record.childKeys.filter(key => enableKeys.includes(key))

                      if (disableKeys.includes(rowKey) || selectedRowKeys.value.includes(rowKey)) {
                        continue
                      }

                      if (childKeys.length > 0 && childKeys.every(key => selectedRowKeys.value.includes(key))) {
                        selectedRowKeys.value.push(rowKey)
                      }
                    }

                    Emiter.select([...selectedRowKeys.value], selectedRowKeys.value.map(key => Methoder.getValue(listSources.value.find(record => record.key === key)?.referRecord || null)))
                  }
                }

                return (
                  <td
                    style={style}
                    class={['s-table-tbody-td', 's-table-tbody-selection-td']}
                    col-index={-1}
                    col-offset={-1}
                    row-global-index={globalIndex}
                    row-group-index={groupIndex}
                    row-group-level={groupLevel}
                    row-index={rowIndex}
                  >
                    <STableSelection
                      type={props.selectedRowMode}
                      size={Normalizer.size.value}
                      indeterminate={!checked && indeterminate}
                      disabled={disableKeys.includes(rowKey)}
                      checked={checked}
                      onCheck={doCheck}
                    />
                  </td>
                )
              }

              const RenderContent = () => {
                return presetColumns.map((refer, colIndex) => {
                  const options = Methoder.takeCellMegre({
                    index: colIndex,
                    colIndex: refer.colIndex,
                    rowIndex: record.rowIndex,
                    cachers: cellCachers,
                    spikers: cellSpikers,
                    empters: cellEmpters
                  })

                  const cellRender = options.cacher.cellRender
                  const cellValue = options.cacher.cellValue
                  const cellProps = options.cacher.cellProps
                  const cellAttrs = options.cacher.cellAttrs
                  const rowSpan = options.cacher.rowSpan
                  const colSpan = options.cacher.colSpan

                  if (cellRender && colSpan >= 1) {
                    colOffset += colSpan
                  }

                  if (cellRender && rowSpan >= 1 && colSpan >= 1) {
                    const column = filterColumns.find(col => {
                      return col.colIndex === refer.colIndex
                    })!

                    const options = {
                      value: cellValue,
                      record: referRecord,
                      rowIndex,
                      groupIndex,
                      groupLevel,
                      groupIndexs,
                      globalIndex,
                      column,
                      colIndex
                    }

                    const fixeder = {
                      colOffset: colOffset - colSpan,
                      colSpan: colSpan
                    }

                    const computeValue = cellEmpters.has(colIndex) ? null
                      : !Methoder.isVueNode(cellValue) && helper.isFunction(ctx.slots.bodyerCell)
                        ? Methoder.getVNodes(renderSlot(ctx.slots, 'bodyerCell', options)) ?? cellValue
                        : cellValue

                    return (
                      <td
                        rowspan={rowSpan}
                        colspan={colSpan}
                        style={{ ...Render.computeTableChildStyle(column, fixeder, 'tbody'), ...props.tBodyerTdStyle }}
                        { ...Render.computeTableChildAttrs(cellAttrs, 'tbody') }
                        { ...Render.computeTableChildProps(cellProps, 'tbody') }
                        class={'s-table-tbody-td'}
                        col-index={column.colIndex}
                        col-offset={column.colOffset}
                        row-global-index={globalIndex}
                        row-group-index={groupIndex}
                        row-group-level={groupLevel}
                        row-index={rowIndex}
                      >
                        { RenderExpandIcon(column) }

                        <SEllipsis
                          visible={(helper.isBoolean(cellProps?.tooltip) ? cellProps?.tooltip : column.tooltip === true) ? undefined : false}
                          tooltip={(helper.isBoolean(cellProps?.tooltip) ? cellProps?.tooltip : column.tooltip === true) || (helper.isBoolean(cellProps?.ellipsis) ? cellProps?.ellipsis : column.ellipsis === true)}
                          ellipsis={(helper.isBoolean(cellProps?.tooltip) ? cellProps?.tooltip : column.tooltip === true) || (helper.isBoolean(cellProps?.ellipsis) ? cellProps?.ellipsis : column.ellipsis === true)}
                        >
                          { RenderValuerNode(column, computeValue) }
                        </SEllipsis>
                      </td>
                    )
                  }
                })
              }

              const rowExpandedByClick = props.rowExpandedByClick === true
              const rowExpandedRender = treeChildren.length > 0 || !!expandedNode

              if (!rowExpandedByClick || !rowExpandedRender) {
                return (
                  <tr
                    { ...Methoder.getValue(sourceRowAttrs.value[globalIndex]) }
                    row-global-index={record.rowGlobalIndex}
                    row-group-index={record.rowGroupIndex}
                    row-group-level={record.rowGroupLevel}
                    row-index={record.rowGroupIndex}
                    class={['s-table-tbody-tr']}
                  >
                    { RenderSelection() }
                    { RenderContent() }
                  </tr>
                )
              }

              if (rowExpandedByClick && rowExpandedRender) {
                const doTrEvent = {
                  click: (event: MouseEvent) => {
                    const isExpaned = expandedRowKeys.value.includes(sourceRowUuid)
                    const expandable = rowExpandable !== false

                    if (expandable && !isExpaned) {
                      expandedRowKeys.value.push(sourceRowUuid)
                      Emiter.expand([...expandedRowKeys.value], expandedRowKeys.value.map(key => Methoder.getValue(listSources.value.find(record => record.key === key)?.referRecord || null)))
                    }

                    if (expandable && isExpaned) {
                      const length = expandedRowKeys.value.length
                      const values = expandedRowKeys.value.filter(key => !childKeys.includes(key) && key !== sourceRowUuid)
                      expandedRowKeys.value.splice(0, length, ...values)
                      Emiter.expand([...expandedRowKeys.value], expandedRowKeys.value.map(key => Methoder.getValue(listSources.value.find(record => record.key === key)?.referRecord || null)))
                    }

                    event.stopPropagation()
                  }
                }

                return (
                  <tr
                    { ...Methoder.getValue(sourceRowAttrs.value[globalIndex]) }
                    class={['s-table-tbody-tr', 's-table-tbody-click-tr']}
                    row-global-index={record.rowGlobalIndex}
                    row-group-index={record.rowGroupIndex}
                    row-group-level={record.rowGroupLevel}
                    row-index={record.rowGroupIndex}
                    onClick={doTrEvent.click}
                  >
                    { RenderSelection() }
                    { RenderContent() }
                  </tr>
                )
              }
            }

            const RenderExpandNode = () => {
              if (!expandedRowKeys.value.includes(sourceRowUuid)) {
                return
              }

              if (treeChildren.length > 0) {
                return
              }

              if (!expandedNode) {
                expandedRowKeys.value = expandedRowKeys.value.filter(key => key !== sourceRowUuid)
              }

              if (expandedNode) {
                const hasSelection = Computer.hasSelection.value === true
                const indentWidth = Normalizer.size.value === 'default' ? 26 : 22
                const firtsWidth = Normalizer.size.value === 'small' ? 32 : Normalizer.size.value === 'middle' ? 36 : 38
                const totalWidth = hasSelection ? firtsWidth + indentWidth : indentWidth

                const tdStyle: any = {
                  'position': 'relative',
                  'z-index': 8,
                  ...props.expandTdStyle
                }

                const divStyle: any = {
                  'display': 'flex',
                  'flex-flow': 'column nowrap',
                  'justify-content': 'flex-start',
                  'align-items': 'flex-start',
                  'width': '100%',
                  'height': '100%',
                  'padding-left': (props.expandIndentSize > 0 ? props.expandIndentSize : totalWidth) + 'px'
                }

                return (
                  <tr
                    class={['s-table-tbody-tr', 's-table-tbody-expand-tr']}
                    row-global-index={record.rowGlobalIndex}
                    row-group-index={record.rowGroupIndex}
                    row-group-level={record.rowGroupLevel}
                    row-index={record.rowGroupIndex}
                  >
                    <td
                      colspan={Computer.hasSelection.value ? Computer.filterDataColumns.value.length + 1 : Computer.filterDataColumns.value.length}
                      class={['s-table-tbody-td', 's-table-tbody-expand-td']}
                      row-global-index={globalIndex}
                      row-group-index={groupIndex}
                      row-group-level={groupLevel}
                      row-index={rowIndex}
                      style={tdStyle}
                    >
                      <div style={divStyle}>
                        { expandedNode }
                      </div>
                    </td>
                  </tr>
                )
              }
            }

            return (
              <>
                { RenderSourceNode() }
                { RenderExpandNode() }
              </>
            )
          })
        }

        const RenderBodyReserves = () => {
          const totalRows = renderSources.length
          const bodyerRows = Normalizer.bodyMinRows.value

          if (bodyerRows <= 0 || totalRows >= bodyerRows) {
            return
          }

          return Array.from({ length: bodyerRows - totalRows }, () => {
            let colOffset = 0

            const RenderSelection = () => {
              if (!Computer.hasSelection.value) {
                return
              }

              const store: any = {
                small: '8px 5px',
                middle: '12px 7px',
                default: '16px 6px',
                large: '16px 6px'
              }

              const style: any = {
                padding: store[Normalizer.size.value] || '16px 6px',
                textAlign: 'center',
                ...props.tBodyerTdStyle
              }

              if (Computer.fixedLeftIndex.value > -1) {
                Object.assign(style, {
                  'text-align': 'center',
                  'position': 'sticky',
                  'left': '0px',
                  'z-index': 5
                })
              }

              return (
                <td
                  style={style}
                  class={['s-table-tbody-td', 's-table-tbody-empty-td', 's-table-tbody-selection-td']}
                />
              )
            }

            const RenderContent = () => {
              return presetColumns.map(refer => {
                const column = filterColumns.find(col => {
                  return col.colIndex === refer.colIndex
                })!

                if (column) {
                  const fixeder = {
                    colOffset: colOffset++,
                    colSpan: 1
                  }

                  return (
                    <td
                      style={{ ...Render.computeTableChildStyle(column, fixeder, 'tbody'), ...props.tBodyerTdStyle }}
                      class={['s-table-tbody-td', 's-table-tbody-empty-td']}
                    />
                  )
                }
              })
            }

            return (
              <tr class={['s-table-tbody-tr', 's-table-tbody-empty-tr']}>
                { RenderSelection() }
                { RenderContent() }
              </tr>
            )
          })
        }

        return (
          <tbody
            class={['s-table-tbody', { 's-border-table': ([] as any).concat(props.border).includes('tbody') }]}
            style={{ 'position': 'relative', 'z-index': 10 }}
          >
            { RenderBodySources() }
            { RenderBodyReserves() }
          </tbody>
        )
      }

      const RenderTableTFoot = () => {
        const style: any = { 'position': 'relative', 'z-index': 30 }
        const bottomFooter = Normalizer.sticky.value.bottomFooter

        if (bottomFooter === true || helper.isFiniteNumber(bottomFooter)) {
          const height = (Paginator.paginate.size || Normalizer.size.value) !== 'default' || Paginator.paginate.simple ? 45 : 56
          const visible = Paginator.paginate.visible === true

          Object.assign(style, {
            'position': 'sticky',
            'bottom': /^\+?\d+\.?\d*$/.test(`${bottomFooter}`) ? `${(bottomFooter as number) + (visible ? height : 0)}px` : `${visible ? height : 0}px`,
            'z-index': 80
          })
        }

        const presetColumns = ref(dataColumns).value
        const filterColumns = ref(Computer.filterDataColumns).value
        const filterSummarys = ref(Computer.filterPageSummarys).value

        const StoreCachers = {} as Map<number, STableCellCacheType>[]
        const StoreSpikers = {} as Set<number>[]
        const StoreEmpters = {} as Set<number>[]

        for (const rowIndex of filterSummarys.keys()) {
          const cellCachers = StoreCachers[rowIndex] || new Map()
          const cellSpikers = StoreSpikers[rowIndex] || new Set()
          const cellEmpters = StoreEmpters[rowIndex] || new Set()

          StoreSpikers[rowIndex] = cellSpikers
          StoreEmpters[rowIndex] = cellEmpters
          StoreCachers[rowIndex] = cellCachers

          for (let index = 0; index < presetColumns.length; index++) {
            let colSpan = 0
            let rowSpan = 0
            let colCount = 0
            let rowCount = 0
            let cellRender = true

            const item = presetColumns[index]
            const column = filterColumns.find(col => col.colIndex === item.colIndex) || item
            const cellAttrs = Methoder.getValue(summaryCellAttrs.value[rowIndex][column.key])
            const cellProps = Methoder.getValue(summaryCellProps.value[rowIndex][column.key])
            const cellValue = Methoder.getValue(summaryCellRender.value[rowIndex][column.key])
            const cellMegrer = props.cellMegreNormalize !== false
            const cellCahcer = cellCachers.get(index)

            cellRender = cellProps?.cellSpan !== false && filterColumns.some(col => col.colIndex === index)

            colSpan = helper.isFiniteNumber(cellProps?.colSpan) ? cellProps.colSpan : helper.isFiniteNumber(column.colSpan) ? column.colSpan : 1
            rowSpan = helper.isFiniteNumber(cellProps?.rowSpan) ? cellProps.rowSpan : 1

            rowSpan = helper.isFiniteNumber(cellCahcer?.rowSpan) ? cellCahcer!.rowSpan : rowSpan
            colSpan = helper.isFiniteNumber(cellCahcer?.colSpan) ? cellCahcer!.colSpan : colSpan

            rowCount = rowSpan - 1
            colCount = colSpan - 1

            if (cellMegrer === true) {
              if (colCount > 0) {
                for (let next = 1; next <= colCount; next++) {
                  StoreCachers[rowIndex].set(index + next, {
                    index: index + next,
                    rowCount: 0,
                    rowSpan: 1,
                    colCount: -1,
                    colSpan: 0,
                    cellAttrs: null,
                    cellProps: null,
                    cellValue: null,
                    cellRender: true
                  })
                }
              }

              if (rowCount > 0) {
                for (let next = 1; next <= rowCount; next++) {
                  StoreCachers[rowIndex + next] = StoreCachers[rowIndex + next] || new Map()
                  StoreCachers[rowIndex + next].set(index, {
                    index: index,
                    colCount: colSpan - 1,
                    colSpan: colSpan,
                    rowCount: -1,
                    rowSpan: 0,
                    cellAttrs: null,
                    cellProps: null,
                    cellValue: null,
                    cellRender: false
                  })
                }
              }

              if (rowCount > 0 && colCount > 0) {
                for (let nextRowIndex = 1; nextRowIndex <= rowCount; nextRowIndex++) {
                  for (let nextColIndex = 1; nextColIndex <= colCount; nextColIndex++) {
                    const tempColIndex = index + nextColIndex
                    const tempRowIndex = rowIndex + nextRowIndex
                    const tempCellCacher = StoreCachers[tempRowIndex] = StoreCachers[tempRowIndex] || new Map()

                    tempCellCacher.set(tempColIndex, {
                      index: tempColIndex,
                      rowCount: -1,
                      rowSpan: 0,
                      colCount: -1,
                      colSpan: colSpan, // fix bug when using fixed
                      cellAttrs: null,
                      cellProps: null,
                      cellValue: null,
                      cellRender: true
                    })
                  }
                }
              }

              rowCount = 0
            }

            cellCachers.set(index, {
              index: index,
              rowSpan: rowSpan,
              colSpan: colSpan,
              colCount: colCount,
              rowCount: rowCount,
              cellAttrs: cellAttrs,
              cellProps: cellProps,
              cellValue: cellValue,
              cellRender: cellRender
            })
          }
        }

        return (
          <tfoot
            class={['s-table-tfoot', { 's-border-table': ([] as any).concat(props.border).includes('tfoot') }]}
            style={style}
          >
            {
              filterSummarys.map((summary, rowIndex) => {
                let colOffset = 0
                let colPrefix = Computer.hasSelection.value ? 1 : 0

                const cellCachers = StoreCachers[rowIndex]
                const cellSpikers = StoreSpikers[rowIndex]
                const cellEmpters = StoreEmpters[rowIndex]

                return (
                  <tr
                    { ...Methoder.getValue(summaryRowAttrs.value[rowIndex]) }
                    class={'s-table-tfoot-tr'}
                    row-index={rowIndex}
                  >
                    {
                      presetColumns.map((refer, colIndex) => {
                        const options = Methoder.takeCellMegre({
                          index: colIndex,
                          colIndex: refer.colIndex,
                          rowIndex: rowIndex,
                          cachers: cellCachers,
                          spikers: cellSpikers,
                          empters: cellEmpters
                        })

                        const cellRender = options.cacher.cellRender
                        const cellValue = options.cacher.cellValue
                        const cellProps = options.cacher.cellProps
                        const cellAttrs = options.cacher.cellAttrs
                        const rowSpan = options.cacher.rowSpan
                        const colSpan = options.cacher.colSpan

                        if (cellRender && colSpan >= 1) {
                          colOffset += colSpan
                        }

                        if (cellRender && rowSpan >= 1 && colSpan >= 1) {
                          const array = Computer.filterPageSources.value.filter(refer => refer.rowGroupLevel === 1)
                          const column = filterColumns.find(col => col.colIndex === refer.colIndex)!
                          const sources = array.map(refer => refer.referRecord)
                          const paginate = Paginator.paginate

                          const options = {
                            value: cellValue,
                            record: summary,
                            column: column,
                            rowIndex: rowIndex,
                            colIndex: colIndex,
                            paginate: paginate,
                            sources: sources
                          }

                          const fixeder = {
                            colOffset: colOffset - colSpan,
                            colSpan: colSpan
                          }

                          const computeValue = cellEmpters.has(colIndex) ? null
                            : !Methoder.isVueNode(cellValue) && helper.isFunction(ctx.slots.footerCell)
                              ? Methoder.getVNodes(renderSlot(ctx.slots, 'footerCell', options)) ?? cellValue
                              : cellValue

                          return (
                            <td
                              rowspan={rowSpan}
                              colspan={colSpan + (colPrefix > 0 ? colPrefix-- : 0)}
                              style={{ ...Render.computeTableChildStyle(column, fixeder, 'tfoot'), ...props.tFooterTdStyle }}
                              { ...Render.computeTableChildAttrs(cellAttrs, 'tfoot') }
                              { ...Render.computeTableChildProps(cellProps, 'tfoot') }
                              class={'s-table-tfoot-td'}
                              col-index={column.colIndex}
                              col-offset={column.colOffset}
                              row-index={rowIndex}
                            >
                              <SEllipsis
                                visible={(helper.isBoolean(cellProps?.tooltip) ? cellProps?.tooltip : column.tooltip === true) ? undefined : false}
                                tooltip={(helper.isBoolean(cellProps?.tooltip) ? cellProps?.tooltip : column.tooltip === true) || (helper.isBoolean(cellProps?.ellipsis) ? cellProps?.ellipsis : column.ellipsis === true)}
                                ellipsis={(helper.isBoolean(cellProps?.tooltip) ? cellProps?.tooltip : column.tooltip === true) || (helper.isBoolean(cellProps?.ellipsis) ? cellProps?.ellipsis : column.ellipsis === true)}
                              >
                                { computeValue }
                              </SEllipsis>
                            </td>
                          )
                        }
                      })
                    }
                  </tr>
                )
              })
            }
          </tfoot>
        )
      }

      const RenderTablePaginater = () => {
        if (!Paginator.paginate.visible) {
          return
        }

        const style: any = {
          position: 'relative',
          zIndex: 1000,
          ...props.paginateStyle
        }

        const bottomFooter = Normalizer.sticky.value.bottomFooter
        const paginateFixed = Paginator.paginate.fixed ?? bottomFooter

        if (paginateFixed === true || helper.isFiniteNumber(paginateFixed)) {
          Object.assign(style, {
            position: 'sticky',
            bottom: /^\+?\d+\.?\d*$/.test(`${paginateFixed}`) ? `${paginateFixed}px` : 0,
            left: 0
          })
        }

        return (
          <STablePaginater
            { ...Paginator.paginate }
            size={ Normalizer.size.value === 'default' ? 'default' : 'small' }
            onPageSizeChange={Emiter.pageSizeChange}
            onPageChange={Emiter.pageChange}
            style={style}
          />
        )
      }

      const RenderTableScrollbar = () => {
        if (Normalizer.sticky.value.bottomScrollbar !== true) {
          return
        }
        return <STableScrollbar { ...Computer.scrollbar.value }/>
      }

      const RenderTableCursor = () => {
        if (!Optionser.cursor.visible) {
          return <></>
        }

        return (
          <STableCursor
            top={Optionser.cursor.top}
            left={Optionser.cursor.left}
            width={Optionser.cursor.width}
            height={Optionser.cursor.height}
          />
        )
      }

      const RenderTableDragger = () => {
        if (!Optionser.dragger.visible) {
          return <></>
        }

        return (
          <STableDragger
            top={Optionser.dragger.top}
            left={Optionser.dragger.left}
            value={Optionser.dragger.value}
            allow={Optionser.dragger.allow}
            rowIndex={Optionser.dragger.rowIndex}
            colIndex={Optionser.dragger.colIndex}
            container={Optionser.refTableWrapper.value}
          />
        )
      }

      const WrapperMousedown = (event: MouseEvent) => {
        if (!(event.target instanceof HTMLElement)) {
          return
        }

        if (!Optionser.resizer.activate && event.target.classList.contains('s-table-thead-functional-resizable')) {
          const point = event.clientX
          const $target = event.target
          const $wrapper = Optionser.refTableWrapper.value!
          const $theader = $target.closest('.s-table-thead-th')!
          const rowIndex = +$theader.getAttribute('row-index')!
          const colIndex = +$theader.getAttribute('col-index')!
          const dataColumns = [...Computer.filterDataColumns.value]
          const listColumns = [...Computer.filterListColumns.value]
          const findColumn = rowIndex >= 0 && colIndex >= 0 && Methoder.findListColumns(listColumns, rowIndex, colIndex)

          if (findColumn) {
            for (let index = dataColumns.length - 1; index >= 0; index--) {
              const rowSpan = dataColumns[index].rowSpan
              const colSpan = dataColumns[index].colSpan
              const colOffset = dataColumns[index].colOffset
              const leftOutBound = colOffset < findColumn.colOffset
              const rightOutBound = colOffset + colSpan > findColumn.colOffset + findColumn.colSpan
              const cellResizable = dataColumns.filter((_, num) => num >= index && num < index + colSpan).some(col => col.resizable)

              if (rowSpan > 0 && colSpan > 0 && !leftOutBound && !rightOutBound && cellResizable) {
                let num = 0

                while (num < colSpan) {
                  const column = dataColumns[index + num]
                  const $theader = $wrapper.querySelector(`.s-nested-table > colgroup > col[col-index="${column.colIndex}"]`)!
                  const $recter = $theader.getBoundingClientRect()

                  if (column.resizable) {
                    Optionser.resizer.queues.push({
                      width: $recter.width,
                      minWidth: helper.isFiniteNumber(column.minWidth) && column.minWidth > 0 ? column.minWidth : 0,
                      maxWidth: helper.isFiniteNumber(column.maxWidth) && column.maxWidth > 0 ? column.maxWidth : Number.MAX_SAFE_INTEGER,
                      column: column
                    })
                  }

                  num++
                }

                Optionser.resizer.point = point
                Optionser.resizer.activate = true
                document.body.classList.add('user-select-none')
                document.body.classList.add('cursor-column-resizable')
                break
              }
            }
          }

          event.preventDefault()
          event.stopPropagation()
          return
        }

        if (!Optionser.dragger.visible && event.target.classList.contains('s-table-thead-draggable-th')) {
          const colIndex = +(event.target.getAttribute('col-index') || 0)
          const rowIndex = +(event.target.getAttribute('row-index') || 0)
          const columner = Methoder.findListColumns(Computer.filterListColumns.value, rowIndex, colIndex)
          const bounding = Optionser.refTableWrapper.value!.getBoundingClientRect()

          if (columner) {
            const key = columner.key
            const top = Optionser.wrapperScrollTop.value + event.clientY - bounding.top
            const left = Optionser.wrapperScrollLeft.value + event.clientX - bounding.left
            const renderTitle = Methoder.getValue(columnCellRender.value[rowIndex][colIndex])

            Optionser.dragger.top = top
            Optionser.dragger.left = left
            Optionser.dragger.allow = true
            Optionser.dragger.value = helper.isPrimitive(renderTitle) ? `${renderTitle}` : key
            Optionser.dragger.element = event.target
            Optionser.dragger.colIndex = colIndex
            Optionser.dragger.rowIndex = rowIndex
            Optionser.dragger.activate = true
            Optionser.dragger.visible = false
            Optionser.cursor.visible = false
            Optionser.cursor.rowIndex = 0
            Optionser.cursor.colIndex = 0
            Optionser.cursor.height = 0
            Optionser.cursor.width = 0
            Optionser.cursor.left = 0
            Optionser.cursor.top = 0

            document.body.classList.add('user-select-none')
            document.body.classList.add('cursor-column-draggable')
          }

          return
        }
      }

      const WrapperTableClass = {
        's-border-table': Computer.hasBorder.value,
        's-header-table': Computer.hasHeader.value,
        's-bodyer-table': Computer.hasBodyer.value,
        's-footer-table': Computer.hasFooter.value
      }

      const WrapperTableStyle = {
        tableLayout: !['fixed', 'auto'].includes(props.tableLayout)
          ? dataColumns.value.length > 1 ? 'auto' : 'fixed'
          : props.tableLayout
      }

      const WrapperScollerStyle = {
        width: Computer.tableBodyWidth.value,
        maxHeight: Computer.tableBodyHeight.value,
        minWidth: Computer.tableBodyWidth.value !== 'auto' && !(['fit-content', 'max-content'].includes(Computer.tableBodyWidth.value)) ? '0px' : '100%',
        overflow: Computer.tableBodyOverflow.value ?? (Computer.tableBodyWidth.value !== '100%' || Computer.tableBodyHeight.value !== 'auto' ? 'auto' : 'visible')
      }

      return (
        <div
          ref={Optionser.refTableWrapper}
          class={'s-nested-table-wrapper'}
          style={WrapperScollerStyle} // @ts-ignore
          onScrollPassive={Eventer.updateWrapperContainer}
          onMousedown={WrapperMousedown}
        >
          <table
            ref={Optionser.refTableNoder}
            class={['s-nested-table', WrapperTableClass]}
            style={WrapperTableStyle}
          >
            { RenderColGroup() }
            { RenderTableThead() }
            { RenderTableTBody() }
            { RenderTableTFoot() }
          </table>

          { RenderTablePaginater() }
          { RenderTableScrollbar() }
          { RenderTableDragger() }
          { RenderTableCursor() }
        </div>
      )
    }

    const RenderTableContianer = (ctx: typeof context) => {
      const RenderTableSettings = (_: typeof context) => {
        if (!props.columnPresetSettings) {
          return <></>
        }

        const currentAllKeys = Methoder.getValue(columnSettingsAllKeys)
        const recordedAllKeys = ref(currentAllKeys.filter(key => listColumns.value.flat().some(column => column?.key === key && (column.settings.checkbox || !column.settings.disabled))))
        const expandedAllKeys = ref(currentAllKeys.filter(() => true))

        const style: any = {}
        const multiline = listColumns.value.length > 1
        const draggable = props.columnPresetDraggable === true
        const overflow = Computer.tableBodyOverflow.value ?? (Computer.tableBodyWidth.value !== '100%' || Computer.tableBodyHeight.value !== 'auto' ? 'auto' : 'visible')
        const topHeader = Normalizer.sticky.value.topHeader
        const isFixedTop = Computer.isFixedTop.value

        if (overflow !== 'auto' && overflow !== 'hidden') {
          if (isFixedTop || topHeader === true || helper.isFiniteNumber(topHeader)) {
            Object.assign(style, {
              position: 'sticky',
              top: /^\+?\d+\.?\d*$/.test(`${topHeader}`) ? `${topHeader}px` : 0
            })
          }
        }

        const dropHandler = (options: any) => {
          const appendNodes = options.appendNodes as any[]
          const reloadNodes = options.reloadNodes as any[]
          const removeNodes = options.removeNodes as any[]

          if (appendNodes?.length > 0 || removeNodes?.length > 0) {
            return false
          }

          if (reloadNodes?.length !== 1 || reloadNodes[0].oldChildNodes?.length !== reloadNodes[0].newChildNodes?.length) {
            return false
          }

          const parentNode = reloadNodes[0].parentNode
          const parentRowIndex = parentNode?.column.rowIndex
          const parentColIndex = parentNode?.column.colIndex
          const newChildrenNodes = reloadNodes[0].newChildNodes || []

          const newTreeColumns = Methoder.recloneColumns(treeColumns.value)
          const newParentNode = parentNode ? Methoder.findTreeColumns(newTreeColumns, parentRowIndex, parentColIndex) : null
          const refChildNodes = newParentNode ? newParentNode.treeChildren : newTreeColumns
          const temChildNodes = [...refChildNodes]

          for (const [index, node] of newChildrenNodes.entries()) {
            refChildNodes[index] = temChildNodes.find(col => {
              return (
                col.referColumn.rowIndex === node.column.rowIndex &&
                  col.referColumn.colIndex === node.column.colIndex
              )
            })!
          }

          Methoder.updatePropColumns(newTreeColumns)

          return false
        }

        return (
          <STableSettings
            v-models={[[recordedAllKeys.value, 'allTreeKeys'], [columnSettingsCheckKeys.value, 'checkedKeys'], [expandedAllKeys.value, 'expandedKeys']]}
            treeData={columnSettingsAllTrees.value}
            dropHandler={dropHandler}
            multiline={multiline}
            draggable={draggable}
            style={style}
          />
        )
      }

      const RenderTableLoadinger = (_: typeof context) => {
        if (props.loadinger !== true || loading.value !== true) {
          return
        }

        return <STableLoading optionser={Optionser} />
      }

      const refTableContainerStyle = {
        width: ['fit-content', 'max-content'].includes(Computer.tableBodyWidth.value) && Computer.tableBodyOverflow.value === 'visible' ? 'fit-content' : '100%',
        minWidth: ['fit-content', 'max-content'].includes(Computer.tableBodyWidth.value) && Computer.tableBodyOverflow.value === 'visible' ? '100%' : '0'
      }

      return (
        <section
          ref={Optionser.refTableContainer}
          style={refTableContainerStyle}
          class={['s-table-container', `s-${Normalizer.size.value}-table-container`]}
        >
          <div class={['s-table-spining-container', { spining: loading }]}>
            { RenderTableSettings(ctx) }
            { RenderTableScroller(ctx) }
            { RenderTableLoadinger(ctx) }
          </div>
        </section>
      )
    }

    return () => RenderTableContianer(context)
  },
  slots: {} as STableeDefineSlots<STableRecordType>,
  methods: {} as STableDefineMethods
})

export const tableCustomHeaderRowAttrsDefiner = (customHeaderRowAttrs: STableCustomHeaderRowAttrs) => customHeaderRowAttrs
export const tableCustomBodyerRowAttrsDefiner = (customBodyerRowAttrs: STableCustomBodyerRowAttrs) => customBodyerRowAttrs
export const tableCustomFooterRowAttrsDefiner = (customFooterRowAttrs: STableCustomFooterRowAttrs) => customFooterRowAttrs
export const tableCustomBodyerRowStatesDefiner = (customBodyerRowStates: STableCustomBodyerRowStates) => customBodyerRowStates
export const tableCustomHeaderCellRenderDefiner = (customHeaderCellRender: STableHeaderCellRender) => customHeaderCellRender
export const tableCustomBodyerCellRenderDefiner = (customBodyerCellRender: STableBodyerCellRender) => customBodyerCellRender
export const tableCustomFooterCellRenderDefiner = (customFooterCellRender: STableFooterCellRender) => customFooterCellRender

export const tableEmitPageSizeChangeDefiner = (func: (pageNo: number, pageSize: number) => void) => func
export const tableEmitPageChangeDefiner = (func: (pageNo: number, pageSize: number) => void) => func
export const tableEmitExpandDefiner = (func: (keys: Array<STableKey>, nodes: Array<STableRecordType | null>) => void) => func
export const tableEmitSelectDefiner = (func: (keys: Array<STableKey>, nodes: Array<STableRecordType | null>) => void) => func
export const tableEmitSorterDefiner = (func: (values: Array<STableSorterType>) => void) => func

export const tableSourcesDefiner = <T extends Record<string, any> = Record<string, any>> (sources: T[]) => ref(sources)
export const tableSummarysDefiner = <T extends Record<string, any> = Record<string, any>> (summarys: T[]) => ref(summarys)
export const tableLoadDataDefiner = <T extends Record<string, any> = Record<string, any>>(loadData: STableLoadSource<T>) => loadData
export const tableColumnsDefiner = (columns: STablePartColumnType[]) => ref(columns)
export const tablePaginateDefiner = (paginate: STablePartPaginate) => ref(paginate)
export const tableStickyDefiner = (sticky: STablePartStickyType) => ref(sticky)
export const tableScrollDefiner = (scroll: STablePartScrollType) => ref(scroll)

export default STable
export * from './res'
