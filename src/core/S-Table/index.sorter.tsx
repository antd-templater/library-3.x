import { defineComponent } from 'vue'
import { CaretDownOutlined } from '@ant-design/icons-vue'
import { CaretUpOutlined } from '@ant-design/icons-vue'
import ATheme from 'ant-design-vue/es/theme'
import * as VueTypes from 'vue-types'

export const STableSorter = defineComponent({
  name: 'STableSorter',
  inheritAttrs: false,
  props: {
    field: VueTypes.string().isRequired,
    value: VueTypes.string<'' | 'ascend' | 'descend'>().isRequired,
  },
  emits: {
    change: (_: { field: string; value: '' | 'ascend' | 'descend'; }) => true,
  },
  setup(props, context) {
    const token = ATheme.useToken().token

    const changer = (event: Event) => {
      if (props.field && !props.value) {
        context.emit('change', { field: props.field, value: 'ascend' })
      }

      if (props.field && props.value === 'ascend') {
        context.emit('change', { field: props.field, value: 'descend' })
      }

      if (props.field && props.value === 'descend') {
        context.emit('change', { field: props.field, value: '' })
      }

      event.stopPropagation()
      event.preventDefault()
    }

    return () => (
      <div class="s-table-sorter-container" onClick={changer}>
        <CaretUpOutlined style={{ fontSize: '11px', color: props.value === 'ascend' ? token.value.colorPrimary : 'rgba(0, 0, 0, 0.45)' }} />
        <CaretDownOutlined style={{ fontSize: '11px', color: props.value === 'descend' ? token.value.colorPrimary : 'rgba(0, 0, 0, 0.45)', marginTop: '-0.3em' }} />
      </div>
    )
  },
})

export default STableSorter
