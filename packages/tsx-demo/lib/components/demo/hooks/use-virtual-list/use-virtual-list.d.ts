/// <reference types="react" />
/**
 * @method 虚拟滚动自定义hooks
 * @param fiexdParam 固定的参数
 * @param {number} fiexdParam.itemHeight 每一个元素的高度
 * @param {number} fiexdParam.containerHeight 滚动容器的高度
 * @param dataSource 需要渲染的数组
 */
declare const useVirtualList: <Item>(fiexdParam: {
    itemHeight: number;
    containerHeight: number;
}, dataSource: Item[]) => {
    list: Item[];
    totalHeight: number;
    offsetTop: number;
    onScroll: import("react").UIEventHandler<HTMLDivElement>;
};
export default useVirtualList;
