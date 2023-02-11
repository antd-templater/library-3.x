import { defineComponent, PropType, h } from 'vue'
import * as AllIcons from '@ant-design/icons-vue/lib/icons'

export const isIconType = (type: string): type is keyof typeof AllIcons => !!(AllIcons as any)[type]

export default defineComponent({
  name: 'SIcon',
  props: {
    type: {
      type: String as PropType<keyof typeof AllIcons>,
      required: true
    },
    spin: {
      type: Boolean,
      default: false
    },
    rotate: {
      type: Number,
      default: undefined
    },
    twoToneColor: {
      type: [String, Array] as PropType< string | [string, string]>,
      default: undefined
    }
  },
  setup(props, context) {
    return () => h(AllIcons[props.type], { ...props, ...context.attrs, type: undefined }, context.slots)
  }
})
