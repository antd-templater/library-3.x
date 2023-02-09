import { createVNode } from 'vue';
import * as AllIcons from '@ant-design/icons-vue';

const SIconComponent = function SIcon(props, context) {
  return createVNode(AllIcons[props.name], context.attrs, context.slots);
};

export { SIconComponent as default };
