import './date-picker.less'
import 'ant-design-vue/es/empty/style/index.less'
import 'ant-design-vue/es/button/style/index.less'
import 'ant-design-vue/es/date-picker/style/index.less'

import SEllipsis from '../S-Ellipsis/index'
import { CheckOutlined, EditOutlined } from '@ant-design/icons-vue'
import { defineComponent, PropType, reactive, toRaw, watch, watchEffect } from 'vue'
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
    showTime: {
      type: Boolean,
      default: false
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
    'edit': (proxy: { editable: boolean, value: string }) => true,
    'blur': (proxy: { editable: boolean, value: string }) => true,
    'focus': (proxy: { editable: boolean, value: string }) => true,
    'change': (proxy: { editable: boolean, value: string }) => true,
    'confirm': (proxy: { editable: boolean, value: string }) => true,
    'update:status': (status: boolean) => true,
    'update:text': (text: string) => true
  },
  setup(props, { emit, slots }) {
    const doDayjs = (date: any) => {
      return date ? dayjs(date) : null
    }

    const doFormat = (date: any) => {
      return date ? dayjs(date).format(props.valueFormat || props.format || (props.showTime === true ? 'YYYY-MM-DD HH:mm:ss' : 'YYYY-MM-DD')) : ''
    }

    const doEdit = (event: Event) => {
      proxy.editable = true
      proxy.value = props.text
      proxy.date = doDayjs(props.text)
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

    const doChange = (date: dayjs.Dayjs | string) => {
      proxy.value = doFormat(proxy.date)
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
            <ADatePicker
              v-model={[proxy.date, 'value']}
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
              onFocus={(event: Event) => doFocus(event)}
              onBlur={(event: Event) => doBlur(event)}
            />
            <RenderCheckButton/>
          </div>
        )
      }

      return (
        <SEllipsis
          title={props.text ? String(props.text) : undefined}
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
      return slots.editableCellText
        ? slots.editableCellText({ text: props.text, ...toRaw(proxy) })
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

export default SEditCellDatePicker
