import './input.less'

import * as VueTypes from 'vue-types'
import SEllipsis from '../S-Ellipsis/index'
import { CheckOutlined, EditOutlined } from '@ant-design/icons-vue'
import { SlotsType, defineComponent, reactive, toRaw, watch, watchEffect } from 'vue'
import { useConfigContextInject } from 'ant-design-vue/es/config-provider/context'
import AButton from 'ant-design-vue/es/button'
import AInput from 'ant-design-vue/es/input'

type SEditCellDefineSlots = SlotsType<{
  editableCellText: {
    editable: boolean;
    value: string;
    text: string;
  };
}>

export const SEditCellInput = defineComponent({
  name: 'SEditCellInput',
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
    allowClear: VueTypes.bool().def(false),
    placeholder: VueTypes.string().def(),
    cellStyle: VueTypes.object().def(() => ({})),
  },
  emits: {
    'edit': (proxy: { editable: boolean; value: string; }) => true,
    'blur': (proxy: { editable: boolean; value: string; }) => true,
    'focus': (proxy: { editable: boolean; value: string; }) => true,
    'change': (proxy: { editable: boolean; value: string; }) => true,
    'confirm': (proxy: { editable: boolean; value: string; }) => true,
    'update:status': (status: boolean) => true,
    'update:text': (text: string) => true,
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

    const doChange = (event: Event) => {
      emit('update:text', proxy.value)
      emit('change', toRaw(proxy))
      event.stopPropagation()
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
            <AInput
              v-model={[proxy.value, 'value']}
              size={provider.componentSize?.value}
              class="s-editable-cell-input"
              style={props.cellStyle.input}
              allowClear={props.allowClear}
              placeholder={props.placeholder}
              onPressEnter={(event: Event) => doConfirm(event)}
              onChange={(event: Event) => doChange(event)}
              onFocus={(event: Event) => doFocus(event)}
              onBlur={(event: Event) => doBlur(event)}
            />
            <RenderCheckButton />
          </div>
        )
      }
      return (
        <SEllipsis
          title={props.text ? String(props.text) : ''}
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
      const slotText = slots.editableCellText ? slots.editableCellText({ text: props.text, ...toRaw(proxy) }) : null
      const cellText = slotText ?? props.text as any
      const empty = props.empty

      return cellText || cellText === 0
        ? cellText
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

export default SEditCellInput
