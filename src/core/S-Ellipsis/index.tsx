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
    open: VueTypes.bool().def(undefined),
    title: VueTypes.string().def(undefined),
    color: VueTypes.string().def(undefined),
    trigger: VueTypes.string<'hover' | 'focus' | 'click' | 'contextmenu'>().def('hover'),
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
    mouseLeaveDelay: VueTypes.number().def(0.1),
  },
  emits: {
    'update:open': (open: boolean) => typeof open === 'boolean',
  },
  setup(props, { emit, slots }) {
    const open: any = ref(false)
    const outside: any = ref(false)
    const element: any = ref(null)

    const bounding = (target: any) => {
      if (typeof HTMLElement !== 'undefined' && target instanceof HTMLElement) {
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
        ? (open.value = bounding(element.value))
        : (open.value = state)
    }

    onMounted(() => {
      const observer = new ResizeObserver(entries => {
        for (const entry of entries) {
          bounding(entry.target)
        }
      })

      if (element.value instanceof HTMLElement) {
        observer.observe(element.value)
        bounding(element.value)
      }
    })

    return () => {
      if (props.tooltip === true) {
        const binds = {
          ...props,
          'open': props.open !== undefined ? props.open : open.value,
          'onUpdate:open': undefined,
          'onVisibleChange': undefined,
        }

        return (
          <ATooltip
            {...binds}
            {...{ 'onUpdate:open': (open: boolean) => emit('update:open', updateVisible(open)) }}
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
                overflow: outside.value && props.ellipsis === true ? 'hidden' : 'visible',
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
  slots: {} as SEllipsisDefineSlots,
})

export default SEllipsis
