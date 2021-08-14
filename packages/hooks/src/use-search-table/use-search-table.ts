import { useRef, useState } from "react";
import moment from "moment";
import { cloneDeep } from "lodash";

import type { FormInstance } from "antd/lib/form";
import type { FormProps } from "antd";
import type { TableProps } from "antd/lib/table";

import useDeepCompareEffect from "../use-deep-compare-effect/use-deep-compare-effect";

/** 分页参数 */
export type PageParams = Record<"page" | "size", number>;

/** 额外参数 */
export type ExtraParams = { [key: string]: any };

/** 分页请求方法 */
export type GetPageing = (params: PageParams & ExtraParams) => Promise<any>;

/** 时间格式化类型 */
export type DateForamt = {
  date: "YYYY-MM-DD";
  dateTime: "YYYY-MM-DD HH:mm:ss";
  dateTimeRange: "YYYY-MM-DD HH:mm:ss";
  dateRange: "YYYY-MM-DD";
  hours: "HH:mm:ss";
  minute: "mm:ss";
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
};

/** 按钮、table loading状态 */
export type Loading = Record<"table" | "search" | "reset", boolean>;

/** 时间格式化对象 */
const foramt: DateForamt = {
  date: "YYYY-MM-DD",
  dateTime: "YYYY-MM-DD HH:mm:ss",
  dateTimeRange: "YYYY-MM-DD HH:mm:ss",
  dateRange: "YYYY-MM-DD",
  hours: "HH:mm:ss",
  minute: "mm:ss",
};

/**
 * @method 搜索列表组件自定义hooks
 * @param GetPaging 列表请求方法
 * @param form 表单实例对象
 * @param extraParams 额外的参数
 * @param delValue 提交表单时，如果需要改变某些字段的值，可以传入这个参数
 */
function useSearchTable<ListData, FormValue>(
  GetPaging: GetPageing,
  form: FormInstance,
  extraParams?: ExtraParams,
  delValue?: (val: any) => void
): UseFormTableReturn<any, any> {
  // 分页数据
  const [list, setList] = useState<ListData[]>([]);

  // 是否正在加载
  const [loading, setLoading] = useState<Loading>({
    table: false,
    reset: false,
    search: false,
  });

  // 总数
  const total = useRef<number>(0);

  // 是否在请求中
  const isFetching = useRef<boolean>(false);

  // 分页参数
  const pageParams = useRef<PageParams>({
    page: 1,
    size: 10,
  });

  // 表单数据
  const formValue = useRef<FormValue | { [key: string]: any }>({});

  /**
   * @method 请求列表数据
   */
  const fetchList = async (type?: "search" | "reset") => {
    if (isFetching.current) return;
    const deepLoding = cloneDeep(loading);

    try {
      isFetching.current = true;
      setLoading({ ...deepLoding, table: true, [type || "table"]: true });
      const response = await GetPaging({
        ...extraParams,
        ...formValue.current,
        ...pageParams.current,
      });
      const {
        data: { list, total: totalNum },
      } = response;
      total.current = totalNum;
      setList(list);
    } finally {
      isFetching.current = false;
      setLoading({ ...deepLoding, table: false, [type || "table"]: false });
    }
  };

  /**
   * @method 重置列表
   */
  const onReset = async () => {
    // 重置表单
    form.resetFields();
    // 重置分页
    pageParams.current = {
      page: 1,
      size: 10,
    };
    // 重置表单搜索值
    formValue.current = {};
    await fetchList("reset");
  };

  /**
   * @method 刷新表单
   */
  const reloadTable = async () => {
    return fetchList();
  };

  /**
   * @method 提交表单
   */
  async function onSubmit() {
    const value = await form.validateFields();
    const valueKeys = Object.keys(value);

    // 判断提交是否为空
    const isEmpty = valueKeys.every((key) => {
      return value[key] === undefined;
    });
    if (isEmpty) return;

    return new Promise((resolve) => {
      valueKeys.forEach((key) => {
        // 删除没有值的key
        if (value[key] === undefined) delete value[key];
        // 是否有需要特殊处理的表单项
        if (key.indexOf("|") > -1 && value[key] !== undefined) {
          // 分隔字符串，得到rangeKey配置
          const splitKey = key.split("|");
          // 处理单独的日期选择
          if (moment.isMoment(value[key])) {
            const [formKey, type] = splitKey as [string, keyof DateForamt];
            value[formKey] = moment(value[key]).format(foramt[type]);
            delete value[key];
          } else {
            // 解构rangeKey
            const [start, end, type] = splitKey as [
              string,
              string,
              keyof DateForamt
            ];
            // 处理日期选择
            if (moment.isMoment(value[key][0])) {
              value[start] = moment(value[0]).format(foramt[type]);
              value[end] = moment(value[1]).format(foramt[type]);
            } else {
              // 处理其他的范围选择
              value[start] = value[key][0];
              value[end] = value[key][1];
            }

            delete value[key];
          }
        }
      });
      resolve(value);
      delValue && delValue(value);
      formValue.current = value;
      fetchList("search");
    });
  }

  /**
   * @method 页码change事件
   * @param page 切换到的页码
   */
  const onChange = (page: number) => {
    pageParams.current = {
      ...pageParams.current,
      page: page,
    };
    fetchList();
  };

  /**
   * @method 展示条数change事件
   * @param current 当前页码
   * @param size 展示条数
   */
  const onShowSizeChange = (_: number, size: number) => {
    pageParams.current = {
      ...pageParams.current,
      size,
    };
    fetchList();
  };

  // 初始化
  useDeepCompareEffect(() => {
    fetchList();
  }, [extraParams]);

  return {
    formProps: {},
    reloadTable,
    onReset,
    onSubmit,
    searchLoading: loading.search,
    resetLoading: loading.reset,

    tableProps: {
      dataSource: list,
      loading: loading.table,
      pagination: {
        total: total.current,
        current: pageParams.current.page,
        pageSize: pageParams.current.size,
        showSizeChanger: true,
        onShowSizeChange,
        onChange,
      },
    },
  };
}

export default useSearchTable;
