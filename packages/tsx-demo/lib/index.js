'use strict';

var React = require('react');
var antd = require('antd');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var React__default = /*#__PURE__*/_interopDefaultLegacy(React);

var TsxDemo = function () {
    var _a = React.useState(1), count = _a[0], setCount = _a[1];
    var onClickButton = function () {
        setCount(count + 1);
    };
    return React__default['default'].createElement(antd.Button, { type: "primary", onClick: onClickButton }, "111222");
};

module.exports = TsxDemo;
