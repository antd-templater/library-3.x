import { defineComponent, createVNode, createTextVNode } from 'vue';

var STable = defineComponent({
  name: 'STable',
  props: {
    type: {
      type: String,
      default: 'input'
    }
  },
  setup(props) {
    return createVNode("div", null, [createTextVNode("STable: "), props.type]);
  }
});

export { STable as default };
