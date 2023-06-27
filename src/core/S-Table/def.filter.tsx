import { defineComponent } from 'vue'

export const STableFilter = defineComponent({
  name: 'STableFilter',
  props: {},
  emits: {},
  setup(props, context) {
    return () => (
      <div class='s-table-filter-container'/>
    )
  }
})

export default STableFilter
