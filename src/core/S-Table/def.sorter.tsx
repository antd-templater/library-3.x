import { defineComponent } from 'vue'

export const STableSorter = defineComponent({
  name: 'STableSorter',
  props: {},
  emits: {},
  setup(props, context) {
    return () => (
      <div class='s-table-sorter-container'/>
    )
  }
})

export default STableSorter
