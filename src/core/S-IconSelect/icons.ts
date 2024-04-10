import * as AllIcons from '@ant-design/icons-vue'

const AllKeys = Object.keys(AllIcons)
const OutKeys = AllKeys.filter(key => key.endsWith('Outlined'))
const Options = [] as Array<SIconSelectOption>

export type SIconSelectOption = {
  label?: string;
  value?: string | number;
  options?: Omit<SIconSelectOption, 'options'>[];
  disabled?: boolean;
  [name: string]: any;
}

for (const key of OutKeys) {
  let finder = Options.find(opt => opt.value === key[0])

  if (!finder) {
    Options.push(finder = {
      label: `字母${key[0]}`,
      value: key[0],
      options: []
    })
  }

  if (finder) {
    finder.options!.push({
      label: key,
      value: key
    })
  }
}

export default Options
