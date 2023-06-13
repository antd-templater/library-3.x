import { defineComponent } from 'vue'

export const STable = defineComponent({
  name: 'STable',
  props: {},
  emits: {},
  setup(props, context) {
    return () => (
      <div class='s-table-container'/>
    )
  }
})

export default STable
