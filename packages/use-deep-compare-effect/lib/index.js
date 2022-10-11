import { useState, useEffect } from 'react';
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

export { useDeepComparisonEffect as default };
