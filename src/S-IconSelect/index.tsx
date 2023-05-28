import * as VueTypes from 'vue-types'
import { defineComponent, ref, inject } from 'vue'
import { defaultConfigProvider } from 'ant-design-vue/es/config-provider'
import ASelect from 'ant-design-vue/es/select'

import 'ant-design-vue/es/select/style/index.less'

import SIcon, { isIconType } from '../S-Icon'
import defaultOptions from './icons'

export type SIconSelectOptionType = {
  label?: any;
  value?: string | number | null;
  options?: Omit<SIconSelectOptionType, 'options'>[];
  disabled?: boolean;
  [name: string]: any;
}

export const SIconSelect = defineComponent({
  name: 'SIconSelect',
  inheritAttrs: false,
  props: {
    optionFilterProp: VueTypes.string().def(),
    optionLabelProp: VueTypes.string().def(),
    placeholder: VueTypes.string().def(''),
    showSearch: VueTypes.bool().def(true),
    allowClear: VueTypes.bool().def(false),
    showArrow: VueTypes.bool().def(true),
    multiple: VueTypes.bool().def(true),
    disabled: VueTypes.bool().def(false),
    options: VueTypes.array<SIconSelectOptionType>().def(() => defaultOptions),
    value: VueTypes.any<string | number | string[] | number[]>().def(),
    mode: VueTypes.string<'multiple' | 'tags'>().def(),
    size: VueTypes.string<'large' | 'middle' | 'small'>().def()
  },
  emits: {
    'update:value': (_: string | number | string[] | number[]) => true
  },
  setup(props, { emit }) {
    const OptionRender = (props: any) => {
      return isIconType(props.value)
        ? <span><SIcon type={props.value} style='margin: 0px 3px 0 -3px; font-size: 18px; vertical-align: middle;'/>{props.label}</span>
        : <span>{props.label}</span>
    }

    const TagRender = (props: any) => {
      return isIconType(props.value)
        ? <span><SIcon type={props.value} style='margin: 0px 3px 2px 2px; font-size: 20px; vertical-align: middle;'/>{props.label}</span>
        : <span>{props.label}</span>
    }

    const open: any = ref(undefined)
    const selector: any = ref(undefined)
    const isMultiple = props.multiple !== false
    const isMultipleMode = props.mode === 'tags' || props.mode === 'multiple'
    const provider = inject('configProvider', defaultConfigProvider)

    const onChange = (value: any) => {
      const isArrayValue = Array.isArray(value)
      const isOnlyArrayValue = isMultipleMode && isArrayValue && !isMultiple

      emit('update:value', isOnlyArrayValue ? value.slice(-1) : value)

      isOnlyArrayValue && selector.value?.blur()
      isMultipleMode || selector.value?.blur()

      isOnlyArrayValue && (open.value = false)
      isMultipleMode || (open.value = false)
    }

    return () => (
      <ASelect
        ref={selector}
        open={open.value}
        size={props.size || provider.componentSize}
        mode={props.mode}
        value={props.value}
        options={props.options}
        disabled={props.disabled}
        showArrow={props.showArrow}
        allowClear={props.allowClear}
        showSearch={props.showSearch}
        placeholder={props.placeholder}
        optionLabelProp={props.optionLabelProp}
        optionFilterProp={props.optionFilterProp}
        v-slots={{ option: OptionRender, tagRender: TagRender }}
        onSearch={() => { open.value = true }}
        onClick={() => { open.value = true }}
        onBlur={() => { open.value = false }}
        onChange={onChange}
      />
    )
  }
})

export default SIconSelect
