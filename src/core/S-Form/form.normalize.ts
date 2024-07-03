import { SFormNormalizeType } from './form.declare'
import dayjs from '@/dayjs'

export const SFormNormalize: SFormNormalizeType = {
  ARate: {
    type: 'ARate',
    slot: '',
    label: '',
    field: [],

    grid: {},
    layer: {},
    rules: undefined,

    props: {},
    slots: {},
    default: {
      input: undefined,
      output: undefined,
    },
    transfer: {
      input: (value, { helper }) => value !== undefined ? (value && helper.isFiniteNumber(+value) ? +value : 0) : undefined,
      output: (value, { helper }) => value !== undefined ? (value && helper.isFiniteNumber(+value) ? +value : 0) : undefined,
    },

    readonly: false,
    disabled: false,
    render: true,
    show: true,
  },

  AInput: {
    type: 'AInput',
    slot: '',
    label: '',
    field: [],

    grid: {},
    layer: {},
    rules: undefined,

    props: {},
    slots: {},
    default: {
      input: undefined,
      output: undefined,
    },
    transfer: {
      input: (value, { helper }) => value !== undefined ? (helper.isPrimitive(value) ? String(value) : '') : undefined,
      output: (value, { helper }) => value !== undefined ? (helper.isPrimitive(value) ? String(value) : '') : undefined,
    },

    readonly: false,
    disabled: false,
    render: true,
    show: true,
  },

  ASwitch: {
    type: 'ASwitch',
    slot: '',
    label: '',
    field: [],

    grid: {},
    layer: {},
    rules: undefined,

    props: {},
    slots: {},
    default: {
      input: ({ self }) => self.props.unCheckedValue !== undefined ? self.props.unCheckedValue : undefined,
      output: ({ self }) => self.props.unCheckedValue !== undefined ? self.props.unCheckedValue : undefined,
    },
    transfer: {
      input: (value, { self }) => value !== undefined ? (value === self.props.checkedValue || value === self.props.unCheckedValue ? value : self.props.unCheckedValue !== undefined ? self.props.unCheckedValue : value === true) : undefined,
      output: (value, { self }) => value !== undefined ? (value === self.props.checkedValue || value === self.props.unCheckedValue ? value : self.props.unCheckedValue !== undefined ? self.props.unCheckedValue : value === true) : undefined,
    },

    readonly: false,
    disabled: false,
    render: true,
    show: true,
  },

  ASlider: {
    type: 'ASlider',
    slot: '',
    label: '',
    field: [],

    grid: {},
    layer: {},
    rules: undefined,

    props: {},
    slots: {},
    default: {
      input: ({ self }) => self.props.range === true ? [] : undefined,
      output: ({ self }) => self.props.range === true ? [] : undefined,
    },
    transfer: {
      input(value, { helper, self }) {
        return self.props.range === true
          ? helper.isArray(value) ? value.filter((_, index) => index < 2).map(v => v !== undefined ? (helper.isFiniteNumber(v) ? v : 0) : undefined) : []
          : value !== undefined ? (helper.isFiniteNumber(value) ? value : 0) : undefined
      },
      output(value, { helper, self }) {
        return self.props.range === true
          ? helper.isArray(value) ? value.filter((_, index) => index < 2).map(v => v !== undefined ? (helper.isFiniteNumber(v) ? v : 0) : undefined) : []
          : value !== undefined ? (helper.isFiniteNumber(value) ? value : 0) : undefined
      },
    },

    readonly: false,
    disabled: false,
    render: true,
    show: true,
  },

  ASelect: {
    type: 'ASelect',
    slot: '',
    label: '',
    field: [],

    grid: {},
    layer: {},
    rules: undefined,

    props: {},
    slots: {},
    default: {
      input: ({ self }) => ['multiple', 'tags'].includes(self.props.mode) ? [] : undefined,
      output: ({ self }) => ['multiple', 'tags'].includes(self.props.mode) ? [] : undefined,
    },
    transfer: {
      input(value, { helper, self }) {
        return ['multiple', 'tags'].includes(self.props.mode)
          ? helper.isArray(value) ? value.filter(v => helper.isPrimitive(v)) : helper.isPrimitive(value) ? [value] : []
          : helper.isPrimitive(value) ? value : undefined
      },
      output(value, { helper, self }) {
        return ['multiple', 'tags'].includes(self.props.mode)
          ? helper.isArray(value) ? value.filter(v => helper.isPrimitive(v)) : helper.isPrimitive(value) ? [value] : []
          : helper.isPrimitive(value) ? value : undefined
      },
    },

    readonly: false,
    disabled: false,
    render: true,
    show: true,
  },

  ACascader: {
    type: 'ACascader',
    slot: '',
    label: '',
    field: [],

    grid: {},
    layer: {},
    rules: undefined,

    props: {},
    slots: {},
    default: {
      input: [],
      output: [],
    },
    transfer: {
      input: (value, { helper }) => helper.isArray(value) ? value.filter(v => helper.isPrimitive(v)) : [],
      output: (value, { helper }) => helper.isArray(value) ? value.filter(v => helper.isPrimitive(v)) : [],
    },

    readonly: false,
    disabled: false,
    render: true,
    show: true,
  },

  ATreeSelect: {
    type: 'ATreeSelect',
    slot: '',
    label: '',
    field: [],

    grid: {},
    layer: {},
    rules: undefined,

    props: {},
    slots: {},
    default: {
      input: ({ self }) => self.props.multiple === true ? [] : undefined,
      output: ({ self }) => self.props.multiple === true ? [] : undefined,
    },
    transfer: {
      input(value, { helper, self }) {
        return self.props.multiple === true
          ? helper.isArray(value) ? value.filter(v => helper.isPrimitive(v)) : helper.isPrimitive(value) ? [value] : []
          : helper.isPrimitive(value) ? value : undefined
      },
      output(value, { helper, self }) {
        return self.props.multiple === true
          ? helper.isArray(value) ? value.filter(v => helper.isPrimitive(v)) : helper.isPrimitive(value) ? [value] : []
          : helper.isPrimitive(value) ? value : undefined
      },
    },

    readonly: false,
    disabled: false,
    render: true,
    show: true,
  },

  ARadioGroup: {
    type: 'ARadioGroup',
    slot: '',
    label: '',
    field: [],

    grid: {},
    layer: {},
    rules: undefined,

    props: {},
    slots: {},
    default: {
      input: undefined,
      output: undefined,
    },
    transfer: {
      input: (value, { helper }) => helper.isPrimitive(value) ? value : undefined,
      output: (value, { helper }) => helper.isPrimitive(value) ? value : undefined,
    },

    readonly: false,
    disabled: false,
    render: true,
    show: true,
  },

  ACheckboxGroup: {
    type: 'ACheckboxGroup',
    slot: '',
    label: '',
    field: [],

    grid: {},
    layer: {},
    rules: undefined,

    props: {},
    slots: {},
    default: {
      input: [],
      output: [],
    },
    transfer: {
      input: (value, { helper }) => helper.isArray(value) ? value.filter(v => helper.isPrimitive(v)) : [],
      output: (value, { helper }) => helper.isArray(value) ? value.filter(v => helper.isPrimitive(v)) : [],
    },

    readonly: false,
    disabled: false,
    render: true,
    show: true,
  },

  AAutoComplete: {
    type: 'AAutoComplete',
    slot: '',
    label: '',
    field: [],

    grid: {},
    layer: {},
    rules: undefined,

    props: {},
    slots: {},
    default: {
      input: undefined,
      output: undefined,
    },
    transfer: {
      input: (value, { helper }) => helper.isPrimitive(value) ? String(value) : undefined,
      output: (value, { helper }) => helper.isPrimitive(value) ? String(value) : undefined,
    },

    readonly: false,
    disabled: false,
    render: true,
    show: true,
  },

  AInputSearch: {
    type: 'AInputSearch',
    slot: '',
    label: '',
    field: [],

    grid: {},
    layer: {},
    rules: undefined,

    props: {},
    slots: {},
    default: {
      input: undefined,
      output: undefined,
    },
    transfer: {
      input: (value, { helper }) => helper.isPrimitive(value) ? String(value) : undefined,
      output: (value, { helper }) => helper.isPrimitive(value) ? String(value) : undefined,
    },

    readonly: false,
    disabled: false,
    render: true,
    show: true,
  },

  AInputPassword: {
    type: 'AInputPassword',
    slot: '',
    label: '',
    field: [],

    grid: {},
    layer: {},
    rules: undefined,

    props: {},
    slots: {},
    default: {
      input: undefined,
      output: undefined,
    },
    transfer: {
      input: (value, { helper }) => helper.isPrimitive(value) ? String(value) : undefined,
      output: (value, { helper }) => helper.isPrimitive(value) ? String(value) : undefined,
    },

    readonly: false,
    disabled: false,
    render: true,
    show: true,
  },

  AInputTextarea: {
    type: 'AInputTextarea',
    slot: '',
    label: '',
    field: [],

    grid: {},
    layer: {},
    rules: undefined,

    props: {},
    slots: {},
    default: {
      input: undefined,
      output: undefined,
    },
    transfer: {
      input: (value, { helper }) => helper.isPrimitive(value) ? String(value) : undefined,
      output: (value, { helper }) => helper.isPrimitive(value) ? String(value) : undefined,
    },

    readonly: false,
    disabled: false,
    render: true,
    show: true,
  },

  AInputNumber: {
    type: 'AInputNumber',
    slot: '',
    label: '',
    field: [],

    grid: {},
    layer: {},
    rules: undefined,

    props: {},
    slots: {},
    default: {
      input: undefined,
      output: undefined,
    },
    transfer: {
      input: (value, { helper }) => helper.isFiniteNumber(+value) ? +value : undefined,
      output: (value, { helper }) => helper.isFiniteNumber(+value) ? +value : undefined,
    },

    readonly: false,
    disabled: false,
    render: true,
    show: true,
  },

  ARangePicker: {
    type: 'ARangePicker',
    slot: '',
    label: '',
    field: [],

    grid: {},
    layer: {},
    rules: undefined,

    props: {},
    slots: {},
    default: {
      input: [],
      output: [],
    },
    transfer: {
      input: (value, { helper, self }) => {
        const values = helper.isArray(value) ? value : []
        const format = self.props.valueFormat || (self.props.showTime === true ? 'YYYY-M-D H:m:s' : 'YYYY-M-D')
        return values.map((v: any) => v !== undefined ? (v instanceof Date && dayjs(v).isValid() ? dayjs(v) : dayjs(v, format).isValid() ? dayjs(v, format) : undefined) : undefined)
      },
      output: (value, { helper, self }) => {
        const values = helper.isArray(value) ? value : []
        const format = self.props.valueFormat || (self.props.showTime === true ? 'YYYY-MM-DD HH:mm:ss' : 'YYYY-MM-DD')
        return values.map((v: any) => v !== undefined ? (typeof v !== 'string' && dayjs(v).isValid() ? dayjs(v).format(format) : typeof v === 'string' ? v : '') : undefined)
      },
    },

    readonly: false,
    disabled: false,
    render: true,
    show: true,
  },

  ADatePicker: {
    type: 'ADatePicker',
    slot: '',
    label: '',
    field: [],

    grid: {},
    layer: {},
    rules: undefined,

    props: {},
    slots: {},
    default: {
      input: undefined,
      output: '',
    },
    transfer: {
      input: (value, { self }) => {
        if (value === undefined) {
          return undefined
        }

        const showTime = self.props.showTime
        const valueFormat = self.props.valueFormat
        const format = valueFormat || (showTime === true ? 'YYYY-M-D H:m:s' : 'YYYY-M-D')

        if (value instanceof Date && dayjs(value).isValid()) {
          return dayjs(value)
        }

        if (dayjs(value, format).isValid()) {
          return dayjs(value, format)
        }

        return undefined
      },
      output: (value, { self }) => {
        if (value === undefined) {
          return undefined
        }

        const showTime = self.props.showTime
        const valueFormat = self.props.valueFormat
        const format = valueFormat || (showTime === true ? 'YYYY-MM-DD HH:mm:ss' : 'YYYY-MM-DD')

        return typeof value !== 'string' && dayjs(value).isValid()
          ? dayjs(value).format(format)
          : typeof value === 'string'
            ? value
            : ''
      },
    },

    readonly: false,
    disabled: false,
    render: true,
    show: true,
  },

  AYearPicker: {
    type: 'AYearPicker',
    slot: '',
    label: '',
    field: [],

    grid: {},
    layer: {},
    rules: undefined,

    props: {},
    slots: {},
    default: {
      input: undefined,
      output: '',
    },
    transfer: {
      input: (value, { self }) => {
        if (value === undefined) {
          return undefined
        }

        const valueFormat = self.props.valueFormat
        const format = valueFormat || 'YYYY'

        if (value instanceof Date && dayjs(value).isValid()) {
          return dayjs(value)
        }

        if (dayjs(value, format).isValid()) {
          return dayjs(value, format)
        }

        return undefined
      },
      output: (value, { self }) => {
        if (value === undefined) {
          return undefined
        }

        const valueFormat = self.props.valueFormat
        const format = valueFormat || 'YYYY'

        return typeof value !== 'string' && dayjs(value).isValid()
          ? dayjs(value).format(format)
          : typeof value === 'string'
            ? value
            : ''
      },
    },

    readonly: false,
    disabled: false,
    render: true,
    show: true,
  },

  AMonthPicker: {
    type: 'AMonthPicker',
    slot: '',
    label: '',
    field: [],

    grid: {},
    layer: {},
    rules: undefined,

    props: {},
    slots: {},
    default: {
      input: undefined,
      output: '',
    },
    transfer: {
      input: (value, { self }) => {
        if (value === undefined) {
          return undefined
        }

        const valueFormat = self.props.valueFormat
        const format = valueFormat || 'YYYY-M'

        if (value instanceof Date && dayjs(value).isValid()) {
          return dayjs(value)
        }

        if (dayjs(value, format).isValid()) {
          return dayjs(value, format)
        }

        return undefined
      },
      output: (value, { self }) => {
        if (value === undefined) {
          return undefined
        }

        const valueFormat = self.props.valueFormat
        const format = valueFormat || 'YYYY-MM'

        return typeof value !== 'string' && dayjs(value).isValid()
          ? dayjs(value).format(format)
          : typeof value === 'string'
            ? value
            : ''
      },
    },

    readonly: false,
    disabled: false,
    render: true,
    show: true,
  },

  AQuarterPicker: {
    type: 'AQuarterPicker',
    slot: '',
    label: '',
    field: [],

    grid: {},
    layer: {},
    rules: undefined,

    props: {},
    slots: {},
    default: {
      input: undefined,
      output: '',
    },
    transfer: {
      input: (value, { self }) => {
        if (value === undefined) {
          return undefined
        }

        const valueFormat = self.props.valueFormat

        if (value instanceof Date && dayjs(value).isValid()) {
          return dayjs(value)
        }

        if (valueFormat) {
          if (dayjs(value, valueFormat).isValid()) {
            return dayjs(value, valueFormat)
          }
        }

        const rex = /^(\d{4})-(\d{1,2})$/
        const date = dayjs(typeof value === 'string' ? value.replace(rex, '$1') : value || null)
        return date && date.isValid() ? (typeof value === 'string' ? date.quarter(+value.replace(rex, '$2')) : date) : undefined
      },
      output: (value, { self }) => {
        if (value === undefined) {
          return undefined
        }

        const valueFormat = self.props.valueFormat
        const format = valueFormat || 'YYYY-Q'

        return typeof value !== 'string' && dayjs(value).isValid()
          ? dayjs(value).format(format)
          : typeof value === 'string'
            ? value
            : ''
      },
    },

    readonly: false,
    disabled: false,
    render: true,
    show: true,
  },

  AWeekPicker: {
    type: 'AWeekPicker',
    slot: '',
    label: '',
    field: [],

    grid: {},
    layer: {},
    rules: undefined,

    props: {},
    slots: {},
    default: {
      input: undefined,
      output: '',
    },
    transfer: {
      input: (value, { self }) => {
        if (value === undefined) {
          return undefined
        }

        const valueFormat = self.props.valueFormat

        if (value instanceof Date && dayjs(value).isValid()) {
          return dayjs(value)
        }

        if (valueFormat) {
          if (dayjs(value, valueFormat).isValid()) {
            return dayjs(value, valueFormat)
          }
        }

        const rex = /^(\d{4})-(\d{1,2})$/
        const date = dayjs(typeof value === 'string' ? value.replace(rex, '$1') : value || null)
        return date && date.isValid() ? (typeof value === 'string' ? date.week(+value.replace(rex, '$2')) : date) : undefined
      },
      output: (value, { self }) => {
        if (value === undefined) {
          return undefined
        }

        const valueFormat = self.props.valueFormat
        const format = valueFormat || 'YYYY-ww'

        return typeof value !== 'string' && dayjs(value).isValid()
          ? dayjs(value).format(format)
          : typeof value === 'string'
            ? value
            : ''
      },
    },

    readonly: false,
    disabled: false,
    render: true,
    show: true,
  },

  ATimePicker: {
    type: 'ATimePicker',
    slot: '',
    label: '',
    field: [],

    grid: {},
    layer: {},
    rules: undefined,

    props: {},
    slots: {},
    default: {
      input: undefined,
      output: '',
    },
    transfer: {
      input: (value, { self }) => {
        if (value === undefined) {
          return undefined
        }

        const use12Hours = self.props.use12Hours
        const valueFormat = self.props.valueFormat
        const format = valueFormat || (use12Hours === true ? 'h:m:s a' : 'H:m:s')

        if (value instanceof Date && dayjs(value).isValid()) {
          return dayjs(value)
        }

        if (dayjs(value, format).isValid()) {
          return dayjs(value, format)
        }

        return undefined
      },
      output: (value, { self }) => {
        if (value === undefined) {
          return undefined
        }

        const use12Hours = self.props.use12Hours
        const valueFormat = self.props.valueFormat
        const format = valueFormat || (use12Hours === true ? 'hh:mm:ss a' : 'HH:mm:ss')

        return typeof value !== 'string' && dayjs(value).isValid()
          ? dayjs(value).format(format)
          : typeof value === 'string'
            ? value
            : ''
      },
    },

    readonly: false,
    disabled: false,
    render: true,
    show: true,
  },
}

export default SFormNormalize
