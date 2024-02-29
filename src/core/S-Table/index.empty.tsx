import { defineComponent } from 'vue'
import 'ant-design-vue/es/empty/style/index.less'
import Empty from 'ant-design-vue/es/empty'

export const STableEmpty = defineComponent({
  name: 'STableEmpty',
  inheritAttrs: false,
  setup() {
    return () => (
      <div class='s-table-empty-container'>
        <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
      </div>
    )
  }
})

export default STableEmpty
