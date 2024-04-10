import type { Slot } from 'vue'
import type { VNode } from 'vue'
import type { VNodeChild } from 'vue'

export interface SProLayoutMetaInfo {
  icon?: string | VNode;
  type?: string;
  title?: string;
  target?: '_blank' | '_self' | null;
  hideChildInMenu?: boolean;
  hideInMenu?: boolean;
  disabled?: boolean;
  flatMenu?: boolean;
  [key: string]: any;
}

export interface SProLayoutMenuItem {
  path: string;
  name?: string | symbol;
  children?: SProLayoutMenuItem[];
  meta?: SProLayoutMetaInfo;
}

export interface SProLayoutPureSettings {
  title: string;
  theme: SProLayoutTheme | 'realDark' | undefined;
  layout: 'side' | 'top' | 'mix';
  headerTheme?: SProLayoutTheme;
  headerHeight?: number;
  contentWidth: SProLayoutContentWidth;
  primaryColor: string;
  iconfontUrl: string;
  iconPrefix: string;
  fixedHeader: boolean;
  fixSiderbar: boolean;
  splitMenus?: boolean;
  colorWeak?: boolean;
}

export interface SProLayoutRouteContextProps extends Partial<SProLayoutPureSettings> {
  openKeys: string[];
  selectedKeys: string[];
  menuData: SProLayoutMenuItem[];
  flatMenuData?: SProLayoutMenuItem[];
  getPrefixCls?: (suffixCls?: string, customizePrefixCls?: string) => string;
  locale?: SProLayoutWithFalse<SProLayoutFormatMessage>;
  isMobile?: boolean;
  prefixCls?: string;
  collapsed?: boolean;
  siderWidth?: number;
  headerHeight?: number;
  hasSideMenu?: boolean;
  hasHeader?: boolean;
  hasSide?: boolean;
  [key: string]: any;
}

export type SProLayoutProps = Record<string, any>
export type SProLayoutTheme = 'light' | 'dark' | 'realDark'
export type SProLayoutMenuMode = 'horizontal' | 'vertical' | 'inline'
export type SProLayoutLayoutMode = 'side' | 'top' | 'mix'
export type SProLayoutContentWidth = 'Fluid' | 'Fixed'
export type SProLayoutSiderBreakpoint = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'xxl' | 'xxxl'
export type SProLayoutFormatMessage = (message?: string) => string
export type SProLayoutRouteRequiredProps = Required<SProLayoutRouteContextProps>
export type SProLayoutWithFalse<T> = T | false
export type SProLayoutWithTrue<T> = T | true

export type SProLayoutHeaderRender = SProLayoutWithFalse<(props: SProLayoutProps, vnode: any) => SProLayoutRenderNode>;
export type SProLayoutRightContentRender = SProLayoutWithFalse<(props: SProLayoutProps) => SProLayoutRenderNode>;
export type SProLayoutSubMenuItemRender = SProLayoutWithFalse<(props: { item: SProLayoutMenuItem; children?: SProLayoutRenderNode[] }) => SProLayoutRenderNode>;
export type SProLayoutMenuHeaderRender = SProLayoutWithFalse<(props: SProLayoutProps) => SProLayoutRenderNode>;
export type SProLayoutMenuItemRender = SProLayoutWithFalse<(props: { item: SProLayoutMenuItem; title?: SProLayoutRenderNode; icon?: SProLayoutRenderNode }) => SProLayoutRenderNode>;
export type SProLayoutMenuContentRender = SProLayoutWithFalse<(props: SProLayoutProps, defaultRender: SProLayoutRenderNode) => SProLayoutRenderNode>;
export type SProLayoutMenuFooterRender = SProLayoutWithFalse<(props: SProLayoutProps) => SProLayoutRenderNode>;
export type SProLayoutMenuExtraRender = SProLayoutWithFalse<(props: SProLayoutProps) => SProLayoutRenderNode>;

export type SProLayoutRenderNode =
| ((...props: any[]) => VNode)
| ((...props: any[]) => Slot)
| JSX.Element
| VNodeChild
| VNode[]
| VNode
| Slot
| undefined
| string
| null
