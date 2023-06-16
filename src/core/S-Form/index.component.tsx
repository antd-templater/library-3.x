import * as VueTypes from 'vue-types'
import { defineComponent, h } from 'vue'
import { SFormType } from './form.declare'

import './index.component.less'
import 'ant-design-vue/es/rate/style/index.less'
import 'ant-design-vue/es/radio/style/index.less'
import 'ant-design-vue/es/input/style/index.less'
import 'ant-design-vue/es/button/style/index.less'
import 'ant-design-vue/es/switch/style/index.less'
import 'ant-design-vue/es/select/style/index.less'
import 'ant-design-vue/es/slider/style/index.less'
import 'ant-design-vue/es/checkbox/style/index.less'
import 'ant-design-vue/es/cascader/style/index.less'
import 'ant-design-vue/es/date-picker/style/index.less'
import 'ant-design-vue/es/time-picker/style/index.less'
import 'ant-design-vue/es/tree-select/style/index.less'
import 'ant-design-vue/es/input-number/style/index.less'
import 'ant-design-vue/es/auto-complete/style/index.less'

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
  ATimePicker: ATimePicker
}

export const SFormComponent = defineComponent({
  name: 'SFormComponent',
  inheritAttrs: false,
  props: {
    type: VueTypes.string<SFormType>().isRequired,
    source: VueTypes.object().isRequired,
    attrs: VueTypes.object().isRequired,
    field: VueTypes.string().isRequired
  },
  setup(props, context) {
    return () => {
      const type = props.type
      const field = props.field
      const source = props.source
      const Component = AComponents[type]

      let attrs: any = {}

      if (type === 'ASwitch') {
        attrs = {
          'checked': source[field],
          'onUpdate:checked': (checked: any) => { source[field] = checked },
          ...props.attrs
        }

        attrs.size = attrs.size !== 'small'
          ? 'default'
          : 'small'
      }

      if (type === 'ARadioGroup' || type === 'ACheckboxGroup') {
        attrs = {
          'value': source[field],
          'onUpdate:value': (checked: any) => { source[field] = checked },
          ...props.attrs
        }

        attrs.size = attrs.size !== 'middle'
          ? attrs.size
          : 'default'
      }

      if (type !== 'ASwitch' && type !== 'ARadioGroup' && type !== 'ACheckboxGroup') {
        attrs = {
          'value': source[field],
          'onUpdate:value': (value: any) => { source[field] = value },
          ...props.attrs
        }
      }

      if (type === 'AQuarterPicker') {
        attrs.valueFormat = 'YYYY-Q'
        attrs.format = 'YYYY-Q'
      }

      if (type === 'AMonthPicker') {
        attrs.valueFormat = 'YYYY-MM'
        attrs.format = 'YYYY-MM'
      }

      if (type === 'AYearPicker') {
        attrs.valueFormat = 'YYYY'
        attrs.format = 'YYYY'
      }

      if (type === 'AWeekPicker') {
        attrs.valueFormat = 'YYYY-ww'
        attrs.format = 'YYYY-ww'
      }

      return Component ? h(Component, attrs, context.slots) : null
    }
  }
})

export default SFormComponent
