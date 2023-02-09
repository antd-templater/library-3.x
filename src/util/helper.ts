import { isArray, isString, isNumber, isNotEmptyArray } from '@/util/base'
import dayjs from 'dayjs'

/**
 * 处理数值精度
 */
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

/**
 * 补齐数值精度
 */
export const takePadEnd = (num: number | string, keep = 0) => {
  const string = String(+num || 0)
  const [integer = '0', decimal = ''] = string.split('.')
  return +keep || decimal ? [integer, decimal.padEnd(+keep, '0')].join('.') : integer
}

/**
 * 取出节点数据
 */
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

/**
 * 取出节点文本
 */
export const takeLabelByKey = (trees: Record<string, any>[], key: string | number, label = 'label', value = 'value', children = 'children'): string | number => {
  return takeTreeByKey(trees, key, value, children)?.[label] || key
}

/**
 * 根据格式转换 日期
 */
export const takeTimeToDate = (date: dayjs.ConfigType, format?: dayjs.OptionType) => {
  if (date) {
    try { return dayjs(date, format) } catch {}
  }
  return null
}

/**
 * 根据格式转换 时间
 */
export const takeTimeToFormat = (date: dayjs.ConfigType, format = 'YYYY-MM-DD HH:mm:ss') => {
  if (date) {
    try { return dayjs(date).format(format) } catch {}
  }
  return ''
}

/**
 * @description 默认导出
 */
export default {
  takeFixed,
  takePadEnd,
  takeTreeByKey,
  takeLabelByKey,
  takeTimeToDate,
  takeTimeToFormat
}
