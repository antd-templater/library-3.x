import { FunctionalComponent } from 'vue';
import { AntdIconProps } from '@ant-design/icons-vue/es/components/AntdIcon';
import * as AllIcons from '@ant-design/icons-vue';
type AllNames = AllCapitalize<keyof typeof AllIcons>;
type AllCapitalize<K extends keyof typeof AllIcons> = K extends Capitalize<K> ? K : never;
export declare const SIcon: FunctionalComponent<AntdIconProps & {
    type: AllNames;
}>;
export declare const isSIcon: (type: any) => boolean;
export default SIcon;
