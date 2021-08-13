import React, { useState } from 'react';
import { Button } from 'antd';

var TsxDemo = function () {
    var _a = useState(1), count = _a[0], setCount = _a[1];
    var onClickButton = function () {
        setCount(count + 1);
    };
    return (React.createElement("div", null,
        React.createElement("div", { className: "box" }),
        React.createElement(Button, { type: "primary", onClick: onClickButton }, count)));
};

export { TsxDemo as default };
