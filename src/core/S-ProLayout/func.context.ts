import { inject } from 'vue'
import { provide } from 'vue'
import { readonly } from 'vue'
import { defineComponent } from 'vue'
import type { InjectionKey, PropType } from 'vue'

export const createContext = <T>(key: InjectionKey<T> = Symbol(), name = 'Context.Provider') => {
  const ContextProvider = defineComponent({
    name,

    props: {
      value: {
        type: Object as PropType<any>,
        required: true,
      },
    },

    setup(props, { slots }) {
      provide(key, readonly(props.value))
      return () => slots.default?.()
    },
  })

  return ContextProvider as any
}

export const useContext = <T>(key: string | InjectionKey<T> = Symbol(), value?: any): T => {
  return inject(key, value || ({} as T))
}
