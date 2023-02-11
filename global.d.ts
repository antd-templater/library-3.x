import '@vue/runtime-core'

declare module '@vue/runtime-core' {
  export interface GlobalComponents {
    SIconSelect: typeof import('./dist/S-IconSelect')['default']
    SEllipsis: typeof import('./dist/S-Ellipsis')['default']
    SIcon: typeof import('./dist/S-Icon')['default']
  }
}
