import './select.less'
import 'ant-design-vue/es/empty/style/index.less'
import 'ant-design-vue/es/button/style/index.less'
import 'ant-design-vue/es/select/style/index.less'

import helper from '../helper'
import SEllipsis from '../S-Ellipsis/index'
import { CheckOutlined, EditOutlined } from '@ant-design/icons-vue'
import { defineComponent, reactive, toRaw, watch, watchEffect, PropType } from 'vue'
import ASelect, { SelectValue, DefaultOptionType } from 'ant-design-vue/es/select'
import AButton from 'ant-design-vue/es/button'

interface FieldNames {
  label?: string;
  value?: string;
  options?: string;
}

export const SEditCellSelect = defineComponent({
  name: 'SEditCellSelect',
  inheritAttrs: false,
  props: {
    text: {
      type: [Object, Array, Number, String] as PropType<SelectValue>,
      default: ''
    },
    edit: {
      type: Boolean,
      default: true
    },
    check: {
      type: Boolean,
      default: true
    },
    synced: {
      type: Boolean,
      default: false
    },
    opened: {
      type: Boolean,
      default: false
    },
    status: {
      type: Boolean,
      default: false
    },
    tooltip: {
      type: Object as PropType<{ enable?: boolean, limit?: number }>,
      default: () => ({ enable: true, limit: Infinity })
    },
    disabled: {
      type: Boolean,
      default: false
    },
    options: {
      type: Array as PropType<DefaultOptionType[]>,
      default: () => ([])
    },
    showArrow: {
      type: Boolean,
      default: true
    },
    allowClear: {
      type: Boolean,
      default: false
    },
    showSearch: {
      type: Boolean,
      default: false
    },
    fieldNames: {
      type: Object as PropType<FieldNames>,
      default: () => ({ label: 'label', value: 'value', options: 'options' })
    },
    placeholder: {
      type: String,
      default: undefined
    },
    optionFilterProp: {
      type: String,
      default: undefined
    },
    cellStyle: {
      type: Object,
      default: () => ({})
    }
  },
  emits: {
    'edit': (proxy: { editable: boolean, value: SelectValue }) => true,
    'blur': (proxy: { editable: boolean, value: SelectValue }) => true,
    'focus': (proxy: { editable: boolean, value: SelectValue }) => true,
    'change': (proxy: { editable: boolean, value: SelectValue }) => true,
    'confirm': (proxy: { editable: boolean, value: SelectValue }) => true,
    'update:text': (text: SelectValue) => true,
    'update:status': (status: boolean) => true
  },
  setup(props, { emit, slots }) {
    const doEdit = (event: Event) => {
      proxy.editable = true
      proxy.value = props.text
      emit('update:status', true)
      emit('edit', toRaw(proxy))
      event.stopPropagation()
    }

    const doBlur = (event: Event) => {
      emit('blur', toRaw(proxy))
      event.stopPropagation()
    }

    const doFocus = (event: Event) => {
      emit('focus', toRaw(proxy))
      event.stopPropagation()
    }

    const doChange = (option: DefaultOptionType) => {
      emit('update:text', proxy.value)
      emit('change', toRaw(proxy))
    }

    const doConfirm = (event: Event) => {
      if (!props.opened) {
        proxy.editable = false
      }
      emit('confirm', toRaw(proxy))
      event.stopPropagation()
    }

    const RenderCheckButton = () => {
      if (!props.disabled && props.check) {
        return (
          <AButton
            class='s-editable-cell-button-check'
            type='link'
            icon={<CheckOutlined/>}
            style={{ color: '--ant-primary-color', ...props.cellStyle.check }}
            onClick={(event: Event) => doConfirm(event)}
          />
        )
      }
      return null
    }

    const RenderEditButton = () => {
      if (!props.disabled && props.edit) {
        return (
          <AButton
            class='s-editable-cell-button-edit'
            type='link'
            icon={<EditOutlined/>}
            style={props.cellStyle.edit}
          />
        )
      }
      return null
    }

    const RenderEditableContainer = () => {
      if (!props.disabled && proxy.editable) {
        return (
          <div
            class={['s-editable-cell-input-wrapper', { 'disabled-icon': props.disabled || !props.check }]}
            style={props.cellStyle.inputWrapper}
          >
            <ASelect
              v-model={[proxy.value, 'value']}
              class='s-editable-cell-input'
              style={props.cellStyle.input}
              options={props.options}
              showArrow={props.showArrow}
              allowClear={props.allowClear}
              showSearch={props.showSearch}
              fieldNames={props.fieldNames}
              placeholder={props.placeholder}
              optionFilterProp={props.optionFilterProp}
              onChange={(_: any, option: DefaultOptionType) => doChange(option)}
              onFocus={(event: Event) => doFocus(event)}
              onBlur={(event: Event) => doBlur(event)}
            />
            <RenderCheckButton/>
          </div>
        )
      }

      const text = props.text
      const fieldLabel = props.fieldNames.label
      const fieldValue = props.fieldNames.value
      const fieldOptions = props.fieldNames.options
      const isPrimitive = typeof text === 'string' || typeof text === 'number'
      const title = isPrimitive ? helper.takeLabelByKey(props.options, text, fieldLabel, fieldValue, fieldOptions) || props.text : undefined

      return (
        <SEllipsis
          title={title || title === 0 ? String(title) : undefined}
          limit={props.tooltip.limit ? props.tooltip.limit : Infinity}
          tooltip={props.tooltip.enable !== false}
        >
          <div
            style={props.cellStyle.textWrapper}
            class={['s-editable-cell-text-wrapper', { 'disabled-icon': props.disabled || !props.edit }]}
            onClick={event => !props.disabled && props.edit && doEdit(event)}
          >
            { RenderEditableCellText() }
            <RenderEditButton/>
          </div>
        </SEllipsis>
      )
    }

    const RenderEditableCellText = () => {
      const text = props.text
      const fieldLabel = props.fieldNames.label
      const fieldValue = props.fieldNames.value
      const fieldOptions = props.fieldNames.options
      const isPrimitive = typeof text === 'string' || typeof text === 'number'

      return slots.editableCellText
        ? slots.editableCellText({ text: props.text, ...toRaw(proxy) })
        : isPrimitive ? helper.takeLabelByKey(props.options, text, fieldLabel, fieldValue, fieldOptions) || props.text : props.text
    }

    const proxy = reactive({
      value: props.text,
      editable: false
    })

    watchEffect(() => {
      props.disabled && (proxy.editable = false)
      props.disabled || (proxy.editable = props.opened)
    })

    watch(() => props.text, () => !props.disabled && props.synced && (proxy.value = props.text))
    watch(() => props.status, () => !props.disabled && props.status === false && (proxy.editable = false))

    return () => (
      <div
        style={props.cellStyle.container}
        class={['s-editable-cell-container', { editabled: proxy.editable }]}
        onDblclick={ (event: Event) => event.stopPropagation() }
        onClick={ (event: Event) => event.stopPropagation() }
      >
        <RenderEditableContainer/>
      </div>
    )
  }
})

export default SEditCellSelect
