import * as VueTypes from 'vue-types'
import { defineComponent, ref, inject } from 'vue'
import { defaultConfigProvider } from 'ant-design-vue/es/config-provider'
import ASelect from 'ant-design-vue/es/select'

import 'ant-design-vue/es/select/style/index.less'

import SIcon, { isIconType } from '../S-Icon'
import defaultOptions from './icons'
import helper from '@/helper'

export type SIconSelectOptions = {
  label?: string;
  value?: string | number;
  options?: Omit<SIconSelectOptions, 'options'>[];
  disabled?: boolean;
  [name: string]: any;
}

export const SIconSelect = defineComponent({
  name: 'SIconSelect',
  inheritAttrs: true,
  props: {
    optionFilterProp: VueTypes.string().def(),
    optionLabelProp: VueTypes.string().def(),
    placeholder: VueTypes.string().def(''),
    showSearch: VueTypes.bool().def(true),
    allowClear: VueTypes.bool().def(true),
    showArrow: VueTypes.bool().def(true),
    multiple: VueTypes.bool().def(false),
    disabled: VueTypes.bool().def(false),
    options: VueTypes.array<SIconSelectOptions>().def(() => defaultOptions),
    value: VueTypes.any<string | number | string[] | number[]>().def(),
    mode: VueTypes.string<'multiple' | 'tags'>().def(),
    size: VueTypes.string<'large' | 'middle' | 'small'>().def()
  },
  emits: {
    'update:value': (_: string | number | string[] | number[]) => true,
    'change': (value: any, option: any | any[]) => true,
    'search': (_: string) => true,
    'click': (_: Event) => true,
    'blur': (_: Event) => true
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

    const onChange = (value: any, option: any | any[]) => {
      const isArrayValue = Array.isArray(value)
      const isOnlyArrayValue = isMultipleMode && isArrayValue && !isMultiple

      emit('update:value', isOnlyArrayValue ? value.slice(-1)[0] : value)

      isOnlyArrayValue && selector.value?.blur()
      isMultipleMode || selector.value?.blur()

      isOnlyArrayValue && (open.value = false)
      isMultipleMode || (open.value = false)

      emit('change', isOnlyArrayValue ? value.slice(-1)[0] : value, option)
    }

    return () => {
      const propValue = isMultiple || isMultipleMode
        ? (helper.isArray(props.value) ? props.value : (helper.isNonEmptyString(props.value) ? [props.value] : []))
        : (helper.isArray(props.value) ? props.value[0] : props.value)

      return (
        <ASelect
          ref={selector}
          open={open.value}
          size={props.size || provider.componentSize}
          mode={props.mode}
          value={propValue}
          options={props.options}
          disabled={props.disabled}
          showArrow={props.showArrow}
          allowClear={props.allowClear}
          showSearch={props.showSearch}
          placeholder={props.placeholder}
          optionLabelProp={props.optionLabelProp}
          optionFilterProp={props.optionFilterProp}
          v-slots={{ option: OptionRender, tagRender: TagRender }}
          onSearch={(value: string) => { open.value = true; emit('search', value) }}
          onClick={(event: Event) => { open.value = true; emit('click', event) }}
          onBlur={(event: Event) => { open.value = false; emit('blur', event) }}
          onChange={onChange}
        />
      )
    }
  }
})

export default SIconSelect
