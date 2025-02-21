import { DeepReadonly, VNode, Ref } from 'vue'
import { Rule } from 'ant-design-vue/es/form'
import helper from '@/helper'

export type SFormType =
  | 'ARate'
  | 'AInput'
  | 'ASwitch'
  | 'ASlider'
  | 'ASelect'
  | 'ACascader'
  | 'ATreeSelect'
  | 'ARadioGroup'
  | 'ACheckboxGroup'
  | 'AAutoComplete'
  | 'AInputSearch'
  | 'AInputPassword'
  | 'AInputTextarea'
  | 'AInputNumber'
  | 'ARangePicker'
  | 'ADatePicker'
  | 'AYearPicker'
  | 'AMonthPicker'
  | 'AQuarterPicker'
  | 'AWeekPicker'
  | 'ATimePicker'

export type SFormGridGutter = number | {
  xs?: number;
  sm?: number;
  md?: number;
  lg?: number;
  xl?: number;
  xxl?: number;
  xxxl?: number;
}

export type SFormGrid = {
  type?: 'flex';
  align?: 'stretch' | 'bottom' | 'top' | 'middle';
  justify?: 'space-around' | 'space-between' | 'center' | 'end' | 'start';
  gutter?: SFormGridGutter | [SFormGridGutter, SFormGridGutter];
  wrap?: boolean;

  flex?: number | string;
  offset?: number;
  order?: number;
  pull?: number;
  push?: number;
  span?: number;

  xs?: number | { flex?: number | string; offset?: number; order?: number; pull?: number; push?: number; span?: number; };
  sm?: number | { flex?: number | string; offset?: number; order?: number; pull?: number; push?: number; span?: number; };
  md?: number | { flex?: number | string; offset?: number; order?: number; pull?: number; push?: number; span?: number; };
  lg?: number | { flex?: number | string; offset?: number; order?: number; pull?: number; push?: number; span?: number; };
  xl?: number | { flex?: number | string; offset?: number; order?: number; pull?: number; push?: number; span?: number; };
  xxl?: number | { flex?: number | string; offset?: number; order?: number; pull?: number; push?: number; span?: number; };
  xxxl?: number | { flex?: number | string; offset?: number; order?: number; pull?: number; push?: number; span?: number; };
}

export type SFormColItem = {
  type: SFormType;
  slot: string;
  label: string;
  field: string[];

  grid: SFormGrid;
  rules: Rule | Array<Rule> | undefined;
  layer: Record<string, any>;

  props: Record<string, any>;
  slots: Record<string, VNode | ((...rest: any[]) => any)>;

  default: {
    input: string | number | boolean | undefined | null | Record<string, any> | Array<any> | ((options: { helper: typeof helper; self: DeepReadonly<SFormColItem>; }) => any);
    output: string | number | boolean | undefined | null | Record<string, any> | Array<any> | ((options: { helper: typeof helper; self: DeepReadonly<SFormColItem>; }) => any);
  };

  transfer: {
    input: (value: any, options: { helper: typeof helper; self: DeepReadonly<SFormColItem>; }) => any;
    output: (value: any, options: { helper: typeof helper; self: DeepReadonly<SFormColItem>; }) => any;
  };

  readonly: Ref<boolean> | boolean;
  disabled: Ref<boolean> | boolean;
  render: Ref<boolean> | boolean;
  show: Ref<boolean> | boolean;
}

export type SFormColPartItem = {
  type: SFormType;
  slot?: string;
  label?: string;
  field: string | string[];

  grid?: SFormGrid;
  layer?: Record<string, any>;
  rules?: Rule | Array<Rule>;

  props?: Record<string, any>;
  slots?: Record<string, VNode | ((...rest: any[]) => any)>;

  default?: {
    input?: string | number | boolean | undefined | null | Record<string, any> | Array<any> | ((options: { helper: typeof helper; self: DeepReadonly<SFormColItem>; }) => any);
    output?: string | number | boolean | undefined | null | Record<string, any> | Array<any> | ((options: { helper: typeof helper; self: DeepReadonly<SFormColItem>; }) => any);
  };

  transfer?: {
    input?: (value: any, options: { helper: typeof helper; self: DeepReadonly<SFormColItem>; }) => any;
    output?: (value: any, options: { helper: typeof helper; self: DeepReadonly<SFormColItem>; }) => any;
  };

  readonly?: Ref<boolean> | boolean;
  disabled?: Ref<boolean> | boolean;
  render?: Ref<boolean> | boolean;
  show?: Ref<boolean> | boolean;
}

export type SFormColSlotItem = {
  type: SFormType;
  slot: string;
  label: string;
  field: string[];

  grid: SFormGrid;
  rules: Rule | Array<Rule> | undefined;
  layer: Record<string, any>;

  props: Record<string, any>;
  slots: Record<string, VNode | ((...rest: any[]) => any)>;

  default: {
    input: string | number | boolean | undefined | null | Record<string, any> | Array<any> | ((options: { helper: typeof helper; self: DeepReadonly<SFormColItem>; }) => any);
    output: string | number | boolean | undefined | null | Record<string, any> | Array<any> | ((options: { helper: typeof helper; self: DeepReadonly<SFormColItem>; }) => any);
  };

  transfer: {
    input: (value: any, options: { helper: typeof helper; self: DeepReadonly<SFormColItem>; }) => any;
    output: (value: any, options: { helper: typeof helper; self: DeepReadonly<SFormColItem>; }) => any;
  };

  readonly: boolean;
  disabled: boolean;
  render: boolean;
  show: boolean;
}

export type SFormRowItem = {
  type: 'ARow';
  grid: SFormGrid;
  items: Array<SFormColItem>;
  readonly: Ref<boolean> | boolean;
  disabled: Ref<boolean> | boolean;
}

export type SFormRowPartItem = {
  type: 'ARow';
  grid?: SFormGrid;
  readonly?: Ref<boolean> | boolean;
  disabled?: Ref<boolean> | boolean;
}

export type SFormRowSlotItem = {
  type: 'ARow';
  grid: SFormGrid;
  items: Array<SFormColItem>;
  readonly: boolean;
  disabled: boolean;
}

export type SFormGroupItem = {
  type: 'AGroup';
  grid: SFormGrid;
  slot: string;
  label: string;
  field: string;
  items: Array<SFormRowItem>;
  border?: string | boolean | Ref<string | boolean>;
  readonly: Ref<boolean> | boolean;
  disabled: Ref<boolean> | boolean;
  render: Ref<boolean> | boolean;
  show: Ref<boolean> | boolean;
}

export type SFormGroupPartItem = {
  type: 'AGroup';
  grid?: SFormGrid;
  slot?: string;
  label?: string;
  field?: string;
  border?: string | boolean | Ref<string | boolean>;
  readonly?: Ref<boolean> | boolean;
  disabled?: Ref<boolean> | boolean;
  render?: Ref<boolean> | boolean;
  show?: Ref<boolean> | boolean;
}

export type SFormGroupSlotItem = {
  type: 'AGroup';
  grid: SFormGrid;
  slot: string;
  label: string;
  field: string;
  items: Array<SFormRowSlotItem>;
  border?: string | boolean;
  readonly: boolean;
  disabled: boolean;
  render: boolean;
  show: boolean;
}

export type SFormNormalizeType = Record<SFormType, SFormColItem>
export type SFormValidatorRule = Omit<Rule, 'message' | 'validator'> & { message: string; validator: Rule['validator'] | string; }
export type SFormGroupsDefiner = (config: Array<SFormGroupPartItem | SFormRowPartItem | SFormColPartItem>) => Array<SFormGroupPartItem | SFormRowPartItem | SFormColPartItem>
export type SFormValidatorManager = Record<string, (options: SFormValidatorRule) => SFormValidatorRule>
