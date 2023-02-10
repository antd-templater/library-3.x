import { FunctionalComponent, h } from 'vue'
import { AntdIconProps } from '@ant-design/icons-vue/es/components/AntdIcon'
import * as AllIcons from '@ant-design/icons-vue'

type AllNames = AllCapitalize<keyof typeof AllIcons>
type AllCapitalize<K extends keyof typeof AllIcons> = K extends Capitalize<K> ? K : never;

export const SIcon: FunctionalComponent<AntdIconProps & { type: AllNames }> = (props, context) => h(AllIcons[props.type], context.attrs, context.slots)
export const isSIcon = (type: any) => !!AllIcons[type as AllNames]
export default SIcon
