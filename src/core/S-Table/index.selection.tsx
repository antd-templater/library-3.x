import 'ant-design-vue/es/radio/style/index.less'
import 'ant-design-vue/es/checkbox/style/index.less'
import Checkbox from 'ant-design-vue/es/checkbox'
import Radio from 'ant-design-vue/es/radio'
import { computed, defineComponent } from 'vue'
import * as VueTypes from 'vue-types'

export const STableSelection = defineComponent({
  name: 'STableSelection',
  props: {
    size: VueTypes.string<'default' | 'middle' | 'small'>().isRequired,
    type: VueTypes.string<'Checkbox' | 'Radio'>().isRequired,
    indeterminate: VueTypes.bool().def(false),
    disabled: VueTypes.bool().def(false),
    checked: VueTypes.bool().def(false)
  },
  emits: {
    check: (_checked: boolean) => true
  },
  setup(props, context) {
    const onChange = (event: MouseEvent) => {
      context.emit('check', !props.checked)
    }

    const onStop = (event: MouseEvent) => {
      event.stopPropagation()
    }

    const size = computed(() => {
      return props.size === 'default'
        ? 'large'
        : props.size === 'middle'
          ? 'default'
          : 'small'
    })

    return () => {
      if (props.type === 'Checkbox') {
        return (
          <div
            class='s-table-selection-container'
            onClick={onStop}
          >
            <Checkbox
              size={size.value}
              checked={props.checked}
              disabled={props.disabled}
              indeterminate={props.indeterminate}
              onChange={onChange}
            />
          </div>
        )
      }

      if (props.type === 'Radio') {
        return (
          <div
            class='s-table-selection-container'
            onClick={onStop}
          >
            <Radio
              size={size.value}
              checked={props.checked}
              disabled={props.disabled}
              onChange={onChange}
            />
          </div>
        )
      }
    }
  }
})

export default STableSelection
