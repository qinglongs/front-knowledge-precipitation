'use strict';

var React = require('react');
var antd = require('antd');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var React__default = /*#__PURE__*/_interopDefaultLegacy(React);

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
    return (React__default['default'].createElement("div", null,
        React__default['default'].createElement("div", { className: "box" }),
        React__default['default'].createElement(antd.Button, { type: "primary", onClick: onClickButton }, count)));
};

module.exports = TsxDemo;
