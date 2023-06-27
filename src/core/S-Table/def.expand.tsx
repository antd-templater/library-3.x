import { defineComponent } from 'vue'

export const STableExpand = defineComponent({
  name: 'STableExpand',
  props: {},
  emits: {},
  setup(props, context) {
    return () => (
      <div class='s-table-expand-container'/>
    )
  }
})

export default STableExpand
