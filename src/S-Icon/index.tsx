import * as VueTypes from 'vue-types'
import * as AllIcons from '@ant-design/icons-vue'
import { defineComponent } from 'vue'

type AllIconType = keyof typeof AllIcons
type NotIconType = 'setTwoToneColor' | 'getTwoToneColor' | 'createFromIconfontCN' | 'default'

export const isIconType = (type: string): type is Exclude<AllIconType, NotIconType> => {
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
    type: VueTypes.string<Exclude<AllIconType, NotIconType>>().isRequired,
    spin: VueTypes.bool().def(false),
    rotate: VueTypes.number().def(undefined),
    twoToneColor: VueTypes.any<string | [string, string]>().def()
  },
  setup(props) {
    const Icon = AllIcons[props.type]
    const binds = { ...props, type: undefined }
    return () => isIconType(props.type) ? <Icon { ...binds }/> : null
  }
})

export default SIcon
