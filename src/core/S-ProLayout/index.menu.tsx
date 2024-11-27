import './index.menu.less'
import helper from '@/helper'

import { useRouteContext } from './func.route'
import { defaultSiderMenuProps } from './props'
import { defaultBaseMenuProps } from './props'
import { defaultSettingProps } from './props'
import { resolveComponent } from 'vue'
import { defineComponent } from 'vue'
import { Fragment } from 'vue'
import { computed } from 'vue'

import type { Key } from 'ant-design-vue/es/_util/type'
import type { SProLayoutRenderNode } from './type'
import type { SProLayoutMenuItem } from './type'
import type { SProLayoutMetaInfo } from './type'

import LazyMenuIcon from './index.lazy.icon'
import ALayout from 'ant-design-vue/es/layout'
import ADrawer from 'ant-design-vue/es/drawer'
import AMenu from 'ant-design-vue/es/menu'

export type { Key }

export const BaseMenu = defineComponent({
  name: 'BaseMenu',
  inheritAttrs: false,
  props: {
    ...defaultSettingProps,
    ...defaultBaseMenuProps,
  },
  emits: {
    'click': (info: any) => true,
    'update:openKeys': (keys: Key[]) => true,
    'update:selectedKeys': (keys: Key[]) => true,
  },
  setup(props, { emit, attrs }) {
    const routeContext = useRouteContext()
    const getPrefixCls = routeContext.value.getPrefixCls

    const getMenuItem = (item: SProLayoutMenuItem) => {
      const meta = { ...item.meta } as SProLayoutMetaInfo
      const menu = { title: null as SProLayoutRenderNode, icon: null as SProLayoutRenderNode }
      const binds = { to: { name: item.name, ...item.meta } } as Record<string, any>
      const attrs = {} as Record<string, any>
      const check = /^https?:\/\/.+/i

      if (meta.icon) {
        const iconClass = props.iconClass
        const iconStyle = props.iconStyle
        const iconPrefix = props.iconPrefix
        const iconfontUrl = props.iconfontUrl

        menu.icon = (
          <LazyMenuIcon
            icon={meta.icon}
            class={iconClass}
            style={iconStyle}
            iconPrefix={iconPrefix}
            iconfontUrl={iconfontUrl}
          />
        )
      }

      if (meta.target) {
        Object.assign(attrs, { href: item.path, target: meta.target })
      }

      if (check.test(item.path)) {
        Object.assign(attrs, { href: item.path, target: '_blank' })
      }

      if (meta.target !== '_blank' && meta.target !== '_self' && meta.target !== '_none') {
        const locale = props.locale
        const prefixCls = props.prefixCls
        const CustomTag = resolveComponent(meta.target ?? 'RouterLink') as any
        const menuTitle = helper.isFunction(locale) ? locale(meta.title) : meta.title
        const titleStyle = menu.icon ? { marginInlineStart: '10px' } : {}

        menu.title = (
          <CustomTag {...binds} class={`${prefixCls}-menu-item`}>
            { menu.icon }
            <span style={titleStyle}>{menuTitle}</span>
          </CustomTag>
        )
      }

      if (meta.target === '_blank' || meta.target === '_self') {
        const locale = props.locale
        const prefixCls = props.prefixCls
        const menuTitle = helper.isFunction(locale) ? locale(meta.title) : meta.title
        const titleStyle = menu.icon ? { marginInlineStart: '10px' } : {}

        menu.title = (
          <a {...attrs} class={`${prefixCls}-menu-item`}>
            { menu.icon }
            <span style={titleStyle}>{menuTitle}</span>
          </a>
        )
      }

      if (meta.target !== '_none' && check.test(item.path)) {
        const locale = props.locale
        const prefixCls = props.prefixCls
        const menuTitle = helper.isFunction(locale) ? locale(meta.title) : meta.title
        const titleStyle = menu.icon ? { marginInlineStart: '10px' } : {}

        menu.title = (
          <a {...attrs} class={`${prefixCls}-menu-item`}>
            { menu.icon }
            <span style={titleStyle}>{menuTitle}</span>
          </a>
        )
      }

      if (meta.target === '_none') {
        const locale = props.locale
        const prefixCls = props.prefixCls
        const menuTitle = helper.isFunction(locale) ? locale(meta.title) : meta.title
        const titleStyle = menu.icon ? { marginInlineStart: '10px' } : {}

        menu.title = (
          <span class={`${prefixCls}-menu-item`}>
            { menu.icon }
            <span style={titleStyle}>{menuTitle}</span>
          </span>
        )
      }

      return menu
    }

    const getNavMenuItems = (menus?: SProLayoutMenuItem[]) => {
      if (helper.isArray(menus)) {
        return menus.map(item => getSubMenuOrItem(item)).filter(item => item)
      }
    }

    const getSubMenuOrItem = (item: SProLayoutMenuItem): SProLayoutRenderNode => {
      const meta = { ...item.meta }
      const menu = getMenuItem(item)

      const render = {
        title: meta.title as SProLayoutRenderNode,
        icon: null as SProLayoutRenderNode,
      }

      const icon = menu.icon
      const title = menu.title
      const locale = props.locale
      const iconClass = props.iconClass
      const iconStyle = props.iconStyle
      const prefixCls = props.prefixCls
      const iconPrefix = props.iconPrefix
      const iconfontUrl = props.iconfontUrl
      const menuItemRender = props.menuItemRender
      const subMenuItemRender = props.subMenuItemRender

      if (helper.isNonEmptyArray(item.children) && !meta.hideInMenu && !meta.hideChildrenInMenu) {
        if (helper.isFunction(subMenuItemRender)) {
          return subMenuItemRender({ item, children: getNavMenuItems(item.children) })
        }

        if (helper.isFunction(locale)) {
          render.title = locale(meta.title)
        }

        if (!meta.icon) {
          render.title = (
            <span class={`${prefixCls}-menu-item`}>
              {render.title}
            </span>
          )
        }

        if (meta.icon) {
          render.title = (
            <span class={`${prefixCls}-menu-item`}>
              <span class={`${prefixCls}-menu-item-title`}>{render.title}</span>
            </span>
          )
        }

        const menuIcon = <LazyMenuIcon icon={meta.icon} iconPrefix={iconPrefix} iconfontUrl={iconfontUrl} class={iconClass} style={iconStyle} />
        const menuTitle = render.title

        return (
          <AMenu.SubMenu
            key={item.path}
            icon={menuIcon}
            title={menuTitle}
            popupClassName={`${prefixCls}-menu-popup`}
          >
            { getNavMenuItems(item.children) }
          </AMenu.SubMenu>
        )
      }

      if (helper.isFunction(menuItemRender)) {
        return menuItemRender({ item, title, icon })
      }

      return (
        <AMenu.Item
          disabled={meta.disabled}
          danger={meta.danger}
          key={item.path}
        >
          {title}
        </AMenu.Item>
      )
    }

    const onSelect = (opt: { key: Key; selectedKeys: Key[]; }) => {
      if ((/^https?:\/\/[^\s\S]+/i).test(opt.key as string)) {
        return
      }

      emit('update:selectedKeys', opt.selectedKeys)
    }

    const onOpenChange = (keys: Key[]) => {
      emit('update:openKeys', keys)
    }

    const onClick = (info: any) => {
      emit('click', info)
    }

    return () => (
      <AMenu
        key="Menu"
        mode={props.mode}
        class={attrs.class}
        style={attrs.style}
        theme={props.theme}
        prefixCls={getPrefixCls('menu')}
        inlineIndent={props.inlineIndent || 16}
        selectedKeys={props.selectedKeys || []}
        openKeys={props.openKeys || []}
        onOpenChange={onOpenChange}
        onSelect={onSelect}
        onClick={onClick}
      >
        { getNavMenuItems(props.menuData) }
      </AMenu>
    )
  },
})

export const SiderMenu = defineComponent({
  name: 'SiderMenu',
  inheritAttrs: false,
  props: {
    ...defaultSettingProps,
    ...defaultBaseMenuProps,
    ...defaultSiderMenuProps,
  },
  emits: {
    menuClick: (...args: any[]) => true,
    collapse: (bool: boolean) => true,
    openKeys: (keys: Key[]) => true,
    select: (keys: Key[]) => true,
  },
  setup(props, { emit }) {
    const routeContext = useRouteContext()
    const getPrefixCls = routeContext.value.getPrefixCls
    const baseClassName = routeContext.value.getPrefixCls('layout-sider')

    const onUpdateSelectedKeys = (keys: Key[]) => {
      SiderSplitMenu.value
        ? emit('select', [routeContext.value.selectedKeys[0], ...keys])
        : emit('select', keys)
    }

    const onUpdateOpenKeys = (keys: Key[]) => {
      emit('openKeys', keys)
    }

    const onCollapse = (collapse: boolean) => {
      if (!props.isMobile) {
        emit('collapse', collapse)
      }
    }

    const onMenuClick = (...args: any[]) => {
      emit('menuClick', ...args)
    }

    const siderWidth = computed(() => {
      return props.collapsed
        ? props.collapsedWidth
        : props.siderWidth
    })

    const SiderTheme = computed(() => {
      if (props.layout === 'mix' && props.theme !== 'realDark') {
        return 'light'
      }

      return props.theme !== 'realDark'
        ? props.theme
        : 'dark'
    })

    const SiderLocale = computed(() => {
      return props.locale || routeContext.value.locale
    })

    const SiderMenuData = computed(() => {
      return SiderSplitMenu.value
        ? routeContext.value.flatMenuData
        : routeContext.value.menuData
    })

    const SiderSplitMenu = computed(() => {
      return props.layout === 'mix' && props.splitMenus
    })

    const SiderHeaderTop = computed(() => {
      if (props.layout === 'mix' && !props.isMobile) {
        return `${props.headerHeight}px`
      }

      return undefined
    })

    const SiderClassNames = computed(() => {
      return {
        [baseClassName]: true,
        [`${baseClassName}-fixed`]: props.fixSiderbar,
        [`${baseClassName}-${SiderTheme.value}`]: true,
        [`${baseClassName}-layout-${props.layout}`]: props.layout && !props.isMobile,
      }
    })

    const RenderSiderMenuContent = () => {
      const defaultMenuVNode = (
        <BaseMenu
          mode="inline"
          style="width: 100%; background-color: transparent; border: none;"
          class={`${baseClassName}-menu`}
          prefixCls={getPrefixCls('menu')}
          theme={SiderTheme.value}
          locale={SiderLocale.value}
          menuData={SiderMenuData.value}
          selectedKeys={props.selectedKeys}
          menuItemRender={props.menuItemRender}
          subMenuItemRender={props.subMenuItemRender}
          iconfontUrl={props.iconfontUrl}
          iconPrefix={props.iconPrefix}
          collapsed={props.collapsed}
          openKeys={props.openKeys}
          onClick={onMenuClick}

          {
            ...{
              'onUpdate:selectedKeys': onUpdateSelectedKeys,
              'onUpdate:openKeys': onUpdateOpenKeys,
            }
          }
        />
      )

      if (helper.isFunction(props.menuContentRender)) {
        return (
          <div style="flex: 1 1 auto; overflow: hidden auto;">
            { props.menuContentRender({ ...props }, defaultMenuVNode) || defaultMenuVNode }
          </div>
        )
      }

      return (
        <div style="flex: 1 1 auto; overflow: hidden auto;">
          { defaultMenuVNode }
        </div>
      )
    }

    const RenderSiderMenuHeader = () => {
      if (!props.isMobile && props.layout === 'mix') {
        return
      }

      if (helper.isFunction(props.menuHeaderRender)) {
        const vnode = props.menuHeaderRender({ ...props })

        if (vnode) {
          return (
            <div class={`${baseClassName}-logo`}>
              { vnode }
            </div>
          )
        }
      }
    }

    const RenderSiderMenuExtra = () => {
      if (helper.isFunction(props.menuExtraRender)) {
        const vnode = props.menuExtraRender({ ...props })

        if (vnode) {
          return (
            <div class={`${baseClassName}-extra`}>
              { vnode }
            </div>
          )
        }
      }
    }

    const RenderSiderMenuFooter = () => {
      if (helper.isFunction(props.menuFooterRender)) {
        return (
          <div class={`${baseClassName}-footer`}>
            { props.menuFooterRender({ ...props }) }
          </div>
        )
      }
    }

    const RenderFixSiderbar = () => {
      if (props.fixSiderbar && helper.isNonEmptyArray(SiderMenuData.value)) {
        return (
          <div
            style={{
              flex: `0 0 ${siderWidth.value}px`,
              width: `${siderWidth.value}px`,
              maxWidth: `${siderWidth.value}px`,
              minWidth: `${siderWidth.value}px`,
              transition: `background-color 0.3s, min-width 0.3s, max-width 0.3s cubic-bezier(0.645, 0.045, 0.355, 1)`,
              overflow: 'hidden',
            }}
          />
        )
      }
    }

    const RenderLayoutSider = () => {
      if (helper.isNonEmptyArray(SiderMenuData.value)) {
        return (
          <ALayout.Sider
            style={{
              overflow: 'hidden',
              backgroundColor: SiderTheme.value !== 'light' ? '#001529 !important' : '#ffffff !important',
              paddingTop: SiderHeaderTop.value,
            }}
            trigger={null}
            collapsible={true}
            width={siderWidth.value}
            theme={SiderTheme.value}
            class={SiderClassNames.value}
            prefixCls={getPrefixCls('layout-sider')}
            collapsed={props.collapsed}
            breakpoint={props.breakpoint}
            collapsedWidth={props.collapsedWidth}
            onCollapse={onCollapse}
          >
            { RenderSiderMenuHeader() }
            { RenderSiderMenuExtra() }
            { RenderSiderMenuContent() }
            { RenderSiderMenuFooter()}
          </ALayout.Sider>
        )
      }
    }

    return () => (
      <Fragment>
        { RenderFixSiderbar() }
        { RenderLayoutSider() }
      </Fragment>
    )
  },
})

export const SiderMenuWrapper = defineComponent({
  name: 'SiderMenuWrapper',
  inheritAttrs: false,
  props: {
    ...defaultSettingProps,
    ...defaultBaseMenuProps,
    ...defaultSiderMenuProps,
  },
  emits: {
    menuClick: (...args: any[]) => true,
    collapse: (bool: boolean) => true,
    openKeys: (keys: Key[]) => true,
    select: (keys: Key[]) => true,
  },
  setup(props, { emit }) {
    const routeContext = useRouteContext()
    const getPrefixCls = routeContext.value.getPrefixCls

    const onUpdateSelectedKeys = (keys: Key[]) => {
      emit('select', keys)
    }

    const onUpdateOpenKeys = (keys: Key[]) => {
      emit('openKeys', keys)
    }

    const onMenuClick = (...args: any[]) => {
      emit('menuClick', ...args)
    }

    const onCollapse = (collapse: boolean) => {
      if (!props.isMobile) {
        emit('collapse', collapse)
      }
    }

    return () => {
      if (props.isMobile) {
        return (
          <ADrawer
            mask={true}
            closable={false}
            maskClosable={true}
            placement="left"
            open={!props.collapsed}
            width={props.siderWidth}
            style={{ padding: 0, height: '100vh' }}
            onClose={() => emit('collapse', true)}
            rootClassName={getPrefixCls('sider-menu-drawer')}
            bodyStyle={{
              display: 'flex',
              height: '100vh',
              padding: '0px 0px',
              flexDirection: 'row',
            }}
          >
            <SiderMenu
              mode={props.mode}
              theme={props.theme}
              fixed={props.fixed}
              locale={props.locale}
              layout={props.layout}
              isMobile={props.isMobile}
              menuData={props.menuData}
              multiple={props.multiple}
              siderWidth={props.siderWidth}
              breakpoint={props.breakpoint}
              iconPrefix={props.iconPrefix}
              iconfontUrl={props.iconfontUrl}
              fixedHeader={props.fixedHeader}
              fixSiderbar={props.fixSiderbar}
              headerTheme={props.headerTheme}
              headerHeight={props.headerHeight}
              contentWidth={props.contentWidth}
              primaryColor={props.primaryColor}
              inlineIndent={props.inlineIndent}
              selectedKeys={props.selectedKeys}
              headerRender={props.headerRender}
              collapsedWidth={props.collapsedWidth}
              menuItemRender={props.menuItemRender}
              menuExtraRender={props.menuExtraRender}
              menuHeaderRender={props.menuHeaderRender}
              menuFooterRender={props.menuFooterRender}
              menuContentRender={props.menuContentRender}
              subMenuItemRender={props.subMenuItemRender}
              collapsed={props.isMobile ? false : props.collapsed}
              openKeys={props.openKeys}
              onMenuClick={onMenuClick}
              onCollapse={onCollapse}
              splitMenus={false}

              {
                ...{
                  'onUpdate:selectedKeys': onUpdateSelectedKeys,
                  'onUpdate:openKeys': onUpdateOpenKeys,
                }
              }
            />
          </ADrawer>
        )
      }

      return (
        <SiderMenu
          mode={props.mode}
          theme={props.theme}
          fixed={props.fixed}
          locale={props.locale}
          layout={props.layout}
          isMobile={props.isMobile}
          menuData={props.menuData}
          multiple={props.multiple}
          splitMenus={props.splitMenus}
          siderWidth={props.siderWidth}
          breakpoint={props.breakpoint}
          iconPrefix={props.iconPrefix}
          iconfontUrl={props.iconfontUrl}
          fixedHeader={props.fixedHeader}
          fixSiderbar={props.fixSiderbar}
          headerTheme={props.headerTheme}
          headerHeight={props.headerHeight}
          contentWidth={props.contentWidth}
          primaryColor={props.primaryColor}
          inlineIndent={props.inlineIndent}
          selectedKeys={props.selectedKeys}
          headerRender={props.headerRender}
          collapsedWidth={props.collapsedWidth}
          menuItemRender={props.menuItemRender}
          menuExtraRender={props.menuExtraRender}
          menuHeaderRender={props.menuHeaderRender}
          menuFooterRender={props.menuFooterRender}
          menuContentRender={props.menuContentRender}
          subMenuItemRender={props.subMenuItemRender}
          collapsed={props.isMobile ? false : props.collapsed}
          openKeys={props.openKeys}
          onMenuClick={onMenuClick}
          onCollapse={onCollapse}

          {
            ...{
              'onUpdate:selectedKeys': onUpdateSelectedKeys,
              'onUpdate:openKeys': onUpdateOpenKeys,
            }
          }
        />
      )
    }
  },
})

export default SiderMenuWrapper
