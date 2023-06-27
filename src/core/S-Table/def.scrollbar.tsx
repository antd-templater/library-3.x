import { defineComponent } from 'vue'

export const STableScrollbar = defineComponent({
  name: 'STableScrollbar',
  props: {},
  emits: {},
  setup(props, context) {
    return () => (
      <div class='s-table-scrollbar-container'/>
    )
  }
})

export default STableScrollbar
