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
import { hyphenCase } from 'js-simpler'
import { camelCase } from 'js-simpler'
import { underCase } from 'js-simpler'
import { upperCase } from 'js-simpler'
import { lowerCase } from 'js-simpler'
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

const isPrimitive = (val: unknown): val is string | number => {
  return isString(val) || isFiniteNumber(val)
}

const isReference = (val: unknown): val is any[] | Record<string, unknown> => {
  return isArray(val) || isObject(val)
}

const takeTreeByKey = (trees: Record<string, any>[], key: string | number, value = 'value', children = 'children'): Record<string, any> | null => {
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

const takeTextByKey = (trees: Record<string, any>[], key: string | number, label = 'label', value = 'value', children = 'children'): string | number => {
  return takeTreeByKey(trees, key, value, children)?.[label] || key
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
  takeTreeByKey,
  takeTextByKey,
  deepAssign,
  deepClone,
  deepEqual,
  toPromise,
  hyphenCase,
  camelCase,
  underCase,
  upperCase,
  lowerCase,
  assign,
  clone,
  equal,
}

export {
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
  takeTreeByKey,
  takeTextByKey,
  deepAssign,
  deepClone,
  deepEqual,
  toPromise,
  hyphenCase,
  camelCase,
  underCase,
  upperCase,
  lowerCase,
  assign,
  clone,
  equal,
}
