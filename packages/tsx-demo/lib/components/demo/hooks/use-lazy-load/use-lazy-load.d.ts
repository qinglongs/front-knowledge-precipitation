/**
 * @method 简易懒加载自定义hooks
 * @param nodeId 节点id
 * @param containerId 容器id，不指定默认为document
 */
declare const useLazyLoad: (nodeId: string, containerId: string) => {
    isShow: boolean;
};
export default useLazyLoad;
