import './select-icon.less'

import * as VueTypes from 'vue-types'
import SEllipsis from '../S-Ellipsis/index'
import SIconSelect from '@/S-IconSelect/index'
import SIcon, { isIconType } from '../S-Icon/index'
import { CheckOutlined, EditOutlined } from '@ant-design/icons-vue'
import { SlotsType, defineComponent, reactive, toRaw, watch, watchEffect } from 'vue'
import { useConfigContextInject } from 'ant-design-vue/es/config-provider/context'
import { DefaultOptionType } from 'ant-design-vue/es/select'
import { SelectValue } from 'ant-design-vue/es/select'
import AButton from 'ant-design-vue/es/button'
import helper from '@/helper'

export type SEditCellSelectValueType = SelectValue
export type SEditCellSelectOptionType = DefaultOptionType

type SEditCellDefineSlots = SlotsType<{
  editableCellText: {
    editable: boolean;
    value: string;
    text: string;
  };
}>

export const SEditCellSelectIcon = defineComponent({
  name: 'SEditCellSelectIcon',
  inheritAttrs: false,
  props: {
    text: VueTypes.string().def(''),
    empty: VueTypes.string().def(''),
    edit: VueTypes.bool().def(true),
    check: VueTypes.bool().def(true),
    synced: VueTypes.bool().def(false),
    opened: VueTypes.bool().def(false),
    status: VueTypes.bool().def(false),
    tooltip: VueTypes.object<{ enable?: boolean; ellipsis?: boolean; }>().def(() => ({ enable: true, ellipsis: false })),
    disabled: VueTypes.bool().def(false),
    options: VueTypes.array<SEditCellSelectOptionType>().def(undefined),
    iconClass: VueTypes.any().def(undefined),
    iconStyle: VueTypes.object().def(undefined),
    iconPrefix: VueTypes.string().def(undefined),
    iconfontUrl: VueTypes.string().def(undefined),
    showArrow: VueTypes.bool().def(true),
    allowClear: VueTypes.bool().def(false),
    showSearch: VueTypes.bool().def(true),
    fieldNames: VueTypes.object<{ label?: string; value?: string; options?: string; }>().def(() => ({ label: 'label', value: 'value', options: 'options' })),
    placeholder: VueTypes.string().def(),
    optionLabelProp: VueTypes.string().def(),
    optionFilterProp: VueTypes.string().def(),
    cellStyle: VueTypes.object().def(() => ({})),
  },
  emits: {
    'edit': (proxy: { editable: boolean; value: SEditCellSelectValueType; }) => true,
    'blur': (proxy: { editable: boolean; value: SEditCellSelectValueType; }) => true,
    'focus': (proxy: { editable: boolean; value: SEditCellSelectValueType; }) => true,
    'change': (proxy: { editable: boolean; value: SEditCellSelectValueType; }) => true,
    'confirm': (proxy: { editable: boolean; value: SEditCellSelectValueType; }) => true,
    'update:text': (text: SEditCellSelectValueType) => true,
    'update:status': (status: boolean) => true,
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

    const doChange = (option: SEditCellSelectOptionType) => {
      emit('update:text', proxy.value)
      emit('change', toRaw(proxy))
    }

    const doConfirm = (event: Event) => {
      proxy.editable = false
      emit('confirm', toRaw(proxy))
      event.stopPropagation()
    }

    const RenderCheckButton = () => {
      if (!props.disabled && props.check) {
        return (
          <AButton
            class="s-editable-cell-button-check"
            type="link"
            icon={<CheckOutlined />}
            style={{ ...props.cellStyle.check }}
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
            class="s-editable-cell-button-edit"
            type="link"
            icon={<EditOutlined />}
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
            <SIconSelect
              v-model={[proxy.value, 'value']}
              size={provider.componentSize?.value}
              class="s-editable-cell-input"
              style={props.cellStyle.input}
              options={props.options}
              mode="tags"
              multiple={false}
              iconStyle={props.iconStyle}
              iconClass={props.iconClass}
              iconPrefix={props.iconPrefix}
              iconfontUrl={props.iconfontUrl}
              showArrow={props.showArrow}
              allowClear={props.allowClear}
              showSearch={props.showSearch}
              placeholder={props.placeholder}
              optionLabelProp={props.optionLabelProp}
              optionFilterProp={props.optionFilterProp}
              onChange={(_: any, option: SEditCellSelectOptionType) => doChange(option)}
              onFocus={(event: Event) => doFocus(event)}
              onBlur={(event: Event) => doBlur(event)}
            />
            <RenderCheckButton />
          </div>
        )
      }

      const text = props.text
      const fieldLabel = props.fieldNames.label || 'label'
      const fieldValue = props.fieldNames.value || 'value'
      const fieldOptions = props.fieldNames.options || 'options'
      const isPrimitive = typeof text === 'string' || typeof text === 'number'
      const title = isPrimitive ? helper.takeTextByKey(props.options, text, fieldLabel, fieldValue, fieldOptions) || props.text : undefined

      return (
        <SEllipsis
          title={title || title === 0 ? String(title) : ''}
          ellipsis={props.tooltip.ellipsis === true}
          tooltip={props.tooltip.enable !== false}
        >
          <div
            style={props.cellStyle.textWrapper}
            class={['s-editable-cell-text-wrapper', { 'disabled-icon': props.disabled || !props.edit }]}
            onClick={event => !props.disabled && props.edit && doEdit(event)}
          >
            { RenderEditableCellText() }
            <RenderEditButton />
          </div>
        </SEllipsis>
      )
    }

    const RenderEditableCellText = () => {
      const text = props.text
      const iconClass = props.iconClass
      const iconStyle = props.iconStyle
      const iconPrefix = props.iconPrefix
      const iconfontUrl = props.iconfontUrl
      const fieldLabel = props.fieldNames.label
      const fieldValue = props.fieldNames.value
      const fieldOptions = props.fieldNames.options
      const isPrimitive = typeof text === 'string' || typeof text === 'number'

      const slotText = slots.editableCellText ? slots.editableCellText({ text: props.text, ...toRaw(proxy) }) : null
      const cellText = (isPrimitive ? helper.takeTextByKey(props.options, text, fieldLabel, fieldValue, fieldOptions) || props.text : props.text) as any
      const cellIcon = slotText ?? (isIconType(cellText) || (helper.isNonEmptyString(iconPrefix) && helper.isNonEmptyString(iconfontUrl) && cellText.startsWith(iconPrefix))
        ? (
            <span>
              <SIcon type={cellText} iconPrefix={iconPrefix} iconfontUrl={iconfontUrl} class={iconClass} style={iconStyle ?? 'margin-right: 5px;'} />
              {cellText}
            </span>
          )
        : cellText)

      const empty = props.empty

      return cellIcon || cellIcon === 0
        ? cellIcon
        : empty
    }

    const provider = useConfigContextInject()

    const proxy = reactive({
      value: props.text,
      editable: false,
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
        onDblclick={(event: Event) => event.stopPropagation()}
        onClick={(event: Event) => event.stopPropagation()}
      >
        <RenderEditableContainer />
      </div>
    )
  },
  slots: {} as SEditCellDefineSlots,
})

export default SEditCellSelectIcon
