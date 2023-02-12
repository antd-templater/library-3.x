import { PropType } from 'vue';
import * as AllIcons from '@ant-design/icons-vue';
type AllIconType = Exclude<keyof typeof AllIcons, NotIconType>;
type NotIconType = 'setTwoToneColor' | 'getTwoToneColor' | 'createFromIconfontCN' | 'default';
export declare const isIconType: (type: string) => type is AllIconType;
export declare const SIcon: import("vue").DefineComponent<{
    type: {
        type: PropType<AllIconType>;
        required: true;
    };
    spin: {
        type: BooleanConstructor;
        default: boolean;
    };
    rotate: {
        type: NumberConstructor;
        default: undefined;
    };
    twoToneColor: {
        type: PropType<string | [string, string]>;
        default: undefined;
    };
}, () => JSX.Element | null, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<import("vue").ExtractPropTypes<{
    type: {
        type: PropType<AllIconType>;
        required: true;
    };
    spin: {
        type: BooleanConstructor;
        default: boolean;
    };
    rotate: {
        type: NumberConstructor;
        default: undefined;
    };
    twoToneColor: {
        type: PropType<string | [string, string]>;
        default: undefined;
    };
}>>, {
    spin: boolean;
    rotate: number;
    twoToneColor: string | [string, string];
}>;
export default SIcon;
