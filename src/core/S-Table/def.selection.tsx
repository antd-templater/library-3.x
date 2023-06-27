import { defineComponent } from 'vue'

export const STableSelection = defineComponent({
  name: 'STableSelection',
  props: {},
  emits: {},
  setup(props, context) {
    return () => (
      <div class='s-table-selection-container'/>
    )
  }
})

export default STableSelection
