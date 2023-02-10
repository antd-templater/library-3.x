import { h } from 'vue';
import * as AllIcons from '@ant-design/icons-vue';

const SIcon = (props, context) => h(AllIcons[props.type], context.attrs, context.slots);
const isSIcon = type => !!AllIcons[type];

export { SIcon, SIcon as default, isSIcon };
