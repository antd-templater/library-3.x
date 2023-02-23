import * as VueTypes from 'vue-types'
import * as Components from './library'
import { defineComponent, h } from 'vue'
import { SFormType } from './form.declare'

export const SFormComponent = defineComponent({
  name: 'SFormComponent',
  inheritAttrs: false,
  props: {
    type: VueTypes.string<SFormType>().def(),
    attrs: VueTypes.object().def(() => ({})),
    source: VueTypes.object().isRequired,
    field: VueTypes.string().isRequired
  },
  setup(props, context) {
    return () => {
      const type = props.type
      const attrs = props.attrs
      const field = props.field
      const source = props.source
      const Component = (Components as any)[type]

      return Component
        ? h(Component, { attrs, field, source }, context.slots)
        : null
    }
  }
})

export default SFormComponent
