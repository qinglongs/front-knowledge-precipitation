import { useState, useEffect } from 'react';

var useLazyLoad = function (nodeId, containerId) {
    var _a = useState(false), isShow = _a[0], setIsShow = _a[1];
    useEffect(function () {
        var node = document.querySelector(nodeId);
        var container = document.querySelector(containerId);
        if (container && node) {
            var intersectionObserver_1 = new IntersectionObserver(function (entries) {
                if (entries[0].intersectionRatio <= 0)
                    return;
                setIsShow(true);
            }, { root: container, threshold: [0, 0.5, 1] });
            intersectionObserver_1.observe(node);
            return function () {
                intersectionObserver_1.unobserve(node);
                setIsShow(false);
            };
        }
    }, [containerId, nodeId]);
    return { isShow: isShow };
};

export { useLazyLoad as default };
