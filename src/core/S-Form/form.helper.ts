import helper from '@/helper'
import { Rule } from 'ant-design-vue/es/form'
import { SFormValidatorManager } from './form.declare'
import { SFormValidatorRule } from './form.declare'
import { SFormGroupPartItem } from './form.declare'
import { SFormRowPartItem } from './form.declare'
import { SFormColPartItem } from './form.declare'
import { SFormGrid } from './form.declare'
import { ref } from 'vue'

export const formGroupsDefiner = (groups: Array<SFormGroupPartItem | SFormRowPartItem | SFormColPartItem>) => groups
export const formRulesDefiner = (rules: Record<string, Rule | SFormValidatorRule | Array<Rule | SFormValidatorRule>>) => ref(rules)
export const formGridDefiner = (grid: SFormGrid) => ref(grid)

export const formValidator: SFormValidatorManager = {
  password(rule) {
    const message = rule.message
    const pattern = rule.pattern
    const validator = rule.validator

    if (helper.isString(validator)) {
      if (!helper.isRegExp(pattern)) {
        Object.assign(rule, { pattern: /.{6,}/iu })
      }

      rule.validator = (rule, value) => {
        if (!value && value !== 0 && rule.required !== true) {
          return Promise.resolve()
        }

        if (!value && value !== 0 && rule.required === true) {
          return Promise.reject(new Error(message || '密码为必填项'))
        }

        if (!rule.pattern?.test(value)) {
          return Promise.reject(new Error(validator || message || '密码过短'))
        }

        return Promise.resolve()
      }

      Object.assign(rule, { message: undefined })
    }

    return rule
  },
  number(rule) {
    const message = rule.message
    const pattern = rule.pattern
    const validator = rule.validator

    if (helper.isString(validator)) {
      if (!helper.isRegExp(pattern)) {
        Object.assign(rule, { pattern: /^[+-]?\d+\.?\d*$/i })
      }

      rule.validator = (rule, value) => {
        if (!value && value !== 0 && rule.required !== true) {
          return Promise.resolve()
        }

        if (!value && value !== 0 && rule.required === true) {
          return Promise.reject(new Error(message || '该项为必填项'))
        }

        if (!rule.pattern?.test(value)) {
          return Promise.reject(new Error(validator || message || '格式有误'))
        }

        return Promise.resolve()
      }

      Object.assign(rule, { message: undefined })
    }

    return rule
  },
}

export default {
  formGroupsDefiner,
  formRulesDefiner,
  formGridDefiner,
  formValidator,
}
