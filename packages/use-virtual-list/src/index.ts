import { useState, useRef, useMemo } from "react";
import useDeepCompareEffect from "use-deep-compare-effect";

/**
 * @method 虚拟滚动自定义hooks
 * @param fiexdParam 固定的参数
 * @param {number} fiexdParam.itemHeight 每一个元素的高度
 * @param {number} fiexdParam.containerHeight 滚动容器的高度
 * @param dataSource 需要渲染的数组
 */
const useVirtualList = <Item>(
  fiexdParam: { itemHeight: number; containerHeight: number },
  dataSource: Item[]
) => {
  const { itemHeight, containerHeight } = fiexdParam;

  // 数据总数
  const total = useMemo<number>(() => dataSource.length, [dataSource]);

  // 列表展示的数据
  const [list, setList] = useState<Item[]>([]);

  // 列表总高度
  const [totalHeight, setTotalHeight] = useState<number>(0);

  // 滚动条到顶部的高度
  const [offsetTop, setOffsetTop] = useState<number>(0);

  // 容器高度
  const containerHeightRef = useRef<number>(0);

  // 屏幕展示最下面的一个元素的值
  const lastIndex = useRef<number>(1);

  // 单屏可展示的元素个数
  const itemNumber = useRef<number>(0);

  if (!itemHeight) {
    console.error("place enter a vaild itemHeight");
  }

  if (!Array.isArray(dataSource)) {
    console.error("dataSource must be an array");
  }

  /**
   * @method 容器滚动事件
   * @param scrollTop 滚动条到顶部的距离
   */
  const onScroll: React.UIEventHandler<HTMLDivElement> = (e) => {
    // 滚动条到顶部的距离
    const scrollTop = (e.target as any).scrollTop;

    // 计算当前应该展示到的元素
    const activeIndex = (scrollTop / itemHeight) >> 0;

    // 屏幕可见区域中，最后一个元素索引
    lastIndex.current = activeIndex;

    setList(
      dataSource.slice(
        lastIndex.current,
        lastIndex.current + itemNumber.current
      )
    );
    setOffsetTop(activeIndex * itemHeight);
  };

  useDeepCompareEffect(() => {
    // 可见区域的高度
    containerHeightRef.current = containerHeight;

    // 可见区域可以展示的元素个数
    itemNumber.current = ((containerHeight / itemHeight) >> 0) + 1;

    // 总高度
    setTotalHeight(itemHeight * total);

    // 截取一屏可展示的元素
    setList(dataSource.slice(lastIndex.current, itemNumber.current));
  }, [containerHeight, dataSource, itemHeight, total]);

  return { list, totalHeight, offsetTop, onScroll };
};

export default useVirtualList;
