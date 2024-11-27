import './index.pro.less'

import { getSlot } from './func.slots'
import { clearMenuItem } from './func.menu'
import { useMediaQuery } from './func.media'
import { useRouteContext } from './func.route'
import { firstMenuChildren } from './func.menu'
import { provideRouteContext } from './func.route'
import { defaultRouteContext } from './func.route'
import { defaultProLayoutHeaderProps } from './props'
import { defaultProBasicLayoutProps } from './props'
import { defaultGlobalHeaderProps } from './props'
import { defaultSiderMenuProps } from './props'
import { defaultBaseMenuProps } from './props'
import { defaultSettingProps } from './props'
import { defineComponent } from 'vue'
import { CSSProperties } from 'vue'
import { Fragment } from 'vue'
import { computed } from 'vue'

import helper from '@/helper'
import ALayout from 'ant-design-vue/es/layout'
import SiderMenuWrapper from './index.menu'
import TopNavHeader from './index.nav'

import type { SProLayoutRightContentRender } from './type'
import type { SProLayoutMenuContentRender } from './type'
import type { SProLayoutSubMenuItemRender } from './type'
import type { SProLayoutMenuHeaderRender } from './type'
import type { SProLayoutMenuFooterRender } from './type'
import type { SProLayoutMenuExtraRender } from './type'
import type { SProLayoutMenuItemRender } from './type'
import type { SProLayoutHeaderRender } from './type'
import type { Key } from './index.menu'

export const ProLayoutHeader = defineComponent({
  name: 'ProLayoutHeader',
  inheritAttrs: false,
  props: {
    ...defaultSettingProps,
    ...defaultBaseMenuProps,
    ...defaultGlobalHeaderProps,
    ...defaultProLayoutHeaderProps,
  },
  setup(props, { emit }) {
    const routeContext = useRouteContext()
    const basePrefixCls = computed(() => routeContext.value.getPrefixCls('layout-header'))
    const needSiderWidth = computed(() => needFixedHeader.value && props.hasSiderMenu && !props.isMobile && props.layout !== 'top')
    const needFixedHeader = computed(() => props.fixedHeader || routeContext.value.fixedHeader || props.layout === 'mix')

    const baseClassName = computed(() => {
      return {
        [`${basePrefixCls.value.slice(0, -7)}-fixed-header`]: needFixedHeader.value,
        [`${basePrefixCls.value}-top-menu`]: props.layout === 'top',
      }
    })

    const clearMenuData = computed(() => {
      if (!helper.isArray(routeContext.value.menuData)) {
        return []
      }

      return clearMenuItem(routeContext.value.menuData as any[])
    })

    const headerTheme = computed(() => {
      return props.theme !== 'realDark' ? props.theme : 'dark'
    })

    const headerWidth = computed(() => {
      return props.layout !== 'mix' && needSiderWidth.value
        ? `calc(100% - ${props.collapsed ? props.collapsedWidth : props.siderWidth}px)`
        : '100%'
    })

    const RenderPaddingHeader = () => {
      if (needFixedHeader.value) {
        return (
          <ALayout.Header
            style={{
              height: `${props.headerHeight}px`,
              lineHeight: `${props.headerHeight}px`,
              background: 'transparent',
            }}
          />
        )
      }
    }

    const RenderHeaderContent = () => {
      let defaultDom = null

      if (!props.isMobile && props.layout === 'top') {
        defaultDom = (
          <TopNavHeader
            {...props}
            mode="horizontal"
            theme={headerTheme.value}
            menuData={clearMenuData.value}
          />
        )
      }

      if (helper.isFunction(props.headerRender)) {
        return props.headerRender({ ...props }, defaultDom)
      }

      return defaultDom
    }

    const RenderLayoutHeader = () => {
      return (
        <ALayout.Header
          prefixCls={basePrefixCls.value}
          class={baseClassName.value}
          style={{
            width: headerWidth.value,
            height: `${props.headerHeight}px`,
            margin: 0,
            padding: 0,
            lineHeight: `${props.headerHeight}px`,
            backgroundColor: '#001529 !important',
            zIndex: props.layout === 'mix' ? 100 : 19,
            right: needFixedHeader.value ? 0 : undefined,
          }}
        >
          { RenderHeaderContent() }
        </ALayout.Header>
      )
    }

    return () => {
      return (
        <Fragment>
          { RenderPaddingHeader() }
          { RenderLayoutHeader() }
        </Fragment>
      )
    }
  },
})

export const ProBasicLayout = defineComponent({
  name: 'ProBasicLayout',
  inheritAttrs: false,
  props: {
    ...defaultSettingProps,
    ...defaultBaseMenuProps,
    ...defaultSiderMenuProps,
    ...defaultGlobalHeaderProps,
    ...defaultProLayoutHeaderProps,
    ...defaultProBasicLayoutProps,
  },
  emits: {
    'update:selectedKeys': (keys: Key[]) => true,
    'update:openKeys': (keys: Key[]) => true,
    'menuClick': (...args: any[]) => true,
    'openKeys': (keys: Key[]) => true,
    'select': (keys: Key[]) => true,
  },
  setup(props, { attrs, slots, emit }) {
    const colSize = useMediaQuery()
    const hasSide = computed(() => props.layout === 'mix' || props.layout === 'side')
    const isMobile = computed(() => colSize.value === 'sm' || colSize.value === 'xs')
    const siderWidth = computed(() => props.collapsed ? props.collapsedWidth : props.siderWidth)
    const hasFlatMenu = computed(() => hasSide.value === true && hasSplitMenu.value === true)
    const hasSplitMenu = computed(() => props.layout === 'mix' && props.splitMenus === true)
    const basicClassName = computed(() => `${props.prefixCls}-basicLayout`)
    const layoutClassName = computed(() => `${props.prefixCls}-layout`)

    const flatMenuData = computed(() => {
      return hasFlatMenu.value && helper.isArray(props.selectedKeys)
        ? firstMenuChildren(props.menuData, props.selectedKeys[0])
        : []
    })

    const routeContext = computed(() => ({
      ...defaultRouteContext,
      locale: props.locale,
      menuData: props.menuData,
      openKeys: props.openKeys || [],
      selectedKeys: props.selectedKeys || [],
      contentWidth: props.contentWidth,
      headerHeight: props.headerHeight,
      fixSiderbar: props.fixSiderbar,
      fixedHeader: props.fixedHeader,

      hasSide: hasSide.value,
      isMobile: isMobile.value,
      siderWidth: siderWidth.value,
      flatMenuData: flatMenuData.value,
      flatMenu: hasFlatMenu.value,
      hasHeader: true,
    }))

    provideRouteContext(routeContext)

    const onMenuClick = (...args: any[]) => {
      emit('menuClick', ...args)
    }

    const onOpenKeys = (keys: Key[]) => {
      emit('update:openKeys', keys)
      emit('openKeys', keys)
    }

    const onSelect = (keys: Key[]) => {
      emit('update:selectedKeys', keys)
      emit('select', keys)
    }

    return () => {
      const rightContentRender = getSlot<SProLayoutRightContentRender>(slots, props, 'rightContentRender')
      const subMenuItemRender = getSlot<SProLayoutSubMenuItemRender>(slots, props, 'subMenuItemRender')
      const menuContentRender = getSlot<SProLayoutMenuContentRender>(slots, props, 'menuContentRender')
      const menuHeaderRender = getSlot<SProLayoutMenuHeaderRender>(slots, props, 'menuHeaderRender')
      const menuFooterRender = getSlot<SProLayoutMenuFooterRender>(slots, props, 'menuFooterRender')
      const menuExtraRender = getSlot<SProLayoutMenuExtraRender>(slots, props, 'menuExtraRender')
      const menuItemRender = getSlot<SProLayoutMenuItemRender>(slots, props, 'menuItemRender')
      const headerRender = getSlot<SProLayoutHeaderRender>(slots, props, 'headerRender')

      const basicLayoutClassName = computed(() => {
        return {
          [`${props.prefixCls}-screen-${colSize.value}`]: colSize.value,
          [`${basicClassName.value}-top-menu`]: props.layout === 'top',
          [`${basicClassName.value}-fix-siderbar`]: props.fixSiderbar,
          [`${basicClassName.value}-${props.layout}`]: props.layout,
          [`${basicClassName.value}`]: true,
        }
      })

      const contentClassName = computed(() => {
        return {
          [`${basicClassName.value}-content`]: true,
          [`${basicClassName.value}-has-header`]: true,
        }
      })

      const RenderProLayoutHeader = () => {
        const binds = {
          ...props,
          isMobile: isMobile.value,
          hasSiderMenu: props.layout !== 'top',
          rightContentRender: rightContentRender,
          subMenuItemRender: subMenuItemRender,
          menuContentRender: menuContentRender,
          menuHeaderRender: menuHeaderRender,
          menuExtraRender: menuExtraRender,
          menuItemRender: menuItemRender,
          headerRender: headerRender,
          onOpenKeys: onOpenKeys,
          onSelect: onSelect,
        }

        return <ProLayoutHeader {...binds} />
      }

      const RenderSiderMenuWrapper = () => {
        if (props.layout !== 'top' || isMobile.value) {
          const binds = {
            ...props,
            isMobile: isMobile.value,
            menuContentRender: menuContentRender,
            subMenuItemRender: subMenuItemRender,
            menuHeaderRender: menuHeaderRender,
            menuFooterRender: menuFooterRender,
            menuExtraRender: menuExtraRender,
            menuItemRender: menuItemRender,
            onMenuClick: onMenuClick,
            onOpenKeys: onOpenKeys,
            onSelect: onSelect,
          }

          return <SiderMenuWrapper {...binds} />
        }
      }

      const RenderProLayoutContent = () => {
        return (
          <ALayout.Content
            style={props.contentStyle}
            class={contentClassName.value}
            prefixCls={routeContext.value.getPrefixCls('layout-content')}
            hasSider={props.hasSider}
          >
            { slots.default?.() }
          </ALayout.Content>
        )
      }

      const RenderProLayoutWrapper = () => {
        return (
          <div style="display: flex; flex: 1 1 auto; flex-direction: column; min-width: 0; position: relative;">
            { RenderProLayoutHeader() }
            { RenderProLayoutContent() }
          </div>
        )
      }

      return (
        <div class={basicLayoutClassName.value}>
          <ALayout
            prefixCls={layoutClassName.value}
            style={{ minHeight: '100%', ...((attrs.style as CSSProperties) || {}) }}
          >
            { RenderSiderMenuWrapper() }
            { RenderProLayoutWrapper() }
          </ALayout>
        </div>
      )
    }
  },
})

export default ProBasicLayout
