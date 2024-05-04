import './index.lazy.icon.less'

import { FunctionalComponent, VNodeChild } from 'vue'
import { SIcon, isIconType } from '@/S-Icon/index'
import { isVNode } from 'vue'
import helper from '@/helper'

export const LazyMenuIcon: FunctionalComponent<TypeLazyMenuIcon> = props => {
  const icon = props.icon
  const prefixCls = props.prefixCls || 's-pro'
  const iconPrefix = props.iconPrefix || 'icon-'
  const iconfontUrl = props.iconfontUrl || ''

  if (helper.isNonEmptyString(icon) && helper.isNonEmptyString(iconfontUrl) && icon.startsWith(iconPrefix)) {
    return (
      <SIcon
        class={props.class || {}}
        style={props.style || {}}
        iconfontUrl={iconfontUrl}
        iconPrefix={iconPrefix}
        type={icon}
      />
    )
  }

  if (helper.isNonEmptyString(icon) && (/^https?:\/\/[\s\S]+/i).test(icon)) {
    return (
      <span role="img" class="anticon">
        <img src={icon} alt="icon" class={`${prefixCls}-lazy-menu-icon`} />
      </span>
    )
  }

  if (helper.isNonEmptyString(icon) && isIconType(icon)) {
    return <SIcon {...props} type={icon} />
  }

  if (isVNode(icon)) {
    return icon
  }

  return null
}

export interface TypeLazyMenuIcon {
  icon: VNodeChild | string;
  style?: Record<string, any> | string;
  class?: Array<any> | Record<string, any> | string;
  iconfontUrl?: string;
  iconPrefix?: string;
  prefixCls?: string;
}

export default LazyMenuIcon
