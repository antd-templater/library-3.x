import './date-picker.less'
import 'ant-design-vue/es/button/style/index.less'
import 'ant-design-vue/es/date-picker/style/index.less'

import { defineComponent, PropType, reactive, watch, watchEffect } from 'vue'

import { PanelMode, PickerMode } from 'ant-design-vue/es/vc-picker/interface'
import ADatePicker from 'ant-design-vue/es/date-picker'
import AButton from 'ant-design-vue/es/button'
import dayjs from 'dayjs'

export const SEditCellDatePicker = defineComponent({
  name: 'SEditCellDatePicker',
  inheritAttrs: false,
  props: {
    mode: {
      type: String as PropType<PanelMode>,
      default: 'date'
    },
    picker: {
      type: String as PropType<PickerMode>,
      default: 'date'
    },
    format: {
      type: String,
      default: undefined
    },
    valueFormat: {
      type: String,
      default: undefined
    },
    allowClear: {
      type: Boolean,
      default: false
    },
    inputReadOnly: {
      type: Boolean,
      default: false
    },
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
    'confirm': (options: { event: Event, value: string }) => true,
    'change': (options: { value: string }) => true,
    'update:status': (status: boolean) => true,
    'update:text': (text: string) => true
  },
  setup(props, { emit, slots }) {
    const doDayjs = (date: any) => {
      return date ? dayjs(date) : null
    }

    const doFormat = (date: any) => {
      return date ? dayjs(date).format(props.valueFormat || props.format || (props.mode === 'time' ? 'YYYY-MM-DD HH:mm:ss' : 'YYYY-MM-DD')) : ''
    }

    const doEdit = (event: Event) => {
      proxy.editable = true
      proxy.value = props.text
      proxy.date = doDayjs(props.text)
      emit('edit', { event, value: proxy.value })
      emit('update:status', true)
      event.stopPropagation()
    }

    const doChange = (date: dayjs.Dayjs | string) => {
      proxy.value = doFormat(proxy.date)
      emit('change', { value: proxy.value })
      emit('update:text', proxy.value)
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
            <ADatePicker
              v-model={[proxy.value, 'value']}
              class='s-editable-cell-input'
              style={props.cellStyle.input}
              mode={props.mode}
              picker={props.picker}
              format={props.format}
              allowClear={props.allowClear}
              valueFormat={props.valueFormat}
              placeholder={props.placeholder}
              inputReadOnly={props.inputReadOnly}
              onChange={(date: dayjs.Dayjs | string) => doChange(date)}
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
      date: doDayjs(props.text),
      value: props.text,
      editable: false
    })

    watchEffect(() => {
      props.disabled && (proxy.editable = false)
      props.disabled || (proxy.editable = props.opened)
    })

    watch(() => props.text, () => !props.disabled && props.synced && (proxy.value = props.text))
    watch(() => props.text, () => !props.disabled && props.synced && (proxy.date = doDayjs(props.text)))
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

export default SEditCellDatePicker
