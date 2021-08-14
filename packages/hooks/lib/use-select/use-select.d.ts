import { SelectProps } from "antd/lib/select";
/** 自定义select-hooks类型别名 */
export declare type UseSelect = (getList: (params: Record<string, any>) => Promise<any>, options: {
    formatSearchValue: (value: string) => Record<string, any>;
    extraParams?: Record<string, any>;
    mode?: "multiple" | "tags";
    isPaging?: boolean;
}) => {
    value: any;
    props: SelectProps<any>;
};
/**
 * @method 下拉选择支持分页/不分页请求
 */
declare const useSelect: UseSelect;
export default useSelect;
