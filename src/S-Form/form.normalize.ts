import { NormalizeType } from './form.declare'
import dayjs from '../dayjs'

export const Normalize: NormalizeType = {
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
      input: false,
      output: ''
    },
    transfer: {
      input: (value, { helper }) => helper.isBoolean(value) ? value : false,
      output: (value, { helper }) => helper.isBoolean(value) ? value : ''
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
          ? helper.isArray(value) ? value.map(v => helper.isFiniteNumber(v) ? v : 0) : []
          : helper.isFiniteNumber(value) ? value : 0
      },
      output(value, { helper, self }) {
        return self.props.range === true
          ? helper.isArray(value) ? value.map(v => helper.isFiniteNumber(v) ? v : 0) : []
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
          ? helper.isArray(value) ? value.filter(v => helper.isPrimitive(v)) : []
          : helper.isPrimitive(value) ? value : undefined
      },
      output(value, { helper, self }) {
        return ['multiple', 'tags'].includes(self.props.mode)
          ? helper.isArray(value) ? value.filter(v => helper.isPrimitive(v)) : []
          : helper.isPrimitive(value) ? value : undefined
      }
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
          ? helper.isArray(value) ? value.filter(v => helper.isPrimitive(v)) : []
          : helper.isPrimitive(value) ? value : undefined
      },
      output(value, { helper, self }) {
        return self.props.multiple === true
          ? helper.isArray(value) ? value.filter(v => helper.isPrimitive(v)) : []
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
      input: (value, { helper }) => helper.isArray(value) ? value.filter(v => helper.isPrimitive(value)) : [],
      output: (value, { helper }) => helper.isArray(value) ? value.filter(v => helper.isPrimitive(value)) : []
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
      input: (value, { helper }) => helper.isArray(value) ? value.map((v: any) => v !== undefined && dayjs(v).isValid() ? dayjs(v) : null) : [],
      output: (value, { helper, self }) => helper.isArray(value) ? value.map((v: any) => v !== undefined && dayjs(v).isValid() ? dayjs(v).format(self.props.valueFormat || self.props.format || 'YYYY-MM-DD') : '') : []
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
      input: null,
      output: ''
    },
    transfer: {
      input: (value, _) => value !== undefined && dayjs(value).isValid() ? dayjs(value) : null,
      output: (value, { self }) => value !== undefined && dayjs(value).isValid() ? dayjs(value).format(self.props.valueFormat || self.props.format || 'YYYY-MM-DD') : ''
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
      input: null,
      output: ''
    },
    transfer: {
      input: (value, _) => value !== undefined && dayjs(value).isValid() ? dayjs(value) : null,
      output: (value, { self }) => value !== undefined && dayjs(value).isValid() ? dayjs(value).format(self.props.valueFormat || self.props.format || 'YYYY') : ''
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
      input: null,
      output: ''
    },
    transfer: {
      input: (value, _) => value !== undefined && dayjs(value).isValid() ? dayjs(value) : null,
      output: (value, { self }) => value !== undefined && dayjs(value).isValid() ? dayjs(value).format(self.props.valueFormat || self.props.format || 'YYYY-MM') : ''
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
      input: null,
      output: ''
    },
    transfer: {
      input: (value, _) => value !== undefined && dayjs(value).isValid() ? dayjs(value) : null,
      output: (value, { self }) => value !== undefined && dayjs(value).isValid() ? dayjs(value).format(self.props.valueFormat || self.props.format || 'YYYY-Q') : ''
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
      input: null,
      output: ''
    },
    transfer: {
      input: (value, _) => value !== undefined && dayjs(value).isValid() ? dayjs(value) : null,
      output: (value, { self }) => value !== undefined && dayjs(value).isValid() ? dayjs(value).format(self.props.valueFormat || self.props.format || 'dddd') : ''
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
      input: null,
      output: ''
    },
    transfer: {
      input: (value, _) => value !== undefined && dayjs(value).isValid() ? dayjs(value) : null,
      output: (value, { self }) => value !== undefined && dayjs(value).isValid() ? dayjs(value).format(self.props.valueFormat || self.props.format || 'hh:mm:ss') : ''
    },

    readonly: false,
    disabled: false,
    render: true,
    show: true
  },

  ATextarea: {
    type: 'ATextarea',
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

  ASearch: {
    type: 'ASearch',
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
  }
}

export default Normalize
