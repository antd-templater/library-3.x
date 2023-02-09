import { defineComponent, defineProps, createVNode } from 'vue';
import * as AllIcons from '@ant-design/icons-vue';

var SIcon = defineComponent({
  name: 'SIcon',
  setup() {
    const props = defineProps();
    const Component = AllIcons[props.name];
    return createVNode(Component, null, null);
  }
});

export { SIcon as default };
