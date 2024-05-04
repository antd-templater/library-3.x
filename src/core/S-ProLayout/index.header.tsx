import './index.header.less'
import helper from '@/helper'

import { TopNavHeader } from './index.nav'
import { clearMenuItem } from './func.menu'
import { useRouteContext } from './func.route'
import { defaultGlobalHeaderProps } from './props'
import { defaultBaseMenuProps } from './props'
import { defaultSettingProps } from './props'
import { defineComponent } from 'vue'
import { computed } from 'vue'

export const GlobalHeader = defineComponent({
  name: 'GlobalHeader',
  inheritAttrs: false,
  props: {
    ...defaultSettingProps,
    ...defaultBaseMenuProps,
    ...defaultGlobalHeaderProps,
  },
  setup(props, context) {
    const routeContext = useRouteContext()
    const getPrefixCls = routeContext.value.getPrefixCls
    const basePrefixCls = getPrefixCls('global-header')

    const menuData = computed(() => {
      if (!helper.isArray(props.menuData)) {
        return []
      }

      const menus = props.menuData.map(item => ({
        ...item,
        children: undefined,
      }))

      return clearMenuItem(menus as any[])
    })

    const headerTheme = computed(() => {
      return props.theme !== 'realDark' ? props.theme : 'dark'
    })

    const baseClassName = computed(() => {
      return {
        [basePrefixCls]: true,
        [`${basePrefixCls}-layout-${props.layout}`]: props.layout && props.headerTheme === 'dark',
      }
    })

    const RenderDefaultContent = () => {
      return (
        <div style="flex: 1 1 auto">
          { context?.slots.default?.() }
        </div>
      )
    }

    const RenderRightContent = () => {
      if (helper.isFunction(props.rightContentRender)) {
        return props.rightContentRender({ ...props })
      }
    }

    return () => {
      if (!props.isMobile && props.splitMenus && props.layout === 'mix') {
        return (
          <TopNavHeader
            {...props}
            mode="horizontal"
            theme={headerTheme.value}
            menuData={menuData.value}
          />
        )
      }

      return (
        <div class={baseClassName.value}>
          { RenderDefaultContent() }
          { RenderRightContent() }
        </div>
      )
    }
  },
})

export default GlobalHeader
