import { provide } from 'vue'
import { reactive } from 'vue'
import { useContext } from './func.context'
import { createContext } from './func.context'
import type { SProLayoutRouteRequiredProps } from './type.js'
import type { SProLayoutRouteContextProps } from './type.js'
import type { InjectionKey, Ref } from 'vue'

export const defaultRouteContext = reactive({
  getPrefixCls: (suffixCls?: string, customizePrefixCls?: string) => customizePrefixCls || (suffixCls ? `s-pro-${suffixCls}` : `s-pro`),
  locale: (message?: string) => message || '',
})

export const routeContextInjectKey: InjectionKey<SProLayoutRouteContextProps | Ref<SProLayoutRouteContextProps>> = Symbol('RouteContext')

export const provideRouteContext = (value: SProLayoutRouteContextProps | Ref<SProLayoutRouteContextProps>) => provide(routeContextInjectKey, value)

export const createRouteContext = () => createContext<SProLayoutRouteContextProps>(routeContextInjectKey, 'RouteContext.Provider')

export const useRouteContext = () => useContext<SProLayoutRouteRequiredProps>(routeContextInjectKey, defaultRouteContext)
