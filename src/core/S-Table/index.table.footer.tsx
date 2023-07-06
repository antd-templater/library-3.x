import { defineComponent } from 'vue'

export const STableFooter = defineComponent({
  name: 'STableFooter',
  props: {},
  emits: {},
  setup(props, context) {
    return () => (
      <div class='s-table-footer-container'/>
    )
  }
})

export default STableFooter
