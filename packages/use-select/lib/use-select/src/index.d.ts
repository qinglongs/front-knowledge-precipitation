import { SelectProps } from "antd/lib/select";
export declare type UseSelect = (getList: (params: Record<string, any>) => Promise<any>, options: {
    formatSearchValue: (value: string) => Record<string, any>;
    extraParams?: Record<string, any>;
    mode?: "multiple" | "tags";
    isPaging?: boolean;
}) => {
    value: any;
    props: SelectProps<any>;
};
declare const useSelect: UseSelect;
export default useSelect;
