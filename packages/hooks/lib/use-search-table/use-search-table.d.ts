import { FormInstance } from "antd/lib/form";
import { GetPageing, ExtraParams, UseFormTableReturn } from "./types/types";
/**
 * @method 搜索列表组件自定义hooks
 * @param GetPaging 列表请求方法
 * @param form 表单实例对象
 * @param extraParams 额外的参数
 * @param delValue 提交表单时，如果需要改变某些字段的值，可以传入这个参数
 */
declare function useSearchTable<ListData, FormValue>(GetPaging: GetPageing, form: FormInstance, extraParams?: ExtraParams, delValue?: (val: any) => void): UseFormTableReturn<any, any>;
export default useSearchTable;
