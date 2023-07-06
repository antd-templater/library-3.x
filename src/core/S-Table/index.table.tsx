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
  (record: RecordType): string
}

export interface STableRowChildren<RecordType = STableRecordType> {
  (record: RecordType): string
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
  (option: { value: any; record: RecordType; rowIndex: number; column: DeepReadonly<STableColumnType<RecordType>>; }): VNode | {
    props?: {
      align?: 'left' | 'center' | 'right';
      ellipsis?: boolean;
    };
    children?: any;
  };
}

export interface STableBodyerExpandRender<RecordType = STableRecordType> {
  (option: { record: RecordType; rowIndex: number; expanded: boolean; }): VNode;
}

export interface STableCustomHeaderRowAttrs<RecordType = STableRecordType> {
  (options: { columns: DeepReadonly<STableColumnType<RecordType>[]>; rowIndex: number; }): HTMLAttributes;
}

export interface STableCustomBodyerRowAttrs<RecordType = STableRecordType> {
  (options: { record: RecordType; rowIndex: number; }): HTMLAttributes;
}

export interface STableCustomBodyerRowStates<RecordType = STableRecordType> {
  (options: { record: RecordType; rowIndex: number; }): {
    draggable?: boolean;
    selectable?: boolean;
    expandable?: boolean;
  };
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
  customBodyerCellAttrs?: (option: { record: RecordType, rowIndex: number; column: DeepReadonly<STableColumnType<RecordType>>; }) => HTMLAttributes;
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
  customBodyerCellAttrs?: (option: { record: RecordType, rowIndex: number; column: DeepReadonly<STableColumnType<RecordType>>; }) => HTMLAttributes;
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
    rowChildren: VueTypes.any<string | STableRowChildren>().def('children'),
    headerCell: VueTypes.func<STableHeaderCellRender>().def(undefined),
    bodyerCell: VueTypes.func<STableBodyerCellRender>().def(undefined),
    sticky: VueTypes.object<STablePartStickyType>().def(() => ({})),
    scroll: VueTypes.object<STablePartScrollType>().def(() => ({})),
    columns: VueTypes.array<STablePartColumnType>().isRequired,
    loadData: VueTypes.func<STableLoadSources>().def(undefined),
    dataSource: VueTypes.array<STableRecordType>().def(() => []),
    pagination: VueTypes.any<STablePartPagination | boolean>().def(false),
    customHeaderRowAttrs: VueTypes.func<STableCustomHeaderRowAttrs>().def(undefined),
    custombodyerRowAttrs: VueTypes.func<STableCustomBodyerRowAttrs>().def(undefined),
    customBodyerRowStates: VueTypes.func<STableCustomBodyerRowStates>().def(undefined),
    selectedRowMode: VueTypes.string<'Radio' | 'Checkbox'>().def('Checkbox'),
    selectedRowKeys: VueTypes.array<STableKey>().def(() => []),
    expandedRowKeys: VueTypes.array<STableKey>().def(() => []),
    preserveSelectedRowKeys: VueTypes.bool().def(false),
    preserveExpandedRowKeys: VueTypes.bool().def(false),
    defaultSelectStrictly: VueTypes.bool().def(true),
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
    const renderRowRanger = reactive({ rowOffset: [0, 0], rowBuffer: [0, 0] })
    const configProvider = inject('configProvider', defaultConfigProvider)

    const columnRowAttrs: Ref<HTMLAttributes[]> = ref([])
    const columnCellAttrs: Ref<HTMLAttributes[][]> = ref([])
    const columnCellRender: Ref<Array<Array<any>>> = ref([])

    const listColumns: Ref<STableColumnTypes[]> = ref([])
    const treeColumns: Ref<STableColumnType[]> = ref([])
    const dataColumns: Ref<STableColumnType[]> = ref([])

    const recordRowAttrs: Ref<Array<HTMLAttributes>> = ref([])
    const recordRowStates: Ref<ReturnType<STableCustomBodyerRowStates>[]> = ref([])
    const recordCellProps: Ref<Record<string, Exclude<ReturnType<STableBodyerCellRender>, VNode>['props']>[]> = ref([])
    const recordCellAttrs: Ref<Record<string, HTMLAttributes>[]> = ref([])
    const recordCellRender: Ref<Record<string, any>[]> = ref([])
    const recordDataSources: Ref<STableRecordType[]> = ref([])
    const recordDataRowKeys: Ref<STableKey[]> = ref([])

    const columnSettingsAllKeys: Ref<string[]> = ref([])
    const columnSettingsCheckKeys: Ref<string[]> = ref([])
    const columnSettingsCheckTrees: Ref<STableSettingsType[]> = ref([])

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
      })
    }

    const Methoder = {
      isOwnProperty(obj: Record<string, any>, keys: string[]) {
        for (const key of keys) {
          if (!helper.isNotEmptyObject(obj)) {
            return false
          }

          if (!Object.hasOwn(obj, key)) {
            return false
          }

          obj = obj[key] as any
        }

        return helper.isNotEmptyArray(keys)
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

      normalizeTreeSettings(columns: STableColumnType[], settings?: STableSettingsType[]) {
        settings = settings || columnSettingsCheckTrees.value

        for (const column of columns) {
          const setting = {
            key: column.key,
            title: column.title,
            children: []
          }

          if (helper.isNotEmptyArray(column.children)) {
            Methoder.normalizeTreeSettings(column.children, setting.children)
          }

          if (!columnSettingsAllKeys.value.includes(column.key)) {
            columnSettingsCheckKeys.value.push(column.key)
            columnSettingsAllKeys.value.push(column.key)
          }

          settings.push(setting)
        }

        return settings
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

      normalizeListSources(sources: STableRecordType[], records: STableRecordType[] = []) {
        for (const record of sources) {
          let childrenField = 'children'
          let childrenValue = null

          records.push(record)

          childrenField = helper.isFunction(props.rowChildren) ? props.rowChildren(record) || 'children' : childrenField
          childrenField = helper.isNotEmptyString(props.rowChildren) ? props.rowChildren : childrenField
          childrenField = helper.isNotEmptyString(childrenField) ? childrenField.trim() : 'children'
          childrenValue = record[childrenField]

          if (helper.isNotEmptyArray(childrenValue)) {
            Methoder.normalizeListSources(childrenValue, records)
          }
        }

        return records
      },

      normalizeDataColumns(arrays: STableColumnTypes[]) {
        const dataColumns: STableColumnType[] = []

        for (const columns of arrays) {
          for (const column of columns) {
            if (column.rowIndex === column.colMax) {
              dataColumns[column.colIndex] = column
            }
          }
        }

        return dataColumns
      },

      normalizeInitColumns(arrays: STableColumnTypes[]) {
        for (const [rowIndex, columns] of arrays.entries()) {
          for (const [colIndex, column] of columns.entries()) {
            column.colSpan = Number.isFinite(column.colSpan) ? column.colSpan : column.colMax
            column.rowSpan = Number.isFinite(column.rowSpan) ? column.rowSpan : column.rowIndex < column.rowMax ? 1 : arrays.length - column.rowMax + 1

            if (helper.isFunction(column.customHeaderCellAttrs)) {
              columnCellAttrs.value[rowIndex] = columnCellAttrs.value[rowIndex] || []
              columnCellAttrs.value[rowIndex][colIndex] = column.customHeaderCellAttrs({ column: readonly(column), rowIndex, colIndex })
            }

            if (helper.isFunction(column.customHeaderCellRender)) {
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

          if (helper.isFunction(props.customHeaderRowAttrs)) {
            columnRowAttrs.value[rowIndex] = props.customHeaderRowAttrs({ columns: readonly(columns), rowIndex })
          }
        }

        return arrays
      },

      normalizeInitSources(sources: STableRecordType[]) {
        for (const column of dataColumns.value) {
          for (const [rowIndex, record] of sources.entries()) {
            if (helper.isFunction(column.customBodyerCellAttrs)) {
              recordCellAttrs.value[rowIndex] = recordCellAttrs.value[rowIndex] || []
              recordCellAttrs.value[rowIndex][column.key] = column.customBodyerCellAttrs({ record, rowIndex, column: readonly(column) })
            }

            if (helper.isFunction(column.customBodyerCellRender)) {
              let index = 0
              let value = helper.isArray(column.dataIndex)
                ? helper.isObject(record) ? record : undefined
                : record[column.dataIndex]

              if (helper.isArray(column.dataIndex)) {
                while (index < column.dataIndex.length) {
                  if (!helper.isObject(value)) {
                    value = undefined
                    break
                  }
                  value = value[column.dataIndex[index++]]
                }
              }

              const renderNode = column.customBodyerCellRender({ value, record, rowIndex, column: readonly(column) })
              recordCellProps.value[rowIndex] = helper.isObject(recordCellProps.value[rowIndex]) ? recordCellProps.value[rowIndex] : {}
              recordCellRender.value[rowIndex] = helper.isObject(columnCellRender.value[rowIndex]) ? columnCellRender.value[rowIndex] : {}
              recordCellRender.value[rowIndex][column.key] = helper.isObject(renderNode) ? (isVNode(renderNode) ? renderNode : renderNode.children) : undefined
              recordCellProps.value[rowIndex][column.key] = helper.isObject(renderNode) ? (!isVNode(renderNode) && renderNode.props || undefined) : undefined
            }
          }
        }

        for (const [rowIndex, record] of sources.entries()) {
          if (helper.isFunction(props.custombodyerRowAttrs)) {
            recordRowAttrs.value[rowIndex] = props.custombodyerRowAttrs({ record, rowIndex })
          }

          if (helper.isFunction(props.customBodyerRowStates)) {
            recordRowStates.value[rowIndex] = props.customBodyerRowStates({ record, rowIndex })
          }

          if (props.defaultSelectAllRows || props.defaultExpandAllRows) {
            let keyField = 'key'
            let keyValue = ''

            keyField = helper.isFunction(props.rowKey) ? props.rowKey(record) || 'key' : keyField
            keyField = helper.isNotEmptyString(props.rowKey) ? props.rowKey : keyField
            keyField = helper.isNotEmptyString(keyField) ? keyField.trim() : 'key'
            keyValue = record[keyField] || ''

            if (!recordDataRowKeys.value.includes(keyValue)) {
              props.defaultSelectAllRows && !selectedRowKeys.value.includes(keyValue) && selectedRowKeys.value.push(keyValue)
              props.defaultExpandAllRows && !expandedRowKeys.value.includes(keyValue) && expandedRowKeys.value.push(keyValue)
            }
          }
        }
      },

      updateResizeContainer() {
        if (Normalizer.scroll.value.getScrollResizeContainer) {
          const container = Normalizer.scroll.value.getScrollResizeContainer()
          const clientRect = container && container.getBoundingClientRect()
          Optionser.scrollResizeWidth.value = clientRect ? clientRect.width : 0
          Optionser.scrollResizeHeight.value = clientRect ? clientRect.height : 0
        }
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

    renderRowRanger.rowOffset = [0, ~~(Optionser.windowInnerHeight.value / renderRowPresets.minHeight)]
    renderRowRanger.rowBuffer = [renderRowPresets.maxBuffer, renderRowPresets.maxBuffer]

    watch(() => props.columns, () => {
      columnRowAttrs.value = []
      columnCellAttrs.value = []
      columnCellRender.value = []
      treeColumns.value = Methoder.normalizeTreeColumns(props.columns)
      listColumns.value = Methoder.normalizeListColumns(treeColumns.value)
      dataColumns.value = Methoder.normalizeDataColumns(listColumns.value)
      Methoder.normalizeTreeSettings(treeColumns.value)
      Methoder.normalizeInitColumns(listColumns.value)
    }, watchDeepOptions)

    watch(() => [...props.dataSource], () => {
      recordRowAttrs.value = []
      recordRowStates.value = []
      recordCellProps.value = []
      recordCellAttrs.value = []
      recordCellRender.value = []
      recordDataRowKeys.value = []
      recordDataSources.value = []
      Methoder.normalizeListSources(props.dataSource, recordDataSources.value)
      Methoder.normalizeInitSources(recordDataSources.value)
    }, watchDeepOptions)

    onMounted(() => {
      Observer.resizeObserver.observe(Normalizer.scroll.value.getScrollResizeContainer?.() || document.documentElement)
    })

    return () => (
      <div class='s-table-container'/>
    )
  }
})

export default STable
