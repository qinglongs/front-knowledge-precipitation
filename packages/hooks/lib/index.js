import { useState, useEffect, useRef, useMemo } from 'react';
import { isEqual, cloneDeep, debounce } from 'lodash';
import moment from 'moment';
import { message } from 'antd';

/**
 * @method 深比较变量，监听变化并返回新的变量
 * @returns  返回的深比较处理过后的数据
 */
function useDeepComparison(val, defaultValue) {
    var _a = useState(val || defaultValue), value = _a[0], setValue = _a[1];
    if (val && !isEqual(val, value)) {
        setValue(cloneDeep(val));
    }
    return value;
}

/**
 * @method 深比较副作用hooks
 */
var useDeepComparisonEffect = function (effect, deps) {
    if (!Array.isArray(deps))
        throw Error("deps has to be an array");
    if (!effect || typeof effect !== "function")
        throw Error("effect has to be a function");
    var data = useDeepComparison(deps, []);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    useEffect(effect, data);
};

/**
 * @method 简易懒加载自定义hooks
 * @param nodeId 节点id
 * @param containerId 容器id，不指定默认为document
 */
var useLazyLoad = function (nodeId, containerId) {
    // 是否展示
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
            // start observing
            intersectionObserver_1.observe(node);
            return function () {
                // end observing
                intersectionObserver_1.unobserve(node);
                setIsShow(false);
            };
        }
    }, [containerId, nodeId]);
    return { isShow: isShow };
};

/*! *****************************************************************************
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

/** 时间格式化对象 */
var foramt = {
    date: "YYYY-MM-DD",
    dateTime: "YYYY-MM-DD HH:mm:ss",
    dateTimeRange: "YYYY-MM-DD HH:mm:ss",
    dateRange: "YYYY-MM-DD",
    hours: "HH:mm:ss",
    minute: "mm:ss",
};
/**
 * @method 搜索列表组件自定义hooks
 * @param GetPaging 列表请求方法
 * @param form 表单实例对象
 * @param extraParams 额外的参数
 * @param delValue 提交表单时，如果需要改变某些字段的值，可以传入这个参数
 */
function useSearchTable(GetPaging, form, extraParams, delValue) {
    var _this = this;
    // 分页数据
    var _a = useState([]), list = _a[0], setList = _a[1];
    // 是否正在加载
    var _b = useState({
        table: false,
        reset: false,
        search: false,
    }), loading = _b[0], setLoading = _b[1];
    // 总数
    var total = useRef(0);
    // 是否在请求中
    var isFetching = useRef(false);
    // 分页参数
    var pageParams = useRef({
        page: 1,
        size: 10,
    });
    // 表单数据
    var formValue = useRef({});
    /**
     * @method 请求列表数据
     */
    var fetchList = function (type) { return __awaiter(_this, void 0, void 0, function () {
        var deepLoding, response, _a, list_1, totalNum;
        var _b, _c;
        return __generator(this, function (_d) {
            switch (_d.label) {
                case 0:
                    if (isFetching.current)
                        return [2 /*return*/];
                    deepLoding = cloneDeep(loading);
                    _d.label = 1;
                case 1:
                    _d.trys.push([1, , 3, 4]);
                    isFetching.current = true;
                    setLoading(__assign(__assign({}, deepLoding), (_b = { table: true }, _b[type || "table"] = true, _b)));
                    return [4 /*yield*/, GetPaging(__assign(__assign(__assign({}, extraParams), formValue.current), pageParams.current))];
                case 2:
                    response = _d.sent();
                    _a = response.data, list_1 = _a.list, totalNum = _a.total;
                    total.current = totalNum;
                    setList(list_1);
                    return [3 /*break*/, 4];
                case 3:
                    isFetching.current = false;
                    setLoading(__assign(__assign({}, deepLoding), (_c = { table: false }, _c[type || "table"] = false, _c)));
                    return [7 /*endfinally*/];
                case 4: return [2 /*return*/];
            }
        });
    }); };
    /**
     * @method 重置列表
     */
    var onReset = function () { return __awaiter(_this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    // 重置表单
                    form.resetFields();
                    // 重置分页
                    pageParams.current = {
                        page: 1,
                        size: 10,
                    };
                    // 重置表单搜索值
                    formValue.current = {};
                    return [4 /*yield*/, fetchList("reset")];
                case 1:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    }); };
    /**
     * @method 刷新表单
     */
    var reloadTable = function () { return __awaiter(_this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            return [2 /*return*/, fetchList()];
        });
    }); };
    /**
     * @method 提交表单
     */
    function onSubmit() {
        return __awaiter(this, void 0, void 0, function () {
            var value, valueKeys, isEmpty;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, form.validateFields()];
                    case 1:
                        value = _a.sent();
                        valueKeys = Object.keys(value);
                        isEmpty = valueKeys.every(function (key) {
                            return value[key] === undefined;
                        });
                        if (isEmpty)
                            return [2 /*return*/];
                        return [2 /*return*/, new Promise(function (resolve) {
                                valueKeys.forEach(function (key) {
                                    // 删除没有值的key
                                    if (value[key] === undefined)
                                        delete value[key];
                                    // 是否有需要特殊处理的表单项
                                    if (key.indexOf("|") > -1 && value[key] !== undefined) {
                                        // 分隔字符串，得到rangeKey配置
                                        var splitKey = key.split("|");
                                        // 处理单独的日期选择
                                        if (moment.isMoment(value[key])) {
                                            var _a = splitKey, formKey = _a[0], type = _a[1];
                                            value[formKey] = moment(value[key]).format(foramt[type]);
                                            delete value[key];
                                        }
                                        else {
                                            // 解构rangeKey
                                            var _b = splitKey, start = _b[0], end = _b[1], type = _b[2];
                                            // 处理日期选择
                                            if (moment.isMoment(value[key][0])) {
                                                value[start] = moment(value[0]).format(foramt[type]);
                                                value[end] = moment(value[1]).format(foramt[type]);
                                            }
                                            else {
                                                // 处理其他的范围选择
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
    /**
     * @method 页码change事件
     * @param page 切换到的页码
     */
    var onChange = function (page) {
        pageParams.current = __assign(__assign({}, pageParams.current), { page: page });
        fetchList();
    };
    /**
     * @method 展示条数change事件
     * @param current 当前页码
     * @param size 展示条数
     */
    var onShowSizeChange = function (_, size) {
        pageParams.current = __assign(__assign({}, pageParams.current), { size: size });
        fetchList();
    };
    // 初始化
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

/**
 * @method 下拉选择支持分页/不分页请求
 */
var useSelect = function (GetList, options) {
    // 解构配置对象
    var formatSearchValue = options.formatSearchValue, _a = options.extraParams, extraParams = _a === void 0 ? {} : _a, mode = options.mode, _b = options.isPaging, isPaging = _b === void 0 ? false : _b;
    // 分页参数
    var pagingParams = useRef({
        current: 1,
        size: 10,
    });
    // 搜索框输入参数
    var searchValue = useRef({});
    // 是否请求中
    var isFetching = useRef(false);
    // 是否没有更多
    var isNomore = useRef(false);
    // 选中的数据
    var _c = useState(null), selectValue = _c[0], setSelectValue = _c[1];
    // 选项数据
    var _d = useState([]), option = _d[0], setOption = _d[1];
    /**
     * @method 分页请求
     * @param {boolean} refresh 是否刷新
     */
    var fetchPagingList = function (refresh) { return __awaiter(void 0, void 0, void 0, function () {
        var _a, total, list, deepOptions, temp;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    if (isFetching.current)
                        return [2 /*return*/];
                    pagingParams.current.current = refresh
                        ? 1
                        : pagingParams.current.current + 1;
                    isNomore.current = refresh ? false : isNomore.current;
                    if (isNomore.current)
                        return [2 /*return*/];
                    _b.label = 1;
                case 1:
                    _b.trys.push([1, , 3, 4]);
                    isFetching.current = true;
                    return [4 /*yield*/, GetList(__assign(__assign(__assign({}, pagingParams.current), extraParams), searchValue.current))];
                case 2:
                    _a = (_b.sent()).data, total = _a.total, list = _a.list;
                    deepOptions = cloneDeep(option);
                    temp = refresh ? list : deepOptions.concat(list);
                    if (temp.length >= total) {
                        isNomore.current = true;
                    }
                    setOption(temp);
                    return [3 /*break*/, 4];
                case 3:
                    isFetching.current = false;
                    return [7 /*endfinally*/];
                case 4: return [2 /*return*/];
            }
        });
    }); };
    /**
     * @method 不具有分页的请求
     */
    var fetchNormalList = function () { return __awaiter(void 0, void 0, void 0, function () {
        var data;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (isFetching.current)
                        return [2 /*return*/];
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, , 3, 4]);
                    isFetching.current = true;
                    return [4 /*yield*/, GetList(__assign(__assign({}, extraParams), searchValue.current))];
                case 2:
                    data = (_a.sent()).data;
                    setOption(data || []);
                    return [3 /*break*/, 4];
                case 3:
                    isFetching.current = false;
                    return [7 /*endfinally*/];
                case 4: return [2 /*return*/];
            }
        });
    }); };
    /**
     * @method 统一请求方法
     */
    var fetchList = function (refresh) {
        if (refresh === void 0) { refresh = false; }
        return __awaiter(void 0, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!isPaging) return [3 /*break*/, 2];
                        return [4 /*yield*/, fetchPagingList(refresh)];
                    case 1:
                        _a.sent();
                        return [3 /*break*/, 4];
                    case 2: return [4 /*yield*/, fetchNormalList()];
                    case 3:
                        _a.sent();
                        _a.label = 4;
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    /**
     * @method 搜索事件
     * @param {string} val 搜索值
     */
    var onSearch = function (val) {
        if (!formatSearchValue)
            throw Error("attribute options.formatSearchValue must be passed");
        searchValue.current = val ? formatSearchValue(val) : {};
        fetchList(true);
    };
    /**
     * @method 下拉滚动事件
     */
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
    /**
     * @method 下拉拉选中change事件
     * @param {object} node 选中的节点信息
     */
    var onChange = function (val, node) {
        if (!val || (Array.isArray(val) && !val.length)) {
            if (!Object.keys(searchValue.current).length)
                return;
            // 这里点击清除按钮触发
            setSelectValue(null);
            // 更新搜索值
            searchValue.current = {};
            fetchList(true);
        }
        else {
            // 需要判断是多选还是单选
            setSelectValue(Array.isArray(node) ? node.map(function (i) { return i.props; }) : node.props);
        }
    };
    /**
     * @method 选中后事件，目的是为了在选中之后重置下拉选项
     */
    var onSelect = function () {
        // 如果是分页就不需要处理
        if (!isPaging) {
            if (!Object.keys(searchValue.current).length)
                return;
            // 重置搜索值
            searchValue.current = {};
            fetchList(true);
        }
    };
    // 监听搜索值
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

/**
 * @method 上传文件自定义hooks
 * @param postFile 上传文件请求
 * @param fileLength 上传文件数量限制，默认为1
 */
var useUploadFile = function (postFile, _a) {
    var _b = _a === void 0 ? { isBreak: false, fileLength: 1 } : _a, isBreak = _b.isBreak, fileLength = _b.fileLength, getBreakInfo = _b.getBreakInfo;
    // 上传的文件列表
    var _c = useState([]), fileList = _c[0], setFileList = _c[1];
    // 进度条
    var _d = useState(0), progress = _d[0], setProgress = _d[1];
    // loading
    var _e = useState(false), loading = _e[0], setLoading = _e[1];
    // 参数
    var uploadProps = {
        multiple: true,
        headers: {
            Authorization: "$prefix $token",
        },
        onStart: function () {
            setProgress(0);
        },
        onSuccess: function (res, file) {
            var list = cloneDeep(fileList);
            file.status = "done";
            file.url = res.data;
            list.push(file);
            setFileList(list);
            setProgress(100);
        },
        onError: function () {
            setProgress(0);
        },
        onProgress: function (_a) {
            var percent = _a.percent;
            setProgress(percent);
        },
        customRequest: function (option) {
            return __awaiter(this, void 0, void 0, function () {
                var 
                // data,
                file, 
                // filename,
                onError, 
                // onProgress,
                onSuccess, formData, size, data, res, e_1;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            file = option.file, onError = option.onError, onSuccess = option.onSuccess;
                            //上传限制
                            if (fileLength === fileList.length)
                                return [2 /*return*/, message.error("\u6700\u591A\u4E0A\u4F20" + fileLength + "\u4E2A\u6587\u4EF6\uFF01")];
                            formData = new FormData();
                            size = 0;
                            if (!isBreak) return [3 /*break*/, 2];
                            if (!getBreakInfo)
                                throw Error("getBreakInfo is must be a function");
                            return [4 /*yield*/, getBreakInfo(file.name)];
                        case 1:
                            data = (_a.sent()).data;
                            size = data;
                            _a.label = 2;
                        case 2:
                            console.log("文件大小", file.size, size);
                            if (size === file.size)
                                return [2 /*return*/, message.error("您已上传过这个文件")];
                            formData.append("file", file.slice(size, file.size), file.name);
                            _a.label = 3;
                        case 3:
                            _a.trys.push([3, 5, , 6]);
                            setLoading(true);
                            return [4 /*yield*/, postFile(formData, function (_a) {
                                    var progress = _a.progress;
                                    setProgress(progress);
                                })];
                        case 4:
                            res = _a.sent();
                            setLoading(false);
                            onSuccess(res, file);
                            return [3 /*break*/, 6];
                        case 5:
                            e_1 = _a.sent();
                            setLoading(false);
                            onError(e_1);
                            return [3 /*break*/, 6];
                        case 6: return [2 /*return*/, {
                                abort: function () {
                                    message.error("文件上传被中止！");
                                },
                            }];
                    }
                });
            });
        },
        onChange: function (info) {
            var _a = info.file, status = _a.status, name = _a.name, uid = _a.uid;
            if (status !== "uploading") {
                console.log(info.file, info.fileList);
            }
            if (status === "done") {
                message.success(name + " file uploaded successfully");
            }
            else if (status === "error") {
                message.error(name + " file upload failed.");
            }
            if (status === "removed") {
                var list = fileList.filter(function (i) { return i.uid !== uid; });
                setFileList(list);
                setProgress(0);
            }
        },
        fileList: fileList,
    };
    return { uploadProps: uploadProps, progress: progress, loading: loading };
};

/**
 * @method 虚拟滚动自定义hooks
 * @param fiexdParam 固定的参数
 * @param {number} fiexdParam.itemHeight 每一个元素的高度
 * @param {number} fiexdParam.containerHeight 滚动容器的高度
 * @param dataSource 需要渲染的数组
 */
var useVirtualList = function (fiexdParam, dataSource) {
    var itemHeight = fiexdParam.itemHeight, containerHeight = fiexdParam.containerHeight;
    // 数据总数
    var total = useMemo(function () { return dataSource.length; }, [dataSource]);
    // 列表展示的数据
    var _a = useState([]), list = _a[0], setList = _a[1];
    // 列表总高度
    var _b = useState(0), totalHeight = _b[0], setTotalHeight = _b[1];
    // 滚动条到顶部的高度
    var _c = useState(0), offsetTop = _c[0], setOffsetTop = _c[1];
    // 容器高度
    var containerHeightRef = useRef(0);
    // 屏幕展示最下面的一个元素的值
    var lastIndex = useRef(1);
    // 单屏可展示的元素个数
    var itemNumber = useRef(0);
    if (!itemHeight) {
        console.error("place enter a vaild itemHeight");
    }
    if (!Array.isArray(dataSource)) {
        console.error("dataSource must be an array");
    }
    /**
     * @method 容器滚动事件
     * @param scrollTop 滚动条到顶部的距离
     */
    var onScroll = function (e) {
        // 滚动条到顶部的距离
        var scrollTop = e.target.scrollTop;
        // 计算当前应该展示到的元素
        var activeIndex = (scrollTop / itemHeight) >> 0;
        // 屏幕可见区域中，最后一个元素索引
        lastIndex.current = activeIndex;
        setList(dataSource.slice(lastIndex.current, lastIndex.current + itemNumber.current));
        setOffsetTop(activeIndex * itemHeight);
    };
    useDeepComparisonEffect(function () {
        // 可见区域的高度
        containerHeightRef.current = containerHeight;
        // 可见区域可以展示的元素个数
        itemNumber.current = ((containerHeight / itemHeight) >> 0) + 1;
        // 总高度
        setTotalHeight(itemHeight * total);
        // 截取一屏可展示的元素
        setList(dataSource.slice(lastIndex.current, itemNumber.current));
    }, [containerHeight, dataSource, itemHeight, total]);
    return { list: list, totalHeight: totalHeight, offsetTop: offsetTop, onScroll: onScroll };
};

export { useDeepComparison, useDeepComparisonEffect, useLazyLoad, useSearchTable, useSelect, useUploadFile, useVirtualList };
