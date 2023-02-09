export function itType(val: unknown) {
  return Object.prototype.toString.call(val).replace(/^\[[^\s\]]+\s*([^\s\]]+)]$/, '$1')
}

export function isArray(arr: unknown): arr is unknown[] {
  return Array.isArray(arr)
}

export function isObject(obj: unknown): obj is object {
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
  return itType(func) === 'Function'
}

export function isNotEmptyArray(arr: unknown): arr is unknown[] {
  return isArray(arr) && arr.length > 0
}

export function isNotEmptyObject(obj: unknown): obj is object {
  return isObject(obj) && Object.keys(obj).length > 0
}

export function isNotEmptyString(str: unknown): str is string {
  return isString(str) && !!str.trim()
}

export function isNotFiniteNumber(num: unknown): num is number {
  return isNumber(num) && !isFinite(num)
}

export function isFiniteNumber(num: unknown): num is number {
  return isNumber(num) && isFinite(num)
}

export function isEmptyString(str: unknown): str is string {
  return isString(str) && !str.trim()
}

export function isEmptyObject(obj: unknown): obj is object {
  return isObject(obj) && Object.keys(obj).length === 0
}

export function isEmptyArray(arr: unknown): arr is unknown[] {
  return isArray(arr) && arr.length === 0
}

export function toDeepClone<T = unknown>(source: T, ...reset: unknown[]): T {
  const keys = (own: any) => {
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

export default {
  itType,
  isArray,
  isObject,
  isString,
  isNumber,
  isRegExp,
  isBoolean,
  isFunction,
  isEmptyArray,
  isEmptyObject,
  isEmptyString,
  isNotEmptyArray,
  isNotEmptyObject,
  isNotEmptyString,
  isNotFiniteNumber,
  isFiniteNumber,
  toDeepClone
}
