import { useState, useEffect, useRef } from 'react';
import debounce from 'lodash.debounce';
import cloneDeep from 'lodash.clonedeep';
import isEqual from 'lodash.isequal';

/******************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */

var __assign = function() {
    __assign = Object.assign || function __assign(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};

function __awaiter(thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
}

function __generator(thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
}

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

var useSelect = function (GetList, options) {
    var formatSearchValue = options.formatSearchValue, _a = options.extraParams, extraParams = _a === void 0 ? {} : _a, mode = options.mode, _b = options.isPaging, isPaging = _b === void 0 ? false : _b;
    var pagingParams = useRef({
        current: 1,
        size: 10,
    });
    var searchValue = useRef({});
    var isFetching = useRef(false);
    var isNomore = useRef(false);
    var _c = useState(null), selectValue = _c[0], setSelectValue = _c[1];
    var _d = useState([]), option = _d[0], setOption = _d[1];
    var fetchPagingList = function (refresh) { return __awaiter(void 0, void 0, void 0, function () {
        var _a, total, list, deepOptions, temp;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    if (isFetching.current)
                        return [2];
                    pagingParams.current.current = refresh
                        ? 1
                        : pagingParams.current.current + 1;
                    isNomore.current = refresh ? false : isNomore.current;
                    if (isNomore.current)
                        return [2];
                    _b.label = 1;
                case 1:
                    _b.trys.push([1, , 3, 4]);
                    isFetching.current = true;
                    return [4, GetList(__assign(__assign(__assign({}, pagingParams.current), extraParams), searchValue.current))];
                case 2:
                    _a = (_b.sent()).data, total = _a.total, list = _a.list;
                    deepOptions = cloneDeep(option);
                    temp = refresh ? list : deepOptions.concat(list);
                    if (temp.length >= total) {
                        isNomore.current = true;
                    }
                    setOption(temp);
                    return [3, 4];
                case 3:
                    isFetching.current = false;
                    return [7];
                case 4: return [2];
            }
        });
    }); };
    var fetchNormalList = function () { return __awaiter(void 0, void 0, void 0, function () {
        var data;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (isFetching.current)
                        return [2];
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, , 3, 4]);
                    isFetching.current = true;
                    return [4, GetList(__assign(__assign({}, extraParams), searchValue.current))];
                case 2:
                    data = (_a.sent()).data;
                    setOption(data || []);
                    return [3, 4];
                case 3:
                    isFetching.current = false;
                    return [7];
                case 4: return [2];
            }
        });
    }); };
    var fetchList = function (refresh) {
        if (refresh === void 0) { refresh = false; }
        return __awaiter(void 0, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!isPaging) return [3, 2];
                        return [4, fetchPagingList(refresh)];
                    case 1:
                        _a.sent();
                        return [3, 4];
                    case 2: return [4, fetchNormalList()];
                    case 3:
                        _a.sent();
                        _a.label = 4;
                    case 4: return [2];
                }
            });
        });
    };
    var onSearch = function (val) {
        if (!formatSearchValue)
            throw Error("attribute options.formatSearchValue must be passed");
        searchValue.current = val ? formatSearchValue(val) : {};
        fetchList(true);
    };
    var onPopupScroll = function (e) {
        if (!isPaging)
            return;
        var scrollHeight = e.target.scrollHeight;
        var scrollTop = e.target.scrollTop;
        var clientHeight = e.target.clientHeight;
        if (clientHeight + scrollTop > scrollHeight - 5) {
            fetchPagingList(false);
        }
    };
    var onChange = function (val, node) {
        if (!val || (Array.isArray(val) && !val.length)) {
            if (!Object.keys(searchValue.current).length)
                return;
            setSelectValue(null);
            searchValue.current = {};
            fetchList(true);
        }
        else {
            setSelectValue(Array.isArray(node) ? node.map(function (i) { return i.props; }) : node.props);
        }
    };
    var onSelect = function () {
        if (!isPaging) {
            if (!Object.keys(searchValue.current).length)
                return;
            searchValue.current = {};
            fetchList(true);
        }
    };
    useDeepComparisonEffect(function () {
        fetchList(true);
    }, [extraParams]);
    return {
        value: selectValue,
        props: {
            options: option,
            mode: mode,
            showSearch: true,
            onSearch: debounce(onSearch, 300),
            onPopupScroll: onPopupScroll,
            onChange: onChange,
            onSelect: onSelect,
            filterOption: false,
            showArrow: false,
            allowClear: true,
        },
    };
};

export { useSelect as default };
