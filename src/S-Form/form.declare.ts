import { Rule } from 'ant-design-vue/es/form'
import helper from '../helper'

export type SFormType =
  | 'ARate'
  | 'AInput'
  | 'ASwitch'
  | 'ASelect'
  | 'ATreeSelect'
  | 'ARadioGroup'
  | 'ACheckboxGroup'
  | 'AInputPassword'
  | 'AAutoComplete'
  | 'AInputNumber'
  | 'ARangePicker'
  | 'ADatePicker'
  | 'AYearPicker'
  | 'AMonthPicker'
  | 'AQuarterPicker'
  | 'AWeekPicker'
  | 'ATimePicker'
  | 'ATextarea'
  | 'ACascader'
  | 'ASearch'

export type SFormItem = {
  type: SFormType;
  slot: string;
  label: string;
  field: string | string[];

  grids: Record<string, any>;
  attrs: Record<string, any>;
  slots: Record<string, any>;
  events: Record<string, any>;

  default: { input: any; output: any; };

  transfer: {
    input: (value: any, options: { helper: typeof helper, self: Readonly<SFormItem> }) => any;
    output: (value: any, options: { helper: typeof helper, self: Readonly<SFormItem> }) => any;
  }
}

export type SFormItemGroup = Record<SFormType, SFormItem>
export type SFormValidatorRule = Omit<Rule, 'message' | 'validator'> & { message?: string, validator: Rule['validator'] | string }
export type SFormValidatorManager = Record<string, (options: SFormValidatorRule) => Rule>
