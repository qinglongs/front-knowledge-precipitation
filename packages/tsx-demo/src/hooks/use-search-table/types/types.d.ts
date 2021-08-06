import { FormProps } from 'antd';
import { TableProps } from 'antd/lib/table';

/** 分页参数 */
export type PageParams = Record<'page' | 'size', number>;

/** 额外参数 */
export type ExtraParams = { [key: string]: any };

/** 分页请求方法 */
export type GetPageing = (params: PageParams & ExtraParams) => Promise<any>;

/** 时间格式化类型 */
export type DateForamt = {
    date: 'YYYY-MM-DD';
    dateTime: 'YYYY-MM-DD HH:mm:ss';
    dateTimeRange: 'YYYY-MM-DD HH:mm:ss';
    dateRange: 'YYYY-MM-DD';
    hours: 'HH:mm:ss';
    minute: 'mm:ss';
};

/** 返回值 */
export type UseFormTableReturn<SubmitResponseValue, RestResponseValue> = {
    tableProps: TableProps<any>;
    formProps: FormProps;
    searchLoading: boolean;
    resetLoading: boolean;
    reloadTable: () => Promise<any>;
    onReset: () => Promise<RestResponseValue | any>;
    onSubmit: () => Promise<SubmitResponseValue | any>;
}

/** 按钮、table loading状态 */
export type Loading = Record<'table' | 'search' | 'reset', boolean>;