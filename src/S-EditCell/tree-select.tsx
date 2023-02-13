import './tree-select.less'
import 'ant-design-vue/es/button/style/index.less'
import 'ant-design-vue/es/tree-select/style/index.less'

import { defineComponent, reactive, watch, watchEffect, PropType } from 'vue'
import { DefaultOptionType } from 'ant-design-vue/es/vc-tree-select/TreeSelect'
import ATreeSelect from 'ant-design-vue/es/tree-select'
import AButton from 'ant-design-vue/es/button'

interface FieldNames {
  value?: string;
  label?: string;
  options?: string;
}

export const SEditCellTreeSelect = defineComponent({
  name: 'SEditCellTreeSelect',
  props: {
    text: {
      type: [Number, String] as PropType<string | number | undefined>,
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
      default: undefined
    },
    placeholder: {
      type: String,
      default: undefined
    },
    treeNodeFilterProp: {
      type: String,
      default: undefined
    },
    treeDefaultExpandAll: {
      type: Boolean,
      default: false
    },
    cellStyle: {
      type: Object,
      default: () => ({})
    }
  },
  emits: {
    'edit': (options: { event: Event, value: string | number | undefined }) => true,
    'confirm': (options: { event: Event, value: string | number | undefined }) => true,
    'change': (options: { value: string | number | undefined }) => true,
    'update:text': (text: string | number | undefined) => true,
    'update:status': (status: boolean) => true
  },
  setup(props, { emit, slots }) {
    const doEdit = (event: Event) => {
      proxy.editable = true
      proxy.value = props.text
      emit('edit', { event, value: proxy.value })
      emit('update:status', true)
      event.stopPropagation()
    }

    const doChange = (value: any) => {
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
            <ATreeSelect
              v-model={[proxy.value, 'value']}
              class='s-editable-cell-input'
              style={props.cellStyle.input}
              treeData={props.options}
              showArrow={props.showArrow}
              allowClear={props.allowClear}
              showSearch={props.showSearch}
              fieldNames={props.fieldNames}
              placeholder={props.placeholder}
              treeNodeFilterProp={props.treeNodeFilterProp}
              treeDefaultExpandAll={props.treeDefaultExpandAll}
              dropdownStyle={{ maxHeight: '400px', overflow: 'auto', padding: '0 18px 0 0', ...props.cellStyle.dropdown }}
              onChange={(value: any) => doChange(value)}
            />
            <RenderCheckButton/>
          </div>
        )
      }
      return (
        <div
          style={props.cellStyle.textWrapper}
          title={props.text ? String(props.text) : undefined}
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

export default SEditCellTreeSelect
