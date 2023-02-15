import { SFormItemGroup } from './form.declare'
import dayjs from '../dayjs'

export default {
  ARate: {
    type: 'ARate',
    slot: '',
    label: '',
    field: '',
    grids: {},
    attrs: {},
    slots: {},
    events: {},
    default: {
      input: 0,
      output: 0
    },
    transfer: {
      input: (value, { helper }) => value && helper.isFiniteNumber(+value) ? +value : 0,
      output: (value, { helper }) => value && helper.isFiniteNumber(+value) ? +value : 0
    }
  },

  AInput: {
    type: 'AInput',
    slot: '',
    label: '',
    field: '',
    grids: {},
    attrs: {},
    slots: {},
    events: {},
    default: {
      input: '',
      output: ''
    },
    transfer: {
      input: (value, { helper }) => helper.isPrimitive(value) ? String(value) : '',
      output: (value, { helper }) => helper.isPrimitive(value) ? String(value) : ''
    }
  },

  ASwitch: {
    type: 'ASwitch',
    slot: '',
    label: '',
    field: '',
    grids: {},
    attrs: {},
    slots: {},
    events: {},
    default: {
      input: false,
      output: ''
    },
    transfer: {
      input: (value, { helper }) => helper.isBoolean(value) ? value : false,
      output: (value, { helper }) => helper.isBoolean(value) ? value : ''
    }
  },

  ASelect: {
    type: 'ASelect',
    slot: '',
    label: '',
    field: '',
    grids: {},
    attrs: {},
    events: {},
    default: {
      input: ({ self }) => ['multiple', 'tags'].includes(self.attrs.mode) ? [] : undefined,
      output: ({ self }) => ['multiple', 'tags'].includes(self.attrs.mode) ? [] : undefined
    },
    transfer: {
      input(value, { helper, self }) {
        return ['multiple', 'tags'].includes(self.attrs.mode)
          ? helper.isArray(value) ? value.filter(v => helper.isPrimitive(v)) : []
          : helper.isPrimitive(value) ? value : undefined
      },
      output(value, { helper, self }) {
        return ['multiple', 'tags'].includes(self.attrs.mode)
          ? helper.isArray(value) ? value.filter(v => helper.isPrimitive(v)) : []
          : helper.isPrimitive(value) ? value : undefined
      }
    }
  },

  ATreeSelect: {
    type: 'ATreeSelect',
    slot: '',
    label: '',
    field: '',
    grids: {},
    attrs: {},
    events: {},
    default: {
      input: ({ self }) => self.attrs.multiple === true ? [] : undefined,
      output: ({ self }) => self.attrs.multiple === true ? [] : undefined
    },
    transfer: {
      input(value, { helper, self }) {
        return self.attrs.multiple === true
          ? helper.isArray(value) ? value.filter(v => helper.isPrimitive(v)) : []
          : helper.isPrimitive(value) ? value : undefined
      },
      output(value, { helper, self }) {
        return self.attrs.multiple === true
          ? helper.isArray(value) ? value.filter(v => helper.isPrimitive(v)) : []
          : helper.isPrimitive(value) ? value : undefined
      }
    }
  },

  ARadioGroup: {
    type: 'ARadioGroup',
    slot: '',
    label: '',
    field: '',
    grids: {},
    attrs: {},
    events: {},
    default: {
      input: undefined,
      output: undefined
    },
    transfer: {
      input: (value, { helper }) => helper.isPrimitive(value) ? value : undefined,
      output: (value, { helper }) => helper.isPrimitive(value) ? value : undefined
    }
  },

  ACheckboxGroup: {
    type: 'ACheckboxGroup',
    slot: '',
    label: '',
    field: '',
    grids: {},
    attrs: {},
    events: {},
    default: {
      input: [],
      output: []
    },
    transfer: {
      input: (value, { helper }) => helper.isArray(value) ? value.filter(v => helper.isPrimitive(value)) : [],
      output: (value, { helper }) => helper.isArray(value) ? value.filter(v => helper.isPrimitive(value)) : []
    }
  },

  AInputPassword: {
    type: 'AInputPassword',
    slot: '',
    label: '',
    field: '',
    grids: {},
    attrs: {},
    slots: {},
    events: {},
    default: {
      input: '',
      output: ''
    },
    transfer: {
      input: (value, { helper }) => helper.isPrimitive(value) ? String(value) : '',
      output: (value, { helper }) => helper.isPrimitive(value) ? String(value) : ''
    }
  },

  AAutoComplete: {
    type: 'AAutoComplete',
    slot: '',
    label: '',
    field: '',
    grids: {},
    attrs: {},
    slots: {},
    events: {},
    default: {
      input: '',
      output: ''
    },
    transfer: {
      input: (value, { helper }) => helper.isPrimitive(value) ? String(value) : '',
      output: (value, { helper }) => helper.isPrimitive(value) ? String(value) : ''
    }
  },

  AInputNumber: {
    type: 'AInputNumber',
    slot: '',
    label: '',
    field: '',
    grids: {},
    attrs: {},
    slots: {},
    events: {},
    default: {
      input: 0,
      output: 0
    },
    transfer: {
      input: (value, { helper }) => helper.isFiniteNumber(+value) ? +value : '',
      output: (value, { helper }) => helper.isFiniteNumber(+value) ? +value : ''
    }
  },

  ARangePicker: {
    type: 'ARangePicker',
    slot: '',
    label: '',
    field: '',
    grids: {},
    attrs: {},
    events: {},
    default: {
      input: [],
      output: []
    },
    transfer: {
      input: (value, { helper }) => helper.isArray(value) ? value.map((v: any) => dayjs(v).isValid() ? dayjs(v) : null) : [],
      output: (value, { helper, self }) => helper.isArray(value) ? value.map((v: any) => dayjs(v).isValid() ? dayjs(v).format(self.attrs.valueFormat || self.attrs.format || 'YYYY-MM-DD') : '') : []
    }
  },

  ADatePicker: {
    type: 'ADatePicker',
    slot: '',
    label: '',
    field: '',
    grids: {},
    attrs: {},
    events: {},
    default: {
      input: null,
      output: ''
    },
    transfer: {
      input: (value, _) => dayjs(value).isValid() ? dayjs(value) : null,
      output: (value, { self }) => dayjs(value).isValid() ? dayjs(value).format(self.attrs.valueFormat || self.attrs.format || 'YYYY-MM-DD') : ''
    }
  },

  AYearPicker: {
    type: 'AYearPicker',
    slot: '',
    label: '',
    field: '',
    grids: {},
    attrs: {},
    events: {},
    default: {
      input: null,
      output: ''
    },
    transfer: {
      input: (value, _) => dayjs(value).isValid() ? dayjs(value) : null,
      output: (value, { self }) => dayjs(value).isValid() ? dayjs(value).format(self.attrs.valueFormat || self.attrs.format || 'YYYY') : ''
    }
  },

  AMonthPicker: {
    type: 'AMonthPicker',
    slot: '',
    label: '',
    field: '',
    grids: {},
    attrs: {},
    events: {},
    default: {
      input: null,
      output: ''
    },
    transfer: {
      input: (value, _) => dayjs(value).isValid() ? dayjs(value) : null,
      output: (value, { self }) => dayjs(value).isValid() ? dayjs(value).format(self.attrs.valueFormat || self.attrs.format || 'YYYY-MM') : ''
    }
  },

  AQuarterPicker: {
    type: 'AQuarterPicker',
    slot: '',
    label: '',
    field: '',
    grids: {},
    attrs: {},
    events: {},
    default: {
      input: null,
      output: ''
    },
    transfer: {
      input: (value, _) => dayjs(value).isValid() ? dayjs(value) : null,
      output: (value, { self }) => dayjs(value).isValid() ? dayjs(value).format(self.attrs.valueFormat || self.attrs.format || 'YYYY-Q') : ''
    }
  },

  AWeekPicker: {
    type: 'AWeekPicker',
    slot: '',
    label: '',
    field: '',
    grids: {},
    attrs: {},
    events: {},
    default: {
      input: null,
      output: ''
    },
    transfer: {
      input: (value, _) => dayjs(value).isValid() ? dayjs(value) : null,
      output: (value, { self }) => dayjs(value).isValid() ? dayjs(value).format(self.attrs.valueFormat || self.attrs.format || 'dddd') : ''
    }
  },

  ATimePicker: {
    type: 'ATimePicker',
    slot: '',
    label: '',
    field: '',
    grids: {},
    attrs: {},
    events: {},
    default: {
      input: null,
      output: ''
    },
    transfer: {
      input: (value, _) => dayjs(value).isValid() ? dayjs(value) : null,
      output: (value, { self }) => dayjs(value).isValid() ? dayjs(value).format(self.attrs.valueFormat || self.attrs.format || 'hh:mm:ss') : ''
    }
  },

  ATextarea: {
    type: 'ATextarea',
    slot: '',
    label: '',
    field: '',
    grids: {},
    attrs: {},
    slots: {},
    events: {},
    default: {
      input: '',
      output: ''
    },
    transfer: {
      input: (value, { helper }) => helper.isPrimitive(value) ? String(value) : '',
      output: (value, { helper }) => helper.isPrimitive(value) ? String(value) : ''
    }
  },

  ACascader: {
    type: 'ACascader',
    slot: '',
    label: '',
    field: '',
    grids: {},
    attrs: {},
    slots: {},
    events: {},
    default: {
      input: [],
      output: []
    },
    transfer: {
      input: (value, { helper }) => helper.isArray(value) ? value.map(v => helper.isPrimitive(v) ? v : '') : [],
      output: (value, { helper }) => helper.isArray(value) ? value.map(v => helper.isPrimitive(v) ? v : '') : []
    }
  },

  ASearch: {
    type: 'ASearch',
    slot: '',
    label: '',
    field: '',
    grids: {},
    attrs: {},
    slots: {},
    events: {},
    default: {
      input: '',
      output: ''
    },
    transfer: {
      input: (value, { helper }) => helper.isPrimitive(value) ? String(value) : '',
      output: (value, { helper }) => helper.isPrimitive(value) ? String(value) : ''
    }
  }
} as SFormItemGroup
