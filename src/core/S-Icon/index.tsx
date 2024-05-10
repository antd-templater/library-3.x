import * as VueTypes from 'vue-types'
import * as AllIcons from '@ant-design/icons-vue'
import { createFromIconfontCN } from '@ant-design/icons-vue'
import { defineComponent } from 'vue'
import helper from '@/helper'

type AllIconType = keyof typeof AllIcons
type NotIconType = 'setTwoToneColor' | 'getTwoToneColor' | 'createFromIconfontCN' | 'default'

export const isIconType = (type: any): type is Exclude<AllIconType, NotIconType> => {
  return (
    type !== 'default' &&
    type !== 'getTwoToneColor' &&
    type !== 'setTwoToneColor' &&
    type !== 'createFromIconfontCN' &&
    type && !!(AllIcons as any)[type]
  )
}

export const forIconType = <T = any>(type: T): T extends string ? string : T => {
  return (
    helper.isString(type)
      ? type.replace(/(^|-)(\w)/g, (_t1, _t2, t3) => t3 && t3.toUpperCase())
      : type
  ) as any
}

export const SIcon = defineComponent({
  name: 'SIcon',
  props: {
    spin: VueTypes.bool().def(false),
    type: VueTypes.string().isRequired,
    style: VueTypes.any().def(undefined),
    class: VueTypes.any().def(undefined),
    rotate: VueTypes.number().def(undefined),
    iconPrefix: VueTypes.string().def(undefined),
    iconfontUrl: VueTypes.string().def(undefined),
    twoToneColor: VueTypes.any<string | [string, string]>().def(),
  },
  emits: {
    click: (_: MouseEvent) => true,
  },
  setup(props, context) {
    return () => {
      const type = props.type
      const icon = forIconType(type)
      const bind = { ...props, type: undefined }
      const iconPrefix = props.iconPrefix ?? ''
      const iconfontUrl = props.iconfontUrl ?? ''
      const IconComponent = isIconType(icon) ? AllIcons[icon] : null

      if (IconComponent) {
        return <IconComponent {...bind} onClick={event => context.emit('click', event)} />
      }

      if (iconPrefix && iconfontUrl && type.startsWith(iconPrefix)) {
        const IconFont = createFromIconfontCN({ scriptUrl: iconfontUrl })
        const binds = { ...props } as any

        delete binds.iconfontUrl
        delete binds.iconPrefix

        return <IconFont {...binds} onClick={event => context.emit('click', event)} />
      }

      return null
    }
  },
})

export default SIcon
