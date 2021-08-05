"use strict";
exports.__esModule = true;
var Flex_1 = require("components/Elements/Layout/Flex/Flex");
var Flex_d_1 = require("components/Elements/Layout/Flex/Flex.d");
var Loading_styles_1 = require("./Loading.styles");
var Loading = function (_a) {
    var color = _a.color, radius = _a.radius;
    var styles = Loading_styles_1.useStyles({ color: color, radius: radius });
    return (React.createElement(Flex_1["default"], { direction: Flex_d_1.FlexDirectionEnum.Horizontal },
        React.createElement("span", { className: styles.dot + " " + styles.first }),
        React.createElement("span", { className: styles.dot + " " + styles.second }),
        React.createElement("span", { className: styles.dot + " " + styles.third })));
};
exports["default"] = Loading;
