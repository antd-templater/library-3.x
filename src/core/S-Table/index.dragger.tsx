import { SwapOutlined } from '@ant-design/icons-vue'
import { StopOutlined } from '@ant-design/icons-vue'
import { defineComponent } from 'vue'
import * as VueTypes from 'vue-types'

export const STableDragger = defineComponent({
  name: 'STableDragger',
  inheritAttrs: false,
  props: {
    top: VueTypes.number().def(0),
    left: VueTypes.number().def(0),
    value: VueTypes.any().isRequired,
    allow: VueTypes.bool().isRequired,
    rowIndex: VueTypes.number().isRequired,
    colIndex: VueTypes.number().isRequired,
    container: VueTypes.object<HTMLElement>().isRequired
  },
  setup(props, context) {
    return () => (
      <div
        style={{ top: props.top + 'px', left: props.left + 'px' }}
        class='s-table-dragger-container'
      >
        <div class='s-table-dragger-icon'>
          {
            props.allow
              ? <SwapOutlined style='font-size: 14px; color: #606266;'/>
              : <StopOutlined style='font-size: 14px; color: #606266;'/>
          }
        </div>

        <div class='s-table-dragger-value'>
          { props.value }
        </div>
      </div>
    )
  }
})

export default STableDragger
