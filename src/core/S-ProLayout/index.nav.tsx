import './index.nav.less'
import helper from '@/helper'

import { Key } from './index.menu'
import { BaseMenu } from './index.menu'
import { useRouteContext } from './func.route'
import { defaultGlobalHeaderProps } from './props'
import { defaultSiderMenuProps } from './props'
import { defaultBaseMenuProps } from './props'
import { defaultSettingProps } from './props'
import { defineComponent } from 'vue'
import { computed } from 'vue'

export const TopNavHeaderRightContent = defineComponent({
  name: 'TopNavHeaderRightContent',
  inheritAttrs: false,
  props: {
    ...defaultSettingProps,
    ...defaultBaseMenuProps,
    ...defaultSiderMenuProps,
    ...defaultGlobalHeaderProps,
  },
  setup(props) {
    const routeContext = useRouteContext()
    const getPrefixCls = routeContext.value.getPrefixCls

    const RenderRightContent = () => {
      if (helper.isFunction(props.rightContentRender)) {
        return props.rightContentRender({ ...props })
      }
    }

    return () => (
      <div
        class={getPrefixCls('top-nav-header-right-content')}
        style={{ flex: '0 0 auto', height: '100%' }}
      >
        { RenderRightContent() }
      </div>
    )
  },
})

export const TopNavHeader = defineComponent({
  name: 'TopNavHeader',
  inheritAttrs: false,
  props: {
    ...defaultSettingProps,
    ...defaultBaseMenuProps,
    ...defaultSiderMenuProps,
    ...defaultGlobalHeaderProps,
  },
  emits: {
    openKeys: (keys: Key[]) => true,
    select: (keys: Key[]) => true,
  },
  setup(props, { emit }) {
    const routeContext = useRouteContext()
    const getPrefixCls = routeContext.value.getPrefixCls
    const basePrefixCls = getPrefixCls('top-nav-header')

    const baseClassName = computed(() => {
      return {
        [basePrefixCls]: true,
        light: props.theme === 'light',
      }
    })

    const baseMainClassName = computed(() => {
      return {
        [`${basePrefixCls}-main`]: true,
        wide: props.contentWidth === 'Fixed',
      }
    })

    const RenderTopNavHeaderLogoAndTitle = () => {
      if (helper.isFunction(props.menuHeaderRender)) {
        const vnode = props.menuHeaderRender({ ...props })

        if (vnode) {
          return (
            <div class={`${basePrefixCls}-main-left`}>
              <div class={`${basePrefixCls}-logo`}>
                { vnode }
              </div>
            </div>
          )
        }
      }
    }

    const RenderTopNavHeaderBaseMenuNode = () => {
      const onUpdateSelectedKeys = (keys: Key[]) => {
        emit('select', keys)
      }

      const onUpdateOpenKeys = (keys: Key[]) => {
        emit('openKeys', keys)
      }

      const TopNavHeaderTheme = computed(() => {
        return props.theme !== 'realDark' ? props.theme : 'dark'
      })

      const TopNavHeaderLocale = computed(() => {
        return props.locale || routeContext.value.locale
      })

      return (
        <div style="flex: 1 1 auto; overflow: hidden auto;">
          <BaseMenu
            mode={props.mode}
            theme={TopNavHeaderTheme.value}
            locale={TopNavHeaderLocale.value}
            style={{ 'line-height': `${props.headerHeight}px`, 'background-color': 'transparent', 'border': 'none' }}
            class={{ 's-pro-top-nav-menu': props.mode === 'horizontal' }}
            prefixCls={getPrefixCls('top-nav-header-menu')}
            menuData={props.menuData}
            collapsed={props.collapsed}
            iconPrefix={props.iconPrefix}
            iconfontUrl={props.iconfontUrl}
            menuItemRender={props.menuItemRender}
            subMenuItemRender={props.subMenuItemRender}
            selectedKeys={props.selectedKeys}
            openKeys={props.openKeys}

            {
              ...{
                'onUpdate:selectedKeys': onUpdateSelectedKeys,
                'onUpdate:openKeys': onUpdateOpenKeys,
              }
            }
          />
        </div>
      )
    }

    const RenderTopNavHeaderRightContent = () => {
      if (props.rightContentRender) {
        return <TopNavHeaderRightContent {...props} />
      }
    }

    return () => (
      <div class={baseClassName.value}>
        <div class={baseMainClassName.value}>
          { RenderTopNavHeaderLogoAndTitle() }
          { RenderTopNavHeaderBaseMenuNode() }
          { RenderTopNavHeaderRightContent() }
        </div>
      </div>
    )
  },
})

export default TopNavHeader
