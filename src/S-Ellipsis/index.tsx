import { FunctionalComponent } from 'vue'
import ATooltip, { TooltipProps } from 'ant-design-vue/es/tooltip'
import 'ant-design-vue/es/tooltip/style/index.less'

type SEllipsisProps = TooltipProps & {
  limit?: number,
  title?: string,
  tooltip?: boolean,
  sheared?: boolean,
  placement?: 'top' | 'left' | 'right' | 'bottom' | 'topLeft' | 'topRight' | 'bottomLeft' | 'bottomRight' | 'leftTop' | 'leftBottom' | 'rightTop' | 'rightBottom'
}

export const SEllipsis: FunctionalComponent<SEllipsisProps> = ({ limit = 0, title = '', tooltip = false, sheared = true, placement = 'top', ...props }, context) => {
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
    if (limit > 0 && sheared) {
      const content = cutFullLength(title, limit)
      const expand = length > limit ? '...' : ''
      return <span>{content + expand}</span>
    }
    return <span>{title}</span>
  }

  const RenderTooltip = ({ title = '', length = 0 }) => {
    return (
      <ATooltip
        { ...props }
        title={title}
        placement={placement}
      >
        <RenderTextNode
          title={title}
          length={length}
        />
      </ATooltip>
    )
  }

  const length = getFullLength(title)

  return tooltip && length > limit
    ? <RenderTooltip title={title} length={length}/>
    : <RenderTextNode title={title} length={length}/>
}

export default SEllipsis
