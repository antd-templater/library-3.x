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
      input: 0,
      output: 0
    },
    transfer: {
      input: (value, { helper }) => value && helper.isFiniteNumber(+value) ? +value : 0,
      output: (value, { helper }) => value && helper.isFiniteNumber(+value) ? +value : 0
    },

    readonly: false,
    disabled: false,
    render: true,
    show: true
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
      input: '',
      output: ''
    },
    transfer: {
      input: (value, { helper }) => helper.isPrimitive(value) ? String(value) : '',
      output: (value, { helper }) => helper.isPrimitive(value) ? String(value) : ''
    },

    readonly: false,
    disabled: false,
    render: true,
    show: true
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
      input: ({ self }) => self.props.unCheckedValue !== undefined ? self.props.unCheckedValue : false,
      output: ({ self }) => self.props.unCheckedValue !== undefined ? self.props.unCheckedValue : false
    },
    transfer: {
      input: (value, { self }) => value === self.props.checkedValue || value === self.props.unCheckedValue ? value : self.props.unCheckedValue !== undefined ? self.props.unCheckedValue : value === true,
      output: (value, { self }) => value === self.props.checkedValue || value === self.props.unCheckedValue ? value : self.props.unCheckedValue !== undefined ? self.props.unCheckedValue : value === true
    },

    readonly: false,
    disabled: false,
    render: true,
    show: true
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
      input: ({ self }) => self.props.range === true ? [] : 0,
      output: ({ self }) => self.props.range === true ? [] : 0
    },
    transfer: {
      input(value, { helper, self }) {
        return self.props.range === true
          ? helper.isArray(value) ? value.filter((_, index) => index < 2).map(v => helper.isFiniteNumber(v) ? v : 0) : []
          : helper.isFiniteNumber(value) ? value : 0
      },
      output(value, { helper, self }) {
        return self.props.range === true
          ? helper.isArray(value) ? value.filter((_, index) => index < 2).map(v => helper.isFiniteNumber(v) ? v : 0) : []
          : helper.isFiniteNumber(value) ? value : 0
      }
    },

    readonly: false,
    disabled: false,
    render: true,
    show: true
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
      output: ({ self }) => ['multiple', 'tags'].includes(self.props.mode) ? [] : undefined
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
      }
    },

    readonly: false,
    disabled: false,
    render: true,
    show: true
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
      output: []
    },
    transfer: {
      input: (value, { helper }) => helper.isArray(value) ? value.map(v => helper.isPrimitive(v) ? v : '') : [],
      output: (value, { helper }) => helper.isArray(value) ? value.map(v => helper.isPrimitive(v) ? v : '') : []
    },

    readonly: false,
    disabled: false,
    render: true,
    show: true
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
      output: ({ self }) => self.props.multiple === true ? [] : undefined
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
      }
    },

    readonly: false,
    disabled: false,
    render: true,
    show: true
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
      output: undefined
    },
    transfer: {
      input: (value, { helper }) => helper.isPrimitive(value) ? value : undefined,
      output: (value, { helper }) => helper.isPrimitive(value) ? value : undefined
    },

    readonly: false,
    disabled: false,
    render: true,
    show: true
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
      output: []
    },
    transfer: {
      input: (value, { helper }) => helper.isArray(value) ? value.filter(v => helper.isPrimitive(v)) : [],
      output: (value, { helper }) => helper.isArray(value) ? value.filter(v => helper.isPrimitive(v)) : []
    },

    readonly: false,
    disabled: false,
    render: true,
    show: true
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
      input: '',
      output: ''
    },
    transfer: {
      input: (value, { helper }) => helper.isPrimitive(value) ? String(value) : '',
      output: (value, { helper }) => helper.isPrimitive(value) ? String(value) : ''
    },

    readonly: false,
    disabled: false,
    render: true,
    show: true
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
      input: '',
      output: ''
    },
    transfer: {
      input: (value, { helper }) => helper.isPrimitive(value) ? String(value) : '',
      output: (value, { helper }) => helper.isPrimitive(value) ? String(value) : ''
    },

    readonly: false,
    disabled: false,
    render: true,
    show: true
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
      input: '',
      output: ''
    },
    transfer: {
      input: (value, { helper }) => helper.isPrimitive(value) ? String(value) : '',
      output: (value, { helper }) => helper.isPrimitive(value) ? String(value) : ''
    },

    readonly: false,
    disabled: false,
    render: true,
    show: true
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
      input: '',
      output: ''
    },
    transfer: {
      input: (value, { helper }) => helper.isPrimitive(value) ? String(value) : '',
      output: (value, { helper }) => helper.isPrimitive(value) ? String(value) : ''
    },

    readonly: false,
    disabled: false,
    render: true,
    show: true
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
      input: 0,
      output: 0
    },
    transfer: {
      input: (value, { helper }) => helper.isFiniteNumber(+value) ? +value : '',
      output: (value, { helper }) => helper.isFiniteNumber(+value) ? +value : ''
    },

    readonly: false,
    disabled: false,
    render: true,
    show: true
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
      output: []
    },
    transfer: {
      input: (value, { helper, self }) => {
        const values = helper.isArray(value) ? value : []
        const format = self.props.valueFormat || self.props.format || (self.props.showTime ? 'YYYY-M-D HH:mm:ss' : 'YYYY-M-D')
        return values.map((v: any) => v !== undefined && dayjs(v, format).isValid() ? dayjs(v, format) : undefined)
      },
      output: (value, { helper, self }) => {
        const values = helper.isArray(value) ? value : []
        const format = self.props.valueFormat || self.props.format || (self.props.showTime ? 'YYYY-MM-DD HH:mm:ss' : 'YYYY-MM-DD')
        return values.map((v: any) => v !== undefined && dayjs(v, format).isValid() ? dayjs(v, format).format(format) : '')
      }
    },

    readonly: false,
    disabled: false,
    render: true,
    show: true
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
      output: ''
    },
    transfer: {
      input: (value, { self }) => {
        const format = self.props.valueFormat || self.props.format || (self.props.showTime ? 'YYYY-M-D HH:mm:ss' : 'YYYY-M-D')
        return value !== undefined && dayjs(value, format).isValid() ? dayjs(value, format) : undefined
      },
      output: (value, { self }) => {
        const format = self.props.valueFormat || self.props.format || (self.props.showTime ? 'YYYY-MM-DD HH:mm:ss' : 'YYYY-MM-DD')
        return value !== undefined && dayjs(value, format).isValid() ? dayjs(value, format).format(format) : ''
      }
    },

    readonly: false,
    disabled: false,
    render: true,
    show: true
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
      output: ''
    },
    transfer: {
      input: (value, { self }) => {
        const format = 'YYYY'
        return value !== undefined && dayjs(value, format).isValid() ? dayjs(value, format) : undefined
      },
      output: (value, { self }) => {
        const format = 'YYYY'
        return value !== undefined && dayjs(value, format).isValid() ? dayjs(value, format).format(format) : ''
      }
    },

    readonly: false,
    disabled: false,
    render: true,
    show: true
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
      output: ''
    },
    transfer: {
      input: (value, { self }) => {
        const format = 'YYYY-M'
        return value !== undefined && dayjs(value, format).isValid() ? dayjs(value, format) : undefined
      },
      output: (value, { self }) => {
        const format = (self.props.valueFormat || self.props.format) === 'YYYY-M' ? 'YYYY-M' : 'YYYY-MM'
        return value !== undefined && dayjs(value, format).isValid() ? dayjs(value, format).format(format) : ''
      }
    },

    readonly: false,
    disabled: false,
    render: true,
    show: true
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
      output: ''
    },
    transfer: {
      input: (value, _) => {
        const rex = /^(\d{4})-(\d{1,2})$/
        const date = dayjs(typeof value === 'string' ? value.replace(rex, '$1') : value || null)
        return date && date.isValid() ? (typeof value === 'string' ? date.quarter(+value.replace(rex, '$2')) : date) : undefined
      },
      output: (value, _) => {
        return value !== undefined && typeof value !== 'string' && dayjs(value).isValid()
          ? dayjs(value).format('YYYY-Q')
          : typeof value === 'string'
            ? value
            : ''
      }
    },

    readonly: false,
    disabled: false,
    render: true,
    show: true
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
      output: ''
    },
    transfer: {
      input: (value, _) => {
        const rex = /^(\d{4})-(\d{1,2})$/
        const date = dayjs(typeof value === 'string' ? value.replace(rex, '$1') : value || null)
        return date && date.isValid() ? (typeof value === 'string' ? date.week(+value.replace(rex, '$2')) : date) : undefined
      },
      output: (value, { self }) => {
        const format = (self.props.valueFormat || self.props.format) === 'YYYY-w' ? 'YYYY-w' : 'YYYY-ww'
        return value !== undefined && typeof value !== 'string' && dayjs(value).isValid()
          ? dayjs(value).format(format)
          : typeof value === 'string'
            ? value
            : ''
      }
    },

    readonly: false,
    disabled: false,
    render: true,
    show: true
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
      output: ''
    },
    transfer: {
      input: (value, { self }) => {
        const format = self.props.valueFormat || self.props.format || (self.props.use12Hours ? 'h:mm:ss a' : 'HH:mm:ss')
        return value !== undefined && dayjs(value, format).isValid() ? dayjs(value, format) : undefined
      },
      output: (value, { self }) => {
        const format = self.props.valueFormat || self.props.format || (self.props.use12Hours ? 'h:mm:ss a' : 'HH:mm:ss')
        return value !== undefined && dayjs(value, format).isValid() ? dayjs(value, format).format(format) : ''
      }
    },

    readonly: false,
    disabled: false,
    render: true,
    show: true
  }
}

export default SFormNormalize
