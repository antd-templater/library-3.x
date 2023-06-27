import { defineComponent } from 'vue'

export const STableSetting = defineComponent({
  name: 'STableSetting',
  props: {},
  emits: {},
  setup(props, context) {
    return () => (
      <div class='s-table-setting-container'/>
    )
  }
})

export default STableSetting
