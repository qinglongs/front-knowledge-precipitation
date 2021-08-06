import { useRef, useState } from 'react';
import { cloneDeep, debounce } from 'lodash';
import { SelectValue } from 'antd/lib/select';
import useDeepComparisonEffect from '@/hooks/use-deep-compare-effect/use-deep-compare-effect';

import { UseSelect } from './types/types';

/**
 * @method 下拉选择支持分页/不分页请求
 */
const useSelect: UseSelect = (GetList, options) => {
  // 解构配置对象
  const { formatSearchValue, extraParams = {}, mode = '', isPaging = false } = options;

  // 分页参数
  const pagingParams = useRef<Record<'current' | 'size', number>>({
    current: 1,
    size: 10,
  });

  // 搜索框输入参数
  const searchValue = useRef<Record<string, any>>({});

  // 是否请求中
  const isFetching = useRef<boolean>(false);

  // 是否没有更多
  const isNomore = useRef<boolean>(false);

  // 选中的数据
  const [selectValue, setSelectValue] = useState<string | null>(null);

  // 选项数据
  const [option, setOption] = useState<any[]>([]);

  /**
   * @method 分页请求
   * @param {boolean} refresh 是否刷新
   */
  const fetchPagingList = async (refresh: boolean) => {
    if (isFetching.current) return;

    pagingParams.current.current = refresh ? 1 : pagingParams.current.current + 1;
    isNomore.current = refresh ? false : isNomore.current;

    if (isNomore.current) return;

    try {
      isFetching.current = true;

      const { data: { total, list } } = await GetList({
        ...pagingParams.current,
        ...extraParams,
        ...searchValue.current,
      });

      // 深拷贝原来的数据
      const deepOptions = cloneDeep(option);

      // 拼接数据
      const temp = refresh ? list : deepOptions.concat(list);

      if (temp.length >= total) {
        isNomore.current = true;
      }
      setOption(temp);
    } finally {
      isFetching.current = false;
    }
  };

  /**
   * @method 不具有分页的请求
   */
  const fetchNormalList = async () => {
    if (isFetching.current) return;
    try {
      isFetching.current = true;

      const { data } = await GetList({
        ...extraParams,
        ...searchValue.current,
      });

      setOption(data || []);
    } finally {
      isFetching.current = false;
    }
  };

  /**
   * @method 统一请求方法
   */
  const fetchList = async (refresh = false) => {
    if (isPaging) {
      await fetchPagingList(refresh);
    } else {
      await fetchNormalList();
    }
  };

  /**
   * @method 搜索事件
   * @param {string} val 搜索值
   */
  const onSearch = (val: string) => {
    if (!formatSearchValue) throw Error('attribute options.formatSearchValue must be passed');
    searchValue.current = val ? formatSearchValue(val) : {};
    fetchList(true);


  };

  /**
   * @method 下拉滚动事件
   */
  const onPopupScroll: React.UIEventHandler<HTMLDivElement> = (e: any) => {
    if (!isPaging) return;
    const scrollHeight = e.target.scrollHeight;
    const scrollTop = e.target.scrollTop;
    const clientHeight = e.target.clientHeight;

    if (clientHeight + scrollTop > scrollHeight - 5) {
      fetchPagingList(false);
    }
  };

  /**
   * @method 下拉拉选中change事件
   * @param {object} node 选中的节点信息
   */
  const onChange = (val: SelectValue, node: any) => {
    if (!val || (Array.isArray(val) && !val.length)) {
      if (!Object.keys(searchValue.current).length) return;
      // 这里点击清除按钮触发
      setSelectValue(null);
      // 更新搜索值
      searchValue.current = {};
      fetchList(true);
    } else {
      // 需要判断是多选还是单选
      setSelectValue(Array.isArray(node) ? node.map((i) => i.props) : node.props);
    }
  };

  /**
   * @method 选中后事件，目的是为了在选中之后重置下拉选项
   */
  const onSelect = () => {
    // 如果是分页就不需要处理
    if (!isPaging) {
      if (!Object.keys(searchValue.current).length) return;
      // 重置搜索值
      searchValue.current = {};
      fetchList(true);
    }
  };

  // 监听搜索值
  useDeepComparisonEffect(() => {
    fetchList(true);
  }, [extraParams]);


  return {
    value: selectValue,
    props: {
      options: option,
      mode,
      showSearch: true,
      onSearch: debounce(onSearch, 300),
      onPopupScroll,
      onChange,
      onSelect,
      filterOption: false,
      showArrow: false,
      allowClear: true,
    },
  };
};

export default useSelect;
