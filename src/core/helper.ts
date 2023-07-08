import dayjs from '@/dayjs'

export function itType(val: unknown) {
  return Object.prototype.toString.call(val).replace(/^\[[^\s\]]+\s*([^\s\]]+)]$/, '$1')
}

export function isArray(arr: unknown): arr is any[] {
  return Array.isArray(arr)
}

export function isObject(obj: unknown): obj is Record<string, unknown> {
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

export function isBoolean(bool: unknown): bool is boolean {
  return itType(bool) === 'Boolean'
}

export function isFunction(func: unknown): func is Function {
  return itType(func) === 'Function' || itType(func) === 'AsyncFunction' || itType(func) === 'GeneratorFunction'
}

export function isReference(val: unknown): val is any[] | Record<string, unknown> {
  return isArray(val) || isObject(val)
}

export function isPrimitive(val: unknown): val is string | number {
  return isString(val) || isFiniteNumber(val)
}

export function isNotEmptyArray(arr: unknown): arr is any[] {
  return isArray(arr) && arr.length > 0
}

export function isNotEmptyObject(obj: unknown): obj is Record<string, unknown> {
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

export function isEmptyObject(obj: unknown): obj is Record<string, unknown> {
  return isObject(obj) && Object.keys(obj).length === 0
}

export function isEmptyArray(arr: unknown): arr is any[] {
  return isArray(arr) && arr.length === 0
}

export function toDeepAssign<T = unknown>(any: T, ...args: unknown[]): T {
  let target: any
  let sources: any

  const keys = (own: any) => {
    return isObject(own) ? Object.keys(own) : isArray(own) ? own.keys() : []
  }

  const clone = (t: any, s: any) => {
    for (const key of keys(s)) {
      const target = t[key]
      const source = s[key]
      const iIsArray = isArray(target)
      const oIsArray = isArray(source)
      const iIsObject = isObject(target)
      const oIsObject = isObject(source)

      if (oIsObject) {
        clone(t[key] = iIsObject ? target : {}, source)
        continue
      }

      if (oIsArray) {
        clone(t[key] = iIsArray ? (target.length !== source.length && target.splice(0), target) : [], source)
        continue
      }

      t[key] = s[key]
    }
  }

  if (!isObject(any) && !isArray(any)) {
    return any
  }

  if (isObject(any)) {
    sources = [...args]
    target = any
  }

  if (isArray(any)) {
    sources = [...args]
    target = any
  }

  if (sources) {
    for (const source of sources) {
      const iIsArray = isArray(target)
      const oIsArray = isArray(source)
      const iIsObject = isObject(target)
      const oIsObject = isObject(source)
      iIsObject && oIsObject && clone(target, source)
      iIsArray && oIsArray && clone((target.length !== source.length && target.splice(0), target), source)
    }
  }

  return target as T
}

export function toDeepClone<T = unknown>(any: T, ...args: unknown[]): T {
  let target: any
  let sources: any

  const keys = (own: any) => {
    return isObject(own) ? Object.keys(own) : isArray(own) ? own.keys() : []
  }

  const clone = (t: any, s: any) => {
    for (const key of keys(s)) {
      const target = t[key]
      const source = s[key]
      const iIsArray = isArray(target)
      const oIsArray = isArray(source)
      const iIsObject = isObject(target)
      const oIsObject = isObject(source)

      if (oIsObject) {
        clone(t[key] = iIsObject ? target : {}, source)
        continue
      }

      if (oIsArray) {
        clone(t[key] = iIsArray ? (target.length !== source.length && target.splice(0), target) : [], source)
        continue
      }

      t[key] = s[key]
    }
  }

  if (!isObject(any) && !isArray(any)) {
    return any
  }

  if (isObject(any)) {
    sources = [any, ...args]
    target = {}
  }

  if (isArray(any)) {
    sources = [any, ...args]
    target = []
  }

  if (sources) {
    for (const source of sources) {
      const iIsArray = isArray(target)
      const oIsArray = isArray(source)
      const iIsObject = isObject(target)
      const oIsObject = isObject(source)
      iIsObject && oIsObject && clone(target, source)
      iIsArray && oIsArray && clone((target.length !== source.length && target.splice(0), target), source)
    }
  }

  return target as T
}

export function toDeepEqual<T = unknown>(any: T, other: unknown, options?: { strict?: string[], filter?: string[] }): boolean {
  if (any === other) {
    return true
  }

  if (Object.is(any, other)) {
    return true
  }

  if (itType(any) !== itType(other)) {
    return false
  }

  if (isArray(any) && isArray(other) && any.length === other.length) {
    for (const key of any.keys()) {
      const reuslt = toDeepEqual(any[key], other[key])

      if (!reuslt) {
        return false
      }
    }
    return true
  }

  if (isObject(any) && isObject(other) && Object.keys(any).length === Object.keys(other).length) {
    for (const key of Object.keys(any)) {
      const strict = isObject(options) && isArray(options.strict) ? options.strict.includes(key) : false
      const filter = isObject(options) && isArray(options.filter) ? options.filter.includes(key) : true

      if (strict) {
        if (any[key] !== other[key]) {
          return false
        }
      }

      if (!strict && filter) {
        const reuslt = toDeepEqual(any[key], other[key])

        if (!reuslt) {
          return false
        }
      }
    }
    return true
  }

  return false
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
  isReference,
  isPrimitive,
  isEmptyArray,
  isEmptyObject,
  isEmptyString,
  isNotEmptyArray,
  isNotEmptyObject,
  isNotEmptyString,
  isNotFiniteNumber,
  isFiniteNumber,
  toDeepAssign,
  toDeepClone,
  toDeepEqual,
  takeTimeToDesc,
  takeTimeToDate,
  takeLabelByKey,
  takeTreeByKey,
  takePadEnd,
  takeFixed
}
