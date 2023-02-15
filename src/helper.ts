import dayjs from './dayjs'

export function itType(val: unknown) {
  return Object.prototype.toString.call(val).replace(/^\[[^\s\]]+\s*([^\s\]]+)]$/, '$1')
}

export function isArray(arr: unknown): arr is unknown[] {
  return Array.isArray(arr)
}

export function isObject(obj: unknown): obj is object & Exclude<unknown, unknown[] | Function | RegExp> {
  return itType(obj) === 'Object'
}

export function isString(str: unknown): str is string {
  return itType(str) === 'String'
}

export function isNumber(num: unknown): num is number {
  return itType(num) === 'Number'
}

export function isRegExp(reg: unknown): reg is RegExp {
  return itType(reg) === 'RegExp'
}

export function isBoolean(bool: unknown): bool is Boolean {
  return itType(bool) === 'Boolean'
}

export function isFunction(func: unknown): func is Function {
  return itType(func) === 'Function'
}

export function isPrimitive(val: unknown): val is string | number {
  return isString(val) || isFiniteNumber(val)
}

export function isNotEmptyArray(arr: unknown): arr is unknown[] {
  return isArray(arr) && arr.length > 0
}

export function isNotEmptyObject(obj: unknown): obj is object & Exclude<unknown, unknown[] | Function | RegExp> {
  return isObject(obj) && Object.keys(obj).length > 0
}

export function isNotEmptyString(str: unknown): str is string {
  return isString(str) && !!str.trim()
}

export function isNotFiniteNumber(num: unknown): num is number {
  return isNumber(num) && !isFinite(num)
}

export function isFiniteNumber(num: unknown): num is number {
  return isNumber(num) && Number.isFinite(num)
}

export function isEmptyString(str: unknown): str is string {
  return isString(str) && !str.trim()
}

export function isEmptyObject(obj: unknown): obj is object & Exclude<unknown, unknown[] | Function | RegExp> {
  return isObject(obj) && Object.keys(obj).length === 0
}

export function isEmptyArray(arr: unknown): arr is unknown[] {
  return isArray(arr) && arr.length === 0
}

export function toDeepClone<T = unknown>(source: T, ...reset: unknown[]): T {
  const keys = (own: unknown) => {
    return isObject(own) ? Object.keys(own) : isArray(own) ? own.keys() : []
  }

  const clone = (i: any, o: any) => {
    for (const key of keys(o)) {
      const iIsArray = isArray(i[key])
      const oIsArray = isArray(o[key])
      const iIsObject = isObject(i[key])
      const oIsObject = isObject(o[key])
      const ioIsArray = iIsArray && oIsArray
      const ioIsObject = iIsObject && oIsObject

      if (ioIsArray || ioIsObject) {
        clone(i[key], o[key])
        continue
      }

      if (oIsObject) {
        clone((i[key] = {}), o[key])
        continue
      }

      if (oIsArray) {
        clone((i[key] = []), o[key])
        continue
      }

      i[key] = o[key]
    }
  }

  let input
  let inArgs

  if (!isObject(source) && !isArray(source)) {
    return source
  }

  if (isObject(source)) {
    input = {}
    inArgs = [source, ...reset]
  }

  if (isArray(source)) {
    input = []
    inArgs = [source, ...reset]
  }

  if (inArgs) {
    for (const output of inArgs) {
      const iIsArray = isArray(input)
      const oIsArray = isArray(output)
      const iIsObject = isObject(input)
      const oIsObject = isObject(output)
      const ioIsArray = iIsArray && oIsArray
      const ioIsObject = iIsObject && oIsObject

      ioIsObject && clone(input, output)
      ioIsArray && clone(input, output)
    }
  }

  return input as T
}

export const takeTimeToDate = (date: dayjs.ConfigType, format?: dayjs.OptionType) => {
  if (date) {
    try { return dayjs(date, format) } catch {}
  }
  return null
}

export const takeTimeToFormat = (date: dayjs.ConfigType, format = 'YYYY-MM-DD HH:mm:ss') => {
  if (date) {
    try { return dayjs(date).format(format) } catch {}
  }
  return ''
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
      if (isNotEmptyArray(tree[children])) {
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
  itType,
  isArray,
  isObject,
  isString,
  isNumber,
  isRegExp,
  isBoolean,
  isFunction,
  isPrimitive,
  isEmptyArray,
  isEmptyObject,
  isEmptyString,
  isNotEmptyArray,
  isNotEmptyObject,
  isNotEmptyString,
  isNotFiniteNumber,
  isFiniteNumber,
  toDeepClone,
  takeTimeToDate,
  takeTimeToFormat,
  takeLabelByKey,
  takeTreeByKey,
  takePadEnd,
  takeFixed
}
