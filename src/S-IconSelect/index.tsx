import { defineComponent, PropType, ref } from 'vue'
import ASelect, { DefaultOptionType, SelectValue } from 'ant-design-vue/es/select'
import 'ant-design-vue/es/select/style/index.less'

import SIcon, { isIconType } from '../S-Icon'
import defaultOptions from './icons'

interface FieldNames {
  value?: string;
  label?: string;
  options?: string;
}

export const SIconSelect = defineComponent({
  name: 'SIconSelect',
  props: {
    optionFilterProp: {
      type: String,
      default: undefined
    },
    optionLabelProp: {
      type: String,
      default: undefined
    },
    placeholder: {
      type: String,
      default: ''
    },
    showSearch: {
      type: Boolean,
      default: true
    },
    allowClear: {
      type: Boolean,
      default: false
    },
    showArrow: {
      type: Boolean,
      default: true
    },
    fieldNames: {
      type: Object as PropType<FieldNames>,
      default: undefined
    },
    multiple: {
      type: Boolean,
      default: true
    },
    disabled: {
      type: Boolean,
      default: false
    },
    options: {
      type: Array as PropType<DefaultOptionType[]>,
      default: () => defaultOptions
    },
    value: {
      type: [Array, String] as PropType<SelectValue>,
      default: undefined
    },
    mode: {
      type: String as PropType<'multiple' | 'tags'>,
      default: undefined
    },
    size: {
      type: String as PropType<'large' | 'middle' | 'small'>,
      default: undefined
    }
  },
  emits: {
    'update:value': (_: SelectValue) => true
  },
  setup(props, context) {
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
    const isMultiple = props.multiple !== false
    const isMultipleMode = props.mode === 'tags' || props.mode === 'multiple'

    const onChange = (value: any) => {
      const isArrayValue = Array.isArray(value)
      const isOnlyArrayValue = isMultipleMode && isArrayValue && !isMultiple

      context.emit('update:value', isOnlyArrayValue ? value.slice(-1) : value)
      isOnlyArrayValue && (open.value = false)
      isMultipleMode || (open.value = false)
    }

    return () => (
      <ASelect
        open={open.value}
        size={props.size}
        mode={props.mode}
        value={props.value}
        options={props.options}
        disabled={props.disabled}
        showArrow={props.showArrow}
        fieldNames={props.fieldNames}
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
