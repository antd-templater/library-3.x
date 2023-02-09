import { defineComponent, PropType } from 'vue'

export default defineComponent({
  name: 'SForm',
  props: {
    type: {
      type: String as PropType<'input' | 'select' | 'datetime'>,
      default: 'input'
    }
  },
  setup(props) {
    return <div>SForm: {props.type}</div>
  }
})
