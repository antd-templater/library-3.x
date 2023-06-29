import { defineComponent } from 'vue'

export const STableEmpty = defineComponent({
  name: 'STableEmpty',
  props: {},
  emits: {},
  setup(props, context) {
    return () => (
      <div class='s-table-empty-container'/>
    )
  }
})

export default STableEmpty
