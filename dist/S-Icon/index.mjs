import { defineComponent, h } from 'vue';
import * as AllIcons from '@ant-design/icons-vue/lib/icons';

const isIconType = type => !!AllIcons[type];
var SIcon = defineComponent({
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
  setup(props, context) {
    return () => h(AllIcons[props.type], {
      ...props,
      ...context.attrs,
      type: undefined
    }, context.slots);
  }
});

export { SIcon as default, isIconType };
