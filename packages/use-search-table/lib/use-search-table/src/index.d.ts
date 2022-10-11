import type { FormInstance } from "antd/lib/form";
import type { FormProps } from "antd";
import type { TableProps } from "antd/lib/table";
export declare type PageParams = Record<"page" | "size", number>;
export declare type ExtraParams = {
    [key: string]: any;
};
export declare type GetPageing = (params: PageParams & ExtraParams) => Promise<any>;
export declare type DateForamt = {
    date: "YYYY-MM-DD";
    dateTime: "YYYY-MM-DD HH:mm:ss";
    dateTimeRange: "YYYY-MM-DD HH:mm:ss";
    dateRange: "YYYY-MM-DD";
    hours: "HH:mm:ss";
    minute: "mm:ss";
};
export declare type UseFormTableReturn<SubmitResponseValue, RestResponseValue> = {
    tableProps: TableProps<any>;
    formProps: FormProps;
    searchLoading: boolean;
    resetLoading: boolean;
    reloadTable: () => Promise<any>;
    onReset: () => Promise<RestResponseValue | any>;
    onSubmit: () => Promise<SubmitResponseValue | any>;
};
export declare type Loading = Record<"table" | "search" | "reset", boolean>;
declare function useSearchTable<ListData, FormValue>(GetPaging: GetPageing, form: FormInstance, extraParams?: ExtraParams, delValue?: (val: any) => void): UseFormTableReturn<any, any>;
export default useSearchTable;
