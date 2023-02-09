import { FunctionalComponent, createVNode } from 'vue'
import { AntdIconProps } from '@ant-design/icons-vue/es/components/AntdIcon'
import * as AllIcons from '@ant-design/icons-vue'

type AllKeys = keyof typeof AllIcons
type AllNames = AllCapitalize<keyof typeof AllIcons>
type AllCapitalize<K extends AllKeys> = K extends Capitalize<K> ? K : never;
type TypeSIconComponent = FunctionalComponent<AntdIconProps & { name: AllNames }>

const SIconComponent: TypeSIconComponent = function SIcon(props, context) {
  return createVNode(AllIcons[props.name], context.attrs, context.slots)
}

export default SIconComponent
