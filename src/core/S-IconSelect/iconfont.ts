import { SIconSelectOption } from './type'

export default async(url: string, pre = 'icon-') => {
  const Options = [] as Array<SIconSelectOption>
  const regexp = new RegExp(`(?<=<symbol id=["'])${pre}[^"']+`, 'g')
  const fonts = (await fetch(url).then(response => response.text()))
  const keys = Array.from(fonts.matchAll(regexp), keys => keys[0])

  for (const key of keys) {
    const length = pre.length
    const letter = key.slice(length, length + 1)
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

  return Options
}
