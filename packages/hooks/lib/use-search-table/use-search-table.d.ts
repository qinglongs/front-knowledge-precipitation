import type { FormInstance } from "antd/lib/form";
import type { FormProps } from "antd";
import type { TableProps } from "antd/lib/table";
/** 分页参数 */
export declare type PageParams = Record<"page" | "size", number>;
/** 额外参数 */
export declare type ExtraParams = {
    [key: string]: any;
};
/** 分页请求方法 */
export declare type GetPageing = (params: PageParams & ExtraParams) => Promise<any>;
/** 时间格式化类型 */
export declare type DateForamt = {
    date: "YYYY-MM-DD";
    dateTime: "YYYY-MM-DD HH:mm:ss";
    dateTimeRange: "YYYY-MM-DD HH:mm:ss";
    dateRange: "YYYY-MM-DD";
    hours: "HH:mm:ss";
    minute: "mm:ss";
};
/** 返回值 */
export declare type UseFormTableReturn<SubmitResponseValue, RestResponseValue> = {
    tableProps: TableProps<any>;
    formProps: FormProps;
    searchLoading: boolean;
    resetLoading: boolean;
    reloadTable: () => Promise<any>;
    onReset: () => Promise<RestResponseValue | any>;
    onSubmit: () => Promise<SubmitResponseValue | any>;
};
/** 按钮、table loading状态 */
export declare type Loading = Record<"table" | "search" | "reset", boolean>;
/**
 * @method 搜索列表组件自定义hooks
 * @param GetPaging 列表请求方法
 * @param form 表单实例对象
 * @param extraParams 额外的参数
 * @param delValue 提交表单时，如果需要改变某些字段的值，可以传入这个参数
 */
declare function useSearchTable<ListData, FormValue>(GetPaging: GetPageing, form: FormInstance, extraParams?: ExtraParams, delValue?: (val: any) => void): UseFormTableReturn<any, any>;
export default useSearchTable;
