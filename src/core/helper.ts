import dayjs from '@/dayjs'
import { equal } from 'js-simpler'
import { clone } from 'js-simpler'
import { assign } from 'js-simpler'
import { isArray } from 'js-simpler'
import { isObject } from 'js-simpler'
import { isString } from 'js-simpler'
import { isNumber } from 'js-simpler'
import { isRegExp } from 'js-simpler'
import { isPromise } from 'js-simpler'
import { isBoolean } from 'js-simpler'
import { toPromise } from 'js-simpler'
import { deepEqual } from 'js-simpler'
import { deepClone } from 'js-simpler'
import { deepAssign } from 'js-simpler'
import { isFunction } from 'js-simpler'
import { isEmptyArray } from 'js-simpler'
import { isEmptyString } from 'js-simpler'
import { isEmptyObject } from 'js-simpler'
import { isFiniteNumber } from 'js-simpler'
import { isNonEmptyArray } from 'js-simpler'
import { isNonEmptyObject } from 'js-simpler'
import { isNonEmptyString } from 'js-simpler'

export const isPrimitive = (val: unknown): val is string | number => {
  return isString(val) || isFiniteNumber(val)
}

export const isReference = (val: unknown): val is any[] | Record<string, unknown> => {
  return isArray(val) || isObject(val)
}

export const takeTimeToDesc = (date: dayjs.ConfigType, format = 'YYYY-MM-DD HH:mm:ss'): string => {
  if (date !== null && date !== undefined) {
    try { return dayjs(date).format(format) } catch {}
  }
  return ''
}

export const takeTimeToDate = (date: dayjs.ConfigType, format?: dayjs.OptionType): dayjs.Dayjs | undefined => {
  if (date !== null && date !== undefined) {
    try {
      return dayjs(date, format)
    } catch {}
  }
  return undefined
}

export const takeLabelByKey = (trees: Record<string, any>[], key: string | number, label = 'label', value = 'value', children = 'children'): string | number => {
  return takeTreeByKey(trees, key, value, children)?.[label] || key
}

export const takeTreeByKey = (trees: Record<string, any>[], key: string | number, value = 'value', children = 'children'): Record<string, any> | null => {
  if (isArray(trees) && (isString(key) || isNumber(key))) {
    for (const tree of trees) {
      if (key === tree[value]) {
        return tree
      }
      if (isNonEmptyArray(tree[children])) {
        const node = takeTreeByKey(tree[children], key, value, children)
        if (node) return node
      }
    }
  }
  return null
}

export const takePadEnd = (num: number | string, keep = 0) => {
  const string = String(+num || 0)
  const [integer = '0', decimal = ''] = string.split('.')
  return +keep || decimal ? [integer, decimal.padEnd(+keep, '0')].join('.') : integer
}

export const takeFixed = (num: number | string, digit = 0) => {
  if (!isFinite(+num)) {
    return '0.' + ''.padEnd(digit, '0')
  }

  let string = ''

  num = +num || 0
  digit = isFinite(digit) ? +digit : 2
  string = String(Math.round(Math.pow(10, digit) * num) / Math.pow(10, digit))

  if (~string.indexOf('.')) {
    const arr = string.split('.')
    return arr[0] + '.' + arr[1].padEnd(digit, '0')
  }

  if (digit !== 0) {
    string += '.' + ''.padEnd(digit, '0')
  }

  return string
}

export default {
  isArray,
  isObject,
  isString,
  isNumber,
  isRegExp,
  isPromise,
  isBoolean,
  isFunction,
  isPrimitive,
  isReference,
  isEmptyArray,
  isEmptyObject,
  isEmptyString,
  isNonEmptyArray,
  isNonEmptyObject,
  isNonEmptyString,
  isFiniteNumber,
  takeTimeToDesc,
  takeTimeToDate,
  takeLabelByKey,
  takeTreeByKey,
  takePadEnd,
  takeFixed,
  deepAssign,
  deepClone,
  deepEqual,
  toPromise,
  assign,
  clone,
  equal
}
