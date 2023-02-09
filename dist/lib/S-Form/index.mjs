import { defineComponent, createVNode, createTextVNode } from 'vue';

var SForm = defineComponent({
  name: 'SForm',
  props: {
    type: {
      type: String,
      default: 'input'
    }
  },
  setup(props) {
    return createVNode("div", null, [createTextVNode("SForm: "), props.type]);
  }
});

export { SForm as default };
