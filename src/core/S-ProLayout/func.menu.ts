import helper from '@/helper'
import type { SProLayoutMenuItem } from './type.js'
import type { RouteRecord, RouteRecordRaw } from 'vue-router'

export function flatMenuItem(items: RouteRecord[]): SProLayoutMenuItem[] {
  const menus: any[] = items.map(item => {
    const route = { ...item } as SProLayoutMenuItem

    if (!route.name || route.meta?.hideInMenu === true) {
      return null
    }

    if (Reflect.has(item, 'children')) {
      delete route.children
    }

    return route
  })

  return menus.filter(item => item)
}

export function clearMenuItem(items: RouteRecord[] | RouteRecordRaw[]): RouteRecordRaw[] {
  const menus: any[] = items.map((item: RouteRecord | RouteRecordRaw) => {
    const route = { ...item } as RouteRecordRaw

    if (!route.name || route.meta?.hideInMenu === true) {
      return null
    }

    if (helper.isNonEmptyArray(route.children)) {
      if (route.meta?.hideChildInMenu !== true && route.children.some((child: RouteRecord | RouteRecordRaw) => child && child.name && child.meta?.hideInMenu !== true)) {
        return {
          ...route,
          children: clearMenuItem(route.children),
        }
      }
    }

    if (Reflect.has(route, 'children')) {
      delete route.children
    }

    return route
  })

  return menus.filter(item => item)
}

export function firstMenuChildren(menus: SProLayoutMenuItem[], key?: string): SProLayoutMenuItem[] {
  if (key !== undefined) {
    const menu = menus.find(menu => menu.path === key)
    return menu?.children || []
  }

  return []
}
