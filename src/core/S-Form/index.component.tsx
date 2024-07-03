import './index.component.less'

import * as VueTypes from 'vue-types'
import { SFormType } from './form.declare'
import { defineComponent } from 'vue'
import { nextTick } from 'vue'
import { ref, h } from 'vue'

import ARate from 'ant-design-vue/es/rate'
import ARadio from 'ant-design-vue/es/radio'
import AInput from 'ant-design-vue/es/input'
import ASwitch from 'ant-design-vue/es/switch'
import ASelect from 'ant-design-vue/es/select'
import ASlider from 'ant-design-vue/es/slider'
import ACheckbox from 'ant-design-vue/es/checkbox'
import ACascader from 'ant-design-vue/es/cascader'
import ADatePicker from 'ant-design-vue/es/date-picker'
import ATimePicker from 'ant-design-vue/es/time-picker'
import ATreeSelect from 'ant-design-vue/es/tree-select'
import AInputNumber from 'ant-design-vue/es/input-number'
import AAutoComplete from 'ant-design-vue/es/auto-complete'

const AComponents: Record<string, any> = {
  ARate: ARate,
  AInput: AInput,
  ASwitch: ASwitch,
  ASelect: ASelect,
  ASlider: ASlider,
  ACascader: ACascader,
  ATreeSelect: ATreeSelect,
  ARadioGroup: ARadio.Group,
  AAutoComplete: AAutoComplete,
  AInputNumber: AInputNumber,
  AInputSearch: AInput.Search,
  ACheckboxGroup: ACheckbox.Group,
  AInputPassword: AInput.Password,
  AInputTextarea: AInput.TextArea,
  ARangePicker: ADatePicker.RangePicker,
  AYearPicker: ADatePicker.YearPicker,
  AMonthPicker: ADatePicker.MonthPicker,
  AQuarterPicker: ADatePicker.QuarterPicker,
  AWeekPicker: ADatePicker.WeekPicker,
  ADatePicker: ADatePicker,
  ATimePicker: ATimePicker,
}

export const SFormComponent = defineComponent({
  name: 'SFormComponent',
  inheritAttrs: false,
  props: {
    type: VueTypes.string<SFormType>().isRequired,
    disabled: VueTypes.bool().isRequired,
    readonly: VueTypes.bool().isRequired,
    source: VueTypes.object().isRequired,
    field: VueTypes.string().isRequired,
    attrs: VueTypes.object().isRequired,
  },
  setup(props, context) {
    return () => {
      const type = props.type
      const field = props.field
      const source = props.source
      const disabled = props.disabled
      const readonly = props.readonly
      const Component = AComponents[type]
      const component = ref(null as HTMLElement | null)

      let attrs: any = {}

      if (type === 'ASwitch') {
        attrs = {
          'checked': source[field],
          'onUpdate:checked': (checked: any) => { source[field] = checked },
          ...props.attrs,
        }

        attrs.size = attrs.size !== 'small'
          ? 'default'
          : 'small'
      }

      if (type === 'ARadioGroup' || type === 'ACheckboxGroup') {
        attrs = {
          'value': source[field],
          'onUpdate:value': (checked: any) => { source[field] = checked },
          ...props.attrs,
        }

        attrs.size = attrs.size !== 'middle'
          ? attrs.size
          : 'default'
      }

      if (type !== 'ASwitch' && type !== 'ARadioGroup' && type !== 'ACheckboxGroup') {
        attrs = {
          'value': source[field],
          'onUpdate:value': (value: any) => { source[field] = value },
          ...props.attrs,
        }
      }

      if (type === 'AQuarterPicker' || (type === 'ADatePicker' && attrs.picker === 'quarter') || (type === 'ARangePicker' && attrs.picker === 'quarter')) {
        attrs.valueFormat = attrs.valueFormat ?? 'YYYY-Q'
        attrs.format = attrs.format ?? 'YYYY-Q'
      }

      if (type === 'AMonthPicker' || (type === 'ADatePicker' && attrs.picker === 'month') || (type === 'ARangePicker' && attrs.picker === 'month')) {
        attrs.valueFormat = attrs.valueFormat ?? 'YYYY-MM'
        attrs.format = attrs.format ?? 'YYYY-MM'
      }

      if (type === 'AYearPicker' || (type === 'ADatePicker' && attrs.picker === 'year') || (type === 'ARangePicker' && attrs.picker === 'year')) {
        attrs.valueFormat = attrs.valueFormat ?? 'YYYY'
        attrs.format = attrs.format ?? 'YYYY'
      }

      if (type === 'AWeekPicker' || (type === 'ADatePicker' && attrs.picker === 'week') || (type === 'ARangePicker' && attrs.picker === 'week')) {
        attrs.valueFormat = attrs.valueFormat ?? 'YYYY-ww'
        attrs.format = attrs.format ?? 'YYYY-ww'
      }

      if (type === 'ADatePicker' || type === 'ARangePicker') {
        attrs.valueFormat = attrs.valueFormat ?? (attrs.showTime === true ? 'YYYY-MM-DD HH:mm:ss' : 'YYYY-MM-DD')
        attrs.format = attrs.format ?? (attrs.showTime === true ? 'YYYY-MM-DD HH:mm:ss' : 'YYYY-MM-DD')
      }

      if (type === 'ATimePicker') {
        attrs.valueFormat = attrs.valueFormat ?? (attrs.use12Hours === true ? 'h:mm:ss a' : 'HH:mm:ss')
        attrs.format = attrs.format ?? (attrs.use12Hours === true ? 'h:mm:ss a' : 'HH:mm:ss')
      }

      if (readonly && !disabled) {
        nextTick(() => {
          const selector = '[disabled],[class*="-disabled"]'
          const elements = component.value?.querySelectorAll(selector)

          elements?.forEach(element => {
            if (typeof HTMLElement !== 'undefined' && (element instanceof HTMLElement)) {
              for (const name of Array.from(element.classList)) {
                if (/-disabled(\b|$)/.test(name)) {
                  element.classList.remove(name)
                }
              }

              if (element.hasAttribute('disabled')) {
                element.removeAttribute('disabled')
              }
            }
          })
        })
      }

      return (
        <div
          ref={component}
          style="display: inherit; display: contents;"
        >
          { Component ? h(Component, attrs, context.slots) : null }
        </div>
      )
    }
  },
})

export default SFormComponent
