import type { Slots } from 'vue'

export const getSlotVNode = <T>(slots: Slots, props: Record<string, unknown>, key = 'default'): T | false => {
  return (props[key] === undefined ? slots[key]?.() : props[key]) as any
}

export const getSlot = <T>(slots: Slots, props: Record<string, unknown>, key = 'default'): T | false => {
  return (props[key] === undefined ? slots[key] : props[key]) as any
}
