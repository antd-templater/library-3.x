import { defineComponent } from 'vue'

export const STablePaginate = defineComponent({
  name: 'STablePaginate',
  props: {},
  emits: {},
  setup(props, context) {
    return () => (
      <div class='s-table-paginate-container'/>
    )
  }
})

export default STablePaginate
