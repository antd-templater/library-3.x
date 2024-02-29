import { defineComponent } from 'vue'
import * as VueTypes from 'vue-types'

export const STableCursor = defineComponent({
  name: 'STableCursor',
  inheritAttrs: false,
  props: {
    top: VueTypes.number().def(0),
    left: VueTypes.number().def(0),
    width: VueTypes.number().def(0),
    height: VueTypes.number().def(0)
  },
  setup(props) {
    return () => (
      <div
        class='s-table-cursor-container'
        style={{ top: props.top + 'px', left: props.left + 'px', width: props.width + 'px', height: props.height + 'px' }}
      />
    )
  }
})

export default STableCursor
