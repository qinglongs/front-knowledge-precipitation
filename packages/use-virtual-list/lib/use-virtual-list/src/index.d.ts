/// <reference types="react" />
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
