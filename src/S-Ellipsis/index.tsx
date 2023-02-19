import 'ant-design-vue/es/tooltip/style/index.less'

import ATooltip from 'ant-design-vue/es/tooltip'
import { defineComponent, reactive, toRefs } from 'vue'
import * as VueTypes from 'vue-types'

export const SEllipsis = defineComponent({
  name: 'SEllipsis',
  props: {
    limit: VueTypes.number().def(Infinity),
    title: VueTypes.string().def(''),
    tooltip: VueTypes.bool().def(false),
    sheared: VueTypes.bool().def(true),
    placement: VueTypes.string<'top' | 'left' | 'right' | 'bottom' | 'topLeft' | 'topRight' | 'bottomLeft' | 'bottomRight' | 'leftTop' | 'leftBottom' | 'rightTop' | 'rightBottom'>().def('top')
  },
  setup(props, { slots }) {
    const {
      limit,
      title,
      tooltip,
      sheared,
      placement,
      ...tooltipProps
    } = toRefs(props)

    const getFullLength = (title = '') => {
      return title.split('').reduce((pre, cur) => {
        const charCode = cur.charCodeAt(0)
        const isSingleChar = charCode >= 0 && charCode <= 128
        return isSingleChar ? pre + 1 : pre + 2
      }, 0)
    }

    const cutFullLength = (title = '', max = Infinity) => {
      let len = 0
      return title.split('').reduce((pre, cur) => {
        const charCode = cur.charCodeAt(0)
        const isSingleChar = charCode >= 0 && charCode <= 128
        isSingleChar ? len = len + 1 : len = len + 2
        return len <= max ? pre + cur : pre
      }, '')
    }

    const RenderTextNode = ({ title = '', length = 0 }) => {
      if (limit.value > 0 && sheared.value) {
        const content = cutFullLength(title, limit.value)
        const expand = length > limit.value ? '...' : ''

        return slots.default
          ? slots.default({ title: content + expand })
          : content + expand
      }

      return slots.default
        ? slots.default({ title })
        : title
    }

    const RenderTooltip = ({ title = '', length = 0 }) => {
      return (
        <ATooltip
          { ...reactive(tooltipProps) }
          placement={placement.value}
          title={title}
        >
          { RenderTextNode({ title, length }) }
        </ATooltip>
      )
    }

    return () => {
      const length = getFullLength(title.value)
      const isUseTooltip = tooltip.value && length > limit.value
      return isUseTooltip ? RenderTooltip({ title: title.value, length }) : RenderTextNode({ title: title.value, length })
    }
  }
})

export default SEllipsis
