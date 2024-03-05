import './tree-select.less'
import 'ant-design-vue/es/empty/style/index.less'
import 'ant-design-vue/es/button/style/index.less'
import 'ant-design-vue/es/tree-select/style/index.less'

import * as VueTypes from 'vue-types'
import SEllipsis from '../S-Ellipsis/index'
import { CheckOutlined, EditOutlined } from '@ant-design/icons-vue'
import { defaultConfigProvider } from 'ant-design-vue/es/config-provider'
import { SlotsType, defineComponent, reactive, toRaw, watch, watchEffect, inject } from 'vue'
import { DefaultOptionType } from 'ant-design-vue/es/vc-tree-select/TreeSelect'
import ATreeSelect from 'ant-design-vue/es/tree-select'
import AButton from 'ant-design-vue/es/button'
import helper from '@/helper'

export type SEditCellTreeSelectOptionType = DefaultOptionType

type SEditCellDefineSlots = SlotsType<{
  editableCellText: {
    editable: boolean;
    value: string;
    text: string;
  };
}>

export const SEditCellTreeSelect = defineComponent({
  name: 'SEditCellTreeSelect',
  props: {
    text: VueTypes.string().def(''),
    empty: VueTypes.string().def(''),
    edit: VueTypes.bool().def(true),
    check: VueTypes.bool().def(true),
    synced: VueTypes.bool().def(false),
    opened: VueTypes.bool().def(false),
    status: VueTypes.bool().def(false),
    tooltip: VueTypes.object<{ enable?: boolean, ellipsis?: boolean }>().def(() => ({ enable: true, ellipsis: false })),
    disabled: VueTypes.bool().def(false),
    treeData: VueTypes.array<SEditCellTreeSelectOptionType>().def(() => ([])),
    showArrow: VueTypes.bool().def(true),
    allowClear: VueTypes.bool().def(false),
    showSearch: VueTypes.bool().def(false),
    fieldNames: VueTypes.object<{ label?: string; value?: string; children?: string; }>().def(() => ({ label: 'title', value: 'value', children: 'children' })),
    placeholder: VueTypes.string().def(),
    treeNodeFilterProp: VueTypes.string().def(),
    treeDefaultExpandAll: VueTypes.bool().def(true),
    cellStyle: VueTypes.object().def(() => ({}))
  },
  emits: {
    'edit': (proxy: { editable: boolean, value: any }) => true,
    'blur': (proxy: { editable: boolean, value: any }) => true,
    'focus': (proxy: { editable: boolean, value: any }) => true,
    'change': (proxy: { editable: boolean, value: any }) => true,
    'confirm': (proxy: { editable: boolean, value: any }) => true,
    'update:status': (status: boolean) => true,
    'update:text': (text: any) => true
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

    const doChange = (value: any) => {
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
            style={{ color: 'var(--ant-primary-color, #1890ff)', ...props.cellStyle.check }}
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
            <ATreeSelect
              v-model={[proxy.value, 'value']}
              class='s-editable-cell-input'
              style={props.cellStyle.input}
              size={provider.componentSize}
              treeData={props.treeData}
              showArrow={props.showArrow}
              allowClear={props.allowClear}
              showSearch={props.showSearch}
              fieldNames={props.fieldNames}
              placeholder={props.placeholder}
              treeNodeFilterProp={props.treeNodeFilterProp}
              treeDefaultExpandAll={props.treeDefaultExpandAll}
              dropdownStyle={{ maxHeight: '400px', overflow: 'auto', padding: '0 18px 0 0', ...props.cellStyle.dropdown }}
              onChange={(value: any) => doChange(value)}
              onFocus={(event: Event) => doFocus(event)}
              onBlur={(event: Event) => doBlur(event)}
            />
            <RenderCheckButton/>
          </div>
        )
      }

      const text = props.text
      const fieldLabel = props.fieldNames.label || 'label'
      const fieldValue = props.fieldNames.value || 'value'
      const fieldChildren = props.fieldNames.children || 'children'
      const isPrimitive = typeof text === 'string' || typeof text === 'number'
      const title = isPrimitive ? helper.takeLabelByKey(props.treeData, text, fieldLabel, fieldValue, fieldChildren) || props.text : undefined

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
            <RenderEditButton/>
          </div>
        </SEllipsis>
      )
    }

    const RenderEditableCellText = () => {
      const text = props.text
      const fieldLabel = props.fieldNames.label
      const fieldValue = props.fieldNames.value
      const fieldChildren = props.fieldNames.children
      const isPrimitive = typeof text === 'string' || typeof text === 'number'

      const slotText = slots.editableCellText ? slots.editableCellText({ text: props.text, ...toRaw(proxy) }) : null
      const cellText = slotText ?? (isPrimitive ? helper.takeLabelByKey(props.treeData, text, fieldLabel, fieldValue, fieldChildren) || props.text : props.text) as any
      const empty = props.empty

      return cellText || cellText === 0
        ? cellText
        : empty
    }

    const provider = inject('configProvider', defaultConfigProvider)

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
  },
  slots: {} as SEditCellDefineSlots
})

export default SEditCellTreeSelect
