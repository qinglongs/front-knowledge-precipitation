import { useState } from "react";
import type { CascaderProps } from "antd/lib/cascader";
import type { UseCascader } from "./types/types";
import useDeepComparisonEffect from "../use-deep-compare-effect/use-deep-compare-effect";

/**
 * @method 级联选择自定义hooks
 */
const useCascader: UseCascader = ({
  getList,
  extraParams = {},
  formatOptions,
}) => {
  // 级联选择数组
  const [options, setOptions] = useState<CascaderProps["options"]>([]);

  const fetchList = async (params: Record<string, any>) => {
    const { data } = await getList(params);
    const temp = formatOptions(data);
    setOptions(temp);
  };

  useDeepComparisonEffect(() => {
    fetchList(extraParams);
  }, [extraParams]);

  return {
    props: {
      options: options,
      showSearch: true,
      allowClear: true,
      notFoundContent: "暂无数据",
    },
  };
};

export default useCascader;
