import Pagination from 'ant-design-vue/es/pagination'
import { defineComponent, ref } from 'vue'
import * as VueTypes from 'vue-types'

export const STablePaginate = defineComponent({
  name: 'STablePaginate',
  inheritAttrs: false,
  props: {
    size: VueTypes.string<'small' | 'default'>().def('default'),
    disabled: VueTypes.bool().def(false),
    showTotal: VueTypes.func<(total: number, range: [number, number]) => void>().def(undefined),
    hideOnSinglePage: VueTypes.bool().def(false),
    defaultPageSize: VueTypes.number().def(20),
    pageSizeOptions: VueTypes.array<string>().def(['10', '15', '20', '25', '30', '50', '100', '200', '300', '500']),
    showSizeChanger: VueTypes.bool().def(undefined),
    showQuickJumper: VueTypes.bool().def(false),
    showLessItems: VueTypes.bool().def(false),
    totalSize: VueTypes.number().def(0),
    pageSize: VueTypes.number().def(20),
    pageNo: VueTypes.number().def(1),
    simple: VueTypes.bool().def(false),
  },
  emits: {
    pageSizeChange: (current: number, size: number) => true,
    pageChange: (page: number, pageSize: number) => true,
  },
  setup(props, context) {
    const pageSizeChange = (page: number, pageSize: number) => {
      context.emit('pageSizeChange', page, pageSize)
    }

    const pageChange = (current: number, size: number) => {
      context.emit('pageChange', current, size)
    }

    const container = ref(null as HTMLElement | null)
    const style: any = context.attrs.style

    return () => {
      return (
        <div
          ref={container}
          class="s-table-paginate-container"
          style={style}
        >
          <div class="s-table-paginate-content">
            <Pagination
              size={props.size}
              simple={props.simple}
              current={props.pageNo}
              total={props.totalSize}
              pageSize={props.pageSize}
              disabled={props.disabled}
              showTotal={props.showTotal}
              hideOnSinglePage={props.hideOnSinglePage}
              defaultPageSize={props.defaultPageSize}
              pageSizeOptions={props.pageSizeOptions}
              showSizeChanger={props.showSizeChanger}
              showQuickJumper={props.showQuickJumper}
              showLessItems={props.showLessItems}
              onShowSizeChange={pageSizeChange}
              onChange={pageChange}
            />
          </div>
        </div>
      )
    }
  },
})

export default STablePaginate
