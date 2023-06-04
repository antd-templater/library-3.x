/* eslint-disable vue/no-setup-props-destructure */
import * as AllIcons from '@ant-design/icons-vue'
import * as VueTypes from 'vue-types'
import { defineComponent } from 'vue'

type AllIconType = keyof typeof AllIcons
type NotIconType = 'setTwoToneColor' | 'getTwoToneColor' | 'createFromIconfontCN' | 'default'

export const isIconType = (type: any): type is Exclude<AllIconType, NotIconType> => {
  return (
    type !== 'default' &&
    type !== 'getTwoToneColor' &&
    type !== 'setTwoToneColor' &&
    type !== 'createFromIconfontCN' &&
    type && (AllIcons as any)[type] && true || false
  )
}

export const SIcon = defineComponent({
  name: 'SIcon',
  props: {
    type: VueTypes.string().isRequired,
    spin: VueTypes.bool().def(false),
    rotate: VueTypes.number().def(undefined),
    twoToneColor: VueTypes.any<string | [string, string]>().def()
  },
  emits: {
    click: (event: MouseEvent) => true
  },
  setup(props, context) {
    return () => {
      const type = props.type
      const Icon = isIconType(type) ? AllIcons[type] : null
      const binds = { ...props, type: undefined }
      return Icon ? <Icon { ...binds } onClick={event => context.emit('click', event)}/> : null
    }
  }
})

export default SIcon
