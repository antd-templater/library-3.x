import { defineComponent } from 'vue'

export const STableSettings = defineComponent({
  name: 'STableSettings',
  props: {},
  emits: {},
  setup(props, context) {
    return () => (
      <div class='s-table-settings-container'/>
    )
  }
})

export default STableSettings
