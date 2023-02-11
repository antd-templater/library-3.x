import { PropType } from 'vue';
import 'ant-design-vue/es/tooltip/style/index.less';
declare const _default: import("vue").DefineComponent<{
    limit: {
        type: NumberConstructor;
        default: number;
    };
    title: {
        type: StringConstructor;
        default: string;
    };
    tooltip: {
        type: BooleanConstructor;
        default: boolean;
    };
    sheared: {
        type: BooleanConstructor;
        default: boolean;
    };
    placement: {
        type: PropType<"top" | "left" | "right" | "bottom" | "topLeft" | "topRight" | "bottomLeft" | "bottomRight" | "leftTop" | "leftBottom" | "rightTop" | "rightBottom">;
        default: string;
    };
    trigger: PropType<import("ant-design-vue/es/tooltip/abstractTooltipProps").TriggerType | import("ant-design-vue/es/tooltip/abstractTooltipProps").TriggerType[]>;
    visible: {
        type: BooleanConstructor;
        default: any;
    };
    defaultVisible: {
        type: BooleanConstructor;
        default: any;
    };
    color: StringConstructor;
    transitionName: StringConstructor;
    overlayStyle: {
        type: PropType<import("vue").CSSProperties>;
        default: import("vue").CSSProperties;
    };
    overlayClassName: StringConstructor;
    openClassName: StringConstructor;
    prefixCls: StringConstructor;
    mouseEnterDelay: NumberConstructor;
    mouseLeaveDelay: NumberConstructor;
    getPopupContainer: PropType<(triggerNode: HTMLElement) => HTMLElement>;
    arrowPointAtCenter: {
        type: BooleanConstructor;
        default: any;
    };
    autoAdjustOverflow: {
        type: PropType<boolean | import("ant-design-vue/es/tooltip").AdjustOverflow>;
        default: boolean | import("ant-design-vue/es/tooltip").AdjustOverflow;
    };
    destroyTooltipOnHide: {
        type: BooleanConstructor;
        default: any;
    };
    align: {
        type: PropType<import("ant-design-vue/es/vc-trigger/interface").AlignType>;
        default: import("ant-design-vue/es/vc-trigger/interface").AlignType;
    };
    builtinPlacements: {
        type: PropType<import("ant-design-vue/es/vc-trigger/interface").BuildInPlacements>;
        default: import("ant-design-vue/es/vc-trigger/interface").BuildInPlacements;
    };
    children: ArrayConstructor;
    onVisibleChange: PropType<(vis: boolean) => void>;
    'onUpdate:visible': PropType<(vis: boolean) => void>;
}, () => JSX.Element, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<import("vue").ExtractPropTypes<{
    limit: {
        type: NumberConstructor;
        default: number;
    };
    title: {
        type: StringConstructor;
        default: string;
    };
    tooltip: {
        type: BooleanConstructor;
        default: boolean;
    };
    sheared: {
        type: BooleanConstructor;
        default: boolean;
    };
    placement: {
        type: PropType<"top" | "left" | "right" | "bottom" | "topLeft" | "topRight" | "bottomLeft" | "bottomRight" | "leftTop" | "leftBottom" | "rightTop" | "rightBottom">;
        default: string;
    };
    trigger: PropType<import("ant-design-vue/es/tooltip/abstractTooltipProps").TriggerType | import("ant-design-vue/es/tooltip/abstractTooltipProps").TriggerType[]>;
    visible: {
        type: BooleanConstructor;
        default: any;
    };
    defaultVisible: {
        type: BooleanConstructor;
        default: any;
    };
    color: StringConstructor;
    transitionName: StringConstructor;
    overlayStyle: {
        type: PropType<import("vue").CSSProperties>;
        default: import("vue").CSSProperties;
    };
    overlayClassName: StringConstructor;
    openClassName: StringConstructor;
    prefixCls: StringConstructor;
    mouseEnterDelay: NumberConstructor;
    mouseLeaveDelay: NumberConstructor;
    getPopupContainer: PropType<(triggerNode: HTMLElement) => HTMLElement>;
    arrowPointAtCenter: {
        type: BooleanConstructor;
        default: any;
    };
    autoAdjustOverflow: {
        type: PropType<boolean | import("ant-design-vue/es/tooltip").AdjustOverflow>;
        default: boolean | import("ant-design-vue/es/tooltip").AdjustOverflow;
    };
    destroyTooltipOnHide: {
        type: BooleanConstructor;
        default: any;
    };
    align: {
        type: PropType<import("ant-design-vue/es/vc-trigger/interface").AlignType>;
        default: import("ant-design-vue/es/vc-trigger/interface").AlignType;
    };
    builtinPlacements: {
        type: PropType<import("ant-design-vue/es/vc-trigger/interface").BuildInPlacements>;
        default: import("ant-design-vue/es/vc-trigger/interface").BuildInPlacements;
    };
    children: ArrayConstructor;
    onVisibleChange: PropType<(vis: boolean) => void>;
    'onUpdate:visible': PropType<(vis: boolean) => void>;
}>>, {
    limit: number;
    title: string;
    tooltip: boolean;
    sheared: boolean;
    placement: "top" | "left" | "right" | "bottom" | "topLeft" | "topRight" | "bottomLeft" | "bottomRight" | "leftTop" | "leftBottom" | "rightTop" | "rightBottom";
    visible: boolean;
    defaultVisible: boolean;
    overlayStyle: import("vue").CSSProperties;
    arrowPointAtCenter: boolean;
    autoAdjustOverflow: boolean | import("ant-design-vue/es/tooltip").AdjustOverflow;
    destroyTooltipOnHide: boolean;
    align: import("ant-design-vue/es/vc-trigger/interface").AlignType;
    builtinPlacements: import("ant-design-vue/es/vc-trigger/interface").BuildInPlacements;
}>;
export default _default;
