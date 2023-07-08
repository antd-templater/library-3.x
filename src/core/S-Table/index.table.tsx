import { VNode, HTMLAttributes, DeepReadonly, Ref, isVNode, defineComponent, computed, reactive, ref, inject, watch, readonly, onMounted } from 'vue'
import { defaultConfigProvider } from 'ant-design-vue/es/config-provider'
import * as VueTypes from 'vue-types'
import helper from '@/helper'

export interface STableSettingsType {
  key: string;
  title: string;
  children?: STableSettingsType[];
}

export interface STableStickyType {
  stickyHeader: boolean | number;
  stickyFooter: boolean | number;
  stickyRightScrollbar: boolean | number;
  stickyBottomScrollbar: boolean | number;
}

export interface STableScrollType {
  x: number | false;
  y: number | false;
  scrollToFirstXOnChange: boolean;
  scrollToFirstYOnChange: boolean;
  getScrollResizeContainer?: () => HTMLElement;
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
  visible: boolean;
  size: 'default' | 'small';
  mode: 'remote' | 'local';
  showTotal?:	(total: number, range: [number, number]) => void;
}

export interface STableRecordType {
  [field: string]: any;
}

export interface STableRowKey<RecordType = STableRecordType> {
  (record: DeepReadonly<RecordType>): string
}

export interface STableTreeKey<RecordType = STableRecordType> {
  (record: DeepReadonly<RecordType>): string
}

export interface STableLoadSources<RecordType = STableRecordType> {
  (
    options: {
      action: 'sorter' | 'paginate';
      sorter: Array<{ field: string | string[]; value: 'ascend'| 'descend'; }>;
      paginate: STablePagination;
    }
  ): Array<RecordType> | {
    data: Array<RecordType>;
    page: number;
    total: number;
  };
}

export interface STableFooterRender<RecordType = STableRecordType> {
  (options: { currentDataSource: RecordType[]; pagination: { pageTotal: number; pageCount: number; pageSize: number; pageNo: number; }; }): VNode;
}

export interface STableHeaderCellRender<RecordType = STableRecordType> {
  (option: { title: string | number; column: DeepReadonly<STableColumnType<RecordType>>; rowIndex: number; colIndex: number; }): VNode | {
    props?: {
      align?: 'left' | 'center' | 'right';
      fixed?: 'left' | 'right' | false;
      width?: number | string;
      minWidth?: number;
      maxWidth?: number;
      resizable?: boolean;
      ellipsis?: boolean;
      colSpan?: number;
      rowSpan?: number;
      sorter?: boolean;
      sorterField?: string | string[];
      sortDirections?: STableSortDirections;
    };
    children?: any;
  };
}

export interface STableBodyerCellRender<RecordType = STableRecordType> {
  (option: { value: any; record: DeepReadonly<RecordType>; column: DeepReadonly<STableColumnType<RecordType>>; rowIndex: number; groupIndex: number; groupLevel: number; groupIndexs: number[]; globalIndex: number; }): VNode | {
    props?: {
      align?: 'left' | 'center' | 'right';
      ellipsis?: boolean;
    };
    children?: any;
  };
}

export interface STableBodyerExpandRender<RecordType = STableRecordType> {
  (option: { record: DeepReadonly<RecordType>; rowIndex: number; groupIndex: number; groupLevel: number; groupIndexs: number[]; globalIndex: number; expanded: boolean; }): VNode;
}

export interface STableCustomHeaderRowAttrs<RecordType = STableRecordType> {
  (options: { columns: DeepReadonly<STableColumnType<RecordType>[]>; rowIndex: number; }): HTMLAttributes;
}

export interface STableCustomBodyerRowAttrs<RecordType = STableRecordType> {
  (options: { record: DeepReadonly<RecordType>; rowIndex: number; groupIndex: number; groupLevel: number; groupIndexs: number[]; globalIndex: number; }): HTMLAttributes;
}

export interface STableCustomBodyerRowStates<RecordType = STableRecordType> {
  (options: { record: DeepReadonly<RecordType>; rowIndex: number; groupIndex: number; groupLevel: number; groupIndexs: number[]; globalIndex: number; }): {
    draggable?: boolean;
    selectable?: boolean;
    expandable?: boolean;
  };
}

export interface STableWrapRecordType<RecordType = STableRecordType> {
  key: STableKey;
  childKeys: STableKey[];
  parentKeys: STableKey[];
  rowGroupLevel: number;
  rowGroupIndex: number;
  rowGroupIndexs: number[];
  rowGlobalIndex: number;
  rowRecordSource: DeepReadonly<RecordType>;
  rowTreeKeyField: string;
  rowKeyField: string;
  rowHeight: number;
}

export interface STablePartColumnType<RecordType = STableRecordType> {
  key?: string;
  title: string;
  dataIndex: string | Array<string>;
  children?: STablePartColumnType<RecordType>[];
  align?: 'left' | 'center' | 'right';
  fixed?: 'left' | 'right' | false;
  width?: number | string;
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
  sorterValueChange?: (option: { value: 'ascend'| 'descend' | ''; values: Array<{ field: string | string[]; value: 'ascend'| 'descend' }>; }) => void;
  customHeaderCellAttrs?: (option: { column: DeepReadonly<STableColumnType<RecordType>>; rowIndex: number; colIndex: number; }) => HTMLAttributes;
  customBodyerCellAttrs?: (option: { record: DeepReadonly<RecordType>, column: DeepReadonly<STableColumnType<RecordType>>; rowIndex: number; groupIndex: number; groupLevel: number; groupIndexs: number[]; globalIndex: number; }) => HTMLAttributes;
  customHeaderCellRender?: STableHeaderCellRender;
  customBodyerCellRender?: STableBodyerCellRender;
}

export interface STableColumnType<RecordType = STableRecordType> {
  key: string;
  title: string;
  parentKey: string;
  dataIndex: string | Array<string>;
  children: STableColumnType<RecordType>[];
  align: 'left' | 'center' | 'right';
  fixed: 'left' | 'right' | false;
  width?: number | string;
  minWidth?: number;
  maxWidth?: number;
  resizable: boolean;
  ellipsis: boolean;
  colMax: number;
  rowMax: number;
  colSpan: number;
  rowSpan: number;
  colIndex: number;
  rowIndex: number;
  sorter: boolean;
  sortered: boolean;
  sorterField: string | string[];
  sortDirections?: STableSortDirections;
  defaultSorterValue: 'ascend'| 'descend' | '';
  currentSorterValue: 'ascend'| 'descend' | '';
  activedSorterValues: Array<{ field: string | string[]; value: 'ascend'| 'descend' }>;
  sorterValueChange?: (option: { value: 'ascend'| 'descend' | ''; values: Array<{ field: string | string[]; value: 'ascend'| 'descend' }>; }) => void;
  customHeaderCellAttrs?: (option: { column: DeepReadonly<STableColumnType<RecordType>>; rowIndex: number; colIndex: number; }) => HTMLAttributes;
  customBodyerCellAttrs?: (option: { record: DeepReadonly<RecordType>, column: DeepReadonly<STableColumnType<RecordType>>; rowIndex: number; groupIndex: number; groupLevel: number; groupIndexs: number[]; globalIndex: number; }) => HTMLAttributes;
  customHeaderCellRender?: STableHeaderCellRender;
  customBodyerCellRender?: STableBodyerCellRender;
}

export type STableKey = string | number
export type STableSize = 'default' | 'middle' | 'small'
export type STableSortDirections = ['ascend'] | ['descend'] | ['ascend', 'descend']
export type STablePartStickyType = Partial<STableStickyType>
export type STablePartScrollType = Partial<STableScrollType>
export type STablePartPagination = Partial<STablePagination>
export type STableColumnTypes = STableColumnType[]

export const STable = defineComponent({
  name: 'STable',
  props: {
    size: VueTypes.string<STableSize>().def(undefined),
    layout: VueTypes.string<'auto' | 'fixed'>().def('auto'),
    rowKey: VueTypes.any<string | STableRowKey>().def('key'),
    treeKey: VueTypes.any<string | STableTreeKey>().def('children'),
    headerCell: VueTypes.func<STableHeaderCellRender>().def(undefined),
    bodyerCell: VueTypes.func<STableBodyerCellRender>().def(undefined),
    sticky: VueTypes.object<STablePartStickyType>().def(() => ({})),
    scroll: VueTypes.object<STablePartScrollType>().def(() => ({})),
    columns: VueTypes.array<STablePartColumnType>().isRequired,
    loadData: VueTypes.func<STableLoadSources>().def(undefined),
    dataSource: VueTypes.array<STableRecordType>().def(() => []),
    pagination: VueTypes.any<STablePartPagination | boolean>().def(false),
    customHeaderRowAttrs: VueTypes.func<STableCustomHeaderRowAttrs>().def(undefined),
    customBodyerRowAttrs: VueTypes.func<STableCustomBodyerRowAttrs>().def(undefined),
    customBodyerRowStates: VueTypes.func<STableCustomBodyerRowStates>().def(undefined),
    selectedMode: VueTypes.string<'Radio' | 'Checkbox'>().def('Checkbox'),
    selectedRowKeys: VueTypes.array<STableKey>().def(() => []),
    expandedRowKeys: VueTypes.array<STableKey>().def(() => []),
    selectedStrictly: VueTypes.bool().def(true),
    preserveSelectedRowKeys: VueTypes.bool().def(false),
    preserveExpandedRowKeys: VueTypes.bool().def(false),
    defaultSelectAllRows: VueTypes.bool().def(false),
    defaultExpandAllRows: VueTypes.bool().def(false),
    columnSorterMultiple: VueTypes.bool().def(false),
    columnSorterTooltip: VueTypes.bool().def(false),
    expandRowByClick: VueTypes.bool().def(false),
    selectIndentSize: VueTypes.number().def(15),
    expandIndentSize: VueTypes.number().def(15),
    showHeader: VueTypes.bool().def(false),
    showFooter: VueTypes.bool().def(true),
    bordered: VueTypes.bool().def(false),
    loading: VueTypes.bool().def(false),
    virtual: VueTypes.bool().def(true)
  },
  emits: {
    'update:selectedRowKeys': (keys: Array<STableKey>) => true,
    'update:expandedRowKeys': (keys: Array<STableKey>) => true,
    'sorter': (options: Array<{ field: string | string[]; value: 'ascend'| 'descend' }>) => true,
    'expand': (keys: Array<STableKey>) => true,
    'select': (keys: Array<STableKey>) => true,
    'paginate': (pages: STablePagination) => true
  },
  setup(props, context) {
    const watchDeepOptions = { immediate: true, deep: true }
    const renderRowPresets = reactive({ minBuffer: 5, maxBuffer: 10, minHeight: 32 })
    const renderRowRanger = reactive({ renderOffset: [0, ~~(window.innerHeight / renderRowPresets.minHeight)], renderBuffer: [0, 10] })
    const configProvider = inject('configProvider', defaultConfigProvider)

    const columnRowAttrs: Ref<HTMLAttributes[]> = ref([])
    const columnCellAttrs: Ref<HTMLAttributes[][]> = ref([])
    const columnCellRender: Ref<Array<Array<any>>> = ref([])

    const dataColumns: Ref<DeepReadonly<STableColumnType>[]> = ref([])
    const tempColumns: Ref<STablePartColumnType[]> = ref([])
    const listColumns: Ref<STableColumnTypes[]> = ref([])
    const treeColumns: Ref<STableColumnType[]> = ref([])

    const recordRowAttrs: Ref<Array<HTMLAttributes>> = ref([])
    const recordRowStates: Ref<ReturnType<STableCustomBodyerRowStates>[]> = ref([])
    const recordCellProps: Ref<Record<string, Exclude<ReturnType<STableBodyerCellRender>, VNode>['props']>[]> = ref([])
    const recordCellAttrs: Ref<Record<string, HTMLAttributes>[]> = ref([])
    const recordCellRender: Ref<Array<Record<string, any>>> = ref([])
    const cacherDataSources: Ref<Array<STableRecordType>> = ref([])
    const recordDataSources: Ref<STableWrapRecordType[]> = ref([])
    const recordDataRowKeys: Ref<STableKey[]> = ref([])

    const columnSettingAllKeys: Ref<string[]> = ref([])
    const columnSettingAllTrees: Ref<STableSettingsType[]> = ref([])
    const columnSettingCheckKeys: Ref<string[]> = ref([])

    const selectedRowKeys: Ref<Array<STableKey>> = ref(props.selectedRowKeys)
    const expandedRowKeys: Ref<Array<STableKey>> = ref(props.expandedRowKeys)

    const Normalizer = {
      size: computed(() => {
        return props.size || (configProvider.componentSize === 'large' ? 'default' : configProvider.componentSize)
      }),

      sticky: computed(() => ({
        stickyHeader: props.sticky.stickyHeader ?? true,
        stickyFooter: props.sticky.stickyFooter ?? true,
        stickyRightScrollbar: props.sticky.stickyRightScrollbar ?? true,
        stickyBottomScrollbar: props.sticky.stickyBottomScrollbar ?? true
      })),

      scroll: computed(() => ({
        x: props.scroll.x ?? false,
        y: props.scroll.y ?? false,
        scrollToFirstXOnChange: props.scroll.scrollToFirstXOnChange !== false,
        scrollToFirstYOnChange: props.scroll.scrollToFirstYOnChange !== false,
        getScrollResizeContainer: props.scroll.getScrollResizeContainer
      }))
    }

    const Paginator = {
      paginate: reactive({
        showTotal: helper.isNotEmptyObject(props.pagination) ? props.pagination.showTotal : undefined,
        hideOnSinglePage: helper.isNotEmptyObject(props.pagination) ? props.pagination.hideOnSinglePage !== false : true,
        defaultPageSize: helper.isNotEmptyObject(props.pagination) && props.pagination.defaultPageSize || 20,
        pageSizeOptions: helper.isNotEmptyObject(props.pagination) && props.pagination.pageSizeOptions || [10, 20, 25, 30, 50, 100, 200, 300, 500],
        showSizeChanger: helper.isNotEmptyObject(props.pagination) ? props.pagination.showSizeChanger : undefined,
        showQuickJumper: helper.isNotEmptyObject(props.pagination) ? props.pagination.showQuickJumper === true : false,
        showLessItems: helper.isNotEmptyObject(props.pagination) ? props.pagination.showLessItems === true : false,
        totalSize: helper.isNotEmptyObject(props.pagination) && props.pagination.totalSize || 0,
        totalPage: helper.isNotEmptyObject(props.pagination) && props.pagination.totalPage || 0,
        pageSize: helper.isNotEmptyObject(props.pagination) && (props.pagination.pageSize || props.pagination.defaultPageSize) || 20,
        pageNo: helper.isNotEmptyObject(props.pagination) && props.pagination.pageNo || 1,
        simple: helper.isNotEmptyObject(props.pagination) ? props.pagination.simple === true : false,
        visible: helper.isNotEmptyObject(props.pagination) ? props.pagination.visible === true : helper.isBoolean(props.pagination) ? props.pagination : false,
        size: helper.isNotEmptyObject(props.pagination) && props.pagination.size || (Normalizer.size.value === 'small' ? 'small' : 'default'),
        mode: helper.isNotEmptyObject(props.pagination) ? props.pagination.mode ?? 'remote' : 'local'
      }),
      update: (paginate: STablePartPagination) => {
        Paginator.paginate.mode = paginate.mode ?? Paginator.paginate.mode
        Paginator.paginate.size = paginate.size ?? Paginator.paginate.size
        Paginator.paginate.simple = paginate.simple ?? Paginator.paginate.simple
        Paginator.paginate.visible = paginate.visible ?? Paginator.paginate.visible
        Paginator.paginate.showTotal = paginate.showTotal ?? Paginator.paginate.showTotal
        Paginator.paginate.showLessItems = paginate.showLessItems ?? Paginator.paginate.showLessItems
        Paginator.paginate.defaultPageSize = paginate.defaultPageSize ?? Paginator.paginate.defaultPageSize
        Paginator.paginate.pageSizeOptions = paginate.pageSizeOptions ?? Paginator.paginate.pageSizeOptions
        Paginator.paginate.showSizeChanger = paginate.showSizeChanger ?? Paginator.paginate.showSizeChanger
        Paginator.paginate.showQuickJumper = paginate.showQuickJumper ?? Paginator.paginate.showQuickJumper
        Paginator.paginate.hideOnSinglePage = paginate.hideOnSinglePage ?? Paginator.paginate.hideOnSinglePage
        Paginator.paginate.pageNo = paginate.pageNo || paginate.pageNo === 0 ? ~~paginate.pageNo : Paginator.paginate.pageNo
        Paginator.paginate.pageSize = paginate.pageSize || paginate.pageSize === 0 ? ~~paginate.pageSize : Paginator.paginate.pageSize
        Paginator.paginate.totalSize = paginate.totalSize || paginate.totalSize === 0 ? ~~paginate.totalSize : Paginator.paginate.totalSize
        Paginator.paginate.totalPage = paginate.totalPage || paginate.totalPage === 0 ? ~~paginate.totalPage : (~~(Paginator.paginate.totalSize / Paginator.paginate.pageSize) + (Paginator.paginate.totalSize % Paginator.paginate.pageSize ? 1 : 0))
        Paginator.paginate.pageNo = Paginator.paginate.pageNo <= Paginator.paginate.totalPage ? Paginator.paginate.pageNo : Paginator.paginate.totalPage
        Paginator.paginate.pageNo = Paginator.paginate.pageNo > 0 ? Paginator.paginate.pageNo : 1
      }
    }

    const Optionser = {
      scrollTop: ref(0),
      scrollLeft: ref(0),
      windowInnerWidth: ref(window.innerWidth),
      windowInnerHeight: ref(window.innerHeight),
      scrollResizeWidth: ref(0),
      scrollResizeHeight: ref(0)
    }

    const Computer = {
      isFixedTop: computed(() => {
        return Normalizer.scroll.value.y !== false
          ? /^[+-]?\d+\.?\d*(px)?$/.test(String(Normalizer.scroll.value.y))
          : false
      }),
      isFixedLeft: computed(() => {
        for (const columns of listColumns.value) {
          for (const column of columns) {
            if (column.colSpan > 0 && column.rowSpan > 0 && column.fixed === 'left') {
              return true
            }
          }
        }
        return false
      }),
      isFixedRight: computed(() => {
        for (const columns of listColumns.value) {
          for (const column of columns) {
            if (column.colSpan > 0 && column.rowSpan > 0 && column.fixed === 'right') {
              return true
            }
          }
        }
        return false
      }),
      fixedLeftIndex: computed(() => {
        const indexs: number[] = []

        for (const columns of listColumns.value) {
          for (const column of columns) {
            if (column.colSpan > 0 && column.rowSpan > 0 && column.fixed === 'left') {
              indexs.push(column.colIndex + column.colSpan - 1)
            }
          }
        }

        return indexs.length > 0 ? Math.max(...indexs) : -1
      }),
      fixedRightIndex: computed(() => {
        const indexs: number[] = []

        for (const columns of listColumns.value) {
          for (const column of columns) {
            if (column.colSpan > 0 && column.rowSpan > 0 && column.fixed === 'right') {
              indexs.push(column.colIndex)
            }
          }
        }

        indexs.splice(0, indexs.length, ...indexs.filter(index => index > Computer.fixedLeftIndex.value))

        return indexs.length > 0 ? Math.min(...indexs) : -1
      }),
      tableBodyWidth: computed(() => {
        const x = Normalizer.scroll.value.x

        if (/^\+?\d+\.?\d*$/.test(String(x))) {
          return x + 'px'
        }

        if (typeof x === 'string') {
          return x || '100%'
        }

        return '100%'
      }),
      tableBodyHeight: computed(() => {
        const y = Normalizer.scroll.value.y
        const paginate = Paginator.paginate
        const pageHide = paginate.visible === false || (paginate.totalPage <= 1 && paginate.hideOnSinglePage)
        const pageHeight = paginate.size === 'small' || paginate.simple ? 36 : 44
        const resizeHeight = Optionser.scrollResizeHeight.value
        const windowHeight = Optionser.windowInnerHeight.value

        if (/^0$|^-\d+\.?\d*$/.test(String(y))) {
          return pageHide
            ? (resizeHeight || windowHeight) + parseInt(String(y)) + 'px'
            : (resizeHeight || windowHeight) + parseInt(String(y)) - pageHeight + 'px'
        }

        if (/^\d+\.?\d*$/.test(String(y))) {
          return !pageHide
            ? parseInt(String(y)) + 'px'
            : parseInt(String(y)) - pageHeight + 'px'
        }

        if (typeof y === 'string') {
          return y || 'auto'
        }

        return 'auto'
      }),
      filterRangeSources: computed(() => {
        const renderBufferOne = renderRowRanger.renderBuffer[0]
        const renderBufferTwo = renderRowRanger.renderBuffer[1]
        const renderOffsetOne = renderRowRanger.renderOffset[0]
        const renderOffsetTwo = renderRowRanger.renderOffset[1]
        const renderRangerOne = renderOffsetOne - renderBufferOne > 0 ? renderOffsetOne - renderBufferOne : 0
        const renderRangerTwo = renderOffsetTwo + renderBufferTwo < recordDataSources.value.length ? renderOffsetTwo + renderBufferTwo : recordDataSources.value.length

        const filterByExpaned = (record: STableWrapRecordType) => {
          return record.parentKeys.every(key => expandedRowKeys.value.includes(key))
        }

        const filterByRangeBuf = (record: STableWrapRecordType, index: number) => {
          return index >= renderRangerOne && index <= renderRangerTwo
        }

        return recordDataSources.value.filter(filterByExpaned).filter(filterByRangeBuf)
      })
    }

    const Methoder = {
      isOwnProperty(obj: Record<string, any>, keys: Array<string | number>) {
        for (const key of keys) {
          if (!helper.isNotEmptyArray(obj) && !helper.isNotEmptyObject(obj)) {
            return false
          }

          if (!Object.hasOwn(obj, key)) {
            return false
          }

          obj = (obj as any)[key]
        }

        return true
      },

      isColumnChanged(propColumns: STablePartColumnType[], tempColumns: STablePartColumnType[]) {
        return !helper.toDeepEqual(propColumns, tempColumns, {
          filter: [
            'key',
            'title',
            'dataIndex',
            'children',
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
      },

      isSourcesChanged(propSources: STableRecordType[], cacheSources: STableRecordType[]) {
        if (propSources.length !== cacheSources.length) {
          return true
        }

        for (const index of propSources.keys()) {
          let chenged = false
          let treeKey = 'children'
          let rowKey = 'key'

          const propSource = propSources[index]
          const cacheSource = propSources[index]

          treeKey = helper.isFunction(props.treeKey) ? props.treeKey(propSource) : treeKey
          treeKey = helper.isNotEmptyString(props.treeKey) ? props.treeKey : treeKey
          treeKey = helper.isNotEmptyString(treeKey) ? treeKey.trim() : 'children'

          rowKey = helper.isFunction(props.rowKey) ? props.rowKey(propSource) : rowKey
          rowKey = helper.isNotEmptyString(props.rowKey) ? props.rowKey : rowKey
          rowKey = helper.isNotEmptyString(rowKey) ? rowKey.trim() : 'key'

          if (propSource[rowKey] !== cacheSource[rowKey]) {
            return true
          }

          if (Array.isArray(propSource[treeKey]) && Array.isArray(cacheSource[treeKey])) {
            chenged = Methoder.isSourcesChanged(propSource[treeKey], cacheSource[treeKey])
          }

          if (!Array.isArray(propSource[treeKey]) || !Array.isArray(cacheSource[treeKey])) {
            const propChildrenIsNullable = propSource[treeKey] === null || propSource[treeKey] === undefined
            const cacheChildrenIsNullable = cacheSource[treeKey] === null || cacheSource[treeKey] === undefined

            if (!propChildrenIsNullable || !cacheChildrenIsNullable) {
              chenged = propSource[treeKey] !== cacheSource[treeKey]
            }
          }

          if (chenged) {
            return true
          }
        }

        return false
      },

      normalizeTreeColumns(columns: STablePartColumnType[], parent?: STableColumnType) {
        return columns.map((item, colIndex) => {
          const column: STableColumnType = {
            key: item.key || (helper.isArray(item.dataIndex) ? item.dataIndex.join('.') : item.dataIndex),
            title: item.title,
            parentKey: parent ? parent.key : '',
            dataIndex: item.dataIndex,
            children: [],
            align: item.align || 'left',
            fixed: item.fixed || false,
            width: item.width,
            minWidth: item.minWidth,
            maxWidth: item.maxWidth,
            resizable: item.resizable || false,
            ellipsis: item.ellipsis || false,
            colMax: 1,
            rowMax: parent ? parent.rowIndex + 1 : 1,
            colSpan: item.colSpan || NaN,
            rowSpan: item.rowSpan || NaN,
            colIndex: colIndex + 1,
            rowIndex: parent ? parent.rowIndex + 1 : 1,
            sorter: item.sorter || false,
            sortered: false,
            sortDirections: item.sortDirections || parent?.sortDirections,
            sorterField: item.sorterField ?? item.dataIndex,
            defaultSorterValue: item.defaultSorterValue || '',
            currentSorterValue: '',
            activedSorterValues: [] as Array<{ field: string | string[]; value: 'ascend'| 'descend' }>,
            sorterValueChange: item.sorterValueChange,
            customBodyerCellAttrs: item.customBodyerCellAttrs,
            customHeaderCellAttrs: item.customHeaderCellAttrs,
            customHeaderCellRender: item.customHeaderCellRender,
            customBodyerCellRender: item.customBodyerCellRender
          }

          if (helper.isNotEmptyArray(item.children)) {
            column.children = Methoder.normalizeTreeColumns(item.children, column)
            column.rowMax = Math.max(...column.children.map(child => child.rowMax))
            column.colMax = column.children.reduce((colMax, child) => colMax + child.colMax, 0)
          }

          return column
        })
      },

      normalizeListColumns(columns: STableColumnType[], arrays: STableColumnTypes[] = []) {
        for (const column of columns) {
          const colIndex = column.colIndex - 1
          const rowIndex = column.rowIndex - 1

          arrays[rowIndex] = arrays[rowIndex] || []
          arrays[rowIndex][colIndex] = column

          if (helper.isNotEmptyArray(column.children)) {
            Methoder.normalizeListColumns(column.children, arrays)
          }
        }

        return arrays
      },

      normalizeTreeSetting(columns: STableColumnType[], settings?: STableSettingsType[]) {
        settings = settings || columnSettingAllTrees.value

        for (const column of columns) {
          const setting = {
            key: column.key,
            title: column.title,
            children: []
          }

          if (helper.isNotEmptyArray(column.children)) {
            Methoder.normalizeTreeSetting(column.children, setting.children)
          }

          if (!columnSettingAllKeys.value.includes(column.key)) {
            columnSettingCheckKeys.value.push(column.key)
            columnSettingAllKeys.value.push(column.key)
          }

          settings.push(setting)
        }

        return settings
      },

      normalizeDataColumns(arrays: STableColumnTypes[]) {
        const dataColumns: DeepReadonly<STableColumnType>[] = []

        for (const columns of arrays) {
          for (const column of columns) {
            if (column.rowIndex === column.colMax) {
              dataColumns[column.colIndex] = readonly(column)
            }
          }
        }

        return dataColumns
      },

      normalizeTempColumns(arrays: STablePartColumnType[]) {
        const tempColumns: STablePartColumnType[] = []

        for (const column of arrays) {
          tempColumns.push({
            ...column,
            children: helper.isArray(column.children)
              ? Methoder.normalizeTempColumns(column.children)
              : []
          })
        }

        return tempColumns
      },

      normalizeRecordSources(sources: STableRecordType[], wrapRecords: STableWrapRecordType[] = [], parent?: STableWrapRecordType) {
        const TempCacher = {
          offset: 0,
          childKeys: [] as STableKey[]
        }

        for (const [index, source] of sources.entries()) {
          let rowKey = 'key'
          let treeKey = 'children'

          TempCacher.offset = TempCacher.offset + index

          rowKey = helper.isFunction(props.rowKey) ? props.rowKey(source) : rowKey
          rowKey = helper.isNotEmptyString(props.rowKey) ? props.rowKey : rowKey
          rowKey = helper.isNotEmptyString(rowKey) ? rowKey.trim() : 'key'

          treeKey = helper.isFunction(props.treeKey) ? props.treeKey(source) : treeKey
          treeKey = helper.isNotEmptyString(props.treeKey) ? props.treeKey : treeKey
          treeKey = helper.isNotEmptyString(treeKey) ? treeKey.trim() : 'children'

          const cacheRecord = recordDataSources.value.find(wrap => wrap.rowRecordSource === source)

          const wrapRecord: STableWrapRecordType = {
            key: source[rowKey],
            childKeys: [],
            parentKeys: parent ? [...parent.parentKeys, parent.key] : [],
            rowGroupLevel: parent ? parent.rowGroupLevel + 1 : 1,
            rowGroupIndex: parent ? parent.rowGroupIndex : index,
            rowGroupIndexs: parent ? [...parent.rowGroupIndexs, index] : [index],
            rowGlobalIndex: TempCacher.offset,
            rowRecordSource: readonly(source),
            rowTreeKeyField: treeKey,
            rowKeyField: rowKey,
            rowHeight: cacheRecord ? cacheRecord.rowHeight : renderRowPresets.minHeight
          }

          if (helper.isNotEmptyArray(source[wrapRecord.rowTreeKeyField])) {
            const trees = Methoder.normalizeRecordSources(source[wrapRecord.rowTreeKeyField], wrapRecords, wrapRecord)
            const childKeys = [...trees.map(tree => tree.key), ...trees.map(tree => tree.childKeys).flat()]

            TempCacher.offset = wrapRecord.rowGlobalIndex + childKeys.length
            TempCacher.childKeys = [...TempCacher.childKeys, ...childKeys]
            wrapRecord.childKeys = childKeys
          }

          if (!recordDataRowKeys.value.includes(wrapRecord.key)) {
            props.defaultSelectAllRows && !selectedRowKeys.value.includes(wrapRecord.key) && selectedRowKeys.value.push(wrapRecord.key)
            props.defaultExpandAllRows && !expandedRowKeys.value.includes(wrapRecord.key) && expandedRowKeys.value.push(wrapRecord.key)
            recordDataRowKeys.value.push(wrapRecord.key)
          }

          wrapRecords.push(wrapRecord)
        }

        return wrapRecords
      },

      normalizeCacherSources(records: STableRecordType[] = []) {
        const cacherColumns: STableRecordType[] = []

        for (const record of records) {
          const cacheRecord = recordDataSources.value.find(wrap => wrap.rowRecordSource === record)
          const cacheTreeKey = cacheRecord ? cacheRecord.rowTreeKeyField : 'children'

          cacherColumns.push({
            ...record,
            [cacheTreeKey]: helper.isArray(record[cacheTreeKey])
              ? Methoder.normalizeTempColumns(record[cacheTreeKey])
              : record[cacheTreeKey]
          })
        }

        return cacherColumns
      },

      normalizeInitColumns(arrays: STableColumnTypes[]) {
        for (const [rowIndex, columns] of arrays.entries()) {
          if (helper.isFunction(props.customHeaderRowAttrs)) {
            columnRowAttrs.value[rowIndex] = columnRowAttrs.value[rowIndex] || props.customHeaderRowAttrs({ columns: readonly(columns), rowIndex })
          }
        }

        for (const [rowIndex, columns] of arrays.entries()) {
          for (const [colIndex, column] of columns.entries()) {
            column.colSpan = Number.isFinite(column.colSpan) ? column.colSpan : column.colMax
            column.rowSpan = Number.isFinite(column.rowSpan) ? column.rowSpan : column.rowIndex < column.rowMax ? 1 : arrays.length - column.rowMax + 1

            if (helper.isFunction(column.customHeaderCellAttrs)) {
              columnCellAttrs.value[rowIndex] = columnCellAttrs.value[rowIndex] || []
              columnCellAttrs.value[rowIndex][colIndex] = columnCellAttrs.value[rowIndex][colIndex] || column.customHeaderCellAttrs({ column: readonly(column), rowIndex, colIndex })
            }

            if (helper.isFunction(column.customHeaderCellRender)) {
              if (!Methoder.isOwnProperty(columnCellRender.value, [rowIndex, colIndex])) {
                const renderNode = column.customHeaderCellRender({ title: column.title, column: readonly(column), rowIndex, colIndex })
                columnCellRender.value[rowIndex] = helper.isArray(columnCellRender.value[rowIndex]) ? columnCellRender.value[rowIndex] : []
                columnCellRender.value[rowIndex][colIndex] = helper.isObject(renderNode) ? (isVNode(renderNode) ? renderNode : renderNode.children) : undefined

                if (helper.isObject(renderNode) && !isVNode(renderNode) && helper.isNotEmptyObject(renderNode.props)) {
                  column.align = Object.hasOwn(renderNode.props, 'align') ? renderNode.props.align || 'left' : column.align
                  column.fixed = Object.hasOwn(renderNode.props, 'fixed') ? renderNode.props.fixed || false : column.fixed
                  column.width = Object.hasOwn(renderNode.props, 'width') ? renderNode.props.width || undefined : column.width
                  column.minWidth = Object.hasOwn(renderNode.props, 'minWidth') ? renderNode.props.minWidth || undefined : column.minWidth
                  column.maxWidth = Object.hasOwn(renderNode.props, 'maxWidth') ? renderNode.props.maxWidth || undefined : column.maxWidth
                  column.resizable = Object.hasOwn(renderNode.props, 'resizable') ? renderNode.props.resizable || false : column.resizable
                  column.ellipsis = Object.hasOwn(renderNode.props, 'ellipsis') ? renderNode.props.ellipsis || false : column.ellipsis
                  column.colSpan = Object.hasOwn(renderNode.props, 'colSpan') ? helper.isFiniteNumber(renderNode.props.colSpan) ? renderNode.props.colSpan : column.colSpan : column.colSpan
                  column.rowSpan = Object.hasOwn(renderNode.props, 'rowSpan') ? helper.isFiniteNumber(renderNode.props.rowSpan) ? renderNode.props.rowSpan : column.rowSpan : column.rowSpan
                  column.sorter = Object.hasOwn(renderNode.props, 'sorter') ? renderNode.props.sorter || false : column.sorter
                  column.sorterField = Object.hasOwn(renderNode.props, 'sorterField') ? renderNode.props.sorterField || '' : column.sorterField
                  column.sortDirections = Object.hasOwn(renderNode.props, 'sortDirections') ? renderNode.props.sortDirections || undefined : column.sortDirections
                }
              }
            }
          }
        }

        return arrays
      },

      normalizeInitSources(sources: STableWrapRecordType[]) {
        for (const option of sources) {
          const record = option.rowRecordSource
          const rowIndex = option.rowGroupIndex
          const groupLevel = option.rowGroupLevel
          const groupIndex = option.rowGroupIndex
          const groupIndexs = option.rowGroupIndexs
          const globalIndex = option.rowGlobalIndex

          if (helper.isFunction(props.customBodyerRowAttrs)) {
            recordRowAttrs.value[globalIndex] = recordRowAttrs.value[globalIndex] || props.customBodyerRowAttrs({ record, rowIndex, groupIndex, groupLevel, groupIndexs, globalIndex })
          }

          if (helper.isFunction(props.customBodyerRowStates)) {
            recordRowStates.value[globalIndex] = recordRowStates.value[globalIndex] || props.customBodyerRowStates({ record, rowIndex, groupIndex, groupLevel, groupIndexs, globalIndex })
          }
        }

        for (const column of dataColumns.value) {
          const columnKey = column.key
          const dataIndex = column.dataIndex

          for (const option of sources) {
            const record = option.rowRecordSource
            const rowIndex = option.rowGroupIndex
            const groupLevel = option.rowGroupLevel
            const groupIndex = option.rowGroupIndex
            const groupIndexs = option.rowGroupIndexs
            const globalIndex = option.rowGlobalIndex

            if (helper.isFunction(column.customBodyerCellAttrs)) {
              recordCellAttrs.value[globalIndex] = recordCellAttrs.value[globalIndex] || []
              recordCellAttrs.value[globalIndex][columnKey] = recordCellAttrs.value[globalIndex][columnKey] || column.customBodyerCellAttrs({ record, column, rowIndex, groupIndex, groupLevel, groupIndexs, globalIndex })
            }

            if (helper.isFunction(column.customBodyerCellRender)) {
              if (!Methoder.isOwnProperty(recordCellProps.value, [globalIndex, columnKey])) {
                let index = 0
                let value

                value = helper.isArray(dataIndex) && helper.isObject(option.rowRecordSource) ? record[dataIndex[index++]] : value
                value = helper.isNotEmptyString(dataIndex) ? record[dataIndex] : value

                if (helper.isArray(dataIndex)) {
                  while (index < dataIndex.length) {
                    if (!helper.isArray(value) || !helper.isObject(value)) {
                      value = undefined
                      break
                    }
                    value = value[column.dataIndex[index++]]
                  }
                }

                const renderNode = column.customBodyerCellRender({
                  value,
                  record,
                  column,
                  rowIndex,
                  groupIndex,
                  groupLevel,
                  groupIndexs,
                  globalIndex
                })

                recordCellProps.value[globalIndex] = helper.isObject(recordCellProps.value[globalIndex]) ? recordCellProps.value[globalIndex] : {}
                recordCellRender.value[globalIndex] = helper.isObject(columnCellRender.value[globalIndex]) ? columnCellRender.value[globalIndex] : {}
                recordCellRender.value[globalIndex][columnKey] = helper.isObject(renderNode) ? (isVNode(renderNode) ? renderNode : renderNode.children) : undefined
                recordCellProps.value[globalIndex][columnKey] = helper.isObject(renderNode) ? (!isVNode(renderNode) && renderNode.props || undefined) : undefined
              }
            }
          }
        }
      },

      updatePropSelectedRowKeys(keys: STableKey[]) {
        keys = Array.from(new Set(keys))

        if (!keys.every(key => props.selectedRowKeys.includes(key)) || !props.selectedRowKeys.every(key => keys.includes(key))) {
          context.emit('update:selectedRowKeys', keys)
        }
      },

      updatePropExpandedRowKeys(keys: STableKey[]) {
        keys = Array.from(new Set(keys))

        if (!keys.every(key => props.expandedRowKeys.includes(key)) || !props.expandedRowKeys.every(key => keys.includes(key))) {
          context.emit('update:expandedRowKeys', keys)
        }
      },

      updateSelectedRowKeys(keys: STableKey[]) {
        keys = Array.from(new Set(keys))

        if (!keys.every(key => selectedRowKeys.value.includes(key)) || !selectedRowKeys.value.every(key => keys.includes(key))) {
          selectedRowKeys.value = keys
          Methoder.cleanSelectedRowKeys()
        }
      },

      updateExpandedRowKeys(keys: STableKey[]) {
        keys = Array.from(new Set(keys))

        if (!keys.every(key => expandedRowKeys.value.includes(key)) || !expandedRowKeys.value.every(key => keys.includes(key))) {
          expandedRowKeys.value = keys
          Methoder.cleanExpandedRowKeys()
        }
      },

      cleanSelectedRowKeys() {
        if (props.selectedMode === 'Radio' && selectedRowKeys.value.length > 1) {
          selectedRowKeys.value = selectedRowKeys.value.filter(key => props.preserveSelectedRowKeys || recordDataRowKeys.value.includes(key)).filter((_, index) => index < 1)
        }

        if (!props.preserveSelectedRowKeys && !selectedRowKeys.value.every(key => recordDataRowKeys.value.includes(key))) {
          selectedRowKeys.value = selectedRowKeys.value.filter(key => recordDataRowKeys.value.includes(key))
        }
      },

      cleanExpandedRowKeys() {
        if (!props.preserveExpandedRowKeys && !expandedRowKeys.value.every(key => recordDataRowKeys.value.includes(key))) {
          expandedRowKeys.value = expandedRowKeys.value.filter(key => recordDataRowKeys.value.includes(key))
        }
      },

      updateResizeContainer() {
        if (Normalizer.scroll.value.getScrollResizeContainer) {
          const container = Normalizer.scroll.value.getScrollResizeContainer()
          const clientRect = container && container.getBoundingClientRect()
          Optionser.scrollResizeWidth.value = clientRect ? clientRect.width : 0
          Optionser.scrollResizeHeight.value = clientRect ? clientRect.height : 0
        }
      },

      forceUpdate() {
        // Update Columns
        columnRowAttrs.value = []
        columnCellAttrs.value = []
        columnCellRender.value = []
        columnSettingAllTrees.value = []
        treeColumns.value = Methoder.normalizeTreeColumns(props.columns)
        listColumns.value = Methoder.normalizeListColumns(treeColumns.value)
        dataColumns.value = Methoder.normalizeDataColumns(listColumns.value)
        tempColumns.value = Methoder.normalizeTempColumns(props.columns)
        Methoder.normalizeTreeSetting(treeColumns.value)
        Methoder.normalizeInitColumns(listColumns.value)

        // Update DataSources
        recordRowAttrs.value = []
        recordRowStates.value = []
        recordCellProps.value = []
        recordCellAttrs.value = []
        recordCellRender.value = []
        recordDataSources.value = Methoder.normalizeRecordSources(props.dataSource, [])
        cacherDataSources.value = Methoder.normalizeCacherSources(props.dataSource)
        Methoder.normalizeInitSources(Computer.filterRangeSources.value)

        // Update Clean
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
        Methoder.updateResizeContainer()
      })
    }

    watch([() => props.columns, () => props.dataSource], () => {
      const columnsChanged = Methoder.isColumnChanged(props.columns, tempColumns.value)
      const sourcesChanged = Methoder.isSourcesChanged(props.dataSource, cacherDataSources.value)
      const sourcesReseted = sourcesChanged && Methoder.isSourcesChanged(props.dataSource.slice(0, cacherDataSources.value.length), cacherDataSources.value)

      if (columnsChanged) {
        columnRowAttrs.value = []
        columnCellAttrs.value = []
        columnCellRender.value = []
        columnSettingAllTrees.value = []
        treeColumns.value = Methoder.normalizeTreeColumns(props.columns)
        listColumns.value = Methoder.normalizeListColumns(treeColumns.value)
        dataColumns.value = Methoder.normalizeDataColumns(listColumns.value)
        tempColumns.value = Methoder.normalizeTempColumns(props.columns)
        Methoder.normalizeTreeSetting(treeColumns.value)
        Methoder.normalizeInitColumns(listColumns.value)
      }

      if (sourcesReseted) {
        recordRowAttrs.value = []
        recordRowStates.value = []
        recordCellProps.value = []
        recordCellAttrs.value = []
        recordCellRender.value = []
      }

      if (sourcesChanged) {
        recordDataSources.value = Methoder.normalizeRecordSources(props.dataSource, [])
        cacherDataSources.value = Methoder.normalizeCacherSources(props.dataSource)
        Methoder.cleanSelectedRowKeys()
        Methoder.cleanExpandedRowKeys()
      }
    }, watchDeepOptions)

    watch(() => props.selectedMode, () => { selectedRowKeys.value = [] })
    watch(() => [...props.selectedRowKeys], () => { Methoder.updateSelectedRowKeys(props.selectedRowKeys) })
    watch(() => [...props.expandedRowKeys], () => { Methoder.updateExpandedRowKeys(props.expandedRowKeys) })
    watch(() => [...selectedRowKeys.value], () => { Methoder.updatePropSelectedRowKeys(selectedRowKeys.value) })
    watch(() => [...expandedRowKeys.value], () => { Methoder.updatePropExpandedRowKeys(expandedRowKeys.value) })
    watch(() => [...Computer.filterRangeSources.value], () => { Methoder.normalizeInitSources(Computer.filterRangeSources.value) })

    onMounted(() => {
      Observer.resizeObserver.observe(Normalizer.scroll.value.getScrollResizeContainer?.() || document.documentElement)
    })

    return () => (
      <div class='s-table-container'/>
    )
  }
})

export default STable
