import { FunctionalComponent } from 'vue';
import { TooltipProps } from 'ant-design-vue/es/tooltip';
import 'ant-design-vue/es/tooltip/style/index.less';
type SEllipsisProps = TooltipProps & {
    limit?: number;
    title?: string;
    tooltip?: boolean;
    sheared?: boolean;
    placement?: 'top' | 'left' | 'right' | 'bottom' | 'topLeft' | 'topRight' | 'bottomLeft' | 'bottomRight' | 'leftTop' | 'leftBottom' | 'rightTop' | 'rightBottom';
};
export declare const SEllipsis: FunctionalComponent<SEllipsisProps>;
export default SEllipsis;
