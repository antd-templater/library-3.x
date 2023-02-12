import { defineComponent, createVNode } from 'vue';
import * as AllIcons from '@ant-design/icons-vue';

const isIconType = type => {
  return type !== 'default' && type !== 'getTwoToneColor' && type !== 'setTwoToneColor' && type !== 'createFromIconfontCN' && type && AllIcons[type] && true || false;
};
const SIcon = defineComponent({
  name: 'SIcon',
  props: {
    type: {
      type: String,
      required: true
    },
    spin: {
      type: Boolean,
      default: false
    },
    rotate: {
      type: Number,
      default: undefined
    },
    twoToneColor: {
      type: [String, Array],
      default: undefined
    }
  },
  setup(props) {
    const Icon = AllIcons[props.type];
    const binds = {
      ...props,
      type: undefined
    };
    return () => isIconType(props.type) ? createVNode(Icon, binds, null) : null;
  }
});

export { SIcon, SIcon as default, isIconType };
