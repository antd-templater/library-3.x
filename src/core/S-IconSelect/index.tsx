import * as VueTypes from 'vue-types'
import { SIconSelectOption } from './type'
import { defineComponent, watchEffect, ref, Ref } from 'vue'
import { useConfigContextInject } from 'ant-design-vue/es/config-provider/context'
import ASelect from 'ant-design-vue/es/select'

import SIcon, { isIconType } from '../S-Icon'
import generateOptions from './iconfont'
import defaultOptions from './icons'
import helper from '@/helper'

export const SIconSelect = defineComponent({
  name: 'SIconSelect',
  inheritAttrs: true,
  props: {
    style: VueTypes.any().def(undefined),
    class: VueTypes.any().def(undefined),
    iconClass: VueTypes.any().def(undefined),
    iconStyle: VueTypes.object().def(undefined),
    iconPrefix: VueTypes.string().def(undefined),
    iconfontUrl: VueTypes.string().def(undefined),
    optionFilterProp: VueTypes.string().def(),
    optionLabelProp: VueTypes.string().def(),
    placeholder: VueTypes.string().def(''),
    showSearch: VueTypes.bool().def(true),
    allowClear: VueTypes.bool().def(true),
    showArrow: VueTypes.bool().def(true),
    multiple: VueTypes.bool().def(false),
    disabled: VueTypes.bool().def(false),
    options: VueTypes.array<SIconSelectOption>().def(undefined),
    value: VueTypes.any<string | number | string[] | number[]>().def(),
    mode: VueTypes.string<'multiple' | 'tags'>().def(),
    size: VueTypes.string<'large' | 'middle' | 'small'>().def(),
  },
  emits: {
    'update:value': (_: string | number | string[] | number[]) => true,
    'change': (value: any, option: any | any[]) => true,
    'search': (_: string) => true,
    'click': (_: Event) => true,
    'blur': (_: Event) => true,
  },
  setup(props, { emit }) {
    const OptionRender = (option: any) => {
      if (isIconType(option.value)) {
        return (
          <span>
            <SIcon type={option.value} class={props.iconClass} style={{ margin: '0px 3px 0 0', fontSize: '18px', verticalAlign: 'middle', ...props.iconStyle }} />
            {option.label}
          </span>
        )
      }

      if (props.iconPrefix && props.iconfontUrl && option.value.startsWith(props.iconPrefix)) {
        return (
          <span>
            <SIcon type={option.value} iconPrefix={props.iconPrefix} iconfontUrl={props.iconfontUrl} class={props.iconClass} style={{ margin: '0px 3px 0 0', fontSize: '18px', verticalAlign: 'middle', ...props.iconStyle }} />
            {option.label}
          </span>
        )
      }

      return <span>{option.label}</span>
    }

    const TagRender = (option: any) => {
      if (isIconType(option.value)) {
        return (
          <span>
            <SIcon type={option.value} class={props.iconClass} style={{ margin: '0px 3px 2px 2px', fontSize: '18px', verticalAlign: 'middle', ...props.iconStyle }} />
            {option.label}
          </span>
        )
      }

      if (props.iconPrefix && props.iconfontUrl && option.value.startsWith(props.iconPrefix)) {
        return (
          <span>
            <SIcon type={option.value} iconPrefix={props.iconPrefix} iconfontUrl={props.iconfontUrl} class={props.iconClass} style={{ margin: '0px 3px 2px 2px', fontSize: '18px', verticalAlign: 'middle', ...props.iconStyle }} />
            {option.label}
          </span>
        )
      }

      return <span>{option.label}</span>
    }

    const open = ref<any>(undefined)
    const selector = ref<any>(undefined)
    const iconOptions = ref<SIconSelectOption[]>([])
    const isMultipleMode = props.mode === 'tags' || props.mode === 'multiple'
    const isMultiple = props.multiple !== false
    const provider = useConfigContextInject()

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

    watchEffect(async() => {
      if (!props.options && (!props.iconPrefix || !props.iconfontUrl)) {
        iconOptions.value = defaultOptions
      }

      if (!props.options && props.iconPrefix && props.iconfontUrl) {
        iconOptions.value = await generateOptions(props.iconfontUrl, props.iconPrefix)
      }

      if (props.options) {
        iconOptions.value = props.options
      }
    })

    return () => {
      const propValue = isMultiple || isMultipleMode
        ? (helper.isArray(props.value) ? props.value : (helper.isNonEmptyString(props.value) ? [props.value] : []))
        : (helper.isArray(props.value) ? props.value[0] : props.value)

      return (
        <ASelect
          ref={selector}
          open={open.value}
          size={props.size || provider.componentSize?.value}
          mode={props.mode}
          value={propValue}
          style={props.style}
          class={props.class}
          options={iconOptions.value}
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
  },
})

export const iconOptionsDefiner = (options: SIconSelectOption[]) => ref(options) as Ref<SIconSelectOption[]>

export default SIconSelect
