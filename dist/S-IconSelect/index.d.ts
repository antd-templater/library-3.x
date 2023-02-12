import { PropType } from 'vue';
import { DefaultOptionType, SelectValue } from 'ant-design-vue/es/select';
import 'ant-design-vue/es/select/style/index.less';
interface FieldNames {
    value?: string;
    label?: string;
    options?: string;
}
export declare const SIconSelect: import("vue").DefineComponent<{
    optionFilterProp: {
        type: StringConstructor;
        default: undefined;
    };
    optionLabelProp: {
        type: StringConstructor;
        default: undefined;
    };
    placeholder: {
        type: StringConstructor;
        default: string;
    };
    showSearch: {
        type: BooleanConstructor;
        default: boolean;
    };
    allowClear: {
        type: BooleanConstructor;
        default: boolean;
    };
    showArrow: {
        type: BooleanConstructor;
        default: boolean;
    };
    fieldNames: {
        type: PropType<FieldNames>;
        default: undefined;
    };
    multiple: {
        type: BooleanConstructor;
        default: boolean;
    };
    disabled: {
        type: BooleanConstructor;
        default: boolean;
    };
    options: {
        type: PropType<DefaultOptionType[]>;
        default: () => {
            label: string;
            value: string;
            options: {
                label: string;
                value: string;
            }[];
        }[];
    };
    value: {
        type: PropType<SelectValue>;
        default: undefined;
    };
    mode: {
        type: PropType<"multiple" | "tags">;
        default: undefined;
    };
    size: {
        type: PropType<"small" | "large" | "middle">;
        default: undefined;
    };
}, () => JSX.Element, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {
    'update:value': (_: SelectValue) => boolean;
}, string, import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<import("vue").ExtractPropTypes<{
    optionFilterProp: {
        type: StringConstructor;
        default: undefined;
    };
    optionLabelProp: {
        type: StringConstructor;
        default: undefined;
    };
    placeholder: {
        type: StringConstructor;
        default: string;
    };
    showSearch: {
        type: BooleanConstructor;
        default: boolean;
    };
    allowClear: {
        type: BooleanConstructor;
        default: boolean;
    };
    showArrow: {
        type: BooleanConstructor;
        default: boolean;
    };
    fieldNames: {
        type: PropType<FieldNames>;
        default: undefined;
    };
    multiple: {
        type: BooleanConstructor;
        default: boolean;
    };
    disabled: {
        type: BooleanConstructor;
        default: boolean;
    };
    options: {
        type: PropType<DefaultOptionType[]>;
        default: () => {
            label: string;
            value: string;
            options: {
                label: string;
                value: string;
            }[];
        }[];
    };
    value: {
        type: PropType<SelectValue>;
        default: undefined;
    };
    mode: {
        type: PropType<"multiple" | "tags">;
        default: undefined;
    };
    size: {
        type: PropType<"small" | "large" | "middle">;
        default: undefined;
    };
}>> & {
    "onUpdate:value"?: ((_: SelectValue) => any) | undefined;
}, {
    multiple: boolean;
    optionFilterProp: string;
    optionLabelProp: string;
    placeholder: string;
    showSearch: boolean;
    allowClear: boolean;
    showArrow: boolean;
    fieldNames: FieldNames;
    disabled: boolean;
    options: DefaultOptionType[];
    value: SelectValue;
    mode: "multiple" | "tags";
    size: "small" | "large" | "middle";
}>;
export default SIconSelect;
