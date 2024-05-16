import * as AllIcons from '@ant-design/icons-vue'
import { SIconSelectOption } from './type'

const AllKeys = Object.keys(AllIcons)
const OutKeys = AllKeys.filter(key => key.endsWith('Outlined'))
const Options = [] as Array<SIconSelectOption>

for (const key of OutKeys) {
  const letter = key[0]
  const finder = Options.find(opt => opt.value === letter)

  if (!finder) {
    Options.push({
      label: `字母${letter.toUpperCase()}`,
      value: letter,
      options: [{
        label: key,
        value: key,
      }],
    })
  }

  if (finder) {
    finder.options!.push({
      label: key,
      value: key,
    })
  }
}

if (Options) {
  Options.sort((next, prev) => next.value < prev.value ? -1 : 1)
}

export default Options
