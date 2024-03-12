import 'ant-design-vue/es/tooltip/style/index.less'
import { SlotsType, defineComponent, onMounted, ref } from 'vue'
import ATooltip from 'ant-design-vue/es/tooltip'
import * as VueTypes from 'vue-types'

type SEllipsisDefineSlots = SlotsType<{
  title: void;
  default: void;
}>

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
    const outside: any = ref(false)

    const bounding = (target: any) => {
      if (target instanceof HTMLElement) {
        const clientHeight = target.getBoundingClientRect().height
        const clientWidth = target.getBoundingClientRect().width
        const outHeight = target.scrollHeight > clientHeight + 1
        const outWidth = target.scrollWidth > clientWidth + 1
        return (outside.value = outHeight || outWidth)
      }
      return false
    }

    const updateVisible = (state: boolean) => {
      return state === true && props.inspect === true
        ? (visible.value = bounding(element.value))
        : (visible.value = state)
    }

    const observer = new ResizeObserver(entries => {
      for (const entry of entries) {
        bounding(entry.target)
      }
    })

    onMounted(() => {
      if (element.value instanceof HTMLElement) {
        observer.observe(element.value)
        bounding(element.value)
      }
    })

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
            { ...{ 'onUpdate:visible': (visible: boolean) => emit('update:visible', updateVisible(visible)) } }
            v-slots={{ title: slots.title || slots.default }}
          >
            <div
              ref={element}
              style={{
                width: '100%',
                height: '100%',
                display: 'block',
                whiteSpace: props.ellipsis === true ? 'nowrap' : 'inherit',
                textOverflow: outside.value && props.ellipsis === true ? 'ellipsis' : 'initial',
                overflow: outside.value && props.ellipsis === true ? 'hidden' : 'visible'
              }}
            >
              { slots.default?.() }
            </div>
          </ATooltip>
        )
      }

      return slots.default?.()
    }
  },
  slots: {} as SEllipsisDefineSlots
})

export default SEllipsis
