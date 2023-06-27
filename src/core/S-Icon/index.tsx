/* eslint-disable vue/no-setup-props-destructure */
import * as AllIcons from '@ant-design/icons-vue'
import * as VueTypes from 'vue-types'
import { defineComponent } from 'vue'
import helper from '@/helper'

type AllIconType = keyof typeof AllIcons
type NotIconType = 'setTwoToneColor' | 'getTwoToneColor' | 'createFromIconfontCN' | 'default'

export function isIconType(type: any): type is Exclude<AllIconType, NotIconType> {
  return (
    type !== 'default' &&
    type !== 'getTwoToneColor' &&
    type !== 'setTwoToneColor' &&
    type !== 'createFromIconfontCN' &&
    type && !!(AllIcons as any)[type]
  )
}

export function forIconType<T = any>(type: T): T extends string ? string : T {
  return (
    helper.isString(type)
      ? type.replace(/(^|-)(\w)/g, (_t1, _t2, t3) => t3 && t3.toUpperCase())
      : type
  ) as any
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
      const type = forIconType(props.type)
      const bind = { ...props, type: undefined }
      const Icon = isIconType(type) ? AllIcons[type] : null
      return Icon ? <Icon { ...bind } onClick={event => context.emit('click', event)}/> : null
    }
  }
})

export default SIcon
