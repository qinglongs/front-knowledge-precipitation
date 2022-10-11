import { message } from 'antd';
import { useState } from 'react';
import cloneDeep from 'lodash.clonedeep';

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

var useUploadFile = function (postFile, _a) {
    var _b = _a === void 0 ? { isBreak: false, fileLength: 1 } : _a, isBreak = _b.isBreak, fileLength = _b.fileLength, getBreakInfo = _b.getBreakInfo;
    var _c = useState([]), fileList = _c[0], setFileList = _c[1];
    var _d = useState(0), progress = _d[0], setProgress = _d[1];
    var _e = useState(false), loading = _e[0], setLoading = _e[1];
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
                var file, onError, onSuccess, formData, size, data, res, e_1;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            file = option.file, onError = option.onError, onSuccess = option.onSuccess;
                            if (fileLength === fileList.length)
                                return [2, message.error("\u6700\u591A\u4E0A\u4F20" + fileLength + "\u4E2A\u6587\u4EF6\uFF01")];
                            formData = new FormData();
                            size = 0;
                            if (!isBreak) return [3, 2];
                            if (!getBreakInfo)
                                throw Error("getBreakInfo is must be a function");
                            return [4, getBreakInfo(file.name)];
                        case 1:
                            data = (_a.sent()).data;
                            size = data;
                            _a.label = 2;
                        case 2:
                            console.log("文件大小", file.size, size);
                            if (size === file.size)
                                return [2, message.error("您已上传过这个文件")];
                            formData.append("file", file.slice(size, file.size), file.name);
                            _a.label = 3;
                        case 3:
                            _a.trys.push([3, 5, , 6]);
                            setLoading(true);
                            return [4, postFile(formData, function (_a) {
                                    var progress = _a.progress;
                                    setProgress(progress);
                                })];
                        case 4:
                            res = _a.sent();
                            setLoading(false);
                            onSuccess(res, file);
                            return [3, 6];
                        case 5:
                            e_1 = _a.sent();
                            setLoading(false);
                            onError(e_1);
                            return [3, 6];
                        case 6: return [2, {
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

export { useUploadFile as default };
