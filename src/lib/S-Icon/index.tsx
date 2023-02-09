import { defineComponent, defineProps } from 'vue'
import { AntdIconProps } from '@ant-design/icons-vue/es/components/AntdIcon'
import * as AllIcons from '@ant-design/icons-vue'

type AllKeys = keyof typeof AllIcons
type AllNames = AllCapitalize<keyof typeof AllIcons>
type AllCapitalize<K extends AllKeys> = K extends Capitalize<K> ? K : never;

export default defineComponent({
  name: 'SIcon',
  setup() {
    const props = defineProps<AntdIconProps & { name: AllNames }>()
    const Component = AllIcons[props.name]
    return <Component/>
  }
})
