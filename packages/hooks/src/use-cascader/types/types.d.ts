import { CascaderProps } from 'antd/lib/cascader';
import { BaseResponse } from '@/utils/request/types/types';

/** hooks参数 */
type UseCascaderParams<T> = {
  getList: (params: Record<string, any>) => Promise<BaseResponse<T>>;
  formatOptions: (list: List) => CascaderProps['options'];
  extraParams?: Record<string, any>;
};

/** 级联选择hooks类型别名 */
export type UseCascader = <List>({ getList, formatOptions, extraParams }: UseCascaderParams<List>) => { props: CascaderProps };
