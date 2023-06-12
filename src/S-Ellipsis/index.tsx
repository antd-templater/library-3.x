import 'ant-design-vue/es/tooltip/style/index.less'
import ATooltip from 'ant-design-vue/es/tooltip'
import { defineComponent, ref } from 'vue'
import * as VueTypes from 'vue-types'

export const SEllipsis = defineComponent({
  name: 'SEllipsis',
  props: {
    title: VueTypes.string().def(undefined),
    visible: VueTypes.bool().def(undefined),
    inspect: VueTypes.bool().def(true),
    tooltip: VueTypes.bool().def(true),
    ellipsis: VueTypes.bool().def(false),
    placement: VueTypes.string<
      | 'top'
      | 'left'
      | 'right'
      | 'bottom'
      | 'topLeft'
      | 'topRight'
      | 'bottomLeft'
      | 'bottomRight'
      | 'leftTop'
      | 'leftBottom'
      | 'rightTop'
      | 'rightBottom'
    >().def('top'),
    mouseEnterDelay: VueTypes.number().def(0.3),
    mouseLeaveDelay: VueTypes.number().def(0.1)
  },
  emits: {
    'update:visible': (visible: boolean) => typeof visible === 'boolean'
  },
  setup(props, { emit, slots }) {
    const element: any = ref(null)
    const visible: any = ref(false)

    const updateVisible = (state: boolean) => {
      if (state === true && props.inspect === true && element.value instanceof HTMLElement) {
        const clientHeight = element.value.getBoundingClientRect().height
        const clientWidth = element.value.getBoundingClientRect().width
        const outHeight = element.value.scrollHeight > clientHeight + 2
        const outWidth = element.value.scrollWidth > clientWidth + 2
        return (visible.value = outHeight || outWidth)
      }
      return (visible.value = state)
    }

    return () => {
      if (props.tooltip === true) {
        const binds = {
          ...props,
          'visible': props.visible !== undefined ? props.visible : visible.value,
          'onUpdate:visible': undefined,
          'onVisibleChange': undefined
        }

        return (
          <ATooltip
            { ...binds }
            { ...{ 'onUpdate:visible': visible => emit('update:visible', updateVisible(visible)) } }
            v-slots={{ title: slots.title || slots.default }}
          >
            <div
              ref={element}
              style={{
                width: '100%',
                height: '100%',
                display: 'block',
                overflow: props.ellipsis === true ? 'hidden' : 'inherit',
                whiteSpace: props.ellipsis === true ? 'nowrap' : 'inherit',
                textOverflow: props.ellipsis === true ? 'ellipsis' : 'inherit'
              }}
            >
              { slots.default?.() }
            </div>
          </ATooltip>
        )
      }

      return slots.default?.()
    }
  }
})

export default SEllipsis
