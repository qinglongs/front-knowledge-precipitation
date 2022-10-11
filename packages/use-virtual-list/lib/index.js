import { useState, useEffect, useMemo, useRef } from 'react';
import isEqual from 'lodash.isequal';
import cloneDeep from 'lodash.clonedeep';

function useDeepComparison(val, defaultValue) {
    var _a = useState(val || defaultValue), value = _a[0], setValue = _a[1];
    if (val && !isEqual(val, value)) {
        setValue(cloneDeep(val));
    }
    return value;
}

var useDeepComparisonEffect = function (effect, deps) {
    if (!Array.isArray(deps))
        throw Error("deps has to be an array");
    if (!effect || typeof effect !== "function")
        throw Error("effect has to be a function");
    var data = useDeepComparison(deps, []);
    useEffect(effect, data);
};

var useVirtualList = function (fiexdParam, dataSource) {
    var itemHeight = fiexdParam.itemHeight, containerHeight = fiexdParam.containerHeight;
    var total = useMemo(function () { return dataSource.length; }, [dataSource]);
    var _a = useState([]), list = _a[0], setList = _a[1];
    var _b = useState(0), totalHeight = _b[0], setTotalHeight = _b[1];
    var _c = useState(0), offsetTop = _c[0], setOffsetTop = _c[1];
    var containerHeightRef = useRef(0);
    var lastIndex = useRef(1);
    var itemNumber = useRef(0);
    if (!itemHeight) {
        console.error("place enter a vaild itemHeight");
    }
    if (!Array.isArray(dataSource)) {
        console.error("dataSource must be an array");
    }
    var onScroll = function (e) {
        var scrollTop = e.target.scrollTop;
        var activeIndex = (scrollTop / itemHeight) >> 0;
        lastIndex.current = activeIndex;
        setList(dataSource.slice(lastIndex.current, lastIndex.current + itemNumber.current));
        setOffsetTop(activeIndex * itemHeight);
    };
    useDeepComparisonEffect(function () {
        containerHeightRef.current = containerHeight;
        itemNumber.current = ((containerHeight / itemHeight) >> 0) + 1;
        setTotalHeight(itemHeight * total);
        setList(dataSource.slice(lastIndex.current, itemNumber.current));
    }, [containerHeight, dataSource, itemHeight, total]);
    return { list: list, totalHeight: totalHeight, offsetTop: offsetTop, onScroll: onScroll };
};

export { useVirtualList as default };
