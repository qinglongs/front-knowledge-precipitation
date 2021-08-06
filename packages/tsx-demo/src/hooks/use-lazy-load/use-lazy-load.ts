import { useEffect, useState } from 'react';

/**
 * @method 简易懒加载自定义hooks
 * @param nodeId 节点id
 * @param containerId 容器id，不指定默认为document
 */
const useLazyLoad = (nodeId: string, containerId: string) => {
  // 是否展示
  const [isShow, setIsShow] = useState(false);

  useEffect(() => {

    const node = document.querySelector(nodeId);

    const container = document.querySelector(containerId);

    if (container && node) {
      const intersectionObserver = new IntersectionObserver(function (entries) {
        if (entries[0].intersectionRatio <= 0) return;
        setIsShow(true)

      }, { root: container, threshold: [0, 0.5, 1] });

      // start observing
      intersectionObserver.observe(node as Element);

      return () => {
        // end observing
        intersectionObserver.unobserve(node as Element);
        setIsShow(false)
      }
    }

  }, [containerId, nodeId])

  return { isShow }

}
export default useLazyLoad;