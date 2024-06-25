import type { Key } from 'ant-design-vue/es/_util/type'
import type { SProLayoutSiderBreakpoint } from './type'
import type { SProLayoutRightContentRender } from './type'
import type { SProLayoutMenuContentRender } from './type'
import type { SProLayoutSubMenuItemRender } from './type'
import type { SProLayoutMenuHeaderRender } from './type'
import type { SProLayoutMenuFooterRender } from './type'
import type { SProLayoutMenuExtraRender } from './type'
import type { SProLayoutMenuItemRender } from './type'
import type { SProLayoutHeaderRender } from './type'
import type { SProLayoutPureSettings } from './type'
import type { SProLayoutLayoutMode } from './type'
import type { SProLayoutMenuMode } from './type'
import type { SProLayoutMenuItem } from './type'
import type { SProLayoutTheme } from './type'
import type { CSSProperties } from 'vue'

import * as VueTypes from 'vue-types'

export const defaultSettingProps = {
  theme: VueTypes.any<SProLayoutPureSettings['theme']>().def('light'),
  layout: VueTypes.any<SProLayoutPureSettings['layout']>().def('side'),
  headerTheme: VueTypes.any<SProLayoutPureSettings['headerTheme']>().def('light'),
  headerHeight: VueTypes.any<SProLayoutPureSettings['headerHeight']>().def(48),
  contentWidth: VueTypes.any<SProLayoutPureSettings['contentWidth']>().def('Fluid'),
  primaryColor: VueTypes.any<SProLayoutPureSettings['primaryColor']>().def('#f5222d'),
  fixedHeader: VueTypes.any<SProLayoutPureSettings['fixedHeader']>().def(true),
  fixSiderbar: VueTypes.any<SProLayoutPureSettings['fixSiderbar']>().def(true),
  splitMenus: VueTypes.any<SProLayoutPureSettings['splitMenus']>().def(false),
  iconfontUrl: VueTypes.any<SProLayoutPureSettings['iconfontUrl']>().def(''),
  iconPrefix: VueTypes.any<SProLayoutPureSettings['iconPrefix']>().def('icon-'),
  iconStyle: VueTypes.any<SProLayoutPureSettings['iconStyle']>().def(undefined),
  iconClass: VueTypes.any<SProLayoutPureSettings['iconClass']>().def(undefined),
}

export const defaultBaseMenuProps = {
  ...defaultSettingProps,

  mode: VueTypes.string<SProLayoutMenuMode>().def('inline'),
  theme: VueTypes.string<SProLayoutTheme>().def('light'),
  locale: VueTypes.func<(message?: string) => string>().def((message?: string) => message || ''),
  layout: VueTypes.string<SProLayoutLayoutMode>().def('side'),
  menuData: VueTypes.array<SProLayoutMenuItem>().def([]),
  multiple: VueTypes.bool().def(false),
  prefixCls: VueTypes.string().def('s-pro'),
  collapsed: VueTypes.bool().def(false),
  inlineIndent: VueTypes.number().def(16),
  menuItemRender: VueTypes.any<SProLayoutMenuItemRender>().def(() => undefined),
  subMenuItemRender: VueTypes.any<SProLayoutSubMenuItemRender>().def(() => undefined),
  selectedKeys: VueTypes.any<string[] | false>().def(undefined),
  openKeys: VueTypes.any<string[] | false>().def(undefined),
}

export const defaultSiderMenuProps = {
  ...defaultSettingProps,
  ...defaultBaseMenuProps,

  siderWidth: VueTypes.number().def(192),
  headerHeight: VueTypes.number().def(48),
  collapsedWidth: VueTypes.number().def(48),
  menuHeaderRender: VueTypes.any<SProLayoutMenuHeaderRender>().def(() => undefined),
  menuFooterRender: VueTypes.any<SProLayoutMenuFooterRender>().def(() => undefined),
  menuContentRender: VueTypes.any<SProLayoutMenuContentRender>().def(() => undefined),
  menuExtraRender: VueTypes.any<SProLayoutMenuExtraRender>().def(() => undefined),
  headerRender: VueTypes.any<SProLayoutHeaderRender>().def(() => undefined),
  breakpoint: VueTypes.any<SProLayoutSiderBreakpoint>().def(undefined),
  splitMenus: VueTypes.bool().def(false),
  isMobile: VueTypes.bool().def(false),
  fixed: VueTypes.bool().def(false),

  onMenuClick: VueTypes.func().def(undefined),
  onCollapse: VueTypes.func<(collapsed: boolean) => void>().def(undefined),
  onOpenKeys: VueTypes.func<(openKeys: Key[]) => void>().def(undefined),
  onSelect: VueTypes.func<(selectedKeys: Key[]) => void>().def(undefined),
}

export const defaultGlobalHeaderProps = {
  ...defaultSettingProps,

  prefixCls: VueTypes.string().def('s-pro'),
  splitMenus: VueTypes.bool().def(false),
  collapsed: VueTypes.bool().def(false),
  isMobile: VueTypes.bool().def(false),
  menuData: VueTypes.array<SProLayoutMenuItem>().def(() => []),
  headerTheme: VueTypes.string<SProLayoutTheme>().def('light'),
  rightContentRender: VueTypes.any<SProLayoutRightContentRender>().def(() => undefined),
  subMenuItemRender: VueTypes.any<SProLayoutSubMenuItemRender>().def(() => undefined),
  menuHeaderRender: VueTypes.any<SProLayoutMenuHeaderRender>().def(() => undefined),
  menuItemRender: VueTypes.any<SProLayoutMenuItemRender>().def(() => undefined),
  onCollapse: VueTypes.func<(collapsed: boolean) => void>().def(undefined),
  onOpenKeys: VueTypes.func<(openKeys: Key[]) => void>().def(undefined),
  onSelect: VueTypes.func<(selectedKeys: Key[]) => void>().def(undefined),
}

export const defaultProLayoutHeaderProps = {
  ...defaultSettingProps,
  ...defaultGlobalHeaderProps,

  hasSiderMenu: VueTypes.bool().def(false),
  headerRender: VueTypes.any<SProLayoutHeaderRender>().def(() => undefined),
  collapsedWidth: VueTypes.number().def(48),
  siderWidth: VueTypes.number().def(192),
}

export const defaultProBasicLayoutProps = {
  ...defaultSettingProps,
  ...defaultBaseMenuProps,
  ...defaultSiderMenuProps,
  ...defaultGlobalHeaderProps,
  ...defaultProLayoutHeaderProps,

  hasSider: VueTypes.bool().def(undefined),
  contentStyle: VueTypes.any<CSSProperties | null>().def(null),
  headerRender: VueTypes.any<SProLayoutHeaderRender>().def(() => undefined),
  locale: VueTypes.func<(message?: string) => string>().def((message?: string) => message || ''),
  theme: VueTypes.string<SProLayoutTheme>().def('light'),
}
