import './input.less'
import 'ant-design-vue/es/input/style/index.less'
import 'ant-design-vue/es/button/style/index.less'

import { defineComponent, reactive, watch, watchEffect } from 'vue'
import AButton from 'ant-design-vue/es/button'
import AInput from 'ant-design-vue/es/input'

export const SEditCellInput = defineComponent({
  name: 'SEditCellInput',
  inheritAttrs: false,
  props: {
    text: {
      type: String,
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
    opened: {
      type: Boolean,
      default: false
    },
    status: {
      type: Boolean,
      default: false
    },
    synced: {
      type: Boolean,
      default: false
    },
    disabled: {
      type: Boolean,
      default: false
    },
    allowClear: {
      type: Boolean,
      default: false
    },
    placeholder: {
      type: String,
      default: undefined
    },
    cellStyle: {
      type: Object,
      default: () => ({})
    }
  },
  emits: {
    'edit': (options: { event: Event, value: string }) => true,
    'blur': (options: { event: Event, value: string }) => true,
    'focus': (options: { event: Event, value: string }) => true,
    'change': (options: { event: Event, value: string }) => true,
    'confirm': (options: { event: Event, value: string }) => true,
    'update:status': (status: boolean) => true,
    'update:text': (text: string) => true
  },
  setup(props, { emit, slots }) {
    const doEdit = (event: Event) => {
      proxy.editable = true
      proxy.value = props.text
      emit('edit', { event, value: proxy.value })
      emit('update:status', true)
      event.stopPropagation()
    }

    const doBlur = (event: Event) => {
      emit('blur', { event, value: proxy.value })
      event.stopPropagation()
    }

    const doFocus = (event: Event) => {
      emit('focus', { event, value: proxy.value })
      event.stopPropagation()
    }

    const doChange = (event: Event) => {
      emit('change', { event, value: proxy.value })
      emit('update:text', proxy.value)
      event.stopPropagation()
    }

    const doConfirm = (event: Event) => {
      if (!props.opened) {
        proxy.editable = false
      }
      emit('confirm', { event, value: proxy.value })
      event.stopPropagation()
    }

    const RenderCheckButton = () => {
      if (!props.disabled && props.check) {
        return (
          <AButton
            class='s-editable-cell-button-check'
            icon='check'
            type='link'
            style={{ color: '--ant-primary-color', ...props.cellStyle.check }}
            onClick={(event: Event) => doConfirm(event)}
          />
        )
      }
      return null
    }

    const RenderEditButton = () => {
      if (!props.disabled && props.check) {
        return (
          <AButton
            class='s-editable-cell-button-edit'
            icon='edit'
            type='link'
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
              class='s-editable-cell-input'
              style={props.cellStyle.input}
              allowClear={props.allowClear}
              placeholder={props.placeholder}
              onPressEnter={(event: Event) => doConfirm(event)}
              onChange={(event: Event) => doChange(event)}
              onFocus={(event: Event) => doFocus(event)}
              onBlur={(event: Event) => doBlur(event)}
            />
            <RenderCheckButton/>
          </div>
        )
      }
      return (
        <div
          title={props.text}
          style={props.cellStyle.textWrapper}
          class={['s-editable-cell-text-wrapper', { 'disabled-icon': props.disabled || !props.edit }]}
          onClick={event => !props.disabled && props.edit && doEdit(event)}
        >
          { RenderEditableCellText() }
          <RenderEditButton/>
        </div>
      )
    }

    const RenderEditableCellText = () => {
      return slots.editableCellText
        ? slots.editableCellText({ text: props.text })
        : props.text
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
        class={['s-editable-cell-container', { editabled: proxy.editable }]}
        style={props.cellStyle.container}
      >
        <RenderEditableContainer/>
      </div>
    )
  }
})

export default SEditCellInput
