import { useState, useEffect, useRef } from 'react';
import moment from 'moment';
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

var foramt = {
    date: "YYYY-MM-DD",
    dateTime: "YYYY-MM-DD HH:mm:ss",
    dateTimeRange: "YYYY-MM-DD HH:mm:ss",
    dateRange: "YYYY-MM-DD",
    hours: "HH:mm:ss",
    minute: "mm:ss",
};
function useSearchTable(GetPaging, form, extraParams, delValue) {
    var _this = this;
    var _a = useState([]), list = _a[0], setList = _a[1];
    var _b = useState({
        table: false,
        reset: false,
        search: false,
    }), loading = _b[0], setLoading = _b[1];
    var total = useRef(0);
    var isFetching = useRef(false);
    var pageParams = useRef({
        page: 1,
        size: 10,
    });
    var formValue = useRef({});
    var fetchList = function (type) { return __awaiter(_this, void 0, void 0, function () {
        var deepLoding, response, _a, list_1, totalNum;
        var _b, _c;
        return __generator(this, function (_d) {
            switch (_d.label) {
                case 0:
                    if (isFetching.current)
                        return [2];
                    deepLoding = cloneDeep(loading);
                    _d.label = 1;
                case 1:
                    _d.trys.push([1, , 3, 4]);
                    isFetching.current = true;
                    setLoading(__assign(__assign({}, deepLoding), (_b = { table: true }, _b[type || "table"] = true, _b)));
                    return [4, GetPaging(__assign(__assign(__assign({}, extraParams), formValue.current), pageParams.current))];
                case 2:
                    response = _d.sent();
                    _a = response.data, list_1 = _a.list, totalNum = _a.total;
                    total.current = totalNum;
                    setList(list_1);
                    return [3, 4];
                case 3:
                    isFetching.current = false;
                    setLoading(__assign(__assign({}, deepLoding), (_c = { table: false }, _c[type || "table"] = false, _c)));
                    return [7];
                case 4: return [2];
            }
        });
    }); };
    var onReset = function () { return __awaiter(_this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    form.resetFields();
                    pageParams.current = {
                        page: 1,
                        size: 10,
                    };
                    formValue.current = {};
                    return [4, fetchList("reset")];
                case 1:
                    _a.sent();
                    return [2];
            }
        });
    }); };
    var reloadTable = function () { return __awaiter(_this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            return [2, fetchList()];
        });
    }); };
    function onSubmit() {
        return __awaiter(this, void 0, void 0, function () {
            var value, valueKeys, isEmpty;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, form.validateFields()];
                    case 1:
                        value = _a.sent();
                        valueKeys = Object.keys(value);
                        isEmpty = valueKeys.every(function (key) {
                            return value[key] === undefined;
                        });
                        if (isEmpty)
                            return [2];
                        return [2, new Promise(function (resolve) {
                                valueKeys.forEach(function (key) {
                                    if (value[key] === undefined)
                                        delete value[key];
                                    if (key.indexOf("|") > -1 && value[key] !== undefined) {
                                        var splitKey = key.split("|");
                                        if (moment.isMoment(value[key])) {
                                            var _a = splitKey, formKey = _a[0], type = _a[1];
                                            value[formKey] = moment(value[key]).format(foramt[type]);
                                            delete value[key];
                                        }
                                        else {
                                            var _b = splitKey, start = _b[0], end = _b[1], type = _b[2];
                                            if (moment.isMoment(value[key][0])) {
                                                value[start] = moment(value[0]).format(foramt[type]);
                                                value[end] = moment(value[1]).format(foramt[type]);
                                            }
                                            else {
                                                value[start] = value[key][0];
                                                value[end] = value[key][1];
                                            }
                                            delete value[key];
                                        }
                                    }
                                });
                                resolve(value);
                                delValue && delValue(value);
                                formValue.current = value;
                                fetchList("search");
                            })];
                }
            });
        });
    }
    var onChange = function (page) {
        pageParams.current = __assign(__assign({}, pageParams.current), { page: page });
        fetchList();
    };
    var onShowSizeChange = function (_, size) {
        pageParams.current = __assign(__assign({}, pageParams.current), { size: size });
        fetchList();
    };
    useDeepComparisonEffect(function () {
        fetchList();
    }, [extraParams]);
    return {
        formProps: {},
        reloadTable: reloadTable,
        onReset: onReset,
        onSubmit: onSubmit,
        searchLoading: loading.search,
        resetLoading: loading.reset,
        tableProps: {
            dataSource: list,
            loading: loading.table,
            pagination: {
                total: total.current,
                current: pageParams.current.page,
                pageSize: pageParams.current.size,
                showSizeChanger: true,
                onShowSizeChange: onShowSizeChange,
                onChange: onChange,
            },
        },
    };
}

export { useSearchTable as default };
