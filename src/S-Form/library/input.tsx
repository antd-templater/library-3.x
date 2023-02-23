import './input.less'
import 'ant-design-vue/es/input/style/index.less'
import 'ant-design-vue/es/button/style/index.less'

import AInput from 'ant-design-vue/es/input'
import { defineComponent, h } from 'vue'
import * as VueTypes from 'vue-types'

export default defineComponent({
  name: 'SInput',
  inheritAttrs: false,
  props: {
    attrs: VueTypes.object().def(() => ({})),
    field: VueTypes.string().isRequired,
    source: VueTypes.object().isRequired
  },
  setup(props, context) {
    return () => {
      const field = props.field
      const source = props.source

      const attrs = {
        'value': source[field],
        'onUpdate:value': (value: any) => { source[field] = value },
        ...props.attrs
      }

      return h(AInput, attrs, context.slots)
    }
  }
})
