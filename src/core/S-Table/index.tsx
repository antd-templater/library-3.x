import { Fragment, VNode, HTMLAttributes, SlotsType, DeepReadonly, ComputedRef, UnwrapRef, Ref, isVNode, nextTick, renderSlot, defineComponent, onMounted, computed, reactive, ref, inject, watch, readonly, toRaw, unref } from 'vue'
import { defaultConfigProvider } from 'ant-design-vue/es/config-provider'
import * as VueTypes from 'vue-types'
import helper from '@/helper'

import './index.less'

export interface STableStickyType {
  topHeader: boolean | number;
  leftBodyer: number;
  rightBodyer: number;
  bottomFooter: boolean | number;
  rightScrollbar: boolean | number;
  bottomScrollbar: boolean | number;
}

export interface STableScrollType {
  x: number | string | false;
  y: number | 'auto' | false;
  scrollToFirstXOnChange: boolean;
  scrollToFirstYOnChange: boolean;
  getScrollResizeContainer?: () => HTMLElement;
}

export interface STableSorterType {
  field: string | string[];
  value: 'ascend'| 'descend';
}

export interface STableRecordType {
  [field: string]: any;
}

export interface STablePaginateType {
  hideOnSinglePage: boolean;
  defaultPageSize: number;
  pageSizeOptions: Array<string | number>;
  showSizeChanger?: boolean;
  showQuickJumper: boolean;
  showLessItems: boolean;
  loadPageSize?: number;
  loadPageNo?: number;
  totalSize: number;
  totalPage: number;
  pageSize: number;
  pageNo: number;
  visible: boolean;
  simple: boolean;
  mode: 'local' | 'remote';
  size: 'default' | 'small';
  showTotal?:	(total: number, range: [number, number]) => void;
}

export interface STableRowKey<RecordType = STableRecordType> {
  (record: DeepReadonly<RecordType>): string
}

export interface STableTreeKey<RecordType = STableRecordType> {
  (record: DeepReadonly<RecordType>): string
}

export interface STableLoadSource<RecordType = STableRecordType> {
  (
    options: {
      action: 'sorter' | 'paginate';
      sorter: Array<{ field: string | string[]; value: 'ascend'| 'descend'; }>;
      paginate: { pageSize: number; pageNo: number; mode: 'local' | 'remote'; };
    }
  ): Array<RecordType> | {
    data: Array<RecordType>;
    page: number;
    total: number;
  };
}

export interface STableSettingsType<RecordType = STableRecordType> {
  key: string;
  title: string;
  column: STableColumnType<RecordType>;
  children?: STableSettingsType[];
}

export interface STableExpanderRender<RecordType = STableRecordType> {
  (option: { record: DeepReadonly<RecordType>; rowIndex: number; groupIndex: number; groupLevel: number; groupIndexs: number[]; globalIndex: number; expanded: boolean; }): VNode;
}

export interface STableHeaderCellRender<RecordType = STableRecordType> {
  (option: { title: string | number; column: DeepReadonly<STableColumnType<RecordType>>; rowIndex: number; colIndex: number; }): VNode | STableRefWrapper<{
    attrs?: HTMLAttributes;
    props?: {
      align?: 'left' | 'center' | 'right';
      fixed?: 'left' | 'right' | false;
      width?: number;
      minWidth?: number;
      maxWidth?: number;
      ellipsis?: boolean;
      colSpan?: number;
      rowSpan?: number;
      sorter?: boolean;
    };
    children?: any;
  }>;
}

export interface STableBodyerCellRender<RecordType = STableRecordType> {
  (option: { value: any; record: DeepReadonly<RecordType>; rowIndex: number; groupIndex: number; groupLevel: number; groupIndexs: number[]; globalIndex: number; column: DeepReadonly<STableColumnType<RecordType>>; colIndex: number; }): VNode | STableRefWrapper<{
    attrs?: HTMLAttributes;
    props?: {
      align?: 'left' | 'center' | 'right';
      ellipsis?: boolean;
      colSpan?: number;
      rowSpan?: number;
    };
    children?: any;
  }>;
}

export interface STableFooterCellRender<RecordType = STableRecordType> {
  (option: { value: any; record: DeepReadonly<RecordType>; rowIndex: number; column: DeepReadonly<STableColumnType<RecordType>>; colIndex: number; sources: DeepReadonly<RecordType[]>; paginate: DeepReadonly<STablePaginateType>; }): VNode | STableRefWrapper<{
    attrs?: HTMLAttributes;
    props?: {
      align?: 'left' | 'center' | 'right';
      ellipsis?: boolean;
      colSpan?: number;
      rowSpan?: number;
    };
    children?: any;
  }>;
}

export interface STableCustomHeaderRowAttrs<RecordType = STableRecordType> {
  (options: { columns: DeepReadonly<STableColumnType<RecordType>[]>; rowIndex: number; }): STableRefWrapper<HTMLAttributes>;
}

export interface STableCustomBodyerRowAttrs<RecordType = STableRecordType> {
  (options: { record: DeepReadonly<RecordType>; rowIndex: number; groupIndex: number; groupLevel: number; groupIndexs: number[]; globalIndex: number; }): STableRefWrapper<HTMLAttributes>;
}

export interface STableCustomBodyerRowStates<RecordType = STableRecordType> {
  (options: { record: DeepReadonly<RecordType>; rowIndex: number; groupIndex: number; groupLevel: number; groupIndexs: number[]; globalIndex: number; }): STableRefWrapper<{
    draggable?: boolean;
    selectable?: boolean;
    expandable?: boolean;
  }>;
}

export interface STableCustomFooterRowAttrs<RecordType = STableRecordType> {
  (options: { record: DeepReadonly<RecordType>; rowIndex: number; sources: DeepReadonly<RecordType[]>; paginate: DeepReadonly<STablePaginateType>; }): STableRefWrapper<HTMLAttributes>;
}

export interface STableWrapRecordType<RecordType = STableRecordType> {
  key: STableKey;
  childKeys: STableKey[];
  parentKeys: STableKey[];
  referRecord: RecordType;
  treeChildren: STableWrapRecordType<RecordType>[];
  rowGroupLevel: number;
  rowGroupIndex: number;
  rowGroupIndexs: number[];
  rowGlobalIndex: number;
  rowTreeKeyField: string;
  rowKeyField: string;
  rowHeight: number;
}

export interface STableWrapColumnType<RecordType = STableRecordType> {
  key: string;
  childKeys: string[];
  parentKeys: string[];
  referColumn: STableColumnType<RecordType>;
  cacheColumn: STablePartColumnType<RecordType>;
  treeChildren: STableWrapColumnType<RecordType>[];
  rowGroupLevel: number;
  rowGroupIndex: number;
  rowGroupIndexs: number[];
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
  resizable?: boolean;
  ellipsis?: boolean;
  colSpan?: number;
  rowSpan?: number;
  sorter?: boolean;
  sorterField?: string | string[];
  sortDirections?: STableSortDirections;
  defaultSorterValue?: 'ascend'| 'descend';
  sorterValueChange?: (option: { value: 'ascend'| 'descend' | ''; values: Array<STableSorterType>; }) => void;
  customHeaderCellAttrs?: (option: { column: DeepReadonly<STableColumnType<RecordType>>; rowIndex: number; colIndex: number; }) => STableRefWrapper<HTMLAttributes>;
  customBodyerCellAttrs?: (option: { value: any; record: DeepReadonly<RecordType>, rowIndex: number; groupIndex: number; groupLevel: number; groupIndexs: number[]; globalIndex: number; column: DeepReadonly<STableColumnType<RecordType>>; colIndex: number; }) => STableRefWrapper<HTMLAttributes>;
  customFooterCellAttrs?: (option: { value: any; record: DeepReadonly<RecordType>; rowIndex: number; column: DeepReadonly<STableColumnType<RecordType>>; colIndex: number; sources: DeepReadonly<RecordType[]>; paginate: DeepReadonly<STablePaginateType>; }) => STableRefWrapper<HTMLAttributes>;
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
  resizable: boolean;
  ellipsis: boolean;
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
  sorterField: string | string[];
  sortDirections?: STableSortDirections;
  defaultSorterValue: 'ascend'| 'descend' | '';
  currentSorterValue: 'ascend'| 'descend' | '';
  activedSorterValues: Array<STableSorterType>;
  sorterValueChange?: (option: { value: 'ascend'| 'descend' | ''; values: Array<STableSorterType>; }) => void;
  customHeaderCellAttrs?: (option: { column: DeepReadonly<STableColumnType<RecordType>>; rowIndex: number; colIndex: number; }) => STableRefWrapper<HTMLAttributes>;
  customBodyerCellAttrs?: (option: { value: any; record: DeepReadonly<RecordType>, rowIndex: number; groupIndex: number; groupLevel: number; groupIndexs: number[]; globalIndex: number; column: DeepReadonly<STableColumnType<RecordType>>; colIndex: number; }) => STableRefWrapper<HTMLAttributes>;
  customFooterCellAttrs?: (option: { value: any; record: DeepReadonly<RecordType>; rowIndex: number; column: DeepReadonly<STableColumnType<RecordType>>; colIndex: number; sources: DeepReadonly<RecordType[]>; paginate: DeepReadonly<STablePaginateType>; }) => STableRefWrapper<HTMLAttributes>;
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
  selectRowKeys(keys: STableKey[]): void;
  expandRowKeys(keys: STableKey[]): void;
  forceUpdate: () => void;
}

export type STableKey = string | number
export type STableSize = 'default' | 'middle' | 'small'
export type STableSortDirections = ['ascend'] | ['descend'] | ['ascend', 'descend']
export type STablePartStickyType = Partial<STableStickyType>
export type STablePartScrollType = Partial<STableScrollType>
export type STablePartPaginate = Partial<STablePaginateType>
export type STableRefWrapper<T> = ComputedRef<T> | Ref<T> | T

export const STable = defineComponent({
  name: 'STable',
  props: {
    size: VueTypes.string<STableSize>().def(undefined),
    layout: VueTypes.string<'auto' | 'fixed'>().def('auto'),
    rowKey: VueTypes.any<string | STableRowKey>().def('key'),
    treeKey: VueTypes.any<string | STableTreeKey>().def('children'),
    sticky: VueTypes.object<STablePartStickyType>().def(() => ({})),
    scroll: VueTypes.object<STablePartScrollType>().def(() => ({})),
    columns: VueTypes.array<STablePartColumnType>().def(() => ([])),
    sources: VueTypes.array<STableRecordType>().def(() => ([])),
    summarys: VueTypes.array<STableRecordType>().def(() => ([])),
    paginate: VueTypes.any<STablePartPaginate>().def(() => ({})),
    loadData: VueTypes.func<STableLoadSource>().def(undefined),
    headerCell: VueTypes.func<STableHeaderCellRender>().def(undefined),
    bodyerCell: VueTypes.func<STableBodyerCellRender>().def(undefined),
    footerCell: VueTypes.func<STableFooterCellRender>().def(undefined),
    customHeaderRowAttrs: VueTypes.func<STableCustomHeaderRowAttrs>().def(undefined),
    customBodyerRowAttrs: VueTypes.func<STableCustomBodyerRowAttrs>().def(undefined),
    customFooterRowAttrs: VueTypes.func<STableCustomFooterRowAttrs>().def(undefined),
    customBodyerRowStates: VueTypes.func<STableCustomBodyerRowStates>().def(undefined),
    selectedRowMode: VueTypes.string<'Radio' | 'Checkbox'>().def('Checkbox'),
    selectedRowKeys: VueTypes.array<STableKey>().def(() => []),
    expandedRowKeys: VueTypes.array<STableKey>().def(() => []),
    preserveSelectedRowKeys: VueTypes.bool().def(false),
    preserveExpandedRowKeys: VueTypes.bool().def(false),
    defaultSelectAllRows: VueTypes.bool().def(false),
    defaultExpandAllRows: VueTypes.bool().def(false),
    columnPresetResizable: VueTypes.bool().def(false),
    columnSorterMultiple: VueTypes.bool().def(false),
    rowSelectedStrictly: VueTypes.bool().def(true),
    rowExpandedByClick: VueTypes.bool().def(false),
    selectIndentSize: VueTypes.number().def(15),
    expandIndentSize: VueTypes.number().def(15),
    loadOnScroll: VueTypes.bool().def(false),
    showHeader: VueTypes.bool().def(true),
    showFooter: VueTypes.bool().def(true),
    loading: VueTypes.bool().def(false),
    virtual: VueTypes.bool().def(true),
    border: VueTypes.bool().def(false)
  },
  emits: {
    'update:loading': (loading: boolean) => true,
    'update:columns': (columns: STablePartColumnType[]) => true,
    'update:selectedRowKeys': (keys: Array<STableKey>) => true,
    'update:expandedRowKeys': (keys: Array<STableKey>) => true,
    'update:paginate': (paginate: STablePaginateType) => true,
    'update:summarys': (summarys: STableRecordType[]) => true,
    'update:sources': (sources: STableRecordType[]) => true,
    'sorter': (options: Array<STableSorterType>) => true,
    'expand': (keys: Array<STableKey>) => true,
    'select': (keys: Array<STableKey>) => true,
    'paginate': (pages: STablePaginateType) => true
  },
  setup(props, context) {
    const watchDeepOptions = { immediate: true, deep: true }
    const renderRowPresets = reactive({ minBuffer: 5, maxBuffer: 10, minHeight: 32 })
    const renderRowRanger = reactive({ renderOffset: [0, ~~(window.innerHeight / renderRowPresets.minHeight)], renderBuffer: [0, 10] })
    const configProvider = inject('configProvider', defaultConfigProvider)

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
    const sourceRowStates: Ref<STableRefWrapper<ReturnType<STableCustomBodyerRowStates>>[]> = ref([])
    const sourceCellProps: Ref<Record<string, STableRefWrapper<UnwrapRef<Exclude<ReturnType<STableBodyerCellRender>, VNode>>['props']>>[]> = ref([])
    const sourceCellAttrs: Ref<Record<string, STableRefWrapper<HTMLAttributes>>[]> = ref([])
    const sourceCellRender: Ref<Array<Record<string, any>>> = ref([])

    const listSummary: Ref<STableRecordType[]> = ref([])
    const summaryRowAttrs: Ref<STableRefWrapper<HTMLAttributes>[]> = ref([])
    const summaryCellProps: Ref<Record<string, STableRefWrapper<UnwrapRef<Exclude<ReturnType<STableFooterCellRender>, VNode>>['props']>>[]> = ref([])
    const summaryCellAttrs: Ref<Record<string, STableRefWrapper<HTMLAttributes>>[]> = ref([])
    const summaryCellRender: Ref<Array<Record<string, any>>> = ref([])

    const selectedRowKeys: Ref<Array<STableKey>> = ref(props.selectedRowKeys)
    const expandedRowKeys: Ref<Array<STableKey>> = ref(props.expandedRowKeys)
    const sourceRowKeys: Ref<Array<STableKey>> = ref([])
    const loading: Ref<boolean> = ref(props.loading)

    const Optionser = {
      // column - scrollable
      srcollTop: ref(0),
      scrollLeft: ref(0),
      srcollRight: ref(0),
      srcollBottom: ref(0),
      refTableWrapper: ref(null) as Ref<HTMLElement | null>,
      windowInnerWidth: ref(window.innerWidth),
      windowInnerHeight: ref(window.innerHeight),
      scrollResizeWidth: ref(0),
      scrollResizeHeight: ref(0),
      tableTheadSizes: ref([]) as Ref<Array<{
        colOffset: number;
        rowOffset: number;
        colIndex: number;
        rowIndex: number;
        colSpan: number;
        rowSpan: number;
        height: number;
        width: number;
      }>>,

      // column - resizable
      resizeRcordX: 0,
      resizeRcordWidth: 0,
      resizeRcordColumn: null as STableColumnType | null | undefined

      // column - draggable
    }

    const Paginator = {
      paginate: reactive({
        showTotal: helper.isFunction(props.paginate.showTotal) ? props.paginate.showTotal : undefined,
        hideOnSinglePage: helper.isBoolean(props.paginate.hideOnSinglePage) ? props.paginate.hideOnSinglePage : true,
        defaultPageSize: helper.isFiniteNumber(props.paginate.defaultPageSize) && props.paginate.defaultPageSize > 0 ? ~~props.paginate.defaultPageSize : 20,
        pageSizeOptions: helper.isNotEmptyArray(props.paginate.pageSizeOptions) ? props.paginate.pageSizeOptions : [10, 15, 20, 25, 30, 50, 100, 200, 300, 500],
        showSizeChanger: helper.isBoolean(props.paginate.showSizeChanger) ? props.paginate.showSizeChanger : undefined,
        showQuickJumper: helper.isBoolean(props.paginate.showQuickJumper) ? props.paginate.showQuickJumper : false,
        showLessItems: helper.isBoolean(props.paginate.showLessItems) ? props.paginate.showLessItems : false,
        loadPageSize: helper.isFiniteNumber(props.paginate.loadPageSize) && props.paginate.loadPageSize > 0 ? ~~props.paginate.loadPageSize : undefined,
        loadPageNo: helper.isFiniteNumber(props.paginate.loadPageNo) && props.paginate.loadPageNo > 0 ? ~~props.paginate.loadPageNo : undefined,
        totalSize: helper.isFiniteNumber(props.paginate.totalSize) && props.paginate.totalSize > 0 ? ~~props.paginate.totalSize : 0,
        totalPage: helper.isFiniteNumber(props.paginate.totalPage) && props.paginate.totalPage > 0 ? ~~props.paginate.totalPage : 0,
        pageSize: helper.isFiniteNumber(props.paginate.pageSize) && props.paginate.pageSize > 0 ? ~~props.paginate.pageSize : (helper.isFiniteNumber(props.paginate.defaultPageSize) && props.paginate.defaultPageSize > 0 ? ~~props.paginate.defaultPageSize : 20),
        pageNo: helper.isFiniteNumber(props.paginate.pageNo) && props.paginate.pageNo > 0 ? ~~props.paginate.pageNo : 1,
        simple: helper.isBoolean(props.paginate.simple) ? props.paginate.simple : false,
        visible: helper.isBoolean(props.paginate.visible) ? props.paginate.visible : false,
        size: props.paginate.size && ['small', 'default'].includes(props.paginate.size) ? props.paginate.size : ((props.size || (configProvider.componentSize === 'large' ? 'default' : configProvider.componentSize)) === 'small' ? 'small' : 'default'),
        mode: (props.paginate.mode === 'local' ? 'local' : 'remote') as 'local' | 'remote'
      }),
      update: (paginate: STablePartPaginate) => {
        Paginator.paginate.mode = !Methoder.isOwnProperty(paginate, ['mode']) ? Paginator.paginate.mode : paginate.mode === 'local' ? 'local' : 'remote'
        Paginator.paginate.size = !Methoder.isOwnProperty(paginate, ['size']) ? Paginator.paginate.size : paginate.size === 'small' ? 'small' : 'default'
        Paginator.paginate.simple = !Methoder.isOwnProperty(paginate, ['simple']) ? Paginator.paginate.simple : paginate.simple === true
        Paginator.paginate.visible = !Methoder.isOwnProperty(paginate, ['visible']) ? Paginator.paginate.visible : paginate.visible === true
        Paginator.paginate.showTotal = !Methoder.isOwnProperty(paginate, ['showTotal']) ? Paginator.paginate.showTotal : helper.isFunction(paginate.showTotal) ? paginate.showTotal : undefined
        Paginator.paginate.showLessItems = !Methoder.isOwnProperty(paginate, ['showLessItems']) ? Paginator.paginate.showLessItems : paginate.showLessItems === true
        Paginator.paginate.defaultPageSize = !Methoder.isOwnProperty(paginate, ['defaultPageSize']) ? Paginator.paginate.defaultPageSize : helper.isFiniteNumber(paginate.defaultPageSize) && paginate.defaultPageSize > 0 ? paginate.defaultPageSize : 20
        Paginator.paginate.pageSizeOptions = !Methoder.isOwnProperty(paginate, ['pageSizeOptions']) ? Paginator.paginate.pageSizeOptions : helper.isNotEmptyArray(paginate.pageSizeOptions) ? paginate.pageSizeOptions : [10, 15, 20, 25, 30, 50, 100, 200, 300, 500]
        Paginator.paginate.showSizeChanger = !Methoder.isOwnProperty(paginate, ['showSizeChanger']) ? Paginator.paginate.showSizeChanger : helper.isBoolean(paginate.showSizeChanger) ? paginate.showSizeChanger : undefined
        Paginator.paginate.showQuickJumper = !Methoder.isOwnProperty(paginate, ['showQuickJumper']) ? Paginator.paginate.showQuickJumper : paginate.showQuickJumper === true
        Paginator.paginate.hideOnSinglePage = !Methoder.isOwnProperty(paginate, ['hideOnSinglePage']) ? Paginator.paginate.hideOnSinglePage : paginate.hideOnSinglePage !== false
        Paginator.paginate.pageNo = !Methoder.isOwnProperty(paginate, ['pageNo']) ? Paginator.paginate.pageNo : helper.isFiniteNumber(paginate.pageNo) && paginate.pageNo > 0 ? ~~paginate.pageNo : 1
        Paginator.paginate.pageSize = !Methoder.isOwnProperty(paginate, ['pageSize']) ? Paginator.paginate.pageSize : helper.isFiniteNumber(paginate.pageSize) && paginate.pageSize > 0 ? ~~paginate.pageSize : 20
        Paginator.paginate.totalSize = !Methoder.isOwnProperty(paginate, ['totalSize']) ? Paginator.paginate.totalSize : helper.isFiniteNumber(paginate.totalSize) && paginate.totalSize > 0 ? ~~paginate.totalSize : 0
        Paginator.paginate.totalPage = !Methoder.isOwnProperty(paginate, ['totalPage']) ? (~~(Paginator.paginate.totalSize / Paginator.paginate.pageSize) + (Paginator.paginate.totalSize % Paginator.paginate.pageSize ? 1 : 0)) : helper.isFiniteNumber(paginate.totalPage) && paginate.totalPage > 0 ? ~~paginate.totalPage : 0
        Paginator.paginate.loadPageNo = !Methoder.isOwnProperty(paginate, ['loadPageNo']) ? Paginator.paginate.loadPageNo : helper.isFiniteNumber(paginate.loadPageNo) && paginate.loadPageNo > 0 ? ~~paginate.loadPageNo : undefined
        Paginator.paginate.loadPageSize = !Methoder.isOwnProperty(paginate, ['loadPageSize']) ? Paginator.paginate.loadPageSize : helper.isFiniteNumber(paginate.loadPageSize) && paginate.loadPageSize > 0 ? ~~paginate.loadPageSize : undefined
        Paginator.paginate.pageNo = Paginator.paginate.pageNo <= Paginator.paginate.totalPage ? Paginator.paginate.pageNo : Paginator.paginate.totalPage
        Paginator.paginate.pageNo = Paginator.paginate.pageNo > 0 ? Paginator.paginate.pageNo : 1
      }
    }

    const Normalizer = {
      size: computed(() => {
        return props.size || (configProvider.componentSize === 'large' ? 'default' : configProvider.componentSize)
      }),

      sticky: computed(() => ({
        topHeader: props.sticky.topHeader ?? false,
        leftBodyer: props.sticky.leftBodyer ?? 0,
        rightBodyer: props.sticky.rightBodyer ?? 0,
        bottomFooter: props.sticky.bottomFooter ?? false,
        rightScrollbar: props.sticky.rightScrollbar ?? true,
        bottomScrollbar: props.sticky.bottomScrollbar ?? true
      })),

      scroll: computed(() => ({
        x: props.scroll.x ?? false,
        y: props.scroll.y ?? false,
        scrollToFirstXOnChange: props.scroll.scrollToFirstXOnChange !== false,
        scrollToFirstYOnChange: props.scroll.scrollToFirstYOnChange !== false,
        getScrollResizeContainer: props.scroll.getScrollResizeContainer
      })),

      loadOnScroll: computed(() => (
        (props.loadOnScroll !== false && Paginator.paginate.mode === 'local') ||
        (props.loadOnScroll === true && Paginator.paginate.visible === false)
      ))
    }

    const Computer = {
      hasBorder: computed(() => {
        return props.border === true || dataColumns.value.length > 1
      }),
      hasHeader: computed(() => {
        return props.showHeader !== false && dataColumns.value.length > 0
      }),
      hasBodyer: computed(() => {
        return listSources.value.length > 0
      }),
      hasFooter: computed(() => {
        return props.showFooter !== false && listSummary.value.length > 0
      }),
      isFixedTop: computed(() => {
        return /^[+-]?\d+\.?\d*(px)?$/.test(`${Normalizer.scroll.value.y}`)
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
        const resizeWidth = Optionser.scrollResizeWidth.value
        const windowWidth = Optionser.windowInnerWidth.value

        if (/^0$|^-\d+\.?\d*(px)?$/.test(`${x}`)) {
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
        const resizeHeight = Optionser.scrollResizeHeight.value
        const windowHeight = Optionser.windowInnerHeight.value

        if (/^0$|^-\d+\.?\d*(px)?$/.test(`${y}`)) {
          return pageHide
            ? (resizeHeight || windowHeight) + parseInt(`${y}`) + 'px'
            : (resizeHeight || windowHeight) + parseInt(`${y}`) - pageHeight + 'px'
        }

        if (/^\d+\.?\d*(px)?$/.test(`${y}`)) {
          return !pageHide
            ? parseInt(`${y}`) + 'px'
            : parseInt(`${y}`) - pageHeight + 'px'
        }

        return 'auto'
      }),
      filterListColumns: computed(() => {
        const filterColumns = (columns: STableWrapColumnType[], wraps: STableWrapColumnType[] = [], parent?: STableWrapColumnType | null) => {
          let offset = parent ? parent.referColumn.colOffset : 0

          for (const [index, column] of columns.entries()) {
            if (!columnSettingsCheckKeys.value.includes(column.key)) {
              continue
            }

            const rowIndex = column.referColumn.rowIndex
            const colIndex = column.referColumn.colIndex
            const refProps = toRaw(unref(columnCellProps.value[rowIndex][colIndex]))

            const wrapColumn: STableWrapColumnType = {
              ...column,
              referColumn: reactive({
                ...column.referColumn,
                colOffset: offset + index,
                rowOffset: parent ? parent.referColumn.rowIndex + 1 : 0,
                colMaxSpan: 1,
                rowMaxSpan: parent ? parent.referColumn.rowMaxSpan + 1 : 1,
                align: helper.isNotEmptyObject(refProps) && Object.hasOwn(refProps, 'align') ? refProps.align ?? column.referColumn.align : column.referColumn.align,
                fixed: helper.isNotEmptyObject(refProps) && Object.hasOwn(refProps, 'fixed') ? refProps.fixed ?? column.referColumn.fixed : column.referColumn.fixed,
                width: helper.isNotEmptyObject(refProps) && Object.hasOwn(refProps, 'width') ? refProps.width ?? column.referColumn.width : column.referColumn.width,
                minWidth: helper.isNotEmptyObject(refProps) && Object.hasOwn(refProps, 'minWidth') ? refProps.minWidth ?? column.referColumn.minWidth : column.referColumn.minWidth,
                maxWidth: helper.isNotEmptyObject(refProps) && Object.hasOwn(refProps, 'maxWidth') ? refProps.maxWidth ?? column.referColumn.maxWidth : column.referColumn.maxWidth,
                ellipsis: helper.isNotEmptyObject(refProps) && Object.hasOwn(refProps, 'ellipsis') ? refProps.ellipsis ?? column.referColumn.ellipsis : column.referColumn.ellipsis,
                colSpan: helper.isNotEmptyObject(refProps) && Object.hasOwn(refProps, 'colSpan') ? refProps.colSpan ?? column.referColumn.colSpan : column.referColumn.colSpan,
                rowSpan: helper.isNotEmptyObject(refProps) && Object.hasOwn(refProps, 'rowSpan') ? refProps.rowSpan ?? column.referColumn.rowSpan : column.referColumn.rowSpan,
                sorter: helper.isNotEmptyObject(refProps) && Object.hasOwn(refProps, 'sorter') ? refProps.sorter ?? column.referColumn.sorter : column.referColumn.sorter
              }),
              treeChildren: []
            }

            wraps.push(wrapColumn)

            if (helper.isNotEmptyArray(column.treeChildren)) {
              const childTrees = filterColumns(column.treeChildren, [], wrapColumn)
              const rowMaxSpan = Math.max(...childTrees.map(child => child.referColumn.rowMaxSpan), wrapColumn.referColumn.rowMaxSpan)
              const colMaxSpan = childTrees.reduce((colMaxSpan, child) => colMaxSpan + child.referColumn.colMaxSpan, 0) || 1
              wrapColumn.referColumn.rowMaxSpan = rowMaxSpan
              wrapColumn.referColumn.colMaxSpan = colMaxSpan
              wrapColumn.treeChildren = childTrees
              offset += colMaxSpan - 1
            }
          }

          return wraps
        }

        const updateColumns = (columns: STableWrapColumnType[], arrays: STableColumnType[][] = [], isRoot: boolean = true) => {
          for (const wrap of columns) {
            const colOffset = wrap.referColumn.colOffset
            const rowOffset = wrap.referColumn.rowOffset

            arrays[rowOffset] = arrays[rowOffset] || []
            arrays[rowOffset][colOffset] = arrays[rowOffset][colOffset] || wrap.referColumn

            if (helper.isNotEmptyArray(wrap.treeChildren)) {
              updateColumns(wrap.treeChildren, arrays, false)
            }
          }

          if (isRoot === true) {
            for (const columns of arrays) {
              for (const column of columns) {
                if (column) {
                  column.colSpan = Number.isFinite(column.colSpan) ? column.colSpan : column.colMaxSpan
                  column.rowSpan = Number.isFinite(column.rowSpan) ? column.rowSpan : column.rowIndex < column.rowMaxSpan - 1 ? 1 : arrays.length - column.rowIndex
                }
              }
            }

            const rows = arrays.length as number
            const cols = Math.max(...arrays.map(arr => arr.length), 0) as number
            const arrs = Array.from({ length: rows }, () => Array.from({ length: cols }, () => 0)) as number[][]

            for (const [rowIndex, columns] of arrays.entries()) {
              for (const [colIndex, column] of columns.entries()) {
                if (column) {
                  column.colOffset = arrs[rowIndex].findIndex(index => index === 0)
                  column.rowOffset = arrs.map(arr => arr[colIndex]).findLastIndex(index => index === 1) + 1
                  column.colOffset = column.colOffset > -1 ? column.colOffset : arrs[rowIndex].length
                  column.rowOffset = column.rowOffset > -1 ? column.rowOffset : 0

                  for (let rowOffset = 0; rowOffset < column.rowSpan; rowOffset++) {
                    for (let colOffset = 0; colOffset < column.colSpan; colOffset++) {
                      arrs[rowIndex + rowOffset] = arrs[rowIndex + rowOffset] || []
                      arrs[rowIndex + rowOffset][colIndex + colOffset] = 1
                    }
                  }
                }
              }
            }
          }

          return arrays
        }

        return updateColumns(filterColumns(treeColumns.value))
      }),
      filterDataColumns: computed(() => {
        const dataColumns: STableColumnType[] = []

        for (const columns of Computer.filterListColumns.value) {
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
      }),
      filterPageSources: computed(() => {
        return listSources.value.filter(record => (
          Normalizer.loadOnScroll.value === true ||
          record.rowGroupIndex >= Paginator.paginate.pageSize * (Paginator.paginate.pageNo - 1) ||
          record.rowGroupIndex < Paginator.paginate.pageSize * Paginator.paginate.pageNo
        ))
      }),
      filterRangeSources: computed(() => {
        const filterSources: STableWrapRecordType[] = []
        const renderBufferOne = renderRowRanger.renderBuffer[0]
        const renderBufferTwo = renderRowRanger.renderBuffer[1]
        const renderOffsetOne = renderRowRanger.renderOffset[0]
        const renderOffsetTwo = renderRowRanger.renderOffset[1]
        const renderRangerOne = renderOffsetOne - renderBufferOne > 0 ? renderOffsetOne - renderBufferOne : 0
        const renderRangerTwo = renderOffsetTwo + renderBufferTwo < listSources.value.length ? renderOffsetTwo + renderBufferTwo : listSources.value.length

        const filterByExpaned = (record: STableWrapRecordType, index: number) => {
          return record.parentKeys.every(key => expandedRowKeys.value.includes(key))
        }

        const filterByRange = (record: STableWrapRecordType, index: number) => {
          return index >= renderRangerOne && index <= renderRangerTwo
        }

        for (const source of Computer.filterPageSources.value) {
          filterSources.push(source)
        }

        return filterSources.filter(filterByExpaned).filter(filterByRange)
      }),
      filterPageSummary: computed(() => {
        return listSummary.value.filter(summary => summary)
      })
    }

    const Methoder = {
      getValue(value: any) {
        return toRaw(unref(value))
      },

      getVNodes(node: any) {
        return helper.isNotEmptyObject(node) && node.type === Fragment
          ? helper.isNotEmptyArray(node.children) ? node : null
          : node
      },

      isVueNode(vnode: any) {
        return helper.isNotEmptyObject(vnode) && isVNode(vnode)
      },

      isOwnProperty(obj: any, keys: any[]) {
        for (const key of keys) {
          if (!helper.isNotEmptyArray(obj) && !helper.isNotEmptyObject(obj)) {
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

      restoreColumns(parts: STableWrapColumnType[]) {
        return parts.map<STablePartColumnType>(part => {
          const column: STablePartColumnType = {
            ...part.cacheColumn,

            children: helper.isNotEmptyArray(part.treeChildren)
              ? Methoder.restoreColumns(part.treeChildren)
              : !helper.isArray(part.cacheColumn.children)
                ? part.cacheColumn.children
                : []
          }

          return column
        })
      },

      restoreSources(parts: STableWrapRecordType[]) {
        return parts.map<STableRecordType>(part => {
          const record: STableRecordType = {
            ...part.referRecord,

            [part.rowTreeKeyField]: helper.isNotEmptyArray(part.treeChildren)
              ? Methoder.restoreSources(part.treeChildren)
              : !helper.isArray(part.referRecord[part.rowTreeKeyField])
                ? part.referRecord[part.rowTreeKeyField]
                : []
          }

          return record
        })
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
          const propColumn = toRaw(parts[index])
          const tempColumn = toRaw(temps[index])
          const cacheColumn = tempColumn.cacheColumn

          changed = !helper.toDeepEqual(propColumn, cacheColumn, {
            filter: [
              'key',
              'title',
              'dataIndex',
              'align',
              'fixed',
              'width',
              'minWidth',
              'maxWidth',
              'resizable',
              'ellipsis',
              'colSpan',
              'rowSpan',
              'sorter',
              'sorterField',
              'sortDirections',
              'defaultSorterValue',
              'sorterValueChange',
              'customHeaderCellAttrs',
              'customBodyerCellAttrs',
              'customHeaderCellRender',
              'customBodyerCellRender'
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
          let treeKey = 'children'
          let rowKey = 'key'

          const partRecord = toRaw(parts[index])
          const tempRecord = toRaw(temps[index])
          const referRecord = tempRecord.referRecord

          treeKey = helper.isFunction(props.treeKey) ? props.treeKey(partRecord) : treeKey
          treeKey = helper.isNotEmptyString(props.treeKey) ? props.treeKey : treeKey
          treeKey = helper.isNotEmptyString(treeKey) ? treeKey.trim() : 'children'

          rowKey = helper.isFunction(props.rowKey) ? props.rowKey(partRecord) : rowKey
          rowKey = helper.isNotEmptyString(props.rowKey) ? props.rowKey : rowKey
          rowKey = helper.isNotEmptyString(rowKey) ? rowKey.trim() : 'key'

          if (partRecord !== referRecord && partRecord[rowKey] !== referRecord[rowKey]) {
            return true
          }

          if (!helper.isArray(partRecord[treeKey])) {
            changed = (partRecord[treeKey] !== undefined && partRecord[treeKey] !== null) || !helper.isEmptyArray(tempRecord.treeChildren)
          }

          if (helper.isArray(partRecord[treeKey])) {
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

        for (const index of parts.keys()) {
          const partRecord = toRaw(parts[index])
          const tempRecord = toRaw(temps[index])

          if (parts === temps) {
            break
          }

          if (!helper.toDeepEqual(partRecord, tempRecord)) {
            return true
          }
        }

        return false
      },

      normalizeTreeColumns(columns: STablePartColumnType[], wraps: STableWrapColumnType[] = [], parent?: STableWrapColumnType | null) {
        let offset = parent ? parent.referColumn.colOffset : 0

        for (const [index, column] of columns.entries()) {
          const columnMinWidth = column.minWidth || 0
          const columnMaxWidth = column.maxWidth || Infinity
          const columnResizable = helper.isBoolean(column.resizable) ? column.resizable : parent?.referColumn.resizable ?? props.columnPresetResizable

          const wrapColumn: STableWrapColumnType = {
            key: column.key || (helper.isArray(column.dataIndex) ? column.dataIndex.join('.') : column.dataIndex),
            childKeys: [],
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
              resizable: (columnMinWidth < columnMaxWidth) && columnResizable === true,
              ellipsis: column.ellipsis ?? parent?.referColumn.ellipsis ?? false,
              colIndex: offset + index,
              rowIndex: parent ? parent.referColumn.rowIndex + 1 : 0,
              colOffset: offset + index,
              rowOffset: parent ? parent.referColumn.rowIndex + 1 : 0,
              colMaxSpan: 1,
              rowMaxSpan: parent ? parent.referColumn.rowMaxSpan + 1 : 1,
              colSpan: helper.isFiniteNumber(column.colSpan) ? column.colSpan : NaN,
              rowSpan: helper.isFiniteNumber(column.rowSpan) ? column.rowSpan : NaN,
              sorter: column.sorter ?? parent?.referColumn.sorter ?? false,
              sortered: false,
              sortDirections: column.sortDirections ?? parent?.referColumn.sortDirections,
              sorterField: column.sorterField ?? column.dataIndex,
              defaultSorterValue: column.defaultSorterValue || '',
              currentSorterValue: '',
              activedSorterValues: listSorters.value as Array<STableSorterType>,
              sorterValueChange: column.sorterValueChange ?? parent?.referColumn.sorterValueChange,
              customHeaderCellAttrs: column.customHeaderCellAttrs ?? parent?.referColumn.customHeaderCellAttrs,
              customBodyerCellAttrs: column.customBodyerCellAttrs ?? parent?.referColumn.customBodyerCellAttrs,
              customFooterCellAttrs: column.customFooterCellAttrs ?? parent?.referColumn.customFooterCellAttrs,
              customHeaderCellRender: column.customHeaderCellRender ?? parent?.referColumn.customHeaderCellRender,
              customBodyerCellRender: column.customBodyerCellRender ?? parent?.referColumn.customBodyerCellRender,
              customFooterCellRender: column.customFooterCellRender ?? parent?.referColumn.customFooterCellRender
            },
            cacheColumn: column,
            treeChildren: [],
            rowGroupLevel: parent ? parent.rowGroupLevel + 1 : 1,
            rowGroupIndex: parent ? parent.rowGroupIndex : index,
            rowGroupIndexs: parent ? [...parent.rowGroupIndexs, index] : [index]
          }

          wraps.push(wrapColumn)

          if (helper.isNotEmptyArray(column.children)) {
            const childTrees = Methoder.normalizeTreeColumns(column.children, [], wrapColumn)
            const rowMaxSpan = Math.max(...childTrees.map(child => child.referColumn.rowMaxSpan), wrapColumn.referColumn.rowMaxSpan)
            const colMaxSpan = childTrees.reduce((colMaxSpan, child) => colMaxSpan + child.referColumn.colMaxSpan, 0) || 1
            const childKeys = [...childTrees.map(tree => tree.key), ...childTrees.map(tree => tree.childKeys).flat()]
            const resizable = childTrees.some(child => child.referColumn.resizable)
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

      normalizeTreeSources(sources: STableRecordType[], wraps: STableWrapRecordType[] = [], parent?: STableWrapRecordType) {
        const TempCacher = {
          offset: -1
        }

        for (const [index, source] of sources.entries()) {
          let rowKey = 'key'
          let treeKey = 'children'

          TempCacher.offset = TempCacher.offset + 1

          rowKey = helper.isFunction(props.rowKey) ? props.rowKey(source) : rowKey
          rowKey = helper.isNotEmptyString(props.rowKey) ? props.rowKey : rowKey
          rowKey = helper.isNotEmptyString(rowKey) ? rowKey.trim() : 'key'

          treeKey = helper.isFunction(props.treeKey) ? props.treeKey(source) : treeKey
          treeKey = helper.isNotEmptyString(props.treeKey) ? props.treeKey : treeKey
          treeKey = helper.isNotEmptyString(treeKey) ? treeKey.trim() : 'children'

          const cacheRecord = treeSources.value.find(wrap => {
            const isSomeRowKeyField = wrap.rowKeyField === rowKey
            const isExistRowKeyValue = helper.isNotEmptyString(wrap.key) || helper.isFiniteNumber(wrap.key)
            return isSomeRowKeyField && isExistRowKeyValue ? wrap.key === source[rowKey] : toRaw(wrap.referRecord) === toRaw(source)
          })

          const wrapRecord: STableWrapRecordType = {
            key: source[rowKey],
            childKeys: [],
            parentKeys: parent ? [...parent.parentKeys, parent.key] : [],
            referRecord: source,
            treeChildren: [],
            rowGroupLevel: parent ? parent.rowGroupLevel + 1 : 1,
            rowGroupIndex: parent ? parent.rowGroupIndex : index,
            rowGroupIndexs: parent ? [...parent.rowGroupIndexs, index] : [index],
            rowGlobalIndex: TempCacher.offset,
            rowTreeKeyField: treeKey,
            rowKeyField: rowKey,
            rowHeight: cacheRecord ? cacheRecord.rowHeight : renderRowPresets.minHeight
          }

          wraps.push(wrapRecord)

          if (helper.isNotEmptyArray(source[wrapRecord.rowTreeKeyField])) {
            const childTrees = Methoder.normalizeTreeSources(source[wrapRecord.rowTreeKeyField], [], wrapRecord)
            const childKeys = [...childTrees.map(tree => tree.key), ...childTrees.map(tree => tree.childKeys).flat()]
            TempCacher.offset = wrapRecord.rowGlobalIndex + childKeys.length
            wrapRecord.treeChildren = childTrees
            wrapRecord.childKeys = childKeys
          }

          if (!sourceRowKeys.value.includes(wrapRecord.key)) {
            props.defaultSelectAllRows && !selectedRowKeys.value.includes(wrapRecord.key) && selectedRowKeys.value.push(wrapRecord.key)
            props.defaultExpandAllRows && !expandedRowKeys.value.includes(wrapRecord.key) && expandedRowKeys.value.push(wrapRecord.key)
            sourceRowKeys.value.push(wrapRecord.key)
          }
        }

        return wraps
      },

      normalizeTreeSettings(columns: STableWrapColumnType[], settings?: STableSettingsType[]) {
        settings = settings || columnSettingsAllTrees.value

        for (const wrap of columns) {
          const setting = {
            key: wrap.referColumn.key,
            title: wrap.referColumn.title,
            disabled: wrap.referColumn.fixed === 'left' || wrap.referColumn.fixed === 'right',
            column: wrap.referColumn,
            children: []
          }

          if (helper.isNotEmptyArray(wrap.treeChildren)) {
            Methoder.normalizeTreeSettings(wrap.treeChildren, setting.children)
          }

          if (!columnSettingsAllKeys.value.includes(wrap.referColumn.key)) {
            columnSettingsCheckKeys.value.push(wrap.referColumn.key)
            columnSettingsAllKeys.value.push(wrap.referColumn.key)
          }

          settings.push(setting)
        }

        return settings
      },

      normalizeListSources(sources: STableWrapRecordType[], arrays: STableWrapRecordType[] = []) {
        for (const wrap of sources) {
          arrays.push(wrap)

          if (helper.isNotEmptyArray(wrap.treeChildren)) {
            Methoder.normalizeListSources(wrap.treeChildren, arrays)
          }
        }

        return arrays
      },

      normalizeListColumns(columns: STableWrapColumnType[], arrays: STableColumnType[][]) {
        for (const wrap of columns) {
          const colOffset = wrap.referColumn.colOffset
          const rowOffset = wrap.referColumn.rowOffset

          arrays[rowOffset] = arrays[rowOffset] || []
          arrays[rowOffset][colOffset] = arrays[rowOffset][colOffset] || wrap.referColumn

          if (helper.isNotEmptyArray(wrap.treeChildren)) {
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
          if (helper.isFunction(props.customHeaderRowAttrs)) {
            columnRowAttrs.value[rowIndex] = columnRowAttrs.value[rowIndex] || props.customHeaderRowAttrs({ columns: readonly(columns), rowIndex })
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

          if (helper.isFunction(column.customHeaderCellAttrs)) {
            if (!Methoder.isOwnProperty(columnCellAttrs.value, [rowIndex, colIndex])) {
              columnCellAttrs.value[rowIndex] = columnCellAttrs.value[rowIndex] || []
              columnCellAttrs.value[rowIndex][colIndex] = column.customHeaderCellAttrs({ column: readonly(column), rowIndex, colIndex })
            }
          }

          if (helper.isFunction(column.customHeaderCellRender)) {
            let renderNode

            if (!Methoder.isOwnProperty(columnCellAttrs.value, [rowIndex, colIndex]) || !Methoder.isOwnProperty(columnCellRender.value, [rowIndex, colIndex])) {
              renderNode = column.customHeaderCellRender({ title: column.title, column: readonly(column), rowIndex, colIndex })
            }

            if (!Methoder.isOwnProperty(columnCellAttrs.value, [rowIndex, colIndex])) {
              if (helper.isObject(renderNode) && !isVNode(renderNode) && helper.isNotEmptyObject(renderNode.attrs)) {
                columnCellAttrs.value[rowIndex] = columnCellAttrs.value[rowIndex] || []
                columnCellAttrs.value[rowIndex][colIndex] = renderNode.attrs
              }
            }

            if (!Methoder.isOwnProperty(columnCellProps.value, [rowIndex, colIndex])) {
              columnCellProps.value[rowIndex] = helper.isArray(columnCellProps.value[rowIndex]) ? columnCellProps.value[rowIndex] : []
              columnCellRender.value[rowIndex] = helper.isArray(columnCellRender.value[rowIndex]) ? columnCellRender.value[rowIndex] : []
              columnCellRender.value[rowIndex][colIndex] = helper.isObject(renderNode) ? (isVNode(renderNode) ? renderNode : renderNode.children) : undefined
              columnCellProps.value[rowIndex][colIndex] = helper.isObject(renderNode) ? (!isVNode(renderNode) && renderNode.props || undefined) : undefined
            }
          }

          if (helper.isFunction(props.headerCell)) {
            let renderNode

            if (!Methoder.isOwnProperty(columnCellAttrs.value, [rowIndex, colIndex]) || !Methoder.isOwnProperty(columnCellRender.value, [rowIndex, colIndex])) {
              renderNode = props.headerCell({ title: column.title, column: readonly(column), rowIndex, colIndex })
            }

            if (!Methoder.isOwnProperty(columnCellAttrs.value, [rowIndex, colIndex])) {
              if (helper.isObject(renderNode) && !isVNode(renderNode) && helper.isNotEmptyObject(renderNode.attrs)) {
                columnCellAttrs.value[rowIndex] = columnCellAttrs.value[rowIndex] || []
                columnCellAttrs.value[rowIndex][colIndex] = renderNode.attrs
              }
            }

            if (!Methoder.isOwnProperty(columnCellProps.value, [rowIndex, colIndex])) {
              columnCellProps.value[rowIndex] = helper.isArray(columnCellProps.value[rowIndex]) ? columnCellProps.value[rowIndex] : []
              columnCellRender.value[rowIndex] = helper.isArray(columnCellRender.value[rowIndex]) ? columnCellRender.value[rowIndex] : []
              columnCellRender.value[rowIndex][colIndex] = helper.isObject(renderNode) ? (isVNode(renderNode) ? renderNode : renderNode.children) : undefined
              columnCellProps.value[rowIndex][colIndex] = helper.isObject(renderNode) ? (!isVNode(renderNode) && renderNode.props || undefined) : undefined
            }
          }

          if (columnCellAttrs.value[rowIndex]?.[colIndex] === undefined) {
            columnCellAttrs.value[rowIndex] = columnCellAttrs.value[rowIndex] || []
            columnCellAttrs.value[rowIndex][colIndex] = {}
          }

          if (columnCellRender.value[rowIndex]?.[colIndex] === undefined) {
            columnCellRender.value[rowIndex] = columnCellRender.value[rowIndex] || []
            columnCellRender.value[rowIndex][colIndex] = column.title
          }
        }

        return arrays
      },

      normalizeInitSources(sources: STableWrapRecordType[]) {
        for (const option of sources) {
          const record = readonly(option.referRecord)
          const rowIndex = option.rowGroupIndex
          const groupLevel = option.rowGroupLevel
          const groupIndex = option.rowGroupIndex
          const groupIndexs = option.rowGroupIndexs
          const globalIndex = option.rowGlobalIndex

          if (helper.isFunction(props.customBodyerRowAttrs)) {
            sourceRowAttrs.value[globalIndex] = sourceRowAttrs.value[globalIndex] || props.customBodyerRowAttrs({ record, rowIndex, groupIndex, groupLevel, groupIndexs, globalIndex })
          }

          if (helper.isFunction(props.customBodyerRowStates)) {
            sourceRowStates.value[globalIndex] = sourceRowStates.value[globalIndex] || props.customBodyerRowStates({ record, rowIndex, groupIndex, groupLevel, groupIndexs, globalIndex })
          }

          if (sourceRowAttrs.value[globalIndex] === undefined) {
            sourceRowAttrs.value[globalIndex] = {}
          }

          if (sourceRowStates.value[globalIndex] === undefined) {
            sourceRowStates.value[globalIndex] = {}
          }
        }

        for (const item of dataColumns.value) {
          const column = readonly(item)
          const columnKey = column.key
          const colIndex = column.colIndex
          const dataIndex = column.dataIndex

          for (const option of sources) {
            const record = readonly(option.referRecord)
            const rowIndex = option.rowGroupIndex
            const groupLevel = option.rowGroupLevel
            const groupIndex = option.rowGroupIndex
            const groupIndexs = option.rowGroupIndexs
            const globalIndex = option.rowGlobalIndex

            let value
            let index = 0

            value = helper.isArray(dataIndex) && helper.isObject(record) ? record[dataIndex[index++]] : value
            value = helper.isString(dataIndex) ? record[dataIndex] : value

            if (helper.isNotEmptyArray(dataIndex)) {
              while (index < dataIndex.length) {
                if (!helper.isArray(value) || !helper.isObject(value)) {
                  value = undefined
                  break
                }
                value = value[column.dataIndex[index++]]
              }
            }

            if (helper.isFunction(column.customBodyerCellAttrs)) {
              if (!Methoder.isOwnProperty(sourceCellAttrs.value, [globalIndex, columnKey])) {
                sourceCellAttrs.value[globalIndex] = sourceCellAttrs.value[globalIndex] || []
                sourceCellAttrs.value[globalIndex][columnKey] = column.customBodyerCellAttrs({ value, record, rowIndex, groupIndex, groupLevel, groupIndexs, globalIndex, column, colIndex })
              }
            }

            if (helper.isFunction(column.customBodyerCellRender)) {
              let renderNode

              if (!Methoder.isOwnProperty(sourceCellAttrs.value, [globalIndex, columnKey]) || !Methoder.isOwnProperty(sourceCellProps.value, [globalIndex, columnKey])) {
                renderNode = column.customBodyerCellRender({
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
              }

              if (!Methoder.isOwnProperty(sourceCellAttrs.value, [globalIndex, columnKey])) {
                if (helper.isObject(renderNode) && !isVNode(renderNode) && helper.isNotEmptyObject(renderNode.attrs)) {
                  sourceCellAttrs.value[globalIndex] = sourceCellAttrs.value[globalIndex] || []
                  sourceCellAttrs.value[globalIndex][columnKey] = renderNode.attrs
                }
              }

              if (!Methoder.isOwnProperty(sourceCellProps.value, [globalIndex, columnKey])) {
                sourceCellProps.value[globalIndex] = helper.isObject(sourceCellProps.value[globalIndex]) ? sourceCellProps.value[globalIndex] : {}
                sourceCellRender.value[globalIndex] = helper.isObject(sourceCellRender.value[globalIndex]) ? sourceCellRender.value[globalIndex] : {}
                sourceCellRender.value[globalIndex][columnKey] = helper.isObject(renderNode) ? (isVNode(renderNode) ? renderNode : renderNode.children) : undefined
                sourceCellProps.value[globalIndex][columnKey] = helper.isObject(renderNode) ? (!isVNode(renderNode) && renderNode.props || undefined) : undefined
              }
            }

            if (helper.isFunction(props.bodyerCell)) {
              let renderNode

              if (!Methoder.isOwnProperty(sourceCellAttrs.value, [globalIndex, columnKey]) || !Methoder.isOwnProperty(sourceCellProps.value, [globalIndex, columnKey])) {
                renderNode = props.bodyerCell({
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
              }

              if (!Methoder.isOwnProperty(sourceCellAttrs.value, [globalIndex, columnKey])) {
                if (helper.isObject(renderNode) && !isVNode(renderNode) && helper.isNotEmptyObject(renderNode.attrs)) {
                  sourceCellAttrs.value[globalIndex] = sourceCellAttrs.value[globalIndex] || []
                  sourceCellAttrs.value[globalIndex][columnKey] = renderNode.attrs
                }
              }

              if (!Methoder.isOwnProperty(sourceCellProps.value, [globalIndex, columnKey])) {
                sourceCellProps.value[globalIndex] = helper.isObject(sourceCellProps.value[globalIndex]) ? sourceCellProps.value[globalIndex] : {}
                sourceCellRender.value[globalIndex] = helper.isObject(sourceCellRender.value[globalIndex]) ? sourceCellRender.value[globalIndex] : {}
                sourceCellRender.value[globalIndex][columnKey] = helper.isObject(renderNode) ? (isVNode(renderNode) ? renderNode : renderNode.children) : undefined
                sourceCellProps.value[globalIndex][columnKey] = helper.isObject(renderNode) ? (!isVNode(renderNode) && renderNode.props || undefined) : undefined
              }
            }

            if (sourceCellAttrs.value[globalIndex]?.[columnKey] === undefined) {
              sourceCellAttrs.value[globalIndex] = sourceCellAttrs.value[globalIndex] || {}
              sourceCellAttrs.value[globalIndex][columnKey] = {}
            }

            if (sourceCellProps.value[globalIndex]?.[columnKey] === undefined) {
              sourceCellProps.value[globalIndex] = sourceCellProps.value[globalIndex] || {}
              sourceCellProps.value[globalIndex][columnKey] = {}
            }

            if (sourceCellRender.value[globalIndex]?.[columnKey] === undefined) {
              sourceCellRender.value[globalIndex] = sourceCellRender.value[globalIndex] || {}
              sourceCellRender.value[globalIndex][columnKey] = value
            }
          }
        }
      },

      normalizeInitSummary(summarys: STableRecordType[]) {
        const records = Computer.filterPageSources.value.filter(refer => refer.rowGroupLevel === 1)
        const sources = readonly(records.map(refer => refer.referRecord))
        const paginate = readonly(Paginator.paginate)

        for (const [rowIndex, record] of summarys.entries()) {
          if (helper.isFunction(props.customFooterRowAttrs)) {
            summaryRowAttrs.value[rowIndex] = summaryRowAttrs.value[rowIndex] || props.customFooterRowAttrs({ record: readonly(record), rowIndex, sources, paginate })
          }

          if (summaryRowAttrs.value[rowIndex] === undefined) {
            summaryRowAttrs.value[rowIndex] = {}
          }
        }

        for (const item of dataColumns.value) {
          const column = readonly(item)
          const columnKey = column.key
          const colIndex = column.colIndex
          const dataIndex = column.dataIndex

          for (const [rowIndex, record] of summarys.entries()) {
            let value
            let index = 0

            value = helper.isArray(dataIndex) && helper.isObject(record) ? record[dataIndex[index++]] : value
            value = helper.isString(dataIndex) ? record[dataIndex] : value

            if (helper.isNotEmptyArray(dataIndex)) {
              while (index < dataIndex.length) {
                if (!helper.isArray(value) || !helper.isObject(value)) {
                  value = undefined
                  break
                }
                value = value[column.dataIndex[index++]]
              }
            }

            if (helper.isFunction(column.customFooterCellAttrs)) {
              if (!Methoder.isOwnProperty(summaryCellAttrs.value, [rowIndex, columnKey])) {
                summaryCellAttrs.value[rowIndex] = summaryCellAttrs.value[rowIndex] || []
                summaryCellAttrs.value[rowIndex][columnKey] = column.customFooterCellAttrs({ value, record, rowIndex, column, colIndex, sources, paginate })
              }
            }

            if (helper.isFunction(column.customFooterCellRender)) {
              let renderNode

              if (!Methoder.isOwnProperty(summaryCellAttrs.value, [rowIndex, columnKey]) || !Methoder.isOwnProperty(summaryCellProps.value, [rowIndex, columnKey])) {
                renderNode = column.customFooterCellRender({
                  value,
                  record,
                  rowIndex,
                  column,
                  colIndex,
                  sources,
                  paginate
                })
              }

              if (!Methoder.isOwnProperty(summaryCellAttrs.value, [rowIndex, columnKey])) {
                if (helper.isObject(renderNode) && !isVNode(renderNode) && helper.isNotEmptyObject(renderNode.attrs)) {
                  summaryCellAttrs.value[rowIndex] = summaryCellAttrs.value[rowIndex] || []
                  summaryCellAttrs.value[rowIndex][columnKey] = renderNode.attrs
                }
              }

              if (!Methoder.isOwnProperty(summaryCellProps.value, [rowIndex, columnKey])) {
                summaryCellProps.value[rowIndex] = helper.isObject(summaryCellProps.value[rowIndex]) ? summaryCellProps.value[rowIndex] : {}
                summaryCellRender.value[rowIndex] = helper.isObject(summaryCellRender.value[rowIndex]) ? summaryCellRender.value[rowIndex] : {}
                summaryCellRender.value[rowIndex][columnKey] = helper.isObject(renderNode) ? (isVNode(renderNode) ? renderNode : renderNode.children) : undefined
                summaryCellProps.value[rowIndex][columnKey] = helper.isObject(renderNode) ? (!isVNode(renderNode) && renderNode.props || undefined) : undefined
              }
            }

            if (helper.isFunction(props.footerCell)) {
              let renderNode

              if (!Methoder.isOwnProperty(summaryCellAttrs.value, [rowIndex, columnKey]) || !Methoder.isOwnProperty(summaryCellProps.value, [rowIndex, columnKey])) {
                renderNode = props.footerCell({
                  value,
                  record,
                  rowIndex,
                  column,
                  colIndex,
                  sources,
                  paginate
                })
              }

              if (!Methoder.isOwnProperty(summaryCellAttrs.value, [rowIndex, columnKey])) {
                if (helper.isObject(renderNode) && !isVNode(renderNode) && helper.isNotEmptyObject(renderNode.attrs)) {
                  summaryCellAttrs.value[rowIndex] = summaryCellAttrs.value[rowIndex] || []
                  summaryCellAttrs.value[rowIndex][columnKey] = renderNode.attrs
                }
              }

              if (!Methoder.isOwnProperty(summaryCellProps.value, [rowIndex, columnKey])) {
                summaryCellProps.value[rowIndex] = helper.isObject(summaryCellProps.value[rowIndex]) ? summaryCellProps.value[rowIndex] : {}
                summaryCellRender.value[rowIndex] = helper.isObject(summaryCellRender.value[rowIndex]) ? summaryCellRender.value[rowIndex] : {}
                summaryCellRender.value[rowIndex][columnKey] = helper.isObject(renderNode) ? (isVNode(renderNode) ? renderNode : renderNode.children) : undefined
                summaryCellProps.value[rowIndex][columnKey] = helper.isObject(renderNode) ? (!isVNode(renderNode) && renderNode.props || undefined) : undefined
              }
            }

            if (summaryCellAttrs.value[rowIndex]?.[columnKey] === undefined) {
              summaryCellAttrs.value[rowIndex] = summaryCellAttrs.value[rowIndex] || {}
              summaryCellAttrs.value[rowIndex][columnKey] = {}
            }

            if (summaryCellProps.value[rowIndex]?.[columnKey] === undefined) {
              summaryCellProps.value[rowIndex] = summaryCellProps.value[rowIndex] || {}
              summaryCellProps.value[rowIndex][columnKey] = {}
            }

            if (summaryCellRender.value[rowIndex]?.[columnKey] === undefined) {
              summaryCellRender.value[rowIndex] = summaryCellRender.value[rowIndex] || {}
              summaryCellRender.value[rowIndex][columnKey] = value
            }
          }
        }
      },

      updatePropColumns(columns: STableWrapColumnType[]) {
        if (Methoder.isColumnsChanged(props.columns, columns)) {
          context.emit('update:sources', Methoder.restoreColumns(columns))
        }
      },

      updatePropSources(sources: STableWrapRecordType[]) {
        if (Methoder.isSourcesChanged(props.sources, sources)) {
          context.emit('update:sources', Methoder.restoreSources(sources))
        }
      },

      updatePropPaginate(paginate: STablePaginateType) {
        if (!helper.toDeepEqual(props.paginate, paginate)) {
          context.emit('update:paginate', { ...paginate })
        }
      },

      updateSetupSelectedRowKeys(keys: STableKey[]) {
        keys = Array.from(new Set(keys))

        if (!keys.every(key => selectedRowKeys.value.includes(key)) || !selectedRowKeys.value.every(key => keys.includes(key))) {
          selectedRowKeys.value = keys
          Methoder.cleanSelectedRowKeys()
        }
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
          Methoder.cleanExpandedRowKeys()
        }
      },

      updatePropExpandedRowKeys(keys: STableKey[]) {
        keys = Array.from(new Set(keys))

        if (!keys.every(key => props.expandedRowKeys.includes(key)) || !props.expandedRowKeys.every(key => keys.includes(key))) {
          context.emit('update:expandedRowKeys', keys)
        }
      },

      cleanSelectedRowKeys() {
        if (props.selectedRowMode === 'Radio' && selectedRowKeys.value.length > 1) {
          selectedRowKeys.value = selectedRowKeys.value.filter(key => props.preserveSelectedRowKeys || sourceRowKeys.value.includes(key)).filter((_, index) => index < 1)
        }

        if (!props.preserveSelectedRowKeys && !selectedRowKeys.value.every(key => sourceRowKeys.value.includes(key))) {
          selectedRowKeys.value = selectedRowKeys.value.filter(key => sourceRowKeys.value.includes(key))
        }
      },

      cleanExpandedRowKeys() {
        if (!props.preserveExpandedRowKeys && !expandedRowKeys.value.every(key => sourceRowKeys.value.includes(key))) {
          expandedRowKeys.value = expandedRowKeys.value.filter(key => sourceRowKeys.value.includes(key))
        }
      },

      forceUpdate() {
        // Update Columns
        columnRowAttrs.value = []
        columnCellAttrs.value = []
        columnCellProps.value = []
        columnCellRender.value = []
        columnSettingsAllTrees.value = []
        treeColumns.value = Methoder.normalizeTreeColumns(props.columns, [])
        listColumns.value = Methoder.normalizeListColumns(treeColumns.value, [])
        dataColumns.value = Methoder.normalizeDataColumns(listColumns.value)
        Methoder.normalizeTreeSettings(treeColumns.value)
        Methoder.normalizeInitColumns(listColumns.value)

        // Update DataSources
        sourceRowAttrs.value = []
        sourceRowStates.value = []
        sourceCellProps.value = []
        sourceCellAttrs.value = []
        sourceCellRender.value = []
        treeSources.value = Methoder.normalizeTreeSources(props.sources, [])
        listSources.value = Methoder.normalizeListSources(treeSources.value, [])
        Methoder.normalizeInitSources(Computer.filterRangeSources.value)

        // Update Summarys
        summaryRowAttrs.value = []
        summaryCellProps.value = []
        summaryCellAttrs.value = []
        summaryCellRender.value = []
        listSummary.value = Methoder.normalizeListSummary(props.summarys)

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
        Eventer.updateResizeContainer()
        Eventer.updateScrollContainer()
        Eventer.updateColGroupRender()
      })
    }

    const Eventer = {
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

      computeTableChildStyle(column: STableColumnType, type: string) {
        const style = {}
        const scrollLeft = Optionser.scrollLeft.value
        const srcollRight = Optionser.srcollRight.value
        const tableTheadSizes = Optionser.tableTheadSizes.value
        const currentFixedLeft = Computer.fixedLeftIndex.value > -1 && column.colOffset < Computer.fixedLeftIndex.value
        const currentFixedRight = Computer.fixedRightIndex.value > -1 && column.colOffset >= Computer.fixedRightIndex.value

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

        if (column.ellipsis === true) {
          Object.assign(style, {
            'overflow': 'hidden',
            'white-space': 'nowrap',
            'text-overflow': 'ellipsis'
          })
        }

        if (currentFixedLeft === true) {
          const leftBodyer = helper.isFiniteNumber(Normalizer.sticky.value.leftBodyer) ? Normalizer.sticky.value.leftBodyer : 0
          const leftWidth = tableTheadSizes.reduce((total, item) => item.colOffset < column.colOffset ? total + item.width : total, leftBodyer)
          const boxShadow = '3px ' + (type === 'thead' ? '-1px' : '1px') + ' 3px 0 rgba(0, 0, 0, .15)'

          Object.assign(style, {
            'position': 'sticky',
            'left': leftWidth + 'px',
            'box-shadow': scrollLeft > 0 && column.colOffset === Computer.fixedLeftIndex.value - 1 ? boxShadow : 'none'
          })
        }

        if (currentFixedRight === true) {
          const rightBodyer = helper.isFiniteNumber(Normalizer.sticky.value.rightBodyer) ? Normalizer.sticky.value.rightBodyer : 0
          const rightWidth = tableTheadSizes.reduce((total, item) => item.colOffset >= column.colOffset ? total + item.width : total, rightBodyer)
          const boxShadow = '-3px ' + (type === 'thead' ? '-1px' : '1px') + ' 3px 0 rgba(0, 0, 0, .15)'

          Object.assign(style, {
            'position': 'sticky',
            'right': rightWidth + 'px',
            'box-shadow': srcollRight > 1 && column.colOffset === Computer.fixedLeftIndex.value ? boxShadow : 'none'
          })
        }

        return style
      },

      computeTableChildAttrs(attrs: Record<string, any> = {}, type: string) {
        if (type === 'tbody' || type === 'tfoot') {
          return toRaw(unref(attrs))
        }

        return {}
      },

      computeTableChildProps(props: Record<string, any> = {}, type: string) {
        if (type === 'tbody' || type === 'tfoot') {
          const marks = { ...toRaw(unref(props)) }
          const attrs = { style: {} }

          if (typeof marks.align === 'string') {
            Object.assign(attrs.style, {
              'text-align': marks.align || 'left'
            })
          }

          if (marks.ellipsis === true) {
            Object.assign(attrs.style, {
              'overflow': 'hidden',
              'white-space': 'nowrap',
              'text-overflow': 'ellipsis'
            })
          }

          return attrs
        }

        return {}
      },

      updateResizeContainer(entries: Array<any> = []) {
        if (Normalizer.scroll.value.getScrollResizeContainer) {
          const container = Normalizer.scroll.value.getScrollResizeContainer()
          const clientRect = container && container.getBoundingClientRect()
          Optionser.scrollResizeWidth.value = clientRect ? clientRect.width : 0
          Optionser.scrollResizeHeight.value = clientRect ? clientRect.height : 0
        }
      },

      updateScrollContainer(entries: Array<any> = []) {
        if (Optionser.refTableWrapper.value) {
          const scrollContainer = Optionser.refTableWrapper.value
          const offsetHeight = scrollContainer.offsetHeight || 0
          const offsetWidth = scrollContainer.offsetWidth || 0
          const scrollHeight = scrollContainer.scrollHeight || 0
          const scrollWidth = scrollContainer.scrollWidth || 0
          const scrollLeft = scrollContainer.scrollLeft || 0
          const scrollTop = scrollContainer.scrollTop || 0

          Optionser.srcollTop.value = scrollTop || 0
          Optionser.scrollLeft.value = scrollLeft || 0
          Optionser.srcollRight.value = scrollWidth - (scrollLeft + offsetWidth) || 0
          Optionser.srcollBottom.value = scrollHeight - (scrollTop + offsetHeight) || 0
        }
      },

      updateTheadContainer(entries: Array<any> = []) {
        if (Optionser.refTableWrapper.value) {
          Optionser.tableTheadSizes.value = Computer.filterDataColumns.value.map(column => {
            const rowSpan = column.rowSpan
            const colSpan = column.colSpan
            const rowIndex = column.rowIndex
            const colIndex = column.colIndex
            const rowOffset = column.rowOffset
            const colOffset = column.colOffset
            const minWidth = column.minWidth || 0
            const maxWidth = column.maxWidth || Infinity
            const tableThead = Optionser.refTableWrapper.value?.querySelector<HTMLElement>(`.s-table-thead-th[row-index="${rowIndex}"][col-index="${colIndex}"]`)

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

      updateColGroupRender(entries: Array<any> = []) {
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

      documentMouseMove(event: MouseEvent) {
        if (Optionser.resizeRcordColumn) {
          const offsetX = event.clientX - Optionser.resizeRcordX
          const maxWidth = Optionser.resizeRcordColumn.maxWidth || Infinity
          const minWidth = Optionser.resizeRcordColumn.minWidth || 0
          const nowWidth = Optionser.resizeRcordWidth + offsetX || 0

          Optionser.resizeRcordColumn.width = nowWidth < maxWidth ? nowWidth : maxWidth
          Optionser.resizeRcordColumn.width = nowWidth > minWidth ? nowWidth : minWidth
          Optionser.resizeRcordColumn.width = nowWidth > 0 ? nowWidth : 0

          nextTick(() => Eventer.updateTheadContainer())
        }
      },

      documentMouseup(event: MouseEvent) {
        if (Optionser.resizeRcordColumn) {
          const width = Optionser.resizeRcordColumn.width
          const rowIndex = Optionser.resizeRcordColumn.rowIndex
          const colIndex = Optionser.resizeRcordColumn.colIndex
          const treeColumn = Methoder.findTreeColumns(treeColumns.value, rowIndex, colIndex)!
          treeColumn.referColumn.width = width
          treeColumn.cacheColumn.width = width
        }

        Optionser.resizeRcordX = 0
        Optionser.resizeRcordWidth = 0
        Optionser.resizeRcordColumn = null
        document.body.classList.remove('user-select-none')
        document.body.classList.remove('cursor-column-resize')
      }
    }

    watch([() => props.columns, () => props.sources, () => props.summarys], () => {
      const columnsChanged = Methoder.isColumnsChanged(props.columns, treeColumns.value)
      const sourcesChanged = Methoder.isSourcesChanged(props.sources, treeSources.value)
      const summaryChanged = Methoder.isSummaryChanged(props.summarys, listSummary.value)
      const sourcesReseted = sourcesChanged && Methoder.isSourcesChanged(props.sources.slice(0, treeSources.value.length), treeSources.value)

      if (columnsChanged) {
        columnRowAttrs.value = []
        columnCellAttrs.value = []
        columnCellProps.value = []
        columnCellRender.value = []
        columnSettingsAllTrees.value = []
        treeColumns.value = Methoder.normalizeTreeColumns(props.columns, [])
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
        treeSources.value = Methoder.normalizeTreeSources(props.sources, [])
        listSources.value = Methoder.normalizeListSources(treeSources.value, [])
        Methoder.cleanSelectedRowKeys()
        Methoder.cleanExpandedRowKeys()
      }

      if (summaryChanged) {
        summaryRowAttrs.value = []
        summaryCellProps.value = []
        summaryCellAttrs.value = []
        summaryCellRender.value = []
        listSummary.value = Methoder.normalizeListSummary(props.summarys)
      }
    }, watchDeepOptions)

    watch(() => props.loading, state => { loading.value = state })
    watch(() => props.paginate, paginate => { Paginator.update(paginate) })
    watch(() => props.selectedRowMode, () => { selectedRowKeys.value = [] })
    watch(() => [...props.selectedRowKeys], () => { Methoder.updateSetupSelectedRowKeys(props.selectedRowKeys) })
    watch(() => [...props.expandedRowKeys], () => { Methoder.updateSetupExpandedRowKeys(props.expandedRowKeys) })

    watch([dataColumns, Computer.filterRangeSources], () => { Methoder.normalizeInitSources(Computer.filterRangeSources.value) }, watchDeepOptions)
    watch([listSummary, Computer.filterPageSources], () => { Methoder.normalizeInitSummary(Computer.filterPageSummary.value) }, watchDeepOptions)
    watch(() => Computer.filterDataColumns.value, () => { Eventer.updateColGroupRender(Computer.filterDataColumns.value) }, watchDeepOptions)
    watch(() => selectedRowKeys.value, () => { Methoder.updatePropSelectedRowKeys(selectedRowKeys.value) }, watchDeepOptions)
    watch(() => expandedRowKeys.value, () => { Methoder.updatePropExpandedRowKeys(expandedRowKeys.value) }, watchDeepOptions)
    watch(() => Paginator.paginate, () => { Methoder.updatePropPaginate(Paginator.paginate) }, watchDeepOptions)
    watch(() => treeColumns.value, () => { Methoder.updatePropColumns(treeColumns.value) }, watchDeepOptions)
    watch(() => treeSources.value, () => { Methoder.updatePropSources(treeSources.value) }, watchDeepOptions)
    watch(() => loading.value, () => { context.emit('update:loading', loading.value) }, watchDeepOptions)

    onMounted(() => {
      Eventer.updateResizeContainer()
      Eventer.updateScrollContainer()
      Eventer.updateColGroupRender()
      Observer.resizeObserver.observe(Optionser.refTableWrapper.value!)
      Observer.resizeObserver.observe(Normalizer.scroll.value.getScrollResizeContainer?.() || document.documentElement)
      document.addEventListener('mousemove', event => Eventer.documentMouseMove(event))
      document.addEventListener('mouseup', event => Eventer.documentMouseup(event))
    })

    context.expose({
      selectRowKeys: Methoder.updateSetupSelectedRowKeys,
      expandRowKeys: Methoder.updateSetupExpandedRowKeys,
      forceUpdate: Methoder.forceUpdate
    })

    const RenderTableWrapper = (_: any, ctx: typeof context) => {
      const RenderColGroup = () => {
        return (
          <colgroup>
            { ref(Computer.filterDataColumns).value.map(column => <col style={Eventer.computeTableGroupStyle(column)}/>) }
          </colgroup>
        )
      }

      const RenderTableThead = () => {
        const style: any = { 'position': 'relative', 'z-index': 50 }
        const topHeader = Normalizer.sticky.value.topHeader
        const isFixedTop = Computer.isFixedTop.value

        if (isFixedTop || topHeader === true || helper.isFiniteNumber(topHeader)) {
          Object.assign(style, {
            'position': 'sticky',
            'top': /^\+?\d+\.?\d*$/.test(`${topHeader}`) ? `${topHeader}px` : 0,
            'z-index': 50
          })
        }

        return (
          <thead
            class='s-table-thead'
            style={style}
          >
            {
              ref(Computer.filterListColumns).value.map((columns, rowIndex) => (
                <tr
                  { ...toRaw(unref(columnRowAttrs.value[rowIndex])) }
                  style={{ 'position': 'relative', 'z-index': listColumns.value.length - rowIndex }}
                  class='s-table-thead-tr'
                  row-index={rowIndex}
                >
                  {
                    columns.map(column => {
                      if (column && column.rowSpan > 0 && column.colSpan > 0) {
                        const rowIndex = column.rowIndex
                        const colIndex = column.colIndex
                        const resizeDriver = <span class='s-table-thead-th-resizable'/>
                        const renderTitle = Methoder.getValue(columnCellRender.value[rowIndex][colIndex])

                        const computeTitle = !Methoder.isVueNode(renderTitle) && helper.isFunction(ctx.slots.headerCell)
                          ? Methoder.getVNodes(renderSlot(ctx.slots, 'headerCell', { title: renderTitle, column: readonly(column), rowIndex, colIndex }))
                          : renderTitle

                        return (
                          <th
                            colspan={column.colSpan}
                            rowspan={column.rowSpan}
                            style={Eventer.computeTableChildStyle(column, 'thead')}
                            { ...toRaw(unref(columnCellAttrs.value[rowIndex][colIndex])) }
                            class={'s-table-thead-th'}
                            col-index={column.colIndex}
                            row-index={column.rowIndex}
                            col-offset={column.colOffset}
                            row-offset={column.rowOffset}
                          >
                            { computeTitle ?? renderTitle }
                            { column.resizable ? resizeDriver : null }
                          </th>
                        )
                      }
                    })
                  }
                </tr>
              ))
            }
          </thead>
        )
      }

      const RenderTableTBody = () => {
        return (
          <tbody
            class='s-table-tbody'
            style={{ 'position': 'relative', 'z-index': 10 }}
          >
            {
              Computer.filterRangeSources.value.map(option => {
                const record = readonly(option.referRecord)
                const rowIndex = option.rowGroupIndex
                const groupLevel = option.rowGroupLevel
                const groupIndex = option.rowGroupIndex
                const groupIndexs = option.rowGroupIndexs
                const globalIndex = option.rowGlobalIndex
                const filterColumns = ref(Computer.filterDataColumns)
                const cacheIndexs = new Map() as Map<number, { span: number; render: any }>
                const emptyIndexs = new Set() as Set<number>

                return (
                  <tr
                    { ...toRaw(unref(sourceRowAttrs.value[globalIndex])) }
                    class={'s-table-tbody-tr'}
                    row-global-index={globalIndex}
                    row-group-index={groupIndex}
                    row-group-level={groupLevel}
                    row-index={rowIndex}
                  >
                    {
                      dataColumns.value.map((item, colIndex) => {
                        let rowSpan = 0
                        let colSpan = 0

                        const column = filterColumns.value.find(col => col.colIndex === item.colIndex)
                        const cellAttrs = column && Methoder.getValue(sourceCellAttrs.value[globalIndex][column.key])
                        const cellProps = column && Methoder.getValue(sourceCellProps.value[globalIndex][column.key])
                        const cellValue = column && Methoder.getValue(sourceCellRender.value[globalIndex][column.key])

                        if (!column) {
                          colSpan = helper.isFiniteNumber(cellProps?.colSpan) ? cellProps.colSpan : 1
                          colSpan = cacheIndexs.has(colIndex) ? cacheIndexs.get(colIndex)!.span : colSpan

                          if (colSpan > 1) {
                            for (let next = 1; next < colSpan; next++) {
                              const index = dataColumns.value[colIndex + next].colIndex
                              const column = filterColumns.value.find(col => col.colIndex === index)
                              const props = column && Methoder.getValue(sourceCellProps.value[globalIndex][column.key])
                              const span = helper.isFiniteNumber(props?.colSpan) ? (props.colSpan >= 0 ? props.colSpan : 1) : column?.colSpan || 1

                              if (column && span === 0) {
                                colSpan = 1
                              }

                              if (column && span > 0) {
                                break
                              }
                            }
                          }
                        }

                        if (column) {
                          rowSpan = helper.isFiniteNumber(cellProps?.rowSpan) ? cellProps.rowSpan : 1
                          colSpan = helper.isFiniteNumber(cellProps?.colSpan) ? cellProps.colSpan : column.colSpan || 1
                          colSpan = cacheIndexs.has(colIndex) ? cacheIndexs.get(colIndex)!.span : colSpan
                          colSpan = emptyIndexs.has(colIndex) ? 0 : colSpan || 1

                          if (colSpan > 1) {
                            let reset = 0

                            for (let next = 1; next < colSpan; next++) {
                              const index = dataColumns.value[colIndex + next].colIndex
                              const column = filterColumns.value.find(col => col.colIndex === index)
                              const props = column && Methoder.getValue(sourceCellProps.value[globalIndex][column.key])
                              const span = helper.isFiniteNumber(props?.colSpan) ? (props.colSpan >= 0 ? props.colSpan : 1) : column?.colSpan || 1

                              if (column && span === 0) {
                                emptyIndexs.add(colIndex + next)
                              }

                              if (column && span > 0) {
                                colSpan = 1
                                reset = next
                                break
                              }

                              if (!column) {
                                colSpan--
                              }
                            }

                            for (let next = 1; next < reset; next++) {
                              cacheIndexs.set(colIndex + next, { span: 1, render: undefined })
                              emptyIndexs.delete(colIndex + next)
                            }
                          }

                          if (rowSpan >= 1 && colSpan >= 1) {
                            const cacheValue = cacheIndexs.get(colIndex) ? cacheIndexs.get(colIndex)!.render : undefined
                            const computeValue = cacheValue !== undefined ? cacheValue : !Methoder.isVueNode(cellValue) && helper.isFunction(ctx.slots.bodyerCell)
                              ? Methoder.getVNodes(renderSlot(ctx.slots, 'bodyerCell', { value: cellValue, record, rowIndex, groupIndex, groupLevel, groupIndexs, globalIndex, column: readonly(column), colIndex }))
                              : cellValue

                            return (
                              <td
                                rowspan={rowSpan}
                                colspan={colSpan}
                                style={Eventer.computeTableChildStyle(column, 'tbody')}
                                { ...Eventer.computeTableChildAttrs(cellAttrs, 'tbody') }
                                { ...Eventer.computeTableChildProps(cellProps, 'tbody') }
                                class={'s-table-tbody-td'}
                                col-index={column.colIndex}
                                col-offset={column.colOffset}
                                row-global-index={globalIndex}
                                row-group-index={groupIndex}
                                row-group-level={groupLevel}
                                row-index={rowIndex}
                              >
                                { computeValue ?? cellValue }
                              </td>
                            )
                          }
                        }
                      })
                    }
                  </tr>
                )
              })
            }
          </tbody>
        )
      }

      const RenderTableTFoot = () => {
        const style: any = { 'position': 'relative', 'z-index': 30 }
        const bottomFooter = Normalizer.sticky.value.bottomFooter

        if (bottomFooter === true || helper.isFiniteNumber(bottomFooter)) {
          Object.assign(style, {
            'position': 'sticky',
            'bottom': /^\+?\d+\.?\d*$/.test(`${bottomFooter}`) ? `${bottomFooter}px` : 0,
            'z-index': 30
          })
        }

        return (
          <tfoot
            class='s-table-tfoot'
            style={style}
          >
            {
              Computer.filterPageSummary.value.map((summary, rowIndex) => {
                const record = readonly(summary)
                const filterColumns = ref(Computer.filterDataColumns)
                const cacheIndexs = new Map() as Map<number, { span: number; render: any }>
                const emptyIndexs = new Set() as Set<number>

                return (
                  <tr
                    { ...toRaw(unref(summaryRowAttrs.value[rowIndex])) }
                    class={'s-table-tfoot-tr'}
                    row-index={rowIndex}
                  >
                    {
                      dataColumns.value.map((item, colIndex) => {
                        let rowSpan = 0
                        let colSpan = 0

                        const column = filterColumns.value.find(col => col.colIndex === item.colIndex)
                        const cellAttrs = column && Methoder.getValue(summaryCellAttrs.value[rowIndex][ column.key])
                        const cellProps = column && Methoder.getValue(summaryCellProps.value[rowIndex][ column.key])
                        const cellValue = column && Methoder.getValue(summaryCellRender.value[rowIndex][ column.key])

                        if (!column) {
                          colSpan = helper.isFiniteNumber(cellProps?.colSpan) ? cellProps.colSpan : 1
                          colSpan = cacheIndexs.has(colIndex) ? cacheIndexs.get(colIndex)!.span : colSpan

                          if (colSpan > 1) {
                            for (let next = 1; next < colSpan; next++) {
                              const index = dataColumns.value[colIndex + next].colIndex
                              const column = filterColumns.value.find(col => col.colIndex === index)
                              const props = column && Methoder.getValue(summaryCellProps.value[rowIndex][column.key])
                              const span = helper.isFiniteNumber(props?.colSpan) ? (props.colSpan >= 0 ? props.colSpan : 1) : column?.colSpan || 1

                              if (column && span === 0) {
                                colSpan = 1
                              }

                              if (column && span > 0) {
                                break
                              }
                            }
                          }
                        }

                        if (column) {
                          rowSpan = helper.isFiniteNumber(cellProps?.rowSpan) ? cellProps.rowSpan : 1
                          colSpan = helper.isFiniteNumber(cellProps?.colSpan) ? cellProps.colSpan : column.colSpan || 1
                          colSpan = cacheIndexs.has(colIndex) ? cacheIndexs.get(colIndex)!.span : colSpan
                          colSpan = emptyIndexs.has(colIndex) ? 0 : colSpan || 1

                          if (colSpan > 1) {
                            let reset = 0

                            for (let next = 1; next < colSpan; next++) {
                              const index = dataColumns.value[colIndex + next].colIndex
                              const column = filterColumns.value.find(col => col.colIndex === index)
                              const props = column && Methoder.getValue(summaryCellProps.value[rowIndex][column.key])
                              const span = helper.isFiniteNumber(props?.colSpan) ? (props.colSpan >= 0 ? props.colSpan : 1) : column?.colSpan || 1

                              if (column && span === 0) {
                                emptyIndexs.add(colIndex + next)
                              }

                              if (column && span > 0) {
                                colSpan = 1
                                reset = next
                                break
                              }

                              if (!column) {
                                colSpan--
                              }
                            }

                            for (let next = 1; next < reset; next++) {
                              cacheIndexs.set(colIndex + next, { span: 1, render: undefined })
                              emptyIndexs.delete(colIndex + next)
                            }
                          }

                          if (rowSpan >= 1 && colSpan >= 1) {
                            const records = Computer.filterPageSources.value.filter(refer => refer.rowGroupLevel === 1)
                            const sources = readonly(records.map(refer => refer.referRecord))
                            const paginate = readonly(Paginator.paginate)

                            const cacheValue = cacheIndexs.get(colIndex) ? cacheIndexs.get(colIndex)!.render : undefined
                            const computeValue = cacheValue !== undefined ? cacheValue : !Methoder.isVueNode(cellValue) && helper.isFunction(ctx.slots.footerCell)
                              ? Methoder.getVNodes(renderSlot(ctx.slots, 'footerCell', { value: cellValue, record, rowIndex, column: readonly(column), colIndex, sources, paginate }))
                              : cellValue

                            return (
                              <td
                                rowspan={rowSpan}
                                colspan={colSpan}
                                style={Eventer.computeTableChildStyle(column, 'tfoot')}
                                { ...Eventer.computeTableChildAttrs(cellAttrs, 'tfoot') }
                                { ...Eventer.computeTableChildProps(cellProps, 'tfoot') }
                                class={'s-table-tfoot-td'}
                                col-index={column.colIndex}
                                col-offset={column.colOffset}
                                row-index={rowIndex}
                              >
                                { computeValue ?? cellValue }
                              </td>
                            )
                          }
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

      const WrapperMousedown = (event: MouseEvent) => {
        if (!(event.target instanceof HTMLElement)) {
          return
        }

        if (!Optionser.resizeRcordColumn && event.target.classList.contains('s-table-thead-th-resizable')) {
          const $target = event.target
          const $wrapper = Optionser.refTableWrapper.value!
          const $theader = $target.closest('.s-table-thead-th')!
          const rowIndex = +$theader.getAttribute('row-index')!
          const colIndex = +$theader.getAttribute('col-index')!
          const findColumn = rowIndex >= 0 && colIndex >= 0 && Methoder.findListColumns(Computer.filterListColumns.value, rowIndex, colIndex)

          if (findColumn) {
            Optionser.resizeRcordColumn = Computer.filterDataColumns.value.findLast(column => {
              return (
                column.rowSpan > 0 &&
                column.colSpan > 0 &&
                column.resizable === true &&
                column.colOffset >= findColumn.colOffset &&
                column.colOffset + column.colSpan <= findColumn.colOffset + findColumn.colSpan
              )
            })
          }

          if (Optionser.resizeRcordColumn) {
            const rowIndex = Optionser.resizeRcordColumn.rowIndex
            const colIndex = Optionser.resizeRcordColumn.colIndex
            const $theader = $wrapper.querySelector(`.s-table-thead-th[row-index="${rowIndex}"][col-index="${colIndex}"]`)!
            const theaderRect = $theader.getBoundingClientRect()

            Optionser.resizeRcordX = event.clientX
            Optionser.resizeRcordWidth = theaderRect.width
            document.body.classList.add('cursor-column-resize')
            document.body.classList.add('user-select-none')
          }
        }
      }

      const WrapperTableClass = {
        's-border-table': Computer.hasBorder.value,
        's-header-table': Computer.hasHeader.value,
        's-bodyer-table': Computer.hasBodyer.value,
        's-footer-table': Computer.hasFooter.value
      }

      return (
        <div
          ref={Optionser.refTableWrapper}
          class={'s-nested-table-wrapper'}
          style={{ height: Computer.tableBodyHeight.value, overflow: Computer.isFixedTop.value ? 'auto' : 'visible' }} // @ts-ignore
          onScrollPassive={Eventer.updateScrollContainer}
          onMousedown={WrapperMousedown}
        >
          <table
            class={['s-nested-table', WrapperTableClass]}
            style={{ width: Computer.tableBodyWidth.value, tableLayout: props.layout }}
          >
            <RenderColGroup/>
            <RenderTableThead/>
            <RenderTableTBody/>
            <RenderTableTFoot/>
          </table>
        </div>
      )
    }

    const RenderTableContianer = (_: any, ctx: typeof context) => {
      return (
        <section class={['s-table-container', `s-${Normalizer.size.value}`]}>
          <div class='s-table-spining-container'>
            <div class={['s-table-spining-content', { spining: loading }]}>
              <RenderTableWrapper v-slots={ctx.slots}/>
            </div>
          </div>
        </section>
      )
    }

    return () => <RenderTableContianer v-slots={context.slots}/>
  },
  slots: {} as STableeDefineSlots<STableRecordType>,
  methods: {} as STableDefineMethods
})
