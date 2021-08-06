'use strict';

var React = require('react');
var antd = require('antd');
var lodash = require('lodash');
require('moment');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var React__default = /*#__PURE__*/_interopDefaultLegacy(React);

/**
 * @method 深比较变量，监听变化并返回新的变量
 * @returns  返回的深比较处理过后的数据
 */
function useDeepComparison(val, defaultValue) {
    var _a = React.useState(val || defaultValue), value = _a[0], setValue = _a[1];
    if (val && !lodash.isEqual(val, value)) {
        setValue(lodash.cloneDeep(val));
    }
    return value;
}

/**
 * @method 深比较副作用hooks
 */
var useDeepComparisonEffect = function (effect, deps) {
    if (!Array.isArray(deps))
        throw Error('deps has to be an array');
    if (!effect || typeof effect !== 'function')
        throw Error('effect has to be a function');
    var list = deps.filter(function (i) { return i; });
    var data = useDeepComparison(list, []);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    React.useEffect(effect, data);
};

function styleInject(css, ref) {
  if ( ref === void 0 ) ref = {};
  var insertAt = ref.insertAt;

  if (!css || typeof document === 'undefined') { return; }

  var head = document.head || document.getElementsByTagName('head')[0];
  var style = document.createElement('style');
  style.type = 'text/css';

  if (insertAt === 'top') {
    if (head.firstChild) {
      head.insertBefore(style, head.firstChild);
    } else {
      head.appendChild(style);
    }
  } else {
    head.appendChild(style);
  }

  if (style.styleSheet) {
    style.styleSheet.cssText = css;
  } else {
    style.appendChild(document.createTextNode(css));
  }
}

var css_248z = ".box {\n  width: 20px;\n  height: 20px;\n  background-color: pink;\n}\n";
styleInject(css_248z);

var TsxDemo = function () {
    var _a = React.useState(1), count = _a[0], setCount = _a[1];
    var onClickButton = function () {
        setCount(count + 1);
    };
    useDeepComparisonEffect(function () {
        console.log('hello world');
    }, [12313]);
    return (React__default['default'].createElement("div", null,
        React__default['default'].createElement("div", { className: "box" }),
        React__default['default'].createElement(antd.Button, { type: "primary", onClick: onClickButton }, count)));
};

module.exports = TsxDemo;
