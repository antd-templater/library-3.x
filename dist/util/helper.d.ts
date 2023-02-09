import dayjs from 'dayjs';
/**
 * 处理数值精度
 */
export declare const takeFixed: (num: number | string, digit?: number) => string;
/**
 * 补齐数值精度
 */
export declare const takePadEnd: (num: number | string, keep?: number) => string;
/**
 * 取出节点数据
 */
export declare const takeTreeByKey: (trees: Record<string, any>[], key: string | number, value?: string, children?: string) => Record<string, any> | null;
/**
 * 取出节点文本
 */
export declare const takeLabelByKey: (trees: Record<string, any>[], key: string | number, label?: string, value?: string, children?: string) => string | number;
/**
 * 根据格式转换 日期
 */
export declare const takeTimeToDate: (date: dayjs.ConfigType, format?: dayjs.OptionType) => dayjs.Dayjs | null;
/**
 * 根据格式转换 时间
 */
export declare const takeTimeToFormat: (date: dayjs.ConfigType, format?: string) => string;
/**
 * @description 默认导出
 */
declare const _default: {
    takeFixed: (num: string | number, digit?: number) => string;
    takePadEnd: (num: string | number, keep?: number) => string;
    takeTreeByKey: (trees: Record<string, any>[], key: string | number, value?: string, children?: string) => Record<string, any> | null;
    takeLabelByKey: (trees: Record<string, any>[], key: string | number, label?: string, value?: string, children?: string) => string | number;
    takeTimeToDate: (date: string | number | Date | dayjs.Dayjs | null | undefined, format?: dayjs.OptionType | undefined) => dayjs.Dayjs | null;
    takeTimeToFormat: (date: string | number | Date | dayjs.Dayjs | null | undefined, format?: string) => string;
};
export default _default;
