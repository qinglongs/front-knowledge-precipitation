import { useState } from 'react';
import isEqual from 'lodash.isequal';
import cloneDeep from 'lodash.clonedeep';

function useDeepComparison(val, defaultValue) {
    var _a = useState(val || defaultValue), value = _a[0], setValue = _a[1];
    if (val && !isEqual(val, value)) {
        setValue(cloneDeep(val));
    }
    return value;
}

export { useDeepComparison as default };
